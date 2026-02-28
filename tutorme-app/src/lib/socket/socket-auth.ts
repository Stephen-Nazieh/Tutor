/**
 * Socket.io authentication middleware (JWT from handshake).
 */

import { Socket } from 'socket.io'
import { jwtVerify } from 'jose'

export async function validateSocketJWT(token: string): Promise<{ userId: string; role: string; name: string } | null> {
  try {
    const secretRaw = process.env.NEXTAUTH_SECRET
    if (!secretRaw) return null
    const secret = new TextEncoder().encode(secretRaw)
    const { payload } = await jwtVerify(token, secret)
    const decoded = payload as { id?: string; role?: string; name?: string }
    if (!decoded.id || decoded.role == null || decoded.role === '') return null
    const role = String(decoded.role).toLowerCase()
    const allowedRoles = ['student', 'tutor', 'parent', 'admin']
    const normalizedRole = allowedRoles.includes(role) ? role : 'student'
    return {
      userId: decoded.id,
      role: normalizedRole,
      name: decoded.name ?? '',
    }
  } catch {
    return null
  }
}

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth?.token
  if (!token) {
    next()
    return
  }
  validateSocketJWT(token)
    .then((user) => {
      if (user) {
        socket.data.userId = user.userId
        socket.data.role = user.role
        socket.data.name = user.name
        socket.data.authenticated = true
      }
      next()
    })
    .catch(() => next())
}

export function getSocketCorsOrigin(): string | string[] {
  const env = process.env.SOCKET_CORS_ORIGIN || process.env.NEXT_PUBLIC_APP_URL
  if (env) {
    return env.includes(',') ? env.split(',').map((o) => o.trim()) : env
  }
  return process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3003', 'http://localhost:3000']
}
