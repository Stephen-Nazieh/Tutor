/**
 * POST /api/tasks/generate
 * Generate personalized tasks with various distribution modes
 */

import { NextRequest, NextResponse } from 'next/server'
import { and, eq } from 'drizzle-orm'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateAndDistributeTasks, saveGeneratedTasks, TaskConfiguration, DistributionMode } from '@/lib/ai/task-generator'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession } from '@/lib/db/schema'
import { withRateLimitPreset } from '@/lib/api/middleware'
import { z } from 'zod'

const GenerateTasksSchema = z.object({
  mode: z.string().min(1).max(32),
  config: z.record(z.string(), z.unknown()),
  targetStudentIds: z.array(z.string().min(1).max(128)).max(100).optional(),
  roomId: z.string().min(1).max(128),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z.string().max(50).default('assignment'),
})


export async function POST(request: NextRequest) {
  try {
    const { response: rateLimitResponse } = await withRateLimitPreset(request, 'aiGenerate')
    if (rateLimitResponse) return rateLimitResponse

    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // Only tutors and admins can generate tasks
    if (session.user.role !== 'TUTOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权生成任务' }, { status: 403 })
    }

    const body = await request.json().catch(() => null)
    const parsed = GenerateTasksSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ error: '请求参数无效' }, { status: 400 })
    }
    const {
      mode,
      config,
      targetStudentIds,
      roomId,
      title,
      description,
      type
    } = parsed.data

    if (!mode || !config || !roomId) {
      return NextResponse.json(
        { error: '缺少必要参数: mode, config, roomId' },
        { status: 400 }
      )
    }

    // Verify tutor owns the room
    const [room] = await drizzleDb
      .select()
      .from(liveSession)
      .where(
        and(
          eq(liveSession.id, roomId),
          eq(liveSession.tutorId, session.user.id)
        )
      )
      .limit(1)

    if (!room) {
      return NextResponse.json({ error: '无权访问该教室' }, { status: 403 })
    }

    // Generate tasks
    const result = await generateAndDistributeTasks(mode as DistributionMode, config as unknown as TaskConfiguration, {
      studentIds: targetStudentIds,
      targetStudentId: targetStudentIds?.[0]
    })

    if (!result.success || !result.tasks) {
      return NextResponse.json(
        { error: result.error || '任务生成失败' },
        { status: 500 }
      )
    }

    // Save generated tasks to database
    const saveResult = await saveGeneratedTasks(result.tasks, {
      roomId,
      tutorId: session.user.id,
      distributionMode: mode as DistributionMode,
      title,
      description,
      type
    })

    if (!saveResult.success) {
      return NextResponse.json(
        { error: saveResult.error || '保存任务失败' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: {
        taskIds: saveResult.taskIds,
        studentCount: result.tasks.size,
        mode
      }
    })
  } catch (error) {
    console.error('Failed to generate tasks:', error)
    return NextResponse.json(
      { error: '生成任务失败' },
      { status: 500 }
    )
  }
}
