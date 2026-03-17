import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  generateWithFallback: vi.fn(),
}))

vi.mock('@/lib/agents', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

import { gradeQuizAnswer } from './index'

describe('grading agent quiz grading', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns parsed JSON grading when model returns valid JSON', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: JSON.stringify({
        score: 8,
        confidence: 0.9,
        feedback: 'Good job',
        explanation: 'Meets rubric',
        nextSteps: ['Keep practicing'],
        relatedStruggles: [],
      }),
      provider: 'kimi',
      latencyMs: 10,
    })

    const res = await gradeQuizAnswer({
      question: 'Q',
      rubric: 'R',
      studentAnswer: 'A',
      maxScore: 10,
    })
    expect(res.score).toBe(8)
    expect(res.provider).toBe('kimi')
    expect(res.isPersonalized).toBe(false)
  })

  it('falls back safely when JSON is invalid', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: 'not-json',
      provider: 'kimi',
      latencyMs: 10,
    })

    const res = await gradeQuizAnswer({
      question: 'Q',
      rubric: 'R',
      studentAnswer: 'A',
      maxScore: 100,
    })
    expect(res.confidence).toBe(0.5)
    expect(res.explanation).toContain('Automatic grading failed')
    expect(res.provider).toBe('kimi')
  })
})

