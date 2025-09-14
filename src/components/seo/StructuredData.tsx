"use client";

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone?: string;
    contactType: string;
    areaServed: string[];
    availableLanguage: string[];
  };
  sameAs?: string[];
}

export function OrganizationSchema({
  name = "MountPole",
  url = "https://mountpole.com",
  logo = "https://mountpole.com/logo.png",
  description = "Leading global technology distributor specializing in wholesale electronics, smartphones, tablets, and accessories",
  address = {
    addressCountry: "US"
  },
  contactPoint = {
    telephone: "+1-800-MOUNTPOLE",
    contactType: "sales",
    areaServed: ["US", "CA", "MX", "EU", "APAC"],
    availableLanguage: ["English", "Spanish", "French"]
  },
  sameAs = [
    "https://twitter.com/mountpole",
    "https://linkedin.com/company/mountpole",
    "https://facebook.com/mountpole"
  ]
}: OrganizationSchemaProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    address: {
      "@type": "PostalAddress",
      ...address
    },
    contactPoint: {
      "@type": "ContactPoint",
      ...contactPoint
    },
    sameAs
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface ProductSchemaProps {
  product: {
    id: string;
    name: string;
    description?: string;
    images: string[];
    brand: string;
    category: string;
    price?: number;
    availability?: string;
  };
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://mountpole.com/product/${product.id}`,
    name: product.name,
    description: product.description || `${product.brand} ${product.name} available for wholesale purchase`,
    image: product.images[0],
    brand: {
      "@type": "Brand",
      name: product.brand
    },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.price || "Contact for pricing",
      availability: product.availability || "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "MountPole",
        url: "https://mountpole.com"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbSchemaProps {
  items: Array<{ label: string; href: string }>;
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://mountpole.com${item.href}`
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface WebsiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
  potentialAction?: {
    target: string;
    queryInput: string;
  };
}

export function WebsiteSchema({
  name = "MountPole",
  url = "https://mountpole.com",
  description = "Global technology distribution platform for wholesale electronics",
  potentialAction = {
    target: "https://mountpole.com/search?q={search_term_string}",
    queryInput: "required name=search_term_string"
  }
}: WebsiteSchemaProps = {}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: potentialAction.target,
      "query-input": potentialAction.queryInput
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
