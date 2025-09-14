import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found - 404 Error",
  description: "The page you're looking for doesn't exist. Browse our technology products or return to the homepage.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-8xl font-bold text-gray-300 mb-4">404</h1>
          <div className="w-24 h-1 bg-blue-500 mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Homepage
          </Link>

          <Link 
            href="/search" 
            className="inline-flex items-center justify-center w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Products
          </Link>

          <button 
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full text-gray-600 hover:text-gray-800 font-medium py-3 px-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link 
              href="/smartphones" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Smartphones
            </Link>
            <Link 
              href="/tablets" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Tablets
            </Link>
            <Link 
              href="/wearables" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Wearables
            </Link>
            <Link 
              href="/audio" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              Audio
            </Link>
          </div>
        </div>
      </div>

      {/* SEO-friendly structured data for 404 page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "404 Page Not Found",
            "description": "The requested page could not be found on MountPole website",
            "url": "https://mountpole.com/404",
            "isPartOf": {
              "@type": "WebSite",
              "name": "MountPole",
              "url": "https://mountpole.com"
            }
          })
        }}
      />
    </div>
  );
}
