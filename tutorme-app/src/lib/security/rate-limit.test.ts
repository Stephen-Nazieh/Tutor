import { describe, it, expect } from 'vitest'
import { checkRateLimit, getClientIdentifier } from './rate-limit'

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
      const allowedCount = results.filter((r) => r.allowed).length
      expect(allowedCount).toBe(max)
      expect(results.filter((r) => !r.allowed).length).toBe(concurrency - max)
    })
  })

  describe('getClientIdentifier', () => {
    it('uses x-forwarded-for when present', () => {
      const req = new Request('http://x', {
        headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' },
      })
      expect(getClientIdentifier(req)).toBe('1.2.3.4')
    })

    it('uses x-real-ip when no forwarded-for', () => {
      const req = new Request('http://x', {
        headers: { 'x-real-ip': '9.9.9.9' },
      })
      expect(getClientIdentifier(req)).toBe('9.9.9.9')
    })

    it('returns unknown when no IP headers', () => {
      const req = new Request('http://x')
      expect(getClientIdentifier(req)).toBe('unknown')
    })
  })
})
