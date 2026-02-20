/**
 * Unit tests for GET /api/curriculums/catalog (reference data for course creation).
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET } from './route'

const mockCatalog = [
  { id: 'cat1', subject: 'english', name: 'IELTS', code: 'ielts', createdAt: new Date() },
  { id: 'cat2', subject: 'english', name: 'TOEFL', code: 'toefl', createdAt: new Date() },
]

vi.mock('@/lib/db', () => ({
  db: {
    curriculumCatalog: {
      findMany: vi.fn(),
    },
  },
}))

describe('GET /api/curriculums/catalog', () => {
  beforeEach(async () => {
    vi.clearAllMocks()
    const { db } = await import('@/lib/db')
    vi.mocked(db.curriculumCatalog.findMany).mockResolvedValue(mockCatalog as never)
  })

  it('returns 200 and catalog entries', async () => {
    const req = new Request('http://localhost/api/curriculums/catalog') as any
    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.curriculums).toBeDefined()
    expect(Array.isArray(data.curriculums)).toBe(true)
    expect(data.curriculums).toHaveLength(2)
    expect(data.curriculums[0]).toMatchObject({ subject: 'english', name: 'IELTS' })
  })

  it('filters by subject when query param present', async () => {
    const req = new Request('http://localhost/api/curriculums/catalog?subject=english') as any
    await GET(req)
    const { db } = await import('@/lib/db')
    expect(db.curriculumCatalog.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { subject: 'english' },
      })
    )
  })
})
