import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib";
import {
  SchemaMarkup,
  generateServicesSchema,
  generateBreadcrumbSchema,
} from "@/components/ui/schema-markup";

const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((m) => m.ServicesSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "Our Services",
  description:
    "Explore our core services: high-security Web Development, Cybersecurity Audits, Maintenance & Support, and technical SEO & Marketing.",
  canonicalPath: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <SchemaMarkup schema={generateServicesSchema()} />
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Services", path: "/services" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <ServicesSection />
      </div>
    </>
  );
}
