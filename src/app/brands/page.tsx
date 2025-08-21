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
  AppleLogo,
  SamsungLogo,
  GoogleLogo,
  XiaomiLogo,
  RealmeLogo,
  MotorolaLogo,
  JBLLogo,
  HuaweiLogo,
  HonorLogo,
} from "@/components/BrandLogos";
import { ChevronRight, Users, Award, TrendingUp } from "lucide-react";
import Link from "next/link";
import productsData from "../../../products.json";

export default function BrandsPage() {
  // Calculate brand statistics
  const brandStats = productsData.products.reduce((acc, product) => {
    if (!acc[product.brand]) {
      acc[product.brand] = {
        count: 0,
        categories: new Set(),
      };
    }

    const brandData = acc[product.brand];
    brandData.count++;
    brandData.categories.add(product.category);

    return acc;
  }, {} as Record<string, { count: number; categories: Set<string> | string[] }>);

  // Convert categories set to array
  Object.keys(brandStats).forEach((brand) => {
    brandStats[brand].categories = Array.from(
      brandStats[brand].categories as Set<string>
    );
  });

  const brands = [
    {
      name: "Apple",
      logo: AppleLogo,
      description:
        "Think Different. Experience innovation with Apple&apos;s ecosystem of premium devices designed to work seamlessly together.",
      tagline: "Innovation at its finest",
      href: "/brands/apple",
      color: "black",
      gradient: "from-gray-900 to-black",
      highlights: [
        "Premium Build Quality",
        "Seamless Ecosystem",
        "Privacy Focused",
      ],
      categories: brandStats.Apple?.categories || [],
      productCount: brandStats.Apple?.count || 0,
    },
    {
      name: "Samsung",
      logo: SamsungLogo,
      description:
        "Do What You Can&apos;t. Explore Samsung&apos;s Galaxy of cutting-edge technology and AI-powered innovations.",
      tagline: "Galaxy of possibilities",
      href: "/brands/samsung",
      color: "blue-600",
      gradient: "from-blue-600 to-blue-800",
      highlights: [
        "Galaxy AI Features",
        "S Pen Technology",
        "Display Innovation",
      ],
      categories: brandStats.Samsung?.categories || [],
      productCount: brandStats.Samsung?.count || 0,
    },
    {
      name: "Google",
      logo: GoogleLogo,
      description:
        "Be Together. Not the Same. Discover Pixel devices with Google AI built right in for the best Android experience.",
      tagline: "AI-powered simplicity",
      href: "/brands/google",
      color: "blue-500",
      gradient: "from-blue-500 to-green-500",
      highlights: ["Pure Android", "Google AI Integration", "Best Camera AI"],
      categories: brandStats.Google?.categories || [],
      productCount: brandStats.Google?.count || 0,
    },
    {
      name: "Xiaomi",
      logo: XiaomiLogo,
      description:
        "Innovation for Everyone. Discover flagship performance at incredible prices with Xiaomi's cutting-edge technology.",
      tagline: "Innovation for everyone",
      href: "/brands/xiaomi",
      color: "orange-600",
      gradient: "from-orange-600 to-orange-500",
      highlights: ["Flagship Performance", "Fast Charging", "Mi Ecosystem"],
      categories: brandStats.Xiaomi?.categories || [],
      productCount: brandStats.Xiaomi?.count || 0,
    },
    {
      name: "Realme",
      logo: RealmeLogo,
      description:
        "Dare to Leap. Experience bold designs and powerful performance with Realme's youth-focused smartphones.",
      tagline: "Dare to leap",
      href: "/brands/realme",
      color: "yellow-600",
      gradient: "from-yellow-500 to-amber-500",
      highlights: ["Bold Design", "Gaming Performance", "Fast Charging"],
      categories: brandStats.Realme?.categories || [],
      productCount: brandStats.Realme?.count || 0,
    },
    {
      name: "Motorola",
      logo: MotorolaLogo,
      description:
        "Hello Moto. Rediscover the pioneer of mobile technology with pure Android experiences and innovative features.",
      tagline: "Mobile innovation pioneer",
      href: "/brands/motorola",
      color: "blue-600",
      gradient: "from-blue-600 to-indigo-600",
      highlights: ["Pure Android", "Ready For", "Moto Actions"],
      categories: brandStats.Motorola?.categories || [],
      productCount: brandStats.Motorola?.count || 0,
    },
    {
      name: "JBL",
      logo: JBLLogo,
      description:
        "Pure Sound. Experience legendary audio quality with JBL's professional-grade speakers and headphones.",
      tagline: "Legendary audio experience",
      href: "/brands/jbl",
      color: "orange-600",
      gradient: "from-orange-600 to-red-500",
      highlights: ["Pro Audio Heritage", "JBL Pure Bass", "Wireless Freedom"],
      categories: brandStats.JBL?.categories || [],
      productCount: brandStats.JBL?.count || 0,
    },
    {
      name: "Huawei",
      logo: HuaweiLogo,
      description:
        "Make It Possible. Explore Huawei's innovative ecosystem with Leica cameras and cutting-edge technology.",
      tagline: "Technology leadership",
      href: "/brands/huawei",
      color: "red-600",
      gradient: "from-red-600 to-red-500",
      highlights: ["Leica Partnership", "5G Leadership", "HarmonyOS"],
      categories: brandStats.Huawei?.categories || [],
      productCount: brandStats.Huawei?.count || 0,
    },
    {
      name: "Honor",
      logo: HonorLogo,
      description:
        "Honor Magic. Discover intelligent devices with eye comfort technology and powerful performance.",
      tagline: "Intelligent magic",
      href: "/brands/honor",
      color: "blue-600",
      gradient: "from-blue-600 to-purple-600",
      highlights: ["Eye Comfort", "Magic UI", "AI Photography"],
      categories: brandStats.Honor?.categories || [],
      productCount: brandStats.Honor?.count || 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Brands
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Discover the world&apos;s leading technology brands. From
            Apple&apos;s innovation to Samsung&apos;s cutting-edge displays,
            Google&apos;s AI experiences, Xiaomi&apos;s flagship performance,
            and many more premium brands that shape the future.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Users className="h-5 w-5" />
              <span className="text-sm">Premium Brands</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <Award className="h-5 w-5" />
              <span className="text-sm">Award Winning</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm">Latest Technology</span>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Brand
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Each brand offers unique innovations and experiences. Explore our
              curated selection of premium technology products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <Card
                key={brand.name}
                className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Brand Header */}
                <div
                  className={`bg-gradient-to-r ${brand.gradient} p-8 text-white relative`}
                >
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-white rounded-2xl p-4 shadow-lg">
                        <brand.logo className="w-12 h-12 text-gray-900" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-center mb-2">
                      {brand.name}
                    </h3>
                    <p className="text-center text-white/90 font-medium">
                      {brand.tagline}
                    </p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {brand.description}
                  </p>

                  {/* Brand Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {brand.productCount}
                      </div>
                      <div className="text-sm text-gray-500">Products</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {brand.categories.length}
                      </div>
                      <div className="text-sm text-gray-500">Categories</div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Available Categories:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {brand.categories.map(
                        (category: string, index: number) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {category}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Key Highlights:
                    </h4>
                    <ul className="space-y-1">
                      {brand.highlights.map(
                        (highlight: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <ChevronRight className="h-3 w-3 mr-2 text-gray-400" />
                            {highlight}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <Link href={brand.href}>
                    <Button
                      className={`w-full bg-${brand.color} hover:bg-${brand.color}/90 group-hover:shadow-lg transition-all duration-300`}
                      size="lg"
                    >
                      Explore {brand.name} Products
                      <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose These Brands */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose These Brands?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These industry leaders consistently deliver innovative products
              that shape the future of technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Award-Winning Design
              </h3>
              <p className="text-gray-600">
                Recognized globally for exceptional design, build quality, and
                user experience across all product categories.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Cutting-Edge Innovation
              </h3>
              <p className="text-gray-600">
                Leading the industry with breakthrough technologies, AI
                integration, and features that define the future.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Trusted by Millions
              </h3>
              <p className="text-gray-600">
                Millions of users worldwide trust these brands for their daily
                technology needs and professional workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect device for your needs. Compare features and
            find your next tech companion.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/smartphones">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                Browse All Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Get Expert Advice
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
