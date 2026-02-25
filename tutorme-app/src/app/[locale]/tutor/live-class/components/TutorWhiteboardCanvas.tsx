'use client'

import { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { useSocket } from '@/hooks/use-socket'
import { cn } from '@/lib/utils'

interface TutorWhiteboardCanvasProps {
  layers: WhiteboardLayer[]
  activeLayerId: string
  onLayerContentUpdate: (layerId: string, contentUpdates: any) => void
  onLayerSelect: (layerId: string) => void
  onLayerToggle: (layerId: string, action: 'minimize' | 'maximize') => void
  isTutor: boolean
  userId: string
}

interface WhiteboardLayer {
  id: string
  name: string
  layerType: 'personal' | 'shared' | 'broadcast' | 'tutor-overlay'
  ownerId: string
  ownerName: string
  ownerType: 'tutor' | 'student'
  sessionId: string
  roomId?: string
  isActive: boolean
  isMinimized: boolean
  isMaximized: boolean
  isBroadcasting: boolean
  order: number
  permissions: LayerPermission[]
  strokes: any[]
  shapes: any[]
  texts: any[]
  images: any[]
  createdAt: Date
  updatedAt: Date
}

interface LayerPermission {
  userId: string
  role: 'tutor' | 'student'
  canView: boolean
  canWrite: boolean
  canSave: boolean
  canShare: boolean
  canMinimize: boolean
}

// Canvas drawing state and tools
interface CanvasTool {
  type: 'pen' | 'eraser' | 'text' | 'shape' | 'hand'
  color: string
  size: number
}

interface CanvasState {
  isDrawing: boolean
  currentStroke: any[]
  selectedTool: CanvasTool
  canvasTransform: {
    scale: number
    offsetX: number
    offsetY: number
  }
}

export function TutorWhiteboardCanvas({
  layers,
  activeLayerId,
  onLayerContentUpdate,
  onLayerSelect,
  onLayerToggle,
  isTutor,
  userId
}: TutorWhiteboardCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasState, setCanvasState] = useState<CanvasState>({
    isDrawing: false,
    currentStroke: [],
    selectedTool: { type: 'pen', color: '#000000', size: 2 },
    canvasTransform: { scale: 1, offsetX: 0, offsetY: 0 }
  })

  const activeLayer = useMemo(() => 
    layers.find(l => l.id === activeLayerId), 
    [layers, activeLayerId]
  )

  // Check user permissions for the active layer
  const hasViewPermission = useMemo(() => {
    if (!activeLayer) return false
    const permission = activeLayer.permissions.find(p => p.userId === userId)
    return permission ? permission.canView : false
  }, [activeLayer, userId])

  const hasWritePermission = useMemo(() => {
    if (!activeLayer) return false
    const permission = activeLayer.permissions.find(p => p.userId === userId)
    return permission ? permission.canWrite : false
  }, [activeLayer, userId])

  // Render layers to canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const overlayCanvas = overlayCanvasRef.current
    if (!canvas || !overlayCanvas) return

    const ctx = canvas.getContext('2d')
    const overlayCtx = overlayCanvas.getContext('2d')
    if (!ctx || !overlayCtx) return

    // Clear both canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)

    // Set canvas dimensions to match parent container
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    overlayCanvas.width = rect.width
    overlayCanvas.height = rect.height

    // Background
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Apply canvas transforms (zoom/pan)
    ctx.save()
    ctx.transform(
      canvasState.canvasTransform.scale,
      0,
      0,
      canvasState.canvasTransform.scale,
      canvasState.canvasTransform.offsetX,
      canvasState.canvasTransform.offsetY
    )

    overlayCtx.save()
    overlayCtx.transform(
      canvasState.canvasTransform.scale,
      0,
      0,
      canvasState.canvasTransform.scale,
      canvasState.canvasTransform.offsetX,
      canvasState.canvasTransform.offsetY
    )

    // Render layers based on their state
    layers.forEach(layer => {
      if (!layer.isActive || layer.isMinimized) return

      if (layer.isBroadcasting && userId !== layer.ownerId) {
        // Student viewing broadcast - render at 90% overlay
        overlayCtx.save()
        
        // Create 90% viewport overlay
        const overlayWidth = overlayCanvas.width * 0.9
        const overlayHeight = overlayCanvas.height * 0.9
        const overlayX = (overlayCanvas.width - overlayWidth) / 2
        const overlayY = (overlayCanvas.height - overlayHeight) / 2

        // Semi-transparent background for overlay
        overlayCtx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        overlayCtx.fillRect(overlayX, overlayY, overlayWidth, overlayHeight)

        // Clip the overlay area
        overlayCtx.beginPath()
        overlayCtx.rect(overlayX, overlayY, overlayWidth, overlayHeight)
        overlayCtx.clip()

        // Scale layer content to fit 90% viewport
        overlayCtx.scale(0.9, 0.9)
        renderLayerContent(overlayCtx, layer)
        
        overlayCtx.restore()
      } else {
        // Normal layer rendering
        renderLayerContent(ctx, layer)
      }
    })

    ctx.restore()
    overlayCtx.restore()

    // Draw grid if enabled
    if (isTutor) {
      drawGrid(ctx, canvas)
    }

    // Draw current stroke being drawn
    if (canvasState.isDrawing && canvasState.currentStroke.length > 0) {
      drawCurrentStroke(ctx, canvasState.currentStroke, canvasState.selectedTool)
    }

    // Draw layer info for debugging
    if (activeLayer) {
      drawLayerInfo(ctx, activeLayer)
    }

  }, [layers, canvasState, activeLayer, isTutor, userId])

  const renderLayerContent = (ctx: CanvasRenderingContext2D, layer: WhiteboardLayer) => {
    ctx.save()
    
    // Render strokes
    layer.strokes.forEach(stroke => {
      if (stroke.points && stroke.points.length > 0) {
        ctx.beginPath()
        ctx.strokeStyle = stroke.color || '#000000'
        ctx.lineWidth = stroke.width || 2
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        stroke.points.forEach((point: any, index: number) => {
          if (index === 0) {
            ctx.moveTo(point.x, point.y)
          } else {
            ctx.lineTo(point.x, point.y)
          }
        })
        
        ctx.stroke()
      }
    })

    // Render shapes
    layer.shapes.forEach(shape => {
      ctx.beginPath()
      ctx.strokeStyle = shape.color || '#000000'
      ctx.lineWidth = shape.width || 2

      switch (shape.type) {
        case 'rectangle':
          ctx.rect(shape.x, shape.y, shape.width, shape.height)
          break
        case 'circle':
          ctx.arc(shape.x + shape.radius, shape.y + shape.radius, shape.radius, 0, 2 * Math.PI)
          break
        case 'line':
          ctx.moveTo(shape.startX, shape.startY)
          ctx.lineTo(shape.endX, shape.endY)
          break
      }

      if (shape.filled) {
        ctx.fillStyle = shape.fillColor || shape.color
        ctx.fill()
      }
      ctx.stroke()
    })

    // Render text
    layer.texts.forEach(text => {
      ctx.font = `${text.size || 14}px sans-serif`
      ctx.fillStyle = text.color || '#000000'
      ctx.fillText(text.content, text.x, text.y)
    })

    ctx.restore()
  }

  const drawGrid = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.save()
    ctx.strokeStyle = '#e0e0e0'
    ctx.lineWidth = 0.5
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 20) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 20) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }
    
    ctx.restore()
  }

  const drawCurrentStroke = (ctx: CanvasRenderingContext2D, currentStroke: any[], tool: CanvasTool) => {
    if (currentStroke.length < 2) return

    ctx.beginPath()
    ctx.strokeStyle = tool.color
    ctx.lineWidth = tool.size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    currentStroke.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })
    
    ctx.stroke()
  }

  const drawLayerInfo = (ctx: CanvasRenderingContext2D, layer: WhiteboardLayer) => {
    ctx.save()
    ctx.font = '12px sans-serif'
    ctx.fillStyle = '#666'
    ctx.fillText(`Layer: ${layer.name} (${layer.layerType})`, 10, 20)
    ctx.fillText(`Owner: ${layer.ownerName}`, 10, 35)
    ctx.restore()
  }

  // Mouse event handlers for drawing
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !hasWritePermission || !activeLayer) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCanvasState(prev => ({
      ...prev,
      isDrawing: true,
      currentStroke: [{ x, y }]
    }))
  }, [hasWritePermission, activeLayer])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || !canvasState.isDrawing || !hasWritePermission || !activeLayer) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCanvasState(prev => ({
      ...prev,
      currentStroke: [...prev.currentStroke, { x, y }]
    }))

    // Send real-time drawing update via socket
    // This would trigger real-time updates to other users
  }, [canvasState.isDrawing, hasWritePermission, activeLayer])

  const handleMouseUp = useCallback(() => {
    if (!canvasState.isDrawing || !activeLayer) return

    const newStroke = {
      id: Date.now().toString(),
      points: canvasState.currentStroke,
      color: canvasState.selectedTool.color,
      width: canvasState.selectedTool.size,
      tool: canvasState.selectedTool.type,
      timestamp: new Date()
    }

    const updatedLayer = {
      ...activeLayer,
      strokes: [...activeLayer.strokes, newStroke]
    }

    // Update the layer
    onLayerContentUpdate(activeLayer.id, {
      strokes: updatedLayer.strokes
    })

    // Send update via socket for real-time collaboration
    // This would emit to all users in the session

    setCanvasState(prev => ({
      ...prev,
      isDrawing: false,
      currentStroke: []
    }))
  }, [canvasState.isDrawing, canvasState.currentStroke, canvasState.selectedTool, activeLayer, onLayerContentUpdate])

  return (
    <div className="relative w-full h-full bg-white">
      {/* Main canvas for layer content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Overlay canvas for broadcast layer (90% rendering) */}
      <canvas
        ref={overlayCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Layer info overlay */}
      {!hasWritePermission && activeLayer && (
        <div className="absolute top-4 left-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-3 py-2 rounded-lg text-sm">
          <strong>View Only:</strong> {activeLayer.name} - No write permission
        </div>
      )}

      {!hasViewPermission && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-500">
            <div className="text-6xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
            <p>You do not have permission to view this layer</p>
          </div>
        </div>
      )}
    </div>
  )
}