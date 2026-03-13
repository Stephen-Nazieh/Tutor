import Redis from 'ioredis'

const memory = new Map<string, { value: unknown; expiresAt: number }>()
let client: Redis | null = null
let initialized = false

async function getClient() {
  if (initialized) return client
  initialized = true
  const url = process.env.REDIS_URL
  if (!url) return null
  client = new Redis(url, { maxRetriesPerRequest: 3 })
  client.on('error', () => {
    client = null
  })
  return client
}

export async function getCache<T>(key: string): Promise<T | null> {
  const redis = await getClient()
  if (redis) {
    const value = await redis.get(key)
    return value ? (JSON.parse(value) as T) : null
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
  const redis = await getClient()
  if (redis) {
    await redis.setex(key, ttlSeconds, JSON.stringify(value))
    return
  }

  memory.set(key, { value, expiresAt: Date.now() + ttlSeconds * 1000 })
}
