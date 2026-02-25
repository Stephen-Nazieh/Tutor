'use client'

import { useEffect, useState, useCallback, useRef, useMemo } from 'react'

interface UseBreakoutTimerProps {
  initialSeconds: number
  isActive: boolean
  onWarning?: (secondsRemaining: number) => void
  onComplete?: () => void
}

interface UseBreakoutTimerReturn {
  timeRemaining: number
  formattedTime: string
  isWarning: boolean
  progress: number
}

export function useBreakoutTimer({
  initialSeconds,
  isActive,
  onWarning,
  onComplete
}: UseBreakoutTimerProps): UseBreakoutTimerReturn {
  const [timeRemaining, setTimeRemaining] = useState(initialSeconds)
  const warningFired = useRef(false)
  
  // Reset timer when initialSeconds changes
  useEffect(() => {
    setTimeRemaining(initialSeconds)
    warningFired.current = false
  }, [initialSeconds])
  
  // Countdown logic
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newValue = prev - 1
        
        // Fire warning at 60 seconds
        if (newValue === 60 && !warningFired.current) {
          warningFired.current = true
          onWarning?.(60)
        }
        
        // Fire warning at 30 seconds
        if (newValue === 30 && !warningFired.current) {
          onWarning?.(30)
        }
        
        // Complete when reaching 0
        if (newValue <= 0) {
          onComplete?.()
        }
        
        return Math.max(0, newValue)
      })
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isActive, timeRemaining, onWarning, onComplete])
  
  // Format time as MM:SS
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60)
    const seconds = timeRemaining % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }, [timeRemaining])
  
  // Check if in warning state (less than 60 seconds)
  const isWarning = timeRemaining < 60 && timeRemaining > 0
  
  // Calculate progress (0 to 1)
  const progress = initialSeconds > 0 ? timeRemaining / initialSeconds : 0
  
  return {
    timeRemaining,
    formattedTime,
    isWarning,
    progress
  }
}


