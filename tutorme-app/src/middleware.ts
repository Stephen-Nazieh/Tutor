/**
 * Next.js Middleware
 * i18n: locale routing via next-intl. Security: rate limiting, headers. Auth: protects routes.
 */

import createMiddleware from 'next-intl/middleware'
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { checkRateLimit, checkRateLimitPreset, getClientIdentifier } from '@/lib/security/rate-limit'

const intlMiddleware = createMiddleware(routing)

const API_RATE_LIMIT_MAX = 100 // per minute per IP
const RATE_LIMIT_SKIP = ['/api/auth', '/api/health', '/api/payments/webhooks']

/**
 * Build a strict Content-Security-Policy.
 * Next.js requires 'unsafe-inline' and 'unsafe-eval' for script in dev/prod with current setup;
 * use nonces in future for stricter script-src.
 * @see docs/CSP_HARDENING.md for hardening steps and nonce/hash migration plan.
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
    const handleMatch = path.match(/^\/@([a-zA-Z0-9._]{3,30})$/)

    if (handleMatch) {
      const username = handleMatch[1].toLowerCase()
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/u/${username}`, req.url))
    }

    // Stricter rate limit for login (POST to signin; NextAuth uses signin/credentials)
    const isSignin = (path === '/api/auth/signin' || path === '/api/auth/signin/credentials') && method === 'POST'
    if (isSignin) {
      try {
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
      } catch (error) {
        console.error('[Middleware] Login rate-limit check failed:', error)
      }
    }

    // Rate limit API (except auth, health, webhooks)
    if (path.startsWith('/api') && !RATE_LIMIT_SKIP.some((p) => path.startsWith(p))) {
      try {
        const key = getClientIdentifier(req as unknown as Request)
        const { allowed } = await checkRateLimit(key, API_RATE_LIMIT_MAX)
        if (!allowed) {
          const res = new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json', 'Retry-After': '60' }
          })
          addSecurityHeaders(res)
          return res
        }
      } catch (error) {
        console.error('[Middleware] API rate-limit check failed:', error)
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

    // Protect parent routes - only PARENT and ADMIN roles allowed
    if (path.startsWith('/parent')) {
      const allowedRoles = ['PARENT', 'ADMIN']
      if (!token?.role || !allowedRoles.includes(token.role)) {
        // Redirect to role-appropriate dashboard or login
        const redirectUrl =
          token?.role === 'STUDENT'
            ? new URL('/student', req.url)
            : token?.role === 'TUTOR'
              ? new URL('/tutor', req.url)
              : new URL('/login', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }

    // Enforce TOS acceptance
    if (token && !token.tosAccepted && !path.startsWith('/student/agreement') && !path.startsWith('/api')) {
      return NextResponse.redirect(new URL('/student/agreement', req.url))
    }

    // Never run i18n middleware for API routes.
    if (path.startsWith('/api')) {
      const res = NextResponse.next()
      addSecurityHeaders(res)
      return res
    }

    const res = intlMiddleware(req)
    addSecurityHeaders(res)
    return res
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname
        const publicPaths = [
          '/',
          '/login',
          '/register',
          '/api/auth',
          '/api/health',
          '/api/csrf',
          '/api/public',
          '/onboarding',
          '/u/',
        ]
        const isLocaleAdminLogin = /^\/(en|zh-CN|es|fr|de|ja|ko|pt|ru|ar)\/admin\/login$/.test(pathname)
        const isLocaleAdminRoute = /^\/(en|zh-CN|es|fr|de|ja|ko|pt|ru|ar)\/admin(\/.*)?$/.test(pathname)
        const isLocalePublicTutorPage = /^\/(en|zh-CN|es|fr|de|ja|ko|pt|ru|ar)\/u\/[a-zA-Z0-9._]{3,30}$/.test(pathname)
        const isAdminLogin = pathname === '/admin/login'
        const isAdminRoute = pathname === '/admin' || pathname.startsWith('/admin/')
        const isAdminApiRoute = pathname.startsWith('/api/admin/')
        const isAdminAuthApi = pathname.startsWith('/api/admin/auth')
        const isPublicPath =
          publicPaths.some((p) => pathname.startsWith(p)) ||
          isLocaleAdminLogin ||
          isLocaleAdminRoute ||
          isLocalePublicTutorPage ||
          isAdminLogin ||
          isAdminRoute ||
          isAdminApiRoute ||
          isAdminAuthApi
        if (isPublicPath) return true
        return token !== null
      }
    }
  }
)

export const config = {
  matcher: [
    // Match all pathnames except api, _next, _vercel, static files (for next-intl)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // Explicit locale-prefixed paths
    '/(en|zh-CN|es|fr|de|ja|ko|pt|ru|ar)/:path*',
    // Root
    '/',
    // Auth and API (for rate limiting)
    '/api/auth/signin',
    '/api/auth/signin/credentials',
    '/api/((?!auth|health).*)'
  ]
}
