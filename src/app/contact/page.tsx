"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Building2,
  Globe,
  Users,
  Headphones,
} from "lucide-react";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Location",
      primary: "123 Technology Plaza",
      secondary: "San Francisco, CA 94105",
      tertiary: "United States",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      primary: "+1 (555) 123-4567",
      secondary: "+1 (555) 123-4568",
      tertiary: "Mon-Fri, 9 AM - 6 PM EST",
    },
    {
      icon: Mail,
      title: "Email Addresses",
      primary: "info@mountpole.com",
      secondary: "support@mountpole.com",
      tertiary: "Response within 24 hours",
    },
    {
      icon: Clock,
      title: "Business Hours",
      primary: "Monday - Friday",
      secondary: "9:00 AM - 6:00 PM EST",
      tertiary: "Weekend support available",
    },
  ];

  const departments = [
    {
      icon: Headphones,
      title: "General Support",
      email: "support@mountpole.com",
      description:
        "Product information, technical questions, and general inquiries",
    },
    {
      icon: Users,
      title: "Partnership",
      email: "partners@mountpole.com",
      description:
        "Brand partnerships, collaborations, and business opportunities",
    },
    {
      icon: Building2,
      title: "Media & Press",
      email: "media@mountpole.com",
      description: "Press releases, media kits, and journalist inquiries",
    },
    {
      icon: Globe,
      title: "International",
      email: "global@mountpole.com",
      description: "International partnerships and regional support",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Thank you for your message! We'll get back to you within 24 hours.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <MessageCircle className="mx-auto h-16 w-16 text-purple-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Get in touch with our team. We&apos;re here to help with your
            questions, provide support, and assist with any technology
            information you need.
          </p>
        </div>
      </section>
      {/* Contact Form and Departments */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">
                Send Us a Message
              </h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="What is this about?"
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        className="mt-2 min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Departments */}
          </div>
        </div>
      </section>
      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardHeader>
                  <info.icon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-semibold text-gray-900">{info.primary}</p>
                  <p className="text-gray-600">{info.secondary}</p>
                  <p className="text-sm text-gray-500">{info.tertiary}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Need Quick Help?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Before reaching out, check our frequently asked questions and
            support resources for immediate answers to common inquiries.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Product Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Find detailed specs and features for all devices
                </p>
                <Button variant="outline">Browse Products</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Support Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Access guides, FAQs, and troubleshooting help
                </p>
                <Button variant="outline">Get Support</Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">About Mountpole</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Learn more about our mission and services
                </p>
                <Button variant="outline">Learn More</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Find Us
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-gray-200 to-gray-300 h-96 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <p className="text-gray-700 font-medium">Interactive Map</p>
                  <p className="text-gray-600">
                    123 Technology Plaza, San Francisco, CA
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Follow Up Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">
            We&apos;re Here to Help
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Our team is committed to providing excellent support and
            information. Whether you have questions about products, need
            technical assistance, or want to partner with us, we&apos;re ready
            to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-5 w-5" />
              Call Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
