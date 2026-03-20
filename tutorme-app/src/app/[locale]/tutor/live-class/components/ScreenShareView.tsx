'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MonitorUp, X, Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'

interface ScreenShareViewProps {
  onStop: () => void
  presenterName?: string
}

export function ScreenShareView({ onStop, presenterName = 'You' }: ScreenShareViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <div
      className={cn(
        'absolute inset-4 z-40 flex flex-col overflow-hidden rounded-lg border-2 border-green-600 bg-gray-800',
        isFullscreen && 'fixed inset-0 z-50'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-2">
        <div className="flex items-center gap-2">
          <Badge className="gap-1 bg-green-600">
            <MonitorUp className="h-3 w-3" />
            Sharing
          </Badge>
          <span className="text-sm text-white">{presenterName} is presenting</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:bg-red-900/50 hover:text-red-300"
            onClick={onStop}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Screen Content Placeholder */}
      <div className="flex flex-1 items-center justify-center bg-gray-950">
        <div className="text-center">
          <MonitorUp className="mx-auto mb-4 h-16 w-16 text-gray-600" />
          <p className="text-gray-400">Screen sharing active</p>
          <p className="text-sm text-gray-500">Your screen is being shared with all participants</p>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
