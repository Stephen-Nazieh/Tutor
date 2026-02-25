/**
 * DELETE /api/admin/api-keys/[id] - Revoke an API key (ADMIN only).
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { revokeApiKey } from '@/lib/security/api-key'

export async function DELETE(
  req: NextRequest,
  context: any
) {
  // We need to run auth and permission checks inside the handler for dynamic route
  const { getServerSession } = await import('next-auth')
  const { authOptions } = await import('@/lib/auth')
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 })
  }
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const permErr = requirePermission(session, PERMISSIONS.ADMIN_MANAGE_API_KEYS)
  if (permErr) return permErr

  const params = await context?.params;
  const { id } = params || {};
  const ok = await revokeApiKey(id)
  if (!ok) {
    return NextResponse.json({ error: 'Key not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
