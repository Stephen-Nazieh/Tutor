import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
  getAIProvidersStatus: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

vi.mock('@/lib/ai/orchestrator', () => ({
  getAIProvidersStatus: mocks.getAIProvidersStatus,
}))

import { GET } from './route'

describe('GET /api/ai/status', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 401 when session is missing', async () => {
    mocks.getServerSession.mockResolvedValue(null)

    const req = new Request('http://localhost/api/ai/status')
    const res = await GET(req as unknown as NextRequest)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('returns 403 for non-admin and non-tutor roles', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'STUDENT' },
    })

    const req = new Request('http://localhost/api/ai/status')
    const res = await GET(req as unknown as NextRequest)

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Forbidden' })
  })

  it('returns provider status for tutor/admin', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'u1', role: 'TUTOR' },
    })
    mocks.getAIProvidersStatus.mockResolvedValue([{ name: 'ollama', available: true }])

    const req = new Request('http://localhost/api/ai/status')
    const res = await GET(req as unknown as NextRequest)

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.providers).toEqual([{ name: 'ollama', available: true }])
    expect(typeof body.timestamp).toBe('string')
  })
})

