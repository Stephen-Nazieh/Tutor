/**
 * React Hook for Student Performance
 * @deprecated Legacy performance tracking - use task submission analytics instead
 */

import { useEffect, useState, useCallback } from 'react'
import {
  StudentPerformanceData,
  getStudentPerformance,
  getClassPerformanceSummary,
} from '@/lib/performance/student-analytics'

interface UseStudentPerformanceOptions {
  studentId: string
  courseId?: string
}

interface UseStudentPerformanceReturn {
  performance: StudentPerformanceData | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useStudentPerformance({
  studentId,
  courseId,
}: UseStudentPerformanceOptions): UseStudentPerformanceReturn {
  const [performance, setPerformance] = useState<StudentPerformanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerformance = useCallback(async () => {
    if (!studentId) return

    setLoading(true)
    setError(null)

    try {
      const data = await getStudentPerformance(studentId)
      setPerformance(data)
    } catch (err) {
      console.error('Failed to fetch student performance:', err)
      setError('Failed to load performance data')
    } finally {
      setLoading(false)
    }
  }, [studentId])

  useEffect(() => {
    fetchPerformance()
  }, [fetchPerformance])

  return {
    performance,
    loading,
    error,
    refresh: fetchPerformance,
  }
}

export function useClassPerformance(courseId: string) {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    if (!courseId) return

    setLoading(true)
    setError(null)

    try {
      const data = await getClassPerformanceSummary(courseId)
      setSummary(data)
    } catch (err) {
      console.error('Failed to fetch class performance:', err)
      setError('Failed to load class data')
    } finally {
      setLoading(false)
    }
  }, [courseId])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return {
    summary,
    loading,
    error,
    refresh: fetchSummary,
  }
}

// Stub for legacy compatibility
export function useStudentsPerformance() {
  return {
    performances: {},
    loading: false,
    error: null,
    refresh: async () => {},
    aggregateMetrics: () => null,
    getStudentsNeedingHelp: () => [],
  }
}

export function triggerPerformanceUpdate(_studentId: string) {
  // No-op - legacy function
}

export function clearPerformanceCache() {
  // No-op - legacy function
}
