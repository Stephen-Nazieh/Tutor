export function buildEssayGradingPrompt(params: {
  essayQuestion: string
  rubric: string[]
  studentEssay: string
  maxPoints: number
}) {
  return `Grade this essay using the rubric. Output JSON matching the schema.\n\nQuestion: ${params.essayQuestion}\nRubric: ${params.rubric.join(', ')}\nEssay: ${params.studentEssay}\nMax Points: ${params.maxPoints}`
}

export function buildMathGradingPrompt(params: {
  problem: string
  correctAnswer: string
  correctSteps: string[]
  studentWork: string
  maxPoints: number
}) {
  return `Grade this math submission. Output JSON matching the schema.\n\nProblem: ${params.problem}\nCorrect Answer: ${params.correctAnswer}\nCorrect Steps: ${params.correctSteps.join(' | ')}\nStudent Work: ${params.studentWork}\nMax Points: ${params.maxPoints}`
}
