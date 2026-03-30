/**
 * Socket.io API Route
 * Initializes Socket.io server for real-time communication
 */

import { NextResponse } from 'next/server'
import { initEnhancedSocketServer } from '@/lib/socket-server-enhanced'

// This is required for Socket.io to work with Next.js App Router
export const dynamic = 'force-dynamic'

// Global variable to store the Socket.io server instance
let io: ReturnType<typeof initEnhancedSocketServer> | null = null

export async function GET() {
  // The actual Socket.io server is initialized in the custom server
  // This endpoint just confirms the socket server is available
  return NextResponse.json({
    status: 'Socket.io server initialized',
    path: '/api/socket',
  })
}
