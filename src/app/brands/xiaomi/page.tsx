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
import { XiaomiLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  Headphones,
  Zap,
  Heart,
  Cpu,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function XiaomiPage() {
  // Filter Xiaomi products from the JSON data
  const xiaomiProducts = productsData.products.filter(
    (product) => product.brand === "Xiaomi"
  );

  // Group products by category
  const productsByCategory = xiaomiProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof xiaomiProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Xiaomi & Redmi Smartphones",
      route: "/smartphones",
    },
    Tablets: {
      icon: Tablet,
      displayName: "Mi Pad & Laptops",
      route: "/tablets",
    },
    "Monitors & Displays": {
      icon: Monitor,
      displayName: "Mi Displays",
      route: "/monitors",
    },
    Wearables: {
      icon: Watch,
      displayName: "Mi Watch & Bands",
      route: "/wearables",
    },
    Audio: { icon: Headphones, displayName: "Mi Audio", route: "/audio" },
  };

  const highlights = [
    {
      title: "Flagship Performance",
      description: "Snapdragon flagship chips at unbeatable prices",
      icon: <Cpu className="h-8 w-8" />,
    },
    {
      title: "Fast Charging",
      description: "Industry-leading charging speeds up to 120W",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Community Driven",
      description: "Built with feedback from Mi Fans worldwide",
      icon: <Heart className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <XiaomiLogo className="w-16 h-16 text-orange-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Innovation for Everyone
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl mx-auto">
              Discover Xiaomi&apos;s ecosystem of smartphones, smart devices,
              and lifestyle products. Flagship performance at incredible prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-orange-600"
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
            Xiaomi Product Ecosystem
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6">
                  <config.icon className="h-8 w-8 text-orange-600 mr-3" />
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
                        <div className="aspect-square bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <config.icon className="h-16 w-16 text-orange-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {product.description ||
                            "Premium Xiaomi product with innovative features"}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-gray-700">
                            Key Features:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {product.features
                              .slice(0, 3)
                              .map((feature, featureIndex) => (
                                <Badge
                                  key={featureIndex}
                                  variant="secondary"
                                  className="text-xs bg-orange-100"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link href={config.route}>
                            <Button
                              className="w-full bg-orange-600 hover:bg-orange-700"
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

      {/* Xiaomi Highlights */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            The Xiaomi Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-orange-600">
                    {highlight.icon}
                  </div>
                  <CardTitle className="text-xl">{highlight.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{highlight.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Innovation for Everyone
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Xiaomi democratizes innovation by making cutting-edge technology
              accessible to everyone. From flagship smartphones with Leica
              cameras to lightning-fast charging solutions, we continue to push
              boundaries while keeping prices honest.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Latest Technologies
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Leica Camera Partnership
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    120W HyperCharge Technology
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Snapdragon 8 Gen 3 Performance
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    MIUI 15 Experience
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Mi Ecosystem</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Smart Home Integration
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Seamless Device Connection
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Regular MIUI Updates
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Global Community Access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
