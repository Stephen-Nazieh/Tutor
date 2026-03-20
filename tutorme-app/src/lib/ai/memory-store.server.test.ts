import { describe, it, expect, vi, beforeEach } from 'vitest'

// `server-only` throws when imported outside Next.js server component runtime.
// For unit tests, treat it as a no-op.
vi.mock('server-only', () => ({}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: () => ({
      from: () => ({
        where: () => ({
          limit: async () => [],
        }),
        leftJoin: () => ({
          where: () => ({
            limit: async () => [],
          }),
        }),
      }),
    }),
    insert: () => ({
      values: () => ({
        onConflictDoUpdate: async () => {},
      }),
    }),
  },
}))

describe('memory-store.server', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('returns null when student profile cannot be built', async () => {
    const { getStudentContextDb } = await import('./memory-store.server')
    const ctx = await getStudentContextDb('missing-student')
    expect(ctx).toBeNull()
  })
})
