/**
 * Study Groups API
 * GET /api/study-groups — list (withAuth)
 * POST /api/study-groups — join group (withAuth + CSRF)
 * PUT /api/study-groups — create group (withAuth + CSRF)
 * DELETE /api/study-groups — leave group (withAuth + CSRF)
 */

import { NextRequest, NextResponse } from 'next/server'
import type { Session } from 'next-auth'
import type { Prisma } from '@prisma/client'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

async function getHandler(req: NextRequest, session: Session) {
  try {
    const { searchParams } = new URL(req.url)
    const myGroups = searchParams.get('myGroups') === 'true'
    const subject = searchParams.get('subject')
    const limit = parseInt(searchParams.get('limit') || '10')

    let groups

    if (myGroups) {
      // Get groups the user is a member of
      const memberships = await db.studyGroupMember.findMany({
        where: { studentId: session.user.id },
        include: {
          group: {
            include: {
              creator: {
                select: {
                  profile: {
                    select: {
                      name: true,
                      avatarUrl: true
                    }
                  }
                }
              },
              _count: {
                select: { members: true }
              }
            }
          }
        },
        orderBy: {
          group: { createdAt: 'desc' }
        },
        take: limit
      })

      groups = memberships.map((membership) => ({
        ...membership.group,
        isMember: true,
        memberRole: membership.role,
        currentMembers: membership.group._count.members
      }))
    } else {
      // Get available groups
      const where: Prisma.StudyGroupWhereInput = {
        isActive: true
      }

      if (subject) {
        where.subject = subject
      }

      groups = await db.studyGroup.findMany({
        where,
        include: {
          creator: {
            select: {
              profile: {
                select: {
                  name: true,
                  avatarUrl: true
                }
              }
            }
          },
          _count: {
            select: { members: true }
          },
          members: {
            where: { studentId: session.user.id },
            select: { id: true, role: true }
          }
        },
        orderBy: { createdAt: 'desc' },
        take: limit
      })

      groups = groups.map((group) => ({
        ...group,
        isMember: group.members.length > 0,
        memberRole: group.members[0]?.role ?? null,
        currentMembers: group._count.members,
        isFull: group._count.members >= group.maxMembers
      }))
    }

    return NextResponse.json({ groups })
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
    const group = await db.studyGroup.findUnique({
      where: { id: groupId },
      include: {
        _count: {
          select: { members: true }
        }
      }
    })

    if (!group) {
      return NextResponse.json({ error: 'Study group not found' }, { status: 404 })
    }

    if (!group.isActive) {
      return NextResponse.json({ error: 'Study group is not active' }, { status: 400 })
    }

    if (group._count.members >= group.maxMembers) {
      return NextResponse.json({ error: 'Study group is full' }, { status: 400 })
    }

    // Check if already a member
    const existingMembership = await db.studyGroupMember.findFirst({
      where: {
        groupId,
        studentId: session.user.id
      }
    })

    if (existingMembership) {
      return NextResponse.json({ error: 'Already a member of this group' }, { status: 400 })
    }

    // Create membership
    const membership = await db.studyGroupMember.create({
      data: {
        groupId,
        studentId: session.user.id,
        role: 'member'
      },
      include: {
        group: {
          select: {
            name: true,
            subject: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      membership,
      message: `Joined ${membership.group.name}`,
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
    const group = await db.studyGroup.create({
      data: {
        name: safeName,
        subject: String(subject).trim().slice(0, 50),
        description: safeDescription,
        maxMembers: maxMembers || 20,
        createdBy: session.user.id,
        members: {
          create: {
            studentId: session.user.id,
            role: 'admin'
          }
        }
      },
      include: {
        _count: {
          select: { members: true }
        },
        creator: {
          select: {
            profile: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      group: {
        ...group,
        isMember: true,
        memberRole: 'admin',
        currentMembers: 1,
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
    const membership = await db.studyGroupMember.findFirst({
      where: {
        groupId,
        studentId: session.user.id
      },
      include: { group: true }
    })

    if (!membership) {
      return NextResponse.json({ error: 'Not a member of this group' }, { status: 404 })
    }

    // Check if user is the creator (can't leave, must delete group)
    if (membership.group.createdBy === session.user.id) {
      return NextResponse.json({ 
        error: 'Group creator cannot leave. Delete the group instead.' 
      }, { status: 400 })
    }

    await db.studyGroupMember.delete({
      where: { id: membership.id }
    })

    return NextResponse.json({
      success: true,
      message: `Left ${membership.group.name}`,
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
