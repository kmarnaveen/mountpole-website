import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/mobile-optimizations.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import { SearchProvider } from "@/contexts/SearchContext";
import { ModalProvider } from "@/components/modals/ModalProvider";
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/StructuredData";

const inter = Inter({ subsets: ["latin"] });

// Force dynamic rendering for pages with interactive modals
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  metadataBase: new URL('https://mountpole.com'),
  title: {
    default: 'MountPole - Global Technology Distribution | Wholesale Electronics',
    template: '%s | MountPole'
  },
  description:
    "Leading wholesale distributor of smartphones, tablets, wearables & electronics. Enterprise pricing, bulk orders, and global shipping. Authorized dealer of Apple, Samsung, Google products.",
  keywords:
    "wholesale electronics, technology distributor, bulk smartphones, enterprise pricing, Samsung wholesale, Apple distributor, business technology, bulk orders, B2B electronics, wholesale tablets, mobile accessories, wearables distributor, enterprise mobile devices",
  authors: [{ name: 'MountPole' }],
  creator: 'MountPole',
  publisher: 'MountPole',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mountpole.com',
    siteName: 'MountPole',
    title: 'MountPole - Global Technology Distribution',
    description: 'Leading wholesale distributor of smartphones, tablets, wearables & electronics. Enterprise pricing for businesses worldwide.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MountPole - Technology Distribution',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MountPole - Global Technology Distribution',
    description: 'Leading wholesale distributor of electronics. Enterprise pricing for businesses.',
    images: ['/twitter-image.jpg'],
    creator: '@mountpole',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://mountpole.com',
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        url: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MountPole",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrganizationSchema />
        <WebsiteSchema />
        <SearchProvider>
          <ModalProvider>
            <Header />
            <main className="pb-16 md:pb-0">{children}</main>
            <Footer />
            <MobileDock />
          </ModalProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
