"use client";

import { useState } from "react";
import Link from "next/link";
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
} from "lucide-react";

export default function Header() {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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
      name: "Support",
      icon: HelpCircle,
      href: "/support",
      color: "text-orange-600",
    },
    {
      name: "Contact",
      icon: Phone,
      href: "/contact",
      color: "text-purple-600",
    },
  ];

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
              <span className="text-xl font-bold text-gray-900">Mountpole</span>
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
        <div className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-6">
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for products, brands..."
                  className="pl-10 h-12 text-base"
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">
                  Popular Categories
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {categories.slice(0, 5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <Link
                        key={category.name}
                        href={category.href}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileSearchOpen(false)}
                      >
                        <Icon className={`h-5 w-5 ${category.color}`} />
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
                <h3 className="font-semibold mb-3 text-gray-900">
                  Popular Brands
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {brands.slice(0, 6).map((brand) => (
                    <Link
                      key={brand.name}
                      href={brand.href}
                      className="p-3 rounded-lg hover:bg-gray-50 transition-colors text-center"
                      onClick={() => setIsMobileSearchOpen(false)}
                    >
                      <span className="font-medium text-sm">{brand.name}</span>
                      {brand.badge && (
                        <span className="block text-xs text-blue-600 mt-1">
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

      {/* Desktop Header - Sticky with full functionality */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b hidden md:block">
        <div className="container mx-auto px-4">
          {/* Top bar */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mountpole</span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 w-full"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                {isSearchFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg p-4 z-50">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Popular searches:</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">iPhone 15</Badge>
                        <Badge variant="secondary">Galaxy S24</Badge>
                        <Badge variant="secondary">Pixel 9</Badge>
                        <Badge variant="secondary">iPad</Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
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
                            placeholder="Search products..."
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
                          <HeadphonesIcon className="h-4 w-4 mr-2 text-green-500" />
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

          {/* Navigation - Desktop */}
          <div className="hidden md:flex items-center justify-between py-2 border-t">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Categories */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <NavigationMenuLink key={category.name} asChild>
                          <Link
                            href={category.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="flex items-center space-x-2">
                              <category.icon className="h-5 w-5 text-blue-600" />
                              <div className="text-sm font-medium leading-none">
                                {category.name}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Latest {category.name.toLowerCase()} from top
                              brands
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Brands */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {brands.map((brand) => (
                        <NavigationMenuLink key={brand.name} asChild>
                          <Link
                            href={brand.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">
                              {brand.name}
                            </div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore {brand.name} products
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                      <NavigationMenuLink asChild>
                        <Link
                          href="/brands"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-t mt-2 pt-4"
                        >
                          <div className="text-sm font-medium leading-none text-center">
                            View All Brands
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground text-center">
                            Compare all available brands
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Other Links */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/about"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/support"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      Support
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/contact"
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                Display & Information Only
              </Badge>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
