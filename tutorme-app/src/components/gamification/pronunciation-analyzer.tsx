/**
 * Pronunciation Analyzer Component
 * 
 * ELITE feature - Speech recognition and pronunciation scoring
 */

'use client'

import { useState, useRef } from 'react'
import { Mic, MicOff, Play, Pause, Volume2, CheckCircle2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface PronunciationResult {
  overallScore: number
  accuracy: number
  fluency: number
  completeness: number
  prosody: number
  wordScores: Array<{
    word: string
    score: number
    issues?: string[]
  }>
  feedback: string[]
}

interface PronunciationAnalyzerProps {
  targetText: string
  tier: 'FREE' | 'PRO' | 'ELITE'
  onAnalysisComplete?: (result: PronunciationResult) => void
  className?: string
}

export function PronunciationAnalyzer({
  targetText,
  tier,
  onAnalysisComplete,
  className,
}: PronunciationAnalyzerProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<PronunciationResult | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const isLocked = tier !== 'ELITE'

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }
    analyzeSpeech()
  }

  const analyzeSpeech = async () => {
    setIsAnalyzing(true)
    
    // Simulate API call - in production, send audio to speech recognition service
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Mock result
    const mockResult: PronunciationResult = {
      overallScore: 78,
      accuracy: 82,
      fluency: 75,
      completeness: 88,
      prosody: 70,
      wordScores: [
        { word: 'Hello', score: 95 },
        { word: 'world', score: 88 },
        { word: 'pronunciation', score: 65, issues: ['stress pattern'] },
        { word: 'practice', score: 92 },
      ],
      feedback: [
        'Great job on word stress!',
        'Try to slow down a bit for clarity',
        'Work on the "th" sound in "pronunciation"',
      ],
    }
    
    setResult(mockResult)
    setIsAnalyzing(false)
    onAnalysisComplete?.(mockResult)
  }

  if (isLocked) {
    return (
      <Card className={className}>
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white text-center">
          <Volume2 className="w-12 h-12 mx-auto mb-3 opacity-80" />
          <h3 className="text-lg font-semibold mb-2">Pronunciation Analysis</h3>
          <p className="text-sm text-amber-100 mb-4">
            Upgrade to ELITE for AI-powered pronunciation feedback
          </p>
          <Button variant="secondary" size="sm">
            Upgrade to ELITE
          </Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-amber-500" />
          Pronunciation Practice
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target Text */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-xs text-gray-500 mb-2">Say this:</p>
          <p className="text-lg font-medium text-gray-800">&ldquo;{targetText}&rdquo;</p>
        </div>

        {/* Recording Controls */}
        <div className="flex items-center justify-center gap-4">
          {!isRecording ? (
            <Button
              size="lg"
              className="rounded-full w-16 h-16 bg-red-500 hover:bg-red-600"
              onClick={startRecording}
              disabled={isAnalyzing}
            >
              <Mic className="w-6 h-6" />
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16 border-red-500 text-red-500 animate-pulse"
              onClick={stopRecording}
            >
              <MicOff className="w-6 h-6" />
            </Button>
          )}
        </div>

        {/* Recording Timer */}
        {isRecording && (
          <p className="text-center text-red-500 font-mono">
            Recording: {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
          </p>
        )}

        {/* Analyzing */}
        {isAnalyzing && (
          <div className="text-center py-4">
            <div className="animate-spin w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-2" />
            <p className="text-sm text-gray-600">Analyzing your pronunciation...</p>
          </div>
        )}

        {/* Results */}
        {result && !isAnalyzing && (
          <div className="space-y-4 animate-in fade-in">
            {/* Overall Score */}
            <div className="text-center">
              <div className={cn(
                'text-5xl font-bold mb-2',
                result.overallScore >= 80 ? 'text-green-500' :
                result.overallScore >= 60 ? 'text-yellow-500' :
                'text-red-500'
              )}>
                {result.overallScore}
              </div>
              <p className="text-sm text-gray-500">Overall Score</p>
            </div>

            {/* Detailed Scores */}
            <div className="grid grid-cols-2 gap-3">
              <ScoreBar label="Accuracy" score={result.accuracy} />
              <ScoreBar label="Fluency" score={result.fluency} />
              <ScoreBar label="Completeness" score={result.completeness} />
              <ScoreBar label="Prosody" score={result.prosody} />
            </div>

            {/* Word Analysis */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Word-by-Word</p>
              <div className="flex flex-wrap gap-2">
                {result.wordScores.map((word, idx) => (
                  <span
                    key={idx}
                    className={cn(
                      'px-2 py-1 rounded text-sm',
                      word.score >= 80 ? 'bg-green-100 text-green-700' :
                      word.score >= 60 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    )}
                    title={word.issues?.join(', ')}
                  >
                    {word.word}
                  </span>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-700 mb-2">💡 Feedback</p>
              <ul className="text-sm text-blue-600 space-y-1">
                {result.feedback.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setResult(null)
                setRecordingTime(0)
              }}
            >
              Try Again
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-600">{label}</span>
        <span className={cn(
          'font-medium',
          score >= 80 ? 'text-green-600' :
          score >= 60 ? 'text-yellow-600' :
          'text-red-600'
        )}>
          {score}
        </span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            score >= 80 ? 'bg-green-500' :
            score >= 60 ? 'bg-yellow-500' :
            'bg-red-500'
          )}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}
