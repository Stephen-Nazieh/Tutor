/**
 * Resource Sharing API
 *
 * GET  /api/tutor/resources/[id]/share  — Get current sharing settings
 * POST /api/tutor/resources/[id]/share  — Share resource with students/curriculum/all
 * DELETE /api/tutor/resources/[id]/share — Revoke all shares for a resource
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { resource, resourceShare, user, profile } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { randomUUID } from 'crypto'

// GET – current shares for a resource
export const GET = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Resource ID required' }, { status: 400 })
  }
  const tutorId = session.user.id

  const resourceRows = await drizzleDb
    .select()
    .from(resource)
    .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
    .limit(1)

  const resourceRow = resourceRows[0]
  if (!resourceRow) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  const shareRows = await drizzleDb
    .select({
      share: resourceShare,
      recipientId: resourceShare.recipientId,
      recipientName: profile.name,
      recipientEmail: user.email,
    })
    .from(resourceShare)
    .leftJoin(user, eq(resourceShare.recipientId, user.id))
    .leftJoin(profile, eq(profile.userId, user.id))
    .where(eq(resourceShare.resourceId, id))

  const shares = shareRows.map((r) => ({
    ...r.share,
    recipient: r.recipientId
      ? { id: r.recipientId, name: r.recipientName, email: r.recipientEmail }
      : null,
  }))

  return NextResponse.json({ shares, isPublic: resourceRow.isPublic })
}, { role: 'TUTOR' })

// POST – share with specific recipients or all
export const POST = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Resource ID required' }, { status: 400 })
  }
  const tutorId = session.user.id

  const resourceRows = await drizzleDb
    .select()
    .from(resource)
    .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
    .limit(1)

  if (!resourceRows[0]) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  const body = await req.json()
  const { recipientIds, curriculumId, sharedWithAll, message } = body

  const shares: { id: string }[] = []

  if (sharedWithAll) {
    const existing = await drizzleDb
      .select()
      .from(resourceShare)
      .where(and(eq(resourceShare.resourceId, id), eq(resourceShare.sharedWithAll, true)))
      .limit(1)

    if (existing[0]) {
      await drizzleDb
        .update(resourceShare)
        .set({ sharedWithAll: true })
        .where(eq(resourceShare.id, existing[0].id))
      shares.push({ id: existing[0].id })
    } else {
      const [inserted] = await drizzleDb
        .insert(resourceShare)
        .values({
          id: randomUUID(),
          resourceId: id,
          sharedByTutorId: tutorId,
          sharedWithAll: true,
          curriculumId: curriculumId ?? null,
          message: message ?? null,
          recipientId: null,
        })
        .returning({ id: resourceShare.id })
      if (inserted) shares.push(inserted)
    }
  } else if (recipientIds?.length > 0) {
    for (const recipientId of recipientIds) {
      try {
        const existing = await drizzleDb
          .select()
          .from(resourceShare)
          .where(and(eq(resourceShare.resourceId, id), eq(resourceShare.recipientId, recipientId)))
          .limit(1)

        if (existing[0]) {
          await drizzleDb
            .update(resourceShare)
            .set({ curriculumId: curriculumId ?? null, message: message ?? null })
            .where(eq(resourceShare.id, existing[0].id))
          shares.push({ id: existing[0].id })
        } else {
          const [inserted] = await drizzleDb
            .insert(resourceShare)
            .values({
              id: randomUUID(),
              resourceId: id,
              sharedByTutorId: tutorId,
              recipientId,
              curriculumId: curriculumId ?? null,
              message: message ?? null,
              sharedWithAll: false,
            })
            .returning({ id: resourceShare.id })
          if (inserted) shares.push(inserted)
        }
      } catch {
        // skip duplicates
      }
    }
  }

  return NextResponse.json({ success: true, shares })
}, { role: 'TUTOR' })

// DELETE – revoke all shares (or specific share)
export const DELETE = withAuth(async (req: NextRequest, session, context) => {
  const id = await getParamAsync(context?.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'Resource ID required' }, { status: 400 })
  }
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  const recipientId = searchParams.get('recipientId')

  const resourceRows = await drizzleDb
    .select()
    .from(resource)
    .where(and(eq(resource.id, id), eq(resource.tutorId, tutorId)))
    .limit(1)

  if (!resourceRows[0]) {
    return NextResponse.json({ error: 'Resource not found' }, { status: 404 })
  }

  if (recipientId) {
    await drizzleDb
      .delete(resourceShare)
      .where(and(eq(resourceShare.resourceId, id), eq(resourceShare.recipientId, recipientId)))
  } else {
    await drizzleDb.delete(resourceShare).where(eq(resourceShare.resourceId, id))
  }

  return NextResponse.json({ success: true })
}, { role: 'TUTOR' })
