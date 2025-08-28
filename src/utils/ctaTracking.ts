/**
 * Enterprise-grade CTA tracking and analytics
 * 30+ years industry experience implementation
 */

export interface CTAAnalytics {
  ctaId: string;
  ctaText: string;
  ctaType: "partnership" | "quote" | "contact" | "newsletter" | "category";
  source: string;
  intent?: string;
  campaign?: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  sessionId: string;
  userId?: string;
  experimentId?: string;
  variant?: string;
}

export interface ConversionFunnel {
  stage: "impression" | "click" | "form_start" | "form_submit" | "conversion";
  ctaId: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

class CTATracker {
  private sessionId: string;
  private userId?: string;
  private experiments: Map<string, string> = new Map();

  constructor() {
    this.sessionId = this.generateSessionId();
    this.initializeTracking();
  }

  private generateSessionId(): string {
    return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeTracking(): void {
    // Initialize A/B testing experiments
    this.experiments.set(
      "partnership_cta_variant",
      this.getExperimentVariant("partnership_cta")
    );
    this.experiments.set(
      "quote_form_variant",
      this.getExperimentVariant("quote_form")
    );

    // Set up conversion tracking
    this.setupConversionTracking();

    // Initialize heatmap tracking for CTA optimization
    this.initializeHeatmapTracking();
  }

  private getExperimentVariant(experimentName: string): string {
    const stored = localStorage.getItem(`experiment_${experimentName}`);
    if (stored) return stored;

    // Simple A/B split for enterprise testing
    const variants = ["control", "variant_a", "variant_b"];
    const variant = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`experiment_${experimentName}`, variant);
    return variant;
  }

  /**
   * Track CTA click with comprehensive context
   */
  trackCTAClick(
    analytics: Omit<
      CTAAnalytics,
      "timestamp" | "userAgent" | "referrer" | "sessionId"
    >
  ): void {
    const fullAnalytics: CTAAnalytics = {
      ...analytics,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: this.sessionId,
      userId: this.userId,
      experimentId: `${analytics.ctaType}_experiment`,
      variant:
        this.experiments.get(`${analytics.ctaType}_cta_variant`) || "control",
    };

    // Update conversion funnel and store locally
    this.updateConversionFunnel("click", analytics.ctaId);
    this.storeAnalyticsLocally(fullAnalytics);
  }

  /**
   * Track form interactions for conversion optimization
   */
  trackFormInteraction(
    formType: string,
    action: string,
    metadata?: Record<string, any>
  ): void {
    const event = {
      eventType: "form_interaction",
      formType,
      action,
      metadata,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
    };

    this.updateConversionFunnel(action as any, `${formType}_form`);
  }

  /**
   * Track partnership journey stages
   */
  trackPartnershipJourney(
    stage: string,
    partnershipType: string,
    metadata?: Record<string, any>
  ): void {
    const journeyEvent = {
      eventType: "partnership_journey",
      stage,
      partnershipType,
      metadata,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      experimentVariant: this.experiments.get("partnership_cta_variant"),
    };

    // Store locally for analysis
    this.storeAnalyticsLocally(journeyEvent);
  }

  private storeAnalyticsLocally(data: any): void {
    const stored = JSON.parse(
      localStorage.getItem("mountpole_analytics") || "[]"
    );
    stored.push(data);

    // Keep only last 100 events to prevent storage overflow
    if (stored.length > 100) {
      stored.splice(0, stored.length - 100);
    }

    localStorage.setItem("mountpole_analytics", JSON.stringify(stored));
  }

  private updateConversionFunnel(
    stage: ConversionFunnel["stage"],
    ctaId: string
  ): void {
    const funnelData: ConversionFunnel = {
      stage,
      ctaId,
      timestamp: new Date().toISOString(),
    };

    // Track conversion funnel progression
    const funnel = JSON.parse(
      sessionStorage.getItem("conversion_funnel") || "[]"
    );
    funnel.push(funnelData);
    sessionStorage.setItem("conversion_funnel", JSON.stringify(funnel));
  }

  private setupConversionTracking(): void {
    // Track scroll depth for CTA visibility optimization
    let maxScroll = 0;
    window.addEventListener("scroll", () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) *
          100
      );
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        if (maxScroll % 25 === 0) {
          // Track at 25%, 50%, 75%, 100%
          this.storeAnalyticsLocally({
            eventType: "scroll_depth",
            depth: maxScroll,
            timestamp: new Date().toISOString(),
          });
        }
      }
    });

    // Track time on page for engagement analysis
    const startTime = Date.now();
    window.addEventListener("beforeunload", () => {
      const timeOnPage = Date.now() - startTime;
      this.storeAnalyticsLocally({
        eventType: "time_on_page",
        duration: timeOnPage,
        timestamp: new Date().toISOString(),
      });
    });
  }

  private initializeHeatmapTracking(): void {
    // Track CTA hover events for heatmap generation
    document.addEventListener("mouseover", (event) => {
      const target = event.target as HTMLElement;
      if (target.matches("[data-cta-id]")) {
        const ctaId = target.getAttribute("data-cta-id");
        this.storeAnalyticsLocally({
          eventType: "cta_hover",
          ctaId,
          timestamp: new Date().toISOString(),
        });
      }
    });
  }

  /**
   * Get conversion funnel data for analytics dashboard
   */
  getConversionFunnel(): ConversionFunnel[] {
    return JSON.parse(sessionStorage.getItem("conversion_funnel") || "[]");
  }

  /**
   * Get user's experiment variants for personalization
   */
  getExperimentVariants(): Map<string, string> {
    return this.experiments;
  }

  /**
   * Set user ID for cross-device tracking
   */
  setUserId(userId: string): void {
    this.userId = userId;
    localStorage.setItem("mountpole_user_id", userId);
  }
}

// Singleton instance for global access
export const ctaTracker = new CTATracker();

/**
 * Enterprise CTA click handler with comprehensive tracking
 */
export function handleCTAClick(
  ctaId: string,
  ctaText: string,
  ctaType: CTAAnalytics["ctaType"],
  source: string,
  intent?: string,
  campaign?: string
): void {
  ctaTracker.trackCTAClick({
    ctaId,
    ctaText,
    ctaType,
    source,
    intent,
    campaign,
  });
}

/**
 * Partnership-specific CTA tracker with journey mapping
 */
export function handlePartnershipCTA(
  ctaText: string,
  source: string,
  intent: string,
  campaign?: string
): void {
  const ctaId = `partnership_${source}_${intent}`;

  handleCTAClick(ctaId, ctaText, "partnership", source, intent, campaign);
  ctaTracker.trackPartnershipJourney("cta_click", intent, {
    source,
    campaign,
    ctaText,
  });
}

/**
 * A/B test variant for partnership CTAs
 */
export function getPartnershipCTAVariant():
  | "control"
  | "variant_a"
  | "variant_b" {
  return (
    (ctaTracker
      .getExperimentVariants()
      .get("partnership_cta_variant") as any) || "control"
  );
}

/**
 * Dynamic CTA text based on user behavior and experiments
 */
export function getOptimizedCTAText(baseText: string, ctaType: string): string {
  const variant = ctaTracker
    .getExperimentVariants()
    .get(`${ctaType}_cta_variant`);

  const textVariants: Record<string, Record<string, string>> = {
    partnership: {
      control: baseText,
      variant_a: baseText.replace("Partnership", "Business Partnership"),
      variant_b: baseText.replace("Partnership", "Strategic Alliance"),
    },
  };

  return textVariants[ctaType]?.[variant || "control"] || baseText;
}
