'use server'

import { db } from '@/lib/db'
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
        const tasks = await db.libraryTask.findMany({
            where: { userId: session.user.id },
            orderBy: [
                { isFavorite: 'desc' },
                { usageCount: 'desc' }
            ]
        })
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
        const newTask = await db.libraryTask.create({
            data: {
                userId: session.user.id,
                question: data.question,
                type: data.type,
                options: data.options || [],
                correctAnswer: data.correctAnswer,
                explanation: data.explanation,
                difficulty: data.difficulty,
                subject: data.subject,
                topics: data.topics || [],
                isFavorite: data.isFavorite || false,
                usageCount: data.usedCount || 0,
                lastUsedAt: data.lastUsed ? new Date(data.lastUsed) : null
            }
        })
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
        const task = await db.libraryTask.findUnique({
            where: { id }
        })

        if (!task) throw new Error('Task not found')

        const updated = await db.libraryTask.update({
            where: { id },
            data: { isFavorite: !task.isFavorite }
        })
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
        await db.libraryTask.delete({
            where: { id }
        })
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
        await db.libraryTask.update({
            where: { id },
            data: {
                usageCount: { increment: 1 },
                lastUsedAt: new Date()
            }
        })
        revalidatePath('/class')
    } catch (error) {
        console.error('Error incrementing usage:', error)
    }
}

export async function migrateLegacyTasks(tasks: any[]) {
    const session = await getSession()
    if (!session?.user?.id) return { success: false }

    try {
        // Basic deduplication or just forced insert
        // We'll just loop and insert for simplicity in this migration
        for (const task of tasks) {
            await db.libraryTask.create({
                data: {
                    userId: session.user.id,
                    question: task.question,
                    type: task.type,
                    options: task.options || [],
                    correctAnswer: task.correctAnswer,
                    explanation: task.explanation,
                    difficulty: task.difficulty,
                    subject: task.subject,
                    topics: task.topics || [],
                    // Preserve legacy stats if possible, or reset
                    isFavorite: task.isFavorite || false,
                    usageCount: task.usedCount || 0,
                    lastUsedAt: task.lastUsed ? new Date(task.lastUsed) : null
                }
            })
        }
        revalidatePath('/class')
        return { success: true }
    } catch (error) {
        console.error('Error migrating tasks:', error)
        return { success: false }
    }
}
