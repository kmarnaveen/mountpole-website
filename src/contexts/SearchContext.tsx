"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchContextType {
  openSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};

interface SearchProviderProps {
  children: React.ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const router = useRouter();

  const openSearch = () => {
    router.push("/search");
  };

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        openSearch();
      }

      // Forward slash to focus search
      if (event.key === "/" && !event.ctrlKey && !event.metaKey) {
        const target = event.target as HTMLElement;
        // Don't trigger if user is typing in an input
        if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA" && !target.isContentEditable) {
          event.preventDefault();
          openSearch();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider value={{ openSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
