'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  X,
  Check,
  RotateCcw,
  ChevronUp,
  Brain,
  Clock,
  Zap,
  Undo2
} from 'lucide-react'

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
      if (position.x < -threshold) return Math.min(1, (Math.abs(position.x) - threshold) / maxOffset)
    } else {
      if (position.y < -threshold) return Math.min(1, (Math.abs(position.y) - threshold) / maxOffset)
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="p-4 bg-green-50 rounded-full w-fit mx-auto mb-4">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Review Complete!</h2>
            <p className="text-gray-500 mb-6">
              You reviewed {cards.length} items
            </p>

            <div className="grid grid-cols-4 gap-3 mb-6">
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-xl font-bold text-green-600">{easy}</p>
                <p className="text-xs text-gray-500">Easy</p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-xl font-bold text-yellow-600">{medium}</p>
                <p className="text-xs text-gray-500">Medium</p>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-xl font-bold text-red-600">{hard}</p>
                <p className="text-xs text-gray-500">Hard</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-gray-600">{skipped}</p>
                <p className="text-xs text-gray-500">Skipped</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => router.push('/student/dashboard')}>
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
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" onClick={() => router.push('/student/dashboard')}>
          <X className="w-5 h-5" />
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
      <div className="relative h-[400px] max-w-md mx-auto">
        {/* Next card (background) */}
        {currentIndex < cards.length - 1 && (
          <Card className="absolute inset-0 scale-95 opacity-50 translate-y-4">
            <CardContent className="h-full flex items-center justify-center">
              <p className="text-gray-400">Next review...</p>
            </CardContent>
          </Card>
        )}

        {/* Current card */}
        <Card
          ref={cardRef}
          className={cn(
            "absolute inset-0 cursor-grab active:cursor-grabbing touch-none",
            exitDirection && "transition-all duration-200"
          )}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) rotate(${rotation}deg)`,
            ...(exitDirection === 'right' && { transform: 'translate(200%, 0) rotate(20deg)', opacity: 0 }),
            ...(exitDirection === 'left' && { transform: 'translate(-200%, 0) rotate(-20deg)', opacity: 0 }),
            ...(exitDirection === 'up' && { transform: 'translate(0, -200%)', opacity: 0 }),
            ...(exitDirection === 'down' && { transform: 'translate(0, 200%)', opacity: 0 })
          }}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="h-full flex flex-col p-6">
            {/* Swipe Hints */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg">
              {/* Easy hint (right) */}
              <div 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-green-500 rounded-full transition-opacity"
                style={{ opacity: position.x > 50 ? getHintOpacity() : 0 }}
              >
                <Check className="w-8 h-8 text-white" />
              </div>
              
              {/* Hard hint (left) */}
              <div 
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-red-500 rounded-full transition-opacity"
                style={{ opacity: position.x < -50 ? getHintOpacity() : 0 }}
              >
                <RotateCcw className="w-8 h-8 text-white" />
              </div>
              
              {/* Medium hint (up) */}
              <div 
                className="absolute top-4 left-1/2 -translate-x-1/2 p-3 bg-yellow-500 rounded-full transition-opacity"
                style={{ opacity: position.y < -50 ? getHintOpacity() : 0 }}
              >
                <Zap className="w-8 h-8 text-white" />
              </div>
              
              {/* Skip hint (down) */}
              <div 
                className="absolute bottom-4 left-1/2 -translate-x-1/2 p-3 bg-gray-500 rounded-full transition-opacity"
                style={{ opacity: position.y > 50 ? getHintOpacity() : 0 }}
              >
                <Undo2 className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Badge 
                variant="outline" 
                className="mb-4"
                style={{ borderColor: currentCard.subjectColor }}
              >
                {currentCard.subjectName}
              </Badge>

              <h3 className="text-xl font-semibold mb-4">{currentCard.contentTitle}</h3>

              {!showAnswer ? (
                <Button onClick={() => setShowAnswer(true)} size="lg">
                  <Brain className="w-5 h-5 mr-2" />
                  Show Answer
                </Button>
              ) : (
                <div className="space-y-4 w-full">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      How well did you remember this?
                    </p>
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
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Current Retention</span>
                <span>{currentCard.currentRetention}%</span>
              </div>
              <Progress value={currentCard.currentRetention} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="max-w-md mx-auto mt-8">
        <p className="text-center text-sm text-gray-500 mb-4">
          Swipe to rate, or use buttons below
        </p>
        
        <div className="grid grid-cols-4 gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSwipe('left')}
            className="flex flex-col items-center py-3 h-auto border-red-200"
          >
            <RotateCcw className="w-4 h-4 mb-1 text-red-500" />
            <span className="text-xs">Hard</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSwipe('down')}
            className="flex flex-col items-center py-3 h-auto"
          >
            <Undo2 className="w-4 h-4 mb-1" />
            <span className="text-xs">Skip</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSwipe('up')}
            className="flex flex-col items-center py-3 h-auto border-yellow-200"
          >
            <Zap className="w-4 h-4 mb-1 text-yellow-500" />
            <span className="text-xs">Medium</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleSwipe('right')}
            className="flex flex-col items-center py-3 h-auto border-green-200"
          >
            <Check className="w-4 h-4 mb-1 text-green-500" />
            <span className="text-xs">Easy</span>
          </Button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Keyboard: ← Hard • ↓ Skip • ↑ Medium → Easy • Space Show Answer
        </p>
      </div>
    </div>
  )
}
