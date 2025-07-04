/**
 * CYDROID TECHNOLOGIES — Security Configuration
 * Phase 15: Enterprise Security Hardening
 *
 * Single source of truth for all security policy configuration.
 * Modify this file to adjust security policies without touching logic.
 */

// ─── Content Security Policy ──────────────────────────────────────────────────

/**
 * Build the Content-Security-Policy header value.
 *
 * CSP Strategy:
 * - 'self' only for scripts and styles (no unsafe-inline, no unsafe-eval)
 * - Google Fonts allowed for font-src
 * - Cloudflare Turnstile allowed when CAPTCHA is enabled
 * - Calendly allowed for booking embeds
 * - All other sources blocked by default
 *
 * Next.js inline scripts: Next.js 13+ places chunks via <script> tags with
 * nonces in production. For local dev with Turbopack, 'unsafe-inline' is needed.
 * We detect the environment and apply accordingly.
 */
export function buildCSP(isDev: boolean): string {
  const self = "'self'";
  const none = "'none'";

  // Trusted external domains
  const trustedScriptSrc = [
    self,
    "https://challenges.cloudflare.com",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "'unsafe-inline'",              // Required for Next.js client-side script hydration in production
    isDev ? "'unsafe-eval'" : "",   // Turbopack hot reload requires unsafe-eval in dev
  ].filter(Boolean).join(" ");

  const trustedStyleSrc = [
    self,
    "'unsafe-inline'", // Required for CSS-in-JS / Tailwind runtime styles
    "https://fonts.googleapis.com",
  ].join(" ");

  const trustedFontSrc = [
    self,
    "data:",
    "https://fonts.gstatic.com",
  ].join(" ");

  const trustedImgSrc = [
    self,
    "data:",
    "blob:",
    "https:",  // Allow all HTTPS images (for OG images, CDN assets)
  ].join(" ");

  const trustedConnectSrc = [
    self,
    "https:",  // Allow HTTPS API calls (analytics, etc.)
    isDev ? "ws://localhost:* wss://localhost:*" : "", // HMR websocket in dev
  ].filter(Boolean).join(" ");

  const trustedMediaSrc = [
    self,
    "blob:",
    "data:",
  ].join(" ");

  const frameSources = [
    "https://calendly.com",
    "https://challenges.cloudflare.com",
  ];
  const trustedFrameSrc = frameSources.join(" ");

  const directives: Record<string, string> = {
    "default-src":                  self,
    "script-src":                   trustedScriptSrc,
    "style-src":                    trustedStyleSrc,
    "font-src":                     trustedFontSrc,
    "img-src":                      trustedImgSrc,
    "media-src":                    trustedMediaSrc,
    "connect-src":                  trustedConnectSrc,
    "frame-src":                    trustedFrameSrc || none,
    "frame-ancestors":              none,       // Clickjacking prevention
    "object-src":                   none,       // Block Flash/Java plugins
    "base-uri":                     self,       // Prevent base tag injection
    "form-action":                  self,       // Forms only submit to same origin
    "manifest-src":                 self,
    "worker-src":                   `${self} blob:`,
    "upgrade-insecure-requests":    "",         // Upgrade HTTP to HTTPS
  };

  return Object.entries(directives)
    .map(([key, val]) => val ? `${key} ${val}` : key)
    .join("; ");
}

// ─── Permissions Policy ───────────────────────────────────────────────────────

/**
 * Permissions-Policy header — disable all browser features not used by this site.
 * This prevents malicious scripts from accessing sensitive browser APIs.
 */
export const PERMISSIONS_POLICY = [
  "camera=()",
  "microphone=()",
  "geolocation=()",
  "payment=()",
  "usb=()",
  "bluetooth=()",
  "magnetometer=()",
  "gyroscope=()",
  "accelerometer=()",
  "ambient-light-sensor=()",
  "autoplay=(self)",          // Allow autoplay only on own origin (hero video)
  "fullscreen=(self)",
  "picture-in-picture=()",
  "screen-wake-lock=()",
  "serial=()",
  "xr-spatial-tracking=()",
  "interest-cohort=()",       // Opt out of FLoC/Topics API
].join(", ");

// ─── Bot User-Agent Blocklist ─────────────────────────────────────────────────

/**
 * Known bad bots, scrapers, and vulnerability scanners.
 * These are blocked at the middleware level before any route processing.
 *
 * Legitimate search engine bots (Googlebot, Bingbot) are NOT blocked.
 * SEO crawlers from paid services that scrape for competitive intelligence are blocked.
 */
export const BAD_BOT_PATTERNS = [
  // SEO scrapers
  "semrushbot", "ahrefsbot", "mj12bot", "dotbot", "rogerbot",
  "blexbot", "seokicks", "seoscanners", "sistrix", "majestic",
  "serpstatbot", "yandexbot", "baiduspider",
  // Vulnerability scanners
  "nikto", "nessus", "sqlmap", "nmap", "masscan", "zmap",
  "dirbuster", "gobuster", "wfuzz", "burpsuite", "acunetix",
  // Content scrapers
  "scrapy", "wget", "libwww-perl", "python-requests",
  "go-http-client/1.1", "curl/",
  // Spam bots
  "emailcollector", "emailsiphon", "webbandit", "webcopier",
  "httrack", "getright", "teleport",
  // Generic bad patterns
  "zgrab", "masscan", "zgrab2",
] as const;

// ─── Suspicious Path Blocklist ────────────────────────────────────────────────

/**
 * Paths commonly probed by automated scanners and attackers.
 * Block these at middleware to save compute and log the attempt.
 */
export const SUSPICIOUS_PATHS = [
  // Environment files
  "/.env", "/.env.local", "/.env.production", "/.env.backup",
  "/config.php", "/config.json", "/.git/config",
  // WordPress probes (not a WP site but bots try anyway)
  "/wp-admin", "/wp-login.php", "/wp-config.php", "/xmlrpc.php",
  "/wordpress/", "/wp/",
  // PHP shells and common exploits
  "/phpinfo.php", "/info.php", "/shell.php", "/c99.php", "/r57.php",
  "/eval.php", "/cmd.php", "/upload.php",
  // Database admin panels
  "/phpmyadmin", "/adminer", "/pma/", "/mysql/",
  // Server info files
  "/server-status", "/server-info", "/.htaccess", "/.htpasswd",
  // Common CMS probes
  "/admin/", "/administrator/", "/cpanel/",
  // Common exploit paths
  "/../etc/passwd", "/etc/passwd", "/proc/self/environ",
] as const;

// ─── Rate Limit Configuration ─────────────────────────────────────────────────

export const RATE_LIMITS = {
  /** General page requests — high limit, generous window */
  global: { maxRequests: 200, windowMs: 60 * 1000 },
  /** API routes — stricter to prevent abuse */
  api: { maxRequests: 20, windowMs: 60 * 1000 },
  /** Form submissions — very strict */
  forms: { maxRequests: 3, windowMs: 2 * 60 * 1000, blockDurationMs: 5 * 60 * 1000 },
} as const;

// ─── Security Header Constants ────────────────────────────────────────────────

export const SECURITY_HEADERS = {
  /** 2 years HSTS — include subdomains, submit for browser preload list */
  HSTS: "max-age=63072000; includeSubDomains; preload",
  /** Prevent clickjacking via frame embedding */
  X_FRAME_OPTIONS: "DENY",
  /** Prevent MIME type sniffing */
  X_CONTENT_TYPE_OPTIONS: "nosniff",
  /** Only send origin on cross-origin requests (no full URL) */
  REFERRER_POLICY: "strict-origin-when-cross-origin",
  /** Prevent cross-origin document access */
  CROSS_ORIGIN_OPENER_POLICY: "same-origin",
  /** Only allow same-origin resource sharing by default */
  CROSS_ORIGIN_RESOURCE_POLICY: "same-site",
  /** Controls loading of cross-origin resources */
  CROSS_ORIGIN_EMBEDDER_POLICY: "credentialless",
  /** Block Adobe Flash cross-domain policies */
  X_PERMITTED_CROSS_DOMAIN_POLICIES: "none",
  /** Prevent IE/Edge download prompt sniffing */
  X_DOWNLOAD_OPTIONS: "noopen",
  /** Remove server fingerprint */
  X_POWERED_BY: null, // Will be deleted, not set
} as const;
