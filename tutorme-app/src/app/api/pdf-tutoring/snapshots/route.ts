import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

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
  const existing = await db.whiteboard.findFirst({
    where: {
      tutorId: userId,
      roomId,
      title: `PDF Tutoring ${roomId}`,
      deletedAt: null,
    },
    include: { pages: true },
  })

  if (existing) {
    if (!existing.pages.length) {
      await db.whiteboardPage.create({
        data: {
          whiteboardId: existing.id,
          name: 'PDF Page 1',
          order: 0,
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid',
        },
      })
    }
    return existing
  }

  return db.whiteboard.create({
    data: {
      tutorId: userId,
      roomId,
      title: `PDF Tutoring ${roomId}`,
      description: 'Persisted PDF tutoring collaboration snapshots',
      ownerType: 'tutor',
      visibility: 'tutor-only',
      pages: {
        create: {
          name: 'PDF Page 1',
          order: 0,
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid',
        },
      },
    },
    include: { pages: true },
  })
}

export const GET = withAuth(async (req: NextRequest, session) => {
  const parsed = getSchema.safeParse(Object.fromEntries(new URL(req.url).searchParams.entries()))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid query' }, { status: 400 })
  }

  const userId = session.user.id
  const { roomId, limit } = parsed.data

  const whiteboard = await ensurePdfWhiteboard(userId, roomId)

  const snapshots = await db.whiteboardSnapshot.findMany({
    where: { whiteboardId: whiteboard.id },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

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

  const whiteboard = await ensurePdfWhiteboard(userId, roomId)

  const snapshot = await db.whiteboardSnapshot.create({
    data: {
      whiteboardId: whiteboard.id,
      name: name || `PDF Snapshot ${new Date().toLocaleString()}`,
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
    },
  })

  const existing = await db.whiteboardSnapshot.findMany({
    where: { whiteboardId: whiteboard.id },
    orderBy: { createdAt: 'desc' },
    select: { id: true },
    skip: MAX_SNAPSHOTS_PER_ROOM,
  })
  if (existing.length > 0) {
    await db.whiteboardSnapshot.deleteMany({
      where: {
        id: {
          in: existing.map((item: { id: string }) => item.id),
        },
      },
    })
  }

  return NextResponse.json({ snapshot }, { status: 201 })
})
