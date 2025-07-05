"use client";

/**
 * CYDROID TECHNOLOGIES — Robot Fixed Background
 * ============================================
 * A fixed, full-screen canvas that renders the robot frame sequence
 * as a background for the entire page after the hero video section.
 *
 * - position: fixed, inset: 0, z-index: 0
 * - Frame driven by window scroll position (past the hero)
 * - Scroll DOWN → frame advances (robot disassembles)
 * - Scroll UP   → frame reverses (robot reassembles)
 * - No particles, no HUD, no overlays — clean background only
 */

import * as React from "react";
import { asset } from "@/utils/asset";

const TOTAL_FRAMES = 530;
const FRAME_DIR = "/assets/robot-frames";

function frameUrl(n: number) {
  return asset(`${FRAME_DIR}/frame_${String(n).padStart(4, "0")}.jpg`);
}

// ── Frame cache using HTMLImageElement for Vercel/browser compatibility ──
class FrameCache {
  private store = new Map<number, HTMLImageElement>();
  private pending = new Set<number>();

  has(n: number) { return this.store.has(n) && this.store.get(n)!.complete; }
  get(n: number) { return this.store.get(n) ?? null; }
  isPending(n: number) { return this.pending.has(n); }

  load(n: number, onDone?: (n: number, img: HTMLImageElement) => void): void {
    if (this.store.has(n) || this.pending.has(n)) return;
    this.pending.add(n);

    const img = new Image();
    img.src = frameUrl(n);
    img.onload = () => {
      this.store.set(n, img);
      this.pending.delete(n);
      onDone?.(n, img);
    };
    img.onerror = () => {
      this.pending.delete(n);
    };
  }

  clear() {
    this.store.clear();
    this.pending.clear();
  }
}

export function RobotBackground() {
  const canvasRef         = React.useRef<HTMLCanvasElement>(null);
  const cacheRef          = React.useRef(new FrameCache());
  const rafRef            = React.useRef<number | null>(null);
  const targetFrame       = React.useRef(1);   // what scroll wants
  const renderedFrame     = React.useRef(0);   // what's on canvas
  const heroHeight        = React.useRef(0);
  const opacity           = React.useRef(0);
  const isMobileRef       = React.useRef(false);
  const scrollingRef      = React.useRef(false);
  const scrollTimerRef    = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumePreloadRef  = React.useRef<(() => void) | null>(null);
  const [, setLoaded]     = React.useState(false);

  // ── Draw a specific frame to canvas ────────────────────────────
  const draw = React.useCallback((frameN: number) => {
    // Skip rendering if the canvas is completely invisible (saves CPU/GPU load),
    // but always allow rendering the initial frame 1 so it is ready on mount.
    if (opacity.current === 0 && frameN !== 1) return;

    const canvas = canvasRef.current;
    const cache = cacheRef.current;
    if (!canvas) return;
    const bmp = cache.get(frameN);
    if (!bmp) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    // cover fill (like object-fit: cover)
    const scale = Math.max(cw / bmp.width, ch / bmp.height);
    const dx = (cw - bmp.width * scale) / 2;
    const dy = (ch - bmp.height * scale) / 2;
    
    // Optimization: Since dx/dy and scale are calculated to cover the canvas completely,
    // we do not need ctx.clearRect, saving valuable GPU rendering fill-rate.
    ctx.drawImage(bmp, dx, dy, bmp.width * scale, bmp.height * scale);
    renderedFrame.current = frameN;
  }, []);

  // ── Scroll handler — map scroll to frame index ──────────────────
  React.useEffect(() => {
    const updateTarget = () => {
      // Mark active scroll and pause background preloading to clear bandwidth
      scrollingRef.current = true;
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => {
        scrollingRef.current = false;
        // Resume background preloading queue when scroll stops
        resumePreloadRef.current?.();
      }, 300);

      const scrollY = window.scrollY;
      const hh = heroHeight.current;
      const totalH = document.body.scrollHeight - window.innerHeight;

      // Progress 0→1 across the page after the hero
      const scrollable = totalH - hh;
      const progress = scrollable <= 0 ? 0 : Math.max(0, Math.min(1, (scrollY - hh) / scrollable));

      // Map to frame 1–530
      const rawFrame = 1 + Math.round(progress * (TOTAL_FRAMES - 1));
      if (isMobileRef.current) {
        // Decimate frames on mobile (multiples of 3)
        targetFrame.current = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(rawFrame / 3) * 3));
      } else {
        targetFrame.current = rawFrame;
      }

      // Fade in once past hero
      opacity.current = scrollY > hh - 100 ? Math.min(1, (scrollY - hh + 100) / 200) : 0;
      if (canvasRef.current) {
        canvasRef.current.style.opacity = String(opacity.current);
      }

      // Prefetch nearby frames — optimized small prefetch window during scroll to avoid clogging network/CPU
      const cache = cacheRef.current;
      const t = targetFrame.current;
      const isMobile = isMobileRef.current;
      const dMax = isMobile ? 2 : 4;
      const step = isMobile ? 2 : 1;
      for (let d = 0; d <= dMax; d += step) {
        const a = t + d;
        const b = t - d;
        if (a <= TOTAL_FRAMES) cache.load(a, () => {});
        if (b >= 1) cache.load(b, () => {});
      }
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateTarget);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, []);

  // ── Resize canvas to fill viewport ─────────────────────────────
  React.useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      isMobileRef.current = window.innerWidth < 768;

      // Optimization: For background visual animations behind dark overlays,
      // a DPR of 1 provides 100% sharp rendering while reducing GPU rendering pixel overhead by 4x.
      const dpr = 1;
      canvas.width  = window.innerWidth  * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width  = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Hero is always 100vh
      heroHeight.current = window.innerHeight;
      // Redraw current frame at new size
      if (renderedFrame.current > 0) draw(renderedFrame.current);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  // ── Initial frame load and background batch loading ─────────────
  React.useEffect(() => {
    const cache = cacheRef.current;
    let mounted = true;
    let active = 0;

    const isMobile = window.innerWidth < 768;
    isMobileRef.current = isMobile;
    const MAX_CONCURRENT = isMobile ? 2 : 4; // reduced concurrent requests to keep queue responsive

    const queue: number[] = [];
    let delayPreload: ReturnType<typeof setTimeout> | null = null;

    const flush = () => {
      if (!mounted) return;
      // Pause background preloading while the user is actively scrolling
      if (scrollingRef.current) return;

      while (active < MAX_CONCURRENT && queue.length > 0) {
        const n = queue.shift()!;
        if (cache.has(n)) {
          continue;
        }
        active++;
        cache.load(n, (loaded_n, _bmp) => {
          if (!mounted) return;
          active--;
          if (loaded_n === 1) {
            draw(1);
            setLoaded(true);
          }
          flush();
        });
      }
    };

    // Assign resume callback so scroll listener can restart preloading when scroll ends
    resumePreloadRef.current = flush;

    // Load frame 1 immediately to display background instantly
    cache.load(1, (_loaded_n, _bmp) => {
      if (!mounted) return;
      draw(1);
      setLoaded(true);

      // Start preloading the rest in background after a 2s delay
      delayPreload = setTimeout(() => {
        if (!mounted) return;
        if (isMobile) {
          for (let n = 4; n <= TOTAL_FRAMES; n += 3) queue.push(n);
        } else {
          for (let n = 2; n <= TOTAL_FRAMES; n++) queue.push(n);
        }
        flush();
      }, 2000);

      // Listen to scroll to start preloading immediately if scrolled before 2s
      const onFirstScroll = () => {
        window.removeEventListener("scroll", onFirstScroll);
        if (delayPreload) {
          clearTimeout(delayPreload);
        }
        if (mounted && queue.length === 0) {
          if (isMobile) {
            for (let n = 4; n <= TOTAL_FRAMES; n += 3) queue.push(n);
          } else {
            for (let n = 2; n <= TOTAL_FRAMES; n++) queue.push(n);
          }
          flush();
        }
      };
      window.addEventListener("scroll", onFirstScroll, { passive: true });
    });

    // RAF render loop
    rafRef.current = requestAnimationFrame(function loop() {
      if (!mounted) return;
      rafRef.current = requestAnimationFrame(loop);
      const target = targetFrame.current;
      const current = renderedFrame.current;
      if (target === current) return;

      // Draw target frame instantly if it is loaded (1:1 lock to scrollbar)
      if (cache.has(target)) {
        draw(target);
      } else {
        // Fallback: search backwards from target to find the closest cached frame
        const dir = target > current ? 1 : -1;
        let closest = current;
        for (let f = target - dir; dir > 0 ? f >= current : f <= current; f -= dir) {
          if (cache.has(f)) {
            closest = f;
            break;
          }
        }
        if (closest !== current) {
          draw(closest);
        }
      }
    });

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (delayPreload) clearTimeout(delayPreload);
      cache.clear();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      id="robot-background-canvas"
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
