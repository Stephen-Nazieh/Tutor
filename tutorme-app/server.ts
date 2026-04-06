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

// Fail fast when required env vars are missing
console.log('[Server] Validating environment...')
validateEnv()

const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTNAME || '0.0.0.0'
const port = parseInt(process.env.PORT || '3003', 10)

console.log(`[Server] Setting up Next.js (dev: ${dev}, hostname: ${hostname}, port: ${port})...`)
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

console.log('[Server] Preparing Next.js application...')
app.prepare().then(async () => {
  console.log('[Server] Application prepared. Creating HTTP server...')
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url!, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('[Server] Request error:', err)
      res.statusCode = 500
      res.end('Internal Server Error')
    }
  })

  // Initialize Socket.io server
  console.log('[Server] Initializing Socket.io...')
  try {
    const io = await initEnhancedSocketServer(server)
    console.log('✅ [Server] Socket.io server initialized')
  } catch (err) {
    console.error('❌ [Server] Socket.io initialization failed:', err)
    // Continue starting the server even if Socket.io fails - might just be in-memory mode
  }

  server
    .once('error', (err) => {
      console.error('❌ [Server] Fatal error encountered:', err)
      process.exit(1)
    })
    .listen(port, () => {
      console.log(`🚀 [Server] Ready on http://${hostname}:${port}`)
      console.log(`📡 [Server] Socket.io ready on ws://${hostname}:${port}/api/socket`)
    })
})
