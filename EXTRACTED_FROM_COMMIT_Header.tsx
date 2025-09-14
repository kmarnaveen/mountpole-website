"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { StreamSearch } from "@/components/StreamSearch";
import productsData from "../../products.json";
import { Product } from "@/types/product";

export default function Header() {
  const router = useRouter();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Search placeholders
  const searchPlaceholder = "Search products...";
  const mobileSearchPlaceholder = "Search for products, brands...";

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
      {/* Mobile Header - Non-sticky, logo only */}
      <header className="md:hidden w-full bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MountPole</span>
            </Link>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="md:hidden fixed inset-0 z-[9998] bg-white">
          <div className="p-3">
            <div className="flex items-center space-x-2 mb-4">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className=" hover:bg-gray-100 rounded-full"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="flex-1">
                <StreamSearch
                  products={productsData.products as Product[]}
                  placeholder={mobileSearchPlaceholder}
                  className="w-full"
                  maxResults={6}
                  onSelectResult={() => setIsMobileSearchOpen(false)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-gray-900 text-sm">
                  Popular Categories
                </h3>
                <div className="grid grid-cols-1 gap-1.5">
                  {categories.slice(0, 5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-2.5 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileSearchOpen(false)}
                      >
                        <Icon className={`h-4 w-4 ${category.color}`} />
                        <div>
                          <span className="font-medium text-sm">
                            {category.name}
                          </span>
                          <p className="text-xs text-gray-500">
                            {category.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2 text-gray-900 text-sm">
                  Popular Brands
                </h3>
                <div className="grid grid-cols-2 gap-1.5">
                  {brands.slice(0, 6).map((brand) => (
                    <Link
                      key={brand.name}
                      href={brand.href}
                      className="p-2 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      onClick={() => setIsMobileSearchOpen(false)}
                    >
                      <span className="font-medium text-sm">{brand.name}</span>
                      {brand.badge && (
                        <span className="block text-xs text-blue-600 mt-0.5">
                          {brand.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Header - Professional Design */}
      <header className="sticky top-0 z-[9999] w-full bg-white shadow-sm border-b border-gray-200 hidden md:block">
        <div className="container mx-auto px-6">
          {/* Top bar - Enhanced spacing and typography */}
          <div className="flex items-center justify-between py-5">
            {/* Logo - More professional styling */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-white font-bold text-xl">M</span>
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

            {/* Search Bar - Enhanced design */}
            <div className="flex-1 max-w-xl mx-12">
              <StreamSearch
                products={productsData.products as Product[]}
                placeholder={
                  isMounted
                    ? `${searchPlaceholder} (Press / or ⌘K)`
                    : searchPlaceholder
                }
                className="w-full rounded-lg backdrop-blur-sm focus:bg-white focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md"
                maxResults={6}
              />
            </div>

            {/* Right side actions - Enhanced styling */}
            <div className="flex items-center space-x-6">
              {/* Contact CTA Button */}
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                  Get Quote
                </Button>
              </Link>

              {/* Mobile menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[320px] sm:w-[400px] p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Header */}
                    <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-cyan-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            M
                          </span>
                        </div>
                        <div>
                          <SheetTitle className="text-left text-lg">
                            Mountpole
                          </SheetTitle>
                          <p className="text-sm text-gray-600">
                            Premium Electronics Store
                          </p>
                        </div>
                      </div>
                    </SheetHeader>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto">
                      {/* Search Bar - Mobile */}
                      <div className="p-4 border-b">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            type="search"
                            placeholder={searchPlaceholder}
                            className="pl-10 pr-4 w-full"
                          />
                        </div>
                      </div>

                      {/* Quick Links */}
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                          Quick Links
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {quickLinks.map((link) => (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <link.icon
                                className={`h-4 w-4 ${link.color} group-hover:scale-110 transition-transform`}
                              />
                              <span className="text-sm font-medium">
                                {link.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-blue-500" />
                          Categories
                        </h3>
                        <div className="space-y-1">
                          {categories.map((category) => (
                            <Link
                              key={category.name}
                              href={category.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`p-2 rounded-lg bg-gray-50 group-hover:bg-white transition-colors`}
                                >
                                  <category.icon
                                    className={`h-4 w-4 ${category.color}`}
                                  />
                                </div>
                                <div>
                                  <span className="font-medium text-gray-900">
                                    {category.name}
                                  </span>
                                  <p className="text-xs text-gray-500">
                                    {category.description}
                                  </p>
                                </div>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Brands */}
                      <div className="p-4 border-b">
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                          <Headphones className="h-4 w-4 mr-2 text-green-500" />
                          Top Brands
                        </h3>
                        <div className="space-y-1">
                          {brands.map((brand) => (
                            <Link
                              key={brand.name}
                              href={brand.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                            >
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-gray-900">
                                    {brand.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {brand.badge}
                                  </Badge>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                  {brand.description}
                                </p>
                              </div>
                              <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            </Link>
                          ))}
                          <Link
                            href="/brands"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center p-3 mt-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                          >
                            View All Brands
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>

                      {/* Info Section */}
                      <div className="p-4">
                        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-blue-900">
                              Display & Information Only
                            </span>
                          </div>
                          <p className="text-xs text-blue-700">
                            This is a showcase website. No actual purchases can
                            be made.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex items-center justify-center space-x-4">
                        <Button variant="outline" size="sm" className="flex-1">
                          <HelpCircle className="h-4 w-4 mr-2" />
                          Help
                        </Button>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Navigation - Professional Design */}
          <div className="hidden md:flex items-center justify-between py-3 border-t border-gray-100">
            <NavigationMenu>
              <NavigationMenuList className="space-x-1">
                {/* Categories - Enhanced styling */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[500px] gap-4 p-6 md:w-[600px] md:grid-cols-2 lg:w-[700px] bg-white shadow-xl rounded-xl border border-gray-100">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            href={category.href}
                            className="group block select-none space-y-2 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-md border border-transparent hover:border-blue-100"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all duration-200">
                                <category.icon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="text-base font-semibold leading-none text-gray-900 group-hover:text-blue-700 transition-colors">
                                {category.name}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-gray-600 group-hover:text-gray-700 ml-11">
                              Latest {category.name.toLowerCase()} from top
                              brands with professional support
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Brands - Enhanced styling */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-11 px-6 font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 rounded-lg">
                    Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[450px] p-6 bg-white shadow-xl rounded-xl border border-gray-100">
                      <div className="grid gap-3 mb-4">
                        {brands.map((brand) => (
                          <NavigationMenuLink key={brand.name} asChild>
                            <Link
                              href={brand.href}
                              className="group flex items-center justify-between select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:shadow-sm border border-transparent hover:border-blue-100"
                            >
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <div className="text-sm font-semibold leading-none text-gray-900 group-hover:text-blue-700 transition-colors">
                                    {brand.name}
                                  </div>
                                  {brand.badge && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 border-blue-200"
                                    >
                                      {brand.badge}
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs leading-relaxed text-gray-600 group-hover:text-gray-700">
                                  {brand.description}
                                </p>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/brands"
                          className="flex items-center justify-center select-none rounded-lg p-3 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-600 hover:text-white border-t-2 border-gray-100 mt-3 pt-4 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 font-medium"
                        >
                          <div className="text-center">
                            <div className="text-sm font-semibold leading-none mb-1">
                              View All Brands
                            </div>
                            <p className="text-xs leading-relaxed opacity-80">
                              Compare all available brands and products
                            </p>
                          </div>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Links - Enhanced styling */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="inline-flex h-11 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-semibold transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="inline-flex h-11 w-max items-center justify-center rounded-lg bg-background px-6 py-2 text-sm font-semibold transition-all duration-200 hover:bg-blue-50 hover:text-blue-600 text-gray-700"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Professional Status Badge */}
            <div className="flex items-center space-x-4"></div>
          </div>
        </div>
      </header>
    </>
  );
}
