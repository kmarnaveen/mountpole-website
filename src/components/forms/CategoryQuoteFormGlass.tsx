"use client";

import { useState } from "react";
import {
  Building2,
  Mail,
  MessageSquare,
  Send,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  GamepadIcon,
  HeadphonesIcon,
  AlertCircle,
} from "lucide-react";
import {
  validateEmail,
  validateCompanyName,
  validateMessage,
  HoneypotField,
  trackFormEvent,
} from "@/utils/formValidation";
import {
  GlassmorphismBackground,
  GlassInput,
  GlassTextarea,
  GlassButton,
} from "@/components/ui/glassmorphism";

interface CategoryQuoteFormProps {
  category: "smartphones" | "tablets" | "wearables" | "gaming" | "audio";
  onSuccess?: () => void;
  onCancel?: () => void;
}

const categoryConfig = {
  smartphones: {
    title: "Mobile Quote Request",
    description:
      "Get wholesale pricing for smartphones from Apple, Samsung, Google, Xiaomi and more.",
    icon: Smartphone,
    color: "from-blue-400/80 to-cyan-500/80",
    examples: "iPhone 15 Pro, Samsung Galaxy S24, Google Pixel 8, Xiaomi 14...",
  },
  tablets: {
    title: "Tablet Quote Request",
    description:
      "Request pricing for iPads, Galaxy Tabs and other tablet devices.",
    icon: Tablet,
    color: "from-green-400/80 to-emerald-500/80",
    examples: "iPad Pro, iPad Air, Samsung Galaxy Tab S9, Surface Pro...",
  },
  wearables: {
    title: "Wearable Quote Request",
    description:
      "Get quotes for smartwatches, fitness trackers and wearable tech.",
    icon: Watch,
    color: "from-purple-400/80 to-pink-500/80",
    examples: "Apple Watch Series 9, Samsung Galaxy Watch, Fitbit, Garmin...",
  },
  gaming: {
    title: "Gaming Quote Request",
    description: "Gaming gear, accessories and gaming smartphones.",
    icon: GamepadIcon,
    color: "from-orange-400/80 to-red-500/80",
    examples:
      "Gaming controllers, mechanical keyboards, gaming mice, gaming phones...",
  },
  audio: {
    title: "Audio Equipment Quote",
    description: "Headphones, earbuds, speakers and audio accessories.",
    icon: HeadphonesIcon,
    color: "from-indigo-400/80 to-purple-500/80",
    examples: "AirPods Pro, Sony WH-1000XM5, JBL speakers, Bose headphones...",
  },
};

export default function CategoryQuoteFormGlass({
  category,
  onSuccess,
  onCancel,
}: CategoryQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    workEmail: "",
    message: "",
  });

  const config = categoryConfig[category];
  const IconComponent = config.icon;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Real-time validation
    if (name === "workEmail" && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: emailValidation.error!,
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

    // Validate all fields
    const newErrors: Record<string, string> = {};

    if (formData.companyName) {
      const companyValidation = validateCompanyName(formData.companyName);
      if (!companyValidation.isValid)
        newErrors.companyName = companyValidation.error!;
    }

    const emailValidation = validateEmail(formData.workEmail);
    if (!emailValidation.isValid) newErrors.workEmail = emailValidation.error!;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackFormEvent("Category Quote", "validation_error", category);
      return;
    }

    setIsSubmitting(true);
    trackFormEvent("Category Quote", "submit_attempt", category);

    try {
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "Category Quote",
          category: category,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Reset form
      setFormData({
        companyName: "",
        workEmail: "",
        message: "",
      });
      setErrors({});

      trackFormEvent("Category Quote", "submit_success", category);
      alert(
        `Thank you for your ${category} quote request! Our specialized sales team will provide competitive pricing within 24 hours.`
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting category quote form:", error);
      trackFormEvent("Category Quote", "submit_error", category);
      alert(
        "Sorry, there was an error sending your quote request. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassmorphismBackground variant="dark">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Glassmorphism Header */}
          <div className="text-center mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div
              className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30`}
            >
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {config.title}
            </h2>
            <p className="text-white/80 leading-relaxed">
              {config.description}
            </p>
          </div>

          {/* Glassmorphism Form Container */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <HoneypotField value={honeypot} onChange={setHoneypot} />

              {/* Company Name */}
              <div className="space-y-3">
                <label
                  htmlFor="companyName"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-blue-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Building2 className="h-3 w-3 text-white" />
                  </div>
                  Company Name
                </label>
                <GlassInput
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                  error={!!errors.companyName}
                />
                {errors.companyName && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.companyName}
                  </div>
                )}
              </div>

              {/* Work Email */}
              <div className="space-y-3">
                <label
                  htmlFor="workEmail"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-purple-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Mail className="h-3 w-3 text-white" />
                  </div>
                  Work Email *
                </label>
                <GlassInput
                  type="email"
                  id="workEmail"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@company.com"
                  error={!!errors.workEmail}
                />
                {errors.workEmail && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.workEmail}
                  </div>
                )}
              </div>

              {/* Product Details & Quantities */}
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-green-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                  Product Details & Quantities
                </label>
                <GlassTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={`Please specify the ${category} you need and quantities. For example: ${config.examples}`}
                  rows={4}
                />
                <p className="text-xs text-white/60 mt-1">
                  Include specific models, quantities, and any special
                  requirements.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                {onCancel && (
                  <GlassButton
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="flex-1"
                  >
                    Cancel
                  </GlassButton>
                )}
                <GlassButton
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90 min-h-[48px] border border-white/30`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Get {category.charAt(0).toUpperCase() +
                        category.slice(1)}{" "}
                      Quote
                    </>
                  )}
                </GlassButton>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-white/60 leading-relaxed">
                  Category: {category} • Wholesale pricing • Volume discounts
                  available • Response within 24 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GlassmorphismBackground>
  );
}
