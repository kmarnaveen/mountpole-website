"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Clock, ArrowRight, X } from "lucide-react";
import { useStreamSearch } from "@/hooks/useStreamSearch";
import { Product } from "@/types/product";

interface StreamSearchProps {
  products: Product[];
  placeholder?: string;
  className?: string;
  onSelectResult?: (productId: string) => void;
  maxResults?: number;
}

export const StreamSearch: React.FC<StreamSearchProps> = ({
  products,
  placeholder = "Search products...",
  className = "",
  onSelectResult,
  maxResults = 8,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { query, setQuery, results, suggestions, isLoading, hasResults } =
    useStreamSearch(products, {
      maxResults,
      debounceMs: 100,
      minQueryLength: 1,
    });

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(true);
  };

  const handleInputFocus = () => {
    setIsOpen(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    router.push(`/search?q=${encodeURIComponent(suggestion)}`);
    setIsOpen(false);
  };

  const handleResultClick = (productId: string) => {
    if (onSelectResult) {
      onSelectResult(productId);
    } else {
      router.push(`/product/${productId}`);
    }
    setIsOpen(false);
  };

  const handleViewAllResults = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleViewAllResults();
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          ref={inputRef}
          type="search"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="pl-10 pr-4 w-full"
        />
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 md:max-h-96 overflow-hidden"
        >
          {/* Loading State */}
          {isLoading && (
            <div className="p-3 md:p-4 text-center">
              <div className="animate-spin h-3 w-3 md:h-4 md:w-4 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-1 md:mb-2"></div>
              <p className="text-xs md:text-sm text-gray-500">Searching...</p>
            </div>
          )}

          {/* Results */}
          {!isLoading && hasResults && (
            <div className="max-h-56 md:max-h-64 overflow-y-auto">
              <div className="p-1.5 md:p-2 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    Products
                  </span>
                  <span className="text-xs text-gray-500">
                    {results.length} found
                  </span>
                </div>
              </div>
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleResultClick(product.id)}
                  className="w-full p-2 md:p-3 hover:bg-gray-50 border-b last:border-b-0 text-left transition-colors group"
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-4 h-4 md:w-6 md:h-6 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                        <p className="font-medium text-xs md:text-sm text-gray-900 truncate">
                          {highlightMatch(product.name, query)}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {product.brand}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {product.category}
                      </p>
                    </div>
                    <ArrowRight className="h-3 w-3 md:h-4 md:w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </button>
              ))}

              {/* View All Results */}
              {query.trim() && (
                <button
                  onClick={handleViewAllResults}
                  className="w-full p-2 md:p-3 bg-blue-50 hover:bg-blue-100 border-t text-left transition-colors"
                >
                  <div className="flex items-center justify-center gap-1.5 md:gap-2 text-blue-600 font-medium">
                    <Search className="h-3 w-3 md:h-4 md:w-4" />
                    <span className="text-xs md:text-sm">
                      View all results for &quot;{query}&quot;
                    </span>
                  </div>
                </button>
              )}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query.trim() && !hasResults && (
            <div className="p-3 md:p-4 text-center">
              <Search className="h-6 w-6 md:h-8 md:w-8 text-gray-300 mx-auto mb-1 md:mb-2" />
              <p className="text-xs md:text-sm text-gray-500 mb-1 md:mb-2">
                No products found
              </p>
              <p className="text-xs text-gray-400">
                Try a different search term
              </p>
            </div>
          )}

          {/* Suggestions */}
          {!isLoading &&
            (!query.trim() || !hasResults) &&
            suggestions.length > 0 && (
              <div className="p-1.5 md:p-2">
                <div className="flex items-center gap-1.5 md:gap-2 mb-1.5 md:mb-2 px-1 md:px-2">
                  <TrendingUp className="h-3 w-3 text-gray-400" />
                  <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                    {query.trim() ? "Suggestions" : "Popular"}
                  </span>
                </div>
                <div className="space-y-0.5 md:space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full p-1.5 md:p-2 hover:bg-gray-50 rounded text-left transition-colors group"
                    >
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <Clock className="h-3 w-3 text-gray-400" />
                        <span className="text-xs md:text-sm text-gray-700 group-hover:text-gray-900">
                          {suggestion}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};
