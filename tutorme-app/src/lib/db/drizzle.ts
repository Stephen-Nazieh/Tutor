/**
 * Drizzle ORM client (primary).
 * Use this for all new code and runtime queries.
 */
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString =
  process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL

// Singleton pool for server (avoid many connections in dev)
const globalForDrizzle = globalThis as unknown as { drizzlePool: Pool | undefined; drizzleDb?: NodePgDatabase<typeof schema> }

function getPool(): Pool {
  if (!connectionString) {
    throw new Error(
      'Missing database URL. Set DATABASE_URL, DIRECT_URL, or DATABASE_POOL_URL in .env or .env.local'
    )
  }

  const pool =
    globalForDrizzle.drizzlePool ??
    new Pool({
      connectionString,
      max: 50,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    })

  if (process.env.NODE_ENV !== 'production') {
    globalForDrizzle.drizzlePool = pool
  }

  return pool
}

function getDrizzleDb(): NodePgDatabase<typeof schema> {
  if (!globalForDrizzle.drizzleDb) {
    globalForDrizzle.drizzleDb = drizzle(getPool(), { schema })
  }
  return globalForDrizzle.drizzleDb
}

/**
 * Drizzle DB client with schema (for relational queries).
 * Import as: import { drizzleDb } from '@/lib/db'
 * Lazy initialization - only connects when first used
 */
export const drizzleDb = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    return getDrizzleDb()[prop as keyof NodePgDatabase<typeof schema>]
  },
})

export type DrizzleDb = typeof drizzleDb
