'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSimpleSocket } from './use-simple-socket'
import type { PdfCanvasEventPayload } from '@/lib/pdf-tutoring/types'

export interface PdfParticipant {
  userId?: string
  name: string
  role: 'student' | 'tutor'
  joinedAt: number
}

interface UsePdfCollabSocketArgs {
  roomId: string
  userId?: string
  name?: string
  role?: 'student' | 'tutor'
  onCanvasEvent?: (payload: PdfCanvasEventPayload) => void
  onCanvasState?: (payload: { roomId: string; events: PdfCanvasEventPayload[] }) => void
  onPresenceState?: (payload: { roomId: string; participants: PdfParticipant[] }) => void
}

export function usePdfCollabSocket({ roomId, userId, name, role = 'tutor', onCanvasEvent, onCanvasState, onPresenceState }: UsePdfCollabSocketArgs) {
  const { socket, isConnected } = useSimpleSocket(roomId, {
    userId,
    name,
    role,
  })
  const [isLocked, setIsLocked] = useState(false)
  const [latencyMs, setLatencyMs] = useState<number | null>(null)
  const [participants, setParticipants] = useState<PdfParticipant[]>([])

  useEffect(() => {
    if (!socket || !roomId) return

    socket.emit('pdf_join_room', {
      roomId,
      userId,
      name,
      role,
    })

    const handleCanvasEvent = (payload: PdfCanvasEventPayload) => {
      if (typeof payload.sentAt === 'number') {
        setLatencyMs(Math.max(0, Date.now() - payload.sentAt))
      }
      onCanvasEvent?.(payload)
    }

    const handleLockState = (data: { roomId: string; locked: boolean }) => {
      if (data.roomId === roomId) setIsLocked(data.locked)
    }

    const handleCanvasState = (data: { roomId: string; events: PdfCanvasEventPayload[] }) => {
      if (data.roomId !== roomId) return
      onCanvasState?.(data)
    }

    const handlePresenceState = (data: { roomId: string; participants: PdfParticipant[] }) => {
      if (data.roomId !== roomId) return
      setParticipants(data.participants || [])
      onPresenceState?.(data)
    }

    socket.on('pdf_canvas_event', handleCanvasEvent)
    socket.on('pdf_lock_state', handleLockState)
    socket.on('pdf_canvas_state', handleCanvasState)
    socket.on('pdf_presence_state', handlePresenceState)

    socket.emit('pdf_request_state', { roomId })

    return () => {
      socket.off('pdf_canvas_event', handleCanvasEvent)
      socket.off('pdf_lock_state', handleLockState)
      socket.off('pdf_canvas_state', handleCanvasState)
      socket.off('pdf_presence_state', handlePresenceState)
    }
  }, [socket, roomId, userId, name, role, onCanvasEvent, onCanvasState, onPresenceState])

  const emitCanvasEvent = useCallback(
    (payload: Omit<PdfCanvasEventPayload, 'roomId' | 'sentAt' | 'actorId'>) => {
      if (!socket || !roomId) return
      socket.emit('pdf_canvas_event', {
        roomId,
        actorId: userId,
        sentAt: Date.now(),
        ...payload,
      } satisfies PdfCanvasEventPayload)
    },
    [socket, roomId, userId]
  )

  const setLock = useCallback(
    (locked: boolean) => {
      if (!socket || !roomId) return
      socket.emit('pdf_lock_toggle', { roomId, locked })
    },
    [socket, roomId]
  )

  return useMemo(
    () => ({
      socket,
      isConnected,
      isLocked,
      latencyMs,
      participants,
      emitCanvasEvent,
      setLock,
    }),
    [socket, isConnected, isLocked, latencyMs, participants, emitCanvasEvent, setLock]
  )
}
