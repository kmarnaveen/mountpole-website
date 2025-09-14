"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { BreadcrumbSchema } from "./StructuredData";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  // Always include home as the first item
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    ...items
  ];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm text-gray-600 py-4 ${className}`}
      >
        {breadcrumbItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            )}
            
            {index === 0 && (
              <Home className="h-4 w-4 mr-2 text-gray-400" />
            )}
            
            {index === breadcrumbItems.length - 1 ? (
              // Current page - not clickable
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              // Previous pages - clickable
              <Link 
                href={item.href} 
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
