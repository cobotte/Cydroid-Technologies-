/**
 * CYDROID TECHNOLOGIES — String & Data Formatting Utilities
 *
 * Reusable pure functions for formatting data across the application.
 * All functions are side-effect free and safe for server and client use.
 */

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a kebab-case or snake_case slug into a human-readable Title Case label.
 * Example: "web-development" → "Web Development"
 */
export function slugToLabel(slug: string): string {
  return slug
    .replace(/[-_]/g, " ")
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");
}

/**
 * Converts a string to a URL-safe slug.
 * Example: "Web Development & SEO" → "web-development-seo"
 */
export function toSlug(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncates a string to a maximum length, appending an ellipsis if trimmed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength - 3)}...`;
}

/**
 * Formats a number as a currency string.
 * @param amount - The numeric amount.
 * @param currency - ISO 4217 currency code (default: "USD").
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD"
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a Date object or ISO date string as a human-readable date.
 * Example: "June 9, 2026"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(d);
}

/**
 * Formats a Date as a relative time string (e.g. "3 days ago").
 */
export function timeAgo(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const seconds = Math.floor((Date.now() - d.getTime()) / 1000);

  const intervals: [number, string][] = [
    [31_536_000, "year"],
    [2_592_000, "month"],
    [604_800, "week"],
    [86_400, "day"],
    [3_600, "hour"],
    [60, "minute"],
    [1, "second"],
  ];

  for (const [threshold, unit] of intervals) {
    const count = Math.floor(seconds / threshold);
    if (count >= 1) {
      return `${count} ${unit}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

/**
 * Strips HTML tags from a string (basic sanitization for display purposes).
 * For proper XSS prevention on user input, use sanitizeInput from validation.ts.
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "");
}

/**
 * Generates initials from a full name string.
 * Example: "Kris Cydroid" → "KC"
 */
export function getInitials(name: string, maxChars: number = 2): string {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxChars)
    .join("");
}
