import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Award, Target, Globe, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Integrity & Trust",
      description:
        "Building long-lasting relationships through authentic products and transparent business practices",
    },
    {
      icon: Users,
      title: "Long-Term Partnerships",
      description:
        "We believe in growing together with our partners and customers for sustainable success",
    },
    {
      icon: Award,
      title: "Innovation & Growth",
      description:
        "Constantly evolving to bring the latest technology innovations to global markets",
    },
    {
      icon: Globe,
      title: "Customer Success",
      description:
        "Your success is our success - we're committed to empowering businesses through technology",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Founded with Vision",
      description: "MountPole was founded with a clear vision: to connect people through technology",
    },
    {
      year: "2019",
      title: "USA Operations",
      description: "Established headquarters in Doral, Florida with logistics infrastructure",
    },
    {
      year: "2020",
      title: "Canada Expansion",
      description: "Opened operations in Mississauga, Ontario to serve North American markets",
    },
    {
      year: "2021",
      title: "Brand Partnerships",
      description: "Became authorized distributor for Apple, Samsung, Xiaomi, and other leading brands",
    },
    {
      year: "2024",
      title: "Global Distributor",
      description: "Now serving partners across USA, Canada, Latin America, and beyond",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              About MountPole
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
              Your global partner in distributing the world's most trusted technology brands
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                MountPole was founded with a clear vision: to connect people through technology. 
                From our roots to our global presence today, we have grown into a trusted multinational 
                distributor, delivering genuine products from the world's leading brands to businesses 
                across North America and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl leading-relaxed mb-4">
                <em>Walk Together, Aim High</em> — we empower businesses and individuals through 
                reliable technology partnerships, ensuring access to innovation worldwide.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact?type=partnership">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Building2 className="mr-2 h-5 w-5" />
                  Become a Partner
                </Button>
              </Link>
              <Link href="/contact?type=business">
                <Button size="lg" variant="outline">
                  <Users className="mr-2 h-5 w-5" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We curate and present detailed information about premium
                    electronics, focusing on smartphones, tablets, wearables,
                    and gaming products from Apple, Samsung, and Google.
                  </p>
                </CardContent>
              </Card>

              <Card className="text-left border-0 shadow-lg">
                <CardHeader>
                  <Target className="h-12 w-12 text-blue-500 mb-4" />
                  <CardTitle>Why We Do It</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Technology moves fast, and choosing the right device can be
                    overwhelming. We simplify this process by providing clear,
                    comprehensive information in an easy-to-understand format.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <value.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Badge className="bg-blue-600 text-white px-3 py-1">
                      {milestone.year}
                    </Badge>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">
            Our Commitment
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              We are committed to providing accurate, up-to-date information
              about the latest technology products. Our team continuously
              researches and verifies product details to ensure you have access
              to the most reliable information.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  100%
                </div>
                <p className="text-gray-600">Accurate Information</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  24/7
                </div>
                <p className="text-gray-600">Updated Content</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
                <p className="text-gray-600">Premium Brands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-900">
            Ready to Explore?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover the latest smartphones, tablets, wearables, and gaming gear
            from Apple, Samsung, and Google. Find detailed specifications,
            features, and comparisons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/smartphones">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
              >
                Explore Products
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
