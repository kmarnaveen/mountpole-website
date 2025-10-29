"use client";

import Link from "next/link";
import { Gamepad2, Smartphone, Tablet, Headphones, Watch } from "lucide-react";

const categories = [
  {
    name: "Gaming",
    icon: Gamepad2,
    href: "/gaming",
    description: "Gaming consoles, controllers, and accessories",
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "Smartphones",
    icon: Smartphone,
    href: "/smartphones",
    description: "Latest smartphones from top brands",
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "Tablets",
    icon: Tablet,
    href: "/tablets",
    description: "Tablets for work and entertainment",
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "Audio",
    icon: Headphones,
    href: "/audio",
    description: "Earbuds, speakers, and audio accessories",
    color: "from-orange-500 to-red-500",
  },
  {
    name: "Wearables",
    icon: Watch,
    href: "/wearables",
    description: "Smartwatches and fitness trackers",
    color: "from-indigo-500 to-purple-500",
  },
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Browse Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                <div className="relative z-10">
                  <div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${category.color} mb-4`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    {category.name}
                  </h2>

                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300">
                    Browse {category.name}
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
