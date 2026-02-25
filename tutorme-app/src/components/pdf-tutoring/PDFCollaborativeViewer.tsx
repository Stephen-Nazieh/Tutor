/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Lock, Unlock, Upload, RefreshCw } from 'lucide-react'
import { usePdfCollabSocket } from '@/hooks/use-pdf-collab-socket'
import { percentToPx, pxToPercent } from '@/lib/pdf-tutoring/coordinates'
import type { PdfCanvasEventPayload, PdfViewMode, PercentFabricObject } from '@/lib/pdf-tutoring/types'

async function loadOptionalModule(moduleName: string): Promise<any | null> {
  try {
    const importer = new Function('name', 'return import(name)') as (name: string) => Promise<any>
    return await importer(moduleName)
  } catch {
    return null
  }
}

interface PDFCollaborativeViewerProps {
  roomId: string
  role?: 'tutor' | 'student'
  initialPdfUrl?: string
  forceLocked?: boolean
  showLockControl?: boolean
  showCollabStatus?: boolean
  showAiActions?: boolean
  capabilities?: {
    draw?: boolean
    erase?: boolean
    select?: boolean
    text?: boolean
    shapes?: boolean
    clear?: boolean
    flatten?: boolean
  }
}

export function PDFCollaborativeViewer({
  roomId,
  role = 'tutor',
  initialPdfUrl,
  forceLocked,
  showLockControl,
  showCollabStatus = true,
  showAiActions = true,
  capabilities,
}: PDFCollaborativeViewerProps) {
  const { data: session } = useSession()
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasElementRef = useRef<HTMLCanvasElement>(null)
  const fabricInstanceRef = useRef<any>(null)
  const renderTaskRef = useRef<any>(null)
  const renderSeqRef = useRef(0)
  const suppressBroadcastRef = useRef(false)

  const [mode, setMode] = useState<PdfViewMode>('original')
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const [cleanedText, setCleanedText] = useState('')
  const [markedFeedback, setMarkedFeedback] = useState('')
  const [fabricReady, setFabricReady] = useState(false)
  const [tool, setTool] = useState<'draw' | 'erase' | 'select'>('draw')
  const [strokeColor, setStrokeColor] = useState('#ef4444')
  const [strokeWidth, setStrokeWidth] = useState(2)

  const userId = session?.user?.id
  const userName = session?.user?.name || 'Tutor'
  const effectiveCapabilities = useMemo(() => ({
    draw: capabilities?.draw ?? true,
    erase: capabilities?.erase ?? true,
    select: capabilities?.select ?? true,
    text: capabilities?.text ?? true,
    shapes: capabilities?.shapes ?? true,
    clear: capabilities?.clear ?? true,
    flatten: capabilities?.flatten ?? true,
  }), [capabilities])

  const applyObjectPercentToPx = useCallback((object: PercentFabricObject, width: number, height: number) => {
    const next: PercentFabricObject = {
      ...object,
      ...(typeof object.left === 'number' ? { left: percentToPx(object.left, width) } : {}),
      ...(typeof object.top === 'number' ? { top: percentToPx(object.top, height) } : {}),
      ...(typeof object.width === 'number' ? { width: percentToPx(object.width, width) } : {}),
      ...(typeof object.height === 'number' ? { height: percentToPx(object.height, height) } : {}),
      ...(typeof object.radius === 'number' ? { radius: percentToPx(object.radius, Math.min(width, height)) } : {}),
      ...(typeof object.strokeWidth === 'number' ? { strokeWidth: percentToPx(object.strokeWidth, Math.min(width, height)) } : {}),
      ...(typeof object.fontSize === 'number' ? { fontSize: percentToPx(object.fontSize, height) } : {}),
    }

    if (Array.isArray(next.points)) {
      next.points = next.points.map((p) => ({
        x: percentToPx(p.x, width),
        y: percentToPx(p.y, height),
      }))
    }

    if (Array.isArray(next.path)) {
      next.path = next.path.map((segment) => {
        if (!Array.isArray(segment) || segment.length < 3) return segment
        const [cmd, ...nums] = segment
        const converted: Array<string | number> = [String(cmd)]
        for (let i = 0; i < nums.length; i += 2) {
          const x = Number(nums[i])
          const y = Number(nums[i + 1])
          converted.push(percentToPx(x, width), percentToPx(y, height))
        }
        return converted
      })
    }

    return next
  }, [])

  const serializeObjectToPercent = useCallback((obj: any, width: number, height: number): PercentFabricObject => {
    const raw = obj.toObject([
      'id', 'type', 'left', 'top', 'width', 'height', 'radius', 'scaleX', 'scaleY', 'strokeWidth',
      'fontSize', 'angle', 'fill', 'stroke', 'text', 'path', 'points',
    ]) as PercentFabricObject

    const next: PercentFabricObject = {
      ...raw,
      id: raw.id || `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      ...(typeof raw.left === 'number' ? { left: pxToPercent(raw.left, width) } : {}),
      ...(typeof raw.top === 'number' ? { top: pxToPercent(raw.top, height) } : {}),
      ...(typeof raw.width === 'number' ? { width: pxToPercent(raw.width, width) } : {}),
      ...(typeof raw.height === 'number' ? { height: pxToPercent(raw.height, height) } : {}),
      ...(typeof raw.radius === 'number' ? { radius: pxToPercent(raw.radius, Math.min(width, height)) } : {}),
      ...(typeof raw.strokeWidth === 'number' ? { strokeWidth: pxToPercent(raw.strokeWidth, Math.min(width, height)) } : {}),
      ...(typeof raw.fontSize === 'number' ? { fontSize: pxToPercent(raw.fontSize, height) } : {}),
    }

    if (Array.isArray(next.points)) {
      next.points = next.points.map((p) => ({
        x: pxToPercent(p.x, width),
        y: pxToPercent(p.y, height),
      }))
    }

    if (Array.isArray(next.path)) {
      next.path = next.path.map((segment) => {
        if (!Array.isArray(segment) || segment.length < 3) return segment
        const [cmd, ...nums] = segment
        const converted: Array<string | number> = [String(cmd)]
        for (let i = 0; i < nums.length; i += 2) {
          const x = Number(nums[i])
          const y = Number(nums[i + 1])
          converted.push(pxToPercent(x, width), pxToPercent(y, height))
        }
        return converted
      })
    }

    return next
  }, [])

  const onCanvasEvent = useCallback(async (payload: PdfCanvasEventPayload) => {
    if (payload.page !== pageNum) return
    const fabricCanvas = fabricInstanceRef.current
    if (!fabricCanvas || payload.actorId === userId) return

    suppressBroadcastRef.current = true
    try {
      if (payload.action === 'removed' && payload.objectId) {
        const target = fabricCanvas.getObjects().find((obj: any) => obj.id === payload.objectId)
        if (target) {
          fabricCanvas.remove(target)
          fabricCanvas.renderAll()
        }
        return
      }

      if (!payload.object) return
      const width = fabricCanvas.getWidth()
      const height = fabricCanvas.getHeight()
      const objectData = applyObjectPercentToPx(payload.object, width, height)

      if (!objectData.id) return
      const existing = fabricCanvas.getObjects().find((obj: any) => obj.id === objectData.id)
      if (existing) {
        existing.set(objectData)
        existing.setCoords()
        fabricCanvas.renderAll()
        return
      }

      const fabricMod = await loadOptionalModule('fabric')
      const fabricApi = fabricMod?.fabric || fabricMod
      const enliven = fabricApi?.util?.enlivenObjects
      if (typeof enliven === 'function') {
        enliven([objectData], (objects: any[]) => {
          if (!objects?.[0]) return
          fabricCanvas.add(objects[0])
          fabricCanvas.renderAll()
        })
      }
    } finally {
      setTimeout(() => {
        suppressBroadcastRef.current = false
      }, 16)
    }
  }, [applyObjectPercentToPx, pageNum, userId])

  const onCanvasState = useCallback(async (payload: { roomId: string; events: PdfCanvasEventPayload[] }) => {
    const fabricCanvas = fabricInstanceRef.current
    if (!fabricCanvas) return

    // Rebuild last known state from event stream for late joiners.
    const byId = new Map<string, PdfCanvasEventPayload>()
    for (const evt of payload.events) {
      if (evt.page !== pageNum || !evt.objectId) continue
      if (evt.action === 'removed') {
        byId.delete(evt.objectId)
        continue
      }
      byId.set(evt.objectId, evt)
    }

    suppressBroadcastRef.current = true
    try {
      fabricCanvas.clear()
      const width = fabricCanvas.getWidth()
      const height = fabricCanvas.getHeight()
      const fabricMod = await loadOptionalModule('fabric')
      const fabricApi = fabricMod?.fabric || fabricMod
      const enliven = fabricApi?.util?.enlivenObjects
      if (typeof enliven !== 'function') return
      const objects = Array.from(byId.values())
        .map((evt) => evt.object)
        .filter((obj): obj is PercentFabricObject => Boolean(obj))
        .map((obj) => applyObjectPercentToPx(obj, width, height))
      enliven(objects, (liveObjects: any[]) => {
        liveObjects.forEach((obj) => fabricCanvas.add(obj))
        fabricCanvas.renderAll()
      })
    } finally {
      setTimeout(() => {
        suppressBroadcastRef.current = false
      }, 16)
    }
  }, [applyObjectPercentToPx, pageNum])

  const { isConnected, isLocked, latencyMs, participants, emitCanvasEvent, setLock } = usePdfCollabSocket({
    roomId,
    userId,
    name: userName,
    role,
    onCanvasEvent,
    onCanvasState,
  })
  const effectiveLocked = typeof forceLocked === 'boolean' ? forceLocked : isLocked
  const canDraw = effectiveCapabilities.draw && !effectiveLocked
  const canErase = effectiveCapabilities.erase && !effectiveLocked
  const canSelect = effectiveCapabilities.select && !effectiveLocked

  useEffect(() => {
    if (tool === 'draw' && !effectiveCapabilities.draw) {
      setTool(effectiveCapabilities.erase ? 'erase' : 'select')
      return
    }
    if (tool === 'erase' && !effectiveCapabilities.erase) {
      setTool(effectiveCapabilities.draw ? 'draw' : 'select')
      return
    }
    if (tool === 'select' && !effectiveCapabilities.select) {
      setTool(effectiveCapabilities.draw ? 'draw' : 'erase')
    }
  }, [effectiveCapabilities.draw, effectiveCapabilities.erase, effectiveCapabilities.select, tool])

  const renderPdfPage = useCallback(async (doc: any, pageIndex: number) => {
    const canvas = pdfCanvasRef.current
    if (!canvas || !doc) return
    const renderToken = ++renderSeqRef.current
    if (renderTaskRef.current) {
      try {
        renderTaskRef.current.cancel?.()
      } catch {
        // Ignore cancellation failures; we'll continue with latest render request.
      }
      renderTaskRef.current = null
    }
    const page = await doc.getPage(pageIndex)
    const viewport = page.getViewport({ scale: 1.35 })
    canvas.width = viewport.width
    canvas.height = viewport.height

    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const task = page.render({ canvasContext: ctx, viewport })
    renderTaskRef.current = task
    try {
      await task.promise
    } catch (error) {
      if ((error as { name?: string })?.name === 'RenderingCancelledException') return
      throw error
    } finally {
      if (renderTaskRef.current === task) {
        renderTaskRef.current = null
      }
    }
    if (renderSeqRef.current !== renderToken) return

    const overlay = fabricCanvasElementRef.current
    if (overlay) {
      overlay.width = viewport.width
      overlay.height = viewport.height
      overlay.style.width = `${viewport.width}px`
      overlay.style.height = `${viewport.height}px`
    }

    if (fabricInstanceRef.current) {
      fabricInstanceRef.current.setDimensions({ width: viewport.width, height: viewport.height })
      fabricInstanceRef.current.renderAll()
    }
  }, [])

  const initializeFabric = useCallback(async () => {
    if (!fabricCanvasElementRef.current || fabricInstanceRef.current) return
    try {
      const fabricMod = await loadOptionalModule('fabric')
      const fabricApi = fabricMod?.fabric || fabricMod
      if (!fabricApi?.Canvas) {
        console.error('[PDFCollaborativeViewer] fabric library not found. Please run: npm install fabric')
        setFabricReady(false)
        return
      }

      const fabricCanvas = new fabricApi.Canvas(fabricCanvasElementRef.current, {
        isDrawingMode: true,
        selection: true,
      })

      fabricCanvas.freeDrawingBrush.width = 2
      fabricCanvas.freeDrawingBrush.color = '#ef4444'
      fabricInstanceRef.current = fabricCanvas
      setFabricReady(true)

      const broadcast = (action: 'created' | 'modified' | 'removed', target?: any) => {
        if (!target || suppressBroadcastRef.current) return
        const width = fabricCanvas.getWidth()
        const height = fabricCanvas.getHeight()
        const objectData = serializeObjectToPercent(target, width, height)
        target.id = objectData.id
        emitCanvasEvent({
          page: pageNum,
          action,
          object: objectData,
          objectId: objectData.id,
        })
      }

      fabricCanvas.on('path:created', (evt: any) => {
        if (!evt?.path) return
        broadcast('created', evt.path)
      })
      fabricCanvas.on('object:modified', (evt: any) => broadcast('modified', evt?.target))
      fabricCanvas.on('object:removed', (evt: any) => broadcast('removed', evt?.target))

      return () => {
        fabricCanvas.dispose()
        fabricInstanceRef.current = null
        setFabricReady(false)
      }
    } catch (err) {
      console.error('[PDFCollaborativeViewer] Error initializing fabric:', err)
      setFabricReady(false)
    }
  }, [emitCanvasEvent, pageNum, serializeObjectToPercent])

  useEffect(() => {
    let dispose: (() => void) | undefined
    initializeFabric().then((fn) => {
      if (typeof fn === 'function') dispose = fn
    }).catch(() => {
      setFabricReady(false)
    })
    return () => {
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel?.()
        } catch {
          // no-op
        }
        renderTaskRef.current = null
      }
      dispose?.()
    }
  }, [initializeFabric])

  useEffect(() => {
    if (fabricInstanceRef.current) {
      const canUseCurrentDrawTool = (tool === 'draw' && canDraw) || (tool === 'erase' && canErase)
      fabricInstanceRef.current.isDrawingMode = canUseCurrentDrawTool
      fabricInstanceRef.current.selection = canSelect
      if (fabricInstanceRef.current.freeDrawingBrush) {
        fabricInstanceRef.current.freeDrawingBrush.width = strokeWidth
        fabricInstanceRef.current.freeDrawingBrush.color = tool === 'erase' ? '#ffffff' : strokeColor
      }
    }
  }, [canDraw, canErase, canSelect, strokeColor, strokeWidth, tool])

  useEffect(() => {
    if (!pdfDoc) return
    renderPdfPage(pdfDoc, pageNum)
  }, [pdfDoc, pageNum, renderPdfPage])

  const onFileSelected = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const bytes = await file.arrayBuffer()
    setPdfBytes(bytes)

    const pdfjs = await import('pdfjs-dist')
    const opts = (pdfjs as any).GlobalWorkerOptions
    if (opts && !opts.workerSrc) opts.workerSrc = '/pdf.worker.min.mjs'

    const doc = await (pdfjs as any).getDocument({ data: bytes }).promise
    setPdfDoc(doc)
    setPageCount(doc.numPages)
    setPageNum(1)
    await renderPdfPage(doc, 1)
  }

  useEffect(() => {
    if (!initialPdfUrl) return
    let cancelled = false
    const loadInitialPdf = async () => {
      try {
        const res = await fetch(initialPdfUrl, { credentials: 'include' })
        if (!res.ok) return
        const bytes = await res.arrayBuffer()
        if (cancelled) return
        setPdfBytes(bytes)
        const pdfjs = await import('pdfjs-dist')
        const opts = (pdfjs as any).GlobalWorkerOptions
        if (opts && !opts.workerSrc) opts.workerSrc = '/pdf.worker.min.mjs'
        const doc = await (pdfjs as any).getDocument({ data: bytes }).promise
        if (cancelled) return
        setPdfDoc(doc)
        setPageCount(doc.numPages)
        setPageNum(1)
        await renderPdfPage(doc, 1)
      } catch {
        // Keep component usable even if initial URL fails to load.
      }
    }
    void loadInitialPdf()
    return () => {
      cancelled = true
    }
  }, [initialPdfUrl, renderPdfPage])

  const callReadService = async () => {
    const png = pdfCanvasRef.current?.toDataURL('image/png')
    if (!png) return
    const res = await fetch('/api/pdf-tutoring/read', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageDataUrl: png }),
    })
    const data = await res.json()
    setCleanedText(data.markdown || data.content || '')
    setMode('cleaned')
  }

  const callMarkService = async () => {
    const png = pdfCanvasRef.current?.toDataURL('image/png')
    if (!png) return
    const res = await fetch('/api/pdf-tutoring/mark', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageDataUrl: png,
        rubric: 'Award partial credit for correct setup and intermediate algebraic transformations.',
      }),
    })
    const data = await res.json()
    setMarkedFeedback(JSON.stringify(data.result || data, null, 2))
    setMode('marked')
  }

  const applyAiErrorCircles = async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas || !markedFeedback) return

    let parsed: any = null
    try {
      parsed = JSON.parse(markedFeedback)
    } catch {
      return
    }

    const mistakes = Array.isArray(parsed?.mistakeLocations) ? parsed.mistakeLocations : []
    if (mistakes.length === 0) return

    const fabricMod = await loadOptionalModule('fabric')
    const fabricApi = fabricMod?.fabric || fabricMod
    if (!fabricApi?.Circle) return

    const width = canvas.getWidth()
    const height = canvas.getHeight()

    mistakes.forEach((mistake: any, idx: number) => {
      const rawX = typeof mistake?.x === 'number' ? mistake.x : 40 + idx * 30
      const rawY = typeof mistake?.y === 'number' ? mistake.y : 40 + idx * 22
      const x = rawX <= 100 ? percentToPx(rawX, width) : rawX
      const y = rawY <= 100 ? percentToPx(rawY, height) : rawY

      const circle = new fabricApi.Circle({
        id: `ai-mistake-${Date.now()}-${idx}`,
        left: Math.max(8, x - 18),
        top: Math.max(8, y - 18),
        radius: 18,
        fill: 'rgba(239,68,68,0.06)',
        stroke: '#ef4444',
        strokeWidth: 2,
        selectable: true,
      })
      canvas.add(circle)
    })

    canvas.renderAll()
  }

  const callFlattenService = async () => {
    if (!pdfBytes || !fabricInstanceRef.current) return

    const bytes = new Uint8Array(pdfBytes)
    let binary = ''
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i])
    const originalPdfBase64 = btoa(binary)
    const canvas = fabricInstanceRef.current
    const payload = {
      originalPdfBase64,
      fabric: {
        page: pageNum,
        width: canvas.getWidth(),
        height: canvas.getHeight(),
        objects: canvas.getObjects().map((obj: any) => serializeObjectToPercent(obj, canvas.getWidth(), canvas.getHeight())),
      },
    }

    const res = await fetch('/api/pdf-tutoring/flatten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) return
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const addTextBox = async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas || effectiveLocked || !effectiveCapabilities.text) return
    const fabricMod = await loadOptionalModule('fabric')
    const fabricApi = fabricMod?.fabric || fabricMod
    if (!fabricApi?.IText) return
    const text = new fabricApi.IText('Type here', {
      id: `text-${Date.now()}`,
      left: 48,
      top: 48,
      fill: '#ef4444',
      fontSize: 20,
      editable: true,
    })
    canvas.add(text)
    canvas.setActiveObject(text)
    text.enterEditing?.()
    canvas.renderAll()
  }

  const addRectangle = async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas || effectiveLocked || !effectiveCapabilities.shapes) return
    const fabricMod = await loadOptionalModule('fabric')
    const fabricApi = fabricMod?.fabric || fabricMod
    if (!fabricApi?.Rect) return
    const rect = new fabricApi.Rect({
      id: `rect-${Date.now()}`,
      left: 48,
      top: 48,
      width: 140,
      height: 90,
      fill: 'transparent',
      stroke: strokeColor,
      strokeWidth,
    })
    canvas.add(rect)
    canvas.setActiveObject(rect)
    canvas.renderAll()
  }

  const addCircle = async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas || effectiveLocked || !effectiveCapabilities.shapes) return
    const fabricMod = await loadOptionalModule('fabric')
    const fabricApi = fabricMod?.fabric || fabricMod
    if (!fabricApi?.Circle) return
    const circle = new fabricApi.Circle({
      id: `circle-${Date.now()}`,
      left: 48,
      top: 48,
      radius: 55,
      fill: 'transparent',
      stroke: strokeColor,
      strokeWidth,
    })
    canvas.add(circle)
    canvas.setActiveObject(circle)
    canvas.renderAll()
  }

  const clearCurrentPage = () => {
    const canvas = fabricInstanceRef.current
    if (!canvas || effectiveLocked || !effectiveCapabilities.clear) return
    canvas.clear()
    canvas.renderAll()
  }

  const saveSnapshot = useCallback(async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas) return
    await fetch('/api/pdf-tutoring/snapshots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        roomId,
        page: pageNum,
        width: canvas.getWidth(),
        height: canvas.getHeight(),
        objects: canvas.getObjects().map((obj: any) => serializeObjectToPercent(obj, canvas.getWidth(), canvas.getHeight())),
      }),
    })
  }, [roomId, pageNum, serializeObjectToPercent])

  useEffect(() => {
    if (role !== 'tutor') return
    const interval = setInterval(() => {
      const canvas = fabricInstanceRef.current
      if (!canvas) return
      if ((canvas.getObjects?.() || []).length === 0) return
      void saveSnapshot()
    }, 60 * 1000)

    return () => clearInterval(interval)
  }, [role, saveSnapshot])

  const loadLatestSnapshot = async () => {
    const canvas = fabricInstanceRef.current
    if (!canvas) return

    const res = await fetch(`/api/pdf-tutoring/snapshots?roomId=${encodeURIComponent(roomId)}&limit=1`, {
      credentials: 'include',
    })
    if (!res.ok) return
    const data = await res.json()
    const latest = data?.snapshots?.[0]
    const payload = latest?.pages?.[0]
    if (!payload?.objects || !Array.isArray(payload.objects)) return

    canvas.clear()
    const width = canvas.getWidth()
    const height = canvas.getHeight()
    const fabricMod = await loadOptionalModule('fabric')
    const fabricApi = fabricMod?.fabric || fabricMod
    const enliven = fabricApi?.util?.enlivenObjects
    if (typeof enliven !== 'function') return

    const mapped = payload.objects.map((obj: PercentFabricObject) => applyObjectPercentToPx(obj, width, height))
    enliven(mapped, (objects: any[]) => {
      objects.forEach((obj) => canvas.add(obj))
      canvas.renderAll()
    })
  }

  const connectionBadge = useMemo(() => {
    if (!isConnected) return <Badge variant="destructive">Offline</Badge>
    if (latencyMs !== null && latencyMs > 50) return <Badge variant="secondary">Sync {latencyMs}ms</Badge>
    return <Badge variant="default">Sync &lt;50ms</Badge>
  }, [isConnected, latencyMs])
  const participantSummary = useMemo(() => {
    const total = participants.length
    const tutors = participants.filter((participant) => participant.role === 'tutor').length
    const students = total - tutors
    return { total, tutors, students }
  }, [participants])

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <Input type="file" accept="application/pdf" onChange={onFileSelected} className="max-w-sm" />
        {showCollabStatus && connectionBadge}
        {showCollabStatus && (
          <Badge variant="outline">
            Live: {participantSummary.total} ({participantSummary.tutors} tutor, {participantSummary.students} students)
          </Badge>
        )}
        {showCollabStatus && (
          <Badge variant={isLocked ? 'destructive' : 'secondary'}>
            {effectiveLocked ? 'Canvas Locked' : 'Canvas Unlocked'}
          </Badge>
        )}
        {(showLockControl ?? role === 'tutor') && (
          <Button variant="outline" size="sm" onClick={() => setLock(!effectiveLocked)}>
            {effectiveLocked ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
            {effectiveLocked ? 'Unlock Canvas' : 'Lock Canvas'}
          </Button>
        )}
        {showAiActions && (
          <Button variant="outline" size="sm" onClick={callReadService}>
            <RefreshCw className="w-4 h-4 mr-2" />
            AI Cleaned Text
          </Button>
        )}
        {showAiActions && <Button variant="outline" size="sm" onClick={callMarkService}>Run AI Marking</Button>}
        {showAiActions && <Button variant="outline" size="sm" onClick={applyAiErrorCircles}>Apply AI Error Circles</Button>}
        {effectiveCapabilities.text && (
          <Button variant="outline" size="sm" onClick={addTextBox} disabled={effectiveLocked}>
            Add Text
          </Button>
        )}
        {effectiveCapabilities.shapes && (
          <>
            <Button variant="outline" size="sm" onClick={addRectangle} disabled={effectiveLocked}>
              Rectangle
            </Button>
            <Button variant="outline" size="sm" onClick={addCircle} disabled={effectiveLocked}>
              Circle
            </Button>
          </>
        )}
        <Button variant={tool === 'draw' ? 'default' : 'outline'} size="sm" onClick={() => setTool('draw')} disabled={!canDraw}>
          Draw
        </Button>
        <Button variant={tool === 'erase' ? 'default' : 'outline'} size="sm" onClick={() => setTool('erase')} disabled={!canErase}>
          Erase
        </Button>
        <Button variant={tool === 'select' ? 'default' : 'outline'} size="sm" onClick={() => setTool('select')} disabled={!canSelect}>
          Select
        </Button>
        <label className="flex items-center gap-1 text-xs">
          Color
          <input
            type="color"
            value={strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
            disabled={effectiveLocked || (!canDraw && !canErase)}
            className="h-7 w-10 rounded border"
          />
        </label>
        <label className="flex items-center gap-1 text-xs">
          Width
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(Number(e.target.value))}
            disabled={effectiveLocked || (!canDraw && !canErase)}
          />
          <span>{strokeWidth}</span>
        </label>
        {effectiveCapabilities.clear && (
          <Button variant="outline" size="sm" onClick={clearCurrentPage} disabled={effectiveLocked}>
            Clear
          </Button>
        )}
        {role === 'tutor' && (
          <>
            <Button variant="outline" size="sm" onClick={saveSnapshot}>Save Snapshot</Button>
            <Button variant="outline" size="sm" onClick={loadLatestSnapshot}>Load Latest Snapshot</Button>
          </>
        )}
        {effectiveCapabilities.flatten && <Button size="sm" onClick={callFlattenService}>Flatten PDF</Button>}
      </div>

      <Tabs value={mode} onValueChange={(value) => setMode(value as PdfViewMode)}>
        <TabsList>
          <TabsTrigger value="original">Original View</TabsTrigger>
          {showAiActions && <TabsTrigger value="cleaned">AI Cleaned Text</TabsTrigger>}
          <TabsTrigger value="marked">Marked Feedback</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" disabled={pageNum <= 1} onClick={() => setPageNum((prev) => prev - 1)}>Prev</Button>
        <span className="text-sm">Page {pageNum} / {pageCount}</span>
        <Button variant="outline" size="sm" disabled={pageNum >= pageCount} onClick={() => setPageNum((prev) => prev + 1)}>Next</Button>
        {!fabricReady && <Badge variant="secondary">Install `fabric` package to enable drawing sync</Badge>}
      </div>

      {mode === 'original' && (
        <div className="relative inline-block border rounded-md overflow-hidden bg-white">
          <canvas ref={pdfCanvasRef} className="block" />
          <canvas ref={fabricCanvasElementRef} className="absolute inset-0" />
        </div>
      )}

      {mode === 'cleaned' && showAiActions && (
        <pre className="rounded-md border bg-muted p-4 text-xs whitespace-pre-wrap">{cleanedText || 'No cleaned text generated yet.'}</pre>
      )}

      {mode === 'marked' && (
        <pre className="rounded-md border bg-muted p-4 text-xs whitespace-pre-wrap">{markedFeedback || 'No marking feedback generated yet.'}</pre>
      )}

      <div className="text-xs text-muted-foreground flex items-center gap-2">
        <Upload className="w-3.5 h-3.5" />
        Coordinates are normalized as 0-100 percentages before sync for cross-device consistency.
      </div>
    </div>
  )
}
