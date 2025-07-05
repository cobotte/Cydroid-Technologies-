/**
 * CYDROID TECHNOLOGIES — Validation & Sanitisation Utilities
 * Phase 15: Enterprise Security Hardening
 *
 * All user-controlled input MUST pass through these functions before use.
 *
 * Contents:
 *  1. sanitizeInput()        — Strip XSS vectors, null bytes, control chars
 *  2. validateEmail()        — RFC-compliant email check
 *  3. validatePhone()        — International phone format
 *  4. validateLength()       — Min/max character bounds
 *  5. detectSQLi()           — SQL injection pattern detection
 *  6. detectXSS()            — Script injection pattern detection
 *  7. validateContactForm()  — Full contact form schema
 *  8. validateBookDemoForm() — Full book-demo form schema
 */

export interface ValidationResult<T = Record<string, string>> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

// ─── 1. Input Sanitisation ─────────────────────────────────────────────────────

const MAX_INPUT_LENGTH = 2000;

/**
 * Sanitises arbitrary string input:
 * - Strips null bytes (used in injection attacks)
 * - Strips ASCII control characters (0x00–0x1F except tab/newline)
 * - HTML-encodes the 6 most dangerous HTML characters
 * - Trims leading/trailing whitespace
 * - Enforces maximum length
 *
 * Use on ALL string inputs from requests before further processing.
 */
export function sanitizeInput(input: unknown, maxLength = MAX_INPUT_LENGTH): string {
  if (input === null || input === undefined) return "";
  const str = String(input);

  return str
    .slice(0, maxLength)                        // Length limit first
    .replace(/\x00/g, "")                       // Strip null bytes
    .replace(/[\x01-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "") // Strip control chars (keep \t \n \r)
    .replace(/&/g, "&amp;")                     // HTML entity encoding
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

// ─── 2. Email Validation ───────────────────────────────────────────────────────

/**
 * Validates email addresses with a strict pattern:
 * - No leading/trailing dots in local part
 * - No consecutive dots
 * - Max 254 chars (RFC 5321)
 * - At least one dot in domain
 * - No spaces anywhere
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false;

  // RFC 5321 / HTML5 email pattern — stricter than most
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) return false;

  // Additional checks
  const [local, domain] = email.split("@");
  if (!local || !domain) return false;
  if (local.startsWith(".") || local.endsWith(".")) return false;
  if (local.includes("..")) return false;
  if (domain.startsWith(".") || domain.endsWith(".")) return false;

  return true;
}

// ─── 3. Phone Validation ──────────────────────────────────────────────────────

/**
 * Validates international phone numbers:
 * - 7 to 20 digits
 * - Allows: +, spaces, hyphens, dots, parentheses
 * - Requires at least 7 actual digits
 */
export function validatePhone(phone: string): boolean {
  if (!phone || typeof phone !== "string") return false;
  if (phone.length > 25) return false;

  // Must contain at least 7 digits
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 20) return false;

  // Only allowed characters
  const phoneRegex = /^[+\d\s().\-]{7,25}$/;
  return phoneRegex.test(phone);
}

// ─── 4. Length Validation ─────────────────────────────────────────────────────

export function validateLength(
  value: string,
  { min = 0, max = MAX_INPUT_LENGTH, fieldName = "Field" }: { min?: number; max?: number; fieldName?: string }
): string | null {
  if (value.length < min) return `${fieldName} must be at least ${min} characters.`;
  if (value.length > max) return `${fieldName} must be at most ${max} characters.`;
  return null;
}

// ─── 5. SQL Injection Detection ──────────────────────────────────────────────

/**
 * Detects common SQL injection patterns in user input.
 * This is a defence-in-depth layer — not a replacement for parameterised queries.
 *
 * Returns true if SQL injection patterns are detected (should BLOCK).
 */
export function detectSQLi(input: string): boolean {
  if (!input) return false;

  const sqlPatterns = [
    /(\b)(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|TRUNCATE|REPLACE)(\b)/i,
    /--\s*$/m,                    // SQL comment at end of line
    /;\s*(SELECT|INSERT|DROP)/i,  // Stacked queries
    /'\s*OR\s*'?\d/i,             // Classic OR injection
    /'\s*OR\s*1\s*=\s*1/i,       // OR 1=1
    /SLEEP\(\d+\)/i,              // Time-based blind SQLi
    /BENCHMARK\(\d+/i,            // MySQL benchmark attack
    /WAITFOR\s+DELAY/i,           // MSSQL time-based blind
    /xp_cmdshell/i,               // MSSQL command execution
    /LOAD_FILE\s*\(/i,            // MySQL file read
    /INTO\s+OUTFILE/i,            // MySQL file write
  ];

  return sqlPatterns.some((pattern) => pattern.test(input));
}

// ─── 6. XSS Detection ────────────────────────────────────────────────────────

/**
 * Detects common Cross-Site Scripting patterns in user input.
 * This is defence-in-depth — sanitizeInput() already HTML-encodes,
 * but this catches attempts before encoding.
 *
 * Returns true if XSS patterns are detected (should BLOCK).
 */
export function detectXSS(input: string): boolean {
  if (!input) return false;

  const xssPatterns = [
    /<script[\s>]/i,                     // <script> tags
    /<\/script>/i,                       // </script>
    /javascript\s*:/i,                   // javascript: protocol
    /on\w+\s*=/i,                        // onload= onclick= etc.
    /<iframe/i,                          // iframe injection
    /<object/i,                          // object tag
    /<embed/i,                           // embed tag
    /<img[^>]+src\s*=\s*["']?\s*javascript/i, // img src javascript:
    /eval\s*\(/i,                        // eval()
    /document\.(cookie|location|write)/i,// DOM manipulation
    /window\.(location|open|alert)/i,    // window manipulation
    /\.innerHTML\s*=/i,                  // innerHTML assignment
    /fromCharCode\s*\(/i,                // String.fromCharCode obfuscation
    /&#\d+;/,                            // HTML decimal entities in input
    /&#x[0-9a-f]+;/i,                   // HTML hex entities in input
    /vbscript\s*:/i,                     // VBScript protocol
    /data\s*:\s*text\/html/i,           // data: URI with HTML
  ];

  return xssPatterns.some((pattern) => pattern.test(input));
}

// ─── 7. Contact Form Schema Validation ────────────────────────────────────────

interface ContactFormData {
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  subject: string;
  message: string;
  contactMethod: string;
}

export function validateContactForm(body: Record<string, unknown>): ValidationResult<ContactFormData> {
  const errors: Record<string, string> = {};

  // Sanitise all string fields
  const fullName      = sanitizeInput(body.fullName);
  const companyName   = sanitizeInput(body.companyName);
  const emailAddress  = sanitizeInput(body.emailAddress);
  const phoneNumber   = sanitizeInput(body.phoneNumber);
  const subject       = sanitizeInput(body.subject ?? body.projectType);
  const message       = sanitizeInput(body.message, 2000);
  const contactMethod = sanitizeInput(body.contactMethod);

  // Required field checks
  if (!fullName)     errors.fullName = "Full name is required.";
  if (!emailAddress) errors.emailAddress = "Email address is required.";
  if (!phoneNumber)  errors.phoneNumber = "Phone number is required.";
  if (!subject)      errors.subject = "Subject is required.";
  if (!message)      errors.message = "Message is required.";

  // Length validation
  const nameLenErr = fullName ? validateLength(fullName, { max: 100, fieldName: "Full name" }) : null;
  if (nameLenErr) errors.fullName = nameLenErr;

  const msgLenErr = message ? validateLength(message, { min: 10, max: 2000, fieldName: "Message" }) : null;
  if (msgLenErr) errors.message = msgLenErr;

  // Format validation
  if (emailAddress && !validateEmail(emailAddress)) {
    errors.emailAddress = "Invalid email format.";
  }
  if (phoneNumber && !validatePhone(phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format (min 7 digits).";
  }

  // Injection detection — check raw input BEFORE sanitisation
  const rawFields = [
    String(body.fullName ?? ""),
    String(body.message ?? ""),
    String(body.subject ?? ""),
  ];
  for (const raw of rawFields) {
    if (detectSQLi(raw)) {
      errors._security = "Invalid input detected.";
      break;
    }
    if (detectXSS(raw)) {
      errors._security = "Invalid input detected.";
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: { fullName, companyName, emailAddress, phoneNumber, subject, message, contactMethod },
  };
}

// ─── 8. Book Demo Form Schema Validation ──────────────────────────────────────

interface BookDemoFormData {
  fullName: string;
  companyName: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  projectTypes: string[];
  projectDescription: string;
  budgetRange: string;
  timeline: string;
  meetingPreference: string;
}

export function validateBookDemoForm(body: Record<string, unknown>): ValidationResult<BookDemoFormData> {
  const errors: Record<string, string> = {};

  // Sanitise all string fields
  const fullName           = sanitizeInput(body.fullName);
  const companyName        = sanitizeInput(body.companyName);
  const emailAddress       = sanitizeInput(body.emailAddress);
  const phoneNumber        = sanitizeInput(body.phoneNumber);
  const country            = sanitizeInput(body.country);
  const projectDescription = sanitizeInput(body.projectDescription, 2000);
  const budgetRange        = sanitizeInput(body.budgetRange);
  const timeline           = sanitizeInput(body.timeline);
  const meetingPreference  = sanitizeInput(body.meetingPreference);

  // Validate projectTypes array
  let projectTypes: string[] = [];
  if (Array.isArray(body.projectTypes)) {
    if (body.projectTypes.length > 10) {
      errors.projectTypes = "Too many project types selected.";
    } else {
      projectTypes = body.projectTypes
        .slice(0, 10)
        .map((t) => sanitizeInput(String(t), 50))
        .filter(Boolean);
    }
  }

  // Required field checks
  if (!fullName)     errors.fullName = "Full name is required.";
  if (!emailAddress) errors.emailAddress = "Email address is required.";
  if (!phoneNumber)  errors.phoneNumber = "Phone number is required.";

  // Length validation
  const nameLenErr = fullName ? validateLength(fullName, { max: 100, fieldName: "Full name" }) : null;
  if (nameLenErr) errors.fullName = nameLenErr;

  const descLenErr = projectDescription
    ? validateLength(projectDescription, { max: 2000, fieldName: "Project description" })
    : null;
  if (descLenErr) errors.projectDescription = descLenErr;

  // Format validation
  if (emailAddress && !validateEmail(emailAddress)) {
    errors.emailAddress = "Invalid email format.";
  }
  if (phoneNumber && !validatePhone(phoneNumber)) {
    errors.phoneNumber = "Invalid phone number format (min 7 digits).";
  }

  // Injection detection
  const rawFields = [
    String(body.fullName ?? ""),
    String(body.projectDescription ?? ""),
    String(body.companyName ?? ""),
  ];
  for (const raw of rawFields) {
    if (detectSQLi(raw) || detectXSS(raw)) {
      errors._security = "Invalid input detected.";
      break;
    }
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      fullName, companyName, emailAddress, phoneNumber, country,
      projectTypes, projectDescription, budgetRange, timeline, meetingPreference,
    },
  };
}
