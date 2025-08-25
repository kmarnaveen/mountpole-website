"use client";

import Link from "next/link";
import Image from "next/image";
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
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import MobileContactForm from "@/components/forms/MobileContactForm";

export default function MobileDock() {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);
  const [isBrandsOpen, setBrandsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);

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

  // Handle successful form submission
  const handleFormSuccess = () => {
    // Mark form as submitted to prevent auto-popup in future visits
    localStorage.setItem("contactFormSubmitted", "true");
    setIsContactFormOpen(false);
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
      logo: "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/300_186_4.png?$568_N_PNG$",
    },
    {
      name: "Apple",
      href: "/brands/apple",
      description: "iPhone, iPad, Mac & more",
      badge: "Premium",
      logo: "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png",
    },
    {
      name: "Google",
      href: "/brands/google",
      description: "Pixel phones & accessories",
      badge: "AI",
      logo: "https://i.pinimg.com/1200x/59/7f/11/597f11b631d7d94492f1adb95110cc44.jpg",
    },
    {
      name: "Xiaomi",
      href: "/brands/xiaomi",
      description: "Affordable flagship phones",
      badge: "Value",
      logo: "https://i.pinimg.com/1200x/0a/06/57/0a06573f82b48bd48f95e4a4e5dc4ca2.jpg",
    },
    {
      name: "Huawei",
      href: "/brands/huawei",
      description: "Premium design & cameras",
      logo: "https://i.pinimg.com/1200x/22/b4/6c/22b46c6e80b2f5c1f6178e08223cc726.jpg",
    },
    {
      name: "Honor",
      href: "/brands/honor",
      description: "Performance & style",
      logo: "https://i.pinimg.com/736x/96/82/17/9682176d8cc1e0e31fbedcba99e87eef.jpg",
    },
    {
      name: "Realme",
      href: "/brands/realme",
      description: "Young & trendy",
      logo: "https://i.pinimg.com/736x/71/71/0f/71710f762b6af383a73f9760fda3a3ae.jpg",
    },
    {
      name: "JBL",
      href: "/brands/jbl",
      description: "Audio equipment",
      logo: "https://i.pinimg.com/1200x/2c/ac/2a/2cac2ac8597cc2ea27601b198ea42685.jpg",
    },
  ];

  const handleDockItemClick = (item: { action?: string; href?: string }) => {
    if (item.action === "categories") {
      // Close other menus first
      setBrandsOpen(false);
      setIsMenuOpen(false);
      // Toggle categories
      setCategoriesOpen(!isCategoriesOpen);
    } else if (item.action === "brands") {
      // Close other menus first
      setCategoriesOpen(false);
      setIsMenuOpen(false);
      // Toggle brands
      setBrandsOpen(!isBrandsOpen);
    } else if (item.action === "menu") {
      // Close other menus first
      setCategoriesOpen(false);
      setBrandsOpen(false);
      // Toggle menu
      setIsMenuOpen(!isMenuOpen);
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
          <div className="absolute bottom-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 left-0 right-0 md:w-[500px] bg-white rounded-t-2xl md:rounded-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 shadow-2xl mb-20 md:mb-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Partner with MountPole</h2>
                <p className="text-blue-100 text-sm">Quick Contact</p>
              </div>
              <button
                onClick={() => setIsContactFormOpen(false)}
                className="p-2 hover:bg-white/20 rounded-md transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <MobileContactForm 
                onSuccess={handleFormSuccess}
                onCancel={() => setIsContactFormOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Categories Bottom Slider */}
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

      {/* Enhanced Categories Bottom Slider */}
      {isCategoriesOpen && (
        <div className="md:hidden fixed inset-0 z-[9998]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setCategoriesOpen(false)}
          />
          {/* Slider */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl max-h-[75vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20 shadow-2xl mb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Product Categories</h2>
                  <p className="text-blue-100 text-sm mt-1">Browse by category</p>
                </div>
                <button
                  onClick={() => setCategoriesOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 pb-8 overflow-y-auto max-h-[calc(75vh-120px)] bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center space-x-4 p-5 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 group"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      <div className={`p-4 rounded-2xl ${
                        index % 5 === 0 ? 'bg-blue-100' :
                        index % 5 === 1 ? 'bg-green-100' :
                        index % 5 === 2 ? 'bg-purple-100' :
                        index % 5 === 3 ? 'bg-orange-100' : 'bg-red-100'
                      } group-hover:scale-110 transition-transform`}>
                        <Icon className={`h-7 w-7 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {category.description}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Brands Bottom Slider */}
      {isBrandsOpen && (
        <div className="md:hidden fixed inset-0 z-[9998]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setBrandsOpen(false)}
          />
          {/* Slider */}
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl max-h-[75vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20 shadow-2xl mb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Our Brands</h2>
                  <p className="text-purple-100 text-sm mt-1">Premium technology partners</p>
                </div>
                <button
                  onClick={() => setBrandsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 pb-8 overflow-y-auto max-h-[calc(75vh-120px)] bg-gradient-to-b from-gray-50 to-white">
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand, index) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="p-5 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 text-center group"
                    onClick={() => setBrandsOpen(false)}
                  >
                    <div className="space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform overflow-hidden">
                        {brand.logo ? (
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg ${
                            index % 8 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                            index % 8 === 1 ? 'bg-gradient-to-br from-gray-700 to-gray-800' :
                            index % 8 === 2 ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                            index % 8 === 3 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                            index % 8 === 4 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                            index % 8 === 5 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                            index % 8 === 6 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                            'bg-gradient-to-br from-indigo-500 to-purple-600'
                          }`}>
                            {brand.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1 mb-2">
                          <h3 className="font-bold text-gray-900 text-sm">
                            {brand.name}
                          </h3>
                          {brand.badge && (
                            <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700">
                              {brand.badge}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {brand.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* View All Brands Button */}
              <Link
                href="/brands"
                className="block mt-6 text-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 font-bold"
                onClick={() => setBrandsOpen(false)}
              >
                View All Brands & Partners →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="right" className="w-full p-0 bg-gradient-to-br from-gray-50 to-blue-50 z-[9999]">
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <SheetTitle className="text-white text-xl font-bold">MountPole</SheetTitle>
                  <p className="text-blue-100 text-sm">B2B Technology Distribution</p>
                </div>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mr-3"></div>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/contact?type=quote"
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-blue-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Get Quote</span>
                  <span className="text-xs text-gray-500 text-center">Wholesale pricing</span>
                </Link>
                <Link
                  href="/contact?type=partnership"
                  className="flex flex-col items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-purple-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900 text-sm">Partner</span>
                  <span className="text-xs text-gray-500 text-center">Join network</span>
                </Link>
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full mr-3"></div>
                Product Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform ${
                        index % 4 === 0 ? 'bg-blue-100' :
                        index % 4 === 1 ? 'bg-green-100' :
                        index % 4 === 2 ? 'bg-purple-100' : 'bg-orange-100'
                      }`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{category.name}</div>
                        <div className="text-sm text-gray-600">{category.description}</div>
                      </div>
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <Separator className="bg-gray-200" />

            {/* Top Brands */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-gray-900 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-orange-500 to-red-500 rounded-full mr-3"></div>
                Top Brands
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {brands.slice(0, 6).map((brand, index) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-lg bg-gray-50 flex items-center justify-center p-2 group-hover:scale-110 transition-transform overflow-hidden">
                        {brand.logo ? (
                          <Image
                            src={brand.logo}
                            alt={`${brand.name} logo`}
                            width={32}
                            height={32}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm ${
                            index % 6 === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' :
                            index % 6 === 1 ? 'bg-gradient-to-br from-gray-700 to-gray-800' :
                            index % 6 === 2 ? 'bg-gradient-to-br from-red-500 to-pink-500' :
                            index % 6 === 3 ? 'bg-gradient-to-br from-orange-500 to-red-500' :
                            index % 6 === 4 ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                            'bg-gradient-to-br from-green-500 to-green-600'
                          }`}>
                            {brand.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="font-semibold text-gray-900 text-sm">{brand.name}</span>
                          {brand.badge && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-700">
                              {brand.badge}
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 line-clamp-2 mt-1">
                          {brand.description}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href="/brands"
                className="block text-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 font-semibold"
                onClick={() => setIsMenuOpen(false)}
              >
                View All Brands →
              </Link>
            </div>

            <Separator className="bg-gray-200" />

            {/* Additional Links */}
            <div className="space-y-4 pb-6">
              <h3 className="font-bold text-lg text-gray-900 flex items-center">
                <div className="w-2 h-6 bg-gradient-to-b from-gray-500 to-gray-600 rounded-full mr-3"></div>
                Company
              </h3>
              <div className="space-y-2">
                <Link
                  href="/about"
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-200 transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">About MountPole</div>
                    <div className="text-sm text-gray-600">Our story & mission</div>
                  </div>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 group"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-green-200 transition-colors">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">Contact Us</div>
                    <div className="text-sm text-gray-600">Get in touch</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Enhanced Floating Contact Button */}
      <button
        onClick={() => setIsContactFormOpen(true)}
        className="fixed bottom-24 md:bottom-6 right-6 z-40 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-4 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 border border-white/20 backdrop-blur-sm group"
      >
        <Phone className="h-6 w-6 group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">!</span>
        </div>
      </button>

      {/* Enhanced Mobile Dock */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[9999]">
        {/* Modern Floating Dock */}
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-2">
          <div className="flex items-center justify-around">
            {dockItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = item.active || 
                (item.action === "categories" && isCategoriesOpen) ||
                (item.action === "brands" && isBrandsOpen) ||
                (item.action === "menu" && isMenuOpen);

              if (item.href) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-white bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg scale-105"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-1 ${isActive ? 'drop-shadow-sm' : ''}`} />
                    <span className={`text-xs font-medium ${isActive ? 'drop-shadow-sm' : ''}`}>{item.name}</span>
                  </Link>
                );
              }

              return (
                <button
                  key={item.name}
                  onClick={() => handleDockItemClick(item)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 relative group ${
                    isActive 
                      ? "text-white bg-gradient-to-br from-blue-600 to-purple-600 shadow-lg scale-105"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:scale-105"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isActive ? 'drop-shadow-sm' : ''}`} />
                  <span className={`text-xs font-medium ${isActive ? 'drop-shadow-sm' : ''}`}>{item.name}</span>
                  {item.action === "menu" && !isActive && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
