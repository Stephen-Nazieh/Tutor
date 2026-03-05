import { and, eq } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumEnrollment } from '@/lib/db/schema'

export async function tutorHasStudent(tutorId: string, studentId: string): Promise<boolean> {
  const [row] = await drizzleDb
    .select({ id: curriculumEnrollment.id })
    .from(curriculumEnrollment)
    .innerJoin(curriculum, eq(curriculum.id, curriculumEnrollment.curriculumId))
    .where(and(eq(curriculum.creatorId, tutorId), eq(curriculumEnrollment.studentId, studentId)))
    .limit(1)
  return !!row
}

export async function tutorOwnsCurriculum(tutorId: string, curriculumId: string): Promise<boolean> {
  const [row] = await drizzleDb
    .select({ id: curriculum.id })
    .from(curriculum)
    .where(and(eq(curriculum.id, curriculumId), eq(curriculum.creatorId, tutorId)))
    .limit(1)
  return !!row
}
