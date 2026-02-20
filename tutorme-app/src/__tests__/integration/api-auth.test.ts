/**
 * Integration tests: auth flow (register, login, protected route).
 * Requires DATABASE_URL and running DB. Use test DB in CI: e.g. tutorme_test.
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db } from '@/lib/db'
import { POST as registerPost } from '@/app/api/auth/register/route'

const testEmail = `inttest-${Date.now()}@example.com`
const testPassword = 'Password1'
const testName = 'Integration Test User'
let createdUserId: string

describe('API Auth integration', () => {
  afterAll(async () => {
    if (createdUserId) {
      try {
        await db.profile.deleteMany({ where: { userId: createdUserId } })
        await db.user.delete({ where: { id: createdUserId } })
      } catch {
        // ignore cleanup errors
      }
    }
    await db.$disconnect()
  })

  it('registers a new user and returns 201', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: testName,
        email: testEmail,
        password: testPassword,
        role: 'STUDENT',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await registerPost(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user?.email).toBe(testEmail)
    expect(data.user?.role).toBe('STUDENT')
    createdUserId = data.user?.id
    expect(createdUserId).toBeDefined()
  })

  it('user and profile exist in database after register', async () => {
    expect(createdUserId).toBeDefined()
    const user = await db.user.findUnique({
      where: { id: createdUserId },
      include: { profile: true },
    })
    expect(user).not.toBeNull()
    expect(user?.email).toBe(testEmail)
    expect(user?.profile?.name).toBe(testName)
  })

  it('returns 400 when registering same email again', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Other',
        email: testEmail,
        password: testPassword,
        role: 'STUDENT',
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await registerPost(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })
})
