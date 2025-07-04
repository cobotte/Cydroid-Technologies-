/**
 * CYDROID TECHNOLOGIES — Global TypeScript Type Definitions
 *
 * Centralized shared interfaces, enums, and utility types for
 * the entire application. Import from "@/types" throughout the project.
 */

export * from "./design";

// ==========================================
// NAVIGATION & ROUTING
// ==========================================

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  external?: boolean;
  children?: NavItem[];
}

export interface RouteConfig {
  path: string;
  label: string;
  description: string;
  priority: number;
  changeFrequency:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
}

// ==========================================
// SERVICES & PRODUCTS
// ==========================================

export type ServiceCategory =
  | "web-development"
  | "cybersecurity"
  | "maintenance"
  | "seo-marketing"
  | "ai-automation"
  | "saas"
  | "cloud";

export interface Service {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription?: string;
  features?: string[];
  icon?: string;
  featured?: boolean;
}

// ==========================================
// PORTFOLIO
// ==========================================

export type ProjectStatus = "live" | "in-progress" | "archived";
export type ProjectType =
  | "website"
  | "webapp"
  | "mobile"
  | "api"
  | "security-audit";

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  client?: string;
  type: ProjectType;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  featured?: boolean;
  completedAt?: string;
}

// ==========================================
// PRICING
// ==========================================

export type BillingCycle = "monthly" | "annually";
export type PlanTier = "starter" | "professional" | "enterprise";

export interface PricingPlan {
  id: string;
  name: string;
  tier: PlanTier;
  description: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  features: string[];
  limitations?: string[];
  highlighted?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

// ==========================================
// FORMS & CONTACT
// ==========================================

export type InquiryType =
  | "general"
  | "web-development"
  | "cybersecurity"
  | "seo-marketing"
  | "demo-request"
  | "support"
  | "partnership";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType: InquiryType;
  message: string;
  budget?: string;
  timeline?: string;
  consent: boolean;
}

export interface DemoBookingData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  goals?: string;
  consent: boolean;
}

// ==========================================
// API RESPONSES
// ==========================================

export type ApiStatus = "success" | "error" | "loading";

export interface ApiResponse<T = unknown> {
  status: ApiStatus;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==========================================
// SEO & METADATA
// ==========================================

export interface PageSeoConfig {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
}

// ==========================================
// THEME
// ==========================================

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

// ==========================================
// UI COMPONENT UTILITIES
// ==========================================

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ColorScheme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "destructive"
  | "info";

export interface BaseComponentProps {
  className?: string;
  id?: string;
  "aria-label"?: string;
}

// ==========================================
// ANIMATION
// ==========================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number;
}

export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "stagger";

// ==========================================
// FUTURE EXPANSION STUBS
// ==========================================

/** Placeholder for future SaaS user model */
export interface SaaSUser {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  plan?: PlanTier;
  createdAt: string;
}

/** Placeholder for future Cloud service config */
export interface CloudServiceConfig {
  provider: "cloudflare" | "aws" | "gcp" | "azure";
  region?: string;
  projectId?: string;
}
