import { NextRequest, NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { llmProvider, llmModel, llmRoutingRule } from '@/lib/db/schema'
import { eq, and, asc, inArray, sql } from 'drizzle-orm'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_READ)

  if (!session) return response!

  try {
    const providers = await drizzleDb
      .select()
      .from(llmProvider)
      .orderBy(asc(llmProvider.priority))

    const providerIds = providers.map((p) => p.id)
    const models =
      providerIds.length > 0
        ? await drizzleDb
            .select()
            .from(llmModel)
            .where(and(inArray(llmModel.providerId, providerIds), eq(llmModel.isActive, true)))
            .orderBy(asc(llmModel.name))
        : []
    const ruleCounts =
      providerIds.length > 0
        ? await drizzleDb
            .select({
              providerId: llmRoutingRule.providerId,
              count: sql<number>`count(*)::int`,
            })
            .from(llmRoutingRule)
            .where(inArray(llmRoutingRule.providerId, providerIds))
            .groupBy(llmRoutingRule.providerId)
        : []

    const modelsByProvider = new Map<string, typeof models>()
    for (const m of models) {
      const list = modelsByProvider.get(m.providerId) ?? []
      list.push(m)
      modelsByProvider.set(m.providerId, list)
    }
    const ruleCountByProvider = new Map(ruleCounts.map((r) => [r.providerId, r.count]))

    const safeProviders = providers.map((p) => ({
      ...p,
      models: modelsByProvider.get(p.id) ?? [],
      _count: { routingRules: ruleCountByProvider.get(p.id) ?? 0 },
      apiKeyEncrypted: p.apiKeyEncrypted ? '***encrypted***' : null,
    }))

    return NextResponse.json({ providers: safeProviders })
  } catch (error) {
    console.error('Error fetching LLM providers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch providers' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_WRITE)

  if (!session) return response!

  try {
    const body = await req.json()
    const { name, providerType, apiKey, baseUrl, priority, config, rateLimits, costPer1kTokens } = body

    if (!name || !providerType) {
      return NextResponse.json(
        { error: 'Name and provider type are required' },
        { status: 400 }
      )
    }

    const id = crypto.randomUUID()
    const rateLimitsVal = rateLimits ?? { requests_per_minute: 60, tokens_per_day: 100000 }
    await drizzleDb.insert(llmProvider).values({
      id,
      name,
      providerType,
      apiKeyEncrypted: apiKey || null,
      baseUrl: baseUrl || null,
      priority: priority ?? 0,
      config: (config ?? {}) as Record<string, unknown>,
      rateLimits: rateLimitsVal as Record<string, unknown>,
      costPer1kTokens: costPer1kTokens ?? null,
      isActive: true,
      isDefault: false,
    })
    const [provider] = await drizzleDb.select().from(llmProvider).where(eq(llmProvider.id, id))

    await logAdminAction(session.adminId, 'llm_provider.create', {
      resourceType: 'llm_provider',
      resourceId: provider!.id,
      newState: { ...provider, apiKeyEncrypted: '***' },
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ provider: { ...provider, apiKeyEncrypted: '***' } })
  } catch (error) {
    console.error('Error creating LLM provider:', error)
    return NextResponse.json(
      { error: 'Failed to create provider' },
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
        { error: 'Provider ID is required' },
        { status: 400 }
      )
    }

    if (updates.isDefault) {
      await drizzleDb.update(llmProvider).set({ isDefault: false }).where(eq(llmProvider.isDefault, true))
    }

    const allowed = ['name', 'providerType', 'apiKeyEncrypted', 'baseUrl', 'priority', 'config', 'rateLimits', 'costPer1kTokens', 'isActive', 'isDefault']
    const set: Record<string, unknown> = {}
    for (const k of allowed) {
      if (updates[k] !== undefined) set[k] = updates[k]
    }
    if (Object.keys(set).length > 0) {
      await drizzleDb.update(llmProvider).set(set as Partial<typeof llmProvider.$inferInsert>).where(eq(llmProvider.id, id))
    }
    const [provider] = await drizzleDb.select().from(llmProvider).where(eq(llmProvider.id, id))
    if (!provider) {
      return NextResponse.json({ error: 'Provider not found' }, { status: 404 })
    }

    await logAdminAction(session.adminId, 'llm_provider.update', {
      resourceType: 'llm_provider',
      resourceId: provider.id,
      newState: { ...provider, apiKeyEncrypted: '***' },
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ provider: { ...provider, apiKeyEncrypted: '***' } })
  } catch (error) {
    console.error('Error updating LLM provider:', error)
    return NextResponse.json(
      { error: 'Failed to update provider' },
      { status: 500 }
    )
  }
}
