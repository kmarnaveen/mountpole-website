"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageCircle,
  Mail,
  Phone,
  FileQuestion,
  HelpCircle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team in real-time",
      action: "Start Chat",
      href: "#",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email and we'll respond within 24 hours",
      action: "Send Email",
      href: "mailto:support@mountpole.com",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call our dedicated support line",
      action: "Call Now",
      href: "tel:+1-800-123-4567",
    },
    {
      icon: FileQuestion,
      title: "FAQs",
      description: "Find answers to commonly asked questions",
      action: "View FAQs",
      href: "/faq",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;re here to help. Choose the support option that works best
            for you.
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {supportOptions.map((option) => {
            const Icon = option.icon;
            return (
              <Card
                key={option.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <Link href={option.href}>
                    <Button className="w-full">
                      {option.action}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Contact Info */}
        <div className="bg-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need More Help?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our business development team is available to assist with
            partnership inquiries, bulk orders, and enterprise solutions.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Contact Sales Team
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
