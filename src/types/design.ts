/**
 * CYDROID TECHNOLOGIES — Design System Types
 * Phase 2: All variant, size, and component-level TypeScript types.
 * Import from "@/types/design" or the root "@/types".
 */

// ================================================================
// COMPONENT VARIANT TYPES
// ================================================================

/** Unified size scale used across all components */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

/** Color role variants for state-driven components */
export type ColorRole =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "info";

// ================================================================
// BUTTON
// ================================================================

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "outline"
  | "danger"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export interface IconButtonProps extends Omit<
  ButtonProps,
  "leftIcon" | "rightIcon"
> {
  icon: React.ReactNode;
  "aria-label": string;
}

export interface CTAButtonProps extends Omit<ButtonProps, "variant" | "size"> {
  href?: string;
}

// ================================================================
// CARD
// ================================================================

export type CardVariant =
  | "default"
  | "bordered"
  | "elevated"
  | "glass"
  | "feature"
  | "pricing"
  | "stat"
  | "minimal";

export interface BaseCardProps {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface FeatureCardProps extends BaseCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  accent?: boolean;
}

export interface StatCardProps extends BaseCardProps {
  value: string;
  label: string;
  change?: number;
  prefix?: string;
  suffix?: string;
}

// ================================================================
// BADGE
// ================================================================

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "danger"
  | "outline"
  | "ghost";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
  dot?: boolean;
}

// ================================================================
// GLASS
// ================================================================

export type GlassIntensity = "subtle" | "default" | "strong";

export interface GlassPanelProps {
  intensity?: GlassIntensity;
  className?: string;
  children?: React.ReactNode;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
  bordered?: boolean;
  shadow?: boolean;
}

// ================================================================
// DIVIDER
// ================================================================

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "gradient";

export interface DividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  className?: string;
  label?: string;
  spacing?: "sm" | "md" | "lg";
}

// ================================================================
// DESIGN SYSTEM TOKENS (structural)
// ================================================================

export interface ColorToken {
  value: string;
  description?: string;
}

export interface TypographyToken {
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
  fontFamily?: "sans" | "display" | "mono";
}

export interface ShadowToken {
  value: string;
  description?: string;
}

// ================================================================
// ANIMATION
// ================================================================

export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  repeat?: number | "infinite";
  yoyo?: boolean;
}

export type AnimationVariant =
  | "fadeIn"
  | "fadeInUp"
  | "fadeInDown"
  | "slideInLeft"
  | "slideInRight"
  | "scaleIn"
  | "staggerChildren";

export interface MotionProps {
  animation?: AnimationVariant;
  config?: AnimationConfig;
  reduceMotion?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// ================================================================
// ICON
// ================================================================

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface IconProps {
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
  "aria-label"?: string;
}
