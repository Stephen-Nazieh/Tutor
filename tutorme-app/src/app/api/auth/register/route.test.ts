import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  selectQueue: [] as unknown[][],
  checkRateLimit: vi.fn(),
  getClientIdentifier: vi.fn(),
  verifyAllChildren: vi.fn(),
  isStudentAlreadyLinked: vi.fn(),
  hash: vi.fn(),
  transaction: vi.fn(),
}))

vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('mocknanoid12'),
}))

vi.mock('bcryptjs', () => ({
  default: {
    hash: mocks.hash,
  },
}))

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimit: mocks.checkRateLimit,
  getClientIdentifier: mocks.getClientIdentifier,
  RATE_LIMIT_PRESETS: {
    register: { max: 12, windowMs: 900000 },
  },
}))

vi.mock('@/lib/security/parent-child-queries', () => ({
  verifyAllChildren: mocks.verifyAllChildren,
  isStudentAlreadyLinked: mocks.isStudentAlreadyLinked,
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => ({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockImplementation(() => Promise.resolve(mocks.selectQueue.shift() ?? [])),
        }),
      }),
    })),
    transaction: vi.fn().mockImplementation((fn: (tx: any) => Promise<unknown>) => mocks.transaction(fn)),
  },
}))

import { POST } from './route'

describe('POST /api/auth/register', () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.clearAllMocks()
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    mocks.selectQueue = []
    mocks.hash.mockResolvedValue('hashed-password')
    mocks.getClientIdentifier.mockReturnValue('ip:test')
    mocks.checkRateLimit.mockResolvedValue({ allowed: true, remaining: 10, resetAt: Date.now() + 60000 })
    mocks.verifyAllChildren.mockResolvedValue({ verified: new Map(), errors: [] })
    mocks.isStudentAlreadyLinked.mockResolvedValue(false)
    mocks.transaction.mockImplementation(async (fn: (tx: any) => Promise<unknown>) => {
      const tx = {
        insert: vi.fn().mockReturnValue({
          values: vi.fn().mockResolvedValue(undefined),
        }),
        update: vi.fn().mockReturnValue({
          set: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(undefined),
          }),
        }),
        select: vi.fn().mockReturnValue({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue([]),
            }),
          }),
        }),
      }
      return fn(tx)
    })
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: 'not-json',
      headers: { 'Content-Type': 'application/json' },
    })

    const res = await POST(req as NextRequest)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid JSON in request body' })
  })

  it('returns 400 for schema validation failure', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@example.com',
        password: 'short',
        name: 'Student User',
        role: 'STUDENT',
      }),
    })

    const res = await POST(req as NextRequest)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(typeof data.error).toBe('string')
    expect(data.error).toContain('Password')
  })

  it('returns 400 when email is already registered', async () => {
    mocks.selectQueue = [[{ id: 'existing-user' }]]

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@example.com',
        password: 'Password123',
        name: 'Student User',
        role: 'STUDENT',
        tosAccepted: true,
      }),
    })

    const res = await POST(req as NextRequest)
    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Email already registered' })
  })

  it('returns 201 for successful student registration', async () => {
    mocks.selectQueue = [[], [{ studentUniqueId: 'STU-abc123456789' }]]

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'student@example.com',
        password: 'Password123',
        name: 'Student User',
        role: 'STUDENT',
        tosAccepted: true,
      }),
    })

    const res = await POST(req as NextRequest)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('student@example.com')
    expect(data.user.role).toBe('STUDENT')
    expect(data.user.studentUniqueId).toBe('STU-abc123456789')
    expect(mocks.hash).toHaveBeenCalled()
    expect(mocks.transaction).toHaveBeenCalledTimes(1)
  })
})
