import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  generateWithFallback: vi.fn(),
}))

vi.mock('@/lib/agents', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

import { generateCourseOutlineAsModules } from './course-materials-service'

describe('course-materials-service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('defaults missing durationMinutes in lessons', async () => {
    mocks.generateWithFallback.mockResolvedValue({
      content: JSON.stringify([
        {
          title: 'Module 1',
          lessons: [{ title: 'Lesson 1' }],
        },
      ]),
      provider: 'kimi',
      latencyMs: 10,
    })

    const res = await generateCourseOutlineAsModules({
      curriculumText: 'x',
      typicalLessonMinutes: 45,
    })

    expect(res.modules[0]?.lessons[0]?.durationMinutes).toBe(45)
    expect(res.outline).toHaveLength(1)
  })
})

