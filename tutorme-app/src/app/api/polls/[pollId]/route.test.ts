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

import { GET, PATCH, DELETE } from './route'

describe('Poll detail route auth guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.getServerSession.mockResolvedValue(null)
  })

  it('GET returns 401 when unauthenticated', async () => {
    const req = new Request('http://localhost/api/polls/p1')
    const res = await GET(req as NextRequest, { params: Promise.resolve({ pollId: 'p1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('PATCH returns 401 when unauthenticated', async () => {
    const req = new Request('http://localhost/api/polls/p1', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({}),
    })
    const res = await PATCH(req as NextRequest, { params: Promise.resolve({ pollId: 'p1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('DELETE returns 401 when unauthenticated', async () => {
    const req = new Request('http://localhost/api/polls/p1', { method: 'DELETE' })
    const res = await DELETE(req as NextRequest, { params: Promise.resolve({ pollId: 'p1' }) } as any)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('GET returns 400 when pollId param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'STUDENT' },
    })
    const req = new Request('http://localhost/api/polls')

    const res = await GET(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Poll ID required' })
  })

  it('PATCH returns 400 when pollId param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'TUTOR' },
    })
    const req = new Request('http://localhost/api/polls', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status: 'ACTIVE' }),
    })

    const res = await PATCH(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Poll ID required' })
  })

  it('DELETE returns 400 when pollId param is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'TUTOR' },
    })
    const req = new Request('http://localhost/api/polls', { method: 'DELETE' })

    const res = await DELETE(req as NextRequest, { params: Promise.resolve({}) } as any)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Poll ID required' })
  })
})
