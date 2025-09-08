import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "res.cloudinary.com", "localhost"],
  },
};

export default nextConfig;
