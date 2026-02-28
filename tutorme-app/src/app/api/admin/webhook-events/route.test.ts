import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  requireAdminIp: vi.fn(),
  requirePermission: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/api/middleware', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api/middleware')>('@/lib/api/middleware')
  return {
    ...actual,
    requireAdminIp: mocks.requireAdminIp,
    requirePermission: mocks.requirePermission,
  }
})

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {},
}))

import { GET } from './route'

describe('GET /api/admin/webhook-events', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAdminIp.mockReturnValue(null)
    mocks.requirePermission.mockReturnValue(null)
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/admin/webhook-events')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('returns IP guard response when admin IP is rejected', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.requireAdminIp.mockReturnValue(
      NextResponse.json({ error: 'IP not allowed' }, { status: 403 })
    )

    const req = new Request('http://localhost/api/admin/webhook-events')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'IP not allowed' })
  })

  it('returns permission guard response when permission is denied', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.requirePermission.mockReturnValue(
      NextResponse.json({ error: 'Missing permission' }, { status: 403 })
    )

    const req = new Request('http://localhost/api/admin/webhook-events')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Missing permission' })
  })
})
