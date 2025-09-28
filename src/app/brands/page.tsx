"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AppleLogo,
  SamsungLogo,
  GoogleLogo,
  XiaomiLogo,
  RealmeLogo,
  MotorolaLogo,
  JBLLogo,
  HuaweiLogo,
  HonorLogo,
} from "@/components/BrandLogos";
import { ChevronRight, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import productsData from "../../../products.json";

export default function BrandsPage() {
  // Calculate brand statistics
  const brandStats = productsData.products.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = {
        count: 0,
        categories: new Set(),
      };
    }

    const brandData = acc[product.brand];
    brandData.count++;
    brandData.categories.add(product.category);

    return acc;
  }, {} as Record<string, { count: number; categories: Set<string> }>);

  // Convert categories set to array for display
  const brandStatsForDisplay = Object.keys(brandStats).reduce((acc, brand) => {
    acc[brand] = {
      count: brandStats[brand].count,
      categories: Array.from(brandStats[brand].categories),
    };
    return acc;
  }, {} as Record<string, { count: number; categories: string[] }>);

  const brands = [
    {
      name: "Apple",
      logo: AppleLogo,
      tagline: "Innovation at its finest",
      href: "/brands/apple",
      color: "black",
      gradient: "from-gray-900 to-black",
      highlights: [
        "Premium Build Quality",
        "Seamless Ecosystem",
        "Privacy Focused",
      ],
      categories: brandStatsForDisplay.APPLE?.categories || [],
      productCount: brandStatsForDisplay.APPLE?.count || 0,
    },
    {
      name: "Samsung",
      logo: SamsungLogo,
      tagline: "Galaxy of possibilities",
      href: "/brands/samsung",
      color: "blue-600",
      gradient: "from-blue-600 to-blue-800",
      categories: brandStatsForDisplay.SAMSUNG?.categories || [],
      productCount: brandStatsForDisplay.SAMSUNG?.count || 0,
    },
    {
      name: "Google",
      logo: GoogleLogo,
      tagline: "AI-powered simplicity",
      href: "/brands/google",
      color: "blue-500",
      gradient: "from-blue-500 to-green-500",
      categories: brandStatsForDisplay.Google?.categories || [],
      productCount: brandStatsForDisplay.Google?.count || 0,
    },
    {
      name: "Xiaomi",
      logo: XiaomiLogo,
      tagline: "Innovation for everyone",
      href: "/brands/xiaomi",
      color: "orange-600",
      gradient: "from-orange-600 to-orange-500",
      categories: brandStatsForDisplay.Xiaomi?.categories || [],
      productCount: brandStatsForDisplay.Xiaomi?.count || 0,
    },
    {
      name: "Realme",
      logo: RealmeLogo,
      tagline: "Dare to leap",
      href: "/brands/realme",
      color: "yellow-600",
      gradient: "from-yellow-500 to-amber-500",
      categories: brandStatsForDisplay.Realme?.categories || [],
      productCount: brandStatsForDisplay.Realme?.count || 0,
    },
    {
      name: "Motorola",
      logo: MotorolaLogo,
      tagline: "Mobile innovation pioneer",
      href: "/brands/motorola",
      color: "blue-600",
      gradient: "from-blue-600 to-indigo-600",
      categories: brandStatsForDisplay.Motorola?.categories || [],
      productCount: brandStatsForDisplay.Motorola?.count || 0,
    },
    {
      name: "JBL",
      logo: JBLLogo,
      tagline: "Legendary audio experience",
      href: "/brands/jbl",
      color: "orange-600",
      gradient: "from-orange-600 to-red-500",
      categories: brandStatsForDisplay.JBL?.categories || [],
      productCount: brandStatsForDisplay.JBL?.count || 0,
    },
    {
      name: "Huawei",
      logo: HuaweiLogo,
      tagline: "Technology leadership",
      href: "/brands/huawei",
      color: "red-600",
      gradient: "from-red-600 to-red-500",
      categories: brandStatsForDisplay.Huawei?.categories || [],
      productCount: brandStatsForDisplay.Huawei?.count || 0,
    },
    {
      name: "Honor",
      logo: HonorLogo,
      tagline: "Intelligent magic",
      href: "/brands/honor",
      color: "blue-600",
      gradient: "from-blue-600 to-purple-600",
      categories: brandStatsForDisplay.Honor?.categories || [],
      productCount: brandStatsForDisplay.Honor?.count || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Trusted{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Brands
            </span>
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-8">
            MountPole proudly distributes the world&apos;s most trusted
            technology brands. From Apple&apos;s innovation to Samsung&apos;s
            cutting-edge displays, we bring you authentic products from leading
            manufacturers worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Authorized Distributor</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Genuine Products</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Global Wholesale</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Brand Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              As an authorized global distributor, we partner with leading
              brands to bring you authentic products with competitive wholesale
              pricing and reliable supply chains.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Card
                key={brand.name}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Brand Header */}
                <div
                  className={`bg-gradient-to-r ${brand.gradient} p-8 text-white relative`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <brand.logo className="w-12 h-12 text-gray-900" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-center text-white/90 font-medium">
                      {brand.tagline}
                    </p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <Link href={brand.href}>
                    <Button
                      className={`w-full bg-${brand.color} hover:bg-${brand.color}/90 group-hover:shadow-lg transition-all duration-300`}
                      size="lg"
                    >
                      Explore {brand.name} Products
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect device for your needs. Compare features and
            find your next tech companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/smartphones">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Browse All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
