"use client";

import { useState } from "react";
import { FormType, CategoryType } from "@/components/ui/FormModal";

interface UseFormModalReturn {
  isOpen: boolean;
  formType: FormType;
  category?: CategoryType;
  title?: string;
  description?: string;
  openForm: (
    type: FormType, 
    options?: {
      category?: CategoryType;
      title?: string;
      description?: string;
    }
  ) => void;
  closeForm: () => void;
}

export function useFormModal(): UseFormModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("quote");
  const [category, setCategory] = useState<CategoryType | undefined>();
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();

  const openForm = (
    type: FormType, 
    options?: {
      category?: CategoryType;
      title?: string;
      description?: string;
    }
  ) => {
    setFormType(type);
    setCategory(options?.category);
    setTitle(options?.title);
    setDescription(options?.description);
    setIsOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
    // Clear state after animation
    setTimeout(() => {
      setCategory(undefined);
      setTitle(undefined);
      setDescription(undefined);
    }, 200);
  };

  return {
    isOpen,
    formType,
    category,
    title,
    description,
    openForm,
    closeForm,
  };
}
