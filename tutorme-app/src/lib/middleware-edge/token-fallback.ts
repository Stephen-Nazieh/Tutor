import { getToken } from 'next-auth/jwt'
import { REALM_COOKIE_STUDENT, REALM_COOKIE_TUTOR } from './constants'

type TokenReq = Parameters<typeof getToken>[0]['req']

/**
 * Resolve a JWT using the same cookie order as legacy middleware (secure / default / host, then realm).
 */
export async function fetchJwtWithCookieFallbacks(
  req: TokenReq,
  normalizedPath: string
): Promise<Awaited<ReturnType<typeof getToken>>> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return null

  const fromStandard = await getToken({
    req,
    secret,
    cookieName: '__Secure-next-auth.session-token',
  })
  if (fromStandard) return fromStandard

  const fromNextAuth = await getToken({
    req,
    secret,
    cookieName: 'next-auth.session-token',
  })
  if (fromNextAuth) return fromNextAuth

  const fromHost = await getToken({
    req,
    secret,
    cookieName: '__Host-next-auth.session-token',
  })
  if (fromHost) return fromHost

  const realmCookieName =
    normalizedPath.startsWith('/tutor') || normalizedPath.startsWith('/api/tutor')
      ? REALM_COOKIE_TUTOR
      : normalizedPath.startsWith('/student') || normalizedPath.startsWith('/api/student')
        ? REALM_COOKIE_STUDENT
        : null

  if (realmCookieName) {
    const realm = await getToken({ req, secret, cookieName: realmCookieName })
    if (realm) return realm
  }

  return null
}

/** Used by withAuth authorized() — mirrors the final thorough cookie sweep. */
export async function hasAnySessionCookie(req: TokenReq): Promise<boolean> {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) return false

  const names = [
    '__Secure-next-auth.session-token',
    'next-auth.session-token',
    '__Host-next-auth.session-token',
  ] as const
  for (const cookieName of names) {
    const t = await getToken({ req, secret, cookieName })
    if (t) return true
  }
  return false
}
