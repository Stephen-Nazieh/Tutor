/**
 * POST /api/tasks/generate
 * Generate personalized tasks with various distribution modes
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateAndDistributeTasks, saveGeneratedTasks, TaskConfiguration, DistributionMode } from '@/lib/ai/task-generator'
import { db } from '@/lib/db'


export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    // Only tutors and admins can generate tasks
    if (session.user.role !== 'TUTOR' && session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '无权生成任务' }, { status: 403 })
    }

    const body = await request.json()
    const {
      mode,
      config,
      targetStudentIds,
      roomId,
      title,
      description,
      type = 'assignment'
    }: {
      mode: DistributionMode
      config: TaskConfiguration
      targetStudentIds?: string[]
      roomId: string
      title: string
      description?: string
      type?: string
    } = body

    if (!mode || !config || !roomId) {
      return NextResponse.json(
        { error: '缺少必要参数: mode, config, roomId' },
        { status: 400 }
      )
    }

    // Verify tutor owns the room
    const room = await db.liveSession.findFirst({
      where: {
        id: roomId,
        tutorId: session.user.id
      }
    })

    if (!room) {
      return NextResponse.json({ error: '无权访问该教室' }, { status: 403 })
    }

    // Generate tasks
    const result = await generateAndDistributeTasks(mode, config, {
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
      distributionMode: mode,
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
