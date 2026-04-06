const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

/**
 * Robust search for server entry point in monorepo standalone structure
 */
function findServerFile(searchDir, targetFiles, depth = 0) {
  if (depth > 5) return null // Safety limit
  
  // Try direct matches in current dir first
  for (const file of targetFiles) {
    const fullPath = path.join(searchDir, file)
    if (fs.existsSync(fullPath)) {
      return fullPath
    }
  }

  // Recursive search if not found
  try {
    const items = fs.readdirSync(searchDir)
    for (const item of items) {
      if (item === 'node_modules' || item === '.next' || item.startsWith('.')) continue
      
      const fullPath = path.join(searchDir, item)
      if (fs.statSync(fullPath).isDirectory()) {
        const found = findServerFile(fullPath, targetFiles, depth + 1)
        if (found) return found
      }
    }
  } catch (e) {
    // Ignore permission errors etc
  }
  
  return null
}

async function start() {
  const cwd = process.cwd()
  console.log('--- [Rigorous Startup Sequence] ---')
  console.log(`[Startup] Time: ${new Date().toISOString()}`)
  console.log(`[Startup] Working Directory: ${cwd}`)
  console.log(`[Startup] Target Port: ${process.env.PORT || '3003'}`)
  console.log(`[Startup] Node Version: ${process.version}`)

  try {
    // 1. Run migrations if available
    const migrationsScript = path.join(cwd, 'scripts/run-migrations.js')
    if (fs.existsSync(migrationsScript)) {
      console.log('[Startup] Phase 1: Database Migrations')
      const { runMigrations } = require('./run-migrations')
      await runMigrations().catch(err => {
        console.warn(`[Startup] Migration warning: ${err.message}`)
      })
      console.log('[Startup] Migrations handled.')
    } else {
      console.log('[Startup] Phase 1: Skipping migrations (no script found)')
    }

    // 2. Locate server
    console.log('[Startup] Phase 2: Locating Server Entry Point')
    // Prioritize our custom bundle server-production.js, then fallback to Next.js server.js
    const serverPath = findServerFile(cwd, ['server-production.js', 'server.js'])

    if (!serverPath) {
      console.error('❌ [Startup] FATAL: Could not locate server-production.js or server.js')
      console.log('[Startup] Debugging Filesystem Structure:')
      const logDir = (dir, currentDepth = 0) => {
        if (currentDepth > 2) return
        try {
          const items = fs.readdirSync(dir)
          console.log(`[Startup] Contents of ${dir}: ${items.join(', ')}`)
          for (const item of items) {
            const p = path.join(dir, item)
            if (fs.statSync(p).isDirectory()) logDir(p, currentDepth + 1)
          }
        } catch (e) {}
      }
      logDir(cwd)
      process.exit(1)
    }

    const serverDir = path.dirname(serverPath)
    const serverFile = path.basename(serverPath)
    console.log(`[Startup] ✅ Found ${serverFile} at ${serverPath}`)
    
    // 3. Start Server
    console.log(`[Startup] Phase 3: Launching '${serverFile}' from ${serverDir}`)
    const child = spawn('node', [serverPath], {
      stdio: 'inherit',
      cwd: serverDir, // Run from the directory where the server file is located
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
        NODE_PATH: `${cwd}:${cwd}/node_modules:${process.env.NODE_PATH || ''}`
      }
    })

    child.on('error', (err) => {
      console.error('❌ [Startup] Failed to start server process:', err)
      process.exit(1)
    })

    child.on('exit', (code) => {
      if (code !== 0 && code !== null) {
        console.error(`❌ [Startup] Server process exited with code: ${code}`)
      } else {
        console.log(`[Startup] Server process exited gracefully (code: ${code})`)
      }
      process.exit(code || 0)
    })

    // Handle termination signals
    const signals = ['SIGTERM', 'SIGINT', 'SIGQUIT']
    signals.forEach(sig => {
      process.on(sig, () => {
        console.log(`[Startup] ${sig} received, propagating to server...`)
        child.kill(sig)
      })
    })

  } catch (err) {
    console.error('❌ [Startup] Unhandled error during startup:', err)
    process.exit(1)
  }
}

start()
