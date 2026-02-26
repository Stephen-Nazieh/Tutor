/**
 * NextAuth Configuration
 * Handles authentication for students, tutors, and admins
 * Uses Drizzle ORM and @auth/drizzle-adapter.
 */

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, account, profile, session, verificationToken } from '@/lib/db/schema'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(drizzleDb, {
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }),

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
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
        session.user.onboardingComplete = token.onboardingComplete as boolean
        session.user.tosAccepted = token.tosAccepted as boolean
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
