"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, User, Mail, Phone, FileText, Package, Send } from "lucide-react";

interface QuoteFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function QuoteForm({ onSuccess, onCancel }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPersonName: "",
    workEmail: "",
    phoneNumber: "",
    productList: "",
    quantityNeeded: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzQuote_kmarnaveen97_gmail_com_endpoint/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            formType: "Generic Quote",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      // Reset form
      setFormData({
        companyName: "",
        contactPersonName: "",
        workEmail: "",
        phoneNumber: "",
        productList: "",
        quantityNeeded: "",
      });

      alert(
        "Thank you for your quote request! Our sales team will provide competitive wholesale pricing within 24 hours."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting quote form:", error);
      alert(
        "Sorry, there was an error sending your quote request. Please try again or contact us directly."
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
          Request Quote
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Get competitive wholesale pricing for your technology needs. Our team will respond with detailed quotes within 24 hours.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="companyName" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center mr-3">
              <Building2 className="h-3 w-3 text-white" />
            </div>
            Company Name
          </label>
          <Input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            placeholder="Enter your company name"
            className="w-full"
          />
        </div>

        {/* Contact Person Name */}
        <div className="space-y-2">
          <label htmlFor="contactPersonName" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-3">
              <User className="h-3 w-3 text-white" />
            </div>
            Contact Person Name
          </label>
          <Input
            type="text"
            id="contactPersonName"
            name="contactPersonName"
            value={formData.contactPersonName}
            onChange={handleInputChange}
            placeholder="Your full name"
            className="w-full"
          />
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
            className="w-full"
          />
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
            placeholder="+1 (555) 123-4567"
            className="w-full"
          />
        </div>

        {/* Product List */}
        <div className="space-y-2">
          <label htmlFor="productList" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-cyan-600 rounded flex items-center justify-center mr-3">
              <Package className="h-3 w-3 text-white" />
            </div>
            Product List
          </label>
          <Textarea
            id="productList"
            name="productList"
            value={formData.productList}
            onChange={handleInputChange}
            placeholder="List the products you're interested in (e.g., iPhone 15 Pro, Samsung Galaxy S24, iPad Air...)"
            rows={4}
            className="w-full"
          />
        </div>

        {/* Quantity Needed */}
        <div className="space-y-2">
          <label htmlFor="quantityNeeded" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center mr-3">
              <FileText className="h-3 w-3 text-white" />
            </div>
            Quantity Needed
          </label>
          <Input
            type="text"
            id="quantityNeeded"
            name="quantityNeeded"
            value={formData.quantityNeeded}
            onChange={handleInputChange}
            placeholder="e.g., 50 units, 100-500 pieces, bulk orders"
            className="w-full"
          />
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
            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Sending...
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
            Competitive wholesale pricing • Volume discounts available • Response within 24 hours
          </p>
        </div>
      </form>
    </div>
  );
}
