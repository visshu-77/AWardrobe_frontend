import type { NextConfig } from "next";

const API_URL = process.env.API_URL ?? "http://localhost:5000/api";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // The repo root also has a lockfile (for the dev runner); pin the app root here.
  turbopack: { root: __dirname },
  images: {
    formats: ["image/avif", "image/webp"],
    // Add your image host (Cloudinary, S3, etc.) here once decided.
    remotePatterns: [],
  },
  // Proxy /api/* to Express so auth cookies stay on the site's own domain.
  async rewrites() {
    return [{ source: "/api/:path*", destination: `${API_URL}/:path*` }];
  },
};

export default nextConfig;
