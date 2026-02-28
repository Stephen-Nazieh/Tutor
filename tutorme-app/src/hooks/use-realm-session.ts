'use client'

import { useState, useEffect } from 'react'
import type { Session } from 'next-auth'

export type Realm = 'tutor' | 'student'

/**
 * Fetches session from the realm-scoped cookie (tutor_session or student_session)
 * so that tutor and student tabs can show the correct user when both are logged in.
 */
export function useRealmSession(realm: Realm): { data: Session | null; status: 'loading' | 'authenticated' | 'unauthenticated' } {
  const [data, setData] = useState<Session | null>(null)
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

  useEffect(() => {
    let cancelled = false
    setStatus('loading')
    fetch(`/api/auth/session-realm?realm=${realm}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((session: Session | Record<string, unknown>) => {
        if (cancelled) return
        const hasUser = session && typeof session === 'object' && (session as Session).user?.id
        if (hasUser) {
          setData(session as Session)
          setStatus('authenticated')
        } else {
          setData(null)
          setStatus('unauthenticated')
        }
      })
      .catch(() => {
        if (!cancelled) {
          setData(null)
          setStatus('unauthenticated')
        }
      })
    return () => {
      cancelled = true
    }
  }, [realm])

  return { data, status }
}
