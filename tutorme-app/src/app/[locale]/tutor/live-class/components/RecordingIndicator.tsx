'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Radio, Pause, Square } from 'lucide-react'

interface RecordingIndicatorProps {
  duration: number
  isPaused: boolean
  onPause: () => void
  onStop: () => void
}

export function RecordingIndicator({ duration, isPaused, onPause, onStop }: RecordingIndicatorProps) {
  const formatDuration = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 bg-red-900/80 rounded-lg px-3 py-1.5">
        <div className="flex items-center gap-2">
          <Radio className={cn(
            "w-4 h-4 text-red-500",
            !isPaused && "animate-pulse"
          )} />
          <span className="text-white font-mono text-sm">
            {formatDuration(duration)}
          </span>
          {isPaused && (
            <span className="text-xs text-yellow-400 ml-1">(Paused)</span>
          )}
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-red-800"
                onClick={onPause}
              >
                {isPaused ? (
                  <div className="w-3 h-3 border-l-2 border-r-2 border-white" />
                ) : (
                  <Pause className="w-3 h-3" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isPaused ? 'Resume' : 'Pause'}</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-red-800"
                onClick={onStop}
              >
                <Square className="w-3 h-3 fill-current" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Stop Recording</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
