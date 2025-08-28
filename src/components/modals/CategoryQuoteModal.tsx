"use client";

import React from "react";
import FormModal from "./FormModal";
import CategoryQuoteFormGlass from "@/components/forms/CategoryQuoteFormGlass";

interface CategoryQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: "smartphones" | "tablets" | "wearables" | "monitors" | "audio";
}

export default function CategoryQuoteModal({
  isOpen,
  onClose,
  category,
}: CategoryQuoteModalProps) {
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
      title={`${category.charAt(0).toUpperCase() + category.slice(1)} Quote`}
      className="bg-white/10 backdrop-blur-md border border-white/20"
    >
      <CategoryQuoteFormGlass
        category={category}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </FormModal>
  );
}
