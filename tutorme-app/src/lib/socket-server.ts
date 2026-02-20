/**
 * Socket.io Server for Live Class System
 * Handles real-time communication between students, tutors, and AI
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

export type StudentStatus = 'on_track' | 'needs_help' | 'struggling' | 'idle'

export interface StudentState {
  userId: string
  name: string
  status: StudentStatus
  engagement: number // 0-100
  understanding: number // 0-100
  frustration: number // 0-100
  lastActivity: number
  currentActivity?: string
  joinedAt: number // timestamp when student joined
}

export interface ClassRoom {
  id: string
  tutorId: string
  students: Map<string, StudentState>
  whiteboardData?: any
  chatHistory: ChatMessage[]
  createdAt: Date
}

export interface ChatMessage {
  id: string
  userId: string
  name: string
  text: string
  timestamp: number
  isAI?: boolean
}

// In-memory store for active class rooms
const activeRooms = new Map<string, ClassRoom>()

// ============================================
// DIRECT MESSAGING STATE
// ============================================

interface DirectMessageRoom {
  conversationId: string
  participant1Id: string
  participant2Id: string
  typingUsers: Set<string>
  lastActivity: number
}

const directMessageRooms = new Map<string, DirectMessageRoom>()
const userSocketMap = new Map<string, string>() // userId -> socketId

// ============================================
// WHITEBOARD STATE
// ============================================

interface WhiteboardStroke {
  id: string
  points: { x: number; y: number }[]
  color: string
  width: number
  type: 'pen' | 'eraser'
  userId: string
}

interface WhiteboardShape {
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

interface WhiteboardText {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontSize: number
  userId: string
}

interface WhiteboardState {
  whiteboardId: string
  roomId: string
  strokes: WhiteboardStroke[]
  shapes: WhiteboardShape[]
  texts: WhiteboardText[]
  cursors: Map<string, { x: number; y: number; color: string; name: string }>
  activeUsers: Set<string>
  backgroundColor: string
  backgroundStyle: string
}

const activeWhiteboards = new Map<string, WhiteboardState>()

export function initSocketServer(server: NetServer) {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id)

    // Join class room
    socket.on('join_class', async (data: { 
      roomId: string
      userId: string
      name: string
      role: 'student' | 'tutor'
      tutorId?: string
    }) => {
      const { roomId, userId, name, role, tutorId } = data
      
      socket.join(roomId)
      socket.data.userId = userId
      socket.data.roomId = roomId
      socket.data.role = role

      // Get or create room
      let room = activeRooms.get(roomId)
      if (!room) {
        room = {
          id: roomId,
          tutorId: tutorId || userId,
          students: new Map(),
          chatHistory: [],
          createdAt: new Date()
        }
        activeRooms.set(roomId, room)
      }

      if (role === 'student') {
        // Add student to room tracking
        const studentState: StudentState = {
          userId,
          name,
          status: 'on_track',
          engagement: 100,
          understanding: 80,
          frustration: 0,
          lastActivity: Date.now(),
          joinedAt: Date.now()
        }
        room.students.set(userId, studentState)

        // Notify tutor of new student
        socket.to(roomId).emit('student_joined', { userId, name, state: studentState })
        
        // Send current room state to joining student
        socket.emit('room_state', {
          students: Array.from(room.students.values()),
          chatHistory: room.chatHistory.slice(-50), // Last 50 messages
          whiteboardData: room.whiteboardData
        })
      } else if (role === 'tutor') {
        // Tutor joining - send all student states
        socket.emit('room_state', {
          students: Array.from(room.students.values()),
          chatHistory: room.chatHistory,
          whiteboardData: room.whiteboardData
        })
      }

      console.log(`${role} ${name} joined room ${roomId}`)
    })

    // Whiteboard updates
    socket.on('whiteboard_update', (data: { strokes: any[] }) => {
      const roomId = socket.data.roomId
      if (!roomId) return

      const room = activeRooms.get(roomId)
      if (room) {
        room.whiteboardData = data.strokes
        // Broadcast to all except sender
        socket.to(roomId).emit('whiteboard_update', data)
      }
    })

    // Code editor updates
    socket.on('code_update', (data: { content: string; language: string }) => {
      const roomId = socket.data.roomId
      if (!roomId) return

      socket.to(roomId).emit('code_update', {
        ...data,
        userId: socket.data.userId
      })
    })

    // Chat messages
    socket.on('chat_message', (data: { text: string }) => {
      const roomId = socket.data.roomId
      if (!roomId) return

      const room = activeRooms.get(roomId)
      if (!room) return

      const message: ChatMessage = {
        id: `${Date.now()}-${socket.data.userId}`,
        userId: socket.data.userId,
        name: socket.data.name || 'Unknown',
        text: data.text,
        timestamp: Date.now()
      }

      room.chatHistory.push(message)
      
      // Keep only last 100 messages
      if (room.chatHistory.length > 100) {
        room.chatHistory = room.chatHistory.slice(-100)
      }

      // Broadcast to all in room
      io.to(roomId).emit('chat_message', message)

      // Check for distress signals
      const distressKeywords = ['stuck', 'don\'t get it', 'confused', 'help', '???', 'lost']
      const lowerText = data.text.toLowerCase()
      if (distressKeywords.some(kw => lowerText.includes(kw))) {
        const student = room.students.get(socket.data.userId)
        if (student) {
          student.status = 'struggling'
          student.frustration = Math.min(100, student.frustration + 20)
          
          // Notify tutor
          socket.to(roomId).emit('student_distress', {
            userId: socket.data.userId,
            name: student.name,
            message: data.text,
            status: student.status
          })
        }
      }
    })

    // Student activity tracking
    socket.on('activity_ping', (data: { 
      activity: string
      engagement?: number
      understanding?: number 
    }) => {
      const roomId = socket.data.roomId
      const userId = socket.data.userId
      if (!roomId || !userId) return

      const room = activeRooms.get(roomId)
      if (!room) return

      const student = room.students.get(userId)
      if (student) {
        student.lastActivity = Date.now()
        student.currentActivity = data.activity
        if (data.engagement !== undefined) student.engagement = data.engagement
        if (data.understanding !== undefined) student.understanding = data.understanding

        // Recalculate status
        updateStudentStatus(student)

        // Notify tutor of state change
        socket.to(roomId).emit('student_state_update', {
          userId,
          state: student
        })
      }
    })

    // Tutor broadcast message
    socket.on('tutor_broadcast', (data: { 
      text: string
      targetGroup: 'all' | 'struggling' | 'needs_help'
    }) => {
      const roomId = socket.data.roomId
      if (!roomId || socket.data.role !== 'tutor') return

      const room = activeRooms.get(roomId)
      if (!room) return

      const message: ChatMessage = {
        id: `broadcast-${Date.now()}`,
        userId: socket.data.userId,
        name: 'Tutor',
        text: data.text,
        timestamp: Date.now()
      }

      if (data.targetGroup === 'all') {
        io.to(roomId).emit('tutor_broadcast', message)
      } else {
        // Target specific students based on status
        room.students.forEach((student, userId) => {
          if (data.targetGroup === 'struggling' && student.status === 'struggling') {
            io.to(roomId).emit('tutor_broadcast', { ...message, targetUserId: userId })
          } else if (data.targetGroup === 'needs_help' && 
                    (student.status === 'struggling' || student.status === 'needs_help')) {
            io.to(roomId).emit('tutor_broadcast', { ...message, targetUserId: userId })
          }
        })
      }
    })

    // AI hint from tutor
    socket.on('push_hint', (data: {
      targetUserId: string
      hint: string
      type: 'socratic' | 'direct' | 'encouragement'
    }) => {
      const roomId = socket.data.roomId
      if (!roomId || socket.data.role !== 'tutor') return

      io.to(roomId).emit('ai_hint', {
        userId: data.targetUserId,
        text: data.hint,
        type: data.type,
        fromTutor: true,
        timestamp: Date.now()
      })
    })

    // Breakout room invitation
    socket.on('breakout_invite', (data: {
      targetUserId: string
      roomUrl: string
    }) => {
      const roomId = socket.data.roomId
      if (!roomId || socket.data.role !== 'tutor') return

      io.to(roomId).emit('breakout_invite', {
        userId: data.targetUserId,
        roomUrl: data.roomUrl,
        tutorName: socket.data.name || 'Tutor'
      })
    })

    // Initialize breakout room handlers
    initBreakoutHandlers(io, socket)

    // ============================================
    // DIRECT MESSAGING HANDLERS
    // ============================================

    // Join direct messaging namespace
    socket.on('dm_join', (data: { userId: string }) => {
      socket.data.dmUserId = data.userId
      userSocketMap.set(data.userId, socket.id)
      socket.join(`user:${data.userId}`)
      console.log(`User ${data.userId} joined DM namespace`)
    })

    // Join a conversation room
    socket.on('dm_join_conversation', (data: { conversationId: string; userId: string }) => {
      const { conversationId, userId } = data
      
      socket.join(`conversation:${conversationId}`)
      socket.data.currentConversation = conversationId
      
      // Track room state
      let room = directMessageRooms.get(conversationId)
      if (!room) {
        room = {
          conversationId,
          participant1Id: '', // Will be set from DB lookup
          participant2Id: '',
          typingUsers: new Set(),
          lastActivity: Date.now()
        }
        directMessageRooms.set(conversationId, room)
      }
      
      room.lastActivity = Date.now()
      console.log(`User ${userId} joined conversation ${conversationId}`)
    })

    // Leave conversation room
    socket.on('dm_leave_conversation', (data: { conversationId: string; userId: string }) => {
      socket.leave(`conversation:${data.conversationId}`)
      
      // Remove from typing users
      const room = directMessageRooms.get(data.conversationId)
      if (room) {
        room.typingUsers.delete(data.userId)
        // Notify other participant
        socket.to(`conversation:${data.conversationId}`).emit('dm_typing', {
          conversationId: data.conversationId,
          userId: data.userId,
          isTyping: false
        })
      }
      
      delete socket.data.currentConversation
    })

    // Real-time message
    socket.on('dm_message', async (data: {
      conversationId: string
      messageId: string
      senderId: string
      content: string
      type: 'text' | 'image' | 'file'
      attachmentUrl?: string
      timestamp: number
    }) => {
      const room = directMessageRooms.get(data.conversationId)
      if (room) {
        room.lastActivity = Date.now()
        room.typingUsers.delete(data.senderId)
      }

      // Broadcast to conversation room
      io.to(`conversation:${data.conversationId}`).emit('dm_message', {
        ...data,
        sender: {
          id: data.senderId,
          name: socket.data.name || 'Unknown'
        }
      })

      // Notify recipient if not in conversation
      const recipientSocketId = userSocketMap.get(data.senderId === room?.participant1Id ? room.participant2Id : room?.participant1Id || '')
      if (recipientSocketId) {
        const recipientSocket = io.sockets.sockets.get(recipientSocketId)
        if (recipientSocket && recipientSocket.data.currentConversation !== data.conversationId) {
          recipientSocket.emit('dm_notification', {
            conversationId: data.conversationId,
            senderId: data.senderId,
            senderName: socket.data.name || 'Unknown',
            preview: data.content.slice(0, 100),
            timestamp: data.timestamp
          })
        }
      }
    })

    // Typing indicator
    socket.on('dm_typing', (data: {
      conversationId: string
      userId: string
      isTyping: boolean
    }) => {
      const room = directMessageRooms.get(data.conversationId)
      if (room) {
        if (data.isTyping) {
          room.typingUsers.add(data.userId)
        } else {
          room.typingUsers.delete(data.userId)
        }
        room.lastActivity = Date.now()
      }

      // Broadcast to other participant
      socket.to(`conversation:${data.conversationId}`).emit('dm_typing', {
        conversationId: data.conversationId,
        userId: data.userId,
        isTyping: data.isTyping
      })
    })

    // Message read receipt
    socket.on('dm_read', (data: {
      conversationId: string
      userId: string
      messageIds: string[]
    }) => {
      socket.to(`conversation:${data.conversationId}`).emit('dm_read', {
        conversationId: data.conversationId,
        userId: data.userId,
        messageIds: data.messageIds,
        readAt: Date.now()
      })
    })

    // ============================================
    // WHITEBOARD HANDLERS
    // ============================================

    // Join whiteboard
    socket.on('wb_join', (data: {
      whiteboardId: string
      roomId: string
      userId: string
      name: string
      color: string
    }) => {
      socket.join(`wb:${data.whiteboardId}`)
      socket.data.whiteboardId = data.whiteboardId
      socket.data.whiteboardUserId = data.userId
      socket.data.whiteboardUserName = data.name
      socket.data.whiteboardColor = data.color

      // Get or create whiteboard state
      let wb = activeWhiteboards.get(data.whiteboardId)
      if (!wb) {
        wb = {
          whiteboardId: data.whiteboardId,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(data.whiteboardId, wb)
      }

      wb.activeUsers.add(data.userId)

      // Send current state to joining user
      socket.emit('wb_state', {
        whiteboardId: data.whiteboardId,
        strokes: wb.strokes,
        shapes: wb.shapes,
        texts: wb.texts,
        backgroundColor: wb.backgroundColor,
        backgroundStyle: wb.backgroundStyle,
        activeUsers: Array.from(wb.activeUsers)
      })

      // Notify others
      socket.to(`wb:${data.whiteboardId}`).emit('wb_user_joined', {
        userId: data.userId,
        name: data.name,
        color: data.color
      })
    })

    // Whiteboard stroke
    socket.on('wb_stroke', (data: {
      whiteboardId: string
      stroke: WhiteboardStroke
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.strokes.push(data.stroke)
        socket.to(`wb:${data.whiteboardId}`).emit('wb_stroke', data.stroke)
      }
    })

    // Whiteboard shape
    socket.on('wb_shape', (data: {
      whiteboardId: string
      shape: WhiteboardShape
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.shapes.push(data.shape)
        socket.to(`wb:${data.whiteboardId}`).emit('wb_shape', data.shape)
      }
    })

    // Whiteboard text
    socket.on('wb_text', (data: {
      whiteboardId: string
      text: WhiteboardText
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.texts.push(data.text)
        socket.to(`wb:${data.whiteboardId}`).emit('wb_text', data.text)
      }
    })

    // Whiteboard cursor
    socket.on('wb_cursor', (data: {
      whiteboardId: string
      userId: string
      name: string
      color: string
      x: number
      y: number
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.cursors.set(data.userId, { x: data.x, y: data.y, color: data.color, name: data.name })
        socket.to(`wb:${data.whiteboardId}`).emit('wb_cursor', {
          userId: data.userId,
          name: data.name,
          color: data.color,
          x: data.x,
          y: data.y
        })
      }
    })

    // Clear whiteboard
    socket.on('wb_clear', (data: {
      whiteboardId: string
      userId: string
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.strokes = []
        wb.shapes = []
        wb.texts = []
        io.to(`wb:${data.whiteboardId}`).emit('wb_cleared', { userId: data.userId })
      }
    })

    // Undo last action
    socket.on('wb_undo', (data: {
      whiteboardId: string
      userId: string
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        // Remove last item added by this user
        const lastStrokeIndex = wb.strokes.findLastIndex(s => s.userId === data.userId)
        const lastShapeIndex = wb.shapes.findLastIndex(s => s.userId === data.userId)
        const lastTextIndex = wb.texts.findLastIndex(t => t.userId === data.userId)

        const indices = [
          { type: 'stroke', index: lastStrokeIndex },
          { type: 'shape', index: lastShapeIndex },
          { type: 'text', index: lastTextIndex }
        ].filter(i => i.index !== -1)

        if (indices.length > 0) {
          const lastAction = indices.reduce((max, curr) => 
            curr.index > max.index ? curr : max
          )
          
          if (lastAction.type === 'stroke') wb.strokes.splice(lastAction.index, 1)
          if (lastAction.type === 'shape') wb.shapes.splice(lastAction.index, 1)
          if (lastAction.type === 'text') wb.texts.splice(lastAction.index, 1)

          io.to(`wb:${data.whiteboardId}`).emit('wb_undone', {
            userId: data.userId,
            strokes: wb.strokes,
            shapes: wb.shapes,
            texts: wb.texts
          })
        }
      }
    })

    // Leave whiteboard
    socket.on('wb_leave', (data: {
      whiteboardId: string
      userId: string
    }) => {
      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.activeUsers.delete(data.userId)
        wb.cursors.delete(data.userId)
        socket.to(`wb:${data.whiteboardId}`).emit('wb_user_left', { userId: data.userId })
      }
      socket.leave(`wb:${data.whiteboardId}`)
      delete socket.data.whiteboardId
    })

    // Disconnect handling
    socket.on('disconnect', () => {
      const roomId = socket.data.roomId
      const userId = socket.data.userId
      const dmUserId = socket.data.dmUserId
      const wbId = socket.data.whiteboardId
      const wbUserId = socket.data.whiteboardUserId
      
      if (roomId && userId) {
        const room = activeRooms.get(roomId)
        if (room && socket.data.role === 'student') {
          room.students.delete(userId)
          socket.to(roomId).emit('student_left', { userId })
        }
      }

      // Clean up DM state
      if (dmUserId) {
        userSocketMap.delete(dmUserId)
        
        // Remove from typing users in all conversations
        directMessageRooms.forEach((room, convId) => {
          if (room.typingUsers.has(dmUserId)) {
            room.typingUsers.delete(dmUserId)
            socket.to(`conversation:${convId}`).emit('dm_typing', {
              conversationId: convId,
              userId: dmUserId,
              isTyping: false
            })
          }
        })
      }

      // Clean up whiteboard state
      if (wbId && wbUserId) {
        const wb = activeWhiteboards.get(wbId)
        if (wb) {
          wb.activeUsers.delete(wbUserId)
          wb.cursors.delete(wbUserId)
          socket.to(`wb:${wbId}`).emit('wb_user_left', { userId: wbUserId })
        }
      }
      
      console.log('Client disconnected:', socket.id)
    })
  })

  // Cleanup inactive rooms periodically
  setInterval(() => {
    const now = Date.now()
    activeRooms.forEach((room, roomId) => {
      // Remove rooms inactive for > 4 hours
      if (now - room.createdAt.getTime() > 4 * 60 * 60 * 1000) {
        activeRooms.delete(roomId)
        console.log('Cleaned up inactive room:', roomId)
      }
    })
  }, 60 * 60 * 1000) // Every hour

  // Cleanup inactive DM rooms periodically
  setInterval(() => {
    const now = Date.now()
    directMessageRooms.forEach((room, roomId) => {
      // Remove rooms inactive for > 1 hour
      if (now - room.lastActivity > 60 * 60 * 1000) {
        directMessageRooms.delete(roomId)
        console.log('Cleaned up inactive DM room:', roomId)
      }
    })
  }, 30 * 60 * 1000) // Every 30 minutes

  return io
}

function updateStudentStatus(student: StudentState) {
  // Calculate status based on metrics
  if (student.frustration > 70 || student.understanding < 30) {
    student.status = 'struggling'
  } else if (student.understanding < 60 || student.engagement < 50) {
    student.status = 'needs_help'
  } else if (Date.now() - student.lastActivity > 90000) { // 90s idle
    student.status = 'idle'
  } else {
    student.status = 'on_track'
  }
}

// ============================================
// BREAKOUT ROOM MANAGEMENT
// ============================================

export interface BreakoutRoom {
  id: string
  name: string
  mainRoomId: string
  participants: Map<string, { id: string; name: string; joinedAt: number; engagementScore?: number }>
  status: 'forming' | 'active' | 'paused' | 'closed'
  aiEnabled: boolean
  timeLimit: number
  timeRemaining?: number
  startedAt?: Date
  task?: {
    id: string
    title: string
    description: string
    type: 'discussion' | 'problem' | 'project' | 'quiz'
  }
  alerts: {
    type: 'confusion' | 'conflict' | 'off_topic' | 'need_help' | 'quiet'
    message: string
    timestamp: number
    severity: 'low' | 'medium' | 'high'
  }[]
  // Enhanced metrics for monitoring
  metrics?: {
    messagesExchanged: number
    avgEngagement: number
    participationRate: number
    topicAdherence: number
  }
  chatHistory: {
    id: string
    senderId: string
    senderName: string
    message: string
    timestamp: number
  }[]
  timers?: {
    countdown?: NodeJS.Timeout
    closingWarning?: NodeJS.Timeout
  }
}

const breakoutRooms = new Map<string, BreakoutRoom>()
const mainRoomBreakouts = new Map<string, Set<string>>() // mainRoomId -> Set<breakoutRoomId>

export function initBreakoutHandlers(io: SocketIOServer, socket: any) {
  // Join breakout coordination room
  socket.on('join_breakout_coordination', (data: {
    mainRoomId: string
    userId: string
    name: string
    role: 'student' | 'tutor'
  }) => {
    socket.join(`breakout:${data.mainRoomId}`)
    socket.data.breakoutMainRoom = data.mainRoomId
    socket.data.breakoutRole = data.role
  })

  // Tutor: Create breakout rooms
  socket.on('breakout_create', (data: {
    mainRoomId: string
    config: {
      roomCount: number
      participantsPerRoom: number
      distributionMode: 'random' | 'skill_based' | 'manual' | 'self_select'
      timeLimit: number
      aiAssistantEnabled: boolean
    }
  }) => {
    const { mainRoomId, config } = data
    
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
        chatHistory: []
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
          joinedAt: Date.now()
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
            io.to(room.id).emit('breakout_countdown', {
              roomId: room.id,
              secondsRemaining: timeRemaining
            })
            
            if (timeRemaining <= 0) {
              clearInterval(room.timers?.countdown)
              closeBreakoutRoom(io, room.id)
            }
          }, 1000),
          
          // Warning 1 minute before closing
          closingWarning: setTimeout(() => {
            io.to(room.id).emit('breakout_closing_soon', { seconds: 60 })
          }, (room.timeLimit - 60) * 1000)
        }
      })

      // Notify all participants
      io.to(`breakout:${mainRoomId}`).emit('breakout_rooms_created', {
        rooms: createdRooms.map(r => ({
          id: r.id,
          name: r.name,
          mainRoomId: r.mainRoomId,
          participants: Array.from(r.participants.values()),
          status: r.status,
          aiEnabled: r.aiEnabled,
          timeRemaining: r.timeLimit
        }))
      })
    }, 3000) // 3 second delay for formation
  })

  // Student: Join breakout room
  socket.on('breakout_join', (data: {
    roomId: string
    userId: string
    name: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    socket.join(data.roomId)
    socket.data.breakoutRoomId = data.roomId
    socket.data.breakoutUserId = data.userId

    // Add participant
    room.participants.set(data.userId, {
      id: data.userId,
      name: data.name,
      joinedAt: Date.now()
    })

    // Notify others in room
    socket.to(data.roomId).emit('breakout_participant_joined', {
      roomId: data.roomId,
      participant: { id: data.userId, name: data.name }
    })

    // Send room history to joining participant
    socket.emit('room_state', {
      participants: Array.from(room.participants.values()),
      chatHistory: room.chatHistory,
      timeRemaining: room.timeLimit - (Date.now() - (room.startedAt?.getTime() || Date.now())) / 1000
    })
  })

  // Tutor: Monitor a room
  socket.on('breakout_join_monitor', (data: { roomId: string }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    socket.join(data.roomId)
    socket.emit('room_state', {
      participants: Array.from(room.participants.values()),
      chatHistory: room.chatHistory,
      alerts: room.alerts
    })
  })

  // Send message in breakout room
  socket.on('breakout_message', (data: {
    roomId: string
    message: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    const message = {
      id: `${Date.now()}-${socket.data.breakoutUserId}`,
      roomId: data.roomId,
      senderId: socket.data.breakoutUserId,
      senderName: socket.data.name || 'Unknown',
      message: data.message,
      timestamp: Date.now()
    }

    room.chatHistory.push(message)
    if (room.chatHistory.length > 100) {
      room.chatHistory = room.chatHistory.slice(-100)
    }

    io.to(data.roomId).emit('breakout_message', message)

    // AI monitoring for alerts
    const distressKeywords = ['stuck', 'confused', 'help', 'don\'t understand', 'lost']
    if (distressKeywords.some(kw => data.message.toLowerCase().includes(kw))) {
      const alert = {
        type: 'need_help' as const,
        message: `${socket.data.name} may need assistance`,
        timestamp: Date.now(),
        severity: 'medium' as const
      }
      room.alerts.push(alert)
      
      // Notify tutor
      io.to(`breakout:${room.mainRoomId}`).emit('breakout_alert', {
        roomId: data.roomId,
        alert
      })
    }
  })

  // Student: Request help
  socket.on('breakout_request_help', (data: {
    roomId: string
    userId: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    io.to(`breakout:${room.mainRoomId}`).emit('breakout_help_requested', {
      roomId: data.roomId,
      participantId: data.userId
    })
  })

  // Tutor: Broadcast to all rooms
  socket.on('breakout_broadcast', (data: {
    mainRoomId: string
    message: string
  }) => {
    const roomIds = mainRoomBreakouts.get(data.mainRoomId)
    if (!roomIds) return

    roomIds.forEach(roomId => {
      io.to(roomId).emit('breakout_broadcast', { message: data.message })
    })
  })

  // Tutor: Close all breakout rooms
  socket.on('breakout_close', (data: { mainRoomId: string }) => {
    const roomIds = mainRoomBreakouts.get(data.mainRoomId)
    if (!roomIds) return

    roomIds.forEach(roomId => {
      closeBreakoutRoom(io, roomId)
    })

    mainRoomBreakouts.delete(data.mainRoomId)
  })

  // Leave breakout room
  socket.on('breakout_leave', (data: {
    roomId: string
    userId: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (room) {
      room.participants.delete(data.userId)
      socket.to(data.roomId).emit('breakout_participant_left', {
        roomId: data.roomId,
        participantId: data.userId
      })
    }
    socket.leave(data.roomId)
  })
}

function closeBreakoutRoom(io: SocketIOServer, roomId: string) {
  const room = breakoutRooms.get(roomId)
  if (!room) return

  // Clear timers
  if (room.timers?.countdown) clearInterval(room.timers.countdown)
  if (room.timers?.closingWarning) clearTimeout(room.timers.closingWarning)

  room.status = 'closed'
  
  // Notify participants
  io.to(roomId).emit('breakout_rooms_closed')
  
  // Clean up after delay
  setTimeout(() => {
    breakoutRooms.delete(roomId)
  }, 5000)
}

export function getRoomState(roomId: string): ClassRoom | undefined {
  return activeRooms.get(roomId)
}

export function getBreakoutRoomState(roomId: string): BreakoutRoom | undefined {
  return breakoutRooms.get(roomId)
}

// ============================================
// DIRECT MESSAGING HELPERS
// ============================================

export function getDMRoomState(conversationId: string): DirectMessageRoom | undefined {
  return directMessageRooms.get(conversationId)
}

export function getUserSocketId(userId: string): string | undefined {
  return userSocketMap.get(userId)
}

export function isUserOnline(userId: string): boolean {
  return userSocketMap.has(userId)
}

export function broadcastToUser(io: SocketIOServer, userId: string, event: string, data: unknown) {
  const socketId = userSocketMap.get(userId)
  if (socketId) {
    io.to(socketId).emit(event, data)
  }
}

// ============================================
// WHITEBOARD HELPERS
// ============================================

export function getWhiteboardState(whiteboardId: string): WhiteboardState | undefined {
  return activeWhiteboards.get(whiteboardId)
}

export function clearWhiteboard(whiteboardId: string): boolean {
  const wb = activeWhiteboards.get(whiteboardId)
  if (wb) {
    wb.strokes = []
    wb.shapes = []
    wb.texts = []
    return true
  }
  return false
}

export function exportWhiteboard(whiteboardId: string): any | null {
  const wb = activeWhiteboards.get(whiteboardId)
  if (!wb) return null
  
  return {
    whiteboardId: wb.whiteboardId,
    roomId: wb.roomId,
    strokes: wb.strokes,
    shapes: wb.shapes,
    texts: wb.texts,
    backgroundColor: wb.backgroundColor,
    backgroundStyle: wb.backgroundStyle,
    exportedAt: new Date().toISOString(),
  }
}

// Cleanup inactive whiteboards periodically
setInterval(() => {
  const now = Date.now()
  activeWhiteboards.forEach((wb, wbId) => {
    // Remove whiteboards with no active users for > 2 hours
    if (wb.activeUsers.size === 0) {
      // Check if we have a last activity timestamp
      // For now, we'll keep them since we don't track last activity per whiteboard
      // In production, add lastActivity timestamp and clean up accordingly
    }
  })
}, 60 * 60 * 1000) // Every hour
