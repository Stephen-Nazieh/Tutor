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

describe('socket-server-enhanced presence map', () => {
  beforeEach(() => {
    socketRateLimitTesting.presence.reset()
  })

  afterEach(() => {
    socketRateLimitTesting.presence.reset()
  })

  it('keeps latest socket mapping for the same user', () => {
    socketRateLimitTesting.presence.set('user-1', 'socket-old')
    socketRateLimitTesting.presence.set('user-1', 'socket-new')

    expect(socketRateLimitTesting.presence.get('user-1')).toBe('socket-new')
  })

  it('does not clear newer mapping when stale socket disconnects', () => {
    socketRateLimitTesting.presence.set('user-1', 'socket-old')
    socketRateLimitTesting.presence.set('user-1', 'socket-new')

    socketRateLimitTesting.presence.clearIfCurrent('user-1', 'socket-old')
    expect(socketRateLimitTesting.presence.get('user-1')).toBe('socket-new')

    socketRateLimitTesting.presence.clearIfCurrent('user-1', 'socket-new')
    expect(socketRateLimitTesting.presence.get('user-1')).toBeUndefined()
  })
})
