"use client";

import * as React from "react";
import {
  Activity,
  Shield,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

// ================================================================
// TECHNOLOGY DIVISIONS DATA ARCHITECTURE
// ================================================================

interface Division {
  id: string;
  name: string;
  role: string;
  bio: string;
  github: string;
  linkedin: string;
  avatarType: "dev" | "sec";
  themeColor: string; // Accent color
  skills: string[];
}

const DIVISIONS_DATA: Division[] = [
  {
    id: "software-cloud",
    name: "Software Engineering & Cloud",
    role: "Enterprise Scalability & Cloud Platforms",
    bio: "Specializing in enterprise software architecture, responsive web systems, API designs, cloud-native deployments, and database engineering solutions built for long-term scalability.",
    github: "https://github.com/cydroid-technologies",
    linkedin: "https://linkedin.com/company/cydroid-technologies",
    avatarType: "dev",
    themeColor: "#09b2d4", // Electric Cyan
    skills: [
      "Enterprise Software",
      "Web Applications",
      "Cloud Solutions",
      "DevOps Engineering",
      "Database Design",
      "API Integrations",
      "React / Next.js",
      "TypeScript",
      "Performance Tuning",
    ],
  },
  {
    id: "ai-automation",
    name: "AI & Business Automation",
    role: "Intelligent Systems & Workflow Automation",
    bio: "Specializing in workflow orchestration, intelligent automation, artificial intelligence systems, custom data pipelines, and predictive models that optimize operational efficiency.",
    github: "https://github.com/cydroid-technologies",
    linkedin: "https://linkedin.com/company/cydroid-technologies",
    avatarType: "sec",
    themeColor: "#38BDF8", // Sky Blue
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Workflow Automation",
      "Intelligent Agents",
      "Process Mining",
      "Data Pipelines",
      "API Development",
      "System Integrations",
      "Security Audits",
    ],
  },
];


// ================================================================
// DYNAMIC SVG AVATAR SILHOUETTES
// ================================================================

function DivisionAvatar({
  type,
  color,
}: {
  type: "dev" | "sec";
  color: string;
}) {
  if (type === "dev") {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="devGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`${color}30`} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="80" fill="url(#devGlow)" />
        <circle
          cx="100"
          cy="100"
          r="70"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
          className="opacity-30"
        />

        {/* Silhouette head mockup */}
        <circle
          cx="100"
          cy="80"
          r="28"
          fill="#0c1630"
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M64 150 C64 122 80 112 100 112 C120 112 136 122 136 150 H64 Z"
          fill="#0c1630"
          stroke={color}
          strokeWidth="2"
        />

        {/* Coding nodes floating overlay */}
        <path
          d="M 50,80 L 70,100 L 50,120"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 150,80 L 130,100 L 150,120"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="90"
          y1="130"
          x2="110"
          y2="130"
          stroke={color}
          strokeWidth="2"
          className="animate-pulse"
        />

        {/* Network connections */}
        <circle cx="100" cy="30" r="3" fill="#ffffff" />
        <line
          x1="100"
          y1="33"
          x2="100"
          y2="52"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <circle cx="50" cy="100" r="3" fill={color} />
        <circle cx="150" cy="100" r="3" fill={color} />
      </svg>
    );
  }

  // Security avatar
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="secGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={`${color}30`} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#secGlow)" />
      <circle
        cx="100"
        cy="100"
        r="70"
        stroke={color}
        strokeWidth="1"
        className="opacity-25"
      />

      {/* Silhouette head mockup with security visor overlay */}
      <circle
        cx="100"
        cy="80"
        r="28"
        fill="#0c1630"
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M64 150 C64 122 80 112 100 112 C120 112 136 122 136 150 H64 Z"
        fill="#0c1630"
        stroke={color}
        strokeWidth="2"
      />

      {/* Visor shield grid */}
      <rect
        x="84"
        y="74"
        width="32"
        height="10"
        rx="2"
        fill={`${color}20`}
        stroke={color}
        strokeWidth="1"
      />

      {/* Security radar grids */}
      <path
        d="M100 32 L120 42 V56 C120 70 100 78 100 78 C100 78 80 70 80 56 V42 L100 32 Z"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        className="opacity-40 animate-pulse"
      />
      <circle cx="100" cy="54" r="2.5" fill={color} />

      {/* Dynamic scanlines */}
      <line
        x1="30"
        y1="100"
        x2="170"
        y2="100"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="5 5"
        className="opacity-30"
      />
      <line
        x1="100"
        y1="30"
        x2="100"
        y2="170"
        stroke={color}
        strokeWidth="0.5"
        strokeDasharray="5 5"
        className="opacity-30"
      />
    </svg>
  );
}

// ================================================================
// MAIN TEAM SECTION
// ================================================================

export function TeamSection() {
  const profilesGridRef = React.useRef<HTMLDivElement>(null);
  const strengthRef = React.useRef<HTMLDivElement>(null);

  return (
    <section
      id="team-showcase"
      className="relative w-full py-24 bg-[#03070f]/80 z-30 overflow-hidden"
    >
      {/* Decorative top grid lines connector */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Volumetric background lights */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-20"
          badge={{ icon: <Activity className="w-3.5 h-3.5" />, label: "Expertise Divisions" }}
          heading={<>Our Technology <GradText>Divisions</GradText></>}
          sub="Delivering scalable enterprise-grade software, cloud infrastructure, business automation, and cyber protection under one roof."
        />

        {/* ─── DIVISIONS PROFILES GRID ─── */}
        <div
          ref={profilesGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-5xl mx-auto"
        >
          {DIVISIONS_DATA.map((division) => (
            <div
              key={division.id}
              className="group rounded-2xl border border-border/40 bg-card/40 hover:bg-card/75 hover:border-primary/45 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between overflow-hidden relative shadow-float hover:scale-[1.005]"
            >
              {/* Internal glow overlay */}
              <div
                className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: `inset 0 0 16px ${division.themeColor}15` }}
              />

              <div className="space-y-6 relative z-10">
                {/* Profile Header Row */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  <div className="w-24 h-24 rounded-2xl bg-[#060d1a] border border-border/40 p-2 flex items-center justify-center flex-shrink-0 group-hover:border-primary/30 transition-colors">
                    <DivisionAvatar
                      type={division.avatarType}
                      color={division.themeColor}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground font-display">
                      {division.name}
                    </h3>
                    <span
                      className="text-xs font-mono block mb-3 font-semibold"
                      style={{ color: division.themeColor }}
                    >
                      {division.role}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {division.bio}
                    </p>
                  </div>
                </div>

                {/* Interactive Skills Chip Clusters */}
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-foreground/80 uppercase tracking-widest mb-3 border-b border-border/10 pb-1">
                    Specialized Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {division.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono bg-[#060d1a]/80 text-muted-foreground border border-border/30 px-2 py-0.5 rounded-md hover:border-primary/30 hover:text-foreground hover:bg-[#060d1a] transition-all duration-200 cursor-default"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social Anchors Footer */}
              <div className="border-t border-border/10 mt-6 pt-4 flex justify-between items-center relative z-10 text-xs font-mono">
                <span className="text-muted-foreground/45 text-[8px]">
                  DIVISION SECURE ID // 0x_{division.id.toUpperCase().replace('-', '_')}
                </span>
                <div className="flex gap-2">
                  <a
                    href={division.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg bg-[#060d1a] border border-border/40 hover:border-primary/45 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${division.name} GitHub repository`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                  <a
                    href={division.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-lg bg-[#060d1a] border border-border/40 hover:border-primary/45 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={`${division.name} LinkedIn page`}
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ─── COMBINED STRENGTH FEATURED HIGHLIGHT ─── */}
        <div ref={strengthRef} className="relative w-full mb-28">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/5 rounded-2xl pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <GlassPanel
            intensity="default"
            rounded="lg"
            shadow="float"
            padding="lg"
            className="border border-primary/25 bg-card/35 relative overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-4 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary flex-shrink-0 animate-pulse">
                  <Shield className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider block mb-0.5">
                    Engineering Synergy
                  </span>
                  <h3 className="text-lg md:text-xl font-display font-extrabold text-foreground leading-tight">
                    Development Meets Security
                  </h3>
                </div>
              </div>
              <div className="lg:col-span-8">
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  CYDROID TECHNOLOGIES combines development expertise and
                  cloud engineering knowledge under one roof. This{" "}
                  <strong className="text-foreground">
                    dual-specialization approach
                  </strong>{" "}
                  allows businesses to build digital platforms that are not only
                  modern and scalable but also secure and resilient by design.
                  We eliminate the friction of coordinating separate design
                  agencies and audit teams.
                </p>
              </div>
            </div>
          </GlassPanel>
        </div>




      </div>
    </section>
  );
}
