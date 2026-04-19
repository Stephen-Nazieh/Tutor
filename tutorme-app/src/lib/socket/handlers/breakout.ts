/**
 * Socket.io handler module — extracted from socket-server.ts for maintainability.
 */

import { Server as SocketIOServer, Socket } from 'socket.io'
import * as Y from 'yjs'
import { generateWithFallback } from '@/lib/agents'
import { z } from 'zod'
import { safeJsonParseWithSchema } from '@/lib/ai/json'
import {
  CHAT_HISTORY_MAX,
  CHAT_HISTORY_SLICE_TO_STUDENT,
  LIVE_CLASS_EXPORTS_MAX,
  LIVE_CLASS_SNAPSHOTS_MAX,
  MAX_CHAT_MESSAGE_LENGTH,
  MAX_DM_MESSAGE_LENGTH,
  NAME_MAX_LENGTH,
  PDF_EVENTS_MAX,
  ROOM_CLEANUP_INTERVAL_MS,
  DM_CLEANUP_INTERVAL_MS,
  DM_ROOM_IDLE_CLEANUP_MS,
  LIVE_DOC_CLEANUP_INTERVAL_MS,
  PDF_CLEANUP_INTERVAL_MS,
  ROOM_IDLE_CLEANUP_MS,
  ROOM_ID_MAX_LENGTH,
  USER_ID_MAX_LENGTH,
  LCWB_AI_REGION_RATE_LIMIT_PER_MIN,
  LCWB_AI_REGION_RATE_WINDOW_MS,
  WHITEBOARD_OP_SEEN_MAX,
  WHITEBOARD_OP_SEEN_TRIM,
  WHITEBOARD_DEAD_LETTER_MAX,
  WHITEBOARD_OP_LOG_MAX,
  MAX_STROKES,
  activeRooms,
  directMessageRooms,
  userSocketMap,
  getConversationParticipantIds,
  getPdfCollabRoom,
  getLiveDocumentShareMap,
  expandLiveShareForStudents,
  activeWhiteboards,
  whiteboardOpMetrics,
  whiteboardSelectionPresence,
  lcwbAiRegionRateLimit,
  whiteboardOpSeenIds,
  whiteboardDeadLetters,
  whiteboardOpLog,
  whiteboardOpSeq,
  whiteboardBranches,
  liveClassModeration,
  liveClassSnapshots,
  liveClassExports,
  mathWhiteboardRooms,
  mathSyncMetrics,
  breakoutRooms,
  mainRoomBreakouts,
  getWhiteboardOpMetric,
  trimWhiteboardOpTimestamps,
  applyStrokeOps,
  isValidStroke,
  sanitizeWhiteboardOps,
  pushWhiteboardDeadLetters,
  appendWhiteboardOpLog,
  getLiveClassModerationState,
  appendLiveClassSnapshot,
  getMathSyncMetric,
  trimRecentUpdates,
  getMathWhiteboardRoom,
  trimPdfEvents,
  pdfCollabRooms,
  liveDocumentShares,
  activePolls,
  sessionPolls,
  deployedTasks,
  feedbackPolls,
  feedbackQuestions,
} from '@/lib/socket'
import type {
  StudentState,
  ChatMessage,
  ClassRoom,
  DirectMessageRoom,
  WhiteboardStroke,
  WhiteboardStrokeOp,
  WhiteboardShape,
  WhiteboardText,
  WhiteboardState,
  WhiteboardSelectionPresence,
  LiveClassModerationState,
  LiveClassSnapshot,
  MathWhiteboardRoomState,
  BreakoutRoom,
  PollState,
  PdfCollabRoomState,
  LiveDocumentShare,
} from '@/lib/socket'

export function initBreakoutHandlers(io: SocketIOServer, socket: Socket) {
  const emitBreakoutEvent = (
    roomId: string,
    colonEvent: string,
    underscoreEvent: string,
    payload: unknown
  ) => {
    io.to(roomId).emit(colonEvent, payload)
    io.to(roomId).emit(underscoreEvent, payload)
  }

  // Join breakout coordination room
  const handleJoinBreakoutCoordination = (data: {
    mainRoomId: string
    userId: string
    name: string
    role: 'student' | 'tutor'
  }) => {
    socket.join(`breakout:${data.mainRoomId}`)
    socket.data.breakoutMainRoom = data.mainRoomId
    socket.data.breakoutRole = data.role
    socket.data.name = data.name
  }
  socket.on('join_breakout_coordination', handleJoinBreakoutCoordination)
  socket.on('breakout:join_coordination', handleJoinBreakoutCoordination)

  // Tutor: Create breakout rooms
  const handleBreakoutCreate = (data: {
    mainRoomId?: string
    sessionId?: string
    config: {
      roomCount: number
      participantsPerRoom: number
      distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select'
      timeLimit: number
      aiAssistantEnabled: boolean
    }
  }) => {
    if (socket.data.role !== 'tutor') return
    const mainRoomId = data.mainRoomId || data.sessionId
    const { config } = data
    if (!mainRoomId) return

    // Get main room participants
    const mainRoom = activeRooms.get(mainRoomId)
    if (!mainRoom) return

    const participants = Array.from(mainRoom.students.values())
    const createdRooms: BreakoutRoom[] = []
    const roomIds: string[] = []

    // Create rooms
    for (let i = 0; i < config.roomCount; i++) {
      const roomId = `breakout-${mainRoomId}-${Date.now()}-${i}`
      const room: BreakoutRoom = {
        id: roomId,
        name: `Room ${i + 1}`,
        mainRoomId,
        participants: new Map(),
        status: 'forming',
        aiEnabled: config.aiAssistantEnabled,
        timeLimit: config.timeLimit * 60, // Convert to seconds
        alerts: [],
        chatHistory: [],
      }
      breakoutRooms.set(roomId, room)
      createdRooms.push(room)
      roomIds.push(roomId)
    }

    // Assign participants based on mode
    if (config.distributionMode === 'random') {
      // Shuffle participants
      const shuffled = [...participants].sort(() => Math.random() - 0.5)
      shuffled.forEach((student, index) => {
        const roomIndex = index % config.roomCount
        const room = createdRooms[roomIndex]
        room.participants.set(student.userId, {
          id: student.userId,
          name: student.name,
          joinedAt: Date.now(),
        })
      })
    }
    // TODO: Implement other distribution modes

    // Store relationship
    mainRoomBreakouts.set(mainRoomId, new Set(roomIds))

    // Activate rooms after short delay
    setTimeout(() => {
      createdRooms.forEach(room => {
        room.status = 'active'
        room.startedAt = new Date()

        // Start countdown timer
        let timeRemaining = room.timeLimit
        room.timers = {
          countdown: setInterval(() => {
            timeRemaining--
            emitBreakoutEvent(room.id, 'breakout:countdown', 'breakout_countdown', {
              roomId: room.id,
              secondsRemaining: timeRemaining,
            })

            if (timeRemaining <= 0) {
              clearInterval(room.timers?.countdown)
              closeBreakoutRoom(io, room.id)
            }
          }, 1000),

          // Warning 1 minute before closing
          closingWarning: setTimeout(
            () => {
              emitBreakoutEvent(room.id, 'breakout:closing_soon', 'breakout_closing_soon', {
                seconds: 60,
              })
            },
            (room.timeLimit - 60) * 1000
          ),
        }
      })

      // Notify all participants
      const roomsPayload = createdRooms.map(r => ({
        id: r.id,
        name: r.name,
        mainRoomId: r.mainRoomId,
        participants: Array.from(r.participants.values()).map(p => ({
          id: p.id,
          userId: p.id,
          name: p.name,
          role: 'student',
          joinedAt: new Date(p.joinedAt).toISOString(),
          isOnline: true,
          isMuted: false,
          isVideoOff: false,
          isScreenSharing: false,
          engagementScore: 0,
          attentionLevel: 'medium',
          handRaised: false,
        })),
        status: r.status,
        aiEnabled: r.aiEnabled,
        timeRemaining: r.timeLimit,
        timeLimit: r.timeLimit,
        alerts: [],
        messages: [],
        metrics: {
          messagesExchanged: 0,
          avgEngagement: 0,
          participationRate: 0,
          topicAdherence: 0,
          lastUpdated: new Date().toISOString(),
        },
        maxParticipants: Math.min(config.participantsPerRoom, 10), // Cap at 10 for Daily.co plan limits
      }))

      emitBreakoutEvent(
        `breakout:${mainRoomId}`,
        'breakout:rooms_updated',
        'breakout_rooms_created',
        {
          rooms: roomsPayload,
        }
      )
    }, 3000) // 3 second delay for formation
  }
  socket.on('breakout_create', handleBreakoutCreate)
  socket.on('breakout:create', handleBreakoutCreate)

  // Student: Join breakout room
  const handleBreakoutJoin = (data: { roomId: string; userId: string; name?: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    socket.join(data.roomId)
    socket.data.breakoutRoomId = data.roomId
    socket.data.breakoutUserId = data.userId

    // Add participant
    const participantName = data.name || socket.data.name || 'Unknown'
    room.participants.set(data.userId, {
      id: data.userId,
      name: participantName,
      joinedAt: Date.now(),
    })

    // Notify others in room
    emitBreakoutEvent(data.roomId, 'breakout:participant_joined', 'breakout_participant_joined', {
      roomId: data.roomId,
      participant: { id: data.userId, userId: data.userId, name: participantName },
    })

    // Send room history to joining participant
    socket.emit('room_state', {
      participants: Array.from(room.participants.values()),
      chatHistory: room.chatHistory,
      timeRemaining:
        room.timeLimit - (Date.now() - (room.startedAt?.getTime() || Date.now())) / 1000,
    })
  }
  socket.on('breakout_join', handleBreakoutJoin)
  socket.on('breakout:join', handleBreakoutJoin)

  // Tutor: Monitor a room
  socket.on('breakout_join_monitor', (data: { roomId: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    socket.join(data.roomId)
    socket.emit('room_state', {
      participants: Array.from(room.participants.values()),
      chatHistory: room.chatHistory,
      alerts: room.alerts,
    })
  })

  // Send message in breakout room
  const handleBreakoutMessage = (data: { roomId: string; message?: string; content?: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return
    const text = data.message || data.content
    if (!text) return

    const message = {
      id: `${Date.now()}-${socket.data.breakoutUserId}`,
      roomId: data.roomId,
      senderId: socket.data.breakoutUserId,
      senderName: socket.data.name || 'Unknown',
      message: text,
      timestamp: Date.now(),
    }

    room.chatHistory.push(message)
    if (room.chatHistory.length > CHAT_HISTORY_MAX) {
      room.chatHistory = room.chatHistory.slice(-CHAT_HISTORY_MAX)
    }

    emitBreakoutEvent(data.roomId, 'breakout:message', 'breakout_message', message)

    // AI monitoring for alerts
    const distressKeywords = ['stuck', 'confused', 'help', "don't understand", 'lost']
    if (distressKeywords.some(kw => text.toLowerCase().includes(kw))) {
      const alert = {
        type: 'need_help' as const,
        message: `${socket.data.name} may need assistance`,
        timestamp: Date.now(),
        severity: 'medium' as const,
      }
      room.alerts.push(alert)

      // Notify tutor
      emitBreakoutEvent(`breakout:${room.mainRoomId}`, 'breakout:alert', 'breakout_alert', {
        roomId: data.roomId,
        alert,
      })
    }
  }
  socket.on('breakout_message', handleBreakoutMessage)
  socket.on('breakout:message', handleBreakoutMessage)

  // Student: Request help
  const handleBreakoutRequestHelp = (data: { roomId: string; userId?: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    emitBreakoutEvent(
      `breakout:${room.mainRoomId}`,
      'breakout:help_requested',
      'breakout_help_requested',
      {
        roomId: data.roomId,
        participantId: data.userId || socket.data.breakoutUserId,
      }
    )
  }
  socket.on('breakout_request_help', handleBreakoutRequestHelp)
  socket.on('breakout:request_help', handleBreakoutRequestHelp)

  // Tutor: Broadcast to all rooms
  const handleBreakoutBroadcast = (data: {
    mainRoomId?: string
    sessionId?: string
    message: string
  }) => {
    const mainRoomId = data.mainRoomId || data.sessionId
    if (!mainRoomId) return

    const roomIds = mainRoomBreakouts.get(mainRoomId)
    if (!roomIds) return

    roomIds.forEach(roomId => {
      emitBreakoutEvent(roomId, 'breakout:broadcast', 'breakout_broadcast', {
        message: data.message,
      })
    })
  }
  socket.on('breakout_broadcast', handleBreakoutBroadcast)
  socket.on('breakout:broadcast', handleBreakoutBroadcast)

  // Tutor: Close all breakout rooms
  const handleBreakoutClose = (data: { mainRoomId?: string; sessionId?: string }) => {
    const mainRoomId = data.mainRoomId || data.sessionId
    if (!mainRoomId) return

    const roomIds = mainRoomBreakouts.get(mainRoomId)
    if (!roomIds) return

    roomIds.forEach(roomId => {
      closeBreakoutRoom(io, roomId)
    })

    mainRoomBreakouts.delete(mainRoomId)
  }
  socket.on('breakout_close', handleBreakoutClose)
  socket.on('breakout:end_all', handleBreakoutClose)

  // Leave breakout room
  const handleBreakoutLeave = (data: { roomId: string; userId: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (room) {
      room.participants.delete(data.userId)
      emitBreakoutEvent(data.roomId, 'breakout:participant_left', 'breakout_participant_left', {
        roomId: data.roomId,
        participantId: data.userId,
      })
    }
    socket.leave(data.roomId)
  }
  socket.on('breakout_leave', handleBreakoutLeave)
  socket.on('breakout:leave', handleBreakoutLeave)
}

function closeBreakoutRoom(io: SocketIOServer, roomId: string) {
  const room = breakoutRooms.get(roomId)
  if (!room) return

  // Clear timers
  if (room.timers?.countdown) clearInterval(room.timers.countdown)
  if (room.timers?.closingWarning) clearTimeout(room.timers.closingWarning)

  room.status = 'closed'

  // Notify participants
  io.to(roomId).emit('breakout:rooms_closed')
  io.to(roomId).emit('breakout_rooms_closed')

  // Clean up after delay
  setTimeout(() => {
    breakoutRooms.delete(roomId)
  }, 5000)
}

