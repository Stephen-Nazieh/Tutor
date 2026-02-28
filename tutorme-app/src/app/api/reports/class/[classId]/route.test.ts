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

describe('GET /api/reports/class/[classId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/reports/class/c1')

    const res = await GET(req as NextRequest, { params: Promise.resolve({ classId: 'c1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('returns 400 when classId param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'tutor-1', role: 'TUTOR' },
    })
    const req = new Request('http://localhost/api/reports/class')

    const res = await GET(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Class ID required' })
  })
})
