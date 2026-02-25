/**
 * Parent-Child Security Database Queries
 * Student existence verification and FamilyMember linking with RBAC
 */

import { db } from '@/lib/db'
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
    const byEmail = await db.user.findFirst({
      where: {
        email: input.childEmail.toLowerCase(),
        role: 'STUDENT',
      },
      select: {
        id: true,
        email: true,
        profile: { select: { name: true, studentUniqueId: true } },
      },
    })
    if (byEmail) {
      return {
        userId: byEmail.id,
        email: byEmail.email,
        name: byEmail.profile?.name ?? null,
        studentUniqueId: byEmail.profile?.studentUniqueId ?? null,
      }
    }
  }

  if (input.childUniqueId && input.childUniqueId.length >= 8) {
    const byUniqueId = await db.profile.findFirst({
      where: {
        studentUniqueId: input.childUniqueId,
        user: { role: 'STUDENT' },
      },
      select: {
        userId: true,
        user: { select: { email: true } },
        name: true,
        studentUniqueId: true,
      },
    })
    if (byUniqueId) {
      return {
        userId: byUniqueId.userId,
        email: byUniqueId.user.email,
        name: byUniqueId.name,
        studentUniqueId: byUniqueId.studentUniqueId,
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
  const existing = await db.familyMember.findFirst({
    where: {
      userId,
      relation: { in: ['child', 'children'] },
    },
  })
  return !!existing
}
