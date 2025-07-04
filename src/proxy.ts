/**
 * CYDROID TECHNOLOGIES — Next.js Middleware
 * Phase 15: Enterprise Security Hardening
 *
 * Execution order per request:
 *  1. Suspicious path block  — scanner bait detection
 *  2. Bot UA filter          — known bad bots rejected
 *  3. Global rate limiting   — IP-based sliding window
 *  4. Security headers       — full OWASP header set applied
 *
 * NOTE: Middleware runs on the Edge Runtime — no Node.js-only APIs.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  BAD_BOT_PATTERNS,
  SUSPICIOUS_PATHS,
  RATE_LIMITS,
  PERMISSIONS_POLICY,
  SECURITY_HEADERS,
  buildCSP,
} from "@/lib/security-config";

// ─── In-Memory Rate Limit Store ───────────────────────────────────────────────
// Edge-compatible Map store. For multi-region production deployments,
// replace with Upstash Redis (@upstash/ratelimit).

interface RateBucket {
  count: number;
  resetAt: number;
}

const globalStore = new Map<string, RateBucket>();
const apiStore = new Map<string, RateBucket>();

function checkRateLimit(
  store: Map<string, RateBucket>,
  key: string,
  maxRequests: number,
  windowMs: number
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();

  // Periodic cleanup to prevent memory bloat
  if (store.size > 2000) {
    for (const [k, v] of store.entries()) {
      if (now > v.resetAt) store.delete(k);
    }
  }

  const bucket = store.get(key);

  if (!bucket || now > bucket.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  bucket.count++;
  if (bucket.count > maxRequests) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  return { allowed: true };
}

// ─── Proxy (formerly Middleware) ─────────────────────────────────────────────

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";

  // ── Extract real client IP (Cloudflare → X-Forwarded-For → fallback) ──────
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  // ═══════════════════════════════════════════════════════════════════════════
  // GUARD 1 — Suspicious Path Block
  // Reject well-known scanner bait paths before any processing
  // ═══════════════════════════════════════════════════════════════════════════
  const lowerPath = pathname.toLowerCase();
  const isSuspicious = SUSPICIOUS_PATHS.some(
    (p) => lowerPath === p || lowerPath.startsWith(p + "/")
  );

  if (isSuspicious) {
    console.warn(`[SECURITY:SUSPICIOUS_PATH] ip=${ip} path=${pathname}`);
    return new NextResponse(null, { status: 404 }); // Return 404, not 403 — don't confirm path exists
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GUARD 2 — Bot User-Agent Filter
  // Block known bad bots, scrapers, vulnerability scanners
  // ═══════════════════════════════════════════════════════════════════════════
  const ua = (request.headers.get("user-agent") ?? "").toLowerCase();
  const isBot = BAD_BOT_PATTERNS.some((pattern) => ua.includes(pattern));

  if (isBot) {
    console.warn(`[SECURITY:BOT_BLOCKED] ip=${ip} ua=${ua.slice(0, 80)}`);
    return new NextResponse(null, { status: 403 });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // GUARD 3 — Rate Limiting
  // API routes get stricter limits than page routes
  // ═══════════════════════════════════════════════════════════════════════════
  const isApiRoute = pathname.startsWith("/api/");
  const rateLimitKey = `${ip}:${isApiRoute ? "api" : "global"}`;

  const { maxRequests, windowMs } = isApiRoute
    ? RATE_LIMITS.api
    : RATE_LIMITS.global;

  const store = isApiRoute ? apiStore : globalStore;
  const rateCheck = checkRateLimit(store, rateLimitKey, maxRequests, windowMs);

  if (!rateCheck.allowed) {
    console.warn(`[SECURITY:RATE_LIMITED] ip=${ip} path=${pathname}`);
    return new NextResponse(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      {
        status: 429,
        headers: {
          "Content-Type": "application/json",
          "Retry-After": String(rateCheck.retryAfter ?? 60),
          "X-RateLimit-Limit": String(maxRequests),
        },
      }
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SECURITY HEADERS — Applied to all passing requests
  // Full OWASP recommended header set
  // ═══════════════════════════════════════════════════════════════════════════
  const response = NextResponse.next();
  const h = response.headers;

  // Content-Security-Policy
  h.set("Content-Security-Policy", buildCSP(isDev));

  // Prevent clickjacking
  h.set("X-Frame-Options", SECURITY_HEADERS.X_FRAME_OPTIONS);

  // Prevent MIME sniffing
  h.set("X-Content-Type-Options", SECURITY_HEADERS.X_CONTENT_TYPE_OPTIONS);

  // HTTPS enforcement (2 years, with subdomains, preload-ready)
  h.set("Strict-Transport-Security", SECURITY_HEADERS.HSTS);

  // Referrer control
  h.set("Referrer-Policy", SECURITY_HEADERS.REFERRER_POLICY);

  // Browser feature permissions
  h.set("Permissions-Policy", PERMISSIONS_POLICY);

  // Cross-Origin headers
  h.set("Cross-Origin-Opener-Policy", SECURITY_HEADERS.CROSS_ORIGIN_OPENER_POLICY);
  h.set("Cross-Origin-Resource-Policy", SECURITY_HEADERS.CROSS_ORIGIN_RESOURCE_POLICY);
  h.set("Cross-Origin-Embedder-Policy", SECURITY_HEADERS.CROSS_ORIGIN_EMBEDDER_POLICY);

  // Prevent Adobe Flash/Silverlight cross-domain policy
  h.set("X-Permitted-Cross-Domain-Policies", SECURITY_HEADERS.X_PERMITTED_CROSS_DOMAIN_POLICIES);

  // Prevent IE/Edge from executing downloads in site context
  h.set("X-Download-Options", SECURITY_HEADERS.X_DOWNLOAD_OPTIONS);

  // DNS prefetch control (performance + privacy balance)
  h.set("X-DNS-Prefetch-Control", "on");

  // Remove server identity headers (security through obscurity layer)
  h.delete("X-Powered-By");
  h.delete("Server");

  return response;
}

// ─── Middleware Matcher ───────────────────────────────────────────────────────

export const config = {
  matcher: [
    /*
     * Run middleware on ALL paths EXCEPT:
     * - _next/static  — compiled static assets
     * - _next/image   — image optimisation service
     * - assets/       — public static files (images, videos, robot frames)
     * - favicon.ico   — favicon
     *
     * Note: Security headers still need to be on the page routes and API routes.
     * The assets/ exclusion is intentional — they're already cached with
     * Cache-Control headers and don't need CSP or auth checks.
     */
    "/((?!_next/static|_next/image|assets/|favicon\\.ico$).*)",
  ],
};
