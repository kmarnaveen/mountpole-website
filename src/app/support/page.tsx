import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  Book,
  Shield,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const supportCategories = [
    {
      icon: Smartphone,
      title: "Smartphones",
      description: "Get help with iPhone, Galaxy, and Pixel devices",
      topics: [
        "Setup Guide",
        "Features Overview",
        "Troubleshooting",
        "Specifications",
      ],
    },
    {
      icon: Tablet,
      title: "Tablets",
      description: "Support for iPad, Galaxy Tab, and Pixel Tablet",
      topics: [
        "Getting Started",
        "Apps & Features",
        "Connectivity",
        "Performance",
      ],
    },
    {
      icon: Watch,
      title: "Wearables",
      description: "Help with smartwatches and wireless earbuds",
      topics: [
        "Pairing Guide",
        "Health Features",
        "Battery Care",
        "Compatibility",
      ],
    },
    {
      icon: Monitor,
      title: "Monitors",
      description: "Display setup and optimization guides",
      topics: [
        "Connection Setup",
        "Display Settings",
        "Calibration",
        "Compatibility",
      ],
    },
  ];

  const faqItems = [
    {
      question: "How do I find detailed product specifications?",
      answer:
        "Navigate to the specific product category (Smartphones, Tablets, Wearables, or Monitors) and browse the product cards. Each product includes comprehensive specifications, features, and technical details.",
    },
    {
      question: "How can I view products from different brands?",
      answer:
        "Visit our brand pages (Apple, Samsung, Google) to see all products from each manufacturer, or browse by category to view similar products across brands.",
    },
    {
      question: "Is this website for purchasing products?",
      answer:
        "Mountpole is an information and display website only. We provide detailed product information, specifications, and features to help you make informed decisions, but we do not process orders or handle transactions.",
    },
    {
      question: "How often is the product information updated?",
      answer:
        "We continuously update our product database to reflect the latest releases, specifications, and features from Apple, Samsung, and Google. Information is verified and refreshed regularly.",
    },
    {
      question: "Can I get notifications about new products?",
      answer:
        "Yes! Subscribe to our newsletter in the footer to receive updates about new product releases, feature announcements, and technology news from our featured brands.",
    },
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      contact: "support@mountpole.com",
      availability: "Response within 24 hours",
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available on website",
      availability: "Mon-Fri, 9 AM - 6 PM EST",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with a specialist",
      contact: "+1 (555) 123-4567",
      availability: "Mon-Fri, 9 AM - 6 PM EST",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Support Center
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed">
            Get help with your devices, find guides, and explore features.
            We&apos;re here to help you make the most of your technology.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help articles, guides, or topics..."
              className="pl-12 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Get Help By Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {supportCategories.map((category, index) => (
              <Card
                key={index}
                className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              >
                <CardHeader>
                  <category.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                        {topic}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Popular Help Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <Book className="h-8 w-8 text-green-600 mb-2" />
                <CardTitle className="text-lg">Setup Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Step-by-step guides for setting up your new devices
                </p>
                <Link href="/about">
                  <Button variant="outline" size="sm">
                    View Guides
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Security & Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn about device security features and privacy settings
                </p>
                <Link href="/about">
                  <Button variant="outline" size="sm">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <HelpCircle className="h-8 w-8 text-orange-600 mb-2" />
                <CardTitle className="text-lg">Troubleshooting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Common issues and solutions for all device types
                </p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Get Help
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-900">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Contact Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <method.icon className="mx-auto h-12 w-12 text-blue-600 mb-4" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-gray-900 mb-2">
                    {method.contact}
                  </p>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {method.availability}
                  </div>
                  <Link href="/contact">
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      Contact Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            Additional Resources
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive knowledge base, video tutorials, and
            community forums for additional support and information.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse Knowledge Base
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline">
                Watch Tutorials
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
