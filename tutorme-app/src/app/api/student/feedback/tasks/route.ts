/**
 * Student Feedback Tasks API
 * Returns deployed tasks for the logged-in student
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { drizzleDb } from '@/lib/db/drizzle'
import { eq, and, desc } from 'drizzle-orm'
import { builderTask, liveSession, sessionParticipant } from '@/lib/db/schema'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const studentId = session.user.id

    // Get all sessions where student is enrolled
    const enrollments = await drizzleDb
      .select({
        sessionId: sessionParticipant.sessionId,
      })
      .from(sessionParticipant)
      .where(eq(sessionParticipant.studentId, studentId))

    const sessionIds = enrollments.map(e => e.sessionId)

    if (sessionIds.length === 0) {
      return NextResponse.json({ tasks: [] })
    }

    // Get deployed tasks from those sessions
    // Note: In a full implementation, you'd have a deployment table
    // For now, we'll return recently published tasks from courses
    const tasks = await drizzleDb
      .select({
        id: builderTask.taskId,
        title: builderTask.title,
        content: builderTask.content,
        type: builderTask.type,
        courseId: builderTask.courseId,
        lessonId: builderTask.lessonId,
        tutorId: builderTask.tutorId,
        publishedAt: builderTask.publishedAt,
      })
      .from(builderTask)
      .where(
        and(
          eq(builderTask.status, 'published')
          // Add any other filters needed
        )
      )
      .orderBy(desc(builderTask.publishedAt))
      .limit(50)

    // Format tasks for response
    const formattedTasks = tasks.map(task => ({
      id: task.id,
      taskId: task.id,
      title: task.title,
      content: task.content,
      type: task.type === 'assessment' ? 'assessment' : 'task',
      deployedAt: task.publishedAt?.toISOString() || new Date().toISOString(),
      tutorId: task.tutorId,
      tutorName: 'Tutor', // Would fetch from profile table in full implementation
    }))

    return NextResponse.json({ tasks: formattedTasks })
  } catch (error) {
    console.error('Error fetching deployed tasks:', error)
    return NextResponse.json({ error: 'Failed to fetch deployed tasks' }, { status: 500 })
  }
}
