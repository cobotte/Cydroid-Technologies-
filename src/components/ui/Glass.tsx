/**
 * CYDROID TECHNOLOGIES — Glassmorphism Component System
 * Phase 2: Design System
 *
 * Reusable glass-effect containers. Design principles:
 * — Subtle transparency > heavy blur
 * — Clean border treatment
 * — No rainbow gradients, no fake plastic effects
 * — Feels expensive, not trendy
 *
 * Exports:
 *   GlassPanel    — Flexible glass container
 *   GlassSurface  — Inline glass span/div
 *   GlassNavBar   — Sticky navigation glass surface
 *   GlassCard     — Composition (Glass + Card semantics)
 */

import * as React from "react";
import { cn } from "@/utils/cn";

// ================================================================
// GLASS PANEL — full-featured glass container
// ================================================================

interface GlassPanelProps {
  /** Blur + opacity intensity */
  intensity?: "subtle" | "default" | "strong";
  /** Border radius size */
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Enable shadow */
  shadow?: "none" | "sm" | "md" | "float";
  /** Enable internal padding */
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  /** Primary border accent on left side */
  accent?: boolean;
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  id?: string;
  "aria-label"?: string;
  style?: React.CSSProperties;
}

const INTENSITY_CLASS = {
  subtle: "glass-subtle",
  default: "glass",
  strong: "glass-strong",
} as const;

const ROUNDED_CLASS = {
  none: "rounded-none",
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[32px]",
  full: "rounded-full",
} as const;

const SHADOW_CLASS = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
  float: "shadow-float",
} as const;

const PADDING_CLASS = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
} as const;

export const GlassPanel = React.memo(function GlassPanel({
  intensity = "default",
  rounded = "lg",
  shadow = "sm",
  padding = "md",
  accent = false,
  className,
  children,
  as: Tag = "div",
  ...rest
}: GlassPanelProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        INTENSITY_CLASS[intensity],
        ROUNDED_CLASS[rounded],
        SHADOW_CLASS[shadow],
        PADDING_CLASS[padding],
        accent && "border-l-2 border-l-primary",
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </Tag>
  );
});

// ================================================================
// GLASS SURFACE — minimal wrapper for inline glass elements
// ================================================================

interface GlassSurfaceProps {
  className?: string;
  children?: React.ReactNode;
  as?: React.ElementType;
  rounded?: "sm" | "md" | "lg" | "full";
}

export const GlassSurface = React.memo(function GlassSurface({
  className,
  children,
  as: Tag = "div",
  rounded = "md",
}: GlassSurfaceProps) {
  const roundedMap = {
    sm: "rounded-md",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
  };
  return (
    <Tag
      className={cn(
        "glass-subtle",
        roundedMap[rounded],
        "transition-all duration-200",
        className
      )}
    >
      {children}
    </Tag>
  );
});

// ================================================================
// GLASS NAVBAR — sticky header glass surface
// ================================================================

interface GlassNavBarProps {
  className?: string;
  children?: React.ReactNode;
  /** Increase glass opacity when page is scrolled */
  scrolled?: boolean;
}

export const GlassNavBar = React.memo(function GlassNavBar({
  className,
  children,
  scrolled = false,
}: GlassNavBarProps) {
  return (
    <div
      className={cn(
        "w-full",
        "border-b border-[var(--glass-border)]",
        "transition-all duration-300",
        scrolled ? "glass-strong shadow-md" : "glass-subtle",
        className
      )}
    >
      {children}
    </div>
  );
});

// ================================================================
// GLASS CARD — convenience composition (Glass + Card semantics)
// ================================================================

interface GlassCardProps {
  className?: string;
  children?: React.ReactNode;
  hoverable?: boolean;
  intensity?: "subtle" | "default" | "strong";
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const GLASS_CARD_ROUNDED = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  "2xl": "rounded-[32px]",
} as const;

export const GlassCard = React.memo(function GlassCard({
  className,
  children,
  hoverable = false,
  intensity = "default",
  rounded = "xl",
}: GlassCardProps) {
  return (
    <div
      className={cn(
        INTENSITY_CLASS[intensity],
        GLASS_CARD_ROUNDED[rounded],
        "shadow-float",
        "transition-all duration-200",
        hoverable && [
          "cursor-pointer",
          "hover:shadow-glow-sm",
          "hover:-translate-y-0.5",
        ],
        className
      )}
    >
      {children}
    </div>
  );
});
