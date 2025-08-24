"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Home,
  Smartphone,
  Menu,
  Tablet,
  Watch,
  Monitor,
  HeadphonesIcon,
  Building2,
  Grid3X3,
  Phone,
  X,
  Send,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function MobileDock() {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    query: "",
  });

  // Auto-popup logic for homepage
  useEffect(() => {
    // Check if we're on the homepage
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      // Check if user has already been shown the form in this session
      const hasSeenForm = sessionStorage.getItem("contactFormShown");
      const hasSubmittedForm = localStorage.getItem("contactFormSubmitted");

      // Only show if user hasn't seen it this session and hasn't submitted before
      if (!hasSeenForm && !hasSubmittedForm) {
        const timer = setTimeout(() => {
          setIsContactFormOpen(true);
          sessionStorage.setItem("contactFormShown", "true");
        }, 5000); // 5 seconds delay

        return () => clearTimeout(timer);
      }
    }
  }, []);

  // Handle form submission and mark as submitted
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwzOlcIiyseWdYs7zJgm7qMB3whg3JQvUwy-NawF4yDjBiEX9F-_zC6doe0yoWzmccdzw/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            timestamp: new Date().toISOString(),
          }),
        }
      );

      // Mark form as submitted to prevent auto-popup in future visits
      localStorage.setItem("contactFormSubmitted", "true");

      // Reset form and show success
      setFormData({ name: "", email: "", company: "", phone: "", query: "" });
      setIsContactFormOpen(false);
      alert(
        "Thank you for your interest in partnering with MountPole! Our business development team will contact you within 24 hours to discuss wholesale opportunities and partnership options."
      );
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Sorry, there was an error sending your message. Please try again or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const dockItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
      active: true, // You can make this dynamic based on current route
    },
    {
      name: "Categories",
      icon: Grid3X3,
      action: "categories",
    },
    {
      name: "Brands",
      icon: Building2,
      action: "brands",
    },
    {
      name: "Menu",
      icon: Menu,
      action: "menu",
    },
  ];

  const categories = [
    {
      name: "Smartphones",
      icon: Smartphone,
      href: "/smartphones",
      description: "Latest iPhone, Galaxy & Pixel",
      color: "text-blue-600",
    },
    {
      name: "Tablets",
      icon: Tablet,
      href: "/tablets",
      description: "iPad, Galaxy Tab & more",
      color: "text-green-600",
    },
    {
      name: "Wearables",
      icon: Watch,
      href: "/wearables",
      description: "Smart watches & fitness",
      color: "text-purple-600",
    },
    {
      name: "Monitors",
      icon: Monitor,
      href: "/monitors",
      description: "High-resolution displays",
      color: "text-orange-600",
    },
    {
      name: "Audio",
      icon: HeadphonesIcon,
      href: "/audio",
      description: "Headphones & earbuds",
      color: "text-red-600",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const brands = [
    {
      name: "Samsung",
      href: "/brands/samsung",
      description: "Galaxy smartphones & tablets",
      badge: "Popular",
    },
    {
      name: "Apple",
      href: "/brands/apple",
      description: "iPhone, iPad, Mac & more",
      badge: "Premium",
    },
    {
      name: "Google",
      href: "/brands/google",
      description: "Pixel phones & accessories",
      badge: "AI",
    },
    {
      name: "Xiaomi",
      href: "/brands/xiaomi",
      description: "Affordable flagship phones",
      badge: "Value",
    },
    {
      name: "Huawei",
      href: "/brands/huawei",
      description: "Premium design & cameras",
    },
    {
      name: "Honor",
      href: "/brands/honor",
      description: "Performance & style",
    },
    {
      name: "Realme",
      href: "/brands/realme",
      description: "Young & trendy",
    },
    {
      name: "JBL",
      href: "/brands/jbl",
      description: "Audio equipment",
    },
  ];

  const handleDockItemClick = (item: { action?: string; href?: string }) => {
    if (item.action === "categories") {
      setCategoriesOpen(true);
    } else if (item.action === "brands") {
      setBrandsOpen(true);
    } else if (item.action === "menu") {
      setIsMenuOpen(true);
    }
  };

  return (
    <>
      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 z-[9995]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsContactFormOpen(false)}
          />
          {/* Modal */}
          <div className="absolute bottom-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 left-0 right-0 md:w-[650px] lg:w-[750px] md:max-w-[90vw] bg-white/95 backdrop-blur-xl rounded-t-2xl md:rounded-2xl max-h-[75vh] md:max-h-[80vh] overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 shadow-2xl border border-white/20 mb-20 md:mb-0">
            {/* Professional Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg md:text-xl font-semibold">
                    Partner with MountPole
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">Global Technology Distribution</p>
                </div>
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-md transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div
              className="px-6 md:px-8 lg:px-10 py-4 md:py-6 overflow-y-auto bg-gray-50"
              style={{ maxHeight: "calc(75vh - 180px)" }}
            >
              <div className="max-w-full mx-auto">
                <form
                  id="contact-form"
                  onSubmit={handleFormSubmit}
                  className="space-y-4 md:space-y-5"
                >
                  {/* Name and Email in Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="flex items-center text-sm md:text-base font-medium text-gray-800"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-blue-600 rounded flex items-center justify-center mr-3">
                          <User className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 text-sm md:text-base bg-white"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="company"
                        className="flex items-center text-sm md:text-base font-medium text-gray-800"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-purple-600 rounded flex items-center justify-center mr-3">
                          <Building2 className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 text-sm md:text-base bg-white"
                        placeholder="Your company or business"
                      />
                    </div>
                  </div>

                  {/* Email and Phone in Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="flex items-center text-sm md:text-base font-medium text-gray-800"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-green-600 rounded flex items-center justify-center mr-3">
                          <Mail className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        Business Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 text-sm md:text-base bg-white"
                        placeholder="your@company.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="phone"
                        className="flex items-center text-sm md:text-base font-medium text-gray-800"
                      >
                        <div className="w-6 h-6 md:w-7 md:h-7 bg-orange-600 rounded flex items-center justify-center mr-3">
                          <Phone className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all duration-200 text-sm md:text-base bg-white"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Message Field - Full Width */}
                  <div className="space-y-2">
                    <label
                      htmlFor="query"
                      className="flex items-center text-sm md:text-base font-medium text-gray-800"
                    >
                      <div className="w-6 h-6 md:w-7 md:h-7 bg-indigo-600 rounded flex items-center justify-center mr-3">
                        <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-white" />
                      </div>
                      Your Business Inquiry
                    </label>
                    <textarea
                      id="query"
                      name="query"
                      value={formData.query}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none transition-all duration-200 text-sm md:text-base bg-white"
                      placeholder="Tell us about your wholesale needs, partnership interest, or product requirements..."
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Fixed Button Footer - Always Visible */}
            <div className="bg-white px-6 md:px-8 lg:px-10 sticky bottom-0">
              <div className="max-w-full mx-auto">
                <button
                  type="submit"
                  form="contact-form"
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 md:py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center space-x-3 text-base md:text-lg shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 " />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Send Partnership Inquiry</span>
                    </>
                  )}
                </button>

                {/* Professional Footer */}
                <div className="text-center py-3">
                  <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                    Response within 24 hours • Wholesale pricing available • Authorized distributor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Categories Bottom Slider */}
      {isCategoriesOpen && (
        <div className="md:hidden fixed inset-0 z-[9996]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCategoriesOpen(false)}
          />
          {/* Slider */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Categories</h2>
                <button
                  onClick={() => setCategoriesOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 pb-20 overflow-y-auto max-h-[calc(70vh-80px)]">
              <div className="space-y-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <div
                        className={`p-3 rounded-xl bg-white ${category.color}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {category.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands Bottom Slider */}
      {isBrandsOpen && (
        <div className="md:hidden fixed inset-0 z-[9996]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setBrandsOpen(false)}
          />
          {/* Slider */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-2xl max-h-[70vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Brands</h2>
                <button
                  onClick={() => setBrandsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4 pb-20 overflow-y-auto max-h-[calc(70vh-80px)]">
              <div className="grid grid-cols-2 gap-3">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors text-center"
                    onClick={() => setBrandsOpen(false)}
                  >
                    <div className="space-y-2">
                      <h3 className="font-semibold text-gray-900">
                        {brand.name}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {brand.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-full">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`h-5 w-5 ${category.color}`} />
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator />

            {/* Brands */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{brand.name}</span>
                        {brand.badge && (
                          <Badge variant="secondary" className="text-xs">
                            {brand.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {brand.description}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Separator />

            {/* Additional Links */}
            <div className="space-y-2">
              <Link
                href="/about"
                className="block p-3 rounded-lg hover:bg-muted transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Floating Contact Button */}
      <button
        onClick={() => setIsContactFormOpen(true)}
        className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </button>

      {/* Mobile Dock */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[9997] bg-white/80 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-around py-2">
          {dockItems.map((item) => {
            const Icon = item.icon;

            if (item.href) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                    item.active
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              );
            }

            return (
              <button
                key={item.name}
                onClick={() => handleDockItemClick(item)}
                className="flex flex-col items-center justify-center p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
