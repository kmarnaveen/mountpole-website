"use client";

import { useState, useEffect } from "react";
import { useModals } from '@/components/modals/ModalProvider';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Watch,
  Heart,
  Activity,
  Smartphone,
  Wifi,
  Battery,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/skeletons/ProductSkeleton";
import {
  Pagination,
  usePagination,
  PaginationInfo,
} from "@/components/ui/pagination";
import productsData from "../../../products.json";

export default function WearablesPage() {
  const { openQuoteModal } = useModals()
  const [isLoading, setIsLoading] = useState(true);

  // Filter wearables from the products data
  const wearables = productsData.products.filter(
    (product: { category: string }) => product.category === "Wearables"
  );

  // Pagination logic
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedWearables,
    totalItems,
    startIndex,
    endIndex,
    setCurrentPage,
  } = usePagination(wearables, 8); // 8 items per page

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Video Hero Section with Gemini-style design */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden flex items-center">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-10"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => {
            // Hide video and show gradient fallback if video fails to load
            e.currentTarget.style.display = "none";
          }}
        >
          <source
            src="https://www.apple.com/105/media/ww/watch/2024/f0b51c31-e8a5-44d7-b23d-51bd2858454a/anim/hero/large_2x.mp4"
            type="video/mp4"
          />
        </video>

        {/* Fallback gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 z-5"></div>

        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40 z-15"></div>

        {/* Content Overlay with Gemini-style styling */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Subtle background for all content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            {/* Gemini-style gradient text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent leading-tight">
              Wearable Technology for Business
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-light mb-6 md:mb-8">
              Empower your workforce with enterprise-grade wearables. Health
              monitoring, productivity tracking, and seamless integration for
              your business ecosystem.
            </p>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("wearables-section");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                Explore Solutions
              </button>
              <Link href="/contact?type=business&category=wearables">
                <button className="bg-white/20 hover:bg-white/30 text-white border border-white/40 px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 backdrop-blur-sm">
                  Get Enterprise Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="wearables-section" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Enterprise Wearable Solutions
          </h2>

          {/* Results Info */}
          <div className="flex justify-between items-center mb-8">
            <PaginationInfo
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
            />
            <div className="text-sm text-gray-600">
              {totalItems} wearable{totalItems !== 1 ? "s" : ""} available
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8">
                {paginatedWearables.map((product: any) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border border-gray-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            product.images?.[0] ||
                            "https://i.pinimg.com/1200x/6d/c4/0b/6dc40bce4f8fae6c1a44dcb7d221561f.jpg"
                          }
                          alt={product.name}
                          width={250}
                          height={250}
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {product.brand}
                          </Badge>
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {product.description || "Smart wearable technology"}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        {/* Specifications */}
                        {product.specifications && (
                          <div className="space-y-2">
                            {product.specifications.battery && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Battery:</span>
                                <span className="font-medium">
                                  {product.specifications.battery}
                                </span>
                              </div>
                            )}
                            {product.specifications.waterResistance && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500">
                                  Water Resistance:
                                </span>
                                <span className="font-medium">
                                  {product.specifications.waterResistance}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Features */}
                        <div className="flex flex-wrap gap-1">
                          {product.features
                            ?.slice(0, 3)
                            .map((feature: string, index: number) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs text-purple-600"
                              >
                                {feature}
                              </Badge>
                            ))}
                        </div>

                        {/* Stock Info */}
                        {product.stockQuantity && product.inStock && (
                          <div className="text-xs text-gray-500">
                            {product.stockQuantity} units available
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <Link href={`/product/${product.id}`}>
                            <Button className="w-full" variant="outline">
                              View Details
                            </Button>
                          </Link>
                          <Button 
                            onClick={() => openQuoteModal({
                              productId: product.id,
                              productName: product.name,
                              category: 'wearables',
                              type: 'bulk'
                            })}
                            className="w-full bg-purple-600 hover:bg-purple-700"
                          >
                            Request Quote
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  className="mb-8"
                />
              </div>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Wearable Technology Benefits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h3 className="font-semibold mb-2">Health Monitoring</h3>
              <p className="text-gray-600">
                Track your heart rate, sleep patterns, and fitness goals with
                advanced sensors.
              </p>
            </div>
            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Fitness Tracking</h3>
              <p className="text-gray-600">
                Monitor your daily activities, workouts, and calories burned.
              </p>
            </div>
            <div className="text-center">
              <Smartphone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Smart Connectivity</h3>
              <p className="text-gray-600">
                Stay connected with notifications, calls, and messaging on your
                wrist.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
