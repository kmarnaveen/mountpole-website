"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Carousel } from "@/components/ui/carousel";
import ProductCarousel from "@/components/ui/product-carousel";
import { BorderBeam } from "@/components/magicui/border-beam";
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

  // Get featured products (prioritize the specific Samsung products)
  const getFeaturedProducts = () => {
    const products = productsData?.products || [];

    // Filter out products with no images first
    const productsWithImages = products.filter(
      (p: any) => p.images && p.images.length > 0
    );

    // Priority Samsung product IDs that should be featured
    const prioritySamsungIds = [
      "samsung-galaxy-a06", // Galaxy A06
      "samsung-galaxy-s25-edge", // Galaxy S25 Edge
      "samsung-galaxy-tab-a9", // Galaxy Tab A9
      "samsung-galaxy-watch7", // Galaxy Watch7
      "samsung-smarttag-2", // SmartTag 2
      "samsung-25w-adapter", // 25W USB-C Fast Charger
    ];

    // Get the priority Samsung products first
    const prioritySamsung = productsWithImages.filter((p: any) =>
      prioritySamsungIds.includes(p.id)
    );

    // Get other flagship/premium products (excluding the priority Samsung ones)
    const otherPremium = productsWithImages.filter(
      (p: any) =>
        !prioritySamsungIds.includes(p.id) &&
        (p.name.toLowerCase().includes("ultra") ||
          p.name.toLowerCase().includes("pro") ||
          p.name.toLowerCase().includes("series") ||
          p.name.toLowerCase().includes("iphone") ||
          p.brand.toLowerCase() === "apple")
    );

    // Mix Samsung priority products with other premium products, limit to 8
    // If we don't have enough premium products, fill with any remaining products with images
    let selected = [...prioritySamsung, ...otherPremium];
    if (selected.length < 8) {
      const remaining = productsWithImages.filter(
        (p: any) => !selected.some((s: any) => s.id === p.id)
      );
      selected = [...selected, ...remaining].slice(0, 8);
    } else {
      selected = selected.slice(0, 8);
    }

    return selected.map(transformProductForCarousel);
  };

  const featuredProducts = getFeaturedProducts();

  // Get popular products (different from featured, mix of all categories)
  const getPopularProducts = () => {
    const products = productsData?.products || [];

    // Skip products already used in featured
    const featuredIds = featuredProducts.map((p) => p.id);
    const remaining = products.filter(
      (p: any) => !featuredIds.includes(p.id) && p.images && p.images.length > 0
    );

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
      title: "Premium Tech Distribution Made Simple",
      description:
        "Apple. Samsung. Xiaomi. Real inventory, wholesale pricing, zero hassles. USA, Canada, Latin America delivery.",

      video: "/large_2x.mp4",
      textPosition: "start" as const,
      cta: {
        text: "Start Partnership",
        href: "/partnership?source=homepage-hero&intent=distributor&utm_campaign=global-distribution",
      },
    },
    {
      id: "2",
      title: "Global Reach. Local Results.",
      description:
        "12 countries. 1000+ products. Consistent margins. Reliable delivery. Distribution that actually works.",
      image:
        "https://images.samsung.com/is/image/samsung/assets/us/2501/pfs/mobile/01152025/PFS_FT03_Feature-Full-Bleed_AI-ready-to-gift-pc.jpg?imwidth=1366",
      textPosition: "start" as const,
      cta: {
        text: "Become a Partner",
        href: "/partnership?source=homepage-hero&intent=regional&utm_campaign=global-reach",
      },
    },
    {
      id: "3",
      title: "Scale Fast. Profit More.",
      description:
        "Retailers trust us for protected margins, authentic products, and supply chains that never fail. Join 500+ growing businesses.",
      image: "/s-25-ultra.avif",
      textPosition: "top-center" as const,
      cta: {
        text: "Partner With MountPole",
        href: "/partnership?source=homepage-carousel&intent=reseller&utm_campaign=partner-growth",
      },
    },

    {
      id: "4",
      title: "Enterprise Tech. Enterprise Pricing.",
      description:
        "Bulk orders. Volume discounts. Dedicated support. Technology solutions that fit your budget and timeline.",
      textPosition: "top-center" as const,

      video: "/01-hd01-DM-Series-kv-pc-1440x6401.webm",

      cta: {
        text: "Enterprise Partnership",
        href: "/partnership?source=homepage-carousel&intent=enterprise&utm_campaign=business-solutions",
      },
    },
    {
      id: "5",
      title: "Google Pixel 9 Pro. In Stock.",
      description:
        "AI photography. Pro performance. Wholesale pricing. Available now for immediate shipping to your customers.",
      image: "/pixel-9-pro-banner.png",
      textPosition: "bottom-center" as const,
      cta: {
        text: "Explore Smartphones",
        href: "/smartphones?utm_source=homepage&utm_medium=carousel&utm_campaign=pixel-9-pro",
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
          {/* Hero Carousel Section - World-Class Optimized */}
          <section className="relative group/hero overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30 -z-10" />

            {/* Enhanced Carousel with Premium Animations */}
            <div className="relative transform transition-all duration-700 ease-out group-hover/hero:scale-[1.002]">
              <Carousel
                items={heroItems}
                autoPlay={true}
                interval={2000}
                showDots={true}
                showProgress={true}
                showControls={true}
                aspectRatio="16:9"
                priority={true}
                className="mb-0 shadow-2xl rounded-none sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-gray-200/50 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
              />
            </div>

            {/* Subtle Corner Accent Lines */}
            <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/60 via-purple-400/40 to-transparent" />
              <div className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-blue-400/60 via-purple-400/40 to-transparent" />
            </div>

            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-pink-400/60 via-purple-400/40 to-transparent" />
              <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-pink-400/60 via-purple-400/40 to-transparent" />
            </div>

            {/* Premium Scroll Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-50 opacity-80 group-hover/hero:opacity-100 transition-opacity duration-300">
              <div className="w-6 h-10 rounded-full border-2 border-gray-400/60 bg-white/10 backdrop-blur-sm flex justify-center pt-2">
                <div className="w-1 h-3 bg-gray-400/80 rounded-full animate-bounce" />
              </div>
            </div>
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

              {/* First 3 Brands + View All Card - Fully Responsive Grid Layout */}
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

                {/* View All Brands Card */}
                <Card className="text-center group hover:shadow-xl transition-all duration-300 bg-white h-full flex flex-col border-2 border-gray-300 hover:border-gray-400">
                  <CardHeader className="pb-2 sm:pb-3 md:pb-4 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-4 md:px-6">
                    <div className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 bg-gray-100 rounded-2xl sm:rounded-3xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-110 relative overflow-hidden">
                      {/* Brand logos cloud */}
                      <div className="absolute inset-0 p-1 flex flex-wrap items-center justify-center gap-0.5">
                        {/* Row 1 */}
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/1200x/5c/a8/fb/5ca8fbb105d7fe666dc22e36633107a1.jpg"
                            alt="Apple"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$"
                            alt="Samsung"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/1200x/0a/06/57/0a06573f82b48bd48f95e4a4e5dc4ca2.jpg"
                            alt="Xiaomi"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        {/* Row 2 */}
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/736x/71/71/0f/71710f762b6af383a73f9760fda3a3ae.jpg"
                            alt="Realme"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/1200x/2c/ac/2a/2cac2ac8597cc2ea27601b198ea42685.jpg"
                            alt="JBL"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/1200x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg"
                            alt="Google"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        {/* Row 3 */}
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/1200x/22/b4/6c/22b46c6e80b2f5c1f6178e08223cc726.jpg"
                            alt="Huawei"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden">
                          <Image
                            src="https://i.pinimg.com/736x/31/c4/1d/31c41de9898d1c809ab5f385a5ca88fb.jpg"
                            alt="Motorola"
                            width={20}
                            height={20}
                            className="w-full h-full object-contain opacity-80"
                          />
                        </div>
                        <div className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-sm overflow-hidden bg-gray-200 flex items-center justify-center">
                          <span className="text-[6px] sm:text-[8px] md:text-[10px] font-bold text-gray-600">
                            +7
                          </span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2">
                      View All Brands
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 pb-3 sm:pb-4 md:pb-6 px-3 sm:px-4 md:px-6 mt-auto">
                    <Link href="/brands" className="block">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full group-hover:bg-gray-900 group-hover:text-white transition-colors font-medium text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 h-auto"
                      >
                        View All Brands →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
              {/* Featured Products */}
              <section className="py-12 md:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100/30 px-4">
                <div className="container mx-auto">
                  <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                      Featured Products
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                      Discover our carefully curated selection of premium
                      technology products from leading brands.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Show featured Samsung products from our database */}
                    {featuredProducts.map((product: any, index: number) => (
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
                                product.image ||
                                "/placeholder-product.png"
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
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0 space-y-4">
                          {/* Product Features */}

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
                </div>
              </section>
              <div className="text-center mt-16 sm:mt-20 md:mt-24">
                {/* Growth Marketing Optimized CTA Section */}
                <div className="relative group">
                  {/* Premium Background Glow */}
                  <div className="absolute -inset-8 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-[2rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-all duration-700">
                    {/* Conversion-Focused Header */}
                    <div className="mb-12 sm:mb-16">
                      {/* Social Proof Badge */}

                      <h3
                        className="text-3xl sm:text-4xl md:text-5xl font-bold  mb-6 tracking-tight leading-tight bg-gradient-to-r from-blue-600 to-purple-600
                      bg-clip-text text-transparent"
                      >
                        Get Your Custom Quote
                      </h3>
                      <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed mb-4">
                        Join businesses getting competitive pricing on
                        enterprise technology solutions
                      </p>
                      {/* Value Props Bullets */}
                      <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>No minimum orders</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>Free setup included</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          <span>Enterprise support</span>
                        </div>
                      </div>
                    </div>

                    {/* High-Converting CTA Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto mb-16">
                      {/* Mobile CTA - Conversion Optimized */}
                      <div
                        className="group cursor-pointer"
                        onClick={() => openCategoryQuoteModal("smartphones")}
                      >
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-blue-50/80 to-blue-100/40 border border-blue-200/60 hover:border-blue-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                          {/* Subtle Background Pattern */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4 text-xs font-bold text-blue-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            POPULAR
                          </div>

                          <div className="relative z-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/25 group-hover:scale-110 transition-transform duration-500">
                              <Smartphone className="w-8 h-8 text-white" />
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                              Mobile Devices
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                              iPhones, Samsung Galaxy, Google Pixel
                            </p>

                            {/* ROI Highlight */}
                            <div className="bg-blue-100/80 rounded-lg p-3 mb-6">
                              <div className="text-lg font-bold text-blue-700">
                                Competitive Pricing
                              </div>
                              <div className="text-xs text-blue-600">
                                Business rates available
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all duration-300">
                              <span>Get Mobile Quote</span>
                              <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Tablet CTA - Value Focused */}
                      <div
                        className="group cursor-pointer"
                        onClick={() => openCategoryQuoteModal("tablets")}
                      >
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-purple-50/80 to-purple-100/40 border border-purple-200/60 hover:border-purple-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4 text-xs font-bold text-purple-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            TRENDING
                          </div>

                          <div className="relative z-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-600/25 group-hover:scale-110 transition-transform duration-500">
                              <Tablet className="w-8 h-8 text-white" />
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                              Business Tablets
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                              iPads, Surface Pro, enterprise tablets
                            </p>

                            {/* Volume Discount */}
                            <div className="bg-purple-100/80 rounded-lg p-3 mb-6">
                              <div className="text-lg font-bold text-purple-700">
                                Bulk Discounts
                              </div>
                              <div className="text-xs text-purple-600">
                                Starting at 5+ units
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all duration-300">
                              <span>Get Tablet Quote</span>
                              <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Smart Devices CTA - Urgency Driven */}
                      <div
                        className="group cursor-pointer"
                        onClick={() => openCategoryQuoteModal("wearables")}
                      >
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-emerald-100/40 border border-emerald-200/60 hover:border-emerald-300 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          <div className="absolute top-4 right-4 text-xs font-bold text-emerald-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            HOT
                          </div>

                          <div className="relative z-10 text-center">
                            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/25 group-hover:scale-110 transition-transform duration-500">
                              <Watch className="w-8 h-8 text-white" />
                            </div>

                            <h4 className="text-xl font-bold text-gray-900 mb-3">
                              Smart Devices
                            </h4>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                              Apple Watch, AirPods, smart accessories
                            </p>

                            {/* Exclusive Offer */}
                            <div className="bg-emerald-100/80 rounded-lg p-3 mb-6">
                              <div className="text-lg font-bold text-emerald-700">
                                Exclusive Access
                              </div>
                              <div className="text-xs text-emerald-600">
                                Latest tech first
                              </div>
                            </div>

                            <div className="inline-flex items-center gap-2 text-emerald-600 font-semibold group-hover:gap-3 transition-all duration-300">
                              <span>Get Device Quote</span>
                              <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Conversion Boosters */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          Quick Quotes
                        </h5>
                        <p className="text-sm text-gray-600">
                          Get pricing information promptly
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          Authorized Dealer
                        </h5>
                        <p className="text-sm text-gray-600">
                          Official partnerships with all major brands
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                        </div>
                        <h5 className="font-semibold text-gray-900 mb-2">
                          Competitive Pricing
                        </h5>
                        <p className="text-sm text-gray-600">
                          We work to offer competitive rates
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-white"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,theme(colors.blue.100),transparent_50%)] opacity-40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,theme(colors.indigo.100),transparent_50%)] opacity-30"></div>

            <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative">
              {/* Hero Header */}
              <div className="text-center mb-16 md:mb-20">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/40 shadow-sm mb-6">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-600">
                    Business Excellence
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  Why Choose
                  <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    MountPole
                  </span>
                </h2>

                <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                  Professional technology partnerships built on trust,
                  expertise, and
                  <span className="font-semibold text-slate-700">
                    {" "}
                    exceptional service delivery
                  </span>
                </p>
              </div>

              {/* Benefits Grid - Modern Card Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                {/* Wholesale Expertise */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Wholesale Expertise
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Reliable bulk supply and competitive margins for
                        resellers
                      </p>
                    </div>
                  </div>
                </div>

                {/* Account Management */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Account Management
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Personal account manager for seamless procurement
                      </p>
                    </div>
                  </div>
                </div>

                {/* Volume Pricing */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-yellow-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Volume Pricing
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Competitive bulk pricing for enterprise orders
                      </p>
                    </div>
                  </div>
                </div>

                {/* Fast Deployment */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Monitor className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Fast Deployment
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Quick device setup and configuration services
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Benefits Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
                {/* Global Reach */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Global Reach
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Serving partners across USA, Canada, Latin America, and
                        beyond
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trusted Brands */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Shield className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Trusted Brands
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Premium electronics and lifestyle products
                      </p>
                    </div>
                  </div>
                </div>

                {/* Innovation Focus */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Innovation Focus
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Latest mobile and consumer technology solutions
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quality Assurance */}
                <div className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl p-6 md:p-8 hover:bg-white/90 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 h-full">
                    <div className="flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Smartphone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Quality Assurance
                      </h3>
                      <p className="text-slate-600 leading-relaxed flex-1">
                        Rigorous quality checks and authentic products
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium CTA Section */}
              <div className="text-center">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white mb-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                  <span className="font-semibold">Ready to Partner?</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
                  Transform Your Business with
                  <span className="block text-blue-600">
                    Professional Technology Solutions
                  </span>
                </h3>

                <p className="text-lg text-slate-600 mb-10 max-w-2xl mx-auto">
                  Join successful businesses that trust MountPole for reliable
                  wholesale technology, dedicated support, and competitive
                  partnerships.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact?type=services">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Start Your Partnership
                    </Button>
                  </Link>
                  <Link href="/partnership?source=homepage-cta&intent=enterprise&utm_campaign=business-partnerships">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold bg-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section - World-Class UI/UX Design */}
          <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 overflow-hidden">
            {/* Advanced Background with Multiple Gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/30 via-transparent to-transparent"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-100/20 via-transparent to-transparent"></div>

            {/* Animated Background Elements */}
            <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

            <div className="container mx-auto max-w-7xl relative z-10">
              {/* Premium Header with Staggered Animation */}
              <div className="text-center mb-16 sm:mb-20 md:mb-24">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200/50 rounded-full text-sm text-blue-700 font-medium mb-6 backdrop-blur-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  Enterprise Solutions
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                    Technology That Powers
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                    Modern Business
                  </span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
                  Comprehensive device ecosystems designed for modern business
                  needs.
                  <span className="text-blue-600 font-medium">
                    Supporting businesses of all sizes
                  </span>
                  with technology solutions that grow with your requirements.
                </p>
              </div>

              {/* World-Class Uniform Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                {/* Mobile Solutions */}
                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
                  <Card className="relative h-full bg-white/80 backdrop-blur-xl border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white/50 to-blue-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full p-8">
                      {/* Icon Container */}
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-full h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Smartphone className="w-10 h-10 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="text-center flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 mb-4">
                          Mobile
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light mb-6 flex-1">
                          iPhones, Samsung Galaxy, and Google Pixel for your
                          team. We set them up with business apps and security.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            iOS & Android
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            Setup Included
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            Security Ready
                          </span>
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          Get Mobile Quote
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Tablets Solutions */}
                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
                  <Card className="relative h-full bg-white/80 backdrop-blur-xl border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white/50 to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full p-8">
                      {/* Icon Container */}
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-full h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Tablet className="w-10 h-10 text-white drop-shadow-lg" />
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="text-center flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-900 transition-colors duration-300 mb-4">
                          Tablets
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light mb-6 flex-1">
                          iPads and Surface tablets for work. Perfect for
                          restaurants, hospitals, retail stores, and field
                          teams.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            iPad Pro
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            Wall Mounts
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            POS Ready
                          </span>
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          Get Tablet Quote
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Audio Solutions */}
                <div className="group relative h-full">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-all duration-700"></div>
                  <Card className="relative h-full bg-white/80 backdrop-blur-xl border-0 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden group-hover:scale-[1.02] group-hover:-translate-y-2 flex flex-col">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 via-white/50 to-orange-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full p-8">
                      {/* Icon Container */}
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                          <div className="relative w-full h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <svg
                              className="w-10 h-10 text-white drop-shadow-lg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Text Content */}
                      <div className="text-center flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-900 transition-colors duration-300 mb-4">
                          Audio
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed font-light mb-6 flex-1">
                          Speakers, sound systems, and smart office devices.
                          Make your workplace sound better and work smarter.
                        </p>

                        {/* Feature Pills */}
                        <div className="flex flex-wrap gap-2 justify-center mb-6">
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            JBL Speakers
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            Smart Setup
                          </span>
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                            IoT Ready
                          </span>
                        </div>

                        {/* CTA Button */}
                        <Button className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                          Get Audio Quote
                          <svg
                            className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              {/* World-Class CTA Section */}
              <div className="mt-20 sm:mt-24 md:mt-32">
                <div className="relative group">
                  {/* Layered Background Effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-700 animate-gradient-x"></div>
                  <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-40 transition-opacity duration-700"></div>

                  <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-12 md:p-16 border border-white/50 shadow-2xl overflow-hidden">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                    {/* Content */}
                    <div className="relative z-10 text-center">
                      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200/50 rounded-full text-sm text-blue-700 font-semibold mb-8">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        Enterprise Consultation
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                      </div>

                      <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8">
                        <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                          Ready to Transform
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
                          Your Enterprise?
                        </span>
                      </h3>

                      <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 sm:mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                        Connect with our technology specialists to discuss
                        custom solutions for your business requirements.
                      </p>

                      {/* Premium CTAs */}
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12">
                        <Button
                          size="lg"
                          className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <span className="relative flex items-center gap-2">
                            Schedule Strategy Call
                            <svg
                              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </span>
                        </Button>
                      </div>

                      {/* Trust Indicators with Premium Styling */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
                        <div className="group">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-2xl mb-3 group-hover:bg-blue-200 transition-colors duration-300">
                            <Shield className="w-6 h-6 text-blue-600" />
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Enterprise Grade
                          </p>
                          <p className="text-xs text-gray-600">
                            Authorized partnerships with leading brands
                          </p>
                        </div>

                        <div className="group">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-100 rounded-2xl mb-3 group-hover:bg-emerald-200 transition-colors duration-300">
                            <svg
                              className="w-6 h-6 text-emerald-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Fast Response
                          </p>
                          <p className="text-xs text-gray-600">
                            Custom quotes delivered promptly
                          </p>
                        </div>

                        <div className="group">
                          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-2xl mb-3 group-hover:bg-purple-200 transition-colors duration-300">
                            <svg
                              className="w-6 h-6 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">
                            Proven Experience
                          </p>
                          <p className="text-xs text-gray-600">
                            Successful business technology deployments
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose MountPole - World-Class Design */}
        </>
      )}
    </div>
  );
}
