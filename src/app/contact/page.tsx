"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Globe,
  Building2,
  MessageCircle,
  Users,
  Headphones,
} from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });

  // Auto-populate form based on URL parameters with enterprise-grade routing
  useEffect(() => {
    const type = searchParams.get("type");
    const product = searchParams.get("product");
    const productName = searchParams.get("name");
    const category = searchParams.get("category");
    const intent = searchParams.get("intent");
    const source = searchParams.get("source");

    // Partnership routing - redirect to dedicated partnership page
    if (type === "partnership" || type === "business") {
      // Build sophisticated partnership URL with context
      const partnershipParams = new URLSearchParams();
      partnershipParams.set("type", type);
      if (intent) partnershipParams.set("intent", intent);
      if (source) partnershipParams.set("source", source);
      if (category) partnershipParams.set("category", category);

      // Preserve UTM parameters for tracking
      searchParams.forEach((value, key) => {
        if (key.startsWith("utm_")) {
          partnershipParams.set(key, value);
        }
      });

      // Redirect to partnership page with full context
      window.location.href = `/partnership?${partnershipParams.toString()}`;
      return;
    }

    // Quote routing - redirect to dedicated quote page
    if (type === "quote") {
      // Build sophisticated quote URL with context
      const quoteParams = new URLSearchParams();
      quoteParams.set("type", type);
      if (product) quoteParams.set("product", product);
      if (productName) quoteParams.set("name", productName);
      if (category) quoteParams.set("category", category);
      if (intent) quoteParams.set("intent", intent);
      if (source) quoteParams.set("source", source);

      // Preserve UTM parameters for tracking
      searchParams.forEach((value, key) => {
        if (key.startsWith("utm_")) {
          quoteParams.set(key, value);
        }
      });

      // Redirect to quote page with full context
      window.location.href = `/quote?${quoteParams.toString()}`;
      return;
    }

    let defaultInquiryType = "";
    let defaultMessage = "";

    if (type === "spec-sheet") {
      defaultInquiryType = "product-info";
      if (productName) {
        defaultMessage = `I would like to download the technical specification sheet for the ${productName}. Please provide detailed technical documentation.`;
      }
    }

    setFormData((prev) => ({
      ...prev,
      inquiryType: defaultInquiryType,
      message: defaultMessage,
    }));
  }, [searchParams]);
  const contactInfo = [
    {
      icon: MapPin,
      title: "MountPole Canada",
      primary: "4920 Tomken Rd unit 4",
      secondary: "Mississauga, ON L4W 1J8, Canada",
      tertiary: "North America Operations",
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      primary: "+1 437 661 3501",
      secondary: "WhatsApp Available",
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
      icon: Globe,
      title: "MountPole Canada",
      primary: "Mississauga, Ontario",
      secondary: "Canada Operations",
      tertiary: "Serving North American markets",
    },
  ];

  const departments = [
    {
      icon: Headphones,
      title: "Customer Support",
      email: "sales@mountpole.com",
      description:
        "Product information, technical support, and customer service inquiries",
    },
    {
      icon: Users,
      title: "Partnership & Retailers",
      email: "partners@mountpole.com",
      description:
        "Business partnerships, retail programs, and authorized dealer opportunities",
    },
    {
      icon: Globe,
      title: "International Business",
      email: "international@mountpole.com",
      description:
        "Global business development and international trade partnerships",
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyTqO6ngsDYL0-hcN-Z0hAZUxeuCKYXYb2WNxXgLnpsS2r56r-Vxg1f8Y0jk7KSyGdk/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            formType: "Contact Form",
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        }
      );

      // Reset form
      setFormData({
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        inquiryType: "",
        message: "",
      });

      alert(
        "Thank you for your inquiry! Our MountPole team will contact you within 24 hours to discuss partnership opportunities."
      );
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert(
        "Sorry, there was an error submitting your inquiry. Please try again or contact us directly at info@mountpole.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <MessageCircle className="mx-auto h-16 w-16 text-blue-400 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Connect with MountPole
          </h1>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Ready to partner with a trusted global technology distributor?
            Contact our team for partnership opportunities, support, and
            business solutions.
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
                Request Partnership Information
              </h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                          handleInputChange("fullName", e.target.value)
                        }
                        placeholder="Enter your full name"
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Company Name */}
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        placeholder="Your company name"
                        className="mt-2"
                        required
                      />
                    </div>

                    {/* Email and Phone in Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          placeholder="your@company.com"
                          className="mt-2"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+1 (555) 123-4567"
                          className="mt-2"
                          required
                        />
                      </div>
                    </div>

                    {/* Inquiry Type Dropdown */}
                    <div>
                      <Label htmlFor="inquiryType">
                        I&apos;m interested in... *
                      </Label>
                      <Select
                        value={formData.inquiryType}
                        onValueChange={(value) =>
                          handleInputChange("inquiryType", value)
                        }
                        required
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="product-info">
                            Product Information
                          </SelectItem>
                          <SelectItem value="partnership">
                            Partnership Opportunities
                          </SelectItem>
                          <SelectItem value="enterprise-solutions">
                            Enterprise Solutions
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Message */}
                    <div>
                      <Label htmlFor="message">How can we help? *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        placeholder="Please provide details about your inquiry, including quantity requirements, timeline, or specific questions..."
                        className="mt-2 min-h-32"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Departments */}
          </div>

          {/* Business Departments */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">
              Connect with the Right Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {departments.map((dept, index) => (
                <Card
                  key={index}
                  className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <CardHeader>
                    <dept.icon className="mx-auto h-12 w-12 text-purple-600 mb-4" />
                    <CardTitle className="text-lg">{dept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-600">{dept.description}</p>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                    >
                      {dept.email}
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
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
            Explore our products and learn more about MountPole&apos;s business
            solutions and partnership opportunities.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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

      {/* Map Section */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            Find Us
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative">
                {/* Map Header with Address */}
                <div className="bg-white/95 backdrop-blur-lg p-6 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-6 w-6 text-blue-600" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          MountPole Headquarters
                        </h3>
                        <p className="text-gray-600">Doral, Florida, USA</p>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        window.open(
                          "https://www.google.com/maps/search/Doral+Florida+technology+companies/@25.8197,-80.3553,13z",
                          "_blank"
                        )
                      }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Get Directions
                    </Button>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="relative h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57686.15076308859!2d-80.39529935!3d25.8197207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9bea8547c9e77%3A0x7c1a7b1a7c1a7b1a!2sDoral%2C%20FL%2C%20USA!5e0!3m2!1sen!2sus!4v1635000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="MountPole Location - Doral, Florida"
                  ></iframe>

                  {/* Overlay with Quick Actions */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-3 space-y-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps/dir//Doral,+FL,+USA/@25.8197207,-80.39529935,13z",
                            "_blank"
                          )
                        }
                        className="w-full text-xs"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Navigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          window.open(
                            "https://www.google.com/maps/search/Doral+Florida/@25.8197207,-80.39529935,15z",
                            "_blank"
                          )
                        }
                        className="w-full text-xs"
                      >
                        <MapPin className="h-3 w-3 mr-1" />
                        Explore Area
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Address
                      </h4>
                      <p className="text-sm text-gray-600">
                        Doral, Florida
                        <br />
                        United States
                      </p>
                    </div>
                    <div className="text-center">
                      <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email
                      </h4>
                      <p className="text-sm text-gray-600">
                        info@mountpole.com
                      </p>
                    </div>
                    <div className="text-center">
                      <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Business Hours
                      </h4>
                      <p className="text-sm text-gray-600">
                        Mon - Fri: 9AM - 6PM EST
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact page...</p>
        </div>
      </div>
    }>
      <ContactForm />
    </Suspense>
  );
}
