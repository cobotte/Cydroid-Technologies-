import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

const BookDemoSection = dynamic(
  () => import("@/components/sections/BookDemoSection").then((m) => m.BookDemoSection)
);

export const metadata: Metadata = buildPageMetadata({
  title: "Book Your Free Consultation",
  description:
    "Schedule an architectural consultation session with our software engineering team.",
  canonicalPath: "/book-demo",
});

export default function BookDemoPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Book Demo", path: "/book-demo" },
        ])}
      />
      <div className="pt-16 md:pt-20 bg-[#03070f]">
        <BookDemoSection />
      </div>
    </>
  );
}
