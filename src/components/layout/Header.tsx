"use client";

/**
 * CYDROID TECHNOLOGIES — Global Header / Navigation
 *
 * Features:
 * - Edge-to-edge full-width layout
 * - Transparent at top, glass blur on scroll
 * - Hides on scroll-down, reveals on scroll-up
 * - Centered nav links with hover underline animations
 * - White pill "Book Demo" CTA with mouse-reactive glow
 * - Mobile full-screen overlay menu
 *
 * SSR Safety:
 * - suppressHydrationWarning on header + dynamic style elements
 * - Scroll state initialised after mount (useEffect only)
 * - No Math.random, no dangerouslySetInnerHTML
 */

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { asset } from "@/utils/asset";

// ─── Navigation Links ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "About",     href: "/about" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing",   href: "/pricing" },
  { label: "FAQs",      href: "/faqs" },
  { label: "Book Demo", href: "/book-demo" },
  { label: "Contact",   href: "/contact" },
] as const;

// ─── Book Demo CTA Button ──────────────────────────────────────────────────────
function HeaderBookDemoButton() {
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--mx", `${e.clientX - r.left}px`);
      btn.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    btn.addEventListener("mousemove", onMove);
    return () => btn.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <Link
      ref={btnRef}
      href="/book-demo"
      id="header-book-demo-cta"
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden",
        "h-9 px-6 rounded-full",
        "text-[10px] font-bold uppercase tracking-wider",
        "bg-white text-[#03070f]",
        "shadow-[0_2px_16px_rgba(255,255,255,0.12)]",
        "hover:scale-[1.04] active:scale-[0.97]",
        "transition-transform duration-200",
        "before:absolute before:inset-0 before:pointer-events-none before:z-[1]",
        "before:bg-[radial-gradient(70px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.6),transparent)]"
      )}
    >
      Book Demo
    </Link>
  );
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────
const NavLink = React.forwardRef<
  HTMLAnchorElement,
  { href: string; isActive: boolean; children: React.ReactNode }
>(({ href, isActive, children }, ref) => (
  <Link
    ref={ref}
    href={href}
    className={cn(
      "relative px-4 h-full flex items-center",
      "text-[10px] font-bold uppercase tracking-[0.18em]",
      "transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm",
      isActive ? "text-white" : "text-white/55 hover:text-white",
      // Hover underline slide-in from center
      "after:absolute after:bottom-0 after:left-3 after:right-3 after:h-[2px]",
      "after:bg-white/35 after:scale-x-0 hover:after:scale-x-100",
      "after:transition-transform after:duration-250 after:origin-center after:rounded-full"
    )}
  >
    {children}
    {isActive && (
      <span className="absolute bottom-0 left-3 right-3 h-[2.5px] rounded-full bg-gradient-to-r from-[#00f0ff] to-[#1d70f6] shadow-[0_0_8px_rgba(0,102,255,0.6)]" />
    )}
  </Link>
));
NavLink.displayName = "NavLink";

// ─── Mobile Menu ──────────────────────────────────────────────────────────────
const MOBILE_NAV_LINKS = [
  { label: "Home",      href: "/" },
  { label: "Services",  href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing",   href: "/pricing" },
  { label: "About",     href: "/about" },
  { label: "Book Demo", href: "/book-demo" },
  { label: "Contact",   href: "/contact" },
] as const;

function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setYear(2025);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[60] lg:hidden bg-black/60 backdrop-blur-[4px] transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-[70] lg:hidden flex flex-col w-full max-w-[300px] h-full",
          "bg-[#03070f]/90 backdrop-blur-2xl border-l border-white/[0.08] shadow-2xl",
          "transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Top row */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-white/[0.06]">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3 group"
            aria-label="CYDROID TECHNOLOGIES Home"
          >
            <img
              src={asset("/assets/logo.png")}
              alt="Cydroid Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
            />
            <span className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              CYDROID
            </span>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 text-foreground hover:bg-white/[0.04] transition-colors relative after:absolute after:inset-[-4px] after:content-['']"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col flex-1 gap-1.5 px-6 pt-8 overflow-y-auto" aria-label="Mobile navigation">
          {MOBILE_NAV_LINKS.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                id={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={cn(
                  "relative w-full py-3 text-left text-sm font-semibold tracking-wide border-l-2 pl-4 transition-all duration-200",
                  isActive
                    ? "border-primary text-primary bg-primary/[0.03]"
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/50"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,102,255,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom CTAs */}
        <div className="px-6 pb-6 pt-4 flex flex-col gap-3 border-t border-white/[0.04] bg-black/10">
          <Link
            href="/book-demo"
            onClick={onClose}
            className="flex items-center justify-center h-12 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:brightness-[1.08] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(29,112,246,0.35)]"
          >
            Book Free Demo
          </Link>
          <Link
            href="/contact"
            onClick={onClose}
            className="flex items-center justify-center h-12 rounded-xl border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-white/10 active:scale-[0.98] transition-all"
          >
            Contact Team
          </Link>
        </div>

        {/* Footer note */}
        <div className="px-6 pb-6 text-center pt-4 border-t border-white/[0.04] bg-black/10">
          <p className="text-[10px] text-muted-foreground/30 tracking-widest uppercase">
            {year ? `© ${year} CYDROID TECHNOLOGIES` : "CYDROID TECHNOLOGIES"}
          </p>
        </div>
      </div>
    </>
  );
}

// ─── Main Header Component ────────────────────────────────────────────────────
export function Header() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled]   = useState(false);
  const [visible, setVisible]         = useState(true);
  const lastScrollY = useRef(0);

  // Scroll behaviour — only runs on client
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 15);
      if (y < 15) {
        setVisible(true);
      } else if (y > lastScrollY.current + 4) {
        setVisible(false);   // scrolling down → hide
      } else if (y < lastScrollY.current - 4) {
        setVisible(true);    // scrolling up → show
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setMobileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);



  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-xl focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>

      {/* ── Header bar ── */}
      <header
        role="banner"
        suppressHydrationWarning
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full h-16",
          "transition-all duration-300",
          isScrolled
            ? "bg-background/85 backdrop-blur-md border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.35)]"
            : "bg-transparent border-b border-transparent",
          visible ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="w-full h-full px-6 md:px-12 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            href="/"
            id="site-logo"
            aria-label="CYDROID TECHNOLOGIES Home"
            className="flex items-center gap-3 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-lg"
          >
            <img
              src={asset("/assets/logo.png")}
              alt="Cydroid Logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                CYDROID
              </span>
              <span className="text-[9px] font-bold tracking-[0.22em] uppercase text-muted-foreground mt-1">
                Technologies
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0 h-full" aria-label="Primary navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                isActive={link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <HeaderBookDemoButton />
          </div>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/10 text-foreground hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              {mobileOpen ? (
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
              ) : (
                <>
                  <rect x="3" y="5.5"  width="14" height="1.5" rx="0.75" fill="currentColor" />
                  <rect x="3" y="9.25" width="14" height="1.5" rx="0.75" fill="currentColor" />
                  <rect x="3" y="13"   width="14" height="1.5" rx="0.75" fill="currentColor" />
                </>
              )}
            </svg>
          </button>

        </div>
      </header>

      {/* Mobile menu overlay */}
      <MobileMenu open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </>
  );
}
