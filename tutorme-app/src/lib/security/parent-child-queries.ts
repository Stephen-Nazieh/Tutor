/**
 * Parent-Child Security Database Queries
 * Student existence verification and FamilyMember linking with RBAC
 * (Drizzle ORM)
 */

import { eq, and, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, profile, familyMember } from '@/lib/db/schema'
import type { StudentLinkingInput } from '@/lib/validation/parent-child-security'

export interface VerifiedStudent {
  userId: string
  email: string
  name: string | null
  studentUniqueId: string | null
}

/**
 * Verify student exists by email or unique ID.
 * Returns the student User if found, null otherwise.
 * Optimized for <200ms response time.
 */
export async function verifyStudentExists(
  input: StudentLinkingInput
): Promise<VerifiedStudent | null> {
  if (input.childEmail) {
    const normalized = input.childEmail.toLowerCase()
    const rows = await drizzleDb
      .select({
        userId: user.id,
        email: user.email,
        name: profile.name,
        studentUniqueId: profile.studentUniqueId,
      })
      .from(user)
      .innerJoin(profile, eq(profile.userId, user.id))
      .where(and(eq(user.email, normalized), eq(user.role, 'STUDENT')))
      .limit(1)
    const row = rows[0]
    if (row) {
      return {
        userId: row.userId,
        email: row.email,
        name: row.name ?? null,
        studentUniqueId: row.studentUniqueId ?? null,
      }
    }
  }

  if (input.childUniqueId && input.childUniqueId.length >= 8) {
    const rows = await drizzleDb
      .select({
        userId: profile.userId,
        email: user.email,
        name: profile.name,
        studentUniqueId: profile.studentUniqueId,
      })
      .from(profile)
      .innerJoin(user, eq(user.id, profile.userId))
      .where(
        and(
          eq(profile.studentUniqueId, input.childUniqueId),
          eq(user.role, 'STUDENT')
        )
      )
      .limit(1)
    const row = rows[0]
    if (row) {
      return {
        userId: row.userId,
        email: row.email,
        name: row.name ?? null,
        studentUniqueId: row.studentUniqueId ?? null,
      }
    }
  }

  return null
}

/**
 * Verify all children exist before parent registration.
 * Returns map of index -> VerifiedStudent or error message.
 */
export async function verifyAllChildren(
  children: StudentLinkingInput[]
): Promise<{
  verified: Map<number, VerifiedStudent>
  errors: Array<{ index: number; message: string }>
}> {
  const verified = new Map<number, VerifiedStudent>()
  const errors: Array<{ index: number; message: string }> = []

  const results = await Promise.all(
    children.map((child, index) => verifyStudentExists(child))
  )

  results.forEach((result, index) => {
    if (result) {
      verified.set(index, result)
    } else {
      const child = children[index]
      const identifier = child.childEmail || child.childUniqueId || 'provided'
      errors.push({
        index,
        message: `Child verification failed: No student found with ${identifier}. The child must register first at /register/student.`,
      })
    }
  })

  return { verified, errors }
}

/**
 * Check if student is already linked to another family account.
 */
export async function isStudentAlreadyLinked(userId: string): Promise<boolean> {
  const rows = await drizzleDb
    .select({ id: familyMember.id })
    .from(familyMember)
    .where(
      and(
        eq(familyMember.userId, userId),
        inArray(familyMember.relation, ['child', 'children'])
      )
    )
    .limit(1)
  return rows.length > 0
}
