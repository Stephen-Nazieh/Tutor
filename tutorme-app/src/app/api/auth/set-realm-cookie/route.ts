/**
 * POST /api/auth/set-realm-cookie
 * Copies the current NextAuth session cookie into a realm-specific cookie
 * so tutor and student can stay logged in in separate tabs.
 * Call this after signIn from the login page with realm = 'tutor' | 'student'.
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/api/middleware'
import { getToken } from 'next-auth/jwt'
import { REALM_COOKIE_TUTOR, REALM_COOKIE_STUDENT } from '@/lib/auth'

const MAX_AGE = 30 * 24 * 60 * 60 // 30 days
const COOKIE_OPTIONS = {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: MAX_AGE,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const realm = body?.realm === 'tutor' ? 'tutor' : body?.realm === 'student' ? 'student' : null
    if (!realm) {
      return NextResponse.json(
        { error: 'Missing or invalid realm (tutor|student)' },
        { status: 400 }
      )
    }

    // Checking both secure and non-secure cookie prefixes to avoid proxy mismatch bugs (e.g. Cloud Run)
    let rawToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: '__Secure-next-auth.session-token',
      raw: true,
    })
    if (!rawToken) {
      rawToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
        cookieName: 'next-auth.session-token',
        raw: true,
      })
    }

    if (typeof rawToken !== 'string') {
      return NextResponse.json({ error: 'Session token unavailable' }, { status: 400 })
    }

    const cookieName = realm === 'tutor' ? REALM_COOKIE_TUTOR : REALM_COOKIE_STUDENT

    const res = NextResponse.json({ ok: true })
    res.cookies.set(cookieName, rawToken, COOKIE_OPTIONS)
    return res
  } catch (e) {
    return handleApiError(e, 'Internal server error', 'api/auth/set-realm-cookie/route.ts')
  }
}
