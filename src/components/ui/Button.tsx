"use client";

/**
 * CYDROID TECHNOLOGIES — Button Component System
 * Phase 2: Design System
 *
 * Exports:
 *   Button      — Standard button (all variants, all sizes, all states)
 *   CTAButton   — Full-width / large call-to-action button
 *   IconButton  — Square icon-only button
 */

import * as React from "react";
import { cn } from "@/utils/cn";
import type { ButtonVariant, ButtonSize } from "@/types/design";

// ================================================================
// BASE STYLES — shared across all variants
// ================================================================

const BASE = [
  "relative inline-flex items-center justify-center",
  "font-semibold tracking-tight",
  "transition-all duration-150",
  "cursor-pointer select-none whitespace-nowrap",
  "focus-ring-custom",
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
  "[&>svg]:flex-shrink-0",
].join(" ");

// ================================================================
// VARIANT STYLES
// ================================================================

const VARIANTS: Record<ButtonVariant, string> = {
  /** Filled blue — primary call to action */
  primary: [
    "bg-primary text-primary-foreground",
    "shadow-sm",
    "hover:brightness-[1.08] hover:shadow-glow-sm",
    "active:brightness-[0.96] active:scale-[0.985]",
  ].join(" "),

  /** Muted surface — secondary action */
  secondary: [
    "bg-secondary text-secondary-foreground",
    "border border-border",
    "hover:bg-muted hover:border-border-strong",
    "active:scale-[0.985]",
  ].join(" "),

  /** Transparent — tertiary / low-emphasis */
  ghost: [
    "bg-transparent text-foreground",
    "hover:bg-muted/70",
    "active:scale-[0.985]",
  ].join(" "),

  /** Border-only — structured but lightweight */
  outline: [
    "bg-transparent text-foreground",
    "border border-border",
    "hover:bg-muted/50 hover:border-border-strong",
    "active:scale-[0.985]",
  ].join(" "),

  /** Destructive / high-stakes action */
  danger: [
    "bg-destructive text-destructive-foreground",
    "shadow-sm",
    "hover:brightness-[1.08]",
    "active:brightness-[0.96] active:scale-[0.985]",
  ].join(" "),

  /** Inline text link */
  link: [
    "bg-transparent text-primary",
    "underline-offset-4 hover:underline",
    "h-auto p-0",
  ].join(" "),
};

// ================================================================
// SIZE STYLES
// ================================================================

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8  px-3   text-xs  rounded-lg  gap-1.5",
  md: "h-10 px-4   text-sm  rounded-xl  gap-2",
  lg: "h-12 px-6   text-sm  rounded-xl  gap-2",
  xl: "h-14 px-8   text-base rounded-2xl gap-2.5",
};

// ================================================================
// BUTTON COMPONENT
// ================================================================

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...rest}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={isLoading}
      className={cn(
        BASE,
        VARIANTS[variant],
        SIZES[size],
        (size === "sm" || size === "md") && "after:absolute after:inset-[-6px] md:after:hidden after:content-['']",
        fullWidth && "w-full",
        className
      )}
    >
      {isLoading ? (
        <>
          <Spinner sizeKey={size} />
          <span className="inline-flex items-center gap-1.5 justify-center">{children}</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          <span className="inline-flex items-center gap-1.5 justify-center">{children}</span>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
}

// ================================================================
// CTA BUTTON — Large hero / section call-to-action
// ================================================================

interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function CTAButton({
  children,
  rightIcon,
  fullWidth = false,
  className,
  disabled,
  ...rest
}: CTAButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        BASE,
        "h-14 px-8 text-base font-semibold",
        "bg-primary text-primary-foreground",
        "rounded-2xl",
        "shadow-md hover:shadow-glow",
        "hover:brightness-[1.07]",
        "active:brightness-[0.96] active:scale-[0.99]",
        "transition-all duration-200",
        "gap-2.5",
        fullWidth && "w-full justify-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-1.5 justify-center">{children}</span>
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </button>
  );
}

// ================================================================
// ICON BUTTON — Square button for single icon actions
// ================================================================

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  "aria-label": string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const ICON_SIZE_MAP: Record<ButtonSize, string> = {
  sm: "h-8  w-8  rounded-lg",
  md: "h-10 w-10 rounded-xl",
  lg: "h-12 w-12 rounded-xl",
  xl: "h-14 w-14 rounded-2xl",
};

export function IconButton({
  icon,
  variant = "ghost",
  size = "md",
  className,
  disabled,
  ...rest
}: IconButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      aria-disabled={disabled}
      className={cn(
        "relative inline-flex items-center justify-center",
        "transition-all duration-150",
        "cursor-pointer focus-ring-custom",
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none",
        VARIANTS[variant],
        ICON_SIZE_MAP[size],
        "px-0",
        (size === "sm" || size === "md") && "after:absolute after:inset-[-6px] md:after:hidden after:content-['']",
        className
      )}
    >
      <span className="flex-shrink-0">{icon}</span>
    </button>
  );
}

// ================================================================
// LOADING SPINNER
// ================================================================

const SPINNER_SIZE: Record<ButtonSize, number> = {
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
};

function Spinner({ sizeKey }: { sizeKey: ButtonSize }) {
  const px = SPINNER_SIZE[sizeKey];
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      className="animate-spin flex-shrink-0"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
        className="opacity-25"
      />
      <path
        d="M4 12a8 8 0 018-8"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        className="opacity-75"
      />
    </svg>
  );
}
