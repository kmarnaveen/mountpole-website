/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.apple.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "store.storeimages.cdn-apple.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.samsung.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vsprod.vijaysales.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.mos.cms.futurecdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fdn2.gsmarena.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i01.appmifile.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image01.realme.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "motorolauk.vtexassets.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "in.jbl.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "consumer.huawei.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.hihonor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "script.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.actualidadiphone.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "webobjects2.cdw.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
