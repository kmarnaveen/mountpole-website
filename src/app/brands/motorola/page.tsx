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
import { MotorolaLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Shield,
  Zap,
  Brush,
  History,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function MotorolaPage() {
  // Filter Motorola products from the JSON data
  const motorolaProducts = productsData.products.filter(
    (product) => product.brand.toLowerCase() === "motorola"
  );

  // Group products by category
  const productsByCategory = motorolaProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof motorolaProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Motorola Smartphones",
      route: "/smartphones",
    },
  };

  const highlights = [
    {
      title: "Pure Android",
      description:
        "Clean, bloatware-free Android experience with timely updates",
      icon: <Shield className="h-8 w-8" />,
    },
    {
      title: "Ready For",
      description: "Transform your phone into a desktop experience",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Moto Actions",
      description: "Intuitive gestures that make your phone smarter",
      icon: <Brush className="h-8 w-8" />,
    },
  ];

  const heritage = [
    {
      year: "1928",
      milestone: "Founded as Galvin Manufacturing Corporation",
    },
    {
      year: "1973",
      milestone: "Invented the first handheld mobile phone",
    },
    {
      year: "1983",
      milestone: "Launched DynaTAC, the first commercial cell phone",
    },
    {
      year: "2024",
      milestone: "Leading innovation in foldable smartphones",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <MotorolaLogo className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hello Moto</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              From inventing the mobile phone to pioneering foldable technology,
              Motorola continues to shape the future of mobile communications.
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
                  Our Heritage
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
            Motorola Innovation
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6 justify-center">
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
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <Smartphone className="h-16 w-16 text-blue-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="space-y-4">
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
    </div>
  );
}
