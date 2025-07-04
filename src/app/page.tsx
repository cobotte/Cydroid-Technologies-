import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { RobotBackground } from "@/components/sections/RobotBackgroundWrapper";
import { buildPageMetadata } from "@/lib";

// ── Lazy load below-the-fold components ──
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((m) => m.ServicesSection)
);
const WhyCydroidSection = dynamic(
  () => import("@/components/sections/WhyCydroidSection").then((m) => m.WhyCydroidSection)
);
const ProcessSection = dynamic(
  () => import("@/components/sections/ProcessSection").then((m) => m.ProcessSection)
);
const TechStackSection = dynamic(
  () => import("@/components/sections/TechStackSection").then((m) => m.TechStackSection)
);
const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection").then((m) => m.PortfolioSection)
);
const TeamSection = dynamic(
  () => import("@/components/sections/TeamSection").then((m) => m.TeamSection)
);
const PricingSection = dynamic(
  () => import("@/components/sections/PricingSection").then((m) => m.PricingSection)
);

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "CYDROID TECHNOLOGIES",
    description:
      "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
    canonicalPath: "",
  }),
  title: {
    absolute: "CYDROID TECHNOLOGIES",
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── Fixed robot canvas — sits behind everything after the hero ── */}
      <RobotBackground />

      {/* ── Page content — hero is self-contained, rest float over robot ── */}
      <div className="relative flex flex-col min-h-screen" style={{ zIndex: 1 }}>
        {/* Hero: full-screen video, robot canvas invisible here (opacity: 0) */}
        <HeroSection />

        {/* All sections below: robot canvas becomes visible and animates */}
        <div className="relative" style={{ zIndex: 10 }}>
          <ServicesSection />
          <WhyCydroidSection />
          <ProcessSection />
          <TechStackSection />
          <PortfolioSection />
          <TeamSection />
          <PricingSection />
        </div>
      </div>
    </>
  );
}
