"use client";

import React from "react";
import FormModal from "./FormModal";
import NewsletterFormGlass from "@/components/forms/NewsletterFormGlass";

interface NewsletterModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "default" | "compact" | "landing";
}

export default function NewsletterModal({
  isOpen,
  onClose,
  variant = "default",
}: NewsletterModalProps) {
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
      title="Subscribe to Newsletter"
      className="bg-white/10 backdrop-blur-md border border-white/20"
    >
      <NewsletterFormGlass variant={variant} onSuccess={handleSuccess} />
    </FormModal>
  );
}
