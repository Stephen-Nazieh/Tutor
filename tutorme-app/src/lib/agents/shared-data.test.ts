import { describe, it, expect, vi, beforeEach } from 'vitest'

const mocks = vi.hoisted(() => ({
  cacheGet: vi.fn(),
  cacheSet: vi.fn(),
  dbMock: {
    query: {
      user: {
        findFirst: vi.fn(),
      },
    },
    select: vi.fn(),
  },
}))

vi.mock('@/lib/db', () => ({
  cache: {
    get: mocks.cacheGet,
    set: mocks.cacheSet,
  },
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: mocks.dbMock,
}))

import { getStudent, getConversation } from './shared-data'

describe('shared-data', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('maps student data from the database', async () => {
    const now = new Date('2024-01-01T00:00:00Z')
    mocks.dbMock.query.user.findFirst.mockResolvedValue({
      userId: 'u1',
      email: 'test@example.com',
      updatedAt: now,
      profile: {
        name: 'Test Student',
        subjectsOfInterest: ['math'],
        learningGoals: [],
      },
    })

    mocks.dbMock.select.mockImplementation(() => ({
      from: () => ({
        where: () => ({
          orderBy: () => ({
            limit: () =>
              Promise.resolve([
                {
                  learningStyle: 'visual',
                  completionRate: 0.5,
                  strengths: ['fractions'],
                  weaknesses: ['algebra'],
                  updatedAt: now,
                },
              ]),
          }),
        }),
      }),
    }))

    const student = await getStudent('u1')
    expect(student).not.toBeNull()
    expect(student?.id).toBe('u1')
    expect(student?.learningStyle).toBe('visual')
    // Gamification tables removed - fields are undefined
    expect(student?.xp).toBeUndefined()
    expect(student?.achievements).toBeUndefined()
  })

  it('creates a conversation when none exists', async () => {
    mocks.cacheGet.mockResolvedValue(null)

    const conversation = await getConversation('u1', 'math', 'u1:math')
    expect(conversation).not.toBeNull()
    expect(conversation?.id).toBe('u1:math')
    expect(mocks.cacheSet).toHaveBeenCalled()
  })
})
