/**
 * CSRF protection for state-changing API requests.
 * Uses a double-submit cookie pattern: cookie set on session, validated on POST/PUT/DELETE/PATCH.
 */

import { cookies } from 'next/headers'
import crypto from 'crypto'

const CSRF_COOKIE_NAME = 'tutorme_csrf'
const CSRF_HEADER_NAME = 'x-csrf-token'
const SECRET = process.env.NEXTAUTH_SECRET || process.env.CSRF_SECRET || 'csrf-secret-change-in-production'

function hash(value: string): string {
  return crypto.createHmac('sha256', SECRET).update(value).digest('hex')
}

/**
 * Generate a CSRF token for the current request. Call from a route or pass to client.
 */
export async function getCsrfToken(): Promise<string> {
  const value = crypto.randomBytes(24).toString('hex')
  const token = `${value}.${hash(value)}`
  const cookieStore = await cookies()
  cookieStore.set(CSRF_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24, // 24h
    path: '/'
  })
  return token
}

/**
 * Verify CSRF token from request header against cookie. Returns true if valid.
 */
export async function verifyCsrfToken(req: Request): Promise<boolean> {
  try {
    const headerToken = req.headers.get(CSRF_HEADER_NAME)
    const cookieStore = await cookies()
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value
    if (!headerToken || !cookieToken) return false
    if (headerToken !== cookieToken) return false

    const [value] = headerToken.split('.')
    if (!value) return false

    const expected = `${value}.${hash(value)}`
    const headerBuffer = Buffer.from(headerToken)
    const expectedBuffer = Buffer.from(expected)
    if (headerBuffer.length !== expectedBuffer.length) return false

    return crypto.timingSafeEqual(headerBuffer, expectedBuffer)
  } catch {
    return false
  }
}

export { CSRF_HEADER_NAME }
