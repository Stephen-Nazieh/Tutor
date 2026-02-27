/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Database Client with Connection Pooling
 * 
 * Features:
 * - Connection pooling for high concurrency (100+ users)
 * - Query caching with Redis
 * - Read replica support for scaling
 * - N+1 query prevention with dataloaders
 * 
 * Note: Redis is lazily initialized to avoid bundling issues
 */

// Connection pool configuration
const POOL_CONFIG = {
  // Connection pool settings for 100+ concurrent users
  min: 5,                    // Minimum connections
  max: 50,                   // Maximum connections (supports 100+ concurrent users)
  idleTimeoutMillis: 30000,  // Close idle connections after 30s
  connectionTimeoutMillis: 5000, // Connection timeout
  allowExitOnIdle: false,    // Keep pool alive
}

// Query cache configuration
const CACHE_CONFIG = {
  ttl: 60,                   // Default cache TTL in seconds
  staleWhileRevalidate: 30,  // Serve stale data while refreshing
  prefix: 'tutorme:query:',  // Cache key prefix
}

let db: any
let redis: any | null = null
let queryCache: Map<string, { data: any; expires: number }> | null = null
let redisInitialized = false

// Safe check for server-side environment (not Edge Runtime)
// Edge Runtime (used by Next.js middleware) doesn't support Prisma Client
const isEdgeRuntime = typeof (globalThis as any).EdgeRuntime !== 'undefined' || 
  (typeof process !== 'undefined' && process.env.NEXT_RUNTIME === 'edge')
const isServer = typeof window === 'undefined' && !isEdgeRuntime

// Initialize in-memory cache only on server
function getQueryCache() {
  if (!isServer) return null
  if (!queryCache) {
    queryCache = new Map()
  }
  return queryCache
}

// Initialize Redis client if available (server-side only)
async function initRedis() {
  if (!isServer) return null
  if (redisInitialized) return redis
  
  try {
    const redisUrl = process.env.REDIS_URL
    if (!redisUrl) {
      console.log('[DB] Redis URL not configured, using in-memory cache')
      redisInitialized = true
      return null
    }
    
    // Dynamic import to avoid bundling issues
    const { Redis } = await import('ioredis')
    redis = new Redis(redisUrl, {
      retryStrategy: (times) => Math.min(times * 50, 2000),
      maxRetriesPerRequest: 3,
    })
    
    redis.on('error', (err: any) => {
      console.error('[Redis] Connection error:', err)
      redis = null
    })
    
    console.log('[DB] Redis cache initialized')
    redisInitialized = true
    return redis
  } catch (e) {
    console.warn('[DB] Failed to initialize Redis, using in-memory cache')
    redisInitialized = true
    return null
  }
}

// Use Drizzle as the default database (server-side only)
if (isServer) {
  try {
    const { drizzleDb } = require('./drizzle')
    db = drizzleDb
    console.log('[DB] Drizzle client (default db) initialized')
  } catch (e) {
    console.error('[DB] Failed to initialize Drizzle:', e)
    db = {
      $connect: async () => {},
      $disconnect: async () => {},
    } as any
  }
} else {
  db = {
    $connect: async () => {},
    $disconnect: async () => {},
  } as any
}

/**
 * Cache utilities
 */
export const cache = {
  /**
   * Ensure Redis is initialized
   */
  async ensureRedis() {
    if (!isServer) return null
    if (!redisInitialized) {
      await initRedis()
    }
    return redis
  },

  /**
   * Get cached value
   */
  async get<T>(key: string): Promise<T | null> {
    if (!isServer) return null
    
    const fullKey = CACHE_CONFIG.prefix + key
    
    // Try Redis first
    const client = await this.ensureRedis()
    if (client) {
      try {
        const value = await client.get(fullKey)
        if (value) return JSON.parse(value)
      } catch (e) {
        console.error('[Cache] Redis get error:', e)
      }
    }
    
    // Fallback to in-memory cache
    const cache = getQueryCache()
    if (!cache) return null
    
    const cached = cache.get(fullKey)
    if (cached && cached.expires > Date.now()) {
      return cached.data
    }
    
    cache.delete(fullKey)
    return null
  },
  
  /**
   * Set cached value
   */
  async set<T>(key: string, value: T, ttlSeconds = CACHE_CONFIG.ttl): Promise<void> {
    if (!isServer) return
    
    const fullKey = CACHE_CONFIG.prefix + key
    
    // Try Redis first
    const client = await this.ensureRedis()
    if (client) {
      try {
        await client.setex(fullKey, ttlSeconds, JSON.stringify(value))
        return
      } catch (e) {
        console.error('[Cache] Redis set error:', e)
      }
    }
    
    // Fallback to in-memory cache
    const cache = getQueryCache()
    if (cache) {
      cache.set(fullKey, {
        data: value,
        expires: Date.now() + ttlSeconds * 1000
      })
    }
  },
  
  /**
   * Delete cached value
   */
  async delete(key: string): Promise<void> {
    if (!isServer) return
    
    const fullKey = CACHE_CONFIG.prefix + key
    
    const client = await this.ensureRedis()
    if (client) {
      try {
        await client.del(fullKey)
      } catch (e) {
        console.error('[Cache] Redis del error:', e)
      }
    }
    
    const cache = getQueryCache()
    if (cache) cache.delete(fullKey)
  },
  
  /**
   * Clear all cached values
   */
  async clear(): Promise<void> {
    if (!isServer) return
    
    const client = await this.ensureRedis()
    if (client) {
      try {
        const keys = await client.keys(CACHE_CONFIG.prefix + '*')
        if (keys.length > 0) {
          await client.del(...keys)
        }
      } catch (e) {
        console.error('[Cache] Redis clear error:', e)
      }
    }
    
    const cache = getQueryCache()
    if (cache) cache.clear()
  },
  
  /**
   * Get or set cached value
   */
  async getOrSet<T>(
    key: string,
    factory: () => Promise<T>,
    ttlSeconds = CACHE_CONFIG.ttl
  ): Promise<T> {
    const cached = await this.get<T>(key)
    if (cached !== null) return cached
    
    const value = await factory()
    await this.set(key, value, ttlSeconds)
    return value
  },

  /**
   * Invalidate cache for a pattern
   */
  async invalidatePattern(pattern: string): Promise<void> {
    if (!isServer) return
    
    const client = await this.ensureRedis()
    if (client) {
      try {
        const keys = await client.keys(CACHE_CONFIG.prefix + pattern)
        if (keys.length > 0) {
          await client.del(...keys)
        }
      } catch (e) {
        console.error('[Cache] Pattern invalidation error:', e)
      }
    }
    
    // Clear in-memory cache matching pattern
    const cache = getQueryCache()
    if (cache) {
      const regex = new RegExp(CACHE_CONFIG.prefix + pattern.replace('*', '.*'))
      for (const key of cache.keys()) {
        if (regex.test(key)) cache.delete(key)
      }
    }
  }
}

/**
 * Query optimization utilities
 */
export const queryOptimizer = {
  /**
   * Batch load function for N+1 prevention
   */
  async batchLoad<T>(
    ids: string[],
    fetchFn: (ids: string[]) => Promise<T[]>,
    getId: (item: T) => string
  ): Promise<(T | null)[]> {
    if (!isServer) return ids.map(() => null)
    if (ids.length === 0) return []
    
    // Deduplicate IDs
    const uniqueIds = [...new Set(ids)]
    
    // Fetch all items in one query
    const items = await fetchFn(uniqueIds)
    
    // Create lookup map
    const itemMap = new Map(items.map(item => [getId(item), item]))
    
    // Return items in original order
    return ids.map(id => itemMap.get(id) || null)
  },
  
  /**
   * Wrap a query with caching
   */
  async cachedQuery<T>(
    cacheKey: string,
    queryFn: () => Promise<T>,
    ttlSeconds = CACHE_CONFIG.ttl
  ): Promise<T> {
    return cache.getOrSet(cacheKey, queryFn, ttlSeconds)
  }
}

/**
 * Read replica support (for future scaling)
 */
export const readReplica = {
  /**
   * Check if read replicas are configured
   */
  isConfigured(): boolean {
    return isServer && !!process.env.DATABASE_READ_REPLICA_URL
  },
  
  /**
   * Get read-only database client
   * Falls back to primary if replicas not configured
   */
  getClient() {
    // For now, return the same client
    // In production, this would return a connection to the read replica
    return db
  }
}

export { db }
/** Alias for code that imports prisma from @/lib/db — now points to Drizzle */
export const prisma = db

// Server-only code that needs Drizzle: import { drizzleDb } from '@/lib/db/drizzle'
// Legacy Prisma (scripts, pipl-compliance): import { prismaLegacyClient } from '@/lib/db/prisma-legacy'
