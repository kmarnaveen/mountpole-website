"use client";

import React from "react";
import FormModal from "./FormModal";
import QuoteFormGlass from "@/components/forms/QuoteFormGlass";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  quoteType?: "general" | "bulk" | "enterprise" | "custom" | "urgent";
  productContext?: string;
  productId?: string;
  productName?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  quoteType = "general",
  productContext,
  productId,
  productName,
}: QuoteModalProps) {
  const handleSuccess = () => {
    // Close modal after successful submission
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      title="Request Quote"
      className="bg-white/10 backdrop-blur-md border border-white/20"
    >
      <QuoteFormGlass
        quoteType={quoteType}
        productContext={productContext}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </FormModal>
  );
}
