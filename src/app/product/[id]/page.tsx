"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Shield,
  Truck,
  RotateCcw,
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
  ArrowLeft,
  MessageCircle,
  ShoppingCart,
  Download,
  Users,
  CreditCard,
  FileText,
  Building,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductDetailsSkeleton } from "@/components/skeletons/ProductDetailsSkeleton";
import productsData from "../../../../products.json";

export default function DynamicProductDetailsPage() {
  const params = useParams();
  const productId = params.id as string;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find the product by ID
  const product = productsData.products.find((p) => p.id === productId);

  // Simulate loading for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading simulation

    return () => clearTimeout(timer);
  }, []);

  // Generate contact URLs for B2B actions
  const generateQuoteURL = () => {
    if (!product) return "/contact";
    return `/contact?type=quote&product=${product.id}&name=${encodeURIComponent(product.name)}`;
  };

  const generateSpecSheetURL = () => {
    if (!product) return "/contact";
    // In a real implementation, this would link to actual spec sheets
    return `/contact?type=spec-sheet&product=${product.id}&name=${encodeURIComponent(product.name)}`;
  };

  // Show skeleton while loading
  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  // If product not found after loading, show 404
  if (!product) {
    notFound();
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "smartphones":
        return <Smartphone className="h-4 w-4" />;
      case "tablets":
        return <Monitor className="h-4 w-4" />;
      case "laptops":
        return <Monitor className="h-4 w-4" />;
      case "monitors & displays":
        return <Monitor className="h-4 w-4" />;
      case "wearables":
        return <Battery className="h-4 w-4" />;
      case "audio":
        return <Camera className="h-4 w-4" />;
      default:
        return <Smartphone className="h-4 w-4" />;
    }
  };

  // Convert specifications object to array format
  const specificationsArray = product.specifications
    ? Object.entries(product.specifications).map(([key, value]) => ({
        label:
          key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1"),
        value: Array.isArray(value) ? value.join(", ") : String(value),
      }))
    : [];

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
            <Link
              href={`/${product.category.toLowerCase()}`}
              className="hover:text-blue-600"
            >
              {product.category}
            </Link>
            <span>/</span>
            <Link
              href={`/brands/${product.brand.toLowerCase()}`}
              className="hover:text-blue-600"
            >
              {product.brand}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Back Button */}
        <div className="mb-4 sm:mb-6">
          <Link href={`/${product.category.toLowerCase()}`}>
            <Button variant="outline" className="mb-4 text-sm sm:text-base">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {product.category}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden group">
              {product.images && product.images[selectedImage] ? (
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {getCategoryIcon(product.category)}
                  <span className="ml-2 text-gray-500">No image available</span>
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square bg-white rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={120}
                      height={120}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product.brand}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {getCategoryIcon(product.category)}
                  <span className="ml-1">{product.category}</span>
                </Badge>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                {product.name}
              </h1>
            </div>

            {/* Description */}
            <div>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3">
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm sm:text-base">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href={generateQuoteURL()} className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px] sm:min-h-[52px]"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Add to Quote List</span>
                </Button>
              </Link>
              <Link href={generateSpecSheetURL()}>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-sm sm:text-base py-3 sm:py-4 px-4 sm:px-6 min-h-[48px] sm:min-h-[52px]"
                >
                  <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 flex-shrink-0" />
                  <span className="truncate">Download Spec Sheet</span>
                </Button>
              </Link>
            </div>

            {/* B2B Information */}
            <div className="bg-blue-50 rounded-lg p-4 sm:p-6">
              <h3 className="text-lg font-semibold mb-4 text-blue-900">Business Solutions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Bulk Orders</h4>
                    <p className="text-sm text-gray-600">Volume discounts available for orders of 10+ units</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Enterprise Warranty</h4>
                    <p className="text-sm text-gray-600">Extended warranty and comprehensive service options</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">MDM Compatible</h4>
                    <p className="text-sm text-gray-600">Mobile Device Management integration ready</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-900">Business Financing</h4>
                    <p className="text-sm text-gray-600">Flexible payment terms and leasing options</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
          </div>
        </div>

        {/* Specifications */}
        {specificationsArray.length > 0 && (
          <div className="mt-16">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  Technical Specifications
                </CardTitle>
                <CardDescription>
                  Detailed technical information about {product.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {specificationsArray.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-gray-100"
                    >
                      <span className="font-medium text-gray-700">
                        {spec.label}
                      </span>
                      <span className="text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">More from {product.brand}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData.products
              .filter((p) => p.brand === product.brand && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/product/${relatedProduct.id}`}
                >
                  <Card className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-gray-50 rounded-lg mb-4 overflow-hidden">
                        {relatedProduct.images && relatedProduct.images[0] ? (
                          <Image
                            src={relatedProduct.images[0]}
                            alt={relatedProduct.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            {getCategoryIcon(relatedProduct.category)}
                          </div>
                        )}
                      </div>
                      <h3 className="font-semibold text-sm mb-2 group-hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
