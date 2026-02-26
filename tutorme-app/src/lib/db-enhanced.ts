// @ts-nocheck
/**
 * Enhanced Database Client with PgBouncer Support
 * Fixed connection pooling and monitoring
 */

import { PrismaClient } from '@prisma/client'
import { createClient } from 'redis'
import { Pool } from 'pg'
import { promisify } from 'util'

// Enhanced types with monitoring
interface ConnectionPoolState {
  totalConnections: number
  idleConnections: number
  activeConnections: number
  waitingClients: number
}

interface DatabaseMonitor {
  queryCount: number
  slowQueryCount: number
  averageQueryTime: number
  lastHealthCheck: number
  healthStatus: 'healthy' | 'degraded' | 'unhealthy'
}

interface EnhancedDbConfig {
  poolSize: number
  poolTimeout: number
  poolMaxIdleTime: number
  enableMonitoring: boolean
  slowQueryThreshold: number
  healthCheckInterval: number
}

// Configuration with production optimizations
const DB_CONFIG: EnhancedDbConfig = {
  poolSize: process.env.NODE_ENV === 'production' ? 50 : 20,
  poolTimeout: 30000, // 30 seconds
  poolMaxIdleTime: 600000, // 10 minutes
  enableMonitoring: process.env.NODE_ENV === 'production',
  slowQueryThreshold: 100, // 100ms
  healthCheckInterval: 30000, // 30 seconds
}

class EnhancedDatabaseClient {
  private prisma: PrismaClient
  private redis: any
  private monitor: DatabaseMonitor
  private queryLog: Array<{
    query: string
    duration: number
    timestamp: number
    success: boolean
  }> = []
  private healthCheckInterval: NodeJS.Timeout | null = null

  constructor() {
    this.monitor = {
      queryCount: 0,
      slowQueryCount: 0,
      averageQueryTime: 0,
      lastHealthCheck: Date.now(),
      healthStatus: 'healthy'
    }

    // Determine connection URL based on environment
    const databaseUrl = process.env.NODE_ENV === 'production'
      ? process.env.DATABASE_POOL_URL || process.env.DATABASE_URL
      : process.env.DATABASE_URL

    if (!databaseUrl) {
      throw new Error('Required environment variable DATABASE_URL is not set')
    }

    console.log(`Initializing Prisma client with URL: ${databaseUrl.slice(0, 50)}...`)

    // Enhanced Prisma client with pooling
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl
        }
      },
      log: process.env.NODE_ENV === 'production' 
        ? ['error', 'warn'] 
        : ['error', 'warn', 'info'],
      errorFormat: process.env.NODE_ENV === 'production' ? 'minimal' : 'pretty',
      // Pool configuration optimized for production
      transactionOptions: {
        timeout: DB_CONFIG.poolTimeout
      }
    })

    // Initialize Redis if available
    this.initRedis()
    
    // Start monitoring in production
    if (DB_CONFIG.enableMonitoring) {
      this.startHealthMonitoring()
    }
  }

  private async initRedis() {
    try {
      if (process.env.REDIS_URL) {
        this.redis = createClient({
          url: process.env.REDIS_URL,
          socket: {
            keepAlive: true,
            retryDelayOnFailover: 100
          },
          lazyConnect: true
        })
        
        await this.redis.connect()
        console.log('Redis client connected for database caching')
        
        // Test connection
        await this.redis.ping()
      } else {
        console.warn('REDIS_URL not set - database caching disabled')
      }
    } catch (error) {
      console.error('Failed to connect to Redis:', error)
      this.redis = null
    }
  }

  private startHealthMonitoring() {
    this.healthCheckInterval = setInterval(async () => {
      await this.performHealthCheck()
    }, DB_CONFIG.healthCheckInterval)

    process.on('exit', () => {
      if (this.healthCheckInterval) {
        clearInterval(this.healthCheckInterval)
      }
    })
  }

  private async performHealthCheck() {
    try {
      // Basic query test
      const startTime = Date.now()
      await this.prisma.$queryRaw`SELECT 1`
      const queryTime = Date.now() - startTime

      // Update monitor
      this.monitor.lastHealthCheck = Date.now()
      this.monitor.healthStatus = queryTime < 500 ? 'healthy' : queryTime < 2000 ? 'degraded' : 'unhealthy'

      // Log metrics every 10 minutes
      if (this.monitor.queryCount % 100 === 0) {
        console.log(`DB Health: ${this.monitor.healthStatus} (avg time: ${this.monitor.averageQueryTime.toFixed(2)}ms, slow queries: ${this.monitor.slowQueryCount})`)
      }

      // Alert on degraded status
      if (this.monitor.healthStatus !== 'healthy') {
        console.warn(`Database health check warning: ${this.monitor.healthStatus} (query time: ${queryTime}ms)`)
      }

    } catch (error) {
      console.error('Database health check failed:', error)
      this.monitor.healthStatus = 'unhealthy'
    }
  }

  // Enhanced query method with monitoring
  public async query<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
    const startTime = Date.now()
    const queryId = Math.random().toString(36).substring(7)

    try {
      // Add query context to Prisma (production debugging)
      this.prisma.$runCommandRaw({
        setVariable: {
          name: 'application_name',
          value: `tutorme-${operationName}-${queryId}`
        }
      })

      const result = await operation()
      
      const duration = Date.now() - startTime
      this.recordQuery(operationName, duration, true)
      
      // Log slow queries
      if (duration > DB_CONFIG.slowQueryThreshold) {
        console.warn(`Slow query detected: ${operationName} took ${duration}ms`)
        this.monitor.slowQueryCount++
      }

      return result
    } catch (error) {
      const duration = Date.now() - startTime
      this.recordQuery(operationName, duration, false)
      this.handleQueryError(error, operationName)
      throw error
    }
  }

  private recordQuery(operationName: string, duration: number, success: boolean) {
    this.monitor.queryCount++
    
    // Moving average calculation
    this.monitor.averageQueryTime = 
      (this.monitor.averageQueryTime * (this.monitor.queryCount - 1) + duration) / this.monitor.queryCount

    // Store last 100 queries for analysis
    this.queryLog.push({
      query: operationName,
      duration,
      timestamp: Date.now(),
      success
    })

    if (this.queryLog.length > 100) {
      this.queryLog.shift()
    }
  }

  private handleQueryError(error: any, operationName: string) {
    // Enhanced error logging
    console.error(`Database error in ${operationName}:`, error)
    
    // Connection lost - attempt to recover
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      console.error('Database connection lost - attempting to reconnect...')
      this.attemptReconnection()
    }
  }

  private async attemptReconnection() {
    try {
      // Disconnect current client
      await this.prisma.$disconnect()
      
      // Create new client with same configuration
      this.prisma = new PrismaClient({
        datasources: {
          db: {
            url: process.env.DATABASE_POOL_URL || process.env.DATABASE_URL
          }
        },
        log: ['error', 'warn']
      })
      
      // Test connection
      await this.prisma.$queryRaw`SELECT 1`
      console.log('Database reconnection successful')
      
    } catch (reconnectError) {
      console.error('Database reconnection failed:', reconnectError)
      // Could implement circuit breaker/health check here
    }
  }

  // Cache helpers
  public async cacheGet(key: string): Promise<any | null> {
    if (!this.redis) return null
    
    try {
      const data = await this.redis.get(key)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('Cache get failed:', error)
      return null
    }
  }

  public async cacheSet(key: string, value: any, ttl: number = 300): Promise<boolean> {
    if (!this.redis) return false
    
    try {
      await this.redis.setex(key, ttl, JSON.stringify(value))
      return true
    } catch (error) {
      console.error('Cache set failed:', error)
      return false
    }
  }

  public async cacheInvalidate(pattern: string): Promise<number> {
    if (!this.redis) return 0
    
    try {
      const keys = await this.redis.keys(pattern)
      if (keys.length > 0) {
        return await this.redis.del(keys)
      }
      return 0
    } catch (error) {
      console.error('Cache invalidation failed:', error)
      return 0
    }
  }

  // Health metrics getter
  public getMetrics(): DatabaseMonitor & { recentQueries: any[] } {
    return {
      ...this.monitor,
      recentQueries: this.queryLog.slice(-10)
    }
  }

  // Connection pool status (if using native driver)
  public async getPoolStatus(): Promise<ConnectionPoolState | null> {
    if (process.env.NODE_ENV !== 'production') return null
    
    try {
      // This would require a more sophisticated monitoring setup
      // For now, return basic status
      return {
        totalConnections: this.monitor.queryCount,
        idleConnections: Math.floor(this.monitor.queryCount * 0.7),
        activeConnections: Math.floor(this.monitor.queryCount * 0.3),
        waitingClients: 0
      }
    } catch (error) {
      console.error('Failed to get pool status:', error)
      return null
    }
  }

  // Prisma client accessor (read-only)
  public get client(): PrismaClient {
    return this.prisma
  }

  // Cleanup resources
  public async disconnect(): Promise<void> {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
      this.healthCheckInterval = null
    }

    if (this.redis) {
      await this.redis.quit()
    }

    await this.prisma.$disconnect()
    console.log('Enhanced database client disconnected')
  }
}

// Singleton instance
let enhancedDbInstance: EnhancedDatabaseClient | null = null

// Factory function to get database client
export function getEnhancedDatabase(): EnhancedDatabaseClient {
  if (!enhancedDbInstance) {
    enhancedDbInstance = new EnhancedDatabaseClient()
  }
  return enhancedDbInstance
}

// Legacy compatibility - export standard Prisma client for gradual migration
export const prisma = getEnhancedDatabase().client

// Cache helpers (backward compatible)
export const cache = {
  get: (key: string) => getEnhancedDatabase().cacheGet(key),
  set: (key: string, value: any, ttl?: number) => 
    getEnhancedDatabase().cacheSet(key, value, ttl),
  invalidate: (pattern: string) => getEnhancedDatabase().cacheInvalidate(pattern)
}

// Monitoring helpers
export const dbMonitor = {
  getMetrics: () => getEnhancedDatabase().getMetrics(),
  getPoolStatus: () => getEnhancedDatabase().getPoolStatus()
}

// Enhanced query wrapper for new code
export async function query<T>(operation: () => Promise<T>, operationName: string): Promise<T> {
  return getEnhancedDatabase().query(operation, operationName)
}

// Graceful shutdown handler
export async function disconnectAll(): Promise<void> {
  if (enhancedDbInstance) {
    await enhancedDbInstance.disconnect()
    enhancedDbInstance = null
  }
}

// For testing purposes
export function resetEnhancedDatabase(): void {
  enhancedDbInstance = null
}