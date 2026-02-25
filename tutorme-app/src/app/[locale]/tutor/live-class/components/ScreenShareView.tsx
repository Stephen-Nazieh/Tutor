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
    <div className={cn(
      "absolute inset-4 bg-gray-800 rounded-lg border-2 border-green-600 overflow-hidden z-40 flex flex-col",
      isFullscreen && "fixed inset-0 z-50"
    )}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600 gap-1">
            <MonitorUp className="w-3 h-3" />
            Sharing
          </Badge>
          <span className="text-white text-sm">{presenterName} is presenting</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-400 hover:text-red-300 hover:bg-red-900/50"
            onClick={onStop}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Screen Content Placeholder */}
      <div className="flex-1 bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <MonitorUp className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Screen sharing active</p>
          <p className="text-gray-500 text-sm">Your screen is being shared with all participants</p>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
