import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/mobile-optimizations.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import { SearchProvider } from "@/contexts/SearchContext";
import { ModalProvider } from "@/components/modals/ModalProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MountPole - Global Technology Distributor",
  description:
    "Your trusted partner in technology distribution. Connecting the world with premium brands like Apple, Samsung, Xiaomi, and more. Wholesale pricing and authentic products worldwide.",
  keywords:
    "technology distributor, wholesale electronics, Apple distributor, Samsung distributor, Xiaomi distributor, global distribution, wholesale pricing, authentic products",
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MountPole",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
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
