import { describe, expect, it, vi, beforeEach } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  withRateLimitPreset: vi.fn(),
  handleApiError: vi.fn(),
  getServerSession: vi.fn(),
  getSessionForRealm: vi.fn(),
  adkPciMasterChat: vi.fn(),
  generateWithFallback: vi.fn(),
  sanitizeAiInput: vi.fn(),
  validateAiResponse: vi.fn(),
}))

vi.mock('@/lib/api/middleware', () => ({
  withRateLimitPreset: mocks.withRateLimitPreset,
  handleApiError: mocks.handleApiError,
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  getSessionForRealm: mocks.getSessionForRealm,
  authOptions: {},
}))

vi.mock('@/lib/adk-client', () => ({
  adkPciMasterChat: mocks.adkPciMasterChat,
}))

vi.mock('@/lib/agents', () => ({
  generateWithFallback: mocks.generateWithFallback,
}))

vi.mock('@/lib/security/ai-sanitization', () => ({
  AISecurityManager: {
    sanitizeAiInput: mocks.sanitizeAiInput,
    validateAiResponse: mocks.validateAiResponse,
  },
}))

import { POST } from './route'

describe('/api/ai/pci-master', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.ADK_BASE_URL = 'http://adk.example'
    mocks.withRateLimitPreset.mockResolvedValue({ response: null })
    mocks.sanitizeAiInput.mockImplementation((msg: string) => msg)
    mocks.validateAiResponse.mockResolvedValue({ isValid: true, issues: [], severity: 'LOW' })
    mocks.adkPciMasterChat.mockResolvedValue({
      response: 'ok',
      conversationId: 'c1',
      parsed: null,
    })
    mocks.generateWithFallback.mockResolvedValue({ content: 'fallback', provider: 'kimi', latencyMs: 10 })
  })

  it('uses tutor realm session when available', async () => {
    mocks.getSessionForRealm.mockResolvedValue({ user: { id: 'tutor-1' } })
    mocks.getServerSession.mockResolvedValue(null)

    const req = new Request('http://localhost/api/ai/pci-master', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hello' }),
    })

    const res = await POST(req as unknown as NextRequest)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(mocks.adkPciMasterChat).toHaveBeenCalledWith(
      expect.objectContaining({ userId: 'tutor-1', message: 'hello' })
    )
    expect(data.response).toBe('ok')
  })

  it('returns 401 when unauthenticated', async () => {
    mocks.getSessionForRealm.mockResolvedValue(null)
    mocks.getServerSession.mockResolvedValue(null)

    const req = new Request('http://localhost/api/ai/pci-master', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'hello' }),
    })

    const res = await POST(req as unknown as NextRequest)
    expect(res.status).toBe(401)
  })
})
