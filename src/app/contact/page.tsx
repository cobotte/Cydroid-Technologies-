import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((m) => m.ContactSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Get in touch with CYDROID TECHNOLOGIES for enterprise software development, cloud engineering, AI solutions, and cybersecurity audits.",
  canonicalPath: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <ContactSection />
      </div>
    </>
  );
}
