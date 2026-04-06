#!/usr/bin/env node
/**
 * Startup script that runs migrations before starting the server
 * Ensures database schema is up to date before handling requests
 */
const path = require('node:path')
const { spawn } = require('node:child_process')
const fs = require('node:fs')

const cwd = process.cwd()

async function runMigrations() {
  const migrationsScript = path.join(cwd, 'scripts/run-migrations.js')
  if (!fs.existsSync(migrationsScript)) {
    console.warn('[Startup] Warning: run-migrations.js not found, skipping migrations.')
    return
  }

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
  console.log(`[Startup] CWD: ${cwd}`)
  console.log(`[Startup] PORT: ${process.env.PORT || '3003 (default)'}`)
  console.log(`[Startup] HOSTNAME: ${process.env.HOSTNAME || '0.0.0.0 (default)'}`)

  // Run migrations first
  await runMigrations()
  
  // Check for custom server first (Socket.io support)
  const customServer = path.join(cwd, 'server-production.js')
  const standaloneServer = path.join(cwd, 'server.js')
  
  const serverPath = fs.existsSync(customServer) ? customServer : standaloneServer
  
  if (fs.existsSync(serverPath)) {
    console.log(`[Startup] Starting server: ${path.basename(serverPath)}`)
    const child = spawn('node', [serverPath], { 
      stdio: 'inherit',
      env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' }
    })
    
    process.on('SIGTERM', () => {
      console.log('[Startup] SIGTERM received, shutting down child...')
      child.kill('SIGTERM')
    })
    process.on('SIGINT', () => {
      console.log('[Startup] SIGINT received, shutting down child...')
      child.kill('SIGINT')
    })
    
    child.on('exit', (code) => {
      console.log(`[Startup] Server exited with code ${code}`)
      process.exit(code ?? 0)
    })
    
    child.on('error', (err) => {
      console.error('[Startup] Failed to start child process:', err)
      process.exit(1)
    })
  } else {
    console.error(`[Startup] Error: No server found at ${customServer} or ${standaloneServer}!`)
    // List directory contents to help debugging
    try {
      const files = fs.readdirSync(cwd)
      console.log(`[Startup] Directory contents: ${files.join(', ')}`)
    } catch (e) {}
    process.exit(1)
  }
}

startServer().catch((error) => {
  console.error('[Startup] Fatal error during startup:', error)
  process.exit(1)
})
