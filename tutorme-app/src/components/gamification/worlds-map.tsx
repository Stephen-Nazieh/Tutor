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

export function WorldsMap({ worlds, userLevel, className, onWorldClick }: WorldsMapProps) {
  // Sort: unlocked first, then by unlock level
  const sortedWorlds = [...worlds].sort((a, b) => {
    if (a.isUnlocked && !b.isUnlocked) return -1
    if (!a.isUnlocked && b.isUnlocked) return 1
    return a.unlockLevel - b.unlockLevel
  })

  return (
    <div className={cn('rounded-xl border bg-white p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-800">Learning Worlds</h3>
        <span className="text-sm text-gray-500">
          {worlds.filter(w => w.isUnlocked).length}/{worlds.length} unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {sortedWorlds.map(world => (
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
        'relative rounded-xl border-2 p-4 text-left transition-all',
        world.isUnlocked
          ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:bg-blue-100'
          : canUnlock
            ? 'border-yellow-200 bg-yellow-50 hover:border-yellow-300 hover:bg-yellow-100'
            : 'cursor-not-allowed border-gray-200 bg-gray-50 opacity-70'
      )}
    >
      {/* Lock indicator */}
      {isLocked && (
        <div className="absolute right-2 top-2">
          {canUnlock ? (
            <Unlock className="h-4 w-4 text-yellow-600" />
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
        </div>
      )}

      {/* Emoji */}
      <div className="mb-2 text-3xl">{world.emoji}</div>

      {/* Name */}
      <h4
        className={cn(
          'mb-1 text-sm font-semibold',
          world.isUnlocked ? 'text-gray-800' : 'text-gray-500'
        )}
      >
        {world.name}
      </h4>

      {/* Description */}
      <p className="mb-2 line-clamp-2 text-xs text-gray-500">{world.description}</p>

      {/* Level requirement */}
      {isLocked ? (
        <p className="text-xs font-medium text-gray-400">Level {world.unlockLevel} required</p>
      ) : world.progress > 0 ? (
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-blue-500"
              style={{ width: `${world.progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">{world.progress}% complete</p>
        </div>
      ) : (
        <div className="flex items-center text-xs font-medium text-blue-600">
          Start <ChevronRight className="h-3 w-3" />
        </div>
      )}
    </button>
  )
}
