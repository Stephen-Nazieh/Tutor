import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { NextRequest } from 'next/server'

const mocks = vi.hoisted(() => ({
  session: {
    user: { id: 'student-1', role: 'STUDENT', name: 'Student One' },
  },
  withRateLimit: vi.fn(),
  selectQueue: [] as unknown[][],
  insertValues: vi.fn().mockResolvedValue(undefined),
  createMeetingToken: vi.fn(),
}))

vi.mock('@/lib/api/middleware', async () => {
  const actual = await vi.importActual<typeof import('@/lib/api/middleware')>('@/lib/api/middleware')
  return {
    ...actual,
    withAuth: (handler: (...args: unknown[]) => Promise<Response> | Response) => {
      return async (req: NextRequest) => {
        try {
          return await handler(req, mocks.session)
        } catch (error) {
          if (error instanceof Error && error.name === 'NotFoundError') {
            return Response.json({ error: error.message }, { status: 404 })
          }
          if (error instanceof Error && error.name === 'ValidationError') {
            return Response.json({ error: error.message }, { status: 400 })
          }
          throw error
        }
      }
    },
    withCsrf: (handler: (...args: unknown[]) => Promise<Response> | Response) => handler,
    withRateLimit: mocks.withRateLimit,
  }
})

vi.mock('@/lib/video/daily-provider', () => ({
  dailyProvider: {
    createMeetingToken: mocks.createMeetingToken,
  },
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockImplementation(() => {
      const rows = mocks.selectQueue.shift() ?? []
      const whereResult = {
        limit: vi.fn().mockResolvedValue(rows),
        then: (resolve: (value: unknown[]) => unknown, reject?: (reason: unknown) => unknown) =>
          Promise.resolve(rows).then(resolve, reject),
      }
      return {
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue(whereResult),
        }),
      }
    }),
    insert: vi.fn().mockReturnValue({
      values: mocks.insertValues,
    }),
  },
}))

import { POST } from './route'

describe('POST /api/class/join', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocks.selectQueue = []
    mocks.withRateLimit.mockResolvedValue({ response: null, remaining: 10 })
    mocks.createMeetingToken.mockResolvedValue('meeting-token')
  })

  it('returns 404 when no session matches the provided code', async () => {
    mocks.selectQueue = [[]]
    const req = new Request('http://localhost/api/class/join', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId: 'invalid-code' }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(404)
    expect(await res.json()).toEqual({ error: 'Session not found' })
  })

  it('returns 400 when class session is not active', async () => {
    mocks.selectQueue = [[{
      id: 'session-1',
      roomId: 'room-1',
      tutorId: 'tutor-1',
      status: 'SCHEDULED',
      maxStudents: 50,
      roomUrl: 'https://daily.co/room-1',
    }]]
    const req = new Request('http://localhost/api/class/join', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId: 'session-1' }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(400)
    expect(await res.json()).toEqual({ error: 'Class session is not active' })
  })

  it('joins by session id and creates participant when missing', async () => {
    mocks.selectQueue = [
      [{
        id: 'session-1',
        roomId: 'room-1',
        tutorId: 'tutor-1',
        status: 'ACTIVE',
        maxStudents: 50,
        roomUrl: 'https://daily.co/room-1',
      }],
      [],
      [],
    ]
    const req = new Request('http://localhost/api/class/join', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId: 'session-1' }),
    })

    const res = await POST(req as NextRequest)

    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body).toMatchObject({
      sessionId: 'session-1',
      room: {
        id: 'room-1',
        url: 'https://daily.co/room-1',
      },
      token: 'meeting-token',
    })
    expect(mocks.insertValues).toHaveBeenCalled()
    expect(mocks.createMeetingToken).toHaveBeenCalledWith(
      'room-1',
      'student-1',
      { isOwner: false }
    )
  })
})
