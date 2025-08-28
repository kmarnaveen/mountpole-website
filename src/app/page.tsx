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
import { useModals } from "@/components/modals/ModalProvider";
import {
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  Shield,
  Zap,
  Eye,
  ShoppingCart,
} from "lucide-react";
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
  const { openQuoteModal, openCategoryQuoteModal, openPartnershipModal } =
    useModals();

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
      image: product.images?.[0] || "/placeholder-product.png",
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

    // Mix flagship and other products, limit to 8 for better carousel display
    const selected = [...flagship.slice(0, 5), ...other.slice(0, 3)].slice(
      0,
      8
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
      title: "Global Technology Distribution",
      description:
        "Connecting the world with technology you trust. MountPole distributes premium brands like Apple, Samsung, Xiaomi, and more across the USA, Canada, Latin America, and beyond.",
      video: "/01-hd01-DM-Series-kv-pc-1440x6401.webm",
      textPosition: "start" as const,
      cta: {
        text: "Start Partnership",
        href: "/partnership?source=homepage-hero&intent=distributor&utm_campaign=global-distribution",
      },
    },
    {
      id: "2",
      title: "Partner With MountPole",
      description:
        "Join forces with a trusted global technology distributor. Whether you're a retailer, reseller, or enterprise buyer, MountPole provides authentic products, competitive wholesale pricing, and reliable supply chains to fuel your business growth.",
      image:
        "https://www.actualidadiphone.com/wp-content/uploads/2025/07/Apple-Beta-ios-macos-26.jpg.webp",
      textPosition: "top-center" as const,
      cta: {
        text: "Partner With MountPole",
        href: "/partnership?source=homepage-carousel&intent=reseller&utm_campaign=partner-growth",
      },
    },

    {
      id: "3",
      title: "Business Solutions",
      description:
        " Get enterprise pricing and dedicated business solutions for your technology needs",
      image:
        "http://i.pinimg.com/1200x/2e/03/db/2e03dbb1a04e5f7a42c809f10531d399.jpg",
      textPosition: "top-center" as const,
      cta: {
        text: "Enterprise Partnership",
        href: "/partnership?source=homepage-carousel&intent=enterprise&utm_campaign=business-solutions",
      },
    },
    {
      id: "4",
      title: "Global Technology Distribution",
      description:
        "Connecting the world with technology you trust. MountPole distributes premium brands like Apple, Samsung, Xiaomi, and more across the USA, Canada, Latin America, and beyond.",
      image: "/pixel-9-pro-banner.png",
      textPosition: "top-center" as const,
      href: "/smartphones",
    },
    {
      id: "5",
      title: "Global Reach, Trusted Brands",
      description:
        "Serving partners across the USA, Canada, Latin America, and beyond. Distributing world-class electronics and lifestyle products with reliable bulk supply and competitive margins for resellers.",
      video: "/large_2x.mp4",
      textPosition: "start" as const,
      cta: {
        text: "Become a Partner",
        href: "/partnership?source=homepage-hero&intent=regional&utm_campaign=global-reach",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white overflow-x-hidden">
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

          {/* Brands We Work With */}
          <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-50 px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
              <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6">
                  Brands We Work With
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
                  Partnering with leading technology brands to bring you the
                  latest and greatest in electronics. From flagship smartphones
                  to professional audio equipment, we offer comprehensive
                  solutions.
                </p>
              </div>

              {/* All Brands - Fully Responsive Grid Layout */}
              <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {/* Apple */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/5c/a8/fb/5ca8fbb105d7fe666dc22e36633107a1.jpg"
                        alt="Apple Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Apple
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      iPhone, iPad, Apple Watch, Studio Display, MacBook
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/apple" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-black group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Apple
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Samsung */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$"
                        alt="Samsung Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Samsung
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Galaxy smartphones, tablets, watches, monitors
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/samsung" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Samsung
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Google */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
                        alt="Google Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Google
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Pixel phones, Pixel Watch, Pixel Tablet, Nest devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/google" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-blue-500 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Google
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Xiaomi */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/0a/06/57/0a06573f82b48bd48f95e4a4e5dc4ca2.jpg"
                        alt="Xiaomi Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Xiaomi
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Redmi, Mi smartphones, tablets, smart home devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/xiaomi" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-orange-600 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Xiaomi
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Realme */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/736x/71/71/0f/71710f762b6af383a73f9760fda3a3ae.jpg"
                        alt="Realme Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Realme
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Affordable smartphones, earbuds, smart watches
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/realme" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-yellow-600 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Realme
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Motorola */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/736x/31/c4/1d/31c41de9898d1c809ab5f385a5ca88fb.jpg"
                        alt="Motorola Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      Motorola
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Moto smartphones, razr foldables, enterprise solutions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/motorola" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-blue-700 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore Motorola
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* JBL */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border border-gray-200 hover:border-gray-300">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-white rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/2c/ac/2a/2cac2ac8597cc2ea27601b198ea42685.jpg"
                        alt="JBL Logo"
                        width={64}
                        height={64}
                        className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      JBL
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm md:text-base text-gray-600 line-clamp-2 px-1 sm:px-2">
                      Premium speakers, headphones, audio equipment
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands/jbl" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-orange-600 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        Explore JBL
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Huawei */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/22/b4/6c/22b46c6e80b2f5c1f6178e08223cc726.jpg"
                        alt="Huawei Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">Huawei</CardTitle>
                    <CardDescription className="text-gray-600">
                      Smartphones, tablets, smartwatches, networking
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/huawei">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-red-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Huawei
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* itel */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/ab/da/0e/abda0e194c3b29039022fd9f001c1375.jpg"
                        alt="itel Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">itel</CardTitle>
                    <CardDescription className="text-gray-600">
                      Affordable smartphones, feature phones, accessories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/itel">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore itel
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Tecno */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/736x/4b/44/9b/4b449baf9a14ddce95e5932ef1b01ab2.jpg"
                        alt="Tecno Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">Tecno</CardTitle>
                    <CardDescription className="text-gray-600">
                      Spark, Camon, Phantom smartphones and tablets
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/tecno">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Tecno
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Infinix */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/ad/7b/e4/ad7be4021d5bd53a45ede6417fad731d.jpg"
                        alt="Infinix Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">Infinix</CardTitle>
                    <CardDescription className="text-gray-600">
                      Note, Hot, Zero series smartphones and accessories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/infinix">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Infinix
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Oppo */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/9f/c2/60/9fc2604b5e46b15575f807ffacf7c95c.jpg"
                        alt="Oppo Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">Oppo</CardTitle>
                    <CardDescription className="text-gray-600">
                      Find, Reno smartphones, earbuds, smart devices
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/oppo">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-green-600 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Oppo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Dyson */}
                <Card className="text-center group hover:shadow-xl transition-shadow bg-white">
                  <CardHeader>
                    <div className="h-20 w-20 bg-white rounded-3xl mx-auto mb-4 flex items-center justify-center shadow-lg overflow-hidden">
                      <Image
                        src="https://i.pinimg.com/1200x/39/c5/ec/39c5ec7414b550a0d61938a41690100e.jpg"
                        alt="Dyson Logo"
                        width={64}
                        height={64}
                        className="object-contain w-16 h-16"
                      />
                    </div>
                    <CardTitle className="text-xl font-bold">Dyson</CardTitle>
                    <CardDescription className="text-gray-600">
                      Vacuum cleaners, air purifiers, hair care appliances
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href="/brands/dyson">
                      <Button
                        variant="outline"
                        className="w-full group-hover:bg-gray-800 group-hover:text-white transition-colors font-medium"
                      >
                        Explore Dyson
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
                <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-5 md:mb-6 px-4 sm:px-0">
                  Explore products from all our partner brands
                </p>
                <div className="flex flex-col xs:flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto px-4 sm:px-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCategoryQuoteModal("smartphones")}
                    className="w-full sm:w-auto hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 font-medium border-2 hover:border-blue-600"
                  >
                    Get Mobile Quotes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCategoryQuoteModal("tablets")}
                    className="w-full sm:w-auto hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 font-medium border-2 hover:border-blue-600"
                  >
                    Get Tablet Quotes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCategoryQuoteModal("wearables")}
                    className="w-full sm:w-auto hover:bg-blue-600 hover:text-white transition-all duration-300 text-xs sm:text-sm md:text-base py-2.5 sm:py-3 md:py-3.5 px-4 sm:px-6 md:px-8 font-medium border-2 hover:border-blue-600"
                  >
                    Get Wearable Quotes
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products Carousel */}
          <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-4 md:px-6 bg-white">
            <div className="container mx-auto max-w-7xl">
              <ProductCarousel
                products={typedFeaturedProducts}
                title=""
                subtitle=""
                autoPlay={true}
                autoPlayInterval={5000}
                showQuickView={true}
                showAddToCart={false}
                className="mb-8"
              />
            </div>
          </section>

          {/* Categories Section */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-gray-900">
                Products & Solutions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center p-4 sm:p-5 md:p-6">
                    <Smartphone className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-sm sm:text-base md:text-lg mb-2">
                      Mobiles
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      Latest smartphones from Apple, Samsung, Oppo, Realme,
                      Tecno, Infinix, and Xiaomi — catering to every market
                      segment
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center p-4 sm:p-5 md:p-6">
                    <Tablet className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-sm sm:text-base md:text-lg mb-2">
                      Tablets
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      iPad and Android tablets for productivity, creativity, and
                      entertainment across all use cases
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center p-4 sm:p-5 md:p-6">
                    <Monitor className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform" />
                    <CardTitle className="text-sm sm:text-base md:text-lg mb-2">
                      Monitors
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      Professional displays and studio monitors for design,
                      gaming, and business applications
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader className="text-center p-4 sm:p-5 md:p-6">
                    <svg
                      className="mx-auto h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                    <CardTitle className="text-sm sm:text-base md:text-lg mb-2">
                      Audio
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      Premium sound equipment and accessories from JBL and
                      others, built to enhance everyday living
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </section>

          {/* Why Choose MountPole - Combined Section with Carousels */}
          <section className="py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20 bg-blue-50 px-3 sm:px-4 md:px-6">
            <div className="container mx-auto max-w-7xl">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center mb-3 sm:mb-4 md:mb-6 text-gray-900">
                Why Choose MountPole
              </h2>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16 max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                Trusted by businesses and individuals worldwide for reliable
                technology solutions, competitive pricing, and exceptional
                service across all markets.
              </p>

              {/* Combined Benefits Carousel - Interactive for All Devices */}
              <div className="mb-8 sm:mb-10 md:mb-12 lg:mb-16">
                <div className="relative">
                  <Carousel
                    items={[
                      {
                        id: 1,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Wholesale Expertise
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Reliable bulk supply and competitive margins for
                                resellers
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 2,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Dedicated Account Manager
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Personal account manager for seamless
                                procurement
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 3,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Volume Discounts
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Competitive bulk pricing for enterprise orders
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 4,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Monitor className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Fast Deployment
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Quick device setup and configuration services
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 5,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Global Reach
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Serving partners across the USA, Canada, Latin
                                America, and beyond
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 6,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Trusted Brands
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Distributing world-class electronics and
                                lifestyle products
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 7,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Innovation Driven
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Keeping you ahead with the latest in mobile and
                                consumer technology
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 8,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Smartphone className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-orange-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Quality Assurance
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Rigorous quality checks and authentic products
                                guaranteed
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                    ]}
                    itemsPerSlide={1}
                    autoPlay={true}
                    autoPlayInterval={4500}
                    showDots={true}
                    className="px-2 sm:px-4 md:hidden"
                  />
                </div>

                {/* Tablet: 2 items per slide */}
                <div className="hidden md:block lg:hidden">
                  <Carousel
                    items={[
                      {
                        id: 1,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Wholesale Expertise
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Reliable bulk supply and competitive margins for
                                resellers
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 2,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Dedicated Account Manager
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Personal account manager for seamless
                                procurement
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 3,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Volume Discounts
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Competitive bulk pricing for enterprise orders
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 4,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Monitor className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Fast Deployment
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Quick device setup and configuration services
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 5,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Global Reach
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Serving partners across the USA, Canada, Latin
                                America, and beyond
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 6,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Trusted Brands
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Distributing world-class electronics and
                                lifestyle products
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 7,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Innovation Driven
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Keeping you ahead with the latest in mobile and
                                consumer technology
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 8,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Smartphone className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-orange-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Quality Assurance
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Rigorous quality checks and authentic products
                                guaranteed
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                    ]}
                    itemsPerSlide={2}
                    autoPlay={true}
                    autoPlayInterval={4500}
                    showDots={true}
                    className="px-4"
                  />
                </div>

                {/* Desktop: 3 items per slide */}
                <div className="hidden lg:block">
                  <Carousel
                    items={[
                      {
                        id: 1,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Wholesale Expertise
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Reliable bulk supply and competitive margins for
                                resellers
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 2,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Dedicated Account Manager
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Personal account manager for seamless
                                procurement
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 3,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-yellow-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Volume Discounts
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Competitive bulk pricing for enterprise orders
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 4,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Monitor className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-purple-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Fast Deployment
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Quick device setup and configuration services
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 5,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-blue-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Global Reach
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Serving partners across the USA, Canada, Latin
                                America, and beyond
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 6,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Shield className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Trusted Brands
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Distributing world-class electronics and
                                lifestyle products
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 7,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <svg
                                className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-red-600 mb-2 sm:mb-3 md:mb-4"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Innovation Driven
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Keeping you ahead with the latest in mobile and
                                consumer technology
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                      {
                        id: 8,
                        content: (
                          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow bg-white h-full">
                            <CardHeader className="p-3 sm:p-4 md:p-6">
                              <Smartphone className="mx-auto h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-orange-600 mb-2 sm:mb-3 md:mb-4" />
                              <CardTitle className="text-sm sm:text-base md:text-lg">
                                Quality Assurance
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
                              <p className="text-gray-600 text-xs sm:text-sm">
                                Rigorous quality checks and authentic products
                                guaranteed
                              </p>
                            </CardContent>
                          </Card>
                        ),
                      },
                    ]}
                    itemsPerSlide={3}
                    autoPlay={true}
                    autoPlayInterval={4500}
                    showDots={true}
                    className="px-2 sm:px-4"
                  />
                </div>
              </div>

              <div className="text-center mt-12">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact?type=services">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                      Learn More About Our Services
                    </Button>
                  </Link>
                  <Link href="/partnership?source=homepage-cta&intent=enterprise&utm_campaign=business-partnerships">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                    >
                      Business Partnerships
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Products */}
          <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100/30 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-12 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                  Featured Products
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                  Discover our carefully curated selection of premium technology
                  products from leading brands.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Show popular products from our database */}
                {popularProducts.map((product: any, index: number) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-gray-300 hover:-translate-y-1 bg-white relative overflow-hidden"
                  >
                    {/* Model Number */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 border border-gray-200 shadow-sm">
                        <span className="text-xs font-medium text-gray-600">
                          #{index + 1}
                        </span>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-xl mb-6 flex items-center justify-center overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <Image
                          src={
                            product.images?.[0] || "/placeholder-product.png"
                          }
                          alt={product.name || "Product Image"}
                          width={300}
                          height={300}
                          className="w-full h-full object-contain p-6 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-product.png";
                          }}
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge
                            variant="outline"
                            className="text-xs font-medium text-gray-600 border-gray-300 bg-gray-50"
                          >
                            {product.brand}
                          </Badge>
                          <div className="flex items-center space-x-1"></div>
                        </div>

                        <CardTitle className="text-lg md:text-xl group-hover:text-gray-700 transition-colors duration-300">
                          {product.name}
                        </CardTitle>

                        <CardDescription className="text-sm text-gray-600 line-clamp-2">
                          High-quality {product.category.toLowerCase()} with
                          advanced features and reliable performance for
                          professional use.
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      {/* Product Features */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          Specifications:
                        </h4>
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            Professional grade quality
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            Comprehensive warranty
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                            Technical support included
                          </div>
                        </div>
                      </div>

                      {/* Status and Actions */}
                      <div className="flex flex-col gap-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant="outline"
                              className="text-xs border-gray-300 text-gray-600 bg-gray-50"
                            >
                              In Stock
                            </Badge>
                            <span className="text-xs text-gray-500">
                              Model #{product.id}
                            </span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Link
                            href={`/product/${product.id}`}
                            className="flex-1"
                          >
                            <Button
                              className="w-full border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                              variant="outline"
                              size="sm"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </Link>
                          <Button
                            onClick={() =>
                              openQuoteModal({
                                quoteType: "bulk",
                                productId: product.id,
                                productName: product.name,
                                productContext: `${product.name} - Bulk Quote Request`,
                              })
                            }
                            className="flex-1 w-full bg-gray-900 hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300"
                            size="sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Request Quote
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Call to Action Section */}
              <div className="text-center mt-12 md:mt-16 space-y-4">
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 md:p-12 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4">
                    Explore Our Complete Collection
                  </h3>
                  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                    Discover more premium technology products from leading
                    brands, all backed by professional support and warranty.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/partnership?source=homepage-footer-cta&intent=enterprise&utm_campaign=contact-sales">
                      <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8"
                      >
                        Contact Sales
                      </Button>
                    </Link>
                    <Link href="/smartphones">
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-gray-900 font-semibold px-8"
                      >
                        View All Products
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
