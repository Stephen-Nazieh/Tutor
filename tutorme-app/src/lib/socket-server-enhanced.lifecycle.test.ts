/* @vitest-environment node */

import { createServer, type Server as HttpServer } from 'http'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Server as SocketIOServer } from 'socket.io'

const mocks = vi.hoisted(() => ({
  registerLiveClassWhiteboardHandlers: vi.fn(),
  cleanupLcwbPresence: vi.fn(),
}))

vi.mock('./socket-server', () => ({
  registerLiveClassWhiteboardHandlers: mocks.registerLiveClassWhiteboardHandlers,
  cleanupLcwbPresence: mocks.cleanupLcwbPresence,
}))

import { initEnhancedSocketServer } from './socket-server-enhanced'

describe('socket-server-enhanced lifecycle', () => {
  let server: HttpServer
  let io: SocketIOServer | null

  beforeEach(() => {
    process.env.NEXTAUTH_SECRET = 'test-secret-test-secret-test-secret'
    delete process.env.REDIS_URL
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    server = createServer()
    io = null
  })

  afterEach(async () => {
    if (io) {
      await new Promise<void>((resolve) => io?.close(() => resolve()))
    }
    vi.restoreAllMocks()
  })

  it('initializes without REDIS_URL and registers cleanup timers', async () => {
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval')
    const clearIntervalSpy = vi.spyOn(globalThis, 'clearInterval')

    io = await initEnhancedSocketServer(server)
    expect(setIntervalSpy.mock.calls.length).toBeGreaterThanOrEqual(4)

    await new Promise<void>((resolve) => io?.close(() => resolve()))
    expect(clearIntervalSpy).toHaveBeenCalled()
    io = null

    setIntervalSpy.mockRestore()
    clearIntervalSpy.mockRestore()
  })
})
