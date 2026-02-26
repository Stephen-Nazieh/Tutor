/**
 * Library Actions
 * Server actions for managing tutor's task library
 */

'use server';

import { db } from '@/lib/db';
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
    const tasks = await db.libraryTask.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return tasks.map((task: any) => ({
      ...task,
      topics: task.topics as string[],
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
    const task = await db.libraryTask.create({
      data: {
        userId,
        question: input.question,
        type: input.type,
        options: input.options || [],
        correctAnswer: input.correctAnswer,
        explanation: input.explanation,
        difficulty: input.difficulty,
        subject: input.subject,
        topics: input.topics,
        isFavorite: false,
        usageCount: 0
      }
    });

    revalidatePath('/tutor/library');
    return {
      ...task,
      topics: task.topics as string[],
      options: task.options as string[] | undefined
    };
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
    const task = await db.libraryTask.findUnique({
      where: { id: taskId }
    });

    if (!task || task.userId !== userId) {
      return false;
    }

    await db.libraryTask.update({
      where: { id: taskId },
      data: { isFavorite: !task.isFavorite }
    });

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
    const task = await db.libraryTask.findUnique({
      where: { id: taskId }
    });

    if (!task || task.userId !== userId) {
      return false;
    }

    await db.libraryTask.delete({
      where: { id: taskId }
    });

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
    await db.libraryTask.update({
      where: { id: taskId },
      data: {
        usageCount: { increment: 1 },
        lastUsedAt: new Date()
      }
    });

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
