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
      icon: Target,
      title: "Innovation First",
      description:
        "We showcase the latest technology innovations from leading brands",
    },
    {
      icon: Users,
      title: "Customer Focus",
      description:
        "Providing comprehensive information to help customers make informed decisions",
    },
    {
      icon: Award,
      title: "Quality Standards",
      description:
        "Partnering only with authentic, premium electronics manufacturers",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Connecting customers worldwide with the best technology products",
    },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Company Founded",
      description: "Started as a technology showcase platform",
    },
    {
      year: "2021",
      title: "Brand Partnerships",
      description: "Established partnerships with Apple, Samsung, and Google",
    },
    {
      year: "2022",
      title: "Platform Expansion",
      description: "Expanded to cover all major technology categories",
    },
    {
      year: "2023",
      title: "Global Presence",
      description: "Reached customers in over 50 countries",
    },
    {
      year: "2024",
      title: "Innovation Hub",
      description: "Became a leading source for technology information",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900">
              About Mountpole
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
              Your trusted source for premium electronics information and
              showcase
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-gray-900">
              Our Mission
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 leading-relaxed">
              At Mountpole, we believe technology should be accessible and
              understandable. Our mission is to provide comprehensive, accurate
              information about the latest electronics, helping customers make
              informed decisions about their technology needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Card className="text-left border-0 shadow-lg">
                <CardHeader>
                  <Heart className="h-12 w-12 text-red-500 mb-4" />
                  <CardTitle>What We Do</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    We curate and present detailed information about premium
                    electronics, focusing on smartphones, tablets, wearables,
                    and monitors from Apple, Samsung, and Google.
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
            Discover the latest smartphones, tablets, wearables, and monitors
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
