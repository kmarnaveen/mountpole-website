"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Send, Gift } from "lucide-react";

interface NewsletterFormProps {
  variant?: "footer" | "popup" | "sidebar" | "checkout";
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function NewsletterForm({
  variant = "footer",
  onSuccess,
  onCancel,
}: NewsletterFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [honeypot, setHoneypot] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    subscribeUpdates: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      const response = await fetch("/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "Newsletter Signup",
          variant: variant,
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
        email: "",
        firstName: "",
        subscribeUpdates: false,
      });

      alert(
        "🎉 Welcome to the Mountpole community! You'll receive exclusive deals, new product alerts, and industry insights."
      );

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting newsletter form:", error);
      alert(
        "Sorry, there was an error signing you up. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "footer") {
    return (
      <div className="bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-2xl">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
            <p className="text-blue-100 text-sm">
              Exclusive deals & new arrivals
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="your@email.com"
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-blue-900 hover:bg-blue-50"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-900 border-t-transparent mr-2" />
                Subscribing...
              </>
            ) : (
              <>
                <Gift className="h-4 w-4 mr-2" />
                Get Exclusive Access
              </>
            )}
          </Button>

          <p className="text-xs text-blue-100 text-center">
            Join 10,000+ businesses getting insider pricing. Unsubscribe
            anytime.
          </p>
        </form>
      </div>
    );
  }

  if (variant === "popup") {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Gift className="h-8 w-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get 15% Off Your First Order
        </h2>
        <p className="text-gray-600 mb-6">
          Join our newsletter for exclusive wholesale deals, new product alerts,
          and insider pricing.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First name"
              className="w-full"
            />
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Work email address"
              className="w-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="flex-1"
              >
                Maybe Later
              </Button>
            )}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Subscribing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Claim 15% Discount
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-gray-500">
            No spam, ever. Unsubscribe with one click.
          </p>
        </form>
      </div>
    );
  }

  // Sidebar variant
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Newsletter</h3>
          <p className="text-gray-600 text-sm">Weekly updates</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First name"
          className="w-full"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Email address"
          className="w-full"
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Get deals & insights weekly
        </p>
      </form>
    </div>
  );

  // Checkout variant - Single checkbox integration
  if (variant === "checkout") {
    return (
      <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg border">
        <input
          type="checkbox"
          id="newsletter-checkout"
          checked={formData.subscribeUpdates}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              subscribeUpdates: e.target.checked,
            }))
          }
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label
          htmlFor="newsletter-checkout"
          className="text-sm text-gray-700 flex-1"
        >
          Yes, send me exclusive wholesale deals and product updates. You can
          unsubscribe anytime.
        </label>
        <Mail className="h-4 w-4 text-gray-400" />
      </div>
    );
  }

  // Sidebar variant (default for fallback)
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Newsletter</h3>
          <p className="text-gray-600 text-sm">Weekly updates</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First name"
          className="w-full"
        />
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          placeholder="Email address"
          className="w-full"
        />

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Subscribing...
            </>
          ) : (
            <>
              <Mail className="h-4 w-4 mr-2" />
              Subscribe
            </>
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Get deals & insights weekly
        </p>
      </form>
    </div>
  );
}
