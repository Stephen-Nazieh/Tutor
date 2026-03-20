/**
 * Admin API key management.
 * GET: list keys (ADMIN only, or API key with admin scope)
 * POST: create key (body: { name }) - returns { id, name, key } once; key is not stored in full
 */

import { NextRequest, NextResponse } from 'next/server'
import { requireAdminIp } from '@/lib/api/middleware'
import { createApiKey, listApiKeys } from '@/lib/security/api-key'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

export const GET = async (req: NextRequest) => {
  const { response } = await requireAdmin(req, Permissions.API_KEYS_MANAGE)
  if (response) return response
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const keys = await listApiKeys()
  return NextResponse.json({ keys })
}

export const POST = async (req: NextRequest) => {
  const { session, response } = await requireAdmin(req, Permissions.API_KEYS_MANAGE)
  if (response) return response
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const body = await req.json().catch(() => ({}))
  const name =
    typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 100) : 'Unnamed key'
  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  const result = await createApiKey(name, session.adminId)
  return NextResponse.json({
    id: result.id,
    name: result.name,
    key: result.key,
    message: 'Store the key securely; it will not be shown again.',
  })
}
