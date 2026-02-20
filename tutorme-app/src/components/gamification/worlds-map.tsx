/**
 * Worlds Map Component
 * 
 * Displays available worlds with unlock status
 */

'use client'

import { Lock, Unlock, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface World {
  id: string
  name: string
  emoji: string
  description: string
  unlockLevel: number
  difficultyLevel: number
  isUnlocked: boolean
  canAccess: boolean
  progress: number
}

interface WorldsMapProps {
  worlds: World[]
  userLevel: number
  className?: string
  onWorldClick?: (world: World) => void
}

export function WorldsMap({
  worlds,
  userLevel,
  className,
  onWorldClick,
}: WorldsMapProps) {
  // Sort: unlocked first, then by unlock level
  const sortedWorlds = [...worlds].sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) return -1
    if (!a.isUnlocked && b.isUnlocked) return 1
    return a.unlockLevel - b.unlockLevel
  })

  return (
    <div className={cn('bg-white rounded-xl p-4 border', className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Learning Worlds</h3>
        <span className="text-sm text-gray-500">
          {worlds.filter(w => w.isUnlocked).length}/{worlds.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {sortedWorlds.map((world) => (
          <WorldCard
            key={world.id}
            world={world}
            userLevel={userLevel}
            onClick={() => onWorldClick?.(world)}
          />
        ))}
      </div>
    </div>
  )
}

function WorldCard({
  world,
  userLevel,
  onClick,
}: {
  world: World
  userLevel: number
  onClick?: () => void
}) {
  const isLocked = !world.isUnlocked
  const canUnlock = userLevel >= world.unlockLevel && isLocked

  return (
    <button
      onClick={onClick}
      disabled={isLocked && !canUnlock}
      className={cn(
        'relative p-4 rounded-xl border-2 text-left transition-all',
        world.isUnlocked
          ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100'
          : canUnlock
          ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-300 hover:bg-yellow-100'
          : 'border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed'
      )}
    >
      {/* Lock indicator */}
      {isLocked && (
        <div className="absolute top-2 right-2">
          {canUnlock ? (
            <Unlock className="w-4 h-4 text-yellow-600" />
          ) : (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
        </div>
      )}

      {/* Emoji */}
      <div className="text-3xl mb-2">{world.emoji}</div>

      {/* Name */}
      <h4 className={cn(
        'font-semibold text-sm mb-1',
        world.isUnlocked ? 'text-gray-800' : 'text-gray-500'
      )}>
        {world.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-gray-500 line-clamp-2 mb-2">
        {world.description}
      </p>

      {/* Level requirement */}
      {isLocked ? (
        <p className="text-xs font-medium text-gray-400">
          Level {world.unlockLevel} required
        </p>
      ) : world.progress > 0 ? (
        <div className="space-y-1">
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: `${world.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{world.progress}% complete</p>
        </div>
      ) : (
        <div className="flex items-center text-xs text-blue-600 font-medium">
          Start <ChevronRight className="w-3 h-3" />
        </div>
      )}
    </button>
  )
}
