/**
 * CYDROID TECHNOLOGIES — useScrollPosition Hook
 *
 * Tracks the window scroll Y position and provides derived state:
 * - isScrolled: true when page has scrolled past a threshold (useful for sticky headers)
 * - isAtTop: true when scroll is at the very top
 * - scrollDirection: "up" | "down"
 *
 * Throttled via requestAnimationFrame to prevent performance issues.
 * Server-safe: always returns defaults during SSR.
 *
 * Usage:
 *   const { scrollY, isScrolled, scrollDirection } = useScrollPosition();
 */

"use client";

import * as React from "react";

interface ScrollPosition {
  scrollY: number;
  isScrolled: boolean;
  isAtTop: boolean;
  scrollDirection: "up" | "down" | null;
}

/**
 * Tracks window scroll position with direction and threshold detection.
 * @param threshold - The scroll Y value in pixels after which `isScrolled` becomes true (default: 80).
 */
export function useScrollPosition(threshold: number = 80): ScrollPosition {
  const [scrollY, setScrollY] = React.useState(0);
  const [scrollDirection, setScrollDirection] = React.useState<
    "up" | "down" | null
  >(null);
  const prevScrollY = React.useRef(0);
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);

      rafId.current = requestAnimationFrame(() => {
        const current = window.scrollY;
        setScrollDirection(current > prevScrollY.current ? "down" : "up");
        prevScrollY.current = current;
        setScrollY(current);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return {
    scrollY,
    isScrolled: scrollY > threshold,
    isAtTop: scrollY === 0,
    scrollDirection,
  };
}
