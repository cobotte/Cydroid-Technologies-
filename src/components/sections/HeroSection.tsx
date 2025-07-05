"use client";

/**
 * CYDROID TECHNOLOGIES — Hero Section v3.0
 * Full-screen video hero with left-aligned content overlay.
 * Video: /assets/topvid.mp4 — autoplay, muted, loop, playsInline
 */

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Play, Shield, Zap, ChevronDown } from "lucide-react";
import { asset } from "@/utils/asset";

// ──────────────────────────────────────────────────────────────────
// TRUST BADGES — shown beneath the CTA
// ──────────────────────────────────────────────────────────────────

const TRUST_ITEMS = [
  { icon: Shield, label: "Security-First" },
  { icon: Zap,    label: "Fast Delivery"  },
  { icon: Play,   label: "Live Projects"  },
];

// ──────────────────────────────────────────────────────────────────
// COMPONENT
// ──────────────────────────────────────────────────────────────────

export function HeroSection() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = React.useState(false);

  // Trigger content entrance after a short delay so video can start
  React.useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Force video play on mount (needed for some mobile/Safari)
  React.useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.play().catch(() => {
      /* Autoplay may be blocked — video will still show poster */
    });
  }, []);

  return (
    <section
      id="hero"
      aria-label="Hero — Engineering Tomorrow's Digital World"
      className="relative w-full min-h-screen overflow-hidden bg-[#03070f]"
    >
      {/* ────────────────────────────────────────────────────
          BACKGROUND VIDEO LAYER
      ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Video element */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          className="absolute inset-0 w-full h-full object-cover opacity-100"
          aria-hidden="true"
        >
          <source src={asset("/assets/topvid.mp4")} type="video/mp4" />
        </video>

        {/* Left-side gradient — keeps left content readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(3,7,15,0.92) 0%, rgba(3,7,15,0.78) 35%, rgba(3,7,15,0.40) 60%, rgba(3,7,15,0.10) 100%)",
          }}
        />

        {/* Bottom gradient — smooth section transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(3,7,15,0.85) 70%, rgba(3,7,15,1) 100%)",
          }}
        />

        {/* Subtle top edge fade */}
        <div
          className="absolute top-0 left-0 right-0 h-28"
          style={{
            background:
              "linear-gradient(to bottom, rgba(3,7,15,0.6) 0%, transparent 100%)",
          }}
        />

        {/* Ambient left-side glow to blend with content */}
        <div className="absolute top-1/4 -left-32 w-[500px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* ────────────────────────────────────────────────────
          CONTENT LAYER — left-aligned
      ──────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container-custom w-full pt-24 pb-20 md:py-0">
          <div className="max-w-[600px]">

            {/* Status badge */}
            <div
              className="mb-6 md:mb-7"
              style={{
                animation: contentVisible
                  ? "hero-slide-in 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both"
                  : "none",
              }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/10 backdrop-blur-sm">
                {/* Live pulse dot */}
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">
                  CYDROID TECHNOLOGIES
                </span>
                <span className="text-[9px] text-muted-foreground font-mono uppercase tracking-widest hidden sm:block">
                  {"// Est. 2024"}
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1
              className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-5 md:mb-6"
              style={{
                fontSize: "clamp(2rem, 8vw, 4rem)",
                animation: contentVisible
                  ? "hero-slide-in 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.22s both"
                  : "none",
              }}
            >
              Engineering{" "}
              <br className="hidden sm:block" />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #1d70f6 0%, #09b2d4 60%, #4a8fff 100%)",
                }}
              >
                Modern Digital Experiences
              </span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base md:text-lg text-white/65 leading-relaxed max-w-[480px] mb-8 md:mb-10"
              style={{
                animation: contentVisible
                  ? "hero-slide-in 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.35s both"
                  : "none",
              }}
            >
              CYDROID TECHNOLOGIES delivers scalable software solutions, AI-powered
              applications, cloud infrastructure, and digital transformation services
              that help businesses innovate, automate, and grow through modern technology.
            </p>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-4 mb-10 md:mb-12"
              style={{
                animation: contentVisible
                  ? "hero-slide-in 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.46s both"
                  : "none",
              }}
            >
              {/* Primary CTA */}
              <Link href="/book-demo" id="hero-cta-primary">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2.5 h-14 px-7 rounded-2xl bg-primary text-white text-sm font-bold tracking-tight shadow-[0_0_30px_rgba(29,112,246,0.35)] hover:shadow-[0_0_45px_rgba(29,112,246,0.55)] hover:brightness-[1.08] active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Start Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </Link>

              {/* Secondary CTA */}
              <Link href="/services" id="hero-cta-secondary">
                <button
                  type="button"
                  className="group inline-flex items-center gap-2.5 h-14 px-7 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm text-white text-sm font-bold tracking-tight hover:border-white/30 hover:bg-white/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                >
                  Explore Services
                  <ArrowRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200" />
                </button>
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="flex flex-wrap items-center gap-x-5 gap-y-3"
              style={{
                animation: contentVisible
                  ? "hero-slide-in 0.65s cubic-bezier(0.34,1.56,0.64,1) 0.56s both"
                  : "none",
              }}
            >
              {TRUST_ITEMS.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 text-white/50 group"
                >
                  {i > 0 && (
                    <span className="hidden sm:inline-block w-px h-3.5 bg-white/15 mr-2" />
                  )}
                  <Icon className="w-3.5 h-3.5 text-primary/80 group-hover:text-primary transition-colors" />
                  <span className="text-[11px] font-mono tracking-wide uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────
          SCROLL INDICATOR
      ──────────────────────────────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        style={{
          animation: contentVisible
            ? "hero-fade-in 1s ease 1.2s both"
            : "none",
        }}
        aria-hidden="true"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-1.5 rounded-full bg-white/50"
            style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }}
          />
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-white/25 animate-bounce" />
      </div>

      {/* ────────────────────────────────────────────────────
          HERO-SPECIFIC KEYFRAMES (scoped inline)
      ──────────────────────────────────────────────────── */}
      <style>{`
        @keyframes hero-slide-in {
          from {
            opacity: 0;
            transform: translateY(22px) translateX(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0) translateX(0);
          }
        }
        @keyframes hero-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
