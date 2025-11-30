"use client";

import { useState } from "react";
import {
  Mail,
  Send,
  Gift,
  TrendingUp,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  validateEmail,
  HoneypotField,
  trackFormEvent,
} from "@/utils/formValidation";
import {
  GlassmorphismBackground,
  GlassInput,
  GlassButton,
} from "@/components/ui/glassmorphism";

interface NewsletterFormProps {
  onSuccess?: () => void;
  variant?: "default" | "compact" | "landing";
  showBenefits?: boolean;
}

export default function NewsletterFormGlass({
  onSuccess,
  variant = "default",
  showBenefits = true,
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [email, setEmail] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);

    // Clear error when user starts typing
    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }

    // Real-time validation
    if (value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({
          ...prev,
          email: emailValidation.error!,
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot
    if (honeypot) {
      console.log("Bot detected");
      return;
    }

    // Validate email
    const emailValidation = validateEmail(email);
    if (!emailValidation.isValid) {
      setErrors({ email: emailValidation.error! });
      trackFormEvent("Newsletter", "validation_error", variant);
      return;
    }

    setIsSubmitting(true);
    trackFormEvent("Newsletter", "submit_attempt", variant);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          formType: "Newsletter",
          variant: variant,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Reset form
      setEmail("");
      setErrors({});

      trackFormEvent("Newsletter", "submit_success", variant);
      alert(
        "Welcome to the Mountpole Tech Newsletter! We'll keep you updated with the latest wholesale pricing, new arrivals, and exclusive deals."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error subscribing to newsletter:", error);
      trackFormEvent("Newsletter", "submit_error", variant);
      alert(
        "Sorry, there was an error subscribing you to our newsletter. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "compact") {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <HoneypotField value={honeypot} onChange={setHoneypot} />

          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400/80 to-pink-500/80 rounded-xl flex items-center justify-center mx-auto mb-3 backdrop-blur-md border border-white/30">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Stay Updated
            </h3>
            <p className="text-white/70 text-sm">
              Get exclusive deals and tech updates
            </p>
          </div>

          <div className="space-y-3">
            <GlassInput
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
              error={!!errors.email}
            />
            {errors.email && (
              <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          <GlassButton
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-400/80 to-pink-500/80 border border-white/30"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </>
            )}
          </GlassButton>
        </form>
      </div>
    );
  }

  return (
    <GlassmorphismBackground variant="default">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400/80 to-purple-500/80 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-md border border-white/30">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join Our Newsletter
            </h2>
            <p className="text-xl text-white/80 leading-relaxed">
              Get exclusive access to wholesale pricing, new product launches,
              and industry insights delivered to your inbox.
            </p>
          </div>

          {/* Benefits Section */}
          {showBenefits && (
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400/80 to-emerald-500/80 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Exclusive Deals
                </h3>
                <p className="text-white/70 text-sm">
                  Special pricing and early access to limited quantity deals
                </p>
              </div>

              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400/80 to-cyan-500/80 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Market Insights
                </h3>
                <p className="text-white/70 text-sm">
                  Industry trends, price updates, and market analysis
                </p>
              </div>

              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 text-center shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400/80 to-pink-500/80 rounded-xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  New Arrivals
                </h3>
                <p className="text-white/70 text-sm">
                  Be first to know about latest tech products and releases
                </p>
              </div>
            </div>
          )}

          {/* Newsletter Form */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <HoneypotField value={honeypot} onChange={setHoneypot} />

              <div className="space-y-3">
                <label
                  htmlFor="email"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-blue-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Mail className="h-3 w-3 text-white" />
                  </div>
                  Email Address *
                </label>
                <GlassInput
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@company.com"
                  error={!!errors.email}
                />
                {errors.email && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <GlassButton
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-400/80 to-purple-500/80 border border-white/30 min-h-[56px] text-lg"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-3" />
                    Subscribe to Newsletter
                  </>
                )}
              </GlassButton>

              {/* Privacy Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-white/60 leading-relaxed">
                  We respect your privacy. No spam, unsubscribe at any time.
                  <br />
                  Get weekly updates on pricing, new arrivals, and exclusive
                  deals.
                </p>
              </div>
            </form>
          </div>

          {/* Additional Benefits */}
          <div className="text-center mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
            <p className="text-white/70 text-sm leading-relaxed">
              Join <strong className="text-white">2,500+ tech retailers</strong>{" "}
              who trust Mountpole for wholesale pricing and market insights.
              <br />
              Get your competitive edge with our weekly newsletter.
            </p>
          </div>
        </div>
      </div>
    </GlassmorphismBackground>
  );
}
