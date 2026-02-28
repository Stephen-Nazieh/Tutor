import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAdmin: vi.fn(),
}))

vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: mocks.requireAdmin,
  logAdminAction: vi.fn(),
  getClientIp: vi.fn(),
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {},
}))

import { GET, POST, PATCH } from './route'

describe('/api/admin/llm/providers guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET returns requireAdmin response when unauthorized', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: null,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
    })
    const req = new Request('http://localhost/api/admin/llm/providers')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('POST returns 400 when required fields are missing', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
      response: undefined,
    })
    const req = new Request('http://localhost/api/admin/llm/providers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Name and provider type are required' })
  })

  it('PATCH returns 400 when provider id is missing', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
      response: undefined,
    })
    const req = new Request('http://localhost/api/admin/llm/providers', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'No id' }),
    })

    const res = await PATCH(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Provider ID is required' })
  })
})
