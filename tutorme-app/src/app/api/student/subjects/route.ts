/**
 * Student Subjects API
 * Get enrolled subjects with progress
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  courseEnrollment,
  course,
  courseLesson,
  courseLessonProgress,
  quizAttempt,
} from '@/lib/db/schema'
import { eq, desc, inArray } from 'drizzle-orm'

export const GET = withAuth(
  async (req, session) => {
    const enrollmentsRows = await drizzleDb
      .select({
        courseId: course.courseId,
        courseName: course.name,
        courseCategories: course.categories,
        courseDescription: course.description,
        lastActivity: courseEnrollment.lastActivity,
        enrollmentSource: courseEnrollment.enrollmentSource,
      })
      .from(courseEnrollment)
      .innerJoin(course, eq(courseEnrollment.courseId, course.courseId))
      .where(eq(courseEnrollment.studentId, session.user.id))

    const quizAttempts = await drizzleDb
      .select()
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, session.user.id))
      .orderBy(desc(quizAttempt.completedAt))
      .limit(10)

    const avgScore =
      quizAttempts.length > 0
        ? quizAttempts.reduce((sum, a) => sum + (a.score / a.maxScore) * 100, 0) /
          quizAttempts.length
        : 0

    const progressByCourse = new Map<string, { total: number; completed: number }>()
    for (const row of enrollmentsRows) {
      const key = row.courseId
      if (!progressByCourse.has(key)) {
        const lessons = await drizzleDb
          .select()
          .from(courseLesson)
          .where(eq(courseLesson.courseId, key))
        const lessonIds = lessons.map(l => l.lessonId)
        const recs = await drizzleDb
          .select()
          .from(courseLessonProgress)
          .where(eq(courseLessonProgress.studentId, session.user.id))
        const completed = recs.filter(
          r => r.status === 'COMPLETED' && lessonIds.some(l => l === r.lessonId)
        ).length
        progressByCourse.set(key, { total: lessons.length, completed })
      }
    }

    const subjects = enrollmentsRows.map(enrollment => {
      const { total, completed } = progressByCourse.get(enrollment.courseId) ?? {
        total: 0,
        completed: 0,
      }
      const progress = total > 0 ? Math.round((completed / total) * 100) : 0
      const skills = generateSubjectSkills(enrollment.courseCategories?.[0] ?? '', avgScore)
      return {
        courseId: enrollment.courseId,
        name: enrollment.courseName,
        categories: enrollment.courseCategories,
        description: enrollment.courseDescription,
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
  },
  { role: 'STUDENT' }
)

function generateSubjectSkills(category: string, baseScore: number) {
  const skillsMap: Record<string, string[]> = {
    english: ['Grammar', 'Vocabulary', 'Writing', 'Reading Comprehension', 'Speaking'],
    math: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Problem Solving'],
    physics: ['Mechanics', 'Thermodynamics', 'Electricity', 'Waves', 'Quantum'],
    chemistry: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
    biology: ['Cell Biology', 'Genetics', 'Ecology', 'Anatomy', 'Evolution'],
    history: ['Ancient', 'Medieval', 'Modern', 'World Wars', 'Civilizations'],
    cs: ['Programming', 'Algorithms', 'Data Structures', 'Databases', 'Web Dev'],
  }

  const skillNames = skillsMap[category.toLowerCase()] || [
    'Skill 1',
    'Skill 2',
    'Skill 3',
    'Skill 4',
  ]

  return skillNames.map((name, index) => ({
    name,
    score: Math.min(100, Math.max(20, Math.round(baseScore - 8 + index * 4))),
  }))
}
