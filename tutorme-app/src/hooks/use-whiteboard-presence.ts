// @ts-nocheck
/**
 * Whiteboard Presence Hook
 * 
 * Manages user presence, editing halos, and conflict resolution
 * for collaborative whiteboard editing.
 */

import { useState, useCallback, useRef, useEffect, useMemo } from 'react'
import {
  PresenceManager,
  PresenceUser,
  EditingState,
  ConflictHint,
  HaloRenderData,
  createStrokeHalo,
} from '@/lib/whiteboard/presence'
import type { WhiteboardStroke } from './use-live-class-whiteboard'

interface UseWhiteboardPresenceOptions {
  userId: string
  userName: string
  userRole: 'tutor' | 'student'
  onConflict?: (hint: ConflictHint) => void
}

export function useWhiteboardPresence(options: UseWhiteboardPresenceOptions) {
  const { userId, userName, userRole, onConflict } = options

  // Initialize presence manager
  const managerRef = useRef(new PresenceManager(userId))
  const [users, setUsers] = useState<PresenceUser[]>([])
  const [editingElements, setEditingElements] = useState<Set<string>>(new Set())
  const [conflictHints, setConflictHints] = useState<ConflictHint[]>([])
  const [halos, setHalos] = useState<HaloRenderData[]>([])
  const [activitySummary, setActivitySummary] = useState({
    totalUsers: 0,
    activeEditors: 0,
    idleUsers: 0,
    conflicts: 0,
  })

  // Register current user
  useEffect(() => {
    managerRef.current.updateUser({
      userId,
      name: userName,
      role: userRole,
    })
  }, [userId, userName, userRole])

  /**
   * Update remote user presence
   */
  const updateRemoteUser = useCallback((user: Partial<PresenceUser> & { userId: string }) => {
    managerRef.current.updateUser(user)
    setUsers(managerRef.current.getUsers())
    setActivitySummary(managerRef.current.getActivitySummary())
  }, [])

  /**
   * Remove a remote user
   */
  const removeRemoteUser = useCallback((userId: string) => {
    managerRef.current.removeUser(userId)
    setUsers(managerRef.current.getUsers())
    setActivitySummary(managerRef.current.getActivitySummary())
  }, [])

  /**
   * Update cursor position for current user
   */
  const updateCursor = useCallback((x: number, y: number) => {
    managerRef.current.updateUser({
      userId,
      cursor: { x, y },
    })
  }, [userId])

  /**
   * Update remote user's cursor
   */
  const updateRemoteCursor = useCallback((userId: string, x: number, y: number) => {
    managerRef.current.updateUser({
      userId,
      cursor: { x, y },
    })
    setUsers(managerRef.current.getUsers())
  }, [])

  /**
   * Start editing an element
   */
  const startEditing = useCallback((
    elementId: string,
    elementType: EditingState['elementType'],
    operation: EditingState['operation']
  ): boolean => {
    const result = managerRef.current.startEditing(userId, elementId, elementType, operation)
    if (result === null) {
      // Conflict detected
      const hints = managerRef.current.getConflictHints()
      setConflictHints(hints)
      const newHint = hints.find((h) => h.elementId === elementId)
      if (newHint && onConflict) {
        onConflict(newHint)
      }
      return false
    }
    setEditingElements(new Set(managerRef.current['editingStates'].keys()))
    setActivitySummary(managerRef.current.getActivitySummary())
    return true
  }, [userId, onConflict])

  /**
   * Stop editing an element
   */
  const stopEditing = useCallback((elementId: string) => {
    managerRef.current.stopEditing(userId, elementId)
    setEditingElements(new Set(managerRef.current['editingStates'].keys()))
    setConflictHints(managerRef.current.getConflictHints())
    setActivitySummary(managerRef.current.getActivitySummary())
  }, [userId])

  /**
   * Check if can edit an element
   */
  const canEdit = useCallback((elementId: string) => {
    return managerRef.current.canEdit(elementId)
  }, [])

  /**
   * Get the editor of an element
   */
  const getEditor = useCallback((elementId: string) => {
    return managerRef.current.getEditor(elementId)
  }, [])

  /**
   * Resolve a conflict
   */
  const resolveConflict = useCallback((elementId: string, resolution: 'merge' | 'override' | 'cancel') => {
    managerRef.current.resolveConflict(elementId, resolution)
    setConflictHints(managerRef.current.getConflictHints())
    setEditingElements(new Set(managerRef.current['editingStates'].keys()))
  }, [])

  /**
   * Update halos for rendering
   */
  const updateHalos = useCallback((
    elements: Array<{ id: string; x: number; y: number; width: number; height: number }>
  ) => {
    const newHalos = managerRef.current.getHalosForRendering(elements)
    setHalos(newHalos)
  }, [])

  /**
   * Create halos for strokes
   */
  const createStrokeHalos = useCallback((
    strokes: WhiteboardStroke[],
    strokeUsers: Map<string, { userId: string; name: string; color: string }>
  ): HaloRenderData[] => {
    return strokes
      .filter((stroke) => stroke.userId !== userId)
      .map((stroke) => {
        const user = strokeUsers.get(stroke.userId) || {
          userId: stroke.userId,
          name: 'Unknown',
          color: '#999999',
        }
        return createStrokeHalo(stroke, user, 'drawing')
      })
  }, [userId])

  /**
   * Get cursors for rendering
   */
  const getCursorsForRendering = useCallback(() => {
    return managerRef.current.getCursorsForRendering()
  }, [])

  /**
   * Clean up stale presence data
   */
  const cleanup = useCallback((staleThreshold?: number) => {
    managerRef.current.cleanup(staleThreshold)
    setUsers(managerRef.current.getUsers())
    setActivitySummary(managerRef.current.getActivitySummary())
  }, [])

  /**
   * Check if element is being edited by current user
   */
  const isEditing = useCallback((elementId: string) => {
    return editingElements.has(elementId)
  }, [editingElements])

  /**
   * Get all users editing a specific element
   */
  const getEditors = useCallback((elementId: string): PresenceUser[] => {
    const allEditing: PresenceUser[] = []
    managerRef.current['editingStates'].forEach((state, id) => {
      if (id === elementId) {
        const user = managerRef.current['users'].get(state.userId)
        if (user) allEditing.push(user)
      }
    })
    return allEditing
  }, [])

  /**
   * Request edit access to a locked element
   */
  const requestEditAccess = useCallback((elementId: string): boolean => {
    const check = managerRef.current.canEdit(elementId)
    if (check.allowed) return true

    // For now, we just notify about the conflict
    // In a real implementation, this could send a request to the server
    const editor = check.lockedBy
    if (editor) {
      console.log(`Requesting edit access from ${editor.name}`)
    }
    return false
  }, [])

  // Periodic cleanup
  useEffect(() => {
    const interval = setInterval(() => {
      cleanup(300000) // 5 minutes
    }, 60000) // Every minute

    return () => clearInterval(interval)
  }, [cleanup])

  return useMemo(() => ({
    // State
    users,
    conflictHints,
    halos,
    activitySummary,
    editingElements,

    // Actions
    updateRemoteUser,
    removeRemoteUser,
    updateCursor,
    updateRemoteCursor,
    startEditing,
    stopEditing,
    canEdit,
    getEditor,
    resolveConflict,
    updateHalos,
    createStrokeHalos,
    getCursorsForRendering,
    cleanup,
    isEditing,
    getEditors,
    requestEditAccess,
  }), [
    users,
    conflictHints,
    halos,
    activitySummary,
    editingElements,
    updateRemoteUser,
    removeRemoteUser,
    updateCursor,
    updateRemoteCursor,
    startEditing,
    stopEditing,
    canEdit,
    getEditor,
    resolveConflict,
    updateHalos,
    createStrokeHalos,
    getCursorsForRendering,
    cleanup,
    isEditing,
    getEditors,
    requestEditAccess,
  ])
}
