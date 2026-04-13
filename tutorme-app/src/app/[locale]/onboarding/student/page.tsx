'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Loader2, CheckCircle } from 'lucide-react'

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '📐' },
  { id: 'physics', name: 'Physics', icon: '⚡' },
  { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
  { id: 'biology', name: 'Biology', icon: '🧬' },
  { id: 'english', name: 'English', icon: '📚' },
  { id: 'history', name: 'History', icon: '🏛️' },
]

// AI Diagnostic Questions
const DIAGNOSTIC_QUESTIONS = [
  {
    subject: 'math',
    question: 'If 3x + 7 = 22, what is the value of x?',
    options: ['3', '5', '7', '15'],
    correct: 1, // index of correct answer
  },
  {
    subject: 'math',
    question: 'What is the area of a rectangle with length 8 and width 5?',
    options: ['13', '26', '40', '45'],
    correct: 2,
  },
  {
    subject: 'physics',
    question: 'What is the unit of force?',
    options: ['Watt', 'Newton', 'Joule', 'Pascal'],
    correct: 1,
  },
  {
    subject: 'physics',
    question: 'Which of the following is a scalar quantity?',
    options: ['Velocity', 'Force', 'Speed', 'Acceleration'],
    correct: 2,
  },
  {
    subject: 'chemistry',
    question: 'What is the chemical formula for water?',
    options: ['CO2', 'H2O', 'O2', 'NaCl'],
    correct: 1,
  },
]

export default function StudentOnboarding() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Step 1: Subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  // Step 3: Diagnostic Quiz
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subjectId) ? prev.filter(s => s !== subjectId) : [...prev, subjectId]
    )
  }

  const handleAnswer = (answerIndex: number) => {
    setAnswers(prev => [...prev, answerIndex])

    if (currentQuestion < 4) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return score + (answer === DIAGNOSTIC_QUESTIONS[index].correct ? 1 : 0)
    }, 0)
  }

  const handleComplete = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Save onboarding data
      const response = await fetch('/api/onboarding/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectsOfInterest: selectedSubjects,
        }),
      })

      if (response.ok) {
        setCompleted(true)
        // Wait a moment then redirect
        setTimeout(() => {
          // Use window.location for a full page refresh to ensure session is updated
          window.location.href = '/student/dashboard'
        }, 1500)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save. Please try again.')
      }
    } catch (err) {
      console.error('Failed to save onboarding:', err)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const progress = ((step - 1) / 3) * 100

  if (completed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pb-8 pt-8">
            <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
            <h2 className="mb-2 text-2xl font-bold">Welcome to Solocorn!</h2>
            <p className="text-gray-600">
              Your profile is set up. Redirecting to your dashboard...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Step {step} of 2: {step === 1 ? 'Choose Subjects' : 'Diagnostic Quiz'}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            {/* Step 1: Subjects */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">What subjects do you want to learn?</h3>
                  <span className="text-sm text-gray-500">{selectedSubjects.length} selected</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map(subject => (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={`rounded-lg border p-4 text-left transition-colors ${
                        selectedSubjects.includes(subject.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="mr-2 text-2xl">{subject.icon}</span>
                      {subject.name}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex gap-3">
                  <Button
                    className="flex-1"
                    disabled={selectedSubjects.length === 0}
                    onClick={() => setStep(2)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Diagnostic Quiz */}
            {step === 2 && !showResults && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-medium">Quick Assessment</h3>
                  <p className="text-sm text-gray-600">Question {currentQuestion + 1} of 5</p>
                </div>

                <div className="rounded-lg bg-gray-50 p-6">
                  <p className="mb-4 text-lg font-medium">
                    {DIAGNOSTIC_QUESTIONS[currentQuestion].question}
                  </p>
                  <div className="space-y-2">
                    {DIAGNOSTIC_QUESTIONS[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full rounded-lg border border-gray-200 p-3 text-left transition-colors hover:border-blue-500 hover:bg-blue-50"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {step === 2 && showResults && (
              <div className="space-y-6 text-center">
                <h3 className="text-lg font-medium">Assessment Complete!</h3>
                <div className="rounded-lg bg-gray-50 p-6">
                  <p className="mb-2 text-4xl font-bold text-blue-600">{calculateScore()}/5</p>
                  <p className="text-gray-600">
                    {calculateScore() >= 4
                      ? 'Great job! You have a strong foundation.'
                      : calculateScore() >= 2
                        ? 'Good start! We will help you improve.'
                        : 'No worries! We will start from the basics.'}
                  </p>
                </div>
                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                  </div>
                )}
                <Button className="w-full" onClick={handleComplete} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Complete Setup'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
