/**
 * Unit tests for GET /api/curriculums/catalog (reference data for course creation).
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  selectItems: [] as Array<{ id: string; subject: string; name: string; code: string; createdAt: Date }>,
  handleApiError: vi.fn((error: unknown) => {
    throw error
  }),
}))

vi.mock('@/lib/api/middleware', () => ({
  handleApiError: mocks.handleApiError,
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => ({
      from: () => ({
        where: () => ({
          orderBy: () => Promise.resolve(mocks.selectItems),
        }),
        orderBy: () => Promise.resolve(mocks.selectItems),
      }),
    })),
  },
}))

import { GET } from './route'

describe('GET /api/curriculums/catalog', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectItems = [
      { id: 'cat1', subject: 'english', name: 'IELTS', code: 'ielts', createdAt: new Date('2026-01-01') },
      { id: 'cat2', subject: 'english', name: 'TOEFL', code: 'toefl', createdAt: new Date('2026-01-02') },
    ]
  })

  it('returns 200 and catalog entries', async () => {
    const req = new Request('http://localhost/api/curriculums/catalog')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data.curriculums)).toBe(true)
    expect(data.curriculums).toHaveLength(2)
    expect(data.curriculums[0]).toMatchObject({ subject: 'english', name: 'IELTS' })
  })

  it('supports subject filter query param', async () => {
    const req = new Request('http://localhost/api/curriculums/catalog?subject=english')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.curriculums).toHaveLength(2)
  })
})

