/**
 * Individual Resource API
 * GET /api/tutor/resources/[id] - Get resource details
 * PATCH /api/tutor/resources/[id] - Update resource
 * DELETE /api/tutor/resources/[id] - Delete resource
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { resource } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { deleteObject, isS3Configured } from '@/lib/storage/s3'

// GET - Resource details
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id

  const rows = await drizzleDb
    .select()
    .from(resource)
    .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
    .limit(1)

  const resourceRow = rows[0]
  if (!resourceRow) {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ resource: resourceRow })
}, { role: 'TUTOR' })

// PATCH - Update resource
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const { name, description, tags, isPublic } = body

    const existing = await drizzleDb
      .select()
      .from(resource)
      .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
      .limit(1)
      .then((r) => r[0])

    if (!existing) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    const updateData: { name?: string; description?: string | null; tags?: string[]; isPublic?: boolean } = {}
    if (name !== undefined) updateData.name = name.slice(0, 255)
    if (description !== undefined) updateData.description = description?.slice(0, 1000) ?? null
    if (tags !== undefined) updateData.tags = tags
    if (isPublic !== undefined) updateData.isPublic = isPublic

    const [resourceRow] = await drizzleDb
      .update(resource)
      .set(updateData)
      .where(eq(resource.id, id))
      .returning()

    return NextResponse.json({ resource: resourceRow })
  } catch (error) {
    console.error('Update resource error:', error)
    return NextResponse.json(
      { error: 'Failed to update resource' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

// DELETE - Delete resource
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id

  try {
    const existing = await drizzleDb
      .select()
      .from(resource)
      .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
      .limit(1)
      .then((r) => r[0])

    if (!existing) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    if (isS3Configured() && existing.key) {
      try {
        await deleteObject(existing.key)
      } catch (err) {
        console.error('[resource-delete] S3 delete failed:', err)
      }
    }

    await drizzleDb.delete(resource).where(eq(resource.id, id))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete resource error:', error)
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
