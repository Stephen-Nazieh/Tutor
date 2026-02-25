'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import * as fabric from 'fabric'
import * as Y from 'yjs'
import type { Socket } from 'socket.io-client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pen, Square, Circle, Type, MousePointer2, Eraser, Lock, Unlock, Wifi, WifiOff, Hand } from 'lucide-react'

interface FabricMathBoardProps {
  sessionId: string
  socket: Socket | null
  userId?: string
  userName?: string
  role: 'tutor' | 'student'
  className?: string
}

type Tool = 'select' | 'draw' | 'rect' | 'circle' | 'text' | 'erase'

interface FabricCanvasElement extends HTMLCanvasElement {
  __fabricCanvas?: fabric.Canvas
}

declare global {
  interface Window {
    __fabricMathBoards?: Record<string, fabric.Canvas>
  }
}

export function FabricMathBoard({
  sessionId,
  socket,
  userId,
  userName,
  role,
  className = '',
}: FabricMathBoardProps) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasElRef = useRef<FabricCanvasElement | null>(null)
  const canvasRef = useRef<fabric.Canvas | null>(null)
  const drawingShapeRef = useRef<fabric.Object | null>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)
  const toolRef = useRef<Tool>('draw')
  const canEditRef = useRef(true)
  const queueSnapshotSyncRef = useRef<() => void>(() => {})

  const yDocRef = useRef<Y.Doc | null>(null)
  const yMetaRef = useRef<Y.Map<unknown> | null>(null)
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const applyingRemoteRef = useRef(false)

  const [tool, setTool] = useState<Tool>('draw')
  const [isConnected, setIsConnected] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [hasRequestedEditAccess, setHasRequestedEditAccess] = useState(false)
  const [pendingEditRequests, setPendingEditRequests] = useState<Array<{ userId?: string; name: string; requestedAt: number }>>([])

  const canEdit = role === 'tutor' || !isLocked

  const applyReadonly = useCallback((readonly: boolean) => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.isDrawingMode = !readonly && (tool === 'draw' || tool === 'erase')
    canvas.selection = !readonly && tool === 'select'
    canvas.skipTargetFind = readonly || tool !== 'select'
    canvas.forEachObject((obj) => {
      obj.selectable = !readonly
      obj.evented = !readonly
    })
    if (readonly) {
      canvas.discardActiveObject()
    }
    canvas.renderAll()
  }, [tool])

  const queueSnapshotSync = useCallback(() => {
    const canvas = canvasRef.current
    const yMeta = yMetaRef.current
    if (!canvas || !yMeta || !canEdit) return
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
    syncTimerRef.current = setTimeout(() => {
      if (applyingRemoteRef.current || !canvasRef.current || !yMetaRef.current) return
      const snapshot = canvasRef.current.toJSON()
      yMetaRef.current.set('snapshot', snapshot)
      yMetaRef.current.set('updatedAt', Date.now())
      socket?.emit('math_tl_snapshot', { sessionId, snapshot })
    }, 140)
  }, [canEdit, sessionId, socket])

  useEffect(() => {
    toolRef.current = tool
  }, [tool])

  useEffect(() => {
    canEditRef.current = canEdit
  }, [canEdit])

  useEffect(() => {
    queueSnapshotSyncRef.current = queueSnapshotSync
  }, [queueSnapshotSync])

  const applySnapshotToCanvas = useCallback((snapshot: unknown) => {
    const canvas = canvasRef.current
    if (!canvas || !snapshot) return

    applyingRemoteRef.current = true
    let finalized = false
    const finalize = () => {
      if (finalized) return
      finalized = true
      canvas.renderAll()
      window.setTimeout(() => {
        applyingRemoteRef.current = false
      }, 0)
    }

    try {
      const result = (canvas as any).loadFromJSON(snapshot, finalize)
      if (result && typeof result.then === 'function') {
        result.then(finalize).catch(finalize)
      }
    } catch {
      finalize()
    }
  }, [])

  useEffect(() => {
    const yDoc = new Y.Doc()
    const yMeta = yDoc.getMap<unknown>('meta')
    yDocRef.current = yDoc
    yMetaRef.current = yMeta

    const onYDocUpdate = (update: Uint8Array, origin: unknown) => {
      if (!socket || origin === 'remote') return
      socket.emit('math_yjs_update', {
        sessionId,
        update: Array.from(update),
      })
    }

    const onYMetaUpdate = () => {
      const snapshot = yMeta.get('snapshot')
      if (!snapshot || applyingRemoteRef.current) return
      applySnapshotToCanvas(snapshot)
    }

    yDoc.on('update', onYDocUpdate)
    yMeta.observe(onYMetaUpdate)

    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      yMeta.unobserve(onYMetaUpdate)
      yDoc.off('update', onYDocUpdate)
      yDoc.destroy()
      yDocRef.current = null
      yMetaRef.current = null
    }
  }, [applySnapshotToCanvas, sessionId, socket])

  useEffect(() => {
    if (!socket) return

    const join = () => {
      socket.emit('math_wb_join', {
        sessionId,
        userId,
        name: userName || (role === 'tutor' ? 'Tutor' : 'Student'),
        role,
      })
      socket.emit('math_wb_request_sync', sessionId)
      setIsConnected(true)
    }

    const onConnect = () => join()
    const onDisconnect = () => setIsConnected(false)
    const onState = (state: { locked: boolean; tldrawSnapshot?: Record<string, unknown> | null }) => {
      setIsLocked(Boolean(state.locked))
      if (!state.locked) {
        setHasRequestedEditAccess(false)
        if (role === 'tutor') setPendingEditRequests([])
      }
      if (state.tldrawSnapshot && yMetaRef.current) {
        yMetaRef.current.set('snapshot', state.tldrawSnapshot)
      }
    }
    const onLockChanged = (data: { locked: boolean }) => {
      setIsLocked(Boolean(data.locked))
      if (!data.locked) {
        setHasRequestedEditAccess(false)
        if (role === 'tutor') setPendingEditRequests([])
      }
    }
    const onEditRequest = (data: {
      sessionId?: string
      requester?: { userId?: string; name?: string }
      requestedAt?: number
    }) => {
      if (data.sessionId && data.sessionId !== sessionId) return
      if (role !== 'tutor') return
      const requesterName = data.requester?.name?.trim()
      if (!requesterName) return
      setPendingEditRequests((prev) => {
        const dedupeKey = data.requester?.userId || requesterName
        const filtered = prev.filter((item) => (item.userId || item.name) !== dedupeKey)
        return [
          ...filtered,
          {
            userId: data.requester?.userId,
            name: requesterName,
            requestedAt: data.requestedAt || Date.now(),
          },
        ].slice(-6)
      })
    }
    const onYjsSync = (payload: { sessionId?: string; update: number[] }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      const yDoc = yDocRef.current
      if (!yDoc) return
      Y.applyUpdate(yDoc, Uint8Array.from(payload.update || []), 'remote')
    }
    const onYjsUpdate = (payload: { sessionId?: string; actorId?: string; update: number[] }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      if (payload.actorId && payload.actorId === userId) return
      const yDoc = yDocRef.current
      if (!yDoc) return
      Y.applyUpdate(yDoc, Uint8Array.from(payload.update || []), 'remote')
    }
    const onSnapshot = (payload: { sessionId?: string; actorId?: string; snapshot?: Record<string, unknown> | null }) => {
      if (payload.sessionId && payload.sessionId !== sessionId) return
      if (payload.actorId && payload.actorId === userId) return
      if (!payload.snapshot) return
      applySnapshotToCanvas(payload.snapshot)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('math_wb_state', onState)
    socket.on('math_wb_lock_changed', onLockChanged)
    socket.on('math_wb_edit_request', onEditRequest)
    socket.on('math_yjs_sync', onYjsSync)
    socket.on('math_yjs_update', onYjsUpdate)
    socket.on('math_tl_snapshot', onSnapshot)

    if (socket.connected) join()

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('math_wb_state', onState)
      socket.off('math_wb_lock_changed', onLockChanged)
      socket.off('math_wb_edit_request', onEditRequest)
      socket.off('math_yjs_sync', onYjsSync)
      socket.off('math_yjs_update', onYjsUpdate)
      socket.off('math_tl_snapshot', onSnapshot)
      socket.emit('math_wb_leave', sessionId)
    }
  }, [applySnapshotToCanvas, role, sessionId, socket, userId, userName])

  useEffect(() => {
    if (!canvasElRef.current || canvasRef.current) return

    const canvas = new fabric.Canvas(canvasElRef.current, {
      width: 1280,
      height: 720,
      backgroundColor: '#ffffff',
      isDrawingMode: true,
      selection: false,
      preserveObjectStacking: true,
    })
    canvasRef.current = canvas
    canvasElRef.current.__fabricCanvas = canvas
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
      window.__fabricMathBoards = window.__fabricMathBoards ?? {}
      window.__fabricMathBoards[sessionId] = canvas
    }

    const interactiveCanvas = canvas.upperCanvasEl as FabricCanvasElement | undefined
    if (interactiveCanvas) {
      interactiveCanvas.dataset.testid = 'fabric-math-interactive-canvas'
      interactiveCanvas.dataset.mathSession = sessionId
      interactiveCanvas.__fabricCanvas = canvas
      interactiveCanvas.style.pointerEvents = 'auto'
      interactiveCanvas.style.touchAction = 'none'
    }
    if (canvas.lowerCanvasEl) {
      canvas.lowerCanvasEl.style.pointerEvents = 'auto'
      canvas.lowerCanvasEl.style.touchAction = 'none'
    }

    const brush = canvas.freeDrawingBrush as fabric.PencilBrush
    if (brush) {
      brush.color = '#111827'
      brush.width = 2
    }

    const onObjectMutate = () => {
      if (!applyingRemoteRef.current) {
        queueSnapshotSyncRef.current()
      }
    }

    const getPoint = (evt: fabric.TEvent): { x: number; y: number } | null => {
      const maybeEvent = evt as fabric.TEvent & { scenePoint?: { x: number; y: number } }
      if (maybeEvent.scenePoint && Number.isFinite(maybeEvent.scenePoint.x) && Number.isFinite(maybeEvent.scenePoint.y)) {
        return { x: maybeEvent.scenePoint.x, y: maybeEvent.scenePoint.y }
      }
      const pointerEvent = evt.e
      if (!pointerEvent) return null
      if (typeof (canvas as unknown as { getScenePoint?: (event: Event) => { x: number; y: number } }).getScenePoint === 'function') {
        const scenePoint = (canvas as unknown as { getScenePoint: (event: Event) => { x: number; y: number } }).getScenePoint(pointerEvent)
        if (Number.isFinite(scenePoint.x) && Number.isFinite(scenePoint.y)) {
          return { x: scenePoint.x, y: scenePoint.y }
        }
      }
      if (typeof (canvas as unknown as { getPointer?: (event: Event) => { x: number; y: number } }).getPointer === 'function') {
        const fallbackPoint = (canvas as unknown as { getPointer: (event: Event) => { x: number; y: number } }).getPointer(pointerEvent)
        if (Number.isFinite(fallbackPoint.x) && Number.isFinite(fallbackPoint.y)) {
          return { x: fallbackPoint.x, y: fallbackPoint.y }
        }
      }
      return null
    }

    const onMouseDown = (evt: fabric.TEvent) => {
      if (!canEditRef.current) return
      const pointer = getPoint(evt)
      if (!pointer) return
      const activeTool = toolRef.current

      if (activeTool === 'text') {
        const text = new fabric.IText('Text', {
          left: pointer.x,
          top: pointer.y,
          fontSize: 20,
          fill: '#111827',
        })
        canvas.add(text)
        canvas.setActiveObject(text)
        text.enterEditing()
        onObjectMutate()
        return
      }

      if (activeTool !== 'rect' && activeTool !== 'circle') return
      startPointRef.current = { x: pointer.x, y: pointer.y }

      if (activeTool === 'rect') {
        const rect = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 1,
          height: 1,
          fill: 'rgba(37, 99, 235, 0.08)',
          stroke: '#2563eb',
          strokeWidth: 2,
        })
        drawingShapeRef.current = rect
        canvas.add(rect)
      } else {
        const circle = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 1,
          fill: 'rgba(16, 185, 129, 0.08)',
          stroke: '#10b981',
          strokeWidth: 2,
        })
        drawingShapeRef.current = circle
        canvas.add(circle)
      }
    }

    const onMouseMove = (evt: fabric.TEvent) => {
      if (!canEditRef.current) return
      if (!startPointRef.current || !drawingShapeRef.current) return
      const pointer = getPoint(evt)
      if (!pointer) return

      if (drawingShapeRef.current instanceof fabric.Rect) {
        const x = Math.min(startPointRef.current.x, pointer.x)
        const y = Math.min(startPointRef.current.y, pointer.y)
        const width = Math.abs(pointer.x - startPointRef.current.x)
        const height = Math.abs(pointer.y - startPointRef.current.y)
        drawingShapeRef.current.set({ left: x, top: y, width, height })
      } else if (drawingShapeRef.current instanceof fabric.Circle) {
        const radius = Math.max(Math.abs(pointer.x - startPointRef.current.x), Math.abs(pointer.y - startPointRef.current.y)) / 2
        drawingShapeRef.current.set({
          radius,
          left: startPointRef.current.x - radius,
          top: startPointRef.current.y - radius,
        })
      }
      canvas.renderAll()
    }

    const onMouseUp = () => {
      if (!canEditRef.current) return
      if (drawingShapeRef.current) {
        drawingShapeRef.current = null
        startPointRef.current = null
        onObjectMutate()
      }
    }

    canvas.on('path:created', onObjectMutate)
    canvas.on('object:modified', onObjectMutate)
    canvas.on('object:removed', onObjectMutate)
    canvas.on('mouse:down', onMouseDown)
    canvas.on('mouse:move', onMouseMove)
    canvas.on('mouse:up', onMouseUp)

    const resize = () => {
      const root = rootRef.current
      if (!root) return
      const bounds = root.getBoundingClientRect()
      const width = Math.max(960, Math.floor(bounds.width - 12))
      const height = Math.max(520, Math.floor(bounds.height - 12))
      canvas.setDimensions({ width, height })
      canvas.renderAll()
    }

    resize()
    const ro = new ResizeObserver(() => resize())
    if (rootRef.current) ro.observe(rootRef.current)

    return () => {
      ro.disconnect()
      canvas.off('path:created', onObjectMutate)
      canvas.off('object:modified', onObjectMutate)
      canvas.off('object:removed', onObjectMutate)
      canvas.off('mouse:down', onMouseDown)
      canvas.off('mouse:move', onMouseMove)
      canvas.off('mouse:up', onMouseUp)
      canvas.dispose()
      if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && window.__fabricMathBoards) {
        delete window.__fabricMathBoards[sessionId]
      }
      canvasRef.current = null
    }
  }, [sessionId])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.isDrawingMode = canEdit && (tool === 'draw' || tool === 'erase')
    canvas.selection = canEdit && tool === 'select'
    canvas.skipTargetFind = !(canEdit && tool === 'select')

    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = tool === 'erase' ? '#ffffff' : '#111827'
      canvas.freeDrawingBrush.width = tool === 'erase' ? 18 : 2
    }

    if (tool !== 'select') {
      canvas.discardActiveObject()
    }

    applyReadonly(!canEdit)
  }, [applyReadonly, canEdit, tool])

  const statusBadge = useMemo(() => {
    if (isConnected) {
      return (
        <Badge variant="outline" className="gap-1">
          <Wifi className="h-3 w-3 text-green-600" />
          Synced
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="gap-1">
        <WifiOff className="h-3 w-3 text-amber-600" />
        Reconnecting
      </Badge>
    )
  }, [isConnected])

  const toolButton = (value: Tool, label: string, icon: ReactNode) => (
    <Button
      key={value}
      type="button"
      size="sm"
      variant={tool === value ? 'default' : 'outline'}
      onClick={() => setTool(value)}
      disabled={!canEdit}
      className="gap-1"
    >
      {icon}
      {label}
    </Button>
  )

  const requestEditAccess = () => {
    if (role !== 'student' || canEdit || !socket) return
    socket.emit('math_wb_edit_request', { sessionId })
    setHasRequestedEditAccess(true)
  }

  return (
    <div className={`h-full min-h-0 flex flex-col rounded-lg border bg-white ${className}`} data-testid="fabric-math-board">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-3 py-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold">Math Whiteboard</h3>
          {statusBadge}
          <Badge variant={canEdit ? 'default' : 'secondary'}>{canEdit ? 'Editable' : 'Read only'}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {canEdit ? (
            <>
              {toolButton('select', 'Select', <MousePointer2 className="h-3 w-3" />)}
              {toolButton('draw', 'Draw', <Pen className="h-3 w-3" />)}
              {toolButton('erase', 'Erase', <Eraser className="h-3 w-3" />)}
              {toolButton('rect', 'Rectangle', <Square className="h-3 w-3" />)}
              {toolButton('circle', 'Circle', <Circle className="h-3 w-3" />)}
              {toolButton('text', 'Text', <Type className="h-3 w-3" />)}
            </>
          ) : (
            <Badge variant="secondary">Toolbar disabled while locked</Badge>
          )}

          {role === 'student' && !canEdit && (
            <Button
              variant="secondary"
              size="sm"
              className="gap-1"
              onClick={requestEditAccess}
              disabled={hasRequestedEditAccess}
            >
              <Hand className="h-3 w-3" />
              {hasRequestedEditAccess ? 'Request sent' : 'Request edit access'}
            </Button>
          )}

          {role === 'tutor' && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => socket?.emit('math_wb_lock', { sessionId, locked: !isLocked })}
            >
              {isLocked ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {isLocked ? 'Unlock Students' : 'Lock Students'}
            </Button>
          )}
          {role === 'tutor' && pendingEditRequests.length > 0 && (
            <Badge variant="secondary">
              {pendingEditRequests.length} edit request{pendingEditRequests.length === 1 ? '' : 's'}
            </Badge>
          )}
        </div>
      </div>

      <div ref={rootRef} className="relative flex-1 min-h-0 touch-none p-1">
        {role === 'student' && !canEdit && (
          <div className="absolute left-3 right-3 top-3 z-10 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 shadow-sm">
            Board locked by tutor. You can view only until access is granted.
          </div>
        )}
        <canvas
          ref={canvasElRef}
          data-testid="fabric-math-canvas"
          data-math-session={sessionId}
          className="h-full w-full rounded border border-slate-200"
        />
      </div>
    </div>
  )
}

export default FabricMathBoard
