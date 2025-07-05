"use client";

import * as React from "react";
import Link from "next/link";
import {
  Globe,
  Lock,
  Wrench,
  ArrowRight,
  Cpu,
  Activity,
  Check,
  Settings,
  Brain,
  Smartphone,
  Terminal,
  Palette,
  Link as LinkIcon,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

// ================================================================
// COMPONENT CONSTANTS & DATA DEFINITIONS
// ================================================================

interface ServiceCategory {
  id: string;
  moduleName: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ElementType;
  themeColor: string; // Tailwind color classes
  accentColor: string; // RGB/Hex for dynamic gradients
  status: string;
  telemetry: {
    temp: string;
    sync: string;
    load: string;
    efficiency: string;
  };
  subServices: string[];
  benefits: {
    name: string;
    value: number; // progress bar percentage
    desc: string;
  }[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "enterprise-software",
    moduleName: "Subsystem 01 / Core Module",
    title: "Enterprise Software Development",
    headline: "Scalable Enterprise Applications",
    description:
      "Design and development of enterprise-grade software solutions tailored to complex business requirements. We create scalable applications that improve operational efficiency, automate business processes, and support organizational growth.",
    icon: Cpu,
    themeColor: "text-cyan-400 border-cyan-500/20 bg-cyan-500/5",
    accentColor: "#09b2d4",
    status: "ACTIVE",
    telemetry: {
      temp: "32.4°C",
      sync: "99.8%",
      load: "12.4%",
      efficiency: "98.7%",
    },
    subServices: [
      "Custom Enterprise Applications",
      "Business Process Automation",
      "ERP & CRM Solutions",
      "SaaS Platforms",
      "Workflow Management Systems",
      "Scalable Architecture",
    ],
    benefits: [
      {
        name: "Operational Efficiency",
        value: 96,
        desc: "Streamline workflows and eliminate manual process bottlenecks.",
      },
      {
        name: "Scalability",
        value: 98,
        desc: "Architected to handle growing user bases and enterprise transaction loads.",
      },
      {
        name: "Modern UX",
        value: 94,
        desc: "Intuitive designs that increase staff productivity and system adoption.",
      },
    ],
  },
  {
    id: "cloud-engineering",
    moduleName: "Subsystem 02 / Infrastructure Module",
    title: "Cloud Engineering",
    headline: "Secure Cloud Infrastructure",
    description:
      "Build secure, scalable, and cloud-native infrastructure that supports modern applications while ensuring reliability, performance, and business continuity.",
    icon: Globe,
    themeColor: "text-blue-400 border-blue-500/20 bg-blue-500/5",
    accentColor: "#1E88E5",
    status: "STABLE",
    telemetry: {
      temp: "28.5°C",
      sync: "99.99%",
      load: "6.8%",
      efficiency: "99.9%",
    },
    subServices: [
      "Cloud Infrastructure",
      "Cloud Migration",
      "Containerization",
      "Kubernetes",
      "Serverless Computing",
      "Cloud Monitoring",
      "Infrastructure Automation",
    ],
    benefits: [
      {
        name: "High Availability",
        value: 99,
        desc: "Multi-region redundancy and failover paths prevent server downtime.",
      },
      {
        name: "Infrastructure as Code",
        value: 95,
        desc: "Automated provisioning with Terraform for reproducible environments.",
      },
      {
        name: "Containerization",
        value: 98,
        desc: "Isolated Docker workloads managed seamlessly via Kubernetes.",
      },
    ],
  },
  {
    id: "ai-solutions",
    moduleName: "Subsystem 03 / Intelligence Module",
    title: "AI Solutions",
    headline: "Intelligent Digital Experiences",
    description:
      "Leverage Artificial Intelligence to automate workflows, improve decision-making, and build intelligent digital experiences.",
    icon: Brain,
    themeColor: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    accentColor: "#a855f7",
    status: "RUNNING",
    telemetry: {
      temp: "34.6°C",
      sync: "99.1%",
      load: "18.2%",
      efficiency: "96.5%",
    },
    subServices: [
      "AI Chatbots",
      "Workflow Automation",
      "AI Assistants",
      "Machine Learning Integration",
      "Natural Language Processing",
      "Business Intelligence",
      "Predictive Analytics",
    ],
    benefits: [
      {
        name: "Intelligent Automation",
        value: 95,
        desc: "Automate complex decision logic and repetitive service tasks.",
      },
      {
        name: "Data Insights",
        value: 97,
        desc: "Extract hidden patterns from unstructured logs and document data.",
      },
      {
        name: "Conversational Agents",
        value: 94,
        desc: "Natural AI chat systems that resolve customer issues 24/7.",
      },
    ],
  },
  {
    id: "mobile-dev",
    moduleName: "Subsystem 04 / Mobility Module",
    title: "Mobile Development",
    headline: "Cross-Platform Mobile Applications",
    description:
      "Develop modern, high-performance mobile applications that deliver seamless user experiences across Android and iOS platforms.",
    icon: Smartphone,
    themeColor: "text-amber-400 border-amber-500/20 bg-amber-500/5",
    accentColor: "#f59e0b",
    status: "DEPLOYED",
    telemetry: {
      temp: "30.2°C",
      sync: "99.4%",
      load: "11.5%",
      efficiency: "97.8%",
    },
    subServices: [
      "Android Applications",
      "iOS Applications",
      "Cross-Platform Development",
      "Progressive Web Apps",
      "Mobile API Integration",
      "App Store Deployment",
    ],
    benefits: [
      {
        name: "Cross-Platform Reach",
        value: 98,
        desc: "Single React Native/Flutter codebase serving both iOS and Android.",
      },
      {
        name: "App Store Readiness",
        value: 96,
        desc: "Fully compliant builds ready for immediate App Store submission.",
      },
      {
        name: "Offline Support",
        value: 92,
        desc: "Local caching and sync logic for seamless offline application state.",
      },
    ],
  },
  {
    id: "devops-engineering",
    moduleName: "Subsystem 05 / Automation Module",
    title: "DevOps Engineering",
    headline: "Continuous Delivery Pipelines",
    description:
      "Accelerate software delivery through automated deployment pipelines, infrastructure management, and continuous integration practices.",
    icon: Terminal,
    themeColor: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    accentColor: "#10b981",
    status: "ENFORCED",
    telemetry: {
      temp: "29.1°C",
      sync: "100.0%",
      load: "4.8%",
      efficiency: "99.5%",
    },
    subServices: [
      "CI/CD Pipelines",
      "Docker",
      "Kubernetes",
      "Infrastructure as Code",
      "Monitoring & Logging",
      "Deployment Automation",
      "Version Control",
    ],
    benefits: [
      {
        name: "Accelerated Delivery",
        value: 99,
        desc: "Reduce deployment cycles from weeks to minutes via CI/CD pipelines.",
      },
      {
        name: "Environment Parity",
        value: 97,
        desc: "Docker staging matches production exactly, eliminating config drifts.",
      },
      {
        name: "Proactive Monitoring",
        value: 96,
        desc: "Real-time alerts detect server congestion and memory leaks immediately.",
      },
    ],
  },
  {
    id: "uiux-design",
    moduleName: "Subsystem 06 / Interface Module",
    title: "UI/UX Design",
    headline: "Intuitive & Engaging User Interfaces",
    description:
      "Create visually engaging, intuitive, and user-focused digital experiences that improve customer satisfaction and product usability.",
    icon: Palette,
    themeColor: "text-pink-400 border-pink-500/20 bg-pink-500/5",
    accentColor: "#ec4899",
    status: "ACTIVE",
    telemetry: {
      temp: "26.4°C",
      sync: "99.7%",
      load: "8.2%",
      efficiency: "98.2%",
    },
    subServices: [
      "User Research",
      "Wireframing",
      "Interactive Prototypes",
      "UI Design",
      "UX Strategy",
      "Design Systems",
      "Responsive Interfaces",
      "Accessibility Compliance",
    ],
    benefits: [
      {
        name: "User Satisfaction",
        value: 96,
        desc: "Frictionless flows optimized for conversion and repeat engagement.",
      },
      {
        name: "Design Consistency",
        value: 98,
        desc: "Reusable UI kit component tokens guarantee brand consistency.",
      },
      {
        name: "Accessibility",
        value: 100,
        desc: "Full WCAG 2.1 compliance checking for screen-readers and high contrast.",
      },
    ],
  },
  {
    id: "api-dev",
    moduleName: "Subsystem 07 / Connection Module",
    title: "API Development & Integration",
    headline: "Secure & Documented API Connections",
    description:
      "Develop secure, scalable, and well-documented APIs that connect applications, automate workflows, and enable seamless system integration.",
    icon: LinkIcon,
    themeColor: "text-orange-400 border-orange-500/20 bg-orange-500/5",
    accentColor: "#f97316",
    status: "STABLE",
    telemetry: {
      temp: "31.8°C",
      sync: "99.9%",
      load: "14.5%",
      efficiency: "99.1%",
    },
    subServices: [
      "REST API Development",
      "GraphQL APIs",
      "Third-Party Integration",
      "Payment Gateway Integration",
      "Authentication Systems",
      "API Documentation",
      "Webhooks",
    ],
    benefits: [
      {
        name: "Seamless Integrations",
        value: 97,
        desc: "Connect ERPs, CRMs, billing systems, and third-party tools cleanly.",
      },
      {
        name: "Robust Security",
        value: 99,
        desc: "OAuth2, JWT authentication, rate limiting, and parameter validation.",
      },
      {
        name: "Detailed Documentation",
        value: 95,
        desc: "Swagger/Postman API registries for developer-friendly onboarding.",
      },
    ],
  },
  {
    id: "maintenance-support",
    moduleName: "Subsystem 08 / Maintenance Module",
    title: "Maintenance & Support",
    headline: "Continuous Monitoring & Technical Support",
    description:
      "Provide continuous monitoring, maintenance, updates, and technical support to ensure applications remain secure, stable, and optimized.",
    icon: Wrench,
    themeColor: "text-teal-400 border-teal-500/20 bg-teal-500/5",
    accentColor: "#14b8a6",
    status: "MONITORED",
    telemetry: {
      temp: "31.2°C",
      sync: "99.6%",
      load: "5.1%",
      efficiency: "99.6%",
    },
    subServices: [
      "Website Maintenance",
      "Performance Optimization",
      "Bug Fixes",
      "Security Updates",
      "Database Optimization",
      "Backup & Recovery",
      "Technical Support",
      "Monitoring Services",
    ],
    benefits: [
      {
        name: "Reduced Downtime",
        value: 99,
        desc: "Proactive updates and hotfixes prevent critical system outages.",
      },
      {
        name: "Uptime SLA",
        value: 98,
        desc: "Guaranteed support response times for production support queries.",
      },
      {
        name: "System Stability",
        value: 96,
        desc: "Routine data tuning, cache clears, and version upgrades prevent code rot.",
      },
    ],
  },
  {
    id: "cybersecurity-solutions",
    moduleName: "Subsystem 09 / Security Module",
    title: "Cybersecurity Solutions",
    headline: "Vulnerability Assessments & Hardening",
    description:
      "Protect digital assets with comprehensive cybersecurity services designed to identify vulnerabilities, strengthen security posture, and defend against evolving cyber threats.",
    icon: Lock,
    themeColor: "text-red-400 border-red-500/20 bg-red-500/5",
    accentColor: "#ef4444",
    status: "ARMED",
    telemetry: {
      temp: "33.7°C",
      sync: "100.0%",
      load: "9.5%",
      efficiency: "99.9%",
    },
    subServices: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Audits",
      "Web Application Security Testing",
      "API Security Assessment",
      "Network Security Review",
      "Secure Code Review",
      "Security Hardening",
      "Cloud Security Assessment",
      "Incident Response Guidance",
    ],
    benefits: [
      {
        name: "Defended Workloads",
        value: 100,
        desc: "Mitigate OWASP Top 10 vulnerabilities and network attack surfaces.",
      },
      {
        name: "Remediation Guidance",
        value: 98,
        desc: "Actionable priority checklists to fix vulnerabilities safely.",
      },
      {
        name: "Regulatory Readiness",
        value: 95,
        desc: "Hardened configurations supporting GDPR/PCI-DSS standards.",
      },
    ],
  },
];


// ================================================================
// REUSABLE DRAWERS / INNER COMPONENTS
// ================================================================

function CircuitPathway({ activeColor }: { activeColor: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-30 select-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50,50 L 150,50 L 180,80 L 300,80 L 330,110 L 330,250 L 290,290 L 150,290 L 100,340"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray="6 6"
          className="opacity-40"
        />
        <path
          d="M 350,50 L 250,50 L 220,80 L 100,80 L 70,110 L 70,250 L 110,290 L 250,290 L 300,340"
          stroke={activeColor}
          strokeWidth="1.5"
          className="opacity-20"
        />
        {/* Pulsing Core node indicator */}
        <circle
          cx="200"
          cy="180"
          r="16"
          stroke={activeColor}
          strokeWidth="1"
          className="animate-pulse"
        />
        <circle cx="200" cy="180" r="6" fill={activeColor} />
        <line
          x1="200"
          y1="50"
          x2="200"
          y2="164"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="200"
          y1="196"
          x2="200"
          y2="310"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="50"
          y1="180"
          x2="184"
          y2="180"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        <line
          x1="216"
          y1="180"
          x2="350"
          y2="180"
          stroke={activeColor}
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
      </svg>
    </div>
  );
}

export function ServicesSection() {
  const [activeCategoryIndex, setActiveCategoryIndex] = React.useState(0);
  const cardsRef = React.useRef<HTMLDivElement>(null);

  const activeCategory = SERVICES_DATA[activeCategoryIndex];
  const ActiveIcon = activeCategory.icon;

  return (
    <section
      id="services-showcase"
      className="relative w-full py-24 bg-[#03070f]/80 z-30 overflow-hidden"
    >
      {/* Decorative top border grid connector link to About */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Cyber glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-20"
          badge={{ icon: <Cpu className="w-3.5 h-3.5" />, label: "Capabilities & Subsystems" }}
          heading={<>Our <GradText>Services</GradText></>}
          sub="Secure digital solutions engineered for growth, performance, and long-term success."
        />

        {/* ─── SERVICES STORYTELLING HUB ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-32">
          {/* LEFT: Robot Subsystem Modules Menu */}
          <div
            ref={cardsRef}
            className="lg:col-span-4 flex flex-col gap-4 w-full"
          >
            {SERVICES_DATA.map((category, idx) => {
              const Icon = category.icon;
              const isActive = activeCategoryIndex === idx;

              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`text-left w-full p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-glow-sm scale-[1.01]"
                      : "border-border/40 bg-card/40 hover:bg-card/75 hover:border-border-strong hover:scale-[1.005]"
                  }`}
                  style={{ cursor: "pointer" }}
                  aria-pressed={isActive}
                >
                  {/* Accent border bar */}
                  {isActive && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{ backgroundColor: category.accentColor }}
                    />
                  )}

                  {/* Glass lighting shine overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive
                          ? category.themeColor
                          : "text-muted-foreground border-border/30 bg-muted/5"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-muted-foreground block mb-0.5">
                        {category.moduleName}
                      </span>
                      <h3 className="text-base font-bold text-foreground font-display leading-tight">
                        {category.title}
                      </h3>
                    </div>
                    <div className="text-right font-mono text-[9px] hidden sm:block">
                      <span
                        className={`px-2 py-0.5 rounded-full border text-[9px] font-bold ${
                          isActive
                            ? "bg-primary/25 border-primary/45 text-foreground animate-pulse"
                            : "bg-muted/10 border-border/10 text-muted-foreground/60"
                        }`}
                      >
                        {category.status}
                      </span>
                    </div>
                  </div>

                  {/* Micro stats shown only on selected subsystem card */}
                  {isActive && (
                    <div className="mt-4 pt-3 border-t border-border/20 grid grid-cols-3 gap-2 text-[8px] font-mono text-muted-foreground/80 animate-fade-in-up">
                      <div>
                        <span>LOAD: </span>
                        <span className="text-foreground font-bold">
                          {category.telemetry.load}
                        </span>
                      </div>
                      <div>
                        <span>SYNC: </span>
                        <span className="text-primary font-bold">
                          {category.telemetry.sync}
                        </span>
                      </div>
                      <div>
                        <span>TEMP: </span>
                        <span className="text-accent font-bold">
                          {category.telemetry.temp}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detailed Dashboard Control Panel */}
          <div className="lg:col-span-8 w-full">
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              padding="lg"
              className="relative overflow-hidden border border-border/40 bg-card/50 min-h-[520px] transition-all duration-500"
            >
              {/* Dynamic SVG circuitry matching category theme color */}
              <CircuitPathway activeColor={activeCategory.accentColor} />

              <div className="relative z-10 flex flex-col justify-between h-full">
                {/* HUD Top Bar */}
                <div className="flex flex-wrap justify-between items-center gap-2 border-b border-border/20 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border ${activeCategory.themeColor}`}
                    >
                      <ActiveIcon className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider block">
                        SYSTEM REGISTER //{" "}
                        {activeCategory.moduleName.toUpperCase()}
                      </span>
                      <h3 className="text-xl font-display font-extrabold text-foreground leading-tight">
                        {activeCategory.headline}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-[9px] bg-background-2/60 border border-border/30 px-3 py-1 rounded-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-muted-foreground">EFFICIENCY:</span>
                    <span className="text-foreground font-bold">
                      {activeCategory.telemetry.efficiency}
                    </span>
                  </div>
                </div>

                {/* Subsystem Description */}
                <p className="text-sm text-muted-foreground mb-8 leading-relaxed max-w-2xl">
                  {activeCategory.description}
                </p>

                {/* Grid Content: Sub-services & Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8">
                  {/* Left Column: Sub-Services Scope Checklist (Interactive Layout) */}
                  <div className="md:col-span-6 space-y-4">
                    <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-2 flex items-center gap-1.5">
                      <Settings className="w-3.5 h-3.5 text-primary" />
                      Engineering Scope
                    </h4>
                    <div className="grid grid-cols-1 gap-2.5">
                      {activeCategory.subServices.map((sub, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-center gap-2.5 p-2 rounded-lg bg-background-2/40 border border-border/20 text-xs text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-background-2/70 group"
                        >
                          <div className="w-4 h-4 rounded-md border border-primary/20 bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                          <span className="group-hover:text-foreground transition-colors">
                            {sub}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Performance and Business Benefits (Interactive Metrics) */}
                  <div className="md:col-span-6 space-y-5">
                    <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-2 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-accent" />
                      Performance Yields
                    </h4>
                    <div className="space-y-4">
                      {activeCategory.benefits.map((benefit, bIdx) => (
                        <div key={bIdx} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-foreground">
                              {benefit.name}
                            </span>
                            <span className="font-mono text-muted-foreground text-[10px]">
                              {benefit.value}%
                            </span>
                          </div>

                          {/* Animated Progress Bar */}
                          <div className="w-full h-1 bg-border/20 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-700 ease-out"
                              style={{
                                width: `${benefit.value}%`,
                                backgroundColor: activeCategory.accentColor,
                              }}
                            />
                          </div>

                          <p className="text-[10px] text-muted-foreground/75 leading-normal">
                            {benefit.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dashboard bottom control action */}
                <div className="border-t border-border/20 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono">
                  <div className="text-muted-foreground/75 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>
                      DIRECTIVE {activeCategoryIndex + 1}00_RUNNING // READINESS
                      STABLE
                    </span>
                  </div>
                  <Link href="/book-demo">
                    <Button
                      size="md"
                      className="group transition-all duration-300 shadow-glow hover:scale-[1.02]"
                    >
                      Scope This Subsystem
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>

      </div>
    </section>
  );
}
