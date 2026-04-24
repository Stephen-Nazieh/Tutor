#!/usr/bin/env node
/**
 * Execute SQL migration file directly against the database
 * Usage: node scripts/run-sql-migration.js <sql-file>
 */
const fs = require('node:fs')
const path = require('node:path')
const { Pool } = require('pg')

async function runSqlMigration() {
  const sqlFile = process.argv[2] || 'drizzle/0037_cleanup_deprecated_schema.sql'

  const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!databaseUrl) {
    console.error('[ERROR] DATABASE_URL or DIRECT_URL environment variable is required')
    console.error('[INFO] Usage: DIRECT_URL=<url> node scripts/run-sql-migration.js [sql-file]')
    process.exit(1)
  }

  const sqlPath = path.join(process.cwd(), sqlFile)
  if (!fs.existsSync(sqlPath)) {
    console.error(`[ERROR] SQL file not found: ${sqlPath}`)
    process.exit(1)
  }

  const sql = fs.readFileSync(sqlPath, 'utf-8')
  const pool = new Pool({ connectionString: databaseUrl })

  console.log(`[Migration] Executing SQL from: ${sqlFile}`)
  console.log(`[Migration] Database: ${databaseUrl.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@')}`)

  try {
    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'))

    const client = await pool.connect()
    try {
      for (const statement of statements) {
        const fullStatement = statement + ';'
        console.log(`[Executing] ${fullStatement.substring(0, 80)}...`)
        await client.query(fullStatement)
      }
      console.log('[Migration] ✅ All SQL statements executed successfully')
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('[Migration] ❌ Failed:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

runSqlMigration()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))
