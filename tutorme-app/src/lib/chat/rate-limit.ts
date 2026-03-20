/**
 * Simple rate limiting for chat API
 * Uses in-memory store (can be upgraded to Redis for production)
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store for rate limiting
// For production with multiple instances, use Redis
const rateLimitStore = new Map<string, RateLimitEntry>()

const WINDOW_MS = 60 * 1000 // 1 minute window
const MAX_REQUESTS = 10 // 10 requests per minute

export function checkRateLimit(identifier: string): {
  allowed: boolean
  remaining: number
  resetTime: number
} {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)

  // Clean up expired entries periodically (simple cleanup)
  if (Math.random() < 0.01) {
    // 1% chance to cleanup on each request
    cleanupExpiredEntries(now)
  }

  if (!entry || now > entry.resetTime) {
    // New window
    const newEntry: RateLimitEntry = {
      count: 1,
      resetTime: now + WINDOW_MS,
    }
    rateLimitStore.set(identifier, newEntry)
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetTime: newEntry.resetTime }
  }

  if (entry.count >= MAX_REQUESTS) {
    // Rate limit exceeded
    return { allowed: false, remaining: 0, resetTime: entry.resetTime }
  }

  // Increment count
  entry.count++
  return { allowed: true, remaining: MAX_REQUESTS - entry.count, resetTime: entry.resetTime }
}

function cleanupExpiredEntries(now: number): void {
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
}

// Get client IP from request
export function getClientIdentifier(request: Request): string {
  // Try to get IP from various headers
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp
  }

  // Fallback to a cookie-based identifier or random ID
  // In production, you'd want to use a session ID or similar
  return 'anonymous'
}
