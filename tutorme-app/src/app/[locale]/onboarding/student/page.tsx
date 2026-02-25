'use client'

import { useState } from 'react'


import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Loader2, CheckCircle } from 'lucide-react'

const GRADE_LEVELS = [
  { id: 6, name: '6th Grade' },
  { id: 7, name: '7th Grade' },
  { id: 8, name: '8th Grade' },
  { id: 9, name: '9th Grade' },
  { id: 10, name: '10th Grade' },
  { id: 11, name: '11th Grade' },
  { id: 12, name: '12th Grade' },
]

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
  
  // Step 1: Grade Level
  const [gradeLevel, setGradeLevel] = useState<number | null>(null)
  
  // Step 2: Subjects
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  
  // Step 3: Diagnostic Quiz
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const toggleSubject = (subjectId: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subjectId) 
        ? prev.filter(s => s !== subjectId)
        : [...prev, subjectId]
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
          gradeLevel,
          subjectsOfInterest: selectedSubjects,
        })
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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to TutorMe!</h2>
            <p className="text-gray-600">Your profile is set up. Redirecting to your dashboard...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>
              Step {step} of 3: {step === 1 ? 'Select Your Grade' : step === 2 ? 'Choose Subjects' : 'Diagnostic Quiz'}
            </CardDescription>
            <Progress value={progress} className="mt-2" />
          </CardHeader>
          <CardContent>
            {/* Step 1: Grade Level */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">What grade are you in?</h3>
                <div className="grid grid-cols-2 gap-3">
                  {GRADE_LEVELS.map((grade) => (
                    <button
                      key={grade.id}
                      onClick={() => setGradeLevel(grade.id)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        gradeLevel === grade.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {grade.name}
                    </button>
                  ))}
                </div>
                <Button 
                  className="w-full mt-4" 
                  disabled={!gradeLevel}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {/* Step 2: Subjects */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">What subjects do you want to learn?</h3>
                  <span className="text-sm text-gray-500">
                    {selectedSubjects.length} selected
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {SUBJECTS.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => toggleSubject(subject.id)}
                      className={`p-4 rounded-lg border text-left transition-colors ${
                        selectedSubjects.includes(subject.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-2xl mr-2">{subject.icon}</span>
                      {subject.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button 
                    className="flex-1" 
                    disabled={selectedSubjects.length === 0}
                    onClick={() => setStep(3)}
                  >
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Diagnostic Quiz */}
            {step === 3 && !showResults && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Quick Assessment</h3>
                  <p className="text-sm text-gray-600">
                    Question {currentQuestion + 1} of 5
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-lg font-medium mb-4">
                    {DIAGNOSTIC_QUESTIONS[currentQuestion].question}
                  </p>
                  <div className="space-y-2">
                    {DIAGNOSTIC_QUESTIONS[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        className="w-full p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Quiz Results */}
            {step === 3 && showResults && (
              <div className="space-y-6 text-center">
                <h3 className="text-lg font-medium">Assessment Complete!</h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-4xl font-bold text-blue-600 mb-2">
                    {calculateScore()}/5
                  </p>
                  <p className="text-gray-600">
                    {calculateScore() >= 4 
                      ? 'Great job! You have a strong foundation.'
                      : calculateScore() >= 2
                      ? 'Good start! We will help you improve.'
                      : 'No worries! We will start from the basics.'}
                  </p>
                </div>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                    {error}
                  </div>
                )}
                <Button 
                  className="w-full" 
                  onClick={handleComplete}
                  disabled={isLoading}
                >
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
