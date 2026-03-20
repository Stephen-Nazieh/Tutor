/**
 * ActivePollView
 * Displays an active poll with live results
 */

'use client'

import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Poll, PollType } from './types'
import {
  calculatePollStatistics,
  getRemainingTime,
  formatRemainingTime,
  isPollExpired,
  getWordCloudData,
} from './utils/pollCalculations'
import { BarChart3, Clock, Users, Square, TrendingUp } from 'lucide-react'

interface ActivePollViewProps {
  poll: Poll
  totalStudents: number
  onEnd: () => void
}

export function ActivePollView({ poll, totalStudents, onEnd }: ActivePollViewProps) {
  const [currentTime, setCurrentTime] = useState(Date.now())
  const stats = calculatePollStatistics(poll, totalStudents)
  const remainingTime = getRemainingTime(poll)
  const expired = isPollExpired(poll)

  // Update timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const renderPollResults = () => {
    switch (poll.type) {
      case 'word_cloud':
        return <WordCloudResults poll={poll} />
      case 'short_answer':
        return <ShortAnswerResults poll={poll} />
      case 'rating':
        return <RatingResults poll={poll} stats={stats} />
      case 'multiple_choice':
      case 'true_false':
      default:
        return <ChoiceResults poll={poll} stats={stats} />
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <Badge className="mb-2 border-green-200 bg-green-100 text-green-700">● Live</Badge>
          <h4 className="font-medium text-gray-900">{poll.question}</h4>
          <p className="mt-1 text-sm text-gray-500">
            {poll.type.replace('_', ' ')} • {poll.isAnonymous ? 'Anonymous' : 'Named'}
          </p>
        </div>
        {remainingTime !== null && !expired && (
          <div className="flex items-center gap-1 rounded bg-orange-50 px-2 py-1 text-orange-600">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-medium">{formatRemainingTime(remainingTime)}</span>
          </div>
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard icon={<Users className="h-4 w-4" />} value={stats.totalVotes} label="Responses" />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          value={`${stats.participationRate}%`}
          label="Participation"
        />
        <StatCard
          icon={<BarChart3 className="h-4 w-4" />}
          value={totalStudents - stats.totalVotes}
          label="Remaining"
        />
      </div>

      {/* Progress bar for participation */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Class Participation</span>
          <span className="font-medium">{stats.participationRate}%</span>
        </div>
        <Progress value={stats.participationRate} className="h-2" />
      </div>

      {/* Results */}
      <div className="rounded-lg border bg-gray-50 p-4">
        <h5 className="mb-3 text-sm font-medium text-gray-700">Live Results</h5>
        {renderPollResults()}
      </div>

      {/* Actions */}
      <Button onClick={onEnd} variant="destructive" className="w-full">
        <Square className="mr-2 h-4 w-4" />
        End Poll
      </Button>
    </div>
  )
}

// Choice Results (Multiple Choice / True-False)
function ChoiceResults({
  poll,
  stats,
}: {
  poll: Poll
  stats: ReturnType<typeof calculatePollStatistics>
}) {
  const maxCount = Math.max(...stats.optionStats.map(s => s.count), 1)

  return (
    <div className="space-y-3">
      {poll.options.map((option, index) => {
        const stat = stats.optionStats.find(s => s.optionId === option.id)
        const count = stat?.count || 0
        const percentage = stat?.percentage || 0
        const isLeader = count === maxCount && count > 0

        return (
          <div key={option.id} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: getOptionColor(index) }}
                >
                  {option.label}
                </span>
                <span className="font-medium">{option.text}</span>
                {isLeader && count > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Leading
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">{count} votes</span>
                <span className="w-10 text-right font-medium">{percentage}%</span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${percentage}%`,
                  backgroundColor: getOptionColor(index),
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Rating Results
function RatingResults({
  poll,
  stats,
}: {
  poll: Poll
  stats: ReturnType<typeof calculatePollStatistics>
}) {
  const maxCount = Math.max(...stats.optionStats.map(s => s.count), 1)

  return (
    <div className="space-y-3">
      <div className="mb-4 flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map(rating => {
          const stat = stats.optionStats.find(s => {
            const option = poll.options.find(o => o.id === s.optionId)
            return option && parseInt(option.label) === rating
          })
          const count = stat?.count || 0
          const hasVotes = count > 0

          return (
            <div
              key={rating}
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-colors',
                hasVotes ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              )}
            >
              {rating}
            </div>
          )
        })}
      </div>

      {poll.options.map((option, index) => {
        const stat = stats.optionStats.find(s => s.optionId === option.id)
        const count = stat?.count || 0
        const percentage = stat?.percentage || 0

        return (
          <div key={option.id} className="flex items-center gap-3">
            <span className="w-8 font-medium text-gray-700">{option.label}</span>
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-200">
              <div
                className="flex h-full items-center justify-end rounded-full bg-blue-500 pr-2 transition-all duration-500 ease-out"
                style={{ width: `${percentage}%` }}
              >
                {percentage > 15 && <span className="text-xs font-medium text-white">{count}</span>}
              </div>
            </div>
            <span className="w-10 text-right text-sm text-gray-500">{percentage}%</span>
          </div>
        )
      })}
    </div>
  )
}

// Word Cloud Results
function WordCloudResults({ poll }: { poll: Poll }) {
  const wordData = getWordCloudData(poll)
  const maxCount = Math.max(...wordData.map(w => w.count), 1)

  if (wordData.length === 0) {
    return <div className="py-8 text-center text-gray-400">Waiting for responses...</div>
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 p-4">
      {wordData.slice(0, 30).map(({ word, count }) => {
        const size = Math.max(0.75, (count / maxCount) * 2)
        const opacity = Math.max(0.5, count / maxCount)

        return (
          <span
            key={word}
            className="inline-block rounded-full bg-blue-100 px-2 py-1 text-blue-800 transition-all"
            style={{
              fontSize: `${size}rem`,
              opacity,
            }}
          >
            {word}
            <span className="ml-1 text-xs opacity-60">({count})</span>
          </span>
        )
      })}
    </div>
  )
}

// Short Answer Results
function ShortAnswerResults({ poll }: { poll: Poll }) {
  const responses = poll.responses?.filter(r => r.textAnswer?.trim()) || []

  if (responses.length === 0) {
    return <div className="py-8 text-center text-gray-400">Waiting for responses...</div>
  }

  return (
    <div className="max-h-64 space-y-2 overflow-y-auto">
      {responses.map((response, index) => (
        <div key={response.id || index} className="rounded-lg border bg-white p-3 text-sm">
          {response.textAnswer}
        </div>
      ))}
    </div>
  )
}

// Stat Card Component
function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode
  value: React.ReactNode
  label: string
}) {
  return (
    <div className="rounded-lg border bg-white p-3 text-center">
      <div className="mb-1 flex justify-center text-gray-400">{icon}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}

// Helper function for option colors
function getOptionColor(index: number): string {
  const colors = [
    '#3b82f6', // blue-500
    '#10b981', // emerald-500
    '#f59e0b', // amber-500
    '#ef4444', // red-500
    '#8b5cf6', // violet-500
    '#ec4899', // pink-500
  ]
  return colors[index % colors.length]
}
