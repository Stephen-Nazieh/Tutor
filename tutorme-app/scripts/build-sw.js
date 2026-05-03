#!/usr/bin/env node
/**
 * Builds the service worker from TypeScript source to public/sw.js
 */
const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const src = path.join(__dirname, '../src/lib/pwa/service-worker.ts')
const dest = path.join(__dirname, '../public/sw.js')

if (!fs.existsSync(src)) {
  console.error('Service worker source not found:', src)
  process.exit(1)
}

const cacheVersion =
  process.env.GITHUB_SHA ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  process.env.SW_CACHE_VERSION ||
  String(Date.now())

try {
  // Use esbuild for fast compilation (installed as transitive dep or use npx)
  execSync(
    `npx esbuild "${src}" --outfile="${dest}" --bundle --format=iife --target=es2017 --platform=browser --minify --define:__SW_CACHE_VERSION__=\\"${cacheVersion}\\"`,
    { stdio: 'inherit' }
  )
  console.log('Service worker built successfully:', dest)
} catch (err) {
  console.error('Failed to build service worker:', err.message)
  process.exit(1)
}
