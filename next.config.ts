import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable static optimization globally
  experimental: {
    dynamicIO: true,
  },
  // Force dynamic rendering for all pages
  output: 'standalone',
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
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
      },
      {
        protocol: "https",
        hostname: "fdn2.gsmarena.com",
      },
      {
        protocol: "https",
        hostname: "script.google.com",
      },
      {
        protocol: "https",
        hostname: "www.actualidadiphone.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "http",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "assets.sangeethamobiles.com",
      },
      {
        protocol: "https",
        hostname: "media-ik.croma.com",
      },
      {
        protocol: "https",
        hostname: "media.tatacroma.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn2.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
      },
      {
        protocol: "https",
        hostname: "webobjects2.cdw.com",
      },
      {
        protocol: "https",
        hostname: "cdn-reichelt.de",
      },
    ],
  },
};

export default nextConfig;
