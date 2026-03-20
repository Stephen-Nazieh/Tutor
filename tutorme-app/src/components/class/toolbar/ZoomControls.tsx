/**
 * Zoom Controls Component
 * UI controls for pan and zoom operations
 */

import { Button } from '@/components/ui/button'
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react'

interface ZoomControlsProps {
  scale: number
  onZoomIn: () => void
  onZoomOut: () => void
  onReset: () => void
  minScale?: number
  maxScale?: number
}

export function ZoomControls({
  scale,
  onZoomIn,
  onZoomOut,
  onReset,
  minScale = 0.5,
  maxScale = 3,
}: ZoomControlsProps) {
  const percentage = Math.round(scale * 100)
  const canZoomIn = scale < maxScale
  const canZoomOut = scale > minScale

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800/90 p-2 shadow-lg backdrop-blur-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomOut}
        disabled={!canZoomOut}
        title="Zoom Out"
        className="h-8 w-8 p-0"
      >
        <ZoomOut className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        title="Reset Zoom"
        className="h-8 min-w-[60px] px-2 font-mono text-xs"
      >
        {percentage}%
      </Button>

      <Button
        variant="ghost"
        size="sm"
        onClick={onZoomIn}
        disabled={!canZoomIn}
        title="Zoom In"
        className="h-8 w-8 p-0"
      >
        <ZoomIn className="h-4 w-4" />
      </Button>

      <div className="mx-1 h-6 w-px bg-gray-700" />

      <Button
        variant="ghost"
        size="sm"
        onClick={onReset}
        title="Fit to Screen"
        className="h-8 w-8 p-0"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
