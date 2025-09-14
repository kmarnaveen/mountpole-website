import React from "react";
import {
  Mail,
  Phone,
  Clock,
  MessageSquare,
  HelpCircle,
  FileText,
} from "lucide-react";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How can we help you?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get the support you need from our expert team. We're here to help
              with orders, technical questions, and everything in between.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Call Us
            </h3>
            <p className="text-gray-600 mb-4">
              Speak directly with our support team
            </p>
            <p className="text-2xl font-bold text-blue-600">
              +1 (555) 123-4567
            </p>
            <p className="text-sm text-gray-500 mt-2">Mon-Fri 9AM-6PM EST</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Email Support
            </h3>
            <p className="text-gray-600 mb-4">Get detailed help via email</p>
            <p className="text-lg font-semibold text-green-600">
              support@mountpole.com
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Response within 24 hours
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageSquare className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Live Chat
            </h3>
            <p className="text-gray-600 mb-4">Chat with us in real-time</p>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Start Chat
            </button>
            <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
          </div>
        </div>

        {/* Support Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Popular Support Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <HelpCircle className="w-6 h-6" />,
                title: "Order Status",
                description: "Track your order and delivery information",
              },
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Returns & Exchanges",
                description: "Information about our return policy",
              },
              {
                icon: <Clock className="w-6 h-6" />,
                title: "Warranty Support",
                description: "Device warranty and repair services",
              },
              {
                icon: <Phone className="w-6 h-6" />,
                title: "Technical Support",
                description: "Device setup and troubleshooting",
              },
              {
                icon: <Mail className="w-6 h-6" />,
                title: "Account Help",
                description: "Account management and billing",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Product Information",
                description: "Specifications and compatibility",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "How long does shipping take?",
                answer:
                  "Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer a 30-day return policy for all products in original condition with original packaging.",
              },
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we ship to most countries worldwide. Shipping costs and times vary by location.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "You'll receive a tracking number via email once your order ships. You can also check your order status in your account.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 bg-gray-900 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Support Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p>Mon-Fri: 9AM-6PM EST</p>
              <p>Sat-Sun: 10AM-4PM EST</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p>Available 24/7</p>
              <p>Response within 24 hours</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p>Available 24/7</p>
              <p>Instant response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
