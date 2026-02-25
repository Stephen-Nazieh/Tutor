/**
 * Auth Provider
 * Wraps the app with NextAuth session provider
 * This makes session data available throughout the app
 */

'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider
      basePath="/api/auth"
      refetchOnWindowFocus={false}
      refetchWhenOffline={false}
    >
      {children}
    </SessionProvider>
  )
}
