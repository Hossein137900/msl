import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
