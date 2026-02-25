import type { Session } from 'next-auth'
import { db } from '@/lib/db'
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

  const memberLink = await db.familyMember.findFirst({
    where: { userId: session.user.id, relation: { in: ['parent', 'PARENT', 'guardian'] } },
    include: {
      familyAccount: {
        include: {
          members: {
            include: {
              user: {
                select: { id: true, email: true, profile: { select: { name: true, gradeLevel: true, avatarUrl: true } } },
              },
            },
          },
        },
      },
    },
  })

  if (memberLink?.familyAccount) {
    const family = memberLink.familyAccount
    const studentIds = family.members
      .filter((m) => m.userId && ['child', 'children'].includes(m.relation.toLowerCase()))
      .map((m) => m.userId!)
      .filter(Boolean)

    const result: FamilyAccountWithMembers = {
      id: family.id,
      familyName: family.familyName,
      primaryEmail: family.primaryEmail,
      defaultCurrency: family.defaultCurrency,
      monthlyBudget: family.monthlyBudget,
      members: family.members.map((m) => ({
        id: m.id,
        name: m.name,
        relation: m.relation,
        email: m.email,
        userId: m.userId,
        user: m.user,
      })),
      studentIds,
    }

    await cacheManager.set(cacheKey, result, {
      ttl: CACHE_TTL_PARENT,
      tags: ['parent', 'parent:' + session.user.id, 'family:' + family.id],
    })
    return result
  }

  const familyAccount = await db.familyAccount.findFirst({
    where: { primaryEmail: email.toLowerCase(), isActive: true },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, email: true, profile: { select: { name: true, gradeLevel: true, avatarUrl: true } } },
          },
        },
      },
    },
  })

  if (!familyAccount) return null

  const studentIds = familyAccount.members
    .filter((m) => m.userId && ['child', 'children'].includes(m.relation.toLowerCase()))
    .map((m) => m.userId!)
    .filter(Boolean)

  const result: FamilyAccountWithMembers = {
    id: familyAccount.id,
    familyName: familyAccount.familyName,
    primaryEmail: familyAccount.primaryEmail,
    defaultCurrency: familyAccount.defaultCurrency,
    monthlyBudget: familyAccount.monthlyBudget,
    members: familyAccount.members.map((m) => ({
      id: m.id,
      name: m.name,
      relation: m.relation,
      email: m.email,
      userId: m.userId,
      user: m.user,
    })),
    studentIds,
  }

  await cacheManager.set(cacheKey, result, {
    ttl: CACHE_TTL_PARENT,
    tags: ['parent', 'parent:' + session.user.id, 'family:' + familyAccount.id],
  })

  return result
}

export async function invalidateParentCache(userId: string): Promise<void> {
  await cacheManager.invalidateTag('parent:' + userId)
}
