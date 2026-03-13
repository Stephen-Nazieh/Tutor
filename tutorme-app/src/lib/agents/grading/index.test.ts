import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  generateWithFallback: vi.fn(),
  getStudent: vi.fn(),
}))

vi.mock('../orchestrator', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

vi.mock('../shared-data', () => ({
  getStudent: mocks.getStudent,
}))

import { gradeEssay, gradeMathProblem } from './index'

describe('grading agent fallbacks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns a safe fallback when essay grading JSON is invalid', async () => {
    mocks.getStudent.mockResolvedValue({
      id: 'u1',
      name: 'Student',
      email: 'student@example.com',
      grade: 'Grade 5',
      subjects: [],
      learningStyle: 'mixed',
      currentLevel: 'beginner',
      xp: 0,
      streak: 0,
      achievements: [],
      lastActive: new Date(),
    })

    mocks.generateWithFallback.mockResolvedValue({
      content: 'not-json',
      provider: 'kimi',
      latencyMs: 10,
    })

    const result = await gradeEssay('Explain gravity', ['Clarity', 'Accuracy'], 'My essay', 10, 'u1')
    expect(result.totalScore).toBe(0)
    expect(result.isPassing).toBe(false)
    expect(result.overallFeedback).toContain('Unable to auto-grade')
  })

  it('returns a safe fallback when math grading JSON is invalid', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: 'not-json',
      provider: 'kimi',
      latencyMs: 10,
    })

    const result = await gradeMathProblem('2+2', '4', ['Add'], '5', 5)
    expect(result.score).toBe(0)
    expect(result.finalAnswerCorrect).toBe(false)
    expect(result.feedback).toContain('Unable to auto-grade')
  })
})
