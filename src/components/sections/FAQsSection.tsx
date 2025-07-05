"use client";

import * as React from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  HelpCircle,
  Shield,
  CreditCard,
  Wrench,
  MessageSquare,
  Globe,
  Lock,
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassPanel } from "@/components/ui/Glass";

import { FAQS, type FAQ, type FAQCategory } from "@/lib";

// ================================================================
// CATEGORY CONFIG
// ================================================================

const CATEGORIES: {
  id: FAQCategory;
  label: string;
  icon: React.ElementType;
  count?: number;
}[] = [
  { id: "all", label: "All FAQs", icon: HelpCircle },
  { id: "general", label: "General", icon: Globe },
  { id: "pricing", label: "Pricing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
  { id: "support", label: "Support", icon: Wrench },
];

// ================================================================
// ACCORDION ITEM COMPONENT
// ================================================================

function AccordionItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  const categoryColor: Record<Exclude<FAQCategory, "all">, string> = {
    general: "text-cyan-400",
    pricing: "text-violet-400",
    security: "text-emerald-400",
    support: "text-amber-400",
  };

  const categoryBg: Record<Exclude<FAQCategory, "all">, string> = {
    general: "bg-cyan-500/10 border-cyan-500/20",
    pricing: "bg-violet-500/10 border-violet-500/20",
    security: "bg-emerald-500/10 border-emerald-500/20",
    support: "bg-amber-500/10 border-amber-500/20",
  };

  const catLabel: Record<Exclude<FAQCategory, "all">, string> = {
    general: "General",
    pricing: "Pricing",
    security: "Security",
    support: "Support",
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? "border-primary/40 bg-primary/4 shadow-[0_0_25px_rgba(29,112,246,0.08)]"
          : "border-border/25 bg-black/20 hover:border-border/50 hover:bg-black/30"
      }`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Question Header */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full text-left p-5 md:p-6 flex items-start gap-4 cursor-pointer group"
        aria-expanded={isOpen}
      >
        {/* Number indicator */}
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-mono font-bold border mt-0.5 transition-colors ${
            isOpen
              ? "bg-primary/15 border-primary/40 text-primary"
              : "bg-black/30 border-border/20 text-muted-foreground/50 group-hover:border-border/40"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${categoryBg[faq.category]} ${categoryColor[faq.category]}`}
            >
              {catLabel[faq.category]}
            </span>
          </div>
          <p
            className={`text-sm md:text-[15px] font-semibold leading-snug transition-colors ${
              isOpen ? "text-foreground" : "text-foreground/85 group-hover:text-foreground"
            }`}
          >
            {faq.question}
          </p>
        </div>

        {/* Chevron */}
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-300 mt-0.5 ${
            isOpen
              ? "bg-primary/15 border-primary/30 text-primary rotate-180"
              : "bg-black/25 border-border/20 text-muted-foreground/50 group-hover:border-primary/25 group-hover:text-primary/60"
          }`}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </button>

      {/* Answer Panel */}
      <div
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-[60px] md:pl-[72px]">
          <div className="h-px bg-border/15 mb-4" />
          <p className="text-sm text-muted-foreground/90 leading-relaxed">
            {faq.answer}
          </p>

          {/* Tags */}
          {faq.tags && faq.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-4">
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md bg-muted/20 border border-border/15 text-[9px] font-mono text-muted-foreground/60 uppercase tracking-wide"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================================================================
// MAIN SECTION
// ================================================================

export function FAQsSection() {
  const [activeCategory, setActiveCategory] =
    React.useState<FAQCategory>("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openFaqId, setOpenFaqId] = React.useState<string | null>("g1");

  // Filtered FAQs
  const filteredFaqs = React.useMemo(() => {
    let results = FAQS;

    if (activeCategory !== "all") {
      results = results.filter((f) => f.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q) ||
          f.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    return results;
  }, [activeCategory, searchQuery]);

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<FAQCategory, number> = {
      all: FAQS.length,
      general: 0,
      pricing: 0,
      security: 0,
      support: 0,
    };
    FAQS.forEach((f) => counts[f.category]++);
    return counts;
  }, []);

  const handleCategoryChange = (cat: FAQCategory) => {
    setActiveCategory(cat);
    setOpenFaqId(null);
    setSearchQuery("");
  };

  return (
    <section
      id="faqs-hub"
      className="relative w-full min-h-screen py-28 bg-[#03070f]/95 overflow-hidden"
    >
      {/* Background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(29,112,246,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(29,112,246,0.012)_1px,transparent_1px)] bg-[size:45px_45px] pointer-events-none opacity-40" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-[450px] h-[400px] bg-violet-500/4 rounded-full blur-[130px] pointer-events-none" />

      <div className="container-custom relative">

        {/* ─── SECTION HEADER ─── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-bold tracking-widest uppercase mb-5">
            <HelpCircle className="w-3.5 h-3.5" />
            Knowledge Base
          </div>
          <h1 className="text-display-md text-foreground font-display font-extrabold tracking-tight leading-tight mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-body-md text-muted-foreground/85 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about CYDROID TECHNOLOGIES&apos; services, packages, security practices, and support workflow — structured for quick access.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs font-mono">
            {[
              { label: "Total FAQs", value: FAQS.length },
              { label: "Categories", value: 4 },
              { label: "Avg. Response", value: "< 24h" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5">
                <span className="text-primary font-extrabold text-base">
                  {s.value}
                </span>
                <span className="text-muted-foreground/65 uppercase tracking-widest text-[9px]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ─── MAIN LAYOUT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT SIDEBAR: Categories + Sticky CTA */}
          <div className="lg:col-span-3 space-y-5 lg:sticky lg:top-28">

            {/* Category Tabs */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-5 border border-border/30 bg-card/30 relative"
            >
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-primary/20 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-primary/20 rounded-tr-xl" />

              <h3 className="text-[9px] font-mono font-bold text-primary uppercase tracking-widest mb-4">
                Browse by Category
              </h3>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`w-full flex items-center justify-between gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "bg-primary text-foreground shadow-glow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-primary/8 border border-transparent hover:border-primary/15"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                        {cat.label}
                      </span>
                      <span
                        className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md ${
                          isActive
                            ? "bg-white/20 text-foreground"
                            : "bg-muted/30 text-muted-foreground/70"
                        }`}
                      >
                        {categoryCounts[cat.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </GlassPanel>

            {/* Still have questions CTA */}
            <GlassPanel
              intensity="default"
              rounded="lg"
              shadow="float"
              className="p-5 border border-border/20 bg-card/20 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/8 rounded-full blur-2xl pointer-events-none" />
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <MessageSquare className="w-4 h-4 text-primary" />
                </div>
                <h4 className="text-xs font-bold text-foreground mb-1.5">
                  Still Have Questions?
                </h4>
                <p className="text-[10px] text-muted-foreground/75 leading-relaxed mb-4">
                  Our technical team is available to discuss any specific requirements directly.
                </p>
                <Link href="/contact">
                  <Button size="sm" variant="outline" className="w-full text-[10px]">
                    Contact Us
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>

                <div className="mt-3">
                  <Link href="/book-demo">
                    <Button size="sm" className="w-full text-[10px]">
                      Book Free Demo
                      <Zap className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassPanel>

            {/* Security badge */}
            <div className="p-4 rounded-2xl border border-emerald-500/10 bg-emerald-500/5 flex gap-3 items-start">
              <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] font-bold text-foreground block mb-0.5">
                  Confidential by Design
                </span>
                <p className="text-[9px] text-muted-foreground/70 leading-relaxed">
                  All client engagements are NDA-protected and governed by strict data security standards.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Search + FAQ List */}
          <div className="lg:col-span-9 space-y-5">

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
              <input
                id="faq-search"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setOpenFaqId(null);
                }}
                placeholder="Search questions, topics, or keywords..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border/30 bg-black/25 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 focus:shadow-[0_0_20px_rgba(29,112,246,0.1)] hover:bg-black/35 focus:bg-black/40 transition-all font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(""); setOpenFaqId(null); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground/50 hover:text-foreground transition-colors text-xs font-mono cursor-pointer"
                >
                  clear
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 px-1">
              <span>
                {filteredFaqs.length === 0
                  ? "No results found"
                  : `Showing ${filteredFaqs.length} of ${FAQS.length} questions`}
                {searchQuery && ` matching "${searchQuery}"`}
              </span>
              {activeCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => handleCategoryChange("all")}
                  className="text-primary hover:underline cursor-pointer"
                >
                  View all →
                </button>
              )}
            </div>

            {/* FAQ Accordion List */}
            {filteredFaqs.length > 0 ? (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq.id}
                    faq={faq}
                    index={index}
                    isOpen={openFaqId === faq.id}
                    onToggle={() =>
                      setOpenFaqId(openFaqId === faq.id ? null : faq.id)
                    }
                  />
                ))}
              </div>
            ) : (
              /* Empty state */
              <GlassPanel
                intensity="default"
                rounded="lg"
                shadow="none"
                className="p-10 text-center border border-border/20 bg-black/15"
              >
                <HelpCircle className="w-10 h-10 text-muted-foreground/25 mx-auto mb-3" />
                <h4 className="text-sm font-semibold text-muted-foreground/60 mb-1.5">
                  No results found
                </h4>
                <p className="text-xs text-muted-foreground/45 max-w-sm mx-auto mb-5">
                  We couldn&apos;t find any FAQs matching your search. Try a different keyword, or browse by category.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                    className="px-4 py-2 rounded-xl border border-border/30 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/25 transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                  <Link href="/contact">
                    <Button size="sm" className="text-xs">
                      Ask Directly
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  </Link>
                </div>
              </GlassPanel>
            )}

            {/* Bottom CTA Banner */}
            {filteredFaqs.length > 0 && (
              <div className="mt-8 p-6 md:p-8 rounded-3xl border border-primary/15 bg-gradient-to-br from-primary/6 via-black/30 to-violet-500/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">
                      Not finding what you need?
                    </h4>
                    <p className="text-xs text-muted-foreground/75 leading-relaxed max-w-md">
                      Our engineers are available for tailored consultations. Book a free discovery call and get direct answers to your specific project requirements.
                    </p>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="text-xs whitespace-nowrap">
                        Contact
                        <MessageSquare className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href="/book-demo">
                      <Button size="sm" className="text-xs whitespace-nowrap shadow-glow-sm">
                        Book Demo
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
