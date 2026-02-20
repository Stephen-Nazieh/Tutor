/**
 * CanvasRenderer Component
 * Pure rendering component for the whiteboard canvas
 */

import { useRef, useEffect, useCallback } from 'react'
import type { Point, Stroke, TextElement, ShapeElement } from '../hooks'

interface CanvasRendererProps {
  strokes: Stroke[]
  texts: TextElement[]
  shapes: ShapeElement[]
  currentStroke: Point[]
  tempShape: ShapeElement | null
  backgroundColor: string
  backgroundStyle: 'solid' | 'grid' | 'dots' | 'lines'
  scale: number
  pan: { x: number; y: number }
  selectedObject: { type: string; id: string } | null
}

const CANVAS_WIDTH = 10000
const CANVAS_HEIGHT = 10000

export function CanvasRenderer({
  strokes, texts, shapes, currentStroke, tempShape,
  backgroundColor, backgroundStyle, scale, pan, selectedObject
}: CanvasRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawBackgroundPattern = useCallback((ctx: CanvasRenderingContext2D, style: string, color: string) => {
    ctx.save()
    ctx.strokeStyle = color === '#ffffff' || color === '#fef3c7' ? '#e5e7eb' : 'rgba(255,255,255,0.2)'
    ctx.lineWidth = 1
    const patternSize = 40

    switch (style) {
      case 'grid':
        for (let x = 0; x < CANVAS_WIDTH; x += patternSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); ctx.stroke()
        }
        for (let y = 0; y < CANVAS_HEIGHT; y += patternSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke()
        }
        break
      case 'dots':
        for (let x = patternSize; x < CANVAS_WIDTH; x += patternSize) {
          for (let y = patternSize; y < CANVAS_HEIGHT; y += patternSize) {
            ctx.beginPath(); ctx.arc(x, y, 1.5, 0, Math.PI * 2); ctx.fillStyle = ctx.strokeStyle; ctx.fill()
          }
        }
        break
      case 'lines':
        for (let y = patternSize; y < CANVAS_HEIGHT; y += patternSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); ctx.stroke()
        }
        break
    }
    ctx.restore()
  }, [])

  const drawStroke = useCallback((ctx: CanvasRenderingContext2D, points: Point[], color: string, width: number) => {
    if (points.length < 2) return
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.stroke()
  }, [])

  const drawEraserStroke = useCallback((ctx: CanvasRenderingContext2D, points: Point[]) => {
    if (points.length < 2) return
    ctx.save(); ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y)
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y)
    ctx.lineWidth = 20; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); ctx.restore()
  }, [])

  const drawText = useCallback((ctx: CanvasRenderingContext2D, text: TextElement) => {
    ctx.save()
    ctx.font = `${text.format?.bold ? 'bold ' : ''}${text.format?.italic ? 'italic ' : ''}${text.fontSize || 16}px sans-serif`
    ctx.fillStyle = text.color || '#000000'; ctx.textAlign = (text.format?.align as CanvasTextAlign) || 'left'
    const lines = text.text.split('\n'); const lineHeight = (text.fontSize || 16) * 1.2
    lines.forEach((line, index) => ctx.fillText(line, text.x, text.y + lineHeight * (index + 1)))
    ctx.restore()
  }, [])

  const drawShape = useCallback((ctx: CanvasRenderingContext2D, shape: ShapeElement) => {
    ctx.save(); ctx.strokeStyle = shape.color; ctx.lineWidth = shape.lineWidth; ctx.beginPath()
    switch (shape.type) {
      case 'rectangle': ctx.strokeRect(shape.x, shape.y, shape.width, shape.height); break
      case 'circle': ctx.arc(shape.x + shape.width / 2, shape.y + shape.height / 2, Math.abs(shape.width) / 2, 0, Math.PI * 2); ctx.stroke(); break
      case 'line': ctx.moveTo(shape.x, shape.y); ctx.lineTo(shape.x + shape.width, shape.y + shape.height); ctx.stroke(); break
      case 'triangle': ctx.moveTo(shape.x + shape.width / 2, shape.y); ctx.lineTo(shape.x + shape.width, shape.y + shape.height); ctx.lineTo(shape.x, shape.y + shape.height); ctx.closePath(); ctx.stroke(); break
    }
    ctx.restore()
  }, [])

  const drawSelectionBox = useCallback((ctx: CanvasRenderingContext2D, obj: { type: string; id: string }) => {
    let target: { x: number; y: number; width: number; height: number } | null = null
    const shape = shapes.find(s => s.id === obj.id)
    if (shape) target = shape
    const text = texts.find(t => t.id === obj.id)
    if (text) target = { x: text.x - 4, y: text.y - (text.fontSize || 16) - 4, width: (text.width || 100) + 8, height: (text.height || 50) + 8 }
    if (!target) return
    ctx.save(); ctx.strokeStyle = '#3b82f6'; ctx.lineWidth = 2; ctx.setLineDash([5, 5])
    ctx.strokeRect(target.x - 2, target.y - 2, target.width + 4, target.height + 4)
    ctx.fillStyle = '#3b82f6'; ctx.fillRect(target.x + target.width - 4, target.y + target.height - 4, 8, 8)
    ctx.restore()
  }, [shapes, texts])

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    canvas.width = CANVAS_WIDTH; canvas.height = CANVAS_HEIGHT
    const ctx = canvas.getContext('2d'); if (!ctx) return

    ctx.fillStyle = backgroundColor; ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    drawBackgroundPattern(ctx, backgroundStyle, backgroundColor)
    ctx.save(); ctx.translate(pan.x, pan.y); ctx.scale(scale, scale)

    strokes.forEach(stroke => stroke.type === 'eraser' ? drawEraserStroke(ctx, stroke.points) : drawStroke(ctx, stroke.points, stroke.color, stroke.width))
    if (currentStroke.length > 1) drawStroke(ctx, currentStroke, '#000000', 3)
    shapes.forEach(shape => drawShape(ctx, shape))
    if (tempShape) drawShape(ctx, tempShape)
    texts.forEach(text => drawText(ctx, text))
    if (selectedObject) drawSelectionBox(ctx, selectedObject)
    ctx.restore()
  }, [strokes, texts, shapes, currentStroke, tempShape, backgroundColor, backgroundStyle, scale, pan, selectedObject, drawBackgroundPattern, drawStroke, drawEraserStroke, drawText, drawShape, drawSelectionBox])

  return <canvas ref={canvasRef} className="absolute inset-0 cursor-crosshair" style={{ touchAction: 'none' }} />
}
