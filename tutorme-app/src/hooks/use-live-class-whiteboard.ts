/**
 * Live Class Whiteboard Hook
 * 
 * Manages whiteboard state and socket communication for Live Class sessions.
 * Supports both tutor broadcast mode and student personal whiteboards.
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSimpleSocket } from './use-simple-socket'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export interface WhiteboardStroke {
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
  pageId?: string
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
  _seq?: number
}

export interface WhiteboardSelectionPresence {
  userId: string
  name: string
  role: 'tutor' | 'student'
  strokeIds: string[]
  pageId?: string
  color: string
  updatedAt: number
}

export interface StudentWhiteboard {
  studentId: string
  studentName: string
  whiteboardId: string
  visibility: 'private' | 'tutor-only' | 'public'
  strokes: WhiteboardStroke[]
  lastActivity: Date
}

export interface WhiteboardCursor {
  userId: string
  name: string
  role: 'tutor' | 'student'
  x: number
  y: number
  pointerMode?: 'cursor' | 'laser'
  lastUpdated: number
}

export interface WhiteboardSubmission {
  studentId: string
  studentName: string
  submittedAt: number
  strokeCount: number
  reviewed: boolean
  pinned?: boolean
}

export interface LayerConfig {
  id: 'tutor-broadcast' | 'tutor-private' | 'student-personal' | 'shared-group'
  label: string
  visible: boolean
  locked: boolean
}

export interface WhiteboardSnapshot {
  id: string
  createdAt: number
  roomId: string
  createdBy: string
  strokes: WhiteboardStroke[]
}

export interface WhiteboardSpotlight {
  enabled: boolean
  x: number
  y: number
  width: number
  height: number
  mode: 'rectangle' | 'pen'
}

export function useLiveClassWhiteboard(
  roomId: string | null,
  sessionId: string | null,
  role: 'tutor' | 'student'
) {
  const applyStrokeOps = useCallback((prev: WhiteboardStroke[], ops: WhiteboardStrokeOp[]) => {
    if (!ops.length) return prev
    let changed = false
    const byId = new Map(prev.map((stroke) => [stroke.id, stroke]))
    ops.forEach((op) => {
      if (op.kind === 'delete') {
        if (op.strokeId && byId.has(op.strokeId)) {
          byId.delete(op.strokeId)
          changed = true
        }
        return
      }
      const stroke = op.stroke
      if (!stroke) return
      const existing = byId.get(stroke.id)
      const incomingVersion = stroke.updatedAt || stroke.createdAt || 0
      const currentVersion = existing?.updatedAt || existing?.createdAt || 0
      if (!existing || (incomingVersion >= currentVersion && JSON.stringify(existing) !== JSON.stringify(stroke))) {
        byId.set(stroke.id, stroke)
        changed = true
      }
    })
    return changed ? Array.from(byId.values()) : prev
  }, [])

  const { data: session } = useSession()
  const { socket, isConnected } = useSimpleSocket(roomId || '', {
    userId: session?.user?.id,
    name: session?.user?.name || role,
    role,
  })
  
  // Whiteboard state
  const [myStrokes, setMyStrokes] = useState<WhiteboardStroke[]>([])
  const [tutorStrokes, setTutorStrokes] = useState<WhiteboardStroke[]>([])
  const [studentWhiteboards, setStudentWhiteboards] = useState<Map<string, StudentWhiteboard>>(new Map())
  const [visibility, setVisibility] = useState<'private' | 'tutor-only' | 'public'>('private')
  const [isBroadcasting, setIsBroadcasting] = useState(false)
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null)
  const [activeStudentBoards, setActiveStudentBoards] = useState<string[]>([])
  const [remoteCursors, setRemoteCursors] = useState<Map<string, WhiteboardCursor>>(new Map())
  const [remoteSelections, setRemoteSelections] = useState<Map<string, WhiteboardSelectionPresence>>(new Map())
  const [availableBranches, setAvailableBranches] = useState<string[]>([])
  const [isLayerLocked, setIsLayerLocked] = useState(false)
  const [submissions, setSubmissions] = useState<Map<string, WhiteboardSubmission>>(new Map())
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [layerConfig, setLayerConfig] = useState<LayerConfig[]>([
    { id: 'tutor-broadcast', label: 'Tutor Broadcast', visible: true, locked: false },
    { id: 'tutor-private', label: 'Tutor Private', visible: true, locked: false },
    { id: 'student-personal', label: 'Student Personal', visible: true, locked: false },
    { id: 'shared-group', label: 'Shared Group', visible: true, locked: false },
  ])
  const [activeLayerId, setActiveLayerId] = useState<LayerConfig['id']>(role === 'tutor' ? 'tutor-broadcast' : 'student-personal')
  const [assignmentOverlay, setAssignmentOverlay] = useState<'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure'>('none')
  const [spotlight, setSpotlight] = useState<WhiteboardSpotlight>({
    enabled: false,
    x: 160,
    y: 120,
    width: 420,
    height: 220,
    mode: 'rectangle',
  })
  const [snapshots, setSnapshots] = useState<WhiteboardSnapshot[]>([])
  const [timelineIndex, setTimelineIndex] = useState<number | null>(null)
  const [aiRegionHints, setAiRegionHints] = useState<Array<{
    requestedBy: string
    region: { x: number; y: number; width: number; height: number }
    hint: string
    misconception: string
    timestamp: number
  }>>([])
  const [moderationState, setModerationState] = useState<{
    mutedStudentIds: string[]
    studentStrokeWindowLimit: number
    strokeWindowMs: number
    lockedLayers: string[]
  }>({
    mutedStudentIds: [],
    studentStrokeWindowLimit: 80,
    strokeWindowMs: 5000,
    lockedLayers: [],
  })
  
  const strokesRef = useRef<WhiteboardStroke[]>([])
  const pendingOpsRef = useRef<WhiteboardStrokeOp[]>([])
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const localOpSeqRef = useRef(0)
  const boardSeqRef = useRef<{ student: number; tutor: number }>({ student: 0, tutor: 0 })
  
  // Keep ref in sync
  useEffect(() => {
    strokesRef.current = myStrokes
  }, [myStrokes])

  const flushStrokeOps = useCallback(() => {
    if (!socket || !roomId || !session?.user?.id) return
    if (!pendingOpsRef.current.length) return
    const merged = new Map<string, WhiteboardStrokeOp>()
    pendingOpsRef.current.forEach((op) => {
      if (op.kind === 'delete' && op.strokeId) {
        merged.set(op.strokeId, op)
      } else if (op.kind === 'upsert' && op.stroke) {
        merged.set(op.stroke.id, op)
      }
    })
    pendingOpsRef.current = []
    const ops = Array.from(merged.values())
    if (!ops.length) return
    if (role === 'student') {
      socket.emit('lcwb_student_stroke_ops', {
        roomId,
        userId: session.user.id,
        ops,
        visibility,
      })
    } else if (role === 'tutor') {
      socket.emit('lcwb_tutor_stroke_ops', {
        roomId,
        ops,
      })
    }
  }, [role, roomId, session, socket, visibility])

  const enqueueStrokeOps = useCallback((ops: WhiteboardStrokeOp[]) => {
    if (!ops.length) return
    pendingOpsRef.current.push(...ops)
    if (pendingOpsRef.current.length >= 120) {
      flushStrokeOps()
      return
    }
    if (flushTimerRef.current) return
    flushTimerRef.current = setTimeout(() => {
      flushTimerRef.current = null
      flushStrokeOps()
    }, 28)
  }, [flushStrokeOps])

  useEffect(() => {
    return () => {
      if (flushTimerRef.current) {
        clearTimeout(flushTimerRef.current)
        flushTimerRef.current = null
      }
      flushStrokeOps()
    }
  }, [flushStrokeOps])
  
  // Initialize whiteboard on mount
  useEffect(() => {
    if (!sessionId || !socket || !isConnected) return
    
    const userId = session?.user?.id
    if (!userId) return
    
    if (role === 'student') {
      // Join student's personal whiteboard
      socket.emit('lcwb_student_join', {
        roomId,
        userId,
        name: session?.user?.name || 'Student'
      })
    }
    
    // Request initial sync
    socket.emit('lcwb_sync_request', { roomId, userId })
    socket.emit('lcwb_replay_request', {
      roomId,
      userId,
      scope: role === 'tutor' ? 'tutor' : 'student',
      sinceSeq: role === 'tutor' ? boardSeqRef.current.tutor : boardSeqRef.current.student,
    })
    if (role === 'student') {
      socket.emit('lcwb_replay_request', {
        roomId,
        userId,
        scope: 'tutor',
        sinceSeq: boardSeqRef.current.tutor,
      })
    }
  }, [sessionId, roomId, socket, isConnected, role, session])
  
  // Set up socket listeners
  useEffect(() => {
    if (!socket) return
    
    // Tutor broadcasting started
    socket.on('lcwb_tutor_broadcasting', () => {
      // reserved for UI indicators
    })
    
    // Tutor stopped broadcasting
    socket.on('lcwb_tutor_broadcast_stopped', () => {
      setTutorStrokes([])
    })
    
    // Receive tutor's stroke (for students)
    socket.on('lcwb_tutor_stroke', (stroke: WhiteboardStroke) => {
      setTutorStrokes(prev => [...prev, stroke])
    })
    socket.on('lcwb_tutor_strokes_reset', (data: { strokes: WhiteboardStroke[] }) => {
      setTutorStrokes(data.strokes || [])
    })
    socket.on('lcwb_tutor_stroke_ops', (data: { ops: WhiteboardStrokeOp[] }) => {
      const maxSeq = Math.max(0, ...((data.ops || []).map((op) => op._seq || 0)))
      if (maxSeq > 0) boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, maxSeq)
      setTutorStrokes((prev) => applyStrokeOps(prev, data.ops || []))
    })

    socket.on('lcwb_student_whiteboard_state', (data: { studentId: string; strokes: WhiteboardStroke[] }) => {
      setStudentWhiteboards(prev => {
        const next = new Map(prev)
        const wb = next.get(data.studentId)
        if (wb) {
          wb.strokes = data.strokes
          wb.lastActivity = new Date()
          next.set(data.studentId, wb)
        } else {
          next.set(data.studentId, {
            studentId: data.studentId,
            studentName: 'Student',
            whiteboardId: '',
            visibility: 'tutor-only',
            strokes: data.strokes,
            lastActivity: new Date(),
          })
        }
        return next
      })
    })
    
    // Student created a whiteboard (tutor receives)
    socket.on('lcwb_student_whiteboard_created', (data: { studentId: string; name: string }) => {
      setActiveStudentBoards(prev => [...new Set([...prev, data.studentId])])
      setStudentWhiteboards(prev => new Map(prev.set(data.studentId, {
        studentId: data.studentId,
        studentName: data.name,
        whiteboardId: '',
        visibility: 'private',
        strokes: [],
        lastActivity: new Date()
      })))
    })
    
    // Receive student's stroke (tutor receives)
    socket.on('lcwb_student_stroke', (data: { studentId: string; stroke: WhiteboardStroke }) => {
      setStudentWhiteboards(prev => {
        const wb = prev.get(data.studentId)
        if (wb) {
          wb.strokes.push(data.stroke)
          wb.lastActivity = new Date()
          return new Map(prev)
        }
        return prev
      })
    })
    socket.on('lcwb_student_strokes_reset', (data: { studentId: string; strokes: WhiteboardStroke[] }) => {
      setStudentWhiteboards(prev => {
        const next = new Map(prev)
        const wb = next.get(data.studentId)
        if (wb) {
          wb.strokes = data.strokes || []
          wb.lastActivity = new Date()
          next.set(data.studentId, wb)
        }
        return next
      })
    })
    socket.on('lcwb_student_stroke_ops', (data: { studentId: string; ops: WhiteboardStrokeOp[] }) => {
      const maxSeq = Math.max(0, ...((data.ops || []).map((op) => op._seq || 0)))
      if (maxSeq > 0 && session?.user?.id === data.studentId) {
        boardSeqRef.current.student = Math.max(boardSeqRef.current.student, maxSeq)
      }
      setStudentWhiteboards((prev) => {
        const next = new Map(prev)
        const wb = next.get(data.studentId)
        if (wb) {
          wb.strokes = applyStrokeOps(wb.strokes, data.ops || [])
          wb.lastActivity = new Date()
          next.set(data.studentId, wb)
        }
        return next
      })
    })
    
    // Student visibility changed
    socket.on('lcwb_student_visibility_changed', (data: { studentId: string; visibility: 'private' | 'tutor-only' | 'public' }) => {
      setStudentWhiteboards(prev => {
        const wb = prev.get(data.studentId)
        if (wb) {
          wb.visibility = data.visibility
          return new Map(prev)
        }
        return prev
      })
    })
    
    // Student made board public (other students receive)
    socket.on('lcwb_student_public', (data: { studentId: string; name: string }) => {
      setActiveStudentBoards(prev => [...new Set([...prev, data.studentId])])
    })
    
    // Receive public student stroke (students receive from other students)
    socket.on('lcwb_public_student_stroke', (data: { studentId: string; stroke: WhiteboardStroke }) => {
      setStudentWhiteboards(prev => {
        const wb = prev.get(data.studentId)
        if (wb) {
          wb.strokes.push(data.stroke)
          return new Map(prev)
        }
        return prev
      })
    })
    socket.on('lcwb_public_student_strokes_reset', (data: { studentId: string; strokes: WhiteboardStroke[] }) => {
      setStudentWhiteboards(prev => {
        const next = new Map(prev)
        const wb = next.get(data.studentId)
        if (wb) {
          wb.strokes = data.strokes || []
          next.set(data.studentId, wb)
        }
        return next
      })
    })
    socket.on('lcwb_public_student_stroke_ops', (data: { studentId: string; ops: WhiteboardStrokeOp[] }) => {
      setStudentWhiteboards((prev) => {
        const next = new Map(prev)
        const wb = next.get(data.studentId)
        if (wb) {
          wb.strokes = applyStrokeOps(wb.strokes, data.ops || [])
          next.set(data.studentId, wb)
        }
        return next
      })
    })

    socket.on('lcwb_replay_ops', (data: {
      scope: 'student' | 'tutor'
      userId?: string
      latestSeq?: number
      ops: WhiteboardStrokeOp[]
    }) => {
      if (data.scope === 'tutor') {
        boardSeqRef.current.tutor = Math.max(boardSeqRef.current.tutor, data.latestSeq || 0)
        setTutorStrokes((prev) => applyStrokeOps(prev, data.ops || []))
        return
      }
      const myId = session?.user?.id
      if (!myId || (data.userId && data.userId !== myId)) return
      boardSeqRef.current.student = Math.max(boardSeqRef.current.student, data.latestSeq || 0)
      setMyStrokes((prev) => applyStrokeOps(prev, data.ops || []))
    })

    socket.on('lcwb_selection_presence_update', (data: WhiteboardSelectionPresence) => {
      if (!data?.userId || data.userId === session?.user?.id) return
      setRemoteSelections((prev) => {
        const next = new Map(prev)
        next.set(data.userId, data)
        return next
      })
    })

    socket.on('lcwb_selection_presence_remove', (data: { userId: string }) => {
      if (!data?.userId) return
      setRemoteSelections((prev) => {
        if (!prev.has(data.userId)) return prev
        const next = new Map(prev)
        next.delete(data.userId)
        return next
      })
    })

    socket.on('lcwb_branch_list', (data: { branches: string[] }) => {
      setAvailableBranches(data.branches || [])
    })
    
    // Tutor is viewing this student's board
    socket.on('lcwb_tutor_viewing', () => {
      // reserved for UI indicators
    })
    
    // Tutor stopped viewing
    socket.on('lcwb_tutor_stopped_viewing', () => {
      // reserved for UI indicators
    })
    
    // Tutor annotated on student's board
    socket.on('lcwb_tutor_annotation', (data: { stroke: WhiteboardStroke; tutorId: string }) => {
      setMyStrokes(prev => [...prev, data.stroke])
    })
    
    // Sync response
    socket.on('lcwb_sync_response', (data: { strokes: WhiteboardStroke[] }) => {
      setMyStrokes(data.strokes)
    })

    socket.on('lcwb_cursor_update', (data: WhiteboardCursor) => {
      setRemoteCursors((prev) => {
        const next = new Map(prev)
        next.set(data.userId, data)
        return next
      })
    })

    socket.on('lcwb_cursor_remove', (data: { userId: string }) => {
      setRemoteCursors((prev) => {
        const next = new Map(prev)
        next.delete(data.userId)
        return next
      })
    })

    socket.on('lcwb_layer_locked', (data: { locked: boolean }) => {
      setIsLayerLocked(data.locked)
    })

    socket.on('lcwb_layer_config', (data: { visibility: Record<string, boolean>; lockedLayers: string[] }) => {
      setLayerConfig((prev) => prev.map((layer) => ({
        ...layer,
        visible: data.visibility[layer.id] ?? layer.visible,
        locked: data.lockedLayers.includes(layer.id),
      })))
    })

    socket.on('lcwb_student_submitted', (data: {
      studentId: string
      studentName: string
      submittedAt: number
      strokeCount: number
    }) => {
      if (role === 'tutor') {
        toast.success(`${data.studentName} submitted their board`)
      }
      setSubmissions((prev) => {
        const next = new Map(prev)
        next.set(data.studentId, {
          studentId: data.studentId,
          studentName: data.studentName,
          submittedAt: data.submittedAt,
          strokeCount: data.strokeCount,
          reviewed: false,
        })
        return next
      })
    })

    socket.on('lcwb_submission_reviewed', (data: { studentId: string }) => {
      if (role === 'student' && session?.user?.id === data.studentId) {
        setHasSubmitted(false)
        toast.success('Your board was reviewed by the tutor')
      }
      if (role === 'tutor') {
        setSubmissions((prev) => {
          const next = new Map(prev)
          const existing = next.get(data.studentId)
          if (existing) {
            next.set(data.studentId, { ...existing, reviewed: true })
          }
          return next
        })
      }
    })

    socket.on('lcwb_moderation_state', (data: {
      mutedStudentIds: string[]
      studentStrokeWindowLimit: number
      strokeWindowMs: number
      lockedLayers: string[]
    }) => {
      setModerationState(data)
    })

    socket.on('lcwb_moderation_warning', (data: { code: string; message: string }) => {
      toast.warning(data.message || 'Board action blocked by moderation settings')
    })

    socket.on('lcwb_assignment_overlay', (data: { overlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure' }) => {
      setAssignmentOverlay(data.overlay)
    })

    socket.on('lcwb_spotlight_update', (data: WhiteboardSpotlight) => {
      setSpotlight(data)
    })

    socket.on('lcwb_ai_region_hint', (data: {
      requestedBy: string
      region: { x: number; y: number; width: number; height: number }
      hint: string
      misconception: string
      timestamp: number
    }) => {
      setAiRegionHints((prev) => [data, ...prev].slice(0, 20))
    })

    socket.on('lcwb_snapshot_created', (snapshot: WhiteboardSnapshot) => {
      setSnapshots((prev) => [snapshot, ...prev].slice(0, 80))
    })

    socket.on('lcwb_snapshot_timeline', (data: { snapshots: WhiteboardSnapshot[] }) => {
      setSnapshots(data.snapshots)
    })

    socket.on('lcwb_breakout_promoted', (data: { strokes: WhiteboardStroke[] }) => {
      if (role === 'tutor') {
        setTutorStrokes((prev) => [...prev, ...data.strokes])
      }
    })

    // AI region hint error
    socket.on('lcwb_ai_region_error', (data: { message?: string }) => {
      toast.error(data.message || 'Failed to get AI hint')
    })

    // Export attached by tutor
    socket.on('lcwb_export_attached', (data: { exportId: string; name: string; url: string; attachedBy: string }) => {
      toast.success(`Export "${data.name}" attached by tutor`)
    })

    // Student cleared their own board
    socket.on('lcwb_student_cleared_own', (data: { studentId: string }) => {
      if (role === 'tutor') {
        setStudentWhiteboards(prev => {
          const next = new Map(prev)
          const wb = next.get(data.studentId)
          if (wb) {
            wb.strokes = []
            next.set(data.studentId, wb)
          }
          return next
        })
      }
      if (role === 'student' && session?.user?.id === data.studentId) {
        setMyStrokes([])
        toast.info('Your board was cleared')
      }
    })
    
    // Cleanup
    return () => {
      socket.off('lcwb_tutor_broadcasting')
      socket.off('lcwb_tutor_broadcast_stopped')
      socket.off('lcwb_tutor_stroke')
      socket.off('lcwb_tutor_strokes_reset')
      socket.off('lcwb_tutor_stroke_ops')
      socket.off('lcwb_student_whiteboard_created')
      socket.off('lcwb_student_stroke')
      socket.off('lcwb_student_strokes_reset')
      socket.off('lcwb_student_stroke_ops')
      socket.off('lcwb_student_visibility_changed')
      socket.off('lcwb_student_public')
      socket.off('lcwb_public_student_stroke')
      socket.off('lcwb_public_student_strokes_reset')
      socket.off('lcwb_public_student_stroke_ops')
      socket.off('lcwb_replay_ops')
      socket.off('lcwb_selection_presence_update')
      socket.off('lcwb_selection_presence_remove')
      socket.off('lcwb_branch_list')
      socket.off('lcwb_tutor_viewing')
      socket.off('lcwb_tutor_stopped_viewing')
      socket.off('lcwb_tutor_annotation')
      socket.off('lcwb_sync_response')
      socket.off('lcwb_student_whiteboard_state')
      socket.off('lcwb_cursor_update')
      socket.off('lcwb_cursor_remove')
      socket.off('lcwb_layer_locked')
      socket.off('lcwb_layer_config')
      socket.off('lcwb_student_submitted')
      socket.off('lcwb_submission_reviewed')
      socket.off('lcwb_moderation_state')
      socket.off('lcwb_moderation_warning')
      socket.off('lcwb_assignment_overlay')
      socket.off('lcwb_spotlight_update')
      socket.off('lcwb_ai_region_hint')
      socket.off('lcwb_snapshot_created')
      socket.off('lcwb_snapshot_timeline')
      socket.off('lcwb_breakout_promoted')
      socket.off('lcwb_ai_region_error')
      socket.off('lcwb_export_attached')
      socket.off('lcwb_student_cleared_own')
    }
  }, [applyStrokeOps, role, session?.user?.id, socket])

  // Remove stale cursors (network drops / tab backgrounding).
  useEffect(() => {
    const interval = setInterval(() => {
      const cutoff = Date.now() - 5000
      setRemoteCursors((prev) => {
        const next = new Map(prev)
        let changed = false
        next.forEach((cursor, userId) => {
          if (cursor.lastUpdated < cutoff) {
            next.delete(userId)
            changed = true
          }
        })
        return changed ? next : prev
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])
  
  /** Tutor: Start broadcasting — your strokes are sent to all students in the room in real time. */
  const startBroadcast = useCallback(() => {
    if (role !== 'tutor') return
    if (!socket || !isConnected) {
      toast.warning('Connect to the class first')
      return
    }
    if (!sessionId || !roomId) {
      toast.warning('Session or room not ready')
      return
    }
    socket.emit('lcwb_broadcast_start', {
      roomId,
      whiteboardId: session?.user?.id
    })
    setIsBroadcasting(true)
  }, [socket, isConnected, role, roomId, sessionId, session])
  
  /** Tutor: Stop broadcasting — students no longer receive your strokes. */
  const stopBroadcast = useCallback(() => {
    if (!socket || role !== 'tutor') return
    socket.emit('lcwb_broadcast_stop', { roomId })
    setIsBroadcasting(false)
  }, [socket, role, roomId])
  
  // Tutor: Broadcast a stroke
  const broadcastStroke = useCallback((stroke: WhiteboardStroke) => {
    if (!socket || role !== 'tutor') return
    
    socket.emit('lcwb_stroke_broadcast', { roomId, stroke })
  }, [socket, role, roomId])
  
  // Student: Add a stroke to their whiteboard
  const addStroke = useCallback((stroke: WhiteboardStroke) => {
    if (!socket || !session?.user?.id) return
    if (role === 'student' && isLayerLocked) return
    if (role === 'student' && moderationState.lockedLayers.includes(activeLayerId)) {
      toast.warning('This layer is locked by the tutor')
      return
    }
    
    // Update local state
    setMyStrokes(prev => [...prev, stroke])
    
    // Send to server
    socket.emit('lcwb_student_update', {
      roomId,
      userId: session.user.id,
      stroke: { ...stroke, layerId: stroke.layerId || activeLayerId },
      visibility
    })
    if (role === 'student' && hasSubmitted) {
      setHasSubmitted(false)
    }
  }, [socket, session, role, isLayerLocked, roomId, visibility, hasSubmitted, activeLayerId, moderationState.lockedLayers])

  const addTutorStroke = useCallback((stroke: WhiteboardStroke) => {
    if (!socket || role !== 'tutor') return
    const normalizedStroke = { ...stroke, layerId: stroke.layerId || activeLayerId }
    setMyStrokes(prev => [...prev, normalizedStroke])
    if (isBroadcasting || normalizedStroke.layerId === 'tutor-broadcast') {
      socket.emit('lcwb_stroke_broadcast', { roomId, stroke: normalizedStroke })
    }
  }, [socket, role, activeLayerId, isBroadcasting, roomId])
  
  // Student: Change visibility
  const changeVisibility = useCallback((newVisibility: 'private' | 'tutor-only' | 'public') => {
    if (!socket || role !== 'student' || !session?.user?.id) return
    
    setVisibility(newVisibility)
    socket.emit('lcwb_visibility_change', {
      roomId,
      userId: session.user.id,
      visibility: newVisibility
    })
  }, [socket, role, roomId, session])
  
  // Tutor: View a specific student's whiteboard
  const viewStudentWhiteboard = useCallback((studentId: string) => {
    if (!socket || role !== 'tutor') return
    
    // Stop viewing previous student
    if (viewingStudentId) {
      socket.emit('lcwb_tutor_stop_view', { roomId, studentId: viewingStudentId })
    }
    
    socket.emit('lcwb_tutor_view_student', { roomId, studentId })
    setViewingStudentId(studentId)
  }, [socket, role, roomId, viewingStudentId])
  
  // Tutor: Stop viewing student
  const stopViewingStudent = useCallback(() => {
    if (!socket || role !== 'tutor' || !viewingStudentId) return
    
    socket.emit('lcwb_tutor_stop_view', { roomId, studentId: viewingStudentId })
    setViewingStudentId(null)
  }, [socket, role, roomId, viewingStudentId])
  
  // Tutor: Annotate on student's whiteboard
  const annotateOnStudentBoard = useCallback((studentId: string, stroke: WhiteboardStroke) => {
    if (!socket || role !== 'tutor') return
    
    socket.emit('lcwb_tutor_annotate', { roomId, studentId, stroke })
  }, [socket, role, roomId])
  
  // Clear my whiteboard
  const clearMyWhiteboard = useCallback((pageId?: string) => {
    if (!pageId) {
      setMyStrokes([])
      return
    }
    setMyStrokes((prev) => prev.filter((stroke) => stroke.pageId !== pageId))
  }, [])
  
  // Undo last stroke
  const undoLastStroke = useCallback((pageId?: string) => {
    setMyStrokes((prev) => {
      if (!pageId) return prev.slice(0, -1)
      const lastIndex = [...prev].reverse().findIndex((stroke) => stroke.pageId === pageId)
      if (lastIndex < 0) return prev
      const indexToRemove = prev.length - 1 - lastIndex
      return prev.filter((_, index) => index !== indexToRemove)
    })
  }, [])

  const updateCursor = useCallback((x: number, y: number, pointerMode: 'cursor' | 'laser' = 'cursor') => {
    if (!socket || !session?.user?.id || !roomId) return
    socket.emit('lcwb_cursor_update', {
      roomId,
      userId: session.user.id,
      name: session.user.name || role,
      role,
      x,
      y,
      pointerMode,
      lastUpdated: Date.now(),
    })
  }, [socket, session, roomId, role])

  const updateSelectionPresence = useCallback((strokeIds: string[], pageId?: string, color: string = '#2563eb') => {
    if (!socket || !roomId || !session?.user?.id) return
    socket.emit('lcwb_selection_presence_update', {
      roomId,
      userId: session.user.id,
      name: session.user.name || role,
      role,
      strokeIds,
      pageId,
      color,
      updatedAt: Date.now(),
    })
  }, [roomId, role, session, socket])

  const createBoardBranch = useCallback((branchName: string) => {
    if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return
    socket.emit('lcwb_branch_create', {
      roomId,
      scope: role === 'tutor' ? 'tutor' : 'student',
      userId: session.user.id,
      branchName: branchName.trim(),
    })
  }, [roomId, role, session, socket])

  const switchBoardBranch = useCallback((branchName: string) => {
    if (!socket || !roomId || !session?.user?.id || !branchName.trim()) return
    socket.emit('lcwb_branch_switch', {
      roomId,
      scope: role === 'tutor' ? 'tutor' : 'student',
      userId: session.user.id,
      branchName: branchName.trim(),
    })
  }, [roomId, role, session, socket])

  /** Tutor: Lock/unlock student layers — when locked, students cannot draw on their boards until you unlock. */
  const toggleLayerLock = useCallback((locked: boolean) => {
    if (role !== 'tutor') return
    if (!socket || !isConnected) {
      toast.warning('Connect to the class first')
      return
    }
    if (!roomId) {
      toast.warning('Room not ready')
      return
    }
    setIsLayerLocked(locked)
    socket.emit('lcwb_layer_lock', {
      roomId,
      locked,
    })
  }, [socket, isConnected, role, roomId])

  const updateLayerConfig = useCallback((nextConfig: LayerConfig[]) => {
    setLayerConfig(nextConfig)
    if (!socket || !roomId || role !== 'tutor') return
    const visibility = nextConfig.reduce<Record<string, boolean>>((acc, layer) => {
      acc[layer.id] = layer.visible
      return acc
    }, {})
    socket.emit('lcwb_layer_config_update', {
      roomId,
      visibility,
      lockedLayers: nextConfig.filter((layer) => layer.locked).map((layer) => layer.id),
    })
  }, [socket, roomId, role])

  const setLayerLock = useCallback((layerId: LayerConfig['id'], locked: boolean) => {
    setLayerConfig((prev) => {
      const next = prev.map((layer) => layer.id === layerId ? { ...layer, locked } : layer)
      if (socket && roomId && role === 'tutor') {
        const visibility = next.reduce<Record<string, boolean>>((acc, layer) => {
          acc[layer.id] = layer.visible
          return acc
        }, {})
        socket.emit('lcwb_layer_config_update', {
          roomId,
          visibility,
          lockedLayers: next.filter((layer) => layer.locked).map((layer) => layer.id),
        })
      }
      return next
    })
  }, [socket, roomId, role])

  const submitMyBoard = useCallback(() => {
    if (!socket || role !== 'student' || !session?.user?.id || !roomId) return
    socket.emit('lcwb_student_submit', {
      roomId,
      studentId: session.user.id,
      studentName: session.user.name || 'Student',
      strokeCount: strokesRef.current.length,
      submittedAt: Date.now(),
    })
    setHasSubmitted(true)
    toast.success('Board submitted to tutor')
  }, [socket, role, session, roomId])

  const markSubmissionReviewed = useCallback((studentId: string) => {
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_tutor_mark_reviewed', {
      roomId,
      studentId,
    })
    setSubmissions((prev) => {
      const next = new Map(prev)
      const existing = next.get(studentId)
      if (existing) next.set(studentId, { ...existing, reviewed: true })
      return next
    })
  }, [socket, role, roomId])

  const pinSubmission = useCallback((studentId: string, pinned: boolean) => {
    setSubmissions((prev) => {
      const next = new Map(prev)
      const existing = next.get(studentId)
      if (existing) next.set(studentId, { ...existing, pinned })
      return next
    })
  }, [])

  const markAllSubmissionsReviewed = useCallback(() => {
    if (!socket || role !== 'tutor' || !roomId) return
    const pending = Array.from(submissions.values()).filter((submission) => !submission.reviewed)
    pending.forEach((submission) => {
      socket.emit('lcwb_tutor_mark_reviewed', {
        roomId,
        studentId: submission.studentId,
      })
    })
    setSubmissions((prev) => {
      const next = new Map(prev)
      next.forEach((submission, studentId) => {
        next.set(studentId, { ...submission, reviewed: true })
      })
      return next
    })
  }, [socket, role, roomId, submissions])

  const setDrawMuteForStudent = useCallback((studentId: string, muted: boolean) => {
    if (!socket || role !== 'tutor' || !roomId) return
    const nextMuted = new Set(moderationState.mutedStudentIds)
    if (muted) nextMuted.add(studentId)
    if (!muted) nextMuted.delete(studentId)
    socket.emit('lcwb_tutor_moderation_update', {
      roomId,
      mutedStudentIds: Array.from(nextMuted),
      studentStrokeWindowLimit: moderationState.studentStrokeWindowLimit,
      strokeWindowMs: moderationState.strokeWindowMs,
      lockedLayers: moderationState.lockedLayers,
    })
  }, [socket, role, roomId, moderationState])

  const updateStrokeRateLimit = useCallback((limit: number, windowMs: number = moderationState.strokeWindowMs) => {
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_tutor_moderation_update', {
      roomId,
      mutedStudentIds: moderationState.mutedStudentIds,
      studentStrokeWindowLimit: limit,
      strokeWindowMs: windowMs,
      lockedLayers: moderationState.lockedLayers,
    })
  }, [socket, role, roomId, moderationState])

  const clearOwnStrokes = useCallback(() => {
    if (!socket || !roomId || !session?.user?.id) return
    setMyStrokes((prev) => prev.filter((stroke) => stroke.userId !== session.user.id))
    socket.emit('lcwb_clear_own', { roomId, userId: session.user.id })
  }, [socket, roomId, session])

  const replaceMyStrokes = useCallback((nextOrUpdater: WhiteboardStroke[] | ((prev: WhiteboardStroke[]) => WhiteboardStroke[])) => {
    setMyStrokes((prev) => {
      const next = typeof nextOrUpdater === 'function'
        ? (nextOrUpdater as (prev: WhiteboardStroke[]) => WhiteboardStroke[])(prev)
        : nextOrUpdater

      if (socket && roomId && session?.user?.id) {
        const prevMap = new Map(prev.map((stroke) => [stroke.id, stroke]))
        const nextMap = new Map(next.map((stroke) => [stroke.id, stroke]))
        const ops: WhiteboardStrokeOp[] = []
        nextMap.forEach((stroke, id) => {
          const existing = prevMap.get(id)
          if (!existing || JSON.stringify(existing) !== JSON.stringify(stroke)) {
            localOpSeqRef.current += 1
            ops.push({
              kind: 'upsert',
              stroke,
              opId: `${session.user.id}:${Date.now()}:${localOpSeqRef.current}:${id}:u`,
              sentAt: Date.now(),
              baseVersion: existing?.updatedAt || existing?.createdAt || 0,
            })
          }
        })
        prevMap.forEach((_, id) => {
          if (!nextMap.has(id)) {
            localOpSeqRef.current += 1
            ops.push({
              kind: 'delete',
              strokeId: id,
              opId: `${session.user.id}:${Date.now()}:${localOpSeqRef.current}:${id}:d`,
              sentAt: Date.now(),
            })
          }
        })

        if (!ops.length) return prev

        enqueueStrokeOps(ops)
      }
      return next
    })
  }, [enqueueStrokeOps, roomId, session, socket])

  const setAssignmentOverlayMode = useCallback((overlay: 'none' | 'graph-paper' | 'geometry-grid' | 'coordinate-plane' | 'chemistry-structure') => {
    setAssignmentOverlay(overlay)
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_assignment_overlay', { roomId, overlay })
  }, [socket, role, roomId])

  const updateSpotlight = useCallback((nextSpotlight: WhiteboardSpotlight) => {
    setSpotlight(nextSpotlight)
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_spotlight_update', { roomId, ...nextSpotlight })
  }, [socket, role, roomId])

  const requestAIRegionHint = useCallback((region: { x: number; y: number; width: number; height: number }, context?: string) => {
    if (!socket || !roomId) return
    socket.emit('lcwb_ai_region_request', { roomId, region, context })
  }, [socket, roomId])

  const captureSnapshot = useCallback((strokes: WhiteboardStroke[]) => {
    if (!socket || !roomId) return
    socket.emit('lcwb_snapshot_capture', { roomId, strokes })
  }, [socket, roomId])

  const requestSnapshotTimeline = useCallback(() => {
    if (!socket || !roomId) return
    socket.emit('lcwb_snapshot_request', { roomId })
  }, [socket, roomId])

  const promoteBreakoutBoard = useCallback((breakoutRoomId: string, strokes: WhiteboardStroke[], sourceStudentId?: string) => {
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_breakout_promote', {
      mainRoomId: roomId,
      breakoutRoomId,
      sourceStudentId,
      strokes,
    })
  }, [socket, role, roomId])

  const exportAndAttachBoard = useCallback((data: {
    format: 'png' | 'pdf'
    fileName: string
    dataUrl: string
    studentId?: string
  }) => {
    if (!socket || role !== 'tutor' || !roomId) return
    socket.emit('lcwb_export_attach', {
      roomId,
      sessionId,
      studentId: data.studentId,
      format: data.format,
      fileName: data.fileName,
      dataUrl: data.dataUrl,
    })
  }, [socket, role, roomId, sessionId])

  useEffect(() => {
    if (!roomId || !socket) return
    const interval = setInterval(() => {
      const sourceStrokes = role === 'tutor' ? myStrokes : myStrokes
      if (sourceStrokes.length > 0) {
        socket.emit('lcwb_snapshot_capture', { roomId, strokes: sourceStrokes })
      }
    }, 2 * 60 * 1000)
    return () => clearInterval(interval)
  }, [roomId, socket, role, myStrokes])
  
  return {
    // State
    myStrokes,
    tutorStrokes,
    studentWhiteboards,
    visibility,
    isBroadcasting,
    viewingStudentId,
    activeStudentBoards,
    isConnected,
    remoteCursors,
    remoteSelections: Array.from(remoteSelections.values()),
    isLayerLocked,
    submissions: Array.from(submissions.values()).sort((a, b) => b.submittedAt - a.submittedAt),
    hasSubmitted,
    layerConfig,
    activeLayerId,
    assignmentOverlay,
    spotlight,
    snapshots: [...snapshots].sort((a, b) => b.createdAt - a.createdAt),
    timelineIndex,
    aiRegionHints,
    moderationState,
    availableBranches,
    
    // Actions
    startBroadcast,
    stopBroadcast,
    broadcastStroke,
    addStroke,
    addTutorStroke,
    changeVisibility,
    viewStudentWhiteboard,
    stopViewingStudent,
    annotateOnStudentBoard,
    clearMyWhiteboard,
    undoLastStroke,
    updateCursor,
    updateSelectionPresence,
    toggleLayerLock,
    submitMyBoard,
    markSubmissionReviewed,
    markAllSubmissionsReviewed,
    pinSubmission,
    setLayerConfig: updateLayerConfig,
    setActiveLayerId,
    setLayerLock,
    setDrawMuteForStudent,
    updateStrokeRateLimit,
    clearOwnStrokes,
    replaceMyStrokes,
    setAssignmentOverlayMode,
    updateSpotlight,
    requestAIRegionHint,
    captureSnapshot,
    requestSnapshotTimeline,
    setTimelineIndex,
    promoteBreakoutBoard,
    exportAndAttachBoard,
    createBoardBranch,
    switchBoardBranch
  }
}
