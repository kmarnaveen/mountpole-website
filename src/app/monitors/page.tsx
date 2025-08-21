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
  Monitor,
  Zap,
  Palette,
  GamepadIcon,
  Eye,
  Settings,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw,
  Maximize,
  Sun,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MonitorsPage() {
  const monitors = [
    {
      id: 1,
      name: "Studio Display",
      brand: "Apple",
      logo: AppleLogo,
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "27-inch",
        resolution: "5K (5120 x 2880)",
        refreshRate: "60Hz",
        connectivity: "Thunderbolt 3",
      },
      features: [
        "5K Retina Display",
        "12MP Ultra Wide Camera",
        "Six-Speaker Sound",
        "Thunderbolt 3",
      ],
      category: "Professional",
      description: "Premium 5K display for creative professionals",
    },
    {
      id: 2,
      name: "Pro Display XDR",
      brand: "Apple",
      logo: AppleLogo,
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "32-inch",
        resolution: "6K (6016 x 3384)",
        refreshRate: "60Hz",
        connectivity: "Thunderbolt 3",
      },
      features: [
        "6K Retina XDR",
        "1000 nits sustained",
        "P3 Wide Color",
        "Reference Mode",
      ],
      category: "Pro",
      description: "Ultimate reference display for professionals",
    },
    {
      id: 3,
      name: "Odyssey OLED G9",
      brand: "Samsung",
      logo: SamsungLogo,
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "49-inch",
        resolution: "Dual QHD (5120 x 1440)",
        refreshRate: "240Hz",
        connectivity: "HDMI 2.1, USB-C",
      },
      features: [
        "OLED Technology",
        "240Hz Gaming",
        "1800R Curve",
        "AMD FreeSync Premium",
      ],
      category: "Gaming",
      description: "Ultimate ultrawide gaming experience",
    },
    {
      id: 4,
      name: "Odyssey Neo G7",
      brand: "Samsung",
      logo: SamsungLogo,
      image:
        "https://images.unsplash.com/photo-1547394765-185e1e68f34e?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "32-inch",
        resolution: "4K (3840 x 2160)",
        refreshRate: "165Hz",
        connectivity: "HDMI 2.1, DisplayPort",
      },
      features: ["Mini LED", "HDR10+", "G-Sync Compatible", "Curved 1000R"],
      category: "Gaming",
      description: "High-performance 4K gaming monitor",
    },
    {
      id: 5,
      name: "Smart Monitor M8",
      brand: "Samsung",
      logo: SamsungLogo,
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "32-inch",
        resolution: "4K (3840 x 2160)",
        refreshRate: "60Hz",
        connectivity: "USB-C, Wireless DeX",
      },
      features: ["Smart TV Apps", "Wireless DeX", "USB-C 65W", "IoT Hub"],
      category: "Smart",
      description: "All-in-one smart monitor and entertainment hub",
    },
    {
      id: 6,
      name: "Pixelbook Display",
      brand: "Google",
      logo: GoogleLogo,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop&crop=center",
      specs: {
        size: "27-inch",
        resolution: "4K (3840 x 2160)",
        refreshRate: "60Hz",
        connectivity: "USB-C, HDMI",
      },
      features: [
        "Chrome OS Integration",
        "Google Assistant",
        "USB-C Hub",
        "Ambient EQ",
      ],
      category: "Smart",
      description: "Smart display optimized for Google ecosystem",
    },
  ];

  const categories = ["All", "Professional", "Gaming", "Smart", "Pro"];
  const brands = ["All", "Apple", "Samsung", "Google"];

  const useCases = [
    {
      icon: Palette,
      title: "Creative Work",
      description:
        "Color-accurate displays for photo editing, video production, and design",
    },
    {
      icon: GamepadIcon,
      title: "Gaming",
      description: "High refresh rates and low latency for competitive gaming",
    },
    {
      icon: Settings,
      title: "Productivity",
      description:
        "Large workspace for multitasking and professional applications",
    },
    {
      icon: Eye,
      title: "Entertainment",
      description: "Immersive viewing experience for movies and streaming",
    },
  ];

  const features = [
    {
      icon: Sun,
      title: "HDR Support",
      description:
        "True-to-life colors and contrast with HDR10+ and Dolby Vision support",
    },
    {
      icon: RefreshCw,
      title: "High Refresh Rates",
      description: "Smooth motion with refresh rates up to 240Hz for gaming",
    },
    {
      icon: Maximize,
      title: "Multiple Sizes",
      description: "From 27-inch to 49-inch ultrawide for every workspace",
    },
    {
      icon: Wifi,
      title: "Smart Connectivity",
      description: "USB-C, Thunderbolt, and wireless connectivity options",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <Monitor className="mx-auto h-16 w-16 text-purple-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Premium Monitors
          </h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Experience stunning visuals with professional displays from Apple,
            Samsung, and Google. Perfect for creative work, gaming,
            productivity, and entertainment.
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
                  className="cursor-pointer hover:bg-purple-100"
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
            Featured Monitors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {monitors.map((monitor) => (
              <Card
                key={monitor.id}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={monitor.image}
                      alt={monitor.name}
                      width={200}
                      height={192}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    {monitor.category}
                  </Badge>
                </div>

                <CardHeader>
                  <div className="flex items-center justify-between">
                    <monitor.logo className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{monitor.name}</CardTitle>
                  <CardDescription>{monitor.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <Maximize className="h-4 w-4 mr-2 text-gray-500" />
                        {monitor.specs.size}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-2 text-gray-500" />
                        {monitor.specs.resolution}
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-2 text-gray-500" />
                        {monitor.specs.refreshRate}
                      </div>
                      <div className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-gray-500" />
                        {monitor.specs.connectivity}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {monitor.features.slice(0, 3).map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/brands/${monitor.brand.toLowerCase()}`}>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Perfect for Every Application
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <useCase.icon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
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

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Advanced Display Technology
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <feature.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
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

      {/* Size Comparison */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Choose Your Size
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  27&quot;
                </div>
                <CardTitle>Compact Pro</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Perfect for smaller desks while maintaining professional
                  quality. Ideal for single-application focus work.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• 4K/5K Resolution</p>
                  <p>• Color Accurate</p>
                  <p>• Space Efficient</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  32&quot;
                </div>
                <CardTitle>Productivity Plus</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Excellent for multitasking and professional work. Great
                  balance of size and desk real estate.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• 4K/6K Resolution</p>
                  <p>• Multi-window Support</p>
                  <p>• Gaming Ready</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  49&quot;
                </div>
                <CardTitle>Ultrawide Max</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Ultimate workspace replacement for dual monitor setups.
                  Immersive gaming and maximum productivity.
                </p>
                <div className="space-y-1 text-sm text-gray-500">
                  <p>• Dual QHD Resolution</p>
                  <p>• Replace Dual Setup</p>
                  <p>• Immersive Gaming</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Upgrade Your Visual Experience
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            From professional color grading to immersive gaming, find the
            perfect monitor that matches your workflow and enhances your
            productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/monitors">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                Browse Monitors
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline">
                Size Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
