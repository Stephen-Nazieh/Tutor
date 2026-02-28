import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  liveSession,
  sessionParticipant,
  sessionReplayArtifact,
  user,
  profile,
  generatedTask,
  taskSubmission,
  curriculumLesson,
  curriculumModule,
  courseBatch,
} from '@/lib/db/schema'
import { eq, and, inArray, desc } from 'drizzle-orm'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions, _req)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  try {
    const participantRows = await drizzleDb
      .select({ sessionId: sessionParticipant.sessionId })
      .from(sessionParticipant)
      .where(eq(sessionParticipant.studentId, studentId))
    const sessionIds = [...new Set(participantRows.map((p) => p.sessionId))]

    if (sessionIds.length === 0) {
      return NextResponse.json({
        success: true,
        data: { sessions: [] },
      })
    }

    const sessions = await drizzleDb
      .select()
      .from(liveSession)
      .where(
        and(
          inArray(liveSession.id, sessionIds),
          inArray(liveSession.status, ['completed', 'ended'])
        )
      )
      .orderBy(desc(liveSession.endedAt))
      .limit(30)

    const endedSessions = sessions.filter((s) => s.endedAt != null)

    const replayBySession = new Map<string, typeof sessionReplayArtifact.$inferSelect>()
    if (endedSessions.length > 0) {
      const replays = await drizzleDb
        .select()
        .from(sessionReplayArtifact)
        .where(
          inArray(
            sessionReplayArtifact.sessionId,
            endedSessions.map((s) => s.id)
          )
        )
      replays.forEach((r) => replayBySession.set(r.sessionId, r))
    }

    const tutorIds = [...new Set(endedSessions.map((s) => s.tutorId))]
    const profiles =
      tutorIds.length > 0
        ? await drizzleDb
            .select({
              userId: profile.userId,
              name: profile.name,
            })
            .from(profile)
            .where(inArray(profile.userId, tutorIds))
        : []
    const tutorNameByUserId = new Map(profiles.map((p) => [p.userId, p.name]))

    const data = await Promise.all(
      endedSessions.map(async (liveSessionRow) => {
        let taskCount = 0
        let submittedCount = 0

        if (liveSessionRow.curriculumId) {
          const modules = await drizzleDb
            .select({ id: curriculumModule.id })
            .from(curriculumModule)
            .where(
              eq(curriculumModule.curriculumId, liveSessionRow.curriculumId)
            )
          const moduleIds = modules.map((m) => m.id)
          const lessonIds =
            moduleIds.length > 0
              ? (
                  await drizzleDb
                    .select({ id: curriculumLesson.id })
                    .from(curriculumLesson)
                    .where(inArray(curriculumLesson.moduleId, moduleIds))
                ).map((l) => l.id)
              : []
          const batchIds = (
            await drizzleDb
              .select({ id: courseBatch.id })
              .from(courseBatch)
              .where(
                eq(courseBatch.curriculumId, liveSessionRow.curriculumId)
              )
          ).map((b) => b.id)

          const allTaskIds: string[] = []
          if (lessonIds.length > 0) {
            const byLesson = await drizzleDb
              .select({ id: generatedTask.id })
              .from(generatedTask)
              .where(
                and(
                  eq(generatedTask.tutorId, liveSessionRow.tutorId),
                  inArray(generatedTask.lessonId, lessonIds)
                )
              )
            allTaskIds.push(...byLesson.map((t) => t.id))
          }
          if (batchIds.length > 0) {
            const byBatch = await drizzleDb
              .select({ id: generatedTask.id })
              .from(generatedTask)
              .where(
                and(
                  eq(generatedTask.tutorId, liveSessionRow.tutorId),
                  inArray(generatedTask.batchId, batchIds)
                )
              )
            allTaskIds.push(...byBatch.map((t) => t.id))
          }
          const uniqueTaskIds = [...new Set(allTaskIds)]
          taskCount = uniqueTaskIds.length
          if (uniqueTaskIds.length > 0) {
            const submitted = await drizzleDb
              .select()
              .from(taskSubmission)
              .where(
                and(
                  eq(taskSubmission.studentId, studentId),
                  inArray(taskSubmission.taskId, uniqueTaskIds),
                  inArray(taskSubmission.status, ['submitted', 'graded'])
                )
              )
            submittedCount = submitted.length
          }
        }

        const artifact = replayBySession.get(liveSessionRow.id)
        const replaySummary =
          artifact?.summary ||
          (typeof artifact?.summaryJson === 'object' &&
          artifact?.summaryJson &&
          'overview' in (artifact.summaryJson as Record<string, unknown>)
            ? String(
                (artifact.summaryJson as Record<string, unknown>).overview || ''
              )
            : '')
        const summaryPreview = replaySummary.slice(0, 220)
        const tutorName =
          tutorNameByUserId.get(liveSessionRow.tutorId) ?? 'Tutor'

        return {
          id: liveSessionRow.id,
          title: liveSessionRow.title,
          subject: liveSessionRow.subject,
          tutorName,
          scheduledAt: liveSessionRow.scheduledAt,
          endedAt: liveSessionRow.endedAt,
          recordingUrl: liveSessionRow.recordingUrl,
          hasRecording: Boolean(liveSessionRow.recordingUrl),
          taskCount,
          submittedCount,
          summaryPreview,
          transcriptAvailable: Boolean(artifact?.transcript),
          replayStatus: artifact?.status ?? 'pending',
          generatedAt: artifact?.generatedAt ?? null,
        }
      })
    )

    return NextResponse.json({ success: true, data: { sessions: data } })
  } catch (error) {
    console.error('Failed to fetch lesson replays:', error)
    return NextResponse.json(
      { error: 'Failed to fetch lesson replays' },
      { status: 500 }
    )
  }
}
