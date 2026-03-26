/**
 * Next.js Middleware
 * i18n: locale routing via next-intl. Security: rate limiting, headers. Auth: protects routes.
 */

import createMiddleware from 'next-intl/middleware'
import { withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import {
  checkRateLimit,
  checkRateLimitPreset,
  getClientIdentifier,
} from '@/lib/security/rate-limit'

const intlMiddleware = createMiddleware(routing)

const API_RATE_LIMIT_MAX = 100 // per minute per IP
const RATE_LIMIT_SKIP = ['/api/auth', '/api/health', '/api/payments/webhooks']
const REALM_COOKIE_TUTOR = 'tutor_session'
const REALM_COOKIE_STUDENT = 'student_session'

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

// Allowed origins for CORS - uses env var in production, localhost in dev
function getAllowedOrigins(): string[] {
  const productionOrigin = process.env.NEXT_PUBLIC_APP_URL
  const devOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:3003']

  if (productionOrigin) {
    return [productionOrigin, ...devOrigins]
  }

  return devOrigins
}

function addSecurityHeaders(res: NextResponse, req?: Request): NextResponse {
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('X-Frame-Options', 'SAMEORIGIN')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Content-Security-Policy', getCspHeader())

  // Add CORS headers for API requests from landing page
  if (req) {
    const origin = req.headers.get('origin')
    if (origin && getAllowedOrigins().includes(origin)) {
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
      res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      res.headers.set('Access-Control-Allow-Credentials', 'true')
    }
  }

  return res
}

function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const locale = segments[0]
  if (locale && routing.locales.includes(locale as (typeof routing.locales)[number])) {
    if (segments.length === 1) return '/'
    return `/${segments.slice(1).join('/')}`
  }
  return pathname
}

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname
    const normalizedPath = path.startsWith('/api') ? path : stripLocalePrefix(path)
    let token = req.nextauth.token

    // Fallback: Manually check for both generic NextAuth cookies in case withAuth fails due to proxy secure mismatches
    if (!token) {
      token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: '__Secure-next-auth.session-token',
      })
    }
    if (!token) {
      token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: 'next-auth.session-token',
      })
    }

    if (!token) {
      const realmCookieName =
        normalizedPath.startsWith('/tutor') || normalizedPath.startsWith('/api/tutor')
          ? REALM_COOKIE_TUTOR
          : normalizedPath.startsWith('/student') || normalizedPath.startsWith('/api/student')
            ? REALM_COOKIE_STUDENT
            : null
      if (realmCookieName) {
        token = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: realmCookieName,
        })
      }
    }
    const method = req.method ?? 'GET'
    const handleMatch = normalizedPath.match(/^\/@([a-zA-Z0-9_]{3,15})$/)

    if (handleMatch) {
      const username = handleMatch[1].toLowerCase()
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/u/${username}`, req.url))
    }

    // Stricter rate limit for login (POST to signin; NextAuth uses signin/credentials)
    const isSignin =
      (path === '/api/auth/signin' || path === '/api/auth/signin/credentials') && method === 'POST'
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
          addSecurityHeaders(res, req as unknown as Request)
          return res
        }
      } catch (error) {
        console.error('[Middleware] Login rate-limit check failed:', error)
      }
    }

    // Rate limit API (except auth, health, webhooks)
    if (path.startsWith('/api') && !RATE_LIMIT_SKIP.some(p => path.startsWith(p))) {
      try {
        const key = getClientIdentifier(req as unknown as Request)
        const { allowed } = await checkRateLimit(key, API_RATE_LIMIT_MAX)
        if (!allowed) {
          const res = new NextResponse(JSON.stringify({ error: 'Too many requests' }), {
            status: 429,
            headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
          })
          addSecurityHeaders(res, req as unknown as Request)
          return res
        }
      } catch (error) {
        console.error('[Middleware] API rate-limit check failed:', error)
      }
    }

    // Handle CORS preflight requests from landing page
    if (req.method === 'OPTIONS') {
      const res = new NextResponse(null, { status: 204 })
      addSecurityHeaders(res, req as unknown as Request)
      return res
    }

    // Allow access to onboarding pages
    if (normalizedPath.startsWith('/onboarding')) {
      const res = NextResponse.next()
      addSecurityHeaders(res, req as unknown as Request)
      return res
    }

    // Protect student routes
    if (
      normalizedPath.startsWith('/student') &&
      token?.role !== 'STUDENT' &&
      token?.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protect tutor routes
    if (normalizedPath.startsWith('/tutor') && token?.role !== 'TUTOR' && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    // Protect parent routes - only PARENT and ADMIN roles allowed
    if (normalizedPath.startsWith('/parent')) {
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
    if (
      token &&
      !token.tosAccepted &&
      !normalizedPath.endsWith('/agreement') &&
      !path.startsWith('/api')
    ) {
      const agreementPath =
        token.role === 'TUTOR'
          ? '/tutor/agreement'
          : token.role === 'PARENT'
            ? '/parent/agreement'
            : '/student/agreement'
      return NextResponse.redirect(new URL(agreementPath, req.url))
    }

    // Never run i18n middleware for API routes.
    if (path.startsWith('/api')) {
      const res = NextResponse.next()
      addSecurityHeaders(res, req as unknown as Request)
      return res
    }

    const res = intlMiddleware(req)
    addSecurityHeaders(res, req as unknown as Request)
    return res
  },
  {
    callbacks: {
      async authorized({ req, token }) {
        const pathname = req.nextUrl.pathname
        const normalizedPath = pathname.startsWith('/api') ? pathname : stripLocalePrefix(pathname)
        const publicExactPaths = ['/']
        const publicPrefixPaths = [
          '/api/auth',
          '/api/health',
          '/api/csrf',
          '/api/public',
          '/api/landing',
          '/onboarding',
          '/u/',
          '/admin',
          '/api/admin/',
          '/api/admin/auth',
          '/login',
          '/forgot-password',
          '/register',
        ]
        const isPublicExact = publicExactPaths.includes(normalizedPath)
        const isPublicPrefix = publicPrefixPaths.some(p => {
          if (p.endsWith('/')) return normalizedPath.startsWith(p)
          return normalizedPath === p || normalizedPath.startsWith(`${p}/`)
        })
        const isPublicPath = isPublicExact || isPublicPrefix
        if (isPublicPath) return true
        if (token) return true

        // Manual fallback for securely parsing the token regardless of withAuth's strict internal configuration mismatches
        const secureToken = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: '__Secure-next-auth.session-token',
        })
        if (secureToken) return true
        const nonSecureToken = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: 'next-auth.session-token',
        })
        if (nonSecureToken) return true

        const realmCookieName =
          normalizedPath.startsWith('/tutor') || normalizedPath.startsWith('/api/tutor')
            ? REALM_COOKIE_TUTOR
            : normalizedPath.startsWith('/student') || normalizedPath.startsWith('/api/student')
              ? REALM_COOKIE_STUDENT
              : null
        if (!realmCookieName) return false
        const realmToken = await getToken({
          req,
          secret: process.env.NEXTAUTH_SECRET,
          cookieName: realmCookieName,
        })
        return !!realmToken
      },
    },
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
    '/api/((?!auth|health).*)',
  ],
}
