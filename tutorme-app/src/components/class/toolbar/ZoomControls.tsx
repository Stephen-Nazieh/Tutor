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
    maxScale = 3
}: ZoomControlsProps) {
    const percentage = Math.round(scale * 100)
    const canZoomIn = scale < maxScale
    const canZoomOut = scale > minScale

    return (
        <div className="absolute bottom-4 right-4 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg p-2 flex items-center gap-2 z-10">
            <Button
                variant="ghost"
                size="sm"
                onClick={onZoomOut}
                disabled={!canZoomOut}
                title="Zoom Out"
                className="w-8 h-8 p-0"
            >
                <ZoomOut className="w-4 h-4" />
            </Button>

            <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                title="Reset Zoom"
                className="min-w-[60px] h-8 px-2 font-mono text-xs"
            >
                {percentage}%
            </Button>

            <Button
                variant="ghost"
                size="sm"
                onClick={onZoomIn}
                disabled={!canZoomIn}
                title="Zoom In"
                className="w-8 h-8 p-0"
            >
                <ZoomIn className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-gray-700 mx-1" />

            <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                title="Fit to Screen"
                className="w-8 h-8 p-0"
            >
                <Maximize2 className="w-4 h-4" />
            </Button>
        </div>
    )
}
