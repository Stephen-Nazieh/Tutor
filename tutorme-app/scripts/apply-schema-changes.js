#!/usr/bin/env node
/**
 * Apply idempotent schema fixes from apply-schema-changes.sql
 * Run with: node scripts/apply-schema-changes.js
 * Or: npm run db:apply-schema
 */

const { Pool } = require('pg')
const fs = require('fs')
const path = require('path')

const connectionString =
  process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL

if (!connectionString) {
  console.error('Missing database URL. Set DATABASE_URL, DIRECT_URL, or DATABASE_POOL_URL.')
  process.exit(1)
}

const sqlPath = path.join(__dirname, 'apply-schema-changes.sql')
const sql = fs.readFileSync(sqlPath, 'utf-8')

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

async function run() {
  console.log('Connecting to database...')
  const client = await pool.connect()
  try {
    console.log('Applying schema fixes...')
    await client.query(sql)
    console.log('✅ Schema fixes applied successfully.')
  } catch (error) {
    console.error('❌ Failed to apply schema fixes:', error.message)
    if (error.position) {
      const lines = sql.split('\n')
      let pos = 0
      for (let i = 0; i < lines.length; i++) {
        const lineLen = lines[i].length + 1
        if (pos + lineLen >= error.position) {
          console.error(`  Near line ${i + 1}: ${lines[i].trim()}`)
          break
        }
        pos += lineLen
      }
    }
    process.exit(1)
  } finally {
    client.release()
    await pool.end()
  }
}

run()
