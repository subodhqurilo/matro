import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors during production build
  },
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com", "localhost"],
  },
};

export default nextConfig;

