'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import {
    Clock,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    Flag,
    Send,
    BarChart3,
    RotateCcw,
    Loader2,
    Play
} from 'lucide-react'
import { QuizQuestion, QuestionResult } from '@/types/quiz'

export default function QuizTakingPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const [quizId, setQuizId] = useState<string>('')
    const [loading, setLoading] = useState(true)
    const [starting, setStarting] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    
    // Quiz state
    const [quiz, setQuiz] = useState<any>(null)
    const [questions, setQuestions] = useState<QuizQuestion[]>([])
    const [attemptId, setAttemptId] = useState<string>('')
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
    const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
    const [timeSpent, setTimeSpent] = useState(0)
    const [quizStarted, setQuizStarted] = useState(false)
    const [quizCompleted, setQuizCompleted] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [previousAttempts, setPreviousAttempts] = useState<any[]>([])
    
    // Timer ref
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    // Resolve params
    useEffect(() => {
        params.then(p => setQuizId(p.id))
    }, [params])

    // Fetch quiz
    const fetchQuiz = useCallback(async () => {
        if (!quizId) return
        
        try {
            const res = await fetch(`/api/student/quizzes/${quizId}`)
            if (res.ok) {
                const data = await res.json()
                setQuiz(data.quiz)
                setQuestions(data.questions)
                setPreviousAttempts(data.attempts)
                
                // Check if already completed and can view results
                if (data.attempts.length > 0 && !data.canAttempt) {
                    setQuizCompleted(true)
                    setResults(data.attempts[0])
                }
            } else {
                toast.error('Failed to load quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setLoading(false)
        }
    }, [quizId])

    useEffect(() => {
        fetchQuiz()
    }, [fetchQuiz])

    // Timer effect
    useEffect(() => {
        if (quizStarted && timeRemaining !== null && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev === null || prev <= 1) {
                        // Time's up - auto submit
                        handleSubmit()
                        return 0
                    }
                    return prev - 1
                })
                setTimeSpent(prev => prev + 1)
            }, 1000)
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [quizStarted, timeRemaining])

    // Start quiz
    const handleStart = async () => {
        setStarting(true)
        try {
            const res = await fetch(`/api/student/quizzes/${quizId}/attempt`, {
                method: 'POST'
            })

            if (res.ok) {
                const data = await res.json()
                setAttemptId(data.attemptId)
                setTimeRemaining(data.timeRemaining)
                setQuizStarted(true)
                setCurrentQuestionIndex(0)
                setAnswers({})
            } else {
                const error = await res.json()
                toast.error(error.error || 'Failed to start quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setStarting(false)
        }
    }

    // Submit quiz
    const handleSubmit = async () => {
        if (!attemptId) return
        
        setSubmitting(true)
        try {
            const res = await fetch(`/api/student/quizzes/${quizId}/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    attemptId,
                    answers,
                    timeSpent
                })
            })

            if (res.ok) {
                const data = await res.json()
                setResults(data.attempt)
                setQuizCompleted(true)
                setQuizStarted(false)
                toast.success('Quiz submitted!')
            } else {
                toast.error('Failed to submit quiz')
            }
        } catch (error) {
            toast.error('An error occurred')
        } finally {
            setSubmitting(false)
        }
    }

    // Handle answer selection
    const handleAnswer = (questionId: string, answer: string | string[]) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }))
    }

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const currentQuestion = questions[currentQuestionIndex]
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
    const answeredCount = Object.keys(answers).length

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        )
    }

    if (!quiz) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Quiz not found</p>
            </div>
        )
    }

    // Results view
    if (quizCompleted && results) {
        const percentage = results.percentage
        const passed = quiz.passingScore ? percentage >= quiz.passingScore : percentage >= 70

        return (
            <div className="container mx-auto p-6 max-w-3xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-center">Quiz Results</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Score */}
                        <div className="text-center">
                            <div className={`text-6xl font-bold ${passed ? 'text-green-500' : 'text-red-500'}`}>
                                {percentage}%
                            </div>
                            <p className="text-muted-foreground mt-2">
                                {passed ? 'Congratulations! You passed!' : 'Keep practicing! You\'ll do better next time.'}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold">{results.score}</div>
                                <div className="text-sm text-muted-foreground">Points Earned</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold">{results.maxScore}</div>
                                <div className="text-sm text-muted-foreground">Total Points</div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <div className="text-2xl font-semibold">{formatTime(timeSpent)}</div>
                                <div className="text-sm text-muted-foreground">Time Spent</div>
                            </div>
                        </div>

                        {/* Question Results */}
                        <div className="space-y-3">
                            <h3 className="font-medium">Question Breakdown</h3>
                            {results.questionResults?.map((result: QuestionResult, idx: number) => (
                                <div 
                                    key={result.questionId} 
                                    className={`p-3 rounded-lg border ${result.correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}
                                >
                                    <div className="flex items-start gap-3">
                                        {result.correct ? (
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium">Question {idx + 1}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {result.pointsEarned} / {result.pointsMax} points
                                            </p>
                                            {result.feedback && (
                                                <p className="text-sm mt-1">{result.feedback}</p>
                                            )}
                                            {result.explanation && (
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {result.explanation}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => router.push('/student/quizzes')}>
                                Back to Quizzes
                            </Button>
                            {quiz.canAttempt && (
                                <Button className="flex-1" onClick={() => window.location.reload()}>
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Try Again
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Start screen
    if (!quizStarted) {
        return (
            <div className="container mx-auto p-6 max-w-2xl">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{quiz.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">{quiz.type}</Badge>
                            <Badge variant="outline">{questions.length} questions</Badge>
                            <Badge variant="outline">{quiz.totalPoints} points</Badge>
                            {quiz.timeLimit && (
                                <Badge variant="outline">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {quiz.timeLimit} minutes
                                </Badge>
                            )}
                        </div>

                        {quiz.description && (
                            <p className="text-muted-foreground">{quiz.description}</p>
                        )}

                        <Alert>
                            <AlertCircle className="w-4 h-4" />
                            <AlertDescription>
                                {quiz.timeLimit 
                                    ? `You have ${quiz.timeLimit} minutes to complete this quiz. The quiz will auto-submit when time runs out.`
                                    : 'There is no time limit for this quiz. Take your time and answer carefully.'
                                }
                            </AlertDescription>
                        </Alert>

                        {previousAttempts.length > 0 && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium mb-2">Previous Attempts</h3>
                                <div className="space-y-2">
                                    {previousAttempts.map((attempt, idx) => (
                                        <div key={attempt.id} className="flex items-center justify-between text-sm">
                                            <span>Attempt {idx + 1}</span>
                                            <span className="font-medium">{attempt.score}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Button 
                            size="lg" 
                            className="w-full"
                            onClick={handleStart}
                            disabled={starting}
                        >
                            {starting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
                            {previousAttempts.length > 0 ? 'Retake Quiz' : 'Start Quiz'}
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Quiz taking interface
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="font-semibold">{quiz.title}</h1>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                                <span>{answeredCount} answered</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            {timeRemaining !== null && (
                                <div className={`flex items-center gap-2 font-mono text-lg ${
                                    timeRemaining < 60 ? 'text-red-500' : ''
                                }`}>
                                    <Clock className="w-5 h-5" />
                                    {formatTime(timeRemaining)}
                                </div>
                            )}
                            <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                    if (confirm('Are you sure you want to submit? You cannot change your answers after.')) {
                                        handleSubmit()
                                    }
                                }}
                                disabled={submitting}
                            >
                                {submitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                                Submit
                            </Button>
                        </div>
                    </div>
                    <Progress value={progress} className="mt-4" />
                </div>
            </header>

            {/* Question */}
            <main className="container mx-auto px-4 py-6 max-w-3xl">
                {currentQuestion && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <Badge variant="outline">
                                    {currentQuestion.points} point{currentQuestion.points !== 1 ? 's' : ''}
                                </Badge>
                                {currentQuestion.difficulty && (
                                    <Badge variant="secondary">{currentQuestion.difficulty}</Badge>
                                )}
                            </div>
                            <CardTitle className="text-lg font-medium mt-2">
                                {currentQuestion.question}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {/* Multiple Choice */}
                            {(currentQuestion.type === 'multiple_choice' || currentQuestion.type === 'true_false') && currentQuestion.options && (
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleAnswer(currentQuestion.id, option)}
                                            className={`w-full p-4 text-left rounded-lg border transition-all ${
                                                answers[currentQuestion.id] === option
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        >
                                            <span className="font-medium text-muted-foreground mr-3">
                                                {String.fromCharCode(65 + idx)}.
                                            </span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Multi-Select */}
                            {currentQuestion.type === 'multi_select' && currentQuestion.options && (
                                <div className="space-y-2">
                                    {currentQuestion.options.map((option, idx) => {
                                        const currentAnswers = (answers[currentQuestion.id] as string[]) || []
                                        const isSelected = currentAnswers.includes(option)
                                        
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    const newAnswers = isSelected
                                                        ? currentAnswers.filter(a => a !== option)
                                                        : [...currentAnswers, option]
                                                    handleAnswer(currentQuestion.id, newAnswers)
                                                }}
                                                className={`w-full p-4 text-left rounded-lg border transition-all ${
                                                    isSelected
                                                        ? 'border-blue-500 bg-blue-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                            >
                                                <span className={`inline-block w-5 h-5 border rounded mr-3 align-middle ${
                                                    isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                                                }`}>
                                                    {isSelected && <CheckCircle className="w-4 h-4 text-white" />}
                                                </span>
                                                {option}
                                            </button>
                                        )
                                    })}
                                </div>
                            )}

                            {/* Short Answer / Essay */}
                            {(currentQuestion.type === 'short_answer' || currentQuestion.type === 'essay') && (
                                <textarea
                                    value={(answers[currentQuestion.id] as string) || ''}
                                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                    placeholder="Type your answer here..."
                                    rows={currentQuestion.type === 'essay' ? 8 : 3}
                                    className="w-full p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}

                            {/* Fill in Blank */}
                            {currentQuestion.type === 'fill_in_blank' && (
                                <input
                                    type="text"
                                    value={(answers[currentQuestion.id] as string) || ''}
                                    onChange={(e) => handleAnswer(currentQuestion.id, e.target.value)}
                                    placeholder="Type your answer..."
                                    className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-6">
                    <Button
                        variant="outline"
                        disabled={currentQuestionIndex === 0}
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                    >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                    </Button>

                    {/* Question dots */}
                    <div className="flex items-center gap-1">
                        {questions.map((q, idx) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestionIndex(idx)}
                                className={`w-2.5 h-2.5 rounded-full ${
                                    idx === currentQuestionIndex
                                        ? 'bg-blue-500'
                                        : answers[q.id]
                                            ? 'bg-green-400'
                                            : 'bg-gray-200'
                                }`}
                            />
                        ))}
                    </div>

                    <Button
                        variant={currentQuestionIndex === questions.length - 1 ? 'default' : 'outline'}
                        onClick={() => {
                            if (currentQuestionIndex === questions.length - 1) {
                                if (confirm('Are you sure you want to submit?')) {
                                    handleSubmit()
                                }
                            } else {
                                setCurrentQuestionIndex(prev => prev + 1)
                            }
                        }}
                    >
                        {currentQuestionIndex === questions.length - 1 ? (
                            <><Send className="w-4 h-4 mr-2" /> Submit</>
                        ) : (
                            <><>Next <ChevronRight className="w-4 h-4 ml-2" /></></>
                        )}
                    </Button>
                </div>
            </main>
        </div>
    )
}
