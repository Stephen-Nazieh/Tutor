/**
 * Mission Mode Toggle Component
 *
 * Switches between Free Chat and Mission Mode
 */

'use client'

import { MessageCircle, Target, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'free' | 'mission'

interface MissionModeToggleProps {
  currentMode: Mode
  currentMission?: {
    id: string
    title: string
    worldName: string
    emoji: string
  }
  onModeChange: (mode: Mode) => void
  className?: string
}

export function MissionModeToggle({
  currentMode,
  currentMission,
  onModeChange,
  className,
}: MissionModeToggleProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Mode selector */}
      <div className="flex rounded-lg bg-gray-100 p-1">
        <button
          onClick={() => onModeChange('free')}
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
            currentMode === 'free'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <MessageCircle className="h-4 w-4" />
          Free Chat
        </button>
        <button
          onClick={() => onModeChange('mission')}
          className={cn(
            'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
            currentMode === 'mission'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Target className="h-4 w-4" />
          Mission Mode
        </button>
      </div>

      {/* Current mission indicator */}
      {currentMode === 'mission' && currentMission && (
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1.5 text-sm text-blue-700">
          <span>{currentMission.emoji}</span>
          <span className="max-w-[150px] truncate font-medium">{currentMission.title}</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      )}
    </div>
  )
}
