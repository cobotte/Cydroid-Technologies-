import { Lock, Terminal, Wrench, Gauge, Clock, MessageSquare, ShieldCheck } from "lucide-react";
import { GlassPanel } from "@/components/ui/Glass";
import { SectionHeader, GradText } from "@/components/ui/SectionHeader";

const WHY_CHOOSE_ITEMS = [
  {
    title: "Security-First Development",
    desc: "Strict adherence to OWASP guidelines, proactive dependency patching, and rigorous validation logic.",
    icon: Lock,
  },
  {
    title: "Modern Technology Stack",
    desc: "Engineered on Next.js, React, TypeScript, and state-of-the-art bundling and deployment workflows.",
    icon: Terminal,
  },
  {
    title: "Long-Term Support",
    desc: "Routine library maintenance, automated database backups, and guaranteed SLA response windows.",
    icon: Wrench,
  },
  {
    title: "Performance Optimization",
    desc: "Fast hydration, edge caching, image compression, and optimized asset delivery pipelines.",
    icon: Gauge,
  },
  {
    title: "Professional Workflow",
    desc: "Agile sprints, standard coding policies, syntax inspection limits, and thorough QA verification cycles.",
    icon: Clock,
  },
  {
    title: "Transparent Communication",
    desc: "Direct contact, active scoping updates, and flat-rate package pricing models with zero hidden fees.",
    icon: MessageSquare,
  },
];

export function WhyCydroidSection() {
  return (
    <section
      id="why-choose-cydroid"
      className="relative w-full py-24 bg-[#03070f]/80 z-30 overflow-hidden border-t border-border/40"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(9,178,214,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(9,178,214,0.005)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
      
      <div className="container-custom relative">
        {/* ─── SECTION HEADER ─── */}
        <SectionHeader
          mb="mb-16"
          badge={{ icon: <ShieldCheck className="w-3.5 h-3.5" />, label: "Integrity Check" }}
          heading={<>Why Businesses <GradText>Choose CYDROID</GradText></>}
          sub="We align premium engineering with professional security standards. Here is how we build long-term trust with our clients."
        />

        {/* ─── GRID CONTAINER ─── */}
        <div className="why-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <GlassPanel
                key={idx}
                intensity="default"
                rounded="lg"
                shadow="float"
                className="why-grid-item p-6 border border-border/30 bg-card/45 flex flex-col justify-between group hover:border-primary/45 transition-colors duration-300"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-105 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-foreground font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </GlassPanel>
            );
          })}
        </div>
      </div>
    </section>
  );
}
