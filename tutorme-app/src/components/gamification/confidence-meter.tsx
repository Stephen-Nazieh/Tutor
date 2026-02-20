/**
 * Real-time Confidence Meter
 * 
 * Displays confidence score during AI conversation
 */

'use client'

import { useEffect, useState } from 'react'
import { Mic, MicOff, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ConfidenceMeterProps {
  isListening: boolean
  confidenceScore: number
  className?: string
}

export function ConfidenceMeter({
  isListening,
  confidenceScore,
  className,
}: ConfidenceMeterProps) {
  const [displayScore, setDisplayScore] = useState(confidenceScore)
  const [pulses, setPulses] = useState(0)

  // Animate score changes
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayScore(prev => {
        const diff = confidenceScore - prev
        if (Math.abs(diff) < 0.5) return confidenceScore
        return prev + diff * 0.1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [confidenceScore])

  // Pulse animation when listening
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        setPulses(p => (p + 1) % 4)
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isListening])

  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-500'
    if (score >= 60) return 'text-blue-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-orange-500'
  }

  const getBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-blue-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-orange-500'
  }

  return (
    <div className={cn(
      'flex items-center gap-3 px-4 py-2 rounded-full transition-colors',
      isListening ? 'bg-red-50' : 'bg-gray-50',
      className
    )}>
      {/* Listening indicator */}
      <div className={cn(
        'relative w-8 h-8 rounded-full flex items-center justify-center',
        isListening ? 'bg-red-500' : 'bg-gray-200'
      )}>
        {isListening ? (
          <>
            <Mic className="w-4 h-4 text-white" />
            {/* Ripple effect */}
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={cn(
                  'absolute inset-0 rounded-full bg-red-500 opacity-0',
                  pulses === i && 'animate-ping'
                )}
              />
            ))}
          </>
        ) : (
          <MicOff className="w-4 h-4 text-gray-500" />
        )}
      </div>

      {/* Confidence display */}
      <div className="flex items-center gap-2">
        <Activity className={cn('w-4 h-4', getColor(displayScore))} />
        <div>
          <div className="flex items-baseline gap-1">
            <span className={cn('text-lg font-bold', getColor(displayScore))}>
              {Math.round(displayScore)}%
            </span>
            <span className="text-xs text-gray-500">confidence</span>
          </div>
          
          {/* Mini progress bar */}
          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-300', getBgColor(displayScore))}
              style={{ width: `${displayScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Status text */}
      {isListening && (
        <span className="text-xs text-red-600 font-medium animate-pulse">
          Listening...
        </span>
      )}
    </div>
  )
}
