import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.LLM_READ)
  
  if (!session) return response!

  try {
    const providers = await prisma.llmProvider.findMany({
      include: {
        models: {
          where: { isActive: true },
          orderBy: { name: 'asc' },
        },
        _count: {
          select: { routingRules: true },
        },
      },
      orderBy: { priority: 'asc' },
    })

    // Mask API keys for security
    const safeProviders = providers.map((p: Record<string, unknown>) => ({
      ...p,
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

    const provider = await prisma.llmProvider.create({
      data: {
        name,
        providerType,
        apiKeyEncrypted: apiKey || null,
        baseUrl: baseUrl || null,
        priority: priority || 0,
        config: config || {},
        rateLimits: rateLimits || { requests_per_minute: 60, tokens_per_day: 100000 },
        costPer1kTokens: costPer1kTokens || null,
      },
    })

    await logAdminAction(session.adminId, 'llm_provider.create', {
      resourceType: 'llm_provider',
      resourceId: provider.id,
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

    // If setting as default, unset others first
    if (updates.isDefault) {
      await prisma.llmProvider.updateMany({
        where: { isDefault: true },
        data: { isDefault: false },
      })
    }

    const provider = await prisma.llmProvider.update({
      where: { id },
      data: updates,
    })

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
