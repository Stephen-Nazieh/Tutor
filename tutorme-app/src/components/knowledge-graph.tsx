'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Brain, Target, TrendingUp, Award } from 'lucide-react'

interface ConceptMastery {
  concept: string
  score: number
  totalQuestions: number
  correctAnswers: number
  lastPracticed: Date
}

interface KnowledgeGraphProps {
  studentId?: string
}

export function KnowledgeGraph({ studentId }: KnowledgeGraphProps) {
  const [concepts, setConcepts] = useState<ConceptMastery[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch knowledge data - in real app this would come from API
    // For now, using mock data
    const mockData: ConceptMastery[] = [
      {
        concept: 'Linear Equations',
        score: 85,
        totalQuestions: 20,
        correctAnswers: 17,
        lastPracticed: new Date()
      },
      {
        concept: 'Systems of Equations',
        score: 60,
        totalQuestions: 15,
        correctAnswers: 9,
        lastPracticed: new Date(Date.now() - 86400000)
      },
      {
        concept: 'Fractional Equations',
        score: 35,
        totalQuestions: 10,
        correctAnswers: 3,
        lastPracticed: new Date(Date.now() - 172800000)
      },
      {
        concept: 'Quadratic Equations',
        score: 70,
        totalQuestions: 12,
        correctAnswers: 8,
        lastPracticed: new Date(Date.now() - 259200000)
      },
      {
        concept: 'Polynomials',
        score: 55,
        totalQuestions: 8,
        correctAnswers: 4,
        lastPracticed: new Date(Date.now() - 345600000)
      }
    ]

    setTimeout(() => {
      setConcepts(mockData)
      setLoading(false)
    }, 500)
  }, [studentId])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50'
    if (score >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const averageScore = concepts.length > 0
    ? Math.round(concepts.reduce((sum, c) => sum + c.score, 0) / concepts.length)
    : 0

  const masteredConcepts = concepts.filter(c => c.score >= 80).length
  const needsPractice = concepts.filter(c => c.score < 60).length

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-8 pb-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading knowledge graph...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <span className="text-sm text-gray-600">Concepts</span>
            </div>
            <p className="text-2xl font-bold mt-1">{concepts.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-600">Mastered</span>
            </div>
            <p className="text-2xl font-bold mt-1">{masteredConcepts}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-orange-500" />
              <span className="text-sm text-gray-600">Need Practice</span>
            </div>
            <p className="text-2xl font-bold mt-1">{needsPractice}</p>
          </CardContent>
        </Card>
      </div>

      {/* Overall Score */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Overall Mastery</span>
            <span className={`text-2xl font-bold ${
              averageScore >= 80 ? 'text-green-600' :
              averageScore >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {averageScore}%
            </span>
          </div>
          <Progress 
            value={averageScore} 
            className="h-3"
          />
        </CardContent>
      </Card>

      {/* Individual Concepts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Concept Mastery
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {concepts.map((concept) => (
              <div key={concept.concept} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{concept.concept}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">
                      {concept.correctAnswers}/{concept.totalQuestions} correct
                    </span>
                    <span className={`px-2 py-1 rounded text-sm font-semibold ${
                      getScoreColor(concept.score)
                    }`}>
                      {concept.score}%
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      getProgressColor(concept.score)
                    }`}
                    style={{ width: `${concept.score}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Last practiced: {concept.lastPracticed.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      {needsPractice > 0 && (
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="pt-4">
            <p className="text-sm text-orange-800">
              <strong>Recommendation:</strong> Focus on practicing{' '}
              {concepts
                .filter(c => c.score < 60)
                .map(c => c.concept)
                .join(', ')}{' '}
              to improve your mastery.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
