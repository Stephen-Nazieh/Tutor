/**
 * API key management: create, verify, revoke.
 * Keys are hashed (SHA-256) before storage; plain key is returned only on create.
 * (Drizzle ORM)
 */

import crypto from 'crypto'
import { desc, eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { apiKey } from '@/lib/db/schema'

const HASH_ALGO = 'sha256'
const KEY_PREFIX = 'tm_'
const KEY_BYTES = 32

function hashKey(plain: string): string {
  return crypto.createHash(HASH_ALGO).update(plain).digest('hex')
}

/**
 * Generate a new API key. Returns { id, name, key } - store `key` securely; it cannot be retrieved again.
 */
export async function createApiKey(
  name: string,
  createdById?: string
): Promise<{ id: string; name: string; key: string }> {
  const raw = crypto.randomBytes(KEY_BYTES).toString('base64url')
  const key = KEY_PREFIX + raw
  const keyHash = hashKey(key)
  const [record] = await drizzleDb
    .insert(apiKey)
    .values({ id: crypto.randomUUID(), name, keyHash, createdById })
    .returning()
  if (!record) throw new Error('Failed to create API key')
  return { id: record.id, name: record.name, key }
}

/**
 * Verify Bearer token and return key record id if valid. Updates lastUsedAt.
 */
export async function verifyApiKey(bearerToken: string): Promise<{ id: string } | null> {
  if (!bearerToken.startsWith(KEY_PREFIX)) return null
  const keyHash = hashKey(bearerToken)
  const [record] = await drizzleDb
    .select()
    .from(apiKey)
    .where(eq(apiKey.keyHash, keyHash))
    .limit(1)
  if (!record) return null
  await drizzleDb
    .update(apiKey)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiKey.id, record.id))
  return { id: record.id }
}

/**
 * Revoke (delete) an API key by id.
 */
export async function revokeApiKey(id: string): Promise<boolean> {
  const deleted = await drizzleDb
    .delete(apiKey)
    .where(eq(apiKey.id, id))
    .returning({ id: apiKey.id })
  return deleted.length > 0
}

/**
 * List API keys (without secret). Optional filter by createdById.
 */
export async function listApiKeys(createdById?: string) {
  const base = drizzleDb
    .select({
      id: apiKey.id,
      name: apiKey.name,
      createdAt: apiKey.createdAt,
      lastUsedAt: apiKey.lastUsedAt,
    })
    .from(apiKey)
    .orderBy(desc(apiKey.createdAt))
  return createdById
    ? base.where(eq(apiKey.createdById, createdById))
    : base
}
