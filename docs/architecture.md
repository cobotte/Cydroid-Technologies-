# CyDroid Technologies — Technical Architecture Documentation

This document provides a detailed overview of the system architecture, design tokens, styling practices, performance patterns, and security mechanisms for the **CyDroid Technologies** enterprise platform.

---

## 1. Folder Structure

The repository is organized following an enterprise-grade, scalable Next.js directory structure:

```text
cydroid-technologies/
├── docs/                      # Architectural and feature documentation
│   └── architecture.md
├── public/                    # Static assets (images, icons, fonts)
│   └── assets/
├── src/
│   ├── app/                   # App Router directories & pages
│   │   ├── about/             # /about route
│   │   ├── book-demo/         # /book-demo route
│   │   ├── contact/           # /contact route
│   │   ├── portfolio/         # /portfolio route
│   │   ├── pricing/           # /pricing route
│   │   ├── privacy-policy/    # /privacy-policy route
│   │   ├── terms-and-conditions/ # /terms-and-conditions route
│   │   ├── services/          # /services route
│   │   ├── layout.tsx         # Global app wrapper & SEO metadata
│   │   ├── page.tsx           # Landing page
│   │   ├── robots.ts          # Search crawler rules
│   │   └── sitemap.ts         # Dynamic sitemap builder
│   ├── components/            # Reusable UI & Layout modules
│   │   ├── layout/            # Layout skeletons (header, footer, nav)
│   │   ├── sections/          # Section-specific components
│   │   └── ui/                # Core design token widgets
│   │       ├── CanvasWrapper.tsx # Safe WebGL dynamic container
│   │       ├── OptimizedVideo.tsx# Lazy-load video asset element
│   │       ├── schema-markup.tsx # JSON-LD script injector
│   │       ├── theme-provider.tsx# Light/dark context manager
│   │       └── ThemeToggle.tsx   # Accessibly styled switcher
│   ├── hooks/                 # Custom hooks (animation trackers, etc.)
│   │   └── useAnimation.ts    # GSAP event garbage collector
│   ├── lib/                   # Remote clients, vendors, config libraries
│   ├── styles/                # CSS styling systems & global imports
│   │   └── globals.css        # Tailwind v4 configuration & tokens
│   ├── types/                 # Shared TypeScript interfaces
│   └── utils/                 # Utility files
│       └── validation.ts      # Input sanitization & validator helpers
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages CI/CD pipeline
├── .env.example               # Environmental config keys skeleton
├── .gitignore                 # Excluded directories (node_modules, builds)
├── .prettierrc                # Coding standard formatting rules
├── eslint.config.mjs          # Static syntax inspection limits
├── next.config.ts             # NextJS runtime configuration overrides
├── package.json               # Node packages and scripts
└── tsconfig.json              # TypeScript compilation specifications
```

---

## 2. Design Tokens & Styling (Tailwind v4)

Tailwind CSS v4 introduces a CSS-first configuration model. All styling tokens are configured as CSS variables in `src/styles/globals.css` and registered in the `@theme` block.

### Color Palettes
- **Light Theme**: Dominated by high-contrast slate borders (`#e2e8f0`), deep gray text (`#0f172a`), and clear cyan-blue primary accents (`#0284c7`).
- **Dark Theme (Tech Slate/Cyber)**: Carbon black background (`#030712`), card bases (`#0b0f19`), and bright neon cyan primary highlights (`#00f0ff`).

### Layout & Responsiveness
We enforce a mobile-first design strategy. The custom breakpoints configured are:
- `xs` (475px): For small smartphones.
- `sm` (640px): Standard mobile breakpoint.
- `md` (768px): Tablet landscape.
- `lg` (1024px): Laptop.
- `xl` (1280px): Standard Desktop.
- `2xl` (1536px): Large desktop.
- `3xl` (1920px): Ultra-wide screens (enables dynamic asset scaling).

---

## 3. Technology Decisions

| Technology | Selected Version | Rationale |
| :--- | :--- | :--- |
| **Next.js** | `16.x` (Stable) | React-based server framework utilizing App Router for optimized caching, layout nesting, and SEO compilation. |
| **TypeScript** | `5.x` | Strict checking ensures compilation safety, type safety on routes, and interface definitions. |
| **Tailwind CSS** | `4.x` | CSS-first architecture. Substantially smaller runtime compiler, native support for CSS variables, faster build processes. |
| **next-themes** | `0.4.x` | Zero-FOUC (Flash of Unstyled Content) theme resolver using local storage and media queries. |
| **lucide-react** | `1.x` | Scalable SVG icon engine supporting tree-shaking for lighter payloads. |
| **GSAP** | `3.x` | High-performance animation engine for scroll-triggered robot canvas sequences. |

---

## 4. Performance Foundations

- **Code Splitting**: The `CanvasWrapper` ensures WebGL / Three.js libraries are only loaded in the client browser runtime context, completely avoiding blocking main thread hydration on initial render.
- **Intersection Observer Lazy Loading**: The `OptimizedVideo` component plays high-definition media only when the element enters the user's active screen viewport.
- **Clean Animations Hook**: The `useAnimation` hook ensures that GSAP timelines or requestAnimationFrame loops are closed when changing routes, preventing browser memory leaks.
- **Static Export**: The `output: "export"` setting in `next.config.ts` enables zero-server static deployment on GitHub Pages.

---

## 5. Security & SEO Setup

- **Security Headers**: Standard headers are injected on all incoming HTTP requests via Edge middleware.
  - Strict Content Security Policy (CSP) restricts object injection and third-party scripts.
  - DNS prefetching, Referrer policies, and Strict Transport Security (HSTS) are set to enterprise-grade ratings.
- **Scraper Filtering**: Known indexing crawler scraper bots are rejected with a `403` code.
- **IP Rate Limiting**: In-memory sliding window checks limit traffic bursts to a maximum of 100 requests per minute per IP address.
- **Search Metadata**: Layout uses the Next.js `Metadata` and `Viewport` structures to compile dynamic Sitemap files, Robots regulations, canonical paths, Open Graph tags, and Twitter Cards tags.

---

## 6. Deployment

The project is automatically deployed to **GitHub Pages** via GitHub Actions on every push to `main`.

- **Workflow**: `.github/workflows/deploy.yml`
- **Build Command**: `npm run build` (with `GITHUB_PAGES=true` env var)
- **Output Directory**: `./out` (Next.js static export)
- **Live URL**: `https://cobotte.github.io/Cydroid-Technologies-`

---

## 7. Future Phase Recommendations

1. **Phase 2 — Brand Theme & Core Components**:
   - Establish final color codes matching selected logos.
   - Develop low-level design primitives (custom forms, buttons, cards, skeletons).
2. **Phase 3 — Section Content & Video Hero**:
   - Integrate new optimized hero assets utilizing the asset loaders.
   - Add SEO optimized copy block sections for Cybersecurity and AI services.
3. **Phase 4 — 3D Scene & Interactive Animation**:
   - Build out custom animations using CanvasWrapper.
   - Implement smooth scrolling and layout entrances using GSAP.
