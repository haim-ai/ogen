/**
 * Public files under the site's base path. Locally the base is empty; on GitHub Pages the site lives under /ogen,
 * and next/image does not add the base path to string sources by itself.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const asset = (p: string) => `${BASE}${p}`;
