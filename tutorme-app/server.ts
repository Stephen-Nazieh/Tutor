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
console.log('[Server] Initializing...')

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3003', 10)

console.log(`[Server] Configuration (dev: ${dev}, hostname: ${hostname}, port: ${port})`)
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Create the HTTP server and bind to the port IMMEDIATELY to satisfy Cloud Run health checks
const server = createServer(async (req, res) => {
  try {
    // 1. Check for health check endpoint (respond early)
    if (req.url === '/api/health') {
      res.statusCode = isReady ? 200 : 503
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ status: isReady ? 'up' : 'initializing', error: initError?.message }))
      return
    }

    // 2. Until app is ready, return 503 Service Unavailable
    if (!isReady) {
      res.statusCode = 503
      res.setHeader('Retry-After', '5')
      res.end('Server is starting up...')
      return
    }

    // 3. Normal Next.js request handling
    const parsedUrl = parse(req.url!, true)
    await handle(req, res, parsedUrl)
  } catch (err) {
    console.error('[Server] Request handling error:', err)
    res.statusCode = 500
    res.end('Internal Server Error')
  }
})

// Start listening now to pass port health checks
server
  .once('error', (err) => {
    console.error('❌ [Server] Fatal error binding to port:', err)
    process.exit(1)
  })
  .listen(port, hostname, () => {
    console.log(`🚀 [Server] Listener active on http://${hostname}:${port}`)
    
    // 4. Background initialization of Environment, Next.js, and Socket.io
    console.log('[Server] Beginning background initialization...')

    // Check environment first, but after we have bound the port
    try {
      if (process.env.NEXTAUTH_SECRET) {
        console.log(`[Config] NEXTAUTH_SECRET length: ${process.env.NEXTAUTH_SECRET.length} (needs 32+)`)
      } else {
        console.warn('⚠️ [Config] NEXTAUTH_SECRET is MISSING')
      }
      validateEnv()
      console.log('✅ [Config] Environment validated successfully')
    } catch (err) {
      console.error('❌ [Config] Environment validation failed:', err instanceof Error ? err.message : err)
      initError = err as Error
      // We continue with app.prepare() to at least allow health checks to stay up
    }

    app.prepare()
      .then(async () => {
        console.log('[Server] Next.js prepared. Initializing Socket.io...')
        try {
          await initEnhancedSocketServer(server)
          isReady = true
          console.log('✅ [Server] Startup sequence complete. Now handling traffic.')
        } catch (err) {
          console.error('⚠️ [Server] Socket.io initialization failed:', err)
          initError = err as Error
          isReady = true // Still set to ready so at least Next.js works
        }
      })
      .catch((err) => {
        console.error('❌ [Server] Next.js preparation failed:', err)
        initError = err as Error
        // Keep isReady as false if Next.js fails to prepare
      })
  })
