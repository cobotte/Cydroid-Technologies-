/**
 * CYDROID TECHNOLOGIES — Pricing Preview Section (Homepage)
 *
 * Minimal, clean, conversion-focused preview of pricing packages.
 * Displays 3 primary cards (Starter, Professional, Enterprise) with quick CTAs.
 */

"use client";

import Link from "next/link";
import { Check, ArrowRight, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

interface PreviewPackage {
  id: string;
  name: string;
  price: string;
  tag: string;
  desc: string;
  highlighted: boolean;
  features: string[];
}

const PREVIEW_PACKAGES: PreviewPackage[] = [
  {
    id: "starter",
    name: "Starter",
    tag: "Ideal for startups & small businesses",
    price: "$799",
    desc: "Professional platforms for startups, landing pages, and small businesses looking to establish a secure digital presence.",
    highlighted: false,
    features: [
      "Up to 5 Pages",
      "Mobile Responsive",
      "SSL Security Setup",
      "Basic SEO Setup",
      "Contact Form",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tag: "Most Popular",
    price: "$2,499",
    desc: "Designed for growing businesses requiring bespoke integrations, content management, and robust security.",
    highlighted: true,
    features: [
      "Up to 15 Pages",
      "Custom UI/UX Design",
      "CMS Integration",
      "Advanced SEO & Schemas",
      "Security Hardening",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tag: "Enterprise Grade",
    price: "$7,500",
    desc: "Comprehensive custom solution tailored for corporate software platforms, integrations, and high performance.",
    highlighted: false,
    features: [
      "Bespoke Development",
      "Multi-Third-Party APIs",
      "Cloud Infrastructure Planning",
      "Continuous Security Scans",
      "Priority SLA Support",
    ],
  },
];

export function PricingSection() {
  return (
    <section
      id="pricing-showcase"
      className="relative w-full py-28 bg-[#03070f]/75 z-30 overflow-hidden"
    >
      {/* Decorative vectors */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.003)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Cyber glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[125px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-20"
          badge={{ icon: <Zap className="w-3.5 h-3.5" />, label: "Pricing Plans" }}
          heading={<>Transparent <GradText>Pricing</GradText></>}
          sub="Select the best solution for your current stage of growth. Explore detailed plans or schedule a consultation with our team."
        />

        {/* ─── 3 MINIMAL PRICING CARDS GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch mb-20 max-w-5xl mx-auto pt-4">
          {PREVIEW_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border flex flex-col justify-between relative transition-all duration-500 p-6 md:p-8 group ${
                pkg.highlighted
                  ? "border-primary/70 bg-[#061021]/80 shadow-[0_0_30px_rgba(9,178,214,0.15)] lg:scale-[1.05] lg:-translate-y-3 z-10 hover:lg:-translate-y-4 hover:scale-[1.06] hover:shadow-[0_0_40px_rgba(9,178,214,0.25)] hover:border-primary"
                  : "border-border/40 bg-card/45 hover:bg-card/75 hover:border-primary/40 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-glow-sm"
              }`}
            >
              {/* Glass reflection sweep container to keep it within the card boundaries */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
              </div>

              {/* Replace badge on Business card */}
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[9px] font-mono font-bold bg-primary text-foreground uppercase tracking-widest border border-primary/30 shadow-glow whitespace-nowrap">
                  ⭐ MOST CHOSEN BY GROWING BUSINESSES
                </span>
              )}

              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                  {pkg.tag}
                </span>
                <h3 className="text-xl font-bold text-foreground font-display mb-3">
                  {pkg.name}
                </h3>

                {/* Price Display */}
                <div className="mb-4">
                  {pkg.price !== "Custom Quote" ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5">
                        Starting From
                      </span>
                      <span className="text-3xl md:text-4xl font-extrabold text-foreground font-display tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-wider mb-0.5 opacity-0">
                        &nbsp;
                      </span>
                      <span className="text-3xl md:text-4xl font-extrabold text-foreground font-display tracking-tight">
                        Custom Quote
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {pkg.desc}
                </p>

                <div className="h-px bg-border/20 my-6" />

                {/* Features list */}
                <ul className="space-y-3 text-xs text-muted-foreground mb-4">
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} className="flex gap-2.5 items-start">
                      <div className="w-4 h-4 rounded-md border border-primary/20 bg-primary/5 flex items-center justify-center text-primary mt-0.5 flex-shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ─── REDESIGNED CTA SECTION ─── */}
        <div className="relative mt-24 max-w-4xl mx-auto z-20">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl pointer-events-none" />
          
          <div className="relative overflow-hidden rounded-3xl border border-border/40 bg-[#050c18]/65 backdrop-blur-xl p-8 md:p-12 text-center shadow-float">
            {/* Robot-inspired visual accents (Corner brackets) */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/30 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/30 rounded-br-3xl" />

            <div className="relative z-10">
              <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mb-3">
                {"// CONFIGURATION DESK TIER"}
              </span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-display tracking-tight mb-4">
                Not Sure Which Package Fits Your Business?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground/90 max-w-2xl mx-auto mb-10 leading-relaxed">
                Let&apos;s discuss your goals and recommend the most effective solution for your business, budget, and growth strategy.
              </p>

              {/* Action buttons row */}
              <div className="flex flex-wrap gap-6 justify-center items-center mb-10">
                {/* Explore Full Pricing (Large, premium, glassmorphism, animated arrow, hover glow) */}
                <Link href="/pricing" className="group/pricing-btn">
                  <Button
                    variant="outline"
                    size="xl"
                    className="relative px-8 py-4 bg-white/5 border-white/10 hover:border-primary/40 text-foreground font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(9,178,214,0.1)] inline-flex items-center gap-2"
                  >
                    <span>Explore Full Pricing</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/pricing-btn:translate-x-1" />
                  </Button>
                </Link>

                {/* Book Free Consultation (Primary Conversion Button, pulse, glow) */}
                <Link href="/book-demo">
                  <Button
                    size="xl"
                    className="relative px-8 py-4 bg-primary hover:bg-primary-hover text-foreground font-bold rounded-xl transition-all duration-300 hover:scale-105 shadow-glow animate-pulse-slow border border-primary/30 hover:shadow-glow-lg inline-flex items-center gap-2"
                  >
                    <span>Book Free Consultation</span>
                    <Zap className="w-4 h-4 text-accent" />
                  </Button>
                </Link>
              </div>

              {/* Trust Elements */}
              <div className="h-px bg-border/20 max-w-xl mx-auto mb-6" />
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-left max-w-2xl mx-auto text-[10px] font-mono text-muted-foreground/80 pl-6 sm:pl-0">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Security-First Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>No Hidden Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>Free Project Consultation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
