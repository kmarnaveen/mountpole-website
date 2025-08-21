import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "vsprod.vijaysales.com",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i01.appmifile.com",
      },
      {
        protocol: "https",
        hostname: "image01.realme.net",
      },
      {
        protocol: "https",
        hostname: "motorolauk.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "in.jbl.com",
      },
      {
        protocol: "https",
        hostname: "consumer.huawei.com",
      },
      {
        protocol: "https",
        hostname: "www.hihonor.com",
      },
    ],
  },
};

export default nextConfig;
