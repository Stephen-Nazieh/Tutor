/**
 * Bookmarks API (Drizzle ORM). All methods require auth; POST/DELETE require CSRF.
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { and, desc, eq } from 'drizzle-orm'
import { withAuth, requireCsrf, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { bookmark as bookmarkTable, contentItem } from '@/lib/db/schema'

async function getHandler(_req: NextRequest, session: Session) {
  // Use join to avoid N+1 query
  const bookmarks = await drizzleDb
    .select({
      bookmark: bookmarkTable,
      content: {
        id: contentItem.contentId,
        title: contentItem.title,
        subject: contentItem.subject,
        type: contentItem.type,
        duration: contentItem.duration,
      },
    })
    .from(bookmarkTable)
    .leftJoin(contentItem, eq(bookmarkTable.contentId, contentItem.contentId))
    .where(eq(bookmarkTable.studentId, session.user.id))
    .orderBy(desc(bookmarkTable.createdAt))

  const formattedBookmarks = bookmarks.map(b => ({
    ...b.bookmark,
    content: b.content ?? null,
  }))
  return NextResponse.json({ bookmarks: formattedBookmarks })
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError
  try {
    const { contentId } = await req.json()
    const [bookmark] = await drizzleDb
      .insert(bookmarkTable)
      .values({
        bookmarkId: crypto.randomUUID(),
        studentId: session.user.id,
        contentId,
      })
      .returning()
    return NextResponse.json({ bookmark })
  } catch {
    return NextResponse.json({ error: 'Bookmark already exists' }, { status: 400 })
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
        and(eq(bookmarkTable.studentId, session.user.id), eq(bookmarkTable.contentId, contentId))
      )
    return NextResponse.json({ success: true })
  } catch (err) {
    return handleApiError(err, 'Failed to remove bookmark', 'api/bookmarks/route.ts')
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
export const DELETE = withAuth(deleteHandler)
