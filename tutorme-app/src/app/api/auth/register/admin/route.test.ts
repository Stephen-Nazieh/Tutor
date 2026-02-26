import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  userCount: vi.fn(),
  userFindUnique: vi.fn(),
  transaction: vi.fn(),
  rateLimitPreset: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  db: {
    user: {
      count: mocks.userCount,
      findUnique: mocks.userFindUnique,
    },
    $transaction: mocks.transaction,
  },
}))

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
    mocks.userFindUnique.mockResolvedValue(null)
    mocks.transaction.mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => {
      const tx = {
        user: {
          create: vi.fn().mockResolvedValue({
            id: 'admin-1',
            email: 'admin@example.com',
            role: 'ADMIN',
            createdAt: new Date(),
          }),
        },
        profile: { create: vi.fn().mockResolvedValue({}) },
        adminRole: { findUnique: vi.fn().mockResolvedValue(null), findFirst: vi.fn().mockResolvedValue(null) },
        adminAssignment: { create: vi.fn().mockResolvedValue({}) },
      }
      return fn(tx)
    })
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
    mocks.userCount.mockResolvedValue(1)

    // Explicitly disable public registration for this test
    const prevAllowPublic = process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION
    process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION = 'false'

    const req = new Request('http://localhost/api/auth/register/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(req as unknown as NextRequest)

    // Restore env
    if (prevAllowPublic === undefined) {
      delete process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION
    } else {
      process.env.ADMIN_ALLOW_PUBLIC_REGISTRATION = prevAllowPublic
    }

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Admin bootstrap is closed' })
  })

  it('returns 403 when bootstrap key is required and missing', async () => {
    mocks.userCount.mockResolvedValue(0)
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
    mocks.userCount.mockResolvedValue(0)
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
