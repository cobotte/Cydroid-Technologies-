/**
 * CYDROID TECHNOLOGIES — Class Name Utility
 *
 * Lightweight conditional class name merger.
 * Works identically to clsx/classnames without an external dependency.
 *
 * For complex Tailwind merge scenarios (deduplication of conflicting
 * Tailwind classes), install and integrate `tailwind-merge` in Phase 2.
 *
 * Usage:
 *   cn("base-class", condition && "conditional-class", "always-class")
 *   cn("p-4", isLarge && "p-8", className)
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Merges class name values, filtering out falsy entries.
 * Accepts strings, numbers, booleans, null, undefined, and nested arrays.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "number") {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const merged = cn(...input);
      if (merged) classes.push(merged);
    }
  }

  return classes.join(" ");
}
