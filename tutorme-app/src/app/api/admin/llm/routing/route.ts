import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_READ)
  
  if (!session) return response!

  try {
    const rules = await prisma.llmRoutingRule.findMany({
      include: {
        targetModel: {
          include: {
            provider: {
              select: { name: true },
            },
          },
        },
        fallbackModel: {
          include: {
            provider: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: [
        { isActive: 'desc' },
        { priority: 'asc' },
      ],
    })

    return NextResponse.json({ rules })
  } catch (error) {
    console.error('Error fetching routing rules:', error)
    return NextResponse.json(
      { error: 'Failed to fetch routing rules' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_WRITE)
  
  if (!session) return response!

  try {
    const body = await req.json()
    const { name, description, priority, conditions, targetModelId, fallbackModelId } = body

    if (!targetModelId || !conditions) {
      return NextResponse.json(
        { error: 'Target model and conditions are required' },
        { status: 400 }
      )
    }

    const model = await prisma.llmModel.findUnique({
      where: { id: targetModelId },
      select: { providerId: true },
    })

    const rule = await prisma.llmRoutingRule.create({
      data: {
        name,
        description,
        priority: priority || 0,
        conditions,
        targetModelId,
        fallbackModelId,
        providerId: model?.providerId || '',
      },
    })

    await logAdminAction(session.adminId, 'llm_routing.create', {
      resourceType: 'llm_routing_rule',
      resourceId: rule.id,
      newState: rule,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ rule })
  } catch (error) {
    console.error('Error creating routing rule:', error)
    return NextResponse.json(
      { error: 'Failed to create routing rule' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_WRITE)
  
  if (!session) return response!

  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Rule ID is required' },
        { status: 400 }
      )
    }

    const rule = await prisma.llmRoutingRule.update({
      where: { id },
      data: updates,
    })

    await logAdminAction(session.adminId, 'llm_routing.update', {
      resourceType: 'llm_routing_rule',
      resourceId: rule.id,
      newState: rule,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ rule })
  } catch (error) {
    console.error('Error updating routing rule:', error)
    return NextResponse.json(
      { error: 'Failed to update routing rule' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_DELETE)
  
  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Rule ID is required' },
        { status: 400 }
      )
    }

    await prisma.llmRoutingRule.delete({
      where: { id },
    })

    await logAdminAction(session.adminId, 'llm_routing.delete', {
      resourceType: 'llm_routing_rule',
      resourceId: id,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting routing rule:', error)
    return NextResponse.json(
      { error: 'Failed to delete routing rule' },
      { status: 500 }
    )
  }
}
