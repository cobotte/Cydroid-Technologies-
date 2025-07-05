/**
 * CYDROID TECHNOLOGIES — Badge Component System
 * Phase 2: Design System
 *
 * A compact labeling element used for status, categories,
 * labels, and metadata indicators throughout the UI.
 *
 * Exports:
 *   Badge       — Standard badge
 *   StatusBadge — Live status indicator with animated dot
 */

import * as React from "react";
import { cn } from "@/utils/cn";
import type { BadgeVariant, BadgeSize } from "@/types/design";

// ================================================================
// VARIANT STYLES
// ================================================================

const VARIANTS: Record<BadgeVariant, string> = {
  default: "bg-muted   text-muted-foreground  border-border",
  primary: "bg-primary/10 text-primary        border-primary/20",
  secondary: "bg-secondary  text-secondary-foreground border-border",
  accent: "bg-accent/10  text-accent          border-accent/20",
  success: "bg-success/10 text-success         border-success/20",
  warning: "bg-warning/10 text-warning         border-warning/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  outline: "bg-transparent text-foreground     border-border",
  ghost: "bg-transparent text-muted-foreground border-transparent",
};

// ================================================================
// SIZE STYLES
// ================================================================

const SIZES: Record<BadgeSize, string> = {
  sm: "h-5  px-1.5 text-[10px] gap-1   rounded-md",
  md: "h-6  px-2   text-xs     gap-1   rounded-lg",
  lg: "h-7  px-2.5 text-xs     gap-1.5 rounded-lg",
};

// ================================================================
// BADGE COMPONENT
// ================================================================

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
  /** Show animated live-status dot before label */
  dot?: boolean;
  dotColor?: string;
}

export function Badge({
  variant = "default",
  size = "md",
  className,
  children,
  dot = false,
  dotColor,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "font-semibold tracking-wide",
        "border",
        "transition-colors duration-150",
        "select-none whitespace-nowrap",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            "inline-block rounded-full flex-shrink-0",
            size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
            dotColor ?? getDotColor(variant)
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

// ================================================================
// STATUS BADGE — Live indicator with pulse animation
// ================================================================

type StatusVariant = "live" | "offline" | "pending" | "maintenance";

const STATUS_CONFIG: Record<
  StatusVariant,
  { label: string; badgeVariant: BadgeVariant; pingClass: string }
> = {
  live: { label: "Live", badgeVariant: "success", pingClass: "bg-success" },
  offline: {
    label: "Offline",
    badgeVariant: "danger",
    pingClass: "bg-destructive",
  },
  pending: {
    label: "Pending",
    badgeVariant: "warning",
    pingClass: "bg-warning",
  },
  maintenance: {
    label: "Maintenance",
    badgeVariant: "default",
    pingClass: "bg-muted-foreground",
  },
};

interface StatusBadgeProps {
  status?: StatusVariant;
  customLabel?: string;
  size?: BadgeSize;
  className?: string;
}

export function StatusBadge({
  status = "live",
  customLabel,
  size = "md",
  className,
}: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <Badge variant={config.badgeVariant} size={size} className={className}>
      {/* Ping animation for live status */}
      <span className="relative flex-shrink-0 inline-flex items-center justify-center">
        <span
          className={cn(
            "absolute rounded-full opacity-75",
            size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
            config.pingClass,
            status === "live" && "animate-ping"
          )}
          aria-hidden="true"
        />
        <span
          className={cn(
            "relative rounded-full",
            size === "sm" ? "w-1.5 h-1.5" : "w-2 h-2",
            config.pingClass
          )}
          aria-hidden="true"
        />
      </span>
      <span>{customLabel ?? config.label}</span>
    </Badge>
  );
}

// ================================================================
// HELPER
// ================================================================

function getDotColor(variant: BadgeVariant): string {
  const map: Partial<Record<BadgeVariant, string>> = {
    primary: "bg-primary",
    accent: "bg-accent",
    success: "bg-success",
    warning: "bg-warning",
    danger: "bg-destructive",
    default: "bg-muted-foreground",
    secondary: "bg-muted-foreground",
  };
  return map[variant] ?? "bg-muted-foreground";
}
