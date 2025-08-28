"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormModal({
  isOpen,
  onClose,
  title,
  children,
  className = "",
}: FormModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      // Prevent body scroll on mobile
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = '0';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isDownSwipe = distance < -minSwipeDistance;
    
    if (isDownSwipe) {
      onClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 150); // Match animation duration
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-4xl 
          /* Mobile: Full height bottom sheet */
          max-h-[95vh] sm:max-h-[90vh] 
          /* Mobile: No margins, desktop: margins */
          mx-0 sm:mx-4
          /* Mobile: Rounded top corners only, desktop: all corners */
          rounded-t-3xl sm:rounded-3xl
          /* Mobile: Slide up animation */
          transform transition-all duration-300 ease-out
          ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full sm:translate-y-0 opacity-0 sm:opacity-100'}
          /* Touch-friendly scrolling */
          overflow-y-auto overscroll-contain
          /* Safe area handling for notched devices */
          pb-safe-area-inset-bottom
          /* Hardware acceleration */
          will-change-transform
          ${className}`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Mobile Handle Bar */}
        <div className="flex justify-center pt-3 pb-2 sm:hidden">
          <div className="w-10 h-1.5 bg-white/30 rounded-full"></div>
        </div>

        {/* Close Button */}
        <div className="absolute top-4 right-4 z-[10000]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-10 w-10 sm:h-8 sm:w-8 p-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 
              /* Larger touch target for mobile */
              touch-manipulation
              /* Enhanced tap feedback */
              active:scale-95 transition-transform duration-100"
          >
            <X className="h-5 w-5 sm:h-4 sm:w-4" />
          </Button>
        </div>

        {/* Modal Header */}
        <div className="text-center mb-4 sm:mb-6 pt-8 sm:pt-12 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="pb-6 sm:pb-8 px-4 sm:px-0">{children}</div>
      </div>
    </div>
  );
}
