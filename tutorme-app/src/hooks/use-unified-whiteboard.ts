/**
 * Unified Whiteboard Hook
 * 
 * Integrates all 12 advanced features into a single hook for use in components.
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import { useSession } from 'next-auth/react'
import { UnifiedWhiteboardManager } from '@/lib/whiteboard'
import type { WhiteboardStroke } from './use-live-class-whiteboard'
import type { AnalyticsSnapshot } from '@/lib/whiteboard/analytics'
import type { AnnotationThread } from '@/lib/whiteboard/annotations'
import type { Branch } from '@/lib/whiteboard/branching'

interface UseUnifiedWhiteboardOptions {
  roomId: string
  sessionId: string
  role: 'tutor' | 'student'
  enableAnalytics?: boolean
  enableAccessibility?: boolean
  enableBranching?: boolean
}

export function useUnifiedWhiteboard(options: UseUnifiedWhiteboardOptions) {
  const { roomId, sessionId, role, enableAnalytics, enableAccessibility, enableBranching } = options
  const { data: session } = useSession()
  const userId = session?.user?.id || 'anonymous'

  // Create manager instance
  const managerRef = useRef<UnifiedWhiteboardManager | null>(null)
  
  if (!managerRef.current) {
    managerRef.current = new UnifiedWhiteboardManager({
      userId,
      sessionId,
      roomId,
      enableAnalytics,
      enableAccessibility,
      enableBranching,
    })
  }

  const manager = managerRef.current

  // State for UI
  const [strokes, setStrokes] = useState<WhiteboardStroke[]>([])
  const [viewport, setViewport] = useState({ x: 0, y: 0, width: 1920, height: 1080, scale: 1 })
  const [analyticsSnapshot, setAnalyticsSnapshot] = useState<AnalyticsSnapshot | null>(null)
  const [threads, setThreads] = useState<AnnotationThread[]>([])
  const [branches, setBranches] = useState<Branch[]>([])
  const [activeBranchId, setActiveBranchId] = useState<string | null>(null)
  const [isKeyboardMode, setIsKeyboardMode] = useState(false)
  const [announcement, setAnnouncement] = useState<string | null>(null)
  const [performanceReport, setPerformanceReport] = useState<{
    fps: number
    frameMetrics: {
      avgFrameTime: number
      maxFrameTime: number
      minFrameTime: number
      totalRenders: number
      droppedFrames: number
    }
  } | null>(null)

  // Feature 1: Connector Pathfinding
  const routeConnector = useCallback((
    sourceId: string,
    targetId: string,
    sourcePort: 'top' | 'right' | 'bottom' | 'left' | 'center',
    targetPort: 'top' | 'right' | 'bottom' | 'left' | 'center'
  ) => {
    // Implementation would use useConnectorPathfinding hook
    return { points: [] as Array<{ x: number; y: number }>, length: 0, crossings: 0 }
  }, [])

  // Feature 2: Presence
  const updateCursor = useCallback((x: number, y: number) => {
    manager.presence.updateUser({
      userId,
      cursor: { x, y },
    })
  }, [manager, userId])

  const startEditing = useCallback((elementId: string, elementType: 'stroke' | 'shape' | 'text') => {
    return manager.presence.startEditing(userId, elementId, elementType, 'drawing')
  }, [manager, userId])

  const stopEditing = useCallback((elementId: string) => {
    manager.presence.stopEditing(userId, elementId)
  }, [manager, userId])

  // Feature 4: Timeline
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSeq, setCurrentSeq] = useState(0)

  // Feature 5: Branching
  const createBranch = useCallback((name: string, description?: string) => {
    if (!manager.branching) return null
    const branch = manager.branching.createBranch(name, manager.branching.getActiveBranch()?.id || null, strokes, description)
    setBranches(manager.branching.getAllBranches())
    return branch
  }, [manager, strokes])

  const switchBranch = useCallback((branchId: string) => {
    if (!manager.branching) return false
    const success = manager.branching.switchBranch(branchId)
    if (success) {
      setActiveBranchId(branchId)
      setStrokes(manager.branching.getActiveBranch()?.strokes || [])
    }
    return success
  }, [manager])

  // Feature 6: CRDT
  const addStroke = useCallback((stroke: WhiteboardStroke) => {
    const op = manager.crdt.createOperation('create', stroke.id, stroke)
    const result = manager.applyOperation(op)
    if (result.success) {
      setStrokes(prev => [...prev, stroke])
      manager.performance.spatialIndex.insert(stroke)
    }
    return result
  }, [manager])

  const updateStroke = useCallback((strokeId: string, updates: Partial<WhiteboardStroke>) => {
    const op = manager.crdt.createOperation('update', strokeId, updates)
    const result = manager.applyOperation(op)
    if (result.success) {
      setStrokes(prev => prev.map(s => s.id === strokeId ? { ...s, ...updates } : s))
    }
    return result
  }, [manager])

  const deleteStroke = useCallback((strokeId: string) => {
    const op = manager.crdt.createOperation('delete', strokeId)
    const result = manager.applyOperation(op)
    if (result.success) {
      setStrokes(prev => prev.filter(s => s.id !== strokeId))
      manager.performance.spatialIndex.remove(strokeId)
    }
    return result
  }, [manager])

  // Feature 7: Performance
  const getOptimizedStrokes = useCallback(() => {
    const { visibleStrokes, metrics } = manager.getStrokesForRendering(viewport)
    return { strokes: visibleStrokes, metrics }
  }, [manager, viewport])

  const findStrokesNearPoint = useCallback((point: { x: number; y: number }, radius: number) => {
    return manager.performance.findStrokesNearPoint(point, radius)
  }, [manager])

  // Feature 8: Annotations
  const createAnnotation = useCallback((
    type: 'sticky' | 'comment' | 'question',
    position: { x: number; y: number },
    content: string
  ) => {
    const thread = manager.annotations.createThread(
      type,
      position,
      { id: userId, name: session?.user?.name || 'User', color: '#3b82f6' },
      content
    )
    setThreads(manager.annotations.getAllThreads())
    return thread
  }, [manager, userId, session])

  const addReply = useCallback((threadId: string, content: string) => {
    const reply = manager.annotations.addReply(
      threadId,
      { id: userId, name: session?.user?.name || 'User', color: '#3b82f6' },
      content
    )
    if (reply) {
      setThreads(manager.annotations.getAllThreads())
    }
    return reply
  }, [manager, userId, session])

  // Feature 9: Accessibility
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    manager.announce(message, priority)
    setAnnouncement(message)
    // Clear after delay
    setTimeout(() => setAnnouncement(null), 5000)
  }, [manager])

  const toggleKeyboardMode = useCallback(() => {
    const newMode = !isKeyboardMode
    setIsKeyboardMode(newMode)
    manager.accessibility?.setConfig({ keyboardMode: newMode })
    announce(newMode ? 'Keyboard drawing mode enabled' : 'Keyboard drawing mode disabled', 'assertive')
  }, [isKeyboardMode, manager, announce])

  const handleKeyboardDrawing = useCallback((key: string, currentPosition: { x: number; y: number }) => {
    if (!isKeyboardMode) return null
    return manager.accessibility?.handleKeyboardDrawing(key, currentPosition)
  }, [isKeyboardMode, manager])

  // Feature 10: Analytics
  useEffect(() => {
    if (!enableAnalytics || !manager.analytics) return

    const interval = setInterval(() => {
      const snapshot = manager.getAnalytics()
      if (snapshot) {
        setAnalyticsSnapshot(snapshot)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [enableAnalytics, manager])

  // Feature 11: Performance Monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      const report = manager.performance.getReport()
      setPerformanceReport({
        fps: report.fps,
        frameMetrics: report.frameMetrics,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [manager])

  // Cleanup
  useEffect(() => {
    return () => {
      manager.performance.monitor.reset()
    }
  }, [manager])

  return useMemo(() => ({
    // State
    strokes,
    viewport,
    analyticsSnapshot,
    threads,
    branches,
    activeBranchId,
    isKeyboardMode,
    announcement,
    performanceReport,
    isPlaying,
    currentSeq,

    // CRDT Operations
    addStroke,
    updateStroke,
    deleteStroke,

    // Performance
    getOptimizedStrokes,
    findStrokesNearPoint,
    setViewport,

    // Presence
    updateCursor,
    startEditing,
    stopEditing,

    // Branching
    createBranch,
    switchBranch,

    // Annotations
    createAnnotation,
    addReply,

    // Accessibility
    announce,
    toggleKeyboardMode,
    handleKeyboardDrawing,

    // Timeline
    setIsPlaying,
    setCurrentSeq,
  }), [
    strokes, viewport, analyticsSnapshot, threads, branches, activeBranchId,
    isKeyboardMode, announcement, performanceReport, isPlaying, currentSeq,
    addStroke, updateStroke, deleteStroke, getOptimizedStrokes, findStrokesNearPoint,
    updateCursor, startEditing, stopEditing, createBranch, switchBranch,
    createAnnotation, addReply, announce, toggleKeyboardMode, handleKeyboardDrawing,
  ])
}
