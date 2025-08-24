"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Tablet, Watch, Monitor, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Carousel from "@/components/ui/carousel";
import ProductCarousel from "@/components/ui/product-carousel";
import {
  HeroSkeleton,
  ProductCarouselSkeleton,
  BrandCardsSkeleton,
  CategoryCardsSkeleton,
  FeaturedProductsSkeleton,
} from "@/components/skeletons/HomeSkeleton";
import productsData from "../../products.json";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Transform products from JSON to carousel format
  const transformProductForCarousel = (product: any) => {
    // Generate default colors if not available
    const defaultColors = ["#1d1d1f", "#f5f5dc", "#faf0e6", "#e6e6fa"];

    // Extract key features from specifications
    const features = [];
    if (product.specifications?.chip || product.specifications?.processor) {
      features.push(
        product.specifications.chip || product.specifications.processor
      );
    }
    if (product.specifications?.camera) {
      features.push(product.specifications.camera);
    }
    if (
      product.specifications?.spen === "Built-in S Pen" ||
      product.specifications?.spen === "S Pen included"
    ) {
      features.push("S Pen included");
    }
    if (product.features && product.features.length > 0) {
      features.push(...product.features.slice(0, 2));
    }

    // Create quick specs from specifications
    const quickSpecs: { [key: string]: string } = {};
    if (product.specifications?.storage) {
      quickSpecs.Storage = product.specifications.storage;
    }
    if (product.specifications?.ram) {
      quickSpecs.RAM = product.specifications.ram;
    }
    if (product.specifications?.display) {
      quickSpecs.Display = product.specifications.display.includes("inch")
        ? product.specifications.display.split(" ")[0] + " inch"
        : product.specifications.display;
    }
    if (
      product.specifications?.camera &&
      product.specifications.camera.includes("MP")
    ) {
      quickSpecs.Camera = product.specifications.camera.split(" ")[0];
    }

    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      image:
        product.images?.[0] ||
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZTJlOGYwIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjIxMCIgcj0iMjAiIGZpbGw9IiNjYmQ1ZTEiLz48cGF0aCBkPSJNMTYwIDI0MGw0MC00MCA2MCA2MCA0MC00MHY4MEgxNjB2LTYweiIgZmlsbD0iI2NiZDVlMSIvPjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=",
      isNew:
        product.tags?.includes("latest") ||
        product.name.includes("Series 9") ||
        product.name.includes("iPhone 16"),
      isBestSeller:
        product.stockQuantity >= 10 && product.category === "Smartphones", // Removed price-based logic
      // discount: product.salePrice ? `${Math.round(((product.price - product.salePrice) / product.price) * 100)}% off` : null, // Commented out discount
      discount: undefined, // No discounts displayed
      colors: defaultColors,
      features: features.slice(0, 3),
      quickSpecs,
    };
  };

  // Get featured products (mix of categories, prioritize flagship devices)
  const getFeaturedProducts = () => {
    const products = productsData?.products || [];

    // Prioritize flagship devices and popular categories (removed price-based filtering)
    const flagship = products.filter(
      (p: any) =>
        p.name.toLowerCase().includes("ultra") ||
        p.name.toLowerCase().includes("pro") ||
        p.name.toLowerCase().includes("series")
      // p.price > 800 // Commented out price-based filtering
    );

    const other = products.filter(
      (p: any) => !flagship.some((f: any) => f.id === p.id)
    );

    // Mix flagship and other products, limit to 6
    const selected = [...flagship.slice(0, 4), ...other.slice(0, 2)].slice(
      0,
      6
    );

    return selected.map(transformProductForCarousel);
  };

  const featuredProducts = getFeaturedProducts();

  // Get popular products (different from featured, mix of all categories)
  const getPopularProducts = () => {
    const products = productsData?.products || [];

    // Skip products already used in featured
    const featuredIds = featuredProducts.map((p) => p.id);
    const remaining = products.filter((p: any) => !featuredIds.includes(p.id));

    // Prioritize products with good stock and variety across categories
    const smartphones = remaining
      .filter((p: any) => p.category === "Smartphones")
      .slice(0, 2);
    const tablets = remaining
      .filter((p: any) => p.category === "Tablets")
      .slice(0, 1);
    const wearables = remaining
      .filter((p: any) => p.category === "Wearables")
      .slice(0, 1);
    const accessories = remaining
      .filter(
        (p: any) => p.category === "Accessories" || p.category === "Audio"
      )
      .slice(0, 2);

    // Combine and ensure we have 6 products
    const selected = [...smartphones, ...tablets, ...wearables, ...accessories];

    // If we don't have 6, fill with remaining products
    if (selected.length < 6) {
      const usedIds = selected.map((p) => p.id);
      const additional = remaining
        .filter((p: any) => !usedIds.includes(p.id))
        .slice(0, 6 - selected.length);
      selected.push(...additional);
    }

    return selected.slice(0, 6);
  };

  const popularProducts = getPopularProducts();

  // Type-safe product data for carousel
  const typedFeaturedProducts = featuredProducts.map((product) => ({
    ...product,
    quickSpecs: product.quickSpecs as unknown as { [key: string]: string },
  }));

  const heroItems = [
    {
      id: "1",
      title: "Premium Gaming Monitors",
      description:
        "Experience ultimate visual clarity with our cutting-edge gaming monitors. Featuring high refresh rates, HDR support, and stunning 4K resolution for the most immersive gaming experience.",
      video: "/01-hd01-DM-Series-kv-pc-1440x6401.webm",
      textPosition: "start" as const, // Text positioned at start (left)
      cta: {
        text: "Explore Monitors",
        href: "/monitors",
      },
    },
    {
      id: "2",
      title: "Two sizes. Same Pro.",
      description: "",
      image: "/pixel-9-pro-banner.png",
      textPosition: "top-center" as const, // Text positioned at top center
      href: "/smartphones", // Direct link instead of CTA button
    },
    {
      id: "3",
      title: "Latest Smartphones",
      description:
        "Discover the newest smartphone technology with cutting-edge cameras, lightning-fast processors, and innovative features that keep you connected and productive.",
      video: "/large_2x.mp4",
      textPosition: "start" as const, // Text positioned at start (left)
      cta: {
        text: "Shop Smartphones",
        href: "/smartphones",
      },
    },

    {
      id: "5",
      title: "",
      description: "",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/aalp-magsafe-header-202503?wid=2880&hei=960&fmt=png-alpha&.v=Z0FvN205Yit0amxaU0VEclhjUVpkQ1UrSEpTSlJCQnBKOXVkZ0ZzTVBSSmNIMFFzd3RXdklnTGRTZDNHMExMN0FBdXY2YUtQNTBqTXdOQ1ZyYzhsU1FsYVJ0UGoyVHJsd2tKa2lWMzVuNU0",
      textPosition: "start" as const, // Changed from "end" to "start" since "end" is not in the union type
      href: "/brands/apple",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {isLoading ? (
        <>
          <HeroSkeleton />
          <ProductCarouselSkeleton />
          <CategoryCardsSkeleton />
          <BrandCardsSkeleton />
          <FeaturedProductsSkeleton />
        </>
      ) : (
        <>
          {/* Hero Carousel Section */}
          <section className="relative">
            <Carousel
              items={heroItems}
              autoPlay={true}
              autoPlayInterval={6000}
              className="mb-0"
            />
          </section>

          {/* Featured Products Carousel */}
          <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
              <ProductCarousel
                products={typedFeaturedProducts}
                title="Featured Products"
                subtitle="Discover our most popular devices with exclusive offers"
                autoPlay={true}
                autoPlayInterval={5000}
                showQuickView={true}
                showAddToCart={false}
                className="mb-8"
              />
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Shop by Category
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Smartphone className="mx-auto h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle>Smartphones</CardTitle>
                    <CardDescription>
                      Latest iPhone, Galaxy & Pixel
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Tablet className="mx-auto h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle>Tablets</CardTitle>
                    <CardDescription>
                      iPad, Galaxy Tab & Pixel Tablet
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Watch className="mx-auto h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle>Wearables</CardTitle>
                    <CardDescription>
                      Apple Watch, Galaxy Watch & More
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Monitor className="mx-auto h-12 w-12 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle>Monitors</CardTitle>
                    <CardDescription>High-resolution displays</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Brand Highlights */}
          <section className="py-16 bg-gray-50 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Featured Brands
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="text-center group hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="h-20 w-20 bg-gradient-to-br from-gray-900 to-black rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold">Apple</CardTitle>
                    <CardDescription className="text-gray-600">
                      iPhone, iPad, Apple Watch, Studio Display
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/apple">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-black group-hover:text-white transition-colors font-medium"
                      >
                        Explore Apple
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10zm-10 6c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6z" />
                        <path d="M8.5 8.5h2c1.1 0 2 .9 2 2v.5h-1.5v-.5c0-.28-.22-.5-.5-.5h-2c-.28 0-.5.22-.5.5v3c0 .28.22.5.5.5h2c.28 0 .5-.22.5-.5V13H12v.5c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2v-3c0-1.1.9-2 2-2z" />
                        <path d="M15.5 8.5c1.1 0 2 .9 2 2v3c0 1.1-.9 2-2 2h-2v-1.5h2c.28 0 .5-.22.5-.5v-3c0-.28-.22-.5-.5-.5h-1.5v1h1v1h-1.5v-2.5h2z" />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold">Samsung</CardTitle>
                    <CardDescription className="text-gray-600">
                      Galaxy smartphones, tablets, watches, monitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/samsung">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Samsung
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="text-center group hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="h-20 w-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <svg
                        className="w-12 h-12 text-white"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    </div>
                    <CardTitle className="text-xl font-bold">Google</CardTitle>
                    <CardDescription className="text-gray-600">
                      Pixel phones, Pixel Watch, Pixel Tablet
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/google">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Google
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Mountpole */}
          <section className="py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Why Choose Mountpole?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <Shield className="mx-auto h-12 w-12 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">Authentic Products</h3>
                  <p className="text-gray-600">
                    100% genuine products with official warranties
                  </p>
                </div>

                <div className="text-center">
                  <Shield className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
                  <h3 className="font-semibold mb-2">Multi-Brand</h3>
                  <p className="text-gray-600">
                    Authorized retailer for top electronics brands
                  </p>
                </div>

                <div className="text-center">
                  <Monitor className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Product Showcase</h3>
                  <p className="text-gray-600">
                    Comprehensive display of latest technology
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Brands We Work With */}
          <section className="py-12 md:py-16 px-4">
            <div className="container mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4 text-gray-900">
                Brands We Work With
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                Partnering with leading technology brands to bring you the
                latest and greatest in electronics
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 items-center justify-items-center">
                {/* Samsung */}
                <div className="group flex flex-col items-center space-y-2 md:space-y-3 p-3 md:p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm md:text-lg">
                      S
                    </span>
                  </div>
                  <span className="font-semibold text-sm md:text-base text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                    Samsung
                  </span>
                </div>

                {/* Apple */}
                <div className="group flex flex-col items-center space-y-2 md:space-y-3 p-3 md:p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 md:w-10 md:h-10 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm md:text-base text-gray-700 group-hover:text-gray-800 transition-colors text-center">
                    Apple
                  </span>
                </div>

                {/* Google */}
                <div className="group flex flex-col items-center space-y-2 md:space-y-3 p-3 md:p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 md:w-10 md:h-10 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-sm md:text-base text-gray-700 group-hover:text-blue-600 transition-colors text-center">
                    Google
                  </span>
                </div>

                {/* Xiaomi */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">Mi</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                    Xiaomi
                  </span>
                </div>

                {/* Realme */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-sm">RM</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-yellow-600 transition-colors">
                    Realme
                  </span>
                </div>

                {/* Motorola */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">M</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                    Motorola
                  </span>
                </div>

                {/* JBL */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">JBL</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-orange-600 transition-colors">
                    JBL
                  </span>
                </div>

                {/* Huawei */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">
                    Huawei
                  </span>
                </div>

                {/* Honor */}
                <div className="group flex flex-col items-center space-y-3 p-6 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">H</span>
                  </div>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                    Honor
                  </span>
                </div>
              </div>

              <div className="text-center mt-8 md:mt-12">
                <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 md:mb-6">
                  Explore products from all our partner brands
                </p>
                <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 md:gap-4">
                  <Link href="/smartphones">
                    <Button
                      variant="outline"
                      className="hover:bg-blue-600 hover:text-white w-full sm:w-auto"
                    >
                      View Smartphones
                    </Button>
                  </Link>
                  <Link href="/tablets">
                    <Button
                      variant="outline"
                      className="hover:bg-blue-600 hover:text-white w-full sm:w-auto"
                    >
                      View Tablets
                    </Button>
                  </Link>
                  <Link href="/wearables">
                    <Button
                      variant="outline"
                      className="hover:bg-blue-600 hover:text-white w-full sm:w-auto"
                    >
                      View Wearables
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-16 bg-gray-50 px-4">
            <div className="container mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
                Popular Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Show popular products from our database */}
                {popularProducts.map((product: any) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        <Image
                          src={
                            product.images?.[0] ||
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZTJlOGYwIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjIxMCIgcj0iMjAiIGZpbGw9IiNjYmQ1ZTEiLz48cGF0aCBkPSJNMTYwIDI0MGw0MC00MCA2MCA2MCA0MC00MHY4MEgxNjB2LTYweiIgZmlsbD0iI2NiZDVlMSIvPjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4="
                          }
                          alt={product.name || "Product Image"}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-4"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGZhZmMiLz48cmVjdCB4PSI1MCIgeT0iMTUwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZTJlOGYwIiBzdHJva2U9IiNjYmQ1ZTEiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjEzMCIgY3k9IjIxMCIgcj0iMjAiIGZpbGw9IiNjYmQ1ZTEiLz48cGF0aCBkPSJNMTYwIDI0MGw0MC00MCA2MCA2MCA0MC00MHY4MEgxNjB2LTYweiIgZmlsbD0iI2NiZDVlMSIvPjx0ZXh0IHg9IjIwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhiIiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNTAwIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTRhM2I4IiBmb250LWZhbWlseT0ic3lzdGVtLXVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIj5QbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=";
                          }}
                        />
                      </div>
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription>
                        {product.brand} • {product.category}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center mb-4">
                        {/* Price section commented out */}
                        {/* 
                        <div className="flex flex-col">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price?.toFixed(2) || 'N/A'}
                          </span>
                          {product.salePrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.salePrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        */}
                        <div className="flex flex-col gap-1">
                          <Badge
                            variant={product.inStock ? "default" : "secondary"}
                          >
                            {product.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                          {product.category === "Smartphones" && (
                            <Badge variant="outline">Best Seller</Badge>
                          )}
                        </div>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <Button className="w-full" variant="outline">
                          View Details
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/smartphones">
                  <Button variant="outline" size="lg">
                    View All Products
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
