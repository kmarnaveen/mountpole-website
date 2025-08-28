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
import { Building2, User, Mail, Phone, FileText, Package, Send, AlertCircle, Globe } from "lucide-react";
import { 
  validateEmail, 
  validatePhone, 
  validateCompanyName, 
  validateMessage, 
  HoneypotField,
  attributionOptions,
  trackFormEvent
} from "@/utils/formValidation";

interface QuoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function QuoteForm({ onSuccess, onCancel }: QuoteFormProps) {
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
    
    if (name.startsWith('productDetails.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        productDetails: {
          ...prev.productDetails,
          [field]: value,
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
    
    // Real-time validation
    if (name === 'workEmail' && value) {
      const emailValidation = validateEmail(value);
      if (!emailValidation.isValid && emailValidation.error) {
        setErrors(prev => ({
          ...prev,
          [name]: emailValidation.error!
        }));
      }
    }
    
    if (name === 'phoneNumber' && value) {
      const phoneValidation = validatePhone(value);
      if (!phoneValidation.isValid && phoneValidation.error) {
        setErrors(prev => ({
          ...prev,
          [name]: phoneValidation.error!
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
    if (!companyValidation.isValid) newErrors.companyName = companyValidation.error!;
    
    if (!formData.contactPersonName.trim()) {
      newErrors.contactPersonName = "Contact person name is required";
    }
    
    const emailValidation = validateEmail(formData.workEmail);
    if (!emailValidation.isValid) newErrors.workEmail = emailValidation.error!;
    
    const phoneValidation = validatePhone(formData.phoneNumber);
    if (!phoneValidation.isValid) newErrors.phoneNumber = phoneValidation.error!;
    
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
        "https://script.google.com/macros/s/AKfycbxJ8K9L3mNpP0Q2R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0/exec",
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
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Request Wholesale Quote
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Get competitive pricing for bulk orders. Our sales team will provide detailed quotes with volume discounts and shipping options.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <HoneypotField value={honeypot} onChange={setHoneypot} />
        
        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
              <Building2 className="h-3 w-3 text-white" />
            </div>
            Company Name *
          </label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
            placeholder="Enter your company name"
            className={`w-full ${errors.companyName ? 'border-red-500' : ''}`}
          />
          {errors.companyName && (
            <div className="flex items-center text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.companyName}
            </div>
          )}
        </div>

        {/* Contact Person */}
        <div className="space-y-2">
          <label htmlFor="contactPersonName" className="flex items-center text-sm font-medium text-gray-800">
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
            className={`w-full ${errors.contactPersonName ? 'border-red-500' : ''}`}
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
          <label htmlFor="workEmail" className="flex items-center text-sm font-medium text-gray-800">
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
            className={`w-full ${errors.workEmail ? 'border-red-500' : ''}`}
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
          <label htmlFor="phoneNumber" className="flex items-center text-sm font-medium text-gray-800">
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
            className={`w-full ${errors.phoneNumber ? 'border-red-500' : ''}`}
          />
          {errors.phoneNumber && (
            <div className="flex items-center text-red-600 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {errors.phoneNumber}
            </div>
          )}
        </div>

        {/* How did you hear about us */}
        <div className="space-y-2">
          <label htmlFor="attribution" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center mr-3">
              <Globe className="h-3 w-3 text-white" />
            </div>
            How did you hear about us?
          </label>
          <Select onValueChange={(value) => handleSelectChange("attribution", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select how you found us" />
            </SelectTrigger>
            <SelectContent>
              {attributionOptions.map((option) => (
                <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Product Details - Structured Format */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Product Requirements
          </h3>
          
          {/* Product Items */}
          <div className="space-y-2">
            <label htmlFor="productDetails.items" className="text-sm font-medium text-gray-800">
              Product List *
            </label>
            <Textarea
              id="productDetails.items"
              name="productDetails.items"
              value={formData.productDetails.items}
              onChange={handleInputChange}
              required
              placeholder="List specific products you need:&#10;• iPhone 15 Pro 128GB&#10;• Samsung Galaxy S24 256GB&#10;• iPad Air 5th Gen 64GB"
              rows={4}
              className={`w-full ${errors.productItems ? 'border-red-500' : ''}`}
            />
            {errors.productItems && (
              <div className="flex items-center text-red-600 text-xs">
                <AlertCircle className="h-3 w-3 mr-1" />
                {errors.productItems}
              </div>
            )}
          </div>

          {/* Quantities */}
          <div className="space-y-2">
            <label htmlFor="productDetails.quantities" className="text-sm font-medium text-gray-800">
              Quantities & Timeline
            </label>
            <Textarea
              id="productDetails.quantities"
              name="productDetails.quantities"
              value={formData.productDetails.quantities}
              onChange={handleInputChange}
              placeholder="Specify quantities for each product:&#10;• iPhone 15 Pro: 50 units&#10;• Samsung Galaxy S24: 25 units&#10;• Delivery needed by: March 15, 2025"
              rows={3}
              className="w-full"
            />
          </div>

          {/* Specifications */}
          <div className="space-y-2">
            <label htmlFor="productDetails.specifications" className="text-sm font-medium text-gray-800">
              Special Requirements
            </label>
            <Textarea
              id="productDetails.specifications"
              name="productDetails.specifications"
              value={formData.productDetails.specifications}
              onChange={handleInputChange}
              placeholder="Any specific requirements:&#10;• Color preferences&#10;• Storage variants&#10;• Warranty requirements&#10;• Shipping destination"
              rows={3}
              className="w-full"
            />
          </div>
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
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:opacity-90 min-h-[44px]"
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
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Wholesale pricing • Volume discounts available • Response within 24 hours • Free shipping estimates
          </p>
        </div>
      </form>
    </div>
  );
}
