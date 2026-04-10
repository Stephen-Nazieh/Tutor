/**
 * Next.js Edge Middleware
 * 
 * Handles:
 * - i18n locale routing (via next-intl)
 * - Authentication checks for protected routes
 * - Security headers (CSP, CORS, etc.)
 * - Rate limiting for API routes
 * - Public path exclusions
 * 
 * @see https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { fetchJwtWithCookieFallbacks } from '@/lib/middleware-edge/token-fallback'
import { isPublicNormalizedPath } from '@/lib/middleware-edge/public-paths'
import { stripLocalePrefix } from '@/lib/middleware-edge/locale-path'
import { addSecurityHeaders } from '@/lib/middleware-edge/security-headers'
import { API_RATE_LIMIT_MAX, RATE_LIMIT_SKIP } from '@/lib/middleware-edge/constants'

// Initialize next-intl middleware
const intlMiddleware = createIntlMiddleware(routing)

/**
 * Check if request should skip auth check (public paths, static assets, etc.)
 */
function shouldSkipAuthCheck(pathname: string): boolean {
  // Skip static assets
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/static/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    pathname.includes('.') // Files with extensions
  ) {
    return true
  }

  // Check public paths (without locale prefix)
  const normalizedPath = stripLocalePrefix(pathname)
  return isPublicNormalizedPath(normalizedPath)
}

/**
 * Check if path is an API route
 */
function isApiRoute(pathname: string): boolean {
  return pathname.startsWith('/api/')
}

/**
 * Check if API route should skip rate limiting
 */
function shouldSkipRateLimit(pathname: string): boolean {
  return RATE_LIMIT_SKIP.some(path => pathname.startsWith(path))
}

/**
 * Simple in-memory rate limiter (use Redis in production for distributed setup)
 */
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const windowMs = 60 * 1000 // 1 minute
  const maxRequests = API_RATE_LIMIT_MAX

  const current = rateLimitMap.get(ip)

  if (!current || now > current.resetAt) {
    // New window
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (current.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  current.count++
  return { allowed: true, remaining: maxRequests - current.count }
}

/**
 * Get client IP from request
 */
function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  // NextRequest doesn't have ip property, use socket info or fallback
  return 'unknown'
}

/**
 * Main middleware function
 */
export async function middleware(req: NextRequest): Promise<NextResponse> {
  const pathname = req.nextUrl.pathname

  // Handle i18n routing first
  const intlResponse = intlMiddleware(req)

  // If next-intl returns a redirect/rewrite, apply security headers and return
  if (intlResponse.status !== 200) {
    return addSecurityHeaders(intlResponse, req)
  }

  // Check rate limiting for API routes
  if (isApiRoute(pathname) && !shouldSkipRateLimit(pathname)) {
    const ip = getClientIp(req)
    const { allowed, remaining } = checkRateLimit(ip)

    if (!allowed) {
      const res = NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
      res.headers.set('Retry-After', '60')
      res.headers.set('X-RateLimit-Limit', String(API_RATE_LIMIT_MAX))
      res.headers.set('X-RateLimit-Remaining', '0')
      return addSecurityHeaders(res, req)
    }

    // Add rate limit headers
    intlResponse.headers.set('X-RateLimit-Limit', String(API_RATE_LIMIT_MAX))
    intlResponse.headers.set('X-RateLimit-Remaining', String(remaining))
  }

  // Skip auth check for public paths and static assets
  if (shouldSkipAuthCheck(pathname)) {
    return addSecurityHeaders(intlResponse, req)
  }

  // Check authentication for protected routes
  const normalizedPath = stripLocalePrefix(pathname)
  
  try {
    const token = await fetchJwtWithCookieFallbacks(req as unknown as Parameters<typeof fetchJwtWithCookieFallbacks>[0], normalizedPath)
    
    if (!token) {
      // Not authenticated - redirect to login
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      const redirectRes = NextResponse.redirect(loginUrl)
      return addSecurityHeaders(redirectRes, req)
    }

    // Check role-based access for specific paths
    const userRole = (token as { role?: string }).role
    
    if (normalizedPath.startsWith('/admin') && userRole !== 'ADMIN') {
      const res = NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      return addSecurityHeaders(res, req)
    }

    if (normalizedPath.startsWith('/tutor') && !['TUTOR', 'ADMIN'].includes(userRole ?? '')) {
      const res = NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      return addSecurityHeaders(res, req)
    }

    if (normalizedPath.startsWith('/parent') && !['PARENT', 'ADMIN'].includes(userRole ?? '')) {
      const res = NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      return addSecurityHeaders(res, req)
    }

  } catch (error) {
    console.error('[Middleware] Auth check failed:', error)
    // Fail closed in production for security
    if (process.env.NODE_ENV === 'production') {
      const res = NextResponse.json({ error: 'Authentication failed' }, { status: 401 })
      return addSecurityHeaders(res, req)
    }
    // In development, log and continue for debugging
  }

  return addSecurityHeaders(intlResponse, req)
}

/**
 * Configure middleware matcher
 * 
 * This controls which routes the middleware runs on.
 * Exclude static files and API routes that don't need processing.
 */
export const config = {
  matcher: [
    // Skip all internal paths (_next, static, etc.)
    '/((?!_next|static|.*\\..*|api/health|api/payments/webhooks).*)',
    // Include API routes (except excluded ones)
    '/api/:path*',
  ],
}
