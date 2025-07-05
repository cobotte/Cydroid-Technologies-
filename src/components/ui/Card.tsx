/**
 * CYDROID TECHNOLOGIES — Card Component System
 * Phase 2: Design System
 *
 * A complete card system covering all use cases:
 * - Card            Base card with sub-components
 * - FeatureCard     Icon + title + description (service cards)
 * - GlassCard       Glassmorphism surface (premium)
 * - StatCard        Metric display card (portfolio, analytics)
 * - PricingCard     Pricing tier card (Phase 3+)
 */

import * as React from "react";
import { cn } from "@/utils/cn";
import type { FeatureCardProps, StatCardProps } from "@/types/design";

// ================================================================
// BASE CARD SYSTEM
// Card + CardHeader + CardContent + CardFooter + CardTitle + CardDescription
// ================================================================

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Adds hover lift effect */
  hoverable?: boolean;
  /** Adds primary color border highlight on hover */
  accentHover?: boolean;
}

export function Card({
  className,
  hoverable = false,
  accentHover = false,
  children,
  ...rest
}: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "bg-card border border-border rounded-2xl",
        "shadow-sm",
        "transition-all duration-200",
        hoverable && [
          "cursor-pointer",
          "hover:shadow-md hover:-translate-y-0.5",
          "hover:bg-card-hover",
        ],
        accentHover && "hover:border-primary/30 hover:shadow-glow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}>
      {children}
    </div>
  );
}

export function CardContent({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className={cn("p-6 pt-4", className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={cn("flex items-center p-6 pt-0 gap-3", className)}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...rest}
      className={cn(
        "text-base font-semibold leading-tight tracking-tight text-card-foreground",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...rest}
      className={cn("text-sm text-muted-foreground leading-relaxed", className)}
    >
      {children}
    </p>
  );
}

// ================================================================
// FEATURE CARD
// Icon + title + description — for services, features, benefits
// ================================================================

export function FeatureCard({
  icon,
  title,
  description,
  badge,
  accent = false,
  className,
  onClick,
}: FeatureCardProps) {
  const isInteractive = !!onClick;

  return (
    <div
      onClick={onClick}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={
        isInteractive
          ? (e) => (e.key === "Enter" || e.key === " ") && onClick?.()
          : undefined
      }
      className={cn(
        "group relative flex flex-col gap-4 p-6",
        "bg-card border border-border rounded-2xl",
        "shadow-sm",
        "transition-all duration-200",
        isInteractive && [
          "cursor-pointer",
          "hover:-translate-y-0.5 hover:shadow-md",
          "hover:border-primary/30 hover:bg-card-hover",
          "focus-ring-custom",
        ],
        accent && "border-primary/20 bg-primary/[0.03]",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <span className="absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold tracking-widest uppercase bg-primary/10 text-primary border border-primary/20">
          {badge}
        </span>
      )}

      {/* Icon container */}
      <div
        className={cn(
          "w-11 h-11 flex items-center justify-center rounded-xl",
          "border transition-colors duration-200",
          accent
            ? "bg-primary/10 border-primary/20 text-primary"
            : "bg-surface-2 border-border text-muted-foreground group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary"
        )}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ================================================================
// GLASS CARD
// Premium glassmorphism surface — for hero overlays, featured sections
// ================================================================

interface GlassCardProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "default" | "strong";
  rounded?: "lg" | "xl" | "2xl" | "3xl";
  shadow?: boolean;
}

const GLASS_INTENSITY = {
  subtle: "glass-subtle",
  default: "glass",
  strong: "glass-strong",
} as const;

const GLASS_ROUNDED = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

export function GlassCard({
  className,
  children,
  intensity = "default",
  rounded = "2xl",
  shadow = true,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        GLASS_INTENSITY[intensity],
        GLASS_ROUNDED[rounded],
        shadow && "shadow-float",
        className
      )}
    >
      {children}
    </div>
  );
}

// ================================================================
// STAT CARD
// Single metric display — for dashboards, social proof, results
// ================================================================

export function StatCard({
  value,
  label,
  change,
  prefix = "",
  suffix = "",
  className,
}: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-6",
        "bg-card border border-border rounded-2xl shadow-sm",
        className
      )}
    >
      {/* Metric */}
      <div className="flex items-baseline gap-1">
        {prefix && (
          <span className="text-sm font-medium text-muted-foreground">
            {prefix}
          </span>
        )}
        <span className="text-3xl font-extrabold tracking-tight text-foreground leading-none">
          {value}
        </span>
        {suffix && (
          <span className="text-sm font-medium text-muted-foreground">
            {suffix}
          </span>
        )}
      </div>

      {/* Label + Change */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {change !== undefined && (
          <span
            className={cn(
              "text-xs font-semibold px-1.5 py-0.5 rounded-md",
              isPositive && "bg-success/10 text-success",
              isNegative && "bg-destructive/10 text-destructive"
            )}
          >
            {isPositive ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
}

// ================================================================
// PRICING CARD — Tier display with features list
// ================================================================

interface PricingCardProps {
  planName: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  ctaLabel?: string;
  onCTA?: () => void;
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  planName,
  price,
  period = "/ month",
  description,
  features,
  ctaLabel = "Get Started",
  onCTA,
  highlighted = false,
  badge,
  className,
}: PricingCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col p-6 gap-5",
        "border rounded-2xl shadow-sm",
        "transition-all duration-200",
        highlighted
          ? "bg-primary border-primary/40 shadow-glow text-primary-foreground"
          : "bg-card border-border hover:border-primary/30 hover:shadow-md",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2",
            "px-3 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase",
            highlighted
              ? "bg-primary-foreground text-primary"
              : "bg-primary text-primary-foreground"
          )}
        >
          {badge}
        </span>
      )}

      {/* Header */}
      <div>
        <h3
          className={cn(
            "text-sm font-bold tracking-widest uppercase mb-1",
            highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {planName}
        </h3>
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              "text-4xl font-extrabold tracking-tight",
              highlighted ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {price}
          </span>
          <span
            className={cn(
              "text-sm",
              highlighted
                ? "text-primary-foreground/70"
                : "text-muted-foreground"
            )}
          >
            {period}
          </span>
        </div>
        <p
          className={cn(
            "mt-1.5 text-sm leading-relaxed",
            highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </div>

      {/* Divider */}
      <div
        className={cn(
          "h-px",
          highlighted ? "bg-primary-foreground/20" : "bg-border"
        )}
        aria-hidden="true"
      />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <CheckIcon highlighted={highlighted} />
            <span
              className={cn(
                "text-sm leading-snug",
                highlighted
                  ? "text-primary-foreground/90"
                  : "text-muted-foreground"
              )}
            >
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCTA}
        type="button"
        className={cn(
          "mt-auto w-full h-11 rounded-xl text-sm font-semibold",
          "transition-all duration-150 focus-ring-custom",
          highlighted
            ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            : "bg-primary text-primary-foreground hover:brightness-[1.08] shadow-sm hover:shadow-glow-sm"
        )}
      >
        {ctaLabel}
      </button>
    </div>
  );
}

function CheckIcon({ highlighted }: { highlighted: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "flex-shrink-0 mt-0.5",
        highlighted ? "text-primary-foreground" : "text-primary"
      )}
    >
      <circle
        cx="8"
        cy="8"
        r="7.5"
        stroke="currentColor"
        strokeOpacity="0.25"
      />
      <path
        d="M5 8.5l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
