"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CategoryQuoteFormGlass from "@/components/forms/CategoryQuoteFormGlass";
import { ArrowLeft, Sparkles } from "lucide-react";

// Loading component for Suspense
function CategoryQuoteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [category, setCategory] = useState<
    "smartphones" | "tablets" | "wearables" | "monitors" | "audio" | null
  >(null);

  useEffect(() => {
    const categoryParam = searchParams.get("category") as
      | "smartphones"
      | "tablets"
      | "wearables"
      | "monitors"
      | "audio";

    if (
      categoryParam &&
      ["smartphones", "tablets", "wearables", "monitors", "audio"].includes(
        categoryParam
      )
    ) {
      setCategory(categoryParam);
    } else {
      // Redirect to general quote page if no valid category
      router.push("/quote");
    }
  }, [searchParams, router]);

  const handleSuccess = () => {
    router.push("/quote/thank-you");
  };

  const handleBack = () => {
    router.push("/");
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          <p className="text-white mt-4 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glassmorphism Navigation */}
      <div className="relative z-10 pt-8">
        <div className="container mx-auto px-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center pt-12 pb-8">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-6 py-3 mb-6">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-white font-medium">
              Category Quote Request
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Specialized Pricing
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Get category-specific wholesale pricing with expert recommendations
            tailored to your business needs.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10">
        <CategoryQuoteFormGlass category={category} onSuccess={handleSuccess} />
      </div>

      {/* Footer Section */}
      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="text-white font-semibold mb-2">
                  Expert Support
                </h3>
                <p className="text-white/70 text-sm">
                  Category specialists with deep product knowledge
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Best Pricing</h3>
                <p className="text-white/70 text-sm">
                  Competitive wholesale rates for bulk orders
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-2">Fast Response</h3>
                <p className="text-white/70 text-sm">
                  Detailed quotes delivered within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryQuotePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
            <p className="text-white mt-4 text-center">Loading...</p>
          </div>
        </div>
      }
    >
      <CategoryQuoteContent />
    </Suspense>
  );
}
