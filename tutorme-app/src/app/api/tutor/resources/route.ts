/**
 * Tutor Resources API
 * GET /api/tutor/resources - List tutor's resources
 * POST /api/tutor/resources - Create a new resource record (after upload)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { resource } from '@/lib/db/schema'
import { eq, and, or, desc, ilike, sql } from 'drizzle-orm'
import { randomUUID } from 'crypto'

// GET - List resources
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)

  const type = searchParams.get('type')
  const search = searchParams.get('search')

  const conditions = [eq(resource.tutorId, tutorId)]
  if (type && type !== 'all') {
    conditions.push(eq(resource.type, type))
  }
  if (search) {
    conditions.push(
      or(
        ilike(resource.name, `%${search}%`),
        ilike(resource.description ?? '', `%${search}%`),
        sql`${search} = ANY(${resource.tags})`
      )!
    )
  }

  const resources = await drizzleDb
    .select()
    .from(resource)
    .where(and(...conditions))
    .orderBy(desc(resource.createdAt))

  return NextResponse.json({ resources })
}, { role: 'TUTOR' })

// POST - Create resource record
export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const { name, description, type, size, mimeType, url, key, tags, isPublic } = body

    if (!name || !type || !url || !key) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, url, key' },
        { status: 400 }
      )
    }

    const [resourceRow] = await drizzleDb
      .insert(resource)
      .values({
        id: randomUUID(),
        tutorId,
        name: name.slice(0, 255),
        description: description?.slice(0, 1000) ?? null,
        type,
        size: size ?? 0,
        mimeType: mimeType ?? null,
        url,
        key,
        tags: tags ?? [],
        isPublic: isPublic ?? false,
        downloadCount: 0,
      })
      .returning()

    return NextResponse.json({ resource: resourceRow }, { status: 201 })
  } catch (error) {
    console.error('Create resource error:', error)
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
