"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppleLogo, SamsungLogo, GoogleLogo } from "@/components/BrandLogos";
import {
  Monitor,
  Zap,
  Palette,
  GamepadIcon,
  Eye,
  Settings,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw,
  Maximize,
  Sun,
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

export default function MonitorsPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Filter monitors from the products data
  const monitors = productsData.products.filter(
    (product: { category: string }) => product.category === "Monitors"
  );

  // Pagination logic
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedMonitors,
    setCurrentPage,
    totalItems,
    startIndex,
    endIndex,
  } = usePagination(monitors, 9); // 9 items per page for 3x3 grid

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
      description:
        "Color-accurate displays for photo editing, video production, and design",
    },
    {
      icon: GamepadIcon,
      title: "Gaming",
      description: "High refresh rates and low latency for competitive gaming",
    },
    {
      icon: Settings,
      title: "Productivity",
      description:
        "Large workspace for multitasking and professional applications",
    },
    {
      icon: Eye,
      title: "Entertainment",
      description: "Immersive viewing experience for movies and streaming",
    },
  ];

  const features = [
    {
      icon: Sun,
      title: "HDR Support",
      description:
        "True-to-life colors and contrast with HDR10+ and Dolby Vision support",
    },
    {
      icon: RefreshCw,
      title: "High Refresh Rates",
      description: "Smooth motion with refresh rates up to 240Hz for gaming",
    },
    {
      icon: Maximize,
      title: "Multiple Sizes",
      description: "From 27-inch to 49-inch ultrawide for every workspace",
    },
    {
      icon: Wifi,
      title: "Smart Connectivity",
      description: "USB-C, Thunderbolt, and wireless connectivity options",
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
              Monitors
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed font-light mb-6 md:mb-8">
              Experience stunning visuals with professional displays from Apple,
              Samsung, and Google. Perfect for creative work, gaming,
              productivity, and entertainment.
            </p>

            <div className="mt-6 md:mt-8">
              <button
                onClick={() => {
                  const productsSection =
                    document.getElementById("products-section");
                  productsSection?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 md:py-4 rounded-full font-semibold text-base md:text-lg transition-all duration-300 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105"
              >
                Explore Monitors
              </button>
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
            Featured Monitors
          </h2>

          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                {paginatedMonitors.map((monitor: any) => (
                  <Card
                    key={monitor.id}
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative">
                      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            monitor.images?.[0] ||
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZTJlOGYwIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjIxMCIgcj0iMjAiIGZpbGw9IiNjYmQ1ZTEiLz48cGF0aCBkPSJNMTYwIDI0MGw0MC00MCA2MCA2MCA0MC00MHY4MEgxNjB2LTYweiIgZmlsbD0iI2NiZDVlMSIvPjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4="
                          }
                          alt={monitor.name}
                          width={200}
                          height={192}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZTJlOGYwIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjIxMCIgcj0iMjAiIGZpbGw9IiNjYmQ1ZTEiLz48cGF0aCBkPSJNMTYwIDI0MGw0MC00MCA2MCA2MCA0MC00MHY4MEgxNjB2LTYweiIgZmlsbD0iI2NiZDVlMSIvPjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                          }}
                        />
                      </div>
                      <Badge className="absolute top-4 right-4 bg-purple-600">
                        {monitor.brand}
                      </Badge>
                    </div>

                    <CardHeader>
                      <CardTitle className="text-lg">{monitor.name}</CardTitle>
                      <CardDescription>{monitor.description}</CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {monitor.specifications?.display && (
                            <div className="flex items-center">
                              <Maximize className="h-4 w-4 mr-2 text-gray-500" />
                              {monitor.specifications.display}
                            </div>
                          )}
                          {monitor.specifications?.resolution && (
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-2 text-gray-500" />
                              {monitor.specifications.resolution}
                            </div>
                          )}
                          {monitor.specifications?.refreshRate && (
                            <div className="flex items-center">
                              <RefreshCw className="h-4 w-4 mr-2 text-gray-500" />
                              {monitor.specifications.refreshRate}
                            </div>
                          )}
                          {monitor.specifications?.connectivity && (
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-gray-500" />
                              {monitor.specifications.connectivity}
                            </div>
                          )}
                        </div>

                        {monitor.features && monitor.features.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {monitor.features
                              .slice(0, 3)
                              .map((feature: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>
                        )}

                        <div className="flex flex-col gap-2">
                          <Badge
                            variant={monitor.inStock ? "default" : "secondary"}
                          >
                            {monitor.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          <Link href={`/product/${monitor.id}`}>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              View Details
                            </Button>
                          </Link>
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
            Perfect for Every Application
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <useCase.icon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
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

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            Advanced Display Technology
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <feature.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Size Comparison */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-gray-900">
            Choose Your Size
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  27&quot;
                </div>
                <CardTitle>Compact Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Perfect for smaller desks while maintaining professional
                  quality. Ideal for single-application focus work.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• 4K/5K Resolution</p>
                  <p>• Color Accurate</p>
                  <p>• Space Efficient</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  32&quot;
                </div>
                <CardTitle>Productivity Plus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Excellent for multitasking and professional work. Great
                  balance of size and desk real estate.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• 4K/6K Resolution</p>
                  <p>• Multi-window Support</p>
                  <p>• Gaming Ready</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  49&quot;
                </div>
                <CardTitle>Ultrawide Max</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ultimate workspace replacement for dual monitor setups.
                  Immersive gaming and maximum productivity.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Dual QHD Resolution</p>
                  <p>• Replace Dual Setup</p>
                  <p>• Immersive Gaming</p>
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
            Upgrade Your Visual Experience
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            From professional color grading to immersive gaming, find the
            perfect monitor that matches your workflow and enhances your
            productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/monitors">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Browse Monitors
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline">
                Size Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
