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

let app: any
let handle: any

console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}, port: ${port}`)

if (dev) {
  app = next({ dev, hostname, port })
  handle = app.getRequestHandler()
} else {
  try {
    // RIGOROUS STANDALONE RENDERER:
    // We load the official config generated during build to avoid 'prepare()' timeouts.
    console.log('[Server] Loading standalone configuration...')
    const serverFilesPath = resolve(process.cwd(), '.next/required-server-files.json')
    const NextServer = require('next/dist/server/next-server').default
    
    let config = {}
    if (existsSync(serverFilesPath)) {
      const serverFiles = JSON.parse(readFileSync(serverFilesPath, 'utf-8'))
      config = serverFiles.config
      console.log('[Server] ✅ Build configuration loaded successfully')
    } else {
      console.warn('⚠️ [Server] .next/required-server-files.json not found, using default config')
    }

    app = new NextServer({
      hostname,
      port,
      dir: process.cwd(),
      dev: false,
      conf: config as any,
    })
    handle = app.getRequestHandler()
  } catch (err: any) {
    console.error('❌ [Server] Failed to initialize Standalone renderer:', err)
    // Fallback to standard next() which requires prepare()
    app = next({ dev: false, hostname, port })
    handle = app.getRequestHandler()
  }
}

// Create the HTTP server and bind to the port IMMEDIATELY
const server = createServer(async (req, res) => {
  try {
    // 1. Check for health check endpoint
    if (req.url === '/api/health' || req.url === '/health') {
      const status = isReady ? 200 : 503
      res.statusCode = status
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ 
        status: isReady ? 'up' : 'initializing', 
        error: initError?.message,
        timestamp: new Date().toISOString(),
        node: process.version
      }))
      return
    }

    // 2. Ensure readiness
    if (!isReady) {
      res.statusCode = 503
      res.setHeader('Retry-After', '2')
      res.end('Server is initializing... (Finalizing build assets)')
      return
    }

    // 3. Normal request handling
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  } catch (err: any) {
    console.error('❌ [Server] Request Handling Error:', {
      message: err?.message,
      stack: err?.stack,
      url: req.url
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
        
        // In production with NextServer, we don't need app.prepare()
        if (dev || (app && app.prepare && typeof app.prepare === 'function' && !app.constructor.name.includes('NextNodeServer'))) {
          console.log('[Server] Step 2: Preparing Next.js App (Background)...')
          await app.prepare()
          console.log('[Server] ✅ Next.js renderer ready')
        } else {
          console.log('[Server] Step 2: Skipping prepare() for Standalone Renderer')
        }

        console.log('[Server] Step 3: Initializing Socket.io...')
        await initEnhancedSocketServer(server)
        
        console.log('🎉 [Server] FULLY OPERATIONAL.')
        isReady = true
      } catch (err: any) {
        console.error('❌ [Server] Background Initialization Failed:', err)
        initError = err
        // CRITICAL: We only mark as ready if we actually have a working handle
        if (handle) {
          console.log('⚠️ [Server] Proceeding with Next.js only (Socket.io might be impaired)')
          isReady = true
        }
      }
    }

    initialize()
  })
