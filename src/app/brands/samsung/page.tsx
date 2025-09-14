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
import { SamsungLogo } from "@/components/BrandLogos";
import {
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  ChevronRight,
  Zap,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function SamsungPage() {
  // Filter Samsung products from the JSON data
  const samsungProducts = productsData.products.filter(
    (product) => product.brand === "Samsung"
  );

  // Group products by category
  const productsByCategory = samsungProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof samsungProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Galaxy Smartphones",
      route: "/smartphones",
    },
    Tablets: { icon: Tablet, displayName: "Galaxy Tablets", route: "/tablets" },
    "Monitors & Displays": {
      icon: Monitor,
      displayName: "Displays & Monitors",
      route: "/monitors",
    },
    Wearables: {
      icon: Watch,
      displayName: "Galaxy Watch",
      route: "/wearables",
    },
    Audio: { icon: Headphones, displayName: "Galaxy Audio", route: "/audio" },
  };

  const highlights = [
    {
      title: "Galaxy AI",
      description: "AI-powered features across all Galaxy devices",
      icon: "🤖",
    },
    {
      title: "One UI",
      description: "Intuitive and customizable user experience",
      icon: "📱",
    },
    {
      title: "Innovation Hub",
      description: "Leading in display, camera, and mobile technology",
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <SamsungLogo className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Do What You Can&apos;t
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore Samsung Galaxy&apos;s complete ecosystem of smartphones,
              tablets, watches, and more. Experience innovation that empowers
              your everyday.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-blue-900 hover:bg-blue-50"
                >
                  Explore Galaxy
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-900"
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
            Galaxy Product Ecosystem
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
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
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
                        <CardDescription className="text-gray-600">
                          {product.description ||
                            "Premium Samsung product with innovative features"}
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
                                  className="text-xs bg-blue-100"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link href={config.route}>
                            <Button
                              className="w-full bg-blue-600 hover:bg-blue-700"
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

      {/* Samsung Highlights */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Samsung Galaxy Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="text-4xl mb-4">{highlight.icon}</div>
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
            Leading Innovation
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Samsung continues to lead the mobile industry with groundbreaking
              innovations. From foldable displays to advanced camera systems and
              AI integration, Galaxy devices are designed to enhance every
              aspect of your digital life.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Latest Innovations
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Galaxy AI across all devices
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    200MP camera with AI enhancement
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Foldable display technology
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />S Pen
                    integration
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">Sustainability</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Eco-friendly packaging
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Recycled materials
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Energy-efficient manufacturing
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                    Galaxy Upcycling program
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
