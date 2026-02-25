/**
 * Simple Socket.io Hook
 * 
 * Provides a basic socket connection for room-based features.
 * Used by the Live Class Whiteboard system.
 */

import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SimpleSocketOptions {
  userId?: string
  name?: string
  role?: 'student' | 'tutor'
}

export function useSimpleSocket(roomId: string, options: SimpleSocketOptions = {}) {
  const [socketInstance, setSocketInstance] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (!roomId) return

    // Initialize socket connection
    const socket = io({
      path: '/api/socket',
      transports: ['websocket', 'polling'],
      timeout: 20000,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
    })

    socket.on('connect', () => {
      setIsConnected(true)
      setSocketInstance(socket)

      if (roomId && options.userId && options.role) {
        socket.emit('join_class', {
          roomId,
          userId: options.userId,
          name: options.name || options.role,
          role: options.role,
        })
      }
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
      setSocketInstance(null)
    })

    socket.on('connect_error', (err) => {
      console.warn('Socket connection error:', err?.message || err)
      setIsConnected(false)
    })

    return () => {
      socket.disconnect()
    }
  }, [roomId, options.name, options.role, options.userId])

  return {
    socket: socketInstance,
    isConnected
  }
}
