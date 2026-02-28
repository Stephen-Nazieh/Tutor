/**
 * Subject Detail API
 * Get detailed information for a specific subject
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
  quizAttempt,
  userGamification,
} from '@/lib/db/schema'
import { eq, and, desc, inArray } from 'drizzle-orm'

export const GET = withAuth(async (_req: NextRequest, session, context) => {
  const subjectCode = await getParamAsync(context?.params, 'subjectCode')
  if (!subjectCode) {
    return NextResponse.json({ error: 'Subject code required' }, { status: 400 })
  }

  const [curriculumRow] = await drizzleDb
    .select()
    .from(curriculum)
    .where(eq(curriculum.subject, subjectCode))
    .limit(1)
  if (!curriculumRow) {
    throw new NotFoundError('Subject not found')
  }

  const [enrollment] = await drizzleDb
    .select()
    .from(curriculumEnrollment)
    .where(
      and(
        eq(curriculumEnrollment.studentId, session.user.id),
        eq(curriculumEnrollment.curriculumId, curriculumRow.id)
      )
    )
    .limit(1)
  if (!enrollment) {
    throw new NotFoundError('Subject not found')
  }

  const modules = await drizzleDb
    .select()
    .from(curriculumModule)
    .where(eq(curriculumModule.curriculumId, curriculumRow.id))
  const moduleIds = modules.map((m) => m.id)
  const lessons =
    moduleIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
      : []
  const lessonIds = lessons.map((l) => l.id)
  const progressRecords =
    lessonIds.length > 0
      ? await drizzleDb
          .select()
          .from(curriculumLessonProgress)
          .where(
            and(
              eq(curriculumLessonProgress.studentId, session.user.id),
              inArray(curriculumLessonProgress.lessonId, lessonIds)
            )
          )
      : []
  const progressByLessonId = new Map(
    progressRecords.map((p) => [p.lessonId, p])
  )

  const quizAttempts = await drizzleDb
    .select()
    .from(quizAttempt)
    .where(eq(quizAttempt.studentId, session.user.id))
    .orderBy(desc(quizAttempt.completedAt))
    .limit(20)

  const [gamification] = await drizzleDb
    .select()
    .from(userGamification)
    .where(eq(userGamification.userId, session.user.id))
    .limit(1)

  const totalLessons = lessons.length
  const completedLessons = lessons.filter(
    (l) => progressByLessonId.get(l.id)?.status === 'COMPLETED'
  ).length
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0

  const avgScore =
    quizAttempts.length > 0
      ? quizAttempts.reduce(
          (sum, a) => sum + (a.score / a.maxScore) * 100,
          0
        ) / quizAttempts.length
      : 0

  const skills = generateSubjectSkills(subjectCode, avgScore)
  const conceptMastery =
    subjectCode.toLowerCase() === 'math'
      ? generateMathConceptMastery(quizAttempts)
      : undefined

  const recentLessons = lessons.slice(0, 5).map((lesson) => {
    const rec = progressByLessonId.get(lesson.id)
    return {
      id: lesson.id,
      title: lesson.title,
      completed: rec?.status === 'COMPLETED',
      score: rec?.score ?? undefined,
    }
  })

  return NextResponse.json({
    subject: {
      id: curriculumRow.id,
      name: curriculumRow.name,
      subject: curriculumRow.subject,
      description: curriculumRow.description,
      progress,
      completedLessons,
      totalLessons,
      confidence: Math.round(avgScore),
      xp: gamification?.xp ?? 0,
      level: gamification?.level ?? 1,
      streakDays: gamification?.streakDays ?? 0,
      skills,
      conceptMastery,
      recentLessons,
      enrollmentSource: enrollment.enrollmentSource ?? null,
    },
  })
}, { role: 'STUDENT' })

function generateSubjectSkills(subjectCode: string, baseScore: number) {
  const skillsMap: Record<string, Record<string, number>> = {
    english: {
      grammar: 75,
      vocabulary: 80,
      speaking: 70,
      listening: 85,
      writing: 72,
      reading: 88,
    },
    math: {
      algebra: 65,
      geometry: 70,
      calculus: 45,
      statistics: 60,
      probability: 55,
      'problem-solving': 58,
    },
    physics: {
      mechanics: 55,
      thermodynamics: 40,
      electricity: 50,
      waves: 45,
      quantum: 30,
      optics: 42,
    },
    chemistry: {
      organic: 60,
      inorganic: 55,
      physical: 45,
      analytical: 50,
      biochemistry: 40,
    },
    biology: {
      'cell-biology': 65,
      genetics: 70,
      ecology: 60,
      anatomy: 55,
      evolution: 50,
    },
    history: {
      ancient: 70,
      medieval: 65,
      modern: 75,
      'world-wars': 80,
      civilizations: 60,
    },
    cs: {
      programming: 75,
      algorithms: 60,
      'data-structures': 65,
      databases: 55,
      'web-dev': 70,
    },
  }

  // Adjust scores based on actual performance
  const baseSkills = skillsMap[subjectCode.toLowerCase()] || { general: 50 }
  
  return Object.fromEntries(
    Object.entries(baseSkills).map(([skill, defaultScore]) => [
      skill,
      Math.min(100, Math.round(defaultScore + (baseScore - 50) * 0.3))
    ])
  )
}

function generateMathConceptMastery(quizAttempts: any[]) {
  const concepts = [
    { name: 'Linear Equations', weight: 1 },
    { name: 'Systems of Equations', weight: 0.9 },
    { name: 'Fractional Equations', weight: 0.8 },
    { name: 'Quadratic Equations', weight: 0.95 },
    { name: 'Polynomials', weight: 0.85 },
  ]

  const baseScore = quizAttempts.length > 0
    ? quizAttempts.reduce((sum: number, a: any) => sum + (a.score / a.maxScore) * 100, 0) / quizAttempts.length
    : 50

  return concepts.map((concept, index) => {
    // Vary scores slightly for each concept
    const variation = (Math.random() - 0.5) * 30
    const score = Math.min(100, Math.max(20, Math.round(baseScore + variation)))
    const totalQuestions = 10 + index * 2
    const correctAnswers = Math.round((score / 100) * totalQuestions)

    return {
      concept: concept.name,
      score,
      totalQuestions,
      correctAnswers,
    }
  })
}
