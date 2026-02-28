import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  session: {
    user: { id: 'tutor-1', role: 'TUTOR', name: 'Tutor One' },
  },
  selectResults: [] as unknown[][],
  updateWhere: vi.fn().mockResolvedValue(undefined),
  deleteWhere: vi.fn().mockResolvedValue(undefined),
}))

vi.mock('@/lib/api/middleware', () => ({
  withAuth: (handler: (...args: unknown[]) => Promise<Response> | Response) => {
    return (req: NextRequest, context?: { params?: Promise<Record<string, string>> }) =>
      handler(req, mocks.session, context)
  },
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => {
      const rows = mocks.selectResults.shift() ?? []
      return {
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue(rows),
            orderBy: vi.fn().mockResolvedValue(rows),
          }),
        }),
      }
    }),
    update: vi.fn().mockReturnValue({
      set: vi.fn().mockReturnValue({
        where: mocks.updateWhere,
      }),
    }),
    delete: vi.fn().mockReturnValue({
      where: mocks.deleteWhere,
    }),
    transaction: vi.fn().mockImplementation(async (cb: (tx: unknown) => Promise<void>) => cb({
      update: vi.fn().mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(undefined),
        }),
      }),
    })),
  },
}))

import { DELETE, PUT } from './route'

describe('/api/whiteboards/[id]/pages/[pageId] ownership guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectResults = []
  })

  it('PUT returns 404 when page does not belong to the whiteboard', async () => {
    mocks.selectResults = [
      [{ id: 'wb-1', tutorId: 'tutor-1' }],
      [],
    ]
    const req = new Request('http://localhost/api/whiteboards/wb-1/pages/page-x', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name: 'Updated Page' }),
    })

    const res = await PUT(req as NextRequest, {
      params: Promise.resolve({ id: 'wb-1', pageId: 'page-x' }),
    })

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Page not found' })
    expect(mocks.updateWhere).not.toHaveBeenCalled()
  })

  it('DELETE returns 404 when page does not belong to the whiteboard', async () => {
    mocks.selectResults = [
      [{ id: 'wb-1', tutorId: 'tutor-1' }],
      [],
    ]
    const req = new Request('http://localhost/api/whiteboards/wb-1/pages/page-x', {
      method: 'DELETE',
    })

    const res = await DELETE(req as NextRequest, {
      params: Promise.resolve({ id: 'wb-1', pageId: 'page-x' }),
    })

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Page not found' })
    expect(mocks.deleteWhere).not.toHaveBeenCalled()
  })
})
