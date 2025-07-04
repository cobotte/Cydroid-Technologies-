import type { Metadata } from "next";
import {
  Compass,
  Target,
  Eye,
  Award,
  Lock,
  Cpu,
  ShieldCheck,
  Globe,
  LineChart,
  Wrench,
  Activity,
  Zap,
  MessageSquare,
  Briefcase,
} from "lucide-react";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";
import dynamic from "next/dynamic";
const TeamSection = dynamic(
  () => import("@/components/sections/TeamSection").then((m) => m.TeamSection)
);
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about CYDROID TECHNOLOGIES, our mission, core values, security-first philosophy, and founding profiles.",
  canonicalPath: "/about",
});

export default function AboutPage() {
  return (
    <>
      <SchemaMarkup schema={generateBreadcrumbSchema([{ name: "Home", path: "" }, { name: "About Us", path: "/about" }])} />
      <div className="flex flex-col min-h-screen bg-[#03070f] text-foreground">
      {/* ─── 1. OUR STORY ─── */}
      <section id="our-story" className="pt-32 pb-24 md:pt-40 md:pb-24 border-b border-border/10 bg-[#040813]/40 relative overflow-hidden">
        {/* Subtle background glow at the top of the page */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-custom">
          <SectionHeader
            badge={{ icon: <Compass className="w-3.5 h-3.5" />, label: "Our Story" }}
            heading={<>Our <GradText>Journey</GradText></>}
            mb="mb-16"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
            {/* Left Column: Glass Quote Panel */}
            <div className="lg:col-span-5 flex">
              <GlassPanel
                intensity="default"
                rounded="lg"
                padding="lg"
                className="border border-primary/20 bg-card/30 flex flex-col justify-center relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 text-primary/10 font-serif text-8xl pointer-events-none select-none">
                  “
                </div>
                <p className="text-lg md:text-xl font-display font-medium text-white/90 leading-relaxed relative z-10">
                  Modern businesses deserve digital platforms that are not only visually impressive but also <span className="text-primary font-semibold">secure, reliable,</span> and built for long-term growth.
                </p>
              </GlassPanel>
            </div>

            {/* Right Column: Narrative Blocks */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="p-6 rounded-2xl border border-border/10 bg-card/10 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/25 flex items-center justify-center text-red-400 flex-shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">The Digital Struggle</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Many businesses struggle with websites that are slow, outdated, vulnerable, or difficult to maintain.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/10 bg-card/10 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/25 flex items-center justify-center text-primary flex-shrink-0">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Bridging the Gap</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    We created CYDROID TECHNOLOGIES to bridge the gap between modern web development and cloud engineering, delivering solutions that combine performance, protection, and scalability.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/10 bg-card/10 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/25 flex items-center justify-center text-accent flex-shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Our Modern Impact</h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    Today, we help businesses establish a strong digital presence through secure engineering, modern design, and long-term technical support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. MISSION & 3. VISION ─── */}
      <section id="mission-vision" className="py-24 border-b border-border/10 bg-[#03070f]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Section */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              padding="lg"
              className="border border-primary/25 bg-card/35 hover:bg-card/45 transition-colors relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  <Target className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mb-2">
                  Purpose & Drive
                </span>
                <h3 className="text-xl font-bold text-white font-display mb-4">
                  Our Mission
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To empower businesses with secure, scalable, and high-performance digital solutions that strengthen online presence, improve customer engagement, and support sustainable growth.
                </p>
              </div>
            </GlassPanel>

            {/* Vision Section */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              padding="lg"
              className="border border-primary/25 bg-card/35 hover:bg-card/45 transition-colors relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                  <Eye className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest block mb-2">
                  Future Direction
                </span>
                <h3 className="text-xl font-bold text-white font-display mb-4">
                  Our Vision
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To become a trusted technology partner for businesses worldwide by delivering secure digital experiences through innovation, reliability, performance optimization, and cybersecurity-focused development.
                </p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* ─── 4. CORE VALUES ─── */}
      <section id="core-values" className="py-24 border-b border-border/10 bg-[#040813]/40">
        <div className="container-custom">
          <SectionHeader
            badge={{ icon: <Award className="w-3.5 h-3.5" />, label: "Philosophy" }}
            heading={<>What We <GradText>Stand For</GradText></>}
            sub="Our key operational values that guide every single engagement, project development, and line of code."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                number: "01",
                title: "Innovation",
                desc: "We embrace change and continuously push the boundaries of what is possible.",
              },
              {
                number: "02",
                title: "Excellence",
                desc: "We strive for the highest quality in everything we do, from code to customer service.",
              },
              {
                number: "03",
                title: "Integrity",
                desc: "We are honest, transparent, and ethical in all our dealings.",
              },
              {
                number: "04",
                title: "Customer Success",
                desc: "We are dedicated to helping our clients achieve their business goals.",
              },
            ].map((val, idx) => (
              <GlassPanel
                key={idx}
                intensity="default"
                rounded="lg"
                padding="md"
                className="border border-border/10 bg-card/20 hover:border-primary/30 hover:bg-card/35 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="absolute top-4 right-4 text-2xl font-mono font-extrabold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {val.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-display mb-3">
                    {val.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. WHY CYDROID ─── */}
      <section id="why-cydroid" className="py-24 border-b border-border/10 bg-[#03070f]">
        <div className="container-custom">
          <SectionHeader
            badge={{ icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Value Proposition" }}
            heading={<>Why Businesses <GradText>Choose CYDROID</GradText></>}
            sub="We deliver enterprise-grade performance, protection, and operational alignment under one roof."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Lock className="w-5 h-5" />,
                title: "Security-First Development",
                desc: "Every project begins with security in mind.",
              },
              {
                icon: <Cpu className="w-5 h-5" />,
                title: "Modern Technologies",
                desc: "Built using modern frameworks and best practices.",
              },
              {
                icon: <Activity className="w-5 h-5" />,
                title: "Performance Focused",
                desc: "Fast, scalable, and optimized digital platforms.",
              },
              {
                icon: <Wrench className="w-5 h-5" />,
                title: "Long-Term Support",
                desc: "Ongoing maintenance and technical guidance.",
              },
              {
                icon: <MessageSquare className="w-5 h-5" />,
                title: "Transparent Communication",
                desc: "Clear expectations and honest collaboration.",
              },
              {
                icon: <Briefcase className="w-5 h-5" />,
                title: "Business-Oriented Solutions",
                desc: "Technology aligned with business goals.",
              },
            ].map((item, idx) => (
              <GlassPanel
                key={idx}
                intensity="subtle"
                rounded="lg"
                padding="md"
                className="border border-border/10 bg-card/10 hover:border-primary/25 hover:bg-card/20 transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. OUR EXPERTISE ─── */}
      <section id="our-expertise" className="py-24 border-b border-border/10 bg-[#040813]/40">
        <div className="container-custom">
          <SectionHeader
            badge={{ icon: <Zap className="w-3.5 h-3.5" />, label: "Competencies" }}
            heading={<>What We <GradText>Specialize In</GradText></>}
            sub="Outcomes-focused technical capabilities engineered to build and run modern software safely."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Globe className="w-6 h-6" />,
                title: "Web Development",
                outcome: "High-performance, secure, and scalable web interfaces designed for user conversion.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6" />,
                title: "Cybersecurity Services",
                outcome: "Vulnerability audits, site hardening, active protection, and secure data layers.",
              },
              {
                icon: <Wrench className="w-6 h-6" />,
                title: "Maintenance & Support",
                outcome: "Continuous performance audits, site speed optimization, updates, and active uptime support.",
              },
              {
                icon: <LineChart className="w-6 h-6" />,
                title: "SEO & Marketing",
                outcome: "Organic search ranking, strategic SEO configurations, and intent-driven business growth.",
              },
            ].map((exp, idx) => (
              <GlassPanel
                key={idx}
                intensity="default"
                rounded="lg"
                padding="md"
                className="border border-border/15 bg-card/20 hover:bg-card/30 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                    {exp.icon}
                  </div>
                  <h3 className="text-base font-bold text-white font-display mb-2">
                    {exp.title}
                  </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-primary/10">
                  <span className="text-[9px] font-mono text-primary font-bold uppercase tracking-wider block mb-1">Focus Outcome</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {exp.outcome}
                  </p>
                </div>
              </GlassPanel>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. OUR PROCESS ─── */}
      <section id="our-process" className="py-24 border-b border-border/10 bg-[#03070f]">
        <div className="container-custom">
          <SectionHeader
            badge={{ icon: <Activity className="w-3.5 h-3.5" />, label: "Methodology" }}
            heading={<>How We <GradText>Work</GradText></>}
            sub="A disciplined engineering workflow focused on security audit checks and rapid execution."
          />

          <div className="relative max-w-5xl mx-auto px-4">
            {/* Timeline center line */}
            <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-primary/40 via-accent/30 to-primary/40 -translate-x-1/2" />

            <div className="space-y-12">
              {[
                { number: "01", step: "Discover", desc: "Collaborate to establish requirements, business objectives, and success parameters." },
                { number: "02", step: "Plan", desc: "Architect the tech stack, define specifications, and map security dependencies." },
                { number: "03", step: "Design", desc: "Design elegant, high-fidelity user experiences and interactive dark-cyber UI mockups." },
                { number: "04", step: "Develop", desc: "Clean development utilizing strict TypeScript typings, modern frameworks, and responsive grids." },
                { number: "05", step: "Secure", desc: "Run comprehensive vulnerability audits, SSL tests, and edge configuration hardening." },
                { number: "06", step: "Deploy", desc: "Perform automated builds, package validations, and orchestrate optimized cloud releases." },
                { number: "07", step: "Support", desc: "Provide continuous monitoring, maintenance checkups, and technical optimizations." },
              ].map((proc, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={idx} className={`relative flex flex-col md:flex-row items-stretch ${isEven ? "md:flex-row-reverse" : ""}`}>
                    {/* Circle Node */}
                    <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 z-10 w-6 h-6 rounded-full bg-[#03070f] border-2 border-primary flex items-center justify-center shadow-glow-sm">
                      <div className="w-2 h-2 rounded-full bg-accent" />
                    </div>

                    {/* Content card spacer (50% width on md screens) */}
                    <div className="w-full md:w-[45%] pl-10 md:pl-0 flex">
                      <GlassPanel
                        intensity="subtle"
                        rounded="md"
                        padding="md"
                        className="w-full border border-border/10 bg-card/10 hover:border-primary/20 transition-all duration-300"
                      >
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-bold text-white font-display">
                            {proc.step}
                          </h4>
                          <span className="text-[10px] font-mono text-primary font-bold">
                            STAGE {proc.number}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {proc.desc}
                        </p>
                      </GlassPanel>
                    </div>

                    {/* Spacer block for standard two-sided visual look */}
                    <div className="hidden md:block md:w-[10%]" />
                    <div className="hidden md:block md:w-[45%]" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. TECHNOLOGY DIVISIONS SECTION ─── */}
      <TeamSection />

    </div>
    </>
  );
}
