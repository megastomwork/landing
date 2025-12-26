import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'directus-production-05c4.up.railway.app',
      },
      {
        protocol: 'https',
        hostname:
          'megastom-frontend-git-payload-migration-ginetiks-projects.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'landing-chi-seven-29.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'xqdllfufyblkramwhlmm.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default withPayload(nextConfig);
