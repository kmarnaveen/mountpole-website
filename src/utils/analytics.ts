// Enhanced Analytics & Tracking
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export interface FormAnalytics {
  formType: string;
  action:
    | "submit_attempt"
    | "submit_success"
    | "submit_error"
    | "validation_error"
    | "field_interaction";
  category?: string;
  fieldName?: string;
  errorType?: string;
  conversionValue?: number;
}

export const trackFormAnalytics = (data: FormAnalytics) => {
  const { formType, action, category, fieldName, errorType, conversionValue } =
    data;

  // Google Analytics 4
  if (typeof window !== "undefined" && window.gtag) {
    const eventData: any = {
      event_category: "Form",
      event_label: formType,
      form_type: formType,
      form_action: action,
    };

    if (category) eventData.category = category;
    if (fieldName) eventData.field_name = fieldName;
    if (errorType) eventData.error_type = errorType;
    if (conversionValue) eventData.value = conversionValue;

    window.gtag("event", `form_${action}`, eventData);

    // Track conversions for business forms
    if (
      action === "submit_success" &&
      (formType === "Partnership" || formType.includes("Quote"))
    ) {
      window.gtag("event", "generate_lead", {
        currency: "USD",
        value: conversionValue || 100, // Estimated lead value
        form_type: formType,
      });
    }
  }

  // Console logging for debugging
  console.log("Form Analytics:", {
    timestamp: new Date().toISOString(),
    ...data,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    url: window.location.href,
  });

  // Store in localStorage for potential later sync
  try {
    const analyticsQueue = JSON.parse(
      localStorage.getItem("form_analytics") || "[]"
    );
    analyticsQueue.push({
      timestamp: Date.now(),
      ...data,
    });

    // Keep only last 50 events
    if (analyticsQueue.length > 50) {
      analyticsQueue.splice(0, analyticsQueue.length - 50);
    }

    localStorage.setItem("form_analytics", JSON.stringify(analyticsQueue));
  } catch (error) {
    console.warn("Could not store analytics data:", error);
  }
};

// Conversion rate tracking per CTA
export const trackCTAClick = (
  ctaLocation: string,
  ctaText: string,
  targetForm: string
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "CTA",
      event_label: ctaText,
      cta_location: ctaLocation,
      target_form: targetForm,
    });
  }

  console.log("CTA Click:", { ctaLocation, ctaText, targetForm });
};

// Form abandonment tracking
export const trackFormAbandonment = (
  formType: string,
  completedFields: string[],
  totalFields: number
) => {
  const completionRate = (completedFields.length / totalFields) * 100;

  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_abandonment", {
      event_category: "Form",
      event_label: formType,
      completion_rate: Math.round(completionRate),
      completed_fields: completedFields.length,
      total_fields: totalFields,
    });
  }

  console.log("Form Abandonment:", {
    formType,
    completionRate,
    completedFields,
  });
};

// Middleware integration helper
export const sendToMiddleware = async (formData: any, formType: string) => {
  // This can be expanded to send to Zapier, Make.com, or custom webhooks
  const webhookUrls = {
    Partnership: process.env.NEXT_PUBLIC_PARTNERSHIP_WEBHOOK,
    Quote: process.env.NEXT_PUBLIC_QUOTE_WEBHOOK,
    Newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK,
  };

  const webhookUrl = webhookUrls[formType as keyof typeof webhookUrls];

  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          source: "mountpole_website",
          timestamp: new Date().toISOString(),
        }),
      });

      console.log(`Data sent to ${formType} middleware`);
    } catch (error) {
      console.error(`Middleware send failed for ${formType}:`, error);
    }
  }
};

// Performance monitoring
export const trackFormPerformance = (
  formType: string,
  loadTime: number,
  renderTime: number
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "form_performance", {
      event_category: "Performance",
      event_label: formType,
      load_time: Math.round(loadTime),
      render_time: Math.round(renderTime),
    });
  }
};

// Attribution tracking enhancement
export const getEnhancedAttribution = () => {
  const urlParams = new URLSearchParams(window.location.search);

  return {
    utm_source: urlParams.get("utm_source"),
    utm_medium: urlParams.get("utm_medium"),
    utm_campaign: urlParams.get("utm_campaign"),
    utm_term: urlParams.get("utm_term"),
    utm_content: urlParams.get("utm_content"),
    gclid: urlParams.get("gclid"), // Google Ads
    fbclid: urlParams.get("fbclid"), // Facebook Ads
    referrer: document.referrer,
    landing_page: window.location.href,
    session_start:
      sessionStorage.getItem("session_start") || new Date().toISOString(),
  };
};
