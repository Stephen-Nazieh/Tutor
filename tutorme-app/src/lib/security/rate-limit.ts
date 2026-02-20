/**
 * Rate limiting for API routes.
 * Uses Redis when REDIS_URL is set (shared across instances); otherwise in-memory store.
 */

const DEFAULT_WINDOW_MS = 60 * 1000 // 1 minute
const DEFAULT_MAX = 100 // requests per window per key
const REDIS_PREFIX = 'ratelimit:'

interface Entry {
  count: number
  resetAt: number
}

interface RateLimitOptions {
  max: number
  windowMs?: number
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

const memoryStore = new Map<string, Entry>()

function prune(): void {
  const now = Date.now()
  for (const [key, entry] of memoryStore.entries()) {
    if (entry.resetAt < now) memoryStore.delete(key)
  }
}

function checkRateLimitMemory(
  key: string,
  options: RateLimitOptions
): RateLimitResult {
  const { windowMs, max } = options
  const now = Date.now()
  if (memoryStore.size > 10000) prune()
  let entry = memoryStore.get(key)
  if (!entry || entry.resetAt < now) {
    entry = { count: 0, resetAt: now + windowMs }
    memoryStore.set(key, entry)
  }
  entry.count += 1
  const allowed = entry.count <= max
  const remaining = Math.max(0, max - entry.count)
  return { allowed, remaining, resetAt: entry.resetAt }
}

let redisClient: import('ioredis').Redis | null = null
let redisInitPromise: Promise<import('ioredis').Redis | null> | null = null

async function getRedisClient(): Promise<import('ioredis').Redis | null> {
  if (redisClient) return redisClient
  if (typeof window !== 'undefined') return null // browser
  const url = process.env.REDIS_URL
  if (!url) return null
  if (!redisInitPromise) {
    redisInitPromise = (async () => {
      try {
        const { Redis } = await import('ioredis')
        const client = new Redis(url, {
          retryStrategy: (times) => Math.min(times * 50, 2000),
          maxRetriesPerRequest: 3,
        })
        client.on('error', () => {})
        redisClient = client
        return client
      } catch {
        return null
      }
    })()
  }
  return redisInitPromise
}

async function checkRateLimitRedis(
  key: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const redis = await getRedisClient()
  if (!redis) return checkRateLimitMemory(key, options)

  const { windowMs, max } = options
  const now = Date.now()
  const fullKey = REDIS_PREFIX + key
  const ttlSeconds = Math.ceil(windowMs / 1000)

  try {
    const raw = await redis.get(fullKey)
    let entry: Entry
    if (!raw) {
      entry = { count: 1, resetAt: now + windowMs }
    } else {
      try {
        entry = JSON.parse(raw) as Entry
        if (entry.resetAt < now) {
          entry = { count: 1, resetAt: now + windowMs }
        } else {
          entry.count += 1
        }
      } catch {
        entry = { count: 1, resetAt: now + windowMs }
      }
    }
    await redis.setex(fullKey, ttlSeconds, JSON.stringify(entry))
    const allowed = entry.count <= max
    const remaining = Math.max(0, max - entry.count)
    return { allowed, remaining, resetAt: entry.resetAt }
  } catch {
    return checkRateLimitMemory(key, options)
  }
}

/**
 * Check rate limit. Returns { allowed, remaining, resetAt }.
 * Uses Redis when REDIS_URL is set; otherwise in-memory (per instance).
 * key: typically prefix + IP (e.g. "login:" + getClientIdentifier(req))
 */
export async function checkRateLimit(
  key: string,
  maxOrOptions: number | RateLimitOptions = DEFAULT_MAX
): Promise<RateLimitResult> {
  const options: RateLimitOptions =
    typeof maxOrOptions === 'number'
      ? { max: maxOrOptions, windowMs: DEFAULT_WINDOW_MS }
      : { windowMs: DEFAULT_WINDOW_MS, ...maxOrOptions }

  if (process.env.REDIS_URL) {
    return checkRateLimitRedis(key, options)
  }
  return checkRateLimitMemory(key, options)
}

/** Presets for sensitive routes (stricter limits) */
export const RATE_LIMIT_PRESETS = {
  /** Login: 10 attempts per 15 minutes per IP */
  login: { max: 10, windowMs: 15 * 60 * 1000 },
  /** Signup/register: 5 attempts per 15 minutes per IP */
  register: { max: 5, windowMs: 15 * 60 * 1000 },
  /** Payment create: 20 per minute per IP */
  paymentCreate: { max: 20, windowMs: 60 * 1000 },
  /** Enroll (subject or curriculum): 30 per minute per IP */
  enroll: { max: 30, windowMs: 60 * 1000 },
  /** Class booking: 20 per minute per IP */
  booking: { max: 20, windowMs: 60 * 1000 },
} as const

/**
 * Check rate limit using a named preset. Key will be prefixed with the preset name.
 */
export async function checkRateLimitPreset(
  req: Request,
  preset: keyof typeof RATE_LIMIT_PRESETS
): Promise<RateLimitResult> {
  const ip = getClientIdentifier(req)
  const key = `${preset}:${ip}`
  const options = RATE_LIMIT_PRESETS[preset]
  return checkRateLimit(key, options)
}

/**
 * Get client identifier for rate limiting (IP or x-forwarded-for).
 */
export function getClientIdentifier(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') ?? 'unknown'
  return ip
}
