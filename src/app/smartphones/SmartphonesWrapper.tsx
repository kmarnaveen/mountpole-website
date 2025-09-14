import { Metadata } from "next";
import SmartphonesClient from "./page";

export const metadata: Metadata = {
  title: "Wholesale Smartphones | Bulk iPhone, Samsung, Google Devices",
  description: "Buy smartphones in bulk at wholesale prices. Authorized distributor of iPhone 16, Samsung Galaxy S25, Google Pixel 9. Enterprise pricing and fast global shipping.",
  keywords: "wholesale smartphones, bulk iphones, samsung wholesale, business phones, enterprise mobile devices, iphone distributor, android phones bulk, smartphone wholesale prices",
  openGraph: {
    title: "Wholesale Smartphones | Bulk iPhone, Samsung, Google Devices",
    description: "Buy smartphones in bulk at wholesale prices. Authorized distributor of iPhone 16, Samsung Galaxy S25, Google Pixel 9.",
    images: [
      {
        url: "/og-smartphones.jpg",
        width: 1200,
        height: 630,
        alt: "Wholesale Smartphones Collection",
      }
    ],
  },
  twitter: {
    title: "Wholesale Smartphones | Bulk iPhone, Samsung, Google Devices",
    description: "Buy smartphones in bulk at wholesale prices. Enterprise pricing and fast shipping.",
    images: ["/twitter-smartphones.jpg"],
  },
  alternates: {
    canonical: "https://mountpole.com/smartphones",
  },
};

export default function SmartphonesPage() {
  return <SmartphonesClient />;
}
