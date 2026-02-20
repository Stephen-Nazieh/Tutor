'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  ChevronLeft,
  Brain,
  Clock,
  RotateCcw,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  Trophy,
  BarChart3
} from 'lucide-react'

interface ReviewSession {
  id: string
  contentId: string
  contentTitle: string
  subject: string
  currentRetention: number
  recommendedMode: 'quick' | 'full' | 'quiz'
  estimatedTime: number
}

interface Flashcard {
  id: string
  front: string
  back: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export default function ReviewPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const contentId = params.contentId as string
  const reviewId = searchParams.get('reviewId')

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState<ReviewSession | null>(null)
  const [mode, setMode] = useState<'select' | 'flashcard' | 'quiz' | 'complete'>('select')
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)
  const [results, setResults] = useState<{ easy: number; medium: number; hard: number }>({ easy: 0, medium: 0, hard: 0 })
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])

  useEffect(() => {
    fetchReviewSession()
  }, [contentId])

  const fetchReviewSession = async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/student/reviews/session?contentId=${contentId}`)
      const data = await res.json()

      if (data.success) {
        setSession(data.data)
        setFlashcards(data.data.flashcards || generateMockFlashcards())
      } else {
        toast.error('Failed to load review session')
      }
    } catch (error) {
      console.error('Error fetching review session:', error)
      toast.error('Failed to load review session')
    } finally {
      setLoading(false)
    }
  }

  // Mock flashcards generator - in real app, fetch from API
  const generateMockFlashcards = (): Flashcard[] => [
    { id: '1', front: 'What is the primary function of mitochondria?', back: 'To produce ATP (energy) through cellular respiration', difficulty: 'medium' },
    { id: '2', front: 'Define photosynthesis', back: 'The process by which plants convert light energy into chemical energy (glucose)', difficulty: 'easy' },
    { id: '3', front: 'What is the difference between mitosis and meiosis?', back: 'Mitosis produces 2 identical daughter cells; Meiosis produces 4 genetically different cells', difficulty: 'hard' },
    { id: '4', front: 'Name the 4 nitrogenous bases in DNA', back: 'Adenine (A), Thymine (T), Guanine (G), Cytosine (C)', difficulty: 'easy' },
    { id: '5', front: 'What is natural selection?', back: 'The process where organisms better adapted to their environment tend to survive and reproduce more', difficulty: 'medium' }
  ]

  const handleStartReview = (selectedMode: 'quick' | 'full' | 'quiz') => {
    setMode(selectedMode === 'quiz' ? 'quiz' : 'flashcard')
  }

  const handleCardRating = (rating: 'easy' | 'medium' | 'hard') => {
    setResults(prev => ({ ...prev, [rating]: prev[rating] + 1 }))
    
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(prev => prev + 1)
      setShowAnswer(false)
    } else {
      completeReview()
    }
  }

  const completeReview = async () => {
    try {
      // Calculate performance score
      const total = results.easy + results.medium + results.hard + 1 // +1 for current card
      const performance = Math.round(
        ((results.easy * 100) + (results.medium * 70) + (results.hard * 40)) / total
      )

      // Record review completion
      await fetch('/api/student/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contentId, performance })
      })

      setMode('complete')
    } catch (error) {
      toast.error('Failed to save review progress')
    }
  }

  const getRetentionColor = (retention: number) => {
    if (retention >= 80) return 'text-green-600'
    if (retention >= 60) return 'text-yellow-600'
    if (retention >= 40) return 'text-orange-600'
    return 'text-red-600'
  }

  const getRetentionBg = (retention: number) => {
    if (retention >= 80) return 'bg-green-50 border-green-200'
    if (retention >= 60) return 'bg-yellow-50 border-yellow-200'
    if (retention >= 40) return 'bg-orange-50 border-orange-200'
    return 'bg-red-50 border-red-200'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading review session...</p>
        </div>
      </div>
    )
  }

  // Mode Selection Screen
  if (mode === 'select') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="icon" onClick={() => router.push('/student/dashboard')}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Review Session</h1>
              <p className="text-gray-500">{session?.contentTitle || 'Content Review'}</p>
            </div>
          </div>

          {/* Retention Status */}
          <Card className={cn("mb-6 border-2", getRetentionBg(session?.currentRetention || 50))}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Current Retention</p>
                  <p className={cn("text-3xl font-bold", getRetentionColor(session?.currentRetention || 50))}>
                    {session?.currentRetention || 0}%
                  </p>
                </div>
                <div className="p-4 bg-white rounded-full">
                  <Brain className={cn("w-8 h-8", getRetentionColor(session?.currentRetention || 50))} />
                </div>
              </div>
              <Progress value={session?.currentRetention || 0} className="mt-4 h-2" />
              <p className="text-sm mt-2 text-gray-600">
                {session?.currentRetention && session.currentRetention >= 60 
                  ? 'Your memory of this content is stable. A quick review will keep it fresh.'
                  : 'This content needs attention. We recommend a thorough review.'}
              </p>
            </CardContent>
          </Card>

          {/* Review Mode Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:border-blue-300 transition-colors" onClick={() => handleStartReview('quick')}>
              <CardContent className="pt-6">
                <div className="p-3 bg-blue-50 rounded-full w-fit mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Quick Review</h3>
                <p className="text-sm text-gray-500 mb-4">
                  5-minute rapid flashcard session
                </p>
                <Badge variant="outline">5 min</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-purple-300 transition-colors" onClick={() => handleStartReview('full')}>
              <CardContent className="pt-6">
                <div className="p-3 bg-purple-50 rounded-full w-fit mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Full Review</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Complete content recap with examples
                </p>
                <Badge variant="outline">15-20 min</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:border-green-300 transition-colors" onClick={() => handleStartReview('quiz')}>
              <CardContent className="pt-6">
                <div className="p-3 bg-green-50 rounded-full w-fit mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Practice Quiz</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Test your knowledge with questions
                </p>
                <Badge variant="outline">10-15 min</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Back to Content */}
          <div className="mt-8 text-center">
            <Button variant="outline" onClick={() => router.push(`/student/content/${contentId}`)}>
              <BookOpen className="w-4 h-4 mr-2" />
              Back to Content
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Flashcard Mode
  if (mode === 'flashcard') {
    const currentCard = flashcards[currentCardIndex]
    const progress = ((currentCardIndex + 1) / flashcards.length) * 100

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={() => setMode('select')}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                Card {currentCardIndex + 1} of {flashcards.length}
              </span>
            </div>
          </div>

          {/* Progress */}
          <Progress value={progress} className="mb-6 h-2" />

          {/* Flashcard */}
          <Card className="min-h-[300px] flex flex-col">
            <CardContent className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              {!showAnswer ? (
                <>
                  <Badge variant="outline" className="mb-4">
                    {currentCard.difficulty === 'easy' ? 'Basic' : currentCard.difficulty === 'medium' ? 'Intermediate' : 'Advanced'}
                  </Badge>
                  <h3 className="text-xl font-medium mb-4">{currentCard.front}</h3>
                  <Button onClick={() => setShowAnswer(true)} className="mt-4">
                    Show Answer
                  </Button>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-700 mb-6">{currentCard.back}</p>
                  <div className="w-full">
                    <p className="text-sm text-gray-500 mb-3">How well did you know this?</p>
                    <div className="grid grid-cols-3 gap-3">
                      <Button 
                        variant="outline" 
                        className="border-red-200 hover:bg-red-50"
                        onClick={() => handleCardRating('hard')}
                      >
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        Hard
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-yellow-200 hover:bg-yellow-50"
                        onClick={() => handleCardRating('medium')}
                      >
                        <RotateCcw className="w-4 h-4 mr-2 text-yellow-500" />
                        Medium
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-200 hover:bg-green-50"
                        onClick={() => handleCardRating('easy')}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Easy
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Skip Option */}
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" onClick={() => handleCardRating('medium')}>
              Skip this card
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Completion Screen
  if (mode === 'complete') {
    const totalCards = flashcards.length
    const correct = results.easy + results.medium
    const accuracy = Math.round((correct / totalCards) * 100)

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <Card className="text-center">
            <CardContent className="pt-8 pb-8">
              <div className="p-4 bg-green-50 rounded-full w-fit mx-auto mb-4">
                <Trophy className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Review Complete!</h2>
              <p className="text-gray-500 mb-6">
                Great job! You've strengthened your memory of this content.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{results.easy}</p>
                  <p className="text-xs text-gray-500">Easy</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{results.medium}</p>
                  <p className="text-xs text-gray-500">Medium</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-red-600">{results.hard}</p>
                  <p className="text-xs text-gray-500">Hard</p>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg mb-6">
                <p className="text-sm text-blue-700">
                  Your next review for this content is scheduled in {session?.currentRetention && session.currentRetention > 80 ? '7 days' : '3 days'}
                </p>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => router.push('/student/dashboard')}>
                  Dashboard
                </Button>
                <Button className="flex-1" onClick={() => router.push('/student/scores')}>
                  View Scores
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
