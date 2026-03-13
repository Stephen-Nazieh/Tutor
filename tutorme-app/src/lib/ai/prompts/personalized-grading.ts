export const personalizedGradingPrompt = (params: {
  question: string
  rubric: string
  studentAnswer: string
  maxScore: number
  studentContext?: {
    recentStruggles: Array<{ topic: string; errorType: string; severity: number }>
    masteredTopics: string[]
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
    currentMood: 'frustrated' | 'neutral' | 'engaged'
  }
}): string => {
  const ctx = params.studentContext

  const contextInfo = ctx
    ? `

Student Context:
- Recent struggles: ${ctx.recentStruggles.map(s => s.topic).join(', ') || 'none'}
- Mastered topics: ${ctx.masteredTopics.join(', ') || 'none'}
- Learning style: ${ctx.learningStyle}
- Current mood: ${ctx.currentMood}`
    : ''

  return `Please grade the student's answer based on the rubric and provide personalized feedback.${contextInfo}

Question: ${params.question}

Rubric: ${params.rubric}

Student Answer: ${params.studentAnswer}

Max Score: ${params.maxScore}

Provide personalized feedback:
1. If student has historical struggles with related topics, explicitly reference them in explanation
2. Adjust explanation based on learning style (visual: use diagrams/image analogies; auditory: use sound/rhythm analogies; reading: provide detailed text; kinesthetic: use hands-on examples)
3. Adjust tone based on current mood (frustrated: more encouraging; neutral: standard; engaged: more challenging)
4. Provide 1-2 specific next steps (e.g., "Review X video at 2:15" or "Practice similar problems in Assets > Topic")

Return JSON:
{
  "score": number (0-${params.maxScore}),
  "confidence": number (0-1),
  "feedback": "Personalized brief feedback referencing student's history",
  "explanation": "Detailed grading explanation adapted to learning style",
  "nextSteps": ["Specific suggestion 1", "Specific suggestion 2"],
  "relatedStruggles": ["Related historical struggle topics"]
}`
}
