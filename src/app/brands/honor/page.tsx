"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HonorLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Zap,
  Eye,
  Users,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function HonorPage() {
  // Filter Honor products from the JSON data
  const honorProducts = productsData.products.filter(
    (product) => product.brand.toLowerCase() === "honor"
  );

  // Group products by category
  const productsByCategory = honorProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof honorProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Honor Smartphones",
      route: "/smartphones",
    },
    Laptops: {
      icon: Laptop,
      displayName: "MagicBook Series",
      route: "/laptops",
    },
  };

  const highlights = [
    {
      title: "Eye Comfort",
      description: "Industry-leading eye protection with natural color display",
      icon: <Eye className="h-8 w-8" />,
    },
    {
      title: "Magic Performance",
      description: "Powerful processors optimized for seamless user experience",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Honor For All",
      description: "Technology that empowers and connects global communities",
      icon: <Users className="h-8 w-8" />,
    },
  ];

  const magicFeatures = [
    {
      title: "Magic UI",
      description: "Intuitive interface designed for modern lifestyles",
      icon: <Crown className="h-6 w-6" />,
    },
    {
      title: "Honor Turbo",
      description: "System optimization for peak performance",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "AI Photography",
      description: "Intelligent scene recognition and enhancement",
      icon: <Eye className="h-6 w-6" />,
    },
    {
      title: "Multi-Screen Collaboration",
      description: "Seamless connectivity across all your devices",
      icon: <Laptop className="h-6 w-6" />,
    },
  ];

  const sustainability = [
    "Carbon Neutral Manufacturing",
    "Recyclable Packaging Materials",
    "Energy Efficient Components",
    "Extended Device Lifespan",
    "Responsible Supply Chain",
    "Green Technology Innovation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <HonorLogo className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Honor Magic</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the magic of technology that understands you. Honor
              creates intelligent devices that enhance your life with intuitive
              design and powerful performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Discover Magic
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Honor Magic Series
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6">
                  <config.icon className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    {config.displayName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-300 border border-gray-200"
                    >
                      <CardHeader className="pb-4">
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <config.icon className="h-16 w-16 text-blue-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
