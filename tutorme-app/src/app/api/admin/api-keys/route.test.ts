import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  requireAdminIp: vi.fn(),
  requirePermission: vi.fn(),
  listApiKeys: vi.fn(),
  createApiKey: vi.fn(),
  sanitizeHtmlWithMax: vi.fn(),
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

vi.mock('@/lib/security/api-key', () => ({
  listApiKeys: mocks.listApiKeys,
  createApiKey: mocks.createApiKey,
}))

vi.mock('@/lib/security/sanitize', () => ({
  sanitizeHtmlWithMax: mocks.sanitizeHtmlWithMax,
}))

import { GET, POST } from './route'

describe('/api/admin/api-keys', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.requireAdminIp.mockReturnValue(null)
    mocks.requirePermission.mockReturnValue(null)
    mocks.sanitizeHtmlWithMax.mockImplementation((value: string) => value)
  })

  it('GET returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/admin/api-keys')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('GET returns key list for admin', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.listApiKeys.mockResolvedValue([{ id: 'k1', name: 'Key 1' }])
    const req = new Request('http://localhost/api/admin/api-keys')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ keys: [{ id: 'k1', name: 'Key 1' }] })
  })

  it('POST returns 400 when sanitized name is empty', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.sanitizeHtmlWithMax.mockReturnValue('')
    const req = new Request('http://localhost/api/admin/api-keys', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: '   ' }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'name is required' })
  })

  it('POST creates key for admin', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.createApiKey.mockResolvedValue({
      id: 'k1',
      name: 'Test Key',
      key: 'sk_live_abc',
    })
    const req = new Request('http://localhost/api/admin/api-keys', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Test Key' }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({
      id: 'k1',
      name: 'Test Key',
      key: 'sk_live_abc',
      message: 'Store the key securely; it will not be shown again.',
    })
  })
})
