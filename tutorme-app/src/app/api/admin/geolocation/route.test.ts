import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  getServerSession: vi.fn(),
}))

vi.mock('@/lib/auth', () => ({
  getServerSession: mocks.getServerSession,
  authOptions: {},
}))

import { GET, POST } from './route'

function makeNextRequest(url: string, init?: RequestInit): NextRequest {
  return Object.assign(new Request(url, init), { nextUrl: new URL(url) }) as NextRequest
}

describe('/api/admin/geolocation guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('GET returns 401 when unauthenticated', async () => {
    mocks.getServerSession.mockResolvedValue(null)
    const req = makeNextRequest('http://localhost/api/admin/geolocation?ip=127.0.0.1')

    const res = await GET(req)

    expect(res.status).toBe(401)
    expect(await res.json()).toEqual({ error: 'Unauthorized' })
  })

  it('GET returns 400 when ip is missing', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    const req = makeNextRequest('http://localhost/api/admin/geolocation')

    const res = await GET(req)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'IP address required' })
  })

  it('POST returns 400 when ips array is invalid', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    const req = makeNextRequest('http://localhost/api/admin/geolocation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ips: [] }),
    })

    const res = await POST(req)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'IPs array required' })
  })
})
