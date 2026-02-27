/**
 * Library Actions
 * Server actions for managing tutor's task library
 */

'use server';

import { drizzleDb } from '@/lib/db/drizzle';
import { libraryTask } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface LibraryTask {
  id: string;
  question: string;
  type: 'multiple_choice' | 'short_answer';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  difficulty: string;
  subject: string;
  topics: string[];
  isFavorite: boolean;
  usageCount: number;
  lastUsedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateLibraryTaskInput {
  question: string;
  type: 'multiple_choice' | 'short_answer';
  options?: string[];
  correctAnswer?: string;
  explanation?: string;
  difficulty: string;
  subject: string;
  topics: string[];
}

/**
 * Get all library tasks for a user
 */
export async function getLibraryTasks(userId: string): Promise<LibraryTask[]> {
  try {
    const tasks = await drizzleDb
      .select()
      .from(libraryTask)
      .where(eq(libraryTask.userId, userId))
      .orderBy(desc(libraryTask.createdAt));
    return tasks.map((task) => ({
      ...task,
      correctAnswer: task.correctAnswer ?? undefined,
      explanation: task.explanation ?? undefined,
      lastUsedAt: task.lastUsedAt ?? undefined,
      type: task.type as 'multiple_choice' | 'short_answer',
      topics: (task.topics as string[]) ?? [],
      options: task.options as string[] | undefined
    }));
  } catch (error) {
    console.error('Failed to get library tasks:', error);
    return [];
  }
}

/**
 * Save a new task to the library
 */
export async function saveLibraryTask(
  userId: string,
  input: CreateLibraryTaskInput
): Promise<LibraryTask | null> {
  try {
    const id = crypto.randomUUID();
    await drizzleDb.insert(libraryTask).values({
      id,
      userId,
      question: input.question,
      type: input.type,
      options: input.options ?? [],
      correctAnswer: input.correctAnswer ?? null,
      explanation: input.explanation ?? null,
      difficulty: input.difficulty,
      subject: input.subject,
      topics: input.topics,
      isFavorite: false,
      usageCount: 0
    });
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, id));
    revalidatePath('/tutor/library');
    return task
      ? {
          ...task,
          correctAnswer: task.correctAnswer ?? undefined,
          explanation: task.explanation ?? undefined,
          lastUsedAt: task.lastUsedAt ?? undefined,
          type: task.type as 'multiple_choice' | 'short_answer',
          topics: (task.topics as string[]) ?? [],
          options: task.options as string[] | undefined
        }
      : null;
  } catch (error) {
    console.error('Failed to save library task:', error);
    return null;
  }
}

/**
 * Toggle favorite status of a task
 */
export async function toggleFavoriteTask(
  taskId: string,
  userId: string
): Promise<boolean> {
  try {
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, taskId)).limit(1);
    if (!task || task.userId !== userId) return false;
    await drizzleDb
      .update(libraryTask)
      .set({ isFavorite: !task.isFavorite })
      .where(eq(libraryTask.id, taskId));
    revalidatePath('/tutor/library');
    return true;
  } catch (error) {
    console.error('Failed to toggle favorite:', error);
    return false;
  }
}

/**
 * Delete a task from the library
 */
export async function deleteLibraryTask(
  taskId: string,
  userId: string
): Promise<boolean> {
  try {
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, taskId)).limit(1);
    if (!task || task.userId !== userId) return false;
    await drizzleDb.delete(libraryTask).where(eq(libraryTask.id, taskId));
    revalidatePath('/tutor/library');
    return true;
  } catch (error) {
    console.error('Failed to delete library task:', error);
    return false;
  }
}

/**
 * Increment usage count when a task is used
 */
export async function incrementTaskUsage(taskId: string): Promise<boolean> {
  try {
    const [task] = await drizzleDb.select().from(libraryTask).where(eq(libraryTask.id, taskId)).limit(1);
    if (!task) return false;
    await drizzleDb
      .update(libraryTask)
      .set({ usageCount: task.usageCount + 1, lastUsedAt: new Date() })
      .where(eq(libraryTask.id, taskId));
    return true;
  } catch (error) {
    console.error('Failed to increment task usage:', error);
    return false;
  }
}

/**
 * Migrate legacy tasks (placeholder for future migration logic)
 */
export async function migrateLegacyTasks(userId: string): Promise<number> {
  try {
    // Placeholder for future migration logic
    // This would migrate tasks from an old format or storage
    console.log('Migrating legacy tasks for user:', userId);
    return 0;
  } catch (error) {
    console.error('Failed to migrate legacy tasks:', error);
    return 0;
  }
}
