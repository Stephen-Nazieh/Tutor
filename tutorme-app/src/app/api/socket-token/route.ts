/**
 * GET /api/socket-token
 * Returns a short-lived JWT for Socket.io authentication.
 * Used by client hooks (use-socket, use-simple-socket) to pass auth.token when connecting.
 * Uses getServerSession so cookies are read correctly in App Router / Turbopack.
 */

import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SignJWT } from 'jose'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET!)
    const socketToken = await new SignJWT({
      id: session.user.id,
      role: session.user.role ?? 'STUDENT',
      email: (session.user as { email?: string }).email ?? '',
      name: session.user.name ?? '',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('5m')
      .setIssuedAt()
      .sign(secret)

    return NextResponse.json({ token: socketToken })
  } catch (error) {
    console.error('Socket token error:', error)
    return NextResponse.json({ error: 'Failed to issue token' }, { status: 500 })
  }
}
