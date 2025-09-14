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
import { HuaweiLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Camera,
  Wifi,
  Globe,
  Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function HuaweiPage() {
  // Filter Huawei products from the JSON data
  const huaweiProducts = productsData.products.filter(
    (product) => product.brand === "Huawei"
  );

  // Group products by category
  const productsByCategory = huaweiProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof huaweiProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Huawei Smartphones",
      route: "/smartphones",
    },
    Laptops: {
      icon: Laptop,
      displayName: "MateBook Series",
      route: "/laptops",
    },
  };

  const highlights = [
    {
      title: "Leica Photography",
      description: "Professional photography powered by Leica partnership",
      icon: <Camera className="h-8 w-8" />,
    },
    {
      title: "5G Leadership",
      description: "Pioneer in 5G technology and network infrastructure",
      icon: <Wifi className="h-8 w-8" />,
    },
    {
      title: "Seamless Ecosystem",
      description: "Devices that work together intelligently across platforms",
      icon: <Globe className="h-8 w-8" />,
    },
  ];

  const innovations = [
    {
      title: "Kirin Chipsets",
      description: "Self-developed processors for optimal performance",
      details: "AI-powered processing with industry-leading efficiency",
    },
    {
      title: "SuperCharge Technology",
      description: "Fast charging solutions for all device categories",
      details: "From 40W wireless to 100W wired charging capabilities",
    },
    {
      title: "HarmonyOS",
      description: "Distributed operating system for all scenarios",
      details: "Seamless connectivity across phones, tablets, and IoT devices",
    },
    {
      title: "Multi-Screen Collaboration",
      description: "Work seamlessly across multiple devices",
      details: "Share screens, files, and applications effortlessly",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <HuaweiLogo className="w-16 h-16 text-red-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Make It Possible
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Experience the future with Huawei&apos;s innovative technology
              ecosystem. From smartphones with Leica cameras to powerful laptops
              and seamless connectivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/smartphones">
                <Button
                  size="lg"
                  className="bg-white text-red-600 hover:bg-red-50"
                >
                  Explore Products
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-red-600"
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
            Huawei Innovation Ecosystem
          </h2>

          {Object.entries(productsByCategory).map(([category, products]) => {
            const config =
              categoryConfig[category as keyof typeof categoryConfig];
            if (!config) return null;

            return (
              <div key={category} className="mb-12">
                <div className="flex items-center mb-6">
                  <config.icon className="h-8 w-8 text-red-600 mr-3" />
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
                        <div className="aspect-square bg-gradient-to-br from-red-50 to-red-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                          {product.images && product.images[0] ? (
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              width={200}
                              height={200}
                              className="object-contain p-4"
                            />
                          ) : (
                            <config.icon className="h-16 w-16 text-red-600" />
                          )}
                        </div>
                        <CardTitle className="text-lg group-hover:text-red-600 transition-colors">
                          {product.name}
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                          {product.description ||
                            "Premium Huawei product with innovative features"}
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
                                  className="text-xs bg-red-100"
                                >
                                  {feature}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        <div className="pt-2">
                          <Link href={config.route}>
                            <Button
                              className="w-full bg-red-600 hover:bg-red-700"
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

      {/* Huawei Highlights */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Huawei Excellence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-red-600">
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
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Lightbulb className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">
              Technology Leadership
            </h2>
            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
              Huawei leads in research and development, investing heavily in
              breakthrough technologies that shape the future of connectivity,
              artificial intelligence, and user experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovations.map((innovation, index) => (
              <Card key={index} className="border border-red-200">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">
                    {innovation.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    {innovation.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{innovation.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leica Partnership */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Camera className="h-12 w-12 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Leica Camera Partnership
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Our strategic partnership with Leica brings legendary camera
              excellence to smartphone photography. Experience
              professional-grade image quality, advanced optics, and
              computational photography that captures every moment with stunning
              detail.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Camera Innovation
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Leica Optics Technology
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Variable Aperture System
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Ultra-Wide Photography
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Professional Portrait Mode
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Computational Photography
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    AI-Enhanced Processing
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Night Mode Excellence
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    HDR+ Technology
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Professional Video Recording
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
