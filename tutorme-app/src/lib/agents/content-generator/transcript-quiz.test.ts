import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  generateWithFallback: vi.fn(),
}))

vi.mock('@/lib/agents/orchestrator-llm', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

import { generateTranscriptQuiz } from './index'

describe('content generator transcript quiz', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('parses and returns transcript quiz questions', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: JSON.stringify({
        questions: [
          { type: 'multiple_choice', question: 'Q1', options: ['A', 'B'], answer: 'A' },
          { type: 'short_answer', question: 'Q2', rubric: 'R' },
          { type: 'short_answer', question: 'Q3', rubric: 'R' },
        ],
      }),
      provider: 'kimi',
      latencyMs: 10,
    })

    const res = await generateTranscriptQuiz({
      transcript: 't',
      grade: 8,
      weakAreas: [],
      subject: 'general',
    })

    expect(res.questions).toHaveLength(3)
    expect(res.provider).toBe('kimi')
  })

  it('throws when AI output is not valid JSON', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: 'not-json',
      provider: 'kimi',
      latencyMs: 10,
    })

    await expect(
      generateTranscriptQuiz({ transcript: 't', grade: 8, weakAreas: [] })
    ).rejects.toThrow(/valid transcript quiz format/i)
  })
})
