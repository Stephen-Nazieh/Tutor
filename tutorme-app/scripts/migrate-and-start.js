#!/usr/bin/env node
/**
 * Startup script that runs migrations before starting the server
 * Ensures database schema is up to date before handling requests
 */
const path = require('node:path')
const { spawn } = require('node:child_process')

const cwd = process.cwd()

async function runMigrations() {
  const { runMigrations } = require('./run-migrations')
  console.log('[Startup] Running database migrations...')
  try {
    await runMigrations()
    console.log('[Startup] Migrations completed successfully')
  } catch (error) {
    console.error('[Startup] Migration failed:', error)
    // Continue startup even if migrations fail - the app has fallback handling
    console.log('[Startup] Continuing startup despite migration failure...')
  }
}

async function startServer() {
  // Run migrations first
  await runMigrations()
  
  // Check if standalone server.js exists
  const serverJs = path.join(cwd, 'server.js')
  const fs = require('node:fs')
  
  if (fs.existsSync(serverJs)) {
    console.log('[Startup] Starting standalone server...')
    const child = spawn('node', ['server.js'], { stdio: 'inherit' })
    
    process.on('SIGTERM', () => child.kill('SIGTERM'))
    process.on('SIGINT', () => child.kill('SIGINT'))
    
    child.on('exit', (code) => {
      process.exit(code ?? 0)
    })
  } else {
    console.error('[Startup] server.js not found!')
    process.exit(1)
  }
}

startServer().catch((error) => {
  console.error('[Startup] Fatal error:', error)
  process.exit(1)
})
