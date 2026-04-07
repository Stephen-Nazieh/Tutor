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

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

console.log(`[Server] Configuration: port=${port}, dev=${dev}`)

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

    // 2. Ensure everything is ready before handling requests
    if (!isReady) {
      res.statusCode = 503
      res.setHeader('Retry-After', '2')
      res.end('Server warming up... (Next.js renderer preparing)')
      return
    }

    // 3. Normal request handling
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  } catch (err: any) {
    console.error('❌ [Server] Request Handling Fatal Error:', {
      message: err?.message,
      stack: err?.stack,
      url: req.url,
      isReady
    })
    res.statusCode = 500
    res.end(`Internal Server Error (Diagnostics: ${err?.message || 'Unknown'})`)
  }
})

// BIND PORT IMMEDIATELY - Critical for Cloud Run health checks
server
  .once('error', (err) => {
    console.error('❌ [Server] FATAL PORT BINDING ERROR:', err)
    process.exit(1)
  })
  .listen(port, () => {
    console.log(`✅ [Server] Listener active on port ${port}. Environment: ${process.env.NODE_ENV}`)
    
    // 4. Background initialization
    const initialize = async () => {
      try {
        console.log('[Server] Step 1: Validating Environment...')
        validateEnv()
        
        console.log('[Server] Step 2: Preparing Next.js App (Renderer)...')
        await app.prepare()
        console.log('[Server] ✅ Next.js renderer is now ready')

        console.log('[Server] Step 3: Initializing Socket.io Interface...')
        await initEnhancedSocketServer(server)
        
        console.log('🎉 [Server] FULLY OPERATIONAL.')
        isReady = true
      } catch (err: any) {
        console.error('❌ [Server] Background Initialization CRASH:', err)
        initError = err
        // If it's a dev error or something that doesn't block rendering, we can still try to mark as ready
        if (app) {
           console.log('[Server] ⚠️ Attempting to continue with broken background status...')
           isReady = true 
        }
      }
    }

    initialize()
  })
