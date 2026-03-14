import { Router } from 'express'
import { InMemorySessionService, Runner, isFinalResponse } from '@google/adk'
import { createUserContent } from '@google/genai'

// Relative imports updated with .js extensions for ESM compatibility
import { tutorAgent } from '../agents/tutor/index.js'
import { gradingAgent } from '../agents/grading/index.js'
import { contentGeneratorAgent } from '../agents/content-generator/index.js'
import { briefingAgent } from '../agents/briefing/index.js'
import { liveMonitorAgent } from '../agents/live-monitor/index.js'
import { pciMasterAgent } from '../agents/pci-master/index.js'
import { chatSchema, essaySchema, mathSchema, contentSchema, briefingSchema, liveMonitorSchema, pciMasterSchema } from '../validation/schemas.js'
import {
  briefingOutputSchema,
  contentOutputSchema,
  gradingOutputSchema,
  liveMonitorOutputSchema,
  tutorOutputSchema,
  pciMasterOutputSchema,
} from '../validation/output-schemas.js'
import { appendMessage } from '../tools/conversations.js'
import { logError } from '../observability/logging.js'
import { z } from 'zod'
import { buildEssayGradingPrompt, buildMathGradingPrompt } from '../prompts/grading.js'

const router = Router()
const sessionService = new InMemorySessionService()

async function runAgent(agent: any, userId: string, sessionId: string, message: string): Promise<string> {
  // Standardized appName for consistency
  const runner = new Runner({ agent, sessionService, appName: 'solocorn-adk' })
  await sessionService.createSession({ appName: 'solocorn-adk', userId, sessionId })

  const events = runner.runAsync({
    userId,
    sessionId,
    newMessage: createUserContent(message),
  })

  for await (const event of events) {
    if (isFinalResponse(event)) {
      // Fixed: Variable 'part' is now properly declared with const
      const part = event.content?.parts?.[0]; 
      return part?.text || '';
    }
  }
  return ''
}

function extractJsonPayload(text: string): string | null {
  const trimmed = text.trim()
  const fenceMatch = trimmed.match(/^```(?:json)?\\s*([\\s\\S]*?)\\s*```$/)
  const candidate = fenceMatch ? fenceMatch[1] : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  return candidate.slice(start, end + 1)
}

function parseStructuredOutput<T>(text: string, schema: z.ZodSchema<T>): T | null {
  const payload = extractJsonPayload(text)
  if (!payload) return null
  try {
    const parsed = JSON.parse(payload)
    const result = schema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
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
    const parsed = parseStructuredOutput(response, tutorOutputSchema)
    const finalResponse = parsed?.response ?? response
    await appendMessage(sessionId, 'assistant', finalResponse)
    res.json({ response: finalResponse, conversationId: sessionId, parsed })
  } catch (error) {
    logError('Tutor agent failed', error)
    res.status(500).json({ error: 'Tutor agent failed' })
  }
})

router.post('/v1/grading/essay', async (req, res) => {
  const parsed = essaySchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  const prompt = buildEssayGradingPrompt(parsed.data.essayQuestion!)

  try {
    const response = await runAgent(gradingAgent, 'system', 'grading', prompt)
    const parsed = parseStructuredOutput(response, gradingOutputSchema)
    res.json({ response, parsed })
  } catch (error) {
    logError('Essay grading failed', error)
    res.status(500).json({ error: 'Essay grading failed' })
  }
})

router.post('/v1/grading/math', async (req, res) => {
  const parsed = mathSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  const prompt = buildMathGradingPrompt(parsed.data.problem!)

  try {
    const response = await runAgent(gradingAgent, 'system', 'grading', prompt)
    const parsed = parseStructuredOutput(response, gradingOutputSchema)
    res.json({ response, parsed })
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
    const parsedOutput = parseStructuredOutput(response, contentOutputSchema)
    res.json({ response, parsed: parsedOutput })
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
    const parsedOutput = parseStructuredOutput(response, contentOutputSchema)
    res.json({ response, parsed: parsedOutput })
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
    const parsedOutput = parseStructuredOutput(response, contentOutputSchema)
    res.json({ response, parsed: parsedOutput })
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
    const parsedOutput = parseStructuredOutput(response, briefingOutputSchema)
    res.json({ response, parsed: parsedOutput })
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
    const parsedOutput = parseStructuredOutput(response, liveMonitorOutputSchema)
    res.json({ response, parsed: parsedOutput })
  } catch (error) {
    logError('Live monitor failed', error)
    res.status(500).json({ error: 'Live monitor failed' })
  }
})

router.post('/v1/pci-master', async (req, res) => {
  const parsed = pciMasterSchema.safeParse(req.body)
  if (!parsed.success) return res.status(400).json({ error: 'Invalid request' })

  const { userId, sessionId, message, context } = parsed.data
  const convoId = sessionId || `pci:${userId}`
  const contextBlock = context
    ? [
        context.type ? `Type: ${context.type}` : null,
        context.title ? `Title: ${context.title}` : null,
        context.extensionName ? `Extension: ${context.extensionName}` : null,
        `Slide Content:\n${context.content || '(empty)'}`,
        `Current PCI:\n${context.pci || '(empty)'}`,
      ]
        .filter(Boolean)
        .join('\n')
    : ''

  const finalMessage = contextBlock ? `Context:\n${contextBlock}\n\nUser: ${message}` : message

  try {
    await appendMessage(convoId, 'user', message)
    const response = await runAgent(pciMasterAgent, userId, convoId, finalMessage)
    const parsedOutput = parseStructuredOutput(response, pciMasterOutputSchema)
    const finalResponse = parsedOutput?.response ?? response
    await appendMessage(convoId, 'assistant', finalResponse)
    res.json({ response: finalResponse, conversationId: convoId, parsed: parsedOutput })
  } catch (error) {
    logError('PCI Master failed', error)
    res.status(500).json({ error: 'PCI Master failed' })
  }
})

export default router
