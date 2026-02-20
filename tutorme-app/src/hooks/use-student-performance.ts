/**
 * React Hook for Student Performance
 * Real-time performance updates with caching and optimization
 */

import { useEffect, useState, useCallback, useRef } from 'react'
import { 
  StudentPerformanceData, 
  StudentMetrics,
  PerformanceCluster,
  getStudentPerformance,
  getClassPerformanceSummary
} from '@/lib/performance/student-analytics'

interface UseStudentPerformanceOptions {
  studentId: string
  curriculumId?: string
  refreshInterval?: number // in milliseconds
  enableRealtime?: boolean
}

interface UseStudentPerformanceReturn {
  performance: StudentPerformanceData | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
  isStale: boolean
}

interface UseClassPerformanceReturn {
  summary: {
    totalStudents: number
    averageScore: number
    clusterDistribution: Record<PerformanceCluster, number>
    topStudents: { id: string; name: string; score: number }[]
    studentsNeedingAttention: { id: string; name: string; reason: string }[]
  } | null
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

// Cache for performance data
const performanceCache = new Map<string, {
  data: StudentPerformanceData
  timestamp: number
}>()

const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

/**
 * Hook for tracking individual student performance
 */
export function useStudentPerformance({
  studentId,
  curriculumId,
  refreshInterval = 30000, // 30 seconds default
  enableRealtime = true
}: UseStudentPerformanceOptions): UseStudentPerformanceReturn {
  const [performance, setPerformance] = useState<StudentPerformanceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isStale, setIsStale] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const lastFetchRef = useRef<number>(0)

  const fetchPerformance = useCallback(async (force = false) => {
    if (!studentId) return

    const cacheKey = `${studentId}-${curriculumId || 'all'}`
    const now = Date.now()

    // Check cache first (unless forced refresh)
    if (!force) {
      const cached = performanceCache.get(cacheKey)
      if (cached && now - cached.timestamp < CACHE_TTL) {
        setPerformance(cached.data)
        setLoading(false)
        setIsStale(true) // Mark as stale since we're using cache
        return
      }
    }

    // Debounce: don't fetch if we fetched recently
    if (!force && now - lastFetchRef.current < 5000) {
      return
    }

    lastFetchRef.current = now
    setLoading(true)
    setError(null)

    try {
      const data = await getStudentPerformance(studentId, curriculumId)
      setPerformance(data)
      setIsStale(false)
      
      // Update cache
      performanceCache.set(cacheKey, {
        data,
        timestamp: now
      })
    } catch (err) {
      console.error('Failed to fetch student performance:', err)
      setError('Failed to load performance data')
      
      // Use stale cache as fallback
      const cached = performanceCache.get(cacheKey)
      if (cached) {
        setPerformance(cached.data)
        setIsStale(true)
      }
    } finally {
      setLoading(false)
    }
  }, [studentId, curriculumId])

  // Initial fetch
  useEffect(() => {
    fetchPerformance()
  }, [fetchPerformance])

  // Setup realtime updates
  useEffect(() => {
    if (!enableRealtime || !studentId) return

    intervalRef.current = setInterval(() => {
      fetchPerformance(true) // Force refresh on interval
    }, refreshInterval)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [enableRealtime, refreshInterval, fetchPerformance, studentId])

  // Listen for performance update events
  useEffect(() => {
    const handlePerformanceUpdate = (event: CustomEvent) => {
      if (event.detail?.studentId === studentId) {
        fetchPerformance(true)
      }
    }

    window.addEventListener('performance-updated' as any, handlePerformanceUpdate)
    
    return () => {
      window.removeEventListener('performance-updated' as any, handlePerformanceUpdate)
    }
  }, [studentId, fetchPerformance])

  const refresh = useCallback(async () => {
    await fetchPerformance(true)
  }, [fetchPerformance])

  return {
    performance,
    loading,
    error,
    refresh,
    isStale
  }
}

/**
 * Hook for tracking class-wide performance
 */
export function useClassPerformance(
  curriculumId: string
): UseClassPerformanceReturn {
  const [summary, setSummary] = useState<UseClassPerformanceReturn['summary']>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchSummary = useCallback(async () => {
    if (!curriculumId) return

    setLoading(true)
    setError(null)

    try {
      const data = await getClassPerformanceSummary(curriculumId)
      setSummary(data)
    } catch (err) {
      console.error('Failed to fetch class performance:', err)
      setError('Failed to load class data')
    } finally {
      setLoading(false)
    }
  }, [curriculumId])

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  return {
    summary,
    loading,
    error,
    refresh: fetchSummary
  }
}

/**
 * Hook for tracking multiple students' performance
 * Optimized for tutor dashboard monitoring
 */
export function useStudentsPerformance(
  studentIds: string[],
  curriculumId?: string
) {
  const [performances, setPerformances] = useState<Record<string, StudentPerformanceData>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPerformances = useCallback(async () => {
    if (studentIds.length === 0) {
      setPerformances({})
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Fetch in parallel with batching
      const batchSize = 5
      const results: Record<string, StudentPerformanceData> = {}

      for (let i = 0; i < studentIds.length; i += batchSize) {
        const batch = studentIds.slice(i, i + batchSize)
        const batchResults = await Promise.all(
          batch.map(async (id) => {
            const data = await getStudentPerformance(id, curriculumId)
            return { id, data }
          })
        )

        batchResults.forEach(({ id, data }) => {
          results[id] = data
        })

        // Update state progressively
        setPerformances(prev => ({ ...prev, ...results }))
      }
    } catch (err) {
      console.error('Failed to fetch students performance:', err)
      setError('Failed to load some student data')
    } finally {
      setLoading(false)
    }
  }, [studentIds, curriculumId])

  useEffect(() => {
    fetchPerformances()
  }, [fetchPerformances])

  // Get aggregated metrics
  const aggregateMetrics = () => {
    const values = Object.values(performances)
    if (values.length === 0) return null

    const avgScore = values.reduce((sum, p) => sum + p.overallMetrics.averageScore, 0) / values.length
    const avgCompletion = values.reduce((sum, p) => sum + p.overallMetrics.completionRate, 0) / values.length
    const avgEngagement = values.reduce((sum, p) => sum + p.overallMetrics.engagementScore, 0) / values.length

    const clusterCounts: Record<PerformanceCluster, number> = {
      advanced: 0,
      intermediate: 0,
      struggling: 0
    }

    values.forEach(p => {
      clusterCounts[p.performanceCluster]++
    })

    return {
      averageScore: Math.round(avgScore * 10) / 10,
      averageCompletion: Math.round(avgCompletion * 10) / 10,
      averageEngagement: Math.round(avgEngagement * 10) / 10,
      clusterCounts,
      totalStudents: values.length
    }
  }

  // Get students needing help
  const getStudentsNeedingHelp = () => {
    return Object.values(performances)
      .filter(p => p.performanceCluster === 'struggling')
      .sort((a, b) => a.overallMetrics.averageScore - b.overallMetrics.averageScore)
  }

  return {
    performances,
    loading,
    error,
    refresh: fetchPerformances,
    aggregateMetrics,
    getStudentsNeedingHelp
  }
}

/**
 * Trigger a performance update event
 * Call this after task submissions or other relevant actions
 */
export function triggerPerformanceUpdate(studentId: string) {
  window.dispatchEvent(new CustomEvent('performance-updated', {
    detail: { studentId }
  }))
}

// Clear cache helper (useful for logout)
export function clearPerformanceCache() {
  performanceCache.clear()
}
