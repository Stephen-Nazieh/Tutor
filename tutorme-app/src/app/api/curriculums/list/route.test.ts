/**
 * Unit tests for GET /api/curriculums/list (public catalogue, rate limited).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'

const mockCurriculums = [
  {
    id: 'c1',
    name: 'Math 101',
    subject: 'math',
    description: null,
    difficulty: 'beginner',
    estimatedHours: 10,
    createdAt: new Date(),
    _count: { modules: 2, enrollments: 5 },
    modules: [{ _count: { lessons: 3 } }, { _count: { lessons: 2 } }],
  },
]

vi.mock('@/lib/db', () => ({
  db: {
    curriculum: {
      findMany: vi.fn(),
    },
  },
}))

vi.mock('@/lib/api/middleware', () => ({
  withRateLimit: (_req: unknown, _max: number) => ({ response: null }),
}))

describe('GET /api/curriculums/list', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const { db } = await import('@/lib/db')
    vi.mocked(db.curriculum.findMany).mockResolvedValue(mockCurriculums as never)
  })

  it('returns 200 and list of published curriculums', async () => {
    const req = new Request('http://localhost/api/curriculums/list') as any
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.curriculums).toBeDefined()
    expect(Array.isArray(data.curriculums)).toBe(true)
    expect(data.curriculums).toHaveLength(1)
    expect(data.curriculums[0]).toMatchObject({
      id: 'c1',
      name: 'Math 101',
      subject: 'math',
      difficulty: 'beginner',
      estimatedHours: 10,
      modulesCount: 2,
      lessonsCount: 5,
      studentCount: 5,
    })
  })

  it('filters by subject when query param present', async () => {
    const req = new Request('http://localhost/api/curriculums/list?subject=math') as any
    await GET(req)
    const { db } = await import('@/lib/db')
    expect(db.curriculum.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { isPublished: true, subject: 'math' },
      })
    )
  })
})
