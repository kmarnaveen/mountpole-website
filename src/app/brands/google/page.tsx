"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GoogleLogo } from "@/components/BrandLogos";
import {
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  GamepadIcon,
  ChevronRight,
  Brain,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function GooglePage() {
  // Filter Google products from the JSON data
  const googleProducts = productsData.products.filter(
    (product) => product.brand.toLowerCase() === "google"
  );

  // Group products by category
  const productsByCategory = googleProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof googleProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Pixel Smartphones",
      route: "/smartphones",
    },
    Tablets: { icon: Tablet, displayName: "Pixel Tablets", route: "/tablets" },
    Gaming: {
      icon: GamepadIcon,
      displayName: "Gaming",
      route: "/gaming",
    },
    Wearables: { icon: Watch, displayName: "Pixel Watch", route: "/wearables" },
    Audio: { icon: Headphones, displayName: "Audio", route: "/audio" },
  };

  const highlights = [
    {
      title: "Gemini AI",
      description: "Advanced AI features built into every Pixel device",
      icon: "🧠",
    },
    {
      title: "Pure Android",
      description: "Clean Android experience with fast updates",
      icon: "🤖",
    },
    {
      title: "Computational Photography",
      description: "AI-powered camera features for stunning photos",
      icon: "📸",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-green-500 to-yellow-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <GoogleLogo className="w-16 h-16" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Made by Google
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experience the best of Google with Pixel devices. Built with
              advanced AI, pure Android, and the latest Google innovations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                >
                  Explore Pixel
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
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
            Pixel Product Family
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
                        <div className="aspect-square bg-gradient-to-br from-blue-50 via-green-50 to-yellow-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
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

      {/* Google Highlights */}
    </div>
  );
}
