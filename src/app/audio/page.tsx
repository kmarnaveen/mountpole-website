import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Headphones, Volume2, Mic, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../products.json";

export default function AudioPage() {
  // Filter audio products from the JSON data
  const audioProducts = productsData.products.filter(
    (product) => product.category === "Audio"
  );

  // Group by brand for display
  const productsByBrand = audioProducts.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = [];
    }
    acc[product.brand].push(product);
    return acc;
  }, {} as Record<string, typeof audioProducts>);

  const audioTypes = [
    { name: "True Wireless", icon: Headphones },
    { name: "Noise Cancelling", icon: Volume2 },
    { name: "Voice Assistant", icon: Mic },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Headphones className="w-20 h-20 mx-auto mb-6 text-purple-300" />
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Premium{" "}
            <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
              Audio
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Immerse yourself in exceptional sound quality. Discover wireless
            earbuds and headphones with advanced noise cancellation and Hi-Fi
            audio.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {audioTypes.map((type, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2"
              >
                <type.icon className="h-5 w-5" />
                <span className="text-sm">{type.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter & Stats */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-600">
                  {audioProducts.length} Products Available
                </span>
              </div>
              <div className="flex gap-4 text-sm text-gray-600">
                <span>Premium Brands</span>
                <span>•</span>
                <span>Latest Technology</span>
                <span>•</span>
                <span>Expert Tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products by Brand */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Audio Products
          </h2>

          {Object.entries(productsByBrand).map(([brand, products]) => (
            <div key={brand} className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">
                  {brand} Audio
                </h3>
                <Link href={`/brands/${brand.toLowerCase()}`}>
                  <Button variant="outline" size="sm">
                    View All {brand} Products
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-300 border border-gray-200"
                  >
                    <CardHeader className="pb-4">
                      <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {product.images && product.images[0] ? (
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            width={250}
                            height={250}
                            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <Headphones className="h-20 w-20 text-purple-400" />
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className="text-xs bg-purple-100 text-purple-700"
                          >
                            {product.brand}
                          </Badge>
                        </div>

                        <CardTitle className="text-xl group-hover:text-purple-600 transition-colors leading-tight">
                          {product.name}
                        </CardTitle>

                        <CardDescription className="text-gray-600">
                          {product.description || "High-quality audio device"}
                        </CardDescription>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Key Specifications */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-700">
                          Key Specifications:
                        </h4>
                        <div className="space-y-2 text-sm">
                          {product.specifications?.driver && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Driver:</span>
                              <span className="font-medium">
                                {product.specifications.driver}
                              </span>
                            </div>
                          )}
                          {product.specifications?.activeNoiseCancelling && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">ANC:</span>
                              <span className="font-medium">
                                {product.specifications.activeNoiseCancelling}
                              </span>
                            </div>
                          )}
                          {product.specifications?.battery && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">Battery:</span>
                              <span className="font-medium">
                                {product.specifications.battery}
                              </span>
                            </div>
                          )}
                          {product.specifications?.waterResistance && (
                            <div className="flex justify-between">
                              <span className="text-gray-500">
                                Water Resistance:
                              </span>
                              <span className="font-medium">
                                {product.specifications.waterResistance}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-gray-700">
                          Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {product.features
                            .slice(0, 4)
                            .map((feature, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {feature}
                              </Badge>
                            ))}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="pt-2">
                        <Button
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          size="lg"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Why Choose Premium Audio?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Hi-Fi Audio Quality
              </h3>
              <p className="text-gray-600">
                Experience studio-quality sound with advanced drivers and
                premium audio codecs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Volume2 className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Active Noise Cancellation
              </h3>
              <p className="text-gray-600">
                Block out distractions with intelligent ANC technology for
                immersive listening.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Crystal Clear Calls
              </h3>
              <p className="text-gray-600">
                Advanced microphone arrays and AI ensure perfect call quality
                anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
