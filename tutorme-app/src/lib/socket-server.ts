/**
 * Socket.io Server for Live Class System
 * Handles real-time communication between students, tutors, and AI
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import * as Y from 'yjs'
import { generateWithFallback } from '@/lib/ai/orchestrator'

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
  whiteboardData?: unknown[]
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
// PDF TUTORING COLLAB STATE
// ============================================

interface PdfCollabRoomState {
  roomId: string
  locked: boolean
  ownerId?: string
  lastActivity: number
  participants: Map<string, { userId?: string; name: string; role: 'student' | 'tutor'; joinedAt: number }>
  events: Array<{
    page: number
    action: 'created' | 'modified' | 'removed' | 'sync-request'
    object?: Record<string, unknown>
    objectId?: string
    actorId?: string
    sentAt: number
  }>
}

const pdfCollabRooms = new Map<string, PdfCollabRoomState>()

interface LiveDocumentShare {
  shareId: string
  classRoomId: string
  ownerId: string
  ownerName: string
  assignedStudentId?: string
  templateShareId?: string
  title: string
  description?: string
  fileUrl: string
  mimeType?: string
  pdfRoomId: string
  visibleToAll: boolean
  allowCollaborativeWrite: boolean
  collaborationPolicy?: {
    allowDrawing: boolean
    allowTyping: boolean
    allowShapes: boolean
  }
  active: boolean
  submissions?: Array<{ userId: string; userName: string; submittedAt: number }>
  updatedAt: number
}

const liveDocumentShares = new Map<string, Map<string, LiveDocumentShare>>()

const getPdfCollabRoom = (roomId: string): PdfCollabRoomState => {
  const key = `pdf:${roomId}`
  let room = pdfCollabRooms.get(key)
  if (!room) {
    room = {
      roomId: key,
      locked: false,
      ownerId: undefined,
      lastActivity: Date.now(),
      participants: new Map(),
      events: [],
    }
    pdfCollabRooms.set(key, room)
  }
  return room
}

const getLiveDocumentShareMap = (classRoomId: string): Map<string, LiveDocumentShare> => {
  let shareMap = liveDocumentShares.get(classRoomId)
  if (!shareMap) {
    shareMap = new Map<string, LiveDocumentShare>()
    liveDocumentShares.set(classRoomId, shareMap)
  }
  return shareMap
}

const expandLiveShareForStudents = (
  classRoomId: string,
  template: LiveDocumentShare
): LiveDocumentShare[] => {
  const room = activeRooms.get(classRoomId)
  if (!room) return []

  const now = Date.now()
  const clones: LiveDocumentShare[] = []
  room.students.forEach((studentState, studentId) => {
    clones.push({
      ...template,
      shareId: `${template.shareId}::${studentId}`,
      ownerId: studentId,
      ownerName: studentState.name,
      assignedStudentId: studentId,
      templateShareId: template.shareId,
      visibleToAll: false,
      active: true,
      pdfRoomId: `${template.pdfRoomId}:student:${studentId}`,
      updatedAt: now,
    })
  })
  return clones
}

// ============================================
// WHITEBOARD STATE
// ============================================

interface WhiteboardStroke {
  id: string
  points: Array<{ x: number; y: number; pressure?: number }>
  color: string
  width: number
  type: 'pen' | 'eraser' | 'pencil' | 'marker' | 'highlighter' | 'calligraphy' | 'shape' | 'text'
  userId: string
  opacity?: number
  shapeType?: 'line' | 'arrow' | 'rectangle' | 'circle' | 'triangle' | 'connector'
  text?: string
  fontSize?: number
  fontFamily?: string
  textStyle?: {
    bold?: boolean
    italic?: boolean
    align?: 'left' | 'center' | 'right'
  }
  layerId?: 'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'
  roomScope?: 'main' | 'breakout'
  groupId?: string
  zIndex?: number
  locked?: boolean
  rotation?: number
  createdAt?: number
  updatedAt?: number
  sourceStrokeId?: string
  targetStrokeId?: string
  sourcePort?: 'top' | 'right' | 'bottom' | 'left' | 'center'
  targetPort?: 'top' | 'right' | 'bottom' | 'left' | 'center'
}

interface WhiteboardStrokeOp {
  kind: 'upsert' | 'delete'
  stroke?: WhiteboardStroke
  strokeId?: string
  opId?: string
  sentAt?: number
  baseVersion?: number
}

interface WhiteboardSelectionPresence {
  userId: string
  name: string
  role: 'tutor' | 'student'
  strokeIds: string[]
  pageId?: string
  color: string
  updatedAt: number
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

interface WhiteboardOpMetricsState {
  key: string
  roomId: string
  boardScope: 'tutor' | 'student'
  studentId?: string
  lastActivity: number
  receivedOps: number
  appliedOps: number
  conflictDrops: number
  duplicateDrops: number
  malformedDrops: number
  queueDepth: number
  maxQueueDepth: number
  replayRequests: number
  recentAppliedTimestamps: number[]
}

export interface WhiteboardOpObservabilitySnapshot {
  key: string
  roomId: string
  boardScope: 'tutor' | 'student'
  studentId?: string
  lastActivity: number
  receivedOps: number
  appliedOps: number
  conflictDrops: number
  duplicateDrops: number
  malformedDrops: number
  queueDepth: number
  maxQueueDepth: number
  replayRequests: number
  opsPerSecond: number
  activeStrokeCount: number
  deadLetterDepth: number
}

const whiteboardOpMetrics = new Map<string, WhiteboardOpMetricsState>()
const whiteboardSelectionPresence = new Map<string, Map<string, WhiteboardSelectionPresence>>()
const whiteboardOpSeenIds = new Map<string, Set<string>>()
const whiteboardDeadLetters = new Map<string, Array<{
  at: number
  reason: 'malformed' | 'duplicate' | 'causal'
  op: WhiteboardStrokeOp
}>>()
const whiteboardOpLog = new Map<string, Array<{
  seq: number
  at: number
  op: WhiteboardStrokeOp
}>>()
const whiteboardOpSeq = new Map<string, number>()
const whiteboardBranches = new Map<string, Map<string, WhiteboardStroke[]>>()

const parseWhiteboardMetricKey = (key: string): {
  roomId: string
  boardScope: 'tutor' | 'student'
  studentId?: string
} => {
  if (key.startsWith('lcwb:tutor:')) {
    return { roomId: key.replace('lcwb:tutor:', ''), boardScope: 'tutor' }
  }
  if (key.startsWith('lcwb:')) {
    const parts = key.split(':')
    return {
      roomId: parts[1] || 'unknown',
      boardScope: 'student',
      studentId: parts[2],
    }
  }
  return { roomId: key, boardScope: 'student' }
}

const getWhiteboardOpMetric = (key: string): WhiteboardOpMetricsState => {
  let metric = whiteboardOpMetrics.get(key)
  if (!metric) {
    const parsed = parseWhiteboardMetricKey(key)
    metric = {
      key,
      roomId: parsed.roomId,
      boardScope: parsed.boardScope,
      studentId: parsed.studentId,
      lastActivity: Date.now(),
      receivedOps: 0,
      appliedOps: 0,
      conflictDrops: 0,
      duplicateDrops: 0,
      malformedDrops: 0,
      queueDepth: 0,
      maxQueueDepth: 0,
      replayRequests: 0,
      recentAppliedTimestamps: [],
    }
    whiteboardOpMetrics.set(key, metric)
  }
  return metric
}

const trimWhiteboardOpTimestamps = (metric: WhiteboardOpMetricsState) => {
  const cutoff = Date.now() - 60_000
  metric.recentAppliedTimestamps = metric.recentAppliedTimestamps.filter((ts) => ts >= cutoff)
}

export function getWhiteboardOpObservability(roomId?: string): WhiteboardOpObservabilitySnapshot[] {
  const rows: WhiteboardOpObservabilitySnapshot[] = []
  whiteboardOpMetrics.forEach((metric) => {
    if (roomId && metric.roomId !== roomId) return
    trimWhiteboardOpTimestamps(metric)
    const recent10s = metric.recentAppliedTimestamps.filter((ts) => ts >= Date.now() - 10_000).length
    rows.push({
      key: metric.key,
      roomId: metric.roomId,
      boardScope: metric.boardScope,
      studentId: metric.studentId,
      lastActivity: metric.lastActivity,
      receivedOps: metric.receivedOps,
      appliedOps: metric.appliedOps,
      conflictDrops: metric.conflictDrops,
      duplicateDrops: metric.duplicateDrops,
      malformedDrops: metric.malformedDrops,
      queueDepth: metric.queueDepth,
      maxQueueDepth: metric.maxQueueDepth,
      replayRequests: metric.replayRequests,
      opsPerSecond: Number((recent10s / 10).toFixed(2)),
      activeStrokeCount: activeWhiteboards.get(metric.key)?.strokes.length || 0,
      deadLetterDepth: (whiteboardDeadLetters.get(metric.key) || []).length,
    })
  })
  return rows.sort((a, b) => b.lastActivity - a.lastActivity)
}

const applyStrokeOps = (current: WhiteboardStroke[], ops: WhiteboardStrokeOp[]): {
  next: WhiteboardStroke[]
  appliedCount: number
  conflictDrops: number
  causalDrops: WhiteboardStrokeOp[]
} => {
  if (!ops.length) {
    return { next: current, appliedCount: 0, conflictDrops: 0, causalDrops: [] }
  }
  const byId = new Map(current.map((stroke) => [stroke.id, stroke]))
  let appliedCount = 0
  let conflictDrops = 0
  const causalDrops: WhiteboardStrokeOp[] = []
  ops.forEach((op) => {
    if (op.kind === 'delete') {
      if (op.strokeId && byId.has(op.strokeId)) {
        byId.delete(op.strokeId)
        appliedCount += 1
      }
      return
    }
    if (op.stroke) {
      const existing = byId.get(op.stroke.id)
      const incomingVersion = op.stroke.updatedAt || op.stroke.createdAt || 0
      const currentVersion = existing?.updatedAt || existing?.createdAt || 0
      if (!existing || incomingVersion >= currentVersion) {
        byId.set(op.stroke.id, op.stroke)
        appliedCount += 1
      } else {
        conflictDrops += 1
        causalDrops.push(op)
      }
    }
  })
  return {
    next: Array.from(byId.values()),
    appliedCount,
    conflictDrops,
    causalDrops,
  }
}

const isValidStrokePoint = (p: unknown): p is { x: number; y: number; pressure?: number } => {
  if (!p || typeof p !== 'object') return false
  const item = p as { x?: unknown; y?: unknown; pressure?: unknown }
  return typeof item.x === 'number' && Number.isFinite(item.x) && typeof item.y === 'number' && Number.isFinite(item.y)
}

const isValidStroke = (stroke: WhiteboardStroke | undefined): stroke is WhiteboardStroke => {
  if (!stroke || typeof stroke !== 'object') return false
  if (!stroke.id || typeof stroke.id !== 'string') return false
  if (!Array.isArray(stroke.points) || stroke.points.some((p) => !isValidStrokePoint(p))) return false
  return true
}

const sanitizeWhiteboardOps = (wbKey: string, ops: WhiteboardStrokeOp[]): {
  valid: WhiteboardStrokeOp[]
  malformed: WhiteboardStrokeOp[]
  duplicates: WhiteboardStrokeOp[]
} => {
  const valid: WhiteboardStrokeOp[] = []
  const malformed: WhiteboardStrokeOp[] = []
  const duplicates: WhiteboardStrokeOp[] = []
  const seen = whiteboardOpSeenIds.get(wbKey) || new Set<string>()

  ops.forEach((op) => {
    if (!op || typeof op !== 'object' || (op.kind !== 'upsert' && op.kind !== 'delete')) {
      malformed.push(op)
      return
    }
    if (op.opId) {
      if (seen.has(op.opId)) {
        duplicates.push(op)
        return
      }
      seen.add(op.opId)
      if (seen.size > 20000) {
        const items = Array.from(seen)
        seen.clear()
        items.slice(-10000).forEach((id) => seen.add(id))
      }
    }
    if (op.kind === 'upsert') {
      if (!isValidStroke(op.stroke)) {
        malformed.push(op)
        return
      }
    } else if (!op.strokeId || typeof op.strokeId !== 'string') {
      malformed.push(op)
      return
    }
    valid.push(op)
  })

  whiteboardOpSeenIds.set(wbKey, seen)
  return { valid, malformed, duplicates }
}

const pushWhiteboardDeadLetters = (wbKey: string, reason: 'malformed' | 'duplicate' | 'causal', ops: WhiteboardStrokeOp[]) => {
  if (!ops.length) return
  const queue = whiteboardDeadLetters.get(wbKey) || []
  ops.forEach((op) => queue.push({ at: Date.now(), reason, op }))
  whiteboardDeadLetters.set(wbKey, queue.slice(-500))
}

const appendWhiteboardOpLog = (wbKey: string, ops: WhiteboardStrokeOp[]) => {
  if (!ops.length) return
  const queue = whiteboardOpLog.get(wbKey) || []
  let seq = whiteboardOpSeq.get(wbKey) || 0
  ops.forEach((op) => {
    seq += 1
    queue.push({
      seq,
      at: Date.now(),
      op,
    })
  })
  whiteboardOpSeq.set(wbKey, seq)
  whiteboardOpLog.set(wbKey, queue.slice(-4000))
}

interface LiveClassModerationState {
  mutedStudents: Set<string>
  studentStrokeWindowLimit: number
  strokeWindowMs: number
  strokeCounters: Map<string, { count: number; startedAt: number }>
  lockedLayers: Set<string>
  assignmentOverlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure'
  spotlight: {
    enabled: boolean
    x: number
    y: number
    width: number
    height: number
    mode: 'rectangle' | 'pen'
  }
}

interface LiveClassSnapshot {
  id: string
  createdAt: number
  roomId: string
  createdBy: string
  strokes: WhiteboardStroke[]
}

const liveClassModeration = new Map<string, LiveClassModerationState>()
const liveClassSnapshots = new Map<string, LiveClassSnapshot[]>()
const liveClassExports = new Map<string, Array<{
  id: string
  roomId: string
  sessionId?: string
  studentId?: string
  format: 'png' | 'pdf'
  fileName: string
  dataUrl: string
  createdAt: number
  createdBy: string
}>>()

interface MathWhiteboardRoomState {
  roomId: string
  sessionId: string
  locked: boolean
  ownerId?: string
  lastActivity: number
  currentPage: number
  participants: Map<string, {
    userId?: string
    name: string
    role: 'student' | 'tutor'
    color: string
    cursor?: { x: number; y: number }
    joinedAt: number
  }>
  elements: Map<string, Record<string, unknown> & {
    id: string
    type: string
    version: number
    lastModified: number
    modifiedBy: string
  }>
  pages: Array<{
    index: number
    backgroundType: string
    elementIds: string[]
  }>
  tldrawSnapshot?: Record<string, unknown> | null
  yDoc: Y.Doc
}

const mathWhiteboardRooms = new Map<string, MathWhiteboardRoomState>()

interface MathSyncMetricsState {
  sessionId: string
  roomId: string
  lastActivity: number
  joins: number
  leaves: number
  syncRequests: number
  yjsUpdates: number
  yjsBytes: number
  snapshotBroadcasts: number
  lockToggles: number
  recentUpdateTimestamps: number[]
}

export interface MathSyncObservabilitySnapshot {
  sessionId: string
  roomId: string
  lastActivity: number
  locked: boolean
  participants: number
  joins: number
  leaves: number
  syncRequests: number
  yjsUpdates: number
  yjsBytes: number
  snapshotBroadcasts: number
  lockToggles: number
  updatesPerMinute: number
  averageYjsUpdateBytes: number
}

const mathSyncMetrics = new Map<string, MathSyncMetricsState>()

const getMathSyncMetric = (sessionId: string): MathSyncMetricsState => {
  const key = `math:${sessionId}`
  let metric = mathSyncMetrics.get(key)
  if (!metric) {
    metric = {
      sessionId,
      roomId: key,
      lastActivity: Date.now(),
      joins: 0,
      leaves: 0,
      syncRequests: 0,
      yjsUpdates: 0,
      yjsBytes: 0,
      snapshotBroadcasts: 0,
      lockToggles: 0,
      recentUpdateTimestamps: [],
    }
    mathSyncMetrics.set(key, metric)
  }
  return metric
}

const trimRecentUpdates = (metric: MathSyncMetricsState): void => {
  const cutoff = Date.now() - 60_000
  metric.recentUpdateTimestamps = metric.recentUpdateTimestamps.filter((ts) => ts >= cutoff)
}

export function getMathSyncObservability(sessionId?: string): MathSyncObservabilitySnapshot[] {
  const snapshots: MathSyncObservabilitySnapshot[] = []
  const rooms = sessionId
    ? [[`math:${sessionId}`, mathWhiteboardRooms.get(`math:${sessionId}`)] as const]
    : Array.from(mathWhiteboardRooms.entries())

  for (const [key, room] of rooms) {
    if (!room) continue
    const metric = mathSyncMetrics.get(key) || getMathSyncMetric(room.sessionId)
    trimRecentUpdates(metric)
    snapshots.push({
      sessionId: room.sessionId,
      roomId: room.roomId,
      lastActivity: Math.max(room.lastActivity, metric.lastActivity),
      locked: room.locked,
      participants: room.participants.size,
      joins: metric.joins,
      leaves: metric.leaves,
      syncRequests: metric.syncRequests,
      yjsUpdates: metric.yjsUpdates,
      yjsBytes: metric.yjsBytes,
      snapshotBroadcasts: metric.snapshotBroadcasts,
      lockToggles: metric.lockToggles,
      updatesPerMinute: metric.recentUpdateTimestamps.length,
      averageYjsUpdateBytes: metric.yjsUpdates > 0 ? Math.round(metric.yjsBytes / metric.yjsUpdates) : 0,
    })
  }

  return snapshots.sort((a, b) => b.lastActivity - a.lastActivity)
}

const getMathWhiteboardRoom = (sessionId: string): MathWhiteboardRoomState => {
  const key = `math:${sessionId}`
  let room = mathWhiteboardRooms.get(key)
  if (!room) {
    room = {
      roomId: key,
      sessionId,
      locked: false,
      ownerId: undefined,
      lastActivity: Date.now(),
      currentPage: 0,
      participants: new Map(),
      elements: new Map(),
      pages: [{
        index: 0,
        backgroundType: 'grid',
        elementIds: [],
      }],
      tldrawSnapshot: null,
      yDoc: new Y.Doc(),
    }
    mathWhiteboardRooms.set(key, room)
  }
  getMathSyncMetric(sessionId)
  return room
}

const getLiveClassModerationState = (roomId: string): LiveClassModerationState => {
  let state = liveClassModeration.get(roomId)
  if (!state) {
    state = {
      mutedStudents: new Set(),
      studentStrokeWindowLimit: 80,
      strokeWindowMs: 5000,
      strokeCounters: new Map(),
      lockedLayers: new Set(),
      assignmentOverlay: 'none',
      spotlight: {
        enabled: false,
        x: 160,
        y: 120,
        width: 420,
        height: 220,
        mode: 'rectangle',
      },
    }
    liveClassModeration.set(roomId, state)
  }
  return state
}

const appendLiveClassSnapshot = (roomId: string, snapshot: LiveClassSnapshot) => {
  const existing = liveClassSnapshots.get(roomId) || []
  existing.push(snapshot)
  liveClassSnapshots.set(roomId, existing.slice(-80))
}

async function generateWhiteboardRegionHint(payload: {
  region: { x: number; y: number; width: number; height: number }
  context?: string
}): Promise<{ hint: string; misconception: string; provider: string }> {
  const prompt = [
    'You are a Socratic tutoring assistant for a live class whiteboard.',
    'Given a selected board region and optional context, return one concise hint question and one misconception alert.',
    'Do not provide direct answers.',
    'Respond as strict JSON with keys: hint, misconception.',
    `Region: ${JSON.stringify(payload.region)}`,
    `Context: ${payload.context || 'No extra context provided.'}`,
  ].join('\n')

  try {
    const result = await generateWithFallback(prompt, {
      temperature: 0.4,
      maxTokens: 220,
      skipCache: true,
      timeoutMs: 6000,
    })
    const raw = result.content.trim()
    const extracted = raw.match(/\{[\s\S]*\}/)?.[0]
    if (extracted) {
      const parsed = JSON.parse(extracted) as { hint?: string; misconception?: string }
      if (parsed.hint && parsed.misconception) {
        return {
          hint: parsed.hint,
          misconception: parsed.misconception,
          provider: result.provider,
        }
      }
    }
    return {
      hint: raw.slice(0, 240),
      misconception: 'Check for sign errors and missing intermediate reasoning steps.',
      provider: result.provider,
    }
  } catch {
    return {
      hint: 'What relationship in this region can you test with one more example?',
      misconception: 'Students may be overgeneralizing from a single case.',
      provider: 'fallback',
    }
  }
}

export function initSocketServer(server: NetServer) {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const broadcastPdfPresenceState = (room: PdfCollabRoomState) => {
    io.to(room.roomId).emit('pdf_presence_state', {
      roomId: room.roomId.replace(/^pdf:/, ''),
      participants: Array.from(room.participants.values()),
    })
  }

  io.on('connection', (socket) => {
    console.warn('Client connected:', socket.id)

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
      socket.data.name = name

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

      console.warn(`${role} ${name} joined room ${roomId}`)
    })

    // Whiteboard updates
    socket.on('whiteboard_update', (data: { strokes: unknown[] }) => {
      const roomId = socket.data.roomId
      if (!roomId) return

      const room = activeRooms.get(roomId)
      if (room) {
        room.whiteboardData = data.strokes
        // Broadcast to all except sender
        socket.to(roomId).emit('whiteboard_update', data)
      }
    })

    socket.on('pdf_join_room', (data: {
      roomId: string
      userId?: string
      name?: string
      role?: 'student' | 'tutor'
    }) => {
      const room = getPdfCollabRoom(data.roomId)
      if (!room.ownerId && data.userId) {
        room.ownerId = data.userId
      }
      socket.join(room.roomId)
      socket.data.pdfRoomId = room.roomId
      socket.data.pdfUserId = data.userId
      socket.data.pdfRole = data.role || 'student'
      room.lastActivity = Date.now()
      room.participants.set(socket.id, {
        userId: data.userId,
        name: data.name || (data.role === 'tutor' ? 'Tutor' : 'Student'),
        role: data.role || 'student',
        joinedAt: Date.now(),
      })

      socket.emit('pdf_lock_state', {
        roomId: data.roomId,
        locked: room.locked,
      })
      broadcastPdfPresenceState(room)
    })

    socket.on('pdf_canvas_event', (payload: {
      roomId: string
      page: number
      action: 'created' | 'modified' | 'removed' | 'sync-request'
      object?: Record<string, unknown>
      objectId?: string
      actorId?: string
      sentAt: number
    }) => {
      const room = getPdfCollabRoom(payload.roomId)
      room.lastActivity = Date.now()
      room.events.push({
        page: payload.page,
        action: payload.action,
        object: payload.object,
        objectId: payload.objectId,
        actorId: payload.actorId,
        sentAt: payload.sentAt,
      })
      if (room.events.length > 500) {
        room.events = room.events.slice(-500)
      }
      socket.to(room.roomId).emit('pdf_canvas_event', payload)
    })

    socket.on('pdf_lock_toggle', (data: { roomId: string; locked: boolean }) => {
      const room = getPdfCollabRoom(data.roomId)
      const isOwner = Boolean(room.ownerId && socket.data.pdfUserId === room.ownerId)
      if (socket.data.pdfRole !== 'tutor' && !isOwner) return
      room.locked = data.locked
      room.lastActivity = Date.now()
      io.to(room.roomId).emit('pdf_lock_state', {
        roomId: data.roomId,
        locked: data.locked,
      })
    })

    socket.on('pdf_request_state', (data: { roomId: string }) => {
      const room = getPdfCollabRoom(data.roomId)
      socket.emit('pdf_lock_state', {
        roomId: data.roomId,
        locked: room.locked,
      })
      socket.emit('pdf_canvas_state', {
        roomId: data.roomId,
        events: room.events,
      })
      socket.emit('pdf_presence_state', {
        roomId: data.roomId,
        participants: Array.from(room.participants.values()),
      })
    })

    // ============================================
    // MATH WHITEBOARD COLLABORATION
    // ============================================

    const broadcastMathPresence = (room: MathWhiteboardRoomState) => {
      io.to(room.roomId).emit('math_wb_presence', {
        sessionId: room.sessionId,
        participants: Array.from(room.participants.values()),
      })
    }

    // Join math whiteboard room
    socket.on('math_wb_join', (data: {
      sessionId: string
      userId?: string
      name?: string
      role?: 'student' | 'tutor'
    }) => {
      const room = getMathWhiteboardRoom(data.sessionId)
      const metric = getMathSyncMetric(data.sessionId)
      
      // Set owner if first tutor joins
      if (!room.ownerId && data.userId && data.role === 'tutor') {
        room.ownerId = data.userId
      }

      // Assign a unique color to each participant
      const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2']
      const colorIndex = room.participants.size % colors.length

      socket.join(room.roomId)
      socket.data.mathRoomId = room.roomId
      socket.data.mathUserId = data.userId
      socket.data.mathRole = data.role || 'student'
      
      room.lastActivity = Date.now()
      metric.lastActivity = Date.now()
      metric.joins += 1
      room.participants.set(socket.id, {
        userId: data.userId,
        name: data.name || (data.role === 'tutor' ? 'Tutor' : 'Student'),
        role: data.role || 'student',
        color: colors[colorIndex],
        joinedAt: Date.now(),
      })

      // Send current state to joining user
      socket.emit('math_wb_state', {
        sessionId: data.sessionId,
        locked: room.locked,
        currentPage: room.currentPage,
        elements: Array.from(room.elements.values()),
        pages: room.pages,
        tldrawSnapshot: room.tldrawSnapshot ?? null,
      })
      socket.emit('math_yjs_sync', {
        sessionId: data.sessionId,
        update: Array.from(Y.encodeStateAsUpdate(room.yDoc)),
      })

      broadcastMathPresence(room)
      console.warn(`[MathWB] ${data.role} ${data.name} joined session ${data.sessionId}`)
    })

    // Leave math whiteboard room
    socket.on('math_wb_leave', (sessionId: string) => {
      const room = getMathWhiteboardRoom(sessionId)
      const metric = getMathSyncMetric(sessionId)
      room.participants.delete(socket.id)
      socket.leave(room.roomId)
      metric.lastActivity = Date.now()
      metric.leaves += 1
      broadcastMathPresence(room)
    })

    // Cursor tracking
    socket.on('math_wb_cursor', (data: {
      sessionId: string
      x: number
      y: number
    }) => {
      const room = getMathWhiteboardRoom(data.sessionId)
      const participant = room.participants.get(socket.id)
      if (participant) {
        participant.cursor = { x: data.x, y: data.y }
        socket.to(room.roomId).emit('math_wb_cursor_moved', {
          sessionId: data.sessionId,
          userId: participant.userId,
          name: participant.name,
          color: participant.color,
          x: data.x,
          y: data.y,
        })
      }
    })

    // Element CRDT operations
    socket.on('math_wb_element_create', (payload: {
      sessionId: string
      element: Record<string, unknown> & {
        id: string
        type: string
      }
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      
      // Check permissions
      const participant = room.participants.get(socket.id)
      if (room.locked && participant?.role !== 'tutor') return
      
      room.lastActivity = Date.now()
      
      // CRDT: Create or update with version tracking
      const element = {
        ...payload.element,
        version: Date.now(),
        lastModified: Date.now(),
        modifiedBy: participant?.userId || 'unknown',
      }
      
      room.elements.set(payload.element.id, element)
      
      // Add to current page
      const currentPage = room.pages[room.currentPage]
      if (currentPage && !currentPage.elementIds.includes(payload.element.id)) {
        currentPage.elementIds.push(payload.element.id)
      }
      
      // Broadcast to others (not sender)
      socket.to(room.roomId).emit('math_wb_element_created', {
        sessionId: payload.sessionId,
        element,
        actorId: participant?.userId,
      })
    })

    socket.on('math_wb_element_update', (payload: {
      sessionId: string
      elementId: string
      changes: Record<string, unknown>
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      
      const participant = room.participants.get(socket.id)
      if (room.locked && participant?.role !== 'tutor') return
      
      const element = room.elements.get(payload.elementId)
      if (!element) return
      
      room.lastActivity = Date.now()
      
      // CRDT: Merge changes with version tracking
      Object.assign(element, payload.changes)
      element.version = Date.now()
      element.lastModified = Date.now()
      element.modifiedBy = participant?.userId || 'unknown'
      
      socket.to(room.roomId).emit('math_wb_element_updated', {
        sessionId: payload.sessionId,
        elementId: payload.elementId,
        changes: payload.changes,
        version: element.version,
        actorId: participant?.userId,
      })
    })

    socket.on('math_wb_element_delete', (payload: {
      sessionId: string
      elementId: string
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      
      const participant = room.participants.get(socket.id)
      if (room.locked && participant?.role !== 'tutor') return
      
      room.lastActivity = Date.now()
      room.elements.delete(payload.elementId)
      
      // Remove from page
      room.pages.forEach(page => {
        const idx = page.elementIds.indexOf(payload.elementId)
        if (idx > -1) page.elementIds.splice(idx, 1)
      })
      
      socket.to(room.roomId).emit('math_wb_element_deleted', {
        sessionId: payload.sessionId,
        elementId: payload.elementId,
        actorId: participant?.userId,
      })
    })

    // Lock/unlock control
    socket.on('math_wb_lock', (payload: {
      sessionId: string
      locked: boolean
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      const metric = getMathSyncMetric(payload.sessionId)
      const participant = room.participants.get(socket.id)
      
      // Only tutor or owner can lock/unlock
      if (participant?.role !== 'tutor' && socket.data.mathUserId !== room.ownerId) return
      
      room.locked = payload.locked
      room.lastActivity = Date.now()
      metric.lastActivity = Date.now()
      metric.lockToggles += 1
      
      io.to(room.roomId).emit('math_wb_lock_changed', {
        sessionId: payload.sessionId,
        locked: payload.locked,
        by: participant?.userId,
      })
    })

    // Student can request edit access when tutor has locked the board.
    socket.on('math_wb_edit_request', (payload: {
      sessionId: string
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      const participant = room.participants.get(socket.id)
      if (!participant || participant.role !== 'student') return

      room.lastActivity = Date.now()
      io.to(room.roomId).emit('math_wb_edit_request', {
        sessionId: payload.sessionId,
        requester: {
          userId: participant.userId,
          name: participant.name,
        },
        requestedAt: Date.now(),
      })
    })

    // Page management
    socket.on('math_wb_change_page', (payload: {
      sessionId: string
      pageIndex: number
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      const participant = room.participants.get(socket.id)
      
      if (participant?.role !== 'tutor' && room.locked) return
      
      room.currentPage = payload.pageIndex
      
      // Ensure page exists
      while (room.pages.length <= payload.pageIndex) {
        room.pages.push({
          index: room.pages.length,
          backgroundType: 'grid',
          elementIds: [],
        })
      }
      
      io.to(room.roomId).emit('math_wb_page_changed', {
        sessionId: payload.sessionId,
        pageIndex: payload.pageIndex,
        elements: room.pages[payload.pageIndex]?.elementIds
          .map(id => room.elements.get(id))
          .filter(Boolean) || [],
      })
    })

    // Request full state sync (for late joiners or reconnects)
    socket.on('math_wb_request_sync', (sessionId: string) => {
      const room = getMathWhiteboardRoom(sessionId)
      const metric = getMathSyncMetric(sessionId)
      metric.lastActivity = Date.now()
      metric.syncRequests += 1
      socket.emit('math_wb_state', {
        sessionId,
        locked: room.locked,
        currentPage: room.currentPage,
        elements: Array.from(room.elements.values()),
        pages: room.pages,
        tldrawSnapshot: room.tldrawSnapshot ?? null,
      })
      socket.emit('math_yjs_sync', {
        sessionId,
        update: Array.from(Y.encodeStateAsUpdate(room.yDoc)),
      })
    })

    // Tldraw snapshot sync for long-term stable collaborative math board.
    socket.on('math_tl_snapshot', (payload: {
      sessionId: string
      snapshot: Record<string, unknown>
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      const metric = getMathSyncMetric(payload.sessionId)
      const participant = room.participants.get(socket.id)
      if (room.locked && participant?.role !== 'tutor') return
      room.lastActivity = Date.now()
      metric.lastActivity = Date.now()
      metric.snapshotBroadcasts += 1
      room.tldrawSnapshot = payload.snapshot
      io.emit('math_tl_snapshot', {
        sessionId: payload.sessionId,
        snapshot: payload.snapshot,
        actorId: participant?.userId,
      })
    })

    socket.on('math_yjs_update', (payload: {
      sessionId: string
      update: number[]
    }) => {
      const room = getMathWhiteboardRoom(payload.sessionId)
      const metric = getMathSyncMetric(payload.sessionId)
      const participant = room.participants.get(socket.id)
      if (room.locked && participant?.role !== 'tutor') return
      const update = Uint8Array.from(payload.update || [])
      if (update.length === 0) return
      room.lastActivity = Date.now()
      metric.lastActivity = Date.now()
      metric.yjsUpdates += 1
      metric.yjsBytes += update.length
      metric.recentUpdateTimestamps.push(Date.now())
      trimRecentUpdates(metric)
      Y.applyUpdate(room.yDoc, update, 'remote')
      io.emit('math_yjs_update', {
        sessionId: payload.sessionId,
        update: payload.update,
        actorId: participant?.userId,
      })
    })

    // Cleanup on disconnect
    socket.on('disconnect', () => {
      // Clean up math whiteboard participation
      mathWhiteboardRooms.forEach((room, key) => {
        if (room.participants.has(socket.id)) {
          room.participants.delete(socket.id)
          const metric = mathSyncMetrics.get(key)
          if (metric) {
            metric.lastActivity = Date.now()
            metric.leaves += 1
          }
          broadcastMathPresence(room)
          
          // Clean up empty rooms after 1 hour
          if (room.participants.size === 0) {
            setTimeout(() => {
              if (room.participants.size === 0) {
                mathWhiteboardRooms.delete(key)
                console.warn(`[MathWB] Cleaned up empty room ${key}`)
              }
            }, 3600000) // 1 hour
          }
        }
      })
    })

    socket.on('live_doc_share_update', (payload: LiveDocumentShare) => {
      if (!payload?.classRoomId || !payload?.shareId || !payload?.fileUrl || !payload?.pdfRoomId) return
      const shareMap = getLiveDocumentShareMap(payload.classRoomId)
      const normalizedPolicy = payload.collaborationPolicy || {
        allowDrawing: true,
        allowTyping: true,
        allowShapes: true,
      }

      // Tutor "assign to class": expand into one copy per active student.
      if (
        socket.data.role === 'tutor' &&
        payload.ownerId === socket.data.userId &&
        payload.visibleToAll &&
        !payload.assignedStudentId
      ) {
        const templateShare: LiveDocumentShare = {
          ...payload,
          visibleToAll: false,
          active: false,
          collaborationPolicy: normalizedPolicy,
          updatedAt: Date.now(),
        }
        shareMap.set(templateShare.shareId, templateShare)

        const studentCopies = expandLiveShareForStudents(payload.classRoomId, templateShare)
        studentCopies.forEach((copy) => {
          shareMap.set(copy.shareId, copy)
          io.to(payload.classRoomId).emit('live_doc_share_update', copy)
        })
        io.to(payload.classRoomId).emit('live_doc_share_update', templateShare)
        return
      }

      const nextShare: LiveDocumentShare = {
        ...payload,
        collaborationPolicy: normalizedPolicy,
        updatedAt: Date.now(),
      }
      shareMap.set(payload.shareId, nextShare)
      io.to(payload.classRoomId).emit('live_doc_share_update', nextShare)
    })

    socket.on('live_doc_share_state_request', (data: { classRoomId: string }) => {
      if (!data?.classRoomId) return
      const shareMap = getLiveDocumentShareMap(data.classRoomId)
      const requestUserId = socket.data.userId as string | undefined
      const requestRole = socket.data.role as 'tutor' | 'student' | undefined

      // Backfill a per-student copy from any existing tutor template if needed.
      if (requestRole === 'student' && requestUserId) {
        const templateShares = Array.from(shareMap.values()).filter(
          (share) => !share.active && !share.assignedStudentId
        )
        templateShares.forEach((template) => {
          const cloneId = `${template.shareId}::${requestUserId}`
          if (shareMap.has(cloneId)) return
          const clone: LiveDocumentShare = {
            ...template,
            shareId: cloneId,
            ownerId: requestUserId,
            ownerName: socket.data.name || 'Student',
            assignedStudentId: requestUserId,
            templateShareId: template.shareId,
            visibleToAll: false,
            active: true,
            pdfRoomId: `${template.pdfRoomId}:student:${requestUserId}`,
            updatedAt: Date.now(),
          }
          shareMap.set(cloneId, clone)
          io.to(data.classRoomId).emit('live_doc_share_update', clone)
        })
      }

      socket.emit('live_doc_share_state', {
        classRoomId: data.classRoomId,
        shares: Array.from(shareMap.values()),
      })
    })

    socket.on('live_doc_task_submit', (data: {
      classRoomId: string
      shareId: string
      userId: string
      userName: string
    }) => {
      if (!data?.classRoomId || !data?.shareId || !data?.userId) return
      const shareMap = getLiveDocumentShareMap(data.classRoomId)
      const share = shareMap.get(data.shareId)
      if (!share) return

      const existing = share.submissions || []
      if (!existing.some((submission) => submission.userId === data.userId)) {
        share.submissions = [
          ...existing,
          {
            userId: data.userId,
            userName: data.userName || 'Student',
            submittedAt: Date.now(),
          },
        ]
        share.updatedAt = Date.now()
        shareMap.set(data.shareId, share)
      }

      io.to(data.classRoomId).emit('live_doc_task_submitted', {
        classRoomId: data.classRoomId,
        shareId: data.shareId,
        userId: data.userId,
        userName: data.userName || 'Student',
        submittedAt: Date.now(),
      })
      io.to(data.classRoomId).emit('live_doc_share_update', share)
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
    
    // Initialize poll handlers
    initPollHandlers(io, socket)

    // ============================================
    // DIRECT MESSAGING HANDLERS
    // ============================================

    // Join direct messaging namespace
    socket.on('dm_join', (data: { userId: string }) => {
      socket.data.dmUserId = data.userId
      userSocketMap.set(data.userId, socket.id)
      socket.join(`user:${data.userId}`)
      console.warn(`User ${data.userId} joined DM namespace`)
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
      console.warn(`User ${userId} joined conversation ${conversationId}`)
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

    // ============================================
    // LIVE CLASS WHITEBOARD MAGIC - NEW EVENTS
    // ============================================

    // Tutor: Start broadcasting whiteboard to all students
    socket.on('lcwb_broadcast_start', (data: {
      roomId: string
      whiteboardId: string
    }) => {
      if (socket.data.role !== 'tutor') return
      
      socket.join(`lcwb:tutor:${data.roomId}`)
      
      // Notify all students that tutor is broadcasting
      io.to(data.roomId).emit('lcwb_tutor_broadcasting', {
        whiteboardId: data.whiteboardId,
        tutorId: socket.data.userId,
        layerId: 'tutor-broadcast'
      })
      
      console.warn(`Tutor started whiteboard broadcast in room ${data.roomId}`)
    })

    // Tutor: Stop broadcasting
    socket.on('lcwb_broadcast_stop', (data: { roomId: string }) => {
      if (socket.data.role !== 'tutor') return
      
      socket.leave(`lcwb:tutor:${data.roomId}`)
      
      // Notify all students
      io.to(data.roomId).emit('lcwb_tutor_broadcast_stopped')
      
      console.warn(`Tutor stopped whiteboard broadcast in room ${data.roomId}`)
    })

    // Tutor: Broadcast stroke to all students
    socket.on('lcwb_stroke_broadcast', (data: {
      roomId: string
      stroke: WhiteboardStroke
    }) => {
      if (socket.data.role !== 'tutor') return

      const roomWBKey = `lcwb:tutor:${data.roomId}`
      let roomWB = activeWhiteboards.get(roomWBKey)
      if (!roomWB) {
        roomWB = {
          whiteboardId: roomWBKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(roomWBKey, roomWB)
      }
      roomWB.strokes.push({ ...data.stroke, layerId: data.stroke.layerId || 'tutor-broadcast' })
      
      // Broadcast to all students in room except sender
      socket.to(data.roomId).emit('lcwb_tutor_stroke', data.stroke)
    })

    // Student: Create/join their personal whiteboard for this session
    socket.on('lcwb_student_join', (data: {
      roomId: string
      userId: string
      name: string
    }) => {
      if (socket.data.role !== 'student') return
      
      socket.join(`lcwb:student:${data.roomId}:${data.userId}`)
      socket.data.lcwbRoomId = data.roomId
      
      // Notify tutor that student has a whiteboard
      socket.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_whiteboard_created', {
        studentId: data.userId,
        name: data.name
      })
      
      console.warn(`Student ${data.name} joined their whiteboard in room ${data.roomId}`)
    })

    // Student: Update their whiteboard (stroke drawn)
    socket.on('lcwb_student_update', (data: {
      roomId: string
      userId: string
      stroke: WhiteboardStroke
      visibility: 'private' | 'tutor-only' | 'public'
    }) => {
      if (socket.data.role !== 'student') return
      const moderationState = getLiveClassModerationState(data.roomId)

      if (moderationState.mutedStudents.has(data.userId)) {
        socket.emit('lcwb_moderation_warning', {
          code: 'DRAW_MUTED',
          message: 'Your drawing is temporarily muted by the tutor.',
        })
        return
      }

      const windowNow = Date.now()
      const counter = moderationState.strokeCounters.get(data.userId)
      if (!counter || windowNow - counter.startedAt > moderationState.strokeWindowMs) {
        moderationState.strokeCounters.set(data.userId, { count: 1, startedAt: windowNow })
      } else {
        counter.count += 1
        if (counter.count > moderationState.studentStrokeWindowLimit) {
          socket.emit('lcwb_moderation_warning', {
            code: 'RATE_LIMITED',
            message: 'Drawing too quickly. Please slow down.',
            limit: moderationState.studentStrokeWindowLimit,
          })
          return
        }
      }

      if (data.stroke.layerId && moderationState.lockedLayers.has(data.stroke.layerId)) {
        socket.emit('lcwb_moderation_warning', {
          code: 'LAYER_LOCKED',
          message: 'This layer is currently locked by the tutor.',
          layerId: data.stroke.layerId,
        })
        return
      }
      
      // Store stroke in memory for tutor viewing
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      let studentWB = activeWhiteboards.get(wbKey)
      if (!studentWB) {
        studentWB = {
          whiteboardId: wbKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(wbKey, studentWB)
      }
      studentWB.strokes.push({ ...data.stroke, layerId: data.stroke.layerId || 'student-personal' })
      
      // Send to tutor if visible to them
      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke', {
          studentId: data.userId,
          stroke: data.stroke
        })
      }
      
      // Send to other students if public
      if (data.visibility === 'public') {
        socket.to(data.roomId).emit('lcwb_public_student_stroke', {
          studentId: data.userId,
          stroke: data.stroke
        })
      }
    })

    socket.on('lcwb_student_stroke_ops', (data: {
      roomId: string
      userId: string
      ops: WhiteboardStrokeOp[]
      visibility: 'private' | 'tutor-only' | 'public'
    }) => {
      if (socket.data.role !== 'student') return
      if (socket.data.userId !== data.userId) return
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      let studentWB = activeWhiteboards.get(wbKey)
      if (!studentWB) {
        studentWB = {
          whiteboardId: wbKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(wbKey, studentWB)
      }
      const metric = getWhiteboardOpMetric(wbKey)
      const incoming = data.ops || []
      const sanitized = sanitizeWhiteboardOps(wbKey, incoming)
      const ops = sanitized.valid
      metric.lastActivity = Date.now()
      metric.queueDepth += incoming.length
      metric.maxQueueDepth = Math.max(metric.maxQueueDepth, metric.queueDepth)
      metric.receivedOps += incoming.length
      metric.malformedDrops += sanitized.malformed.length
      metric.duplicateDrops += sanitized.duplicates.length
      pushWhiteboardDeadLetters(wbKey, 'malformed', sanitized.malformed)
      pushWhiteboardDeadLetters(wbKey, 'duplicate', sanitized.duplicates)
      const result = applyStrokeOps(studentWB.strokes, ops)
      studentWB.strokes = result.next
      metric.appliedOps += result.appliedCount
      metric.conflictDrops += result.conflictDrops
      pushWhiteboardDeadLetters(wbKey, 'causal', result.causalDrops)
      appendWhiteboardOpLog(wbKey, ops)
      metric.queueDepth = Math.max(0, metric.queueDepth - incoming.length)
      for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)

      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
      if (data.visibility === 'public') {
        socket.to(data.roomId).emit('lcwb_public_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
    })

    socket.on('lcwb_tutor_stroke_ops', (data: {
      roomId: string
      ops: WhiteboardStrokeOp[]
    }) => {
      if (socket.data.role !== 'tutor') return
      const roomWBKey = `lcwb:tutor:${data.roomId}`
      let roomWB = activeWhiteboards.get(roomWBKey)
      if (!roomWB) {
        roomWB = {
          whiteboardId: roomWBKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(roomWBKey, roomWB)
      }
      const metric = getWhiteboardOpMetric(roomWBKey)
      const incoming = data.ops || []
      const sanitized = sanitizeWhiteboardOps(roomWBKey, incoming)
      const ops = sanitized.valid
      metric.lastActivity = Date.now()
      metric.queueDepth += incoming.length
      metric.maxQueueDepth = Math.max(metric.maxQueueDepth, metric.queueDepth)
      metric.receivedOps += incoming.length
      metric.malformedDrops += sanitized.malformed.length
      metric.duplicateDrops += sanitized.duplicates.length
      pushWhiteboardDeadLetters(roomWBKey, 'malformed', sanitized.malformed)
      pushWhiteboardDeadLetters(roomWBKey, 'duplicate', sanitized.duplicates)
      const result = applyStrokeOps(roomWB.strokes, ops)
      roomWB.strokes = result.next
      metric.appliedOps += result.appliedCount
      metric.conflictDrops += result.conflictDrops
      pushWhiteboardDeadLetters(roomWBKey, 'causal', result.causalDrops)
      appendWhiteboardOpLog(roomWBKey, ops)
      metric.queueDepth = Math.max(0, metric.queueDepth - incoming.length)
      for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      io.to(data.roomId).emit('lcwb_tutor_stroke_ops', { ops })
    })

    // Backward compatibility for older clients still sending full replacement payloads.
    socket.on('lcwb_student_replace_strokes', (data: {
      roomId: string
      userId: string
      strokes: WhiteboardStroke[]
      visibility: 'private' | 'tutor-only' | 'public'
    }) => {
      if (socket.data.role !== 'student') return
      if (socket.data.userId !== data.userId) return
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      const current = activeWhiteboards.get(wbKey)?.strokes || []
      const currentIds = new Set(current.map((stroke) => stroke.id))
      const nextIds = new Set((data.strokes || []).map((stroke) => stroke.id))
      const ops: WhiteboardStrokeOp[] = [
        ...(data.strokes || []).map((stroke) => ({ kind: 'upsert' as const, stroke })),
        ...Array.from(currentIds).filter((id) => !nextIds.has(id)).map((id) => ({ kind: 'delete' as const, strokeId: id })),
      ]
      let studentWB = activeWhiteboards.get(wbKey)
      if (!studentWB) {
        studentWB = {
          whiteboardId: wbKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(wbKey, studentWB)
      }
      const metric = getWhiteboardOpMetric(wbKey)
      metric.lastActivity = Date.now()
      metric.queueDepth += ops.length
      metric.maxQueueDepth = Math.max(metric.maxQueueDepth, metric.queueDepth)
      metric.receivedOps += ops.length
      const result = applyStrokeOps(studentWB.strokes, ops)
      studentWB.strokes = result.next
      metric.appliedOps += result.appliedCount
      metric.conflictDrops += result.conflictDrops
      metric.queueDepth = Math.max(0, metric.queueDepth - ops.length)
      for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
      if (data.visibility === 'public') {
        socket.to(data.roomId).emit('lcwb_public_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
    })

    socket.on('lcwb_tutor_replace_strokes', (data: {
      roomId: string
      strokes: WhiteboardStroke[]
    }) => {
      if (socket.data.role !== 'tutor') return
      const roomWBKey = `lcwb:tutor:${data.roomId}`
      const current = activeWhiteboards.get(roomWBKey)?.strokes || []
      const currentIds = new Set(current.map((stroke) => stroke.id))
      const nextIds = new Set((data.strokes || []).map((stroke) => stroke.id))
      const ops: WhiteboardStrokeOp[] = [
        ...(data.strokes || []).map((stroke) => ({ kind: 'upsert' as const, stroke })),
        ...Array.from(currentIds).filter((id) => !nextIds.has(id)).map((id) => ({ kind: 'delete' as const, strokeId: id })),
      ]
      let roomWB = activeWhiteboards.get(roomWBKey)
      if (!roomWB) {
        roomWB = {
          whiteboardId: roomWBKey,
          roomId: data.roomId,
          strokes: [],
          shapes: [],
          texts: [],
          cursors: new Map(),
          activeUsers: new Set(),
          backgroundColor: '#ffffff',
          backgroundStyle: 'solid'
        }
        activeWhiteboards.set(roomWBKey, roomWB)
      }
      const metric = getWhiteboardOpMetric(roomWBKey)
      metric.lastActivity = Date.now()
      metric.queueDepth += ops.length
      metric.maxQueueDepth = Math.max(metric.maxQueueDepth, metric.queueDepth)
      metric.receivedOps += ops.length
      const result = applyStrokeOps(roomWB.strokes, ops)
      roomWB.strokes = result.next
      metric.appliedOps += result.appliedCount
      metric.conflictDrops += result.conflictDrops
      metric.queueDepth = Math.max(0, metric.queueDepth - ops.length)
      for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      io.to(data.roomId).emit('lcwb_tutor_stroke_ops', { ops })
    })

    // Tutor: update live moderation controls
    socket.on('lcwb_tutor_moderation_update', (data: {
      roomId: string
      mutedStudentIds?: string[]
      studentStrokeWindowLimit?: number
      strokeWindowMs?: number
      lockedLayers?: Array<'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'>
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      if (data.mutedStudentIds) moderationState.mutedStudents = new Set(data.mutedStudentIds)
      if (typeof data.studentStrokeWindowLimit === 'number') moderationState.studentStrokeWindowLimit = Math.max(10, data.studentStrokeWindowLimit)
      if (typeof data.strokeWindowMs === 'number') moderationState.strokeWindowMs = Math.max(1000, data.strokeWindowMs)
      if (data.lockedLayers) moderationState.lockedLayers = new Set(data.lockedLayers)

      io.to(data.roomId).emit('lcwb_moderation_state', {
        mutedStudentIds: Array.from(moderationState.mutedStudents),
        studentStrokeWindowLimit: moderationState.studentStrokeWindowLimit,
        strokeWindowMs: moderationState.strokeWindowMs,
        lockedLayers: Array.from(moderationState.lockedLayers),
      })
    })

    // Student: clear only own strokes
    socket.on('lcwb_clear_own', (data: {
      roomId: string
      userId: string
    }) => {
      if (socket.data.userId !== data.userId) return
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      const studentWB = activeWhiteboards.get(wbKey)
      if (studentWB) {
        studentWB.strokes = studentWB.strokes.filter((stroke) => stroke.userId !== data.userId)
      }
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_cleared_own', { studentId: data.userId })
      io.to(`lcwb:student:${data.roomId}:${data.userId}`).emit('lcwb_student_cleared_own', { studentId: data.userId })
    })

    // Student: Change visibility of their whiteboard
    socket.on('lcwb_visibility_change', (data: {
      roomId: string
      userId: string
      visibility: 'private' | 'tutor-only' | 'public'
    }) => {
      if (socket.data.role !== 'student') return
      
      // Notify tutor
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_visibility_changed', {
        studentId: data.userId,
        visibility: data.visibility
      })
      
      // If becoming public, notify all students
      if (data.visibility === 'public') {
        socket.to(data.roomId).emit('lcwb_student_public', {
          studentId: data.userId,
          name: socket.data.name
        })
      }
      
      console.warn(`Student ${data.userId} changed visibility to ${data.visibility}`)
    })

    // Tutor: Request to view a specific student's whiteboard
    socket.on('lcwb_tutor_view_student', (data: {
      roomId: string
      studentId: string
    }) => {
      if (socket.data.role !== 'tutor') return
      
      // Join the student's whiteboard room
      socket.join(`lcwb:student:${data.roomId}:${data.studentId}`)
      
      // Get student's whiteboard state
      const wbKey = `lcwb:${data.roomId}:${data.studentId}`
      const studentWB = activeWhiteboards.get(wbKey)
      
      // Send current state to tutor
      socket.emit('lcwb_student_whiteboard_state', {
        studentId: data.studentId,
        strokes: studentWB?.strokes || []
      })
      
      // Notify student that tutor is viewing
      io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_viewing', {
        tutorId: socket.data.userId,
        tutorName: socket.data.name
      })
      
      console.warn(`Tutor viewing student ${data.studentId}'s whiteboard`)
    })

    // Tutor: Stop viewing a student's whiteboard
    socket.on('lcwb_tutor_stop_view', (data: {
      roomId: string
      studentId: string
    }) => {
      if (socket.data.role !== 'tutor') return
      
      socket.leave(`lcwb:student:${data.roomId}:${data.studentId}`)
      
      // Notify student
      io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_stopped_viewing', {
        tutorId: socket.data.userId
      })
      
      console.warn(`Tutor stopped viewing student ${data.studentId}'s whiteboard`)
    })

    // Tutor: Annotate on student's whiteboard (for feedback)
    socket.on('lcwb_tutor_annotate', (data: {
      roomId: string
      studentId: string
      stroke: WhiteboardStroke
    }) => {
      if (socket.data.role !== 'tutor') return
      
      // Add stroke to student's whiteboard
      const wbKey = `lcwb:${data.roomId}:${data.studentId}`
      const studentWB = activeWhiteboards.get(wbKey)
      if (studentWB) {
        studentWB.strokes.push(data.stroke)
      }
      
      // Send to student's whiteboard
      io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_annotation', {
        stroke: data.stroke,
        tutorId: socket.data.userId
      })
    })

    // Student: Request full state sync
    socket.on('lcwb_sync_request', (data: {
      roomId: string
      userId: string
    }) => {
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      const wb = activeWhiteboards.get(wbKey)
      
      socket.emit('lcwb_sync_response', {
        strokes: wb?.strokes || [],
        latestSeq: whiteboardOpSeq.get(wbKey) || 0,
      })
    })

    socket.on('lcwb_replay_request', (data: {
      roomId: string
      userId: string
      scope: 'student' | 'tutor'
      sinceSeq?: number
    }) => {
      const wbKey = data.scope === 'tutor'
        ? `lcwb:tutor:${data.roomId}`
        : `lcwb:${data.roomId}:${data.userId}`
      const metric = getWhiteboardOpMetric(wbKey)
      metric.replayRequests += 1
      metric.lastActivity = Date.now()
      const sinceSeq = Math.max(0, data.sinceSeq || 0)
      const rows = (whiteboardOpLog.get(wbKey) || []).filter((row) => row.seq > sinceSeq)
      socket.emit('lcwb_replay_ops', {
        roomId: data.roomId,
        scope: data.scope,
        userId: data.userId,
        sinceSeq,
        latestSeq: whiteboardOpSeq.get(wbKey) || 0,
        ops: rows.map((row) => ({ ...row.op, _seq: row.seq })),
      })
    })

    socket.on('lcwb_selection_presence_update', (data: {
      roomId: string
      userId: string
      name: string
      role: 'tutor' | 'student'
      strokeIds: string[]
      pageId?: string
      color: string
      updatedAt?: number
    }) => {
      if (!data.roomId || !data.userId) return
      const roomMap = whiteboardSelectionPresence.get(data.roomId) || new Map<string, WhiteboardSelectionPresence>()
      roomMap.set(data.userId, {
        userId: data.userId,
        name: data.name,
        role: data.role,
        strokeIds: data.strokeIds || [],
        pageId: data.pageId,
        color: data.color,
        updatedAt: data.updatedAt || Date.now(),
      })
      whiteboardSelectionPresence.set(data.roomId, roomMap)
      socket.to(data.roomId).emit('lcwb_selection_presence_update', roomMap.get(data.userId))
    })

    socket.on('lcwb_branch_create', (data: {
      roomId: string
      scope: 'student' | 'tutor'
      userId: string
      branchName: string
    }) => {
      if (!data.branchName?.trim()) return
      const wbKey = data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
      const wb = activeWhiteboards.get(wbKey)
      const branchMap = whiteboardBranches.get(wbKey) || new Map<string, WhiteboardStroke[]>()
      branchMap.set(data.branchName.trim(), (wb?.strokes || []).map((stroke) => ({ ...stroke })))
      whiteboardBranches.set(wbKey, branchMap)
      socket.emit('lcwb_branch_list', {
        roomId: data.roomId,
        scope: data.scope,
        userId: data.userId,
        branches: Array.from(branchMap.keys()),
      })
    })

    socket.on('lcwb_branch_switch', (data: {
      roomId: string
      scope: 'student' | 'tutor'
      userId: string
      branchName: string
    }) => {
      const wbKey = data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
      const branchMap = whiteboardBranches.get(wbKey)
      const strokes = branchMap?.get(data.branchName) || null
      if (!strokes) return
      const wb = activeWhiteboards.get(wbKey)
      if (!wb) return
      wb.strokes = strokes.map((stroke) => ({ ...stroke }))
      if (data.scope === 'tutor') {
        io.to(data.roomId).emit('lcwb_tutor_strokes_reset', { strokes: wb.strokes })
      } else {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_strokes_reset', { studentId: data.userId, strokes: wb.strokes })
        socket.to(data.roomId).emit('lcwb_public_student_strokes_reset', { studentId: data.userId, strokes: wb.strokes })
      }
    })

    // Any participant: send cursor position for live presence
    socket.on('lcwb_cursor_update', (data: {
      roomId: string
      userId: string
      name: string
      role: 'tutor' | 'student'
      x: number
      y: number
      pointerMode?: 'cursor' | 'laser'
      lastUpdated?: number
    }) => {
      socket.to(data.roomId).emit('lcwb_cursor_update', data)
    })

    // Tutor: lock/unlock student drawing layers
    socket.on('lcwb_layer_lock', (data: {
      roomId: string
      locked: boolean
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      if (data.locked) moderationState.lockedLayers.add('student-personal')
      if (!data.locked) moderationState.lockedLayers.delete('student-personal')
      io.to(data.roomId).emit('lcwb_layer_locked', {
        locked: data.locked,
        by: socket.data.userId
      })
    })

    // Tutor: update visible layer config and lock map
    socket.on('lcwb_layer_config_update', (data: {
      roomId: string
      visibility: Record<string, boolean>
      lockedLayers: Array<'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'>
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      moderationState.lockedLayers = new Set(data.lockedLayers)
      io.to(data.roomId).emit('lcwb_layer_config', data)
    })

    // Tutor: spotlight tools
    socket.on('lcwb_spotlight_update', (data: {
      roomId: string
      enabled: boolean
      x: number
      y: number
      width: number
      height: number
      mode: 'rectangle' | 'pen'
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      moderationState.spotlight = {
        enabled: data.enabled,
        x: data.x,
        y: data.y,
        width: data.width,
        height: data.height,
        mode: data.mode,
      }
      io.to(data.roomId).emit('lcwb_spotlight_update', moderationState.spotlight)
    })

    // Tutor: assignment overlays/templates
    socket.on('lcwb_assignment_overlay', (data: {
      roomId: string
      overlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure'
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      moderationState.assignmentOverlay = data.overlay
      io.to(data.roomId).emit('lcwb_assignment_overlay', { overlay: data.overlay })
    })

    // Any participant: request AI hints tied to canvas region
    socket.on('lcwb_ai_region_request', async (data: {
      roomId: string
      region: { x: number; y: number; width: number; height: number }
      context?: string
    }) => {
      const ai = await generateWhiteboardRegionHint({
        region: data.region,
        context: data.context,
      })
      io.to(data.roomId).emit('lcwb_ai_region_hint', {
        requestedBy: socket.data.userId,
        region: data.region,
        hint: ai.hint,
        misconception: ai.misconception,
        provider: ai.provider,
        timestamp: Date.now(),
      })
    })

    // Snapshot capture + timeline sync
    socket.on('lcwb_snapshot_capture', (data: {
      roomId: string
      strokes: WhiteboardStroke[]
    }) => {
      const snapshot: LiveClassSnapshot = {
        id: `snap_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        createdAt: Date.now(),
        roomId: data.roomId,
        createdBy: socket.data.userId || 'unknown',
        strokes: data.strokes,
      }
      appendLiveClassSnapshot(data.roomId, snapshot)
      io.to(data.roomId).emit('lcwb_snapshot_created', snapshot)
    })

    socket.on('lcwb_snapshot_request', (data: { roomId: string }) => {
      socket.emit('lcwb_snapshot_timeline', {
        roomId: data.roomId,
        snapshots: liveClassSnapshots.get(data.roomId) || [],
      })
    })

    // Breakout-room board sync: promote to main room
    socket.on('lcwb_breakout_promote', (data: {
      mainRoomId: string
      breakoutRoomId: string
      sourceStudentId?: string
      strokes: WhiteboardStroke[]
    }) => {
      if (socket.data.role !== 'tutor') return
      io.to(data.mainRoomId).emit('lcwb_breakout_promoted', {
        breakoutRoomId: data.breakoutRoomId,
        sourceStudentId: data.sourceStudentId,
        promotedBy: socket.data.userId,
        strokes: data.strokes,
        timestamp: Date.now(),
      })
    })

    // Export + grading attachment pipeline
    socket.on('lcwb_export_attach', (data: {
      roomId: string
      sessionId?: string
      studentId?: string
      format: 'png' | 'pdf'
      fileName: string
      dataUrl: string
    }) => {
      if (socket.data.role !== 'tutor') return
      const exportItem = {
        id: `exp_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        roomId: data.roomId,
        sessionId: data.sessionId,
        studentId: data.studentId,
        format: data.format,
        fileName: data.fileName,
        dataUrl: data.dataUrl,
        createdAt: Date.now(),
        createdBy: socket.data.userId,
      }
      const exportsForRoom = liveClassExports.get(data.roomId) || []
      exportsForRoom.push(exportItem)
      liveClassExports.set(data.roomId, exportsForRoom.slice(-150))
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_export_attached', exportItem)
    })

    // Student: submit current board to tutor queue
    socket.on('lcwb_student_submit', (data: {
      roomId: string
      studentId: string
      studentName: string
      strokeCount: number
      submittedAt: number
    }) => {
      if (socket.data.role !== 'student') return
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_submitted', data)
    })

    // Tutor: mark a student submission as reviewed
    socket.on('lcwb_tutor_mark_reviewed', (data: {
      roomId: string
      studentId: string
    }) => {
      if (socket.data.role !== 'tutor') return
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_submission_reviewed', {
        studentId: data.studentId,
        tutorId: socket.data.userId
      })
      io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_submission_reviewed', {
        studentId: data.studentId,
        tutorId: socket.data.userId
      })
    })

    // Disconnect handling
    socket.on('disconnect', () => {
      const roomId = socket.data.roomId
      const userId = socket.data.userId
      const dmUserId = socket.data.dmUserId
      const wbId = socket.data.whiteboardId
      const wbUserId = socket.data.whiteboardUserId
      const pdfRoomId = socket.data.pdfRoomId as string | undefined
      
      if (roomId && userId) {
        const room = activeRooms.get(roomId)
        if (room && socket.data.role === 'student') {
          room.students.delete(userId)
          socket.to(roomId).emit('student_left', { userId })
        }
        socket.to(roomId).emit('lcwb_cursor_remove', { userId })
        const presenceMap = whiteboardSelectionPresence.get(roomId)
        if (presenceMap?.has(userId)) {
          presenceMap.delete(userId)
          socket.to(roomId).emit('lcwb_selection_presence_remove', { userId })
          if (presenceMap.size === 0) whiteboardSelectionPresence.delete(roomId)
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

      if (pdfRoomId) {
        const room = pdfCollabRooms.get(pdfRoomId)
        if (room) {
          room.lastActivity = Date.now()
          room.participants.delete(socket.id)
          broadcastPdfPresenceState(room)
        }
      }
      
      console.warn('Client disconnected:', socket.id)
    })
  })

  // Cleanup inactive rooms periodically
  setInterval(() => {
    const now = Date.now()
    activeRooms.forEach((room, roomId) => {
      // Remove rooms inactive for > 4 hours
      if (now - room.createdAt.getTime() > 4 * 60 * 60 * 1000) {
        activeRooms.delete(roomId)
        console.warn('Cleaned up inactive room:', roomId)
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
        console.warn('Cleaned up inactive DM room:', roomId)
      }
    })
  }, 30 * 60 * 1000) // Every 30 minutes

  setInterval(() => {
    const now = Date.now()
    pdfCollabRooms.forEach((room, roomId) => {
      if (now - room.lastActivity > 4 * 60 * 60 * 1000) {
        pdfCollabRooms.delete(roomId)
      }
    })
  }, 30 * 60 * 1000)

  setInterval(() => {
    const now = Date.now()
    liveDocumentShares.forEach((shares, classRoomId) => {
      shares.forEach((share, shareId) => {
        if (now - share.updatedAt > 4 * 60 * 60 * 1000) {
          shares.delete(shareId)
        }
      })
      if (shares.size === 0) {
        liveDocumentShares.delete(classRoomId)
      }
    })
  }, 30 * 60 * 1000)

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

export function initBreakoutHandlers(io: SocketIOServer, socket: Socket) {
  const emitBreakoutEvent = (roomId: string, colonEvent: string, underscoreEvent: string, payload: unknown) => {
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
            emitBreakoutEvent(room.id, 'breakout:countdown', 'breakout_countdown', {
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
            emitBreakoutEvent(room.id, 'breakout:closing_soon', 'breakout_closing_soon', { seconds: 60 })
          }, (room.timeLimit - 60) * 1000)
        }
      })

      // Notify all participants
      const roomsPayload = createdRooms.map(r => ({
          id: r.id,
          name: r.name,
          mainRoomId: r.mainRoomId,
          participants: Array.from(r.participants.values()).map((p) => ({
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
          maxParticipants: config.participantsPerRoom,
        }))

      emitBreakoutEvent(`breakout:${mainRoomId}`, 'breakout:rooms_updated', 'breakout_rooms_created', {
        rooms: roomsPayload
      })
    }, 3000) // 3 second delay for formation
  }
  socket.on('breakout_create', handleBreakoutCreate)
  socket.on('breakout:create', handleBreakoutCreate)

  // Student: Join breakout room
  const handleBreakoutJoin = (data: {
    roomId: string
    userId: string
    name?: string
  }) => {
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
      joinedAt: Date.now()
    })

    // Notify others in room
    emitBreakoutEvent(data.roomId, 'breakout:participant_joined', 'breakout_participant_joined', {
      roomId: data.roomId,
      participant: { id: data.userId, userId: data.userId, name: participantName }
    })

    // Send room history to joining participant
    socket.emit('room_state', {
      participants: Array.from(room.participants.values()),
      chatHistory: room.chatHistory,
      timeRemaining: room.timeLimit - (Date.now() - (room.startedAt?.getTime() || Date.now())) / 1000
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
      alerts: room.alerts
    })
  })

  // Send message in breakout room
  const handleBreakoutMessage = (data: {
    roomId: string
    message?: string
    content?: string
  }) => {
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
      timestamp: Date.now()
    }

    room.chatHistory.push(message)
    if (room.chatHistory.length > 100) {
      room.chatHistory = room.chatHistory.slice(-100)
    }

    emitBreakoutEvent(data.roomId, 'breakout:message', 'breakout_message', message)

    // AI monitoring for alerts
    const distressKeywords = ['stuck', 'confused', 'help', 'don\'t understand', 'lost']
    if (distressKeywords.some(kw => text.toLowerCase().includes(kw))) {
      const alert = {
        type: 'need_help' as const,
        message: `${socket.data.name} may need assistance`,
        timestamp: Date.now(),
        severity: 'medium' as const
      }
      room.alerts.push(alert)
      
      // Notify tutor
      emitBreakoutEvent(`breakout:${room.mainRoomId}`, 'breakout:alert', 'breakout_alert', {
        roomId: data.roomId,
        alert
      })
    }
  }
  socket.on('breakout_message', handleBreakoutMessage)
  socket.on('breakout:message', handleBreakoutMessage)

  // Student: Request help
  const handleBreakoutRequestHelp = (data: {
    roomId: string
    userId?: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (!room) return

    emitBreakoutEvent(`breakout:${room.mainRoomId}`, 'breakout:help_requested', 'breakout_help_requested', {
      roomId: data.roomId,
      participantId: data.userId || socket.data.breakoutUserId
    })
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
      emitBreakoutEvent(roomId, 'breakout:broadcast', 'breakout_broadcast', { message: data.message })
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
  const handleBreakoutLeave = (data: {
    roomId: string
    userId: string
  }) => {
    const room = breakoutRooms.get(data.roomId)
    if (room) {
      room.participants.delete(data.userId)
      emitBreakoutEvent(data.roomId, 'breakout:participant_left', 'breakout_participant_left', {
        roomId: data.roomId,
        participantId: data.userId
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

export function exportWhiteboard(whiteboardId: string): {
  whiteboardId: string
  roomId: string
  strokes: WhiteboardStroke[]
  shapes: WhiteboardShape[]
  texts: WhiteboardText[]
  backgroundColor: string
  backgroundStyle: string
  exportedAt: string
} | null {
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
  activeWhiteboards.forEach((wb) => {
    // Remove whiteboards with no active users for > 2 hours
    if (wb.activeUsers.size === 0) {
      // Check if we have a last activity timestamp
      // For now, we'll keep them since we don't track last activity per whiteboard
      // In production, add lastActivity timestamp and clean up accordingly
    }
  })
}, 60 * 60 * 1000) // Every hour

// ============================================
// POLL SYSTEM
// ============================================

interface PollState {
  id: string
  sessionId: string
  tutorId: string
  question: string
  type: 'multiple_choice' | 'true_false' | 'rating' | 'short_answer' | 'word_cloud'
  options: {
    id: string
    label: string
    text: string
    color?: string
  }[]
  isAnonymous: boolean
  allowMultiple: boolean
  showResults: boolean
  timeLimit?: number
  status: 'draft' | 'active' | 'closed'
  startedAt?: number
  endedAt?: number
  responses: {
    id: string
    respondentHash?: string
    optionIds?: string[]
    rating?: number
    textAnswer?: string
    studentId?: string
    createdAt: number
  }[]
  timer?: NodeJS.Timeout
}

// In-memory poll storage (per session)
const activePolls = new Map<string, PollState>() // pollId -> PollState
const sessionPolls = new Map<string, Set<string>>() // sessionId -> Set<pollId>

type PollListCallback = (result: {
  success: boolean
  polls: Array<{
    id: string
    sessionId: string
    tutorId: string
    question: string
    type: PollState['type']
    options: PollState['options']
    isAnonymous: boolean
    allowMultiple: boolean
    showResults: boolean
    timeLimit?: number
    status: PollState['status']
    startedAt?: string
    endedAt?: string
    responses: Array<{
      id: string
      optionIds?: string[]
      rating?: number
      textAnswer?: string
      studentId?: string
      createdAt: string
    }>
    totalResponses: number
    createdAt: string
  }>
}) => void

export function initPollHandlers(io: SocketIOServer, socket: Socket) {
  // Join poll room for a session
  socket.on('poll:join', (data: { sessionId: string }) => {
    socket.join(`poll:${data.sessionId}`)
    socket.data.pollSessionId = data.sessionId
  })

  // Leave poll room
  socket.on('poll:leave', (data: { sessionId: string }) => {
    socket.leave(`poll:${data.sessionId}`)
    delete socket.data.pollSessionId
  })

  // Get list of polls for session
  socket.on('poll:list', (data: { sessionId: string }, callback: PollListCallback) => {
    const pollIds = sessionPolls.get(data.sessionId) || new Set()
    const polls = Array.from(pollIds)
      .map(id => activePolls.get(id))
      .filter((p): p is PollState => p !== undefined)
      .map(p => ({
        id: p.id,
        sessionId: p.sessionId,
        tutorId: p.tutorId,
        question: p.question,
        type: p.type,
        options: p.options,
        isAnonymous: p.isAnonymous,
        allowMultiple: p.allowMultiple,
        showResults: p.showResults,
        timeLimit: p.timeLimit,
        status: p.status,
        startedAt: p.startedAt ? new Date(p.startedAt).toISOString() : undefined,
        endedAt: p.endedAt ? new Date(p.endedAt).toISOString() : undefined,
        responses: p.responses.map(r => ({
          id: r.id,
          optionIds: r.optionIds,
          rating: r.rating,
          textAnswer: r.textAnswer,
          studentId: p.isAnonymous ? undefined : r.studentId,
          createdAt: new Date(r.createdAt).toISOString()
        })),
        totalResponses: p.responses.length,
        createdAt: new Date().toISOString()
      }))

    callback({ success: true, polls })
  })

  // Create new poll
  socket.on('poll:create', (data: {
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

    const pollId = `poll-${data.sessionId}-${Date.now()}`
    const poll: PollState = {
      id: pollId,
      sessionId: data.sessionId,
      tutorId: socket.data.userId,
      question: data.question,
      type: data.type as PollState['type'],
      options: data.options.map((opt, i) => ({
        id: `opt-${pollId}-${i}`,
        label: opt.label || String.fromCharCode(65 + i),
        text: opt.text,
        color: getPollOptionColor(i)
      })),
      isAnonymous: data.isAnonymous,
      allowMultiple: data.allowMultiple,
      showResults: data.showResults,
      timeLimit: data.timeLimit,
      status: 'draft',
      responses: []
    }

    activePolls.set(pollId, poll)
    
    // Add to session polls
    if (!sessionPolls.has(data.sessionId)) {
      sessionPolls.set(data.sessionId, new Set())
    }
    sessionPolls.get(data.sessionId)!.add(pollId)

    // Broadcast to session
    io.to(`poll:${data.sessionId}`).emit('poll:created', formatPollForBroadcast(poll))
  })

  // Start poll
  socket.on('poll:start', (data: { pollId: string; sessionId: string }) => {
    if (socket.data.role !== 'tutor') return

    const poll = activePolls.get(data.pollId)
    if (!poll || poll.sessionId !== data.sessionId) return

    poll.status = 'active'
    poll.startedAt = Date.now()

    // Set timer if time limit specified
    if (poll.timeLimit) {
      poll.timer = setTimeout(() => {
        endPoll(io, data.pollId)
      }, poll.timeLimit * 1000)
    }

    // Broadcast to session
    io.to(`poll:${data.sessionId}`).emit('poll:started', formatPollForBroadcast(poll))
  })

  // End poll
  socket.on('poll:end', (data: { pollId: string; sessionId: string }) => {
    if (socket.data.role !== 'tutor') return
    endPoll(io, data.pollId)
  })

  // Delete poll
  socket.on('poll:delete', (data: { pollId: string; sessionId: string }) => {
    if (socket.data.role !== 'tutor') return

    const poll = activePolls.get(data.pollId)
    if (!poll || poll.sessionId !== data.sessionId) return

    // Clear timer if exists
    if (poll.timer) {
      clearTimeout(poll.timer)
    }

    activePolls.delete(data.pollId)
    sessionPolls.get(data.sessionId)?.delete(data.pollId)

    io.to(`poll:${data.sessionId}`).emit('poll:deleted', data.pollId)
  })

  // Submit vote
  socket.on('poll:vote', async (data: {
    pollId: string
    sessionId: string
    optionIds?: string[]
    rating?: number
    textAnswer?: string
  }) => {
    const poll = activePolls.get(data.pollId)
    if (!poll || poll.sessionId !== data.sessionId) return
    if (poll.status !== 'active') return

    const userId = socket.data.userId
    
    // Check for duplicate vote (for non-anonymous polls, check by userId)
    if (!poll.isAnonymous) {
      const existingVote = poll.responses.find(r => r.studentId === userId)
      if (existingVote) return
    } else {
      // For anonymous polls, use a hash of userId + pollId
      const respondentHash = await hashString(`${userId}:${data.pollId}`)
      const existingVote = poll.responses.find(r => r.respondentHash === respondentHash)
      if (existingVote) return
    }

    const response = {
      id: `resp-${data.pollId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      respondentHash: poll.isAnonymous ? await hashString(`${userId}:${data.pollId}`) : undefined,
      optionIds: data.optionIds,
      rating: data.rating,
      textAnswer: data.textAnswer,
      studentId: poll.isAnonymous ? undefined : userId,
      createdAt: Date.now()
    }

    poll.responses.push(response)

    // Broadcast updated poll
    io.to(`poll:${data.sessionId}`).emit('poll:updated', formatPollForBroadcast(poll))
    
    // Confirm vote to sender
    socket.emit('poll:vote:confirmed', { pollId: data.pollId })
  })
}

function endPoll(io: SocketIOServer, pollId: string) {
  const poll = activePolls.get(pollId)
  if (!poll || poll.status === 'closed') return

  poll.status = 'closed'
  poll.endedAt = Date.now()

  // Clear timer
  if (poll.timer) {
    clearTimeout(poll.timer)
    poll.timer = undefined
  }

  // Broadcast to session
  io.to(`poll:${poll.sessionId}`).emit('poll:ended', formatPollForBroadcast(poll))
}

function formatPollForBroadcast(poll: PollState) {
  return {
    id: poll.id,
    sessionId: poll.sessionId,
    tutorId: poll.tutorId,
    question: poll.question,
    type: poll.type,
    options: poll.options,
    isAnonymous: poll.isAnonymous,
    allowMultiple: poll.allowMultiple,
    showResults: poll.showResults,
    timeLimit: poll.timeLimit,
    status: poll.status,
    startedAt: poll.startedAt ? new Date(poll.startedAt).toISOString() : undefined,
    endedAt: poll.endedAt ? new Date(poll.endedAt).toISOString() : undefined,
    responses: poll.responses.map(r => ({
      id: r.id,
      optionIds: r.optionIds,
      rating: r.rating,
      textAnswer: r.textAnswer,
      studentId: poll.isAnonymous ? undefined : r.studentId,
      createdAt: new Date(r.createdAt).toISOString()
    })),
    totalResponses: poll.responses.length,
    createdAt: new Date().toISOString()
  }
}

function getPollOptionColor(index: number): string {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
  ]
  return colors[index % colors.length]
}

async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export function getPollState(pollId: string): PollState | undefined {
  return activePolls.get(pollId)
}

export function getSessionPolls(sessionId: string): PollState[] {
  const pollIds = sessionPolls.get(sessionId)
  if (!pollIds) return []
  return Array.from(pollIds)
    .map(id => activePolls.get(id))
    .filter((p): p is PollState => p !== undefined)
}
