"use client";

import { useEffect, useRef } from "react";

/**
 * useAnimation Hook
 *
 * Facilitates safe cleanup and orchestration of third-party animation libraries
 * (such as GSAP timelines, Framer Motion instances, or custom requestAnimationFrame loops).
 *
 * Automatically triggers the registered garbage collection function on unmount
 * to prevent frame rate leaks or stale ScrollTriggers.
 *
 * @param cleanupCallback - Optional cleanup function called when the component unmounts.
 * @returns Ref object for custom tracking if required.
 */
export function useAnimation(cleanupCallback?: () => void) {
  const cleanupRef = useRef<(() => void) | undefined>(cleanupCallback);

  // Keep cleanupCallback reference up to date
  useEffect(() => {
    cleanupRef.current = cleanupCallback;
  }, [cleanupCallback]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        try {
          cleanupRef.current();
        } catch (error) {
          console.error("Error during animation cleanup execution:", error);
        }
      }
    };
  }, []);

  return cleanupRef;
}
