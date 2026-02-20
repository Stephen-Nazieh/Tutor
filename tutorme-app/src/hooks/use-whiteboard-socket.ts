/**
 * useWhiteboardSocket Hook
 * Real-time whiteboard collaboration via Socket.io
 */

import { useEffect, useRef, useCallback, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface Point {
  x: number
  y: number
}

interface Stroke {
  id: string
  points: Point[]
  color: string
  width: number
  type: 'pen' | 'eraser'
  userId: string
}

interface Shape {
  id: string
  type: 'rectangle' | 'circle' | 'line' | 'triangle'
  x: number
  y: number
  width: number
  height: number
  color: string
  lineWidth: number
  userId: string
}

interface Text {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontSize: number
  userId: string
}

interface Cursor {
  userId: string
  name: string
  color: string
  x: number
  y: number
}

interface UseWhiteboardSocketOptions {
  whiteboardId: string
  roomId: string
  userId: string
  userName: string
  userColor: string
  onStroke?: (stroke: Stroke) => void
  onShape?: (shape: Shape) => void
  onText?: (text: Text) => void
  onCursor?: (cursor: Cursor) => void
  onUserJoined?: (user: { userId: string; name: string; color: string }) => void
  onUserLeft?: (user: { userId: string }) => void
  onClear?: (data: { userId: string }) => void
  onUndo?: (data: { strokes: Stroke[]; shapes: Shape[]; texts: Text[] }) => void
  onStateUpdate?: (state: {
    strokes: Stroke[]
    shapes: Shape[]
    texts: Text[]
    backgroundColor: string
    backgroundStyle: string
    activeUsers: string[]
  }) => void
}

export function useWhiteboardSocket({
  whiteboardId,
  roomId,
  userId,
  userName,
  userColor,
  onStroke,
  onShape,
  onText,
  onCursor,
  onUserJoined,
  onUserLeft,
  onClear,
  onUndo,
  onStateUpdate,
}: UseWhiteboardSocketOptions) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [activeUsers, setActiveUsers] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const cursorsRef = useRef<Map<string, Cursor>>(new Map())

  // Initialize socket connection
  useEffect(() => {
    if (!whiteboardId) return

    const socket = io({
      path: '/api/socket',
      transports: ['websocket', 'polling'],
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Whiteboard socket connected:', socket.id)
      setIsConnected(true)
      setError(null)

      // Join whiteboard room
      socket.emit('wb_join', {
        whiteboardId,
        roomId,
        userId,
        name: userName,
        color: userColor,
      })
    })

    socket.on('disconnect', () => {
      console.log('Whiteboard socket disconnected')
      setIsConnected(false)
    })

    socket.on('connect_error', (err) => {
      console.error('Whiteboard socket error:', err)
      setError(err.message)
      setIsConnected(false)
    })

    // Listen for state
    socket.on('wb_state', (state) => {
      setActiveUsers(state.activeUsers || [])
      onStateUpdate?.(state)
    })

    // Listen for strokes
    socket.on('wb_stroke', (stroke: Stroke) => {
      onStroke?.(stroke)
    })

    // Listen for shapes
    socket.on('wb_shape', (shape: Shape) => {
      onShape?.(shape)
    })

    // Listen for texts
    socket.on('wb_text', (text: Text) => {
      onText?.(text)
    })

    // Listen for cursors
    socket.on('wb_cursor', (cursor: Cursor) => {
      cursorsRef.current.set(cursor.userId, cursor)
      onCursor?.(cursor)
    })

    // Listen for user events
    socket.on('wb_user_joined', (user) => {
      setActiveUsers((prev) => [...prev.filter((id) => id !== user.userId), user.userId])
      onUserJoined?.(user)
    })

    socket.on('wb_user_left', (user) => {
      setActiveUsers((prev) => prev.filter((id) => id !== user.userId))
      cursorsRef.current.delete(user.userId)
      onUserLeft?.(user)
    })

    // Listen for clear
    socket.on('wb_cleared', (data) => {
      onClear?.(data)
    })

    // Listen for undo
    socket.on('wb_undone', (data) => {
      onUndo?.(data)
    })

    return () => {
      socket.emit('wb_leave', { whiteboardId, userId })
      socket.disconnect()
      socketRef.current = null
      setIsConnected(false)
    }
  }, [whiteboardId, roomId, userId, userName, userColor])

  // Send stroke
  const sendStroke = useCallback(
    (stroke: Stroke) => {
      socketRef.current?.emit('wb_stroke', { whiteboardId, stroke })
    },
    [whiteboardId]
  )

  // Send shape
  const sendShape = useCallback(
    (shape: Shape) => {
      socketRef.current?.emit('wb_shape', { whiteboardId, shape })
    },
    [whiteboardId]
  )

  // Send text
  const sendText = useCallback(
    (text: Text) => {
      socketRef.current?.emit('wb_text', { whiteboardId, text })
    },
    [whiteboardId]
  )

  // Send cursor position
  const sendCursor = useCallback(
    (x: number, y: number) => {
      socketRef.current?.emit('wb_cursor', {
        whiteboardId,
        userId,
        name: userName,
        color: userColor,
        x,
        y,
      })
    },
    [whiteboardId, userId, userName, userColor]
  )

  // Clear whiteboard
  const clearWhiteboard = useCallback(() => {
    socketRef.current?.emit('wb_clear', { whiteboardId, userId })
  }, [whiteboardId, userId])

  // Undo last action
  const undo = useCallback(() => {
    socketRef.current?.emit('wb_undo', { whiteboardId, userId })
  }, [whiteboardId, userId])

  return {
    isConnected,
    error,
    activeUsers,
    cursors: cursorsRef.current,
    sendStroke,
    sendShape,
    sendText,
    sendCursor,
    clearWhiteboard,
    undo,
  }
}
