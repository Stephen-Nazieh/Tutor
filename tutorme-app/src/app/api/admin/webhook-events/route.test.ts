import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAdminIp: vi.fn(),
  requireAdmin: vi.fn(),
}))

vi.mock('@/lib/api/middleware', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api/middleware')>('@/lib/api/middleware')
  return {
    ...actual,
    requireAdminIp: mocks.requireAdminIp,
  }
})

vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: mocks.requireAdmin,
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {},
}))

import { GET } from './route'

describe('GET /api/admin/webhook-events', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAdminIp.mockReturnValue(null)
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: null,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }),
    })
    const req = new Request('http://localhost/api/admin/webhook-events')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns IP guard response when admin IP is rejected', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
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
    mocks.requireAdmin.mockResolvedValue({
      session: null,
      response: new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403 }),
    })

    const req = new Request('http://localhost/api/admin/webhook-events')
    const res = await GET(req as NextRequest)

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Forbidden' })
  })
})
