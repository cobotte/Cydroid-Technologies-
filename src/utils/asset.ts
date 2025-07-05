/**
 * CYDROID TECHNOLOGIES — Asset Path Utility
 *
 * Returns the correct absolute path for a public asset,
 * accounting for the Next.js basePath when deployed to
 * GitHub Pages at /Cydroid-Technologies-/
 *
 * Usage:
 *   import { asset } from "@/utils/asset";
 *   <img src={asset("/assets/logo.png")} />
 *   <source src={asset("/assets/topvid.mp4")} />
 */

// basePath is injected at build time by next.config.ts
// On GitHub Pages: /Cydroid-Technologies-
// On production (cydroidtech.com): ""
const BASE_PATH =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_BASE_PATH
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "";

/**
 * Prepend basePath to any absolute /public asset path.
 * @param path  Must start with "/"
 */
export function asset(path: string): string {
  if (!path.startsWith("/")) return path; // relative path — return as-is
  return `${BASE_PATH}${path}`;
}
