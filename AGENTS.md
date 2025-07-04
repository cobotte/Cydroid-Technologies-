# COBOTTE SOLUTIONS — Agent & Developer Guidelines

## Project Overview
This is the **Cobotte Solutions** enterprise website — a Next.js 16 (App Router) project
using TypeScript strict mode, Tailwind CSS v4, ESLint, and Prettier.

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5 (strict mode — `noUnusedLocals`, `noImplicitReturns`, etc.)
- **Styling**: Tailwind CSS v4 (CSS-first, `@theme` block in `src/styles/globals.css`)
- **Theme**: `next-themes` (dark/light/system, persistent via localStorage)
- **Icons**: `lucide-react` (tree-shaken SVGs)

## Directory Conventions
| Directory | Purpose |
|---|---|
| `src/app/` | Next.js App Router — routes, layouts, pages |
| `src/components/ui/` | Low-level design primitives (ThemeToggle, CanvasWrapper, etc.) |
| `src/components/layout/` | Page-level shell components (Header, Footer, RootLayout) |
| `src/components/sections/` | Full-width page section components (built in Phase 2+) |
| `src/hooks/` | Custom React hooks — always `"use client"` prefixed |
| `src/lib/` | Constants, metadata factories, third-party client wrappers |
| `src/types/` | Shared TypeScript interfaces — import from `@/types` |
| `src/utils/` | Pure utility functions — no side effects, server/client safe |
| `src/styles/` | Global CSS and Tailwind v4 design tokens |
| `public/assets/` | Static images, icons, video files |
| `docs/` | Architecture and phase documentation |

## Import Aliases
Always use `@/` prefix aliases, never relative paths that traverse directories:
```ts
// ✅ Correct
import { cn } from "@/utils/cn";
import { SITE_CONFIG } from "@/lib/constants";
import type { NavItem } from "@/types";

// ❌ Incorrect
import { cn } from "../../utils/cn";
```

## Key Patterns

### Theme Colors
All colors are CSS variables mapped through Tailwind v4's `@theme` block. Use semantic names:
```tsx
className="bg-background text-foreground"           // Base surface
className="bg-card border-border text-card-foreground" // Card surfaces
className="text-primary"                             // Brand cyan (#00f0ff dark / #0284c7 light)
className="text-muted-foreground"                    // Subdued text
```

### Hydration Safety (React 19)
Use `useSyncExternalStore` for client-only rendering to prevent hydration mismatches:
```tsx
const isMounted = React.useSyncExternalStore(
  emptySubscribe,
  () => true,
  () => false
);
if (!isMounted) return <SkeletonPlaceholder />;
```
Or import `useIsMounted` from `@/hooks/useMediaQuery`.

### Server Components (default)
All files in `src/app/` are Server Components by default. Only add `"use client"` when
using hooks (`useState`, `useEffect`, browser APIs) or event handlers.

### Accessibility
- Every interactive element must have an `aria-label` or visible text label.
- Use `.focus-ring-custom` class (defined in `globals.css`) on all focusable elements.
- All images via `next/image` must include meaningful `alt` text.
- Sections should use semantic landmark roles: `<header>`, `<nav>`, `<main>`, `<footer>`, `<section>`.

## Phase Status
| Phase | Status | Description |
|---|---|---|
| Phase 1 | ✅ Complete | Project foundation, architecture, tokens, routes |
| Phase 2 | 🔜 Pending | Brand design, core UI components, Hero section |
| Phase 3 | 🔜 Pending | Section content, video integration, copy |
| Phase 4 | 🔜 Pending | 3D robot, GSAP animations, Three.js |

## Code Quality Commands
```bash
npm run dev           # Start development server
npm run type-check    # Run TypeScript compiler check
npm run lint          # Run ESLint
npm run lint:fix      # Auto-fix ESLint issues
npm run format        # Auto-format with Prettier
npm run format:check  # Check formatting without writing
npm run build         # Production build
```

## Security Notes
- **Never** commit `.env.local` — use `.env.example` as template
- Rate limiting is in-memory (Edge middleware). For production, migrate to Upstash Redis
- CSP is configured in `src/middleware.ts` — update `script-src` when adding third-party scripts (e.g. Google Analytics)
- Bot blocking list is in `src/lib/constants.ts` → `BLOCKED_BOTS`
