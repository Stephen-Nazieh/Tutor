/**
 * PollResults
 * Displays final poll results after poll has ended
 */

'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Poll } from './types'
import { calculatePollStatistics, getWordCloudData } from './utils/pollCalculations'
import { Users, Clock, BarChart3 } from 'lucide-react'

interface PollResultsProps {
  poll: Poll
  totalStudents?: number
  className?: string
}

export function PollResults({ poll, totalStudents = 0, className }: PollResultsProps) {
  const stats = calculatePollStatistics(poll, totalStudents || poll.totalResponses)

  return (
    <div className={cn('rounded-lg border bg-white p-4', className)}>
      {/* Header */}
      <div className="mb-4">
        <Badge variant="secondary" className="mb-2">
          {poll.type.replace('_', ' ')}
        </Badge>
        <h4 className="font-medium text-gray-900">{poll.question}</h4>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {stats.totalVotes} responses
          </span>
          {totalStudents > 0 && (
            <span className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              {stats.participationRate}% participation
            </span>
          )}
          {poll.startedAt && poll.endedAt && (
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {Math.round(
                (new Date(poll.endedAt).getTime() - new Date(poll.startedAt).getTime()) / 1000
              )}
              s
            </span>
          )}
        </div>
      </div>

      {/* Results Content */}
      <div className="mt-4">
        <PollResultsContent poll={poll} stats={stats} />
      </div>
    </div>
  )
}

// Results content based on poll type
function PollResultsContent({
  poll,
  stats,
}: {
  poll: Poll
  stats: ReturnType<typeof calculatePollStatistics>
}) {
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
        const isCorrect = poll.correctOptionId === option.id

        return (
          <div key={option.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white',
                    isCorrect && 'ring-2 ring-green-400 ring-offset-1'
                  )}
                  style={{ backgroundColor: getOptionColor(index) }}
                >
                  {option.label}
                </span>
                <span className="font-medium text-gray-900">{option.text}</span>
                {isLeader && (
                  <Badge variant="secondary" className="text-xs">
                    Most Voted
                  </Badge>
                )}
                {isCorrect && (
                  <Badge className="border-green-200 bg-green-100 text-xs text-green-700">
                    Correct
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">{count} votes</span>
                <span className="w-10 text-right font-medium">{percentage}%</span>
              </div>
            </div>
            <Progress value={percentage} className="h-2" />
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
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map(rating => {
          const stat = stats.optionStats.find(s => {
            const option = poll.options.find(o => o.id === s.optionId)
            return option && parseInt(option.label) === rating
          })
          const count = stat?.count || 0
          const hasVotes = count > 0
          const isMax = count === maxCount && count > 0

          return (
            <div key={rating} className="text-center">
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold transition-all',
                  isMax
                    ? 'scale-110 bg-blue-500 text-white shadow-lg'
                    : hasVotes
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-400'
                )}
              >
                {rating}
              </div>
              <div className="mt-1 text-xs text-gray-500">{count}</div>
            </div>
          )
        })}
      </div>

      {/* Rating distribution bars */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map(rating => {
          const stat = stats.optionStats.find(s => {
            const option = poll.options.find(o => o.id === s.optionId)
            return option && parseInt(option.label) === rating
          })
          const count = stat?.count || 0
          const percentage = stat?.percentage || 0

          return (
            <div key={rating} className="flex items-center gap-3">
              <span className="w-6 font-medium text-gray-700">{rating}</span>
              <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-10 text-right text-sm text-gray-500">{percentage}%</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Word Cloud Results
function WordCloudResults({ poll }: { poll: Poll }) {
  const wordData = getWordCloudData(poll)
  const maxCount = Math.max(...wordData.map(w => w.count), 1)

  if (wordData.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        <p>No responses collected</p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 rounded-lg bg-gray-50 p-4">
      {wordData.map(({ word, count }) => {
        const size = 0.75 + (count / maxCount) * 1.5
        const opacity = 0.5 + (count / maxCount) * 0.5

        return (
          <span
            key={word}
            className="inline-block cursor-default rounded-full bg-blue-500 px-3 py-1.5 font-medium text-white transition-all hover:scale-105"
            style={{
              fontSize: `${size}rem`,
              opacity,
            }}
            title={`${word}: ${count} occurrences`}
          >
            {word}
            <span className="ml-1.5 text-xs opacity-75">({count})</span>
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
    return (
      <div className="py-8 text-center text-gray-400">
        <p>No responses collected</p>
      </div>
    )
  }

  return (
    <div className="max-h-80 space-y-2 overflow-y-auto">
      {responses.map((response, index) => (
        <div
          key={response.id || index}
          className="rounded-lg border bg-gray-50 p-3 text-sm transition-colors hover:bg-gray-100"
        >
          <p className="text-gray-900">{response.textAnswer}</p>
          {!poll.isAnonymous && response.studentId && (
            <p className="mt-1 text-xs text-gray-400">Student ID: {response.studentId}</p>
          )}
        </div>
      ))}
    </div>
  )
}

// Helper function for option colors
function getOptionColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}
