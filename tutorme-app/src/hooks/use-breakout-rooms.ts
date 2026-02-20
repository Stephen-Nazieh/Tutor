/**
 * React Hook for Breakout Room Management
 * Handles breakout room creation, joining, and real-time communication
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

export interface BreakoutRoom {
  id: string
  name: string
  mainRoomId: string
  participants: {
    id: string
    name: string
    joinedAt: number
  }[]
  status: 'forming' | 'active' | 'paused' | 'closed'
  aiEnabled: boolean
  timeRemaining?: number
  task?: {
    title: string
    description: string
  }
  alerts?: {
    type: 'confusion' | 'conflict' | 'off_topic' | 'need_help'
    message: string
    timestamp: number
  }[]
}

export interface BreakoutMessage {
  id: string
  roomId: string
  senderId: string
  senderName: string
  message: string
  timestamp: number
  isSystem?: boolean
}

interface UseBreakoutRoomsOptions {
  mainRoomId: string
  userId: string
  name: string
  role: 'student' | 'tutor'
  onRoomsCreated?: (rooms: BreakoutRoom[]) => void
  onRoomUpdated?: (room: BreakoutRoom) => void
  onRoomsClosing?: (seconds: number) => void
  onRoomsClosed?: () => void
  onMessage?: (message: BreakoutMessage) => void
  onParticipantJoined?: (roomId: string, participant: { id: string; name: string }) => void
  onParticipantLeft?: (roomId: string, participantId: string) => void
  onHelpRequested?: (roomId: string, participantId: string) => void
  onAlert?: (roomId: string, alert: NonNullable<BreakoutRoom['alerts']>[0]) => void
  onBroadcast?: (message: string) => void
}

export function useBreakoutRooms(options: UseBreakoutRoomsOptions) {
  const socketRef = useRef<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [rooms, setRooms] = useState<BreakoutRoom[]>([])
  const [currentRoom, setCurrentRoom] = useState<BreakoutRoom | null>(null)
  const [messages, setMessages] = useState<BreakoutMessage[]>([])
  const [timeRemaining, setTimeRemaining] = useState<number | undefined>()

  useEffect(() => {
    const socket = io({
      path: '/api/socket',
      transports: ['websocket', 'polling']
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Breakout socket connected:', socket.id)
      setIsConnected(true)

      // Join main room for breakout coordination
      socket.emit('join_breakout_coordination', {
        mainRoomId: options.mainRoomId,
        userId: options.userId,
        name: options.name,
        role: options.role
      })
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    // Breakout room events
    socket.on('breakout_rooms_created', (data: { rooms: BreakoutRoom[] }) => {
      setRooms(data.rooms)
      options.onRoomsCreated?.(data.rooms)
    })

    socket.on('breakout_room_updated', (data: { room: BreakoutRoom }) => {
      setRooms(prev => prev.map(r => r.id === data.room.id ? data.room : r))
      if (currentRoom?.id === data.room.id) {
        setCurrentRoom(data.room)
      }
      options.onRoomUpdated?.(data.room)
    })

    socket.on('breakout_closing_soon', (data: { seconds: number }) => {
      options.onRoomsClosing?.(data.seconds)
    })

    socket.on('breakout_rooms_closed', () => {
      setRooms([])
      setCurrentRoom(null)
      options.onRoomsClosed?.()
    })

    socket.on('breakout_message', (message: BreakoutMessage) => {
      setMessages(prev => [...prev, message])
      options.onMessage?.(message)
    })

    socket.on('breakout_participant_joined', (data: { roomId: string; participant: { id: string; name: string } }) => {
      options.onParticipantJoined?.(data.roomId, data.participant)
    })

    socket.on('breakout_participant_left', (data: { roomId: string; participantId: string }) => {
      options.onParticipantLeft?.(data.roomId, data.participantId)
    })

    socket.on('breakout_help_requested', (data: { roomId: string; participantId: string }) => {
      options.onHelpRequested?.(data.roomId, data.participantId)
    })

    socket.on('breakout_alert', (data: { roomId: string; alert: NonNullable<BreakoutRoom['alerts']>[0] }) => {
      options.onAlert?.(data.roomId, data.alert)
    })

    socket.on('breakout_broadcast', (data: { message: string }) => {
      options.onBroadcast?.(data.message)
    })

    socket.on('breakout_countdown', (data: { roomId: string; secondsRemaining: number }) => {
      if (currentRoom?.id === data.roomId) {
        setTimeRemaining(data.secondsRemaining)
      }
    })

    return () => {
      socket.disconnect()
      socketRef.current = null
    }
  }, [options.mainRoomId, options.userId])

  // Tutor: Create breakout rooms
  const createRooms = useCallback((config: {
    roomCount: number
    participantsPerRoom: number
    distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select'
    timeLimit: number
    aiAssistantEnabled: boolean
    participantAssignments?: Record<string, string[]> // roomId -> userIds
  }) => {
    socketRef.current?.emit('breakout_create', {
      mainRoomId: options.mainRoomId,
      config
    })
  }, [options.mainRoomId])

  // Tutor: Close all breakout rooms
  const closeRooms = useCallback(() => {
    socketRef.current?.emit('breakout_close', {
      mainRoomId: options.mainRoomId
    })
  }, [options.mainRoomId])

  // Tutor: Broadcast to all rooms
  const broadcastToRooms = useCallback((message: string) => {
    socketRef.current?.emit('breakout_broadcast', {
      mainRoomId: options.mainRoomId,
      message
    })
  }, [options.mainRoomId])

  // Tutor: Join a specific room for monitoring
  const joinRoomForMonitoring = useCallback((roomId: string) => {
    socketRef.current?.emit('breakout_join_monitor', {
      roomId
    })
  }, [])

  // Student: Join assigned breakout room
  const joinRoom = useCallback((roomId: string) => {
    socketRef.current?.emit('breakout_join', {
      roomId,
      userId: options.userId,
      name: options.name
    })
    const room = rooms.find(r => r.id === roomId)
    if (room) {
      setCurrentRoom(room)
    }
  }, [options.userId, options.name, rooms])

  // Student: Leave breakout room
  const leaveRoom = useCallback(() => {
    if (currentRoom) {
      socketRef.current?.emit('breakout_leave', {
        roomId: currentRoom.id,
        userId: options.userId
      })
      setCurrentRoom(null)
      setMessages([])
    }
  }, [currentRoom, options.userId])

  // Send message in breakout room
  const sendMessage = useCallback((message: string) => {
    if (currentRoom) {
      socketRef.current?.emit('breakout_message', {
        roomId: currentRoom.id,
        message
      })
    }
  }, [currentRoom])

  // Student: Request help from tutor
  const requestHelp = useCallback(() => {
    if (currentRoom) {
      socketRef.current?.emit('breakout_request_help', {
        roomId: currentRoom.id,
        userId: options.userId
      })
    }
  }, [currentRoom, options.userId])

  return {
    socket: socketRef.current,
    isConnected,
    rooms,
    currentRoom,
    messages,
    timeRemaining,
    createRooms,
    closeRooms,
    broadcastToRooms,
    joinRoomForMonitoring,
    joinRoom,
    leaveRoom,
    sendMessage,
    requestHelp
  }
}
