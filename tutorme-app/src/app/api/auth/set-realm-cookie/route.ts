/**
 * POST /api/auth/set-realm-cookie
 * Copies the current NextAuth session cookie into a realm-specific cookie
 * so tutor and student can stay logged in in separate tabs.
 * Call this after signIn from the login page with realm = 'tutor' | 'student'.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { REALM_COOKIE_TUTOR, REALM_COOKIE_STUDENT } from '@/lib/auth'

const DEFAULT_COOKIE_NAME =
  process.env.NEXTAUTH_URL?.startsWith('https://') || !!process.env.VERCEL
    ? '__Secure-next-auth.session-token'
    : 'next-auth.session-token'

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
      return NextResponse.json({ error: 'Missing or invalid realm (tutor|student)' }, { status: 400 })
    }

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: DEFAULT_COOKIE_NAME,
    })
    if (!token?.id) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const cookieName = realm === 'tutor' ? REALM_COOKIE_TUTOR : REALM_COOKIE_STUDENT
    const rawToken = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: DEFAULT_COOKIE_NAME,
      raw: true,
    })
    if (typeof rawToken !== 'string') {
      return NextResponse.json({ error: 'Session token unavailable' }, { status: 400 })
    }

    const res = NextResponse.json({ ok: true })
    res.cookies.set(cookieName, rawToken, COOKIE_OPTIONS)
    return res
  } catch (e) {
    console.error('[set-realm-cookie]', e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
