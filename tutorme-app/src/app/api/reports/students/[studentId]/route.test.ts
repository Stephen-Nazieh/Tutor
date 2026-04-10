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

describe('GET /api/reports/students/[studentId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/reports/students/s1')

    const res = await GET(
      req as NextRequest,
      { params: Promise.resolve({ studentId: 's1' }) } as any
    )

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('returns 410 when studentId param is missing (legacy feature removed)', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'parent-1', role: 'PARENT' },
    })
    const req = new Request('http://localhost/api/reports/students')

    const res = await GET(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(410)
    const json = await res.json()
    expect(json.error).toBe('Legacy feature removed')
    expect(json.message).toContain('redesigned')
  })
})
