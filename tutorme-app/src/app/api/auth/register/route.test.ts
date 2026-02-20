import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'
import { db } from '@/lib/db'

const mockUser = {
  id: 'user-1',
  email: 'new@example.com',
  role: 'STUDENT',
  createdAt: new Date(),
}

vi.mock('@/lib/db', () => ({
  db: {
    user: { findUnique: vi.fn() },
    $transaction: vi.fn(),
  },
}))
vi.mock('bcryptjs', () => ({
  default: { hash: vi.fn().mockResolvedValue('hashed') },
}))

describe('POST /api/auth/register', () => {
  beforeEach(() => {
    vi.mocked(db.user.findUnique).mockResolvedValue(null)
    vi.mocked(db.$transaction).mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        user: { create: vi.fn().mockResolvedValue(mockUser) },
        profile: { create: vi.fn().mockResolvedValue({}) },
      }
      return fn(tx)
    })
  })

  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Invalid JSON')
  })

  it('returns 400 for validation failure (short password)', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'test@example.com',
        password: 'short',
        role: 'STUDENT',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 201 and user on success', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'new@example.com',
        password: 'Password1',
        role: 'STUDENT',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('new@example.com')
    expect(data.user.role).toBe('STUDENT')
  })

  it('returns 400 when email already registered', async () => {
    vi.mocked(db.user.findUnique).mockResolvedValue({ id: 'existing' } as any)

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'existing@example.com',
        password: 'Password1',
        role: 'STUDENT',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('already')
  })
})
