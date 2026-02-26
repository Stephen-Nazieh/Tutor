/**
 * Server-side enrollment logic (curriculum).
 * Used by POST /api/curriculum/[id]/enroll and by payment webhooks for course purchases.
 * Drizzle ORM.
 */

import { eq, and, inArray, sql } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumProgress,
  curriculumEnrollment,
} from '@/lib/db/schema'

export async function enrollStudentInCurriculum(
  studentId: string,
  curriculumId: string
): Promise<{ enrolled: boolean; progress?: { id: string } }> {
  const [curriculumRow] = await drizzleDb.select().from(curriculum).where(eq(curriculum.id, curriculumId)).limit(1)
  if (!curriculumRow) {
    throw new Error('Curriculum not found')
  }

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumId))
  const moduleIds = modules.map((m) => m.id)
  const totalLessonsResult =
    moduleIds.length > 0
      ? await drizzleDb
          .select({ count: sql<number>`count(*)::int` })
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
      : [{ count: 0 }]
  const totalLessons = totalLessonsResult[0]?.count ?? 0

  const [existingProgress] = await drizzleDb
    .select()
    .from(curriculumProgress)
    .where(and(eq(curriculumProgress.studentId, studentId), eq(curriculumProgress.curriculumId, curriculumId)))
    .limit(1)
  if (existingProgress) {
    return { enrolled: false }
  }

  const [existingEnrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(and(eq(curriculumEnrollment.studentId, studentId), eq(curriculumEnrollment.curriculumId, curriculumId)))
    .limit(1)

  if (existingEnrollment) {
    await drizzleDb
      .update(curriculumEnrollment)
      .set({ enrollmentSource: 'signup' })
      .where(eq(curriculumEnrollment.id, existingEnrollment.id))
  } else {
    await drizzleDb.insert(curriculumEnrollment).values({
      id: crypto.randomUUID(),
      studentId,
      curriculumId,
      lessonsCompleted: 0,
      enrollmentSource: 'signup',
    })
  }

  const inserted = await drizzleDb
    .insert(curriculumProgress)
    .values({
      id: crypto.randomUUID(),
      studentId,
      curriculumId,
      lessonsCompleted: 0,
      totalLessons,
      isCompleted: false,
    })
    .returning()

  return { enrolled: true, progress: inserted[0] ? { id: inserted[0].id } : undefined }
}
