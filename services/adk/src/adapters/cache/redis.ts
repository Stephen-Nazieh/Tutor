import { Redis } from 'ioredis'

const memory = new Map<string, { value: unknown; expiresAt: number }>()
let client: Redis | null = null
let initialized = false
let useMemory = false

async function getClient(): Promise<Redis | null> {
  if (initialized) return client
  initialized = true
  
  const url = process.env.REDIS_URL
  if (!url || url.includes('localhost') || url.includes('127.0.0.1')) {
    console.log('Using in-memory cache (no Redis URL or localhost)')
    useMemory = true
    return null
  }
  
  try {
    client = new Redis(url, { 
      maxRetriesPerRequest: 1,
      connectTimeout: 5000,
      lazyConnect: true
    })
    
    await client.connect().catch(() => {
      console.log('Redis connection failed, using in-memory cache')
      useMemory = true
      client = null
    })
    
    client.on('error', () => {
      console.log('Redis error, falling back to memory cache')
      client = null
      useMemory = true
    })
    
    return client
  } catch {
    console.log('Redis initialization failed, using in-memory cache')
    useMemory = true
    return null
  }
}

export async function getCache<T>(key: string): Promise<T | null> {
  if (useMemory) {
    const entry = memory.get(key)
    if (!entry) return null
    if (Date.now() > entry.expiresAt) {
      memory.delete(key)
      return null
    }
    return entry.value as T
  }
  
  const redis = await getClient()
  if (redis) {
    try {
      const value = await redis.get(key)
      return value ? (JSON.parse(value) as T) : null
    } catch {
      useMemory = true
    }
  }
  
  const entry = memory.get(key)
  if (!entry) return null
  if (Date.now() > entry.expiresAt) {
    memory.delete(key)
    return null
  }
  return entry.value as T
}

export async function setCache<T>(key: string, value: T, ttlSeconds: number): Promise<void> {
  if (useMemory) {
    memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
    return
  }
  
  const redis = await getClient()
  if (redis) {
    try {
      await redis.setex(key, ttlSeconds, JSON.stringify(value))
      return
    } catch {
      useMemory = true
    }
  }
  
  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
}
