/** @type {import('next').NextConfig} */
const nextConfig = {
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
