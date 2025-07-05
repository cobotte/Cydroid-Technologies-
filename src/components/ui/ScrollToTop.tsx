"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/utils/cn";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;

      // Calculate progress percentage (0 to 1)
      const progressPercent = totalHeight <= 0 ? 0 : Math.max(0, Math.min(1, scrollY / totalHeight));
      setProgress(progressPercent);

      // Fade in/out past 400px scroll
      setIsVisible(scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger initial calculation
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circle properties
  const radius = 20;
  const strokeWidth = 2.5;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={cn(
        "fixed bottom-6 right-6 z-[100] flex items-center justify-center w-12 h-12 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300",
        "bg-[#0a1428]/80 dark:bg-[#0a1428]/80 border border-white/10 dark:border-white/10 backdrop-blur-md",
        "shadow-glow-sm hover:shadow-glow-lg hover:scale-[1.08] hover:border-primary/45 hover:-translate-y-1 group",
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      {/* Laser Light Reflection Sweep */}
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
      </span>

      {/* Futuristic Progress Circle Track & Meter */}
      <svg className="absolute w-full h-full -rotate-90 select-none pointer-events-none" viewBox="0 0 48 48">
        {/* Track circle */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        {/* Progress meter */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          fill="none"
          stroke="var(--color-primary, #1d70f6)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-100 ease-out"
        />
      </svg>

      {/* Upward Navigation Arrow */}
      <ArrowUp className="w-4 h-4 text-foreground dark:text-foreground transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}
