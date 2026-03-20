import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  requireAdminIp: vi.fn(),
  requireAdmin: vi.fn(),
  listApiKeys: vi.fn(),
  createApiKey: vi.fn(),
  sanitizeHtmlWithMax: vi.fn(),
}))

vi.mock('@/lib/api/middleware', async () => {
  const actual =
    await vi.importActual<typeof import('@/lib/api/middleware')>('@/lib/api/middleware')
  return {
    ...actual,
    requireAdminIp: mocks.requireAdminIp,
  }
})

vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: mocks.requireAdmin,
}))

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
    mocks.sanitizeHtmlWithMax.mockImplementation((value: string) => value)
  })

  it('GET returns 401 when unauthenticated', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: null,
      response: new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 }),
    })
    const req = new Request('http://localhost/api/admin/api-keys')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('GET returns key list for admin', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
    })
    mocks.listApiKeys.mockResolvedValue([{ id: 'k1', name: 'Key 1' }])
    const req = new Request('http://localhost/api/admin/api-keys')

    const res = await GET(req as NextRequest)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ keys: [{ id: 'k1', name: 'Key 1' }] })
  })

  it('POST returns 400 when sanitized name is empty', async () => {
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
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
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
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
