// @ts-nocheck
'use client'

import { useCallback, useEffect, useMemo, useState, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import type {
  AnyMathElement,
  MathWBParticipant,
  MathWBPage,
  ToolType,
  ToolSettings,
  ViewTransform,
} from '@/types/math-whiteboard'
import { CRDTManager, UndoRedoManager, type Operation } from '@/lib/whiteboard/crdt'

const emitMathDebug = (event: string, data?: Record<string, unknown>) => {
  const payload = { event, ...(data || {}) }
  console.info('[MathDebug]', payload)
  if (typeof window !== 'undefined') {
    const w = window as Window & { __mathDebug?: Array<Record<string, unknown>> }
    if (!Array.isArray(w.__mathDebug)) w.__mathDebug = []
    w.__mathDebug.push(payload)
  }
}

interface UseMathWhiteboardProps {
  sessionId: string
  userId?: string
  name?: string
  role?: 'student' | 'tutor'
}

interface UseMathWhiteboardReturn {
  // Connection state
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  isLocalMode: boolean
  
  // Session state
  isLocked: boolean
  canEdit: boolean
  currentPage: number
  totalPages: number
  elements: AnyMathElement[]
  selectedIds: string[]
  participants: MathWBParticipant[]
  
  // View state
  transform: ViewTransform
  activeTool: ToolType
  toolSettings: ToolSettings
  
  // CRDT state
  canUndo: boolean
  canRedo: boolean
  operationCount: number
  
  // Actions
  join: () => void
  leave: () => void
  setLock: (locked: boolean) => void
  changePage: (pageIndex: number) => void
  createElement: (element: AnyMathElement) => void
  updateElement: (id: string, changes: Partial<AnyMathElement>) => void
  deleteElement: (id: string) => void
  selectElements: (ids: string[]) => void
  clearSelection: () => void
  setTransform: (transform: ViewTransform) => void
  setActiveTool: (tool: ToolType) => void
  setToolSettings: (settings: Partial<ToolSettings>) => void
  
  // Cursor
  sendCursor: (x: number, y: number) => void
  
  // Undo/Redo
  undo: () => void
  redo: () => void
  
  // Local mode
  enableLocalMode: () => void
  
  // CRDT sync
  syncWithRemote: (remoteElements: AnyMathElement[]) => void
}

// Generate unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`

export function useMathWhiteboard({
  sessionId,
  userId,
  name,
  role = 'student',
}: UseMathWhiteboardProps): UseMathWhiteboardReturn {
  const socketRef = useRef<Socket | null>(null)
  const crdtRef = useRef<CRDTManager | null>(null)
  const undoRedoRef = useRef<UndoRedoManager | null>(null)
  
  // Connection state
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLocalMode, setIsLocalMode] = useState(false)
  
  // Session state
  const [isLocked, setIsLocked] = useState(false)
  const [canEdit, setCanEdit] = useState(role === 'tutor')
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [elements, setElements] = useState<AnyMathElement[]>([])
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [participants, setParticipants] = useState<MathWBParticipant[]>([])
  
  // View state
  const [transform, setTransform] = useState<ViewTransform>({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
  })
  const [activeTool, setActiveTool] = useState<ToolType>('select')
  const [toolSettings, setToolSettingsState] = useState<ToolSettings>({
    strokeColor: '#000000',
    strokeWidth: 2,
    fillColor: 'transparent',
    fontSize: 16,
    opacity: 1,
  })
  
  // CRDT state
  const [operationCount, setOperationCount] = useState(0)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  
  // Initialize CRDT
  useEffect(() => {
    if (!userId || !sessionId) return
    
    crdtRef.current = new CRDTManager(userId, sessionId)
    undoRedoRef.current = new UndoRedoManager()
    
    return () => {
      crdtRef.current = null
      undoRedoRef.current = null
    }
  }, [userId, sessionId])

  // Initialize socket connection
  useEffect(() => {
    if (!sessionId || isLocalMode) return

    setIsConnecting(true)
    setError(null)
    let fallbackTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
      emitMathDebug('useMathWhiteboard.connection:stall-timeout', { sessionId })
      setError('Realtime math sync timed out. Switched to offline mode.')
      setIsConnected(false)
      setIsConnecting(false)
      setIsLocalMode(true)
    }, 2500)

    const clearFallbackTimer = () => {
      if (!fallbackTimer) return
      clearTimeout(fallbackTimer)
      fallbackTimer = null
    }

    const connect = async () => {
      const token = await import('@/lib/socket-auth').then((m) => m.getSocketToken())
      if (!token) {
        setError('Authentication required')
        setIsConnecting(false)
        return
      }
      const socket = io({
        path: '/api/socket',
        transports: ['websocket', 'polling'],
        timeout: 10000,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
        auth: { token },
      })
      socketRef.current = socket

    socket.on('connect', () => {
      console.log('[MathWhiteboard] Socket connected')
      clearFallbackTimer()
      setIsConnected(true)
      setIsConnecting(false)
      setError(null)
      
      // Join the math whiteboard room
      socket.emit('math_wb_join', {
        sessionId,
        userId,
        name: name || (role === 'tutor' ? 'Tutor' : 'Student'),
        role,
      })
    })

    socket.on('disconnect', (reason) => {
      console.log('[MathWhiteboard] Socket disconnected:', reason)
      setIsConnected(false)
      setIsConnecting(false)
    })

    socket.on('connect_error', (err) => {
      console.error('[MathWhiteboard] Connection error:', err.message)
      clearFallbackTimer()
      setError(`Connection failed: ${err.message}`)
      setIsConnected(false)
      setIsConnecting(false)
      
      // Auto-enable local mode after connection failure
      if (!isLocalMode) {
        console.log('[MathWhiteboard] Falling back to local mode')
        setIsLocalMode(true)
      }
    })

    // Setup socket event listeners
    const handleState = (state: {
      sessionId: string
      locked: boolean
      currentPage: number
      elements: AnyMathElement[]
      pages: MathWBPage[]
    }) => {
      console.log('[MathWhiteboard] Received state:', state)
      clearFallbackTimer()
      setIsConnecting(false)
      setIsLocked(state.locked)
      setCanEdit(role === 'tutor' || !state.locked)
      setCurrentPage(state.currentPage)
      setTotalPages(Math.max(1, state.pages?.length || 1))
      setElements(state.elements || [])
    }

    const handlePresence = (data: {
      sessionId: string
      participants: MathWBParticipant[]
    }) => {
      setParticipants(data.participants)
    }

    const handleElementCreated = (data: {
      sessionId: string
      element: AnyMathElement
      actorId?: string
    }) => {
      setElements(prev => {
        const exists = prev.find(e => e.id === data.element.id)
        if (exists) {
          return prev.map(e => e.id === data.element.id ? data.element : e)
        }
        return [...prev, data.element]
      })
    }

    const handleElementUpdated = (data: {
      sessionId: string
      elementId: string
      changes: Partial<AnyMathElement>
      version: number
      actorId?: string
    }) => {
      setElements(prev =>
        prev.map(el =>
          el.id === data.elementId
            ? { ...el, ...data.changes, version: data.version }
            : el
        )
      )
    }

    const handleElementDeleted = (data: {
      sessionId: string
      elementId: string
      actorId?: string
    }) => {
      setElements(prev => prev.filter(el => el.id !== data.elementId))
      setSelectedIds(prev => prev.filter(id => id !== data.elementId))
    }

    const handleLockChanged = (data: {
      sessionId: string
      locked: boolean
      by?: string
    }) => {
      setIsLocked(data.locked)
      setCanEdit(role === 'tutor' || !data.locked)
    }

    const handleCursorMoved = (data: {
      sessionId: string
      userId?: string
      name: string
      color: string
      x: number
      y: number
    }) => {
      setParticipants((prev) =>
        prev.map((participant) => {
          if ((data.userId && participant.userId === data.userId) || participant.name === data.name) {
            return { ...participant, cursor: { x: data.x, y: data.y } }
          }
          return participant
        })
      )
    }

    const handlePageChanged = (data: {
      sessionId: string
      pageIndex: number
      elements: AnyMathElement[]
    }) => {
      setCurrentPage(data.pageIndex)
      setTotalPages((prev) => Math.max(prev, data.pageIndex + 1))
      setElements(data.elements || [])
      setSelectedIds([])
    }

    socket.on('math_wb_state', handleState)
    socket.on('math_wb_presence', handlePresence)
    socket.on('math_wb_element_created', handleElementCreated)
    socket.on('math_wb_element_updated', handleElementUpdated)
    socket.on('math_wb_element_deleted', handleElementDeleted)
    socket.on('math_wb_lock_changed', handleLockChanged)
    socket.on('math_wb_cursor_moved', handleCursorMoved)
    socket.on('math_wb_page_changed', handlePageChanged)

    }
    connect()
    return () => {
      clearFallbackTimer()
      const s = socketRef.current
      if (s) {
        s.off('math_wb_state', handleState)
        s.off('math_wb_presence', handlePresence)
        s.off('math_wb_element_created', handleElementCreated)
        s.off('math_wb_element_updated', handleElementUpdated)
        s.off('math_wb_element_deleted', handleElementDeleted)
        s.off('math_wb_lock_changed', handleLockChanged)
        s.off('math_wb_cursor_moved', handleCursorMoved)
        s.off('math_wb_page_changed', handlePageChanged)
        s.disconnect()
        socketRef.current = null
      }
    }
  }, [sessionId, userId, name, role, isLocalMode])

  // Local mode: simulate connection
  useEffect(() => {
    if (!isLocalMode) return
    
    console.log('[MathWhiteboard] Local mode enabled')
    setIsConnected(true)
    setIsConnecting(false)
    setCanEdit(true)
    setError(null)
    
    // Add current user as participant
    setParticipants([{
      userId,
      name: name || (role === 'tutor' ? 'Tutor' : 'Student'),
      role,
      color: '#3b82f6',
    }])
  }, [isLocalMode, userId, name, role])

  // Join the math whiteboard room
  const join = useCallback(() => {
    if (isLocalMode) return
    
    const socket = socketRef.current
    if (!socket || !sessionId) return
    
    setIsConnecting(true)
    socket.emit('math_wb_join', {
      sessionId,
      userId,
      name: name || (role === 'tutor' ? 'Tutor' : 'Student'),
      role,
    })
  }, [socketRef, sessionId, userId, name, role, isLocalMode])

  // Leave the room
  const leave = useCallback(() => {
    if (isLocalMode) {
      setIsConnected(false)
      return
    }
    
    const socket = socketRef.current
    if (!socket || !sessionId) return
    socket.emit('math_wb_leave', sessionId)
  }, [socketRef, sessionId, isLocalMode])

  // Set lock state
  const setLock = useCallback((locked: boolean) => {
    if (isLocalMode) {
      setIsLocked(locked)
      setCanEdit(role === 'tutor' || !locked)
      return
    }
    
    const socket = socketRef.current
    if (!socket || !sessionId || role !== 'tutor') return
    socket.emit('math_wb_lock', { sessionId, locked })
  }, [socketRef, sessionId, role, isLocalMode])

  // Change page
  const changePage = useCallback((pageIndex: number) => {
    if (pageIndex < 0) return
    
    if (isLocalMode) {
      setCurrentPage(pageIndex)
      setTotalPages((prev) => Math.max(prev, pageIndex + 1))
      setSelectedIds([])
      return
    }
    
    const socket = socketRef.current
    if (!socket || !sessionId) return
    socket.emit('math_wb_change_page', { sessionId, pageIndex })
  }, [socketRef, sessionId, isLocalMode])

  // Create element with CRDT
  const createElement = useCallback((element: AnyMathElement) => {
    if (!canEdit) return

    emitMathDebug('useMathWhiteboard.createElement:received', {
      elementId: element.id,
      type: element.type,
      canEdit,
      isLocalMode,
    })

    // Always apply optimistically to local UI first.
    setElements(prev => {
      const existingIndex = prev.findIndex((el) => el.id === element.id)
      emitMathDebug('useMathWhiteboard.createElement:optimisticCommit', {
        elementId: element.id,
        previousCount: prev.length,
        exists: existingIndex !== -1,
      })
      if (existingIndex === -1) return [...prev, element]
      return prev.map((el) => (el.id === element.id ? element : el))
    })

    // Apply via CRDT when available.
    const crdt = crdtRef.current
    const undoRedo = undoRedoRef.current
    
    if (crdt && undoRedo) {
      const operation = crdt.createElement(element)
      undoRedo.push(operation)
      setOperationCount(prev => prev + 1)
      updateUndoRedoState()
    }
    
    // Sync to server if connected
    if (!isLocalMode) {
      const socket = socketRef.current
      if (socket && sessionId) {
        socket.emit('math_wb_element_create', { sessionId, element })
      }
    }
  }, [sessionId, canEdit, isLocalMode])

  // Update element with CRDT
  const updateElement = useCallback((id: string, changes: Partial<AnyMathElement>) => {
    if (!canEdit) return

    // Keep local UI responsive even if CRDT isn't initialized yet.
    setElements(prev =>
      prev.map(el => (el.id === id ? { ...el, ...changes } : el))
    )

    const crdt = crdtRef.current
    const undoRedo = undoRedoRef.current
    
    if (crdt && undoRedo) {
      const operation = crdt.updateElement(id, changes)
      if (operation) {
        undoRedo.push(operation)
        setOperationCount(prev => prev + 1)
        updateUndoRedoState()
      }
    }
    
    // Sync to server if connected
    if (!isLocalMode) {
      const socket = socketRef.current
      if (socket && sessionId) {
        socket.emit('math_wb_element_update', { sessionId, elementId: id, changes })
      }
    }
  }, [sessionId, canEdit, isLocalMode])

  // Delete element with CRDT
  const deleteElement = useCallback((id: string) => {
    if (!canEdit) return

    // Optimistic local removal.
    setElements(prev => prev.filter(el => el.id !== id))
    setSelectedIds(prev => prev.filter(sid => sid !== id))

    const crdt = crdtRef.current
    const undoRedo = undoRedoRef.current
    
    if (crdt && undoRedo) {
      const operation = crdt.deleteElement(id)
      if (operation) {
        undoRedo.push(operation)
        setOperationCount(prev => prev + 1)
        updateUndoRedoState()
      }
    }
    
    // Sync to server if connected
    if (!isLocalMode) {
      const socket = socketRef.current
      if (socket && sessionId) {
        socket.emit('math_wb_element_delete', { sessionId, elementId: id })
      }
    }
  }, [sessionId, canEdit, isLocalMode])

  // Send cursor position
  const sendCursor = useCallback((x: number, y: number) => {
    if (isLocalMode) return
    
    const socket = socketRef.current
    if (!socket || !sessionId) return
    socket.emit('math_wb_cursor', { sessionId, x, y })
  }, [socketRef, sessionId, isLocalMode])

  // Selection
  const selectElements = useCallback((ids: string[]) => {
    setSelectedIds(ids)
  }, [])

  const clearSelection = useCallback(() => {
    setSelectedIds([])
  }, [])

  // Tool settings
  const setToolSettings = useCallback((settings: Partial<ToolSettings>) => {
    setToolSettingsState(prev => ({ ...prev, ...settings }))
  }, [])
  
  // Enable local mode
  const enableLocalMode = useCallback(() => {
    setIsLocalMode(true)
    setError(null)
  }, [])
  
  // Update undo/redo state
  const updateUndoRedoState = useCallback(() => {
    const undoRedo = undoRedoRef.current
    if (undoRedo) {
      setCanUndo(undoRedo.canUndo())
      setCanRedo(undoRedo.canRedo())
    }
  }, [])
  
  // Undo
  const undo = useCallback(() => {
    const crdt = crdtRef.current
    const undoRedo = undoRedoRef.current
    
    if (!crdt || !undoRedo || !undoRedo.canUndo()) return
    
    const operation = undoRedo.undo()
    if (operation) {
      const inverseOp = undoRedo.getInverseOperation(operation)
      if (inverseOp) {
        crdt.applyOperation(inverseOp)
        setElements(crdt.getElements())
        updateUndoRedoState()
        
        // Sync to server
        if (!isLocalMode) {
          const socket = socketRef.current
          if (socket && sessionId) {
            socket.emit('math_wb_element_update', {
              sessionId,
              elementId: operation.elementId,
              changes: inverseOp.data || {},
            })
          }
        }
      }
    }
  }, [sessionId, isLocalMode, updateUndoRedoState])
  
  // Redo
  const redo = useCallback(() => {
    const crdt = crdtRef.current
    const undoRedo = undoRedoRef.current
    
    if (!crdt || !undoRedo || !undoRedo.canRedo()) return
    
    const operation = undoRedo.redo()
    if (operation) {
      crdt.applyOperation(operation)
      setElements(crdt.getElements())
      updateUndoRedoState()
      
      // Sync to server
      if (!isLocalMode) {
        const socket = socketRef.current
        if (socket && sessionId) {
          socket.emit('math_wb_element_update', {
            sessionId,
            elementId: operation.elementId,
            changes: operation.data || {},
          })
        }
      }
    }
  }, [sessionId, isLocalMode, updateUndoRedoState])
  
  // Sync with remote (for conflict resolution)
  const syncWithRemote = useCallback((remoteElements: AnyMathElement[]) => {
    const crdt = crdtRef.current
    if (!crdt) return
    
    // Import remote elements into CRDT
    for (const element of remoteElements) {
      const existing = crdt.getElement(element.id)
      if (!existing) {
        // New element from remote
        crdt.applyOperation({
          id: `sync-${element.id}`,
          type: 'create',
          elementId: element.id,
          timestamp: element.lastModified,
          vectorClock: {},
          userId: element.authorId,
          sessionId,
          data: element,
        })
      } else if (element.version > existing.version) {
        // Remote has newer version
        crdt.applyOperation({
          id: `sync-${element.id}-${Date.now()}`,
          type: 'update',
          elementId: element.id,
          timestamp: element.lastModified,
          vectorClock: {},
          userId: element.modifiedBy,
          sessionId,
          data: element,
        })
      }
    }
    
    setElements(crdt.getElements())
  }, [sessionId])

  return useMemo(
    () => ({
      // Connection
      isConnected,
      isConnecting,
      error,
      isLocalMode,
      
      // Session
      isLocked,
      canEdit,
      currentPage,
      totalPages,
      elements,
      selectedIds,
      participants,
      
      // View
      transform,
      activeTool,
      toolSettings,
      
      // CRDT
      canUndo,
      canRedo,
      operationCount,
      
      // Actions
      join,
      leave,
      setLock,
      changePage,
      createElement,
      updateElement,
      deleteElement,
      selectElements,
      clearSelection,
      setTransform,
      setActiveTool,
      setToolSettings,
      sendCursor,
      
      // Undo/Redo
      undo,
      redo,
      
      // Local mode
      enableLocalMode,
      
      // CRDT sync
      syncWithRemote,
    }),
    [
      isConnected,
      isConnecting,
      error,
      isLocalMode,
      isLocked,
      canEdit,
      currentPage,
      totalPages,
      elements,
      selectedIds,
      participants,
      transform,
      activeTool,
      toolSettings,
      canUndo,
      canRedo,
      operationCount,
      join,
      leave,
      setLock,
      changePage,
      createElement,
      updateElement,
      deleteElement,
      selectElements,
      clearSelection,
      sendCursor,
      undo,
      redo,
      enableLocalMode,
      syncWithRemote,
    ]
  )
}
