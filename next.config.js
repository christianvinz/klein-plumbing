/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Image optimization for Storyblok
  images: {
    domains: ['a.storyblok.com', 'a2.storyblok.com'],
  },

  // Redirect old waterheater URL to new water-heater-services URL
  async redirects() {
    return [
      {
        source: '/services/waterheater',
        destination: '/services/water-heater-services',
        permanent: true, // 301 redirect - tells search engines this is permanent
      },
    ];
  },

  // ISR caching for Storyblok pages
  async headers() {
    return [
      {
        source: '/services/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
