"use client";

import Link from "next/link";
import {
  Check,
  Minus,
  ArrowRight,
  Circle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";

// ================================================================
// DATA SCHEMAS & PACKAGES CONFIGURATIONS
// ================================================================

interface ProjectPackage {
  id: string;
  name: string;
  price: string;
  tag: string;
  desc: string;
  ctaText: string;
  highlighted: boolean;
  features: string[];
}

const PRIMARY_PACKAGES: ProjectPackage[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$799",
    tag: "Ideal for startups & small businesses",
    desc: "Establish a clean, secure, and professional online presence with a responsive, high-performance platform.",
    ctaText: "Get Started",
    highlighted: false,
    features: [
      "Up to 5 custom-designed pages",
      "Fully responsive template",
      "Contact form integration",
      "Basic SEO setup",
      "Edge deployment configurations",
      "SSL security installation",
      "Basic security controls",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    price: "$2,499",
    tag: "Most Popular",
    desc: "Designed for growing businesses requiring bespoke integrations, content management, enhanced performance, and robust security.",
    ctaText: "Book a Consultation",
    highlighted: true,
    features: [
      "Up to 15 customized pages",
      "Custom database setups",
      "Custom CMS integration",
      "Advanced SEO & schema mapping",
      "Complete security hardening",
      "1 month free retainer support",
      "Stripe payment integration",
      "Performance speed boost",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$7,500",
    tag: "Enterprise Grade",
    desc: "Comprehensive custom solution tailored for corporate software platforms, complex integrations, custom automation, and high-performance requirements.",
    ctaText: "Request Proposal",
    highlighted: false,
    features: [
      "Bespoke development scope",
      "Headless databases",
      "Multi-third-party API connects",
      "Redundant cloud architectures",
      "Continuous vulnerability scans",
      "Dedicated priority support",
      "Advanced caching layers",
      "Custom SLA agreements",
    ],
  },
];

// Feature Comparison Data
const COMPARISON_FEATURES = [
  {
    name: "Responsive Design",
    starter: "included",
    professional: "included",
    enterprise: "included",
  },
  {
    name: "SEO Setup",
    starter: "basic",
    professional: "advanced",
    enterprise: "advanced",
  },
  {
    name: "SSL Security",
    starter: "included",
    professional: "included",
    enterprise: "included",
  },
  {
    name: "Performance Optimization",
    starter: "basic",
    professional: "advanced",
    enterprise: "ultimate",
  },
  {
    name: "CMS Integration",
    starter: "none",
    professional: "included",
    enterprise: "custom",
  },
  {
    name: "API Integration",
    starter: "none",
    professional: "basic",
    enterprise: "advanced",
  },
  {
    name: "Advanced Security & Hardening",
    starter: "none",
    professional: "included",
    enterprise: "included",
  },
  {
    name: "Custom Development",
    starter: "none",
    professional: "none",
    enterprise: "included",
  },
  {
    name: "Priority Support SLA",
    starter: "none",
    professional: "none",
    enterprise: "included",
  },
  {
    name: "Scalable Infrastructure Planning",
    starter: "none",
    professional: "none",
    enterprise: "included",
  },
];

// ================================================================
// DYNAMIC PRICING PAGE CONFIGURATIONS
// ================================================================

// ================================================================
// REUSABLE SUB-COMPONENTS
// ================================================================

function FeatureMarker({ state }: { state: string }) {
  if (state === "included" || state === "advanced" || state === "ultimate") {
    return (
      <div className="flex items-center gap-1.5 text-emerald-400">
        <Check className="w-4 h-4 stroke-[3]" />
        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold hidden sm:inline">
          {state === "included" ? "Included" : state}
        </span>
      </div>
    );
  }
  if (state === "basic" || state === "custom") {
    return (
      <div className="flex items-center gap-1.5 text-cyan-400">
        <Circle className="w-3 h-3 fill-cyan-400/20" />
        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold hidden sm:inline">
          {state}
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-1.5 text-muted-foreground/35">
      <Minus className="w-4 h-4" />
      <span className="text-[10px] font-mono uppercase tracking-wider font-semibold hidden sm:inline">
        N/A
      </span>
    </div>
  );
}

// ================================================================
// MAIN SECTION COMPONENT
// ================================================================

export function DetailedPricingSection() {


  return (
    <section
      id="pricing-showcase"
      className="relative w-full py-24 bg-[#03070f]/80 z-30 overflow-hidden"
    >
      {/* Decorative top grid lines connector */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Cyber glow elements */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[125px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative">
        {/* ─── SECTION HEADER ─── */}
        <div className="pricing-reveal-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            Pricing & Packages
          </div>
          <h2 className="text-display-md text-foreground font-display font-extrabold tracking-tight leading-tight mb-4">
            Transparent Pricing For Every Stage Of Growth
          </h2>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Flexible packages designed to help businesses launch, grow, secure,
            and maintain their digital presence.
          </p>
        </div>

        {/* ─── PROJECT PACKAGES CARDS GRID ─── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24"
        >
          {PRIMARY_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl border flex flex-col justify-between relative shadow-float transition-all duration-300 p-6 md:p-8 group hover:scale-[1.01] ${
                pkg.highlighted
                  ? "border-primary bg-primary/10 shadow-glow"
                  : "border-border/40 bg-card/45 hover:bg-card/75 hover:border-primary/45"
              }`}
            >
              {/* Highlight Recommended Badge */}
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[9px] font-mono font-bold bg-primary text-foreground uppercase tracking-widest border border-primary/30 shadow-glow-sm">
                  Recommended Choice
                </span>
              )}

              {/* Package Details */}
              <div>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest block mb-1">
                  TIER_0
                  {pkg.id === "starter" ? 1 : pkg.id === "professional" ? 2 : 3}
                </span>
                <h3 className="text-xl font-bold text-foreground font-display mb-1.5">
                  {pkg.name}
                </h3>
                <span
                  className="text-[10px] font-mono font-bold block mb-4"
                  style={{ color: pkg.highlighted ? "#1d70f6" : "#6a88a8" }}
                >
                  {pkg.tag}
                </span>

                {/* Price Display */}
                <div className="mb-6 flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl font-extrabold text-foreground font-display tracking-tight">
                    {pkg.price}
                  </span>
                  {pkg.id !== "enterprise" && (
                    <span className="text-[10px] font-mono text-muted-foreground uppercase">
                      / project scope
                    </span>
                  )}
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                  {pkg.desc}
                </p>

                <div className="h-px bg-border/20 my-6" />

                {/* Features Checklist */}
                <ul className="space-y-3 text-xs text-muted-foreground mb-8">
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

              {/* Book CTA action */}
              <Link href="/book-demo" className="w-full mt-4">
                <Button
                  variant={pkg.highlighted ? "primary" : "outline"}
                  fullWidth
                  className="shadow-glow-sm hover:scale-[1.015]"
                >
                  {pkg.ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* ─── FEATURE COMPARISON GRID TABLE ─── */}
        <div className="mb-32 hidden md:block">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block mb-2">
              Matrix Analysis
            </span>
            <h3 className="text-2xl font-bold text-foreground font-display">
              Feature Comparison Table
            </h3>
          </div>

          <GlassPanel
            intensity="default"
            rounded="lg"
            shadow="float"
            padding="none"
            className="border border-border/40 bg-card/25 overflow-hidden"
          >
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/20 bg-[#060d1a]/80 font-mono text-[9px] tracking-widest text-muted-foreground">
                  <th className="p-5 font-bold uppercase">Features Matrix</th>
                  <th className="p-5 font-bold uppercase text-center w-1/4">
                    Starter
                  </th>
                  <th className="p-5 font-bold uppercase text-center w-1/4">
                    Professional
                  </th>
                  <th className="p-5 font-bold uppercase text-center w-1/4">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_FEATURES.map((feat, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border/10 hover:bg-[#060d1a]/30 transition-colors group"
                  >
                    <td className="p-5 text-foreground font-medium group-hover:text-primary transition-colors">
                      {feat.name}
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex justify-center w-full">
                        <FeatureMarker state={feat.starter} />
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex justify-center w-full">
                        <FeatureMarker state={feat.professional} />
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <div className="inline-flex justify-center w-full">
                        <FeatureMarker state={feat.enterprise} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </GlassPanel>
        </div>



        {/* ─── CUSTOM QUOTATIONS SECTION ─── */}
        <div className="mb-32">
          <div className="relative rounded-[24px] border border-border/40 bg-card/20 overflow-hidden p-6 md:p-10">
            <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.003)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-[10px] font-mono text-primary uppercase tracking-widest block mb-2">
                  Bespoke Architecture
                </span>
                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-display mb-4">
                  Custom Quotation & Platform Architecture
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                  When off-the-shelf templates and simple CMS setups aren&apos;t enough, we build tailor-made digital platforms designed from the ground up for massive scale, performance, and bank-grade security.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>High-Throughput Databases</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Custom Application Logic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Cloud-Native Microservices</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Compliance Hardened Configs</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-border/20 pt-6 lg:pt-0 lg:pl-10 text-center lg:text-left">
                <h4 className="text-sm font-mono text-foreground font-bold uppercase mb-2">
                  Request Configuration Analysis
                </h4>
                <p className="text-xs text-muted-foreground mb-6">
                  Submit your custom technical specifications sheet, database diagrams, or feature requirements to obtain a structured pricing quotation.
                </p>
                <Link href="/book-demo">
                  <Button className="w-full shadow-glow">
                    Request Custom Quote
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>



        {/* ─── CLOSING CALL TO ACTION CAPSULE ─── */}
        <div className="relative w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 rounded-[32px] pointer-events-none" />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative overflow-hidden rounded-[32px] border border-primary/30 bg-card/25 backdrop-blur-xl p-8 md:p-16 text-center">
            {/* Corner vector decorations */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary/40 rounded-br-3xl" />

            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block mb-4">
              Consultation & Scope Assessment
            </span>
            <h3 className="text-3xl md:text-5xl font-extrabold text-foreground font-display tracking-tight leading-tight mb-4">
              Not Sure Which Package Fits Your Business?
            </h3>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              Every project is unique. Schedule a consultation and we&apos;ll
              recommend the best solution for your goals, budget, and growth
              plans.
            </p>

            <div className="flex flex-wrap gap-4 justify-center items-center">
              <Link href="/book-demo">
                <Button
                  size="xl"
                  className="shadow-glow transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
                >
                  Book A Demo
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="xl"
                  className="transition-all duration-300 hover:scale-105 hover:bg-white/5"
                >
                  Contact Us
                </Button>
              </Link>
              <Link href="/faqs">
                <Button
                  variant="ghost"
                  size="xl"
                  className="transition-all duration-300 hover:scale-105 hover:bg-white/5 text-primary font-mono font-bold"
                >
                  Read FAQs
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-[9px] font-mono text-muted-foreground/45">
              SECURE SCRATCH CONNECTIONS TIERS ENABLED // SYSMAP_V2.1
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
