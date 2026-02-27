/**
 * Bookmarks API (Drizzle ORM). All methods require auth; POST/DELETE require CSRF.
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { and, desc, eq } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { bookmark as bookmarkTable, contentItem } from '@/lib/db/schema'

async function getHandler(_req: NextRequest, session: Session) {
  const rows = await drizzleDb
    .select()
    .from(bookmarkTable)
    .where(eq(bookmarkTable.studentId, session.user.id))
    .orderBy(desc(bookmarkTable.createdAt))

  const bookmarks = await Promise.all(
    rows.map(async (b) => {
      const [content] = await drizzleDb
        .select({
          id: contentItem.id,
          title: contentItem.title,
          subject: contentItem.subject,
          type: contentItem.type,
          duration: contentItem.duration,
        })
        .from(contentItem)
        .where(eq(contentItem.id, b.contentId))
        .limit(1)
      return { ...b, content: content ?? null }
    })
  )
  return NextResponse.json({ bookmarks })
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError
  try {
    const { contentId } = await req.json()
    const [bookmark] = await drizzleDb
      .insert(bookmarkTable)
      .values({
        id: crypto.randomUUID(),
        studentId: session.user.id,
        contentId,
      })
      .returning()
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
    await drizzleDb
      .delete(bookmarkTable)
      .where(
        and(
          eq(bookmarkTable.studentId, session.user.id),
          eq(bookmarkTable.contentId, contentId)
        )
      )
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
