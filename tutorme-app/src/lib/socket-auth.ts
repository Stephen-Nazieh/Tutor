/**
 * Client-side helper to obtain a JWT for Socket.io authentication.
 * Used by use-socket, use-simple-socket, use-whiteboard-socket, etc.
 */

export async function getSocketToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/socket-token', { credentials: 'include' })
    if (!res.ok) return null
    const data = await res.json()
    return data.token ?? null
  } catch {
    return null
  }
}
