/**
 * CYDROID TECHNOLOGIES — Contact Form API Route
 * Phase 15: Enterprise Security Hardening
 *
 * Security layers (in order):
 *  1. Method guard            — Only POST accepted
 *  2. Content-Type guard      — Must be application/json
 *  3. Request size guard      — Reject payloads > 16KB
 *  4. Rate limiting           — 3 per 2 min per IP, 5-min block on excess
 *  5. Honeypot check          — Trap bots filling hidden fields
 *  6. Schema validation       — Full typed validation with SQLi/XSS detection
 *  7. Secure response         — Never expose internals in errors
 *
 * NOTE: GitHub Pages static export — this route is excluded from static build.
 * For production, deploy on Vercel / Node server where API routes are supported.
 */

// Required: tells Next.js static export to skip building this server-side route
export const dynamic = "force-static";

import { NextResponse } from "next/server";
import { validateContactForm } from "@/utils/validation";
import {
  contactRateLimiter,
  getClientIP,
  isOversizedRequest,
  logSecurityEvent,
  isValidOrigin,
  verifyTurnstileToken,
} from "@/lib/security";

// ─── Secure JSON response helper ──────────────────────────────────────────────
function secureError(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

// ─── Reference number generator ───────────────────────────────────────────────
function generateReference(prefix: string): string {
  // crypto.randomUUID is available in Node 14.17+ and Edge Runtime
  const uuid = crypto.randomUUID().replace(/-/g, "").slice(0, 8).toUpperCase();
  return `${prefix}-${uuid}`;
}

// ─── POST Handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = getClientIP(request.headers as unknown as Headers);
  const path = "/api/contact";

  try {
    // ── Guard 1.5: CSRF / Origin validation ───────────────────────────────────
    if (!isValidOrigin(request.headers as unknown as Headers)) {
      logSecurityEvent({ event: "ORIGIN_REJECTED", ip, path });
      return secureError("Origin not allowed.", 403);
    }

    // ── Guard 2: Content-Type ─────────────────────────────────────────────────
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.includes("application/json")) {
      logSecurityEvent({ event: "INVALID_CONTENT_TYPE", ip, path, detail: contentType });
      return secureError("Invalid request format.", 415);
    }

    // ── Guard 3: Request size ─────────────────────────────────────────────────
    if (isOversizedRequest(request.headers as unknown as Headers)) {
      logSecurityEvent({ event: "OVERSIZED_PAYLOAD", ip, path });
      return secureError("Request payload too large.", 413);
    }

    // ── Guard 4: Rate limiting ────────────────────────────────────────────────
    const rateResult = contactRateLimiter.check(ip);
    if (rateResult.limited) {
      logSecurityEvent({ event: "RATE_LIMITED", ip, path });
      return NextResponse.json(
        { error: "Too many submissions. Please wait and try again." },
        {
          status: 429,
          headers: { "Retry-After": String(rateResult.retryAfter) },
        }
      );
    }

    // ── Parse body ────────────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return secureError("Invalid JSON payload.", 400);
    }

    // ── Guard 4.5: Cloudflare Turnstile Verification ──────────────────────────
    const turnstileToken = body.turnstileToken ? String(body.turnstileToken) : undefined;
    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isTurnstileValid) {
      logSecurityEvent({ event: "BOT_BLOCKED", ip, path, detail: "Invalid/missing Turnstile token" });
      return secureError("Security validation failed.", 400);
    }

    // ── Guard 5: Honeypot field ───────────────────────────────────────────────
    // Bots fill all fields — this hidden field must remain empty
    if (body.website_honey_contact && String(body.website_honey_contact).trim() !== "") {
      logSecurityEvent({ event: "HONEYPOT_TRIGGERED", ip, path });
      // Return 200 to confuse bots — don't reveal the trap
      return NextResponse.json({ success: true, referenceNumber: "INQ-00000" }, { status: 200 });
    }

    // ── Guard 6: Schema validation (includes SQLi + XSS detection) ────────────
    const validation = validateContactForm(body);
    if (!validation.success) {
      // Log if security patterns were detected
      if (validation.errors?._security) {
        logSecurityEvent({
          event: "XSS_DETECTED",
          ip,
          path,
          detail: "XSS or SQLi pattern in contact form",
        });
      }

      // Return user-facing field errors, never internal details
      const publicErrors = { ...validation.errors };
      delete publicErrors._security; // Strip internal security flag from response

      return NextResponse.json({ error: "Validation failed.", fields: publicErrors }, { status: 400 });
    }

    const data = validation.data!;

    // ── Success: Generate reference and log ───────────────────────────────────
    const referenceNumber = generateReference("INQ");

    logSecurityEvent({
      event: "FORM_SUBMISSION",
      ip,
      path,
      detail: `ref=${referenceNumber}`,
    });

    // TODO: Replace console.log with your CRM/email integration
    console.warn("=== NEW CONTACT INQUIRY ===");
    console.warn("Reference:", referenceNumber);
    console.warn("Name:", data.fullName);
    console.warn("Email:", data.emailAddress);
    console.warn("Subject:", data.subject);
    console.warn("Timestamp:", new Date().toISOString());
    console.warn("==========================");

    return NextResponse.json(
      {
        success: true,
        referenceNumber,
        message: "Your inquiry has been received. We will respond within 24 hours.",
      },
      { status: 200 }
    );

  } catch (err) {
    // Never expose error details to the client
    console.error("[CONTACT API ERROR]", err instanceof Error ? err.message : "Unknown error");
    logSecurityEvent({ event: "VALIDATION_FAILED", ip, path, detail: "Unhandled exception" });
    return secureError("An error occurred. Please try again later.", 500);
  }
}

// Block all other HTTP methods explicitly
export async function GET()    { return secureError("Method not allowed.", 405); }
export async function PUT()    { return secureError("Method not allowed.", 405); }
export async function DELETE() { return secureError("Method not allowed.", 405); }
export async function PATCH()  { return secureError("Method not allowed.", 405); }
