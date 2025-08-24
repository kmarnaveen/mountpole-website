import { Product, SearchResult } from '@/types/product';

export class StreamSearchEngine {
  private products: Product[] = [];
  private searchIndex: Map<string, Set<string>> = new Map();
  private observers: Set<(results: SearchResult[]) => void> = new Set();

  constructor(products: Product[]) {
    this.products = products;
    this.buildSearchIndex();
  }

  private buildSearchIndex() {
    this.products.forEach((product) => {
      const searchableText = this.getSearchableText(product).toLowerCase();
      const words = searchableText.split(/\s+/);
      
      words.forEach((word) => {
        if (word.length > 1) {
          // Create entries for partial matches
          for (let i = 1; i <= word.length; i++) {
            const partial = word.substring(0, i);
            if (!this.searchIndex.has(partial)) {
              this.searchIndex.set(partial, new Set());
            }
            this.searchIndex.get(partial)!.add(product.id);
          }
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

    // Exact name match (highest priority)
    if (product.name.toLowerCase().includes(normalizedQuery)) {
      score += 100;
      // Boost score for exact matches
      if (product.name.toLowerCase() === normalizedQuery) {
        score += 50;
      }
      // Boost score for matches at the beginning
      if (product.name.toLowerCase().startsWith(normalizedQuery)) {
        score += 30;
      }
    }

    // Brand match
    if (product.brand.toLowerCase().includes(normalizedQuery)) {
      score += 80;
      if (product.brand.toLowerCase().startsWith(normalizedQuery)) {
        score += 20;
      }
    }

    // Category match
    if (product.category.toLowerCase().includes(normalizedQuery)) {
      score += 60;
    }

    // Description match
    if (product.description.toLowerCase().includes(normalizedQuery)) {
      score += 40;
    }

    // Features match
    if (product.features?.some(feature => feature.toLowerCase().includes(normalizedQuery))) {
      score += 30;
    }

    // Tags match
    if (product.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))) {
      score += 20;
    }

    // SKU match
    if (product.sku?.toLowerCase().includes(normalizedQuery)) {
      score += 50;
    }

    return score;
  }

  public streamSearch(query: string, limit: number = 10): SearchResult[] {
    if (!query.trim()) {
      return [];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const candidateIds = new Set<string>();

    // Get candidates from search index
    const queryWords = normalizedQuery.split(/\s+/);
    queryWords.forEach(word => {
      if (this.searchIndex.has(word)) {
        this.searchIndex.get(word)!.forEach(id => candidateIds.add(id));
      }
      
      // Also check partial matches
      for (const [indexedWord, productIds] of this.searchIndex.entries()) {
        if (indexedWord.includes(word) || word.includes(indexedWord)) {
          productIds.forEach(id => candidateIds.add(id));
        }
      }
    });

    // Score and filter products
    const results: SearchResult[] = [];
    candidateIds.forEach(id => {
      const product = this.products.find(p => p.id === id);
      if (product) {
        const score = this.calculateRelevanceScore(product, normalizedQuery);
        if (score > 0) {
          results.push({
            ...product,
            relevanceScore: score,
            matchedFields: this.getMatchedFields(product, normalizedQuery),
          });
        }
      }
    });

    // Sort by relevance and limit results
    return results
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit);
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

  public getInstantSuggestions(query: string, limit: number = 5): string[] {
    if (!query.trim()) {
      return ['iPhone', 'Samsung', 'iPad', 'Galaxy', 'MacBook'];
    }

    const normalizedQuery = query.toLowerCase().trim();
    const suggestions = new Set<string>();

    // Add brand suggestions
    this.products.forEach(product => {
      if (product.brand.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.brand);
      }
      if (product.name.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.name);
      }
      if (product.category.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(product.category);
      }
    });

    // Add popular search terms that match
    const popularTerms = [
      'iPhone 15', 'iPhone 16', 'Samsung Galaxy', 'iPad Pro', 'MacBook Air',
      'Galaxy S24', 'Pixel 9', 'Apple Watch', 'AirPods', 'Galaxy Tab'
    ];
    
    popularTerms.forEach(term => {
      if (term.toLowerCase().includes(normalizedQuery)) {
        suggestions.add(term);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }
}
