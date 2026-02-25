/**
 * Enhanced Socket.io Server with Authentication and Memory Management
 * Critical fixes for production deployment
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import { verify } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { createClient } from 'redis'
import { promisify } from 'util'

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
  whiteboardData?: any
  chatHistory: ChatMessage[]
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

// Environment validation
function validateEnv() {
  const required = ['NEXTAUTH_SECRET', 'REDIS_URL']
  const missing = required.filter(key => !process.env[key])
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Redis configuration
let redisClient: any = null
let redisPubClient: any = null
let redisSubClient: any = null

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
  windowSize: 1000 // 1 second
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

// Authentication functions
async function validateJWT(token: string): Promise<{ userId: string; role: string; email: string; name: string } | null> {
  try {
    const decoded = verify(token, process.env.NEXTAUTH_SECRET!) as any
    
    // Validate required fields
    if (!decoded.id || !decoded.role) {
      console.error('Invalid JWT: missing required fields')
      return null
    }

    return {
      userId: decoded.id,
      role: decoded.role,
      email: decoded.email || '',
      name: decoded.name || ''
    }
  } catch (error) {
    console.error('JWT validation failed:', error)
    return null
  }
}

// Rate limiting function
function isRateLimited(connectionId: string): boolean {
  const now = Date.now()
  const state = connectionRateLimits.get(connectionId) || { tokens: RATE_LIMITS.maxEventsPerSecond, lastRefill: now }

  // Refill tokens based on time elapsed
  const timePassed = now - state.lastRefill
  const tokensToAdd = Math.floor(timePassed / (RATE_LIMITS.windowSize / RATE_LIMITS.maxEventsPerSecond))
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
      console.log(`Cleanup: Removed inactive room ${roomId} (age: ${Math.floor(age/1000/60)}min, lastActivity: ${Math.floor(inactiveTime/1000/60)}min)`)
    }
  })

  console.log(`Cleanup: Removed ${cleanedCount} inactive rooms`)
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
      console.log(`Cleanup: Removed inactive DM room ${roomId} (lastActivity: ${Math.floor((now - room.lastActivity)/1000/60)}min)`)
    }
  })

  console.log(`Cleanup: Removed ${cleanedCount} inactive DM rooms`)
}

function cleanupInactiveWhiteboards() {
  const now = Date.now()
  let cleanedCount = 0

  activeWhiteboards.forEach((wb, wbId) => {
    const age = now - wb.createdAt
    const inactiveTime = now - wb.lastActivity
    
    // Remove whiteboards older than 2 hours or with no active users for 10+ minutes
    if (age > WHITEBOARD_MAX_AGE || (inactiveTime > WHITEBOARD_CLEANUP_INTERVAL && wb.activeUsers.size === 0)) {
      // Persist to Redis if needed (implement later)
      activeWhiteboards.delete(wbId)
      cleanedCount++
      console.log(`Cleanup: Removed inactive whiteboard ${wbId} (age: ${Math.floor(age/1000/60)}min, lastActivity: ${Math.floor(inactiveTime/1000/60)}min)`)
    }
  })

  console.log(`Cleanup: Removed ${cleanedCount} inactive whiteboards`)
}

// Redis persistence helpers (stub implementation - expand later)
async function persistRoomToRedis(roomId: string, room: ClassRoom) {
  if (!redisClient) return
  
  try {
    await redisClient.setex(`room:${roomId}`, 86400, JSON.stringify({
      id: room.id,
      tutorId: room.tutorId,
      students: Array.from(room.students.entries()),
      chatHistory: room.chatHistory,
      createdAt: room.createdAt,
      lastActivity: room.lastActivity
    }))
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
      students: new Map(parsed.students)
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

    console.log(`Socket authenticated: ${user.userId} (${user.role})`)
    next()
  } catch (error) {
    console.error('Socket authentication error:', error)
    next(new Error('Authentication failed'))
  }
}

// Rate limiting middleware
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
async function initRedis() {
  try {
    if (!process.env.REDIS_URL) {
      console.warn('REDIS_URL not set - Redis features disabled')
      return
    }

    redisClient = createClient({ 
      url: process.env.REDIS_URL,
      socket: { keepAlive: true }
    })
    
    redisPubClient = redisClient.duplicate()
    redisSubClient = redisClient.duplicate()

    await Promise.all([
      redisClient.connect(),
      redisPubClient.connect(),
      redisSubClient.connect()
    ])

    console.log('Redis clients initialized successfully')
  } catch (error) {
    console.error('Failed to initialize Redis:', error)
    redisClient = null
    redisPubClient = null
    redisSubClient = null
  }
}

// Enhanced socket server initialization
export async function initEnhancedSocketServer(server: NetServer) {
  validateEnv()
  await initRedis()

  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: process.env.SOCKET_CORS_ORIGIN?.split(',') || [
        'http://localhost:3003',
        'http://localhost:3000'
      ],
      methods: ['GET', 'POST'],
      credentials: true
    },
    // Redis adapter configuration
    adapter: redisClient ? undefined : undefined, // Will set later if Redis available
  })

  // Apply middleware
  io.use(socketAuthMiddleware)
  io.use(rateLimitMiddleware)

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
  setInterval(cleanupInactiveClassRooms, ROOM_CLEANUP_INTERVAL)
  setInterval(cleanupInactiveDMRooms, DM_CLEANUP_INTERVAL)  
  setInterval(cleanupInactiveWhiteboards, WHITEBOARD_CLEANUP_INTERVAL)
  setInterval(() => {
    // Clean up old rate limit states
    const now = Date.now()
    connectionRateLimits.forEach((state, connectionId) => {
      if (now - state.lastRefill > 5 * 60 * 1000) { // 5 minutes
        connectionRateLimits.delete(connectionId)
      }
    })
  }, 5 * 60 * 1000)

  io.on('connection', (socket) => {
    console.log(`Authenticated client connected: ${socket.id} (user: ${socket.data.userId})`)

    // Enhanced room management with authentication
    socket.on('join_class', async (data: { roomId: string }) => {
      const { roomId } = data
      const userId = socket.data.userId
      const role = socket.data.role
      
      if (!userId) {
        socket.emit('error', { message: 'Authentication required' })
        return
      }

      socket.join(roomId)
      socket.data.roomId = roomId

      // Get or create room from Redis first, then memory
      let room = activeRooms.get(roomId)
      if (!room && redisClient) {
        room = await getRoomFromRedis(roomId)
        if (room) {
          activeRooms.set(roomId, room)
        }
      }
      
      if (!room) {
        room = {
          id: roomId,
          tutorId: userId,
          students: new Map(),
          chatHistory: [],
          createdAt: new Date(),
          lastActivity: Date.now()
        }
        activeRooms.set(roomId, room)
      }

      // Add user to room with activity tracking
      role === 'student' ? addStudentToRoom(socket, room) : addTutorToRoom(socket, room)
    })

    // Enhanced disconnect handler with cleanup
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id} (user: ${socket.data.userId})`)
      
      // Clean up various states
      const userId = socket.data.userId
      const roomId = socket.data.roomId
      
      if (userId) {
        userSocketMap.delete(userId)
      }
      
      if (roomId) {
        const room = activeRooms.get(roomId)
        if (room && socket.data.role === 'student') {
          room.students.delete(userId)
          room.lastActivity = Date.now()
          socket.to(roomId).emit('student_left', { userId })
        }
      }

      // Connection rate limit cleanup
      connectionRateLimits.delete(socket.id)
    })

    // Copy existing handlers from original file (I'll implement the most critical ones)
    // For now, we'll focus on the core authentication and cleanup
  })

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
    joinedAt: Date.now()
  }
  
  room.students.set(socket.data.userId, studentState)
  room.lastActivity = Date.now()
  
  socket.to(room.id).emit('student_joined', { 
    userId: socket.data.userId, 
    name: socket.data.name, 
    state: studentState 
  })
  
  socket.emit('room_state', {
    students: Array.from(room.students.values()),
    chatHistory: room.chatHistory.slice(-50),
    whiteboardData: room.whiteboardData
  })
}

function addTutorToRoom(socket: Socket, room: ClassRoom) {
  room.lastActivity = Date.now()
  
  socket.emit('room_state', {
    students: Array.from(room.students.values()),
    chatHistory: room.chatHistory,
    whiteboardData: room.whiteboardData
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