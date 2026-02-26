/**
 * Run Drizzle migrations (applies SQL in ./drizzle to the database).
 * Usage: npm run drizzle:migrate   or   tsx src/lib/db/drizzle-migrate.ts
 */
import path from 'node:path'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg'

// Load .env and .env.local
const projectRoot = path.resolve(process.cwd())
for (const name of ['.env', '.env.local']) {
  try {
    const { readFileSync } = require('node:fs')
    const content = readFileSync(path.join(projectRoot, name), 'utf-8')
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
    // ignore
  }
}

const connectionString =
  process.env.DIRECT_URL || process.env.DATABASE_URL || 'postgresql://localhost:5433/tutorme'

async function main() {
  const pool = new Pool({ connectionString, max: 1 })
  const db = drizzle(pool)
  const migrationsFolder = path.join(projectRoot, 'drizzle')
  console.log('Running Drizzle migrations from', migrationsFolder)
  await migrate(db, { migrationsFolder })
  await pool.end()
  console.log('Migrations complete.')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
