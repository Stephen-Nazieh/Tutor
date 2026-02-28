import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => {
  const updateWhere = vi.fn().mockResolvedValue(undefined)
  const updateSet = vi.fn().mockReturnValue({ where: updateWhere })
  return {
    requireAdmin: vi.fn(),
    logAdminAction: vi.fn(),
    getClientIp: vi.fn(),
    selectResults: [] as unknown[][],
    updateSet,
    update: vi.fn().mockReturnValue({ set: updateSet }),
    insertValues: vi.fn().mockResolvedValue(undefined),
  }
})

vi.mock('@/lib/admin/auth', () => ({
  requireAdmin: mocks.requireAdmin,
  logAdminAction: mocks.logAdminAction,
  getClientIp: mocks.getClientIp,
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => {
      const rows = mocks.selectResults.shift() ?? []
      const whereResult = {
        limit: vi.fn().mockResolvedValue(rows),
        then: (resolve: (value: unknown[]) => unknown, reject?: (reason: unknown) => unknown) =>
          Promise.resolve(rows).then(resolve, reject),
      }
      return {
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue(whereResult),
          orderBy: vi.fn().mockResolvedValue(rows),
        }),
      }
    }),
    insert: vi.fn().mockReturnValue({
      values: mocks.insertValues,
    }),
    update: mocks.update,
    delete: vi.fn().mockReturnValue({
      where: vi.fn().mockResolvedValue(undefined),
    }),
  },
}))

import { PATCH, POST } from './route'

describe('/api/admin/llm/routing behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectResults = []
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
      response: undefined,
    })
    mocks.getClientIp.mockReturnValue('127.0.0.1')
  })

  it('POST returns 400 when target model does not exist', async () => {
    mocks.selectResults = [[]]
    const req = new Request('http://localhost/api/admin/llm/routing', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        targetModelId: 'missing-model',
        conditions: { subject: 'math' },
      }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Target model not found' })
    expect(mocks.insertValues).not.toHaveBeenCalled()
    expect(mocks.logAdminAction).not.toHaveBeenCalled()
  })

  it('PATCH returns 400 when new target model does not exist', async () => {
    mocks.selectResults = [[]]
    const req = new Request('http://localhost/api/admin/llm/routing', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: 'rule-1', targetModelId: 'missing-model' }),
    })

    const res = await PATCH(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Target model not found' })
    expect(mocks.updateSet).not.toHaveBeenCalled()
  })

  it('PATCH rewires providerId when target model changes', async () => {
    mocks.selectResults = [
      [{ providerId: 'provider-2' }],
      [
        {
          id: 'rule-1',
          name: 'Updated Rule',
          description: null,
          priority: 1,
          conditions: { subject: 'math' },
          targetModelId: 'model-2',
          fallbackModelId: null,
          isActive: true,
          providerId: 'provider-2',
        },
      ],
    ]
    const req = new Request('http://localhost/api/admin/llm/routing', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        id: 'rule-1',
        name: 'Updated Rule',
        targetModelId: 'model-2',
      }),
    })

    const res = await PATCH(req as NextRequest)

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.rule).toMatchObject({
      id: 'rule-1',
      targetModelId: 'model-2',
      providerId: 'provider-2',
    })
    expect(mocks.updateSet).toHaveBeenCalledWith({
      name: 'Updated Rule',
      targetModelId: 'model-2',
      providerId: 'provider-2',
    })
  })
})
