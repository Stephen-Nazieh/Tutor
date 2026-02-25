'use client'

import { useEffect, useRef, useCallback } from 'react'

interface LaserPointerProps {
  isActive: boolean
  color?: string
  onPositionChange?: (x: number, y: number) => void
}

export function LaserPointer({ isActive, color = '#ef4444', onPositionChange }: LaserPointerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const positionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const drawLaser = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    if (!isActive) return

    // Draw outer glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20)
    gradient.addColorStop(0, color + '80') // 50% opacity
    gradient.addColorStop(0.5, color + '20') // 12% opacity
    gradient.addColorStop(1, 'transparent')

    ctx.beginPath()
    ctx.arc(x, y, 20, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw inner circle
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Draw border
    ctx.beginPath()
    ctx.arc(x, y, 6, 0, Math.PI * 2)
    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [isActive, color])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!isActive) return

      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      positionRef.current = { x, y }
      drawLaser(x, y)
      onPositionChange?.(x, y)
    }

    const handleMouseLeave = () => {
      if (!isActive) return
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [isActive, drawLaser, onPositionChange])

  // Pulse animation
  useEffect(() => {
    if (!isActive) return

    let pulseScale = 1
    let growing = true

    const animate = () => {
      const { x, y } = positionRef.current
      drawLaser(x, y)

      // Update pulse
      if (growing) {
        pulseScale += 0.02
        if (pulseScale >= 1.3) growing = false
      } else {
        pulseScale -= 0.02
        if (pulseScale <= 1) growing = true
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive, drawLaser])

  if (!isActive) return null

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-50"
      style={{ cursor: 'none' }}
      width={1200}
      height={800}
    />
  )
}

// Remote laser pointer for other users
interface RemoteLaserPointerProps {
  x: number
  y: number
  color: string
  name: string
}

export function RemoteLaserPointer({ x, y, color, name }: RemoteLaserPointerProps) {
  return (
    <div
      className="absolute pointer-events-none z-40 transition-all duration-75"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          width: 30,
          height: 30,
          backgroundColor: color,
          opacity: 0.3,
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
        }}
      />
      
      {/* Core dot */}
      <div
        className="relative rounded-full border-2 border-white shadow-lg"
        style={{
          width: 12,
          height: 12,
          backgroundColor: color,
        }}
      />
      
      {/* Name label */}
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs whitespace-nowrap shadow-sm"
        style={{
          backgroundColor: color,
          color: '#fff',
        }}
      >
        {name}
      </div>
    </div>
  )
}

export default LaserPointer
