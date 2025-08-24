export interface Product {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  salePrice?: number | null;
  currency: string;
  description: string;
  images: string[];
  specifications?: any; // Allow flexible specifications structure
  features?: string[];
  inStock: boolean;
  stockQuantity?: number;
  variants?: Array<{
    size?: string;
    band?: string;
    colors?: string[];
    storage?: string;
  }>;
  sku?: string;
  tags?: string[];
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

export interface SearchResult extends Product {
  relevanceScore: number;
  matchedFields: string[];
}
