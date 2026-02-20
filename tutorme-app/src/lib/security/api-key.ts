/**
 * API key management: create, verify, revoke.
 * Keys are hashed (SHA-256) before storage; plain key is returned only on create.
 */

import crypto from 'crypto'
import { db } from '@/lib/db'

const HASH_ALGO = 'sha256'
const KEY_PREFIX = 'tm_'
const KEY_BYTES = 32

function hashKey(plain: string): string {
  return crypto.createHash(HASH_ALGO).update(plain).digest('hex')
}

/**
 * Generate a new API key. Returns { id, name, key } - store `key` securely; it cannot be retrieved again.
 */
export async function createApiKey(name: string, createdById?: string): Promise<{ id: string; name: string; key: string }> {
  const raw = crypto.randomBytes(KEY_BYTES).toString('base64url')
  const key = KEY_PREFIX + raw
  const keyHash = hashKey(key)
  const record = await db.apiKey.create({
    data: { name, keyHash, createdById }
  })
  return { id: record.id, name: record.name, key }
}

/**
 * Verify Bearer token and return key record id if valid. Updates lastUsedAt.
 */
export async function verifyApiKey(bearerToken: string): Promise<{ id: string } | null> {
  if (!bearerToken.startsWith(KEY_PREFIX)) return null
  const keyHash = hashKey(bearerToken)
  const record = await db.apiKey.findFirst({ where: { keyHash } })
  if (!record) return null
  await db.apiKey.update({
    where: { id: record.id },
    data: { lastUsedAt: new Date() }
  })
  return { id: record.id }
}

/**
 * Revoke (delete) an API key by id.
 */
export async function revokeApiKey(id: string): Promise<boolean> {
  const result = await db.apiKey.deleteMany({ where: { id } })
  return result.count > 0
}

/**
 * List API keys (without secret). Optional filter by createdById.
 */
export async function listApiKeys(createdById?: string) {
  return db.apiKey.findMany({
    where: createdById ? { createdById } : undefined,
    select: { id: true, name: true, createdAt: true, lastUsedAt: true },
    orderBy: { createdAt: 'desc' }
  })
}
