import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  session: {
    user: { id: 'tutor-1', role: 'TUTOR', name: 'Tutor One' },
  },
  selectResults: [] as unknown[][],
  transaction: vi.fn(),
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
            then: (resolve: (value: unknown[]) => unknown, reject?: (reason: unknown) => unknown) =>
              Promise.resolve(rows).then(resolve, reject),
          }),
        }),
      }
    }),
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
      returning: vi.fn().mockResolvedValue([]),
    }),
    transaction: mocks.transaction,
  },
}))

import { PUT } from './route'

describe('PUT /api/whiteboards/[id]/pages reorder guards', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectResults = []
    mocks.transaction.mockResolvedValue(undefined)
  })

  it('returns 400 when a page id is outside the target whiteboard', async () => {
    mocks.selectResults = [
      [{ id: 'wb-1', tutorId: 'tutor-1' }],
      [{ id: 'page-1' }],
    ]
    const req = new Request('http://localhost/api/whiteboards/wb-1/pages', {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        pageOrders: [
          { id: 'page-1', order: 0 },
          { id: 'page-outside', order: 1 },
        ],
      }),
    })

    const res = await PUT(req as NextRequest, {
      params: Promise.resolve({ id: 'wb-1' }),
    })

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'One or more pages do not belong to this whiteboard' })
    expect(mocks.transaction).not.toHaveBeenCalled()
  })
})
