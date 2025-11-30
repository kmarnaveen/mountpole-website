"use client";

import { useState, useEffect } from "react";
import { useModals } from "@/components/modals/ModalProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GamepadIcon,
  Palette,
  Eye,
  Settings,
  Wifi,
  RefreshCw,
  Maximize,
  Sun,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/skeletons/ProductSkeleton";
import { Product } from "@/types/product";
import {
  Pagination,
  usePagination,
  PaginationInfo,
} from "@/components/ui/pagination";
import productsData from "../../../products.json";

export default function GamingPage() {
  const { openQuoteModal } = useModals();
  const [isLoading, setIsLoading] = useState(true);

  // Filter gaming products from the products data
  const gamingProducts = productsData.products.filter(
    (product: { category: string }) => product.category === "Gaming"
  );

  // Pagination logic
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedGamingProducts,
    setCurrentPage,
    totalItems,
    startIndex,
    endIndex,
  } = usePagination(gamingProducts, 9); // 9 items per page for 3x3 grid

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Professional", "Gaming", "Smart", "Pro"];
  const brands = ["All", "Apple", "Samsung", "Google"];

  const useCases = [
    {
      icon: Palette,
      title: "Creative Work",
    },
    {
      icon: GamepadIcon,
      title: "Gaming",
    },
    {
      icon: Settings,
      title: "Productivity",
    },
    {
      icon: Eye,
      title: "Entertainment",
    },
  ];

  const features = [
    {
      icon: Sun,
      title: "HDR Support",
    },
    {
      icon: RefreshCw,
      title: "High Refresh Rates",
    },
    {
      icon: Maximize,
      title: "Multiple Sizes",
    },
    {
      icon: Wifi,
      title: "Smart Connectivity",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 z-0"></div>

        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-5"
          onError={(e) => {
            // Hide video if it fails to load
            const target = e.target as HTMLVideoElement;
            target.style.display = "none";
          }}
        >
          <source
            src="https://images.samsung.com/is/content/samsung/p6pim/in/feature/165992144/in-feature-immerse-yourself-in-breathtaking-detail-545738799.mp4"
            type="video/mp4"
          />
        </video>

        {/* Content Overlay with Gemini-style styling */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Subtle background for all content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            {/* Gemini-style gradient text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
              Ultimate Gaming Experience
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-light mb-6 md:mb-8">
              Level up your gaming setup with cutting-edge gaming gear. Premium
              gaming products designed for performance, competition, and
              immersive entertainment experiences.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("products-section");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                Shop Gaming Gear
              </button>
              <Link href="/contact?type=business&category=gaming">
                <button className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 backdrop-blur-sm">
                  Get Gaming Quote
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Minimalist scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700">Categories:</span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-purple-100"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700">Brands:</span>
              {brands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products-section" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Gaming Products
          </h2>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {paginatedGamingProducts.map((product: Product) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            product.images?.[0] ||
                            "https://i.pinimg.com/1200x/6d/c4/0b/6dc40bce4f8fae6c1a44dcb7d221561f.jpg"
                          }
                          alt={product.name}
                          width={200}
                          height={192}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://i.pinimg.com/1200x/6d/c4/0b/6dc40bce4f8fae6c1a44dcb7d221561f.jpg";
                          }}
                        />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-purple-600">
                        {product.brand}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex flex-col gap-2">
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <Link href={`/product/${product.id}`}>
                            <Button className="w-full" variant="outline">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() =>
                              openQuoteModal({
                                productId: product.id,
                                productName: product.name,
                              })
                            }
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            Get Gaming Quote
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              )}

              <PaginationInfo
                currentPage={currentPage}
                totalPages={totalPages}
                startIndex={startIndex}
                endIndex={endIndex}
                totalItems={totalItems}
                className="mt-4 text-center"
              />
            </>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            Perfect for Every Gaming Style
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <useCase.icon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Size Comparison */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            Gaming Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  🎮
                </div>
                <CardTitle>Console Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Perfect for PlayStation, Xbox, and Nintendo gaming setups with
                  high-performance controllers and accessories.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Wireless Controllers</p>
                  <p>• Gaming Headsets</p>
                  <p>• Console Accessories</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  💻
                </div>
                <CardTitle>PC Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High-performance gaming keyboards, mice, and PC accessories
                  for competitive and casual gaming.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Mechanical Keyboards</p>
                  <p>• Gaming Mice</p>
                  <p>• RGB Accessories</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  📱
                </div>
                <CardTitle>Mobile Gaming</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Gaming smartphones and accessories designed for mobile gaming
                  enthusiasts and competitive players.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Gaming Phones</p>
                  <p>• Mobile Controllers</p>
                  <p>• Cooling Accessories</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Level Up Your Gaming Setup
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            From competitive esports to casual gaming, find the perfect gaming
            gear that matches your playstyle and enhances your gaming
            experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/gaming">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Shop Gaming Gear
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
