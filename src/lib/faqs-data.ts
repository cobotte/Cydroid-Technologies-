// Static FAQ Data for CYDROID TECHNOLOGIES
// Extracted to a separate server-friendly file to support dynamic SEO FAQ page-level schema generation

export type FAQCategory = "all" | "general" | "pricing" | "security" | "support";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: Exclude<FAQCategory, "all">;
  tags?: string[];
}

export const FAQS: FAQ[] = [
  {
    id: "faq-1",
    category: "general",
    question: "What services does CYDROID TECHNOLOGIES offer?",
    answer: "We provide enterprise software development, web development, mobile application development, cloud engineering, AI solutions, DevOps, UI/UX design, API development, cybersecurity services, and long-term maintenance & support.",
    tags: ["services", "overview", "capabilities"]
  },
  {
    id: "faq-2",
    category: "general",
    question: "How long does a typical project take?",
    answer: "Project timelines depend on complexity and requirements. Small websites may take 2–4 weeks, while enterprise software and custom platforms typically require 2–6 months.",
    tags: ["timeline", "duration", "scoping"]
  },
  {
    id: "faq-3",
    category: "general",
    question: "Which technologies do you use?",
    answer: "Our technology stack includes Next.js, React, TypeScript, Node.js, Express.js, Python, PostgreSQL, MongoDB, Tailwind CSS, Docker, Kubernetes, AWS, Azure, Cloudflare, and Vercel.",
    tags: ["tech-stack", "frontend", "backend", "cloud"]
  },
  {
    id: "faq-4",
    category: "pricing",
    question: "Can you build SaaS platforms?",
    answer: "Yes. We develop scalable Software-as-a-Service (SaaS) platforms with secure authentication, subscription management, cloud deployment, and enterprise-grade architecture.",
    tags: ["saas", "pricing", "development"]
  },
  {
    id: "faq-5",
    category: "general",
    question: "Do you develop mobile applications?",
    answer: "Yes. We build responsive Progressive Web Apps (PWAs), cross-platform applications, and native mobile applications for Android and iOS.",
    tags: ["mobile", "apps", "android", "ios"]
  },
  {
    id: "faq-6",
    category: "support",
    question: "Do you offer cloud deployment services?",
    answer: "Yes. We assist with cloud architecture, infrastructure setup, application deployment, monitoring, and cloud optimization using leading cloud platforms.",
    tags: ["cloud", "hosting", "deployment"]
  },
  {
    id: "faq-7",
    category: "support",
    question: "Can you integrate Artificial Intelligence into applications?",
    answer: "Yes. We develop AI-powered chatbots, workflow automation, intelligent assistants, predictive analytics, and AI-enhanced business solutions.",
    tags: ["ai", "integration", "machine-learning"]
  },
  {
    id: "faq-8",
    category: "general",
    question: "Do you provide UI/UX design services?",
    answer: "Yes. We design modern, intuitive, and responsive user interfaces focused on accessibility, usability, and excellent customer experience.",
    tags: ["ui-ux", "design", "wireframes"]
  },
  {
    id: "faq-9",
    category: "support",
    question: "Do you offer API development and integration?",
    answer: "Yes. We build secure REST APIs, GraphQL services, payment gateway integrations, third-party integrations, and enterprise API solutions.",
    tags: ["api", "rest", "graphql", "integration"]
  },
  {
    id: "faq-10",
    category: "support",
    question: "Can you migrate our existing system?",
    answer: "Yes. We help businesses modernize legacy applications, migrate databases, upgrade platforms, and move workloads to modern cloud environments with minimal disruption.",
    tags: ["migration", "database", "modernize"]
  },
  {
    id: "faq-11",
    category: "security",
    question: "Do you provide cybersecurity services?",
    answer: "Yes. We offer vulnerability assessments, penetration testing, secure code reviews, web application security assessments, cloud security consulting, and security best practice implementation.",
    tags: ["cybersecurity", "security-audit", "penetration-testing"]
  },
  {
    id: "faq-12",
    category: "security",
    question: "Is my project data kept confidential?",
    answer: "Absolutely. Client confidentiality is a priority. We follow secure development practices and can work under Non-Disclosure Agreements (NDAs) when required.",
    tags: ["confidentiality", "security", "nda"]
  },
  {
    id: "faq-13",
    category: "general",
    question: "Will my website be mobile-friendly?",
    answer: "Yes. Every solution is designed using a mobile-first approach to ensure an excellent experience across desktops, tablets, and smartphones.",
    tags: ["mobile", "responsive", "design"]
  },
  {
    id: "faq-14",
    category: "support",
    question: "Do you optimize websites for search engines (SEO)?",
    answer: "Yes. We implement technical SEO best practices, including optimized metadata, structured data, sitemap generation, responsive design, and performance optimization.",
    tags: ["seo", "indexing", "search-engine"]
  },
  {
    id: "faq-15",
    category: "support",
    question: "Will my website be fast and optimized?",
    answer: "Yes. Performance optimization is integrated into every project through image optimization, lazy loading, caching strategies, code splitting, and Core Web Vitals optimization.",
    tags: ["performance", "speed", "optimization", "lighthouse"]
  },
  {
    id: "faq-16",
    category: "support",
    question: "Do you provide ongoing maintenance and support?",
    answer: "Yes. We offer maintenance plans that include software updates, security patches, performance monitoring, bug fixes, backups, and technical support.",
    tags: ["maintenance", "support", "remediation"]
  },
  {
    id: "faq-17",
    category: "pricing",
    question: "Can you redesign an existing website or application?",
    answer: "Yes. We modernize outdated websites and applications by improving design, performance, security, responsiveness, and overall user experience.",
    tags: ["redesign", "modernize", "ux"]
  },
  {
    id: "faq-18",
    category: "general",
    question: "How do you manage project communication?",
    answer: "We maintain transparent communication throughout the project using scheduled meetings, progress updates, milestone reviews, and collaborative project management tools.",
    tags: ["communication", "project-management", "agile"]
  },
  {
    id: "faq-19",
    category: "pricing",
    question: "Can your solutions scale as our business grows?",
    answer: "Yes. Our applications are designed with scalability in mind, allowing businesses to expand features, users, and infrastructure as requirements evolve.",
    tags: ["scaling", "enterprise", "cloud"]
  },
  {
    id: "faq-20",
    category: "general",
    question: "How do I get started with CYDROID TECHNOLOGIES?",
    answer: "Simply contact us through our website or schedule a consultation. We'll discuss your goals, understand your requirements, and prepare a tailored proposal and development roadmap.",
    tags: ["getting-started", "consultation", "roadmap"]
  }
];
