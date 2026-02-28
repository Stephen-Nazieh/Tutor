import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  session: {
    user: { id: 'student-1', role: 'STUDENT', name: 'Student One' },
  },
  selectResults: [] as unknown[][],
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
  },
}))

import { GET } from './route'

describe('GET /api/sessions/[sessionId]/whiteboard/[studentId]', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.session = {
      user: { id: 'student-1', role: 'STUDENT', name: 'Student One' },
    }
    mocks.selectResults = []
  })

  it('allows a student to read their own private whiteboard', async () => {
    mocks.selectResults = [
      [
        {
          id: 'wb-private',
          sessionId: 'session-1',
          tutorId: 'student-1',
          ownerType: 'student',
          visibility: 'private',
          title: 'My Work',
        },
      ],
      [{ id: 'page-1', whiteboardId: 'wb-private', order: 0 }],
    ]
    const req = new Request('http://localhost/api/sessions/session-1/whiteboard/student-1')

    const res = await GET(req as NextRequest, {
      params: Promise.resolve({ sessionId: 'session-1', studentId: 'student-1' }),
    })

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.whiteboard).toMatchObject({
      id: 'wb-private',
      visibility: 'private',
    })
    expect(body.whiteboard.pages).toHaveLength(1)
  })

  it('blocks a student from reading another student private whiteboard', async () => {
    mocks.selectResults = [
      [
        {
          id: 'wb-private',
          sessionId: 'session-1',
          tutorId: 'student-2',
          ownerType: 'student',
          visibility: 'private',
          title: 'Other Work',
        },
      ],
    ]
    const req = new Request('http://localhost/api/sessions/session-1/whiteboard/student-2')

    const res = await GET(req as NextRequest, {
      params: Promise.resolve({ sessionId: 'session-1', studentId: 'student-2' }),
    })

    expect(res.status).toBe(403)
    expect(await res.json()).toEqual({ error: 'Whiteboard is not public' })
  })
})
