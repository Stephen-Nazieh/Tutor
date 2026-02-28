import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {},
}))

import { POST } from './route'

describe('POST /api/student/assignments/[taskId]/submit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/student/assignments/task-1/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })

    const res = await POST(
      req as NextRequest,
      { params: Promise.resolve({ taskId: 'task-1' }) } as any
    )

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns 400 when taskId param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'student-1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/student/assignments/submit', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ answers: {}, timeSpent: 10 }),
    })

    const res = await POST(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Task ID required' })
  })
})
