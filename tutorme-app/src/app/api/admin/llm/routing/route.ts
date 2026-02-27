import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { llmRoutingRule, llmModel, llmProvider } from '@/lib/db/schema'
import { eq, asc, desc, inArray } from 'drizzle-orm'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_READ)

  if (!session) return response!

  try {
    const rules = await drizzleDb
      .select()
      .from(llmRoutingRule)
      .orderBy(desc(llmRoutingRule.isActive), asc(llmRoutingRule.priority))

    const targetModelIds = [...new Set(rules.map((r) => r.targetModelId).filter((id): id is string => id != null))]
    const fallbackModelIds = [...new Set(rules.map((r) => r.fallbackModelId).filter((id): id is string => id != null))]
    const allModelIds = [...new Set([...targetModelIds, ...fallbackModelIds])]
    const models =
      allModelIds.length > 0
        ? await drizzleDb.select().from(llmModel).where(inArray(llmModel.id, allModelIds))
        : []
    const providerIds = [...new Set(models.map((m) => m.providerId).filter((id): id is string => id != null))]
    const providers =
      providerIds.length > 0
        ? await drizzleDb.select({ id: llmProvider.id, name: llmProvider.name }).from(llmProvider).where(inArray(llmProvider.id, providerIds))
        : []
    const modelById = new Map(models.map((m) => [m.id, m]))
    const providerById = new Map(providers.map((p) => [p.id, p]))

    const rulesWithRelations = rules.map((r) => ({
      ...r,
      targetModel: (() => {
        const m = modelById.get(r.targetModelId)
        return m ? { ...m, provider: m ? { name: providerById.get(m.providerId)?.name } : null } : null
      })(),
      fallbackModel: (() => {
        const m = r.fallbackModelId ? modelById.get(r.fallbackModelId) : null
        return m ? { ...m, provider: { name: providerById.get(m.providerId)?.name } } : null
      })(),
    }))

    return NextResponse.json({ rules: rulesWithRelations })
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

    const [model] = await drizzleDb.select({ providerId: llmModel.providerId }).from(llmModel).where(eq(llmModel.id, targetModelId)).limit(1)
    const providerId = model?.providerId ?? ''

    const id = crypto.randomUUID()
    await drizzleDb.insert(llmRoutingRule).values({
      id,
      name: name ?? null,
      description: description ?? null,
      priority: priority ?? 0,
      conditions: conditions as Record<string, unknown>,
      targetModelId,
      fallbackModelId: fallbackModelId ?? null,
      isActive: true,
      providerId,
    })
    const [rule] = await drizzleDb.select().from(llmRoutingRule).where(eq(llmRoutingRule.id, id))

    await logAdminAction(session.adminId, 'llm_routing.create', {
      resourceType: 'llm_routing_rule',
      resourceId: rule!.id,
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

    const allowed = ['name', 'description', 'priority', 'conditions', 'targetModelId', 'fallbackModelId', 'isActive']
    const set: Record<string, unknown> = {}
    for (const k of allowed) {
      if (updates[k] !== undefined) set[k] = updates[k]
    }
    if (Object.keys(set).length > 0) {
      await drizzleDb.update(llmRoutingRule).set(set as Partial<typeof llmRoutingRule.$inferInsert>).where(eq(llmRoutingRule.id, id))
    }
    const [rule] = await drizzleDb.select().from(llmRoutingRule).where(eq(llmRoutingRule.id, id))
    if (!rule) return NextResponse.json({ error: 'Rule not found' }, { status: 404 })

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

    await drizzleDb.delete(llmRoutingRule).where(eq(llmRoutingRule.id, id))

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
