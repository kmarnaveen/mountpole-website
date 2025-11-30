"use client";

import { useState, useEffect } from "react";
import { useModals } from '@/components/modals/ModalProvider';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppleLogo, SamsungLogo, GoogleLogo } from "@/components/BrandLogos";
import {
  Tablet,
  Battery,
  Wifi,
  Camera,
  Cpu,
  HardDrive,
  Paintbrush,
  BookOpen,
  Music,
  Video,
  Gamepad2,
  Pencil,
  Star,
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

export default function TabletsPage() {
  const { openQuoteModal } = useModals();
  const [isLoading, setIsLoading] = useState(true);

  // Filter tablets from the products data
  const tablets = productsData.products.filter(
    (product: (typeof productsData.products)[0]) =>
      product.category === "Tablets"
  );

  // Pagination logic
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedTablets,
    setCurrentPage,
    totalItems,
    startIndex,
    endIndex,
  } = usePagination(tablets, 8); // 8 items per page

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Pro", "Standard", "Plus", "Ultra"];
  const brands = ["All", "Apple", "Samsung", "Google"];

  const useCases = [
    {
      icon: Paintbrush,
      title: "Creative Work",
      description:
        "Digital art, photo editing, and design with precision stylus support",
    },
    {
      icon: BookOpen,
      title: "Reading & Learning",
      description: "E-books, digital magazines, and educational content",
    },
    {
      icon: Video,
      title: "Entertainment",
      description: "Streaming, gaming, and multimedia consumption",
    },
    {
      icon: Pencil,
      title: "Note Taking",
      description: "Digital notes, sketching, and handwriting recognition",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
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
            src="https://www.apple.com/assets-www/en_WW/ipad/welcome/4e825557d_large_2x.mp4"
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
              Business Tablets
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-light mb-6 md:mb-8">
              Enhance workplace productivity with professional tablets from
              Apple, Microsoft, and Samsung. Perfect for creative teams, field
              work, and executive presentations.
            </p>

            <div className="mt-6 md:mt-8">
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("tablets-section");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                Get Business Pricing
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 md:py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-start sm:items-center">
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700 text-sm md:text-base">
                Categories:
              </span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 text-xs sm:text-sm"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700 text-sm md:text-base">
                Brands:
              </span>
              {brands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100 text-xs sm:text-sm"
                >
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="tablets-section" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Tablets
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
              {totalItems} tablet{totalItems !== 1 ? "s" : ""} available
            </div>
          </div>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-8">
                {paginatedTablets.map((tablet) => (
                  <Card
                    key={tablet.id}
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            tablet.images?.[0] ||
                            "https://i.pinimg.com/1200x/6d/c4/0b/6dc40bce4f8fae6c1a44dcb7d221561f.jpg"
                          }
                          alt={tablet.name}
                          width={200}
                          height={192}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-blue-600">
                        {tablet.category}
                      </Badge>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">
                          {tablet.brand}
                        </span>
                      </div>
                      <CardTitle className="text-lg">{tablet.name}</CardTitle>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex gap-2 mt-4">
                          <Link
                            href={`/product/${tablet.id}`}
                            className="flex-1"
                          >
                            <Button className="w-full" variant="outline">
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() =>
                              openQuoteModal({
                                productId: tablet.id,
                                productName: tablet.name,
                                productContext: "tablets",
                                quoteType: "bulk",
                              })
                            }
                            className="flex-1 w-full bg-blue-600 hover:bg-blue-700"
                          >
                            Request Quote
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          Enterprise pricing available
                        </p>
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

      {/* Use Cases */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Perfect for Every Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <useCase.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose These Tablets?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Battery className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <CardTitle>All-Day Battery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Up to 10+ hours of video playback and productivity tasks. Fast
                  charging gets you back to full power quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Wifi className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>5G & Wi-Fi 6</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay connected anywhere with blazing-fast cellular and Wi-Fi
                  speeds. Perfect for remote work and streaming.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Gamepad2 className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Desktop-Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Powerful processors handle demanding apps, multitasking,
                  gaming, and creative work with ease.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
