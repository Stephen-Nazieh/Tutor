/**
 * GET /api/socket-token
 * Returns a short-lived JWT for Socket.io authentication.
 * Used by client hooks (use-socket, use-simple-socket) to pass auth.token when connecting.
 * Uses getServerSession so cookies are read correctly in App Router / Turbopack.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'
import { SignJWT } from 'jose'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions, request)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const secret = process.env.NEXTAUTH_SECRET
    if (!secret) {
      console.error('Socket token: NEXTAUTH_SECRET is not set')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }
    const role = session.user.role ?? 'STUDENT'
    const secretEncoded = new TextEncoder().encode(secret)
    // Longer expiry in dev so tokens survive HMR and short idle; 5m in production
    const expiry = process.env.NODE_ENV === 'development' ? '24h' : '5m'
    const socketToken = await new SignJWT({
      id: session.user.id,
      role: typeof role === 'string' ? role : String(role),
      email: (session.user as { email?: string }).email ?? '',
      name: session.user.name ?? '',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(expiry)
      .setIssuedAt()
      .sign(secretEncoded)

    return NextResponse.json({ token: socketToken })
  } catch (error) {
    console.error('Socket token error:', error)
    return NextResponse.json({ error: 'Failed to issue token' }, { status: 500 })
  }
}
