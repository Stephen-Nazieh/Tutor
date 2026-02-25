/**
 * Parent API Cache Configuration
 * Optimized for Chinese market high-traffic scenarios
 *
 * Performance targets:
 * - Dashboard: <200ms, 85%+ cache hit rate
 * - Student analytics: <100ms, 85%+ cache hit rate
 * - Financial: <150ms, 85%+ cache hit rate
 */

export const PARENT_CACHE_TTL = {
  /** Parent dashboard - high traffic on every login, 2-3 min freshness */
  DASHBOARD: parseInt(process.env.CACHE_TTL_PARENT_DASHBOARD || '180', 10),
  /** Student analytics - real-time monitoring, 45s for balance of freshness vs load */
  STUDENT_ANALYTICS: parseInt(process.env.CACHE_TTL_STUDENT_ANALYTICS || '45', 10),
  /** Financial dashboard - moderate change frequency */
  FINANCIAL: parseInt(process.env.CACHE_TTL_PARENT_FINANCIAL || '120', 10),
  /** Family account lookup - shared across endpoints */
  FAMILY: parseInt(process.env.CACHE_TTL_PARENT_FAMILY || '300', 10),
} as const

export const PARENT_CACHE_KEYS = {
  dashboard: (familyId: string) => `parent:dashboard:${familyId}`,
  studentAnalytics: (familyId: string, studentId: string) =>
    `parent:student:analytics:${familyId}:${studentId}`,
  financialDashboard: (familyId: string, studentId?: string) =>
    `parent:financial:dashboard:${familyId}:${studentId ?? 'all'}`,
} as const

export const PARENT_CACHE_TAGS = {
  family: (id: string) => `family:${id}`,
  parent: (id: string) => `parent:${id}`,
  student: (id: string) => `student:${id}`,
} as const
