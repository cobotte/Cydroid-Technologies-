import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata, FAQS } from "@/lib";
import { SchemaMarkup, generateFAQSchema, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

const FAQsSection = dynamic(
  () => import("@/components/sections/FAQsSection").then((m) => m.FAQsSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "FAQs",
  description:
    "Browse answers to common questions about CYDROID TECHNOLOGIES' enterprise software services, pricing packages, cloud engineering, and technical support plans.",
  canonicalPath: "/faqs",
});

export default function FAQsPage() {
  return (
    <>
      <SchemaMarkup schema={generateFAQSchema(FAQS)} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "FAQs", path: "/faqs" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <FAQsSection />
      </div>
    </>
  );
}
