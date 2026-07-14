/**
 * GET /api/one-on-one/deployables  (tutor only)
 *
 * The tutor's saved, published tasks that can be deployed into a live session's
 * classroom (the session-classroom deploy panel). Returns enough to build the
 * LiveTask the client emits over `task:deploy`.
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, desc, eq, isNull } from 'drizzle-orm'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { builderTask } from '@/lib/db/schema'

export const GET = withAuth(
  async (_req: NextRequest, session) => {
    const rows = await drizzleDb
      .select({
        taskId: builderTask.taskId,
        title: builderTask.title,
        type: builderTask.type,
        content: builderTask.content,
        lessonId: builderTask.lessonId,
      })
      .from(builderTask)
      .where(
        and(
          eq(builderTask.tutorId, session.user.id),
          eq(builderTask.status, 'published'),
          isNull(builderTask.deletedAt)
        )
      )
      .orderBy(desc(builderTask.updatedAt))
      .limit(100)

    return NextResponse.json({
      tasks: rows.map(r => ({
        taskId: r.taskId,
        title: r.title || 'Untitled task',
        type: (r.type as 'task' | 'assessment' | 'homework') || 'task',
        content: r.content || '',
        lessonId: r.lessonId || null,
      })),
    })
  },
  { role: 'TUTOR' }
)
