import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAdminIp: vi.fn(),
  requireAdmin: vi.fn(),
  revokeApiKey: vi.fn(),
}))

vi.mock('@/lib/api/middleware', () => ({
  requireAdminIp: mocks.requireAdminIp,
}))

vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: mocks.requireAdmin,
}))

vi.mock('@/lib/security/api-key', () => ({
  revokeApiKey: mocks.revokeApiKey,
}))

import { DELETE } from './route'

describe('DELETE /api/admin/api-keys/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAdminIp.mockReturnValue(null)
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: null,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }),
    })
    const req = new Request('http://localhost/api/admin/api-keys/key-1', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'key-1' }) })

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns 400 when id param is missing', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
    })
    const req = new Request('http://localhost/api/admin/api-keys', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({}) })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'API key ID required' })
  })

  it('returns 404 when key is not found', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
    })
    mocks.revokeApiKey.mockResolvedValue(false)
    const req = new Request('http://localhost/api/admin/api-keys/missing', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'missing' }) })

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Key not found' })
  })

  it('returns success when key is revoked', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
    })
    mocks.revokeApiKey.mockResolvedValue(true)
    const req = new Request('http://localhost/api/admin/api-keys/key-1', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'key-1' }) })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
  })
})
