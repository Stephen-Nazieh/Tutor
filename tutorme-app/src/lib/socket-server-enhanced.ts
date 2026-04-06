/**
 * Enhanced Socket.io Server with Authentication and Memory Management
 * Critical fixes for production deployment
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { jwtVerify } from 'jose'
import Redis from 'ioredis'
import { promisify } from 'util'
import {
  registerLiveClassWhiteboardHandlers,
  cleanupLcwbPresence,
  initFeedbackHandlers,
} from './socket-server'

// Types from original socket-server.ts
export type StudentStatus = 'on_track' | 'needs_help' | 'struggling' | 'idle'

export interface StudentState {
  userId: string
  name: string
  status: StudentStatus
  engagement: number
  understanding: number
  frustration: number
  lastActivity: number
  currentActivity?: string
  joinedAt: number
}

export interface ClassRoom {
  id: string
  tutorId: string
  students: Map<string, StudentState>
  whiteboardData?: Record<string, unknown>
  chatHistory: ChatMessage[]
  tasks: LiveTask[]
  createdAt: Date
  lastActivity: number
}

export interface ChatMessage {
  id: string
  userId: string
  name: string
  text: string
  timestamp: number
  isAI?: boolean
}

export interface LiveTaskPollResponse {
  studentId: string
  value: number
  submittedAt: number
}

export interface LiveTaskQuestionResponse {
  studentId: string
  answer: string
  submittedAt: number
}

export interface LiveTaskPoll {
  id: string
  taskId: string
  question: string
  options: number[]
  status: 'open' | 'closed'
  responses: LiveTaskPollResponse[]
  createdAt: number
}

export interface LiveTaskQuestion {
  id: string
  taskId: string
  prompt: string
  responses: LiveTaskQuestionResponse[]
  createdAt: number
}

export interface LiveTaskDmiItem {
  id: string
  questionNumber: number
  questionText: string
}

export interface LiveTask {
  id: string
  title: string
  content: string
  source: 'task' | 'assessment'
  dmiItems?: LiveTaskDmiItem[]
  deployedAt: number
  polls: LiveTaskPoll[]
  questions: LiveTaskQuestion[]
}

// Environment validation
function validateEnv() {
  const required = ['NEXTAUTH_SECRET']
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Redis configuration
let redisClient: Redis | null = null
let redisPubClient: Redis | null = null
let redisSubClient: Redis | null = null
let ioRef: SocketIOServer | null = null

// Memory management constants
const ROOM_CLEANUP_INTERVAL = 15 * 60 * 1000 // 15 minutes
const DM_CLEANUP_INTERVAL = 5 * 60 * 1000 // 5 minutes
const WHITEBOARD_CLEANUP_INTERVAL = 10 * 60 * 1000 // 10 minutes
const ROOM_MAX_AGE = 4 * 60 * 60 * 1000 // 4 hours
const DM_MAX_AGE = 1 * 60 * 60 * 1000 // 1 hour
const WHITEBOARD_MAX_AGE = 2 * 60 * 60 * 1000 // 2 hours

// Rate limiting
const RATE_LIMITS = {
  maxEventsPerSecond: 10,
  burstSize: 20,
  windowSize: 1000, // 1 second
}

// Enhanced interfaces with activity tracking
interface DirectMessageRoom {
  conversationId: string
  participant1Id: string
  participant2Id: string
  typingUsers: Set<string>
  lastActivity: number
  createdAt: number
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
  lastActivity: number
  createdAt: number
}

interface WhiteboardStroke {
  id: string
  points: { x: number; y: number }[]
  color: string
  width: number
  type: 'pen' | 'eraser'
  userId: string
  createdAt: number
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
  createdAt: number
}

interface WhiteboardText {
  id: string
  text: string
  x: number
  y: number
  color: string
  fontSize: number
  userId: string
  createdAt: number
}

// Rate limiting per connection
interface RateLimitState {
  tokens: number
  lastRefill: number
}

const connectionRateLimits = new Map<string, RateLimitState>()

// Enhanced memory stores with activity tracking
const activeRooms = new Map<string, ClassRoom>()
const directMessageRooms = new Map<string, DirectMessageRoom>()
const activeWhiteboards = new Map<string, WhiteboardState>()
const userSocketMap = new Map<string, string>()

function setUserSocket(userId: string | undefined, socketId: string) {
  if (!userId) return
  userSocketMap.set(userId, socketId)
}

function clearUserSocketIfCurrent(userId: string | undefined, socketId: string) {
  if (!userId) return
  const mappedSocketId = userSocketMap.get(userId)
  if (mappedSocketId === socketId) {
    userSocketMap.delete(userId)
  }
}

// Authentication functions (use jose to match NextAuth and avoid jsonwebtoken dependency)
async function validateJWT(
  token: string
): Promise<{ userId: string; role: string; email: string; name: string } | null> {
  try {
    const secretRaw = process.env.NEXTAUTH_SECRET
    if (!secretRaw) {
      console.error('Socket auth: NEXTAUTH_SECRET is missing')
      return null
    }
    const secret = new TextEncoder().encode(secretRaw)
    const { payload } = await jwtVerify(token, secret)
    const decoded = payload as { id?: string; role?: string; email?: string; name?: string }

    // Validate required fields
    if (!decoded.id || decoded.role == null || decoded.role === '') {
      console.error('Socket auth: JWT missing required fields (id, role)')
      return null
    }

    // Normalize role to lowercase; socket handlers expect 'tutor' | 'student'
    const role = String(decoded.role).toLowerCase()
    const allowedRoles = ['student', 'tutor', 'parent', 'admin']
    const normalizedRole = allowedRoles.includes(role) ? role : 'student'

    return {
      userId: decoded.id,
      role: normalizedRole,
      email: decoded.email || '',
      name: decoded.name || '',
    }
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error)
    console.error('Socket auth: JWT validation failed:', msg)
    return null
  }
}

// Rate limiting function
function isRateLimited(connectionId: string): boolean {
  const now = Date.now()
  const state = connectionRateLimits.get(connectionId) || {
    tokens: RATE_LIMITS.maxEventsPerSecond,
    lastRefill: now,
  }

  // Refill tokens based on time elapsed
  const timePassed = now - state.lastRefill
  const tokensToAdd = Math.floor(
    timePassed / (RATE_LIMITS.windowSize / RATE_LIMITS.maxEventsPerSecond)
  )
  state.tokens = Math.min(RATE_LIMITS.maxEventsPerSecond, state.tokens + tokensToAdd)
  state.lastRefill = now

  if (state.tokens > 0) {
    state.tokens--
    connectionRateLimits.set(connectionId, state)
    return false // Not rate limited
  } else {
    connectionRateLimits.set(connectionId, state)
    return true // Rate limited
  }
}

// Memory management functions
function cleanupInactiveClassRooms() {
  const now = Date.now()
  let cleanedCount = 0

  activeRooms.forEach((room, roomId) => {
    const age = now - room.createdAt.getTime()
    const inactiveTime = now - room.lastActivity

    // Remove rooms older than 4 hours or inactive for 15+ minutes
    if (age > ROOM_MAX_AGE || (inactiveTime > ROOM_CLEANUP_INTERVAL && room.students.size === 0)) {
      // Persist room state to Redis if enabled
      if (redisClient) {
        persistRoomToRedis(roomId, room)
      }

      activeRooms.delete(roomId)
      cleanedCount++
      console.log(
        `Cleanup: Removed inactive room ${roomId} (age: ${Math.floor(age / 1000 / 60)}min, lastActivity: ${Math.floor(inactiveTime / 1000 / 60)}min)`
      )
    }
  })

  if (cleanedCount > 0) {
    console.log(`Cleanup: Removed ${cleanedCount} inactive rooms`)
  }
}

function cleanupInactiveDMRooms() {
  const now = Date.now()
  let cleanedCount = 0

  directMessageRooms.forEach((room, roomId) => {
    // Remove inactive rooms
    if (now - room.lastActivity > DM_MAX_AGE) {
      // Persist to Redis if needed (implement later)
      directMessageRooms.delete(roomId)
      cleanedCount++
      console.log(
        `Cleanup: Removed inactive DM room ${roomId} (lastActivity: ${Math.floor((now - room.lastActivity) / 1000 / 60)}min)`
      )
    }
  })

  if (cleanedCount > 0) {
    console.log(`Cleanup: Removed ${cleanedCount} inactive DM rooms`)
  }
}

function cleanupInactiveWhiteboards() {
  const now = Date.now()
  let cleanedCount = 0

  activeWhiteboards.forEach((wb, wbId) => {
    const age = now - wb.createdAt
    const inactiveTime = now - wb.lastActivity

    // Remove whiteboards older than 2 hours or with no active users for 10+ minutes
    if (
      age > WHITEBOARD_MAX_AGE ||
      (inactiveTime > WHITEBOARD_CLEANUP_INTERVAL && wb.activeUsers.size === 0)
    ) {
      // Persist to Redis if needed (implement later)
      activeWhiteboards.delete(wbId)
      cleanedCount++
      console.log(
        `Cleanup: Removed inactive whiteboard ${wbId} (age: ${Math.floor(age / 1000 / 60)}min, lastActivity: ${Math.floor(inactiveTime / 1000 / 60)}min)`
      )
    }
  })

  if (cleanedCount > 0) {
    console.log(`Cleanup: Removed ${cleanedCount} inactive whiteboards`)
  }
}

// Redis persistence helpers (stub implementation - expand later)
async function persistRoomToRedis(roomId: string, room: ClassRoom) {
  if (!redisClient) return

  try {
    await redisClient.setex(
      `room:${roomId}`,
      86400,
      JSON.stringify({
        id: room.id,
        tutorId: room.tutorId,
        students: Array.from(room.students.entries()),
        chatHistory: room.chatHistory,
        tasks: room.tasks,
        createdAt: room.createdAt,
        lastActivity: room.lastActivity,
      })
    )
  } catch (error) {
    console.error('Failed to persist room to Redis:', error)
  }
}

async function getRoomFromRedis(roomId: string): Promise<ClassRoom | null> {
  if (!redisClient) return null

  try {
    const data = await redisClient.get(`room:${roomId}`)
    if (!data) return null

    const parsed = JSON.parse(data)
    return {
      ...parsed,
      students: new Map(parsed.students),
      tasks: Array.isArray(parsed.tasks) ? parsed.tasks : [],
    }
  } catch (error) {
    console.error('Failed to retrieve room from Redis:', error)
    return null
  }
}

// Socket authentication middleware
async function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void) {
  try {
    const token = socket.handshake.auth.token

    if (!token) {
      return next(new Error('Authentication token required'))
    }

    const user = await validateJWT(token)
    if (!user) {
      return next(new Error('Invalid authentication token'))
    }

    // Attach user data to socket for use in event handlers
    socket.data.user = user
    socket.data.userId = user.userId
    socket.data.role = user.role
    socket.data.name = user.name
    socket.data.authenticated = true

    console.log(`Socket authenticated: ${socket.id} (role: ${user.role})`)
    next()
  } catch (error) {
    console.error('Socket authentication error:', error)
    next(new Error('Authentication failed'))
  }
}

// Per-event rate limiting middleware
function rateLimitMiddleware(socket: Socket, next: (err?: Error) => void) {
  const connectionId = socket.id

  try {
    if (isRateLimited(connectionId)) {
      return next(new Error('Rate limit exceeded'))
    }
    next()
  } catch (error) {
    console.error('Rate limiting error:', error)
    next(new Error('Rate limiting failed'))
  }
}

// Initialize Redis clients
/**
 * Initialize Redis clients with a timeout to prevent hanging the entire server startup.
 */
async function initRedis() {
  try {
    if (!process.env.REDIS_URL) {
      console.warn('⚠️ [Redis] REDIS_URL not set - proceeding with in-memory mode')
      return
    }

    const url = process.env.REDIS_URL
    const redisOptions: any = {
      retryStrategy: (times: number) => Math.min(times * 100, 3000),
      maxRetriesPerRequest: 3,
      lazyConnect: true, // Don't connect immediately
      connectTimeout: 5000, // 5 seconds timeout for connection attempts
    }

    console.log('[Redis] Initializing clients...')
    redisClient = new Redis(url, redisOptions)
    redisPubClient = new Redis(url, redisOptions)
    redisSubClient = new Redis(url, redisOptions)

    // Handle errors globally to prevent process crash
    const errorHandler = (name: string) => (err: Error) => {
      console.error(`❌ [Redis] ${name} error:`, err.message)
    }
    redisClient.on('error', errorHandler('Client'))
    redisPubClient.on('error', errorHandler('Pub'))
    redisSubClient.on('error', errorHandler('Sub'))

    // Attempt to connect in the background, don't wait for it to block startup
    console.log('[Redis] Connecting in background...')
    Promise.all([
      redisClient.connect().catch(() => {}),
      redisPubClient.connect().catch(() => {}),
      redisSubClient.connect().catch(() => {}),
    ]).then(() => {
      if (redisClient?.status === 'ready') {
        console.log('✅ [Redis] Connection successful')
      }
    })
  } catch (error) {
    console.error('❌ [Redis] Failed to initialize Redis config:', error)
    redisClient = null
    redisPubClient = null
    redisSubClient = null
  }
}

// Enhanced socket server initialization
export async function initEnhancedSocketServer(server: NetServer) {
  console.log('[Socket] Initializing enhanced server...')
  validateEnv()
  // Run Redis initialization in background, don't await to avoid blocking server readiness
  void initRedis()
  const intervalHandles: Array<ReturnType<typeof setInterval>> = []

  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN?.split(',') || [
        'http://localhost:3003',
        'http://localhost:3000',
      ],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  ioRef = io

  // Apply middleware
  io.use(socketAuthMiddleware)

  // Apply Redis adapter if available
  if (redisClient) {
    try {
      const { createAdapter } = await import('@socket.io/redis-adapter')
      io.adapter(createAdapter(redisPubClient, redisSubClient))
      console.log('Redis adapter configured for Socket.io')
    } catch (error) {
      console.error('Failed to configure Redis adapter - using in-memory:', error)
    }
  }

  // Start cleanup intervals
  intervalHandles.push(setInterval(cleanupInactiveClassRooms, ROOM_CLEANUP_INTERVAL))
  intervalHandles.push(setInterval(cleanupInactiveDMRooms, DM_CLEANUP_INTERVAL))
  intervalHandles.push(setInterval(cleanupInactiveWhiteboards, WHITEBOARD_CLEANUP_INTERVAL))
  intervalHandles.push(
    setInterval(
      () => {
        // Clean up old rate limit states
        const now = Date.now()
        connectionRateLimits.forEach((state, connectionId) => {
          if (now - state.lastRefill > 5 * 60 * 1000) {
            // 5 minutes
            connectionRateLimits.delete(connectionId)
          }
        })
      },
      5 * 60 * 1000
    )
  )

  io.on('connection', socket => {
    console.log(`Authenticated client connected: ${socket.id}`)
    setUserSocket(socket.data.userId, socket.id)

    // Apply token-bucket limiting to every incoming event packet.
    socket.use((_packet, next) => rateLimitMiddleware(socket, next))

    // Live-class whiteboard (lcwb_*) handlers — shared with socket-server.ts
    registerLiveClassWhiteboardHandlers(io, socket)

    // Feedback & Insights handlers — shared with socket-server.ts
    initFeedbackHandlers(io, socket)

    // Enhanced room management with authentication
    socket.on('join_class', async (data: { roomId: string; name?: string }) => {
      const { roomId, name } = data
      const userId = socket.data.userId
      const role = socket.data.role

      if (!userId) {
        socket.emit('error', { message: 'Authentication required' })
        return
      }
      setUserSocket(userId, socket.id)

      if (name !== undefined) socket.data.name = name
      socket.join(roomId)
      socket.data.roomId = roomId

      // Get or create room from Redis first, then memory
      let room = activeRooms.get(roomId)
      if (!room && redisClient) {
        const redisRoom = await getRoomFromRedis(roomId)
        if (redisRoom) {
          room = redisRoom
          activeRooms.set(roomId, room)
        }
      }

      if (!room) {
        room = {
          id: roomId,
          tutorId: userId,
          students: new Map(),
          chatHistory: [],
          tasks: [],
          createdAt: new Date(),
          lastActivity: Date.now(),
        }
        activeRooms.set(roomId, room)
      }

      // Add user to room with activity tracking
      role === 'student' ? addStudentToRoom(socket, room) : addTutorToRoom(socket, room)
    })

    socket.on('task:deploy', async (data: { roomId: string; task: LiveTask }) => {
      if (socket.data.role !== 'tutor') return
      const { roomId, task } = data
      if (!roomId || !task?.id) return
      const room = activeRooms.get(roomId)
      if (!room) return

      const normalizedTask: LiveTask = {
        id: task.id,
        title: task.title,
        content: task.content,
        source: task.source || 'task',
        dmiItems: task.dmiItems,
        deployedAt: task.deployedAt || Date.now(),
        polls: Array.isArray(task.polls) ? task.polls : [],
        questions: Array.isArray(task.questions) ? task.questions : [],
      }

      const existingIndex = room.tasks.findIndex(existing => existing.id === normalizedTask.id)
      if (existingIndex >= 0) {
        room.tasks[existingIndex] = {
          ...room.tasks[existingIndex],
          ...normalizedTask,
          polls: room.tasks[existingIndex].polls,
          questions: room.tasks[existingIndex].questions,
        }
      } else {
        room.tasks.push(normalizedTask)
      }

      room.lastActivity = Date.now()
      void persistRoomToRedis(roomId, room)
      io.to(roomId).emit('task:deployed', normalizedTask)
      io.to(roomId).emit('task:updated', { task: normalizedTask })
    })

    socket.on(
      'insight:send',
      (data: { roomId: string; taskId: string; type: 'poll' | 'question'; prompt: string }) => {
        if (socket.data.role !== 'tutor') return
        const { roomId, taskId, type, prompt } = data
        if (!roomId || !taskId) return
        const room = activeRooms.get(roomId)
        if (!room) return

        const task = room.tasks.find(item => item.id === taskId)
        if (!task) return

        if (type === 'poll') {
          const poll: LiveTaskPoll = {
            id: `poll-${taskId}-${Date.now()}`,
            taskId,
            question: prompt || 'Did you find this task difficult?',
            options: [1, 2, 3, 4, 5],
            status: 'open',
            responses: [],
            createdAt: Date.now(),
          }
          task.polls.push(poll)
          room.lastActivity = Date.now()
          void persistRoomToRedis(roomId, room)
          io.to(roomId).emit('insight:sent', { taskId, type: 'poll', item: poll })
          io.to(roomId).emit('task:updated', { task })
          return
        }

        const question: LiveTaskQuestion = {
          id: `question-${taskId}-${Date.now()}`,
          taskId,
          prompt: prompt || 'Do you have a question about this task?',
          responses: [],
          createdAt: Date.now(),
        }
        task.questions.push(question)
        room.lastActivity = Date.now()
        void persistRoomToRedis(roomId, room)
        io.to(roomId).emit('insight:sent', { taskId, type: 'question', item: question })
        io.to(roomId).emit('task:updated', { task })
      }
    )

    socket.on(
      'insight:respond',
      (data: {
        roomId: string
        taskId: string
        type: 'poll' | 'question'
        insightId: string
        value?: number
        answer?: string
      }) => {
        const { roomId, taskId, type, insightId, value, answer } = data
        if (!roomId || !taskId || !insightId) return
        const room = activeRooms.get(roomId)
        if (!room) return

        const task = room.tasks.find(item => item.id === taskId)
        if (!task) return

        if (type === 'poll') {
          const poll = task.polls.find(item => item.id === insightId)
          if (!poll || poll.status === 'closed' || typeof value !== 'number') return
          const studentId = socket.data.userId
          if (!studentId) return
          const existingIndex = poll.responses.findIndex(r => r.studentId === studentId)
          const response: LiveTaskPollResponse = {
            studentId,
            value,
            submittedAt: Date.now(),
          }
          if (existingIndex >= 0) {
            poll.responses[existingIndex] = response
          } else {
            poll.responses.push(response)
          }
          room.lastActivity = Date.now()
          void persistRoomToRedis(roomId, room)
          io.to(roomId).emit('insight:response', { taskId, type: 'poll', item: poll })
          io.to(roomId).emit('task:updated', { task })
          return
        }

        const question = task.questions.find(item => item.id === insightId)
        if (!question) return
        const studentId = socket.data.userId
        if (!studentId || !answer?.trim()) return
        const existingIndex = question.responses.findIndex(r => r.studentId === studentId)
        const response: LiveTaskQuestionResponse = {
          studentId,
          answer: answer.trim(),
          submittedAt: Date.now(),
        }
        if (existingIndex >= 0) {
          question.responses[existingIndex] = response
        } else {
          question.responses.push(response)
        }
        room.lastActivity = Date.now()
        void persistRoomToRedis(roomId, room)
        io.to(roomId).emit('insight:response', { taskId, type: 'question', item: question })
        io.to(roomId).emit('task:updated', { task })
      }
    )

    // Enhanced disconnect handler with cleanup
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`)

      // Clean up various states
      const userId = socket.data.userId
      const roomId = socket.data.roomId

      clearUserSocketIfCurrent(userId, socket.id)

      if (roomId && userId) {
        const room = activeRooms.get(roomId)
        if (room && socket.data.role === 'student') {
          room.students.delete(userId)
          room.lastActivity = Date.now()
          socket.to(roomId).emit('student_left', { userId })
        }
        io.to(roomId).emit('lcwb_cursor_remove', { userId })
        cleanupLcwbPresence(io, roomId, userId)
      }

      // Connection rate limit cleanup
      connectionRateLimits.delete(socket.id)
    })
  })

  const originalClose = io.close.bind(io)
  io.close = ((cb?: (err?: Error) => void) => {
    intervalHandles.forEach(handle => clearInterval(handle))
    intervalHandles.length = 0

    const closeRedis = async () => {
      try {
        await Promise.allSettled([
          redisClient?.quit?.() ?? Promise.resolve(),
          redisPubClient?.quit?.() ?? Promise.resolve(),
          redisSubClient?.quit?.() ?? Promise.resolve(),
        ])
      } catch {
        // best-effort cleanup
      } finally {
        redisClient = null
        redisPubClient = null
        redisSubClient = null
      }
    }

    void closeRedis()
    return originalClose(cb)
  }) as SocketIOServer['close']

  return io
}

// Helper functions (implementing join_class logic)
function addStudentToRoom(socket: Socket, room: ClassRoom) {
  const studentState: StudentState = {
    userId: socket.data.userId,
    name: socket.data.name,
    status: 'on_track',
    engagement: 100,
    understanding: 80,
    frustration: 0,
    lastActivity: Date.now(),
    joinedAt: Date.now(),
  }

  room.students.set(socket.data.userId, studentState)
  room.lastActivity = Date.now()

  socket.to(room.id).emit('student_joined', {
    userId: socket.data.userId,
    name: socket.data.name,
    state: studentState,
  })

  socket.emit('room_state', {
    students: Array.from(room.students.values()),
    chatHistory: room.chatHistory.slice(-50),
    whiteboardData: room.whiteboardData,
    tasks: room.tasks,
  })
}

function addTutorToRoom(socket: Socket, room: ClassRoom) {
  room.lastActivity = Date.now()

  socket.emit('room_state', {
    students: Array.from(room.students.values()),
    chatHistory: room.chatHistory,
    whiteboardData: room.whiteboardData,
    tasks: room.tasks,
  })
}

// Export helper functions for external use
export function getRoomState(roomId: string): ClassRoom | undefined {
  return activeRooms.get(roomId)
}

export function getWhiteboardState(whiteboardId: string): WhiteboardState | undefined {
  return activeWhiteboards.get(whiteboardId)
}

export function isUserOnline(userId: string): boolean {
  return userSocketMap.has(userId)
}

export function getUserSocketId(userId: string): string | undefined {
  return userSocketMap.get(userId)
}

export function emitToUser(userId: string, event: string, data: unknown) {
  if (!ioRef) return
  const socketId = userSocketMap.get(userId)
  if (socketId) {
    ioRef.to(socketId).emit(event, data)
  }
}

/**
 * Internal hooks for deterministic unit tests.
 * Not used by runtime code.
 */
export const socketRateLimitTesting = {
  isRateLimited,
  reset() {
    connectionRateLimits.clear()
  },
  limits: RATE_LIMITS,
  presence: {
    set: setUserSocket,
    clearIfCurrent: clearUserSocketIfCurrent,
    get(userId: string) {
      return userSocketMap.get(userId)
    },
    reset() {
      userSocketMap.clear()
    },
  },
}
