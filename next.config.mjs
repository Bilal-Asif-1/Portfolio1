/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  allowedDevOrigins: ["192.168.1.5"],
  images: {
    qualities: [65, 75, 85]
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"]
  }
};

export default nextConfig;
