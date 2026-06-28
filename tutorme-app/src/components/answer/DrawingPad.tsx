'use client'

import { useCallback, useEffect, useRef } from 'react'

interface DrawingPadProps {
  /** Existing PNG data URL to restore (when the student already drew something). */
  value?: string
  /** Called with the PNG data URL after each stroke (empty string when cleared). */
  onChange: (dataUrl: string) => void
  onInteract?: () => void
  className?: string
}

/**
 * A lightweight pen/mouse/touch drawing surface for written answers (e.g. maths
 * working). The pad is EXPANDABLE — drag the bottom edge to make it taller; the
 * existing drawing is preserved (more space is added, content isn't scaled).
 * Emits a PNG data URL so the answer can be submitted/graded like any value.
 */
export function DrawingPad({ value, onChange, onInteract, className = '' }: DrawingPadProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const drawing = useRef(false)
  const last = useRef<{ x: number; y: number } | null>(null)
  // Latest drawing, kept so a resize can redraw without losing content.
  const dataRef = useRef<string>(value && value.startsWith('data:image') ? value : '')

  // Size the canvas backing store to the wrapper and redraw the saved drawing at
  // its natural size (top-left) so expanding adds blank space without distorting.
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const w = Math.max(1, Math.round(rect.width))
    const h = Math.max(1, Math.round(rect.height))
    if (canvas.width === w && canvas.height === h) return
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 2.2
    ctx.strokeStyle = '#1F2933'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, w, h)
    if (dataRef.current.startsWith('data:image')) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0)
      img.src = dataRef.current
    }
  }, [])

  useEffect(() => {
    initCanvas()
    const wrap = wrapRef.current
    if (!wrap || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => initCanvas())
    ro.observe(wrap)
    return () => ro.disconnect()
  }, [initCanvas])

  const pointFromEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current!.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  const handleDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    canvasRef.current?.setPointerCapture(e.pointerId)
    drawing.current = true
    last.current = pointFromEvent(e)
    onInteract?.()
  }

  const handleMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!drawing.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !last.current) return
    const p = pointFromEvent(e)
    ctx.beginPath()
    ctx.moveTo(last.current.x, last.current.y)
    ctx.lineTo(p.x, p.y)
    ctx.stroke()
    last.current = p
  }

  const handleUp = () => {
    if (!drawing.current) return
    drawing.current = false
    last.current = null
    const url = canvasRef.current?.toDataURL('image/png')
    if (url) {
      dataRef.current = url
      onChange(url)
    }
  }

  const handleClear = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    dataRef.current = ''
    onChange('')
  }

  return (
    <div className={className}>
      <div
        ref={wrapRef}
        className="relative h-44 min-h-[120px] w-full resize-y overflow-hidden rounded-md border border-gray-300 bg-white"
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none"
          onPointerDown={handleDown}
          onPointerMove={handleMove}
          onPointerUp={handleUp}
          onPointerLeave={handleUp}
        />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">
          Pen, mouse, or finger · drag the bottom edge to enlarge.
        </span>
        <button
          type="button"
          onClick={handleClear}
          className="text-xs font-medium text-gray-500 hover:text-gray-700"
        >
          Clear
        </button>
      </div>
    </div>
  )
}
