import type { Session } from 'next-auth'
import { and, eq, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { familyAccount, familyMember, profile, user } from '@/lib/db/schema'
import cacheManager from '@/lib/cache-manager'

/** Parent API cache TTLs - optimized for 85%+ hit rate, Chinese market */
export const PARENT_CACHE_TTL = {
  DASHBOARD: parseInt(process.env.CACHE_TTL_PARENT_DASHBOARD || '180', 10),
  STUDENT_ANALYTICS: parseInt(process.env.CACHE_TTL_STUDENT_ANALYTICS || '45', 10),
  FINANCIAL: parseInt(process.env.CACHE_TTL_PARENT_FINANCIAL || '120', 10),
  FAMILY: parseInt(process.env.CACHE_TTL_PARENT_FAMILY || '300', 10),
} as const

const CACHE_TTL_PARENT = PARENT_CACHE_TTL.FAMILY

export interface FamilyMemberWithUser {
  id: string
  name: string
  relation: string
  email: string | null
  userId: string | null
  user?: {
    id: string
    email: string
    profile: { name: string | null; gradeLevel?: string | null; avatarUrl?: string | null } | null
  } | null
}

export interface FamilyAccountWithMembers {
  id: string
  familyName: string
  primaryEmail: string
  defaultCurrency: string
  monthlyBudget: number
  enableBudget?: boolean
  members: FamilyMemberWithUser[]
  studentIds: string[]
}

export async function getFamilyAccountForParent(
  session: Session,
  useCache = true
): Promise<FamilyAccountWithMembers | null> {
  const email = session?.user?.email
  if (!email) return null

  const cacheKey = 'parent:family:' + session.user.id

  if (useCache) {
    const cached = await cacheManager.get<FamilyAccountWithMembers>(cacheKey)
    if (cached) return cached
  }

  const parentRelations = ['parent', 'PARENT', 'guardian']
  const [memberLink] = await drizzleDb
    .select()
    .from(familyMember)
    .where(
      and(
        eq(familyMember.userId, session.user.id),
        inArray(familyMember.relation, parentRelations)
      )
    )
    .limit(1)

  if (memberLink) {
    const [fa] = await drizzleDb
      .select()
      .from(familyAccount)
      .where(eq(familyAccount.id, memberLink.familyAccountId))
      .limit(1)
    if (fa) {
      const members = await drizzleDb
        .select()
        .from(familyMember)
        .where(eq(familyMember.familyAccountId, fa.id))
      const userIds = members.map((m) => m.userId).filter(Boolean) as string[]
      const users =
        userIds.length > 0
          ? await drizzleDb.select({ id: user.id, email: user.email }).from(user).where(inArray(user.id, userIds))
          : []
      const profiles =
        userIds.length > 0
          ? await drizzleDb
              .select({ userId: profile.userId, name: profile.name, gradeLevel: profile.gradeLevel, avatarUrl: profile.avatarUrl })
              .from(profile)
              .where(inArray(profile.userId, userIds))
          : []
      const userMap = Object.fromEntries(users.map((u) => [u.id, u]))
      const profileByUserId = Object.fromEntries(profiles.map((p) => [p.userId, p]))

      const studentIds = members
        .filter((m) => m.userId && ['child', 'children'].includes(m.relation.toLowerCase()))
        .map((m) => m.userId!)
        .filter(Boolean)

      const result: FamilyAccountWithMembers = {
        id: fa.id,
        familyName: fa.familyName,
        primaryEmail: fa.primaryEmail,
        defaultCurrency: fa.defaultCurrency,
        monthlyBudget: fa.monthlyBudget,
        enableBudget: fa.enableBudget,
        members: members.map((m) => {
          const u = m.userId ? userMap[m.userId] : undefined
          const p = m.userId ? profileByUserId[m.userId] : undefined
          return {
            id: m.id,
            name: m.name,
            relation: m.relation,
            email: m.email,
            userId: m.userId,
            user: u
              ? {
                  id: u.id,
                  email: u.email ?? '',
                  profile: p ? { name: p.name, gradeLevel: p.gradeLevel, avatarUrl: p.avatarUrl } : null,
                }
              : null,
          }
        }),
        studentIds,
      }

      await cacheManager.set(cacheKey, result, {
        ttl: CACHE_TTL_PARENT,
        tags: ['parent', 'parent:' + session.user.id, 'family:' + fa.id],
      })
      return result
    }
  }

  const [faByEmail] = await drizzleDb
    .select()
    .from(familyAccount)
    .where(
      and(
        eq(familyAccount.primaryEmail, email.toLowerCase()),
        eq(familyAccount.isActive, true)
      )
    )
    .limit(1)

  if (!faByEmail) return null

  const members = await drizzleDb
    .select()
    .from(familyMember)
    .where(eq(familyMember.familyAccountId, faByEmail.id))
  const userIds = members.map((m) => m.userId).filter(Boolean) as string[]
  const users =
    userIds.length > 0
      ? await drizzleDb.select({ id: user.id, email: user.email }).from(user).where(inArray(user.id, userIds))
      : []
  const profiles =
    userIds.length > 0
      ? await drizzleDb
          .select({ userId: profile.userId, name: profile.name, gradeLevel: profile.gradeLevel, avatarUrl: profile.avatarUrl })
          .from(profile)
          .where(inArray(profile.userId, userIds))
      : []
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]))
  const profileByUserId = Object.fromEntries(profiles.map((p) => [p.userId, p]))

  const studentIds = members
    .filter((m) => m.userId && ['child', 'children'].includes(m.relation.toLowerCase()))
    .map((m) => m.userId!)
    .filter(Boolean)

  const result: FamilyAccountWithMembers = {
    id: faByEmail.id,
    familyName: faByEmail.familyName,
    primaryEmail: faByEmail.primaryEmail,
    defaultCurrency: faByEmail.defaultCurrency,
    monthlyBudget: faByEmail.monthlyBudget,
    enableBudget: faByEmail.enableBudget,
    members: members.map((m) => {
      const u = m.userId ? userMap[m.userId] : undefined
      const p = m.userId ? profileByUserId[m.userId] : undefined
      return {
        id: m.id,
        name: m.name,
        relation: m.relation,
        email: m.email,
        userId: m.userId,
        user: u
          ? {
              id: u.id,
              email: u.email ?? '',
              profile: p ? { name: p.name, gradeLevel: p.gradeLevel, avatarUrl: p.avatarUrl } : null,
            }
          : null,
      }
    }),
    studentIds,
  }

  await cacheManager.set(cacheKey, result, {
    ttl: CACHE_TTL_PARENT,
    tags: ['parent', 'parent:' + session.user.id, 'family:' + faByEmail.id],
  })

  return result
}

export async function invalidateParentCache(userId: string): Promise<void> {
  await cacheManager.invalidateTag('parent:' + userId)
}
