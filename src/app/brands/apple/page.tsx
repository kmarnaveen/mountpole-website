"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppleLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Shield,
  Lock,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  GamepadIcon,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function ApplePage() {
  // Filter Apple products from the JSON data
  const appleProducts = productsData.products.filter(
    (product) => product.brand.toLowerCase() === "apple"
  );

  // Group products by category
  const productsByCategory = appleProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof appleProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "iPhone",
      route: "/smartphones",
    },
    Tablets: { icon: Tablet, displayName: "iPad", route: "/tablets" },
    Gaming: {
      icon: GamepadIcon,
      displayName: "Gaming",
      route: "/gaming",
    },
    Wearables: { icon: Watch, displayName: "Apple Watch", route: "/wearables" },
    Audio: { icon: Headphones, displayName: "Audio", route: "/audio" },
  };

  const highlights = [
    {
      title: "Seamless Ecosystem",
      icon: "🔄",
    },
    {
      title: "Privacy First",
      icon: "🔒",
    },
    {
      title: "Premium Build",
      icon: "💎",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <AppleLogo className="w-16 h-16 text-black" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Think Different
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover Apple&apos;s complete lineup of innovative products. From
              iPhone to Mac, experience technology that just works.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-gray-100"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Learn More
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
            Apple Product Lineup
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6">
                  <config.icon className="h-8 w-8 text-gray-600 mr-3" />
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
                        <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <config.icon className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-gray-600 transition-colors">
                          {product.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="pt-2">
                          <Link href={config.route}>
                            <Button
                              className="w-full bg-black hover:bg-gray-800"
                              size="sm"
                            >
                              Learn More
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Apple Highlights */}
    </div>
  );
}
