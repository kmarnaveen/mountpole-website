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
      description:
        "MountPole was founded with a clear vision: to connect people through technology",
    },
    {
      year: "2019",
      title: "USA Operations",
      description:
        "Established headquarters in Doral, Florida with logistics infrastructure",
    },
    {
      year: "2020",
      title: "Canada Expansion",
      description:
        "Opened operations in Mississauga, Ontario to serve North American markets",
    },
    {
      year: "2021",
      title: "Brand Partnerships",
      description:
        "Became authorized distributor for Apple, Samsung, Xiaomi, and other leading brands",
    },
    {
      year: "2024",
      title: "Global Distributor",
      description:
        "Now serving partners across USA, Canada, Latin America, and beyond",
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
              Your global partner in distributing the world's most trusted
              technology brands
            </p>
            <div className="bg-blue-50 rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                MountPole was founded with a clear vision: to connect people
                through technology. From our roots to our global presence today,
                we have grown into a trusted multinational distributor,
                delivering genuine products from the world's leading brands to
                businesses across North America and beyond.
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-6 md:p-8 mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our Mission
              </h2>
              <p className="text-xl leading-relaxed">
                <em>Walk Together, Aim High</em> — we empower businesses and
                individuals through reliable technology partnerships, ensuring
                access to innovation worldwide.
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
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{value.description}</p>
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
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex-shrink-0">
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {milestone.year}
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Global Presence
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  MountPole USA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">8333 NW 53RD Street, Suite 450</p>
                <p>Doral FL – 33166, USA</p>
                <p className="text-blue-600 mt-2">
                  Phone/WhatsApp: +1 437 661 3501
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-6 w-6 text-blue-600" />
                  MountPole Canada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-semibold">Mississauga, Ontario</p>
                <p>Canada</p>
                <p className="text-gray-600 mt-2">
                  Serving North American markets
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-gray-600 italic">
              Innovation, efficiency, and trust define our global footprint.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 md:py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to Partner with MountPole?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our network of successful partners and distributors. We combine
            a strong supplier network, efficient logistics, and bulk
            distribution expertise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact?type=partnership">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Building2 className="mr-2 h-5 w-5" />
                Become a Partner
              </Button>
            </Link>
            <Link href="/brands">
              <Button size="lg" variant="outline">
                <Award className="mr-2 h-5 w-5" />
                View Our Brands
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
