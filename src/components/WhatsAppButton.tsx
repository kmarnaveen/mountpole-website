// WhatsApp Integration Component
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

interface WhatsAppButtonProps {
  variant?: "floating" | "inline" | "mobile-dock";
  message?: string;
  phoneNumber?: string;
  className?: string;
}

export default function WhatsAppButton({
  variant = "floating",
  message = "Hi! I'm interested in your wholesale products. Can you help me?",
  phoneNumber = "+1234567890", // Replace with actual WhatsApp business number
  className = "",
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(
      /[^\d]/g,
      ""
    )}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

    // Track analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "Contact",
        event_label: variant,
      });
    }
  };

  if (variant === "floating") {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`
            h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 
            shadow-lg hover:shadow-xl transition-all duration-300
            ${isHovered ? "scale-110" : "scale-100"}
            ${className}
          `}
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>

        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-16 right-0 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap">
            Chat on WhatsApp
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
          </div>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <Button
        onClick={handleWhatsAppClick}
        className={`bg-green-500 hover:bg-green-600 text-white ${className}`}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        WhatsApp
      </Button>
    );
  }

  if (variant === "mobile-dock") {
    return (
      <Button
        onClick={handleWhatsAppClick}
        variant="outline"
        size="sm"
        className={`flex-1 text-xs ${className}`}
      >
        <MessageCircle className="h-3 w-3 mr-1" />
        WhatsApp
      </Button>
    );
  }

  return null;
}
