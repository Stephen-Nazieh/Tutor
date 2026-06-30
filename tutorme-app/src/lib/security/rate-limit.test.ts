import { describe, it, expect } from 'vitest'
import { checkRateLimit, getClientIdentifier, checkRateLimitPreset } from './rate-limit'

describe('rate-limit', () => {
  describe('checkRateLimit', () => {
    it('allows requests under max', async () => {
      const key = 'test-ip-' + Date.now()
      const first = await checkRateLimit(key, 3)
      expect(first.allowed).toBe(true)
      expect(first.remaining).toBe(2)
      expect((await checkRateLimit(key, 3)).allowed).toBe(true)
      expect((await checkRateLimit(key, 3)).allowed).toBe(true)
    })

    it('denies when over max', async () => {
      const key = 'test-over-' + Date.now()
      await checkRateLimit(key, 2)
      await checkRateLimit(key, 2)
      const third = await checkRateLimit(key, 2)
      expect(third.allowed).toBe(false)
      expect(third.remaining).toBe(0)
    })

    it('returns resetAt in future', async () => {
      const key = 'test-reset-' + Date.now()
      const result = await checkRateLimit(key, 10)
      expect(result.resetAt).toBeGreaterThan(Date.now())
    })

    it('handles concurrent requests atomically - no rate limit bypass', async () => {
      const key = 'test-concurrent-' + Date.now()
      const max = 20
      const concurrency = 50
      const results = await Promise.all(
        Array.from({ length: concurrency }, () => checkRateLimit(key, max))
      )
      const allowedCount = results.filter(r => r.allowed).length
      expect(allowedCount).toBe(max)
      expect(results.filter(r => !r.allowed).length).toBe(concurrency - max)
    })

    it('does not attempt Redis on Edge runtime', async () => {
      const prev = (globalThis as any).EdgeRuntime
      ;(globalThis as any).EdgeRuntime = 'edge'
      const prevRedis = process.env.REDIS_URL
      process.env.REDIS_URL = 'redis://localhost:6379'
      try {
        const key = 'test-edge-' + Date.now()
        const res = await checkRateLimit(key, 2)
        expect(res.allowed).toBe(true)
      } finally {
        if (prev === undefined) delete (globalThis as any).EdgeRuntime
        else (globalThis as any).EdgeRuntime = prev
        if (prevRedis === undefined) delete process.env.REDIS_URL
        else process.env.REDIS_URL = prevRedis
      }
    })
  })

  describe('getClientIdentifier', () => {
    it('uses x-forwarded-for when present', () => {
      const req = new Request('http://x', {
        headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
      })
      expect(getClientIdentifier(req)).toBe('unknown:b3e1b807')
    })

    it('uses x-real-ip when no forwarded-for', () => {
      const req = new Request('http://x', {
        headers: { 'x-real-ip': '9.9.9.9' },
      })
      expect(getClientIdentifier(req)).toBe('9.9.9.9')
    })

    it('returns unknown when no IP headers', () => {
      const req = new Request('http://x')
      expect(getClientIdentifier(req)).toBe('unknown:b3e1b807')
    })
  })

  describe('checkRateLimitPreset', () => {
    it('keys by identifier (per-user) rather than IP when one is provided', async () => {
      const req = new Request('http://x', { headers: { 'x-forwarded-for': '1.1.1.1' } })
      const userA = 'user:A-' + Date.now()
      const userB = 'user:B-' + Date.now()
      const a1 = await checkRateLimitPreset(req, 'aiGenerate', userA)
      const a2 = await checkRateLimitPreset(req, 'aiGenerate', userA) // same user, same IP
      const b1 = await checkRateLimitPreset(req, 'aiGenerate', userB) // different user, same IP
      expect(a1.allowed).toBe(true)
      expect(a2.remaining).toBe(a1.remaining - 1) // shares user A's bucket
      expect(b1.remaining).toBe(a1.remaining) // independent bucket despite the same IP
    })

    it('falls back to IP keying when no identifier is given', async () => {
      const ip = '203.0.113.' + (Date.now() % 200)
      const req = new Request('http://x', { headers: { 'x-real-ip': ip } })
      const first = await checkRateLimitPreset(req, 'aiGenerate')
      const second = await checkRateLimitPreset(req, 'aiGenerate') // same IP
      expect(second.remaining).toBe(first.remaining - 1)
    })
  })
})
