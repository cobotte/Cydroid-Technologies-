/**
 * CYDROID TECHNOLOGIES — SectionHeader
 * ====================================
 * Unified section header component used across every major section.
 *
 * Pattern (matches Contact/Communication Hub design):
 *   1. Small pill badge  — icon + monospace uppercase label
 *   2. H2 heading        — white base text, key words rendered with blue gradient
 *   3. Sub-description   — muted foreground, max-w-2xl
 *
 * Usage:
 *   <SectionHeader
 *     badge={{ icon: <Zap />, label: "Pricing Plans" }}
 *     heading={<>Transparent <GradText>Pricing</GradText></>}
 *     sub="Select the best solution for your current stage."
 *   />
 */

import * as React from "react";

// ── GradText — wraps a word in the brand blue→cyan gradient ───────
export const GradText = React.memo(function GradText({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="bg-clip-text text-transparent"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #1d70f6 0%, #09b2d4 55%, #4a8fff 100%)",
      }}
    >
      {children}
    </span>
  );
});

// ── SectionHeader props ───────────────────────────────────────────
interface SectionHeaderProps {
  /** Small pill badge above the heading */
  badge: {
    icon: React.ReactNode;
    label: string;
  };
  /** H2 heading — use <GradText> to highlight key words in blue */
  heading: React.ReactNode;
  /** Optional subtitle paragraph */
  sub?: React.ReactNode;
  /** Extra CSS classes on the wrapper */
  className?: string;
  /** Bottom margin variant — default "mb-16" */
  mb?: "mb-12" | "mb-16" | "mb-20" | "mb-24";
}

export const SectionHeader = React.memo(function SectionHeader({
  badge,
  heading,
  sub,
  className = "",
  mb = "mb-16",
}: SectionHeaderProps) {
  return (
    <div className={`text-center max-w-3xl mx-auto ${mb} ${className}`}>
      {/* ── Badge ── */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/[0.07] text-primary text-[10px] font-mono font-bold tracking-[0.22em] uppercase mb-5">
        <span className="flex-shrink-0 w-3.5 h-3.5 flex items-center justify-center">
          {badge.icon}
        </span>
        {badge.label}
      </div>

      {/* ── H2 ── */}
      <h2
        className="font-display font-extrabold text-white tracking-tight leading-[1.08] mb-5"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
      >
        {heading}
      </h2>

      {/* ── Subtitle ── */}
      {sub && (
        <p className="text-[15px] md:text-base text-white/55 max-w-2xl mx-auto leading-relaxed">
          {sub}
        </p>
      )}
    </div>
  );
});
