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
  const pool = new Pool({ connectionString: databaseUrl })
  const db = drizzle(pool)

  try {
    await migrate(db, { migrationsFolder })
  } finally {
    await pool.end()
  }
}

if (require.main === module) {
  runMigrations()
    .then(() => {
      console.log('[Migrations] Completed successfully')
    })
    .catch((error) => {
      console.error('[Migrations] Failed to run migrations:', error)
      process.exit(1)
    })
}

module.exports = { runMigrations }
