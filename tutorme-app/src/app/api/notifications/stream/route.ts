/**
 * SSE (Server-Sent Events) endpoint for real-time notifications.
 *
 * GET /api/notifications/stream
 *
 * The client opens a persistent connection and receives events as:
 *   event: notification
 *   data: { ...notification }
 *
 * Also sends a heartbeat ping every 30s to keep the connection alive.
 */

import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { addSSEListener } from '@/lib/notifications/notify'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        return new Response('Unauthorized', { status: 401 })
    }

    const userId = session.user.id

    const encoder = new TextEncoder()
    let cleanup: (() => void) | null = null
    let heartbeatInterval: ReturnType<typeof setInterval> | null = null

    const stream = new ReadableStream({
        start(controller) {
            // Send initial connection event
            controller.enqueue(
                encoder.encode(`event: connected\ndata: ${JSON.stringify({ userId })}\n\n`)
            )

            // Register SSE listener for this user
            cleanup = addSSEListener(userId, (notification) => {
                try {
                    const data = JSON.stringify(notification)
                    controller.enqueue(
                        encoder.encode(`event: notification\ndata: ${data}\n\n`)
                    )
                } catch {
                    // Stream may be closed
                }
            })

            // Heartbeat every 30 seconds
            heartbeatInterval = setInterval(() => {
                try {
                    controller.enqueue(encoder.encode(`:ping\n\n`))
                } catch {
                    // Stream closed
                    if (heartbeatInterval) clearInterval(heartbeatInterval)
                    if (cleanup) cleanup()
                }
            }, 30_000)
        },
        cancel() {
            if (heartbeatInterval) clearInterval(heartbeatInterval)
            if (cleanup) cleanup()
        },
    })

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache, no-transform',
            Connection: 'keep-alive',
            'X-Accel-Buffering': 'no', // Disable Nginx buffering
        },
    })
}
