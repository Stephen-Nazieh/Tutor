import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  createAdminSession: vi.fn(),
  getClientIp: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/admin/auth', () => ({
  createAdminSession: mocks.createAdminSession,
  ADMIN_TOKEN_NAME: 'admin_session',
  ADMIN_TOKEN_EXPIRY: 86400,
  getClientIp: mocks.getClientIp,
}))

import { POST } from './route'

describe('POST /api/admin/auth/bridge', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getClientIp.mockReturnValue('127.0.0.1')
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/admin/auth/bridge', { method: 'POST' })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns 403 when user is not admin', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'TUTOR' },
    })
    const req = new Request('http://localhost/api/admin/auth/bridge', { method: 'POST' })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Forbidden' })
  })

  it('returns success and sets admin cookie for admin user', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    mocks.createAdminSession.mockResolvedValue('token-123')

    const req = new Request('http://localhost/api/admin/auth/bridge', { method: 'POST' })
    const res = await POST(req as NextRequest)

    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ success: true })

    const setCookie = res.headers.get('set-cookie') || ''
    expect(setCookie).toContain('admin_session=token-123')
  })
})
