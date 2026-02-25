import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  findFirst: vi.fn(),
  updateUser: vi.fn(),
  ipWhitelistCount: vi.fn(),
  createAdminSession: vi.fn(),
  isIpWhitelisted: vi.fn(),
  getClientIp: vi.fn(),
  logAdminAction: vi.fn(),
  verifyPassword: vi.fn(),
  hashPassword: vi.fn(),
  withRateLimitPreset: vi.fn(),
  isSuspiciousIp: vi.fn(),
  logFailedLogin: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  db: {
    user: { findFirst: mocks.findFirst, update: mocks.updateUser },
    ipWhitelist: { count: mocks.ipWhitelistCount },
  },
}))

vi.mock('@/lib/admin/auth', () => ({
  createAdminSession: mocks.createAdminSession,
  isIpWhitelisted: mocks.isIpWhitelisted,
  getClientIp: mocks.getClientIp,
  logAdminAction: mocks.logAdminAction,
  verifyPassword: mocks.verifyPassword,
  hashPassword: mocks.hashPassword,
  ADMIN_TOKEN_NAME: 'admin_session',
  ADMIN_TOKEN_EXPIRY: 60 * 60 * 8,
}))

vi.mock('@/lib/api/middleware', () => ({
  withRateLimitPreset: mocks.withRateLimitPreset,
}))

vi.mock('@/lib/security/suspicious-activity', () => ({
  isSuspiciousIp: mocks.isSuspiciousIp,
  logFailedLogin: mocks.logFailedLogin,
}))

import { POST } from './route'

describe('POST /api/admin/auth/login', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.withRateLimitPreset.mockResolvedValue({ response: null, remaining: 10 })
    mocks.getClientIp.mockReturnValue('127.0.0.1')
    mocks.isSuspiciousIp.mockResolvedValue(false)
    mocks.ipWhitelistCount.mockResolvedValue(0)
    mocks.createAdminSession.mockResolvedValue('jwt-token')
    mocks.verifyPassword.mockResolvedValue(true)
    mocks.hashPassword.mockResolvedValue('migrated-hash')
  })

  it('returns 400 when password is missing', async () => {
    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Email and password are required' })
  })

  it('returns 401 and logs failed attempt for invalid credentials', async () => {
    mocks.findFirst.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      password: 'hashed-password',
      adminAssignments: [{ role: { name: 'ADMIN' } }],
      profile: { name: 'Admin' },
    })
    mocks.verifyPassword.mockResolvedValue(false)

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'wrong' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Invalid credentials' })
    expect(mocks.logFailedLogin).toHaveBeenCalledWith('127.0.0.1', 'admin@example.com')
  })

  it('returns 429 when rate-limited', async () => {
    mocks.withRateLimitPreset.mockResolvedValue({
      response: new Response(JSON.stringify({ error: 'Too many requests' },), { status: 429 }),
      remaining: 0,
    })

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Password1' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(429)
  })

  it('returns 429 for suspicious IP before auth lookup', async () => {
    mocks.isSuspiciousIp.mockResolvedValue(true)

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Password1' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(429)
    expect(await res.json()).toEqual({
      error: 'Too many failed login attempts. Please try again later.',
    })
    expect(mocks.findFirst).not.toHaveBeenCalled()
  })

  it('returns 403 when IP is not whitelisted', async () => {
    mocks.ipWhitelistCount.mockResolvedValue(1)
    mocks.isIpWhitelisted.mockResolvedValue(false)

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Password1' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Access denied from this IP address' })
  })

  it('returns 200 and sets cookie when credentials are valid', async () => {
    mocks.findFirst.mockResolvedValue({
      id: 'admin-1',
      email: 'admin@example.com',
      password: 'hashed-password',
      adminAssignments: [{ role: { name: 'ADMIN' } }],
      profile: { name: 'Admin' },
    })

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@example.com', password: 'Password1' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(mocks.createAdminSession).toHaveBeenCalledWith('admin-1', '127.0.0.1', undefined)
    const setCookie = res.headers.get('set-cookie')
    expect(setCookie).toContain('admin_session=')
  })

  it('migrates legacy plaintext admin password on successful login', async () => {
    mocks.findFirst.mockResolvedValue({
      id: 'admin-legacy',
      email: 'legacy@example.com',
      password: 'LegacyPass123',
      adminAssignments: [{ role: { name: 'ADMIN' } }],
      profile: { name: 'Legacy Admin' },
    })
    mocks.verifyPassword.mockResolvedValue(false)

    const req = new Request('http://localhost/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'legacy@example.com', password: 'LegacyPass123' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(200)
    expect(mocks.hashPassword).toHaveBeenCalledWith('LegacyPass123')
    expect(mocks.updateUser).toHaveBeenCalledWith({
      where: { id: 'admin-legacy' },
      data: { password: 'migrated-hash' },
    })
  })
})
