/**
 * Type declarations for NextAuth.js
 * Extends the default types to include role, id, and onboarding status
 */

import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      onboardingComplete: boolean
      tosAccepted?: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
    role: string
    onboardingComplete: boolean
    tosAccepted?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    id?: string
    id?: string
    onboardingComplete?: boolean
    tosAccepted?: boolean
  }
}
