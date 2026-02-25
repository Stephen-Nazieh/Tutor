'use client'

import { useState, useEffect, useCallback } from 'react'

export interface ParentDashboardChild {
  id: string
  name: string
  grade: string
  avatar: string
  upcomingClasses: number
  assignmentsDue: number
  progress: number
  lastActive: string
  subjects: string[]
  recentAchievement: string | null
}

export interface ParentDashboardFinancial {
  monthlyBudget: number
  spentThisMonth: number
  upcomingPayments: Array<{
    id: string
    description: string
    amount: number
    dueDate: string
  }>
}

export interface ParentDashboardActivity {
  id: string
  type: string
  description: string
  time: string
}

export interface ParentDashboardNotification {
  id: string
  type: string
  message: string
  read: boolean
}

export interface ParentDashboardData {
  parentName: string
  children: ParentDashboardChild[]
  financialSummary: ParentDashboardFinancial
  recentActivity: ParentDashboardActivity[]
  notifications: ParentDashboardNotification[]
  stats: {
    totalChildren: number
    upcomingClasses: number
    assignmentsDue: number
    unreadNotifications: number
  }
}

interface UseParentResult {
  data: ParentDashboardData | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useParent(): UseParentResult {
  const [data, setData] = useState<ParentDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/parent/dashboard')
      const json = await res.json()

      if (!res.ok) {
        throw new Error(json.error || 'Failed to load parent dashboard')
      }

      if (json.success && json.data) {
        setData(json.data)
      } else {
        throw new Error('Invalid response format')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return { data, isLoading, error, refetch: fetchData }
}
