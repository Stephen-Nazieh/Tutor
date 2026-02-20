/**
 * Bookmarks API. All methods require auth; POST/DELETE require CSRF.
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'

async function getHandler(_req: NextRequest, session: Session) {
  const bookmarks = await db.bookmark.findMany({
    where: { studentId: session.user.id },
    include: {
      content: {
        select: {
          id: true,
          title: true,
          subject: true,
          type: true,
          duration: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })
  return NextResponse.json({ bookmarks })
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError
  try {
    const { contentId } = await req.json()
    const bookmark = await db.bookmark.create({
      data: {
        studentId: session.user.id,
        contentId
      }
    })
    return NextResponse.json({ bookmark })
  } catch {
    return NextResponse.json(
      { error: 'Bookmark already exists' },
      { status: 400 }
    )
  }
}

async function deleteHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError
  try {
    const { contentId } = await req.json()
    await db.bookmark.deleteMany({
      where: {
        studentId: session.user.id,
        contentId
      }
    })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Failed to remove bookmark' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
export const DELETE = withAuth(deleteHandler)
