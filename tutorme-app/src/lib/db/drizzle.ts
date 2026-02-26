/**
 * Drizzle ORM client (Phase 1).
 * Use this for new code; existing app still uses Prisma via db from index.ts until Phase 3–4.
 */
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import * as schema from './schema'

const connectionString =
  process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL

if (!connectionString) {
  throw new Error(
    'Missing database URL. Set DATABASE_URL, DIRECT_URL, or DATABASE_POOL_URL in .env or .env.local'
  )
}

// Singleton pool for server (avoid many connections in dev)
const globalForDrizzle = globalThis as unknown as { drizzlePool: Pool | undefined }

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

/**
 * Drizzle DB client with schema (for relational queries).
 * Import as: import { drizzleDb } from '@/lib/db'
 */
export const drizzleDb = drizzle(pool, { schema })

export type DrizzleDb = typeof drizzleDb
