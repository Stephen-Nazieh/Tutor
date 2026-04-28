/**
 * Custom Next.js Server with Socket.io
 * Required for real-time WebSocket support in the live clinic system
 */

import { createServer } from 'http'
import { parse } from 'url'
import { resolve } from 'path'
import next from 'next'
import { config as dotenvConfig } from 'dotenv'
import { initEnhancedSocketServer } from './src/lib/socket-server-enhanced'
import { validateEnv } from './src/lib/env'
import { applyStartupSchemaFixes } from './src/lib/db/startup-schema-fix'

// Load environment variables from .env.local before validation
// .env.local takes precedence over .env
dotenvConfig({ path: resolve(process.cwd(), '.env.local') })
dotenvConfig({ path: resolve(process.cwd(), '.env') })

// Startup readiness state
let isReady = false
let initError: Error | null = null

// Fail fast when required env vars are missing
console.log('--- [Server Survivor Block] ---')
console.log(`[Server] Start time: ${new Date().toISOString()}`)
console.log(`[Server] Node Memory Limit: ${process.env.NODE_OPTIONS || 'Default'}`)

// Periodic memory monitoring to diagnose OOM-kills early
setInterval(() => {
  const memory = process.memoryUsage()
  const rss = Math.round((memory.rss / 1024 / 1024) * 100) / 100
  const heap = Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100
  console.log(`[Server] Memory Usage: RSS=${rss}MB, Heap=${heap}MB, Ready=${isReady}`)
}, 15000).unref() // Unref so it doesn't block process exit if needed

// 4. Initialization (NEXT.JS + SOCKET.IO)
const dev = process.env.NODE_ENV !== 'production'

/**
 * PRODUCTION PATH RESOLUTION:
 * In monorepos, standalone output is nested. We ensure 'dir' points to where .next is.
 */
const appDir = resolve(__dirname)
console.log(`[Server] Environment: ${process.env.NODE_ENV}, Port: ${port}, Hostname: ${hostname}, App Dir: ${appDir}`)

const app = next({
  dev,
  hostname,
  port,
  dir: appDir, // Ensure we look in the current folder for .next
})
const handle = app.getRequestHandler()

// Create the HTTP server and bind to the port IMMEDIATELY
const server = createServer(async (req, res) => {
  try {
    // 1. Check for health check endpoint
    if (req.url === '/api/health' || req.url === '/health') {
      res.statusCode = isReady ? 200 : 503
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          status: isReady ? 'up' : 'initializing',
          error: initError?.message,
          timestamp: new Date().toISOString(),
        })
      )
      return
    }

    // 2. Ensure readiness
    if (!isReady) {
      res.statusCode = 503
      res.setHeader('Retry-After', '2')
      res.end('Server is warming up... (Renderer preparing)')
      return
    }

    // 3. Normal request handling
    const parsedUrl = parse(req.url!, true)

    // LOG ALL REQUESTS FOR 404 DIAGNOSTICS:
    if (process.env.DEBUG_SERVER === 'true') {
      console.log(`[Server] Request: ${req.url}`)
    }

    await handle(req, res, parsedUrl)
  } catch (err: unknown) {
    const error = err as Error
    console.error('❌ [Server] Request Handling Fatal Error:', {
      message: error?.message,
      url: req.url,
      stack: error?.stack,
    })
    res.statusCode = 500
    res.end(`Internal Server Error (Diagnostics: ${error?.message || 'Unknown'})`)
  }
})

// BIND PORT IMMEDIATELY
const port = parseInt(process.env.PORT || '3003', 10)
const hostname = process.env.HOSTNAME || '0.0.0.0'

server
  .once('error', err => {
    console.error('❌ [Server] Fatal port binding error:', err)
    process.exit(1)
  })
  .listen(port, hostname, () => {
    console.log(`✅ [Server] Listener active on ${hostname}:${port}`)

    const initialize = async () => {
      // Step 1: Validate Environment (Non-blocking for renderer)
      try {
        console.log('[Server] Step 1: Validating Environment...')
        validateEnv()
      } catch (envErr: any) {
        console.error('⚠️ [Server] Environment Validation Warning:', envErr?.message)
        // We log it but do not crash the initialization sequence!
        initError = envErr
      }

      // Step 1b: Apply idempotent schema drift fixes (dev / local only)
      try {
        await applyStartupSchemaFixes()
      } catch (schemaErr: any) {
        console.error('⚠️ [Server] Schema fix warning:', schemaErr?.message)
      }

      // Step 2 & 3: Prepare Next.js and Socket.io
      let isNextPrepared = false
      try {
        console.log('[Server] Step 2: Preparing Next.js renderer...')
        await app.prepare()
        isNextPrepared = true
        console.log('[Server] ✅ Next.js renderer ready.')

        console.log('[Server] Step 3: Initializing Socket.io...')
        await initEnhancedSocketServer(server)

        console.log('🎉 [Server] FULLY OPERATIONAL.')
        isReady = true
      } catch (err: any) {
        console.error('❌ [Server] Background Initialization Failed:', err)
        initError = err

        // CRITICAL FIX: Only set isReady=true if app.prepare() actually finished
        if (isNextPrepared) {
          console.log(
            '⚠️ [Server] Next.js is prepared. Proceeding with partial readiness (Socket.io or Env may be degraded)'
          )
          isReady = true
        } else {
          console.error('❌ [Server] Next.js failed to prepare. Cannot serve UI traffic.')
          isReady = false
        }
      }
    }

    initialize()
  })
