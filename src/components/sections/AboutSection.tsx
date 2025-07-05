"use client";
import {
  ShieldCheck,
  Cpu,
  Lock,
  Wrench,
  Terminal,
  Gauge,
  Clock,
  MessageSquare,
  ShieldAlert,
  Layers,
  Lightbulb,
  Award,
  Scale,
  TrendingUp,
  Users,
  BookOpen,
  CheckCircle,
} from "lucide-react";

export function AboutSection() {
  const coreValues = [
    {
      title: "Innovation",
      desc: "We embrace change and continuously push the boundaries of what is possible.",
      icon: Lightbulb,
      color: "text-primary border-primary/20 bg-primary/5",
    },
    {
      title: "Excellence",
      desc: "We strive for the highest quality in everything we do, from code to customer service.",
      icon: Award,
      color: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    },
    {
      title: "Integrity",
      desc: "We are honest, transparent, and ethical in all our dealings.",
      icon: Scale,
      color: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    },
    {
      title: "Customer Success",
      desc: "We are dedicated to helping our clients achieve their business goals.",
      icon: TrendingUp,
      color: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    },
    {
      title: "Collaboration",
      desc: "We work together as a team to deliver the best results.",
      icon: Users,
      color: "text-pink-400 border-pink-500/20 bg-pink-500/5",
    },
    {
      title: "Continuous Learning",
      desc: "We encourage curiosity, experimentation, and professional growth.",
      icon: BookOpen,
      color: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    },
    {
      title: "Scalability",
      desc: "We build solutions designed to grow alongside our clients' businesses.",
      icon: Layers,
      color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    },
    {
      title: "Quality",
      desc: "We maintain high standards of code, testing, and deployment to ensure stability.",
      icon: CheckCircle,
      color: "text-red-400 border-red-500/20 bg-red-500/5",
    },
  ];

  const whyChooseItems = [
    {
      title: "Security-First Development",
      desc: "Strict adherence to OWASP guidelines, dependency patching, and rigorous validation logic.",
      icon: Lock,
    },
    {
      title: "Modern Technology Stack",
      desc: "Engineered on React, Next.js, Tailwind v4, and state-of-the-art bundling tools.",
      icon: Terminal,
    },
    {
      title: "Long-Term Support",
      desc: "Routine library updates, automated backups, and guaranteed response support SLA tiers.",
      icon: Wrench,
    },
    {
      title: "Performance Optimization",
      desc: "Fast hydration, edge caching, image optimization, and optimized WebGL elements.",
      icon: Gauge,
    },
    {
      title: "Professional Workflow",
      desc: "Agile sprints, standard coding policies, syntax inspection limits, and complete QA testing.",
      icon: Clock,
    },
    {
      title: "Transparent Communication",
      desc: "Direct contact, active terminal scope logs, and clear flat-rate package pricing models.",
      icon: MessageSquare,
    },
  ];

  return (
    <section id="about" className="relative w-full py-24 bg-[#03070f]/80 z-30">
      {/* Visual background links to Robot section */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      <div className="container-custom relative">
        {/* ─── 1. COMPANY INTRODUCTION ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          <div className="lg:col-span-5">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block mb-3 animate-fade-in">
              01. Introduction
            </span>
            <h2 className="text-display-sm text-foreground font-display font-extrabold tracking-tight leading-tight">
              Who We Are
            </h2>
            <div className="w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-4" />
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-lg text-foreground font-medium leading-relaxed">
              CYDROID TECHNOLOGIES is an enterprise technology company
              specializing in software development, cloud engineering, AI solutions,
              mobile applications, DevOps, UI/UX, and cybersecurity solutions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              CYDROID TECHNOLOGIES combines extensive engineering experience with a
              strict security-focused mindset. We help organizations deploy and
              secure high-performance web platforms that are resilient under
              load and structured for long-term growth.
            </p>
          </div>
        </div>

        {/* ─── 2. MISSION & VISION ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* Mission Card */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md relative group hover:border-primary/40 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck className="w-24 h-24 text-primary" />
            </div>
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block mb-4">
              Our Mission
            </span>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Empower Through Security
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To empower businesses with secure, scalable, and modern digital
              solutions that improve online presence, customer engagement, and
              long-term operational growth.
            </p>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-md relative group hover:border-accent/40 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu className="w-24 h-24 text-accent" />
            </div>
            <span className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider block mb-4">
              Our Vision
            </span>
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Partnering in Secure Innovation
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To become a trusted technology partner delivering secure digital
              experiences through continuous innovation, reliability, and
              cybersecurity-focused development frameworks.
            </p>
          </div>
        </div>

        {/* ─── 3. CORE VALUES ─── */}
        <div className="mb-24">
          <div className="mb-12">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block mb-3">
              02. Core Identity
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground font-display">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className={`p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm flex flex-col justify-between hover:scale-[1.02] hover:border-primary/45 transition-all duration-300 group hover:shadow-glow-sm`}
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-6 border ${val.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-3">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── 4. SECURITY-FIRST PHILOSOPHY ─── */}
        <div className="mb-24 relative overflow-hidden rounded-2xl border border-primary/30 bg-primary/5 p-8 md:p-12">
          {/* Subtle blue background glow */}
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/45 flex items-center justify-center text-primary flex-shrink-0 animate-pulse">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">
                  Philosophy
                </span>
                <h3 className="text-lg md:text-xl font-display font-extrabold text-foreground leading-tight">
                  Security Is Not An Add-On
                </h3>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                At CYDROID TECHNOLOGIES, security is integrated into every stage of
                development. We believe modern businesses deserve websites and
                platforms that are{" "}
                <strong className="text-foreground">secure by design</strong>,
                not secured as an afterthought. From input validation logic to
                edge firewall protections, your safety is our blueprint.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 5. WHY CHOOSE CYDROID ─── */}
        <div>
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest block mb-3">
              03. Performance & Workflow
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-foreground font-display mb-4">
              Why Businesses Choose CYDROID TECHNOLOGIES
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We separate ourselves from ordinary digital agencies through
              strict engineering methodologies, type safety compilation, and
              constant support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-xl border border-border/40 bg-card/45 backdrop-blur-md hover:border-primary/45 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
