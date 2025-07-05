/**
 * CYDROID TECHNOLOGIES — useMediaQuery Hook
 *
 * Reactively tracks whether a CSS media query string is matched.
 * Server-safe: returns false during SSR to prevent hydration mismatches.
 *
 * Usage:
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *   const isDark = useMediaQuery("(prefers-color-scheme: dark)");
 *   const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
 */

"use client";

import * as React from "react";

const emptySubscribe = () => () => {};

/**
 * Subscribes to a CSS media query and returns whether it currently matches.
 * @param query - A valid CSS media query string.
 */
export function useMediaQuery(query: string): boolean {
  const getSnapshot = React.useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  }, [query]);

  const subscribe = React.useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Returns true if the user's system prefers reduced motion.
 * Use this to conditionally skip or simplify animations for accessibility.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Returns true if the viewport width is at or below the given pixel breakpoint.
 * Uses the `emptySubscribe` pattern for SSR safety.
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`);
}

/**
 * Convenience hook: returns true once the component is mounted on the client.
 * Identical to the pattern used in ThemeToggle.tsx.
 */
export function useIsMounted(): boolean {
  return React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
