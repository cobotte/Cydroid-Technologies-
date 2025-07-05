"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Layers,
  X,
  Lock,
  ExternalLink,
  Info,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

// ================================================================
// DATA SCHEMAS & TYPES
// ================================================================

interface Project {
  id: string;
  name: string;
  category: string; // Filter category
  allCategories: string[]; // For filtering against multiple tags
  badges: {
    label: string;
    variant:
      | "default"
      | "primary"
      | "secondary"
      | "accent"
      | "success"
      | "warning"
      | "danger"
      | "outline"
      | "ghost";
  }[];
  shortDesc: string;
  techStack: string[];
  graphicType: "cyber" | "browser" | "cart" | "chart";
  caseStudy: {
    clientGoal: string;
    challenge: string;
    solution: string;
    techUsed: string[];
    securityMeasures: string[];
    results: string;
    metrics: { label: string; value: string }[];
    lessonsLearned: string;
  };
  securityShowcase?: {
    assessmentType: string;
    protectionMeasures: string[];
    securityImprovements: string[];
    riskReduction: string;
    monitoringStrategy: string;
    securityOutcome: string;
  };
  liveDemoUrl?: string;
}

// ================================================================
// PROJECTS DATA DEFINITION
// ================================================================

const PORTFOLIO_PROJECTS: Project[] = [
  {
    id: "crm-dashboard",
    name: "Enterprise CRM Dashboard",
    category: "Web Applications",
    allCategories: ["Web Applications", "Enterprise Software"],
    badges: [
      { label: "Enterprise Software", variant: "primary" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "A secure, real-time customer relationship management dashboard engineered for modern enterprise sales cycles.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Node.js"],
    graphicType: "chart",
    caseStudy: {
      clientGoal: "Unify fragmented sales data across multiple regions into a single secure platform.",
      challenge: "Aggregating millions of customer touchpoints dynamically without causing database request blockages.",
      solution: "Implemented automated database aggregation and server-side cache layers on Next.js server actions.",
      techUsed: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "Chart.js"],
      securityMeasures: [
        "Role-based access controls (RBAC)",
        "Row-level security in database",
        "Input sanitization audits",
        "Encrypted database connections",
      ],
      results: "Sales team operational velocity increased by 40% with zero critical data leakage incidents.",
      metrics: [
        { label: "Operational Speedup", value: "+40%" },
        { label: "Data Leakage Rate", value: "0.0%" },
        { label: "Sync Latency", value: "<150ms" },
      ],
      lessonsLearned: "Dynamic database queries require strict indexes to maintain responsive dashboards under high transactional load.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "hospital-management",
    name: "Hospital Management Platform",
    category: "Web Applications",
    allCategories: ["Web Applications", "Healthcare"],
    badges: [
      { label: "Healthcare", variant: "accent" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "A HIPAA-compliant patient management, appointment scheduling, and electronic health records system.",
    techStack: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "HIPAA Compliance"],
    graphicType: "browser",
    caseStudy: {
      clientGoal: "Digitize appointment scheduling and patient record logging securely.",
      challenge: "Ensuring zero disclosure of Patient Health Information (PHI) while maintaining accessible UI flows.",
      solution: "Engineered end-to-end encrypted databases and strictly audited API routes with JWT authorization.",
      techUsed: ["React", "Node.js", "MongoDB", "AWS", "Express.js"],
      securityMeasures: [
        "End-to-end data encryption (AES-256)",
        "Strict HIPAA audit logs",
        "Multi-factor authentication (MFA)",
        "Automatic session timeouts",
      ],
      results: "Appointment scheduling queue reduced by 65% with complete privacy compliance.",
      metrics: [
        { label: "Queue Reduction", value: "65%" },
        { label: "HIPAA Audit Score", value: "100%" },
        { label: "Uptime SLA", value: "99.99%" },
      ],
      lessonsLearned: "Healthcare systems require early security integration at the database field level rather than general gateway firewalling.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "restaurant-platform",
    name: "Restaurant E-Commerce Platform",
    category: "E-Commerce",
    allCategories: ["E-Commerce", "Web Applications"],
    badges: [
      { label: "E-Commerce", variant: "primary" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "A high-throughput ordering, payment, and delivery dispatch platform built for regional restaurant groups.",
    techStack: ["Next.js", "Tailwind CSS", "Stripe API", "MongoDB", "Redux Toolkit"],
    graphicType: "cart",
    caseStudy: {
      clientGoal: "Deploy a custom digital ordering portal to bypass high aggregate fees from third-party services.",
      challenge: "Handling sudden high ordering volumes during peak lunch and dinner rush hours without server crashes.",
      solution: "Implemented statically generated menu pages with dynamic, lightweight shopping cart components.",
      techUsed: ["Next.js", "Stripe", "MongoDB", "Tailwind CSS", "Vercel Edge"],
      securityMeasures: [
        "Stripe PCI-compliant checkout flows",
        "Rate-limited order submission API",
        "CSRF protection tokens",
        "Cross-origin resource policy enforcement",
      ],
      results: "Cut transaction fees by 68% while handling over 10,000 orders daily during launch.",
      metrics: [
        { label: "Aggregate Fee Cut", value: "68%" },
        { label: "Peak Order Capacity", value: "15k/day" },
        { label: "Frist Contentful Paint", value: "0.4s" },
      ],
      lessonsLearned: "Statically pre-rendered menus speed up conversion rates and drastically lower page bounce rates.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "fitness-app",
    name: "Fitness Companion App",
    category: "Mobile Applications",
    allCategories: ["Mobile Applications", "AI Solutions"],
    badges: [
      { label: "Mobile App", variant: "secondary" },
      { label: "AI Integration", variant: "accent" },
    ],
    shortDesc:
      "A cross-platform mobile app featuring personalized AI workout suggestions and real-time workout tracking.",
    techStack: ["React Native", "TypeScript", "Node.js", "OpenAI API", "MongoDB"],
    graphicType: "browser",
    caseStudy: {
      clientGoal: "Provide users with customized workout suggestions based on target routines and progress telemetry.",
      challenge: "Achieving rapid AI recommendation responses within a mobile viewport under constrained cellular data.",
      solution: "Built a lightweight recommendation service leveraging OpenAI APIs with smart on-device request caching.",
      techUsed: ["React Native", "TypeScript", "Node.js", "Express.js", "Redis"],
      securityMeasures: [
        "Encrypted local device storage",
        "OAuth 2.0 social sign-on login",
        "Secure API key encapsulation",
        "SSL pinning validation",
      ],
      results: "Achieved 4.9/5 stars on app stores with over 50,000 active monthly user profiles.",
      metrics: [
        { label: "App Store Rating", value: "4.9/5" },
        { label: "Active Profiles", value: "50k+" },
        { label: "AI Response Time", value: "<1.2s" },
      ],
      lessonsLearned: "Mobile caching improves responsive speeds and lowers external API call billing fees.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "ecommerce-platform",
    name: "Enterprise Retail E-Commerce",
    category: "E-Commerce",
    allCategories: ["E-Commerce", "Web Development"],
    badges: [
      { label: "Enterprise", variant: "primary" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "A high-availability, multi-tenant digital storefront for an international fashion brand.",
    techStack: ["Next.js", "Tailwind CSS", "Shopify Storefront API", "PostgreSQL"],
    graphicType: "cart",
    caseStudy: {
      clientGoal: "Establish a headless storefront connecting to legacy inventory databases.",
      challenge: "Syncing product catalog inventory states instantly across multiple global warehouse servers.",
      solution: "Created webhooks syncing state changes to a centralized database with incremental static regeneration.",
      techUsed: ["Next.js", "Shopify API", "PostgreSQL", "Cloudflare CDN"],
      securityMeasures: [
        "Cloudflare WAF protection rules",
        "Encrypted webhook authentication keys",
        "Periodic automated system audits",
        "XSS scripting attack sanitization",
      ],
      results: "Conversion rates increased by 35% with complete inventory consistency globally.",
      metrics: [
        { label: "Conversion Growth", value: "+35%" },
        { label: "Global Warehouses Sync", value: "<5s" },
        { label: "Lighthouse Performance", value: "98/100" },
      ],
      lessonsLearned: "Headless commerce offers unmatched design freedom and page speed metrics compared to monolithic builders.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "ai-assistant",
    name: "Cognitive AI Customer Assistant",
    category: "AI Solutions",
    allCategories: ["AI Solutions", "Web Applications"],
    badges: [
      { label: "AI Integration", variant: "accent" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "An intelligent, natural conversational customer support agent integrated with enterprise CRM ticket databases.",
    techStack: ["Python", "FastAPI", "LangChain", "Vector DB", "React"],
    graphicType: "cyber",
    caseStudy: {
      clientGoal: "Resolve customer inquiries instantly to decrease human support ticket loads.",
      challenge: "Preventing AI model hallucinations when answering complex billing or shipping queries.",
      solution: "Engineered Retrieval-Augmented Generation (RAG) referencing strict corporate FAQ documentation.",
      techUsed: ["Python", "FastAPI", "Pinecone", "LangChain", "OpenAI GPT-4", "React"],
      securityMeasures: [
        "Prompt injection filters",
        "Personally Identifiable Information (PII) scrubbing",
        "Role-based API authentication",
        "Encrypted vector indexes",
      ],
      results: "Automated support resolved 70% of inbound customer tickets without human agent handoff.",
      metrics: [
        { label: "Ticket Auto-Resolution", value: "70%" },
        { label: "Support Wait Time", value: "0.2s" },
        { label: "Accuracy Rating", value: "99.2%" },
      ],
      lessonsLearned: "Vector database search boundaries must be strict to keep AI model answers aligned with brand facts.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "school-erp",
    name: "Comprehensive School ERP",
    category: "Web Applications",
    allCategories: ["Web Applications", "Enterprise Software"],
    badges: [
      { label: "EdTech", variant: "secondary" },
      { label: "Enterprise Software", variant: "primary" },
    ],
    shortDesc:
      "A complete student enrollment, class management, grading log, and parent portal enterprise ERP.",
    techStack: ["Angular", "TypeScript", "Spring Boot", "MySQL", "Docker"],
    graphicType: "browser",
    caseStudy: {
      clientGoal: "Replace several disjointed school portals with a single comprehensive ERP dashboard.",
      challenge: "Migrating over ten years of historical grade student log records without data corruption.",
      solution: "Designed automated data mapping scripts and performed staging migration simulations prior to deployment.",
      techUsed: ["Angular", "Spring Boot", "MySQL", "Docker", "Flyway"],
      securityMeasures: [
        "Enforced SSL validation layers",
        "Grade alteration audit log registers",
        "Granular administrative permissions",
        "Automated daily backups",
      ],
      results: "Reduced school administrative paperwork workloads by 80% while securing sensitive grade data.",
      metrics: [
        { label: "Paperwork Reduction", value: "80%" },
        { label: "Records Migrated", value: "1.2M+" },
        { label: "Portal Daily Users", value: "25k" },
      ],
      lessonsLearned: "Granular permission schemas are essential when parents, students, and school administrators share the same ERP.",
    },
    liveDemoUrl: "/book-demo",
  },
  {
    id: "realestate-platform",
    name: "Real Estate Property Platform",
    category: "Web Development",
    allCategories: ["Web Development", "Web Applications"],
    badges: [
      { label: "Search & Maps", variant: "outline" },
      { label: "Case Study", variant: "success" },
    ],
    shortDesc:
      "A property marketplace platform featuring advanced map search, virtual tours, and automated booking notifications.",
    techStack: ["Next.js", "Tailwind CSS", "Google Maps API", "PostgreSQL", "SendGrid"],
    graphicType: "browser",
    caseStudy: {
      clientGoal: "Deliver a fluid search map system with rapid rendering times for thousands of properties.",
      challenge: "Handling complex map searches with dynamic price ranges and location boundaries efficiently.",
      solution: "Built optimized spatial queries using PostGIS on a PostgreSQL database with edge-cached maps.",
      techUsed: ["Next.js", "PostgreSQL", "PostGIS", "Google Maps API", "Tailwind CSS"],
      securityMeasures: [
        "XSS sanitization on user listings",
        "Automated property owner validation checks",
        "Secure cookie authentication states",
        "Rate-limited notification triggers",
      ],
      results: "Property lead generation conversion rates grew by 45% in the first quarter of deployment.",
      metrics: [
        { label: "Conversion Gain", value: "+45%" },
        { label: "Property Map Load", value: "<180ms" },
        { label: "Lead Growth Rate", value: "+110%" },
      ],
      lessonsLearned: "Spatial databases like PostGIS are crucial for delivering rapid maps and polygon searches at scale.",
    },
    liveDemoUrl: "/book-demo",
  },
];

// Available Filter Tabs Categories
const PROJECT_CATEGORIES = [
  "All Projects",
  "Web Development",
  "Cybersecurity",
  "Web Applications",
  "E-Commerce",
  "Mobile Applications",
  "AI Solutions",
];

// ================================================================
// VECTOR GRAPHIC MOCKUPS
// ================================================================

function ProjectMockup({
  type,
  color,
}: {
  type: "cyber" | "browser" | "cart" | "chart";
  color: string;
}) {
  if (type === "cyber") {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="320" height="180" fill="#050b18" rx="8" />
        <circle
          cx="160"
          cy="90"
          r="48"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="opacity-40"
        />
        <circle
          cx="160"
          cy="90"
          r="32"
          stroke={color}
          strokeWidth="2"
          className="animate-pulse"
        />
        {/* Shield outline */}
        <path
          d="M160 74 L176 82 V94 C176 104 160 110 160 110 C160 110 144 104 144 94 V82 L160 74 Z"
          stroke={color}
          strokeWidth="2"
          fill={`${color}20`}
        />
        {/* Grid lines */}
        <line
          x1="40"
          y1="90"
          x2="280"
          y2="90"
          stroke="#102352"
          strokeWidth="1"
        />
        <line
          x1="160"
          y1="20"
          x2="160"
          y2="160"
          stroke="#102352"
          strokeWidth="1"
        />
        <circle cx="80" cy="90" r="3" fill="#09b2d4" />
        <circle cx="240" cy="90" r="3" fill="#09b2d4" />
        <circle cx="160" cy="40" r="3" fill="#09b2d4" />
        <circle cx="160" cy="140" r="3" fill="#09b2d4" />
        <path
          d="M50 40 L80 40 L90 50 L140 50"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="2 2"
          className="opacity-50"
        />
      </svg>
    );
  }

  if (type === "browser") {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="320" height="180" fill="#050b18" rx="8" />
        {/* Browser Header */}
        <rect
          x="10"
          y="10"
          width="300"
          height="20"
          rx="4"
          fill="#0a1428"
          stroke="#1a2c4a"
          strokeWidth="1"
        />
        <circle cx="20" cy="20" r="3" fill="#ef4444" />
        <circle cx="30" cy="20" r="3" fill="#f59e0b" />
        <circle cx="40" cy="20" r="3" fill="#10b981" />
        <rect x="60" y="16" width="160" height="8" rx="2" fill="#1e2c42" />
        {/* Sidebar mockup */}
        <rect x="10" y="36" width="50" height="134" rx="4" fill="#0a1428" />
        <rect x="18" y="48" width="34" height="6" rx="1" fill="#1e2c42" />
        <rect x="18" y="60" width="34" height="6" rx="1" fill="#1e2c42" />
        <rect x="18" y="72" width="34" height="6" rx="1" fill="#1e2c42" />
        {/* Content area mock layout */}
        <rect x="68" y="36" width="242" height="134" rx="4" fill="#0f1c38" />
        {/* Graph representation */}
        <path
          d="M 80,140 Q 140,80 200,120 T 300,60"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="200" cy="120" r="4" fill="#ffffff" />
        <rect x="80" y="48" width="60" height="24" rx="3" fill="#0a1428" />
        <rect x="150" y="48" width="60" height="24" rx="3" fill="#0a1428" />
        <rect x="220" y="48" width="80" height="24" rx="3" fill="#0a1428" />
      </svg>
    );
  }

  if (type === "cart") {
    return (
      <svg
        className="w-full h-full"
        viewBox="0 0 320 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="320" height="180" fill="#050b18" rx="8" />
        <circle cx="160" cy="90" r="48" stroke="#102352" strokeWidth="1" />
        {/* Padlock layout */}
        <rect
          x="144"
          y="90"
          width="32"
          height="24"
          rx="4"
          fill={`${color}20`}
          stroke={color}
          strokeWidth="2"
        />
        <path
          d="M150 90 V76 C150 70 160 66 160 66 C160 66 170 70 170 76 V90"
          stroke={color}
          strokeWidth="2.5"
          fill="none"
        />
        {/* Database records */}
        <rect x="50" y="60" width="40" height="10" rx="2" fill="#0f1c38" />
        <rect x="50" y="76" width="40" height="10" rx="2" fill="#0f1c38" />
        <rect x="50" y="92" width="40" height="10" rx="2" fill="#0f1c38" />
        {/* Connective lines */}
        <path
          d="M96 65 H120 V84"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        <path
          d="M96 97 H120 V94"
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
        />
        {/* Shopping checkout lists block mockups */}
        <rect x="230" y="60" width="50" height="14" rx="2" fill="#0a1428" />
        <rect x="230" y="80" width="50" height="14" rx="2" fill="#0a1428" />
        <rect x="230" y="100" width="50" height="14" rx="2" fill="#0a1428" />
        <circle cx="160" cy="102" r="2" fill={color} />
      </svg>
    );
  }

  // Chart default
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 320 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="320" height="180" fill="#050b18" rx="8" />
      {/* Grid background */}
      <line
        x1="20"
        y1="140"
        x2="300"
        y2="140"
        stroke="#102352"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="100"
        x2="300"
        y2="100"
        stroke="#102352"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      <line
        x1="20"
        y1="60"
        x2="300"
        y2="60"
        stroke="#102352"
        strokeWidth="0.5"
        strokeDasharray="3 3"
      />
      {/* Bars columns */}
      <rect x="40" y="110" width="16" height="30" rx="2" fill="#1e2c42" />
      <rect x="80" y="80" width="16" height="60" rx="2" fill="#1e2c42" />
      <rect x="120" y="60" width="16" height="80" rx="2" fill="#1e2c42" />
      <rect x="160" y="90" width="16" height="50" rx="2" fill="#1e2c42" />
      <rect x="200" y="50" width="16" height="90" rx="2" fill="#1e2c42" />
      <rect
        x="240"
        y="30"
        width="16"
        height="110"
        rx="2"
        fill={`${color}40`}
        stroke={color}
        strokeWidth="1.5"
      />
      {/* Trendline */}
      <path
        d="M 48,105 L 88,75 L 128,55 L 168,85 L 208,45 L 248,25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="248" cy="25" r="4.5" fill={color} />
      {/* SEO crawlers nodes */}
      <circle cx="48" cy="105" r="2.5" fill="#ffffff" />
      <circle cx="128" cy="55" r="2.5" fill="#ffffff" />
      <circle cx="208" cy="45" r="2.5" fill="#ffffff" />
    </svg>
  );
}

// ================================================================
// MAIN COMPONENT
// ================================================================

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = React.useState("All Projects");
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null
  );
  const [modalTab, setModalTab] = React.useState<
    "overview" | "casestudy" | "security"
  >("overview");

  // Esc key closes modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when modal is active
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  // Filtering Logic
  const filteredProjects = React.useMemo(() => {
    if (activeFilter === "All Projects") {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter((proj) =>
      proj.allCategories.some(
        (cat) => cat.toLowerCase() === activeFilter.toLowerCase()
      )
    );
  }, [activeFilter]);

  const activeCategoryThemeColor = (cat: string) => {
    switch (cat) {
      case "Cybersecurity":
        return "#ef4444";
      case "Web Applications":
        return "#09b2d4";
      case "E-Commerce":
        return "#10b981";
      case "SEO & Marketing":
        return "#6366f1";
      default:
        return "#1d70f6";
    }
  };

  return (
    <section
      id="portfolio-showcase"
      className="relative w-full py-24 bg-[#03070f]/80 z-30 overflow-hidden"
    >
      {/* Visual background guidelines linking to Services Section */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />

      {/* Cyber glows */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative">
        <SectionHeader
          mb="mb-16"
          badge={{ icon: <Layers className="w-3.5 h-3.5" />, label: "Engineering Proof" }}
          heading={<>Our <GradText>Work</GradText></>}
          sub="Modern digital solutions engineered for performance, security, and business growth."
        />

        {/* ─── CATEGORY FILTER TAB NAVIGATION ─── */}
        <div className="portfolio-reveal-header w-full border-b border-border/20 pb-4 mb-12 flex justify-start overflow-x-auto scrollbar-none">
          <div className="flex gap-2 min-w-max px-1">
            {PROJECT_CATEGORIES.map((cat, idx) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold font-mono border transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary/15 border-primary text-primary shadow-glow-sm scale-102"
                      : "bg-transparent border-transparent text-muted-foreground hover:text-foreground hover:border-border/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── FEATURED PROJECTS GRID ─── */}
        {filteredProjects.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-24"
          >
            {filteredProjects.map((project) => {
              const activeColor = activeCategoryThemeColor(project.category);
              return (
                <div
                  key={project.id}
                  className="group rounded-2xl border border-border/40 bg-card/40 hover:bg-card/75 hover:border-primary/45 transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-float hover:scale-[1.008]"
                >
                  {/* Glowing card border overlay */}
                  <div
                    className="absolute inset-0 border border-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ boxShadow: `inset 0 0 16px ${activeColor}15` }}
                  />

                  <div>
                    {/* SVG Graphic Mockup container */}
                    <div className="aspect-video w-full relative overflow-hidden bg-background-2/70 border-b border-border/20">
                      <ProjectMockup
                        type={project.graphicType}
                        color={activeColor}
                      />
                      {/* Interactive slide up visual overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                        <span className="text-xs font-mono font-bold text-foreground bg-primary/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-primary/30 flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5" /> Check Operational
                          Telemetry
                        </span>
                      </div>
                    </div>

                    {/* Metadata Content */}
                    <div className="p-6">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        <span
                          className="text-[10px] font-mono font-bold uppercase tracking-wider mr-2"
                          style={{ color: activeColor }}
                        >
                          {project.category}
                        </span>
                        {project.badges.map((badge, bIdx) => (
                          <Badge key={bIdx} variant={badge.variant} size="sm">
                            {badge.label}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="text-xl font-bold text-foreground font-display mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                        {project.shortDesc}
                      </p>

                      {/* Tech stack badge blocks */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[9px] font-mono bg-muted/60 text-muted-foreground border border-border/30 px-2 py-0.5 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-6 pt-0 border-t border-border/10 mt-6 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setSelectedProject(project);
                        setModalTab("overview");
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-hover hover:underline cursor-pointer"
                    >
                      Read Case Study Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    {project.liveDemoUrl && (
                      <Link
                        href={project.liveDemoUrl}
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
                      >
                        Live Demo
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ─── EMPTY STATE PANEL ─── */
          <div className="border border-dashed border-border/40 rounded-2xl bg-card/10 p-12 text-center max-w-lg mx-auto mb-24 animate-fade-in">
            <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center text-muted-foreground mx-auto mb-4 border border-border/20">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-foreground font-display mb-2">
              Case Study In Development
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
              Our engineering team is sanitizing and document-auditing other
              corporate solutions. Custom scoping reviews are active.
            </p>
            <Link href="/book-demo">
              <Button size="sm">
                Request Custom Showcase
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        )}


      </div>

      {/* ─── DETAILED PROJECT MODAL OVERLAY ─── */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in">
          {/* Modal Backdrop overlay click closes */}
          <div
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-[#03070f]/90 backdrop-blur-md cursor-pointer"
          />

          <GlassPanel
            intensity="strong"
            rounded="xl"
            shadow="float"
            padding="none"
            className="w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-primary/30 bg-[#060d1a] relative z-10 flex flex-col animate-scale-in"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#060d1a]/95 backdrop-blur-md border-b border-border/20 p-6 z-20 flex justify-between items-start gap-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-wider mr-2"
                    style={{
                      color: activeCategoryThemeColor(selectedProject.category),
                    }}
                  >
                    {selectedProject.category}
                  </span>
                  {selectedProject.badges.map((badge, bIdx) => (
                    <Badge key={bIdx} variant={badge.variant} size="sm">
                      {badge.label}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-foreground font-display">
                  {selectedProject.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-lg bg-card/40 border border-border/40 hover:border-primary/45 flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer transition-all"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Inner Content */}
            <div className="p-6 md:p-8 flex-1">
              {/* Tab selector menu */}
              <div className="flex border-b border-border/20 mb-6 font-mono text-xs">
                <button
                  onClick={() => setModalTab("overview")}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-all cursor-pointer ${
                    modalTab === "overview"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setModalTab("casestudy")}
                  className={`pb-2.5 px-4 font-bold border-b-2 transition-all cursor-pointer ${
                    modalTab === "casestudy"
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Case Study
                </button>
                {selectedProject.securityShowcase && (
                  <button
                    onClick={() => setModalTab("security")}
                    className={`pb-2.5 px-4 font-bold border-b-2 transition-all cursor-pointer ${
                      modalTab === "security"
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Security Showcase
                  </button>
                )}
              </div>

              {/* TAB 1: OVERVIEW */}
              {modalTab === "overview" && (
                <div className="space-y-6 animate-slide-up">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Visual schematic */}
                    <div className="md:col-span-2 aspect-video bg-background-2/80 rounded-xl overflow-hidden border border-border/40 flex items-center justify-center">
                      <ProjectMockup
                        type={selectedProject.graphicType}
                        color={activeCategoryThemeColor(
                          selectedProject.category
                        )}
                      />
                    </div>

                    {/* Metadata specs list */}
                    <div className="space-y-4 bg-background-2/40 border border-border/20 p-5 rounded-xl">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-foreground font-bold border-b border-border/10 pb-2">
                        Project Spec Sheet
                      </h4>
                      <div className="space-y-2 text-xs">
                        <div>
                          <span className="text-muted-foreground block font-mono text-[9px]">
                            ID TARGET:
                          </span>
                          <span className="text-foreground font-bold font-mono uppercase">
                            0x_{selectedProject.id}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block font-mono text-[9px]">
                            PRIMARY CLASSIFICATION:
                          </span>
                          <span className="text-foreground font-bold">
                            {selectedProject.category}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground block font-mono text-[9px]">
                            METHODOLOGIES:
                          </span>
                          <span className="text-foreground font-bold">
                            Security-First Delivery
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-2">
                      Scope Summary
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {selectedProject.shortDesc} This project was deployed
                      using CYDROID TECHNOLOGIES&apos; strict engineering
                      standards, maintaining complete type-safety compilation,
                      rigorous performance profiles, and active compliance
                      sweeps.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest mb-3">
                      Technology Matrix
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-xs font-mono bg-muted/60 text-foreground border border-border/30 px-3 py-1 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: CASE STUDY */}
              {modalTab === "casestudy" && (
                <div className="space-y-6 animate-slide-up">
                  {/* Performance Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedProject.caseStudy.metrics.map((metric, mIdx) => (
                      <div
                        key={mIdx}
                        className="bg-background-2 border border-border/40 p-4 rounded-xl text-center"
                      >
                        <span className="text-2xl font-extrabold text-foreground font-display block leading-none mb-1">
                          {metric.value}
                        </span>
                        <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider block">
                          {metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Client Goal
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.caseStudy.clientGoal}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Business Challenge
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.caseStudy.challenge}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Solution Provided
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.caseStudy.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Lessons Learned
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.caseStudy.lessonsLearned}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-border/20 pt-6">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest mb-3">
                        Tech Config Used
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {selectedProject.caseStudy.techUsed.map((tech, idx) => (
                          <li key={idx} className="flex gap-2 items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest mb-3">
                        Core Security Audits
                      </h4>
                      <ul className="space-y-1 text-xs text-muted-foreground">
                        {selectedProject.caseStudy.securityMeasures.map(
                          (measure, idx) => (
                            <li key={idx} className="flex gap-2 items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                              <span>{measure}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY SHOWCASE */}
              {modalTab === "security" && selectedProject.securityShowcase && (
                <div className="space-y-6 animate-slide-up">
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">
                      <Lock className="w-5 h-5 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-red-400 font-bold uppercase tracking-wider block">
                        AUDITED COMPLIANCE RECORD
                      </span>
                      <h4 className="text-sm font-bold text-foreground mt-0.5">
                        {selectedProject.securityShowcase.assessmentType}
                      </h4>
                      <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
                        Security integrations configured and validated directly
                        on operational routes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Defense Measures Configured
                        </h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          {selectedProject.securityShowcase.protectionMeasures.map(
                            (measure, idx) => (
                              <li key={idx} className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <span>{measure}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest border-b border-border/10 pb-1.5 mb-2">
                          Audited Security Improvements
                        </h4>
                        <ul className="space-y-1.5 text-xs text-muted-foreground">
                          {selectedProject.securityShowcase.securityImprovements.map(
                            (imp, idx) => (
                              <li key={idx} className="flex gap-2 items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <span>{imp}</span>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-4 bg-background-2/30 border border-border/20 p-5 rounded-xl">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest mb-1.5">
                          Risk Reduction Ratio
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.securityShowcase.riskReduction}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-xs font-mono font-bold text-foreground uppercase tracking-widest mb-1.5">
                          Active Monitoring Strategy
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {selectedProject.securityShowcase.monitoringStrategy}
                        </p>
                      </div>
                      <div className="border-t border-border/10 pt-4">
                        <h4 className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest mb-1.5">
                          Security Outcome
                        </h4>
                        <p className="text-xs text-foreground font-bold leading-relaxed">
                          {selectedProject.securityShowcase.securityOutcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions Footer */}
            <div className="sticky bottom-0 bg-[#060d1a]/95 border-t border-border/20 p-6 z-20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-muted-foreground">
                SECURE CONSOLE CONNECTION STATE // ACTIVE_REWRITE_DONE
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 text-xs font-bold font-mono border border-border/40 hover:border-primary/45 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                >
                  Close Console
                </button>
                <Link href="/book-demo">
                  <Button size="md" className="shadow-glow">
                    Scope Similar Project
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </GlassPanel>
        </div>
      )}
    </section>
  );
}
