"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Check,
  ChevronRight,
  ArrowRight,
  Shield,
  MessageSquare,
  Clock,
  Wrench,
  Cpu,
  Mail,
  Building,
  User,
  Phone,
  Globe,
  CheckCircle2,
  Lock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";
import { Turnstile } from "@/components/ui/Turnstile";

// ================================================================
// CONSTANTS & SCHEMAS
// ================================================================

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "Singapore",
  "United Arab Emirates",
  "Other",
];

const PROJECT_TYPES = [
  { id: "webdev", label: "Web Development" },
  { id: "cyber", label: "Cybersecurity Services" },
  { id: "support", label: "Maintenance & Support" },
  { id: "seo", label: "SEO & Marketing" },
];

const PROJECT_DESCRIPTIONS = [
  { id: "website", label: "Business Website" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "webapp", label: "Web Application" },
  { id: "security", label: "Security Assessment" },
  { id: "maintenance", label: "Website Maintenance" },
  { id: "seo_growth", label: "SEO Growth" },
  { id: "other", label: "Other Project scope" },
];

const BUDGETS = [
  { id: "low", label: "₹15,000 – ₹30,000", desc: "Startup / Personal" },
  { id: "mid", label: "₹30,000 – ₹80,000", desc: "Business / Scale-up" },
  { id: "high", label: "₹80,000 – ₹3,00,000", desc: "Enterprise / Audited" },
  { id: "custom", label: "₹3,00,000+", desc: "Bespoke Architectures" },
  { id: "not_sure", label: "Not Sure Yet", desc: "Evaluate During Call" },
];

const TIMELINES = [
  { id: "immediate", label: "Immediately", desc: "Critical start schedule" },
  { id: "month", label: "Within 1 Month", desc: "Planning current cycle" },
  { id: "quarter", label: "Within 3 Months", desc: "Flexible roadmaps" },
  { id: "flexible", label: "Flexible", desc: "No strict timeline" },
];

const MEETING_OPTIONS = [
  {
    id: "15m",
    name: "15 Minute Discovery Call",
    desc: "Quick align on requirements & scope validation.",
  },
  {
    id: "30m",
    name: "30 Minute Project Consultation",
    desc: "Deep-dive architectural layout evaluation.",
  },
  {
    id: "45m",
    name: "45 Minute Strategy Session",
    desc: "Detailed roadmap mapping & vulnerability overview.",
  },
  {
    id: "security",
    name: "Security Consultation",
    desc: "Rigorous infrastructure hardening & pen-test planning.",
  },
];

const BENEFITS = [
  {
    title: "Security-First Development",
    desc: "Every codebase is hardened against OWASP vulnerabilities.",
    icon: Shield,
  },
  {
    title: "Transparent Communication",
    desc: "Flat-rate quotes, regular updates, and clear timelines.",
    icon: MessageSquare,
  },
  {
    title: "Long-Term Support",
    desc: "Robust SLA options to keep your system patched and online.",
    icon: Wrench,
  },
  {
    title: "Modern Tech Stack",
    desc: "Next.js, Tailwind CSS, TypeScript, and cloud-native architecture.",
    icon: Cpu,
  },
  {
    title: "Professional Workflow",
    desc: "Clear code structures, automated testing, and secure delivery.",
    icon: Clock,
  },
];

// ================================================================
// WIZARD TYPES
// ================================================================

interface FormData {
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  projectTypes: string[];
  projectDescriptions: string[];
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  meetingPreference: string;
  website_honey: string; // Anti-bot field
  turnstileToken: string;
}

const INITIAL_FORM_DATA: FormData = {
  fullName: "",
  companyName: "",
  emailAddress: "",
  phoneNumber: "",
  country: "India",
  projectTypes: [],
  projectDescriptions: [],
  projectDescription: "",
  budgetRange: "₹30,000 – ₹80,000",
  timeline: "Within 1 Month",
  meetingPreference: "30 Minute Project Consultation",
  website_honey: "",
  turnstileToken: "",
};

export function BookDemoSection() {
  const [step, setStep] = React.useState<number>(1);
  const [formData, setFormData] = React.useState<FormData>(INITIAL_FORM_DATA);
  const [formErrors, setFormErrors] = React.useState<Record<string, string>>(
    {}
  );
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [referenceNum, setReferenceNum] = React.useState<string | null>(null);
  const [bookingMode, setBookingMode] = React.useState<"form" | "calendly">(
    "form"
  );
  const [showCalendlyWidget, setShowCalendlyWidget] =
    React.useState<boolean>(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Transition between steps without animation
  const navigateToStep = (nextStep: number) => {
    setStep(nextStep);
    window.scrollTo({
      top: containerRef.current?.offsetTop
        ? containerRef.current.offsetTop - 80
        : 0,
      behavior: "smooth",
    });
  };

  // Field validation
  const validateStep = (currentStep: number): boolean => {
    const errors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.fullName.trim()) {
        errors.fullName = "Full Name is required.";
      }
      if (!formData.emailAddress.trim()) {
        errors.emailAddress = "Email Address is required.";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailAddress)) {
          errors.emailAddress = "Please enter a valid email address.";
        }
      }
      if (!formData.phoneNumber.trim()) {
        errors.phoneNumber = "Phone Number is required.";
      } else {
        const phoneRegex = /^[+\d\s()-.]{7,25}$/;
        if (!phoneRegex.test(formData.phoneNumber)) {
          errors.phoneNumber =
            "Please enter a valid phone number (min 7 digits).";
        }
      }
    } else if (currentStep === 2) {
      if (formData.projectTypes.length === 0) {
        errors.projectTypes = "Please select at least one project type.";
      }
    } else if (currentStep === 5) {
      if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !formData.turnstileToken) {
        errors.turnstile = "Please complete security validation.";
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      navigateToStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      navigateToStep(step - 1);
    }
  };

  const handleSelectProjectType = (typeLabel: string) => {
    setFormData((prev) => {
      const exists = prev.projectTypes.includes(typeLabel);
      const updated = exists
        ? prev.projectTypes.filter((t) => t !== typeLabel)
        : [...prev.projectTypes, typeLabel];
      return { ...prev, projectTypes: updated };
    });
  };

  const handleSelectProjectDesc = (descLabel: string) => {
    setFormData((prev) => {
      const exists = prev.projectDescriptions.includes(descLabel);
      const updated = exists
        ? prev.projectDescriptions.filter((d) => d !== descLabel)
        : [...prev.projectDescriptions, descLabel];
      return { ...prev, projectDescriptions: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/book-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setReferenceNum(data.referenceNumber);
        navigateToStep(6); // Step 6 = Success
      } else {
        setSubmitError(data.error || "An error occurred. Please try again.");
      }
    } catch {
      setSubmitError("Failed to submit request. Check network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle active booking channel
  const selectBookingMode = (mode: "form" | "calendly") => {
    setBookingMode(mode);
    if (mode === "calendly") {
      setShowCalendlyWidget(true);
    }
  };

  // Render the progress bar indicator
  const progressPercent = step <= 5 ? ((step - 1) / 4) * 100 : 100;

  return (
    <section
      ref={containerRef}
      id="book-demo-showcase"
      className="relative w-full py-28 bg-[#03070f]/90 z-30 overflow-hidden border-t border-border/20"
    >
      {/* Visual cyber-grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,112,246,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(29,112,246,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40" />

      {/* Decorative ambient lighting elements */}
      <div className="absolute top-1/4 left-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative">
        {/* ─── SECTION HEADER ─── */}
        <div className="booking-reveal-header text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-5">
            <Lock className="w-3.5 h-3.5" />
            Lead Scoping Interface
          </div>
          <h2 className="text-display-md text-foreground font-display font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Book Your Free Consultation
          </h2>
          <p className="text-body-md text-muted-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Specify your project requirements, timeline constraints, and choose how you would like to connect with our technical leads.
          </p>
        </div>

        {/* ─── BOOKING EXPERIENCE GRID CONTAINER ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: MULTI-STEP WIZARD / CALENDLY */}
          <div className="lg:col-span-8 w-full space-y-6">
            
            {/* Booking Channel Toggle Navigation */}
            <div className="flex bg-[#060d1a] border border-border/30 p-1.5 rounded-2xl text-xs font-mono select-none">
              <button
                type="button"
                onClick={() => selectBookingMode("form")}
                className={`flex-1 text-center py-3 font-bold rounded-xl cursor-pointer transition-all ${
                  bookingMode === "form"
                    ? "bg-primary text-foreground shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Guided Form Wizard
              </button>
              <button
                type="button"
                onClick={() => selectBookingMode("calendly")}
                className={`flex-1 text-center py-3 font-bold rounded-xl cursor-pointer transition-all ${
                  bookingMode === "calendly"
                    ? "bg-primary text-foreground shadow-glow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Calendly Direct Booking
              </button>
            </div>

            {/* IFRAME CALENDLY CONTAINER */}
            {bookingMode === "calendly" && (
              <GlassPanel
                intensity="default"
                rounded="lg"
                shadow="float"
                className="p-6 md:p-10 border border-border/30 bg-card/45 min-h-[650px] flex flex-col relative"
              >
                {/* Visual corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/20 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/20 rounded-tr-xl" />
                
                <div className="flex items-center justify-between border-b border-border/15 pb-5 mb-8">
                  <div>
                    <h3 className="text-xl font-bold font-display text-foreground flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Direct Booking Calendar
                    </h3>
                    <p className="text-xs text-muted-foreground/75 mt-0.5">
                      Schedule a session directly with our senior development staff.
                    </p>
                  </div>
                </div>

                {/* Meet choices info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-xs font-sans">
                  {MEETING_OPTIONS.map((opt) => (
                    <div
                      key={opt.id}
                      className="p-5 rounded-xl border border-border/20 bg-black/10 flex flex-col justify-between hover:border-primary/25 transition-colors"
                    >
                      <h4 className="font-bold text-foreground mb-1.5">
                        {opt.name}
                      </h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {opt.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Inline Calendly frame */}
                {showCalendlyWidget && (
                  <div className="flex-1 w-full rounded-2xl overflow-hidden border border-border/20 bg-black/35 relative min-h-[500px]">
                    <iframe
                      src="https://calendly.com/dmathew-business/30min?embed_domain=localhost&embed_type=inline&background_color=03070f&text_color=ffffff&primary_color=1d70f6"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      className="absolute inset-0 w-full h-full min-h-[500px]"
                      title="Calendly Scheduler"
                    />
                  </div>
                )}
              </GlassPanel>
            )}

            {/* GUIDED MULTI-STEP FORM CONTAINER */}
            {bookingMode === "form" && (
              <GlassPanel
                intensity="default"
                rounded="lg"
                shadow="float"
                className="p-6 md:p-10 border border-border/30 bg-card/45 relative shadow-[0_0_40px_rgba(3,7,15,0.8)]"
              >
                {/* Visual corners */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-primary/20 rounded-tl-xl" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-primary/20 rounded-tr-xl" />

                {/* Form Progress Indicator */}
                {step <= 5 && (
                  <div className="mb-10 select-none">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase mb-3.5 tracking-wider">
                      <span>Step {step} of 5 // {Math.round(progressPercent)}%</span>
                      <span className="text-primary font-bold">
                        {step === 1
                          ? "CONTACT CONFIG"
                          : step === 2
                            ? "PROJECT SCOPE"
                            : step === 3
                              ? "BUDGET BRACKET"
                              : step === 4
                                ? "TIMELINE WINDOW"
                                : "SUBMISSION AUDIT"}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#060d1a] border border-border/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary shadow-[0_0_12px_rgba(29,112,246,0.6)] transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Actionable errors */}
                {submitError && (
                  <div className="p-4 mb-6 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-mono">
                    GATEWAY_ERROR // {submitError}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Honeypot field (hidden from view) */}
                  <div className="absolute overflow-hidden w-0 h-0 opacity-0 pointer-events-none select-none">
                    <label htmlFor="website_honey">Website URL field</label>
                    <input
                      id="website_honey"
                      type="text"
                      name="website_honey"
                      value={formData.website_honey}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          website_honey: e.target.value,
                        }))
                      }
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="w-full">
                    {/* ─── STEP 1: PERSONAL INFORMATION ─── */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div className="border-b border-border/15 pb-3">
                          <h3 className="text-lg font-bold text-foreground font-display">
                            Contact Information
                          </h3>
                          <p className="text-xs text-muted-foreground/75 mt-0.5">
                            Please log your primary contact specifications.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {/* Full Name */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="fullName"
                              className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                            >
                              Full Name *
                            </label>
                            <div className="relative">
                              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/45" />
                              <input
                                id="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    fullName: e.target.value,
                                  }))
                                }
                                placeholder="John Doe"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                                  formErrors.fullName
                                    ? "border-red-500/50"
                                    : "border-border/30"
                                }`}
                              />
                            </div>
                            {formErrors.fullName && (
                              <span className="text-[10px] text-red-400 font-mono block">
                                {formErrors.fullName}
                              </span>
                            )}
                          </div>

                          {/* Company Name */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="companyName"
                              className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                            >
                              Company Name
                            </label>
                            <div className="relative">
                              <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/45" />
                              <input
                                id="companyName"
                                type="text"
                                value={formData.companyName}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    companyName: e.target.value,
                                  }))
                                }
                                placeholder="Cydroid Inc."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/30 bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all"
                              />
                            </div>
                          </div>

                          {/* Email Address */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="emailAddress"
                              className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                            >
                              Email Address *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/45" />
                              <input
                                id="emailAddress"
                                type="email"
                                value={formData.emailAddress}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    emailAddress: e.target.value,
                                  }))
                                }
                                placeholder="client@company.com"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                                  formErrors.emailAddress
                                    ? "border-red-500/50"
                                    : "border-border/30"
                                }`}
                              />
                            </div>
                            {formErrors.emailAddress && (
                              <span className="text-[10px] text-red-400 font-mono block">
                                {formErrors.emailAddress}
                              </span>
                            )}
                          </div>

                          {/* Phone Number */}
                          <div className="space-y-1.5">
                            <label
                              htmlFor="phoneNumber"
                              className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                            >
                              Phone Number *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/45" />
                              <input
                                id="phoneNumber"
                                type="tel"
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    phoneNumber: e.target.value,
                                  }))
                                }
                                placeholder="+91 98765 43210"
                                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all ${
                                  formErrors.phoneNumber
                                    ? "border-red-500/50"
                                    : "border-border/30"
                                }`}
                              />
                            </div>
                            {formErrors.phoneNumber && (
                              <span className="text-[10px] text-red-400 font-mono block">
                                {formErrors.phoneNumber}
                              </span>
                            )}
                          </div>

                          {/* Country Selector */}
                          <div className="space-y-1.5 md:col-span-2">
                            <label
                              htmlFor="country"
                              className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                            >
                              Country / Region
                            </label>
                            <div className="relative">
                              <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/45" />
                              <select
                                id="country"
                                value={formData.country}
                                onChange={(e) =>
                                  setFormData((p) => ({
                                    ...p,
                                    country: e.target.value,
                                  }))
                                }
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border/30 bg-[#060d1a] text-xs text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:border-primary/50 transition-all"
                              >
                                {COUNTRIES.map((c) => (
                                  <option
                                    key={c}
                                    value={c}
                                    className="bg-[#03070f] text-foreground"
                                  >
                                    {c}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── STEP 2: PROJECT INFORMATION ─── */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div className="border-b border-border/15 pb-3">
                          <h3 className="text-base font-bold text-foreground font-display">
                            Project Requirements
                          </h3>
                          <p className="text-xs text-muted-foreground/75 mt-0.5">
                            Outline the engineering parameters and digital systems needed.
                          </p>
                        </div>

                        {/* Project Types (Multi-select Grid) */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block">
                            Digital System Integration Targets *
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            {PROJECT_TYPES.map((pt) => {
                              const isSelected = formData.projectTypes.includes(
                                pt.label
                              );
                              return (
                                <button
                                  key={pt.id}
                                  type="button"
                                  onClick={() =>
                                    handleSelectProjectType(pt.label)
                                  }
                                  className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all flex justify-between items-center cursor-pointer ${
                                    isSelected
                                      ? "border-primary bg-primary/10 shadow-glow-sm text-foreground"
                                      : "border-border/30 bg-black/10 text-muted-foreground hover:border-primary/50 hover:bg-black/25"
                                  }`}
                                >
                                  <span>{pt.label}</span>
                                  {isSelected && (
                                    <Check className="w-4 h-4 text-primary stroke-[3]" />
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {formErrors.projectTypes && (
                            <span className="text-[10px] text-red-400 font-mono block">
                              {formErrors.projectTypes}
                            </span>
                          )}
                        </div>

                        {/* Additional Scope Targets */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block">
                            Additional Targets
                          </span>
                          <div className="flex flex-wrap gap-2.5">
                            {PROJECT_DESCRIPTIONS.map((pd) => {
                              const isSelected =
                                formData.projectDescriptions.includes(pd.label);
                              return (
                                <button
                                  key={pd.id}
                                  type="button"
                                  onClick={() =>
                                    handleSelectProjectDesc(pd.label)
                                  }
                                  className={`px-3.5 py-2 rounded-full border text-[10px] font-mono tracking-wide transition-all cursor-pointer ${
                                    isSelected
                                      ? "border-primary bg-primary text-foreground"
                                      : "border-border/20 bg-[#060d1a]/55 text-muted-foreground hover:border-border/50 hover:text-foreground"
                                  }`}
                                >
                                  {pd.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Description Textarea */}
                        <div className="space-y-1.5">
                          <label
                            htmlFor="projectDescription"
                            className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block"
                          >
                            Project Outline / Context Details
                          </label>
                          <textarea
                            id="projectDescription"
                            rows={4}
                            value={formData.projectDescription || ""}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                projectDescription: e.target.value,
                              }))
                            }
                            placeholder="Detail your application requirements, database dependencies, security audits, or compliance parameters..."
                            className="w-full p-4 rounded-xl border border-border/30 bg-background/25 text-xs text-foreground placeholder:text-muted-foreground/35 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/45 focus:shadow-[0_0_15px_rgba(29,112,246,0.1)] hover:bg-background/45 focus:bg-background/60 transition-all resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* ─── STEP 3: BUDGET INFORMATION ─── */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div className="border-b border-border/15 pb-3">
                          <h3 className="text-lg font-bold text-foreground font-display">
                            Budget Target Selection
                          </h3>
                          <p className="text-xs text-muted-foreground/75 mt-0.5">
                            Please pick the appropriate investment scale.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          {BUDGETS.map((bg) => {
                            const isSelected =
                              formData.budgetRange === bg.label;
                            return (
                              <button
                                key={bg.id}
                                type="button"
                                onClick={() =>
                                  setFormData((p) => ({
                                    ...p,
                                    budgetRange: bg.label,
                                  }))
                                }
                                className={`p-4.5 rounded-xl border text-left transition-all flex justify-between items-center cursor-pointer ${
                                  isSelected
                                    ? "border-primary bg-primary/10 shadow-glow-sm"
                                    : "border-border/30 bg-[#060d1a]/25 hover:border-primary/50 hover:bg-black/25"
                                }`}
                              >
                                <div>
                                  <span className="text-xs font-extrabold text-foreground block mb-0.5">
                                    {bg.label}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">
                                    {bg.desc}
                                  </span>
                                </div>
                                <div
                                  className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                    isSelected
                                      ? "border-primary bg-primary"
                                      : "border-border/40 bg-black/40"
                                  }`}
                                >
                                  {isSelected && (
                                    <div className="w-1.5 h-1.5 rounded-full bg-foreground" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* ─── STEP 4: TIMELINE ─── */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <div className="border-b border-border/15 pb-3">
                          <h3 className="text-lg font-bold text-foreground font-display">
                            Timeline Delivery Threshold
                          </h3>
                          <p className="text-xs text-muted-foreground/75 mt-0.5">
                            When would you like our engineering team to start?
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {TIMELINES.map((tl) => {
                            const isSelected = formData.timeline === tl.label;
                            return (
                              <button
                                key={tl.id}
                                type="button"
                                onClick={() =>
                                  setFormData((p) => ({
                                    ...p,
                                    timeline: tl.label,
                                  }))
                                }
                                className={`p-5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer h-28 ${
                                  isSelected
                                    ? "border-primary bg-primary/10 shadow-glow-sm"
                                    : "border-border/30 bg-[#060d1a]/25 hover:border-primary/50 hover:bg-black/25"
                                }`}
                              >
                                <div className="flex justify-between items-center w-full mb-2">
                                  <span className="text-xs font-extrabold text-foreground">
                                    {tl.label}
                                  </span>
                                  <div
                                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                      isSelected
                                        ? "border-primary bg-primary"
                                        : "border-border/40 bg-black/45"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="w-1 h-1 rounded-full bg-foreground" />
                                    )}
                                  </div>
                                </div>
                                <span className="text-[10px] text-muted-foreground leading-relaxed">
                                  {tl.desc}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Meeting Schedule selection preference */}
                        <div className="space-y-3 pt-5 border-t border-border/15">
                          <span className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-wider block">
                            Preferred Session Format
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {MEETING_OPTIONS.map((opt) => {
                              const isSelected =
                                formData.meetingPreference === opt.name;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() =>
                                    setFormData((p) => ({
                                      ...p,
                                      meetingPreference: opt.name,
                                    }))
                                  }
                                  className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-colors cursor-pointer ${
                                    isSelected
                                      ? "border-primary bg-primary/10 text-foreground"
                                      : "border-border/20 bg-black/10 text-muted-foreground hover:border-border/40"
                                  }`}
                                >
                                  <div className="truncate">
                                    {opt.name}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ─── STEP 5: REVIEW INFORMATION ─── */}
                    {step === 5 && (
                      <div className="space-y-6">
                        <div className="border-b border-border/15 pb-3">
                          <h3 className="text-lg font-bold text-foreground font-display">
                            Technical Scope Review
                          </h3>
                          <p className="text-xs text-muted-foreground/75 mt-0.5">
                            Verify configuration variables before submitting.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                          {/* Personal Details */}
                          <div className="p-5 rounded-2xl border border-border/20 bg-black/15 relative">
                            <button
                              type="button"
                              onClick={() => navigateToStep(1)}
                              className="absolute top-4 right-4 text-[10px] font-mono text-primary hover:text-primary-hover hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase block mb-3">
                              01 // Contacts
                            </span>
                            <div className="space-y-2 text-[11px] text-muted-foreground leading-normal">
                              <div>
                                <span className="font-semibold text-foreground">Name:</span> {formData.fullName}
                              </div>
                              {formData.companyName && (
                                <div>
                                  <span className="font-semibold text-foreground">Company:</span> {formData.companyName}
                                </div>
                              )}
                              <div>
                                <span className="font-semibold text-foreground">Email:</span> {formData.emailAddress}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Phone:</span> {formData.phoneNumber}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Region:</span> {formData.country}
                              </div>
                            </div>
                          </div>

                          {/* Project Details */}
                          <div className="p-5 rounded-2xl border border-border/20 bg-black/15 relative">
                            <button
                              type="button"
                              onClick={() => navigateToStep(2)}
                              className="absolute top-4 right-4 text-[10px] font-mono text-primary hover:text-primary-hover hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase block mb-3">
                              02 // Scope
                            </span>
                            <div className="space-y-2.5 text-[11px] text-muted-foreground leading-normal">
                              <div>
                                <span className="font-semibold text-foreground">Core Needs:</span>
                                <div className="flex flex-wrap gap-1.5 mt-1">
                                  {formData.projectTypes.map((t, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-0.5 rounded bg-primary/20 text-primary text-[9px] font-mono"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </div>
                              {formData.projectDescriptions.length > 0 && (
                                <div>
                                  <span className="font-semibold text-foreground">Tags:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.projectDescriptions.map(
                                      (d, i) => (
                                        <span
                                          key={i}
                                          className="px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground text-[8px] font-mono"
                                        >
                                          {d}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}
                              {formData.projectDescription && (
                                <div>
                                  <span className="font-semibold text-foreground block">Outline:</span>
                                  <p className="line-clamp-2 mt-0.5 italic text-muted-foreground/85">
                                    &ldquo;{formData.projectDescription}&rdquo;
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Budget & Timeline */}
                          <div className="p-5 rounded-2xl border border-border/20 bg-black/15 relative">
                            <button
                              type="button"
                              onClick={() => navigateToStep(3)}
                              className="absolute top-4 right-4 text-[10px] font-mono text-primary hover:text-primary-hover hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase block mb-3">
                              03 // Finance
                            </span>
                            <div className="space-y-1 text-[11px] text-muted-foreground">
                              <div>
                                <span className="font-semibold text-foreground">Bracket:</span> {formData.budgetRange}
                              </div>
                            </div>
                          </div>

                          {/* Timeline & Meeting */}
                          <div className="p-5 rounded-2xl border border-border/20 bg-black/15 relative">
                            <button
                              type="button"
                              onClick={() => navigateToStep(4)}
                              className="absolute top-4 right-4 text-[10px] font-mono text-primary hover:text-primary-hover hover:underline cursor-pointer"
                            >
                              Edit
                            </button>
                            <span className="text-[9px] font-mono text-muted-foreground/60 uppercase block mb-3">
                              04 // Timelines & Session
                            </span>
                            <div className="space-y-1.5 text-[11px] text-muted-foreground">
                              <div>
                                <span className="font-semibold text-foreground">Timeline:</span> {formData.timeline}
                              </div>
                              <div>
                                <span className="font-semibold text-foreground">Session:</span> {formData.meetingPreference}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Terms checkbox disclaimer */}
                        <div className="flex gap-3 items-start p-4 bg-primary/5 rounded-2xl border border-primary/15 text-[11px] text-muted-foreground/80 leading-relaxed mb-4">
                          <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>
                            Evaluation terms active. By submitting, you agree that CYDROID TECHNOLOGIES will evaluate your project details under secure conditions and log this consultation immediately.
                          </span>
                        </div>

                        {/* Turnstile verification widget */}
                        <Turnstile
                          onVerify={(token) =>
                            setFormData((prev) => ({ ...prev, turnstileToken: token }))
                          }
                          onExpire={() =>
                            setFormData((prev) => ({ ...prev, turnstileToken: "" }))
                          }
                          onError={() =>
                            setFormData((prev) => ({ ...prev, turnstileToken: "" }))
                          }
                        />
                        {formErrors.turnstile && (
                          <span className="text-[10px] text-red-400 font-mono block text-center mb-2">
                            {formErrors.turnstile}
                          </span>
                        )}
                      </div>
                    )}

                    {/* ─── STEP 6: SUCCESS EXPERIENCE SCREEN ─── */}
                    {step === 6 && (
                      <div className="text-center py-8 space-y-6 animate-fade-in">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-glow-sm">
                          <CheckCircle2 className="w-8 h-8" />
                        </div>

                        <div className="space-y-2">
                          <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block">
                            Transmission Confirmed
                          </span>
                          <h3 className="text-2xl md:text-3xl font-extrabold text-foreground font-display">
                            Thank You For Choosing CYDROID TECHNOLOGIES
                          </h3>
                          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                            Your technical consultation request has been received. Our engineers will review your files and contact you shortly.
                          </p>
                        </div>

                        <div className="max-w-md mx-auto p-6 rounded-2xl border border-border/40 bg-[#060d1a]/60 text-xs text-left space-y-4">
                          <span className="text-[9px] font-mono text-muted-foreground uppercase block mb-2">
                            Session Reference File
                          </span>

                          <div className="grid grid-cols-2 gap-y-3 gap-x-2 font-mono text-[10px] text-muted-foreground">
                            <div>REFERENCE ID:</div>
                            <div className="text-foreground font-bold">
                              {referenceNum || "COB-58102"}
                            </div>

                            <div>SESSION FORMAT:</div>
                            <div className="text-foreground">
                              {formData.meetingPreference}
                            </div>

                            <div>EXPECTED REPLY:</div>
                            <div className="text-primary font-bold">
                              &lt; 12 Hours
                            </div>
                          </div>

                          <div className="h-px bg-border/20" />

                          <div className="space-y-2 text-[11px] text-muted-foreground leading-relaxed">
                            <span className="font-bold text-foreground block">
                              Next Steps:
                            </span>
                            <ul className="space-y-1.5 list-decimal list-inside text-[10px]">
                              <li>
                                Check your email inbox for a direct calendar invite.
                              </li>
                              <li>
                                Gather any design requirements, wireframes, or code snippets.
                              </li>
                              <li>
                                A senior systems architect will host the dynamic web session at the scheduled block.
                              </li>
                            </ul>
                          </div>

                          <div className="h-px bg-border/20" />

                          <div className="flex justify-between items-center text-[10px] font-mono">
                            <span>SUPPORT ENQUIRIES:</span>
                            <a
                              href="mailto:support@cydroidtech.com"
                              className="text-primary hover:text-primary-hover hover:underline inline-flex items-center gap-1"
                            >
                              <Mail className="w-3 h-3" />
                              support@cydroidtech.com
                            </a>
                          </div>
                        </div>

                        <div className="pt-4">
                          <Link href="/">
                            <Button variant="outline" className="text-xs">
                              Return To Homepage
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons footer */}
                  {step <= 5 && (
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-border/15">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handleBack}
                          className="px-4 py-2 text-xs font-mono text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Back
                        </button>
                      ) : (
                        <div />
                      )}

                      {step < 5 ? (
                        <Button
                          type="button"
                          onClick={handleNext}
                          className="hover:scale-[1.015]"
                        >
                          Continue
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="shadow-glow hover:scale-[1.015] min-w-[120px]"
                        >
                          {isSubmitting ? "Processing..." : "Submit Request"}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  )}
                </form>
              </GlassPanel>
            )}
          </div>

          {/* RIGHT COLUMN: BENEFITS / VALUE ASSURANCES */}
          <div className="lg:col-span-4 w-full space-y-6">
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-6 md:p-8 border border-border/40 bg-card/25 relative"
            >
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/20 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/20 rounded-tr-lg" />

              <h3 className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-6">
                Why Clients Choose CYDROID
              </h3>

              <div className="space-y-6">
                {BENEFITS.map((benefit, bIdx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={bIdx} className="flex gap-4 items-start group">
                      <div className="p-2.5 rounded-xl border border-primary/20 bg-primary/5 text-primary group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-foreground leading-none">
                          {benefit.title}
                        </h4>
                        <p className="text-[10px] text-muted-foreground leading-normal">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-border/20 my-6" />

              {/* Safety guarantee */}
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 flex gap-2.5 items-start">
                <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-foreground block">
                    Confidential Evaluation
                  </span>
                  <span className="text-[9px] text-muted-foreground leading-relaxed block">
                    All specifications, links, code snippets, and roadmaps shared are governed by strict client NDA regulations.
                  </span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
