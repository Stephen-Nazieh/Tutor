/**
 * GET /api/student/learning-path
 *
 * Returns a personalized learning path:
 *  - currentLesson: the lesson currently in progress
 *  - nextLessons: next 3 lessons in sequence (prioritising weak areas)
 *  - focusAreas: top 3 weak topics with links to relevant tasks
 *  - overallPath: full ordered list of lessons with status
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  curriculumEnrollment,
  curriculum,
  curriculumModule,
  curriculumLesson,
  curriculumLessonProgress,
  studentPerformance,
} from '@/lib/db/schema'
import { eq, inArray, and, asc } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  try {
    const enrollmentRows = await drizzleDb
      .select()
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.studentId, studentId))

    const curriculumIds = enrollmentRows.map((e) => e.curriculumId)
    if (curriculumIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: {
          currentLesson: null,
          nextLessons: [],
          focusAreas: [],
          completedCount: 0,
          totalCount: 0,
          progressPercent: 0,
        },
      })
    }

    const curricula = await drizzleDb
      .select()
      .from(curriculum)
      .where(inArray(curriculum.id, curriculumIds))

    const curriculumMap = new Map(curricula.map((c) => [c.id, c]))

    const modules = await drizzleDb
      .select()
      .from(curriculumModule)
      .where(inArray(curriculumModule.curriculumId, curriculumIds))
      .orderBy(asc(curriculumModule.order))

    const moduleIds = modules.map((m) => m.id)
    const lessons =
      moduleIds.length > 0
        ? await drizzleDb
            .select()
            .from(curriculumLesson)
            .where(inArray(curriculumLesson.moduleId, moduleIds))
            .orderBy(asc(curriculumLesson.order))
        : []

    const moduleMap = new Map(modules.map((m) => [m.id, m]))
    const lessonsByModule = new Map<string, typeof lessons>()
    for (const l of lessons) {
      const list = lessonsByModule.get(l.moduleId) ?? []
      list.push(l)
      lessonsByModule.set(l.moduleId, list)
    }

    const allLessonIds = lessons.map((l) => l.id)
    const lessonProgress =
      allLessonIds.length > 0
        ? await drizzleDb
            .select()
            .from(curriculumLessonProgress)
            .where(
              and(
                eq(curriculumLessonProgress.studentId, studentId),
                inArray(curriculumLessonProgress.lessonId, allLessonIds)
              )
            )
        : []

    const progressMap = new Map(
      lessonProgress.map((lp) => [lp.lessonId, lp])
    )

    const performances = await drizzleDb
      .select()
      .from(studentPerformance)
      .where(eq(studentPerformance.studentId, studentId))

    const allWeaknesses: string[] = performances.flatMap(
      (p) => (p.weaknesses as string[]) || []
    )

    type PathEntry = {
      lessonId: string
      title: string
      description: string | null
      duration: number
      courseName: string
      courseId: string
      moduleTitle: string
      status: 'completed' | 'in_progress' | 'not_started'
      score: number | null
      order: number
    }

    const pathEntries: PathEntry[] = []
    let globalOrder = 0

    for (const enrollment of enrollmentRows) {
      const curriculumRow = curriculumMap.get(enrollment.curriculumId)
      if (!curriculumRow) continue
      const curriculumModules = modules.filter(
        (m) => m.curriculumId === enrollment.curriculumId
      )
      for (const mod of curriculumModules) {
        const modLessons = lessonsByModule.get(mod.id) ?? []
        for (const lesson of modLessons) {
          const prog = progressMap.get(lesson.id)
          const status: 'completed' | 'in_progress' | 'not_started' =
            (prog as any)?.status === 'COMPLETED'
              ? 'completed'
              : (prog as any)?.status === 'IN_PROGRESS'
                ? 'in_progress'
                : 'not_started'

          pathEntries.push({
            lessonId: lesson.id,
            title: lesson.title,
            description: lesson.description ?? null,
            duration: lesson.duration,
            courseName: curriculumRow.name,
            courseId: curriculumRow.id,
            moduleTitle: mod.title,
            status,
            score: (prog as any)?.score ?? null,
            order: globalOrder++,
          })
        }
      }
    }

    const currentLesson =
      pathEntries.find((e) => e.status === 'in_progress') ??
      pathEntries.find((e) => e.status === 'not_started') ??
      null

    const notStarted = pathEntries.filter(
      (e) =>
        e.status === 'not_started' &&
        e.lessonId !== currentLesson?.lessonId
    )

    const scored = notStarted.map((lesson) => {
      const weaknessBoost = allWeaknesses.some(
        (w) =>
          lesson.title.toLowerCase().includes(w.toLowerCase()) ||
          (lesson.description || '').toLowerCase().includes(w.toLowerCase())
      )
        ? -100
        : 0
      return { ...lesson, sortKey: lesson.order + weaknessBoost }
    })
    scored.sort((a, b) => a.sortKey - b.sortKey)
    const nextLessons = scored.slice(0, 3)

    const weakFreq: Record<string, number> = {}
    for (const w of allWeaknesses) weakFreq[w] = (weakFreq[w] || 0) + 1
    const focusAreas = Object.entries(weakFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([topic, count]) => ({ topic, frequency: count }))

    const completedCount = pathEntries.filter(
      (e) => e.status === 'completed'
    ).length
    const totalCount = pathEntries.length

    return NextResponse.json({
      success: true,
      data: {
        currentLesson,
        nextLessons,
        focusAreas,
        completedCount,
        totalCount,
        progressPercent:
          totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
      },
    })
  } catch (error) {
    console.error('Failed to fetch learning path:', error)
    return NextResponse.json(
      { error: 'Failed to fetch learning path' },
      { status: 500 }
    )
  }
}
