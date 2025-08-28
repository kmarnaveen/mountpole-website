"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  handlePartnershipCTA,
  getOptimizedCTAText,
  getPartnershipCTAVariant,
} from "@/utils/ctaTracking";

interface PartnershipCTAProps {
  text: string;
  intent:
    | "reseller"
    | "distributor"
    | "enterprise"
    | "regional"
    | "technology"
    | "general";
  source: string;
  campaign?: string;
  variant?: "button" | "link" | "card";
  size?: "sm" | "default" | "lg";
  className?: string;
  children?: ReactNode;
  icon?: ReactNode;
  href?: string; // Allow custom href override
}

/**
 * Enterprise-grade Partnership CTA Component
 * Handles sophisticated routing, tracking, A/B testing, and personalization
 */
export default function PartnershipCTA({
  text,
  intent,
  source,
  campaign,
  variant = "button",
  size = "default",
  className = "",
  children,
  icon,
  href,
}: PartnershipCTAProps) {
  // Generate sophisticated URL with all tracking parameters
  const generatePartnershipURL = (): string => {
    if (href) return href; // Use custom href if provided

    const params = new URLSearchParams();
    params.set("source", source);
    params.set("intent", intent);

    if (campaign) params.set("utm_campaign", campaign);

    // Add A/B test variant
    const variant = getPartnershipCTAVariant();
    params.set("variant", variant);

    // Add session tracking
    params.set("session", Date.now().toString());

    // Add personalization context
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("mountpole_returning_visitor");
      if (hasVisited) params.set("returning", "true");

      const userSegment = localStorage.getItem("mountpole_user_segment");
      if (userSegment) params.set("segment", userSegment);
    }

    return `/partnership?${params.toString()}`;
  };

  // Handle click with comprehensive tracking
  const handleClick = () => {
    // Track the CTA click with full context
    handlePartnershipCTA(optimizedText, source, intent, campaign);

    // Additional enterprise tracking
    if (typeof window !== "undefined") {
      // Mark user as having clicked partnership CTA for personalization
      localStorage.setItem("mountpole_partnership_interest", "true");
      localStorage.setItem("mountpole_last_partnership_intent", intent);

      // Update user segment based on intent
      const segmentMap: Record<string, string> = {
        reseller: "SMB_RETAILER",
        distributor: "LARGE_DISTRIBUTOR",
        enterprise: "ENTERPRISE_BUYER",
        regional: "INTERNATIONAL_PARTNER",
        technology: "TECH_INTEGRATOR",
        general: "PROSPECT",
      };
      localStorage.setItem("mountpole_user_segment", segmentMap[intent]);
    }
  };

  // Get optimized text based on A/B testing
  const optimizedText = getOptimizedCTAText(text, "partnership");

  // Generate the URL with all tracking
  const partnershipURL = generatePartnershipURL();

  // Intent-based styling for enterprise UX
  const getIntentStyling = () => {
    const baseStyles = "transition-all duration-300 font-semibold";

    switch (intent) {
      case "enterprise":
        return `${baseStyles} bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0`;
      case "distributor":
        return `${baseStyles} bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white border-0`;
      case "regional":
        return `${baseStyles} bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0`;
      case "technology":
        return `${baseStyles} bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0`;
      default:
        return `${baseStyles} bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0`;
    }
  };

  // Card variant for feature sections
  if (variant === "card") {
    return (
      <Link href={partnershipURL} onClick={handleClick}>
        <div
          className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
        >
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl hover:bg-white/15">
            {icon && (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/80 to-purple-500/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-white mb-2">
              {optimizedText}
            </h3>
            {children && <p className="text-white/80 text-sm">{children}</p>}
          </div>
        </div>
      </Link>
    );
  }

  // Link variant for inline text
  if (variant === "link") {
    return (
      <Link
        href={partnershipURL}
        onClick={handleClick}
        className={`inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200 ${className}`}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {optimizedText}
        {children}
      </Link>
    );
  }

  // Default button variant
  return (
    <Link href={partnershipURL} onClick={handleClick}>
      <Button
        size={size}
        className={`${getIntentStyling()} ${className}`}
        data-cta-id={`partnership_${source}_${intent}`}
        data-cta-intent={intent}
        data-cta-source={source}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {optimizedText}
        {children}
      </Button>
    </Link>
  );
}

/**
 * Specialized Partnership CTAs for common use cases
 */
export function BecomePartnerCTA({
  source,
  campaign,
  className,
}: {
  source: string;
  campaign?: string;
  className?: string;
}) {
  return (
    <PartnershipCTA
      text="Become a Partner"
      intent="reseller"
      source={source}
      campaign={campaign}
      className={className}
    />
  );
}

export function StartPartnershipCTA({
  source,
  campaign,
  className,
}: {
  source: string;
  campaign?: string;
  className?: string;
}) {
  return (
    <PartnershipCTA
      text="Start Partnership"
      intent="distributor"
      source={source}
      campaign={campaign}
      className={className}
    />
  );
}

export function BusinessPartnershipCTA({
  source,
  campaign,
  className,
}: {
  source: string;
  campaign?: string;
  className?: string;
}) {
  return (
    <PartnershipCTA
      text="Business Partnerships"
      intent="enterprise"
      source={source}
      campaign={campaign}
      variant="button"
      className={className}
    />
  );
}

export function EnterprisePartnershipCTA({
  source,
  campaign,
  className,
}: {
  source: string;
  campaign?: string;
  className?: string;
}) {
  return (
    <PartnershipCTA
      text="Enterprise Partnership"
      intent="enterprise"
      source={source}
      campaign={campaign}
      className={className}
    />
  );
}
