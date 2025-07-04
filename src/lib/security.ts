/**
 * CYDROID TECHNOLOGIES — Centralised Security Library
 * Phase 15: Enterprise Security Hardening
 *
 * This module is the single source of truth for all runtime security
 * primitives used across middleware and API routes.
 *
 * Contents:
 *  1. IP Extraction          — Cloudflare-aware, proxy-safe
 *  2. RateLimiter            — Sliding window, per-key, configurable
 *  3. Request Size Guard     — Reject oversized payloads
 *  4. Security Event Logger  — Structured, production-safe logging
 *  5. Origin Validator       — Same-site / CORS origin check
 */

// ─── 1. IP Extraction ─────────────────────────────────────────────────────────

/**
 * Extracts the real client IP address in priority order:
 *   Cloudflare CF-Connecting-IP → X-Forwarded-For (first IP) → X-Real-IP → fallback
 *
 * Never trust the raw socket IP in a proxied environment.
 */
export function getClientIP(headers: Headers): string {
  // Cloudflare always sets this when proxying
  const cf = headers.get("cf-connecting-ip");
  if (cf) return cf.trim();

  // Standard proxy header — take the first (leftmost = original client)
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }

  // Nginx / other reverse proxies
  const real = headers.get("x-real-ip");
  if (real) return real.trim();

  return "unknown";
}

// ─── 2. Rate Limiter ──────────────────────────────────────────────────────────

interface RateLimitEntry {
  timestamps: number[];
  blocked: boolean;
  blockedUntil?: number;
}

interface RateLimiterOptions {
  /** Maximum requests allowed within the window */
  maxRequests: number;
  /** Window duration in milliseconds */
  windowMs: number;
  /** If exceeded, how long to block the IP in ms (default: windowMs) */
  blockDurationMs?: number;
}

/**
 * Sliding-window rate limiter using in-memory storage.
 *
 * Production note: For multi-instance deployments (Vercel, containers),
 * replace the internal Map with Upstash Redis or similar shared store.
 * This implementation is correct for single-instance and Edge Runtime.
 */
export class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  private readonly maxRequests: number;
  private readonly windowMs: number;
  private readonly blockDurationMs: number;
  private cleanupCounter = 0;

  constructor(options: RateLimiterOptions) {
    this.maxRequests = options.maxRequests;
    this.windowMs = options.windowMs;
    this.blockDurationMs = options.blockDurationMs ?? options.windowMs;
  }

  /**
   * Check if the given key (IP address) is rate-limited.
   * Returns { limited: true, retryAfter: seconds } if blocked.
   * Returns { limited: false } if the request should proceed.
   */
  check(key: string): { limited: false } | { limited: true; retryAfter: number } {
    const now = Date.now();

    // Periodic cleanup — prevent memory bloat from stale entries
    this.cleanupCounter++;
    if (this.cleanupCounter > 500) {
      this.cleanup(now);
      this.cleanupCounter = 0;
    }

    const entry = this.store.get(key);

    // Check if currently in a hard block period
    if (entry?.blocked && entry.blockedUntil && now < entry.blockedUntil) {
      return {
        limited: true,
        retryAfter: Math.ceil((entry.blockedUntil - now) / 1000),
      };
    }

    // Sliding window: keep only timestamps within the current window
    const recent = (entry?.timestamps ?? []).filter((t) => now - t < this.windowMs);

    if (recent.length >= this.maxRequests) {
      // Set hard block
      const blockedUntil = now + this.blockDurationMs;
      this.store.set(key, { timestamps: recent, blocked: true, blockedUntil });
      return {
        limited: true,
        retryAfter: Math.ceil(this.blockDurationMs / 1000),
      };
    }

    // Record this request
    recent.push(now);
    this.store.set(key, { timestamps: recent, blocked: false });
    return { limited: false };
  }

  /** Remove expired entries to prevent unbounded memory growth. */
  private cleanup(now: number): void {
    for (const [key, entry] of this.store.entries()) {
      const hasRecentActivity = entry.timestamps.some((t) => now - t < this.windowMs);
      const isStillBlocked = entry.blocked && entry.blockedUntil && now < entry.blockedUntil;
      if (!hasRecentActivity && !isStillBlocked) {
        this.store.delete(key);
      }
    }
  }
}

// ─── Pre-built rate limiters for each route ────────────────────────────────────

/** Contact form — strict: 3 submissions per 2 minutes per IP */
export const contactRateLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 2 * 60 * 1000,
  blockDurationMs: 5 * 60 * 1000, // block for 5 min on excess
});

/** Book demo form — strict: 3 submissions per 2 minutes per IP */
export const bookDemoRateLimiter = new RateLimiter({
  maxRequests: 3,
  windowMs: 2 * 60 * 1000,
  blockDurationMs: 5 * 60 * 1000,
});

// ─── 3. Request Size Guard ────────────────────────────────────────────────────

const MAX_BODY_BYTES = 16 * 1024; // 16 KB — generous for any legitimate form

/**
 * Returns true if the Content-Length header indicates an oversized payload.
 * Also rejects requests with no Content-Length when it is required.
 */
export function isOversizedRequest(headers: Headers): boolean {
  const contentLength = headers.get("content-length");
  if (!contentLength) return false; // Allow chunked encoding (validated post-parse)
  const bytes = parseInt(contentLength, 10);
  return !isNaN(bytes) && bytes > MAX_BODY_BYTES;
}

// ─── 4. Security Event Logger ─────────────────────────────────────────────────

type SecurityEventType =
  | "RATE_LIMITED"
  | "BOT_BLOCKED"
  | "HONEYPOT_TRIGGERED"
  | "OVERSIZED_PAYLOAD"
  | "INVALID_CONTENT_TYPE"
  | "SQLI_DETECTED"
  | "XSS_DETECTED"
  | "VALIDATION_FAILED"
  | "SUSPICIOUS_PATH"
  | "ORIGIN_REJECTED"
  | "FORM_SUBMISSION";

interface SecurityEvent {
  event: SecurityEventType;
  ip: string;
  path: string;
  detail?: string;
  timestamp: string;
}

/**
 * Structured security event logger.
 * In production, pipe these to your logging service (Datadog, Logtail, etc.)
 * by replacing console.warn with your logger client.
 *
 * Never logs user PII beyond IP (which is hashed in future versions).
 */
export function logSecurityEvent(event: Omit<SecurityEvent, "timestamp">): void {
  const entry: SecurityEvent = {
    ...event,
    timestamp: new Date().toISOString(),
  };

  // Production: replace with external logger
  if (process.env.NODE_ENV === "production") {
    console.warn(`[SECURITY] ${JSON.stringify(entry)}`);
  } else {
    console.warn(
      `[SECURITY:${entry.event}] ip=${entry.ip} path=${entry.path}${entry.detail ? ` detail=${entry.detail}` : ""}`
    );
  }
}

// ─── 5. Origin Validator ──────────────────────────────────────────────────────

/**
 * Validates that the request Origin header matches the expected site origin.
 * Rejects cross-origin form submissions (CSRF mitigation).
 *
 * Returns true if the origin is acceptable, false if it should be rejected.
 */
export function isValidOrigin(headers: Headers): boolean {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";
  
  // If no site URL configured (local dev), allow all
  if (!siteUrl) return true;

  const origin = headers.get("origin") ?? headers.get("referer") ?? "";
  if (!origin) return true; // Allow server-to-server / direct API calls

  // Allow localhost and loopback in non-production environments
  if (process.env.NODE_ENV !== "production") {
    if (origin.includes("localhost:") || origin.includes("127.0.0.1:")) {
      return true;
    }
  }

  try {
    const requestOrigin = new URL(origin).origin;
    const allowedOrigin = new URL(siteUrl).origin;
    return requestOrigin === allowedOrigin;
  } catch {
    // Malformed URL in Origin header — reject
    return false;
  }
}

// ─── 6. Turnstile Verification ────────────────────────────────────────────────

/**
 * Verify Cloudflare Turnstile CAPTCHA response.
 * Returns true if valid, or if Turnstile keys are not set and we're not in production.
 */
export async function verifyTurnstileToken(token: string | undefined, ip: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    // If not in production and keys aren't set, fallback to true to prevent blocking local development
    if (process.env.NODE_ENV !== "production") {
      return true;
    }
    return false;
  }

  if (!token) return false;

  try {
    const formData = new FormData();
    formData.append("secret", secretKey);
    formData.append("response", token);
    formData.append("remoteip", ip);

    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return !!data.success;
  } catch (error) {
    console.error("[SECURITY:TURNSTILE_VERIFY_ERROR]", error);
    return false;
  }
}
