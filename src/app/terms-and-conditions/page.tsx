import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms & Conditions",
  description:
    "Read the terms and conditions for using CYDROID TECHNOLOGIES' web assets, services, and software portals.",
  canonicalPath: "/terms-and-conditions",
});

export default function TermsAndConditionsPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Terms & Conditions", path: "/terms-and-conditions" },
        ])}
      />
      <div className="flex flex-col min-h-screen">
        {/* Page Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-background to-background-2 border-b border-border/40">
          <div className="container-narrow">
            <div className="flex items-center gap-3 mb-3">
              <FileText className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="text-display-md font-extrabold tracking-tight text-foreground font-display">
              Terms & Conditions
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              Last Updated: June 10, 2026
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="section-md bg-background">
          <div className="container-narrow prose prose-invert">
            <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By visiting the CYDROID TECHNOLOGIES website, navigating our client
                  resources, or scheduling consultations (via Book Demo), you
                  agree to comply with and be bound by these Terms & Conditions.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  2. Scope of Services
                </h2>
                <p>
                  CYDROID TECHNOLOGIES offers enterprise software development, cloud
                  engineering, AI solutions, mobile applications, DevOps, UI/UX,
                  database engineering, and cybersecurity solutions. Any agreements
                  for services are governed by separate master service agreement
                  (MSA) contracts.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  3. Intellectual Property
                </h2>
                <p>
                  The visual layout skeletons, branding tokens, custom stylesheet
                  configurations, and website structure of CYDROID TECHNOLOGIES are
                  protected under intellectual property regulations. You may not
                  replicate our layouts without authorization.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  4. Liability Limits
                </h2>
                <p>
                  CYDROID TECHNOLOGIES provides all placeholders, schemas, sitemaps,
                  and code previews &quot;as is&quot; for diagnostic evaluation.
                  We are not liable for modifications, server errors, or downtime
                  on third-party networks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
