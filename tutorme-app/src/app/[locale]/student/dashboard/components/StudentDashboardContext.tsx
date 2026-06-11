'use client'

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'

export interface StudentDashboardStats {
  coursesEnrolled: number
  coursesCompleted: number
  upcomingSessions: number
  totalBookings: number
}

interface StudentDashboardContextValue {
  stats: StudentDashboardStats
  loading: boolean
  error: Error | null
  refreshStats: () => void
}

const DEFAULT_STATS: StudentDashboardStats = {
  coursesEnrolled: 0,
  coursesCompleted: 0,
  upcomingSessions: 0,
  totalBookings: 0,
}

const StudentDashboardContext = createContext<StudentDashboardContextValue>({
  stats: DEFAULT_STATS,
  loading: true,
  error: null,
  refreshStats: () => {},
})

export function useStudentDashboard() {
  return useContext(StudentDashboardContext)
}

interface StudentDashboardProviderProps {
  children: ReactNode
}

export function StudentDashboardProvider({ children }: StudentDashboardProviderProps) {
  const [stats, setStats] = useState<StudentDashboardStats>(DEFAULT_STATS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/student/dashboard-stats', {
        credentials: 'include',
      })
      if (!res.ok) {
        throw new Error(`Failed to fetch dashboard stats: ${res.status}`)
      }
      const json = await res.json()
      setStats(
        json?.data ?? {
          coursesEnrolled: 0,
          coursesCompleted: 0,
          upcomingSessions: 0,
          totalBookings: 0,
        }
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)))
      setStats(DEFAULT_STATS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const refreshStats = useCallback(() => {
    fetchStats()
  }, [fetchStats])

  return (
    <StudentDashboardContext.Provider value={{ stats, loading, error, refreshStats }}>
      {children}
    </StudentDashboardContext.Provider>
  )
}
