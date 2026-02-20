/**
 * Admin API key management.
 * GET: list keys (ADMIN only, or API key with admin scope)
 * POST: create key (body: { name }) - returns { id, name, key } once; key is not stored in full
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, requireAdminIp, requirePermission } from '@/lib/api/middleware'
import { PERMISSIONS } from '@/lib/security/rbac'
import { createApiKey, listApiKeys } from '@/lib/security/api-key'
import { sanitizeHtmlWithMax } from '@/lib/security/sanitize'

export const GET = withAuth(async (req: NextRequest, session) => {
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const permErr = requirePermission(session, PERMISSIONS.ADMIN_MANAGE_API_KEYS)
  if (permErr) return permErr
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 })
  }
  const keys = await listApiKeys()
  return NextResponse.json({ keys })
}, { role: 'ADMIN' })

export const POST = withAuth(async (req: NextRequest, session) => {
  const ipErr = requireAdminIp(req)
  if (ipErr) return ipErr
  const permErr = requirePermission(session, PERMISSIONS.ADMIN_MANAGE_API_KEYS)
  if (permErr) return permErr
  if (session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Admin only' }, { status: 403 })
  }
  const body = await req.json().catch(() => ({}))
  const name = typeof body.name === 'string' ? sanitizeHtmlWithMax(body.name.trim(), 100) : 'Unnamed key'
  if (!name) {
    return NextResponse.json({ error: 'name is required' }, { status: 400 })
  }
  const result = await createApiKey(name, session.user.id)
  return NextResponse.json({
    id: result.id,
    name: result.name,
    key: result.key,
    message: 'Store the key securely; it will not be shown again.'
  })
}, { role: 'ADMIN' })
