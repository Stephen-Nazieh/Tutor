import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  generateWithFallback: vi.fn(),
}))

vi.mock('@/lib/agents', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

import { generateCourseDescription } from './curriculum-service'

describe('curriculum-service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns trimmed description and provider', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: ' A short description. ',
      provider: 'kimi',
      latencyMs: 10,
    })

    const res = await generateCourseDescription({ subject: 'Math', gradeLevel: '8', difficulty: 'easy' })
    expect(res.description).toBe('A short description.')
    expect(res.provider).toBe('kimi')
  })
})

