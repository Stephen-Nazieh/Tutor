#!/usr/bin/env node
/**
 * Database migration script for production (no tsx required)
 * Usage: node scripts/migrate.js
 */
const path = require('node:path')
const { Pool } = require('pg')
const { drizzle } = require('drizzle-orm/node-postgres')
const { migrate } = require('drizzle-orm/node-postgres/migrator')

async function runMigrations() {
  const databaseUrl = process.env.DIRECT_URL || process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL or DIRECT_URL is required to run migrations')
  }

  const migrationsFolder = path.join(process.cwd(), 'drizzle')
  const pool = new Pool({ connectionString: databaseUrl, max: 1 })
  const db = drizzle(pool)

  console.log('[Migrations] Running migrations from:', migrationsFolder)
  console.log('[Migrations] Database:', databaseUrl.replace(/:\/\/[^:]+:[^@]+@/, '://***:***@'))

  try {
    await migrate(db, { migrationsFolder })
    console.log('[Migrations] Completed successfully')
  } catch (error) {
    console.error('[Migrations] Failed:', error.message)
    throw error
  } finally {
    await pool.end()
  }
}

runMigrations()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error('[Migrations] Fatal error:', error)
    process.exit(1)
  })
