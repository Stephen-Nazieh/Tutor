/**
 * Socket.io Server for Live Class System
 * Orchestrates real-time handlers; state, types, auth, constants in @/lib/socket.
 */

import { Server as NetServer } from 'http'
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
export type {
  StudentStatus,
  StudentState,
  ClassRoom,
  ChatMessage,
  BreakoutRoom,
  WhiteboardOpObservabilitySnapshot,
  MathSyncObservabilitySnapshot,
  PollState,
  DirectMessageRoom,
  WhiteboardState,
  WhiteboardStroke,
  WhiteboardShape,
  WhiteboardText,
} from '@/lib/socket'
export {
  getRoomState,
  getBreakoutRoomState,
  getDMRoomState,
  getUserSocketId,
  isUserOnline,
  broadcastToUser,
  getWhiteboardState,
  clearWhiteboard,
  exportWhiteboard,
  getWhiteboardOpObservability,
  getMathSyncObservability,
  getPollState,
  getSessionPolls,
} from '@/lib/socket'

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
    const schema = z.object({ hint: z.string(), misconception: z.string() })
    const parsed = safeJsonParseWithSchema(raw, schema, { extract: true })
    if (parsed.data) {
      return {
        hint: parsed.data.hint,
        misconception: parsed.data.misconception,
        provider: result.provider,
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

  socket.on('lcwb_broadcast_start', (data: { roomId: string; whiteboardId: string }) => {
    if (socket.data.role !== 'tutor') return

    socket.join(`lcwb:tutor:${data.roomId}`)

    io.to(data.roomId).emit('lcwb_tutor_broadcasting', {
      whiteboardId: data.whiteboardId,
      tutorId: socket.data.userId,
      layerId: 'tutor-broadcast',
    })
  })

  socket.on('lcwb_broadcast_stop', (data: { roomId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.leave(`lcwb:tutor:${data.roomId}`)
    io.to(data.roomId).emit('lcwb_tutor_broadcast_stopped')
  })

  socket.on('lcwb_stroke_broadcast', (data: { roomId: string; stroke: WhiteboardStroke }) => {
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
        backgroundStyle: 'solid',
      }
      activeWhiteboards.set(roomWBKey, roomWB)
    }
    roomWB.strokes.push({ ...data.stroke, layerId: data.stroke.layerId || 'tutor-broadcast' })
    socket.to(data.roomId).emit('lcwb_tutor_stroke', data.stroke)
  })

  socket.on('lcwb_student_join', (data: { roomId: string; userId: string; name: string }) => {
    if (socket.data.role !== 'student') return
    socket.join(`lcwb:student:${data.roomId}:${data.userId}`)
    socket.data.lcwbRoomId = data.roomId
    socket.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_whiteboard_created', {
      studentId: data.userId,
      name: data.name,
    })
  })

  socket.on(
    'lcwb_student_update',
    (data: {
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
          backgroundStyle: 'solid',
        }
        activeWhiteboards.set(wbKey, studentWB)
      }
      studentWB.strokes.push({ ...data.stroke, layerId: data.stroke.layerId || 'student-personal' })
      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke', {
          studentId: data.userId,
          stroke: data.stroke,
        })
      }
      if (data.visibility === 'public') {
        socket
          .to(data.roomId)
          .emit('lcwb_public_student_stroke', { studentId: data.userId, stroke: data.stroke })
      }
    }
  )

  socket.on(
    'lcwb_student_stroke_ops',
    (data: {
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
          backgroundStyle: 'solid',
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
      for (let i = 0; i < result.appliedCount; i += 1)
        metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
      if (data.visibility === 'public') {
        socket
          .to(data.roomId)
          .emit('lcwb_public_student_stroke_ops', { studentId: data.userId, ops })
      }
    }
  )

  socket.on('lcwb_tutor_stroke_ops', (data: { roomId: string; ops: WhiteboardStrokeOp[] }) => {
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
        backgroundStyle: 'solid',
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

  socket.on(
    'lcwb_student_replace_strokes',
    (data: {
      roomId: string
      userId: string
      strokes: WhiteboardStroke[]
      visibility: 'private' | 'tutor-only' | 'public'
    }) => {
      if (socket.data.role !== 'student') return
      if (socket.data.userId !== data.userId) return
      const wbKey = `lcwb:${data.roomId}:${data.userId}`
      const current = activeWhiteboards.get(wbKey)?.strokes || []
      const currentIds = new Set(current.map(s => s.id))
      const nextIds = new Set((data.strokes || []).map(s => s.id))
      const base = Date.now()
      const rawOps: WhiteboardStrokeOp[] = [
        ...(data.strokes || []).map((stroke, i) => ({
          kind: 'upsert' as const,
          stroke,
          opId: `${wbKey}:replace:${base}-u${i}`,
        })),
        ...Array.from(currentIds)
          .filter(id => !nextIds.has(id))
          .map((id, i) => ({
            kind: 'delete' as const,
            strokeId: id,
            opId: `${wbKey}:replace:${base}-d${i}`,
          })),
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
          backgroundStyle: 'solid',
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
      for (let i = 0; i < result.appliedCount; i += 1)
        metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      if (data.visibility !== 'private') {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_stroke_ops', {
          studentId: data.userId,
          ops,
        })
      }
      if (data.visibility === 'public') {
        socket
          .to(data.roomId)
          .emit('lcwb_public_student_stroke_ops', { studentId: data.userId, ops })
      }
    }
  )

  socket.on(
    'lcwb_tutor_replace_strokes',
    (data: { roomId: string; strokes: WhiteboardStroke[] }) => {
      if (socket.data.role !== 'tutor') return
      const roomWBKey = `lcwb:tutor:${data.roomId}`
      const current = activeWhiteboards.get(roomWBKey)?.strokes || []
      const currentIds = new Set(current.map(s => s.id))
      const nextIds = new Set((data.strokes || []).map(s => s.id))
      const base = Date.now()
      const rawOps: WhiteboardStrokeOp[] = [
        ...(data.strokes || []).map((stroke, i) => ({
          kind: 'upsert' as const,
          stroke,
          opId: `${roomWBKey}:replace:${base}-u${i}`,
        })),
        ...Array.from(currentIds)
          .filter(id => !nextIds.has(id))
          .map((id, i) => ({
            kind: 'delete' as const,
            strokeId: id,
            opId: `${roomWBKey}:replace:${base}-d${i}`,
          })),
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
          backgroundStyle: 'solid',
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
      for (let i = 0; i < result.appliedCount; i += 1)
        metric.recentAppliedTimestamps.push(Date.now())
      trimWhiteboardOpTimestamps(metric)
      io.to(data.roomId).emit('lcwb_tutor_stroke_ops', { ops })
    }
  )

  socket.on(
    'lcwb_tutor_moderation_update',
    (data: {
      roomId: string
      mutedStudentIds?: string[]
      studentStrokeWindowLimit?: number
      strokeWindowMs?: number
      lockedLayers?: Array<
        'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'
      >
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      if (data.mutedStudentIds) moderationState.mutedStudents = new Set(data.mutedStudentIds)
      if (typeof data.studentStrokeWindowLimit === 'number')
        moderationState.studentStrokeWindowLimit = Math.max(10, data.studentStrokeWindowLimit)
      if (typeof data.strokeWindowMs === 'number')
        moderationState.strokeWindowMs = Math.max(1000, data.strokeWindowMs)
      if (data.lockedLayers) moderationState.lockedLayers = new Set(data.lockedLayers)
      io.to(data.roomId).emit('lcwb_moderation_state', {
        mutedStudentIds: Array.from(moderationState.mutedStudents),
        studentStrokeWindowLimit: moderationState.studentStrokeWindowLimit,
        strokeWindowMs: moderationState.strokeWindowMs,
        lockedLayers: Array.from(moderationState.lockedLayers),
      })
    }
  )

  socket.on('lcwb_clear_own', (data: { roomId: string; userId: string }) => {
    if (socket.data.userId !== data.userId) return
    const wbKey = `lcwb:${data.roomId}:${data.userId}`
    const studentWB = activeWhiteboards.get(wbKey)
    if (studentWB) studentWB.strokes = studentWB.strokes.filter(s => s.userId !== data.userId)
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_cleared_own', { studentId: data.userId })
    io.to(`lcwb:student:${data.roomId}:${data.userId}`).emit('lcwb_student_cleared_own', {
      studentId: data.userId,
    })
  })

  socket.on(
    'lcwb_visibility_change',
    (data: { roomId: string; userId: string; visibility: 'private' | 'tutor-only' | 'public' }) => {
      if (socket.data.role !== 'student') return
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_visibility_changed', {
        studentId: data.userId,
        visibility: data.visibility,
      })
      if (data.visibility === 'public') {
        socket
          .to(data.roomId)
          .emit('lcwb_student_public', { studentId: data.userId, name: socket.data.name })
      }
    }
  )

  socket.on('lcwb_tutor_view_student', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.join(`lcwb:student:${data.roomId}:${data.studentId}`)
    const wbKey = `lcwb:${data.roomId}:${data.studentId}`
    const studentWB = activeWhiteboards.get(wbKey)
    socket.emit('lcwb_student_whiteboard_state', {
      studentId: data.studentId,
      strokes: studentWB?.strokes || [],
    })
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_viewing', {
      tutorId: socket.data.userId,
      tutorName: socket.data.name,
    })
  })

  socket.on('lcwb_tutor_stop_view', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    socket.leave(`lcwb:student:${data.roomId}:${data.studentId}`)
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_stopped_viewing', {
      tutorId: socket.data.userId,
    })
  })

  socket.on(
    'lcwb_tutor_annotate',
    (data: { roomId: string; studentId: string; stroke: WhiteboardStroke }) => {
      if (socket.data.role !== 'tutor') return
      const wbKey = `lcwb:${data.roomId}:${data.studentId}`
      const studentWB = activeWhiteboards.get(wbKey)
      if (studentWB) studentWB.strokes.push(data.stroke)
      io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_tutor_annotation', {
        stroke: data.stroke,
        tutorId: socket.data.userId,
      })
    }
  )

  socket.on('lcwb_sync_request', (data: { roomId: string; userId: string }) => {
    const wbKey = `lcwb:${data.roomId}:${data.userId}`
    const wb = activeWhiteboards.get(wbKey)
    socket.emit('lcwb_sync_response', {
      strokes: wb?.strokes || [],
      latestSeq: whiteboardOpSeq.get(wbKey) || 0,
    })
  })

  socket.on(
    'lcwb_replay_request',
    (data: { roomId: string; userId: string; scope: 'student' | 'tutor'; sinceSeq?: number }) => {
      const wbKey =
        data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
      const metric = getWhiteboardOpMetric(wbKey)
      metric.replayRequests += 1
      metric.lastActivity = Date.now()
      const sinceSeq = Math.max(0, data.sinceSeq || 0)
      const rows = (whiteboardOpLog.get(wbKey) || []).filter(row => row.seq > sinceSeq)
      socket.emit('lcwb_replay_ops', {
        roomId: data.roomId,
        scope: data.scope,
        userId: data.userId,
        sinceSeq,
        latestSeq: whiteboardOpSeq.get(wbKey) || 0,
        ops: rows.map(row => ({ ...row.op, _seq: row.seq })),
      })
    }
  )

  socket.on(
    'lcwb_selection_presence_update',
    (data: {
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
      const roomMap =
        whiteboardSelectionPresence.get(data.roomId) ||
        new Map<string, WhiteboardSelectionPresence>()
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
    }
  )

  socket.on(
    'lcwb_branch_create',
    (data: { roomId: string; scope: 'student' | 'tutor'; userId: string; branchName: string }) => {
      if (!data.branchName?.trim()) return
      const wbKey =
        data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
      const wb = activeWhiteboards.get(wbKey)
      const branchMap = whiteboardBranches.get(wbKey) || new Map<string, WhiteboardStroke[]>()
      branchMap.set(
        data.branchName.trim(),
        (wb?.strokes || []).map(s => ({ ...s }))
      )
      whiteboardBranches.set(wbKey, branchMap)
      socket.emit('lcwb_branch_list', {
        roomId: data.roomId,
        scope: data.scope,
        userId: data.userId,
        branches: Array.from(branchMap.keys()),
      })
    }
  )

  socket.on(
    'lcwb_branch_switch',
    (data: { roomId: string; scope: 'student' | 'tutor'; userId: string; branchName: string }) => {
      const wbKey =
        data.scope === 'tutor' ? `lcwb:tutor:${data.roomId}` : `lcwb:${data.roomId}:${data.userId}`
      const branchMap = whiteboardBranches.get(wbKey)
      const strokes = branchMap?.get(data.branchName) || null
      if (!strokes) return
      const wb = activeWhiteboards.get(wbKey)
      if (!wb) return
      wb.strokes = strokes.map(s => ({ ...s }))
      if (data.scope === 'tutor') {
        io.to(data.roomId).emit('lcwb_tutor_strokes_reset', { strokes: wb.strokes })
      } else {
        io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_strokes_reset', {
          studentId: data.userId,
          strokes: wb.strokes,
        })
        socket
          .to(data.roomId)
          .emit('lcwb_public_student_strokes_reset', {
            studentId: data.userId,
            strokes: wb.strokes,
          })
      }
    }
  )

  socket.on(
    'lcwb_cursor_update',
    (data: {
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
    }
  )

  socket.on('lcwb_layer_lock', (data: { roomId: string; locked: boolean }) => {
    if (socket.data.role !== 'tutor') return
    const moderationState = getLiveClassModerationState(data.roomId)
    if (data.locked) moderationState.lockedLayers.add('student-personal')
    if (!data.locked) moderationState.lockedLayers.delete('student-personal')
    io.to(data.roomId).emit('lcwb_layer_locked', { locked: data.locked, by: socket.data.userId })
  })

  socket.on(
    'lcwb_layer_config_update',
    (data: {
      roomId: string
      visibility: Record<string, boolean>
      lockedLayers: Array<'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'>
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      moderationState.lockedLayers = new Set(data.lockedLayers)
      io.to(data.roomId).emit('lcwb_layer_config', data)
    }
  )

  socket.on(
    'lcwb_spotlight_update',
    (data: {
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
    }
  )

  socket.on(
    'lcwb_assignment_overlay',
    (data: {
      roomId: string
      overlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure'
    }) => {
      if (socket.data.role !== 'tutor') return
      const moderationState = getLiveClassModerationState(data.roomId)
      moderationState.assignmentOverlay = data.overlay
      io.to(data.roomId).emit('lcwb_assignment_overlay', { overlay: data.overlay })
    }
  )

  socket.on(
    'lcwb_ai_region_request',
    async (data: {
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
        socket.emit('lcwb_ai_region_error', {
          code: 'RATE_LIMITED',
          message: 'Too many AI hint requests. Please wait.',
        })
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
    }
  )

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
    socket.emit('lcwb_snapshot_timeline', {
      roomId: data.roomId,
      snapshots: liveClassSnapshots.get(data.roomId) || [],
    })
  })

  socket.on(
    'lcwb_breakout_promote',
    (data: {
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
    }
  )

  socket.on(
    'lcwb_export_attach',
    (data: {
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
    }
  )

  socket.on(
    'lcwb_student_submit',
    (data: {
      roomId: string
      studentId: string
      studentName: string
      strokeCount: number
      submittedAt: number
    }) => {
      if (socket.data.role !== 'student') return
      io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_student_submitted', data)
    }
  )

  socket.on('lcwb_tutor_mark_reviewed', (data: { roomId: string; studentId: string }) => {
    if (socket.data.role !== 'tutor') return
    io.to(`lcwb:tutor:${data.roomId}`).emit('lcwb_submission_reviewed', {
      studentId: data.studentId,
      tutorId: socket.data.userId,
    })
    io.to(`lcwb:student:${data.roomId}:${data.studentId}`).emit('lcwb_submission_reviewed', {
      studentId: data.studentId,
      tutorId: socket.data.userId,
    })
  })
}

function updateStudentStatus(student: StudentState) {
  // Calculate status based on metrics
  if (student.frustration > 70 || student.understanding < 30) {
    student.status = 'struggling'
  } else if (student.understanding < 60 || student.engagement < 50) {
    student.status = 'needs_help'
  } else if (Date.now() - student.lastActivity > 90000) {
    // 90s idle
    student.status = 'idle'
  } else {
    student.status = 'on_track'
  }
}

// ============================================
// BREAKOUT ROOM MANAGEMENT
// ============================================

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
        maxParticipants: config.participantsPerRoom,
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
          createdAt: new Date(r.createdAt).toISOString(),
        })),
        totalResponses: p.responses.length,
        createdAt: new Date().toISOString(),
      }))

    callback({ success: true, polls })
  })

  // Create new poll
  socket.on(
    'poll:create',
    (data: {
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
          color: getPollOptionColor(i),
        })),
        isAnonymous: data.isAnonymous,
        allowMultiple: data.allowMultiple,
        showResults: data.showResults,
        timeLimit: data.timeLimit,
        status: 'draft',
        responses: [],
      }

      activePolls.set(pollId, poll)

      // Add to session polls
      if (!sessionPolls.has(data.sessionId)) {
        sessionPolls.set(data.sessionId, new Set())
      }
      sessionPolls.get(data.sessionId)!.add(pollId)

      // Broadcast to session
      io.to(`poll:${data.sessionId}`).emit('poll:created', formatPollForBroadcast(poll))
    }
  )

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
  socket.on(
    'poll:vote',
    async (data: {
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
        createdAt: Date.now(),
      }

      poll.responses.push(response)

      // Broadcast updated poll
      io.to(`poll:${data.sessionId}`).emit('poll:updated', formatPollForBroadcast(poll))

      // Confirm vote to sender
      socket.emit('poll:vote:confirmed', { pollId: data.pollId })
    }
  )
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
      createdAt: new Date(r.createdAt).toISOString(),
    })),
    totalResponses: poll.responses.length,
    createdAt: new Date().toISOString(),
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
