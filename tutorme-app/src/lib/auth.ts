/**
 * NextAuth Configuration
 * Handles authentication for students, tutors, and admins
 */

import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { db } from '@/lib/db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),

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

        // Find user by email
        const user = await db.user.findUnique({
          where: { email: credentials.email },
          include: { profile: true }
        })

        if (!user || !user.password) {
          return null
        }

        // Verify password
        const isValid = await bcrypt.compare(credentials.password, user.password)

        if (!isValid) {
          const { logFailedLogin } = await import('@/lib/security/suspicious-activity')
          await logFailedLogin(null, credentials.email)
          return null
        }


        // Check if onboarding is complete
        const onboardingComplete = checkOnboardingComplete(user.role, user.profile)
        const tosAccepted = user.profile?.tosAccepted || false

        return {
          id: user.id,
          email: user.email,
          name: user.profile?.name || user.email,
          role: user.role,
          image: user.profile?.avatarUrl,
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
function checkOnboardingComplete(role: string, profile: any): boolean {
  // Bypass onboarding check - always return true
  return true
}

// Helper function to hash passwords
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Helper function to check if user is authorized
export function isAuthorized(userRole: string, allowedRoles: string[]): boolean {
  return allowedRoles.includes(userRole)
}
