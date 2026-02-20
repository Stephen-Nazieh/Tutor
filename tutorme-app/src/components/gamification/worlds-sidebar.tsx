/**
 * Worlds Sidebar Component
 * 
 * Displays worlds and missions in the AI Tutor sidebar
 */

'use client'

import { useState } from 'react'
import { ChevronRight, Lock, CheckCircle2, Circle, PlayCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Mission {
  id: string
  title: string
  difficulty: number
  xpReward: number
  estimatedTime: number
  userProgress?: {
    status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED'
    score: number | null
  }
}

interface World {
  id: string
  name: string
  emoji: string
  isUnlocked: boolean
  missions: Mission[]
}

interface WorldsSidebarProps {
  worlds: World[]
  currentWorldId?: string
  currentMissionId?: string
  onSelectMission: (worldId: string, mission: Mission) => void
  className?: string
}

export function WorldsSidebar({
  worlds,
  currentWorldId,
  currentMissionId,
  onSelectMission,
  className,
}: WorldsSidebarProps) {
  const [expandedWorlds, setExpandedWorlds] = useState<string[]>(
    currentWorldId ? [currentWorldId] : []
  )

  const toggleWorld = (worldId: string) => {
    setExpandedWorlds(prev =>
      prev.includes(worldId)
        ? prev.filter(id => id !== worldId)
        : [...prev, worldId]
    )
  }

  return (
    <div className={cn('bg-white rounded-xl border flex flex-col h-full', className)}>
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-800">Learning Worlds</h3>
        <p className="text-xs text-gray-500 mt-1">
          Choose a mission to start learning
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {worlds.map((world) => {
            const isExpanded = expandedWorlds.includes(world.id)
            const completedCount = world.missions.filter(
              m => m.userProgress?.status === 'COMPLETED'
            ).length

            return (
              <div key={world.id}>
                {/* World header */}
                <button
                  onClick={() => world.isUnlocked && toggleWorld(world.id)}
                  disabled={!world.isUnlocked}
                  className={cn(
                    'w-full flex items-center gap-2 p-2 rounded-lg transition-colors',
                    world.isUnlocked
                      ? 'hover:bg-gray-100'
                      : 'opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className="text-xl">{world.emoji}</span>
                  
                  <div className="flex-1 text-left">
                    <p className={cn(
                      'font-medium text-sm',
                      world.isUnlocked ? 'text-gray-800' : 'text-gray-500'
                    )}>
                      {world.name}
                    </p>
                    {world.isUnlocked && (
                      <p className="text-xs text-gray-500">
                        {completedCount}/{world.missions.length} completed
                      </p>
                    )}
                  </div>

                  {!world.isUnlocked ? (
                    <Lock className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight
                      className={cn(
                        'w-4 h-4 text-gray-400 transition-transform',
                        isExpanded && 'rotate-90'
                      )}
                    />
                  )}
                </button>

                {/* Missions list */}
                {isExpanded && world.isUnlocked && (
                  <div className="ml-6 mt-1 space-y-1">
                    {world.missions.map((mission) => (
                      <MissionItem
                        key={mission.id}
                        mission={mission}
                        isActive={currentMissionId === mission.id}
                        onClick={() => onSelectMission(world.id, mission)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </ScrollArea>
    </div>
  )
}

function MissionItem({
  mission,
  isActive,
  onClick,
}: {
  mission: Mission
  isActive: boolean
  onClick: () => void
}) {
  const status = mission.userProgress?.status || 'NOT_STARTED'
  
  const Icon = status === 'COMPLETED'
    ? CheckCircle2
    : status === 'IN_PROGRESS'
    ? PlayCircle
    : Circle

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-2 p-2 rounded-lg text-left transition-colors',
        isActive
          ? 'bg-blue-50 border border-blue-200'
          : 'hover:bg-gray-50'
      )}
    >
      <Icon className={cn(
        'w-4 h-4 flex-shrink-0',
        status === 'COMPLETED' && 'text-green-500',
        status === 'IN_PROGRESS' && 'text-blue-500',
        status === 'NOT_STARTED' && 'text-gray-400'
      )} />

      <div className="flex-1 min-w-0">
        <p className={cn(
          'text-sm truncate',
          isActive ? 'font-medium text-blue-700' : 'text-gray-700'
        )}>
          {mission.title}
        </p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>{mission.estimatedTime} min</span>
          <span>•</span>
          <span>+{mission.xpReward} XP</span>
        </div>
      </div>
    </button>
  )
}
