/**
 * Unit tests for GET /api/curriculums/list (legacy stub).
 */

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

describe('GET /api/curriculums/list', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/curriculums/list')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('returns 410 when authenticated (legacy feature removed)', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/curriculums/list')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(410)
    const json = await res.json()
    expect(json.error).toBe('Legacy feature removed')
    expect(json.message).toContain('redesigned')
  })
})
