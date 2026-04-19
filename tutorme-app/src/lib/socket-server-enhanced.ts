/**
 * Enhanced Socket.io Server with Authentication and Memory Management
 * Critical fixes for production deployment
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import Redis from 'ioredis'
import * as Sentry from '@sentry/nextjs'
import { eq, and, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { liveSession, poll, pollOption, pollResponse, courseEnrollment } from '@/lib/db/schema'
import {
  registerLiveClassWhiteboardHandlers,
  cleanupLcwbPresence,
  initFeedbackHandlers,
} from './socket-server'
import { activePolls, sessionPolls, cleanupStaleSocketState } from '@/lib/socket'
import type { PollState } from '@/lib/socket'
import { socketAuthMiddleware } from './socket/socket-auth'

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

export interface LiveTaskSourceDocument {
  fileName: string
  fileUrl: string
  mimeType: string
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
  sourceDocument?: LiveTaskSourceDocument
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
      if (process.env.NODE_ENV === 'production') {
        Sentry.captureException(err, {
          tags: { service: 'redis', client: name },
          level: 'fatal',
          extra: {
            message: 'Redis connection failed in production, multi-node socket sync will be broken',
          },
        })
      }
    }
    redisClient.on('error', errorHandler('Client'))
    redisPubClient.on('error', errorHandler('Pub'))
    redisSubClient.on('error', errorHandler('Sub'))

    // Attempt to connect in the background, don't wait for it to block startup
    console.log('[Redis] Connecting in background...')
    Promise.all([
      redisClient.connect().catch(err => console.error('[Redis] Client connection failed:', err)),
      redisPubClient
        .connect()
        .catch(err => console.error('[Redis] Pub client connection failed:', err)),
      redisSubClient
        .connect()
        .catch(err => console.error('[Redis] Sub client connection failed:', err)),
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
  // Await Redis initialization so adapter attaches before server creation
  await initRedis()
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
  intervalHandles.push(setInterval(cleanupStaleSocketState, 5 * 60 * 1000))
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

      socket.on('chat_message', ({ text }: { text: string }) => {
        if (!text || typeof text !== 'string') return
        const room = activeRooms.get(roomId)
        if (!room) return
        const msg: ChatMessage = {
          id: crypto.randomUUID(),
          userId,
          name: socket.data.name || 'Anonymous',
          text: text.slice(0, 1000),
          timestamp: Date.now(),
        }
        room.chatHistory = room.chatHistory || []
        room.chatHistory.push(msg)
        io.to(roomId).emit('chat_message', msg)
      })

      // Get or create room from Redis first, then memory
      let room = activeRooms.get(roomId)
      if (!room && redisClient) {
        const redisRoom = await getRoomFromRedis(roomId)
        if (redisRoom) {
          room = redisRoom
          activeRooms.set(roomId, room)
        }
      }

      // Determine effective role — verify tutor privileges against DB before granting them
      let effectiveRole = role
      if (effectiveRole !== 'student') {
        const scheduledTutorId = await (async (): Promise<string | null> => {
          try {
            const [session] = await drizzleDb
              .select({ tutorId: liveSession.tutorId })
              .from(liveSession)
              .where(eq(liveSession.roomId, roomId))
              .limit(1)
            return session?.tutorId ?? null
          } catch {
            return null
          }
        })()
        if (userId !== scheduledTutorId) {
          effectiveRole = 'student'
        }
      }

      if (effectiveRole === 'student') {
        const liveSessionRow = await drizzleDb.query.liveSession.findFirst({
          where: eq(liveSession.roomId, roomId),
        })
        if (liveSessionRow?.courseId) {
          const enrolled = await drizzleDb.query.courseEnrollment.findFirst({
            where: and(
              eq(courseEnrollment.studentId, userId),
              eq(courseEnrollment.courseId, liveSessionRow.courseId)
            ),
          })
          if (!enrolled) {
            socket.emit('error', { message: 'You are not enrolled in this course' })
            return
          }
        }
      }

      if (!room) {
        const roomTutorId =
          effectiveRole !== 'student'
            ? userId
            : await (async (): Promise<string> => {
                try {
                  const [session] = await drizzleDb
                    .select({ tutorId: liveSession.tutorId })
                    .from(liveSession)
                    .where(eq(liveSession.roomId, roomId))
                    .limit(1)
                  return session?.tutorId ?? ''
                } catch {
                  return ''
                }
              })()

        room = {
          id: roomId,
          tutorId: roomTutorId,
          students: new Map(),
          chatHistory: [],
          tasks: [],
          createdAt: new Date(),
          lastActivity: Date.now(),
        }
        activeRooms.set(roomId, room)
      }

      // Hydrate active polls from DB for late joiners
      try {
        const liveSessionRow = await drizzleDb.query.liveSession.findFirst({
          where: eq(liveSession.roomId, roomId),
        })
        if (liveSessionRow) {
          const activeDbPolls = await drizzleDb.query.poll.findMany({
            where: and(eq(poll.sessionId, liveSessionRow.sessionId), eq(poll.status, 'ACTIVE')),
          })
          if (activeDbPolls.length > 0) {
            const pollIds = activeDbPolls.map(p => p.pollId)
            const allOptions = await drizzleDb
              .select()
              .from(pollOption)
              .where(inArray(pollOption.pollId, pollIds))
            const allResponses = await drizzleDb
              .select()
              .from(pollResponse)
              .where(inArray(pollResponse.pollId, pollIds))
            for (const dbPoll of activeDbPolls) {
              const options = allOptions.filter(o => o.pollId === dbPoll.pollId)
              const responses = allResponses.filter(r => r.pollId === dbPoll.pollId)
              const pollState: PollState = {
                id: dbPoll.pollId,
                sessionId: dbPoll.sessionId,
                tutorId: dbPoll.tutorId,
                question: dbPoll.question,
                type:
                  dbPoll.type === 'MULTIPLE_CHOICE'
                    ? 'multiple_choice'
                    : dbPoll.type === 'TRUE_FALSE'
                      ? 'true_false'
                      : dbPoll.type === 'RATING'
                        ? 'rating'
                        : dbPoll.type === 'SHORT_ANSWER'
                          ? 'short_answer'
                          : 'word_cloud',
                options: options.map(opt => ({
                  id: opt.optionId,
                  label: opt.label,
                  text: opt.text,
                  color: opt.color || undefined,
                })),
                isAnonymous: dbPoll.isAnonymous,
                allowMultiple: dbPoll.allowMultiple,
                showResults: dbPoll.showResults,
                timeLimit: dbPoll.timeLimit ?? undefined,
                status:
                  dbPoll.status === 'ACTIVE'
                    ? 'active'
                    : dbPoll.status === 'CLOSED'
                      ? 'closed'
                      : 'draft',
                startedAt: dbPoll.startedAt ? new Date(dbPoll.startedAt).getTime() : undefined,
                endedAt: dbPoll.endedAt ? new Date(dbPoll.endedAt).getTime() : undefined,
                responses: responses.map(resp => ({
                  id: resp.responseId,
                  respondentHash: resp.respondentHash || undefined,
                  optionIds: resp.optionIds,
                  rating: resp.rating ?? undefined,
                  textAnswer: resp.textAnswer || undefined,
                  studentId: resp.studentId || undefined,
                  createdAt: new Date(resp.createdAt).getTime(),
                })),
              }
              activePolls.set(dbPoll.pollId, pollState)
              if (!sessionPolls.has(dbPoll.sessionId)) {
                sessionPolls.set(dbPoll.sessionId, new Set())
              }
              sessionPolls.get(dbPoll.sessionId)!.add(dbPoll.pollId)
            }
          }
        }
      } catch (err) {
        console.error('Failed to hydrate polls:', err)
      }

      // Add user to room with activity tracking
      effectiveRole === 'student' ? addStudentToRoom(socket, room) : addTutorToRoom(socket, room)
    })

    // Poll handlers with DB persistence
    socket.on('poll:join', (data: { sessionId: string }) => {
      socket.join(`poll:${data.sessionId}`)
      socket.data.pollSessionId = data.sessionId
    })

    socket.on('poll:leave', (data: { sessionId: string }) => {
      socket.leave(`poll:${data.sessionId}`)
      delete socket.data.pollSessionId
    })

    socket.on(
      'poll:create',
      async (data: {
        sessionId: string
        question: string
        type: string
        options: { label: string; text: string }[]
        isAnonymous: boolean
        allowMultiple: boolean
        showResults: boolean
        timeLimit?: number
      }) => {
        if (socket.data.role !== 'tutor') return

        const liveSessionRow = await drizzleDb.query.liveSession.findFirst({
          where: eq(liveSession.roomId, data.sessionId),
        })
        const dbSessionId = liveSessionRow?.sessionId ?? data.sessionId

        const pollId = crypto.randomUUID()
        const now = new Date()

        await drizzleDb.insert(poll).values({
          pollId,
          sessionId: dbSessionId,
          tutorId: socket.data.userId,
          question: data.question,
          type:
            data.type === 'multiple_choice'
              ? 'MULTIPLE_CHOICE'
              : data.type === 'true_false'
                ? 'TRUE_FALSE'
                : data.type === 'rating'
                  ? 'RATING'
                  : data.type === 'short_answer'
                    ? 'SHORT_ANSWER'
                    : 'WORD_CLOUD',
          isAnonymous: data.isAnonymous,
          allowMultiple: data.allowMultiple,
          showResults: data.showResults,
          timeLimit: data.timeLimit,
          status: 'ACTIVE',
          totalResponses: 0,
          createdAt: now,
          updatedAt: now,
        })

        const optionsToInsert = data.options.map((opt, i) => ({
          optionId: `opt-${pollId}-${i}`,
          pollId,
          label: opt.label || String.fromCharCode(65 + i),
          text: opt.text,
          color: getPollOptionColor(i),
          responseCount: 0,
          percentage: 0,
        }))

        if (optionsToInsert.length > 0) {
          await drizzleDb.insert(pollOption).values(optionsToInsert)
        }

        const pollState: PollState = {
          id: pollId,
          sessionId: data.sessionId,
          tutorId: socket.data.userId,
          question: data.question,
          type: data.type as PollState['type'],
          options: optionsToInsert.map(opt => ({
            id: opt.optionId,
            label: opt.label,
            text: opt.text,
            color: opt.color,
          })),
          isAnonymous: data.isAnonymous,
          allowMultiple: data.allowMultiple,
          showResults: data.showResults,
          timeLimit: data.timeLimit,
          status: 'active',
          responses: [],
        }

        activePolls.set(pollId, pollState)
        if (!sessionPolls.has(data.sessionId)) {
          sessionPolls.set(data.sessionId, new Set())
        }
        sessionPolls.get(data.sessionId)!.add(pollId)

        io.to(`poll:${data.sessionId}`).emit('poll:created', formatPollForBroadcast(pollState))
      }
    )

    socket.on('poll:start', (data: { pollId: string; sessionId: string }) => {
      if (socket.data.role !== 'tutor') return

      const pollState = activePolls.get(data.pollId)
      if (!pollState || pollState.sessionId !== data.sessionId) return

      pollState.status = 'active'
      pollState.startedAt = Date.now()

      if (pollState.timeLimit) {
        pollState.timer = setTimeout(() => {
          endPoll(io, data.pollId)
        }, pollState.timeLimit * 1000)
      }

      io.to(`poll:${data.sessionId}`).emit('poll:started', formatPollForBroadcast(pollState))
    })

    socket.on('poll:end', async (data: { pollId: string; sessionId: string }) => {
      if (socket.data.role !== 'tutor') return

      await drizzleDb
        .update(poll)
        .set({
          status: 'CLOSED',
          endedAt: new Date(),
        })
        .where(eq(poll.pollId, data.pollId))

      endPoll(io, data.pollId)
    })

    socket.on('poll:delete', async (data: { pollId: string; sessionId: string }) => {
      if (socket.data.role !== 'tutor') return

      const pollState = activePolls.get(data.pollId)
      if (!pollState || pollState.sessionId !== data.sessionId) return

      await drizzleDb
        .update(poll)
        .set({
          status: 'CLOSED',
          endedAt: new Date(),
        })
        .where(eq(poll.pollId, data.pollId))

      if (pollState.timer) {
        clearTimeout(pollState.timer)
      }

      activePolls.delete(data.pollId)
      sessionPolls.get(data.sessionId)?.delete(data.pollId)

      io.to(`poll:${data.sessionId}`).emit('poll:deleted', data.pollId)
    })

    socket.on(
      'poll:vote',
      async (data: {
        pollId: string
        sessionId: string
        optionIds?: string[]
        rating?: number
        textAnswer?: string
      }) => {
        const pollState = activePolls.get(data.pollId)
        if (!pollState || pollState.sessionId !== data.sessionId) return
        if (pollState.status !== 'active') return

        const userId = socket.data.userId

        if (!pollState.isAnonymous) {
          const existingVote = pollState.responses.find(r => r.studentId === userId)
          if (existingVote) return
        } else {
          const respondentHash = await hashString(`${userId}:${data.pollId}`)
          const existingVote = pollState.responses.find(r => r.respondentHash === respondentHash)
          if (existingVote) return
        }

        const responseId = crypto.randomUUID()
        const respondentHash = pollState.isAnonymous
          ? await hashString(`${userId}:${data.pollId}`)
          : undefined

        await drizzleDb.insert(pollResponse).values({
          responseId,
          pollId: data.pollId,
          respondentHash,
          optionIds: data.optionIds || [],
          rating: data.rating,
          textAnswer: data.textAnswer,
          studentId: pollState.isAnonymous ? undefined : userId,
          createdAt: new Date(),
        })

        const response = {
          id: responseId,
          respondentHash,
          optionIds: data.optionIds,
          rating: data.rating,
          textAnswer: data.textAnswer,
          studentId: pollState.isAnonymous ? undefined : userId,
          createdAt: Date.now(),
        }

        pollState.responses.push(response)

        io.to(`poll:${data.sessionId}`).emit('poll:updated', formatPollForBroadcast(pollState))
        socket.emit('poll:vote:confirmed', { pollId: data.pollId })
      }
    )

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

function formatPollForBroadcast(pollState: PollState) {
  return {
    id: pollState.id,
    sessionId: pollState.sessionId,
    tutorId: pollState.tutorId,
    question: pollState.question,
    type: pollState.type,
    options: pollState.options,
    isAnonymous: pollState.isAnonymous,
    allowMultiple: pollState.allowMultiple,
    showResults: pollState.showResults,
    timeLimit: pollState.timeLimit,
    status: pollState.status,
    startedAt: pollState.startedAt ? new Date(pollState.startedAt).toISOString() : undefined,
    endedAt: pollState.endedAt ? new Date(pollState.endedAt).toISOString() : undefined,
    responses: pollState.responses.map(r => ({
      id: r.id,
      optionIds: r.optionIds,
      rating: r.rating,
      textAnswer: r.textAnswer,
      studentId: pollState.isAnonymous ? undefined : r.studentId,
      createdAt: new Date(r.createdAt).toISOString(),
    })),
    totalResponses: pollState.responses.length,
    createdAt: new Date().toISOString(),
  }
}

function endPoll(io: SocketIOServer, pollId: string) {
  const pollState = activePolls.get(pollId)
  if (!pollState || pollState.status === 'closed') return

  pollState.status = 'closed'
  pollState.endedAt = Date.now()

  if (pollState.timer) {
    clearTimeout(pollState.timer)
    pollState.timer = undefined
  }

  io.to(`poll:${pollState.sessionId}`).emit('poll:ended', formatPollForBroadcast(pollState))
}

function getPollOptionColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
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
