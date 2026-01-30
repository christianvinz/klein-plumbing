// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "a2.storyblok.com",
      },
    ],
  },

  async redirects() {
    return [
      // 🔒 Domain canonicalization (.com → .plumbing)
      {
        source: "/:path*",
        has: [{ type: "host", value: "klein-plumbing.com" }],
        destination: "https://klein.plumbing/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.klein-plumbing.com" }],
        destination: "https://klein.plumbing/:path*",
        permanent: true,
      },

      // 🔁 Legacy service redirects
      {
        source: "/services/waterheater",
        destination: "/services/water-heater-services",
        permanent: true,
      },
      {
        source: "/services/water-heater-repair",
        destination: "/services/water-heater-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
