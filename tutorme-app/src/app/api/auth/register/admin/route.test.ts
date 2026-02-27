import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  rateLimitPreset: vi.fn(),
  adminCount: 0,
  transactionSelectCalls: 0,
}))

vi.mock('@/lib/db/drizzle', () => {
  const chain = (resolved: unknown) => ({
    from: () => ({ where: () => ({ limit: () => Promise.resolve(resolved) }) }),
  })
  const chainThenable = (resolved: unknown) => ({
    from: () => ({ where: () => Promise.resolve(resolved) }),
  })
  return {
    drizzleDb: {
      select: vi.fn().mockImplementation((columns?: { count?: unknown }) => {
        if (columns && 'count' in columns) {
          return chainThenable([{ count: mocks.adminCount }])
        }
        return chain([])
      }),
      transaction: vi.fn().mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => {
        mocks.transactionSelectCalls = 0
        const createdUser = {
          id: 'admin-1',
          email: 'admin@example.com',
          role: 'ADMIN',
          password: 'hashed',
          emailVerified: null,
          image: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        const tx = {
          insert: () => ({
            values: () => Promise.resolve(),
          }),
          select: () => ({
            from: () => ({
              where: () => ({
                limit: () => {
                  mocks.transactionSelectCalls++
                  if (mocks.transactionSelectCalls === 1) {
                    return Promise.resolve([{ id: 'role-1' }])
                  }
                  return Promise.resolve([createdUser])
                },
              }),
            }),
          }),
        }
        return fn(tx)
      }),
    },
  }
})

vi.mock('bcryptjs', () => ({
  default: { hash: vi.fn().mockResolvedValue('hashed-password') },
}))

vi.mock('@/lib/api/middleware', () => ({
  withRateLimitPreset: mocks.rateLimitPreset,
  ValidationError: class ValidationError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ValidationError'
    }
  },
}))

import { POST } from './route'

describe('POST /api/auth/register/admin', () => {
  const originalBootstrapKey = process.env.ADMIN_BOOTSTRAP_KEY

  beforeEach(() => {
    vi.clearAllMocks()
    mocks.rateLimitPreset.mockResolvedValue({ response: null, remaining: 10 })
    mocks.adminCount = 0
    delete process.env.ADMIN_BOOTSTRAP_KEY
  })

  afterAll(() => {
    if (originalBootstrapKey === undefined) {
      delete process.env.ADMIN_BOOTSTRAP_KEY
      return
    }
    process.env.ADMIN_BOOTSTRAP_KEY = originalBootstrapKey
  })

  it('returns 400 when admin bootstrap is already closed', async () => {
    mocks.adminCount = 1
    const prevAllowPublic = process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION
    process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION = 'false'

    const req = new Request('http://localhost/api/auth/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req as unknown as NextRequest)

    if (prevAllowPublic === undefined) {
      delete process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION
    } else {
      process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION = prevAllowPublic
    }

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Admin bootstrap is closed' })
  })

  it('returns 403 when bootstrap key is required and missing', async () => {
    mocks.adminCount = 0
    process.env.ADMIN_BOOTSTRAP_KEY = 'expected-key'

    const req = new Request('http://localhost/api/auth/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Invalid bootstrap key' })
  })

  it('returns 201 when bootstrap key is valid and payload is valid', async () => {
    mocks.adminCount = 0
    process.env.ADMIN_BOOTSTRAP_KEY = 'expected-key'

    const req = new Request('http://localhost/api/auth/register/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-bootstrap-key': 'expected-key',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'Password1',
        confirmPassword: 'Password1',
        firstName: 'System',
        lastName: 'Admin',
        phoneNumber: '+8613800000000',
        organizationName: 'TutorMe',
        adminLevel: 'standard',
        permissions: ['user_management'],
        mfaEnabled: true,
        tosAccepted: true,
      }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(201)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.user.role).toBe('ADMIN')
    expect(body.user.email).toBe('admin@example.com')
  })

  it('returns 429 when rate-limited', async () => {
    mocks.rateLimitPreset.mockResolvedValue({
      response: new Response(JSON.stringify({ error: 'Too many requests' }), { status: 429 }),
      remaining: 0,
    })

    const req = new Request('http://localhost/api/auth/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(429)
  })
})
