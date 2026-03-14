import { describe, expect, it, beforeEach, vi } from 'vitest'
import { GET } from './route'

describe('/api/public/test-ping', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    delete process.env.ALLOW_PUBLIC_TEST_ENDPOINTS
    delete process.env.KIMI_API_KEY
  })

  it('returns 404 in production when not explicitly enabled', async () => {
    process.env.NODE_ENV = 'production'
    const res = await GET()
    expect(res.status).toBe(404)
  })

  it('returns ok status when fetch succeeds', async () => {
    process.env.NODE_ENV = 'development'
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 200 }))
    const res = await GET()
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })
})
