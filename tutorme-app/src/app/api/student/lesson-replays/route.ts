import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const studentId = session.user.id

  try {
    const sessions = await db.liveSession.findMany({
      where: {
        status: { in: ['completed', 'ended'] },
        endedAt: { not: null },
        participants: { some: { studentId } },
      },
      include: {
        tutor: { select: { name: true } },
        replayArtifact: {
          select: {
            status: true,
            transcript: true,
            summary: true,
            summaryJson: true,
            generatedAt: true,
          },
        },
      },
      orderBy: { endedAt: 'desc' },
      take: 30,
    })

    const data = await Promise.all(
      sessions.map(async (liveSession: (typeof sessions)[number]) => {
        let taskCount = 0
        let submittedCount = 0

        if (liveSession.curriculumId) {
          const tasks = await db.generatedTask.findMany({
            where: {
              tutorId: liveSession.tutorId,
              OR: [
                { lesson: { module: { curriculumId: liveSession.curriculumId } } },
                { batch: { curriculumId: liveSession.curriculumId } },
              ],
            },
            select: { id: true },
          })
          taskCount = tasks.length

          if (taskCount > 0) {
            submittedCount = await db.taskSubmission.count({
              where: {
                studentId,
                taskId: { in: tasks.map((task: { id: string }) => task.id) },
                status: { in: ['submitted', 'graded'] },
              },
            })
          }
        }

        const replaySummary =
          liveSession.replayArtifact?.summary ||
          (typeof liveSession.replayArtifact?.summaryJson === 'object' &&
          liveSession.replayArtifact?.summaryJson &&
          'overview' in (liveSession.replayArtifact.summaryJson as Record<string, unknown>)
            ? String((liveSession.replayArtifact.summaryJson as Record<string, unknown>).overview || '')
            : '')

        const summaryPreview = replaySummary.slice(0, 220)

        return {
          id: liveSession.id,
          title: liveSession.title,
          subject: liveSession.subject,
          tutorName: liveSession.tutor.name,
          scheduledAt: liveSession.scheduledAt,
          endedAt: liveSession.endedAt,
          recordingUrl: liveSession.recordingUrl,
          hasRecording: Boolean(liveSession.recordingUrl),
          taskCount,
          submittedCount,
          summaryPreview,
          transcriptAvailable: Boolean(liveSession.replayArtifact?.transcript),
          replayStatus: liveSession.replayArtifact?.status || 'pending',
          generatedAt: liveSession.replayArtifact?.generatedAt || null,
        }
      })
    )

    return NextResponse.json({ success: true, data: { sessions: data } })
  } catch (error) {
    console.error('Failed to fetch lesson replays:', error)
    return NextResponse.json({ error: 'Failed to fetch lesson replays' }, { status: 500 })
  }
}
