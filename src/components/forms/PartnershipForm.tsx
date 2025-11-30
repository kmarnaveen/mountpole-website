"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  trackFormEvent,
  HoneypotField,
  attributionOptions,
} from "@/utils/formValidation";

interface PartnershipFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PartnershipForm({
  onSuccess,
  onCancel,
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
      if (!emailValidation.isValid)
        newErrors.workEmail = emailValidation.error!;

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
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phoneNumber: phoneValidation.formatted || formData.phoneNumber,
            formType: "Partnership Inquiry",
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Partnership Inquiry
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Join our global network of authorized partners and unlock exclusive
            wholesale pricing, dedicated support, and co-marketing
            opportunities.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <HoneypotField value={honeypot} onChange={setHoneypot} />

          {/* Business Name */}
          <div className="space-y-2">
            <label
              htmlFor="businessName"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
                <Building2 className="h-3 w-3 text-white" />
              </div>
              Business Name *
            </label>
            <Input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              required
              placeholder="Enter your company/business name"
              className={`w-full ${
                errors.businessName ? "border-red-500" : ""
              }`}
            />
            {errors.businessName && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.businessName}
              </div>
            )}
          </div>

          {/* Contact Person */}
          <div className="space-y-2">
            <label
              htmlFor="contactPersonName"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-3">
                <User className="h-3 w-3 text-white" />
              </div>
              Contact Person *
            </label>
            <Input
              type="text"
              id="contactPersonName"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleInputChange}
              required
              placeholder="Your full name"
              className={`w-full ${
                errors.contactPersonName ? "border-red-500" : ""
              }`}
            />
            {errors.contactPersonName && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.contactPersonName}
              </div>
            )}
          </div>

          {/* Work Email */}
          <div className="space-y-2">
            <label
              htmlFor="workEmail"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center mr-3">
                <Mail className="h-3 w-3 text-white" />
              </div>
              Work Email *
            </label>
            <Input
              type="email"
              id="workEmail"
              name="workEmail"
              value={formData.workEmail}
              onChange={handleInputChange}
              required
              placeholder="your.email@company.com"
              className={`w-full ${errors.workEmail ? "border-red-500" : ""}`}
            />
            {errors.workEmail && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.workEmail}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-orange-600 rounded flex items-center justify-center mr-3">
                <Phone className="h-3 w-3 text-white" />
              </div>
              Phone Number
            </label>
            <Input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1 (555) 000-0000"
              className={`w-full ${errors.phoneNumber ? "border-red-500" : ""}`}
            />
            {errors.phoneNumber && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.phoneNumber}
              </div>
            )}
            <p className="text-xs text-gray-500">
              Include country code for international numbers
            </p>
          </div>

          {/* Country/Region */}
          <div className="space-y-2">
            <label
              htmlFor="countryRegion"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-cyan-600 rounded flex items-center justify-center mr-3">
                <Globe className="h-3 w-3 text-white" />
              </div>
              Country/Region
            </label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("countryRegion", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your country/region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="united-states">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="united-kingdom">United Kingdom</SelectItem>
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
          <div className="space-y-2">
            <label
              htmlFor="businessType"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-pink-600 rounded flex items-center justify-center mr-3">
                <Building2 className="h-3 w-3 text-white" />
              </div>
              Business Type
            </label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("businessType", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your business type" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="space-y-2">
            <label
              htmlFor="attribution"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center mr-3">
                <Globe className="h-3 w-3 text-white" />
              </div>
              How did you hear about us?
            </label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("attribution", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select how you found us" />
              </SelectTrigger>
              <SelectContent>
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
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="flex items-center text-sm font-medium text-gray-800"
            >
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center mr-3">
                <MessageSquare className="h-3 w-3 text-white" />
              </div>
              Partnership Details *
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Tell us about your business, target market, expected volumes, and how you'd like to partner with Mountpole..."
              rows={4}
              className={`w-full ${errors.message ? "border-red-500" : ""}`}
            />
            {errors.message && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.message}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Include your business model, target markets, expected volumes, and
              partnership goals. Minimum 20 characters.
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 min-h-[44px]"
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
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center pt-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              We review all partnership applications within 24 hours.
              You&apos;ll receive a response from our business development team
              with next steps and requirements.
            </p>
          </div>
        </form>
      </div>
    );
}
