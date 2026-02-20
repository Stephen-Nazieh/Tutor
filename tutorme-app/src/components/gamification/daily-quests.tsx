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
    <div className={cn('bg-white rounded-xl p-4 border', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <h3 className="font-semibold text-gray-800">Daily Quests</h3>
        </div>
        <div className="flex items-center gap-2">
          {allCompleted && (
            <Trophy className="w-5 h-5 text-yellow-500" />
          )}
          <span className={cn(
            'text-sm font-medium px-2 py-0.5 rounded-full',
            allCompleted ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
          )}>
            {completedCount}/{quests.length}
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {quests.map((quest) => (
          <QuestItem 
            key={quest.id} 
            quest={quest} 
            onClick={() => onQuestClick?.(quest)}
          />
        ))}
      </div>

      {allCompleted && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg text-center">
          <p className="text-green-700 font-medium">🎉 All quests completed!</p>
          <p className="text-green-600 text-sm">+{totalXp} XP earned today</p>
        </div>
      )}
    </div>
  )
}

function QuestItem({ 
  quest, 
  onClick 
}: { 
  quest: Quest
  onClick?: () => void 
}) {
  const Icon = quest.completed ? CheckCircle2 : Circle
  const progressPercent = Math.min(100, (quest.progress / quest.quest.requirement) * 100)

  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left',
        quest.completed 
          ? 'bg-green-50 hover:bg-green-100' 
          : 'bg-gray-50 hover:bg-gray-100'
      )}
    >
      <Icon className={cn(
        'w-5 h-5 flex-shrink-0',
        quest.completed ? 'text-green-500' : 'text-gray-400'
      )} />
      
      <div className="flex-1 min-w-0">
        <p className={cn(
          'font-medium text-sm truncate',
          quest.completed ? 'text-green-700' : 'text-gray-700'
        )}>
          {quest.quest.title}
        </p>
        <p className="text-xs text-gray-500 truncate">
          {quest.quest.description}
        </p>
        
        {!quest.completed && quest.progress > 0 && (
          <div className="mt-1.5">
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              {quest.progress}/{quest.quest.requirement}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
        +{quest.quest.xpReward} XP
      </div>
    </button>
  )
}
