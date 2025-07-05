/**
 * CYDROID TECHNOLOGIES — Infrastructure Stack Redesign
 *
 * Interactive Holographic Technology Clusters & Command System.
 * Represents the modular technology layers of the Cydroid ecosystem.
 */

"use client";

import * as React from "react";
import {
  Globe,
  Server,
  ShieldAlert,
  Database,
  Activity,
  Cpu,
  Layers,
  ChevronRight,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

// ================================================================
// CONSTANTS & STACKS DATA
// ================================================================

interface StackLayer {
  id: string;
  title: string;
  status: "ACTIVE" | "ONLINE" | "ENFORCED" | "SECURED" | "MONITORED";
  icon: React.ElementType;
  themeColor: string; // Tailwind colors
  glowColor: string; // RGB/Hex for glow
  telemetry: {
    latency: string;
    protocol: string;
    load: string;
  };
  technologies: string[];
}

const STACK_LAYERS: StackLayer[] = [
  {
    id: "frontend",
    title: "Frontend Stack",
    status: "ACTIVE",
    icon: Globe,
    themeColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    glowColor: "rgba(9, 178, 214, 0.25)",
    telemetry: {
      latency: "12ms avg",
      protocol: "HTTP/3 over Edge",
      load: "Lightweight SSR",
    },
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend Stack",
    status: "ONLINE",
    icon: Server,
    themeColor: "text-primary border-primary/20 bg-primary/5",
    glowColor: "rgba(29, 112, 246, 0.25)",
    telemetry: {
      latency: "45ms avg",
      protocol: "REST / GraphQL",
      load: "Scale-On-Demand",
    },
    technologies: ["Node.js", "Express.js", "PHP", "REST APIs"],
  },
  {
    id: "security",
    title: "Security Stack",
    status: "ENFORCED",
    icon: ShieldAlert,
    themeColor: "text-red-400 border-red-500/20 bg-red-500/5",
    glowColor: "rgba(239, 68, 68, 0.25)",
    telemetry: {
      latency: "Sub-1ms check",
      protocol: "WAF Strict-Mode",
      load: "Zero-Trust Active",
    },
    technologies: [
      "Cloudflare",
      "SSL/TLS",
      "WAF Protection",
      "OWASP Standards",
      "Security Monitoring",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure Stack",
    status: "SECURED",
    icon: Database,
    themeColor: "text-indigo-400 border-indigo-500/20 bg-indigo-500/5",
    glowColor: "rgba(99, 102, 241, 0.25)",
    telemetry: {
      latency: "99.99% Uptime",
      protocol: "Docker Container",
      load: "CI/CD Auto-Deploy",
    },
    technologies: [
      "Docker",
      "Linux Servers",
      "GitHub VCS",
      "Cloud Hosting",
      "CI/CD Pipelines",
    ],
  },
  {
    id: "monitoring",
    title: "Monitoring Stack",
    status: "MONITORED",
    icon: Activity,
    themeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    glowColor: "rgba(16, 185, 129, 0.25)",
    telemetry: {
      latency: "Real-time scan",
      protocol: "SSL Sentinel",
      load: "Zero-Downtime SLA",
    },
    technologies: [
      "Automated Backups",
      "Performance Monitoring",
      "Error Tracking",
      "Threat Monitoring",
      "Uptime Monitoring",
    ],
  },
];

export function TechStackSection() {
  const [activeLayer, setActiveLayer] = React.useState<string>("frontend");

  return (
    <section
      id="tech-stack"
      className="relative w-full py-24 bg-[#03070f]/75 z-30 overflow-hidden border-t border-border/40"
    >
      {/* Decorative cyber grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.003)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

      {/* Volumetric background lighting glows */}
      <div className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-16"
          badge={{ icon: <Cpu className="w-3.5 h-3.5" />, label: "Infrastructure Stack" }}
          heading={<>Modern <GradText>Tech Stack</GradText></>}
          sub="Modern technologies powering secure digital experiences. Explore our production ecosystems layer-by-layer."
        />

        {/* ─── SYSTEM CONNECTOR HUD ARCHITECTURE ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT CLUSTER PANEL: LAYER SELECTOR INTERFACE (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-4 border border-border/30 bg-[#060d1a]/50 rounded-3xl p-6 relative backdrop-blur-md">
            {/* Core decorative nodes */}
            <div className="absolute top-4 left-4 text-[8px] font-mono text-muted-foreground/45 uppercase tracking-widest">
              STACK_BUS_PORT_0x8F
            </div>
            
            <div className="space-y-3 pt-6">
              {STACK_LAYERS.map((layer) => {
                const Icon = layer.icon;
                const isActive = activeLayer === layer.id;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-glow-sm"
                        : "border-border/30 bg-card/35 hover:border-border/60 hover:bg-card/60"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`p-2 rounded-xl border ${layer.themeColor} transition-transform duration-300 ${
                          isActive ? "scale-105" : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <h4 className="text-xs font-bold text-foreground font-display leading-tight">
                          {layer.title}
                        </h4>
                        <span className="text-[9px] font-mono text-muted-foreground/50">
                          ID: {layer.id.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[8px] font-mono font-bold text-muted-foreground uppercase">
                        {layer.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="border-t border-border/10 pt-4 mt-4 text-[8px] font-mono text-muted-foreground/40 flex justify-between">
              <span>SYSTEM BUS INTEGRITY: 100%</span>
              <span>DEV_LOCK: ENABLED</span>
            </div>
          </div>

          {/* RIGHT CLUSTER PANEL: FLOATING HOLOGRAPHIC DIAGNOSTICS (8 cols) */}
          <div className="lg:col-span-8">
            {STACK_LAYERS.map((layer) => {
              if (layer.id !== activeLayer) return null;
              const Icon = layer.icon;

              return (
                <GlassPanel
                  key={layer.id}
                  intensity="strong"
                  rounded="lg"
                  shadow="float"
                  className="w-full h-full p-6 md:p-10 border border-primary/25 bg-card/25 flex flex-col justify-between relative overflow-hidden transition-all duration-300 animate-scale-in"
                  style={{
                    boxShadow: `inset 0 0 24px ${layer.glowColor}, 0 8px 32px rgba(0,0,0,0.55)`,
                  }}
                >
                  {/* Holographic matrix background vectors */}
                  <div className="absolute inset-0 pointer-events-none opacity-20 select-none overflow-hidden">
                    <svg
                      className="w-full h-full"
                      viewBox="0 0 500 500"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="400" cy="100" r="120" stroke="var(--primary)" strokeWidth="1" strokeDasharray="3 3" />
                      <line x1="0" y1="400" x2="500" y2="100" stroke="var(--primary)" strokeWidth="0.5" />
                      <line x1="250" y1="0" x2="250" y2="500" stroke="var(--primary)" strokeWidth="0.5" strokeDasharray="6 6" />
                    </svg>
                  </div>

                  <div className="space-y-8 relative z-10">
                    {/* Diagnostic Cluster Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border/15 pb-5">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl border ${layer.themeColor} bg-background/80 shadow-glow-sm`}>
                          <Icon className="w-6 h-6 animate-pulse" />
                        </div>
                        <div>
                          <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-widest block mb-0.5">
                            {"// ACTIVE HOLO MODULE SYSTEM //"}
                          </span>
                          <h3 className="text-xl md:text-2xl font-extrabold text-foreground font-display tracking-tight">
                            {layer.title}
                          </h3>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-[9px] font-mono font-bold tracking-widest uppercase">
                        {layer.status}
                      </span>
                    </div>

                    {/* Interactive cluster mapping visual badges */}
                    <div>
                      <h4 className="text-[10px] font-mono font-bold text-foreground/80 uppercase tracking-widest mb-4 border-b border-border/10 pb-1.5 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-primary" />
                        Cluster Modules
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {layer.technologies.map((tech, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-border/30 bg-black/35 hover:bg-black/65 hover:border-primary/45 transition-all duration-300 hover:translate-y-[-2px] group cursor-pointer hover:shadow-glow-sm"
                          >
                            <span className="text-[9px] font-mono text-muted-foreground/45 group-hover:text-primary transition-colors block mb-1">
                              MOD_0{idx + 1}
                            </span>
                            <span className="text-xs font-bold text-foreground font-display flex items-center gap-1">
                              {tech}
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Operational Telemetry HUD */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-5 border-t border-border/15 font-mono text-[9px] relative z-10 bg-black/25 p-4 rounded-xl border border-border/10">
                    <div>
                      <span className="text-muted-foreground/60 block uppercase">
                        Latency / Ping:
                      </span>
                      <span className="text-foreground font-bold font-mono">
                        {layer.telemetry.latency}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/60 block uppercase">
                        Protocol System:
                      </span>
                      <span className="text-foreground font-bold font-mono">
                        {layer.telemetry.protocol}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/60 block uppercase">
                        Active Profile:
                      </span>
                      <span className="text-foreground font-bold font-mono">
                        {layer.telemetry.load}
                      </span>
                    </div>
                  </div>
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
