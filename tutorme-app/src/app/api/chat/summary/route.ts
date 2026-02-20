/**
 * POST /api/chat/summary
 * Generate a summary for a chat session
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { generateSessionSummary, SummaryOptions } from '@/lib/chat/summary'
import { db } from '@/lib/db'


export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: '未授权' }, { status: 401 })
    }

    const body = await request.json()
    const {
      sessionId,
      type = 'session',
      maxLength = 'medium',
      includeActionItems = true
    }: {
      sessionId: string
      type?: 'session' | 'topic' | 'student' | 'breakout'
      maxLength?: 'short' | 'medium' | 'detailed'
      includeActionItems?: boolean
    } = body

    if (!sessionId) {
      return NextResponse.json(
        { error: '缺少sessionId参数' },
        { status: 400 }
      )
    }

    // Verify user has access to this session
    const liveSession = await db.liveSession.findFirst({
      where: {
        id: sessionId,
        OR: [
          { tutorId: session.user.id },
          {
            participants: {
              some: {
                studentId: session.user.id
              }
            }
          }
        ]
      }
    })

    if (!liveSession && session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '无权访问该会话' },
        { status: 403 }
      )
    }

    const options: SummaryOptions = {
      type,
      maxLength,
      includeActionItems,
      language: 'zh'
    }

    const result = await generateSessionSummary(sessionId, options)

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || '生成总结失败' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.summary
    })
  } catch (error) {
    console.error('Failed to generate chat summary:', error)
    return NextResponse.json(
      { error: '生成聊天总结失败' },
      { status: 500 }
    )
  }
}
