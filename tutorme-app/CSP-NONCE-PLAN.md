# CSP Nonce Plan (script-src)

## Current state

- **script-src** in middleware and `next.config.mjs` uses `'unsafe-inline'` and `'unsafe-eval'` so Next.js and common tooling work without changes.
- Comment in `src/middleware.ts` notes: “use nonces in future for stricter script-src”.

## Goal

Remove `'unsafe-inline'` (and ideally `'unsafe-eval'`) from **script-src** by using **nonces**: only scripts that carry the current request’s nonce are allowed to run.

## Steps (implementation plan)

1. **Generate nonce in middleware**
   - In `src/middleware.ts`, for each request generate a cryptographically random nonce (e.g. `crypto.randomBytes(16).toString('base64')`).
   - Set a response header the app can read, e.g. `X-CSP-Nonce: <nonce>` (or use a request header/closure passed to the app).
   - Set **Content-Security-Policy** with `script-src 'self' 'nonce-<nonce>'` (no `'unsafe-inline'` / `'unsafe-eval'`).

2. **Inject nonce into Next.js scripts**
   - Next.js 13+ App Router does not expose a single global “inject nonce here” hook. Options:
     - **Option A (recommended):** Use Next.js `experimental.serverComponentsExternalPackages` and any built-in nonce support if available in your Next.js version (see Next.js CSP docs).
     - **Option B:** Use a custom `Document` or root layout that reads the nonce from headers (e.g. via middleware-set header or from a request-scoped store) and injects it into `<Script>` or inline script tags.
     - **Option C:** Use `next/script` with `strategy="beforeInteractive"` and pass nonce from a header (e.g. in layout: read `headers().get('x-csp-nonce')` and set on `<Script nonce={nonce}>`). Ensure every inline or third-party script that must run gets the same nonce.

3. **Ensure all inline scripts get the nonce**
   - Audit pages and components for inline `<script>` or `dangerouslySetInnerHTML` with script. Add `nonce={nonce}` to those elements.
   - Third-party scripts (analytics, etc.): if they inject inline scripts, they must receive the nonce (many SDKs accept a nonce option).

4. **Remove unsafe directives**
   - Once nonce is applied to all required scripts, remove `'unsafe-inline'` and `'unsafe-eval'` from **script-src** in middleware (and in `next.config.mjs` if duplicated).
   - Re-test login, dashboard, and any page that uses scripts or WebSockets.

5. **Testing**
   - Run E2E and critical flows; confirm no CSP violations in browser console.
   - Use report-only mode first: set **Content-Security-Policy-Report-Only** with the strict policy and fix violations before switching to enforcing.

## References

- [Next.js Security Headers](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)
- [MDN CSP script-src](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
- Middleware: `src/middleware.ts` (getCspHeader, addSecurityHeaders)
