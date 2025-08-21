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
  Watch,
  Heart,
  Activity,
  Smartphone,
  Wifi,
  Battery,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WearablesPage() {
  const wearables = [
    {
      id: 1,
      name: "Apple Watch Series 9",
      brand: "Apple",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ultra-case-unselect-gallery-1-202409?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=aTVJSEliNW9jb25zalBlTm16VmMxcWpkNHRJWDMzcTg3NWRxV0pydTcvSUxMekYrWHVDVjVJT1ZDYVlkUjdVUnc2NytHaDA2aFdROEtrekNxcXV6T3VmenhDNGxXRVM5RSs4RlRpMXdYVWhCUjJHK0dyT0t2cDF1RTlMancyMG8",
      category: "Smart Watch",
      specs: ["S9 Chip", "Always-On Display", "Blood Oxygen", "ECG"],
      features: ["Double Tap", "Siri on Device", "Carbon Neutral"],
    },
    {
      id: 2,
      name: "Galaxy Watch6",
      brand: "Samsung",
      image: "https://m.media-amazon.com/images/I/61wSQcwjpqL._AC_SL1500_.jpg",
      category: "Smart Watch",
      specs: ["Exynos W930", '1.5" Display', "Sleep Tracking", "40mm"],
      features: ["Body Composition", "Fall Detection", "Water Resistant"],
    },
    {
      id: 3,
      name: "Pixel Watch 2",
      brand: "Google",
      image: "https://m.media-amazon.com/images/I/71gCMKYhJ5L._AC_SL1500_.jpg",
      category: "Smart Watch",
      specs: ["Snapdragon W5", "Fitbit Integration", "Heart Rate", "GPS"],
      features: ["Safety Check", "Gmail Notifications", "Google Pay"],
    },
    {
      id: 4,
      name: "Apple Watch SE",
      brand: "Apple",
      image:
        "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/se-case-unselect-gallery-1-202409?wid=5120&hei=3280&fmt=p-jpg&qlt=80&.v=VUJlellZRStNS2ViOXFkSTY1R3RCcWpkNHRJWDMzcTg3NWRxV0pydTcvSUxMekYrWHVDVjVJT1ZDYVlkUjdVUnc2NytHaDA2aFdROEtrekNxcXV6T3VmenhDNGxXRVM5RSs4RlRpMXdYVWg",
      category: "Smart Watch",
      specs: ["S8 Chip", "Retina Display", "Activity Rings", "44mm"],
      features: ["Fall Detection", "Emergency SOS", "Family Setup"],
    },
    {
      id: 5,
      name: "Galaxy Watch6 Classic",
      brand: "Samsung",
      image: "https://m.media-amazon.com/images/I/51QrZjh7GPL._AC_SL1500_.jpg",
      category: "Smart Watch",
      specs: ["Rotating Bezel", '1.5" Display', "47mm", "Titanium"],
      features: ["Premium Materials", "Advanced Sleep", "Pro Workouts"],
    },
    {
      id: 6,
      name: "Galaxy Buds2 Pro",
      brand: "Samsung",
      image: "https://m.media-amazon.com/images/I/51Ll4AX3hQL._AC_SL1500_.jpg",
      category: "Earbuds",
      specs: ["ANC", "360 Audio", "8hr Battery", "IPX7"],
      features: ["Hi-Fi Sound", "Voice Detect", "Wireless Charging"],
    },
  ];

  const categories = ["All", "Smart Watches", "Earbuds", "Fitness Trackers"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-blue-900 text-white py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Watch className="mx-auto h-16 w-16 text-purple-400 mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Wearables</h1>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Stay connected and healthy with the latest smartwatches and
              wearable technology. Track your fitness, receive notifications,
              and more.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 border-b bg-white">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant="outline"
                  className="cursor-pointer hover:bg-purple-50"
                >
                  {category}
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-purple-50"
              >
                Apple
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-purple-50"
              >
                Samsung
              </Badge>
              <Badge
                variant="outline"
                className="cursor-pointer hover:bg-purple-50"
              >
                Google
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wearables.map((device) => (
              <Card
                key={device.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardHeader className="pb-4">
                  <div className="aspect-square bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    {device.image ? (
                      <Image
                        src={device.image}
                        alt={device.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-contain p-4"
                      />
                    ) : device.category === "Earbuds" ? (
                      <div className="flex space-x-2">
                        <div className="w-8 h-12 bg-gray-700 rounded-full"></div>
                        <div className="w-8 h-12 bg-gray-700 rounded-full"></div>
                      </div>
                    ) : (
                      <Watch className="h-24 w-24 text-purple-400" />
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-purple-500">{device.brand}</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="secondary" className="text-xs">
                        {device.category}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                    {device.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Key Specs */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">
                      Key Specifications:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {device.specs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-1"
                        >
                          <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">
                      Features:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {device.features.map((feature, index) => (
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

                  {/* Action Buttons */}
                  <div className="pt-4">
                    <Link href={`/brands/${device.brand.toLowerCase()}`}>
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

      {/* Features Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Wearable Technology Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="mx-auto h-12 w-12 text-red-600 mb-4" />
              <h3 className="font-semibold mb-2">Health Monitoring</h3>
              <p className="text-gray-600">
                Track heart rate, sleep, and activity levels
              </p>
            </div>

            <div className="text-center">
              <Smartphone className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="font-semibold mb-2">Smart Notifications</h3>
              <p className="text-gray-600">
                Stay connected without reaching for your phone
              </p>
            </div>

            <div className="text-center">
              <Activity className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="font-semibold mb-2">Fitness Tracking</h3>
              <p className="text-gray-600">
                Monitor workouts and achieve fitness goals
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
