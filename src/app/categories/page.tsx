import React from "react";
import Link from "next/link";
import { Smartphone, Tablet, Watch, Headphones, Monitor } from "lucide-react";

const categories = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Latest smartphones from top brands",
    icon: <Smartphone className="w-8 h-8" />,
    href: "/smartphones",
    color: "bg-blue-500",
    count: "8+ devices",
  },
  {
    id: "tablets",
    name: "Tablets",
    description: "Powerful tablets for work and entertainment",
    icon: <Tablet className="w-8 h-8" />,
    href: "/tablets",
    color: "bg-green-500",
    count: "5+ devices",
  },
  {
    id: "wearables",
    name: "Wearables",
    description: "Smart watches and fitness trackers",
    icon: <Watch className="w-8 h-8" />,
    href: "/wearables",
    color: "bg-purple-500",
    count: "6+ devices",
  },
  {
    id: "audio",
    name: "Audio",
    description: "Premium headphones and earbuds",
    icon: <Headphones className="w-8 h-8" />,
    href: "/audio",
    color: "bg-red-500",
    count: "3+ devices",
  },
  {
    id: "monitors",
    name: "Monitors",
    description: "Professional displays and monitors",
    icon: <Monitor className="w-8 h-8" />,
    href: "/monitors",
    color: "bg-indigo-500",
    count: "5+ devices",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Product Categories
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of technology products across all
              categories
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div
                  className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>

                <p className="text-gray-600 mb-4">{category.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    {category.count}
                  </span>
                  <span className="text-blue-600 font-semibold group-hover:text-blue-700">
                    Explore →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact our experts for personalized product recommendations
          </p>
          <div className="space-x-4">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Contact Us
            </Link>
            <Link
              href="/search"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors inline-block"
            >
              Search Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
