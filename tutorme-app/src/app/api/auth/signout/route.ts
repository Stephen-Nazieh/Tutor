/**
 * Custom signout handler that clears realm-scoped cookies (tutor_session, student_session)
 * in addition to the standard NextAuth session cookie.
 */

import { NextRequest } from 'next/server'
import NextAuth from 'next-auth'
import { authOptions, REALM_COOKIE_TUTOR, REALM_COOKIE_STUDENT } from '@/lib/auth'

const handler = NextAuth(authOptions)

function buildClearCookie(name: string): string {
  const parts = [
    `${name}=`,
    'Path=/',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure')
  }
  return parts.join('; ')
}

export async function GET(req: NextRequest) {
  const res = await handler(req, { params: Promise.resolve({ nextauth: ['signout'] }) })
  const headers = new Headers(res.headers)
  headers.append('Set-Cookie', buildClearCookie(REALM_COOKIE_TUTOR))
  headers.append('Set-Cookie', buildClearCookie(REALM_COOKIE_STUDENT))
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}

export async function POST(req: NextRequest) {
  const res = await handler(req, { params: Promise.resolve({ nextauth: ['signout'] }) })
  const headers = new Headers(res.headers)
  headers.append('Set-Cookie', buildClearCookie(REALM_COOKIE_TUTOR))
  headers.append('Set-Cookie', buildClearCookie(REALM_COOKIE_STUDENT))
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  })
}
