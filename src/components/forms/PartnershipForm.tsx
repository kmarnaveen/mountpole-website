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
import { Building2, User, Mail, Phone, Globe, MessageSquare, Send } from "lucide-react";

interface PartnershipFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PartnershipForm({ onSuccess, onCancel }: PartnershipFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactPersonName: "",
    workEmail: "",
    phoneNumber: "",
    countryRegion: "",
    businessType: "",
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
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzPartnership_kmarnaveen97_gmail_com_endpoint/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            formType: "Partnership",
            timestamp: new Date().toISOString(),
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
        message: "",
      });

      alert(
        "Thank you for your partnership inquiry! Our business development team will contact you within 24 hours to discuss opportunities and next steps."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting partnership form:", error);
      alert(
        "Sorry, there was an error sending your partnership inquiry. Please try again or contact us directly."
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
          Join our global network of technology distributors and retailers. Let's discuss how we can grow together.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Name */}
        <div className="space-y-2">
          <label htmlFor="businessName" className="flex items-center text-sm font-medium text-gray-800">
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
            placeholder="Enter your business/company name"
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

        {/* Country/Region */}
        <div className="space-y-2">
          <label htmlFor="countryRegion" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-cyan-600 rounded flex items-center justify-center mr-3">
              <Globe className="h-3 w-3 text-white" />
            </div>
            Country / Region
          </label>
          <Input
            type="text"
            id="countryRegion"
            name="countryRegion"
            value={formData.countryRegion}
            onChange={handleInputChange}
            placeholder="e.g., United States, Canada, Mexico"
            className="w-full"
          />
        </div>

        {/* Business Type */}
        <div className="space-y-2">
          <label htmlFor="businessType" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center mr-3">
              <Building2 className="h-3 w-3 text-white" />
            </div>
            Business Type
          </label>
          <Select onValueChange={(value) => handleSelectChange("businessType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retailer">Retailer</SelectItem>
              <SelectItem value="distributor">Distributor</SelectItem>
              <SelectItem value="corporate-buyer">Corporate Buyer</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-pink-600 rounded flex items-center justify-center mr-3">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            Message
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your business, target markets, and partnership goals..."
            rows={4}
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
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Send Partnership Inquiry
              </>
            )}
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Response within 24 hours • Global distribution opportunities • Authorized partnerships
          </p>
        </div>
      </form>
    </div>
  );
}
