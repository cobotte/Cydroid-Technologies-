/**
 * CYDROID TECHNOLOGIES — Section Wrapper Component
 *
 * Reusable structural wrapper for full-width page sections.
 * Provides consistent vertical padding, container centering,
 * and semantic landmark support.
 *
 * This is the base building block for ALL content sections
 * in Phase 2+ (Hero, Services, Portfolio, etc.).
 *
 * Usage:
 *   <SectionWrapper id="services" aria-labelledby="services-heading">
 *     <h2 id="services-heading">Our Services</h2>
 *     ...content...
 *   </SectionWrapper>
 *
 * @phase 1 — Structural placeholder.
 * @phase 2 — Wire to scroll-triggered GSAP entrance animations.
 */

import { cn } from "@/utils/cn";
import type { BaseComponentProps } from "@/types";

interface SectionWrapperProps extends BaseComponentProps {
  children: React.ReactNode;
  /** Additional container classes (e.g. background overrides) */
  containerClassName?: string;
  /** Set to "article" or "aside" for sections with non-landmark content */
  as?: "section" | "article" | "aside" | "div";
  /** Removes the default container max-width and padding (for full-bleed sections) */
  fullBleed?: boolean;
}

export function SectionWrapper({
  children,
  className,
  containerClassName,
  id,
  as: Tag = "section",
  fullBleed = false,
  "aria-label": ariaLabel,
}: SectionWrapperProps) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn("py-16 md:py-24", className)}
    >
      {fullBleed ? (
        children
      ) : (
        <div className={cn("container-custom", containerClassName)}>
          {children}
        </div>
      )}
    </Tag>
  );
}
