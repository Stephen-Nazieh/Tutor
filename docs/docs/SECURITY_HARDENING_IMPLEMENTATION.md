# Security Hardening: Production Security Requirements — Implementation Record

This document records the implementation of **Section 6** of FinalThings.md: Security Hardening (6.1 Critical Security, 6.2 Data Protection, 6.3 Access Control).

---

## 6.1 Critical Security Items

### CSRF Protection
- **Status:** Implemented
- **Description:** State-changing operations (POST, PUT, PATCH, DELETE) are protected with a double-submit cookie pattern.
- **Implementation:**
  - **`src/lib/security/csrf.ts`**
    - `getCsrfToken()` — generates a signed token, sets `tutorme_csrf` cookie (httpOnly, sameSite: lax), returns token.
    - `verifyCsrfToken(req)` — validates `X-CSRF-Token` header against the cookie using HMAC-SHA256 (NEXTAUTH_SECRET or CSRF_SECRET).
  - **`GET /api/csrf`** — returns `{ token }` and sets the CSRF cookie. Clients must send this token in the `X-CSRF-Token` header on state-changing requests.
  - **`src/lib/api/middleware.ts`**
    - `requireCsrf(req)` — returns 403 if method is state-changing and token invalid; skips for `/api/auth`, `/api/payments/webhooks`, `/api/csrf`, `/api/health`.
    - `withCsrf(handler)` — wrapper that runs CSRF check before the handler.
  - **Applied to:** `POST /api/payments/create`, `PUT /api/user/profile`, `POST /api/user/gdpr/delete`. Other routes can opt in with `withCsrf(withAuth(...))` or `requireCsrf(req)` at the start of the handler.

### XSS Prevention
- **Status:** Implemented (sanitization layer in place)
- **Description:** User-supplied content is sanitized before storage and display.
- **Implementation:**
  - **`src/lib/security/sanitize.ts`**
    - `sanitizeHtml(input)` — strips `<script>`, event handlers (`on*=`), and `javascript:` URLs.
    - `escapeHtml(input)` — escapes `& < > " ' /` for safe insertion into HTML.
    - `sanitizeForDisplay(input)` — runs sanitize then escape for legacy/raw HTML contexts.
  - **Usage:** Profile update (`PUT /api/user/profile`) sanitizes `bio` with `sanitizeHtml(bio)` before saving. React’s default escaping handles most UI; use these helpers for any raw HTML or user-generated rich text.

### SQL Injection Review
- **Status:** No code changes (marked complete in spec)
- **Note:** All data access uses Prisma (parameterized queries); no raw SQL added.

### Rate Limiting
- **Status:** Implemented
- **Description:** API abuse prevention by limiting requests per client IP per time window.
- **Implementation:**
  - **`src/lib/security/rate-limit.ts`**
    - In-memory store (Map) keyed by client IP; 1-minute window, configurable max (default 100 requests per window).
    - `checkRateLimit(key, max)` — returns `{ allowed, remaining, resetAt }`.
    - `getClientIdentifier(req)` — uses `x-forwarded-for` or `x-real-ip` or `"unknown"`.
  - **`src/middleware.ts`**
    - For paths starting with `/api` (excluding `/api/auth`, `/api/health`, `/api/payments/webhooks`), rate limit is applied per IP (100/min). Returns 429 with `Retry-After: 60` when exceeded.
  - **API handlers:** Optional `withRateLimit(req, max)` in `src/lib/api/middleware.ts` for stricter per-route limits.

### Payment webhook signature verification
- **Status:** Implemented
- **Description:** Payment provider webhooks (Hitpay, Airwallex) must be verified with HMAC before processing to prevent forged callbacks.
- **Implementation:**
  - **`POST /api/payments/webhooks/hitpay`** — Verifies signature (provider-specific HMAC) before updating payment/booking state. Invalid signature returns 400.
  - **`POST /api/payments/webhooks/airwallex`** — Verifies `x-signature` (HMAC-SHA256 of `x-timestamp` + raw body) before processing. Invalid signature returns 400.
- **Runbook:** When adding a new payment webhook route, always verify the provider’s signature using the documented method (and secret from env); do not process payloads without verification.

### Content Security Policy (CSP)
- **Status:** Implemented
- **Description:** CSP and related security headers applied to all responses.
- **Implementation:**
  - **`next.config.mjs`**
    - `Content-Security-Policy`: default-src 'self'; script/style/img/font/connect/frame/base-uri/form-action as specified (allows unsafe-inline for Next.js compatibility).
    - `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.
  - **`src/middleware.ts`**
    - Same security headers added to responses so they apply to middleware-handled routes.

---

## 6.2 Data Protection

### PII Encryption at Rest
- **Status:** Not implemented (infra/DB-level; can be added later with application-level encryption for specific fields or TDE at DB level).

### Audit Logging
- **Status:** Implemented
- **Description:** Track sensitive data access and actions for compliance.
- **Implementation:**
  - **`src/lib/security/audit.ts`**
    - `logAudit(userId, action, metadata)` — writes to existing `UserActivityLog` model (field `action`, `metadata` JSON). Fire-and-forget; does not throw.
    - `AUDIT_ACTIONS`: e.g. `audit_profile_view`, `audit_profile_update`, `audit_data_export`, `audit_data_delete`, `audit_payment_create`, `audit_payment_refund`, `audit_admin_access`, `audit_sensitive_access`.
  - **Usage:** GDPR export and delete handlers call `logAudit` with `audit_data_export` and `audit_data_delete`. Other routes (e.g. profile view, payment create) can call `logAudit` as needed.

### Data Retention
- **Status:** Implemented
- **Description:** Auto-delete old data per policy.
- **Implementation:**
  - **`scripts/data-retention.ts`**
    - Deletes `WebhookEvent` rows older than `WEBHOOK_RETENTION_DAYS` (default 90).
    - Deletes `UserActivityLog` rows older than `AUDIT_RETENTION_DAYS` (default 365).
    - Env vars: `WEBHOOK_RETENTION_DAYS`, `AUDIT_RETENTION_DAYS`.
  - **Run:** `npm run data-retention` or `npx tsx scripts/data-retention.ts`.

### GDPR Compliance
- **Status:** Implemented
- **Description:** Data export and account/data deletion (right to be forgotten).
- **Implementation:**
  - **`GET /api/user/gdpr/export`**
    - Requires auth. Returns JSON: user (id, email, role, timestamps), profile, linked accounts, clinic bookings, payments summary. Logs `audit_data_export`.
  - **`POST /api/user/gdpr/delete`**
    - Requires auth + CSRF. Body: `{ "confirm": true }`. Anonymizes user (email → `deleted-{id}@deleted.local`, clears password, image, emailVerified) and profile (name, bio, avatarUrl, dateOfBirth). Logs `audit_data_delete`. Does not delete the user row (referential integrity).

### Backup Encryption
- **Status:** Document/infra only (handled by backup strategy; not implemented in app code).

---

## 6.3 Access Control

### RBAC (Granular Permissions)
- **Status:** Implemented
- **Description:** Role-based permissions for admin and sensitive operations.
- **Implementation:**
  - **`src/lib/security/rbac.ts`**
    - `PERMISSIONS` constants: e.g. `admin:payments:read`, `admin:webhooks:read`, `admin:api_keys`, `admin:users:read`, `tutor:clinics`, `tutor:reports:read`, `student:own:read`, `student:book`.
    - `hasPermission(role, permission)` — returns whether the role has the permission.
    - `ROLE_PERMISSIONS` map: ADMIN has all listed permissions; TUTOR/STUDENT have subsets.
  - **`src/lib/api/middleware.ts`**
    - `requirePermission(session, permission)` — returns 403 JSON if the session’s role lacks the permission.
  - **Usage:** Admin payments and webhook-events routes require `ADMIN_VIEW_PAYMENTS` and `ADMIN_VIEW_WEBHOOKS`; API key admin routes require `ADMIN_MANAGE_API_KEYS`.

### API Key Management
- **Status:** Implemented
- **Description:** Secure third-party/server-to-server access via API keys.
- **Implementation:**
  - **Prisma:** `ApiKey` model — id, name, keyHash (SHA-256 of secret), createdById, createdAt, lastUsedAt. Migration: `prisma/migrations/20250216130000_add_api_key_security_event/migration.sql`.
  - **`src/lib/security/api-key.ts`**
    - `createApiKey(name, createdById?)` — generates `tm_`-prefixed secret, stores hash, returns `{ id, name, key }` (key shown once).
    - `verifyApiKey(bearerToken)` — validates token, updates lastUsedAt, returns `{ id }` or null.
    - `revokeApiKey(id)`, `listApiKeys(createdById?)` — list (no secrets).
  - **Routes:**
    - `GET /api/admin/api-keys` — list keys (ADMIN, IP whitelist, permission).
    - `POST /api/admin/api-keys` — create key; body `{ name }`; returns `{ id, name, key }` (ADMIN only).
    - `DELETE /api/admin/api-keys/[id]` — revoke key (ADMIN only).
  - **Middleware:** `getSessionOrApiKey(req)` in `src/lib/api/middleware.ts` supports auth via session or Bearer `tm_*` for future use.

### IP Whitelisting (Admin Panel)
- **Status:** Implemented
- **Description:** Restrict admin panel and admin API access by IP when configured.
- **Implementation:**
  - **`src/lib/security/admin-ip.ts`**
    - `ADMIN_IP_WHITELIST` env — comma-separated IPs or CIDRs (e.g. `1.2.3.4,10.0.0.0/8`).
    - `isAdminIpAllowed(clientIp)` — if whitelist is set, returns true only for listed IPs/CIDRs; if empty, all IPs allowed.
    - `getClientIp(req)` — from `x-forwarded-for` or `x-real-ip`.
  - **`requireAdminIp(req)`** in middleware — returns 403 if client IP not allowed.
  - **Usage:** All admin API routes (payments, webhook-events, api-keys) call `requireAdminIp(req)` at the start.

### Suspicious Activity Detection
- **Status:** Implemented
- **Description:** Log failed logins and support detection of brute-force attempts.
- **Implementation:**
  - **Prisma:** `SecurityEvent` model — eventType, ip, metadata, createdAt. Same migration as ApiKey.
  - **`src/lib/security/suspicious-activity.ts`**
    - `logFailedLogin(ip, identifier?)` — creates SecurityEvent with `eventType: 'auth_failed'`; identifier (e.g. email) stored as hashed in metadata.
    - `isSuspiciousIp(ip)` — returns true if IP has ≥5 failed logins in the last 15 minutes (configurable in code).
  - **`src/lib/auth.ts`** — on invalid password in credentials provider, calls `logFailedLogin(null, credentials.email)`. (IP can be added later if request is available in auth flow.)
  - **Alerting:** Threshold and window are in code; integration with an alerting system (e.g. cron job calling `isSuspiciousIp` and sending notifications) can be added separately.

---

## Files Created or Modified

| Area        | Files |
|------------|--------|
| CSRF        | `src/lib/security/csrf.ts`, `src/app/api/csrf/route.ts` |
| XSS         | `src/lib/security/sanitize.ts` |
| Rate limit  | `src/lib/security/rate-limit.ts` |
| CSP/headers | `next.config.mjs`, `src/middleware.ts` |
| Audit       | `src/lib/security/audit.ts` |
| GDPR        | `src/app/api/user/gdpr/export/route.ts`, `src/app/api/user/gdpr/delete/route.ts` |
| Retention   | `scripts/data-retention.ts`, `package.json` (script) |
| RBAC        | `src/lib/security/rbac.ts` |
| API keys    | `src/lib/security/api-key.ts`, `src/app/api/admin/api-keys/route.ts`, `src/app/api/admin/api-keys/[id]/route.ts` |
| Admin IP    | `src/lib/security/admin-ip.ts` |
| Suspicious  | `src/lib/security/suspicious-activity.ts`, `prisma/schema.prisma` (ApiKey, SecurityEvent), migration |
| Middleware  | `src/lib/api/middleware.ts` (requireCsrf, withCsrf, withRateLimit, requirePermission, requireAdminIp, getSessionOrApiKey) |
| Auth        | `src/lib/auth.ts` (failed login logging) |
| Profile     | `src/app/api/user/profile/route.ts` (CSRF + sanitize bio) |
| Payments    | `src/app/api/payments/create/route.ts` (withCsrf) |
| Admin       | `src/app/api/admin/payments/route.ts`, `src/app/api/admin/webhook-events/route.ts` (RBAC + IP whitelist) |

---

## Environment Variables

| Variable                 | Purpose |
|--------------------------|--------|
| `NEXTAUTH_SECRET`        | Used for CSRF signing if `CSRF_SECRET` not set |
| `CSRF_SECRET`            | Optional; separate secret for CSRF token signing |
| `ADMIN_IP_WHITELIST`     | Optional; comma-separated IPs/CIDRs for admin access |
| `WEBHOOK_RETENTION_DAYS` | Optional; default 90 for data-retention script |
| `AUDIT_RETENTION_DAYS`   | Optional; default 365 for data-retention script |

---

## Operational Notes

1. **CSRF:** Frontends must call `GET /api/csrf` and send the returned token in `X-CSRF-Token` for all state-changing requests to protected routes.
2. **Rate limit:** Middleware uses in-memory store; in multi-instance deployments consider a shared store (e.g. Redis) for consistent limits.
3. **Migrations:** Run `npx prisma migrate dev` (or apply the migration SQL) to create `ApiKey` and `SecurityEvent` tables.
4. **Data retention:** Schedule `npm run data-retention` (e.g. daily cron) for production.
