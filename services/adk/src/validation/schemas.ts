import { z } from 'zod'

export const chatSchema = z.object({
  studentId: z.string().min(1),
  subject: z.string().min(1),
  message: z.string().min(1),
  conversationId: z.string().optional(),
})

export const essaySchema = z.object({
  essayQuestion: z.string(),
  rubric: z.array(z.string()),
  studentEssay: z.string(),
  maxPoints: z.number(),
  studentLevel: z.string().optional(),
})

export const mathSchema = z.object({
  problem: z.string(),
  correctAnswer: z.string(),
  correctSteps: z.array(z.string()),
  studentWork: z.string(),
  maxPoints: z.number(),
})

export const contentSchema = z.object({
  prompt: z.string(),
})

export const briefingSchema = z.object({
  prompt: z.string(),
})

export const liveMonitorSchema = z.object({
  prompt: z.string(),
})
