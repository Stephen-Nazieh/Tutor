/**
 * Build a strict Content-Security-Policy.
 *
 * CSP Directive Explanations:
 * - default-src 'self': Default to same-origin for all resource types
 * - script-src: Allows scripts from self, inline (nonce-based in future), and eval for Next.js
 * - style-src 'self' 'unsafe-inline': Allows inline styles (required by many UI libraries)
 * - img-src: Allows images from self, data URIs, blobs, and HTTPS
 * - font-src: Allows fonts from self and data URIs
 * - connect-src: Allows connections to self, HTTPS APIs, and WebSocket
 * - frame-src 'self': Allows framing of same-origin content only
 * - frame-ancestors 'self': Prevents clickjacking by only allowing same-origin framing
 * - base-uri 'self': Restricts base tag to same-origin
 * - form-action 'self': Restricts form submissions to same-origin
 * - object-src 'none': Disables Flash and other plugins
 *
 * TODO: Implement nonce-based CSP for inline scripts to remove 'unsafe-inline'
 * This requires generating nonces in middleware and passing to _document.tsx
 */
export function getCspHeader(): string {
  const isDev = process.env.NODE_ENV !== 'production'

  const directives = [
    "default-src 'self'",
    // In production: remove 'unsafe-eval' once verified Next.js doesn't need it
    // Next.js 16 with App Router requires 'unsafe-eval' for some dynamic imports
    isDev ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'" : "script-src 'self' 'unsafe-inline'",
    // 'unsafe-inline' for styles is acceptable and widely used
    // Removing it would require hashing all inline styles which is impractical
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-src 'self' https://*.daily.co https://*.dailyhq.com",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
    // Report violations to help identify issues
    'report-uri /api/csp-report',
  ]

  if (!isDev) {
    directives.push('upgrade-insecure-requests')
  }

  return directives.join('; ')
}
