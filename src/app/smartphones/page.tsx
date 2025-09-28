"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useModals } from "@/components/modals/ModalProvider";
import { Smartphone, Zap, Camera, Battery, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/skeletons/ProductSkeleton";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import {
  OrganizationSchema,
  WebsiteSchema,
} from "@/components/seo/StructuredData";
import {
  Pagination,
  usePagination,
  PaginationInfo,
} from "@/components/ui/pagination";
import productsData from "../../../products.json";

export default function SmartphonesPage() {
  const { openQuoteModal } = useModals()
  const [isLoading, setIsLoading] = useState(true);

  // Filter smartphones from the products data
  const smartphones = productsData.products.filter(
    (product: { category: string }) => product.category === "Smartphones"
  );

  // Pagination logic
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedSmartphones,
    setCurrentPage,
    totalItems,
    startIndex,
    endIndex,
  } = usePagination(smartphones, 9); // 9 items per page for 3x3 grid

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Fallback Background Image */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 z-0"></div>

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
            src="https://storage.googleapis.com/mannequin/blobs/e2c407f1-a670-43f7-9eba-3417a2926f49.webm"
            type="video/webm"
          />
        </video>

        {/* Content Overlay with Gemini-style styling */}
        <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          {/* Subtle background for all content */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20 shadow-2xl">
            {/* Gemini-style gradient text */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 md:mb-8 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Mobile Solutions
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-light mb-6 md:mb-8">
              Discover MountPole&apos;s comprehensive smartphone collection from
              trusted brands like Apple, Samsung, and Xiaomi. Get wholesale
              pricing and authentic products with global distribution services.
            </p>

            <div className="mt-6 md:mt-8">
              <button
                onClick={() => {
                  const productsSection = document.getElementById(
                    "smartphones-section"
                  );
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105"
              >
                Get Wholesale Pricing
              </button>
            </div>
          </div>
        </div>

        {/* Minimalist scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-white to-transparent rounded-full"></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-6 md:py-8 px-4 border-b bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="default"
                className="cursor-pointer hover:bg-blue-100 text-xs sm:text-sm"
              >
                All Brands
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
              >
                Apple
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
              >
                Samsung
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
              >
                Google
              </Badge>
            </div>
            <div className="flex gap-2 text-xs sm:text-sm text-gray-600">
              <span>Latest Models</span>
              <span>•</span>
              <span>In Stock</span>
              <span>•</span>
              <span className="hidden sm:inline">Fast Shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="smartphones-section" className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            Enterprise Mobile Devices
          </h2>

          {/* Results Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
            <PaginationInfo
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              startIndex={startIndex}
              endIndex={endIndex}
            />
            <div className="text-sm text-gray-600">
              {totalItems} smartphone{totalItems !== 1 ? "s" : ""} available
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8">
                {paginatedSmartphones.map(
                  (phone: (typeof productsData.products)[0]) => (
                    <Card
                      key={phone.id}
                      className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                    >
                      <CardHeader className="pb-4">
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                          {phone.images && phone.images[0] ? (
                            <Image
                              src={phone.images[0]}
                              alt={phone.name}
                              width={200}
                              height={267}
                              className="w-full h-full object-contain p-4"
                            />
                          ) : (
                            <Smartphone className="h-16 w-16 text-gray-400" />
                          )}
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-cyan-500">{phone.brand}</Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                          {phone.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {/* Action Buttons */}
                        <div className="pt-4 space-y-2">
                          <div className="flex gap-2">
                            <Link
                              href={`/product/${phone.id}`}
                              className="flex-1"
                            >
                              <Button className="w-full" variant="outline">
                                View Details
                              </Button>
                            </Link>
                            <Button
                              onClick={() =>
                                openQuoteModal({
                                  productId: phone.id,
                                  productName: phone.name,
                                  productContext: "smartphones",
                                  quoteType: "bulk",
                                })
                              }
                              className="flex-1 w-full bg-blue-600 hover:bg-blue-700"
                            >
                              Request Quote
                            </Button>
                          </div>
                          <p className="text-xs text-gray-500 text-center">
                            Volume pricing available
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )
                )}
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
    </div>
  );
}
