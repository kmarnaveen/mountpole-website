"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MessageSquare,
  Send,
  Building2,
  AlertCircle,
  Clock,
} from "lucide-react";
import {
  validateEmail,
  validatePhone,
  validateCompanyName,
  validateMessage,
  formatPhone,
  HoneypotField,
  trackFormEvent,
} from "@/utils/formValidation";
import {
  GlassmorphismBackground,
  GlassInput,
  GlassTextarea,
  GlassButton,
} from "@/components/ui/glassmorphism";

interface MobileContactFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  variant?: "full" | "compact";
}

export default function MobileContactFormGlass({
  onSuccess,
  onCancel,
  variant = "full",
}: MobileContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Format phone number
    if (name === "phone") {
      const formatted = formatPhone(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formatted,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Real-time validation
    if (name === "email" && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: emailValidation.error!,
        }));
      }
    }

    if (name === "phone" && value) {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: phoneValidation.error!,
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

    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) newErrors.email = emailValidation.error!;

    if (formData.phone) {
      const phoneValidation = validatePhone(formData.phone);
      if (!phoneValidation.isValid) newErrors.phone = phoneValidation.error!;
    }

    if (formData.message) {
      const messageValidation = validateMessage(formData.message);
      if (!messageValidation.isValid)
        newErrors.message = messageValidation.error!;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackFormEvent("Mobile Contact", "validation_error", variant);
      return;
    }

    setIsSubmitting(true);
    trackFormEvent("Mobile Contact", "submit_attempt", variant);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0E1F2G3/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            formType: "Mobile Contact",
            variant: variant,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        }
      );

      // Reset form
      setFormData({
        companyName: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});

      trackFormEvent("Mobile Contact", "submit_success", variant);
      alert(
        "Thank you for contacting Mountpole! Our mobile-optimized team will respond within 2 hours during business hours."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting mobile contact form:", error);
      trackFormEvent("Mobile Contact", "submit_error", variant);
      alert(
        "Sorry, there was an error sending your message. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "compact") {
    return (
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-4 shadow-xl max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="space-y-4">
          <HoneypotField value={honeypot} onChange={setHoneypot} />

          <div className="text-center mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400/80 to-cyan-500/80 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-md border border-white/30">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white">Quick Contact</h3>
            <p className="text-white/70 text-sm">Mobile-optimized support</p>
          </div>

          <div className="space-y-3">
            <GlassInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Email"
              error={!!errors.email}
            />
            {errors.email && (
              <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.email}
              </div>
            )}

            <GlassInput
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone (optional)"
              error={!!errors.phone}
            />
            {errors.phone && (
              <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.phone}
              </div>
            )}

            <GlassTextarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="How can we help?"
              rows={3}
            />
          </div>

          <div className="flex gap-2">
            {onCancel && (
              <GlassButton
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1 text-sm"
              >
                Cancel
              </GlassButton>
            )}
            <GlassButton
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-400/80 to-cyan-500/80 border border-white/30 text-sm"
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Send className="h-3 w-3 mr-1" />
                  Send
                </>
              )}
            </GlassButton>
          </div>
        </form>
      </div>
    );
  }

  return (
    <GlassmorphismBackground variant="dark">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Mobile-Optimized Header */}
          <div className="text-center mb-6 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-400/80 to-cyan-500/80 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
              <Phone className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Mobile Contact
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Optimized for mobile users - Quick response guaranteed
            </p>
            <div className="flex items-center justify-center mt-3 text-green-300">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-xs">Response within 2 hours</span>
            </div>
          </div>

          {/* Mobile Contact Form */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-6 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <HoneypotField value={honeypot} onChange={setHoneypot} />

              {/* Company Name */}
              <div className="space-y-2">
                <label
                  htmlFor="companyName"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-5 h-5 bg-purple-500/70 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm border border-white/20">
                    <Building2 className="h-3 w-3 text-white" />
                  </div>
                  Company
                </label>
                <GlassInput
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  placeholder="Your company name"
                  error={!!errors.companyName}
                />
                {errors.companyName && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.companyName}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-5 h-5 bg-blue-500/70 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm border border-white/20">
                    <Mail className="h-3 w-3 text-white" />
                  </div>
                  Email *
                </label>
                <GlassInput
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
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

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-5 h-5 bg-green-500/70 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm border border-white/20">
                    <Phone className="h-3 w-3 text-white" />
                  </div>
                  Phone
                </label>
                <GlassInput
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(555) 123-4567"
                  error={!!errors.phone}
                />
                {errors.phone && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-5 h-5 bg-orange-500/70 rounded-lg flex items-center justify-center mr-2 backdrop-blur-sm border border-white/20">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                  Message
                </label>
                <GlassTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you today? Mention any specific tech products or services you're interested in."
                  rows={4}
                />
                {errors.message && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.message}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex flex-col gap-3 pt-4">
                <GlassButton
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-400/80 to-cyan-500/80 border border-white/30 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </GlassButton>

                {onCancel && (
                  <GlassButton
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="w-full"
                  >
                    Cancel
                  </GlassButton>
                )}
              </div>

              {/* Mobile Footer */}
              <div className="text-center pt-4 space-y-2">
                <p className="text-xs text-white/60">
                  Mobile-optimized • Fast response • Secure messaging
                </p>
                <div className="flex items-center justify-center text-green-300">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="text-xs">
                    Business hours: 9 AM - 6 PM EST
                  </span>
                </div>
              </div>
            </form>
          </div>

          {/* Quick Actions for Mobile */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a
              href="tel:+1234567890"
              className="backdrop-blur-xl bg-green-500/20 border border-green-400/30 rounded-2xl p-4 text-center shadow-xl hover:bg-green-500/30 transition-all"
            >
              <Phone className="h-6 w-6 text-green-300 mx-auto mb-1" />
              <span className="text-green-300 text-sm font-medium">
                Call Now
              </span>
            </a>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="backdrop-blur-xl bg-emerald-500/20 border border-emerald-400/30 rounded-2xl p-4 text-center shadow-xl hover:bg-emerald-500/30 transition-all"
            >
              <MessageSquare className="h-6 w-6 text-emerald-300 mx-auto mb-1" />
              <span className="text-emerald-300 text-sm font-medium">
                WhatsApp
              </span>
            </a>
          </div>
        </div>
      </div>
    </GlassmorphismBackground>
  );
}
