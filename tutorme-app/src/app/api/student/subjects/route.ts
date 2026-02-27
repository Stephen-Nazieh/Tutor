/**
 * Student Subjects API
 * Get enrolled subjects with progress
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
  quizAttempt,
} from '@/lib/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'

export const GET = withAuth(async (req, session) => {
  const enrollmentsRows = await drizzleDb
    .select({
      curriculumId: curriculum.id,
      curriculumName: curriculum.name,
      curriculumSubject: curriculum.subject,
      curriculumDescription: curriculum.description,
      lastActivity: curriculumEnrollment.lastActivity,
      enrollmentSource: curriculumEnrollment.enrollmentSource,
    })
    .from(curriculumEnrollment)
    .innerJoin(curriculum, eq(curriculumEnrollment.curriculumId, curriculum.id))
    .where(eq(curriculumEnrollment.studentId, session.user.id))

  const quizAttempts = await drizzleDb
    .select()
    .from(quizAttempt)
    .where(eq(quizAttempt.studentId, session.user.id))
    .orderBy(desc(quizAttempt.completedAt))
    .limit(10)

  const avgScore =
    quizAttempts.length > 0
      ? quizAttempts.reduce(
          (sum, a) => sum + (a.score / a.maxScore) * 100,
          0
        ) / quizAttempts.length
      : 0

  const progressByCurriculum = new Map<string, { total: number; completed: number }>()
  for (const row of enrollmentsRows) {
    const key = row.curriculumId
    if (!progressByCurriculum.has(key)) {
      const mods = await drizzleDb
        .select()
        .from(curriculumModule)
        .where(eq(curriculumModule.curriculumId, key))
      const mids = mods.map((m) => m.id)
      const less =
        mids.length > 0
          ? await drizzleDb
              .select()
              .from(curriculumLesson)
              .where(inArray(curriculumLesson.moduleId, mids))
          : []
      const recs = await drizzleDb
        .select()
        .from(curriculumLessonProgress)
        .where(
          eq(curriculumLessonProgress.studentId, session.user.id)
        )
      const completed = recs.filter(
        (r) => r.status === 'COMPLETED' && less.some((l) => l.id === r.lessonId)
      ).length
      progressByCurriculum.set(key, { total: less.length, completed })
    }
  }

  const subjects = enrollmentsRows.map((enrollment) => {
    const { total, completed } = progressByCurriculum.get(enrollment.curriculumId) ?? {
      total: 0,
      completed: 0,
    }
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0
    const skills = generateSubjectSkills(enrollment.curriculumSubject, avgScore)
    return {
      id: enrollment.curriculumId,
      name: enrollment.curriculumName,
      subject: enrollment.curriculumSubject,
      description: enrollment.curriculumDescription,
      progress,
      completedLessons: completed,
      totalLessons: total,
      skills,
      confidence: Math.round(avgScore),
      lastStudied: enrollment.lastActivity
        ? new Date(enrollment.lastActivity).toLocaleDateString()
        : null,
      enrollmentSource: enrollment.enrollmentSource ?? null,
    }
  })

  return NextResponse.json({ subjects })
}, { role: 'STUDENT' })

function generateSubjectSkills(subjectCode: string, baseScore: number) {
  const skillsMap: Record<string, string[]> = {
    english: ['Grammar', 'Vocabulary', 'Writing', 'Reading Comprehension', 'Speaking'],
    math: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Problem Solving'],
    physics: ['Mechanics', 'Thermodynamics', 'Electricity', 'Waves', 'Quantum'],
    chemistry: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
    biology: ['Cell Biology', 'Genetics', 'Ecology', 'Anatomy', 'Evolution'],
    history: ['Ancient', 'Medieval', 'Modern', 'World Wars', 'Civilizations'],
    cs: ['Programming', 'Algorithms', 'Data Structures', 'Databases', 'Web Dev'],
  }

  const skillNames = skillsMap[subjectCode.toLowerCase()] || ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']
  
  return skillNames.map((name, index) => ({
    name,
    score: Math.min(100, Math.max(20, Math.round(baseScore - 8 + index * 4)))
  }))
}
