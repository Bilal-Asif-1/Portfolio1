/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    qualities: [65, 75]
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"]
  }
};

export default nextConfig;
