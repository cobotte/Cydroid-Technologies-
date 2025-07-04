import type { Metadata } from "next";
import { Lock } from "lucide-react";
import { buildPageMetadata } from "@/lib";
import { SchemaMarkup, generateBreadcrumbSchema } from "@/components/ui/schema-markup";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "Review the privacy policy of CYDROID TECHNOLOGIES, detailing how we gather, protect, and handle data.",
  canonicalPath: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaMarkup
        schema={generateBreadcrumbSchema([
          { name: "Home", path: "" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <div className="flex flex-col min-h-screen">
        {/* Page Header */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 bg-gradient-to-b from-background to-background-2 border-b border-border/40">
          <div className="container-narrow">
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-primary" />
              <span className="text-xs font-mono text-primary font-bold uppercase tracking-widest">
                Legal
              </span>
            </div>
            <h1 className="text-display-md font-extrabold tracking-tight text-foreground font-display">
              Privacy Policy
            </h1>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              Last Updated: June 10, 2026
            </p>
          </div>
        </section>

        {/* Policy Content */}
        <section className="section-md bg-background">
          <div className="container-narrow prose prose-invert">
            <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  1. Data Protection Overview
                </h2>
                <p>
                  CYDROID TECHNOLOGIES is committed to protecting the privacy of our
                  website visitors and clients. This policy documents the types of
                  information we collect, how we secure it, and your rights
                  regarding your personal data parameters.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  2. Information Collection
                </h2>
                <p>
                  We only gather basic operational logs, contact form details, and
                  scheduling parameters you explicitly provide (such as during
                  Book Demo inquiries). We do not load silent third-party trackers
                  or ad network beacons.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  3. Security Measures
                </h2>
                <p>
                  In alignment with our security-first philosophy, all data in
                  transit is encrypted using enterprise-grade TLS protocols.
                  In-memory rate limiting and rigid firewalls prevent unauthorized
                  access queries.
                </p>
              </div>

              <div>
                <h2 className="text-lg font-bold text-foreground mb-3 font-display">
                  4. Client Rights & Contact
                </h2>
                <p>
                  You may request access to, correction of, or deletion of your
                  stored contact logs at any time. For privacy inquiries, please
                  connect with us at{" "}
                  <a
                    href="mailto:contact@cydroidtech.com"
                    className="text-primary hover:underline"
                  >
                    contact@cydroidtech.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
