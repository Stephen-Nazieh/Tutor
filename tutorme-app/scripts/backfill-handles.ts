/**
 * Backfill user handles for existing users missing a handle.
 *
 * Run: npx tsx scripts/backfill-handles.ts
 * Or:  npm run handles:backfill
 */

import { nanoid } from 'nanoid'
import { and, eq, isNotNull, isNull } from 'drizzle-orm'
import { drizzleDb } from '../src/lib/db/drizzle'
import { profile, user } from '../src/lib/db/schema'
import { HANDLE_REGEX, isReservedHandle, normalizeHandle } from '../src/lib/mentions/handles'

function normalizeHandleSeed(seed: string): string {
  const cleaned = seed
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, '')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
  if (cleaned.length >= 3) return cleaned.slice(0, 15)
  return `user${nanoid(6).toLowerCase()}`.slice(0, 15)
}

function pickHandleCandidate(
  profileUsername: string | null | undefined,
  profileName: string | null | undefined,
  email: string,
  usedHandles: Set<string>
): string {
  if (profileUsername) {
    const normalized = normalizeHandle(profileUsername)
    if (
      HANDLE_REGEX.test(normalized) &&
      !isReservedHandle(normalized) &&
      !usedHandles.has(normalized)
    ) {
      return normalized
    }
  }

  const seedCandidates = [profileName, email.split('@')[0], 'user'].filter(Boolean) as string[]

  for (const seed of seedCandidates) {
    const base = normalizeHandleSeed(seed)
    const handle = generateUniqueHandle(base, usedHandles)
    if (handle) return handle
  }

  return generateUniqueHandle(`user${nanoid(6).toLowerCase()}`, usedHandles)
}

function generateUniqueHandle(baseSeed: string, usedHandles: Set<string>): string {
  const base = normalizeHandleSeed(baseSeed)
  for (let attempt = 0; attempt < 30; attempt += 1) {
    const suffix = attempt === 0 ? '' : String(Math.floor(Math.random() * 9000) + 1000)
    const candidate = `${base}${suffix}`.slice(0, 15)
    if (!HANDLE_REGEX.test(candidate) || isReservedHandle(candidate)) continue
    if (!usedHandles.has(candidate)) {
      return candidate
    }
  }
  return `user${nanoid(8).toLowerCase()}`.slice(0, 15)
}

async function main() {
  const existing = await drizzleDb
    .select({ handle: user.handle })
    .from(user)
    .where(isNotNull(user.handle))

  const usedHandles = new Set(
    existing.map(row => row.handle?.toLowerCase()).filter(Boolean) as string[]
  )

  const usersToBackfill = await drizzleDb
    .select({
      userId: user.id,
      email: user.email,
      handle: user.handle,
      profileId: profile.id,
      profileUsername: profile.username,
      profileName: profile.name,
    })
    .from(user)
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(isNull(user.handle))

  let handleUpdates = 0
  let profileUpdates = 0

  for (const row of usersToBackfill) {
    const nextHandle = pickHandleCandidate(
      row.profileUsername,
      row.profileName,
      row.email,
      usedHandles
    )
    usedHandles.add(nextHandle)

    await drizzleDb.update(user).set({ handle: nextHandle }).where(eq(user.id, row.userId))
    handleUpdates += 1

    if (row.profileId) {
      const normalizedProfile = row.profileUsername ? normalizeHandle(row.profileUsername) : null
      if (!row.profileUsername || normalizedProfile !== nextHandle) {
        await drizzleDb
          .update(profile)
          .set({ username: nextHandle })
          .where(eq(profile.id, row.profileId))
        profileUpdates += 1
      }
    }
  }

  const profilesToSync = await drizzleDb
    .select({
      profileId: profile.id,
      profileUsername: profile.username,
      userHandle: user.handle,
    })
    .from(profile)
    .innerJoin(user, eq(user.id, profile.userId))
    .where(and(isNotNull(user.handle), isNull(profile.username)))

  for (const row of profilesToSync) {
    if (!row.userHandle || !row.profileId) continue
    await drizzleDb
      .update(profile)
      .set({ username: row.userHandle })
      .where(eq(profile.id, row.profileId))
    profileUpdates += 1
  }

  console.log(
    `Backfill complete. Handles created: ${handleUpdates}. Profile usernames updated: ${profileUpdates}.`
  )
}

main()
  .catch(err => {
    console.error('Handle backfill failed:', err)
    process.exit(1)
  })
  .finally(() => {
    process.exit(0)
  })
