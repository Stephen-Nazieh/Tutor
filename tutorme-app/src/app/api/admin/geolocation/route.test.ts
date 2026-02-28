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
    vi.restoreAllMocks()
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

  it('GET returns 400 for invalid IPv4 octets', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    const req = makeNextRequest('http://localhost/api/admin/geolocation?ip=999.1.1.1')

    const res = await GET(req)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Invalid IP format' })
  })

  it('GET treats only RFC1918 172.16-31 as private', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })

    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        status: 'success',
        lat: 1,
        lon: 2,
        city: 'City',
        country: 'Country',
        regionName: 'Region',
      }),
    } as Response)

    const privateReq = makeNextRequest('http://localhost/api/admin/geolocation?ip=172.20.0.1')
    const privateRes = await GET(privateReq)
    expect(privateRes.status).toBe(200)
    expect(fetchSpy).not.toHaveBeenCalled()

    const publicReq = makeNextRequest('http://localhost/api/admin/geolocation?ip=172.15.0.1')
    const publicRes = await GET(publicReq)
    expect(publicRes.status).toBe(200)
    expect(fetchSpy).toHaveBeenCalledTimes(1)
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

  it('POST returns invalidIps list when one or more IPs are malformed', async () => {
    mocks.getServerSession.mockResolvedValue({
      user: { id: 'admin-1', role: 'ADMIN' },
    })
    const req = makeNextRequest('http://localhost/api/admin/geolocation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ ips: ['127.0.0.1', '300.1.1.1', 'abc'] }),
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(400)
    expect(body.error).toBe('Invalid IP format')
    expect(body.invalidIps).toEqual(['300.1.1.1', 'abc'])
  })
})
