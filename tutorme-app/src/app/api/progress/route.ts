/**
 * Student Progress API
 * GET /api/progress — all progress for current student (withAuth)
 * POST /api/progress — update progress (withAuth + CSRF, Zod-validated)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { z } from 'zod'

const postBodySchema = z.object({
  contentId: z.string().min(1, 'Content ID is required'),
  progress: z.number().min(0).max(100).optional(),
  lastPosition: z.number().min(0).optional(),
  completed: z.boolean().optional(),
})

async function getHandler(_req: NextRequest, session: Session) {
  try {
    const progress = await db.contentProgress.findMany({
      where: { studentId: session.user.id },
      include: {
        content: {
          select: {
            id: true,
            title: true,
            subject: true,
            type: true,
            duration: true,
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({ progress })
  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const parsed = postBodySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues.map((i) => i.message).join('; ') },
        { status: 400 }
      )
    }
    const { contentId, progress, lastPosition, completed } = parsed.data

    const updatedProgress = await db.contentProgress.upsert({
      where: {
        contentId_studentId: {
          contentId,
          studentId: session.user.id,
        },
      },
      update: {
        progress: progress ?? undefined,
        lastPosition: lastPosition ?? undefined,
        completed: completed ?? undefined,
      },
      create: {
        studentId: session.user.id,
        contentId,
        progress: progress ?? 0,
        lastPosition: lastPosition ?? 0,
        completed: completed ?? false,
      },
    })

    return NextResponse.json({ progress: updatedProgress })
  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
