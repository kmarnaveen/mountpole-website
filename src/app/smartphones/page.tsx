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
import { Smartphone, Zap, Camera, Battery, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductGridSkeleton } from "@/components/skeletons/ProductSkeleton";
import productsData from "../../../products.json";

export default function SmartphonesPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Filter smartphones from the products data
  const smartphones = productsData.products.filter(
    (product: { category: string }) => product.category === "Smartphones"
  );

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Smartphone className="mx-auto h-16 w-16 text-cyan-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Smartphones</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Discover the latest smartphones from Apple, Samsung, and Google.
              Explore features, specifications, and find your perfect device.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 border-b bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                All Brands
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Apple
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Samsung
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Google
              </Badge>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Latest
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Price: Low to High
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-blue-50"
              >
                Most Popular
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <ProductGridSkeleton />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {smartphones.map((phone: (typeof productsData.products)[0]) => (
                <Card
                  key={phone.id}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
                >
                  <CardHeader className="pb-4">
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      {phone.images && phone.images[0] ? (
                        <Image
                          src={phone.images[0]}
                          alt={phone.name}
                          width={200}
                          height={267}
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <Smartphone className="h-16 w-16 text-gray-400" />
                      )}
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-cyan-500">{phone.brand}</Badge>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                      {phone.name}
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      {phone.description ||
                        "High-quality smartphone with premium features"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Key Features */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-gray-700">
                        Key Features:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {phone.features
                          .slice(0, 4)
                          .map((feature: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {feature}
                            </Badge>
                          ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 space-y-2">
                      <Link href={`/product/${phone.id}`}>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          View Details
                        </Button>
                      </Link>
                      <Link href={`/brands/${phone.brand.toLowerCase()}`}>
                        <Button className="w-full" variant="outline">
                          View Brand
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Why Choose These Smartphones?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Advanced Camera Systems</h3>
              <p className="text-gray-600">
                Pro-level photography with AI-enhanced features
              </p>
            </div>

            <div className="text-center">
              <Cpu className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Flagship Performance</h3>
              <p className="text-gray-600">
                Latest processors for seamless multitasking
              </p>
            </div>

            <div className="text-center">
              <Battery className="mx-auto h-12 w-12 text-purple-600 mb-4" />
              <h3 className="font-semibold mb-2">All-Day Battery</h3>
              <p className="text-gray-600">
                Fast charging and wireless charging capabilities
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
