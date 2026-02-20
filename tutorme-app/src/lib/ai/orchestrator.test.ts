import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { generateWithFallback } from './orchestrator'

describe('ai/orchestrator', () => {
  const originalEnv = process.env.MOCK_AI

  beforeEach(() => {
    process.env.MOCK_AI = 'true'
  })

  afterEach(() => {
    process.env.MOCK_AI = originalEnv
  })

  describe('generateWithFallback (MOCK_AI)', () => {
    it('returns mock response when MOCK_AI is true', async () => {
      const result = await generateWithFallback('Hello world')
      expect(result.content).toContain('[MOCK AI RESPONSE]')
      expect(result.content).toContain('Hello world')
      expect(result.provider).toBe('ollama')
      expect(result.latencyMs).toBeGreaterThanOrEqual(0)
    })

    it('truncates long prompt in mock content', async () => {
      const longPrompt = 'x'.repeat(3000)
      const result = await generateWithFallback(longPrompt)
      expect(result.content).toContain('[MOCK AI RESPONSE]')
      expect(result.content.length).toBeLessThanOrEqual(2100)
    })

    it('returns GenerationResult shape', async () => {
      const result = await generateWithFallback('test')
      expect(result).toHaveProperty('content')
      expect(result).toHaveProperty('provider')
      expect(result).toHaveProperty('latencyMs')
      expect(typeof result.content).toBe('string')
      expect(['ollama', 'kimi', 'zhipu']).toContain(result.provider)
    })
  })
})
