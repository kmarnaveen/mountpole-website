import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HonorLogo } from "@/components/BrandLogos";
import {
  ChevronRight,
  Smartphone,
  Laptop,
  Zap,
  Eye,
  Users,
  Crown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import productsData from "../../../../products.json";

export default function HonorPage() {
  // Filter Honor products from the JSON data
  const honorProducts = productsData.products.filter(
    (product) => product.brand === "Honor"
  );

  // Group products by category
  const productsByCategory = honorProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof honorProducts>);

  // Map categories to icons and display names
  const categoryConfig = {
    Smartphones: {
      icon: Smartphone,
      displayName: "Honor Smartphones",
      route: "/smartphones",
    },
    Laptops: {
      icon: Laptop,
      displayName: "MagicBook Series",
      route: "/laptops",
    },
  };

  const highlights = [
    {
      title: "Eye Comfort",
      description: "Industry-leading eye protection with natural color display",
      icon: <Eye className="h-8 w-8" />,
    },
    {
      title: "Magic Performance",
      description: "Powerful processors optimized for seamless user experience",
      icon: <Zap className="h-8 w-8" />,
    },
    {
      title: "Honor For All",
      description: "Technology that empowers and connects global communities",
      icon: <Users className="h-8 w-8" />,
    },
  ];

  const magicFeatures = [
    {
      title: "Magic UI",
      description: "Intuitive interface designed for modern lifestyles",
      icon: <Crown className="h-6 w-6" />,
    },
    {
      title: "Honor Turbo",
      description: "System optimization for peak performance",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      title: "AI Photography",
      description: "Intelligent scene recognition and enhancement",
      icon: <Eye className="h-6 w-6" />,
    },
    {
      title: "Multi-Screen Collaboration",
      description: "Seamless connectivity across all your devices",
      icon: <Laptop className="h-6 w-6" />,
    },
  ];

  const sustainability = [
    "Carbon Neutral Manufacturing",
    "Recyclable Packaging Materials",
    "Energy Efficient Components",
    "Extended Device Lifespan",
    "Responsible Supply Chain",
    "Green Technology Innovation",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto mb-6 w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-2xl">
              <HonorLogo className="w-16 h-16 text-blue-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Honor Magic</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Discover the magic of technology that understands you. Honor
              creates intelligent devices that enhance your life with intuitive
              design and powerful performance.
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
                  Discover Magic
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
            Honor Magic Series
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
                        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
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
                            "Premium Honor product with innovative features"}
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

      {/* Honor Highlights */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            The Honor Difference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((highlight, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-blue-600">
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

      {/* Magic Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Magic Technology Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {magicFeatures.map((feature, index) => (
              <Card key={index} className="text-center border border-blue-200">
                <CardHeader>
                  <div className="flex justify-center mb-4 text-blue-600">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Eye Comfort Technology */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Eye className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Honor Eye Comfort Technology
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Honor prioritizes your visual health with industry-leading eye
              comfort technology. Our displays are engineered to reduce eye
              strain while maintaining vibrant, natural colors for an optimal
              viewing experience.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">
                  Display Innovation
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    TÜV Rheinland Certification
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Natural Color Temperature
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Adaptive Brightness Control
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Blue Light Reduction
                  </li>
                </ul>
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold mb-4">User Experience</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Comfortable Long-term Viewing
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Sleep Quality Protection
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Professional Color Accuracy
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="h-4 w-4 mr-2 text-gray-400" />
                    Intelligent Display Adjustment
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Sustainable Technology
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              Honor is committed to creating technology that&apos;s good for you
              and good for the planet. We&apos;re dedicated to sustainable
              practices throughout our entire product lifecycle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {sustainability.map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200"
                >
                  <div className="flex items-center justify-center mb-3">
                    <Crown className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Users className="h-16 w-16" />
          </div>
          <h2 className="text-3xl font-bold mb-6">Join the Honor Community</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            Connect with millions of Honor users worldwide. Share experiences,
            get support, and discover new ways to unlock the magic of your Honor
            device.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Join Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              Get Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
