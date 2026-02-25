'use client'

import { useMemo } from 'react'

export type BackgroundType = 'blank' | 'grid' | 'dot' | 'lined' | 'graph' | 'isometric' | 'dark'

interface BackgroundTemplatesProps {
  type: BackgroundType
  width: number
  height: number
}

export function BackgroundTemplates({ type, width, height }: BackgroundTemplatesProps) {
  const backgroundPattern = useMemo(() => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    switch (type) {
      case 'grid':
        return createGridPattern(canvas, ctx, 20)
      case 'dot':
        return createDotPattern(canvas, ctx, 20)
      case 'lined':
        return createLinedPattern(canvas, ctx, 25)
      case 'graph':
        return createGraphPattern(canvas, ctx, 50)
      case 'isometric':
        return createIsometricPattern(canvas, ctx, 30)
      case 'dark':
        return createDarkPattern(canvas, ctx)
      default:
        return null
    }
  }, [type])

  if (type === 'blank') {
    return <div className="absolute inset-0 bg-white" />
  }

  if (type === 'dark') {
    return <div className="absolute inset-0 bg-slate-900" />
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: backgroundPattern ? `url(${backgroundPattern})` : undefined,
        backgroundRepeat: 'repeat',
        backgroundColor: type === 'dark' ? '#0f172a' : '#ffffff',
      }}
    />
  )
}

// Pattern creators
function createGridPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: number): string {
  canvas.width = size
  canvas.height = size

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(0, size)
  ctx.lineTo(0, 0)
  ctx.lineTo(size, 0)
  ctx.stroke()

  return canvas.toDataURL()
}

function createDotPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, spacing: number): string {
  canvas.width = spacing
  canvas.height = spacing

  ctx.fillStyle = '#d1d5db'
  ctx.beginPath()
  ctx.arc(spacing / 2, spacing / 2, 1, 0, Math.PI * 2)
  ctx.fill()

  return canvas.toDataURL()
}

function createLinedPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, spacing: number): string {
  canvas.width = 1
  canvas.height = spacing

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1

  ctx.beginPath()
  ctx.moveTo(0, spacing)
  ctx.lineTo(1, spacing)
  ctx.stroke()

  return canvas.toDataURL()
}

function createGraphPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, spacing: number): string {
  canvas.width = spacing
  canvas.height = spacing

  // Light grid
  ctx.strokeStyle = '#f1f5f9'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, spacing)
  ctx.lineTo(0, 0)
  ctx.lineTo(spacing, 0)
  ctx.stroke()

  // Bold axes every 5 lines
  ctx.strokeStyle = '#cbd5e1'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(spacing, 0)
  ctx.moveTo(0, 0)
  ctx.lineTo(0, spacing)
  ctx.stroke()

  return canvas.toDataURL()
}

function createIsometricPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, size: number): string {
  const height = size * Math.sin(Math.PI / 3)
  canvas.width = size * 2
  canvas.height = height * 2

  ctx.strokeStyle = '#e5e7eb'
  ctx.lineWidth = 1

  // Draw isometric lines
  ctx.beginPath()
  
  // Horizontal
  for (let y = 0; y <= canvas.height; y += height) {
    ctx.moveTo(0, y)
    ctx.lineTo(canvas.width, y)
  }
  
  // 60 degree lines
  for (let x = 0; x <= canvas.width; x += size) {
    ctx.moveTo(x, 0)
    ctx.lineTo(x - canvas.height / Math.tan(Math.PI / 3), canvas.height)
    ctx.moveTo(x, 0)
    ctx.lineTo(x + canvas.height / Math.tan(Math.PI / 3), canvas.height)
  }
  
  ctx.stroke()

  return canvas.toDataURL()
}

function createDarkPattern(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): string {
  canvas.width = 20
  canvas.height = 20

  ctx.fillStyle = '#0f172a'
  ctx.fillRect(0, 0, 20, 20)

  ctx.strokeStyle = '#1e293b'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(0, 20)
  ctx.lineTo(0, 0)
  ctx.lineTo(20, 0)
  ctx.stroke()

  return canvas.toDataURL()
}

// Background selector component
interface BackgroundSelectorProps {
  value: BackgroundType
  onChange: (type: BackgroundType) => void
}

const BACKGROUND_OPTIONS: { type: BackgroundType; label: string; icon: string }[] = [
  { type: 'blank', label: 'Blank', icon: '⬜' },
  { type: 'grid', label: 'Grid', icon: '⊞' },
  { type: 'dot', label: 'Dot', icon: '⊙' },
  { type: 'lined', label: 'Lined', icon: '☰' },
  { type: 'graph', label: 'Graph', icon: '⊕' },
  { type: 'isometric', label: 'Isometric', icon: '⬡' },
  { type: 'dark', label: 'Dark', icon: '⬛' },
]

export function BackgroundSelector({ value, onChange }: BackgroundSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-white rounded-lg border p-1 shadow-sm">
      {BACKGROUND_OPTIONS.map((option) => (
        <button
          key={option.type}
          onClick={() => onChange(option.type)}
          className={`
            flex flex-col items-center justify-center w-10 h-10 rounded transition-colors
            ${value === option.type 
              ? 'bg-blue-100 text-blue-700 border border-blue-300' 
              : 'hover:bg-slate-100 text-slate-600'
            }
          `}
          title={option.label}
        >
          <span className="text-lg">{option.icon}</span>
          <span className="text-[8px]">{option.label}</span>
        </button>
      ))}
    </div>
  )
}

export default BackgroundTemplates
