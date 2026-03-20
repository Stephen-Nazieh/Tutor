import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  checkRateLimitPreset: vi.fn(),
  buildMessages: vi.fn(),
  streamAIResponse: vi.fn(),
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/security/rate-limit', () => ({
  checkRateLimitPreset: mocks.checkRateLimitPreset,
}))

vi.mock('@/lib/chat/providers', () => ({
  buildMessages: mocks.buildMessages,
  streamAIResponse: mocks.streamAIResponse,
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

import { OPTIONS, POST } from './route'

describe('/api/chat CORS and rate limit', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.NEXT_PUBLIC_APP_URL = 'https://app.example'
    mocks.checkRateLimitPreset.mockResolvedValue({
      allowed: true,
      remaining: 10,
      resetAt: Date.now() + 60000,
    })
    mocks.buildMessages.mockReturnValue([])
    mocks.streamAIResponse.mockReturnValue(
      (async function* () {
        yield { content: 'hi', done: false }
        yield { content: '', done: true }
      })()
    )
    mocks.getServerSession.mockResolvedValue({ user: { id: 'user-1' } })
  })

  it('blocks disallowed origins on OPTIONS', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'OPTIONS',
      headers: { Origin: 'https://blocked.example' },
    })

    const res = await OPTIONS(req as unknown as NextRequest)
    expect(res.status).toBe(403)
  })

  it('allows allowed origins on OPTIONS', async () => {
    const req = new Request('http://localhost/api/chat', {
      method: 'OPTIONS',
      headers: { Origin: 'https://app.example' },
    })

    const res = await OPTIONS(req as unknown as NextRequest)
    expect(res.status).toBe(204)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://app.example')
  })

  it('returns 429 with CORS headers when rate-limited', async () => {
    mocks.checkRateLimitPreset.mockResolvedValue({
      allowed: false,
      remaining: 0,
      resetAt: Date.now() + 60000,
    })
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://app.example',
      },
      body: JSON.stringify({ message: 'hi' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(429)
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('https://app.example')
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = new Request('http://localhost/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Origin: 'https://app.example',
      },
      body: JSON.stringify({ message: 'hi' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(401)
  })
})
