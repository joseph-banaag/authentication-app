/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  experimental: {
    serverActions: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.*",
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
