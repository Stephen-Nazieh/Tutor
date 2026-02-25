import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createAdminSession, ADMIN_TOKEN_NAME, ADMIN_TOKEN_EXPIRY, getClientIp } from '@/lib/admin/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    if (session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const token = await createAdminSession(
      session.user.id,
      getClientIp(req),
      req.headers.get('user-agent') || undefined
    )

    const response = NextResponse.json({ success: true })
    response.cookies.set(ADMIN_TOKEN_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: ADMIN_TOKEN_EXPIRY,
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Admin auth bridge error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

