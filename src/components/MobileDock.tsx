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
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      const hasSeenForm = sessionStorage.getItem("contactFormShown");
      const hasSubmittedForm = localStorage.getItem("contactFormSubmitted");

      if (!hasSeenForm && !hasSubmittedForm) {
        const timer = setTimeout(() => {
          setIsContactFormOpen(true);
          sessionStorage.setItem("contactFormShown", "true");
        }, 5000);

        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleFormSuccess = () => {
    localStorage.setItem("contactFormSubmitted", "true");
    setIsContactFormOpen(false);
  };

  const dockItems = [
    { name: "Home", icon: Home, href: "/", active: true },
    { name: "Categories", icon: Grid3X3, action: "categories" },
    { name: "Contact", icon: Phone, action: "contact" },
    { name: "Brands", icon: Building2, action: "brands" },
    { name: "Menu", icon: Menu, action: "menu" },
  ];

  const categories = [
    { name: "Smartphones", icon: Smartphone, href: "/smartphones", description: "Latest iPhone, Galaxy & Pixel", color: "text-blue-600" },
    { name: "Tablets", icon: Tablet, href: "/tablets", description: "iPad, Galaxy Tab & more", color: "text-green-600" },
    { name: "Wearables", icon: Watch, href: "/wearables", description: "Smart watches & fitness", color: "text-purple-600" },
    { name: "Monitors", icon: Monitor, href: "/monitors", description: "Displays & screens", color: "text-orange-600" },
    { name: "Audio", icon: HeadphonesIcon, href: "/audio", description: "Headphones & speakers", color: "text-red-600" },
  ];

  const brands = [
    { name: "Apple", href: "/brands/apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", description: "iPhone, iPad, MacBook, Apple Watch" },
    { name: "Samsung", href: "/brands/samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg", description: "Galaxy phones, tablets, watches" },
    { name: "Google", href: "/brands/google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", description: "Pixel phones, Nest devices" },
    { name: "Xiaomi", href: "/brands/xiaomi", logo: "https://upload.wikimedia.org/wikipedia/en/2/29/Xiaomi_logo.svg", description: "Mi & Redmi series" },
    { name: "Huawei", href: "/brands/huawei", logo: "https://upload.wikimedia.org/wikipedia/en/0/04/Huawei_Standard_logo.svg", description: "P & Mate series" },
    { name: "Honor", href: "/brands/honor", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Honor_Logo.svg", description: "Honor smartphones" }
  ];

  const handleDockItemClick = (item: any) => {
    if (item.href) {
      window.location.href = item.href;
      return;
    }

    if (item.action === "contact") {
      setIsContactFormOpen(true);
      return;
    }

    if (item.action === "categories") {
      setCategoriesOpen(true);
      setBrandsOpen(false);
      setIsMenuOpen(false);
      return;
    }

    if (item.action === "brands") {
      setBrandsOpen(true);
      setCategoriesOpen(false);
      setIsMenuOpen(false);
      return;
    }

    if (item.action === "menu") {
      setIsMenuOpen(true);
      setCategoriesOpen(false);
      setBrandsOpen(false);
      return;
    }
  };

  return (
    <>
      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <div className="fixed inset-0 z-[9995]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsContactFormOpen(false)} />
          <div className="absolute bottom-0 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 left-0 right-0 md:w-[500px] bg-white rounded-t-2xl md:rounded-2xl max-h-[85vh] overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 shadow-2xl mb-20 md:mb-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Partner with MountPole</h2>
                <p className="text-blue-100 text-sm">Quick Contact</p>
              </div>
              <button onClick={() => setIsContactFormOpen(false)} className="p-2 hover:bg-white/20 rounded-md transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
              <MobileContactForm onSuccess={handleFormSuccess} onCancel={() => setIsContactFormOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Categories Slider */}
      {isCategoriesOpen && (
        <div className="md:hidden fixed inset-0 z-[9998]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setCategoriesOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl max-h-[75vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20 shadow-2xl mb-24">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Product Categories</h2>
                  <p className="text-blue-100 text-sm mt-1">Browse by category</p>
                </div>
                <button onClick={() => setCategoriesOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 pb-8 overflow-y-auto max-h-[calc(75vh-120px)] bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link key={category.name} href={category.href} className="flex items-center space-x-4 p-5 rounded-2xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 group" onClick={() => setCategoriesOpen(false)}>
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-all duration-200">
                        <Icon className={`h-6 w-6 ${category.color} group-hover:scale-110 transition-transform duration-200`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{category.name}</h3>
                        <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">{category.description}</p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">
                        <span className="text-blue-600 text-sm font-medium">→</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Brands Slider */}
      {isBrandsOpen && (
        <div className="md:hidden fixed inset-0 z-[9998]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setBrandsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl rounded-t-3xl max-h-[75vh] overflow-hidden animate-in slide-in-from-bottom duration-300 border-t border-white/20 shadow-2xl mb-24">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Premium Brands</h2>
                  <p className="text-purple-100 text-sm mt-1">Authorized distributor</p>
                </div>
                <button onClick={() => setBrandsOpen(false)} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6 pb-8 overflow-y-auto max-h-[calc(75vh-120px)] bg-gradient-to-b from-gray-50 to-white">
              <div className="grid grid-cols-2 gap-4">
                {brands.map((brand) => (
                  <Link key={brand.name} href={brand.href} className="p-4 rounded-xl bg-white hover:bg-gray-50 transition-all duration-200 shadow-sm hover:shadow-md border border-gray-100 group text-center" onClick={() => setBrandsOpen(false)}>
                    <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center overflow-hidden group-hover:bg-blue-50 transition-colors duration-200">
                      <Image src={brand.logo} alt={brand.name} width={32} height={32} className="object-contain group-hover:scale-110 transition-transform duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200 mb-1">{brand.name}</h3>
                    <p className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-200 leading-relaxed">{brand.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Sheet */}
      <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 bg-white/95 backdrop-blur-xl border-t border-white/20">
          <SheetHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-6 py-4">
            <SheetTitle className="text-white text-xl font-bold text-left">Navigation Menu</SheetTitle>
            <p className="text-indigo-100 text-sm text-left">Explore our platform</p>
          </SheetHeader>
          <div className="p-6 pb-8 overflow-y-auto h-full bg-gradient-to-b from-gray-50 to-white">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Main Pages</h3>
                <div className="space-y-3">
                  {[{ name: "Home", href: "/" }, { name: "About", href: "/about" }, { name: "Contact", href: "/contact" }, { name: "Search", href: "/search" }].map((item) => (
                    <Link key={item.name} href={item.href} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors" onClick={() => setIsMenuOpen(false)}>
                      <span className="font-medium text-gray-700 hover:text-blue-600">{item.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <Separator />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link key={category.name} href={category.href} className="flex flex-col items-center p-4 rounded-lg bg-white hover:bg-gray-50 transition-colors border border-gray-100" onClick={() => setIsMenuOpen(false)}>
                        <Icon className={`h-6 w-6 ${category.color} mb-2`} />
                        <span className="text-sm font-medium text-gray-700">{category.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Mobile Dock */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-[9999]">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="flex items-center justify-around py-2">
            {dockItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active || 
                (item.action === "categories" && isCategoriesOpen) ||
                (item.action === "brands" && isBrandsOpen) ||
                (item.action === "menu" && isMenuOpen) ||
                (item.action === "contact" && isContactFormOpen);
              
              return (
                <button key={item.name} onClick={() => handleDockItemClick(item)} className={`flex flex-col items-center justify-center p-2.5 rounded-xl transition-all duration-200 min-w-[60px] ${isActive ? "bg-blue-600 text-white shadow-lg scale-105" : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"}`}>
                  <Icon className={`h-5 w-5 mb-1 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
                  <span className={`text-xs font-medium transition-colors duration-200 ${isActive ? "text-white" : ""}`}>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
