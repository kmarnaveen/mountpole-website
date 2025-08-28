"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Calculator,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  DollarSign,
  Package,
  Truck,
} from "lucide-react";
import QuoteFormGlass from "@/components/forms/QuoteFormGlass";
import { trackFormEvent } from "@/utils/formValidation";

// Quote types for sophisticated routing
type QuoteType = "general" | "bulk" | "enterprise" | "custom" | "urgent";

interface QuotePageProps {}

function QuotePageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [quoteType, setQuoteType] = useState<QuoteType>("general");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [productContext, setProductContext] = useState<string>("");

  // Enterprise-grade URL parameter handling
  useEffect(() => {
    const type = searchParams.get("type");
    const product = searchParams.get("product");
    const productName = searchParams.get("name");
    const category = searchParams.get("category");
    const source = searchParams.get("source");
    const quantity = searchParams.get("quantity");
    const urgency = searchParams.get("urgency");

    // Track quote page entry with full context
    trackFormEvent("Quote Page", "page_entry", {
      type: type || "general",
      product: product || "none",
      category: category || "general",
      source: source || "direct",
      quantity: quantity || "unknown",
      timestamp: new Date().toISOString(),
    });

    // Determine quote type based on parameters
    if (urgency === "high" || source === "urgent-inquiry") {
      setQuoteType("urgent");
    } else if (quantity && parseInt(quantity) > 100) {
      setQuoteType("bulk");
    } else if (source === "enterprise" || type === "enterprise") {
      setQuoteType("enterprise");
    } else if (product === "custom" || category === "custom") {
      setQuoteType("custom");
    } else {
      setQuoteType("general");
    }

    // Set product context for form pre-population
    if (productName) {
      setProductContext(`Requesting quote for: ${productName}`);
    } else if (product) {
      setProductContext(`Product ID: ${product}`);
    } else if (category) {
      setProductContext(`Category: ${category}`);
    }
  }, [searchParams]);

  const quoteConfig = {
    general: {
      title: "Request Wholesale Quote",
      subtitle: "Get competitive pricing for your business",
      description:
        "Access wholesale pricing with volume discounts, flexible payment terms, and fast turnaround.",
      icon: Calculator,
      color: "from-blue-600 to-cyan-600",
      benefits: [
        "Wholesale pricing tiers",
        "Volume discounts available",
        "Fast quote turnaround",
        "Flexible payment terms",
        "Dedicated account support",
        "Product authenticity guarantee",
      ],
      turnaround: "24 hours",
      minOrder: "No minimum order",
    },
    bulk: {
      title: "Bulk Order Quote",
      subtitle: "Enterprise volume pricing for large orders",
      description:
        "Specialized pricing for high-volume orders with enhanced support and logistics coordination.",
      icon: Package,
      color: "from-green-600 to-emerald-600",
      benefits: [
        "Deep volume discounts",
        "Custom pricing tiers",
        "Dedicated logistics support",
        "Priority order processing",
        "Extended payment terms",
        "White-glove service",
      ],
      turnaround: "12 hours",
      minOrder: "100+ units",
    },
    enterprise: {
      title: "Enterprise Quote Request",
      subtitle: "Custom solutions for enterprise deployments",
      description:
        "Tailored pricing and services for enterprise-scale technology procurement and deployment.",
      icon: Shield,
      color: "from-purple-600 to-pink-600",
      benefits: [
        "Custom contract pricing",
        "Enterprise-grade SLAs",
        "Dedicated project manager",
        "Configuration services",
        "Priority technical support",
        "Executive relationship management",
      ],
      turnaround: "6 hours",
      minOrder: "Enterprise scale",
    },
    custom: {
      title: "Custom Solution Quote",
      subtitle: "Tailored technology solutions",
      description:
        "Custom configurations, specialized products, and bespoke technology solutions for unique requirements.",
      icon: TrendingUp,
      color: "from-orange-600 to-red-600",
      benefits: [
        "Custom product configurations",
        "Specialized sourcing",
        "Technical consultation",
        "Integration services",
        "Custom packaging",
        "Tailored warranties",
      ],
      turnaround: "48 hours",
      minOrder: "Project-based",
    },
    urgent: {
      title: "Urgent Quote Request",
      subtitle: "Fast-track pricing for immediate needs",
      description:
        "Priority quote processing for urgent orders with expedited delivery options and rush support.",
      icon: Clock,
      color: "from-red-600 to-orange-600",
      benefits: [
        "Priority quote processing",
        "Expedited delivery options",
        "Rush order support",
        "Same-day response",
        "Express logistics",
        "24/7 support availability",
      ],
      turnaround: "2 hours",
      minOrder: "Rush order fees apply",
    },
  };

  const config = quoteConfig[quoteType];
  const IconComponent = config.icon;

  const handleFormSuccess = () => {
    setIsFormSubmitted(true);

    // Track successful submission with quote context
    trackFormEvent("Quote Form", "submit_success", {
      quoteType,
      productContext,
      timestamp: new Date().toISOString(),
    });

    // Advanced UX: Auto-redirect to thank you page with context
    setTimeout(() => {
      router.push(
        `/quote/thank-you?type=${quoteType}&context=${encodeURIComponent(
          productContext
        )}`
      );
    }, 3000);
  };

  if (isFormSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400/80 to-emerald-500/80 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Quote Request Submitted
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Thank you for your quote request. Our sales team will provide
              competitive {config.title.toLowerCase()} pricing within{" "}
              {config.turnaround}.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
              <h3 className="text-white font-semibold mb-2">What's Next:</h3>
              <ul className="text-white/70 space-y-1 text-sm">
                <li>• Quote processing: {config.turnaround}</li>
                <li>• Pricing review and approval</li>
                <li>• Order placement and fulfillment</li>
                <li>• Delivery coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div
              className={`w-20 h-20 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30 shadow-2xl`}
            >
              <IconComponent className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {config.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-6">
              {config.subtitle}
            </p>
            <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              {config.description}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                <div className="flex items-center text-white">
                  <Clock className="h-5 w-5 mr-2 text-green-400" />
                  <span className="font-semibold">{config.turnaround}</span>
                </div>
                <p className="text-white/60 text-sm">Response Time</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                <div className="flex items-center text-white">
                  <Package className="h-5 w-5 mr-2 text-blue-400" />
                  <span className="font-semibold">{config.minOrder}</span>
                </div>
                <p className="text-white/60 text-sm">Minimum Order</p>
              </div>
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl px-6 py-3">
                <div className="flex items-center text-white">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  <span className="font-semibold">Guaranteed</span>
                </div>
                <p className="text-white/60 text-sm">Authentic Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-12">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-green-400" />
                Quote Benefits
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {config.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-white/90">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Types Selector */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Choose Your Quote Type
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(quoteConfig).map(([type, typeConfig]) => (
                <button
                  key={type}
                  onClick={() => setQuoteType(type as QuoteType)}
                  className={`backdrop-blur-xl border rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    quoteType === type
                      ? "bg-white/20 border-white/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <typeConfig.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">
                    {typeConfig.title
                      .replace(" Quote", "")
                      .replace(" Request", "")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Request Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Submit Your Quote Request
              </h2>
              <p className="text-white/70 text-lg">
                Provide your requirements and we'll deliver competitive pricing
              </p>
            </div>

            <QuoteFormGlass
              onSuccess={handleFormSuccess}
              quoteType={quoteType}
              productContext={productContext}
            />
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Why Choose Mountpole for Quotes
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Best Pricing</h4>
                <p className="text-white/70 text-sm">
                  Competitive wholesale rates with volume discounts
                </p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <Clock className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">Fast Response</h4>
                <p className="text-white/70 text-sm">
                  Quick turnaround times for all quote requests
                </p>
              </div>
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <Truck className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                <h4 className="text-white font-semibold mb-2">
                  Reliable Delivery
                </h4>
                <p className="text-white/70 text-sm">
                  Global shipping with tracking and insurance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function QuotePage({}: QuotePageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <QuotePageContent />
    </Suspense>
  );
}
