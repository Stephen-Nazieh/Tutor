import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {},
}))

import { GET } from './route'

describe('Student quiz detail route guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/student/quizzes/q1')

    const res = await GET(req as NextRequest, { params: Promise.resolve({ id: 'q1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('returns 400 when quiz id is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'student-1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/student/quizzes')

    const res = await GET(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Quiz ID required' })
  })
})
