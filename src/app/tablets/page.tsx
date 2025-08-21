"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppleLogo, SamsungLogo, GoogleLogo } from "@/components/BrandLogos";
import {
  Tablet,
  Battery,
  Wifi,
  Camera,
  Cpu,
  HardDrive,
  Paintbrush,
  BookOpen,
  Music,
  Video,
  Gamepad2,
  Pencil,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/skeletons/ProductSkeleton";
import productsData from "../../../products.json";

export default function TabletsPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Filter tablets from the products data
  const tablets = productsData.products.filter(
    (product: (typeof productsData.products)[0]) =>
      product.category === "Tablets"
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Pro", "Standard", "Plus", "Ultra"];
  const brands = ["All", "Apple", "Samsung", "Google"];

  const useCases = [
    {
      icon: Paintbrush,
      title: "Creative Work",
      description:
        "Digital art, photo editing, and design with precision stylus support",
    },
    {
      icon: BookOpen,
      title: "Reading & Learning",
      description: "E-books, digital magazines, and educational content",
    },
    {
      icon: Video,
      title: "Entertainment",
      description: "Streaming, gaming, and multimedia consumption",
    },
    {
      icon: Pencil,
      title: "Note Taking",
      description: "Digital notes, sketching, and handwriting recognition",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Tablet className="mx-auto h-16 w-16 text-blue-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Tablets
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Discover powerful tablets from Apple, Samsung, and Google. Perfect
            for creativity, productivity, entertainment, and everything in
            between.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700">Categories:</span>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="font-medium text-gray-700">Brands:</span>
              {brands.map((brand) => (
                <Badge
                  key={brand}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {brand}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Tablets
          </h2>
          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tablets.map((tablet) => (
                <Card
                  key={tablet.id}
                  className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                      <Image
                        src={tablet.images[0]}
                        alt={tablet.name}
                        width={200}
                        height={192}
                        className="w-full h-full object-contain p-4"
                      />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-blue-600">
                      {tablet.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">
                        {tablet.brand}
                      </span>
                    </div>
                    <CardTitle className="text-lg">{tablet.name}</CardTitle>
                    <CardDescription className="text-gray-600">
                      {tablet.description ||
                        "Premium tablet with advanced features"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center">
                          <Tablet className="h-4 w-4 mr-2 text-gray-500" />
                          {tablet.specifications.display || "N/A"}
                        </div>
                        <div className="flex items-center">
                          <Cpu className="h-4 w-4 mr-2 text-gray-500" />
                          {tablet.specifications.chip || "N/A"}
                        </div>
                        <div className="flex items-center">
                          <HardDrive className="h-4 w-4 mr-2 text-gray-500" />
                          {tablet.specifications.storage || "N/A"}
                        </div>
                        <div className="flex items-center">
                          <Camera className="h-4 w-4 mr-2 text-gray-500" />
                          {tablet.specifications.camera || "N/A"}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {tablet.features.slice(0, 3).map((feature, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {feature}
                          </Badge>
                        ))}
                      </div>

                      <Link href={`/product/${tablet.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Perfect for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <useCase.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{useCase.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose These Tablets?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Battery className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <CardTitle>All-Day Battery</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Up to 10+ hours of video playback and productivity tasks. Fast
                  charging gets you back to full power quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Wifi className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>5G & Wi-Fi 6</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Stay connected anywhere with blazing-fast cellular and Wi-Fi
                  speeds. Perfect for remote work and streaming.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <Gamepad2 className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Desktop-Class Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Powerful processors handle demanding apps, multitasking,
                  gaming, and creative work with ease.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Find Your Perfect Tablet
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you&apos;re a creative professional, student, or
            entertainment enthusiast, there&apos;s a tablet here that fits your
            needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tablets">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse All Tablets
              </Button>
            </Link>
            <Link href="/brands/apple">
              <Button size="lg" variant="outline">
                Browse by Brand
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
