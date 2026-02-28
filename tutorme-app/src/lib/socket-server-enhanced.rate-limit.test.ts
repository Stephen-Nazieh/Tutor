/* @vitest-environment node */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  registerLiveClassWhiteboardHandlers: vi.fn(),
  cleanupLcwbPresence: vi.fn(),
}))

vi.mock('./socket-server', () => ({
  registerLiveClassWhiteboardHandlers: mocks.registerLiveClassWhiteboardHandlers,
  cleanupLcwbPresence: mocks.cleanupLcwbPresence,
}))

import { socketRateLimitTesting } from './socket-server-enhanced'

describe('socket-server-enhanced rate limit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-01T00:00:00.000Z'))
    socketRateLimitTesting.reset()
  })

  afterEach(() => {
    socketRateLimitTesting.reset()
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('allows events up to configured limit and blocks overflow in same window', () => {
    const connectionId = 'socket-1'
    const allowed: boolean[] = []

    for (let i = 0; i < socketRateLimitTesting.limits.maxEventsPerSecond; i++) {
      allowed.push(!socketRateLimitTesting.isRateLimited(connectionId))
    }

    const overflowBlocked = socketRateLimitTesting.isRateLimited(connectionId)

    expect(allowed.every(Boolean)).toBe(true)
    expect(overflowBlocked).toBe(true)
  })

  it('refills tokens over time and allows traffic again', () => {
    const connectionId = 'socket-2'

    for (let i = 0; i < socketRateLimitTesting.limits.maxEventsPerSecond; i++) {
      socketRateLimitTesting.isRateLimited(connectionId)
    }
    expect(socketRateLimitTesting.isRateLimited(connectionId)).toBe(true)

    vi.advanceTimersByTime(socketRateLimitTesting.limits.windowSize)

    expect(socketRateLimitTesting.isRateLimited(connectionId)).toBe(false)
  })
})
