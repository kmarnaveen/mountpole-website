"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MessageSquare,
  Send,
  AlertCircle,
} from "lucide-react";
import {
  validateEmail,
  validatePhone,
  validateCompanyName,
  validateMessage,
  HoneypotField,
  attributionOptions,
  trackFormEvent,
} from "@/utils/formValidation";
import {
  GlassmorphismBackground,
  GlassInput,
  GlassTextarea,
  GlassButton,
} from "@/components/ui/glassmorphism";

interface PartnershipFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  partnershipType?: string;
  stage?: string;
}

export default function PartnershipFormGlass({
  onSuccess,
  onCancel,
  partnershipType = "reseller",
  stage = "inquiry",
}: PartnershipFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    contactPersonName: "",
    workEmail: "",
    phoneNumber: "",
    countryRegion: "",
    businessType: "",
    attribution: "",
    message: "",
  });

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

    // Real-time validation for key fields
    if (name === "workEmail" && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: emailValidation.error!,
        }));
      }
    }

    if (name === "phoneNumber" && value) {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors((prev) => ({
          ...prev,
          [name]: phoneValidation.error!,
        }));
      }
    }
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

    const companyValidation = validateCompanyName(formData.businessName);
    if (!companyValidation.isValid)
      newErrors.businessName = companyValidation.error!;

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
    }

    const emailValidation = validateEmail(formData.workEmail);
    if (!emailValidation.isValid) newErrors.workEmail = emailValidation.error!;

    const phoneValidation = validatePhone(formData.phoneNumber);
    if (!phoneValidation.isValid)
      newErrors.phoneNumber = phoneValidation.error!;

    const messageValidation = validateMessage(formData.message, 20);
    if (!messageValidation.isValid)
      newErrors.message = messageValidation.error!;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackFormEvent("Partnership", "validation_error");
      return;
    }

    setIsSubmitting(true);
    trackFormEvent("Partnership", "submit_attempt");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxF2G3H4I5J6K7L8M9N0O1P2Q3R4S5T6U7V8W9X0Y1Z2A3B4C5D6E7F8G9H0I1J2K3L4M5N6/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phoneNumber: phoneValidation.formatted || formData.phoneNumber,
            formType: "Partnership Inquiry",
            partnershipType: partnershipType,
            applicationStage: stage,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        }
      );

      // Reset form
      setFormData({
        businessName: "",
        contactPersonName: "",
        workEmail: "",
        phoneNumber: "",
        countryRegion: "",
        businessType: "",
        attribution: "",
        message: "",
      });
      setErrors({});

      trackFormEvent("Partnership", "submit_success");
      alert(
        "Thank you for your partnership inquiry! Our business development team will review your application and respond within 24 hours with next steps."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting partnership form:", error);
      trackFormEvent("Partnership", "submit_error");
      alert(
        "Sorry, there was an error submitting your partnership inquiry. Please try again or contact us directly at partnerships@mountpole.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassmorphismBackground variant="gradient">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Glassmorphism Header */}
          <div className="text-center mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400/80 to-purple-600/80 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Partnership Inquiry
            </h2>
            <p className="text-white/80 leading-relaxed">
              Join our global network of authorized partners and unlock
              exclusive wholesale pricing, dedicated support, and co-marketing
              opportunities.
            </p>
          </div>

          {/* Glassmorphism Form Container */}
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <HoneypotField value={honeypot} onChange={setHoneypot} />

              {/* Business Name */}
              <div className="space-y-3">
                <label
                  htmlFor="businessName"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-blue-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Building2 className="h-3 w-3 text-white" />
                  </div>
                  Business Name *
                </label>
                <GlassInput
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your company/business name"
                  error={!!errors.businessName}
                />
                {errors.businessName && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.businessName}
                  </div>
                )}
              </div>

              {/* Contact Person */}
              <div className="space-y-3">
                <label
                  htmlFor="contactPersonName"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-green-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <User className="h-3 w-3 text-white" />
                  </div>
                  Contact Person *
                </label>
                <GlassInput
                  type="text"
                  id="contactPersonName"
                  name="contactPersonName"
                  value={formData.contactPersonName}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  error={!!errors.contactPersonName}
                />
                {errors.contactPersonName && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.contactPersonName}
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

              {/* Phone Number */}
              <div className="space-y-3">
                <label
                  htmlFor="phoneNumber"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-orange-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Phone className="h-3 w-3 text-white" />
                  </div>
                  Phone Number
                </label>
                <GlassInput
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  error={!!errors.phoneNumber}
                />
                {errors.phoneNumber && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.phoneNumber}
                  </div>
                )}
                <p className="text-xs text-white/60">
                  Include country code for international numbers
                </p>
              </div>

              {/* Country/Region */}
              <div className="space-y-3">
                <label
                  htmlFor="countryRegion"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-cyan-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Globe className="h-3 w-3 text-white" />
                  </div>
                  Country/Region
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("countryRegion", value)
                  }
                >
                  <SelectTrigger className="w-full backdrop-blur-md bg-white/20 border border-white/30 text-white">
                    <SelectValue placeholder="Select your country/region" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-black/80 border border-white/20">
                    <SelectItem value="united-states">United States</SelectItem>
                    <SelectItem value="canada">Canada</SelectItem>
                    <SelectItem value="united-kingdom">
                      United Kingdom
                    </SelectItem>
                    <SelectItem value="australia">Australia</SelectItem>
                    <SelectItem value="germany">Germany</SelectItem>
                    <SelectItem value="france">France</SelectItem>
                    <SelectItem value="india">India</SelectItem>
                    <SelectItem value="china">China</SelectItem>
                    <SelectItem value="japan">Japan</SelectItem>
                    <SelectItem value="south-korea">South Korea</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                    <SelectItem value="uae">United Arab Emirates</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Business Type */}
              <div className="space-y-3">
                <label
                  htmlFor="businessType"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-pink-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Building2 className="h-3 w-3 text-white" />
                  </div>
                  Business Type
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("businessType", value)
                  }
                >
                  <SelectTrigger className="w-full backdrop-blur-md bg-white/20 border border-white/30 text-white">
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-black/80 border border-white/20">
                    <SelectItem value="retailer">Retailer</SelectItem>
                    <SelectItem value="distributor">Distributor</SelectItem>
                    <SelectItem value="reseller">Reseller</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                    <SelectItem value="system-integrator">
                      System Integrator
                    </SelectItem>
                    <SelectItem value="corporate">Corporate Buyer</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* How did you hear about us */}
              <div className="space-y-3">
                <label
                  htmlFor="attribution"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-indigo-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <Globe className="h-3 w-3 text-white" />
                  </div>
                  How did you hear about us?
                </label>
                <Select
                  onValueChange={(value) =>
                    handleSelectChange("attribution", value)
                  }
                >
                  <SelectTrigger className="w-full backdrop-blur-md bg-white/20 border border-white/30 text-white">
                    <SelectValue placeholder="Select how you found us" />
                  </SelectTrigger>
                  <SelectContent className="backdrop-blur-xl bg-black/80 border border-white/20">
                    {attributionOptions.map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toLowerCase().replace(/\s+/g, "-")}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Partnership Details */}
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="flex items-center text-sm font-medium text-white/90"
                >
                  <div className="w-6 h-6 bg-red-500/70 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm border border-white/20">
                    <MessageSquare className="h-3 w-3 text-white" />
                  </div>
                  Partnership Details *
                </label>
                <GlassTextarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Tell us about your business, target market, expected volumes, and how you'd like to partner with Mountpole..."
                  rows={4}
                  error={!!errors.message}
                />
                {errors.message && (
                  <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.message}
                  </div>
                )}
                <p className="text-xs text-white/60 mt-1">
                  Include your business model, target markets, expected volumes,
                  and partnership goals. Minimum 20 characters.
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
                  variant="primary"
                  className="flex-1 min-h-[48px]"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Partnership Inquiry
                    </>
                  )}
                </GlassButton>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-white/60 leading-relaxed">
                  We review all partnership applications within 24 hours. You'll
                  receive a response from our business development team with
                  next steps and requirements.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GlassmorphismBackground>
  );
}
