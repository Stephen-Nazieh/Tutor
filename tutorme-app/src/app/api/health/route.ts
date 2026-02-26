/**
 * Health Check API
 * 
 * Monitors database, cache, and system health.
 * Used by load balancers and monitoring systems.
 */

import { NextRequest, NextResponse } from 'next/server'
import { sql } from 'drizzle-orm'
import { dbMonitor, getHealthCheck } from '@/lib/db/monitor'
import { drizzleDb } from '@/lib/db/drizzle'
import { withAuth } from '@/lib/api/middleware'

export const dynamic = 'force-dynamic'

/**
 * GET /api/health
 * 
 * Returns system health status including:
 * - Database connectivity
 * - Cache connectivity
 * - Query performance metrics
 * - Cache hit rates
 */
export async function GET(req: NextRequest) {
  try {
    const detailed = req.nextUrl.searchParams.get('detailed') === 'true'
    const health = await getHealthCheck()

    // Basic health response
    if (!detailed) {
      return NextResponse.json({
        status: health.status,
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
      }, {
        status: health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503
      })
    }

    // Detailed health response
    let dbVersion = null
    let redisInfo = null

    try {
      const result = await drizzleDb.execute<{ version: string }>(sql`SELECT version() as version`)
      const rows = (result as { rows?: { version: string }[] })?.rows ?? (Array.isArray(result) ? result : [])
      dbVersion = rows[0]?.version ?? (result as any)[0]?.version
    } catch (e) {
      // Database query failed
    }

    try {
      // Get Redis info if available
      const redisUrl = process.env.REDIS_URL
      if (redisUrl) {
        const { Redis } = await import('ioredis')
        const tempRedis = new Redis(redisUrl, { maxRetriesPerRequest: 1 })
        redisInfo = await tempRedis.info('server')
        await tempRedis.quit()
      }
    } catch (e) {
      // Redis not available
    }

    return NextResponse.json({
      status: health.status,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      node: {
        version: process.version,
        platform: process.platform,
        memory: process.memoryUsage()
      },
      services: {
        database: {
          connected: health.database,
          latency: health.latency,
          version: dbVersion
        },
        cache: {
          connected: health.cache,
          type: redisInfo ? 'redis' : 'in-memory',
          redisVersion: redisInfo ? redisInfo.match(/redis_version:(.+)/)?.[1] : null
        }
      },
      performance: health.stats,
      issues: health.issues,
      stats: dbMonitor.getStats()
    }, {
      status: health.status === 'unhealthy' ? 503 : 200
    })
  } catch (error) {
    console.error('[Health Check] Error:', error)
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    }, { status: 503 })
  }
}

/**
 * POST /api/health
 * Resets performance metrics. Admin only.
 */
async function postHandler(_req: NextRequest) {
  try {
    dbMonitor.reset()
    return NextResponse.json({ message: 'Metrics reset' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to reset metrics' },
      { status: 500 }
    )
  }
}

export const POST = withAuth(postHandler, { role: 'ADMIN' })
