import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/rails/active_storage/**',
      },
      {
        protocol: 'http',
        hostname: 'host.docker.internal',
        port: '3001',
        pathname: '/rails/active_storage/**',
      },
    ],
  },
};

export default nextConfig;
