"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import QuoteModal from "./QuoteModal";
import CategoryQuoteModal from "./CategoryQuoteModal";
import PartnershipModal from "./PartnershipModal";
import NewsletterModal from "./NewsletterModal";

interface ModalState {
  quote: {
    isOpen: boolean;
    quoteType?: "general" | "bulk" | "enterprise" | "custom" | "urgent";
    productContext?: string;
    productId?: string;
    productName?: string;
  };
  categoryQuote: {
    isOpen: boolean;
    category?: "smartphones" | "tablets" | "wearables" | "monitors" | "audio";
  };
  partnership: {
    isOpen: boolean;
    partnershipType?: string;
    stage?: string;
  };
  newsletter: {
    isOpen: boolean;
    variant?: "default" | "compact" | "landing";
  };
}

interface ModalContextType {
  openQuoteModal: (options?: {
    quoteType?: "general" | "bulk" | "enterprise" | "custom" | "urgent";
    productContext?: string;
    productId?: string;
    productName?: string;
  }) => void;
  openCategoryQuoteModal: (
    category: "smartphones" | "tablets" | "wearables" | "monitors" | "audio"
  ) => void;
  openPartnershipModal: (options?: {
    partnershipType?: string;
    stage?: string;
  }) => void;
  openNewsletterModal: (variant?: "default" | "compact" | "landing") => void;
  closeAllModals: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModals = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModals must be used within a ModalProvider");
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modalState, setModalState] = useState<ModalState>({
    quote: { isOpen: false },
    categoryQuote: { isOpen: false },
    partnership: { isOpen: false },
    newsletter: { isOpen: false },
  });

  const openQuoteModal = (options?: {
    quoteType?: "general" | "bulk" | "enterprise" | "custom" | "urgent";
    productContext?: string;
    productId?: string;
    productName?: string;
  }) => {
    setModalState((prev) => ({
      ...prev,
      quote: { isOpen: true, ...options },
    }));
  };

  const openCategoryQuoteModal = (
    category: "smartphones" | "tablets" | "wearables" | "monitors" | "audio"
  ) => {
    setModalState((prev) => ({
      ...prev,
      categoryQuote: { isOpen: true, category },
    }));
  };

  const openPartnershipModal = (options?: {
    partnershipType?: string;
    stage?: string;
  }) => {
    setModalState((prev) => ({
      ...prev,
      partnership: { isOpen: true, ...options },
    }));
  };

  const openNewsletterModal = (variant?: "default" | "compact" | "landing") => {
    setModalState((prev) => ({
      ...prev,
      newsletter: { isOpen: true, variant },
    }));
  };

  const closeAllModals = () => {
    setModalState({
      quote: { isOpen: false },
      categoryQuote: { isOpen: false },
      partnership: { isOpen: false },
      newsletter: { isOpen: false },
    });
  };

  const closeQuoteModal = () => {
    setModalState((prev) => ({
      ...prev,
      quote: { isOpen: false },
    }));
  };

  const closeCategoryQuoteModal = () => {
    setModalState((prev) => ({
      ...prev,
      categoryQuote: { isOpen: false },
    }));
  };

  const closePartnershipModal = () => {
    setModalState((prev) => ({
      ...prev,
      partnership: { isOpen: false },
    }));
  };

  const closeNewsletterModal = () => {
    setModalState((prev) => ({
      ...prev,
      newsletter: { isOpen: false },
    }));
  };

  return (
    <ModalContext.Provider
      value={{
        openQuoteModal,
        openCategoryQuoteModal,
        openPartnershipModal,
        openNewsletterModal,
        closeAllModals,
      }}
    >
      {children}

      {/* Render all modals */}
      <QuoteModal
        isOpen={modalState.quote.isOpen}
        onClose={closeQuoteModal}
        quoteType={modalState.quote.quoteType}
        productContext={modalState.quote.productContext}
        productId={modalState.quote.productId}
        productName={modalState.quote.productName}
      />

      {modalState.categoryQuote.category && (
        <CategoryQuoteModal
          isOpen={modalState.categoryQuote.isOpen}
          onClose={closeCategoryQuoteModal}
          category={modalState.categoryQuote.category}
        />
      )}

      <PartnershipModal
        isOpen={modalState.partnership.isOpen}
        onClose={closePartnershipModal}
        partnershipType={modalState.partnership.partnershipType}
        stage={modalState.partnership.stage}
      />
    </ModalContext.Provider>
  );
}
