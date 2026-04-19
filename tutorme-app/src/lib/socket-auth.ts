/**
 * Client-side helper to obtain a JWT for Socket.io authentication.
 * Used by use-socket, use-simple-socket, etc.
 */

export async function getSocketToken(timeoutMs = 5000): Promise<string | null> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

    const res = await fetch('/api/socket-token', {
      credentials: 'include',
      signal: controller.signal,
    })
    clearTimeout(timeoutId)

    if (!res.ok) return null
    const data = await res.json()
    return data.token ?? null
  } catch {
    return null
  }
}

export { socketAuthMiddleware } from './socket/socket-auth'
