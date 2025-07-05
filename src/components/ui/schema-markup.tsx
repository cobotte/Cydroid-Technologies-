interface SchemaMarkupProps {
  schema: Record<string, unknown>;
}

/**
 * SchemaMarkup Component
 *
 * Facilitates the injection of JSON-LD schema metadata for search engines.
 * Serializes custom Javascript objects directly into structured HTML scripts.
 */
export function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Pre-configured Organization Schema template for CYDROID TECHNOLOGIES
export const cydroidOrganizationSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://cydroidtech.com/#organization",
  name: "CYDROID TECHNOLOGIES",
  url: "https://cydroidtech.com",
  logo: "https://cydroidtech.com/assets/logo.png",
  sameAs: [
    "https://linkedin.com/company/cydroid-technologies",
    "https://github.com/cydroid-technologies",
    "https://x.com/cydroidtech",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: "contact@cydroidtech.com",
    telephone: "+1-555-248-7631",
  },
  description:
    "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
};

// Pre-configured Local Business Schema for Local SEO
export const cydroidLocalBusinessSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://cydroidtech.com/#localbusiness",
  name: "CYDROID TECHNOLOGIES",
  image: "https://cydroidtech.com/assets/logo.png",
  url: "https://cydroidtech.com",
  telephone: "+1-555-248-7631",
  email: "contact@cydroidtech.com",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "123 Innovation Avenue, Business District",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "10:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://linkedin.com/company/cydroid-technologies",
    "https://github.com/cydroid-technologies",
    "https://x.com/cydroidtech",
  ],
};

// Pre-configured Website Schema for Search Box
export const cydroidWebsiteSchema: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://cydroidtech.com/#website",
  url: "https://cydroidtech.com",
  name: "CYDROID TECHNOLOGIES",
  description:
    "Enterprise-grade software development, cloud engineering, AI solutions, mobile applications, DevOps, UI/UX, and cybersecurity solutions.",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://cydroidtech.com/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

// Generates dynamic Services Schema for the services page
export function generateServicesSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CYDROID TECHNOLOGIES Services",
    description: "Enterprise-grade technical services offered by CYDROID TECHNOLOGIES.",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Service",
          name: "Enterprise Software Development",
          description: "Design and development of enterprise-grade software solutions tailored to complex business requirements.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Service",
          name: "Cloud Engineering",
          description: "Build secure, scalable, and cloud-native infrastructure that supports modern applications while ensuring reliability.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Service",
          name: "AI Solutions",
          description: "Leverage Artificial Intelligence to automate workflows, improve decision-making, and build intelligent digital experiences.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Service",
          name: "Mobile Development",
          description: "Develop modern, high-performance mobile applications that deliver seamless user experiences across Android and iOS platforms.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Service",
          name: "DevOps Engineering",
          description: "Accelerate software delivery through automated deployment pipelines, infrastructure management, and continuous integration.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Service",
          name: "UI/UX Design",
          description: "Create visually engaging, intuitive, and user-focused digital experiences that improve customer satisfaction.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 7,
        item: {
          "@type": "Service",
          name: "API Development & Integration",
          description: "Develop secure, scalable, and well-documented APIs that connect applications and enable seamless system integration.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 8,
        item: {
          "@type": "Service",
          name: "Maintenance & Support",
          description: "Provide continuous monitoring, maintenance, updates, and technical support to ensure applications remain secure and stable.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 9,
        item: {
          "@type": "Service",
          name: "Cybersecurity Solutions",
          description: "Protect digital assets with comprehensive cybersecurity services designed to identify vulnerabilities and defend against threats.",
          provider: {
            "@type": "LocalBusiness",
            "@id": "https://cydroidtech.com/#localbusiness",
          },
        },
      },
    ],
  };
}

// Generates dynamic Breadcrumb Schema for SEO visibility
export function generateBreadcrumbSchema(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "" ? "https://cydroidtech.com" : `https://cydroidtech.com${item.path}`,
    })),
  };
}

// Generates dynamic FAQ Schema mapping
export function generateFAQSchema(faqs: { question: string; answer: string }[]): Record<string, unknown> {
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
