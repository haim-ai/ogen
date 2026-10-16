import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const d = new Date("2026-10-16");
  return [
    { url: "https://ngogen.co.il/", lastModified: d, priority: 1 },
    { url: "https://ngogen.co.il/accessibility", lastModified: d, priority: 0.2 },
    { url: "https://ngogen.co.il/privacy", lastModified: d, priority: 0.2 },
  ];
}
