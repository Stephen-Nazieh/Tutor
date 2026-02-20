/**
 * GET /api/student/progress
 *
 * Aggregates real progress data from:
 *  - StudentPerformance (scores, strengths, weaknesses, skillBreakdown, taskHistory)
 *  - CurriculumLessonProgress (per-lesson completion)
 *  - CurriculumEnrollment (enrolled courses)
 *  - UserGamification (XP, level, streak)
 *  - Achievement (earned badges)
 *  - TaskSubmission (submission counts)
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
        // 1. Enrollments with curriculum info
        const enrollments = await db.curriculumEnrollment.findMany({
            where: { studentId },
            include: {
                curriculum: {
                    include: {
                        modules: {
                            include: {
                                lessons: {
                                    select: { id: true, title: true, order: true, duration: true },
                                    orderBy: { order: 'asc' },
                                },
                            },
                            orderBy: { order: 'asc' },
                        },
                    },
                },
            },
        })

        // 2. Lesson progress for this student
        const allLessonIds = enrollments.flatMap((e) =>
            e.curriculum.modules.flatMap((m) => m.lessons.map((l) => l.id))
        )
        const lessonProgress = await db.curriculumLessonProgress.findMany({
            where: { studentId, lessonId: { in: allLessonIds } },
        })
        const progressMap = new Map(lessonProgress.map((lp) => [lp.lessonId, lp]))

        // 3. StudentPerformance records
        const performances = await db.studentPerformance.findMany({
            where: { studentId },
        })

        // 4. Gamification
        const gamification = await db.userGamification.findUnique({
            where: { userId: studentId },
        })

        // 5. Achievements
        const achievements = await db.achievement.findMany({
            where: { userId: studentId },
            orderBy: { unlockedAt: 'desc' },
            take: 10,
        })

        // 6. Submissions count
        const submissionCount = await db.taskSubmission.count({
            where: { studentId },
        })

        // 7. Total study minutes (from gamification or estimate)
        const totalStudyMinutes = gamification?.totalStudyMinutes ?? 0

        // --- Build per-course progress ---
        const courses = enrollments.map((enrollment) => {
            const curriculum = enrollment.curriculum
            const allLessons = curriculum.modules.flatMap((m) => m.lessons)
            const completedLessons = allLessons.filter(
                (l) => progressMap.get(l.id)?.status === 'COMPLETED'
            )
            const inProgressLessons = allLessons.filter(
                (l) => progressMap.get(l.id)?.status === 'IN_PROGRESS'
            )

            // Average score across completed lessons
            const scores = completedLessons
                .map((l) => progressMap.get(l.id)?.score)
                .filter((s): s is number => s != null)
            const avgScore = scores.length > 0
                ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
                : null

            // Total duration of completed lessons
            const studyMinutes = completedLessons.reduce((sum, l) => sum + (l.duration || 30), 0)

            return {
                id: curriculum.id,
                name: curriculum.title,
                totalLessons: allLessons.length,
                completedLessons: completedLessons.length,
                inProgressLessons: inProgressLessons.length,
                progress: allLessons.length > 0
                    ? Math.round((completedLessons.length / allLessons.length) * 100)
                    : 0,
                averageScore: avgScore,
                studyMinutes,
                enrolledAt: enrollment.enrolledAt,
            }
        })

        // --- Aggregate strengths/weaknesses across all performances ---
        const allStrengths: string[] = performances.flatMap(
            (p) => (p.strengths as string[]) || []
        )
        const allWeaknesses: string[] = performances.flatMap(
            (p) => (p.weaknesses as string[]) || []
        )
        // Count frequency
        const strengthCounts = countFrequency(allStrengths)
        const weaknessCounts = countFrequency(allWeaknesses)

        // --- Score trend from taskHistory ---
        const allHistory: Array<{ date: string; score: number }> = performances.flatMap(
            (p) => (p.taskHistory as any[]) || []
        )
        const scoreTrend = allHistory
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-20) // last 20 data points

        // --- Overall stats ---
        const totalCompleted = courses.reduce((s, c) => s + c.completedLessons, 0)
        const totalLessons = courses.reduce((s, c) => s + c.totalLessons, 0)
        const overallAvg = performances.length > 0
            ? Math.round(
                performances.reduce((s, p) => s + p.averageScore, 0) / performances.length
            )
            : null

        return NextResponse.json({
            success: true,
            data: {
                overview: {
                    lessonsCompleted: totalCompleted,
                    totalLessons,
                    studyHours: Math.round((totalStudyMinutes / 60) * 10) / 10,
                    averageScore: overallAvg,
                    achievementCount: achievements.length,
                    submissionCount,
                    level: gamification?.level ?? 1,
                    xp: gamification?.xp ?? 0,
                    streakDays: gamification?.streakDays ?? 0,
                },
                courses,
                strengths: strengthCounts.slice(0, 5),
                weaknesses: weaknessCounts.slice(0, 5),
                scoreTrend,
                achievements: achievements.map((a) => ({
                    id: a.id,
                    type: a.type,
                    title: a.title,
                    description: a.description,
                    unlockedAt: a.unlockedAt,
                    xpAwarded: a.xpAwarded,
                })),
                skillBreakdown: performances[0]?.skillBreakdown ?? {},
            },
        })
    } catch (error) {
        console.error('Failed to fetch student progress:', error)
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }
}

function countFrequency(items: string[]): Array<{ topic: string; count: number }> {
    const freq: Record<string, number> = {}
    for (const item of items) {
        freq[item] = (freq[item] || 0) + 1
    }
    return Object.entries(freq)
        .map(([topic, count]) => ({ topic, count }))
        .sort((a, b) => b.count - a.count)
}
