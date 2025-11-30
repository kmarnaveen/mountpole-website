"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  Calendar,
  Users,
  FileText,
  Mail,
  Phone,
  ArrowRight,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const [partnershipType, setPartnershipType] = useState("reseller");
  const [stage, setStage] = useState("evaluation");

  useEffect(() => {
    const type = searchParams.get("type") || "reseller";
    const currentStage = searchParams.get("stage") || "evaluation";
    setPartnershipType(type);
    setStage(currentStage);
  }, [searchParams]);

  const partnershipTypeLabels: Record<string, string> = {
    reseller: "Reseller Partnership",
    distributor: "Distribution Partnership",
    "authorized-dealer": "Authorized Dealer Program",
    "enterprise-partner": "Enterprise Partnership",
    "technology-partner": "Technology Integration Partner",
    "regional-partner": "Regional Partnership",
  };

  const nextSteps = [
    {
      icon: FileText,
      title: "Application Review",
      description:
        "Our business development team reviews your application and qualifications",
      timeline: "24-48 hours",
      status: "current",
    },
    {
      icon: Users,
      title: "Initial Consultation",
      description:
        "Scheduled call to discuss your business goals and partnership requirements",
      timeline: "Within 3 business days",
      status: "upcoming",
    },
    {
      icon: Calendar,
      title: "Documentation & Verification",
      description:
        "Complete business verification and sign partnership agreements",
      timeline: "1-2 weeks",
      status: "upcoming",
    },
    {
      icon: CheckCircle,
      title: "Partnership Activation",
      description: "Account setup, training, and first order placement",
      timeline: "2-3 weeks",
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
              Partnership Application Submitted
            </h1>
            <p className="text-xl text-white/80 mb-4">
              Thank you for your interest in our{" "}
              {partnershipTypeLabels[partnershipType]}
            </p>
            <p className="text-white/70 leading-relaxed">
              Your application has been received and our business development
              team will begin the review process immediately. We&apos;re excited
              about the possibility of working together.
            </p>
          </div>
        </div>
      </section>

      {/* Application Summary */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl mb-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <FileText className="h-6 w-6 mr-3 text-blue-400" />
                Application Summary
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Partnership Type
                  </h3>
                  <p className="text-white/80">
                    {partnershipTypeLabels[partnershipType]}
                  </p>
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-2">
                    Application ID
                  </h3>
                  <p className="text-white/80 font-mono">
                    MP-{Date.now().toString().slice(-8).toUpperCase()}
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
                  <p className="text-white/80">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps Timeline */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What Happens Next
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

      {/* Contact Information */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Questions */}
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-6">
                  Have Questions?
                </h3>
                <p className="text-white/80 mb-6">
                  Our partnership team is here to help guide you through the
                  process.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:partnerships@mountpole.com"
                    className="flex items-center text-white/90 hover:text-white transition-colors"
                  >
                    <Mail className="h-5 w-5 mr-3 text-blue-400" />
                    partnerships@mountpole.com
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

              {/* Quick Actions */}
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
                      Browse Our Product Catalog
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      Learn About Mountpole
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10"
                    >
                      Download Resources
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Notes */}
      <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <div className="backdrop-blur-xl bg-yellow-500/10 border border-yellow-400/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-yellow-200 mb-3">
                Important Information
              </h3>
              <div className="text-yellow-100/80 text-sm space-y-2">
                <p>
                  • Please keep your application ID for reference: MP-
                  {Date.now().toString().slice(-8).toUpperCase()}
                </p>
                <p>
                  • You will receive email confirmations at each stage of the
                  process
                </p>
                <p>
                  • Our partnership team operates Monday-Friday, 9 AM - 6 PM EST
                </p>
                <p>
                  • For urgent inquiries, please call our partnership hotline
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PartnershipThankYou() {
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
