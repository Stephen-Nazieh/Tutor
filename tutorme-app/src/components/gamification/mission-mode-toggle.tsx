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
      <div className="flex bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onModeChange('free')}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            currentMode === 'free'
              ? 'bg-white text-gray-800 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <MessageCircle className="w-4 h-4" />
          Free Chat
        </button>
        <button
          onClick={() => onModeChange('mission')}
          className={cn(
            'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            currentMode === 'mission'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Target className="w-4 h-4" />
          Mission Mode
        </button>
      </div>

      {/* Current mission indicator */}
      {currentMode === 'mission' && currentMission && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm">
          <span>{currentMission.emoji}</span>
          <span className="font-medium truncate max-w-[150px]">
            {currentMission.title}
          </span>
          <ChevronRight className="w-4 h-4" />
        </div>
      )}
    </div>
  )
}
