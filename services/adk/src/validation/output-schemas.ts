import { z } from 'zod'

export const tutorOutputSchema = z.object({
  response: z.string(),
  followUpQuestion: z.string().optional(),
  confidence: z.number().min(0).max(1).optional(),
  shouldEscalate: z.boolean().optional(),
})

export const gradingOutputSchema = z.object({
  score: z.number(),
  maxPoints: z.number(),
  feedback: z.string(),
  rationale: z.string(),
  confidence: z.number().min(0).max(1),
})

export const contentOutputSchema = z.object({
  type: z.string(),
  title: z.string(),
  text: z.string(),
  items: z.array(z.string()).optional(),
  questions: z
    .array(
      z.object({
        type: z.string(),
        question: z.string(),
        options: z.array(z.string()).optional(),
        answer: z.string().optional(),
        rubric: z.string().optional(),
      })
    )
    .optional(),
  confidence: z.number().min(0).max(1).optional(),
})

export const briefingOutputSchema = z.object({
  summary: z.string(),
  bullets: z.array(z.string()),
  actionItems: z.array(z.string()),
  watchOuts: z.array(z.string()),
  confidence: z.number().min(0).max(1).optional(),
})

export const liveMonitorOutputSchema = z.object({
  status: z.enum(['ok', 'watch', 'alert']),
  alerts: z.array(
    z.object({
      severity: z.enum(['low', 'medium', 'high']),
      message: z.string(),
      suggestedAction: z.string(),
    })
  ),
  overallEngagement: z.number(),
  overallUnderstanding: z.number(),
  confidence: z.number().min(0).max(1).optional(),
})
