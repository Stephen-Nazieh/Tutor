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

export const pciMasterSchema = z.object({
  userId: z.string().min(1),
  sessionId: z.string().optional(),
  message: z.string().min(1),
  context: z
    .object({
      type: z.enum(['task', 'assessment']).optional(),
      title: z.string().optional(),
      content: z.string().optional(),
      pci: z.string().optional(),
      extensionName: z.string().optional(),
    })
    .optional(),
})
