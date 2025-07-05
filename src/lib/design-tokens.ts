/**
 * CYDROID TECHNOLOGIES — Design Tokens (TypeScript Mirror)
 * Phase 2: Design System
 *
 * JavaScript-accessible mirror of all CSS design tokens.
 * Use for: Three.js colors, GSAP values, chart configs,
 * Framer Motion variants, and programmatic theme access.
 *
 * Important: These are STATIC values for programmatic use.
 * For live reactive theming, read CSS variables via getComputedStyle().
 */

// ================================================================
// PRIMITIVE COLOR SCALES
// ================================================================

export const CYDROID_BLUE = {
  50: "#eff5ff",
  100: "#dce8ff",
  200: "#c0d4ff",
  300: "#93b3fd",
  400: "#5e89fa",
  500: "#3060f5",
  600: "#1d70f6",
  700: "#1558d6",
  800: "#1645a8",
  900: "#163985",
  950: "#102352",
} as const;

export const ELECTRIC_CYAN = {
  50: "#edfcff",
  100: "#d0f7fd",
  200: "#a8effc",
  300: "#6de4f7",
  400: "#2bcde9",
  500: "#09b2d4",
  600: "#088fb2",
  700: "#0d7191",
  800: "#145b74",
  900: "#154c63",
  950: "#083040",
} as const;

export const CARBON = {
  50: "#f0f4ff",
  100: "#dde5f5",
  200: "#becceb",
  300: "#93a8cc",
  400: "#6880a7",
  500: "#4a6080",
  600: "#334057",
  700: "#1e2c42",
  800: "#111c32",
  900: "#08101e",
  950: "#03070f",
} as const;

export const GRAY = {
  50: "#f8fafc",
  100: "#f1f5f9",
  200: "#e2e8f0",
  300: "#cbd5e1",
  400: "#94a3b8",
  500: "#64748b",
  600: "#475569",
  700: "#334155",
  800: "#1e293b",
  900: "#0f172a",
  950: "#020617",
} as const;

// ================================================================
// SEMANTIC TOKENS — DARK THEME (Default)
// ================================================================

export const DARK_TOKENS = {
  // Surfaces
  background: "#03070f",
  background2: "#060d1a",
  surface1: "#060d1a",
  surface2: "#0a1428",
  surface3: "#0f1c38",
  foreground: "#eef2ff",

  // Card
  card: "#0a1428",
  cardHover: "#0f1a35",

  // Brand
  primary: "#1d70f6",
  primaryHover: "#4a8fff",
  primaryForeground: "#ffffff",

  // Secondary
  secondary: "#0f1c38",
  secondaryForeground: "#c0d0e8",

  // Accent
  accent: "#09b2d4",
  accentForeground: "#03070f",

  // Muted
  muted: "#0d1932",
  mutedForeground: "#6a88a8",

  // States
  success: "#10b981",
  warning: "#f59e0b",
  destructive: "#ef4444",
  info: "#1d70f6",

  // Borders
  border: "#1a2c4a",
  borderStrong: "#253f65",
  ring: "#1d70f6",
} as const;

// ================================================================
// SEMANTIC TOKENS — LIGHT THEME
// ================================================================

export const LIGHT_TOKENS = {
  // Surfaces
  background: "#f4f7ff",
  background2: "#eaedfa",
  surface1: "#ffffff",
  surface2: "#f0f3ff",
  surface3: "#e5eaf8",
  foreground: "#0a1628",

  // Card
  card: "#ffffff",
  cardHover: "#f8faff",

  // Brand
  primary: "#1558d6",
  primaryHover: "#1d70f6",
  primaryForeground: "#ffffff",

  // Secondary
  secondary: "#eef3ff",
  secondaryForeground: "#163985",

  // Accent
  accent: "#088fb2",
  accentForeground: "#ffffff",

  // Muted
  muted: "#eef1fb",
  mutedForeground: "#475569",

  // States
  success: "#059669",
  warning: "#d97706",
  destructive: "#dc2626",
  info: "#1558d6",

  // Borders
  border: "#cdd5e8",
  borderStrong: "#b4c0d8",
  ring: "#1558d6",
} as const;

// ================================================================
// TYPOGRAPHY SCALE
// ================================================================

export const TYPOGRAPHY = {
  fontFamily: {
    sans: "'Inter', system-ui, -apple-system, sans-serif",
    display: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
    mono: "'Geist Mono', 'JetBrains Mono', ui-monospace, monospace",
  },

  fontSize: {
    display2xl: "clamp(3.5rem, 10vw, 7rem)",
    displayXl: "clamp(3rem, 8vw, 5.5rem)",
    displayLg: "clamp(2.5rem, 6vw, 4.5rem)",
    displayMd: "clamp(2rem, 4.5vw, 3.5rem)",
    h1: "clamp(1.875rem, 4vw, 2.75rem)",
    h2: "clamp(1.5rem, 3vw, 2.25rem)",
    h3: "clamp(1.25rem, 2.5vw, 1.75rem)",
    h4: "clamp(1.125rem, 2vw, 1.375rem)",
    h5: "1.125rem",
    h6: "1rem",
    bodyLg: "1.125rem",
    bodyMd: "1rem",
    bodySm: "0.875rem",
    label: "0.6875rem",
    caption: "0.75rem",
    button: "0.875rem",
    code: "0.875em",
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  letterSpacing: {
    display2xl: "-0.050em",
    displayXl: "-0.045em",
    displayLg: "-0.040em",
    displayMd: "-0.035em",
    h1: "-0.030em",
    h2: "-0.025em",
    h3: "-0.020em",
    h4: "-0.015em",
    body: "-0.011em",
    label: "0.080em",
    button: "0.005em",
    mono: "0em",
  },

  lineHeight: {
    display2xl: 0.97,
    displayXl: 1.0,
    displayLg: 1.02,
    displayMd: 1.05,
    h1: 1.15,
    h2: 1.2,
    h3: 1.25,
    h4: 1.3,
    bodyLg: 1.75,
    bodyMd: 1.7,
    bodySm: 1.65,
    caption: 1.5,
  },
} as const;

// ================================================================
// SPACING SCALE (4px base unit)
// ================================================================

export const SPACING = {
  0: "0px",
  0.5: "2px",
  1: "4px",
  1.5: "6px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "20px",
  6: "24px",
  8: "32px",
  10: "40px",
  12: "48px",
  16: "64px",
  20: "80px",
  24: "96px",
  32: "128px",
  40: "160px",
  48: "192px",

  // Semantic aliases
  componentXs: "4px",
  componentSm: "8px",
  componentMd: "12px",
  componentLg: "16px",
  componentXl: "24px",

  sectionSm: "48px",
  sectionMd: "80px",
  sectionLg: "112px",
  sectionXl: "160px",
} as const;

// ================================================================
// BORDER RADIUS SYSTEM
// ================================================================

export const RADIUS = {
  none: "0px",
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "20px",
  "4xl": "24px",
  "5xl": "32px",
  pill: "9999px",
  full: "9999px",
} as const;

// ================================================================
// SHADOW SYSTEM
// ================================================================

export const SHADOWS = {
  dark: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.35)",
    sm: "0 1px 4px rgba(0, 0, 0, 0.45), 0 1px 2px rgba(0, 0, 0, 0.35)",
    md: "0 4px 12px rgba(0, 0, 0, 0.55), 0 2px 4px rgba(0, 0, 0, 0.40)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.65), 0 4px 8px rgba(0, 0, 0, 0.45)",
    xl: "0 16px 48px rgba(0, 0, 0, 0.75), 0 8px 16px rgba(0, 0, 0, 0.55)",
    "2xl": "0 24px 64px rgba(0, 0, 0, 0.85)",
    float: "0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 8px rgba(0, 0, 0, 0.40)",
    glow: "0 0 28px rgba(29, 112, 246, 0.30), 0 4px 16px rgba(0, 0, 0, 0.55)",
    glowSm: "0 0 14px rgba(29, 112, 246, 0.25)",
  },
  light: {
    xs: "0 1px 2px rgba(0, 0, 0, 0.04)",
    sm: "0 1px 4px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)",
    md: "0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)",
    lg: "0 8px 24px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.05)",
    xl: "0 16px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(0, 0, 0, 0.06)",
    "2xl": "0 24px 64px rgba(0, 0, 0, 0.14)",
    float: "0 8px 32px rgba(0, 0, 0, 0.10), 0 2px 8px rgba(0, 0, 0, 0.06)",
    glow: "0 0 24px rgba(21, 88, 214, 0.20), 0 4px 12px rgba(0, 0, 0, 0.08)",
    glowSm: "0 0 12px rgba(21, 88, 214, 0.15)",
  },
} as const;

// ================================================================
// ANIMATION SYSTEM
// ================================================================

export const ANIMATION = {
  // Duration (milliseconds)
  duration: {
    instant: 75,
    fast: 150,
    normal: 250,
    slow: 400,
    xslow: 600,
    lazy: 800,
  },

  // Easing (CSS cubic-bezier strings)
  easing: {
    standard: "cubic-bezier(0.4, 0, 0.2, 1)",
    decelerate: "cubic-bezier(0, 0, 0.2, 1)",
    accelerate: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    snappy: "cubic-bezier(0.25, 0, 0, 1)",
    elastic: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
  },

  // Animation Rules (Phase 2 — implementation in Phase 4)
  principles: {
    purposeful: "Every animation communicates meaning, not decoration.",
    natural: "Physics-based spring curves over linear easing.",
    respectful: "Always check prefers-reduced-motion before animating.",
    performant: "Animate transform and opacity only — never layout properties.",
    subtle: "Hover: 150ms fast. Entrance: 250–400ms normal/slow.",
    hierarchical: "Important UI = faster. Background decoration = slower.",
  },

  // Hover Interaction Rules
  hover: {
    duration: "150ms",
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    scale: "scale(1.015)       — micro-lift only for cards",
    translate: "translateY(-2px)  — lift effect for interactive elements",
    brightness: "brightness(1.08) — subtle brightness boost for buttons",
  },

  // Scroll Entrance Rules
  scroll: {
    trigger: "When element enters 15% from viewport bottom",
    duration: "400ms normal",
    stagger: "60ms between sibling elements",
    distance: "16px — translateY(16px) → translateY(0)",
    easing: "cubic-bezier(0, 0, 0.2, 1) decelerate",
  },
} as const;

// ================================================================
// Z-INDEX LAYERS
// ================================================================

export const Z_INDEX = {
  base: 0,
  raised: 10,
  dropdown: 20,
  sticky: 30,
  overlay: 40,
  header: 50,
  sidebar: 60,
  backdrop: 70,
  modal: 80,
  popover: 90,
  tooltip: 100,
} as const;

// ================================================================
// BREAKPOINTS
// ================================================================

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

export const MEDIA_QUERIES = {
  xs: "(min-width: 475px)",
  sm: "(min-width: 640px)",
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
  xl: "(min-width: 1280px)",
  "2xl": "(min-width: 1536px)",
  "3xl": "(min-width: 1920px)",
  dark: "(prefers-color-scheme: dark)",
  reducedMotion: "(prefers-reduced-motion: reduce)",
} as const;

// ================================================================
// GLASSMORPHISM SYSTEM
// ================================================================

export const GLASS = {
  dark: {
    bg: "rgba(6, 13, 26, 0.65)",
    border: "rgba(255, 255, 255, 0.06)",
    blur: "16px",
    saturate: "180%",
  },
  light: {
    bg: "rgba(255, 255, 255, 0.70)",
    border: "rgba(0, 0, 0, 0.06)",
    blur: "16px",
    saturate: "180%",
  },

  // Implementation rule: backdrop-filter: blur() saturate()
  // Keep blur under 24px for premium look — avoid heavy blur
  principle: "Subtle transparency > heavy blur. Less is more.",
} as const;

// ================================================================
// ICON SYSTEM GUIDELINES
// ================================================================

export const ICON_SYSTEM = {
  library: "lucide-react",
  style: "outlined",
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    "2xl": 32,
    "3xl": 48,
  },
  strokeWidth: {
    default: 1.75,
    bold: 2.25,
    thin: 1.25,
  },
  categories: [
    "Security & Protection",
    "Web Development & Code",
    "Analytics & Data",
    "Communication",
    "Business & Finance",
    "Cloud & Infrastructure",
    "AI & Automation",
  ],
  principle:
    "Consistent 1.75px stroke, rounded line caps, outlined style only.",
} as const;

// ================================================================
// UTILITY: Read CSS variable at runtime
// ================================================================

/**
 * Reads a CSS custom property from the document root.
 * Useful for passing theme colors to canvas/chart libraries.
 * @param variable — CSS variable name, e.g. '--primary'
 */
export function getCSSVar(variable: string): string {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variable)
    .trim();
}

// Convenience getters for common colors (runtime-safe)
export const getThemeColors = () => ({
  primary: getCSSVar("--primary"),
  accent: getCSSVar("--accent"),
  background: getCSSVar("--background"),
  foreground: getCSSVar("--foreground"),
  border: getCSSVar("--border"),
  success: getCSSVar("--success"),
  warning: getCSSVar("--warning"),
  destructive: getCSSVar("--destructive"),
});
