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
import { RealmeLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Camera,
  Zap,
  Gamepad2,
  Users,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function RealmePage() {
  // Filter Realme products from the JSON data
  const realmeProducts = productsData.products.filter(
    (product) => product.brand === "Realme"
  );

  // Group products by category
  const productsByCategory = realmeProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof realmeProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Realme Smartphones",
      route: "/smartphones",
    },
  };

  const highlights = [
    {
      title: "Dare to Leap",
      description: "Bold designs that push boundaries and inspire courage",
      icon: <Sparkles className="h-8 w-8" />,
    },
    {
      title: "Photography Pro",
      description: "Advanced camera systems for stunning photos",
      icon: <Camera className="h-8 w-8" />,
    },
    {
      title: "Gaming Beast",
      description: "Optimized performance for mobile gaming excellence",
      icon: <Gamepad2 className="h-8 w-8" />,
    },
  ];

  const innovations = [
    "240W SuperDart Charging",
    "50MP Sony IMX890 Camera",
    "Dimensity 7050 Performance",
    "120Hz AMOLED Display",
    "Realme UI 5.0",
    "GT Mode Gaming",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <RealmeLogo className="w-16 h-16 text-yellow-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Dare to Leap
            </h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto">
              Experience the courage to push boundaries with Realme&apos;s bold
              smartphone technology. Designed for the fearless, built for the
              future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-yellow-600 hover:bg-yellow-50"
                >
                  Explore Smartphones
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-yellow-600"
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
            Realme Smartphone Series
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6 justify-center">
                  <config.icon className="h-8 w-8 text-yellow-600 mr-3" />
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
                        <div className="aspect-square bg-gradient-to-br from-yellow-50 to-amber-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <Smartphone className="h-16 w-16 text-yellow-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-yellow-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {product.description ||
                            "Premium Realme product with innovative features"}
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
                                  className="text-xs bg-yellow-100"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link href={config.route}>
                            <Button
                              className="w-full bg-yellow-600 hover:bg-yellow-700"
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

      {/* Realme Highlights */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            The Realme Spirit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-yellow-600">
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
            Bold Innovation
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Realme champions the spirit of youth with cutting-edge technology
              that dares to be different. We create smartphones that not only
              perform exceptionally but also inspire confidence to leap forward
              into the future.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {innovations.map((innovation, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-lg border border-yellow-200"
                >
                  <div className="flex items-center justify-center mb-3">
                    <Zap className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {innovation}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Users className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Join the Realme Community</h2>
          <p className="text-xl text-yellow-100 max-w-2xl mx-auto mb-8">
            Be part of a global community that dares to leap forward. Share your
            experiences, get support, and discover new ways to make the most of
            your Realme device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-yellow-600 hover:bg-yellow-50"
            >
              Join Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-yellow-600"
            >
              Customer Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
