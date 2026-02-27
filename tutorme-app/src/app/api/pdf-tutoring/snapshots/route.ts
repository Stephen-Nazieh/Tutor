import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage, whiteboardSnapshot } from '@/lib/db/schema'
import { eq, and, isNull, desc } from 'drizzle-orm'
import crypto from 'crypto'

const MAX_SNAPSHOTS_PER_ROOM = 30

const postSchema = z.object({
  roomId: z.string().min(3).max(128),
  name: z.string().min(1).max(120).optional(),
  page: z.number().int().min(1),
  width: z.number().positive(),
  height: z.number().positive(),
  objects: z.array(z.any()).default([]),
})

const getSchema = z.object({
  roomId: z.string().min(3).max(128),
  limit: z.coerce.number().int().min(1).max(50).default(10),
})

async function ensurePdfWhiteboard(userId: string, roomId: string) {
  const title = `PDF Tutoring ${roomId}`
  const [existing] = await drizzleDb
    .select()
    .from(whiteboard)
    .where(
      and(
        eq(whiteboard.tutorId, userId),
        eq(whiteboard.roomId, roomId),
        eq(whiteboard.title, title),
        isNull(whiteboard.deletedAt)
      )
    )
    .limit(1)

  if (existing) {
    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, existing.id))
    if (pages.length === 0) {
      await drizzleDb.insert(whiteboardPage).values({
        id: crypto.randomUUID(),
        whiteboardId: existing.id,
        name: 'PDF Page 1',
        order: 0,
        backgroundColor: '#ffffff',
        backgroundStyle: 'solid',
        strokes: [],
        shapes: [],
        texts: [],
        images: [],
      })
    }
    return existing
  }

  const whiteboardId = crypto.randomUUID()
  await drizzleDb.insert(whiteboard).values({
    id: whiteboardId,
    tutorId: userId,
    roomId,
    title,
    description: 'Persisted PDF tutoring collaboration snapshots',
    ownerType: 'tutor',
    visibility: 'tutor-only',
    isTemplate: false,
    isPublic: false,
    width: 1920,
    height: 1080,
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid',
    isBroadcasting: false,
  })
  await drizzleDb.insert(whiteboardPage).values({
    id: crypto.randomUUID(),
    whiteboardId,
    name: 'PDF Page 1',
    order: 0,
    backgroundColor: '#ffffff',
    backgroundStyle: 'solid',
    strokes: [],
    shapes: [],
    texts: [],
    images: [],
  })
  const [created] = await drizzleDb.select().from(whiteboard).where(eq(whiteboard.id, whiteboardId)).limit(1)
  return created!
}

export const GET = withAuth(async (req: NextRequest, session) => {
  const parsed = getSchema.safeParse(Object.fromEntries(new URL(req.url).searchParams.entries()))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
  }

  const userId = session.user.id
  const { roomId, limit } = parsed.data

  const wb = await ensurePdfWhiteboard(userId, roomId)

  const snapshots = await drizzleDb
    .select()
    .from(whiteboardSnapshot)
    .where(eq(whiteboardSnapshot.whiteboardId, wb.id))
    .orderBy(desc(whiteboardSnapshot.createdAt))
    .limit(limit)

  return NextResponse.json({ snapshots })
})

export const POST = withAuth(async (req: NextRequest, session) => {
  const body = await req.json().catch(() => null)
  const parsed = postSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const userId = session.user.id
  const { roomId, page, width, height, objects, name } = parsed.data

  const wb = await ensurePdfWhiteboard(userId, roomId)

  const snapshotId = crypto.randomUUID()
  await drizzleDb.insert(whiteboardSnapshot).values({
    id: snapshotId,
    whiteboardId: wb.id,
    name: name ?? `PDF Snapshot ${new Date().toLocaleString()}`,
    createdBy: userId,
    pages: [
      {
        page,
        width,
        height,
        objects,
        capturedAt: new Date().toISOString(),
      },
    ],
  })

  const allSnapshots = await drizzleDb
    .select({ id: whiteboardSnapshot.id })
    .from(whiteboardSnapshot)
    .where(eq(whiteboardSnapshot.whiteboardId, wb.id))
    .orderBy(desc(whiteboardSnapshot.createdAt))
  const toDelete = allSnapshots.slice(MAX_SNAPSHOTS_PER_ROOM)
  for (const row of toDelete) {
    await drizzleDb.delete(whiteboardSnapshot).where(eq(whiteboardSnapshot.id, row.id))
  }

  const [snapshot] = await drizzleDb
    .select()
    .from(whiteboardSnapshot)
    .where(eq(whiteboardSnapshot.id, snapshotId))
    .limit(1)

  return NextResponse.json({ snapshot: snapshot ?? { id: snapshotId, whiteboardId: wb.id, name: name ?? '', pages: [], createdBy: userId, createdAt: new Date() } }, { status: 201 })
})
