/**
 * CYDROID TECHNOLOGIES — Execution Pipeline Redesign
 *
 * Interactive Timeline & Robot OS Subsystem Dashboard.
 * Represents the internal operating system lifecycle of the Cydroid Robot.
 */

"use client";

import * as React from "react";
import {
  ChevronRight,
  Activity,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

// ================================================================
// CONSTANTS & SCHEMAS
// ================================================================

interface ProcessStage {
  id: string;
  step: string;
  title: string;
  description: string;
  deliverables: string[];
  visualTheme: string[];
  status: "SCANNING" | "MODELING" | "COMPILING" | "LAUNCHED";
  telemetry: {
    frequency: string;
    bitrate: string;
    load: string;
    integrity: string;
  };
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery & Strategic Planning",
    description:
      "Every successful project begins with understanding your business objectives, users, technical requirements, and long-term growth goals.",
    deliverables: [
      "Business Discovery",
      "Requirement Analysis",
      "Project Scoping",
      "Security Assessment",
      "Strategic Roadmap",
    ],
    visualTheme: ["Scanning", "Analysis", "Blueprint Generation", "Data Mapping"],
    status: "SCANNING",
    telemetry: {
      frequency: "412.8 MHz",
      bitrate: "128 Gbit/s",
      load: "22.4%",
      integrity: "99.85%",
    },
  },
  {
    id: "architecture",
    step: "02",
    title: "Architecture & Experience Design",
    description:
      "We create scalable system architectures and intuitive user experiences that provide a strong foundation for performance, security, and future growth.",
    deliverables: [
      "UI/UX Planning",
      "Information Architecture",
      "User Flow Design",
      "Database Planning",
      "Infrastructure Design",
    ],
    visualTheme: ["Blueprint Construction", "System Modeling", "Architecture Assembly"],
    status: "MODELING",
    telemetry: {
      frequency: "580.2 MHz",
      bitrate: "256 Gbit/s",
      load: "34.1%",
      integrity: "99.92%",
    },
  },
  {
    id: "development",
    step: "03",
    title: "Secure Development & Integration",
    description:
      "Using modern technologies and secure coding practices, we build reliable digital platforms engineered for speed, scalability, and resilience.",
    deliverables: [
      "Frontend Development",
      "Backend Development",
      "API Integrations",
      "Security Hardening",
      "Performance Optimization",
    ],
    visualTheme: ["Code Generation", "System Assembly", "Security Layer Integration"],
    status: "COMPILING",
    telemetry: {
      frequency: "890.5 MHz",
      bitrate: "512 Gbit/s",
      load: "68.7%",
      integrity: "100.00%",
    },
  },
  {
    id: "testing",
    step: "04",
    title: "Testing, Deployment & Optimization",
    description:
      "Every project undergoes extensive testing, validation, and optimization before deployment to ensure reliability, security, and performance.",
    deliverables: [
      "Quality Assurance",
      "Security Validation",
      "Performance Audits",
      "Deployment",
      "Continuous Monitoring",
    ],
    visualTheme: ["System Validation", "Launch Sequence", "Infrastructure Activation"],
    status: "LAUNCHED",
    telemetry: {
      frequency: "1024.0 MHz",
      bitrate: "1024 Gbit/s",
      load: "11.2%",
      integrity: "100.00%",
    },
  },
];

export function ProcessSection() {
  const [activeIdx, setActiveIdx] = React.useState<number>(0);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(true);
  const [bootSequence, setBootSequence] = React.useState<boolean>(false);
  const playbackTimer = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const activeStage = PROCESS_STAGES[activeIdx];

  // Auto playback rotation effect
  React.useEffect(() => {
    if (isPlaying) {
      playbackTimer.current = setInterval(() => {
        setBootSequence(true);
        setTimeout(() => setBootSequence(false), 300);
        setActiveIdx((prev) => (prev + 1) % PROCESS_STAGES.length);
      }, 6000);
    }
    return () => {
      if (playbackTimer.current) {
        clearInterval(playbackTimer.current);
      }
    };
  }, [isPlaying]);

  const selectStage = (idx: number) => {
    setIsPlaying(false); // Pause autoplay on user click
    setBootSequence(true);
    setTimeout(() => setBootSequence(false), 300);
    setActiveIdx(idx);
  };

  return (
    <section
      id="our-process"
      className="relative w-full py-24 bg-[#03070f]/75 z-30 overflow-hidden border-t border-border/40"
    >
      {/* HUD Scanline & Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.003)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.003)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />

      {/* Cyber ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-16"
          badge={{ icon: <Activity className="w-3.5 h-3.5 animate-pulse" />, label: "Execution Pipeline" }}
          heading={<>Our Development <GradText>Process</GradText></>}
          sub="A security-first development lifecycle engineered to transform ideas into scalable, secure, and high-performance digital platforms."
        />

        {/* ─── CONSOLE CONTROL HUD BAR ─── */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-border/30 bg-card/25 rounded-2xl p-4 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f0ff] animate-ping" />
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              SYSTEM_STATE:{" "}
              <span className="text-foreground font-bold font-mono">
                {isPlaying ? "AUTOPLAY_RUNNING" : "AUTOPLAY_PAUSED"}
              </span>
            </span>
          </div>

          {/* Connected timeline indicators */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-muted-foreground/60">
            {PROCESS_STAGES.map((s, idx) => (
              <React.Fragment key={s.id}>
                <button
                  onClick={() => selectStage(idx)}
                  className={`cursor-pointer transition-all ${
                    idx === activeIdx
                      ? "text-primary font-bold"
                      : "hover:text-foreground"
                  }`}
                >
                  STEP_0{idx + 1}
                </button>
                {idx < PROCESS_STAGES.length - 1 && (
                  <span className="text-border/40 font-mono">---</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg border border-border/40 hover:border-primary/40 bg-background-2/50 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title={isPlaying ? "Pause Rotation" : "Start Autoplay"}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>
            <button
              onClick={() => {
                setBootSequence(true);
                setTimeout(() => setBootSequence(false), 300);
                setActiveIdx(0);
              }}
              className="p-1.5 rounded-lg border border-border/40 hover:border-primary/40 bg-background-2/50 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              title="Reset Sequence"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ─── DIGITAL COMMAND CENTER GRID ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT COMMAND SCREEN: SYSTEM DIAGNOSTIC SCHEMATIC (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-border/30 bg-[#060d1a]/60 rounded-3xl p-6 relative overflow-hidden backdrop-blur-md">
            {/* Glowing corners styling */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary/40 rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary/40 rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary/40 rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary/40 rounded-br-xl" />

            <div>
              {/* Telemetry diagnostics header */}
              <div className="flex justify-between items-center mb-6 border-b border-border/15 pb-3 font-mono text-[9px] text-muted-foreground/60">
                <span>SYSTEM DIAGNOSTIC GRAPH // SEC_SYS_MAP</span>
                <span className="text-primary font-bold">
                  SYS_ACTIVE: {activeStage.status}
                </span>
              </div>

              {/* Dynamic Animated Core Visual Area */}
              <div className="aspect-square w-full relative border border-border/20 rounded-2xl bg-black/45 flex items-center justify-center p-8 overflow-hidden group">
                {/* HUD Grid background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#03070f_100%)] pointer-events-none z-10" />

                {/* Animated scanline */}
                <div className="absolute left-0 w-full h-[2px] bg-primary/20 shadow-glow-sm pointer-events-none z-10 animate-[scanline_8s_linear_infinite]" />

                {/* Main animated layout diagram according to active index */}
                <div
                  className={`w-full h-full flex items-center justify-center transition-all duration-300 ${
                    bootSequence ? "scale-95 opacity-20 blur-sm" : "scale-100 opacity-100"
                  }`}
                >
                  {activeIdx === 0 && (
                    <StageOneVisual color="#09b2d4" />
                  )}
                  {activeIdx === 1 && (
                    <StageTwoVisual color="#1d70f6" />
                  )}
                  {activeIdx === 2 && (
                    <StageThreeVisual color="#a855f7" />
                  )}
                  {activeIdx === 3 && (
                    <StageFourVisual color="#10b981" />
                  )}
                </div>
              </div>
            </div>

            {/* Live Ticking telemetry block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border/15 font-mono text-[9px]">
              <div>
                <span className="text-muted-foreground/60 block uppercase">
                  Sys Freq:
                </span>
                <span className="text-foreground font-bold">
                  {activeStage.telemetry.frequency}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/60 block uppercase">
                  Data Rate:
                </span>
                <span className="text-foreground font-bold">
                  {activeStage.telemetry.bitrate}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/60 block uppercase">
                  Core Load:
                </span>
                <span className="text-foreground font-bold">
                  {activeStage.telemetry.load}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground/60 block uppercase">
                  Integrity:
                </span>
                <span className="text-emerald-400 font-bold">
                  {activeStage.telemetry.integrity}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT SCREEN: WORKFLOW INFORMATION CONTROLLER (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            {/* STAGE SELECTOR BUTTONS COLUMN */}
            <div className="flex sm:grid sm:grid-cols-4 gap-3 overflow-x-auto sm:overflow-x-visible pb-3 sm:pb-0 scrollbar-none snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
              {PROCESS_STAGES.map((s, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={s.id}
                    onClick={() => selectStage(idx)}
                    className={`relative p-3.5 rounded-xl border flex flex-col items-start gap-1 cursor-pointer text-left transition-all snap-start min-w-[145px] sm:min-w-0 flex-shrink-0 sm:flex-shrink ${
                      isActive
                        ? "border-primary bg-primary/10 shadow-glow-sm"
                        : "border-border/30 bg-card/45 hover:border-border/60 hover:bg-card/75"
                    }`}
                  >
                    <span
                      className={`text-[9px] font-mono font-bold ${
                        isActive ? "text-primary" : "text-muted-foreground/50"
                      }`}
                    >
                      STAGE_0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-foreground font-display line-clamp-1">
                      {s.id === "discovery"
                        ? "Discovery"
                        : s.id === "architecture"
                          ? "Architecture"
                          : s.id === "development"
                            ? "Development"
                            : "Testing"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CORE CONTENT COMMAND BOX */}
            <GlassPanel
              intensity="strong"
              rounded="lg"
              shadow="float"
              className={`flex-1 p-6 md:p-8 border border-border/40 bg-card/35 flex flex-col justify-between transition-all duration-300 ${
                bootSequence ? "opacity-35 translate-y-1" : "opacity-100 translate-y-0"
              }`}
            >
              <div className="space-y-6">
                {/* Header row */}
                <div className="flex justify-between items-center border-b border-border/15 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-primary uppercase tracking-widest font-bold block mb-1">
                      {"// PROCESS COMPONENT // STEP_0"}{activeStage.step}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold text-foreground font-display leading-tight">
                      {activeStage.title}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-md border border-primary/20 bg-primary/5 text-primary text-[8px] font-mono font-bold tracking-widest uppercase">
                    {activeStage.status}
                  </span>
                </div>

                {/* Stage description */}
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {activeStage.description}
                </p>

                {/* Two columns: Deliverables + Visual Themes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-widest mb-3 border-b border-border/10 pb-1 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary" />
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs text-muted-foreground font-mono">
                      {activeStage.deliverables.map((item, i) => (
                        <li key={i} className="flex gap-2 items-center">
                          <ChevronRight className="w-3 h-3 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-mono font-bold text-foreground uppercase tracking-widest mb-3 border-b border-border/10 pb-1 flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-cyan-400" />
                      Visual OS Subsystems
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeStage.visualTheme.map((theme, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono bg-[#060d1a] border border-border/30 text-muted-foreground px-2 py-1 rounded"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Console logs output */}
              <div className="mt-8 border-t border-border/10 pt-4 font-mono text-[8px] text-muted-foreground/35 flex justify-between items-center">
                <span>CYDROID_OS_LOG // CONNECTED_STAGE_STABLE</span>
                <span>CMD_ID: 0x_{activeStage.id.toUpperCase()}</span>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}

// ================================================================
// DYNAMIC SVG DIAGNOSTIC STAGES
// ================================================================

function StageOneVisual({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="80" stroke={`${color}20`} strokeWidth="1" />
      <circle cx="100" cy="100" r="55" stroke={`${color}40`} strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="100" cy="100" r="30" stroke={color} strokeWidth="1" />
      
      {/* Sonar sweep lines */}
      <line x1="100" y1="20" x2="100" y2="180" stroke={`${color}30`} strokeWidth="1" />
      <line x1="20" y1="100" x2="180" y2="100" stroke={`${color}30`} strokeWidth="1" />
      <line x1="43.4" y1="43.4" x2="156.6" y2="156.6" stroke={`${color}15`} strokeWidth="1" />
      <line x1="156.6" y1="43.4" x2="43.4" y2="156.6" stroke={`${color}15`} strokeWidth="1" />

      {/* Target scanning indicator */}
      <path d="M 75,70 L 65,70 L 65,80" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 125,70 L 135,70 L 135,80" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 75,130 L 65,130 L 65,120" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 125,130 L 135,130 L 135,120" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Pulsing scanning beam */}
      <circle cx="100" cy="100" r="45" fill="none" stroke={color} strokeWidth="2" className="animate-ping opacity-60" />
      
      {/* Active scanning nodes */}
      <circle cx="100" cy="45" r="4" fill={color} />
      <circle cx="145" cy="100" r="4" fill={color} />
      <circle cx="100" cy="155" r="4" fill={color} />
      <circle cx="55" cy="100" r="4" fill={color} />
    </svg>
  );
}

function StageTwoVisual({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="30" y="30" width="140" height="140" rx="12" stroke={`${color}20`} strokeWidth="1" />
      
      {/* 3D orthographic structure modeling lines */}
      <line x1="30" y1="30" x2="65" y2="65" stroke={`${color}40`} strokeWidth="1" />
      <line x1="170" y1="30" x2="135" y2="65" stroke={`${color}40`} strokeWidth="1" />
      <line x1="30" y1="170" x2="65" y2="135" stroke={`${color}40`} strokeWidth="1" />
      <line x1="170" y1="170" x2="135" y2="135" stroke={`${color}40`} strokeWidth="1" />
      
      <rect x="65" y="65" width="70" height="70" rx="6" stroke={color} strokeWidth="1.5" fill="none" />
      
      {/* Architecture nodes connection */}
      <circle cx="65" cy="65" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
      <circle cx="135" cy="65" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
      <circle cx="65" cy="135" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
      <circle cx="135" cy="135" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="100" r="5" fill={color} />

      {/* Linked channels */}
      <line x1="100" y1="100" x2="65" y2="65" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="100" y1="100" x2="135" y2="65" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="100" y1="100" x2="65" y2="135" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="100" y1="100" x2="135" y2="135" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

function StageThreeVisual({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Code Compilation Module mockup */}
      <rect x="40" y="40" width="120" height="120" rx="8" stroke={`${color}30`} strokeWidth="1" />
      
      {/* Code syntax rows */}
      <line x1="55" y1="60" x2="110" y2="60" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="75" x2="140" y2="75" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="90" x2="85" y2="90" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="105" x2="130" y2="105" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="70" y1="120" x2="105" y2="120" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="55" y1="135" x2="95" y2="135" stroke={color} strokeWidth="2" strokeLinecap="round" />

      {/* Security Overlay shield */}
      <rect x="120" y="110" width="45" height="50" rx="6" fill="#03070f" stroke={color} strokeWidth="1.5" />
      
      {/* Lock symbol inside shield */}
      <path d="M 134,136 V 131 C 134,127 137.5,125 141,125 C 144.5,125 148,127 148,131 V 136 M 130,136 H 152 V 149 H 130 Z" stroke={color} strokeWidth="1" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function StageFourVisual({ color }: { color: string }) {
  return (
    <svg className="w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="75" stroke={`${color}20`} strokeWidth="1" />
      
      {/* Signal launch vectors */}
      <path d="M 100,25 C 100,25 60,60 60,105 C 60,150 100,175 100,175 C 100,175 140,150 140,105 C 140,60 100,25 100,25 Z" stroke={`${color}40`} strokeWidth="1" />
      
      <circle cx="100" cy="100" r="40" stroke={color} strokeWidth="1.5" />

      {/* Active telemetry heartbeat radar */}
      <path d="M 70,100 H 90 L 95,85 L 100,120 L 105,95 L 110,100 H 130" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Orbit nodes */}
      <circle cx="100" cy="25" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
      <circle cx="100" cy="175" r="4.5" fill="#ffffff" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}
