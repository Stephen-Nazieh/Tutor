import { NextRequest, NextResponse } from 'next/server'
import { handleApiError } from '@/lib/api/middleware'
import { getAdminSession, clearAdminCookie, logAdminAction, getClientIp } from '@/lib/admin/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getAdminSession(req)

    if (session) {
      // Log the logout
      await logAdminAction(session.adminId, 'admin.logout', {
        ipAddress: getClientIp(req),
        userAgent: req.headers.get('user-agent') || undefined,
      })
    }

    await clearAdminCookie()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin logout error:', error)
    return handleApiError(error, 'Internal server error', 'api/admin/auth/logout/route.ts')
  }
}
