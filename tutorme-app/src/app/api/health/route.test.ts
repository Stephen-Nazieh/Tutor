import { describe, it, expect, vi, beforeEach } from 'vitest'
import { GET, POST } from './route'

vi.mock('next-auth', () => ({
  getServerSession: vi.fn().mockResolvedValue(null),
}))

vi.mock('@/lib/db', () => ({
  db: {
    $queryRaw: vi.fn().mockResolvedValue([{ version: 'PostgreSQL 16' }]),
  },
}))
vi.mock('@/lib/db/monitor', () => ({
  getHealthCheck: vi.fn().mockResolvedValue({ status: 'healthy', database: true, cache: false, latency: 1, stats: {}, issues: [] }),
  dbMonitor: { getStats: vi.fn().mockReturnValue({}), reset: vi.fn() },
}))

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 200 and status when healthy', async () => {
    const url = 'http://localhost/api/health'
    const req = { nextUrl: new URL(url) } as any

    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('healthy')
    expect(data.timestamp).toBeDefined()
    expect(data.uptime).toBeDefined()
  })

  it('does not include detailed fields when detailed is false', async () => {
    const url = 'http://localhost/api/health'
    const req = { nextUrl: new URL(url) } as any

    const res = await GET(req)
    const data = await res.json()
    expect(data.node).toBeUndefined()
  })

  it('includes detailed fields when detailed=true', async () => {
    const url = 'http://localhost/api/health?detailed=true'
    const req = { nextUrl: new URL(url) } as any

    const res = await GET(req)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('healthy')
    expect(data.node).toBeDefined()
  })
})

describe('POST /api/health', () => {
  it('returns 401 when not authenticated (admin only)', async () => {
    const req = new Request('http://localhost/api/health', { method: 'POST' }) as any
    const res = await POST(req)
    expect(res.status).toBe(401)
  })
})
