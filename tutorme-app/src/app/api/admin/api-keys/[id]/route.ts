/**
 * DELETE /api/admin/api-keys/[id] - Revoke an API key (ADMIN only).
 */

import { NextRequest, NextResponse } from 'next/server'
import { getParamAsync } from '@/lib/api/params'
import { requireAdminIp } from '@/lib/api/middleware'
import { revokeApiKey } from '@/lib/security/api-key'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export async function DELETE(
  req: NextRequest,
  context: {
    params: Promise<Record<string, string | string[]>>
  }
) {
  const { response } = await requireAdmin(req, Permissions.API_KEYS_MANAGE)
  if (response) return response
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr

  const id = await getParamAsync(context.params, 'id')
  if (!id) {
    return NextResponse.json({ error: 'API key ID required' }, { status: 400 })
  }
  const ok = await revokeApiKey(id)
  if (!ok) {
    return NextResponse.json({ error: 'Key not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
