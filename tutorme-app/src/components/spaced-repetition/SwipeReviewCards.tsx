'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { X, Check, RotateCcw, ChevronUp, Brain, Clock, Zap, Undo2 } from 'lucide-react'

interface ReviewCard {
  id: string
  contentId: string
  contentTitle: string
  subjectName: string
  subjectColor: string
  currentRetention: number
  difficulty: 'easy' | 'medium' | 'hard'
}

interface SwipeReviewCardsProps {
  cards: ReviewCard[]
  onComplete: (results: Record<string, 'easy' | 'medium' | 'hard' | 'skipped'>) => void
}

export function SwipeReviewCards({ cards, onComplete }: SwipeReviewCardsProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [results, setResults] = useState<Record<string, 'easy' | 'medium' | 'hard' | 'skipped'>>({})
  const [showAnswer, setShowAnswer] = useState(false)
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | 'up' | 'down' | null>(null)

  // Touch/drag state
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const startPos = useRef({ x: 0, y: 0 })

  const currentCard = cards[currentIndex]
  const isComplete = currentIndex >= cards.length

  // Handle swipe action
  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    if (!currentCard) return

    setExitDirection(direction)

    setTimeout(() => {
      let rating: 'easy' | 'medium' | 'hard' | 'skipped'

      switch (direction) {
        case 'right': // Easy - 4+ days
          rating = 'easy'
          break
        case 'up': // Medium - 2-3 days
          rating = 'medium'
          break
        case 'left': // Hard - 1 day
          rating = 'hard'
          break
        case 'down': // Skip
          rating = 'skipped'
          break
        default:
          rating = 'medium'
      }

      setResults(prev => ({ ...prev, [currentCard.id]: rating }))
      setCurrentIndex(prev => prev + 1)
      setPosition({ x: 0, y: 0 })
      setExitDirection(null)
      setShowAnswer(false)
    }, 200)
  }

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    startPos.current = { x: clientX, y: clientY }
  }

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    const deltaX = clientX - startPos.current.x
    const deltaY = clientY - startPos.current.y

    setPosition({ x: deltaX, y: deltaY })
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100
    const { x, y } = position

    if (Math.abs(x) > Math.abs(y)) {
      // Horizontal swipe
      if (x > threshold) {
        handleSwipe('right') // Easy
      } else if (x < -threshold) {
        handleSwipe('left') // Hard
      } else {
        setPosition({ x: 0, y: 0 })
      }
    } else {
      // Vertical swipe
      if (y < -threshold) {
        handleSwipe('up') // Medium
      } else if (y > threshold) {
        handleSwipe('down') // Skip
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isComplete) return

      switch (e.key) {
        case 'ArrowRight':
          handleSwipe('right')
          break
        case 'ArrowLeft':
          handleSwipe('left')
          break
        case 'ArrowUp':
          handleSwipe('up')
          break
        case 'ArrowDown':
          handleSwipe('down')
          break
        case ' ':
          e.preventDefault()
          setShowAnswer(true)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, isComplete])

  // Calculate rotation based on position
  const rotation = position.x * 0.05

  // Get swipe hint opacity
  const getHintOpacity = () => {
    const threshold = 50
    const maxOffset = 150

    if (Math.abs(position.x) > Math.abs(position.y)) {
      if (position.x > threshold) return Math.min(1, (position.x - threshold) / maxOffset)
      if (position.x < -threshold)
        return Math.min(1, (Math.abs(position.x) - threshold) / maxOffset)
    } else {
      if (position.y < -threshold)
        return Math.min(1, (Math.abs(position.y) - threshold) / maxOffset)
      if (position.y > threshold) return Math.min(1, (position.y - threshold) / maxOffset)
    }
    return 0
  }

  if (isComplete) {
    const easy = Object.values(results).filter(r => r === 'easy').length
    const medium = Object.values(results).filter(r => r === 'medium').length
    const hard = Object.values(results).filter(r => r === 'hard').length
    const skipped = Object.values(results).filter(r => r === 'skipped').length

    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pb-8 pt-8">
            <div className="mx-auto mb-4 w-fit rounded-full bg-green-50 p-4">
              <Check className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="mb-2 text-2xl font-bold">Review Complete!</h2>
            <p className="mb-6 text-gray-500">You reviewed {cards.length} items</p>

            <div className="mb-6 grid grid-cols-4 gap-3">
              <div className="rounded-lg bg-green-50 p-3">
                <p className="text-xl font-bold text-green-600">{easy}</p>
                <p className="text-xs text-gray-500">Easy</p>
              </div>
              <div className="rounded-lg bg-yellow-50 p-3">
                <p className="text-xl font-bold text-yellow-600">{medium}</p>
                <p className="text-xs text-gray-500">Medium</p>
              </div>
              <div className="rounded-lg bg-red-50 p-3">
                <p className="text-xl font-bold text-red-600">{hard}</p>
                <p className="text-xs text-gray-500">Hard</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xl font-bold text-gray-600">{skipped}</p>
                <p className="text-xs text-gray-500">Skipped</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => router.push('/student/dashboard')}
              >
                Dashboard
              </Button>
              <Button className="flex-1" onClick={() => onComplete(results)}>
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.push('/student/dashboard')}>
          <X className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {currentIndex + 1} / {cards.length}
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress */}
      <div className="mb-6">
        <Progress value={(currentIndex / cards.length) * 100} className="h-2" />
      </div>

      {/* Card Stack */}
      <div className="relative mx-auto h-[400px] max-w-md">
        {/* Next card (background) */}
        {currentIndex < cards.length - 1 && (
          <Card className="absolute inset-0 translate-y-4 scale-95 opacity-50">
            <CardContent className="flex h-full items-center justify-center">
              <p className="text-gray-400">Next review...</p>
            </CardContent>
          </Card>
        )}

        {/* Current card */}
        <Card
          ref={cardRef}
          className={cn(
            'absolute inset-0 cursor-grab touch-none active:cursor-grabbing',
            exitDirection && 'transition-all duration-200'
          )}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            ...(exitDirection === 'right' && {
              transform: 'translate(200%, 0) rotate(20deg)',
              opacity: 0,
            }),
            ...(exitDirection === 'left' && {
              transform: 'translate(-200%, 0) rotate(-20deg)',
              opacity: 0,
            }),
            ...(exitDirection === 'up' && { transform: 'translate(0, -200%)', opacity: 0 }),
            ...(exitDirection === 'down' && { transform: 'translate(0, 200%)', opacity: 0 }),
          }}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="flex h-full flex-col p-6">
            {/* Swipe Hints */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
              {/* Easy hint (right) */}
              <div
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-green-500 p-3 transition-opacity"
                style={{ opacity: position.x > 50 ? getHintOpacity() : 0 }}
              >
                <Check className="h-8 w-8 text-white" />
              </div>

              {/* Hard hint (left) */}
              <div
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-red-500 p-3 transition-opacity"
                style={{ opacity: position.x < -50 ? getHintOpacity() : 0 }}
              >
                <RotateCcw className="h-8 w-8 text-white" />
              </div>

              {/* Medium hint (up) */}
              <div
                className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-yellow-500 p-3 transition-opacity"
                style={{ opacity: position.y < -50 ? getHintOpacity() : 0 }}
              >
                <Zap className="h-8 w-8 text-white" />
              </div>

              {/* Skip hint (down) */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gray-500 p-3 transition-opacity"
                style={{ opacity: position.y > 50 ? getHintOpacity() : 0 }}
              >
                <Undo2 className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <Badge
                variant="outline"
                className="mb-4"
                style={{ borderColor: currentCard.subjectColor }}
              >
                {currentCard.subjectName}
              </Badge>

              <h3 className="mb-4 text-xl font-semibold">{currentCard.contentTitle}</h3>

              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} size="lg">
                  <Brain className="mr-2 h-5 w-5" />
                  Show Answer
                </Button>
              ) : (
                <div className="w-full space-y-4">
                  <div className="rounded-lg bg-blue-50 p-4">
                    <p className="text-sm text-blue-800">How well did you remember this?</p>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant="outline"
                      className="border-red-200 hover:bg-red-50"
                      onClick={() => handleSwipe('left')}
                    >
                      Hard
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-200 hover:bg-yellow-50"
                      onClick={() => handleSwipe('up')}
                    >
                      Medium
                    </Button>
                    <Button
                      variant="outline"
                      className="border-green-200 hover:bg-green-50"
                      onClick={() => handleSwipe('right')}
                    >
                      Easy
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Retention indicator */}
            <div className="mt-4">
              <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
                <span>Current Retention</span>
                <span>{currentCard.currentRetention}%</span>
              </div>
              <Progress value={currentCard.currentRetention} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="mx-auto mt-8 max-w-md">
        <p className="mb-4 text-center text-sm text-gray-500">
          Swipe to rate, or use buttons below
        </p>

        <div className="grid grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwipe('left')}
            className="flex h-auto flex-col items-center border-red-200 py-3"
          >
            <RotateCcw className="mb-1 h-4 w-4 text-red-500" />
            <span className="text-xs">Hard</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwipe('down')}
            className="flex h-auto flex-col items-center py-3"
          >
            <Undo2 className="mb-1 h-4 w-4" />
            <span className="text-xs">Skip</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwipe('up')}
            className="flex h-auto flex-col items-center border-yellow-200 py-3"
          >
            <Zap className="mb-1 h-4 w-4 text-yellow-500" />
            <span className="text-xs">Medium</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSwipe('right')}
            className="flex h-auto flex-col items-center border-green-200 py-3"
          >
            <Check className="mb-1 h-4 w-4 text-green-500" />
            <span className="text-xs">Easy</span>
          </Button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">
          Keyboard: ← Hard • ↓ Skip • ↑ Medium → Easy • Space Show Answer
        </p>
      </div>
    </div>
  )
}
