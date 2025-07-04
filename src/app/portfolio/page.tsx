import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

const PortfolioSection = dynamic(
  () => import("@/components/sections/PortfolioSection").then((m) => m.PortfolioSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "Portfolio",
  description:
    "Explore the digital platforms, software solutions, cloud engineering, and case studies engineered by CYDROID TECHNOLOGIES.",
  canonicalPath: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Portfolio", path: "/portfolio" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <PortfolioSection />
      </div>
    </>
  );
}
