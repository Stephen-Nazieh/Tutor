import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  requireAdminIp: vi.fn(),
  requirePermission: vi.fn(),
  revokeApiKey: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/api/middleware', () => ({
  requireAdminIp: mocks.requireAdminIp,
  requirePermission: mocks.requirePermission,
}))

vi.mock('@/lib/security/api-key', () => ({
  revokeApiKey: mocks.revokeApiKey,
}))

import { DELETE } from './route'

describe('DELETE /api/admin/api-keys/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAdminIp.mockReturnValue(null)
    mocks.requirePermission.mockReturnValue(null)
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/admin/api-keys/key-1', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'key-1' }) })

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns 403 for non-admin users', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'TUTOR' },
    })
    const req = new Request('http://localhost/api/admin/api-keys/key-1', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'key-1' }) })

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Admin only' })
  })

  it('returns 400 when id param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    const req = new Request('http://localhost/api/admin/api-keys', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({}) })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'API key ID required' })
  })

  it('returns 404 when key is not found', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.revokeApiKey.mockResolvedValue(false)
    const req = new Request('http://localhost/api/admin/api-keys/missing', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'missing' }) })

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Key not found' })
  })

  it('returns success when key is revoked', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.revokeApiKey.mockResolvedValue(true)
    const req = new Request('http://localhost/api/admin/api-keys/key-1', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ id: 'key-1' }) })

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })
  })
})
