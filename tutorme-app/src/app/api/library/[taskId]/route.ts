import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { libraryTask } from '@/lib/db/schema'
import { and, eq } from 'drizzle-orm'

function mapTask(task: typeof libraryTask.$inferSelect) {
  return {
    id: task.id,
    question: task.question,
    type: task.type as 'multiple_choice' | 'short_answer',
    options: (task.options as string[] | null) ?? undefined,
    correctAnswer: task.correctAnswer ?? undefined,
    explanation: task.explanation ?? undefined,
    difficulty: task.difficulty,
    subject: task.subject,
    topics: (task.topics as string[]) ?? [],
    savedAt: task.createdAt.toISOString(),
    usedCount: task.usageCount,
    isFavorite: task.isFavorite,
    lastUsed: task.lastUsedAt ? task.lastUsedAt.toISOString() : undefined
  }
}

export const PATCH = withCsrf(withAuth(async (request, session, context) => {
  let data: any
  try {
    data = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const taskId = await getParamAsync(context?.params, 'taskId')
  if (!taskId) {
    return NextResponse.json({ error: 'Missing taskId' }, { status: 400 })
  }

  try {
    const [task] = await drizzleDb
      .select()
      .from(libraryTask)
      .where(and(eq(libraryTask.id, taskId), eq(libraryTask.userId, session.user.id)))
      .limit(1)

    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 })
    }

    if (data?.action === 'toggleFavorite') {
      await drizzleDb
        .update(libraryTask)
        .set({ isFavorite: !task.isFavorite })
        .where(eq(libraryTask.id, taskId))

      const [updated] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, taskId)).limit(1)
      if (!updated) {
        return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
      }
      return NextResponse.json({ task: mapTask(updated) })
    }

    if (data?.action === 'incrementUsage') {
      await drizzleDb
        .update(libraryTask)
        .set({ usageCount: task.usageCount + 1, lastUsedAt: new Date() })
        .where(eq(libraryTask.id, taskId))
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: 'Unsupported action' }, { status: 400 })
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 })
  }
}))

export const DELETE = withCsrf(withAuth(async (_req, session, context) => {
  const taskId = await getParamAsync(context?.params, 'taskId')
  if (!taskId) {
    return NextResponse.json({ error: 'Missing taskId' }, { status: 400 })
  }

  try {
    await drizzleDb
      .delete(libraryTask)
      .where(and(eq(libraryTask.id, taskId), eq(libraryTask.userId, session.user.id)))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 })
  }
}))
