import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import { SearchProvider } from "@/contexts/SearchContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MountPole - Global Technology Distributor",
  description:
    "Your trusted partner in technology distribution. Connecting the world with premium brands like Apple, Samsung, Xiaomi, and more. Wholesale pricing and authentic products worldwide.",
  keywords:
    "technology distributor, wholesale electronics, Apple distributor, Samsung distributor, Xiaomi distributor, global distribution, wholesale pricing, authentic products",
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
          <Header />
          <main className="pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileDock />
        </SearchProvider>
      </body>
    </html>
  );
}
