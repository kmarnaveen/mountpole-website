import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewsletterFormGlass from "@/components/forms/NewsletterFormGlass";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white hidden md:block">
      {/* Newsletter Section */}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center space-x-2 mb-3 md:mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-lg sm:text-xl font-bold">MountPole</span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Your trusted global technology distributor. We connect businesses
              worldwide with authentic products from leading brands through
              reliable wholesale partnerships and distribution excellence.
            </p>
            <div className="flex space-x-3 md:space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 w-9 sm:h-10 sm:w-10"
              >
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 w-9 sm:h-10 sm:w-10"
              >
                <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 w-9 sm:h-10 sm:w-10"
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800 h-9 w-9 sm:h-10 sm:w-10"
              >
                <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg mb-3 md:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {[
                { name: "About Us", href: "/about" },
                { name: "Products", href: "/products" },
                { name: "Brands", href: "/brands" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg mb-3 md:mb-4">
              Categories
            </h4>
            <ul className="space-y-1.5 md:space-y-2">
              {[
                { name: "Smartphones", href: "/smartphones" },
                { name: "Tablets", href: "/tablets" },
                { name: "Wearables", href: "/wearables" },
                { name: "Gaming", href: "/gaming" },
              ].map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base block py-1"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 md:space-y-4">
            <h4 className="font-semibold text-base sm:text-lg mb-3 md:mb-4">
              Contact Info
            </h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  <p>4920 Tomken Rd unit 4</p>
                  <p>Mississauga, ON L4W 1J8, Canada</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="tel:+14376613501"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base"
                >
                  +1 437 661 3501
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:info@mountpole.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all"
                >
                  info@mountpole.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0 text-center md:text-left">
            <div className="text-gray-400 text-xs sm:text-sm">
              © 2024 MountPole. All rights reserved.
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-400">
              <span>Display website only</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
