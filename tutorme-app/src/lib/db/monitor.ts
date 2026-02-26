/**
 * Database Performance Monitoring
 * 
 * Tracks query performance, connection pool usage, and cache hit rates.
 * Provides metrics for optimization and scaling decisions.
 */

import { cache } from './index'
import { drizzleDb } from './drizzle'
import { sql } from 'drizzle-orm'

interface QueryMetrics {
  query: string
  duration: number
  timestamp: number
  table?: string
  operation?: string
}

interface PoolMetrics {
  totalConnections: number
  activeConnections: number
  idleConnections: number
  waitingClients: number
}

interface CacheMetrics {
  hits: number
  misses: number
  hitRate: number
  size: number
}

class DatabaseMonitor {
  private queryLog: QueryMetrics[] = []
  private slowQueryThreshold = 100 // ms
  private maxLogSize = 1000
  private cacheHits = 0
  private cacheMisses = 0

  /**
   * Log a query for performance tracking
   */
  logQuery(query: string, duration: number, operation?: string, table?: string) {
    const metric: QueryMetrics = {
      query: query.substring(0, 200), // Truncate long queries
      duration,
      timestamp: Date.now(),
      operation,
      table
    }

    this.queryLog.push(metric)

    // Keep log size manageable
    if (this.queryLog.length > this.maxLogSize) {
      this.queryLog.shift()
    }

    // Log slow queries
    if (duration > this.slowQueryThreshold) {
      console.warn(`[Slow Query] ${duration}ms: ${query.substring(0, 100)}...`)
    }
  }

  /**
   * Record cache hit
   */
  recordCacheHit() {
    this.cacheHits++
  }

  /**
   * Record cache miss
   */
  recordCacheMiss() {
    this.cacheMisses++
  }

  /**
   * Get cache metrics
   */
  getCacheMetrics(): CacheMetrics {
    const total = this.cacheHits + this.cacheMisses
    return {
      hits: this.cacheHits,
      misses: this.cacheMisses,
      hitRate: total > 0 ? (this.cacheHits / total) * 100 : 0,
      size: queryCache.size
    }
  }

  /**
   * Get slow queries (above threshold)
   */
  getSlowQueries(threshold = this.slowQueryThreshold, limit = 10) {
    return this.queryLog
      .filter(q => q.duration > threshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit)
  }

  /**
   * Get most frequent queries
   */
  getMostFrequentQueries(limit = 10) {
    const frequency = new Map<string, { count: number; totalDuration: number }>()

    for (const query of this.queryLog) {
      const key = query.query
      const existing = frequency.get(key)
      if (existing) {
        existing.count++
        existing.totalDuration += query.duration
      } else {
        frequency.set(key, { count: 1, totalDuration: query.duration })
      }
    }

    return Array.from(frequency.entries())
      .map(([query, stats]) => ({
        query,
        count: stats.count,
        avgDuration: stats.totalDuration / stats.count
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  /**
   * Get database health status
   */
  async getHealthStatus(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy'
    database: boolean
    cache: boolean
    latency: number
    slowQueries: number
    issues: string[]
  }> {
    const issues: string[] = []
    let status: 'healthy' | 'degraded' | 'unhealthy' = 'healthy'

    // Check database connectivity and latency
    const dbStart = Date.now()
    let dbHealthy = false
    let dbLatency = 0

    try {
      await drizzleDb.execute(sql`SELECT 1`)
      dbLatency = Date.now() - dbStart
      dbHealthy = true

      if (dbLatency > 500) {
        issues.push(`High database latency: ${dbLatency}ms`)
        status = 'degraded'
      }
    } catch (e) {
      issues.push('Database connection failed')
      status = 'unhealthy'
    }

    // Check cache connectivity
    let cacheHealthy = false
    try {
      const redisUrl = process.env.REDIS_URL
      if (redisUrl) {
        const { Redis } = await import('ioredis')
        const tempRedis = new Redis(redisUrl, { maxRetriesPerRequest: 1 })
        await tempRedis.ping()
        await tempRedis.quit()
        cacheHealthy = true
      } else {
        cacheHealthy = true // In-memory cache always works
      }
    } catch (e) {
      issues.push('Cache connection failed')
      if (status === 'healthy') status = 'degraded'
    }

    // Check for slow queries
    const recentSlowQueries = this.queryLog.filter(
      q => q.timestamp > Date.now() - 60000 && q.duration > this.slowQueryThreshold
    ).length

    if (recentSlowQueries > 10) {
      issues.push(`${recentSlowQueries} slow queries in the last minute`)
      if (status === 'healthy') status = 'degraded'
    }

    return {
      status,
      database: dbHealthy,
      cache: cacheHealthy,
      latency: dbLatency,
      slowQueries: recentSlowQueries,
      issues
    }
  }

  /**
   * Get performance statistics
   */
  getStats() {
    const now = Date.now()
    const oneMinuteAgo = now - 60000
    const fiveMinutesAgo = now - 300000

    const recentQueries = this.queryLog.filter(q => q.timestamp > oneMinuteAgo)
    const fiveMinQueries = this.queryLog.filter(q => q.timestamp > fiveMinutesAgo)

    return {
      queries: {
        last1Minute: recentQueries.length,
        last5Minutes: fiveMinQueries.length,
        avgDuration: recentQueries.length > 0
          ? recentQueries.reduce((a, b) => a + b.duration, 0) / recentQueries.length
          : 0,
        maxDuration: recentQueries.length > 0
          ? Math.max(...recentQueries.map(q => q.duration))
          : 0
      },
      cache: this.getCacheMetrics(),
      slowQueries: this.getSlowQueries(100, 5)
    }
  }

  /**
   * Reset metrics
   */
  reset() {
    this.queryLog = []
    this.cacheHits = 0
    this.cacheMisses = 0
  }
}

// In-memory query cache size tracking
const queryCache = new Map()

// Export singleton
export const dbMonitor = new DatabaseMonitor()

/**
 * Middleware to wrap Prisma queries with monitoring
 */
export function withMonitoring<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  operation: string,
  table?: string
): T {
  return (async (...args: any[]) => {
    const start = Date.now()
    try {
      const result = await fn(...args)
      dbMonitor.logQuery(operation, Date.now() - start, operation, table)
      return result
    } catch (e) {
      dbMonitor.logQuery(operation, Date.now() - start, operation, table)
      throw e
    }
  }) as T
}

/**
 * API route for health checks
 */
export async function getHealthCheck() {
  const health = await dbMonitor.getHealthStatus()
  const stats = dbMonitor.getStats()

  return {
    ...health,
    stats: {
      queriesPerMinute: stats.queries.last1Minute,
      averageQueryTime: Math.round(stats.queries.avgDuration),
      cacheHitRate: Math.round(stats.cache.hitRate)
    }
  }
}
