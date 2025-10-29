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
  FileText,
  Package,
  Send,
  AlertCircle,
  Globe,
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

interface QuoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  quoteType?: string;
  productContext?: string;
}

export default function QuoteFormGlass({
  onSuccess,
  onCancel,
  quoteType = "general",
  productContext = "",
}: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    workEmail: "",
    phoneNumber: "",
    attribution: "",
    productDetails: {
      items: "",
      quantities: "",
      specifications: "",
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("productDetails.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        productDetails: {
          ...prev.productDetails,
          [field]: value,
        },
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

    const companyValidation = validateCompanyName(formData.companyName);
    if (!companyValidation.isValid)
      newErrors.companyName = companyValidation.error!;

    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
    }

    const emailValidation = validateEmail(formData.workEmail);
    if (!emailValidation.isValid) newErrors.workEmail = emailValidation.error!;

    const phoneValidation = validatePhone(formData.phoneNumber);
    if (!phoneValidation.isValid)
      newErrors.phoneNumber = phoneValidation.error!;

    if (!formData.productDetails.items.trim()) {
      newErrors.productItems = "Product list is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      trackFormEvent("Quote", "validation_error");
      return;
    }

    setIsSubmitting(true);
    trackFormEvent("Quote", "submit_attempt");

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyTqO6ngsDYL0-hcN-Z0hAZUxeuCKYXYb2WNxXgLnpsS2r56r-Vxg1f8Y0jk7KSyGdk/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            phoneNumber: phoneValidation.formatted || formData.phoneNumber,
            formType: "Generic Quote Request",
            quoteType: quoteType,
            productContext: productContext,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer,
          }),
        }
      );

      // Reset form
      setFormData({
        companyName: "",
        contactPersonName: "",
        workEmail: "",
        phoneNumber: "",
        attribution: "",
        productDetails: {
          items: "",
          quantities: "",
          specifications: "",
        },
      });
      setErrors({});

      trackFormEvent("Quote", "submit_success");
      alert(
        "Thank you for your quote request! Our sales team will analyze your requirements and provide competitive wholesale pricing within 24 hours."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting quote form:", error);
      trackFormEvent("Quote", "submit_error");
      alert(
        "Sorry, there was an error submitting your quote request. Please try again or contact us directly at quotes@mountpole.com"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GlassmorphismBackground variant="default">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Glassmorphism Header */}
          <div className="text-center mb-8 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400/80 to-blue-600/80 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-white/30">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Request Wholesale Quote
            </h2>
            <p className="text-white/80 leading-relaxed">
              Get competitive pricing for bulk orders. Our sales team will
              provide detailed quotes with volume discounts and shipping
              options.
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
                  Company Name *
                </label>
                <GlassInput
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
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

              {/* Product Details - Structured Format */}
              <div className="backdrop-blur-lg bg-white/5 border border-white/20 rounded-2xl p-6 space-y-4">
                <h3 className="font-medium text-white/90 flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Product Requirements
                </h3>

                {/* Product Items */}
                <div className="space-y-3">
                  <label
                    htmlFor="productDetails.items"
                    className="text-sm font-medium text-white/80"
                  >
                    Product List *
                  </label>
                  <GlassTextarea
                    id="productDetails.items"
                    name="productDetails.items"
                    value={formData.productDetails.items}
                    onChange={handleInputChange}
                    required
                    placeholder="List specific products you need:&#10;• iPhone 15 Pro 128GB&#10;• Samsung Galaxy S24 256GB&#10;• iPad Air 5th Gen 64GB"
                    rows={4}
                    error={!!errors.productItems}
                  />
                  {errors.productItems && (
                    <div className="flex items-center text-red-300 text-xs bg-red-500/20 border border-red-400/30 rounded-lg p-2 backdrop-blur-sm">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      {errors.productItems}
                    </div>
                  )}
                </div>

                {/* Quantities */}
                <div className="space-y-3">
                  <label
                    htmlFor="productDetails.quantities"
                    className="text-sm font-medium text-white/80"
                  >
                    Quantities & Timeline
                  </label>
                  <GlassTextarea
                    id="productDetails.quantities"
                    name="productDetails.quantities"
                    value={formData.productDetails.quantities}
                    onChange={handleInputChange}
                    placeholder="Specify quantities for each product:&#10;• iPhone 15 Pro: 50 units&#10;• Samsung Galaxy S24: 25 units&#10;• Delivery needed by: March 15, 2025"
                    rows={3}
                  />
                </div>

                {/* Specifications */}
                <div className="space-y-3">
                  <label
                    htmlFor="productDetails.specifications"
                    className="text-sm font-medium text-white/80"
                  >
                    Special Requirements
                  </label>
                  <GlassTextarea
                    id="productDetails.specifications"
                    name="productDetails.specifications"
                    value={formData.productDetails.specifications}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements:&#10;• Color preferences&#10;• Storage variants&#10;• Warranty requirements&#10;• Shipping destination"
                    rows={3}
                  />
                </div>
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
                      Request Quote
                    </>
                  )}
                </GlassButton>
              </div>

              {/* Footer Note */}
              <div className="text-center pt-4">
                <p className="text-xs text-white/60 leading-relaxed">
                  Wholesale pricing • Volume discounts available • Response
                  within 24 hours • Free shipping estimates
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </GlassmorphismBackground>
  );
}
