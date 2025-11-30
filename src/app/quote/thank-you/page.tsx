"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Calculator,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [quoteType, setQuoteType] = useState("general");
  const [productContext, setProductContext] = useState("");

  useEffect(() => {
    const type = searchParams.get("type") || "general";
    const context = searchParams.get("context") || "";
    setQuoteType(type);
    setProductContext(decodeURIComponent(context));
  }, [searchParams]);

  const quoteTypeLabels: Record<string, string> = {
    general: "Wholesale Quote Request",
    bulk: "Bulk Order Quote Request",
    enterprise: "Enterprise Quote Request",
    custom: "Custom Solution Quote Request",
    urgent: "Urgent Quote Request",
  };

  const responseTimeMap: Record<string, string> = {
    general: "24 hours",
    bulk: "12 hours",
    enterprise: "6 hours",
    custom: "48 hours",
    urgent: "2 hours",
  };

  const nextSteps = [
    {
      icon: FileText,
      title: "Quote Processing",
      description:
        "Our sales team reviews your requirements and prepares competitive pricing",
      timeline: responseTimeMap[quoteType],
      status: "current",
    },
    {
      icon: DollarSign,
      title: "Pricing Review",
      description:
        "Quality assurance review of pricing and terms before delivery",
      timeline: "Within business day",
      status: "upcoming",
    },
    {
      icon: Mail,
      title: "Quote Delivery",
      description:
        "Detailed quote sent with pricing, terms, and ordering instructions",
      timeline: "Email delivery",
      status: "upcoming",
    },
    {
      icon: CheckCircle,
      title: "Order Placement",
      description:
        "Review quote and place order with dedicated account support",
      timeline: "When ready",
      status: "upcoming",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      {/* Success Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400/80 to-emerald-500/80 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/30 shadow-2xl">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Quote Request Submitted
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Thank you for your {quoteTypeLabels[quoteType]}
            </p>
            <p className="text-white/70 leading-relaxed">
              Your quote request has been received and our sales team will
              prepare competitive pricing within {responseTimeMap[quoteType]}.
              We&apos;re committed to providing the best wholesale rates for
              your business.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Summary */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Calculator className="h-6 w-6 mr-3 text-blue-400" />
                Quote Request Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">Quote Type</h3>
                  <p className="text-white/80">{quoteTypeLabels[quoteType]}</p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Request ID</h3>
                  <p className="text-white/80 font-mono">
                    QT-{Date.now().toString().slice(-8).toUpperCase()}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Submitted</h3>
                  <p className="text-white/80">
                    {new Date().toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Expected Response
                  </h3>
                  <p className="text-white/80">
                    Within {responseTimeMap[quoteType]}
                  </p>
                </div>
                {productContext && (
                  <div className="md:col-span-2">
                    <h3 className="text-white font-semibold mb-2">
                      Product Context
                    </h3>
                    <p className="text-white/80">{productContext}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Quote Processing Timeline
            </h2>
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <div
                  key={index}
                  className={`backdrop-blur-xl border rounded-2xl p-6 transition-all duration-300 ${
                    step.status === "current"
                      ? "bg-blue-500/20 border-blue-400/40"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        step.status === "current"
                          ? "bg-blue-500/30 border border-blue-400/50"
                          : "bg-white/10 border border-white/20"
                      }`}
                    >
                      <step.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-white">
                          {step.title}
                        </h3>
                        <div className="flex items-center text-white/70">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="text-sm">{step.timeline}</span>
                        </div>
                      </div>
                      <p className="text-white/80">{step.description}</p>
                      {step.status === "current" && (
                        <div className="mt-3 flex items-center text-blue-300 text-sm">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse" />
                          Currently in progress
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Information & Actions */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Support Contact */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Need Assistance?
                </h3>
                <p className="text-white/80 mb-6">
                  Our sales team is here to help with your quote and answer any
                  questions.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:quotes@mountpole.com"
                    className="flex items-center text-white/90 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-3 text-blue-400" />
                    quotes@mountpole.com
                  </a>
                  <a
                    href="tel:+14376613501"
                    className="flex items-center text-white/90 hover:text-white transition-colors"
                  >
                    <Phone className="h-5 w-5 mr-3 text-green-400" />
                    +1 (437) 661-3501
                  </a>
                </div>
              </div>

              {/* Related Actions */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  While You Wait
                </h3>
                <div className="space-y-4">
                  <Link href="/products">
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      Browse Product Catalog
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/partnership">
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      Explore Partnership Options
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      Contact Our Team
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Guarantee */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-green-500/10 border border-green-400/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-green-200 mb-3">
                Our Quote Guarantee
              </h3>
              <div className="text-green-100/80 text-sm space-y-2">
                <p>• Competitive wholesale pricing with volume discounts</p>
                <p>• Authentic products with manufacturer warranties</p>
                <p>• Flexible payment terms and financing options</p>
                <p>• Fast shipping and white-glove delivery services</p>
                <p>• Dedicated account management and ongoing support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function QuoteThankYou() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
