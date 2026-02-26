/**
 * Drizzle Kit configuration (migrations, introspect, studio).
 * Used by: drizzle-kit generate, drizzle-kit pull, drizzle-kit studio, drizzle-kit push.
 */
import path from 'node:path'
import { defineConfig } from 'drizzle-kit'

// Load .env and .env.local from cwd and from config dir (so Studio works when launched from repo root)
const configDir = path.resolve(__dirname)
const dirsToTry = [process.cwd(), configDir]
function loadEnv(filePath: string) {
  try {
    const { readFileSync } = require('node:fs')
    const content = readFileSync(filePath, 'utf-8')
    for (const line of content.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eq = trimmed.indexOf('=')
      if (eq === -1) continue
      const key = trimmed.slice(0, eq).trim()
      let value = trimmed.slice(eq + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))
        value = value.slice(1, -1)
      if (key && !process.env[key]) process.env[key] = value
    }
  } catch {
    // ignore missing file
  }
}
for (const dir of dirsToTry) {
  loadEnv(path.join(dir, '.env'))
  loadEnv(path.join(dir, '.env.local'))
}

// DIRECT_URL or DATABASE_URL; default matches standalone Postgres on 5433 (tutorme-start.sh launcher)
const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || 'postgresql://tutorme:tutorme_password@localhost:5433/tutorme'

export default defineConfig({
  schema: './src/lib/db/schema/index.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: connectionString,
  },
})
