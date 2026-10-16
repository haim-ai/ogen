import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static site under /ogen for GitHub Pages; otherwise the normal Next app (local dev, Vercel).
const pages = process.env.GITHUB_PAGES === "1";
const base = pages ? "/ogen" : "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, basePath: base, trailingSlash: true } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: base },
  images: { unoptimized: pages, qualities: [75, 85, 90], formats: ["image/avif", "image/webp"] },
};

export default nextConfig;
