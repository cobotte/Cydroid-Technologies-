/**
 * CYDROID TECHNOLOGIES — Application Constants
 *
 * Centralized, single source of truth for all hard-coded values
 * used throughout the application. Never scatter magic strings or
 * numbers across the codebase — import from here instead.
 */

import type { NavItem, RouteConfig, ServiceCategory } from "@/types";

// ==========================================
// SITE METADATA
// ==========================================

export const SITE_CONFIG = {
  name: "CYDROID TECHNOLOGIES",
  tagline: "Engineering Tomorrow's Digital World",
  description:
    "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "https://cydroidtech.com",
  email: "contact@cydroidtech.com",
  twitter: "@cydroidtech",
  github: "https://github.com/cydroid-technologies",
  locale: "en_US",
  founded: 2024,
} as const;

// ==========================================
// NAVIGATION
// ==========================================

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    description: "Web dev, cybersecurity, SEO & more",
  },
  {
    label: "Portfolio",
    href: "/portfolio",
    description: "Our client success stories",
  },
  {
    label: "Pricing",
    href: "/pricing",
    description: "Transparent, scalable plans",
  },
  {
    label: "About",
    href: "/about",
    description: "Our mission, team and values",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Get in touch",
  },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Web Development", href: "/services#web-development" },
    { label: "Cybersecurity", href: "/services#cybersecurity" },
    { label: "SEO & Marketing", href: "/services#seo-marketing" },
    { label: "Maintenance & Support", href: "/services#maintenance" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
} as const;

// ==========================================
// ROUTE CONFIGURATION (for sitemap & SEO)
// ==========================================

export const ROUTES: RouteConfig[] = [
  {
    path: "/",
    label: "Home",
    description: "CYDROID TECHNOLOGIES homepage",
    priority: 1.0,
    changeFrequency: "daily",
  },
  {
    path: "/about",
    label: "About",
    description: "About CYDROID TECHNOLOGIES",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  {
    path: "/services",
    label: "Services",
    description: "Our services",
    priority: 0.9,
    changeFrequency: "weekly",
  },
  {
    path: "/portfolio",
    label: "Portfolio",
    description: "Our work",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/pricing",
    label: "Pricing",
    description: "Pricing plans",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/book-demo",
    label: "Book Demo",
    description: "Schedule a demo",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/contact",
    label: "Contact",
    description: "Contact us",
    priority: 0.6,
    changeFrequency: "monthly",
  },
  {
    path: "/privacy-policy",
    label: "Privacy Policy",
    description: "Privacy policy",
    priority: 0.3,
    changeFrequency: "yearly",
  },
  {
    path: "/terms-and-conditions",
    label: "Terms & Conditions",
    description: "Terms of service",
    priority: 0.3,
    changeFrequency: "yearly",
  },
];

// ==========================================
// SERVICE CATEGORIES
// ==========================================

export const SERVICE_CATEGORIES: Record<
  ServiceCategory,
  { label: string; description: string }
> = {
  "web-development": {
    label: "Web Development",
    description:
      "Custom web platforms, landing pages, and enterprise applications.",
  },
  cybersecurity: {
    label: "Cybersecurity",
    description:
      "Penetration testing, security audits, and hardening services.",
  },
  maintenance: {
    label: "Maintenance & Support",
    description: "Ongoing uptime monitoring, updates, and priority support.",
  },
  "seo-marketing": {
    label: "SEO & Marketing",
    description:
      "Technical SEO, content strategy, and digital growth campaigns.",
  },
  "ai-automation": {
    label: "AI Automation",
    description: "Custom AI workflows, integrations, and intelligent agents.",
  },
  saas: {
    label: "SaaS Products",
    description: "Productized software solutions built for scale.",
  },
  cloud: {
    label: "Cloud Services",
    description:
      "Cloud architecture, deployment pipelines, and infrastructure.",
  },
};

// ==========================================
// RATE LIMITING
// ==========================================

export const RATE_LIMIT = {
  maxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS ?? 100),
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS ?? 60_000),
} as const;

// ==========================================
// ANIMATION DEFAULTS
// ==========================================

export const ANIMATION_DEFAULTS = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    xslow: 800,
  },
  ease: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    elastic: "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
    in: "cubic-bezier(0.4, 0, 1, 1)",
    out: "cubic-bezier(0, 0, 0.2, 1)",
  },
} as const;

// ==========================================
// Z-INDEX LAYERS
// ==========================================

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

// ==========================================
// BREAKPOINTS (mirrors globals.css)
// ==========================================

export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;

// ==========================================
// KNOWN BAD BOTS (mirrors middleware.ts)
// ==========================================

export const BLOCKED_BOTS = [
  "semrushbot",
  "mj12bot",
  "ahrefsbot",
  "dotbot",
  "rogerbot",
] as const;
