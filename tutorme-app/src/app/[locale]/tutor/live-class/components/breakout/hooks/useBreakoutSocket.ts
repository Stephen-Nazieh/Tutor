'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { useSocket } from '@/hooks/use-socket'
import type { 
  BreakoutRoom, 
  BreakoutParticipant, 
  BreakoutAlert, 
  BreakoutMessage,
  BreakoutSessionConfig
} from '../../../types'

interface UseBreakoutSocketProps {
  sessionId: string
  userId: string
  userName: string
  role: 'tutor' | 'student'
}

interface UseBreakoutSocketReturn {
  rooms: BreakoutRoom[]
  isConnected: boolean
  
  // Actions
  createRooms: (config: BreakoutSessionConfig) => void
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
  endRoom: (roomId: string) => void
  endAllRooms: () => void
  assignStudent: (roomId: string, studentId: string) => void
  removeStudent: (roomId: string, studentId: string) => void
  rotateGroups: () => void
  sendMessage: (roomId: string, content: string, type?: 'text' | 'question') => void
  broadcastMessage: (message: string, target: 'all' | 'specific', roomIds?: string[]) => void
  extendTime: (roomId: string, minutes: number) => void
  assignTask: (roomId: string, task: { title: string; description: string; type: string }) => void
  toggleAI: (roomId: string, enabled: boolean) => void
  requestHelp: (roomId: string) => void
  raiseHand: (roomId: string, raised: boolean) => void
  updateVideoState: (roomId: string, state: { isMuted?: boolean; isVideoOff?: boolean; isScreenSharing?: boolean }) => void
  acknowledgeAlert: (roomId: string, alertId: string) => void
}

export function useBreakoutSocket({
  sessionId,
  userId,
  userName,
  role
}: UseBreakoutSocketProps): UseBreakoutSocketReturn {
  const { socket, isConnected } = useSocket()
  const [rooms, setRooms] = useState<BreakoutRoom[]>([])
  const roomsRef = useRef<BreakoutRoom[]>([])

  const normalizeParticipant = useCallback((p: Partial<BreakoutParticipant> & { id: string; name: string }): BreakoutParticipant => ({
    id: p.id,
    userId: p.userId || p.id,
    name: p.name,
    role: p.role || 'student',
    joinedAt: p.joinedAt || new Date().toISOString(),
    isOnline: p.isOnline ?? true,
    isMuted: p.isMuted ?? false,
    isVideoOff: p.isVideoOff ?? false,
    isScreenSharing: p.isScreenSharing ?? false,
    engagementScore: p.engagementScore ?? 0,
    attentionLevel: p.attentionLevel || 'medium',
    handRaised: p.handRaised ?? false,
  }), [])

  const normalizeRoom = useCallback((room: Partial<BreakoutRoom> & { id: string; name: string; mainRoomId?: string }): BreakoutRoom => ({
    id: room.id,
    name: room.name,
    mainRoomId: room.mainRoomId || sessionId,
    participants: (room.participants || []).map((p) => normalizeParticipant(p as Partial<BreakoutParticipant> & { id: string; name: string })),
    maxParticipants: room.maxParticipants ?? 6,
    status: room.status || 'forming',
    timeRemaining: room.timeRemaining ?? room.timeLimit ?? 0,
    timeLimit: room.timeLimit ?? room.timeRemaining ?? 0,
    startedAt: room.startedAt,
    endsAt: room.endsAt,
    aiEnabled: room.aiEnabled ?? true,
    aiMode: room.aiMode || 'passive',
    assignedTask: room.assignedTask,
    topic: room.topic,
    alerts: room.alerts || [],
    metrics: room.metrics || {
      messagesExchanged: 0,
      avgEngagement: 0,
      participationRate: 0,
      topicAdherence: 0,
      lastUpdated: new Date().toISOString(),
    },
    videoRoom: room.videoRoom,
    messages: room.messages || [],
  }), [normalizeParticipant, sessionId])
  
  // Keep ref in sync for callbacks
  useEffect(() => {
    roomsRef.current = rooms
  }, [rooms])
  
  // Join breakout coordination room on mount
  useEffect(() => {
    if (!socket || !isConnected) return
    
    socket.emit('breakout:join_coordination', {
      mainRoomId: sessionId,
      userId,
      name: userName,
      role
    })
    socket.emit('join_breakout_coordination', {
      mainRoomId: sessionId,
      userId,
      name: userName,
      role
    })
    
    return () => {
      socket.emit('breakout:leave_coordination', { mainRoomId: sessionId, userId })
      socket.emit('breakout_leave_coordination', { mainRoomId: sessionId, userId })
    }
  }, [socket, isConnected, sessionId, userId, userName, role])
  
  // Listen for room updates
  useEffect(() => {
    if (!socket) return
    
    const handleRoomsUpdated = (data: { rooms: Array<Partial<BreakoutRoom> & { id: string; name: string; mainRoomId?: string }> }) => {
      setRooms(data.rooms.map(normalizeRoom))
    }
    
    const handleRoomCreated = (data: { room: Partial<BreakoutRoom> & { id: string; name: string; mainRoomId?: string } }) => {
      setRooms(prev => [...prev, normalizeRoom(data.room)])
    }
    
    const handleRoomEnded = (data: { roomId: string }) => {
      setRooms(prev => prev.filter(r => r.id !== data.roomId))
    }
    
    const handleParticipantJoined = (data: { roomId: string; participant: Partial<BreakoutParticipant> & { id: string; name: string } }) => {
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return {
            ...room,
            participants: [...room.participants, normalizeParticipant(data.participant)]
          }
        }
        return room
      }))
    }
    
    const handleParticipantLeft = (data: { roomId: string; userId?: string; participantId?: string }) => {
      const leavingId = data.userId || data.participantId
      if (!leavingId) return
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return {
            ...room,
            participants: room.participants.filter(p => p.userId !== leavingId)
          }
        }
        return room
      }))
    }
    
    const handleCountdown = (data: { roomId: string; secondsRemaining: number }) => {
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return { ...room, timeRemaining: data.secondsRemaining }
        }
        return room
      }))
    }
    
    const handleTimeExtended = (data: { roomId: string; newTimeRemaining: number }) => {
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return { ...room, timeRemaining: data.newTimeRemaining }
        }
        return room
      }))
    }
    
    const handleAlert = (data: { roomId: string; alert: Partial<BreakoutAlert> & { type: BreakoutAlert['type']; message: string } }) => {
      const alert: BreakoutAlert = {
        id: data.alert.id || `${data.roomId}-${Date.now()}`,
        type: data.alert.type,
        message: data.alert.message,
        timestamp: data.alert.timestamp || new Date().toISOString(),
        severity: data.alert.severity || 'medium',
        participantId: data.alert.participantId,
        acknowledged: data.alert.acknowledged ?? false,
      }
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return { ...room, alerts: [...room.alerts, alert] }
        }
        return room
      }))
    }
    
    const handleMessage = (data: BreakoutMessage | { id: string; roomId: string; senderId: string; senderName: string; message: string; timestamp: number | string }) => {
      const normalizedMessage: BreakoutMessage = 'content' in data
        ? data
        : {
            id: data.id,
            roomId: data.roomId,
            senderId: data.senderId,
            senderName: data.senderName,
            senderRole: 'student',
            content: data.message,
            timestamp: typeof data.timestamp === 'number' ? new Date(data.timestamp).toISOString() : data.timestamp,
            type: 'text',
          }

      setRooms(prev => prev.map(room => {
        if (room.id === normalizedMessage.roomId) {
          return {
            ...room,
            messages: [...room.messages, normalizedMessage],
            metrics: {
              ...room.metrics,
              messagesExchanged: room.metrics.messagesExchanged + 1
            }
          }
        }
        return room
      }))
    }
    
    const handleMetricsUpdate = (data: { roomId: string; metrics: Partial<BreakoutRoom['metrics']> }) => {
      setRooms(prev => prev.map(room => {
        if (room.id === data.roomId) {
          return {
            ...room,
            metrics: { ...room.metrics, ...data.metrics }
          }
        }
        return room
      }))
    }
    
    socket.on('breakout:rooms_updated', handleRoomsUpdated)
    socket.on('breakout_rooms_created', handleRoomsUpdated)
    socket.on('breakout:room_created', handleRoomCreated)
    socket.on('breakout:room_ended', handleRoomEnded)
    socket.on('breakout:participant_joined', handleParticipantJoined)
    socket.on('breakout_participant_joined', handleParticipantJoined)
    socket.on('breakout:participant_left', handleParticipantLeft)
    socket.on('breakout_participant_left', handleParticipantLeft)
    socket.on('breakout:countdown', handleCountdown)
    socket.on('breakout_countdown', handleCountdown)
    socket.on('breakout:time_extended', handleTimeExtended)
    socket.on('breakout:alert', handleAlert)
    socket.on('breakout_alert', handleAlert)
    socket.on('breakout:message', handleMessage)
    socket.on('breakout_message', handleMessage)
    socket.on('breakout:metrics_update', handleMetricsUpdate)
    
    return () => {
      socket.off('breakout:rooms_updated', handleRoomsUpdated)
      socket.off('breakout_rooms_created', handleRoomsUpdated)
      socket.off('breakout:room_created', handleRoomCreated)
      socket.off('breakout:room_ended', handleRoomEnded)
      socket.off('breakout:participant_joined', handleParticipantJoined)
      socket.off('breakout_participant_joined', handleParticipantJoined)
      socket.off('breakout:participant_left', handleParticipantLeft)
      socket.off('breakout_participant_left', handleParticipantLeft)
      socket.off('breakout:countdown', handleCountdown)
      socket.off('breakout_countdown', handleCountdown)
      socket.off('breakout:time_extended', handleTimeExtended)
      socket.off('breakout:alert', handleAlert)
      socket.off('breakout_alert', handleAlert)
      socket.off('breakout:message', handleMessage)
      socket.off('breakout_message', handleMessage)
      socket.off('breakout:metrics_update', handleMetricsUpdate)
    }
  }, [socket, normalizeRoom, normalizeParticipant])
  
  // Action callbacks
  const createRooms = useCallback((config: BreakoutSessionConfig) => {
    socket?.emit('breakout:create', { mainRoomId: sessionId, config })
    socket?.emit('breakout_create', { mainRoomId: sessionId, config })
  }, [socket, sessionId])
  
  const joinRoom = useCallback((roomId: string) => {
    socket?.emit('breakout:join', { roomId, userId, name: userName, role })
    socket?.emit('breakout_join', { roomId, userId, name: userName, role })
  }, [socket, userId, userName, role])
  
  const leaveRoom = useCallback((roomId: string) => {
    socket?.emit('breakout:leave', { roomId, userId })
    socket?.emit('breakout_leave', { roomId, userId })
  }, [socket, userId])
  
  const endRoom = useCallback((roomId: string) => {
    socket?.emit('breakout:end', { roomId })
  }, [socket])
  
  const endAllRooms = useCallback(() => {
    socket?.emit('breakout:end_all', { mainRoomId: sessionId })
    socket?.emit('breakout_close', { mainRoomId: sessionId })
  }, [socket, sessionId])
  
  const assignStudent = useCallback((roomId: string, studentId: string) => {
    socket?.emit('breakout:assign', { roomId, studentId })
  }, [socket])
  
  const removeStudent = useCallback((roomId: string, studentId: string) => {
    socket?.emit('breakout:remove', { roomId, studentId })
  }, [socket])
  
  const rotateGroups = useCallback(() => {
    socket?.emit('breakout:rotate', { sessionId })
  }, [socket, sessionId])
  
  const sendMessage = useCallback((roomId: string, content: string, type?: 'text' | 'question') => {
    socket?.emit('breakout:message', { roomId, content, type })
    socket?.emit('breakout_message', { roomId, message: content, type })
  }, [socket])
  
  const broadcastMessage = useCallback((message: string, target: 'all' | 'specific', roomIds?: string[]) => {
    socket?.emit('breakout:broadcast', { mainRoomId: sessionId, message, target, roomIds })
    socket?.emit('breakout_broadcast', { mainRoomId: sessionId, message, target, roomIds })
  }, [socket, sessionId])
  
  const extendTime = useCallback((roomId: string, minutes: number) => {
    socket?.emit('breakout:extend', { roomId, minutes })
  }, [socket])
  
  const assignTask = useCallback((roomId: string, task: { title: string; description: string; type: string }) => {
    socket?.emit('breakout:assign_task', { roomId, task })
  }, [socket])
  
  const toggleAI = useCallback((roomId: string, enabled: boolean) => {
    socket?.emit('breakout:toggle_ai', { roomId, enabled })
  }, [socket])
  
  const requestHelp = useCallback((roomId: string) => {
    socket?.emit('breakout:request_help', { roomId })
    socket?.emit('breakout_request_help', { roomId, userId })
  }, [socket, userId])
  
  const raiseHand = useCallback((roomId: string, raised: boolean) => {
    socket?.emit('breakout:raise_hand', { roomId, raised })
  }, [socket])
  
  const updateVideoState = useCallback((roomId: string, state: { isMuted?: boolean; isVideoOff?: boolean; isScreenSharing?: boolean }) => {
    socket?.emit('breakout:video_state', { roomId, ...state })
  }, [socket])
  
  const acknowledgeAlert = useCallback((roomId: string, alertId: string) => {
    socket?.emit('breakout:acknowledge_alert', { roomId, alertId })
  }, [socket])
  
  return {
    rooms,
    isConnected,
    createRooms,
    joinRoom,
    leaveRoom,
    endRoom,
    endAllRooms,
    assignStudent,
    removeStudent,
    rotateGroups,
    sendMessage,
    broadcastMessage,
    extendTime,
    assignTask,
    toggleAI,
    requestHelp,
    raiseHand,
    updateVideoState,
    acknowledgeAlert
  }
}
