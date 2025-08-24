import { Product } from '@/types/product';

export interface SearchResult {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  salePrice?: number;
  description: string;
  images: string[];
  inStock: boolean;
  relevanceScore: number;
  matchedFields: string[];
}

export interface SearchFilters {
  category?: string;
  brand?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  inStock?: boolean;
}

export interface SearchOptions {
  query: string;
  filters?: SearchFilters;
  sortBy?: 'relevance' | 'price-low' | 'price-high' | 'name' | 'brand';
  limit?: number;
  offset?: number;
}

export class SearchEngine {
  private products: Product[] = [];
  private searchIndex: Map<string, Set<string>> = new Map();

  constructor(products: Product[]) {
    this.products = products;
    this.buildSearchIndex();
  }

  private buildSearchIndex() {
    this.products.forEach((product) => {
      const searchableText = this.getSearchableText(product).toLowerCase();
      const words = searchableText.split(/\s+/);
      
      words.forEach((word) => {
        if (word.length > 2) { // Only index words longer than 2 characters
          if (!this.searchIndex.has(word)) {
            this.searchIndex.set(word, new Set());
          }
          this.searchIndex.get(word)!.add(product.id);
        }
      });
    });
  }

  private getSearchableText(product: Product): string {
    const searchableFields = [
      product.name,
      product.brand,
      product.category,
      product.description,
      ...(product.tags || []),
      ...(product.features || []),
      product.sku || '',
    ];

    return searchableFields.join(' ');
  }

  private calculateRelevanceScore(product: Product, query: string): number {
    const normalizedQuery = query.toLowerCase().trim();
    const searchableText = this.getSearchableText(product).toLowerCase();
    
    let score = 0;
    const matchedFields: string[] = [];

    // Exact name match (highest priority)
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      score += 100;
      matchedFields.push('name');
    }

    // Brand match
    if (product.brand.toLowerCase().includes(normalizedQuery)) {
      score += 80;
      matchedFields.push('brand');
    }

    // Category match
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      score += 60;
      matchedFields.push('category');
    }

    // Description match
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      score += 40;
      matchedFields.push('description');
    }

    // Features match
    if (product.features?.some(feature => feature.toLowerCase().includes(normalizedQuery))) {
      score += 30;
      matchedFields.push('features');
    }

    // Tags match
    if (product.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      score += 20;
      matchedFields.push('tags');
    }

    // SKU match
    if (product.sku?.toLowerCase().includes(normalizedQuery)) {
      score += 50;
      matchedFields.push('sku');
    }

    // Partial word matches
    const queryWords = normalizedQuery.split(/\s+/);
    queryWords.forEach(word => {
      if (word.length > 2 && searchableText.includes(word)) {
        score += 10;
      }
    });

    return score;
  }

  private applyFilters(products: Product[], filters?: SearchFilters): Product[] {
    if (!filters) return products;

    return products.filter(product => {
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }

      if (filters.priceRange) {
        const price = product.salePrice ?? product.price;
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      if (filters.inStock !== undefined && product.inStock !== filters.inStock) {
        return false;
      }

      return true;
    });
  }

  private sortResults(results: SearchResult[], sortBy: string): SearchResult[] {
    switch (sortBy) {
      case 'price-low':
        return results.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      case 'price-high':
        return results.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      case 'name':
        return results.sort((a, b) => a.name.localeCompare(b.name));
      case 'brand':
        return results.sort((a, b) => a.brand.localeCompare(b.brand));
      case 'relevance':
      default:
        return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
    }
  }

  search(options: SearchOptions): {
    results: SearchResult[];
    total: number;
    hasMore: boolean;
    suggestions: string[];
  } {
    const { query, filters, sortBy = 'relevance', limit = 20, offset = 0 } = options;
    
    if (!query.trim()) {
      // Return all products if no query
      const filteredProducts = this.applyFilters(this.products, filters);
      const results = filteredProducts.map(product => ({
        ...product,
        relevanceScore: 0,
        matchedFields: [],
      })) as SearchResult[];
      
      const sortedResults = this.sortResults(results, sortBy);
      const paginatedResults = sortedResults.slice(offset, offset + limit);
      
      return {
        results: paginatedResults,
        total: sortedResults.length,
        hasMore: offset + limit < sortedResults.length,
        suggestions: [],
      };
    }

    // Search with query
    const relevantProducts = this.products
      .map(product => ({
        product,
        score: this.calculateRelevanceScore(product, query),
        matchedFields: this.getMatchedFields(product, query),
      }))
      .filter(item => item.score > 0);

    const filteredProducts = this.applyFilters(
      relevantProducts.map(item => item.product),
      filters
    );

    const results = relevantProducts
      .filter(item => filteredProducts.includes(item.product))
      .map(item => ({
        ...item.product,
        relevanceScore: item.score,
        matchedFields: item.matchedFields,
      })) as SearchResult[];

    const sortedResults = this.sortResults(results, sortBy);
    const paginatedResults = sortedResults.slice(offset, offset + limit);

    return {
      results: paginatedResults,
      total: sortedResults.length,
      hasMore: offset + limit < sortedResults.length,
      suggestions: this.generateSuggestions(query),
    };
  }

  private getMatchedFields(product: Product, query: string): string[] {
    const normalizedQuery = query.toLowerCase();
    const matchedFields: string[] = [];

    if (product.name.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('name');
    }
    if (product.brand.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('brand');
    }
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('category');
    }
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      matchedFields.push('description');
    }

    return matchedFields;
  }

  private generateSuggestions(query: string): string[] {
    const normalizedQuery = query.toLowerCase();
    const suggestions: Set<string> = new Set();

    // Add brand suggestions
    this.products.forEach(product => {
      if (product.brand.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.brand);
      }
      if (product.category.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.category);
      }
    });

    // Add popular search terms based on partial matches
    const popularTerms = ['iPhone', 'Samsung', 'iPad', 'MacBook', 'AirPods', 'Galaxy', 'Watch'];
    popularTerms.forEach(term => {
      if (term.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, 5);
  }

  getCategories(): string[] {
    return [...new Set(this.products.map(p => p.category))];
  }

  getBrands(): string[] {
    return [...new Set(this.products.map(p => p.brand))];
  }

  getPriceRange(): { min: number; max: number } {
    const prices = this.products.map(p => p.salePrice ?? p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
    };
  }
}
