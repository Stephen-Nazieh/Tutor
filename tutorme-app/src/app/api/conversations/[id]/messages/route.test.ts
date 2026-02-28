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

import { GET, POST } from './route'

describe('Conversation messages route guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/conversations/c1/messages')

    const res = await GET(req as NextRequest, { params: Promise.resolve({ id: 'c1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized - Please log in' })
  })

  it('GET returns 400 when conversation id is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/conversations/messages')

    const res = await GET(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Conversation ID required' })
  })

  it('POST returns 400 when conversation id is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'user-1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/conversations/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content: 'Hi' }),
    })

    const res = await POST(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Conversation ID required' })
  })
})
