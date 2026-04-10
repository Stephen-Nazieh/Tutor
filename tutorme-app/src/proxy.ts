/**
 * Next.js Middleware
 * i18n: locale routing via next-intl. Security: rate limiting, headers. Auth: protects routes.
 */

import createMiddleware from 'next-intl/middleware'
import { withAuth } from 'next-auth/middleware'
import type { JWT } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import { routing } from '@/i18n/routing'
import { API_RATE_LIMIT_MAX, RATE_LIMIT_SKIP } from '@/lib/middleware-edge/constants'
import { addSecurityHeaders } from '@/lib/middleware-edge/security-headers'
import { stripLocalePrefix } from '@/lib/middleware-edge/locale-path'
import { isPublicNormalizedPath } from '@/lib/middleware-edge/public-paths'
import {
  fetchJwtWithCookieFallbacks,
  hasAnySessionCookie,
} from '@/lib/middleware-edge/token-fallback'
import {
  checkRateLimit,
  checkRateLimitPreset,
  getClientIdentifier,
} from '@/lib/security/rate-limit'

const intlMiddleware = createMiddleware(routing)

function asJwt(value: JWT | string | null | undefined): JWT | null {
  if (value == null || typeof value === 'string') return null
  return value
}

export default withAuth(
  async function middleware(req) {
    const path = req.nextUrl.pathname
    const normalizedPath = path.startsWith('/api') ? path : stripLocalePrefix(path)

    const token =
      asJwt(req.nextauth.token) ??
      asJwt(await fetchJwtWithCookieFallbacks(req as never, normalizedPath))

    const method = req.method ?? 'GET'
    const handleMatch = normalizedPath.match(/^\/@([a-zA-Z0-9_]{3,30})$/)

    if (handleMatch) {
      const username = handleMatch[1].toLowerCase()
      return NextResponse.redirect(new URL(`/${routing.defaultLocale}/u/${username}`, req.url))
    }

    if (!isPublicNormalizedPath(normalizedPath) && !token) {
      const url = new URL('/login', req.url)
      if (normalizedPath !== '/login') {
        url.searchParams.set('callbackUrl', req.url)
        return NextResponse.redirect(url)
      }
    }

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

    if (req.method === 'OPTIONS') {
      const res = new NextResponse(null, { status: 204 })
      addSecurityHeaders(res, req as unknown as Request)
      return res
    }

    if (normalizedPath.startsWith('/onboarding')) {
      const res = NextResponse.next()
      addSecurityHeaders(res, req as unknown as Request)
      return res
    }

    if (
      normalizedPath.startsWith('/student') &&
      token?.role !== 'STUDENT' &&
      token?.role !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    if (normalizedPath.startsWith('/tutor') || normalizedPath.startsWith('/api/tutor')) {
      const role = token?.role?.toString().toUpperCase()
      if (role !== 'TUTOR' && role !== 'ADMIN') {
        if (role === 'STUDENT') return NextResponse.redirect(new URL('/student/dashboard', req.url))
        if (role === 'PARENT') return NextResponse.redirect(new URL('/parent/dashboard', req.url))
        if (normalizedPath !== '/login' && !normalizedPath.endsWith('/agreement')) {
          return NextResponse.redirect(new URL('/login', req.url))
        }
      }
    }

    if (normalizedPath.startsWith('/parent')) {
      const allowedRoles = ['PARENT', 'ADMIN']
      if (!token?.role || !allowedRoles.includes(token.role)) {
        const redirectUrl =
          token?.role === 'STUDENT'
            ? new URL('/student', req.url)
            : token?.role === 'TUTOR'
              ? new URL('/tutor', req.url)
              : new URL('/login', req.url)
        return NextResponse.redirect(redirectUrl)
      }
    }

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

        if (isPublicNormalizedPath(normalizedPath)) return true
        if (token) return true

        const resolved = await fetchJwtWithCookieFallbacks(req as never, normalizedPath)
        if (resolved) return true

        return hasAnySessionCookie(req as never)
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/(en|zh-CN|es|fr|de|ja|ko|pt|ru|ar)/:path*',
    '/',
    '/api/auth/signin',
    '/api/auth/signin/credentials',
    '/api/((?!auth|health).*)',
  ],
}
