/**
 * Next.js Middleware
 * Security: rate limiting, headers. Auth: protects routes and onboarding.
 */

import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { checkRateLimit, checkRateLimitPreset, getClientIdentifier } from '@/lib/security/rate-limit'

const API_RATE_LIMIT_MAX = 100 // per minute per IP
const RATE_LIMIT_SKIP = ['/api/auth', '/api/health', '/api/payments/webhooks']

/**
 * Build a strict Content-Security-Policy.
 * Next.js requires 'unsafe-inline' and 'unsafe-eval' for script in dev/prod with current setup;
 * use nonces in future for stricter script-src.
 */
function getCspHeader(): string {
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

function addSecurityHeaders(res: NextResponse): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Content-Security-Policy', getCspHeader())
  return res
}

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname
    const token = req.nextauth.token
    const method = req.method ?? 'GET'

    // Stricter rate limit for login (POST to signin; NextAuth uses signin/credentials)
    const isSignin = (path === '/api/auth/signin' || path === '/api/auth/signin/credentials') && method === 'POST'
    if (isSignin) {
      const { allowed, resetAt } = await checkRateLimitPreset(req as unknown as Request, 'login')
      if (!allowed) {
        const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)
        const res = new NextResponse(
          JSON.stringify({ error: 'Too many login attempts. Please try again later.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': String(Math.max(1, retryAfter)),
            },
          }
        )
        addSecurityHeaders(res)
        return res
      }
    }

    // Rate limit API (except auth, health, webhooks)
    if (path.startsWith('/api') && !RATE_LIMIT_SKIP.some((p) => path.startsWith(p))) {
      const key = getClientIdentifier(req as unknown as Request)
      const { allowed, remaining, resetAt } = await checkRateLimit(key, API_RATE_LIMIT_MAX)
      if (!allowed) {
        const res = new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
          status: 429,
          headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
        })
        addSecurityHeaders(res)
        return res
      }
    }

    // Allow access to onboarding pages
    if (path.startsWith('/onboarding')) {
      const res = NextResponse.next()
      addSecurityHeaders(res)
      return res
    }

    // Protect student routes
    if (path.startsWith('/student') && token?.role !== 'STUDENT' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protect tutor routes
    if (path.startsWith('/tutor') && token?.role !== 'TUTOR' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Enforce TOS acceptance
    if (token && !token.tosAccepted && !path.startsWith('/student/agreement') && !path.startsWith('/api')) {
      return NextResponse.redirect(new URL('/student/agreement', req.url))
    }

    const res = NextResponse.next()
    addSecurityHeaders(res)
    return res
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const publicPaths = ['/', '/login', '/register', '/api/auth', '/api/health', '/api/csrf', '/onboarding']
        const isPublicPath = publicPaths.some((p) => req.nextUrl.pathname.startsWith(p))
        if (isPublicPath) return true
        return token !== null
      }
    }
  }
)

export const config = {
  matcher: [
    '/student/:path*',
    '/tutor/:path*',
    '/onboarding/:path*',
    '/api/auth/signin',
    '/api/auth/signin/credentials',
    '/api/((?!auth|health).*)'
  ]
}
