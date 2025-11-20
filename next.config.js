/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    domains: ['a.storyblok.com', 'a2.storyblok.com'],
  },

  async redirects() {
    return [
      {
        source: '/services/waterheater',
        destination: '/services/water-heater-services',
        permanent: true,
      },
      {
        source: '/services/water-heater-repair',
        destination: '/services/water-heater-services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
