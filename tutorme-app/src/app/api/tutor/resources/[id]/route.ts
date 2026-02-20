/**
 * Individual Resource API
 * GET /api/tutor/resources/[id] - Get resource details
 * PATCH /api/tutor/resources/[id] - Update resource
 * DELETE /api/tutor/resources/[id] - Delete resource
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { deleteObject, isS3Configured } from '@/lib/storage/s3'

// GET - Resource details
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id

  const resource = await db.resource.findFirst({
    where: { id, tutorId },
  })

  if (!resource) {
    return NextResponse.json(
      { error: 'Resource not found' },
      { status: 404 }
    )
  }

  return NextResponse.json({ resource })
}, { role: 'TUTOR' })

// PATCH - Update resource
export const PATCH = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const id = params?.id as string
  const tutorId = session.user.id

  try {
    const body = await req.json()
    const { name, description, tags, isPublic } = body

    // Check resource exists and belongs to tutor
    const existing = await db.resource.findFirst({
      where: { id, tutorId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    const updateData: any = {}
    if (name !== undefined) updateData.name = name.slice(0, 255)
    if (description !== undefined) updateData.description = description?.slice(0, 1000)
    if (tags !== undefined) updateData.tags = tags
    if (isPublic !== undefined) updateData.isPublic = isPublic

    const resource = await db.resource.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ resource })
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
    // Check resource exists and belongs to tutor
    const existing = await db.resource.findFirst({
      where: { id, tutorId },
    })

    if (!existing) {
      return NextResponse.json(
        { error: 'Resource not found' },
        { status: 404 }
      )
    }

    // Delete file from S3 storage
    if (isS3Configured() && existing.key) {
      try {
        await deleteObject(existing.key)
      } catch (err) {
        // Log but don't fail the request — DB record still gets deleted
        console.error('[resource-delete] S3 delete failed:', err)
      }
    }

    await db.resource.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete resource error:', error)
    return NextResponse.json(
      { error: 'Failed to delete resource' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
