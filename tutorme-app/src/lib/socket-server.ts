/**
 * Socket.io Server for Live Class System
 * Orchestrates real-time handlers; state, types, auth, constants in @/lib/socket.
 */

import { Server as NetServer } from 'http'
import { Server as SocketIOServer, Socket } from 'socket.io'
import * as Y from 'yjs'
import { generateWithFallback } from '@/lib/ai/orchestrator'
import {
  CHAT_HISTORY_MAX,
  CHAT_HISTORY_SLICE_TO_STUDENT,
  LIVE_CLASS_EXPORTS_MAX,
  LIVE_CLASS_SNAPSHOTS_MAX,
  MATH_WB_EMPTY_ROOM_CLEANUP_MS,
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
  getSocketCorsOrigin,
  socketAuthMiddleware,
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

// Re-export for consumers
export type { StudentStatus, StudentState, ClassRoom, ChatMessage, BreakoutRoom, WhiteboardOpObservabilitySnapshot, MathSyncObservabilitySnapshot, PollState, DirectMessageRoom, WhiteboardState, WhiteboardStroke, WhiteboardShape, WhiteboardText } from '@/lib/socket'
export { getRoomState, getBreakoutRoomState, getDMRoomState, getUserSocketId, isUserOnline, broadcastToUser, getWhiteboardState, clearWhiteboard, exportWhiteboard, getWhiteboardOpObservability, getMathSyncObservability, getPollState, getSessionPolls } from '@/lib/socket'

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

/** Called when a socket disconnects to clear lcwb selection presence; used by both initSocketServer and enhanced server. */
export function cleanupLcwbPresence(io: SocketIOServer, roomId: string, userId: string): void {
  const presenceMap = whiteboardSelectionPresence.get(roomId)
  if (presenceMap?.has(userId)) {
    presenceMap.delete(userId)
    io.to(roomId).emit('lcwb_selection_presence_remove', { userId })
    if (presenceMap.size === 0) whiteboardSelectionPresence.delete(roomId)
  }
}

/** Registers all live-class whiteboard (lcwb_*) handlers on the given socket. Shared by initSocketServer and socket-server-enhanced. */
export function registerLiveClassWhiteboardHandlers(io: SocketIOServer, socket: Socket): void {
  // ============================================
  // LIVE CLASS WHITEBOARD - NEW EVENTS
  // ============================================

  socket.on('lcwb_broadcast_start', (data: {
    roomId: string
    whiteboardId: string
  }) => {
    if (socket.data.role !== 'tutor') return

    socket.join(`lcwb:tutor:${data.roomId}`)

    io.to(data.roomId).emit('lcwb_tutor_broadcasting', {
      whiteboardId: data.whiteboardId,
      tutorId: socket.data.userId,
      layerId: 'tutor-broadcast'
    })
  })

  socket.on('lcwb_broadcast_stop', (data: { roomId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.leave(`lcwb:tutor:${data.roomId}`)
    io.to(data.roomId).emit('lcwb_tutor_broadcast_stopped')
  })

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
    socket.to(data.roomId).emit('lcwb_tutor_stroke', data.stroke)
  })

  socket.on('lcwb_student_join', (data: {
    roomId: string
    userId: string
    name: string
  }) => {
    if (socket.data.role !== 'student') return
    socket.join(`lcwb:student:${data.roomId}:${data.userId}`)
    socket.data.lcwbRoomId = data.roomId
    socket.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_whiteboard_created', {
      studentId: data.userId,
      name: data.name
    })
  })

  socket.on('lcwb_student_update', (data: {
    roomId: string
    userId: string
    stroke: WhiteboardStroke
    visibility: 'private' | 'tutor-only' | 'public'
  }) => {
    if (socket.data.role !== 'student') return
    const moderationState = getLiveClassModerationState(data.roomId)
    if (moderationState.mutedStudents.has(data.userId)) {
      socket.emit('lcwb_moderation_warning', { code: 'DRAW_MUTED', message: 'Your drawing is temporarily muted by the tutor.' })
      return
    }
    const windowNow = Date.now()
    const counter = moderationState.strokeCounters.get(data.userId)
    if (!counter || windowNow - counter.startedAt > moderationState.strokeWindowMs) {
      moderationState.strokeCounters.set(data.userId, { count: 1, startedAt: windowNow })
    } else {
      counter.count += 1
      if (counter.count > moderationState.studentStrokeWindowLimit) {
        socket.emit('lcwb_moderation_warning', { code: 'RATE_LIMITED', message: 'Drawing too quickly. Please slow down.', limit: moderationState.studentStrokeWindowLimit })
        return
      }
    }
    if (data.stroke.layerId && moderationState.lockedLayers.has(data.stroke.layerId)) {
      socket.emit('lcwb_moderation_warning', { code: 'LAYER_LOCKED', message: 'This layer is currently locked by the tutor.', layerId: data.stroke.layerId })
      return
    }
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
    if (data.visibility !== 'private') {
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke', { studentId: data.userId, stroke: data.stroke })
    }
    if (data.visibility === 'public') {
      socket.to(data.roomId).emit('lcwb_public_student_stroke', { studentId: data.userId, stroke: data.stroke })
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
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', { studentId: data.userId, ops })
    }
    if (data.visibility === 'public') {
      socket.to(data.roomId).emit('lcwb_public_student_stroke_ops', { studentId: data.userId, ops })
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
    const currentIds = new Set(current.map((s) => s.id))
    const nextIds = new Set((data.strokes || []).map((s) => s.id))
    const base = Date.now()
    const rawOps: WhiteboardStrokeOp[] = [
      ...(data.strokes || []).map((stroke, i) => ({ kind: 'upsert' as const, stroke, opId: `${wbKey}:replace:${base}-u${i}` })),
      ...Array.from(currentIds).filter((id) => !nextIds.has(id)).map((id, i) => ({ kind: 'delete' as const, strokeId: id, opId: `${wbKey}:replace:${base}-d${i}` })),
    ]
    const sanitized = sanitizeWhiteboardOps(wbKey, rawOps)
    const ops = sanitized.valid
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
    metric.receivedOps += rawOps.length
    metric.malformedDrops += sanitized.malformed.length
    metric.duplicateDrops += sanitized.duplicates.length
    pushWhiteboardDeadLetters(wbKey, 'malformed', sanitized.malformed)
    pushWhiteboardDeadLetters(wbKey, 'duplicate', sanitized.duplicates)
    const result = applyStrokeOps(studentWB.strokes, ops)
    studentWB.strokes = result.next
    metric.appliedOps += result.appliedCount
    metric.conflictDrops += result.conflictDrops
    metric.queueDepth = Math.max(0, metric.queueDepth - ops.length)
    for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
    trimWhiteboardOpTimestamps(metric)
    if (data.visibility !== 'private') {
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', { studentId: data.userId, ops })
    }
    if (data.visibility === 'public') {
      socket.to(data.roomId).emit('lcwb_public_student_stroke_ops', { studentId: data.userId, ops })
    }
  })

  socket.on('lcwb_tutor_replace_strokes', (data: { roomId: string; strokes: WhiteboardStroke[] }) => {
    if (socket.data.role !== 'tutor') return
    const roomWBKey = `lcwb:tutor:${data.roomId}`
    const current = activeWhiteboards.get(roomWBKey)?.strokes || []
    const currentIds = new Set(current.map((s) => s.id))
    const nextIds = new Set((data.strokes || []).map((s) => s.id))
    const base = Date.now()
    const rawOps: WhiteboardStrokeOp[] = [
      ...(data.strokes || []).map((stroke, i) => ({ kind: 'upsert' as const, stroke, opId: `${roomWBKey}:replace:${base}-u${i}` })),
      ...Array.from(currentIds).filter((id) => !nextIds.has(id)).map((id, i) => ({ kind: 'delete' as const, strokeId: id, opId: `${roomWBKey}:replace:${base}-d${i}` })),
    ]
    const sanitized = sanitizeWhiteboardOps(roomWBKey, rawOps)
    const ops = sanitized.valid
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
    metric.receivedOps += rawOps.length
    metric.malformedDrops += sanitized.malformed.length
    metric.duplicateDrops += sanitized.duplicates.length
    pushWhiteboardDeadLetters(roomWBKey, 'malformed', sanitized.malformed)
    pushWhiteboardDeadLetters(roomWBKey, 'duplicate', sanitized.duplicates)
    const result = applyStrokeOps(roomWB.strokes, ops)
    roomWB.strokes = result.next
    metric.appliedOps += result.appliedCount
    metric.conflictDrops += result.conflictDrops
    metric.queueDepth = Math.max(0, metric.queueDepth - ops.length)
    for (let i = 0; i < result.appliedCount; i += 1) metric.recentAppliedTimestamps.push(Date.now())
    trimWhiteboardOpTimestamps(metric)
    io.to(data.roomId).emit('lcwb_tutor_stroke_ops', { ops })
  })

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

  socket.on('lcwb_clear_own', (data: { roomId: string; userId: string }) => {
    if (socket.data.userId !== data.userId) return
    const wbKey = `lcwb:${data.roomId}:${data.userId}`
    const studentWB = activeWhiteboards.get(wbKey)
    if (studentWB) studentWB.strokes = studentWB.strokes.filter((s) => s.userId !== data.userId)
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_cleared_own', { studentId: data.userId })
    io.to(`lcwb:student:${data.roomId}:${data.userId}`).emit('lcwb_student_cleared_own', { studentId: data.userId })
  })

  socket.on('lcwb_visibility_change', (data: {
    roomId: string
    userId: string
    visibility: 'private' | 'tutor-only' | 'public'
  }) => {
    if (socket.data.role !== 'student') return
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_visibility_changed', { studentId: data.userId, visibility: data.visibility })
    if (data.visibility === 'public') {
      socket.to(data.roomId).emit('lcwb_student_public', { studentId: data.userId, name: socket.data.name })
    }
  })

  socket.on('lcwb_tutor_view_student', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.join(`lcwb:student:${data.roomId}:${data.studentId}`)
    const wbKey = `lcwb:${data.roomId}:${data.studentId}`
    const studentWB = activeWhiteboards.get(wbKey)
    socket.emit('lcwb_student_whiteboard_state', { studentId: data.studentId, strokes: studentWB?.strokes || [] })
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_viewing', { tutorId: socket.data.userId, tutorName: socket.data.name })
  })

  socket.on('lcwb_tutor_stop_view', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.leave(`lcwb:student:${data.roomId}:${data.studentId}`)
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_stopped_viewing', { tutorId: socket.data.userId })
  })

  socket.on('lcwb_tutor_annotate', (data: { roomId: string; studentId: string; stroke: WhiteboardStroke }) => {
    if (socket.data.role !== 'tutor') return
    const wbKey = `lcwb:${data.roomId}:${data.studentId}`
    const studentWB = activeWhiteboards.get(wbKey)
    if (studentWB) studentWB.strokes.push(data.stroke)
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_annotation', { stroke: data.stroke, tutorId: socket.data.userId })
  })

  socket.on('lcwb_sync_request', (data: { roomId: string; userId: string }) => {
    const wbKey = `lcwb:${data.roomId}:${data.userId}`
    const wb = activeWhiteboards.get(wbKey)
    socket.emit('lcwb_sync_response', { strokes: wb?.strokes || [], latestSeq: whiteboardOpSeq.get(wbKey) || 0 })
  })

  socket.on('lcwb_replay_request', (data: { roomId: string; userId: string; scope: 'student' | 'tutor'; sinceSeq?: number }) => {
    const wbKey = data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
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

  socket.on('lcwb_branch_create', (data: { roomId: string; scope: 'student' | 'tutor'; userId: string; branchName: string }) => {
    if (!data.branchName?.trim()) return
    const wbKey = data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
    const wb = activeWhiteboards.get(wbKey)
    const branchMap = whiteboardBranches.get(wbKey) || new Map<string, WhiteboardStroke[]>()
    branchMap.set(data.branchName.trim(), (wb?.strokes || []).map((s) => ({ ...s })))
    whiteboardBranches.set(wbKey, branchMap)
    socket.emit('lcwb_branch_list', { roomId: data.roomId, scope: data.scope, userId: data.userId, branches: Array.from(branchMap.keys()) })
  })

  socket.on('lcwb_branch_switch', (data: { roomId: string; scope: 'student' | 'tutor'; userId: string; branchName: string }) => {
    const wbKey = data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
    const branchMap = whiteboardBranches.get(wbKey)
    const strokes = branchMap?.get(data.branchName) || null
    if (!strokes) return
    const wb = activeWhiteboards.get(wbKey)
    if (!wb) return
    wb.strokes = strokes.map((s) => ({ ...s }))
    if (data.scope === 'tutor') {
      io.to(data.roomId).emit('lcwb_tutor_strokes_reset', { strokes: wb.strokes })
    } else {
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_strokes_reset', { studentId: data.userId, strokes: wb.strokes })
      socket.to(data.roomId).emit('lcwb_public_student_strokes_reset', { studentId: data.userId, strokes: wb.strokes })
    }
  })

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

  socket.on('lcwb_layer_lock', (data: { roomId: string; locked: boolean }) => {
    if (socket.data.role !== 'tutor') return
    const moderationState = getLiveClassModerationState(data.roomId)
    if (data.locked) moderationState.lockedLayers.add('student-personal')
    if (!data.locked) moderationState.lockedLayers.delete('student-personal')
    io.to(data.roomId).emit('lcwb_layer_locked', { locked: data.locked, by: socket.data.userId })
  })

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
    moderationState.spotlight = { enabled: data.enabled, x: data.x, y: data.y, width: data.width, height: data.height, mode: data.mode }
    io.to(data.roomId).emit('lcwb_spotlight_update', moderationState.spotlight)
  })

  socket.on('lcwb_assignment_overlay', (data: { roomId: string; overlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure' }) => {
    if (socket.data.role !== 'tutor') return
    const moderationState = getLiveClassModerationState(data.roomId)
    moderationState.assignmentOverlay = data.overlay
    io.to(data.roomId).emit('lcwb_assignment_overlay', { overlay: data.overlay })
  })

  socket.on('lcwb_ai_region_request', async (data: {
    roomId: string
    region: { x: number; y: number; width: number; height: number }
    context?: string
  }) => {
    const key = `ai_region:${data.roomId}:${socket.data.userId ?? socket.id}`
    const now = Date.now()
    let state = lcwbAiRegionRateLimit.get(key)
    if (!state || now >= state.resetAt) {
      state = { count: 0, resetAt: now + LCWB_AI_REGION_RATE_WINDOW_MS }
      lcwbAiRegionRateLimit.set(key, state)
    }
    state.count += 1
    if (state.count > LCWB_AI_REGION_RATE_LIMIT_PER_MIN) {
      socket.emit('lcwb_ai_region_error', { code: 'RATE_LIMITED', message: 'Too many AI hint requests. Please wait.' })
      return
    }

    const ai = await generateWhiteboardRegionHint({ region: data.region, context: data.context })
    io.to(data.roomId).emit('lcwb_ai_region_hint', {
      requestedBy: socket.data.userId,
      region: data.region,
      hint: ai.hint,
      misconception: ai.misconception,
      provider: ai.provider,
      timestamp: Date.now(),
    })
  })

  socket.on('lcwb_snapshot_capture', (data: { roomId: string; strokes: WhiteboardStroke[] }) => {
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
    socket.emit('lcwb_snapshot_timeline', { roomId: data.roomId, snapshots: liveClassSnapshots.get(data.roomId) || [] })
  })

  socket.on('lcwb_breakout_promote', (data: { mainRoomId: string; breakoutRoomId: string; sourceStudentId?: string; strokes: WhiteboardStroke[] }) => {
    if (socket.data.role !== 'tutor') return
    io.to(data.mainRoomId).emit('lcwb_breakout_promoted', {
      breakoutRoomId: data.breakoutRoomId,
      sourceStudentId: data.sourceStudentId,
      promotedBy: socket.data.userId,
      strokes: data.strokes,
      timestamp: Date.now(),
    })
  })

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
    liveClassExports.set(data.roomId, exportsForRoom.slice(-LIVE_CLASS_EXPORTS_MAX))
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_export_attached', exportItem)
  })

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

  socket.on('lcwb_tutor_mark_reviewed', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_submission_reviewed', { studentId: data.studentId, tutorId: socket.data.userId })
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_submission_reviewed', { studentId: data.studentId, tutorId: socket.data.userId })
  })
}

export function initSocketServer(server: NetServer) {
  const io = new SocketIOServer(server, {
    path: '/api/socket',
    cors: {
      origin: getSocketCorsOrigin(),
      methods: ['GET', 'POST'],
      credentials: true,
    },
  })

  io.use(socketAuthMiddleware)

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
      userId?: string
      name?: string
      role?: 'student' | 'tutor'
      tutorId?: string
    }) => {
      const roomId = typeof data?.roomId === 'string' ? data.roomId.trim().slice(0, ROOM_ID_MAX_LENGTH) : ''
      if (!roomId) return

      const authUserId = socket.data.userId as string | undefined
      const authRole = socket.data.role as string | undefined
      const useAuth = Boolean(authUserId)

      const userId = useAuth ? authUserId : (typeof data.userId === 'string' ? data.userId.trim().slice(0, USER_ID_MAX_LENGTH) : '')
      const name = useAuth ? (socket.data.name as string) ?? '' : (typeof data.name === 'string' ? data.name.trim().slice(0, NAME_MAX_LENGTH) : 'Unknown')
      const role = useAuth ? (authRole === 'tutor' || authRole === 'student' ? authRole : 'student') : (data.role === 'tutor' || data.role === 'student' ? data.role : 'student')

      if (!userId) return

      socket.join(roomId)
      socket.data.userId = userId
      socket.data.roomId = roomId
      socket.data.role = role
      socket.data.name = name || 'Unknown'

      const tutorId = data.tutorId

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
          chatHistory: room.chatHistory.slice(-CHAT_HISTORY_SLICE_TO_STUDENT),
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
      if (room.events.length > PDF_EVENTS_MAX) {
        room.events = room.events.slice(-PDF_EVENTS_MAX)
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
      io.to(room.roomId).emit('math_tl_snapshot', {
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
      io.to(room.roomId).emit('math_yjs_update', {
        sessionId: payload.sessionId,
        update: payload.update,
        actorId: participant?.userId,
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

      const rawText = typeof data.text === 'string' ? data.text : ''
      const text = rawText.slice(0, MAX_CHAT_MESSAGE_LENGTH)
      if (!text.trim()) return

      const message: ChatMessage = {
        id: `${Date.now()}-${socket.data.userId}`,
        userId: socket.data.userId,
        name: socket.data.name || 'Unknown',
        text,
        timestamp: Date.now()
      }

      room.chatHistory.push(message)
      
      if (room.chatHistory.length > CHAT_HISTORY_MAX) {
        room.chatHistory = room.chatHistory.slice(-CHAT_HISTORY_MAX)
      }

      // Broadcast to all in room
      io.to(roomId).emit('chat_message', message)

      // Check for distress signals
      const distressKeywords = ['stuck', 'don\'t get it', 'confused', 'help', '???', 'lost']
      const lowerText = text.toLowerCase()
      if (distressKeywords.some(kw => lowerText.includes(kw))) {
        const student = room.students.get(socket.data.userId)
        if (student) {
          student.status = 'struggling'
          student.frustration = Math.min(100, student.frustration + 20)
          
          // Notify tutor
          socket.to(roomId).emit('student_distress', {
            userId: socket.data.userId,
            name: student.name,
            message: text,
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
    socket.on('dm_join_conversation', async (data: { conversationId: string; userId: string }) => {
      const { conversationId, userId } = data
      if (!conversationId || !userId) return

      socket.join(`conversation:${conversationId}`)
      socket.data.currentConversation = conversationId

      let room = directMessageRooms.get(conversationId)
      if (!room) {
        const ids = await getConversationParticipantIds(conversationId)
        room = {
          conversationId,
          participant1Id: ids?.participant1Id ?? '',
          participant2Id: ids?.participant2Id ?? '',
          typingUsers: new Set(),
          lastActivity: Date.now(),
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
      const content = typeof data.content === 'string' ? data.content.slice(0, MAX_DM_MESSAGE_LENGTH) : ''
      const room = directMessageRooms.get(data.conversationId)
      if (room) {
        room.lastActivity = Date.now()
        room.typingUsers.delete(data.senderId)
      }

      const payload = { ...data, content }
      io.to(`conversation:${data.conversationId}`).emit('dm_message', {
        ...payload,
        sender: {
          id: data.senderId,
          name: socket.data.name || 'Unknown'
        }
      })

      const otherId = room && (data.senderId === room.participant1Id ? room.participant2Id : room.participant1Id)
      const recipientSocketId = otherId ? userSocketMap.get(otherId) : undefined
      if (recipientSocketId) {
        const recipientSocket = io.sockets.sockets.get(recipientSocketId)
        if (recipientSocket && recipientSocket.data.currentConversation !== data.conversationId) {
          recipientSocket.emit('dm_notification', {
            conversationId: data.conversationId,
            senderId: data.senderId,
            senderName: socket.data.name || 'Unknown',
            preview: content.slice(0, 100),
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

    // Clear whiteboard (tutor or same user only; socket must be in room)
    socket.on('wb_clear', (data: {
      whiteboardId: string
      userId: string
    }) => {
      const wbRoom = `wb:${data.whiteboardId}`
      if (!socket.rooms.has(wbRoom)) return
      const isTutor = socket.data.role === 'tutor'
      const isSameUser = data.userId === socket.data.userId
      if (!isTutor && !isSameUser) return

      const wb = activeWhiteboards.get(data.whiteboardId)
      if (wb) {
        wb.strokes = []
        wb.shapes = []
        wb.texts = []
        io.to(wbRoom).emit('wb_cleared', { userId: data.userId })
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

    registerLiveClassWhiteboardHandlers(io, socket)

    // Single disconnect handler: math WB, class room, DM, whiteboard, PDF, lcwb
    socket.on('disconnect', () => {
      const roomId = socket.data.roomId
      const userId = socket.data.userId
      const dmUserId = socket.data.dmUserId
      const wbId = socket.data.whiteboardId
      const wbUserId = socket.data.whiteboardUserId
      const pdfRoomId = socket.data.pdfRoomId as string | undefined

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
          if (room.participants.size === 0) {
            setTimeout(() => {
              if (room.participants.size === 0) {
                mathWhiteboardRooms.delete(key)
                console.warn(`[MathWB] Cleaned up empty room ${key}`)
              }
            }, MATH_WB_EMPTY_ROOM_CLEANUP_MS)
          }
        }
      })

      if (roomId && userId) {
        const room = activeRooms.get(roomId)
        if (room && socket.data.role === 'student') {
          room.students.delete(userId)
          socket.to(roomId).emit('student_left', { userId })
        }
        socket.to(roomId).emit('lcwb_cursor_remove', { userId })
        cleanupLcwbPresence(io, roomId, userId)
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
      if (now - room.createdAt.getTime() > ROOM_IDLE_CLEANUP_MS) {
        activeRooms.delete(roomId)
        console.warn('Cleaned up inactive room:', roomId)
      }
    })
  }, ROOM_CLEANUP_INTERVAL_MS)

  setInterval(() => {
    const now = Date.now()
    directMessageRooms.forEach((room, roomId) => {
      if (now - room.lastActivity > DM_ROOM_IDLE_CLEANUP_MS) {
        directMessageRooms.delete(roomId)
        console.warn('Cleaned up inactive DM room:', roomId)
      }
    })
  }, DM_CLEANUP_INTERVAL_MS)

  setInterval(() => {
    const now = Date.now()
    pdfCollabRooms.forEach((room, roomId) => {
      if (now - room.lastActivity > ROOM_IDLE_CLEANUP_MS) {
        pdfCollabRooms.delete(roomId)
      }
    })
  }, PDF_CLEANUP_INTERVAL_MS)

  setInterval(() => {
    const now = Date.now()
    liveDocumentShares.forEach((shares, classRoomId) => {
      shares.forEach((share, shareId) => {
        if (now - share.updatedAt > ROOM_IDLE_CLEANUP_MS) {
          shares.delete(shareId)
        }
      })
      if (shares.size === 0) {
        liveDocumentShares.delete(classRoomId)
      }
    })
  }, LIVE_DOC_CLEANUP_INTERVAL_MS)

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
    if (room.chatHistory.length > CHAT_HISTORY_MAX) {
      room.chatHistory = room.chatHistory.slice(-CHAT_HISTORY_MAX)
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
      id: `resp-${data.pollId}-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
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
