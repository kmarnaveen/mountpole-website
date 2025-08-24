import { useState, useEffect, useCallback, useMemo } from 'react';
import { StreamSearchEngine } from '@/lib/streamSearch';
import { Product, SearchResult } from '@/types/product';

interface UseStreamSearchOptions {
  debounceMs?: number;
  maxResults?: number;
  minQueryLength?: number;
}

interface UseStreamSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  suggestions: string[];
  isLoading: boolean;
  hasResults: boolean;
}

export const useStreamSearch = (
  products: Product[],
  options: UseStreamSearchOptions = {}
): UseStreamSearchReturn => {
  const {
    debounceMs = 150,
    maxResults = 10,
    minQueryLength = 1,
  } = options;

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Create search engine instance
  const searchEngine = useMemo(() => new StreamSearchEngine(products), [products]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setResults([]);
        setSuggestions(searchEngine.getInstantSuggestions(''));
        setIsLoading(false);
        return;
      }

      const searchResults = searchEngine.streamSearch(searchQuery, maxResults);
      const searchSuggestions = searchEngine.getInstantSuggestions(searchQuery);
      
      setResults(searchResults);
      setSuggestions(searchSuggestions);
      setIsLoading(false);
    }, debounceMs),
    [searchEngine, maxResults, minQueryLength]
  );

  // Effect to trigger search when query changes
  useEffect(() => {
    setIsLoading(query.length >= minQueryLength);
    debouncedSearch(query);
    
    // Cleanup function to cancel pending debounced calls
    return () => {
      debouncedSearch.cancel?.();
    };
  }, [query, debouncedSearch, minQueryLength]);

  // Initialize with popular suggestions
  useEffect(() => {
    setSuggestions(searchEngine.getInstantSuggestions(''));
  }, [searchEngine]);

  return {
    query,
    setQuery,
    results,
    suggestions,
    isLoading,
    hasResults: results.length > 0,
  };
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: NodeJS.Timeout | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), wait);
  }) as T & { cancel: () => void };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}
