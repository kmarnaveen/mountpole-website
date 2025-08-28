"use client";

import React from "react";
import FormModal from "./FormModal";
import PartnershipFormGlass from "@/components/forms/PartnershipFormGlass";

interface PartnershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  partnershipType?: string;
  stage?: string;
}

export default function PartnershipModal({
  isOpen,
  onClose,
  partnershipType,
  stage,
}: PartnershipModalProps) {
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
      title="Partnership Opportunity"
      className="bg-white/10 backdrop-blur-md border border-white/20"
    >
      <PartnershipFormGlass
        partnershipType={partnershipType}
        stage={stage}
        onSuccess={handleSuccess}
        onCancel={onClose}
      />
    </FormModal>
  );
}
