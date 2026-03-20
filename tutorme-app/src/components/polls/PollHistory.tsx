/**
 * PollHistory
 * Displays completed polls with results
 */

'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import { Poll } from './types'
import { calculatePollStatistics, getWordCloudData } from './utils/pollCalculations'
import { ChevronDown, ChevronUp, RotateCcw, Trash2, BarChart3, Clock, Users } from 'lucide-react'

interface PollHistoryProps {
  polls: Poll[]
  onReuse: (poll: Poll) => void
  onDelete: (pollId: string) => void
}

export function PollHistory({ polls, onReuse, onDelete }: PollHistoryProps) {
  const [expandedPolls, setExpandedPolls] = useState<Set<string>>(new Set())

  if (polls.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        <BarChart3 className="mx-auto mb-3 h-12 w-12 opacity-50" />
        <p>No completed polls yet</p>
        <p className="mt-1 text-sm">Ended polls will appear here</p>
      </div>
    )
  }

  const toggleExpand = (pollId: string) => {
    setExpandedPolls(prev => {
      const newSet = new Set(prev)
      if (newSet.has(pollId)) {
        newSet.delete(pollId)
      } else {
        newSet.add(pollId)
      }
      return newSet
    })
  }

  return (
    <div className="space-y-3">
      {polls.map(poll => {
        const isExpanded = expandedPolls.has(poll.id)
        return (
          <div key={poll.id} className="overflow-hidden rounded-lg border bg-white">
            <button
              className="w-full p-3 text-left transition-colors hover:bg-gray-50"
              onClick={() => toggleExpand(poll.id)}
            >
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 font-medium text-gray-900">{poll.question}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {poll.type.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-gray-500">
                      {poll.totalResponses || 0} responses
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(poll.endedAt || poll.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="ml-2">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            </button>

            {isExpanded && (
              <div className="border-t bg-gray-50 px-3 pb-3">
                <PollResultsView poll={poll} />

                {/* Actions */}
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReuse(poll)}
                    className="flex-1"
                  >
                    <RotateCcw className="mr-1 h-4 w-4" />
                    Reuse
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(poll.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Poll Results View
function PollResultsView({ poll }: { poll: Poll }) {
  const stats = calculatePollStatistics(poll, poll.totalResponses || 0)

  const renderResults = () => {
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
    <div className="mt-3 space-y-3">
      {/* Summary Stats */}
      <div className="flex gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-600">
          <Users className="h-4 w-4" />
          <span>{stats.totalVotes} responses</span>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <Clock className="h-4 w-4" />
          <span>
            {poll.startedAt && poll.endedAt
              ? `${Math.round((new Date(poll.endedAt).getTime() - new Date(poll.startedAt).getTime()) / 1000)}s`
              : 'N/A'}
          </span>
        </div>
      </div>

      {/* Results */}
      {renderResults()}
    </div>
  )
}

// Choice Results
function ChoiceResults({
  poll,
  stats,
}: {
  poll: Poll
  stats: ReturnType<typeof calculatePollStatistics>
}) {
  return (
    <div className="space-y-2">
      {poll.options.map((option, index) => {
        const stat = stats.optionStats.find(s => s.optionId === option.id)
        const count = stat?.count || 0
        const percentage = stat?.percentage || 0

        return (
          <div key={option.id} className="flex items-center gap-2">
            <span
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: getOptionColor(index) }}
            >
              {option.label}
            </span>
            <span className="flex-1 truncate text-sm">{option.text}</span>
            <div className="flex w-24 items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: getOptionColor(index),
                  }}
                />
              </div>
              <span className="w-8 text-right text-xs text-gray-500">{percentage}%</span>
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
  return (
    <div className="flex items-center justify-center gap-2">
      {[1, 2, 3, 4, 5].map(rating => {
        const stat = stats.optionStats.find(s => {
          const option = poll.options.find(o => o.id === s.optionId)
          return option && parseInt(option.label) === rating
        })
        const count = stat?.count || 0
        const total = stats.totalVotes || 1
        const percentage = Math.round((count / total) * 100)

        return (
          <div key={rating} className="text-center">
            <div
              className={cn(
                'mb-1 flex h-10 w-10 items-center justify-center rounded-lg font-medium',
                count > 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-400'
              )}
            >
              {rating}
            </div>
            <div className="text-xs text-gray-500">{percentage}%</div>
          </div>
        )
      })}
    </div>
  )
}

// Word Cloud Results
function WordCloudResults({ poll }: { poll: Poll }) {
  const wordData = getWordCloudData(poll)

  if (wordData.length === 0) {
    return <p className="py-4 text-center text-sm text-gray-400">No responses</p>
  }

  const maxCount = Math.max(...wordData.map(w => w.count), 1)

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {wordData.slice(0, 20).map(({ word, count }) => {
        const size = Math.max(0.75, (count / maxCount) * 1.5)
        return (
          <span
            key={word}
            className="inline-block rounded-full bg-blue-100 px-2 py-1 text-blue-800"
            style={{ fontSize: `${size}rem` }}
          >
            {word}
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
    return <p className="py-4 text-center text-sm text-gray-400">No responses</p>
  }

  return (
    <div className="max-h-40 space-y-2 overflow-y-auto">
      {responses.slice(0, 10).map((response, index) => (
        <div key={response.id || index} className="rounded border bg-white p-2 text-sm">
          {response.textAnswer}
        </div>
      ))}
      {responses.length > 10 && (
        <p className="text-center text-xs text-gray-400">+{responses.length - 10} more responses</p>
      )}
    </div>
  )
}

// Helper Functions
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

function getOptionColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']
  return colors[index % colors.length]
}
