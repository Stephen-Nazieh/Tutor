/**
 * Custom Next.js Server with Socket.io
 * Required for real-time WebSocket support in the live clinic system
 */

import { createServer } from 'http'
import { parse } from 'url'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import next from 'next'
import { initEnhancedSocketServer } from './src/lib/socket-server-enhanced'
import { validateEnv } from './src/lib/env'

// Load environment variables from .env.local before validation
function loadEnvFile(filePath: string) {
  if (!existsSync(filePath)) return
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIndex = trimmed.indexOf('=')
    if (eqIndex === -1) continue
    const key = trimmed.slice(0, eqIndex).trim()
    let value = trimmed.slice(eqIndex + 1).trim()
    // Remove surrounding quotes if present
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (key && !process.env[key]) {
      process.env[key] = value
    }
  }
}

// Load env files: .env.local first (higher priority), then .env (fallback)
const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')
loadEnvFile(envLocalPath)
loadEnvFile(envPath)

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
  const rss = Math.round(memory.rss / 1024 / 1024 * 100) / 100
  const heap = Math.round(memory.heapUsed / 1024 / 1024 * 100) / 100
  console.log(`[Server] Memory Usage: RSS=${rss}MB, Heap=${heap}MB, Ready=${isReady}`)
}, 15000).unref() // Unref so it doesn't block process exit if needed

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3003', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

console.log(`[Server] Binding port ${port} immediately...`)

// Create the HTTP server and bind to the port IMMEDIATELY
const server = createServer(async (req, res) => {
  try {
    // 1. Check for health check endpoint
    if (req.url === '/api/health' || req.url === '/health') {
      res.statusCode = isReady ? 200 : 503
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ status: isReady ? 'up' : 'initializing', error: initError?.message }))
      return
    }

    // 2. Until app is ready, return 503 Service Unavailable
    if (!isReady) {
      res.statusCode = 503
      res.setHeader('Retry-After', '5')
      res.end('Server is starting up (renderer warming up)...')
      return
    }

    // 3. Normal request handling
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  } catch (err) {
    console.error('❌ [Server] Request handling crash:', err)
    res.statusCode = 500
    res.end('Internal Server Error (Server Survivor Block)')
  }
})

// BIND PORT IMMEDIATELY - Passed health checks start now!
server
  .once('error', (err) => {
    console.error('❌ [Server] Fatal error binding to port:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`✅ [Server] Port ${port} is now EXPOSED and listening.`)
    
    // 4. Background initialization (NEXT.JS + SOCKET.IO)
    console.log('[Server] Beginning background initialization (Non-blocking)...')

    // Env Validation in background
    try {
      if (process.env.NEXTAUTH_SECRET) {
        console.log(`[Config] NEXTAUTH_SECRET length: ${process.env.NEXTAUTH_SECRET.length} (needs 32+)`)
      }
      validateEnv()
      console.log('✅ [Config] Environment validated successfully')
    } catch (err) {
      console.error('⚠️ [Config] Environment validation warned:', err instanceof Error ? err.message : err)
      initError = err as Error
    }

    // Next.js Preparation in background
    console.log('[Server] Preparing Next.js (Renderer)...')
    app.prepare()
      .then(async () => {
        console.log('✅ [Server] Next.js ready. Initializing Socket.io...')
        try {
          await initEnhancedSocketServer(server)
          isReady = true
          console.log('🎉 [Server] FULLY OPERATIONAL. All background tasks complete.')
        } catch (err) {
          console.error('⚠️ [Server] Socket.io failed during background initialization:', err)
          initError = err as Error
          isReady = true // At least renderer works
        }
      })
      .catch((err: any) => {
        console.error('❌ [Server] Next.js FATAL error during preparation:', err)
        initError = err as Error
        // Keep isReady = false, but the listener STAYS OPEN so logs aren't lost
      })
  })
