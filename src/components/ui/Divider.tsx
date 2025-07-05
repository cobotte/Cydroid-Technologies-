/**
 * CYDROID TECHNOLOGIES — Divider Component
 * Phase 2: Design System
 *
 * Visual section separators with multiple styles.
 * Supports horizontal/vertical orientation, gradient
 * treatment, and optional centered label.
 */

import { cn } from "@/utils/cn";

// ================================================================
// DIVIDER COMPONENT
// ================================================================

interface DividerProps {
  /** Layout direction */
  orientation?: "horizontal" | "vertical";
  /** Visual style */
  variant?: "solid" | "dashed" | "gradient" | "glow";
  /** Optional text label centered on the divider */
  label?: string;
  /** Vertical spacing around horizontal dividers */
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  /** ARIA label for screen readers */
  "aria-label"?: string;
}

const SPACING_CLASS = {
  none: "",
  sm: "my-4",
  md: "my-6",
  lg: "my-8",
  xl: "my-12",
} as const;

export function Divider({
  orientation = "horizontal",
  variant = "solid",
  label,
  spacing = "md",
  className,
  "aria-label": ariaLabel,
}: DividerProps) {
  const isVertical = orientation === "vertical";

  if (isVertical) {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        aria-label={ariaLabel}
        className={cn("w-px self-stretch bg-border", className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-label={ariaLabel ?? label}
        className={cn(
          "flex items-center gap-3",
          SPACING_CLASS[spacing],
          className
        )}
      >
        <DividerLine variant={variant} />
        <span className="flex-shrink-0 text-xs font-semibold tracking-widest uppercase text-muted-foreground whitespace-nowrap px-1">
          {label}
        </span>
        <DividerLine variant={variant} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      aria-label={ariaLabel}
      className={cn(
        "w-full h-px",
        SPACING_CLASS[spacing],
        getLineClass(variant),
        className
      )}
    />
  );
}

// ================================================================
// SECTION DIVIDER — wider decorative divider for page sections
// ================================================================

interface SectionDividerProps {
  className?: string;
  /** Fade left/right to transparent (default true) */
  gradient?: boolean;
}

export function SectionDivider({
  className,
  gradient = true,
}: SectionDividerProps) {
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={cn(
        "w-full h-px",
        gradient ? "divider-gradient" : "bg-border",
        className
      )}
    />
  );
}

// ================================================================
// HELPERS
// ================================================================

function DividerLine({
  variant,
}: {
  variant: NonNullable<DividerProps["variant"]>;
}) {
  return (
    <div
      className={cn("flex-1 h-px", getLineClass(variant))}
      aria-hidden="true"
    />
  );
}

function getLineClass(variant: NonNullable<DividerProps["variant"]>): string {
  switch (variant) {
    case "dashed":
      return "border-t border-dashed border-border bg-transparent";
    case "gradient":
      return "divider-gradient";
    case "glow":
      return "h-px bg-primary/40 shadow-[0_0_8px_rgba(29,112,246,0.4)]";
    default:
      return "bg-border";
  }
}
