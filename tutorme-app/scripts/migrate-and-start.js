const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * PRODUCTION SURVIVOR ENTRY POINT
 * This script is designed to stay alive NO MATTER WHAT, enabling diagnostics.
 */

async function start() {
  const cwd = process.cwd()
  console.log('--- [Survivor Startup Sequence] ---')
  console.log(`[Startup] CWD: ${cwd}`)
  console.log(`[Startup] PORT: ${process.env.PORT || '3003'}`)

  // 1. Diagnostics: List all files at start to be 100% sure where we are
  try {
    const listDir = (dir, depth = 0) => {
      if (depth > 1) return
      const items = fs.readdirSync(dir)
      console.log(`[Startup] dir(${dir}): ${items.join(', ')}`)
    }
    listDir(cwd)
  } catch (_e) {}

  // 2. Start migrations in BACKGROUND (Don't block the server listen check)
  const migrationsScript = path.join(cwd, 'scripts/run-migrations.js')
  if (fs.existsSync(migrationsScript)) {
    console.log('[Startup] Backgrounding migrations...')
    // We spawning a separate process for migrations to avoid blocking the loop
    const migrator = spawn('node', [migrationsScript], {
      stdio: 'inherit',
      env: process.env,
    })
    migrator.on('close', code => {
      console.log(`[Startup] Background transitions exited with code ${code}`)
    })
  }

  // 3. Locate and Launch Server
  // We prioritize server-production.js then server.js
  const potentialServers = [
    path.join(cwd, 'server-production.js'),
    path.join(cwd, 'server.js'),
    path.join(cwd, '.next/standalone/server.js'),
  ]

  let serverPath = null
  for (const p of potentialServers) {
    if (fs.existsSync(p)) {
      serverPath = p
      break
    }
  }

  if (!serverPath) {
    // Robust recursive fallback
    const findIn = (dir, depth = 0) => {
      if (depth > 3) return null
      const items = fs.readdirSync(dir)
      for (const item of items) {
        if (item === 'node_modules' || item === '.next') continue
        const full = path.join(dir, item)
        if (item === 'server-production.js' || item === 'server.js') return full
        if (fs.statSync(full).isDirectory()) {
          const found = findIn(full, depth + 1)
          if (found) return found
        }
      }
      return null
    }
    serverPath = findIn(cwd)
  }

  if (!serverPath) {
    console.error('❌ [Startup] FATAL: Server entry point not found!')
    // We stay alive for a bit anyway so logs can be collected
    setTimeout(() => process.exit(1), 10000)
    return
  }

  console.log(`[Startup] Launching node ${serverPath}`)
  const child = spawn('node', [serverPath], {
    stdio: 'inherit',
    env: {
      ...process.env,
      // Aggressive memory limit for node if env tells us
      NODE_OPTIONS: process.env.NODE_OPTIONS || '--max-old-space-size=768',
    },
  })

  child.on('error', err => {
    console.error('❌ [Startup] Child process error:', err)
  })

  child.on('exit', code => {
    console.log(`[Startup] Server process exited with code ${code}`)
    // If it crashes, we wait a bit before exiting the parent so Cloud Run logs it
    setTimeout(() => process.exit(code || 0), 5000)
  })
}

// Global survivors
process.on('uncaughtException', err => console.error('🔥 [Startup] Uncaught Exception:', err))
process.on('unhandledRejection', reason =>
  console.error('🔥 [Startup] Unhandled Rejection:', reason)
)

start().catch(err => {
  console.error('🔥 [Startup] Fatal Error:', err)
  setTimeout(() => process.exit(1), 10000)
})
