"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import PartnershipForm from "@/components/forms/PartnershipForm";
import QuoteForm from "@/components/forms/QuoteForm";
import CategoryQuoteForm from "@/components/forms/CategoryQuoteForm";
import NewsletterForm from "@/components/forms/NewsletterForm";
import MobileContactForm from "@/components/forms/MobileContactForm";

export type FormType = 
  | "partnership" 
  | "quote" 
  | "category-quote" 
  | "newsletter" 
  | "contact";

export type CategoryType = "smartphones" | "tablets" | "wearables" | "monitors" | "audio";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formType: FormType;
  category?: CategoryType;
  title?: string;
  description?: string;
}

export default function FormModal({ 
  isOpen, 
  onClose, 
  formType, 
  category,
  title,
  description 
}: FormModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  const handleSuccess = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const renderForm = () => {
    switch (formType) {
      case "partnership":
        return <PartnershipForm onSuccess={handleSuccess} onCancel={handleClose} />;
      
      case "quote":
        return <QuoteForm onSuccess={handleSuccess} onCancel={handleClose} />;
      
      case "category-quote":
        if (!category) return <QuoteForm onSuccess={handleSuccess} onCancel={handleClose} />;
        return <CategoryQuoteForm category={category} onSuccess={handleSuccess} onCancel={handleClose} />;
      
      case "newsletter":
        return <NewsletterForm variant="popup" onSuccess={handleSuccess} onCancel={handleClose} />;
      
      case "contact":
        return <MobileContactForm onSuccess={handleSuccess} onCancel={handleClose} />;
      
      default:
        return <QuoteForm onSuccess={handleSuccess} onCancel={handleClose} />;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-[10000] flex items-center justify-center p-4 transition-all duration-200 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          isVisible ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-gray-100"
        >
          <X className="h-4 w-4" />
        </Button>

        {/* Form Content */}
        <div className="p-6 md:p-8">
          {(title || description) && (
            <div className="text-center mb-6">
              {title && (
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-gray-600">
                  {description}
                </p>
              )}
            </div>
          )}
          
          {renderForm()}
        </div>
      </div>
    </div>
  );
}
