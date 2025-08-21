import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mountpole - Premium Electronics Store",
  description:
    "Discover the latest smartphones, tablets, wearables, and monitors from Samsung, Apple, and Google Pixel. Your trusted electronics retailer.",
  keywords:
    "smartphones, tablets, wearables, monitors, Samsung, Apple, Google Pixel, electronics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pb-16 md:pb-0">{children}</main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  );
}
