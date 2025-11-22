import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    // For frequently changing data like new artworks
    hours: {
      stale: 300,      // 5 minutes - client cache
      revalidate: 900, // 15 minutes - server revalidation
      expire: 3600,    // 1 hour - max stale time
    },
    // For relatively stable data like artist profiles
    days: {
      stale: 3600,     // 1 hour - client cache
      revalidate: 7200, // 2 hours - server revalidation
      expire: 86400,   // 1 day - max stale time
    },
    // For very stable data like categories, tags
    weeks: {
      stale: 86400,     // 1 day - client cache
      revalidate: 172800, // 2 days - server revalidation
      expire: 604800,  // 1 week - max stale time
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
