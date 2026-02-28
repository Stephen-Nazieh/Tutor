/**
 * NextAuth Configuration
 * Handles authentication for students, tutors, and admins
 * Uses Drizzle ORM and @auth/drizzle-adapter.
 * Supports realm-scoped sessions so tutor and student can stay logged in in separate tabs.
 */

import type { NextRequest } from 'next/server'
import { NextAuthOptions, getServerSession as getServerSessionNextAuth } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import type { Session } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, account, profile, session, verificationToken } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'

/** Cookie names for realm-scoped sessions (tutor tab vs student tab). */
export const REALM_COOKIE_TUTOR = 'tutor_session'
export const REALM_COOKIE_STUDENT = 'student_session'

export const authOptions: NextAuthOptions = {
  providers: [
    // Email/Password Login
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const normalizedEmail = credentials.email.trim().toLowerCase()

        // Find user by email (Drizzle)
        const [userRow] = await drizzleDb.select().from(user).where(eq(user.email, normalizedEmail)).limit(1)
        if (!userRow?.password) {
          return null
        }

        // Get profile for onboarding/tos
        const [profileRow] = await drizzleDb.select().from(profile).where(eq(profile.userId, userRow.id)).limit(1)

        const isValid = await bcrypt.compare(credentials.password, userRow.password)
        if (!isValid) {
          const { logFailedLogin } = await import('@/lib/security/suspicious-activity')
          await logFailedLogin(null, normalizedEmail)
          return null
        }

        const onboardingComplete = checkOnboardingComplete({ profile: profileRow ?? undefined })
        const tosAccepted = profileRow?.tosAccepted ?? false

        return {
          id: userRow.id,
          email: userRow.email,
          name: profileRow?.name ?? userRow.email,
          role: userRow.role,
          image: profileRow?.avatarUrl ?? undefined,
          onboardingComplete,
          tosAccepted
        }
      }
    })
  ],

  // WeChat OAuth - To be added later
  // WeChatProvider({
  //   clientId: process.env.WECHAT_APP_ID!,
  //   clientSecret: process.env.WECHAT_APP_SECRET!,
  // })
  // ], // This was an extra closing bracket for providers array, removed it.

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role
        token.id = user.id
        token.onboardingComplete = user.onboardingComplete
        token.tosAccepted = user.tosAccepted
      }

      // Handle session update (e.g., after onboarding completes)
      if (trigger === 'update' && session) {
        token.onboardingComplete = true
      }

      return token
    },

    async session({ session, token }) {
      // Ensure session.user exists when token has id so route handlers never see undefined (reading 'user')
      if (token?.id) {
        if (!session.user) {
          (session as { user: { id: string; role?: string; name?: string; email?: string | null; image?: string | null } }).user = {
            id: token.id as string,
            role: token.role as string,
            name: undefined,
            email: undefined,
            image: undefined,
          }
        } else {
          session.user.role = token.role as string
          session.user.id = token.id as string
        }
        (session.user as { onboardingComplete?: boolean; tosAccepted?: boolean }).onboardingComplete = token.onboardingComplete as boolean
        (session.user as { tosAccepted?: boolean }).tosAccepted = token.tosAccepted as boolean
      }
      return session
    }
  },

  pages: {
    signIn: '/login',
    error: '/login'
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET
}

// Helper function to check if onboarding is complete
function checkOnboardingComplete(user: { profile?: { isOnboarded?: boolean | null } | null }): boolean {
  if (!user?.profile) return false
  if (user.profile.isOnboarded === null || user.profile.isOnboarded === undefined) return false
  return user.profile.isOnboarded
}

// Helper function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Helper function to check if user is authorized
export function isAuthorized(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole)
}

// ---------------------------------------------------------------------------
// Realm-scoped sessions (tutor vs student in separate tabs)
// ---------------------------------------------------------------------------

export type Realm = 'tutor' | 'student'

function realmFromPath(pathname: string): Realm | null {
  if (pathname.includes('/tutor') || pathname.includes('/api/tutor')) return 'tutor'
  if (pathname.includes('/student') || pathname.includes('/api/student')) return 'student'
  // Class creation and management are tutor actions; use tutor realm so tutor tab gets correct session
  if (pathname.includes('/api/class')) return 'tutor'
  return null
}

function realmCookieName(realm: Realm): string {
  return realm === 'tutor' ? REALM_COOKIE_TUTOR : REALM_COOKIE_STUDENT
}

/**
 * Get session from a realm-scoped cookie (tutor_session or student_session).
 * Used so tutor and student can stay logged in in different tabs.
 */
export async function getSessionForRealm(
  request: NextRequest,
  realm: Realm
): Promise<Session | null> {
  const cookieName = realmCookieName(realm)
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName,
  })
  if (!token || !token.id) return null
  const expiresAt =
    typeof token.exp === 'number'
      ? new Date(token.exp * 1000).toISOString()
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
  const session = {
    user: {
      id: token.id as string,
      role: (token.role as string) ?? 'STUDENT',
      name: (token.name as string) ?? undefined,
      email: (token.email as string) ?? undefined,
      image: (token.picture as string) ?? undefined,
      onboardingComplete: Boolean(token.onboardingComplete),
      tosAccepted: Boolean(token.tosAccepted),
    },
    expires: expiresAt,
  }
  return session as Session
}

/**
 * Get server session, using realm-scoped cookie when the request path is /tutor or /student (or /api/tutor, /api/student).
 * Pass the request so tutor and student tabs can have separate sessions.
 */
export async function getServerSession(
  options: NextAuthOptions,
  request?: NextRequest
): Promise<Session | null> {
  if (request) {
    const pathname = request.nextUrl?.pathname ?? new URL(request.url).pathname
    const realm = realmFromPath(pathname)
    if (realm) {
      const session = await getSessionForRealm(request, realm)
      if (session) return session
    }
  }
  return (await getServerSessionNextAuth(options)) as Session | null
}
