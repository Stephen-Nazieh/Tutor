/**
 * Unit tests for GET /api/curriculums/list (public catalogue, rate limited).
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  withRateLimit: vi.fn(),
  handleApiError: vi.fn((error: unknown) => {
    throw error
  }),
  selectCall: 0,
  curriculums: [] as Array<{
    id: string
    name: string
    subject: string
    description: string | null
    difficulty: string
    estimatedHours: number
    price: number
    currency: string
    gradeLevel: string | null
    createdAt: Date
  }>,
  modulesRaw: [] as Array<{ curriculumId: string; count: number }>,
  enrollmentsRaw: [] as Array<{ curriculumId: string; count: number }>,
  allModules: [] as Array<{ id: string; curriculumId: string }>,
  lessonsRaw: [] as Array<{ moduleId: string; count: number }>,
}))

vi.mock('@/lib/api/middleware', () => ({
  withRateLimit: mocks.withRateLimit,
  handleApiError: mocks.handleApiError,
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => {
      mocks.selectCall += 1
      switch (mocks.selectCall) {
        case 1:
          return {
            from: () => ({
              where: () => ({
                orderBy: () => Promise.resolve(mocks.curriculums),
              }),
            }),
          }
        case 2:
          return {
            from: () => ({
              where: () => ({
                groupBy: () => Promise.resolve(mocks.modulesRaw),
              }),
            }),
          }
        case 3:
          return {
            from: () => ({
              where: () => ({
                groupBy: () => Promise.resolve(mocks.enrollmentsRaw),
              }),
            }),
          }
        case 4:
          return {
            from: () => ({
              where: () => Promise.resolve(mocks.allModules),
            }),
          }
        case 5:
          return {
            from: () => ({
              where: () => ({
                groupBy: () => Promise.resolve(mocks.lessonsRaw),
              }),
            }),
          }
        default:
          return {
            from: () => ({
              where: () => Promise.resolve([]),
            }),
          }
      }
    }),
  },
}))

import { GET } from './route'

describe('GET /api/curriculums/list', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectCall = 0
    mocks.withRateLimit.mockResolvedValue({ response: null })
    mocks.curriculums = [
      {
        id: 'c1',
        name: 'Math 101',
        subject: 'math',
        description: null,
        difficulty: 'beginner',
        estimatedHours: 10,
        price: 100,
        currency: 'USD',
        gradeLevel: 'G8',
        createdAt: new Date('2026-01-01'),
      },
    ]
    mocks.modulesRaw = [{ curriculumId: 'c1', count: 2 }]
    mocks.enrollmentsRaw = [{ curriculumId: 'c1', count: 5 }]
    mocks.allModules = [
      { id: 'm1', curriculumId: 'c1' },
      { id: 'm2', curriculumId: 'c1' },
    ]
    mocks.lessonsRaw = [
      { moduleId: 'm1', count: 3 },
      { moduleId: 'm2', count: 2 },
    ]
  })

  it('returns 200 and list of enriched published curriculums', async () => {
    const req = new Request('http://localhost/api/curriculums/list')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data.curriculums)).toBe(true)
    expect(data.curriculums).toHaveLength(1)
    expect(data.curriculums[0]).toMatchObject({
      id: 'c1',
      name: 'Math 101',
      subject: 'math',
      modulesCount: 2,
      lessonsCount: 5,
      studentCount: 5,
    })
  })

  it('normalizes subject aliases and still returns data', async () => {
    const req = new Request('http://localhost/api/curriculums/list?subject=mathematics')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.curriculums).toHaveLength(1)
    expect(mocks.withRateLimit).toHaveBeenCalled()
  })

  it('returns empty list when no curriculum is found', async () => {
    mocks.curriculums = []
    const req = new Request('http://localhost/api/curriculums/list')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ curriculums: [] })
    expect(mocks.selectCall).toBe(1)
  })
})

