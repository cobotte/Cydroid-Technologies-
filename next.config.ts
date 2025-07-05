/**
 * CYDROID TECHNOLOGIES — next.config.ts
 *
 * Production-ready Next.js configuration with:
 * - Static export for GitHub Pages deployment
 * - Image optimization domains
 * - Security headers (additional layer beyond middleware)
 * - Strict React mode
 * - TypeScript & ESLint build settings
 * - Performance optimizations
 */

import type { NextConfig } from "next";

// When deploying to GitHub Pages the site lives at:
// https://cobotte.github.io/Cydroid-Technologies-
// In production (cydroidtech.com) these should be empty strings.
const isPagesDeployment = process.env.GITHUB_PAGES === "true";
const basePath = isPagesDeployment ? "/Cydroid-Technologies-" : "";

const nextConfig: NextConfig = {
  // ==========================================
  // STATIC EXPORT — Required for GitHub Pages
  // ==========================================
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,

  // ==========================================
  // EXPOSE BASE PATH TO CLIENT CODE
  // Used by src/utils/asset.ts to prefix /public paths
  // ==========================================
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // ==========================================
  // REACT MODE
  // ==========================================
  reactStrictMode: true,

  // ==========================================
  // SECURITY — Hide server identity
  // Removes the "X-Powered-By: Next.js" response header
  // that reveals the framework to attackers.
  // ==========================================
  poweredByHeader: false,

  // ==========================================
  // PERFORMANCE
  // ==========================================
  compress: true,

  // ==========================================
  // IMAGE OPTIMIZATION
  // ==========================================
  images: {
    // Static export requires unoptimized images (GitHub Pages has no image server)
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cydroidtech.com",
        pathname: "/assets/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31_536_000,
  },

  // ==========================================
  // TYPESCRIPT
  // ==========================================
  typescript: {
    ignoreBuildErrors: false,
  },

  // ==========================================
  // EXPERIMENTAL (performance flags)
  // ==========================================
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  // NOTE: headers() and redirects() are NOT supported with output: "export".
  // Security headers should be configured at the hosting/CDN layer (Cloudflare).
};

export default nextConfig;
