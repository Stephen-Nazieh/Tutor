'use client'

import { useEffect, useRef, useCallback, useState, type MouseEvent as ReactMouseEvent } from 'react'
import * as fabric from 'fabric'
import type { 
  AnyMathElement, 
  PathElement, 
  RectangleElement, 
  CircleElement, 
  LineElement,
  TextElement,
  EquationElement,
  GraphElement,
  ToolType,
  ToolSettings,
  ViewTransform
} from '@/types/math-whiteboard'
import { v4 as uuidv4 } from 'uuid'

interface MathCanvasProps {
  width: number
  height: number
  elements: AnyMathElement[]
  activeTool: ToolType
  toolSettings: ToolSettings
  transform: ViewTransform
  canEdit: boolean
  currentUserId: string
  onCreateElement: (element: AnyMathElement) => void
  onUpdateElement: (id: string, changes: Partial<AnyMathElement>) => void
  onSelectElements: (ids: string[]) => void
  onShowEquationEditor?: (pos: { x: number; y: number }) => void
  onShowGraphEditor?: (pos: { x: number; y: number }) => void
  snapToGrid?: boolean
  gridSize?: number
}

// Generate unique ID
const generateId = () => uuidv4()

const emitMathDebug = (event: string, data?: Record<string, unknown>) => {
  const payload = { event, ...(data || {}) }
  console.info('[MathDebug]', payload)
  if (typeof window !== 'undefined') {
    const w = window as Window & { __mathDebug?: Array<Record<string, unknown>> }
    if (!Array.isArray(w.__mathDebug)) w.__mathDebug = []
    w.__mathDebug.push(payload)
  }
}

export function MathCanvas({
  width,
  height,
  elements,
  activeTool,
  toolSettings,
  transform,
  canEdit,
  currentUserId,
  onCreateElement,
  onUpdateElement,
  onSelectElements,
  onShowEquationEditor,
  onShowGraphEditor,
  snapToGrid = false,
  gridSize = 20,
}: MathCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const isDrawingRef = useRef(false)
  const currentObjectRef = useRef<fabric.Object | null>(null)
  const startPointRef = useRef<{ x: number; y: number } | null>(null)
  const endPointRef = useRef<{ x: number; y: number } | null>(null)
  const skipNextUpdateRef = useRef(false)
  const elementsRef = useRef<AnyMathElement[]>([])
  const pendingToolPosRef = useRef<{ x: number; y: number } | null>(null)
  
  // Snap to grid helper
  const snap = useCallback((value: number): number => {
    if (!snapToGrid) return value
    return Math.round(value / gridSize) * gridSize
  }, [snapToGrid, gridSize])
  
  // Keep elements ref in sync
  useEffect(() => {
    elementsRef.current = elements
  }, [elements])

  useEffect(() => {
    emitMathDebug('MathCanvas heartbeat', {
      canEdit,
      activeTool,
      elementCount: elements.length,
    })
  }, [canEdit, activeTool, elements.length])

  // Initialize Fabric.js canvas
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new fabric.Canvas(canvasRef.current, {
      width,
      height,
      backgroundColor: '#ffffff',
      selection: activeTool === 'select',
      isDrawingMode: activeTool === 'pen' || activeTool === 'eraser',
    })
    // Force interactive input on the Fabric top canvas in complex tab/panel layouts.
    canvas.upperCanvasEl.style.pointerEvents = 'auto'
    canvas.upperCanvasEl.style.touchAction = 'none'
    canvas.upperCanvasEl.style.userSelect = 'none'

    fabricCanvasRef.current = canvas

    // Set up grid background
    const setGridBackground = () => {
      const gridSize = 20
      const ctx = canvas.getContext()
      
      // Create grid pattern
      const gridCanvas = document.createElement('canvas')
      gridCanvas.width = gridSize
      gridCanvas.height = gridSize
      const gridCtx = gridCanvas.getContext('2d')
      if (gridCtx) {
        gridCtx.strokeStyle = '#e5e7eb'
        gridCtx.lineWidth = 1
        gridCtx.beginPath()
        gridCtx.moveTo(0, gridSize)
        gridCtx.lineTo(0, 0)
        gridCtx.lineTo(gridSize, 0)
        gridCtx.stroke()
      }
      
      const pattern = new fabric.Pattern({ source: gridCanvas, repeat: 'repeat' })
      ;(canvas as any).backgroundColor = pattern as any
      canvas.requestRenderAll()
    }
    
    setGridBackground()

    // Handle selection changes
    canvas.on('selection:created', (e) => {
      const ids = (e.selected || []).map((obj: any) => obj.mathElementId).filter(Boolean)
      onSelectElements(ids)
    })

    canvas.on('selection:updated', (e) => {
      const ids = (e.selected || []).map((obj: any) => obj.mathElementId).filter(Boolean)
      onSelectElements(ids)
    })

    canvas.on('selection:cleared', () => {
      onSelectElements([])
    })

    // Handle object modifications
    canvas.on('object:modified', (e) => {
      const obj = e.target
      if (!obj || !obj.mathElementId) return
      
      const element = elementsRef.current.find(el => el.id === obj.mathElementId)
      if (!element) return

      const changes: Partial<AnyMathElement> = {
        x: obj.left || 0,
        y: obj.top || 0,
        rotation: obj.angle || 0,
        scaleX: obj.scaleX || 1,
        scaleY: obj.scaleY || 1,
      }

      // Type-specific updates
      if (element.type === 'rectangle') {
        changes.width = (obj.width || 0) * (obj.scaleX || 1)
        changes.height = (obj.height || 0) * (obj.scaleY || 1)
      } else if (element.type === 'circle') {
        changes.radius = ((obj as fabric.Circle).radius || 0) * (obj.scaleX || 1)
      }

      skipNextUpdateRef.current = true
      onUpdateElement(obj.mathElementId, changes)
    })

    // Cleanup
    return () => {
      canvas.dispose()
      fabricCanvasRef.current = null
    }
  }, [width, height])

  // Update drawing mode when tool changes
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    emitMathDebug('fabric handlers attached', { activeTool, canEdit })

    canvas.isDrawingMode = activeTool === 'pen' || activeTool === 'eraser'
    canvas.selection = activeTool === 'select'
    canvas.skipTargetFind = activeTool !== 'select' && activeTool !== 'hand'

    // Configure brush for pen tool
    if (activeTool === 'pen' || activeTool === 'eraser') {
      const brush = canvas.freeDrawingBrush as fabric.PencilBrush
      if (brush) {
        brush.color = activeTool === 'eraser' ? '#ffffff' : toolSettings.strokeColor
        brush.width = toolSettings.strokeWidth
      }
    }

    // Set cursor based on tool
    switch (activeTool) {
      case 'hand':
        canvas.defaultCursor = 'grab'
        break
      case 'pen':
        canvas.defaultCursor = 'crosshair'
        break
      case 'text':
        canvas.defaultCursor = 'text'
        break
      case 'equation':
      case 'graph':
        canvas.defaultCursor = 'copy'
        break
      default:
        canvas.defaultCursor = 'default'
    }

    canvas.renderAll()
  }, [activeTool, toolSettings])

  // Sync view transform to Fabric viewport (zoom/pan)
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    canvas.setViewportTransform([
      transform.scale,
      0,
      0,
      transform.scale,
      transform.offsetX,
      transform.offsetY,
    ])
    canvas.requestRenderAll()
  }, [transform])

  // Sync elements from props to canvas
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas || skipNextUpdateRef.current) {
      skipNextUpdateRef.current = false
      return
    }

    // Get current element IDs on canvas
    const currentIds = new Set(
      canvas.getObjects()
        .map((obj: any) => obj.mathElementId)
        .filter(Boolean)
    )

    // Get new element IDs
    const newIds = new Set(elements.map(el => el.id))

    // Remove deleted elements
    canvas.getObjects().forEach((obj: any) => {
      if (obj.mathElementId && !newIds.has(obj.mathElementId)) {
        canvas.remove(obj)
      }
    })

    // Add or update elements
    elements.forEach(element => {
      if (!currentIds.has(element.id)) {
        // Create new fabric object
        const fabricObj = createFabricObject(element)
        if (fabricObj) {
          fabricObj.mathElementId = element.id
          canvas.add(fabricObj)
        }
      } else {
        // Update existing object
        const obj = canvas.getObjects().find((o: any) => o.mathElementId === element.id)
        if (obj) {
          updateFabricObject(obj, element)
        }
      }
    })

    canvas.renderAll()
  }, [elements])

  // Create Fabric object from MathElement
  const createFabricObject = (element: AnyMathElement): fabric.Object | null => {
    switch (element.type) {
      case 'path':
        return createPathObject(element)
      case 'rectangle':
        return createRectangleObject(element)
      case 'circle':
        return createCircleObject(element)
      case 'line':
        return createLineObject(element)
      case 'text':
        return createTextObject(element)
      case 'equation':
        return createEquationObject(element)
      case 'graph':
        return createGraphObject(element)
      default:
        return null
    }
  }

  const createPathObject = (element: PathElement): fabric.Object => {
    const pathData = element.points.map((p, i) => 
      `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
    ).join(' ')
    
    return new fabric.Path(pathData, {
      left: element.x,
      top: element.y,
      stroke: element.strokeColor,
      strokeWidth: element.strokeWidth,
      fill: 'transparent',
      selectable: true,
      evented: true,
    })
  }

  const createRectangleObject = (element: RectangleElement): fabric.Object => {
    return new fabric.Rect({
      left: element.x,
      top: element.y,
      width: element.width,
      height: element.height,
      fill: element.fillColor || 'transparent',
      stroke: element.strokeColor,
      strokeWidth: element.strokeWidth,
      selectable: true,
      evented: true,
    })
  }

  const createCircleObject = (element: CircleElement): fabric.Object => {
    return new fabric.Circle({
      left: element.x,
      top: element.y,
      radius: element.radius,
      fill: element.fillColor || 'transparent',
      stroke: element.strokeColor,
      strokeWidth: element.strokeWidth,
      selectable: true,
      evented: true,
    })
  }

  const createLineObject = (element: LineElement): fabric.Object => {
    return new fabric.Line([0, 0, element.x2 - element.x, element.y2 - element.y], {
      left: element.x,
      top: element.y,
      stroke: element.strokeColor,
      strokeWidth: element.strokeWidth,
      selectable: true,
      evented: true,
    })
  }

  const createTextObject = (element: TextElement): fabric.Object => {
    return new fabric.IText(element.text, {
      left: element.x,
      top: element.y,
      fontSize: element.fontSize,
      fontFamily: element.fontFamily,
      fill: element.color,
      fontWeight: element.bold ? 'bold' : 'normal',
      fontStyle: element.italic ? 'italic' : 'normal',
      selectable: true,
      evented: true,
    })
  }

  const createEquationObject = (element: EquationElement): fabric.Object => {
    // Create a container rect for the equation
    const rect = new fabric.Rect({
      left: element.x,
      top: element.y,
      width: 200,
      height: 60,
      fill: '#f8fafc',
      stroke: element.color || '#3b82f6',
      strokeWidth: 1,
      rx: 4,
      ry: 4,
      selectable: true,
      evented: true,
    })
    
    // Add label showing it's an equation
    const text = new fabric.Text('LaTeX Equation', {
      left: element.x + 10,
      top: element.y + 8,
      fontSize: 10,
      fill: '#94a3b8',
    })
    
    // Add the LaTeX snippet
    const latexText = new fabric.Text(element.latex.substring(0, 30) + (element.latex.length > 30 ? '...' : ''), {
      left: element.x + 10,
      top: element.y + 25,
      fontSize: 11,
      fill: element.color || '#1e293b',
      fontFamily: 'monospace',
    })
    
    return new fabric.Group([rect, text, latexText], {
      left: element.x,
      top: element.y,
      selectable: true,
      evented: true,
    })
  }

  const createGraphObject = (element: GraphElement): fabric.Object => {
    // Create placeholder for graph
    const rect = new fabric.Rect({
      left: element.x,
      top: element.y,
      width: 400,
      height: 300,
      fill: '#ffffff',
      stroke: '#cbd5e1',
      strokeWidth: 2,
      selectable: true,
      evented: true,
    })
    
    const title = new fabric.Text('Function Graph', {
      left: element.x + 10,
      top: element.y + 10,
      fontSize: 12,
      fill: '#64748b',
      fontWeight: 'bold',
    })
    
    const funcText = new fabric.Text(
      element.functions.map(f => f.expression).join(', ').substring(0, 50) + 
      (element.functions.length > 1 || element.functions[0]?.expression.length > 50 ? '...' : ''), 
      {
        left: element.x + 10,
        top: element.y + 30,
        fontSize: 11,
        fill: '#94a3b8',
        fontFamily: 'monospace',
      }
    )
    
    return new fabric.Group([rect, title, funcText], {
      left: element.x,
      top: element.y,
      selectable: true,
      evented: true,
    })
  }

  const updateFabricObject = (obj: fabric.Object, element: AnyMathElement) => {
    obj.set({
      left: element.x,
      top: element.y,
      angle: element.rotation,
      scaleX: element.scaleX,
      scaleY: element.scaleY,
    })
  }

  // Start shape drawing from Fabric pointer events.
  const beginShapeDrawing = useCallback((pointer: { x: number; y: number }) => {
    if (!canEdit || !fabricCanvasRef.current) return
    if (!['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)) return

    emitMathDebug('beginShapeDrawing', { activeTool, pointer, canEdit })

    const canvas = fabricCanvasRef.current
    startPointRef.current = { x: pointer.x, y: pointer.y }
    endPointRef.current = { x: pointer.x, y: pointer.y }
    isDrawingRef.current = true
    setIsDrawing(true)

    let previewObj: fabric.Object | null = null

    switch (activeTool) {
      case 'rectangle':
        previewObj = new fabric.Rect({
          left: pointer.x,
          top: pointer.y,
          width: 0,
          height: 0,
          fill: toolSettings.fillColor || 'transparent',
          stroke: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
        })
        break
      case 'circle':
        previewObj = new fabric.Circle({
          left: pointer.x,
          top: pointer.y,
          radius: 0,
          fill: toolSettings.fillColor || 'transparent',
          stroke: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
        })
        break
      case 'line':
      case 'arrow':
        previewObj = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
          stroke: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
        })
        break
    }

    if (previewObj) {
      previewObj.selectable = false
      previewObj.evented = false
      canvas.add(previewObj)
      currentObjectRef.current = previewObj
      canvas.requestRenderAll()
    }
  }, [activeTool, canEdit, toolSettings])

  const updateShapeDrawing = useCallback((pointer: { x: number; y: number }) => {
    if (!isDrawingRef.current || !currentObjectRef.current || !fabricCanvasRef.current || !startPointRef.current) return

    emitMathDebug('updateShapeDrawing', { activeTool, pointer })

    const canvas = fabricCanvasRef.current
    const start = startPointRef.current
    const obj = currentObjectRef.current
    endPointRef.current = { x: pointer.x, y: pointer.y }

    switch (activeTool) {
      case 'rectangle':
        obj.set({
          left: Math.min(start.x, pointer.x),
          top: Math.min(start.y, pointer.y),
          width: Math.abs(pointer.x - start.x),
          height: Math.abs(pointer.y - start.y),
        })
        break
      case 'circle': {
        const radius = Math.sqrt(
          Math.pow(pointer.x - start.x, 2) + Math.pow(pointer.y - start.y, 2)
        ) / 2
        obj.set({
          left: Math.min(start.x, pointer.x),
          top: Math.min(start.y, pointer.y),
          radius,
        })
        break
      }
      case 'line':
      case 'arrow':
        (obj as fabric.Line).set({
          x2: pointer.x,
          y2: pointer.y,
        })
        break
    }

    canvas.requestRenderAll()
  }, [activeTool])

  const finishShapeDrawing = useCallback(() => {
    if (!isDrawingRef.current || !currentObjectRef.current || !fabricCanvasRef.current || !startPointRef.current) return

    emitMathDebug('finishShapeDrawing:start', { activeTool })

    const canvas = fabricCanvasRef.current
    const obj = currentObjectRef.current
    const start = startPointRef.current
    const end = endPointRef.current || start

    canvas.remove(obj)

    let element: AnyMathElement | null = null
    const baseProps = {
      id: generateId(),
      type: 'path' as const,
      authorId: currentUserId,
      layer: 0,
      locked: false,
      x: snap(obj.left || 0),
      y: snap(obj.top || 0),
      rotation: 0,
      scaleX: 1,
      scaleY: 1,
      version: 1,
      lastModified: Date.now(),
      modifiedBy: currentUserId,
    }

    switch (activeTool) {
      case 'rectangle':
        element = {
          ...baseProps,
          type: 'rectangle',
          width: (obj as fabric.Rect).width || 0,
          height: (obj as fabric.Rect).height || 0,
          fillColor: toolSettings.fillColor,
          strokeColor: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
        } as RectangleElement
        break
      case 'circle':
        element = {
          ...baseProps,
          type: 'circle',
          radius: (obj as fabric.Circle).radius || 0,
          fillColor: toolSettings.fillColor,
          strokeColor: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
        } as CircleElement
        break
      case 'line':
      case 'arrow':
        element = {
          ...baseProps,
          type: 'line',
          x: snap(start.x),
          y: snap(start.y),
          x2: snap(end.x),
          y2: snap(end.y),
          strokeColor: toolSettings.strokeColor,
          strokeWidth: toolSettings.strokeWidth,
          arrowStart: false,
          arrowEnd: activeTool === 'arrow',
        } as LineElement
        break
    }

    if (element) {
      emitMathDebug('finishShapeDrawing:onCreateElement', {
        activeTool,
        elementId: element.id,
        elementType: element.type,
      })
      onCreateElement(element)
    }

    isDrawingRef.current = false
    setIsDrawing(false)
    currentObjectRef.current = null
    startPointRef.current = null
    endPointRef.current = null
  }, [activeTool, currentUserId, onCreateElement, snap, toolSettings])

  // Handle text/equation/graph placement from Fabric pointer coordinates.
  const handleToolPlacement = useCallback((pointer: { x: number; y: number }) => {
    if (!canEdit) return
    const snappedX = snap(pointer.x)
    const snappedY = snap(pointer.y)

    if (activeTool === 'text') {
      const text = prompt('Enter text:', '')
      if (text) {
        const element: TextElement = {
          id: generateId(),
          type: 'text',
          authorId: currentUserId,
          layer: 0,
          locked: false,
          x: snappedX,
          y: snappedY,
          rotation: 0,
          scaleX: 1,
          scaleY: 1,
          version: 1,
          lastModified: Date.now(),
          modifiedBy: currentUserId,
          text,
          fontSize: toolSettings.fontSize,
          fontFamily: 'Arial',
          color: toolSettings.strokeColor,
        }
        onCreateElement(element)
      }
    } else if (activeTool === 'equation') {
      pendingToolPosRef.current = { x: pointer.x, y: pointer.y }
      onShowEquationEditor?.({ x: pointer.x, y: pointer.y })
    } else if (activeTool === 'graph') {
      pendingToolPosRef.current = { x: pointer.x, y: pointer.y }
      onShowGraphEditor?.({ x: pointer.x, y: pointer.y })
    }
  }, [activeTool, canEdit, currentUserId, onCreateElement, onShowEquationEditor, onShowGraphEditor, snap, toolSettings])

  const getPointerFromClient = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 }
    const rect = canvasRef.current.getBoundingClientRect()
    return {
      x: (clientX - rect.left - transform.offsetX) / Math.max(0.001, transform.scale),
      y: (clientY - rect.top - transform.offsetY) / Math.max(0.001, transform.scale),
    }
  }, [transform.offsetX, transform.offsetY, transform.scale])

  const handleWrapperMouseDown = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    if (!canEdit) return
    const usesPlacementTool = activeTool === 'text' || activeTool === 'equation' || activeTool === 'graph'
    const usesShapeTool = ['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)
    if (!usesPlacementTool && !usesShapeTool) return
    const pointer = getPointerFromClient(event.clientX, event.clientY)
    emitMathDebug('wrapper mouse:down', { activeTool, pointer })
    if (usesPlacementTool) {
      handleToolPlacement(pointer)
      return
    }
    beginShapeDrawing(pointer)
  }, [activeTool, beginShapeDrawing, canEdit, getPointerFromClient, handleToolPlacement])

  const handleWrapperMouseMove = useCallback((event: ReactMouseEvent<HTMLDivElement>) => {
    const usesShapeTool = ['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)
    if (!usesShapeTool || !isDrawingRef.current) return
    const pointer = getPointerFromClient(event.clientX, event.clientY)
    emitMathDebug('wrapper mouse:move', { activeTool, pointer })
    updateShapeDrawing(pointer)
  }, [activeTool, getPointerFromClient, updateShapeDrawing])

  const handleWrapperMouseUp = useCallback(() => {
    const usesShapeTool = ['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)
    if (!usesShapeTool) return
    emitMathDebug('wrapper mouse:up', { activeTool })
    finishShapeDrawing()
  }, [activeTool, finishShapeDrawing])

  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return
    const upperCanvas = canvas.upperCanvasEl
    if (!upperCanvas) return

    const usesPlacementTool = activeTool === 'text' || activeTool === 'equation' || activeTool === 'graph'
    const usesShapeTool = ['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)

    const onPointerDown = (event: PointerEvent | MouseEvent) => {
      if (!canEdit) return
      if (!usesPlacementTool && !usesShapeTool) return
      const pointer = canvas.getPointer(event as unknown as Event)
      emitMathDebug('native pointer:down', { activeTool, pointer, eventType: event.type })
      if (usesPlacementTool) {
        handleToolPlacement(pointer)
        return
      }
      beginShapeDrawing(pointer)
    }

    const onPointerMove = (event: PointerEvent | MouseEvent) => {
      if (!usesShapeTool || !isDrawingRef.current) return
      const pointer = canvas.getPointer(event as unknown as Event)
      emitMathDebug('native pointer:move', { activeTool, pointer, eventType: event.type })
      updateShapeDrawing(pointer)
    }

    const onPointerUp = (event: PointerEvent | MouseEvent) => {
      if (!usesShapeTool) return
      emitMathDebug('native pointer:up', { activeTool, eventType: event.type })
      finishShapeDrawing()
    }

    upperCanvas.addEventListener('pointerdown', onPointerDown)
    upperCanvas.addEventListener('mousedown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('mousemove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('mouseup', onPointerUp)
    return () => {
      upperCanvas.removeEventListener('pointerdown', onPointerDown)
      upperCanvas.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('mousemove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('mouseup', onPointerUp)
    }
  }, [activeTool, beginShapeDrawing, canEdit, finishShapeDrawing, handleToolPlacement, updateShapeDrawing])

  // Last-resort capture-phase fallback for environments where Fabric/native bubble listeners miss pointerdown.
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return
    const upperCanvas = canvas.upperCanvasEl
    if (!upperCanvas) return

    const usesPlacementTool = activeTool === 'text' || activeTool === 'equation' || activeTool === 'graph'
    const usesShapeTool = ['rectangle', 'circle', 'line', 'arrow'].includes(activeTool)

    const isEventOnMathCanvas = (event: Event) => {
      const target = event.target as Node | null
      if (!target) return false
      return target === upperCanvas || upperCanvas.contains(target)
    }

    const onDocumentPointerDownCapture = (event: PointerEvent) => {
      if (!canEdit) return
      if (!usesPlacementTool && !usesShapeTool) return
      if (!isEventOnMathCanvas(event)) return
      const pointer = canvas.getPointer(event as unknown as Event)
      emitMathDebug('document pointer:down capture', { activeTool, pointer })
      if (usesPlacementTool) {
        handleToolPlacement(pointer)
        return
      }
      beginShapeDrawing(pointer)
    }

    const onDocumentPointerMoveCapture = (event: PointerEvent) => {
      if (!usesShapeTool || !isDrawingRef.current) return
      if (!isEventOnMathCanvas(event)) return
      const pointer = canvas.getPointer(event as unknown as Event)
      emitMathDebug('document pointer:move capture', { activeTool, pointer })
      updateShapeDrawing(pointer)
    }

    const onDocumentPointerUpCapture = (event: PointerEvent) => {
      if (!usesShapeTool || !isDrawingRef.current) return
      if (!isEventOnMathCanvas(event)) return
      emitMathDebug('document pointer:up capture', { activeTool })
      finishShapeDrawing()
    }

    document.addEventListener('pointerdown', onDocumentPointerDownCapture, true)
    document.addEventListener('pointermove', onDocumentPointerMoveCapture, true)
    document.addEventListener('pointerup', onDocumentPointerUpCapture, true)
    return () => {
      document.removeEventListener('pointerdown', onDocumentPointerDownCapture, true)
      document.removeEventListener('pointermove', onDocumentPointerMoveCapture, true)
      document.removeEventListener('pointerup', onDocumentPointerUpCapture, true)
    }
  }, [activeTool, beginShapeDrawing, canEdit, finishShapeDrawing, handleToolPlacement, updateShapeDrawing])

  // Handle path completion (for pen tool)
  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return

    const handlePathCreated = (e: any) => {
      const path = e.path as fabric.Path
      if (!path) return

      // Convert Fabric path to points
      const pathData = path.path
      const points: Array<{ x: number; y: number; pressure?: number }> = []
      
      pathData.forEach((cmd: any) => {
        if (cmd[0] === 'M' || cmd[0] === 'L') {
          points.push({ x: cmd[1], y: cmd[2] })
        } else if (cmd[0] === 'Q') {
          points.push({ x: cmd[3], y: cmd[4] })
        }
      })

      // Remove the fabric path (we'll recreate it from the element)
      canvas.remove(path)

      const element: PathElement = {
        id: generateId(),
        type: 'path',
        authorId: currentUserId,
        layer: 0,
        locked: false,
        x: path.left || 0,
        y: path.top || 0,
        rotation: path.angle || 0,
        scaleX: path.scaleX || 1,
        scaleY: path.scaleY || 1,
        version: 1,
        lastModified: Date.now(),
        modifiedBy: currentUserId,
        points,
        strokeColor: activeTool === 'eraser' ? '#ffffff' : toolSettings.strokeColor,
        strokeWidth: toolSettings.strokeWidth,
        isEraser: activeTool === 'eraser',
      }

      onCreateElement(element)
    }

    canvas.on('path:created', handlePathCreated)
    return () => {
      canvas.off('path:created', handlePathCreated)
    }
  }, [activeTool, toolSettings, onCreateElement, currentUserId])

  return (
    <div 
      className="relative"
      onMouseDown={handleWrapperMouseDown}
      onMouseMove={handleWrapperMouseMove}
      onMouseUp={handleWrapperMouseUp}
      style={{ 
        width, 
        height,
        cursor: activeTool === 'hand' ? 'grab' : 
                activeTool === 'pen' ? 'crosshair' : 
                activeTool === 'text' || activeTool === 'equation' ? 'text' : 
                activeTool === 'graph' ? 'copy' : 'default'
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}

export type { MathCanvasProps }
