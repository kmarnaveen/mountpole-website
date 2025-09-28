"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
} from "lucide-react";

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
    color: "from-blue-600 to-cyan-600",
    examples: "iPhone 15 Pro, Samsung Galaxy S24, Google Pixel 8, Xiaomi 14...",
  },
  tablets: {
    title: "Tablet Quote Request",
    description:
      "Request pricing for iPads, Galaxy Tabs and other tablet devices.",
    icon: Tablet,
    color: "from-green-600 to-emerald-600",
    examples: "iPad Pro, iPad Air, Samsung Galaxy Tab S9, Surface Pro...",
  },
  wearables: {
    title: "Wearable Quote Request",
    description:
      "Get quotes for smartwatches, fitness trackers and wearable tech.",
    icon: Watch,
    color: "from-purple-600 to-pink-600",
    examples: "Apple Watch Series 9, Samsung Galaxy Watch, Fitbit, Garmin...",
  },
  gaming: {
    title: "Gaming Quote Request",
    description: "Gaming gear, accessories and gaming smartphones.",
    icon: GamepadIcon,
    color: "from-orange-600 to-red-600",
    examples:
      "Gaming controllers, mechanical keyboards, gaming mice, gaming phones...",
  },
  audio: {
    title: "Audio Equipment Quote",
    description: "Headphones, earbuds, speakers and audio accessories.",
    icon: HeadphonesIcon,
    color: "from-indigo-600 to-purple-600",
    examples: "AirPods Pro, Sony WH-1000XM5, JBL speakers, Bose headphones...",
  },
};

export default function CategoryQuoteForm({ category, onSuccess, onCancel }: CategoryQuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

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
            formType: "Category Quote",
            category: category,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      // Reset form
      setFormData({
        companyName: "",
        workEmail: "",
        message: "",
      });

      alert(
        `Thank you for your ${category} quote request! Our specialized sales team will provide competitive pricing within 24 hours.`
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting category quote form:", error);
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
        <div className={`w-16 h-16 bg-gradient-to-br ${config.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {config.title}
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {config.description}
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

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="flex items-center text-sm font-medium text-gray-800">
            <div className="w-6 h-6 bg-green-600 rounded flex items-center justify-center mr-3">
              <MessageSquare className="h-3 w-3 text-white" />
            </div>
            Product Details & Quantities
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={`Please specify the ${category} you need and quantities. For example: ${config.examples}`}
            rows={4}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include specific models, quantities, and any special requirements.
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
            className={`flex-1 bg-gradient-to-r ${config.color} hover:opacity-90`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Get {category.charAt(0).toUpperCase() + category.slice(1)} Quote
              </>
            )}
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-4">
          <p className="text-xs text-gray-500 leading-relaxed">
            Category: {category} • Wholesale pricing • Volume discounts available • Response within 24 hours
          </p>
        </div>
      </form>
    </div>
  );
}
