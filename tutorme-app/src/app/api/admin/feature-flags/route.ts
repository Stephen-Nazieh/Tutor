import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin, logAdminAction, getClientIp } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'
import { getAllFeatureFlags, createFeatureFlag, deleteFeatureFlag, updateFeatureFlag } from '@/lib/admin/feature-flags'

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.FEATURES_READ)
  
  if (!session) return response!

  try {
    const flags = await getAllFeatureFlags()
    
    return NextResponse.json({ flags })
  } catch (error) {
    console.error('Error fetching feature flags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feature flags' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.FEATURES_WRITE)
  
  if (!session) return response!

  try {
    const body = await req.json()
    const { key, name, description, enabled, scope, targetValue, config } = body

    if (!key || !name) {
      return NextResponse.json(
        { error: 'Key and name are required' },
        { status: 400 }
      )
    }

    const flag = await createFeatureFlag(
      {
        key,
        name,
        description,
        enabled,
        scope,
        targetValue,
        config,
      },
      session
    )

    await logAdminAction(session.adminId, 'feature_flag.create', {
      resourceType: 'feature_flag',
      resourceId: flag.id,
      newState: flag,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ flag })
  } catch (error) {
    console.error('Error creating feature flag:', error)
    return NextResponse.json(
      { error: 'Failed to create feature flag' },
      { status: 500 }
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.FEATURES_WRITE)
  
  if (!session) return response!

  try {
    const body = await req.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: 'Flag ID is required' },
        { status: 400 }
      )
    }

    const flag = await updateFeatureFlag(
      id,
      updates,
      session,
      updates.changeReason
    )

    await logAdminAction(session.adminId, 'feature_flag.update', {
      resourceType: 'feature_flag',
      resourceId: flag.id,
      newState: flag,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ flag })
  } catch (error) {
    console.error('Error updating feature flag:', error)
    return NextResponse.json(
      { error: 'Failed to update feature flag' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.FEATURES_DELETE)
  
  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Flag ID is required' },
        { status: 400 }
      )
    }

    await deleteFeatureFlag(id, session)

    await logAdminAction(session.adminId, 'feature_flag.delete', {
      resourceType: 'feature_flag',
      resourceId: id,
      ipAddress: getClientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting feature flag:', error)
    return NextResponse.json(
      { error: 'Failed to delete feature flag' },
      { status: 500 }
    )
  }
}
