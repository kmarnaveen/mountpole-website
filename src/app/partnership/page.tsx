"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Building2,
  Users,
  Globe,
  Handshake,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import PartnershipFormGlass from "@/components/forms/PartnershipFormGlass";
import { trackFormEvent } from "@/utils/formValidation";

// Partnership journey stages for sophisticated UX
type PartnershipStage =
  | "inquiry"
  | "evaluation"
  | "application"
  | "onboarding"
  | "active";

type PartnershipType =
  | "reseller"
  | "distributor"
  | "authorized-dealer"
  | "enterprise-partner"
  | "technology-partner"
  | "regional-partner";

interface PartnershipPageProps {}

function PartnershipPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [partnershipType, setPartnershipType] =
    useState<PartnershipType>("reseller");
  const [currentStage, setCurrentStage] = useState<PartnershipStage>("inquiry");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Enterprise-grade URL parameter handling
  useEffect(() => {
    const source = searchParams.get("source");
    const type = searchParams.get("type");
    const intent = searchParams.get("intent");
    const campaign = searchParams.get("utm_campaign");

    // Sophisticated type detection based on URL parameters
    if (type === "partnership" || type === "business") {
      if (intent === "distributor" || source === "distributor-inquiry") {
        setPartnershipType("distributor");
      } else if (intent === "enterprise" || source === "enterprise-cta") {
        setPartnershipType("enterprise-partner");
      } else if (intent === "regional" || source === "international") {
        setPartnershipType("regional-partner");
      } else if (intent === "technology" || source === "tech-integration") {
        setPartnershipType("technology-partner");
      } else {
        setPartnershipType("reseller"); // Default for business inquiries
      }
    }

    // Set stage based on intent
    if (intent === "application" || source === "advanced-inquiry") {
      setCurrentStage("application");
    } else {
      setCurrentStage("inquiry");
    }
  }, [searchParams]);

  const partnershipConfig = {
    reseller: {
      title: "Reseller Partnership",
      subtitle: "Join our growing network of retail partners",
      description:
        "Access wholesale pricing, marketing support, and dedicated account management for your retail business.",
      icon: Building2,
      color: "from-blue-600 to-cyan-600",
      benefits: [
        "Competitive wholesale margins",
        "Marketing co-op programs",
        "Product training & certification",
        "Dedicated account manager",
        "Fast order processing",
        "Flexible payment terms",
      ],
      requirements: [
        "Established retail presence",
        "Minimum order commitments",
        "Business registration documents",
        "Credit application approval",
      ],
    },
    distributor: {
      title: "Distribution Partnership",
      subtitle: "Become an authorized distributor in your region",
      description:
        "Exclusive territory rights with comprehensive support for large-scale distribution operations.",
      icon: Globe,
      color: "from-purple-600 to-pink-600",
      benefits: [
        "Exclusive territory rights",
        "Volume-based pricing tiers",
        "Marketing development funds",
        "Technical training programs",
        "Priority product allocation",
        "Co-branded marketing materials",
      ],
      requirements: [
        "Significant market presence",
        "Distribution infrastructure",
        "Minimum annual commitments",
        "Financial qualifications",
        "Regional market expertise",
      ],
    },
    "authorized-dealer": {
      title: "Authorized Dealer Program",
      subtitle: "Official brand representation with premium support",
      description:
        "Represent leading technology brands with full manufacturer backing and premium partner benefits.",
      icon: Shield,
      color: "from-green-600 to-emerald-600",
      benefits: [
        "Official brand authorization",
        "Premium support channel",
        "Advanced technical training",
        "Brand marketing support",
        "Warranty administration",
        "Sales incentive programs",
      ],
      requirements: [
        "Technical certification",
        "Sales performance metrics",
        "Customer service standards",
        "Brand compliance agreement",
      ],
    },
    "enterprise-partner": {
      title: "Enterprise Partnership",
      subtitle: "Strategic partnerships for large-scale deployments",
      description:
        "Custom solutions and white-glove service for enterprise-level technology procurement and deployment.",
      icon: Users,
      color: "from-orange-600 to-red-600",
      benefits: [
        "Custom pricing structures",
        "Dedicated project managers",
        "Enterprise-grade SLAs",
        "Custom configuration services",
        "Priority technical support",
        "Executive relationship management",
      ],
      requirements: [
        "Enterprise customer base",
        "Project management capabilities",
        "Technical expertise",
        "Corporate structure",
      ],
    },
    "technology-partner": {
      title: "Technology Integration Partner",
      subtitle: "Integrate our solutions with your platforms",
      description:
        "Technical partnerships for software integration, API access, and joint solution development.",
      icon: TrendingUp,
      color: "from-indigo-600 to-purple-600",
      benefits: [
        "API access & documentation",
        "Technical integration support",
        "Joint solution development",
        "Co-marketing opportunities",
        "Revenue sharing programs",
        "Priority feature requests",
      ],
      requirements: [
        "Technical platform",
        "Development capabilities",
        "Integration expertise",
        "Customer base alignment",
      ],
    },
    "regional-partner": {
      title: "Regional Partnership",
      subtitle: "Expand our reach in your geographic market",
      description:
        "Regional exclusive partnerships for international expansion and localized market development.",
      icon: Globe,
      color: "from-teal-600 to-blue-600",
      benefits: [
        "Regional exclusivity",
        "Localization support",
        "Cultural adaptation assistance",
        "Local marketing programs",
        "Regional pricing models",
        "In-country support",
      ],
      requirements: [
        "Regional market knowledge",
        "Local business presence",
        "Cultural expertise",
        "Regulatory compliance",
        "Local partnerships",
      ],
    },
  };

  const config = partnershipConfig[partnershipType];
  const IconComponent = config.icon;

  const handleFormSuccess = () => {
    setIsFormSubmitted(true);
    setCurrentStage("evaluation");

    // Track successful submission with partnership context

    // Advanced UX: Auto-redirect to thank you page with context
    setTimeout(() => {
      router.push(
        `/partnership/thank-you?type=${partnershipType}&stage=evaluation`
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
              Partnership Application Received
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-6">
              Thank you for your interest in partnering with Mountpole. Our
              business development team will review your{" "}
              {config.title.toLowerCase()} application and respond within 24
              hours.
            </p>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left">
              <h3 className="text-white font-semibold mb-2">Next Steps:</h3>
              <ul className="text-white/70 space-y-1 text-sm">
                <li>• Application review: 24-48 hours</li>
                <li>• Initial qualification call</li>
                <li>• Documentation review</li>
                <li>• Partnership agreement finalization</li>
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
          </div>
        </div>
      </section>

      {/* Partnership Details Grid */}

      {/* Partnership Types Selector */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Explore Other Partnership Opportunities
            </h2>
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.entries(partnershipConfig).map(([type, typeConfig]) => (
                <button
                  key={type}
                  onClick={() => setPartnershipType(type as PartnershipType)}
                  className={`backdrop-blur-xl border rounded-2xl p-4 text-center transition-all duration-300 hover:scale-105 ${
                    partnershipType === type
                      ? "bg-white/20 border-white/40"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                  <typeConfig.icon className="h-8 w-8 text-white mx-auto mb-2" />
                  <p className="text-white text-sm font-medium">
                    {typeConfig.title
                      .replace(" Partnership", "")
                      .replace(" Program", "")}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Partnership Application Form */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Start Your Partnership Journey
              </h2>
              <p className="text-white/70 text-lg">
                Complete our partnership application to begin the qualification
                process
              </p>
            </div>

            <PartnershipFormGlass
              onSuccess={handleFormSuccess}
              partnershipType={partnershipType}
              stage={currentStage}
            />
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      {/* <section className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-8">
              Partnership Process Timeline
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { stage: "Application", time: "Day 1", icon: Building2 },
                { stage: "Review", time: "Days 2-3", icon: Clock },
                { stage: "Qualification", time: "Week 1", icon: Users },
                { stage: "Onboarding", time: "Week 2-3", icon: Handshake },
              ].map((step, index) => (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
                >
                  <step.icon className="h-8 w-8 text-white mx-auto mb-3" />
                  <h4 className="text-white font-semibold mb-1">
                    {step.stage}
                  </h4>
                  <p className="text-white/60 text-sm">{step.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}

export default function PartnershipPage({}: PartnershipPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <PartnershipPageContent />
    </Suspense>
  );
}
