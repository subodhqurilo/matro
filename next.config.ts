import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // <-- Add this line
  },
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com", "localhost"],
  },
};

export default nextConfig;
//hgit