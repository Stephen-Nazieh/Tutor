/**
 * Timeline Scrubber Component
 *
 * Provides time-travel playback controls for whiteboard history.
 */

'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Play, Pause, SkipBack, SkipForward, Rewind, FastForward, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEvent {
  seq: number
  timestamp: number
  userName: string
  description: string
}

interface TimelineScrubberProps {
  events: TimelineEvent[]
  currentSeq: number
  isPlaying: boolean
  playbackSpeed: number
  onPlay: () => void
  onPause: () => void
  onSeek: (seq: number) => void
  onStepForward: () => void
  onStepBackward: () => void
  onSpeedChange: (speed: number) => void
  className?: string
}

export function TimelineScrubber({
  events,
  currentSeq,
  isPlaying,
  playbackSpeed,
  onPlay,
  onPause,
  onSeek,
  onStepForward,
  onStepBackward,
  onSpeedChange,
  className,
}: TimelineScrubberProps) {
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null)

  const totalEvents = events.length
  const progress = totalEvents > 0 ? (currentSeq / events[events.length - 1]?.seq) * 100 : 0

  // Format timestamp for display
  const formatTime = useCallback((timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }, [])

  // Calculate duration
  const duration = events.length > 1 ? events[events.length - 1].timestamp - events[0].timestamp : 0

  return (
    <div className={cn('rounded-lg border bg-white p-4 shadow-sm', className)}>
      {/* Header */}
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Timeline</span>
        </div>
        <div className="text-xs text-gray-500">
          {formatTime(events[0]?.timestamp || Date.now())} -{' '}
          {formatTime(events[events.length - 1]?.timestamp || Date.now())}
        </div>
      </div>

      {/* Scrubber */}
      <div className="mb-4">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={([value]) => {
            const targetSeq = Math.floor((value / 100) * (events[events.length - 1]?.seq || 0))
            onSeek(targetSeq)
          }}
          className="w-full"
        />

        {/* Event markers */}
        <div className="relative mt-1 h-4">
          {events.map((event, index) => {
            const position = (event.seq / (events[events.length - 1]?.seq || 1)) * 100
            return (
              <div
                key={event.seq}
                className={cn(
                  'absolute h-1 w-1 cursor-pointer rounded-full transition-all',
                  event.seq <= currentSeq ? 'bg-blue-500' : 'bg-gray-300',
                  hoveredEvent?.seq === event.seq && '-mt-0.5 h-2 w-2'
                )}
                style={{ left: `${position}%` }}
                onMouseEnter={() => setHoveredEvent(event)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => onSeek(event.seq)}
              />
            )
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onStepBackward}
            disabled={currentSeq <= (events[0]?.seq || 0)}
          >
            <SkipBack className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            size="icon"
            className="h-10 w-10"
            onClick={isPlaying ? onPause : onPlay}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onStepForward}
            disabled={currentSeq >= (events[events.length - 1]?.seq || 0)}
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-2">
          <Rewind className="h-3 w-3 text-gray-400" />
          <select
            value={playbackSpeed}
            onChange={e => onSpeedChange(parseFloat(e.target.value))}
            className="rounded border px-2 py-1 text-xs"
          >
            <option value={0.25}>0.25x</option>
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={4}>4x</option>
          </select>
          <FastForward className="h-3 w-3 text-gray-400" />
        </div>
      </div>

      {/* Event tooltip */}
      {hoveredEvent && (
        <div className="absolute z-10 mt-2 rounded bg-gray-900 px-2 py-1 text-xs text-white">
          <div className="font-medium">{hoveredEvent.userName}</div>
          <div>{hoveredEvent.description}</div>
          <div className="text-gray-400">{formatTime(hoveredEvent.timestamp)}</div>
        </div>
      )}

      {/* Stats */}
      <div className="mt-3 flex items-center justify-between border-t pt-3 text-xs text-gray-500">
        <span>{events.length} events</span>
        <span>Duration: {Math.round(duration / 1000)}s</span>
      </div>
    </div>
  )
}
