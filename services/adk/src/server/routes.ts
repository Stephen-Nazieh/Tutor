import { Router } from 'express'
import { InMemorySessionService, Runner, isFinalResponse } from '@google/adk'
import { createUserContent } from '@google/genai'
import { tutorAgent } from '../agents/tutor'
import { gradingAgent } from '../agents/grading'
import { contentGeneratorAgent } from '../agents/content-generator'
import { briefingAgent } from '../agents/briefing'
import { liveMonitorAgent } from '../agents/live-monitor'
import { chatSchema, essaySchema, mathSchema, contentSchema, briefingSchema, liveMonitorSchema } from '../validation/schemas'
import { appendMessage } from '../tools/conversations'
import { logError } from '../observability/logging'

const router = Router()
const sessionService = new InMemorySessionService()

async function runAgent(agent: any, userId: string, sessionId: string, message: string): Promise<string> {
  const runner = new Runner({ agent, sessionService })
  await sessionService.createSession({ appName: 'solocorn', userId, sessionId })

  const events = runner.runAsync({
    userId,
    sessionId,
    newMessage: createUserContent(message),
  })

  for await (const event of events) {
    if (isFinalResponse(event)) {
      const part = event.content.parts?.[0]
      return part?.text || ''
    }
  }
  return ''
}

router.get('/v1/status', (_req, res) => {
  res.json({
    providers: {
      kimi: { available: !!process.env.KIMI_API_KEY, name: 'Kimi K2.5' },
      gemini: { available: !!process.env.GEMINI_API_KEY, name: 'Gemini' },
    },
    timestamp: new Date().toISOString(),
  })
})

router.post('/v1/chat', async (req, res) => {
  const parsed = chatSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })
  const { studentId, subject, message, conversationId } = parsed.data
  const sessionId = conversationId || `${studentId}:${subject}`

  try {
    await appendMessage(sessionId, 'user', message)
    const response = await runAgent(tutorAgent, studentId, sessionId, message)
    await appendMessage(sessionId, 'assistant', response)
    res.json({ response, conversationId: sessionId })
  } catch (error) {
    logError('Tutor agent failed', error)
    res.status(500).json({ error: 'Tutor agent failed' })
  }
})

router.post('/v1/grading/essay', async (req, res) => {
  const parsed = essaySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  const prompt = `Grade this essay using the rubric. Output JSON matching the schema.\n\nQuestion: ${parsed.data.essayQuestion}\nRubric: ${parsed.data.rubric.join(', ')}\nEssay: ${parsed.data.studentEssay}\nMax Points: ${parsed.data.maxPoints}`

  try {
    const response = await runAgent(gradingAgent, 'system', 'grading', prompt)
    res.json({ response })
  } catch (error) {
    logError('Essay grading failed', error)
    res.status(500).json({ error: 'Essay grading failed' })
  }
})

router.post('/v1/grading/math', async (req, res) => {
  const parsed = mathSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  const prompt = `Grade this math submission. Output JSON matching the schema.\n\nProblem: ${parsed.data.problem}\nCorrect Answer: ${parsed.data.correctAnswer}\nCorrect Steps: ${parsed.data.correctSteps.join(' | ')}\nStudent Work: ${parsed.data.studentWork}\nMax Points: ${parsed.data.maxPoints}`

  try {
    const response = await runAgent(gradingAgent, 'system', 'grading', prompt)
    res.json({ response })
  } catch (error) {
    logError('Math grading failed', error)
    res.status(500).json({ error: 'Math grading failed' })
  }
})

router.post('/v1/content/generate', async (req, res) => {
  const parsed = contentSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  try {
    const response = await runAgent(contentGeneratorAgent, 'system', 'content', parsed.data.prompt)
    res.json({ response })
  } catch (error) {
    logError('Content generation failed', error)
    res.status(500).json({ error: 'Content generation failed' })
  }
})

router.post('/v1/llm/generate', async (req, res) => {
  const parsed = contentSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  try {
    const response = await runAgent(contentGeneratorAgent, 'system', 'llm-generate', parsed.data.prompt)
    res.json({ response })
  } catch (error) {
    logError('LLM generate failed', error)
    res.status(500).json({ error: 'LLM generate failed' })
  }
})

router.post('/v1/llm/chat', async (req, res) => {
  const parsed = req.body?.messages ? req.body : null
  if (!parsed || !Array.isArray(parsed.messages)) return res.status(400).json({ error: 'Invalid request' })

  const prompt = parsed.messages
    .map((m: { role: string; content: string }) => `${m.role}: ${m.content}`)
    .join('\\n')

  try {
    const response = await runAgent(contentGeneratorAgent, 'system', 'llm-chat', prompt)
    res.json({ response })
  } catch (error) {
    logError('LLM chat failed', error)
    res.status(500).json({ error: 'LLM chat failed' })
  }
})

router.post('/v1/briefing', async (req, res) => {
  const parsed = briefingSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  try {
    const response = await runAgent(briefingAgent, 'system', 'briefing', parsed.data.prompt)
    res.json({ response })
  } catch (error) {
    logError('Briefing failed', error)
    res.status(500).json({ error: 'Briefing failed' })
  }
})

router.post('/v1/live-monitor', async (req, res) => {
  const parsed = liveMonitorSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  try {
    const response = await runAgent(liveMonitorAgent, 'system', 'live-monitor', parsed.data.prompt)
    res.json({ response })
  } catch (error) {
    logError('Live monitor failed', error)
    res.status(500).json({ error: 'Live monitor failed' })
  }
})

export default router
