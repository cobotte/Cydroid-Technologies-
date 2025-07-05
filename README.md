# CyDroid Technologies — Enterprise AI & Automation Platform

> Building the future of intelligent automation — one robot at a time.

[![Deploy to GitHub Pages](https://github.com/cobotte/Cydroid-Technologies-/actions/workflows/deploy.yml/badge.svg)](https://github.com/cobotte/Cydroid-Technologies-/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🤖 About CyDroid Technologies

**CyDroid Technologies** is a next-generation AI robotics and automation company delivering enterprise-grade digital systems, custom workflow automations, and cybersecurity safeguards — designed to protect, scale, and evolve your business in the age of artificial intelligence.

We build:
- 🤖 **AI-Powered Robots** — autonomous systems for industrial and commercial environments
- ⚡ **Custom Automation Pipelines** — workflow orchestration and RPA at scale
- 🔒 **Enterprise Cybersecurity** — end-to-end protection for AI-driven infrastructure
- 📱 **Web & Mobile Platforms** — high-performance digital products from concept to deployment

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ and npm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/cobotte/Cydroid-Technologies-.git
cd "CyDroid Technologies"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy the env template and fill in your API keys:
```bash
cp .env.example .env.local
```

Key environment variables:
```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_cloudflare_turnstile_site_key
CLOUDFLARE_TURNSTILE_SECRET_KEY=your_cloudflare_turnstile_secret_key
NEXT_PUBLIC_SITE_URL=https://cydroidtech.com
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server with HMR |
| `npm run build` | Compile and optimise the production bundle |
| `npm run start` | Serve the compiled production build locally |
| `npm run lint` | Run ESLint static code analysis |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run type-check` | Run TypeScript compiler checks (no emit) |
| `npm run format` | Auto-format code with Prettier |
| `npm run format:check` | Verify formatting without writing changes |

---

## 📂 Project Architecture

```
src/
├── app/                  # Next.js App Router — routes & layouts
│   ├── about/            # About CyDroid Technologies page
│   ├── contact/          # Contact & scoping form
│   ├── portfolio/        # Case studies & project showcases
│   ├── pricing/          # Service packages & comparison
│   ├── services/         # Service category grid
│   ├── book-demo/        # Booking & demo scheduling
│   ├── faqs/             # Frequently asked questions
│   ├── privacy-policy/   # Legal — Privacy Policy
│   ├── terms-and-conditions/ # Legal — Terms of Service
│   ├── layout.tsx        # Root metadata & theme wrapper
│   ├── page.tsx          # Landing page
│   ├── robots.ts         # Dynamic robots.txt generator
│   └── sitemap.ts        # Dynamic XML sitemap generator
├── components/
│   ├── ui/               # Reusable design primitives
│   ├── layout/           # Header, Footer, RootLayout shell
│   └── sections/         # Hero, About, Services, Portfolio, etc.
├── hooks/                # Custom React hooks
├── lib/                  # Constants, metadata helpers, schemas
├── types/                # Shared TypeScript interfaces
├── utils/                # Pure utility functions
└── styles/               # Tailwind v4 design tokens & globals
```

---

## 🌐 Deployment

This project is **automatically deployed to GitHub Pages** on every push to `main` via GitHub Actions.

### Live Site
> [https://cobotte.github.io/Cydroid-Technologies-](https://cobotte.github.io/Cydroid-Technologies-)

### Deployment Pipeline
The CI/CD workflow (`.github/workflows/deploy.yml`) handles:
1. Checkout code
2. Setup Node.js 20
3. Install dependencies (`npm ci`)
4. Build static export (`npm run build`)
5. Upload artifact and deploy to GitHub Pages

To trigger a manual deployment, go to **Actions → Deploy to GitHub Pages → Run workflow**.

---

## 🔒 Security

CyDroid Technologies implements a **defence-in-depth** security model:

- **Edge Middleware** — Bot blocking, suspicious path detection, IP rate limiting
- **Content Security Policy** — Strict allowlist against XSS injection
- **HSTS** — Enforced HTTPS with 2-year preload
- **Input Sanitisation** — SQL injection (11 patterns) + XSS (17 patterns) detection
- **Cloudflare WAF** — OWASP CRS rules + custom firewall rules
- **Cloudflare Turnstile** — CAPTCHA protection on all public forms
- **Rate Limiting** — 3-tier: CDN, middleware, per-route handler

See [SECURITY.md](SECURITY.md) for the full security architecture documentation.

---

## 🧑‍💻 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Animations | GSAP 3 + Framer Motion |
| Icons | Lucide React |
| Theme | next-themes (dark/light/system) |
| Security | Cloudflare WAF + Turnstile |
| Deployment | GitHub Pages via GitHub Actions |

---

## 📄 License

MIT © 2025 [CyDroid Technologies](https://cydroidtech.com)

---

<p align="center">
  <strong>CyDroid Technologies</strong> — Empowering the Next Era of Intelligent Automation
  <br/>
  <a href="https://cydroidtech.com">Website</a> · <a href="mailto:contact@cydroidtech.com">Contact</a>
</p>
