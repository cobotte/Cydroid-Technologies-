"use client";

import * as React from "react";

import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  Send,
  Lock,
  User,
  Building,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";
import { Turnstile } from "@/components/ui/Turnstile";

// ================================================================
// CONSTANTS & SCHEMAS
// ================================================================

const INQUIRY_TYPES = [
  "General Inquiry",
  "Support Request",
  "Partnership Opportunity",
  "Business Question",
  "Career Opportunity",
  "Other",
];

const CONTACT_METHODS = ["Email", "Phone Call", "WhatsApp Message"];

const TRUST_BUILDERS = [
  "Security-First Development",
  "Transparent Communication",
  "Long-Term Support",
  "Reliable Delivery",
  "Professional Workflow",
  "Scalable Solutions",
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/cydroid-technologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/cydroid-technologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.44 22 12.017 22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/cydroidtech",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/CYDROIDTechnologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/cydroidtechnologies",
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

// ================================================================
// COMPONENT WORKFLOW
// ================================================================

interface ContactFormState {
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  subject: string;
  message: string;
  contactMethod: string;
  website_honey_contact: string; // Honeypot
  turnstileToken: string;
}

const INITIAL_FORM_STATE: ContactFormState = {
  fullName: "",
  companyName: "",
  emailAddress: "",
  phoneNumber: "",
  subject: "General Inquiry",
  message: "",
  contactMethod: "Email",
  website_honey_contact: "",
  turnstileToken: "",
};

export function ContactSection() {
  const [formState, setFormState] = React.useState<ContactFormState>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);
  const [referenceNum, setReferenceNum] = React.useState<string | null>(null);
  const [submitError, setSubmitError] = React.useState<string | null>(null);



  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formState.fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }
    if (!formState.emailAddress.trim()) {
      errors.emailAddress = "Email Address is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formState.emailAddress)) {
        errors.emailAddress = "Please enter a valid email address.";
      }
    }
    if (!formState.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else {
      const phoneRegex = /^[+\d\s()-.]{7,25}$/;
      if (!phoneRegex.test(formState.phoneNumber)) {
        errors.phoneNumber = "Please enter a valid phone number (min 7 digits).";
      }
    }
    if (!formState.message.trim()) {
      errors.message = "Message details are required.";
    }
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !formState.turnstileToken) {
      errors.turnstile = "Please complete security validation.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReferenceNum(data.referenceNumber);
        setSubmitSuccess(true);
        setFormState(INITIAL_FORM_STATE);
      } else {
        setSubmitError(data.error || "Failed to log inquiry. Please try again.");
      }
    } catch {
      setSubmitError("Failed to submit inquiry. Check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact-showcase"
      className="relative w-full py-28 bg-[#03070f]/90 z-30 overflow-hidden border-t border-border/20"
    >
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,112,246,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(29,112,246,0.015)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40" />

      {/* Cybernetic Radial Glow Effects */}
      <div className="absolute top-10 right-0 w-[550px] h-[550px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container-custom relative">
        {/* ─── SECTION HEADER ─── */}
        <div className="contact-reveal-header text-center max-w-3xl mx-auto mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-5">
            <Smartphone className="w-3.5 h-3.5" />
            Communication Hub
          </div>
          <h2 className="text-display-md text-foreground font-display font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Let&apos;s Start The Conversation
          </h2>
          <p className="text-body-md text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Have a project scope, cyber security audit question, support inquiry, or partnership idea? We are ready to help.
          </p>
        </div>

        {/* ─── CONTACT GRID CONTAINER ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* LEFT COLUMN: TERMINAL HUD & CHANNELS */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Terminal HUD Console */}
            <div className="p-5 rounded-2xl border border-primary/25 bg-[#050c18]/80 font-mono text-[11px] text-primary/90 space-y-3 shadow-[0_0_25px_rgba(29,112,246,0.06)] relative group overflow-hidden select-none">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/30 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/30 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/30 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/30 rounded-br-lg" />
              
              <div className="flex justify-between items-center border-b border-primary/15 pb-2">
                <span className="font-bold tracking-widest">{"// SECURE GATEWAY ACTIVE"}</span>
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-y-2 leading-relaxed">
                <span className="text-muted-foreground/60">SYS_LATENCY:</span>
                <span className="text-foreground font-bold tracking-wider">&lt; 1.4 Hours</span>
                <span className="text-muted-foreground/60">DEV_AVAL:</span>
                <span className="text-emerald-400 font-bold tracking-wide">ONLINE // ACTIVE</span>
                <span className="text-muted-foreground/60">SEC_PROTOCOLS:</span>
                <span className="text-foreground">SSL_256 // AES</span>
                <span className="text-muted-foreground/60">REG_ZONE:</span>
                <span className="text-foreground">IN_KA_560</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Call Us */}
              <a
                href="tel:+15552487631"
                className="p-6 rounded-2xl border border-border/30 bg-card/25 hover:border-primary/50 hover:bg-[#071328]/45 hover:shadow-glow-sm hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-40 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:scale-105 transition-transform duration-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">Call Us</h4>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors block">
                    +1 (555) 248-7631
                  </span>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Direct engineering scoping consultation call.
                  </p>
                </div>
              </a>

              {/* Card 2: Email Us */}
              <a
                href="mailto:contact@cydroidtech.com"
                className="p-6 rounded-2xl border border-border/30 bg-card/25 hover:border-primary/50 hover:bg-[#071328]/45 hover:shadow-glow-sm hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-40 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:scale-105 transition-transform duration-300">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">Email Us</h4>
                </div>
                <div className="space-y-1">
                  <span className="text-sm font-extrabold text-foreground group-hover:text-primary transition-colors block">
                    contact@cydroidtech.com
                  </span>
                  <p className="text-[10px] text-muted-foreground leading-normal">
                    Transmit design briefs, logs, or blueprints.
                  </p>
                </div>
              </a>

              {/* Card 3: Location */}
              <div className="p-6 rounded-2xl border border-border/30 bg-card/25 hover:border-primary/45 transition-all duration-300 sm:col-span-2 group">
                <div className="flex items-center gap-3 mb-4 border-b border-border/10 pb-3">
                  <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">Coordinates</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-sm font-extrabold text-foreground block">
                      Bengaluru, Karnataka
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground/75 block">
                      123 Innovation Avenue, Business District — 560001
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Local & remote delivery. <span className="text-primary font-bold">Encrypted offsite environments supported.</span>
                  </p>
                </div>
              </div>

              {/* Card 4: Commitment */}
              <div className="p-6 rounded-2xl border border-border/30 bg-card/25 hover:border-primary/45 transition-all duration-300 sm:col-span-2">
                <div className="flex items-center gap-3 mb-4 border-b border-border/10 pb-3">
                  <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="text-[10px] font-mono font-bold tracking-widest uppercase text-muted-foreground">SLA Response</h4>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  We guarantee full confidentiality. Our technical lead engineers evaluate logs and respond with scoping files <span className="text-primary font-bold">within 24 business hours.</span>
                </p>
              </div>
            </div>

            {/* Socials Connection */}
            <div className="p-6 rounded-2xl border border-border/30 bg-card/25 space-y-4">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">
                {"// SECURE CHANNELS REGISTERED"}
              </span>
              <div className="flex flex-wrap gap-2.5">
                {SOCIAL_LINKS.map((soc) => (
                  <a
                    key={soc.name}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/20 bg-black/15 text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-[#071328]/30 hover:shadow-glow-sm transition-all text-[11px] font-mono group cursor-pointer"
                  >
                    <span className="text-primary group-hover:scale-105 transition-transform">
                      {soc.icon}
                    </span>
                    <span>{soc.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Trust Badging checklist */}
            <div className="p-6 rounded-2xl border border-border/30 bg-card/25 space-y-4">
              <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider block">
                {"// METRIC CERTIFICATIONS"}
              </span>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-[11px] text-muted-foreground">
                {TRUST_BUILDERS.map((trust, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <div className="w-4 h-4 rounded-full border border-primary/20 bg-primary/5 flex items-center justify-center text-primary flex-shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span className="font-medium">{trust}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: CONTACT FORM PANEL */}
          <div className="lg:col-span-7 w-full">
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-6 md:p-10 border border-border/30 bg-card/45 relative shadow-[0_0_40px_rgba(3,7,15,0.8)]"
            >
              {submitSuccess ? (
                <div className="text-center py-12 space-y-6 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-glow-sm">
                    <Check className="w-7 h-7 stroke-[3]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-display text-foreground">
                      Transmission Confirmed
                    </h3>
                    <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you for contacting CYDROID TECHNOLOGIES. Our lead systems engineers have registered your technical scoping request.
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto p-5 rounded-2xl border border-border/40 bg-[#060d1a]/80 text-left space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>REFERENCE ID:</span>
                      <span className="text-foreground font-bold">{referenceNum || "INQ-23945"}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>QUEUE STATUS:</span>
                      <span className="text-primary font-bold">ASSIGNED // EVAL</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>RESPONSE TIME:</span>
                      <span className="text-emerald-400 font-bold">&lt; 24 Hours</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="text-xs font-mono text-primary hover:text-primary-hover hover:underline cursor-pointer"
                    >
                      Log another scoping inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="border-b border-border/15 pb-4 mb-2">
                    <h3 className="text-lg font-bold text-foreground font-display">
                      Scoping Request & Inquiries
                    </h3>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">
                      Transmit specifications directly to our secure queues.
                    </p>
                  </div>

                  {submitError && (
                    <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-mono">
                      SYSTEM_ERR // {submitError}
                    </div>
                  )}

                  {/* Honeypot field (hidden from view) */}
                  <div className="absolute overflow-hidden w-0 h-0 opacity-0 pointer-events-none select-none">
                    <label htmlFor="website_honey_contact">Honey Link field</label>
                    <input
                      id="website_honey_contact"
                      type="text"
                      name="website_honey_contact"
                      value={formState.website_honey_contact}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, website_honey_contact: e.target.value }))
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_name"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input
                          id="contact_name"
                          type="text"
                          value={formState.fullName}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                            formErrors.fullName ? "border-red-500/50" : "border-border/30"
                          }`}
                        />
                      </div>
                      {formErrors.fullName && (
                        <span className="text-[10px] text-red-400 font-mono block">{formErrors.fullName}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_company"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Company Name
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input
                          id="contact_company"
                          type="text"
                          value={formState.companyName}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, companyName: e.target.value }))
                          }
                          placeholder="Company Inc."
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/30 bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_email"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input
                          id="contact_email"
                          type="email"
                          value={formState.emailAddress}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, emailAddress: e.target.value }))
                          }
                          placeholder="client@company.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                            formErrors.emailAddress ? "border-red-500/50" : "border-border/30"
                          }`}
                        />
                      </div>
                      {formErrors.emailAddress && (
                        <span className="text-[10px] text-red-400 font-mono block">{formErrors.emailAddress}</span>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_phone"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40" />
                        <input
                          id="contact_phone"
                          type="tel"
                          value={formState.phoneNumber}
                          onChange={(e) =>
                            setFormState((prev) => ({ ...prev, phoneNumber: e.target.value }))
                          }
                          placeholder="+1 (555) 248-7631"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                            formErrors.phoneNumber ? "border-red-500/50" : "border-border/30"
                          }`}
                        />
                      </div>
                      {formErrors.phoneNumber && (
                        <span className="text-[10px] text-red-400 font-mono block">{formErrors.phoneNumber}</span>
                      )}
                    </div>

                    {/* Subject (Inquiry Type) */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_subject"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Subject *
                      </label>
                      <select
                        id="contact_subject"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, subject: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border/30 bg-[#060d1a] text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:border-primary/50 transition-all"
                      >
                        {INQUIRY_TYPES.map((t) => (
                          <option key={t} value={t} className="bg-[#03070f] text-foreground">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Preferred Method */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact_method"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Preferred Contact Method
                      </label>
                      <select
                        id="contact_method"
                        value={formState.contactMethod}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, contactMethod: e.target.value }))
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-border/30 bg-[#060d1a] text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:border-primary/50 transition-all"
                      >
                        {CONTACT_METHODS.map((m) => (
                          <option key={m} value={m} className="bg-[#03070f] text-foreground">
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5 md:col-span-2">
                      <label
                        htmlFor="contact_message"
                        className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                      >
                        Message Details *
                      </label>
                      <textarea
                        id="contact_message"
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState((prev) => ({ ...prev, message: e.target.value }))
                        }
                        placeholder="Please write down your requirements, key endpoints, compliance targets, or general inquiries..."
                        className={`w-full p-4 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all resize-none ${
                          formErrors.message ? "border-red-500/50" : "border-border/30"
                        }`}
                      />
                      {formErrors.message && (
                        <span className="text-[10px] text-red-400 font-mono block">{formErrors.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Anti-bot Turnstile Verification */}
                  <Turnstile
                    onVerify={(token) =>
                      setFormState((prev) => ({ ...prev, turnstileToken: token }))
                    }
                    onExpire={() =>
                      setFormState((prev) => ({ ...prev, turnstileToken: "" }))
                    }
                    onError={() =>
                      setFormState((prev) => ({ ...prev, turnstileToken: "" }))
                    }
                  />
                  {formErrors.turnstile && (
                    <span className="text-[10px] text-red-400 font-mono block text-center mb-2">
                      {formErrors.turnstile}
                    </span>
                  )}

                  <div className="pt-3 flex flex-col sm:flex-row gap-4 justify-between sm:items-center text-[10px] text-muted-foreground font-mono">
                    <div className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-primary" />
                      <span>SSL 256-BIT ENCRYPTED TUNNEL</span>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="shadow-glow hover:scale-[1.015] w-full sm:w-auto"
                    >
                      {isSubmitting ? "TRANSMITTING..." : "TRANSMIT INQUIRY"}
                      <Send className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </div>
                </form>
              )}
            </GlassPanel>
          </div>

        </div>

      </div>
    </section>
  );
}
