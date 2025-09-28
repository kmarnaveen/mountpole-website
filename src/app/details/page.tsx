"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Smartphone,
  Battery,
  Camera,
  Cpu,
  HardDrive,
  Monitor,
  Palette,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Sample product data - in a real app, this would come from props or API
const productData = {
  id: "iphone-15-pro",
  name: "iPhone 15 Pro",
  brand: "Apple",
  category: "Smartphone",
  inStock: true,
  images: [
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=webp&qlt=90&.v=cHJOTXEwTU92OEtKVDV2cVB1R2FTSjlERndlRTljaUdZeHJGM3dlLzR2OUFsUUpuUVQ3cUdJUXc0NW5mTVpFdE9MekhWSGZtV1pvV240QzNuTk80VS9jVTIwcEJjL3Axby9SNE1Ma0phb1dEdlJGYjQxc1NwMWpTZjJjMXIvZnE&traceId=1",
    "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-black?wid=5120&hei=2880&fmt=webp&qlt=90&.v=cHJOTXEwTU92OEtKVDV2cVB1R2FTSjlERndlRTljaUdZeHJGM3dlLzR2OUFsUUpuUVQ3cUdJUXc0NW5mTVpFdE9MekhWSGZtV1pvV240QzNuTk80VS9jVTIwcEJjL3Axby9SNE1La0phb1dEdlJGYjQxc1NwMWpTZjJjMXIvZnE&traceId=1",
    "https://m.media-amazon.com/images/I/717Q2swzhBL._SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51xiDpq5ODL._SL1000_.jpg",
  ],
  colors: [
    { name: "Natural Titanium", value: "#8E8E93" },
    { name: "Blue Titanium", value: "#4A90E2" },
    { name: "White Titanium", value: "#F5F5F7" },
    { name: "Black Titanium", value: "#1D1D1F" },
  ],
  storage: ["128GB", "256GB", "512GB", "1TB"],
  description:
    "The iPhone 15 Pro features a titanium design, A17 Pro chip, and an advanced camera system with 48MP main camera. Experience the power of Apple's most advanced technology.",
  features: [
    "6.1-inch Super Retina XDR display",
    "A17 Pro chip with 6-core GPU",
    "48MP Main camera system",
    "Action Button for quick shortcuts",
    "USB-C connector",
    "Up to 23 hours video playback",
  ],
  specifications: [
    { label: "Display", value: "6.1-inch Super Retina XDR" },
    { label: "Chip", value: "A17 Pro" },
    { label: "Camera", value: "48MP + 12MP + 12MP" },
    { label: "Storage", value: "128GB - 1TB" },
    { label: "Battery", value: "Up to 23 hours video" },
    { label: "Weight", value: "187 grams" },
    { label: "Materials", value: "Titanium" },
    { label: "Water Resistance", value: "IP68" },
  ],
};

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link href="/smartphones" className="hover:text-blue-600">
              Smartphones
            </Link>
            <span>/</span>
            <Link href="/brands/apple" className="hover:text-blue-600">
              Apple
            </Link>
            <span>/</span>
            <span className="text-gray-900">{productData.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <Image
                src={productData.images[selectedImage]}
                alt={productData.name}
                fill
                className="object-contain p-8"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Heart
                  className={`h-6 w-6 ${
                    isWishlisted ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="flex space-x-2">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative w-20 h-20 bg-white rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${productData.name} view ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline">{productData.brand}</Badge>
                <Badge variant="secondary">{productData.category}</Badge>
                {productData.inStock && (
                  <Badge className="bg-green-100 text-green-800">
                    In Stock
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Color: {productData.colors[selectedColor].name}
              </h3>
              <div className="flex space-x-3">
                {productData.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-4 transition-all ${
                      selectedColor === index
                        ? "border-blue-500 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                Storage: {productData.storage[selectedStorage]}
              </h3>
              <div className="flex space-x-2">
                {productData.storage.map((storage, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedStorage(index)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      selectedStorage === index
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Link href="/contact" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Get Information
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 w-full sm:w-auto"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-1" />2 Year Warranty
                </div>
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Free Shipping
                </div>
                <div className="flex items-center">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  30-Day Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information Tabs */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {productData.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <span className="font-medium text-gray-700">
                        {spec.label}
                      </span>
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "iPhone 15",
                image:
                  "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center",
              },
              {
                name: "iPhone 15 Pro Max",
                image:
                  "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300&h=300&fit=crop&crop=center",
              },
              {
                name: "Samsung Galaxy S24",
                image:
                  "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300&h=300&fit=crop&crop=center",
              },
              {
                name: "Google Pixel 8 Pro",
                image:
                  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center",
              },
            ].map((product, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-4">
                  <div className="relative aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">
                    Premium product with advanced features
                  </p>
                  <Link href="/details">
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Back to Top */}
        <div className="text-center mt-12">
          <Link href="/">
            <Button variant="outline" size="lg">
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
