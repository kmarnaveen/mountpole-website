"use client";

import { useModals } from '@/components/modals/ModalProvider';
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
  const { openPartnershipModal } = useModals()
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in product quality and service delivery."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Building long-term relationships with our clients and suppliers worldwide."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connecting businesses across continents with cutting-edge technology solutions."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Staying ahead of technology trends to provide the latest solutions."
    },
    {
      icon: Heart,
      title: "Trust",
      description: "Building relationships based on transparency, reliability, and mutual respect."
    },
    {
      icon: Building2,
      title: "Growth",
      description: "Helping businesses scale with the right technology infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              About MountPole
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Connecting Businesses
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Through Technology
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              MountPole serves as your strategic technology partner, bridging the gap between 
              cutting-edge innovation and business growth through our comprehensive distribution network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/partnership?source=about-page&intent=enterprise&utm_campaign=contact-us">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Building2 className="mr-2 h-5 w-5" />
                  Become a Partner
                </Button>
              </Link>
              <Button 
                onClick={() => openPartnershipModal()}
                size="lg" 
                variant="outline"
              >
                <Users className="mr-2 h-5 w-5" />
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide every decision we make and every partnership we build.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl text-gray-900">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            To democratize access to cutting-edge technology by creating seamless connections 
            between manufacturers and businesses worldwide. We believe that every organization, 
            regardless of size, should have access to the tools they need to compete and thrive 
            in the digital age.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Global Partners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
              <div className="text-gray-600">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Excellence */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Excellence in Every Partnership
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our team of technology specialists and business development experts work 
                around the clock to ensure your success. We understand that technology 
                is not just about products—it's about enabling transformation.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-gray-700">Dedicated account management for enterprise clients</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <span className="text-gray-700">Technical support and consultation services</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">Flexible procurement and logistics solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                  <span className="text-gray-700">Global warranty and service network</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Partner?</h3>
              <p className="text-blue-100 mb-6">
                Join thousands of businesses worldwide who trust MountPole for their 
                technology needs. Let's build the future together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/partnership?source=about-page&intent=discussion&utm_campaign=partnership-cta">
                  <Button
                    size="lg"
                    className="bg-white text-cyan-600 hover:bg-gray-100"
                  >
                    Start Partnership Discussion
                  </Button>
                </Link>
                <Button
                  onClick={() => openPartnershipModal()}
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-cyan-600"
                >
                  Contact Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}