/**
 * CYDROID TECHNOLOGIES — Lib Index (Barrel Export)
 *
 * Re-exports all library modules for clean imports.
 * Usage:
 *   import { SITE_CONFIG, buildPageMetadata } from "@/lib";
 */

export * from "./constants";
export * from "./metadata";
export * from "./faqs-data";
// Selective exports from design-tokens to avoid conflicts with constants.ts
export {
  CYDROID_BLUE,
  ELECTRIC_CYAN,
  CARBON,
  GRAY,
  DARK_TOKENS,
  LIGHT_TOKENS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  ANIMATION,
  GLASS,
  ICON_SYSTEM,
  getCSSVar,
  getThemeColors,
} from "./design-tokens";
