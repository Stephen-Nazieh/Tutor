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
        socket.to(data.roomId).emit('lcwb_public_student_strokes_reset', {
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
