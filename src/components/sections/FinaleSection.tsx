/**
 * CYDROID TECHNOLOGIES — Finale Section
 */

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";

export function FinaleSection() {
  return (
    <section
      id="finale"
      className="relative w-full py-24 bg-[#020509] overflow-hidden"
    >
      {/* Ambient volumetric glow blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-cyan-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle cyber grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(9,178,214,0.006) 1px, transparent 1px), linear-gradient(90deg, rgba(9,178,214,0.006) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container-custom mx-auto px-6 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center text-center gap-8">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-[0.22em]">
              {"// Ready for Deployment"}
            </span>
          </div>

          {/* Hero Headline */}
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight leading-tight text-foreground">
              Ready To Build{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #0066ff 0%, #06b6d4 50%, #0066ff 100%)",
                  backgroundSize: "200% auto",
                }}
              >
                Something Secure?
              </span>
            </h2>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-muted-foreground/80 font-light max-w-xl leading-relaxed">
              Secure websites. <span className="text-foreground font-medium">Powerful growth.</span> Long-term reliability.
            </p>
            <p className="text-xs text-muted-foreground/55 font-mono max-w-lg leading-relaxed">
              Built for businesses that demand performance, security, and trust.
            </p>
          </div>

          {/* Energy Divider */}
          <div
            className="w-full max-w-sm h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, #0066ff, #06b6d4, transparent)",
            }}
          />

          {/* Body Text */}
          <p className="text-sm md:text-base text-muted-foreground/70 max-w-2xl leading-relaxed">
            CYDROID TECHNOLOGIES combines enterprise software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions to help businesses succeed in a rapidly evolving digital world.
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mt-8">
            
            {/* Card 1: Book A Demo */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-6 border border-border/30 bg-card/45 flex flex-col justify-between text-left group hover:border-primary/45 transition-colors duration-300"
            >
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest block">{"// Guided Lead Scoping"}</span>
                <h3 className="text-xl font-bold font-display text-foreground">Book A Demo</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Schedule a secure multi-step consultation wizard session with our engineering staff. Perfect for discussing custom features, security architectures, project budgets, and launch timelines.
                </p>
              </div>
              <div className="pt-6">
                <Link href="/book-demo" className="w-full block">
                  <Button
                    size="lg"
                    className="w-full shadow-glow text-xs font-bold"
                  >
                    Book A Demo
                    <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </GlassPanel>

            {/* Card 2: Contact Card */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-6 border border-border/30 bg-card/45 flex flex-col justify-between text-left group hover:border-primary/45 transition-colors duration-300"
            >
              <div className="space-y-4">
                <span className="text-[9px] font-mono text-primary uppercase tracking-widest block">{"// General Communication"}</span>
                <h3 className="text-xl font-bold font-display text-foreground">Contact Us</h3>
                
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">Phone:</span>
                    <a href="tel:+15552487631" className="hover:text-primary transition-colors">+1 (555) 248-7631</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-foreground font-semibold">Email:</span>
                    <a href="mailto:contact@cydroidtech.com" className="hover:text-primary transition-colors">contact@cydroidtech.com</a>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-foreground font-semibold">Location:</span>
                    <span className="leading-tight">123 Innovation Avenue, Business District, Bengaluru, Karnataka, India — 560001</span>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <Link href="/contact" className="w-full block">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full text-xs"
                  >
                    Contact Us
                    <svg className="w-3.5 h-3.5 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </Link>
              </div>
            </GlassPanel>

          </div>

          {/* Brand Statement */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <div
              className="w-20 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(0,102,255,0.4), transparent)",
              }}
            />
            <h3
              className="text-2xl sm:text-3xl font-display font-black tracking-tight"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(0,102,255,0.9) 40%, rgba(6,182,212,0.8) 80%, rgba(255,255,255,0.6) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Engineering Tomorrow&apos;s Digital World
            </h3>
            <p className="text-[10px] font-mono text-muted-foreground/30 tracking-[0.3em] uppercase">
              CYDROID TECHNOLOGIES // EST. 2024
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
