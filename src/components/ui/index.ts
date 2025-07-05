/**
 * CYDROID TECHNOLOGIES — UI Components Barrel Export
 * Phase 2: Design System
 *
 * Import all UI components from "@/components/ui" throughout the project.
 *
 * Usage:
 *   import { Button, Card, Badge, GlassPanel } from "@/components/ui";
 */

// ── Button System ──────────────────────────────────────────────
export { Button, CTAButton, IconButton } from "./Button";

// ── Card System ────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
  FeatureCard,
  GlassCard,
  StatCard,
  PricingCard,
} from "./Card";

// ── Badge System ───────────────────────────────────────────────
export { Badge, StatusBadge } from "./Badge";

// ── Glassmorphism System ───────────────────────────────────────
export { GlassPanel, GlassSurface, GlassNavBar } from "./Glass";
export { GlassCard as GlassCardPanel } from "./Glass"; // aliased to avoid name collision

// ── Divider System ─────────────────────────────────────────────
export { Divider, SectionDivider } from "./Divider";


// ── Schema Markup ──────────────────────────────────────────────
export {
  SchemaMarkup,
  cydroidOrganizationSchema,
  cydroidLocalBusinessSchema,
  cydroidWebsiteSchema,
  generateServicesSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "./schema-markup";

// ── Theme System ───────────────────────────────────────────────
export { ThemeProvider } from "./theme-provider";

// ── Anti-Bot CAPTCHA System ────────────────────────────────────
export { Turnstile } from "./Turnstile";
