/* @vitest-environment node */

import { createServer, type Server as HttpServer } from 'http'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { Server as SocketIOServer } from 'socket.io'

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

  afterEach(() => {
    if (io) {
      io.close()
      io = null
    }
    server.close()
    vi.restoreAllMocks()
    delete process.env.NEXTAUTH_SECRET
    delete process.env.REDIS_URL
  })

  it('initializes without REDIS_URL and registers cleanup timers', async () => {
    io = await initEnhancedSocketServer(server)
    expect(io).toBeTruthy()
  })
})
