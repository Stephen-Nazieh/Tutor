const fs = require('node:fs')
const path = require('node:path')
const { spawn } = require('node:child_process')
const { runMigrations } = require('./run-migrations')

async function start() {
  const skipMigrations = process.env.SKIP_MIGRATIONS === 'true'
  const migrationsRequired = process.env.MIGRATIONS_REQUIRED !== 'false'

  if (!skipMigrations) {
    try {
      console.log('[Startup] Running database migrations...')
      await runMigrations()
    } catch (error) {
      console.error('[Startup] Migration failed:', error)
      if (migrationsRequired) {
        process.exit(1)
      }
    }
  } else {
    console.log('[Startup] Skipping migrations (SKIP_MIGRATIONS=true)')
  }

  const serverJs = path.join(process.cwd(), 'server.js')
  const hasServerJs = fs.existsSync(serverJs)

  const command = hasServerJs ? 'node' : 'npx'
  const args = hasServerJs ? ['server.js'] : ['tsx', 'server.ts']

  console.log(`[Startup] Launching server: ${command} ${args.join(' ')}`)
  const child = spawn(command, args, { stdio: 'inherit' })

  const forwardSignal = signal => {
    if (!child.killed) {
      child.kill(signal)
    }
  }

  process.on('SIGTERM', () => forwardSignal('SIGTERM'))
  process.on('SIGINT', () => forwardSignal('SIGINT'))

  child.on('exit', code => {
    process.exit(code ?? 0)
  })
}

start().catch(error => {
  console.error('[Startup] Failed to start:', error)
  process.exit(1)
})
