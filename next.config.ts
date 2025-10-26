import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['directus-production-05c4.up.railway.app'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'directus-production-05c4.up.railway.app',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  output: 'standalone',
};

export default nextConfig;
