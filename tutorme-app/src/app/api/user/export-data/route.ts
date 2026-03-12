/**
 * GDPR Art.20 — Right to Data Portability.
 * GET /api/user/export-data — Returns all user data as structured JSON.
 * This includes: profile, courses enrolled, quiz attempts, AI session summaries (NOT full chat).
 */
import { NextRequest, NextResponse } from 'next/server'
import { eq, desc } from 'drizzle-orm'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  profile,
  curriculumEnrollment,
  quizAttempt,
  aIInteractionSession,
  userGamification,
  achievement,
} from '@/lib/db/schema'
import { logPiiAccess } from '@/lib/compliance/audit'

export const GET = withAuth(async (req: NextRequest, session) => {
  const userId = session?.user?.id
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Audit log: user is exporting their own data
    await logPiiAccess({
      accessorId: userId,
      accessorRole: session.user.role ?? 'STUDENT',
      targetUserId: userId,
      resourceType: 'data_export',
      action: 'export',
      endpoint: '/api/user/export-data',
      req,
      legalBasis: 'contract',
    })

    const [userProfile] = await drizzleDb
      .select()
      .from(profile)
      .where(eq(profile.userId, userId))
      .limit(1)

    const enrollments = await drizzleDb
      .select()
      .from(curriculumEnrollment)
      .where(eq(curriculumEnrollment.studentId, userId))

    const quizAttempts = await drizzleDb
      .select({
        id: quizAttempt.id,
        quizId: quizAttempt.quizId,
        score: quizAttempt.score,
        maxScore: quizAttempt.maxScore,
        completedAt: quizAttempt.completedAt,
        status: quizAttempt.status,
      })
      .from(quizAttempt)
      .where(eq(quizAttempt.studentId, userId))
      .orderBy(desc(quizAttempt.completedAt))
      .limit(100)

    // AI session summaries ONLY — not full chat content
    const aiSessions = await drizzleDb
      .select({
        id: aIInteractionSession.id,
        subjectCode: aIInteractionSession.subjectCode,
        startedAt: aIInteractionSession.startedAt,
        endedAt: aIInteractionSession.endedAt,
        messageCount: aIInteractionSession.messageCount,
        topicsCovered: aIInteractionSession.topicsCovered,
        summary: aIInteractionSession.summary,
        // NOTE: we intentionally DO NOT export full message content
      })
      .from(aIInteractionSession)
      .where(eq(aIInteractionSession.studentId, userId))
      .orderBy(desc(aIInteractionSession.startedAt))
      .limit(100)

    const [gamification] = await drizzleDb
      .select()
      .from(userGamification)
      .where(eq(userGamification.userId, userId))
      .limit(1)

    const achievements = await drizzleDb
      .select()
      .from(achievement)
      .where(eq(achievement.userId, userId))

    const exportData = {
      exportedAt: new Date().toISOString(),
      dataSubjectId: userId,
      profile: userProfile ? {
        name: userProfile.name,
        username: userProfile.username,
        bio: userProfile.bio,
        country: null, // not stored in profile directly
        timezone: userProfile.timezone,
        gradeLevel: userProfile.gradeLevel,
        subjectsOfInterest: userProfile.subjectsOfInterest,
        preferredLanguages: userProfile.preferredLanguages,
        learningGoals: userProfile.learningGoals,
        tosAcceptedAt: userProfile.tosAcceptedAt,
        createdAt: userProfile.createdAt,
        updatedAt: userProfile.updatedAt,
      } : null,
      courseEnrollments: enrollments.map(e => ({
        curriculumId: e.curriculumId,
        enrolledAt: e.enrolledAt,
        completedAt: e.completedAt,
        lessonsCompleted: e.lessonsCompleted,
      })),
      quizAttempts,
      aiSessionSummaries: aiSessions,
      gamification: gamification ? {
        level: gamification.level,
        xp: gamification.xp,
        streakDays: gamification.streakDays,
        longestStreak: gamification.longestStreak,
        totalStudyMinutes: gamification.totalStudyMinutes,
      } : null,
      achievements: achievements.map(a => ({
        type: a.type,
        title: a.title,
        description: a.description,
        unlockedAt: a.unlockedAt,
      })),
      notice: 'This export contains your personal data held by Solocorn as required by GDPR Art.20 (Right to Data Portability). AI conversation messages are not exported to protect session integrity but summaries are included.',
    }

    return NextResponse.json(exportData, {
      headers: {
        'Content-Disposition': `attachment; filename="solocorn-data-export-${userId.slice(0, 8)}.json"`,
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    return handleApiError(error, 'Failed to export user data', 'api/user/export-data')
  }
})
