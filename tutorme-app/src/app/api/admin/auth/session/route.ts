import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/admin/auth'

export async function GET(req: NextRequest) {
  try {
    const session = await getAdminSession(req)

    if (!session) {
      return NextResponse.json(
        { error: 'No active session' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      session: {
        adminId: session.adminId,
        email: session.email,
        name: session.name,
        roles: session.roles,
        permissions: session.permissions,
        expiresAt: session.expiresAt,
      },
    })
  } catch (error) {
    console.error('Session check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
