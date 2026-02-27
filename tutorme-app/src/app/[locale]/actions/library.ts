'use server'

import { drizzleDb } from '@/lib/db/drizzle'
import { libraryTask } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

async function getSession() {
  return await getServerSession(authOptions)
}

export async function getLibraryTasks() {
  const session = await getSession()
  if (!session?.user?.id) return []

  try {
    const tasks = await drizzleDb
      .select()
      .from(libraryTask)
      .where(eq(libraryTask.userId, session.user.id))
      .orderBy(desc(libraryTask.isFavorite), desc(libraryTask.usageCount))
    return tasks
  } catch (error) {
    console.error('Error fetching library tasks:', error)
    return []
  }
}

export async function saveLibraryTask(data: any) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  try {
    const id = crypto.randomUUID()
    await drizzleDb.insert(libraryTask).values({
      id,
      userId: session.user.id,
      question: data.question,
      type: data.type,
      options: data.options || [],
      correctAnswer: data.correctAnswer ?? null,
      explanation: data.explanation ?? null,
      difficulty: data.difficulty,
      subject: data.subject,
      topics: data.topics || [],
      isFavorite: data.isFavorite ?? false,
      usageCount: data.usedCount ?? 0,
      lastUsedAt: data.lastUsed ? new Date(data.lastUsed) : null
    })
    const [newTask] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id))
    revalidatePath('/class')
    return newTask
  } catch (error) {
    console.error('Error saving task:', error)
    throw new Error('Failed to save task')
  }
}

export async function toggleFavoriteTask(id: string) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  try {
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id)).limit(1)
    if (!task) throw new Error('Task not found')
    await drizzleDb
      .update(libraryTask)
      .set({ isFavorite: !task.isFavorite })
      .where(eq(libraryTask.id, id))
    const [updated] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id))
    revalidatePath('/class')
    return updated
  } catch (error) {
    console.error('Error toggling favorite:', error)
    throw new Error('Failed to toggle favorite')
  }
}

export async function deleteLibraryTask(id: string) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  try {
    await drizzleDb.delete(libraryTask).where(eq(libraryTask.id, id))
    revalidatePath('/class')
    return true
  } catch (error) {
    console.error('Error deleting task:', error)
    throw new Error('Failed to delete task')
  }
}

export async function incrementTaskUsage(id: string) {
  const session = await getSession()
  if (!session?.user?.id) throw new Error('Unauthorized')

  try {
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id)).limit(1)
    if (!task) return
    await drizzleDb
      .update(libraryTask)
      .set({ usageCount: task.usageCount + 1, lastUsedAt: new Date() })
      .where(eq(libraryTask.id, id))
    revalidatePath('/class')
  } catch (error) {
    console.error('Error incrementing usage:', error)
  }
}

export async function migrateLegacyTasks(tasks: any[]) {
  const session = await getSession()
  if (!session?.user?.id) return { success: false }

  try {
    for (const task of tasks) {
      await drizzleDb.insert(libraryTask).values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        question: task.question,
        type: task.type,
        options: task.options || [],
        correctAnswer: task.correctAnswer ?? null,
        explanation: task.explanation ?? null,
        difficulty: task.difficulty,
        subject: task.subject,
        topics: task.topics || [],
        isFavorite: task.isFavorite ?? false,
        usageCount: task.usedCount ?? 0,
        lastUsedAt: task.lastUsed ? new Date(task.lastUsed) : null
      })
    }
    revalidatePath('/class')
    return { success: true }
  } catch (error) {
    console.error('Error migrating tasks:', error)
    return { success: false }
  }
}
