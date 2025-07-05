# CyDroid Technologies — Security Architecture

> Enterprise-grade defence-in-depth implementation  
> OWASP Top 10 compliant · Cloudflare WAF · Next.js Edge Middleware

---

## Security Layers Overview

```
Incoming Request
      │
      ▼
[Cloudflare Edge]
  ├─ DDoS Protection (automatic)
  ├─ Bot Fight Mode
  ├─ WAF Managed Rules (OWASP CRS)
  ├─ Custom Firewall Rules
  └─ Rate Limiting Rules
      │
      ▼
[Next.js Middleware — src/middleware.ts]
  ├─ Suspicious path block (25+ scanner paths)
  ├─ Bot UA filter (30+ bad bots)
  ├─ IP-based rate limiting (200/min pages, 20/min API)
  └─ Full security header injection
      │
      ▼
[API Route Handlers]
  ├─ Content-Type validation
  ├─ Request size guard (max 16KB)
  ├─ Per-form rate limiting (3/2min, 5-min block)
  ├─ Honeypot trap
  ├─ SQLi detection (11 patterns)
  ├─ XSS detection (17 patterns)
  ├─ Schema validation + sanitisation
  └─ Structured security logging
```

---

## Security Headers Implemented

| Header | Value | Purpose |
|---|---|---|
| `Content-Security-Policy` | Strict allowlist | XSS prevention |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HTTPS enforcement |
| `X-Frame-Options` | `DENY` | Clickjacking prevention |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing prevention |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage control |
| `Permissions-Policy` | All sensitive APIs disabled | Browser API restriction |
| `Cross-Origin-Opener-Policy` | `same-origin` | Cross-origin access control |
| `Cross-Origin-Resource-Policy` | `same-site` | Resource sharing control |
| `X-Permitted-Cross-Domain-Policies` | `none` | Flash/Silverlight block |
| `X-Download-Options` | `noopen` | IE download exploit block |

---

## Cloudflare Setup Guide

### 1. Enable Cloudflare Proxy
1. Add `cydroidtech.com` to Cloudflare (Free plan minimum)
2. Set DNS records to **Proxied** (orange cloud)
3. Set SSL/TLS to **Full (Strict)**
4. Enable **Always Use HTTPS**
5. Enable **HSTS** in SSL/TLS → Edge Certificates

### 2. Bot Fight Mode
`Security → Bots → Bot Fight Mode → ON`

### 3. DDoS Protection
`Security → DDoS → HTTP DDoS attack protection → Override`
- Sensitivity Level: **High**
- Action: **Managed Challenge**

### 4. WAF — Enable Managed Rulesets
`Security → WAF → Managed Rules`
- **Cloudflare Managed Ruleset** → ON
- **Cloudflare OWASP Core Ruleset** → ON
- **Cloudflare Exposed Credentials Check** → ON
- OWASP paranoia level: **PL2**

### 5. Custom WAF Rules
**Block scanner user agents:**
```
(http.user_agent contains "sqlmap") or (http.user_agent contains "nikto") or
(http.user_agent contains "nessus") or (http.user_agent contains "masscan")
→ Block
```
**Block sensitive path probes:**
```
(http.request.uri.path contains "/.env") or (http.request.uri.path contains "/wp-admin") or
(http.request.uri.path contains "/phpinfo") or (http.request.uri.path contains "/.git/")
→ Block
```

### 6. Rate Limiting Rules

**API endpoint protection:**
- Expression: `http.request.uri.path starts_with "/api/"`
- Threshold: 20 requests / 60 seconds → Block for 300 seconds

**Form submission protection:**
- Expression: `http.request.uri.path in {"/api/contact" "/api/book-demo"}`
- Threshold: 5 requests / 120 seconds → Block for 600 seconds

### 7. Cloudflare Turnstile CAPTCHA

1. Dashboard → Turnstile → Add Site → select **Managed** widget
2. Copy **Site Key** (public) and **Secret Key** (private)
3. Add to `.env.local`:
   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4AAAAAAA...
   CLOUDFLARE_TURNSTILE_SECRET_KEY=0x4AAAAAAA...
   ```

---

## Security Checklist

### Application ✅ (All Implemented)
- [x] Content-Security-Policy
- [x] HSTS with preload
- [x] X-Frame-Options: DENY
- [x] X-Content-Type-Options: nosniff
- [x] Referrer-Policy
- [x] Permissions-Policy (all unused APIs off)
- [x] Cross-Origin-Opener/Resource-Policy
- [x] X-Powered-By removed
- [x] Input sanitisation (null bytes, control chars, HTML encoding)
- [x] SQL injection detection (11 patterns)
- [x] XSS detection (17 patterns)
- [x] Field length limits
- [x] Honeypot fields
- [x] Rate limiting (3 tiers)
- [x] HTTP method restrictions (405)
- [x] Content-Type validation (415)
- [x] Request size limit (413 on >16KB)
- [x] Secure error responses
- [x] Security event logging

### Infrastructure (Configure After Deployment)
- [ ] Cloudflare proxy enabled on `cydroidtech.com`
- [ ] SSL/TLS Full Strict
- [ ] Always Use HTTPS
- [ ] Bot Fight Mode ON
- [ ] WAF OWASP CRS enabled
- [ ] Custom WAF rules active
- [ ] CDN Rate Limiting rules active
- [ ] Production env vars set on host
- [ ] `.env.local` not in git

---

## Security Event Reference

| Event | Trigger |
|---|---|
| `RATE_LIMITED` | IP exceeded threshold |
| `BOT_BLOCKED` | Known bad bot UA |
| `HONEYPOT_TRIGGERED` | Hidden field filled |
| `OVERSIZED_PAYLOAD` | Request > 16KB |
| `INVALID_CONTENT_TYPE` | Non-JSON API request |
| `SQLI_DETECTED` | SQL injection pattern |
| `XSS_DETECTED` | Script injection pattern |
| `SUSPICIOUS_PATH` | Scanner bait path |
| `FORM_SUBMISSION` | Successful submission |

---

## Reporting a Vulnerability

If you discover a security vulnerability in CyDroid Technologies systems, please report it responsibly:

- 📧 **Email**: [security@cydroidtech.com](mailto:security@cydroidtech.com)
- 🔒 **Subject**: `[SECURITY] <Brief Description>`
- ⏱ We aim to respond within **48 hours** and resolve critical issues within **7 days**

Please do **not** open public GitHub issues for security vulnerabilities.

---

## Future Enhancements

1. **Resend email** — Replace `console.log` in API routes with `resend.emails.send()`
2. **Cloudflare Turnstile** — Activate CAPTCHA on all public forms
3. **Upstash Redis** — Distributed rate limiting for multi-region deployments
4. **NextAuth.js** — Secure admin panel authentication
5. **CSP nonces** — Remove `unsafe-inline` from styles in production

---

*CyDroid Technologies © 2025 — All Rights Reserved*
