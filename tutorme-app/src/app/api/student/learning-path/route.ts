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
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id

    try {
        // 1. Get enrollments with full lesson tree
        const enrollments = await db.curriculumEnrollment.findMany({
            where: { studentId },
            include: {
                curriculum: {
                    include: {
                        modules: {
                            include: {
                                lessons: {
                                    select: {
                                        id: true,
                                        title: true,
                                        description: true,
                                        order: true,
                                        duration: true,
                                        prerequisites: true,
                                    },
                                    orderBy: { order: 'asc' },
                                },
                            },
                            orderBy: { order: 'asc' },
                        },
                    },
                },
            },
        })

        // 2. Lesson progress
        const allLessonIds = enrollments.flatMap((e: any) =>
            e.curriculum.modules.flatMap((m: any) => m.lessons.map((l: any) => l.id))
        )
        const lessonProgress = await db.curriculumLessonProgress.findMany({
            where: { studentId, lessonId: { in: allLessonIds } },
        })
        const progressMap = new Map(lessonProgress.map((lp: any) => [lp.lessonId, lp]))

        // 3. StudentPerformance for weaknesses
        const performances = await db.studentPerformance.findMany({
            where: { studentId },
        })
        const allWeaknesses: string[] = performances.flatMap(
            (p: any) => (p.weaknesses as string[]) || []
        )

        // 4. Build ordered flat path across all curricula
        const pathEntries: Array<{
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
        }> = []

        let globalOrder = 0
        for (const enrollment of enrollments) {
            const curriculum = enrollment.curriculum
            for (const mod of curriculum.modules) {
                for (const lesson of mod.lessons) {
                    const prog = progressMap.get(lesson.id)
                    const status: 'completed' | 'in_progress' | 'not_started' =
                        (prog as any)?.status === 'COMPLETED' ? 'completed' :
                            (prog as any)?.status === 'IN_PROGRESS' ? 'in_progress' : 'not_started'

                    pathEntries.push({
                        lessonId: lesson.id,
                        title: lesson.title,
                        description: lesson.description ?? null,
                        duration: lesson.duration,
                        courseName: curriculum.title,
                        courseId: curriculum.id,
                        moduleTitle: mod.title,
                        status,
                        score: (prog as any)?.score ?? null,
                        order: globalOrder++,
                    })
                }
            }
        }

        // 5. Find current lesson (first in_progress, or first not_started)
        const currentLesson =
            pathEntries.find((e) => e.status === 'in_progress') ??
            pathEntries.find((e) => e.status === 'not_started') ??
            null

        // 6. Next 3 lessons after current
        const currentIdx = currentLesson
            ? pathEntries.findIndex((e) => e.lessonId === currentLesson.lessonId)
            : -1
        const notStarted = pathEntries.filter(
            (e) => e.status === 'not_started' && e.lessonId !== currentLesson?.lessonId
        )

        // Prioritise lessons covering weak topics
        const scored = notStarted.map((lesson) => {
            const weaknessBoost = allWeaknesses.some((w) =>
                lesson.title.toLowerCase().includes(w.toLowerCase()) ||
                (lesson.description || '').toLowerCase().includes(w.toLowerCase())
            ) ? -100 : 0
            return { ...lesson, sortKey: lesson.order + weaknessBoost }
        })
        scored.sort((a, b) => a.sortKey - b.sortKey)
        const nextLessons = scored.slice(0, 3)

        // 7. Focus areas (top 3 unique weaknesses)
        const weakFreq: Record<string, number> = {}
        for (const w of allWeaknesses) weakFreq[w] = (weakFreq[w] || 0) + 1
        const focusAreas = Object.entries(weakFreq)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([topic, count]) => ({ topic, frequency: count }))

        // 8. Summary stats
        const completedCount = pathEntries.filter((e) => e.status === 'completed').length
        const totalCount = pathEntries.length

        return NextResponse.json({
            success: true,
            data: {
                currentLesson,
                nextLessons,
                focusAreas,
                completedCount,
                totalCount,
                progressPercent: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
            },
        })
    } catch (error) {
        console.error('Failed to fetch learning path:', error)
        return NextResponse.json({ error: 'Failed to fetch learning path' }, { status: 500 })
    }
}
