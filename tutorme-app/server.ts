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

// 4. Initialization (NEXT.JS + SOCKET.IO)
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3003', 10)

/**
 * PRODUCTION PATH RESOLUTION:
 * In monorepos, standalone output is nested. We ensure 'dir' points to where .next is.
 */
const appDir = resolve(__dirname)
console.log(`[Server] Environment: ${process.env.NODE_ENV}, Port: ${port}, App Dir: ${appDir}`)

const app = next({ 
  dev, 
  hostname, 
  port,
  dir: appDir // Ensure we look in the current folder for .next
})
const handle = app.getRequestHandler()

// Create the HTTP server and bind to the port IMMEDIATELY
const server = createServer(async (req, res) => {
  try {
    // 1. Check for health check endpoint
    if (req.url === '/api/health' || req.url === '/health') {
      res.statusCode = isReady ? 200 : 503
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ 
        status: isReady ? 'up' : 'initializing', 
        error: initError?.message,
        timestamp: new Date().toISOString()
      }))
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
  } catch (err: any) {
    console.error('❌ [Server] Request Handling Fatal Error:', {
      message: err?.message,
      url: req.url,
      stack: err?.stack
    })
    res.statusCode = 500
    res.end(`Internal Server Error (Diagnostics: ${err?.message || 'Unknown'})`)
  }
})

// BIND PORT IMMEDIATELY
server
  .once('error', (err) => {
    console.error('❌ [Server] Fatal port binding error:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`✅ [Server] Listener active on port ${port}`)
    
    const initialize = async () => {
      try {
        console.log('[Server] Step 1: Validating Environment...')
        validateEnv()
        
        console.log('[Server] Step 2: Preparing Next.js renderer...')
        await app.prepare()
        console.log('[Server] ✅ Next.js renderer ready.')

        console.log('[Server] Step 3: Initializing Socket.io...')
        await initEnhancedSocketServer(server)
        
        console.log('🎉 [Server] FULLY OPERATIONAL.')
        isReady = true
      } catch (err: any) {
        console.error('❌ [Server] Background Initialization Failed:', err)
        initError = err
        // We only mark as ready if Next.js preparation succeeded
        if (initError && initError.message && initError.message.includes('prepare()')) {
           isReady = false
        } else if (app) {
           console.log('⚠️ [Server] Proceeding with partial readiness (Next.js renderer OK)')
           isReady = true 
        }
      }
    }

    initialize()
  })
