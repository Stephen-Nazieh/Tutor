/**
 * Study Groups API
 * GET /api/study-groups — list (withAuth)
 * POST /api/study-groups — join group (withAuth + CSRF)
 * PUT /api/study-groups — create group (withAuth + CSRF)
 * DELETE /api/study-groups — leave group (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import { eq, and, desc, count, sql, inArray } from 'drizzle-orm'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { studyGroup, studyGroupMember, user, profile } from '@/lib/db/schema'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import crypto from 'crypto'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const myGroups = searchParams.get('myGroups') === 'true'
    const subjectQuery = searchParams.get('subject')
    const limit = parseInt(searchParams.get('limit') || '10')

    let groupsResult

    if (myGroups) {
      // Get groups the user is a member of
      // We need group info, creator info, and member count
      const memberships = await drizzleDb
        .select({
          group: studyGroup,
          memberRole: studyGroupMember.role,
          creatorName: profile.name,
          creatorAvatar: profile.avatarUrl,
        })
        .from(studyGroupMember)
        .innerJoin(studyGroup, eq(studyGroup.id, studyGroupMember.groupId))
        .innerJoin(user, eq(user.id, studyGroup.createdBy))
        .innerJoin(profile, eq(profile.userId, user.id))
        .where(eq(studyGroupMember.studentId, session.user.id))
        .orderBy(desc(studyGroup.createdAt))
        .limit(limit)

      // Fetch member counts in parallel
      groupsResult = await Promise.all(memberships.map(async (m) => {
        const [stats] = await drizzleDb
          .select({ value: count() })
          .from(studyGroupMember)
          .where(eq(studyGroupMember.groupId, m.group.id))

        return {
          ...m.group,
          isMember: true,
          memberRole: m.memberRole,
          currentMembers: Number(stats?.value || 0),
          creator: {
            profile: {
              name: m.creatorName,
              avatarUrl: m.creatorAvatar
            }
          }
        }
      }))
    } else {
      // Get available groups
      const filters = [eq(studyGroup.isActive, true)]
      if (subjectQuery) filters.push(eq(studyGroup.subject, subjectQuery))

      const availableGroups = await drizzleDb
        .select({
          group: studyGroup,
          creatorName: profile.name,
          creatorAvatar: profile.avatarUrl,
        })
        .from(studyGroup)
        .innerJoin(user, eq(user.id, studyGroup.createdBy))
        .innerJoin(profile, eq(profile.userId, user.id))
        .where(and(...filters))
        .orderBy(desc(studyGroup.createdAt))
        .limit(limit)

      groupsResult = await Promise.all(availableGroups.map(async (g) => {
        const [stats] = await drizzleDb
          .select({ value: count() })
          .from(studyGroupMember)
          .where(eq(studyGroupMember.groupId, g.group.id))

        const [myMembership] = await drizzleDb
          .select({ role: studyGroupMember.role })
          .from(studyGroupMember)
          .where(and(
            eq(studyGroupMember.groupId, g.group.id),
            eq(studyGroupMember.studentId, session.user.id)
          ))
          .limit(1)

        const currentMembers = Number(stats?.value || 0)

        return {
          ...g.group,
          isMember: !!myMembership,
          memberRole: myMembership?.role ?? null,
          currentMembers,
          isFull: currentMembers >= g.group.maxMembers,
          creator: {
            profile: {
              name: g.creatorName,
              avatarUrl: g.creatorAvatar
            }
          }
        }
      }))
    }

    return NextResponse.json({ groups: groupsResult })
  } catch (error) {
    console.error('Failed to fetch study groups:', error)
    return NextResponse.json({ error: 'Failed to fetch study groups' }, { status: 500 })
  }
}

async function postHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const groupId = typeof body.groupId === 'string' ? body.groupId.trim() : ''

    if (!groupId) {
      return NextResponse.json({ error: 'Group ID required' }, { status: 400 })
    }

    // Check if group exists and has space
    const [group] = await drizzleDb
      .select()
      .from(studyGroup)
      .where(eq(studyGroup.id, groupId))
      .limit(1)

    if (!group) {
      return NextResponse.json({ error: 'Study group not found' }, { status: 404 })
    }

    if (!group.isActive) {
      return NextResponse.json({ error: 'Study group is not active' }, { status: 400 })
    }

    const [stats] = await drizzleDb
      .select({ value: count() })
      .from(studyGroupMember)
      .where(eq(studyGroupMember.groupId, groupId))

    if (Number(stats?.value || 0) >= group.maxMembers) {
      return NextResponse.json({ error: 'Study group is full' }, { status: 400 })
    }

    // Check if already a member
    const [existingMembership] = await drizzleDb
      .select()
      .from(studyGroupMember)
      .where(and(
        eq(studyGroupMember.groupId, groupId),
        eq(studyGroupMember.studentId, session.user.id)
      ))
      .limit(1)

    if (existingMembership) {
      return NextResponse.json({ error: 'Already a member of this group' }, { status: 400 })
    }

    // Create membership
    const [membership] = await drizzleDb.insert(studyGroupMember).values({
      id: crypto.randomUUID(),
      groupId,
      studentId: session.user.id,
      role: 'member'
    }).returning()

    return NextResponse.json({
      success: true,
      membership: {
        ...membership,
        group: {
          name: group.name,
          subject: group.subject
        }
      },
      message: `Joined ${group.name}`,
    })
  } catch (error) {
    console.error('Failed to join study group:', error)
    return NextResponse.json({ error: 'Failed to join study group' }, { status: 500 })
  }
}

async function putHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const { name, subject, description, maxMembers } = body
    const safeName = typeof name === 'string' ? sanitizeHtmlWithMax(name.trim(), 200) : ''
    const safeDescription = typeof description === 'string' ? sanitizeHtmlWithMax(description, 1000) : ''

    if (!safeName || !subject) {
      return NextResponse.json({ error: 'Name and subject required' }, { status: 400 })
    }

    // Create group and add creator as admin
    const newGroupId = crypto.randomUUID()
    const [group] = await drizzleDb.transaction(async (tx) => {
      const [newGroup] = await tx.insert(studyGroup).values({
        id: newGroupId,
        name: safeName,
        subject: String(subject).trim().slice(0, 50),
        description: safeDescription,
        maxMembers: maxMembers || 20,
        createdBy: session.user.id,
        isActive: true,
      }).returning()

      await tx.insert(studyGroupMember).values({
        id: crypto.randomUUID(),
        groupId: newGroupId,
        studentId: session.user.id,
        role: 'admin'
      })

      return [newGroup]
    })

    const [creatorProfile] = await drizzleDb
      .select({ name: profile.name })
      .from(profile)
      .where(eq(profile.userId, session.user.id))
      .limit(1)

    return NextResponse.json({
      success: true,
      group: {
        ...group,
        isMember: true,
        memberRole: 'admin',
        currentMembers: 1,
        creator: {
          profile: {
            name: creatorProfile?.name
          }
        }
      },
      message: `Created study group "${name}"`,
    })
  } catch (error) {
    console.error('Failed to create study group:', error)
    return NextResponse.json({ error: 'Failed to create study group' }, { status: 500 })
  }
}

async function deleteHandler(req: NextRequest, session: Session) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  try {
    const body = await req.json().catch(() => ({}))
    const groupId = typeof body.groupId === 'string' ? body.groupId.trim() : ''

    if (!groupId) {
      return NextResponse.json({ error: 'Group ID required' }, { status: 400 })
    }

    // Find membership
    const [membership] = await drizzleDb
      .select({
        id: studyGroupMember.id,
        groupCreatedBy: studyGroup.createdBy,
        groupName: studyGroup.name
      })
      .from(studyGroupMember)
      .innerJoin(studyGroup, eq(studyGroup.id, studyGroupMember.groupId))
      .where(and(
        eq(studyGroupMember.groupId, groupId),
        eq(studyGroupMember.studentId, session.user.id)
      ))
      .limit(1)

    if (!membership) {
      return NextResponse.json({ error: 'Not a member of this group' }, { status: 404 })
    }

    // Check if user is the creator (can't leave, must delete group)
    if (membership.groupCreatedBy === session.user.id) {
      return NextResponse.json({
        error: 'Group creator cannot leave. Delete the group instead.'
      }, { status: 400 })
    }

    await drizzleDb
      .delete(studyGroupMember)
      .where(eq(studyGroupMember.id, membership.id))

    return NextResponse.json({
      success: true,
      message: `Left ${membership.groupName}`,
    })
  } catch (error) {
    console.error('Failed to leave study group:', error)
    return NextResponse.json({ error: 'Failed to leave study group' }, { status: 500 })
  }
}

export const GET = withAuth(getHandler)
export const POST = withAuth(postHandler)
export const PUT = withAuth(putHandler)
export const DELETE = withAuth(deleteHandler)
