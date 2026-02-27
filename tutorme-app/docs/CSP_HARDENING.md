# CSP (Content Security Policy) hardening plan

## Current state

- **Middleware** (`src/middleware.ts`) and **next.config.mjs** set a strict CSP with:
  - `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
  - `style-src 'self' 'unsafe-inline'`
  - Other directives for img, font, connect, frame, etc.

- **Why `unsafe-inline` / `unsafe-eval`:** Next.js (and many React/Next setups) require them for dev and for some production builds unless script nonces or hashes are used. Removing them without a nonce/hash strategy will break the app.

## Hardening steps (when feasible)

1. **Nonces**
   - Next.js can inject a nonce per request (see [Next.js CSP with nonce](https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy)).
   - In middleware or a layout, set `script-src 'self' 'nonce-{random}'` and pass the same nonce to the document so inline scripts and Next’s chunks can run.
   - Ensure all inline `<script>` tags and style attributes that must run receive the nonce (or move to external assets).

2. **Hashes**
   - Alternatively, compute hashes of allowed inline scripts and use `script-src 'self' 'sha256-...'`. This is brittle when inline script content changes.

3. **Avoid `unsafe-eval`**
   - Remove `unsafe-eval` once no runtime code relies on `eval()` or `new Function()`. Some dev tooling or legacy libs may require it; audit and replace or isolate.

4. **Tighten `connect-src`**
   - Currently `connect-src 'self' https: wss:`. For production, consider listing exact API and WebSocket origins instead of `https:`/`wss:` if possible.

## References

- Middleware CSP builder: `src/middleware.ts` → `getCspHeader()`
- next.config.mjs also sets CSP headers for `/:path*`
- Keep middleware and config in sync when changing CSP.
