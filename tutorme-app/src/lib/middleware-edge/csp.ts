/**
 * Build a strict Content-Security-Policy.
 * Next.js requires 'unsafe-inline' and 'unsafe-eval' for script in dev/prod with current setup;
 * use nonces in future for stricter script-src.
 * @see docs/CSP_HARDENING.md for hardening steps and nonce/hash migration plan.
 */
export function getCspHeader(): string {
  const directives = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "connect-src 'self' https: wss:",
    "frame-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ]
  if (process.env.NODE_ENV === 'production') {
    directives.push('upgrade-insecure-requests')
  }
  return directives.join('; ')
}
