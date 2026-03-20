/**
 * Confidence Tracker Component
 *
 * Displays confidence score with trend indicator
 */

'use client'

import { TrendingUp, TrendingDown, Minus, Award } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConfidenceTrackerProps {
  score: number
  previousScore?: number
  weeklyChange?: number
  className?: string
}

export function ConfidenceTracker({
  score,
  previousScore,
  weeklyChange = 0,
  className,
}: ConfidenceTrackerProps) {
  const hasImproved = weeklyChange > 0
  const hasDeclined = weeklyChange < 0
  const isStable = weeklyChange === 0

  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600'
    if (s >= 60) return 'text-blue-600'
    if (s >= 40) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getScoreBg = (s: number) => {
    if (s >= 80) return 'bg-green-100'
    if (s >= 60) return 'bg-blue-100'
    if (s >= 40) return 'bg-yellow-100'
    return 'bg-orange-100'
  }

  return (
    <div className={cn('rounded-xl border bg-white p-4', className)}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-purple-500" />
          <h3 className="font-semibold text-gray-800">Confidence</h3>
        </div>
        {weeklyChange !== 0 && (
          <div
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-1 text-sm font-medium',
              hasImproved
                ? 'bg-green-100 text-green-700'
                : hasDeclined
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600'
            )}
          >
            {hasImproved && <TrendingUp className="h-4 w-4" />}
            {hasDeclined && <TrendingDown className="h-4 w-4" />}
            {isStable && <Minus className="h-4 w-4" />}
            <span>
              {hasImproved ? '+' : ''}
              {weeklyChange}% this week
            </span>
          </div>
        )}
      </div>

      {/* Main score display */}
      <div className="flex items-center gap-4">
        <div
          className={cn(
            'flex h-20 w-20 items-center justify-center rounded-full',
            getScoreBg(score)
          )}
        >
          <span className={cn('text-2xl font-bold', getScoreColor(score))}>{score}%</span>
        </div>

        <div className="flex-1">
          <p className="mb-2 text-sm text-gray-600">{getConfidenceMessage(score)}</p>

          {/* Mini progress bar */}
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                score >= 80
                  ? 'bg-green-500'
                  : score >= 60
                    ? 'bg-blue-500'
                    : score >= 40
                      ? 'bg-yellow-500'
                      : 'bg-orange-500'
              )}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="mt-4 border-t pt-3">
        <p className="text-xs text-gray-500">
          <span className="font-medium text-gray-700">Tip:</span> {getConfidenceTip(score)}
        </p>
      </div>
    </div>
  )
}

function getConfidenceMessage(score: number): string {
  if (score >= 90) return "Outstanding! You're speaking with great confidence!"
  if (score >= 80) return 'Excellent! Your confidence is shining through!'
  if (score >= 70) return "Great job! You're becoming more confident!"
  if (score >= 60) return 'Good progress! Keep practicing!'
  if (score >= 50) return "You're building confidence. Keep going!"
  if (score >= 40) return 'Making progress. Every attempt helps!'
  return 'Confidence takes time. Be patient with yourself!'
}

function getConfidenceTip(score: number): string {
  if (score >= 80) return 'Challenge yourself with longer speeches and debates.'
  if (score >= 60) return 'Try speaking for 2 minutes without stopping.'
  if (score >= 40) return 'Practice speaking aloud to yourself first.'
  return 'Start with simple sentences. Speed comes with practice.'
}
