"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Search,
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Star,
  ShoppingCart,
  Eye,
  X,
  ChevronDown,
  TrendingUp,
} from "lucide-react";
import { SearchEngine, SearchOptions, SearchFilters } from "@/lib/search";
import { Product } from "@/types/product";
import productsData from "../../../products.json";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Search filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Search engine instance
  const searchEngine = useMemo(() => {
    return new SearchEngine(productsData.products as Product[]);
  }, []);

  // Available filters
  const categories = useMemo(
    () => searchEngine.getCategories(),
    [searchEngine]
  );
  const brands = useMemo(() => searchEngine.getBrands(), [searchEngine]);
  const priceRangeData = useMemo(
    () => searchEngine.getPriceRange(),
    [searchEngine]
  );

  // Search results
  const searchResults = useMemo(() => {
    const filters: SearchFilters = {
      ...(selectedCategory &&
        selectedCategory !== "all" && { category: selectedCategory }),
      ...(selectedBrand && selectedBrand !== "all" && { brand: selectedBrand }),
      priceRange: { min: priceRange[0], max: priceRange[1] },
      ...(inStockOnly && { inStock: true }),
    };

    const options: SearchOptions = {
      query: searchQuery,
      filters,
      sortBy: sortBy as any,
      limit: 50,
    };

    return searchEngine.search(options);
  }, [
    searchQuery,
    selectedCategory,
    selectedBrand,
    priceRange,
    inStockOnly,
    sortBy,
    searchEngine,
  ]);

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (selectedCategory && selectedCategory !== "all")
      params.set("category", selectedCategory);
    if (selectedBrand && selectedBrand !== "all")
      params.set("brand", selectedBrand);
    if (sortBy !== "relevance") params.set("sort", sortBy);

    const newUrl = params.toString()
      ? `/search?${params.toString()}`
      : "/search";
    router.replace(newUrl, { scroll: false });
  }, [searchQuery, selectedCategory, selectedBrand, sortBy, router]);

  // Initialize filters from URL
  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || "all");
    setSelectedBrand(searchParams.get("brand") || "all");
    setSortBy(searchParams.get("sort") || "relevance");
  }, [searchParams]);

  // Initialize price range
  useEffect(() => {
    setPriceRange([priceRangeData.min, priceRangeData.max]);
  }, [priceRangeData]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the effect above
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange([priceRangeData.min, priceRangeData.max]);
    setInStockOnly(false);
    setSortBy("relevance");
  };

  const formatPrice = (price: number, salePrice?: number | null) => {
    if (salePrice) {
      return (
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-red-600">${salePrice}</span>
          <span className="text-sm text-gray-500 line-through">${price}</span>
        </div>
      );
    }
    return <span className="text-lg font-bold text-gray-900">${price}</span>;
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
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 md:py-6">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 md:h-5 md:w-5" />
              <Input
                type="search"
                placeholder="Search for products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 md:pl-12 pr-4 py-3 md:py-4 text-base md:text-lg w-full border-2 border-gray-200 focus:border-blue-500 rounded-xl"
              />
            </div>
          </form>

          {/* Search Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 md:mt-4 text-xs sm:text-sm text-gray-600 gap-2">
            <div>
              {searchQuery && (
                <span>
                  {searchResults.total} results for "{searchQuery}"
                </span>
              )}
              {!searchQuery && (
                <span>{searchResults.total} products available</span>
              )}
            </div>

            {/* Suggestions */}
            {searchResults.suggestions.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs">Suggestions:</span>
                {searchResults.suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs h-5 sm:h-6 px-2"
                    onClick={() => setSearchQuery(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 md:py-6">
        <div className="flex gap-3 md:gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-56 md:w-64 bg-white rounded-xl p-4 md:p-6 h-fit sticky top-20 md:top-24`}
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-gray-900">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs md:text-sm text-blue-600"
              >
                Clear All
              </Button>
            </div>

            {/* Category Filter */}
            <div className="mb-4 md:mb-6">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="text-xs md:text-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div className="mb-4 md:mb-6">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                Brand
              </label>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="text-xs md:text-sm">
                  <SelectValue placeholder="All Brands" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stock Filter */}
            <div className="mb-4 md:mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={inStockOnly}
                  onCheckedChange={setInStockOnly as any}
                  className="h-4 w-4"
                />
                <label
                  htmlFor="inStock"
                  className="text-xs md:text-sm font-medium text-gray-700"
                >
                  In Stock Only
                </label>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 bg-white rounded-xl p-3 md:p-4 gap-3 sm:gap-0">
              <div className="flex items-center gap-2 md:gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden text-xs md:text-sm"
                >
                  <Filter className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                  Filters
                </Button>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="p-2"
                  >
                    <Grid3X3 className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="p-2"
                  >
                    <List className="h-3 w-3 md:h-4 md:w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 md:w-48 text-xs md:text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Best Match</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="brand">Brand A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Loading State */}
            {!isMounted && (
              <div className="text-center py-16 bg-white rounded-xl">
                <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-600">Loading search...</p>
              </div>
            )}

            {/* No Results */}
            {isMounted && searchResults.total === 0 && (
              <div className="text-center py-8 md:py-16 bg-white rounded-xl">
                <Search className="h-12 w-12 md:h-16 md:w-16 text-gray-300 mx-auto mb-3 md:mb-4" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  No results found
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6 px-4">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <Button onClick={clearFilters} size="sm" className="md:size-default">Clear Filters</Button>
              </div>
            )}

            {/* Results Grid/List */}
            {isMounted && searchResults.total > 0 && (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6"
                    : "space-y-3 md:space-y-4"
                }
              >
                {searchResults.results.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition-shadow border-0 shadow-md"
                  >
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative overflow-hidden rounded-t-xl">
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                              <div className="h-8 w-8 md:h-16 md:w-16 mx-auto mb-1 md:mb-2 bg-gray-200 rounded"></div>
                              <p className="text-xs md:text-sm">Product Image</p>
                            </div>
                          </div>
                          {!product.inStock && (
                            <Badge className="absolute top-1 md:top-2 right-1 md:right-2 bg-red-500 text-xs">
                              Out of Stock
                            </Badge>
                          )}
                          {product.salePrice && (
                            <Badge className="absolute top-1 md:top-2 left-1 md:left-2 bg-green-500 text-xs">
                              Sale
                            </Badge>
                          )}
                        </div>
                        <CardHeader className="pb-1 md:pb-2 px-3 md:px-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {product.brand}
                              </p>
                              <CardTitle className="text-xs md:text-sm line-clamp-2 leading-tight">
                                {highlightMatch(product.name, searchQuery)}
                              </CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 px-3 md:px-6 pb-3 md:pb-6">
                          <div className="flex gap-1 md:gap-2">
                            <Link
                              href={`/product/${product.id}`}
                              className="flex-1"
                            >
                              <Button size="sm" className="w-full text-xs md:text-sm h-7 md:h-9">
                                <Eye className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                                <span className="hidden sm:inline">View</span>
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={!product.inStock}
                              className="h-7 md:h-9 px-2 md:px-3"
                            >
                              <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <div className="flex gap-3 md:gap-4 p-3 md:p-4">
                        <div className="w-16 h-16 md:w-24 md:h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                          <div className="text-gray-400 text-center">
                            <div className="h-6 w-6 md:h-8 md:w-8 mx-auto mb-1 bg-gray-200 rounded"></div>
                            <p className="text-xs">Image</p>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1 md:mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 uppercase tracking-wide">
                                {product.brand} • {product.category}
                              </p>
                              <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2">
                                {highlightMatch(product.name, searchQuery)}
                              </h3>
                            </div>
                          </div>
                          <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2 md:mb-3">
                            {highlightMatch(product.description, searchQuery)}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1 md:gap-2 flex-wrap">
                              <Badge variant="secondary" className="text-xs">
                                {product.category}
                              </Badge>
                              {!product.inStock && (
                                <Badge variant="destructive" className="text-xs">
                                  Out of Stock
                                </Badge>
                              )}
                            </div>
                            <div className="flex gap-1 md:gap-2">
                              <Link href={`/product/${product.id}`}>
                                <Button size="sm" className="text-xs md:text-sm h-7 md:h-9">
                                  <span className="hidden sm:inline">View Details</span>
                                  <span className="sm:hidden">View</span>
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
