"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageSquare, Send, Smartphone } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

interface MobileContactFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function MobileContactForm({
  onSuccess,
  onCancel,
}: MobileContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbyJ7K8L9M0N1O2P3Q4R5S6T7U8V9W0X1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            formType: "Mobile Contact",
            timestamp: new Date().toISOString(),
          }),
        }
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      alert(
        "Thank you for reaching out! We'll get back to you within 2 business hours."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting mobile contact form:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again or call us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Smartphone className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Quick Contact</h2>
        <p className="text-gray-600 text-sm">Get fast response from our team</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-800">
            Name *
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your full name"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-800">
            Email *
          </label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
            className="w-full"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-gray-800">
            Phone
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="+1 (555) 000-0000"
            className="w-full"
          />
        </div>

        {/* Subject */}
        <div className="space-y-1">
          <label
            htmlFor="subject"
            className="text-sm font-medium text-gray-800"
          >
            Subject
          </label>
          <Input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="What can we help you with?"
            className="w-full"
          />
        </div>

        {/* Message */}
        <div className="space-y-1">
          <label
            htmlFor="message"
            className="text-sm font-medium text-gray-800"
          >
            Message *
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
            placeholder="Tell us more about your inquiry..."
            rows={3}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex flex-col gap-3 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90"
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
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="w-full"
            >
              Cancel
            </Button>
          )}
        </div>

        {/* Quick Actions */}
        <div className="border-t pt-4 mt-6">
          <p className="text-xs text-gray-500 text-center mb-3">
            Need immediate assistance?
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => window.open("tel:+1234567890")}
            >
              <Phone className="h-3 w-3 mr-1" />
              Call
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => window.open("mailto:hello@mountpole.com")}
            >
              <Mail className="h-3 w-3 mr-1" />
              Email
            </Button>
            <WhatsAppButton
              variant="mobile-dock"
              className="flex-1"
              message="Hi! I need help with wholesale products. Can you assist me?"
            />
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center pt-2">
          <p className="text-xs text-gray-500">
            Response time: Within 2 hours • Available 24/7
          </p>
        </div>
      </form>
    </div>
  );
}
