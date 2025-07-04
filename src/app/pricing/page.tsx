import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

const DetailedPricingSection = dynamic(
  () => import("@/components/sections/DetailedPricingSection").then((m) => m.DetailedPricingSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "Pricing Packages",
  description:
    "Review transparent pricing tiers for Starter, Professional, and Enterprise solutions offered by CYDROID TECHNOLOGIES.",
  canonicalPath: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <DetailedPricingSection />
      </div>
    </>
  );
}
