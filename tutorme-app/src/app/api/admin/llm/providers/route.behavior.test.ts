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
    updateWhere,
    update: vi.fn().mockReturnValue({ set: updateSet }),
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
    update: mocks.update,
    insert: vi.fn().mockReturnValue({
      values: vi.fn().mockResolvedValue(undefined),
    }),
  },
}))

import { PATCH } from './route'

describe('PATCH /api/admin/llm/providers behavior', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectResults = []
    mocks.requireAdmin.mockResolvedValue({
      session: { adminId: 'admin-1' },
      response: undefined,
    })
    mocks.getClientIp.mockReturnValue('127.0.0.1')
  })

  it('returns 404 without unsetting defaults when provider id does not exist', async () => {
    mocks.selectResults = [[]]
    const req = new Request('http://localhost/api/admin/llm/providers', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: 'missing-provider', isDefault: true }),
    })

    const res = await PATCH(req as NextRequest)

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Provider not found' })
    expect(mocks.update).not.toHaveBeenCalled()
    expect(mocks.logAdminAction).not.toHaveBeenCalled()
  })

  it('updates an existing provider and keeps API key masked in response', async () => {
    mocks.selectResults = [
      [
        {
          id: 'provider-1',
          name: 'Old Name',
          providerType: 'openai',
          apiKeyEncrypted: 'encrypted-value',
          isDefault: false,
        },
      ],
      [
        {
          id: 'provider-1',
          name: 'Updated Name',
          providerType: 'openai',
          apiKeyEncrypted: 'encrypted-value',
          isDefault: true,
        },
      ],
    ]
    const req = new Request('http://localhost/api/admin/llm/providers', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id: 'provider-1', name: 'Updated Name', isDefault: true }),
    })

    const res = await PATCH(req as NextRequest)

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.provider).toMatchObject({
      id: 'provider-1',
      name: 'Updated Name',
      isDefault: true,
      apiKeyEncrypted: '***',
    })
    expect(mocks.updateSet).toHaveBeenCalledWith({ isDefault: false })
    expect(mocks.updateSet).toHaveBeenCalledWith({
      name: 'Updated Name',
      isDefault: true,
    })
    expect(mocks.logAdminAction).toHaveBeenCalled()
  })
})
