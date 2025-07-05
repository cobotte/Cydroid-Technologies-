/**
 * CYDROID TECHNOLOGIES — SEO Metadata Factory
 *
 * Utility functions to generate consistent, DRY page-level metadata
 * objects for use in Next.js route `export const metadata = { ... }`.
 *
 * Usage:
 *   export const metadata = buildPageMetadata({
 *     title: "About Us",
 *     description: "Learn about CYDROID TECHNOLOGIES...",
 *     canonicalPath: "/about",
 *   });
 */

import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";
import type { PageSeoConfig } from "@/types";

const DEFAULT_OG_IMAGE = `${SITE_CONFIG.url}/assets/og-default.png`;

/**
 * Generates a full Next.js Metadata object for a given page.
 * Inherits site-level defaults and merges page-specific overrides.
 */
export function buildPageMetadata(config: PageSeoConfig): Metadata {
  const { title, description, canonicalPath, ogImage, noIndex, keywords } =
    config;

  const fullUrl = `${SITE_CONFIG.url}${canonicalPath}`;
  const resolvedOgImage = ogImage ?? DEFAULT_OG_IMAGE;

  return {
    title,
    description,
    keywords: keywords ?? [
      "web development",
      "cybersecurity",
      "SEO",
      "digital agency",
      "CYDROID TECHNOLOGIES",
    ],
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      url: fullUrl,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
      type: "website",
      images: [
        {
          url: resolvedOgImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE_CONFIG.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      creator: SITE_CONFIG.twitter,
      images: [resolvedOgImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * Generates structured data (JSON-LD) for a service page.
 */
export function buildServiceSchema(
  serviceName: string,
  description: string,
  url: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description,
    provider: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    url,
  };
}

/**
 * Generates structured data (JSON-LD) for a FAQ section.
 */
export function buildFAQSchema(
  faqs: Array<{ question: string; answer: string }>
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
