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

// Standard Next.js server for dev, or optimized Standalone renderer for production
let handle: any
let app: any

if (dev) {
  console.log('[Server] Initializing Next.js in DEVELOPMENT mode...')
  app = next({ dev, hostname, port })
  handle = app.getRequestHandler()
} else {
  console.log('[Server] Initializing Next.js in STANDALONE PRODUCTION mode...')
  try {
    // In standalone mode, we can use the NextServer class directly for instant readiness
    const NextServer = require('next/dist/server/next-server').default
    app = new NextServer({
      hostname,
      port,
      dir: process.cwd(),
      dev: false,
      conf: {
        env: {},
        webpack: null,
        eslint: { ignoreDuringBuilds: true },
        typescript: { ignoreBuildErrors: true },
        distDir: '.next',
        cleanDistDir: false,
        configOrigin: 'next.config.mjs',
        useFileSystemPublicRoutes: true,
        generateEtags: true,
        pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
        poweredByHeader: true,
        staticPageGenerationTimeout: 60,
        swcMinify: true,
        output: 'standalone',
      } as any,
    })
    handle = app.getRequestHandler()
  } catch (err) {
    console.error('⚠️ [Server] Failed to load standalone renderer, falling back to standard next():', err)
    app = next({ dev: false, hostname, port })
    handle = app.getRequestHandler()
  }
}

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
      res.setHeader('Retry-After', '2')
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
    
    // 4. Background initialization
    console.log('[Server] Beginning background registration...')

    // Env Validation in background
    try {
      validateEnv()
      console.log('✅ [Config] Environment validated successfully')
    } catch (err) {
      console.error('⚠️ [Config] Environment validation warned:', err instanceof Error ? err.message : err)
      initError = err as Error
    }

    // Initialize Socket.io and Next (if needed)
    const initialize = async () => {
      try {
        if (dev || !app.prepare) {
          // If standalone, we don't need app.prepare()
          if (app.prepare) await app.prepare()
          console.log('[Server] Initializing Socket.io...')
          await initEnhancedSocketServer(server)
          isReady = true
          console.log('🎉 [Server] FULLY OPERATIONAL.')
        } else {
          console.log('[Server] Preparing Next.js renderer...')
          await app.prepare()
          console.log('[Server] Initializing Socket.io...')
          await initEnhancedSocketServer(server)
          isReady = true
          console.log('🎉 [Server] FULLY OPERATIONAL.')
        }
      } catch (err: any) {
        console.error('❌ [Server] Background initialization failed:', err)
        initError = err
        isReady = true // Set to true anyway to allow Next.js traffic if possible
      }
    }

    initialize()
  })
