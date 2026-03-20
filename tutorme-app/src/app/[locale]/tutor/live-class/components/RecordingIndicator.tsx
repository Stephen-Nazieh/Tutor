'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { Radio, Pause, Square } from 'lucide-react'

interface RecordingIndicatorProps {
  duration: number
  isPaused: boolean
  onPause: () => void
  onStop: () => void
}

export function RecordingIndicator({
  duration,
  isPaused,
  onPause,
  onStop,
}: RecordingIndicatorProps) {
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
      <div className="flex items-center gap-2 rounded-lg bg-red-900/80 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <Radio className={cn('h-4 w-4 text-red-500', !isPaused && 'animate-pulse')} />
          <span className="font-mono text-sm text-white">{formatDuration(duration)}</span>
          {isPaused && <span className="ml-1 text-xs text-yellow-400">(Paused)</span>}
        </div>

        <div className="ml-2 flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-white hover:bg-red-800"
                onClick={onPause}
              >
                {isPaused ? (
                  <div className="h-3 w-3 border-l-2 border-r-2 border-white" />
                ) : (
                  <Pause className="h-3 w-3" />
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
                <Square className="h-3 w-3 fill-current" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Stop Recording</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
