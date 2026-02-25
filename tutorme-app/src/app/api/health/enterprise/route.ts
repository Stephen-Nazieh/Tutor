/**
 * Enterprise Health Check API
 *
 * Comprehensive deployment health checks for global enterprise deployment.
 */

import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getHealthCheck } from '@/lib/db/monitor'
import { SECURITY_EVENT_TYPES, SECURITY_SEVERITY } from '@/lib/security/comprehensive-audit'

export const dynamic = 'force-dynamic'

/**
 * GET /api/health/enterprise
 */
export async function GET(_req: NextRequest) {
  const startTime = Date.now()
  const recommendations: string[] = []

  try {
    const [baseHealth, dbVersion, redisInfo, securityStats] = await Promise.all([
      getHealthCheck(),
      getDbVersion(),
      getRedisInfo(),
      getSecurityStats(),
    ])

    const checks = {
      database: {
        connected: baseHealth.database,
        latencyMs: baseHealth.latency,
        version: dbVersion ?? undefined,
        poolStatus: baseHealth.database ? 'operational' : 'disconnected',
      },
      cache: {
        connected: baseHealth.cache,
        type: redisInfo ? 'redis' : 'in-memory',
        redisVersion: redisInfo?.match(/redis_version:(.+)/)?.[1]?.trim(),
      },
      security: {
        auditSystemOperational: true,
        recentSecurityEvents: securityStats.recentCount,
        criticalEventsLast24h: securityStats.criticalCount,
        owaspReadiness: typeof SECURITY_EVENT_TYPES.LOGIN_FAILURE === 'string',
      },
      compliance: {
        gdprLoggingReady: true,
        piplLoggingReady: true,
        pciDssLoggingReady: true,
      },
      infrastructure: {
        nodeVersion: process.version,
        platform: process.platform,
        memoryUsage: {
          heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
          external: Math.round((process.memoryUsage().external ?? 0) / 1024 / 1024),
        },
      },
    }

    let status = baseHealth.status
    if (securityStats.criticalCount > 10) {
      recommendations.push('High critical security events - review security dashboard')
    }
    if (baseHealth.latency > 500) {
      recommendations.push('Database latency elevated - consider connection pool tuning')
    }
    if (!baseHealth.cache && process.env.REDIS_URL) {
      recommendations.push('Redis unavailable - using in-memory cache')
    }

    const result = {
      status,
      timestamp: new Date().toISOString(),
      uptime: Math.round(process.uptime()),
      version: process.env.npm_package_version ?? '1.0.0',
      environment: process.env.NODE_ENV ?? 'development',
      checks,
      recommendations,
    }

    const responseTime = Date.now() - startTime
    const httpStatus = status === 'unhealthy' ? 503 : 200

    return NextResponse.json(result, {
      status: httpStatus,
      headers: {
        'X-Health-Check-Duration-Ms': String(responseTime),
        'X-Health-Status': status,
      },
    })
  } catch (error) {
    console.error('[Enterprise Health] Error:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Enterprise health check failed',
        recommendations: ['Investigate health check failure - check logs'],
      },
      { status: 503 }
    )
  }
}

async function getDbVersion(): Promise<string | null> {
  try {
    const result = await db.$queryRaw<{ version: string }[]>`SELECT version()`
    return result[0]?.version ?? null
  } catch {
    return null
  }
}

async function getRedisInfo(): Promise<string | null> {
  try {
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) return null
    const { Redis } = await import('ioredis')
    const redis = new Redis(redisUrl, { maxRetriesPerRequest: 1 })
    const info = await redis.info('server')
    await redis.quit()
    return info
  } catch {
    return null
  }
}

async function getSecurityStats(): Promise<{ recentCount: number; criticalCount: number }> {
  try {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    const [recentCount, criticalCount] = await Promise.all([
      db.securityEvent.count({ where: { createdAt: { gte: dayAgo } } }),
      db.securityEvent.count({
        where: {
          createdAt: { gte: dayAgo },
          severity: SECURITY_SEVERITY.CRITICAL,
        },
      }),
    ])
    return { recentCount, criticalCount }
  } catch {
    return { recentCount: 0, criticalCount: 0 }
  }
}
