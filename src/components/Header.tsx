"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Menu,
  Smartphone,
  Tablet,
  Watch,
  Monitor,
  Home,
  Info,
  HelpCircle,
  Phone,
  ChevronRight,
  Shield,
  HeadphonesIcon,
  X,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { StreamSearch } from "@/components/StreamSearch";
import productsData from "../../products.json";
import { Product } from "@/types/product";

export default function Header() {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Search placeholders
  const searchPlaceholder = "Search...";
  const mobileSearchPlaceholder = "Search for products, brands...";

  // Handle keyboard shortcuts for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K or / to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === "Escape") {
        setIsSearchModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      description: "Innovative tech at great prices",
      badge: "Value",
    },
    {
      name: "Realme",
      href: "/brands/realme",
      description: "Youth-focused smartphones",
      badge: "Gaming",
    },
    {
      name: "Motorola",
      href: "/brands/motorola",
      description: "Pure Android experience",
      badge: "Clean",
    },
  ];

  const quickLinks = [
    { name: "Home", icon: Home, href: "/", color: "text-blue-600" },
    { name: "About", icon: Info, href: "/about", color: "text-green-600" },
    {
      name: "Contact",
      icon: Phone,
      href: "/contact",
      color: "text-purple-600",
    },
  ];

  // Search handlers
  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleDesktopSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <>
      {/* Mobile Header - Apple iOS Style */}
      <header className="md:hidden sticky top-0 z-[9999] w-full bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-9 h-9 relative">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="MountPole Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900 leading-tight">
                  MountPole
                </span>
                <span className="text-xs text-gray-500 font-medium leading-tight">
                  B2B DISTRIBUTOR
                </span>
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              {/* Search Button - iOS Style */}
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="w-10 h-10 bg-gray-100/80 hover:bg-gray-200/80 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Menu Button - iOS Style */}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay - Apple iOS Style */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-[99999] bg-white animate-in slide-in-from-top duration-300">
          {/* Search Header */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-100/50 px-4 py-3">
            <div className="flex items-center space-x-3">
              {/* Back Button */}
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors active:scale-95"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>

              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <StreamSearch
                  products={productsData.products as Product[]}
                  placeholder="Search products, brands..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-100/80 border-0 rounded-2xl text-base focus:bg-white focus:ring-2 focus:ring-blue-500/30 transition-all"
                  maxResults={8}
                  onSelectResult={() => setIsMobileSearchOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
            {/* Popular Searches */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                Popular Searches
              </h3>
              <div className="space-y-2">
                {[
                  "iPhone 15",
                  "Samsung Galaxy",
                  "iPad Pro",
                  "MacBook Air",
                  "Apple Watch",
                  "AirPods Pro",
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(term)}`);
                      setIsMobileSearchOpen(false);
                    }}
                    className="w-full flex items-center p-3 bg-gray-50/80 hover:bg-gray-100/80 rounded-2xl transition-all duration-200 active:scale-[0.98] text-left"
                  >
                    <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">
                      {term}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Monitor className="h-4 w-4 mr-2 text-green-500" />
                Browse Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Link
                      key={category.name}
                      href={category.href}
                      onClick={() => setIsMobileSearchOpen(false)}
                      className="flex flex-col items-center p-4 bg-gray-50/80 hover:bg-gray-100/80 rounded-2xl transition-all duration-200 active:scale-[0.98] text-center"
                    >
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-2 shadow-sm">
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-gray-900 mb-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500 leading-tight">
                        {category.description}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Brands Grid */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <Headphones className="h-4 w-4 mr-2 text-purple-500" />
                Top Brands
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {brands.slice(0, 6).map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    onClick={() => setIsMobileSearchOpen(false)}
                    className="flex flex-col items-center p-3 bg-gray-50/80 hover:bg-gray-100/80 rounded-2xl transition-all duration-200 active:scale-[0.98] text-center"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mb-2 shadow-sm">
                      <span className="text-lg font-bold text-gray-700">
                        {brand.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-gray-900 mb-1">
                      {brand.name}
                    </span>
                    {brand.badge && (
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                        {brand.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent/Trending Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2 text-orange-500" />
                Trending Now
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  "Latest iPhone Models",
                  "Gaming Laptops",
                  "Wireless Earbuds",
                  "Smart Watches",
                ].map((trend) => (
                  <button
                    key={trend}
                    onClick={() => {
                      router.push(`/search?q=${encodeURIComponent(trend)}`);
                      setIsMobileSearchOpen(false);
                    }}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-gray-100 hover:to-gray-150 rounded-2xl transition-all duration-200 active:scale-[0.98]"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      {trend}
                    </span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Spacing */}
            <div className="h-20" />
          </div>

          {/* Search Footer */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-xl border-t border-gray-100/50 px-4 py-3">
            <div className="flex items-center justify-center text-xs text-gray-500">
              <span>
                Search across {productsData.products.length}+ products
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header - Professional Design */}
      <header className="sticky top-0 z-[9999] w-full bg-white shadow-sm border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-6">
          {/* Single bar with logo, navigation, search, and actions */}
          <div className="flex items-center justify-between py-4">
            {/* Logo - More professional styling with actual logo */}
            <Link
              href="/"
              className="flex items-center space-x-3 group flex-shrink-0"
            >
              <div className="w-10 h-10 relative group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="MountPole Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gray-900 tracking-tight">
                  MountPole
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  B2B DISTRIBUTOR
                </span>
              </div>
            </Link>

            {/* Navigation - Apple-Inspired Minimal Design */}
            <NavigationMenu className="mx-8">
              <NavigationMenuList className="space-x-0">
                {/* Categories - Optimized Apple-style dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-6 font-medium text-gray-800 hover:text-black hover:bg-gray-50/80 transition-all duration-150 rounded-full data-[state=open]:bg-gray-100/80 data-[state=open]:text-black border-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-500/30">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[480px] h-[340px] p-0 bg-white backdrop-blur-2xl shadow-xl rounded-2xl border border-gray-200/30 overflow-hidden flex flex-col">
                      {/* Header - Clean */}
                      <div className="px-5 py-3 border-b border-gray-100/50 flex-shrink-0">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                          Product Categories
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Find the right device for your needs
                        </p>
                      </div>

                      {/* Content - Grid Layout with Scroll */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent p-3">
                        <div className="grid grid-cols-2 gap-2">
                          {categories.map((category, index) => (
                            <NavigationMenuLink key={category.name} asChild>
                              <Link
                                href={category.href}
                                className="group flex flex-col items-center select-none rounded-xl p-3 transition-all duration-150 hover:bg-gray-50/70 hover:shadow-sm active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 text-center"
                              >
                                <div className="w-10 h-10 rounded-xl bg-gray-100/60 group-hover:bg-blue-50/80 group-hover:shadow-sm flex items-center justify-center transition-all duration-150 mb-2">
                                  <category.icon className="h-5 w-5 text-gray-700 group-hover:text-blue-600" />
                                </div>
                                <div className="w-full">
                                  <div className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors leading-tight mb-1">
                                    {category.name}
                                  </div>
                                  <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed line-clamp-2">
                                    {category.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>

                        {/* View All - Compact Footer */}
                        <div className="mt-3 pt-3 border-t border-gray-100/50">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/categories"
                              className="group flex items-center justify-center select-none rounded-lg p-2.5 transition-all duration-150 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                            >
                              View All Categories
                              <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Brands - Streamlined Apple-style dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-6 font-medium text-gray-800 hover:text-black hover:bg-gray-50/80 transition-all duration-150 rounded-full data-[state=open]:bg-gray-100/80 data-[state=open]:text-black border-0 focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-500/30">
                    Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[420px] h-[380px] p-0 bg-white backdrop-blur-2xl shadow-xl rounded-2xl border border-gray-200/30 overflow-hidden flex flex-col">
                      {/* Header - Clean */}
                      <div className="px-5 py-3 border-b border-gray-100/50 flex-shrink-0">
                        <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                          Featured Brands
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5">
                          Trusted technology partners
                        </p>
                      </div>

                      {/* Brands Grid - Fixed Height with Scroll */}
                      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent p-3">
                        <div className="grid grid-cols-2 gap-2">
                          {brands.map((brand) => (
                            <NavigationMenuLink key={brand.name} asChild>
                              <Link
                                href={brand.href}
                                className="group flex flex-col select-none rounded-xl p-3 transition-all duration-150 hover:bg-gray-50/70 hover:shadow-sm active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 text-center"
                              >
                                <div className="w-full mb-2">
                                  <div className="flex items-center justify-center space-x-2 mb-1">
                                    <span className="text-sm font-semibold text-gray-900 group-hover:text-black transition-colors">
                                      {brand.name}
                                    </span>
                                    {brand.badge && (
                                      <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-50/80 text-blue-700 border border-blue-100/60">
                                        {brand.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed line-clamp-2">
                                    {brand.description}
                                  </p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>

                        {/* View All Brands - Compact Footer */}
                        <div className="mt-3 pt-3 border-t border-gray-100/50">
                          <NavigationMenuLink asChild>
                            <Link
                              href="/brands"
                              className="group flex items-center justify-center select-none rounded-lg p-2.5 transition-all duration-150 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50/50"
                            >
                              View All Brands
                              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </NavigationMenuLink>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Simple Links - Apple-style minimal with proper sizing */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="inline-flex h-11 items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-all duration-150 hover:bg-gray-50/80 hover:text-black text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/support"
                      className="inline-flex h-11 items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-all duration-150 hover:bg-gray-50/80 hover:text-black text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    >
                      Support
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="inline-flex h-11 items-center justify-center rounded-full px-6 py-2 text-sm font-medium transition-all duration-150 hover:bg-gray-50/80 hover:text-black text-gray-800 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Search Bar - Apple-style Two-Click Pattern */}
            <div className="flex-1 max-w-lg mx-8">
              {/* Search Trigger Button - First Click */}
              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="w-full h-11 px-4 py-2 bg-gray-50/80 hover:bg-gray-100/80 border border-gray-200/60 hover:border-gray-300/60 rounded-full transition-all duration-200 flex items-center space-x-3 text-left group focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <Search className="h-4 w-4 text-gray-400 group-hover:text-gray-500 transition-colors" />
                <span className="text-gray-500 group-hover:text-gray-600 transition-colors text-sm">
                  {isMounted ? `${searchPlaceholder} (⌘K)` : searchPlaceholder}
                </span>
                <div className="flex-1" />
                {isMounted && (
                  <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded border border-gray-200 bg-white px-1.5 font-mono text-[10px] font-medium text-gray-500 opacity-100">
                    ⌘K
                  </kbd>
                )}
              </button>
            </div>

            {/* Right side actions - Enhanced styling */}
            <div className="flex items-center space-x-6 flex-shrink-0">
              {/* Contact CTA Button */}
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Apple-Style Search Modal - Second Click Experience */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
          {/* Search Container */}
          <div className="flex items-start justify-center min-h-screen px-4 pt-[10vh]">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden animate-in slide-in-from-top-4 duration-300">
              {/* Search Header */}
              <div className="flex items-center px-6 py-4 border-b border-gray-100/80 bg-gray-50/30">
                <Search className="h-5 w-5 text-gray-400 mr-3" />
                <StreamSearch
                  products={productsData.products as Product[]}
                  placeholder="Search products, brands, categories..."
                  className="flex-1 border-0 bg-transparent focus:ring-0 text-base"
                  maxResults={8}
                  onSelectResult={() => setIsSearchModalOpen(false)}
                />
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="ml-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              {/* Quick Access Section */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                {/* Recent Searches or Suggestions */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                    Popular Searches
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "iPhone 15",
                      "Samsung Galaxy",
                      "iPad Pro",
                      "MacBook Air",
                      "Apple Watch",
                      "AirPods Pro",
                    ].map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          router.push(`/search?q=${encodeURIComponent(term)}`);
                          setIsSearchModalOpen(false);
                        }}
                        className="flex items-center p-3 text-left bg-gray-50/80 hover:bg-gray-100/80 rounded-xl transition-all duration-150 group"
                      >
                        <Search className="h-3.5 w-3.5 text-gray-400 mr-2.5 group-hover:text-gray-600" />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 font-medium">
                          {term}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick Categories */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <Monitor className="h-4 w-4 mr-2 text-green-500" />
                    Browse Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <Link
                          key={category.name}
                          href={category.href}
                          onClick={() => setIsSearchModalOpen(false)}
                          className="flex items-center p-3 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl transition-all duration-150 group"
                        >
                          <Icon
                            className={`h-4 w-4 mr-2.5 ${category.color} group-hover:scale-110 transition-transform`}
                          />
                          <div>
                            <span className="text-sm font-medium text-gray-900 block">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {category.description}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Brands */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                    <Headphones className="h-4 w-4 mr-2 text-purple-500" />
                    Top Brands
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {brands.slice(0, 6).map((brand) => (
                      <Link
                        key={brand.name}
                        href={brand.href}
                        onClick={() => setIsSearchModalOpen(false)}
                        className="flex flex-col items-center p-3 bg-gray-50/80 hover:bg-gray-100/80 rounded-xl transition-all duration-150 group text-center"
                      >
                        <span className="text-sm font-medium text-gray-900 group-hover:text-black transition-colors">
                          {brand.name}
                        </span>
                        {brand.badge && (
                          <span className="text-xs text-blue-600 mt-1">
                            {brand.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Footer */}
              <div className="px-6 py-3 bg-gray-50/50 border-t border-gray-100/80 flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
                      ↵
                    </kbd>
                    <span className="ml-1">to search</span>
                  </span>
                  <span className="flex items-center">
                    <kbd className="px-2 py-1 bg-white border border-gray-200 rounded text-xs font-mono">
                      esc
                    </kbd>
                    <span className="ml-1">to close</span>
                  </span>
                </div>
                <span>
                  Search across {productsData.products.length}+ products
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}