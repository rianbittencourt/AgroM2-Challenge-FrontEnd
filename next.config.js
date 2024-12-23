/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' as it doesn't support API routes
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;