/**
 * Daily Quests Widget
 *
 * Displays today's quests with progress
 */

'use client'

import { CheckCircle2, Circle, Target, Trophy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface Quest {
  id: string
  quest: {
    title: string
    description: string
    type: string
    xpReward: number
    requirement: number
  }
  completed: boolean
  progress: number
}

interface DailyQuestsProps {
  quests: Quest[]
  completedCount: number
  totalXp: number
  className?: string
  onQuestClick?: (quest: Quest) => void
}

export function DailyQuestsWidget({
  quests,
  completedCount,
  totalXp,
  className,
  onQuestClick,
}: DailyQuestsProps) {
  const allCompleted = completedCount === quests.length && quests.length > 0

  return (
    <div className={cn('rounded-xl border bg-white p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Daily Quests</h3>
        </div>
        <div className="flex items-center gap-2">
          {allCompleted && <Trophy className="h-5 w-5 text-yellow-500" />}
          <span
            className={cn(
              'rounded-full px-2 py-0.5 text-sm font-medium',
              allCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
            )}
          >
            {completedCount}/{quests.length}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {quests.map(quest => (
          <QuestItem key={quest.id} quest={quest} onClick={() => onQuestClick?.(quest)} />
        ))}
      </div>

      {allCompleted && (
        <div className="mt-4 rounded-lg bg-green-50 p-3 text-center">
          <p className="font-medium text-green-700">🎉 All quests completed!</p>
          <p className="text-sm text-green-600">+{totalXp} XP earned today</p>
        </div>
      )}
    </div>
  )
}

function QuestItem({ quest, onClick }: { quest: Quest; onClick?: () => void }) {
  const Icon = quest.completed ? CheckCircle2 : Circle
  const progressPercent = Math.min(100, (quest.progress / quest.quest.requirement) * 100)

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors',
        quest.completed ? 'bg-green-50 hover:bg-green-100' : 'bg-gray-50 hover:bg-gray-100'
      )}
    >
      <Icon
        className={cn(
          'h-5 w-5 flex-shrink-0',
          quest.completed ? 'text-green-500' : 'text-gray-400'
        )}
      />

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-sm font-medium',
            quest.completed ? 'text-green-700' : 'text-gray-700'
          )}
        >
          {quest.quest.title}
        </p>
        <p className="truncate text-xs text-gray-500">{quest.quest.description}</p>

        {!quest.completed && quest.progress > 0 && (
          <div className="mt-1.5">
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-blue-500 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="mt-0.5 text-xs text-gray-500">
              {quest.progress}/{quest.quest.requirement}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
        +{quest.quest.xpReward} XP
      </div>
    </button>
  )
}
