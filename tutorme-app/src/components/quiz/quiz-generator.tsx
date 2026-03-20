'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Loader2, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'

interface QuizGeneratorProps {
  contentId: string
  onQuizGenerated: (questions: any[]) => void
}

export function QuizGenerator({ contentId, onQuizGenerated }: QuizGeneratorProps) {
  const [transcript, setTranscript] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [error, setError] = useState('')

  const generateQuiz = async () => {
    if (!transcript.trim()) return

    setIsGenerating(true)
    setError('')

    try {
      const response = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentId,
          transcript,
          grade: 8,
          weakAreas: [],
        }),
      })

      const data = await response.json()

      if (data.questions) {
        setGeneratedQuestions(data.questions)
        onQuizGenerated(data.questions)
      } else {
        setError('Failed to generate questions')
      }
    } catch (err) {
      setError('An error occurred while generating the quiz')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          AI Quiz Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="transcript">Video Transcript</Label>
          <Textarea
            id="transcript"
            placeholder="Paste the video transcript here..."
            value={transcript}
            onChange={e => setTranscript(e.target.value)}
            rows={6}
          />
          <p className="mt-1 text-xs text-gray-500">
            The AI will analyze the transcript and generate relevant quiz questions.
          </p>
        </div>

        <Button
          onClick={generateQuiz}
          disabled={isGenerating || !transcript.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Quiz...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Quiz with AI
            </>
          )}
        </Button>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {generatedQuestions.length > 0 && (
          <div className="border-t pt-4">
            <div className="mb-3 flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Generated {generatedQuestions.length} Questions</span>
            </div>
            <div className="space-y-2">
              {generatedQuestions.map((q, idx) => (
                <div key={idx} className="rounded bg-gray-50 p-3 text-sm">
                  <span className="font-medium">Q{idx + 1}:</span> {q.question}
                  <span className="ml-2 text-gray-500">({q.type})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
