"use client";

/**
 * CYDROID TECHNOLOGIES — Footer Component
 * Premium REDESIGN: Edge-to-Edge Soft Modern Tech layout
 *
 * Features:
 * - Edge-to-edge full-width layout stretching from left to right
 * - Simplified, clean 3-column directory structure
 * - Outline watermark "CYDROID" in background using transparent outline text
 * - Soft ambient gradient glows and micro-grid background textures
 * - GSAP-powered staggered entrance animations on columns and bottom bar
 */

import Link from "next/link";
import { asset } from "@/utils/asset";

// ================================================================
// NAVIGATION DATA
// ================================================================

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQs", href: "/faqs" },
  { label: "Book Demo", href: "/book-demo" },
  { label: "Contact", href: "/contact" },
];

const SERVICE_LINKS = [
  { label: "Web Development", href: "/services" },
  { label: "Cybersecurity", href: "/services" },
  { label: "Maintenance & Support", href: "/services" },
  { label: "SEO & Marketing", href: "/services" },
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/cydroid-technologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/cydroid-technologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "Twitter / X",
    href: "https://x.com/cydroidtech",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ================================================================
// COMPONENT
// ================================================================

export function Footer() {
  const currentYear = 2025;

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="relative w-full bg-[#03070f] overflow-hidden border-t border-white/[0.04] mt-24"
    >
      {/* ── Vector background grids ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(29,112,246,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(29,112,246,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Massive transparent outline watermark watermark ── */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[16vw] font-black select-none pointer-events-none uppercase tracking-[0.15em] font-sans leading-none z-0"
        style={{
          WebkitTextStroke: "1px rgba(255, 255, 255, 0.008)",
          color: "transparent",
        }}
      >
        CYDROID
      </div>

      {/* Soft ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[250px] bg-primary/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      {/* Container aligning with standard page margin */}
      <div className="container-custom relative pt-16 z-10">
        
        {/* ════════════════════════════════════════════
            BALANCED 3-COLUMN GRID
        ════════════════════════════════════════════ */}
        <div className="footer-cols-grid grid grid-cols-1 md:grid-cols-3 gap-12 pb-16">
          {/* ── Column 1: Brand & Identity ── */}
          <div className="footer-col flex flex-col gap-4">
            {/* Logo */}
            <Link
              href="/"
              aria-label="CYDROID TECHNOLOGIES — Home"
              className="flex items-center gap-3.5 w-fit group"
            >
              <img
                src={asset("/assets/logo.png")}
                alt="Cydroid Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-sm font-black tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                  CYDROID
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-muted-foreground mt-1">
                  Technologies
                </span>
              </div>
            </Link>

            {/* Brand statement */}
            <p className="text-[10px] font-sans text-primary/70 font-semibold tracking-wider uppercase border-l border-primary/40 pl-3">
              Building Secure Digital Futures
            </p>

            <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-[280px]">
              We build secure, scalable, and modern digital engineering solutions for global enterprises. Designed to perform, certified to protect.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 mt-1" aria-label="Social media links">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex items-center justify-center w-8.5 h-8.5 rounded-full border border-white/10 bg-white/[0.01] text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 hover:scale-105 transition-all duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Column 2: Navigations & Services directories ── */}
          <div className="footer-col flex flex-col gap-4 lg:pl-12">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] pb-2 border-b border-white/10 text-foreground">
              Directories
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[8px] font-mono uppercase text-muted-foreground/40 tracking-widest block mb-2">{"// NAV"}</span>
                <ul className="flex flex-col gap-2.5">
                  {QUICK_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors group"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-[8px] font-mono uppercase text-muted-foreground/40 tracking-widest block mb-2">{"// SERVICES"}</span>
                <ul className="flex flex-col gap-2.5">
                  {SERVICE_LINKS.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 transition-colors group"
                      >
                        <span className="w-1 h-1 rounded-full bg-cyan-500/30 group-hover:bg-cyan-500 transition-colors flex-shrink-0" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── Column 3: Contact & Locations ── */}
          <div className="footer-col flex flex-col gap-4 lg:pl-6">
            <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.15em] pb-2 border-b border-white/10 text-foreground">
              Connect
            </h3>

            <address className="not-italic flex flex-col gap-4 text-xs text-muted-foreground/80">
              {/* Email */}
              <a
                href="mailto:contact@cydroidtech.com"
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <div className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>contact@cydroidtech.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+15552487631"
                className="group flex items-center gap-3 hover:text-primary transition-colors"
              >
                <div className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>+1 (555) 248-7631</span>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3 text-muted-foreground/60 leading-relaxed">
                <div className="mt-0.5 w-4 h-4 text-primary/40 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span>
                  123 Innovation Avenue, Business District,<br />
                  Bengaluru, Karnataka, India — 560001
                </span>
              </div>
            </address>

            {/* Coordinates / Tech signature */}
            <div className="mt-1 pt-3 border-t border-white/5 text-[9px] font-mono text-muted-foreground/35 tracking-wider select-none pointer-events-none">
              COORD // 12.9716° N, 77.5946° E
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            BOTTOM BAR & LEGAL
        ════════════════════════════════════════════ */}
        <div className="footer-bottom-bar relative">
          <div
            className="w-full h-px mb-6"
            style={{
              background: "linear-gradient(90deg, transparent 0%, rgba(29,112,246,0.15) 30%, rgba(9,178,214,0.12) 70%, transparent 100%)",
            }}
          />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 text-[10px] font-sans text-muted-foreground/45 uppercase tracking-widest text-center md:text-left select-none">
            {/* Copyright */}
            <p>
              &copy; {currentYear} CYDROID TECHNOLOGIES. All Rights Reserved.
            </p>

            {/* Legal Links */}
            <div className="flex gap-6 pointer-events-auto">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>

            {/* Built Signature */}
            <p className="text-primary/75 font-semibold">
              Built with precision. Secured by design.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
