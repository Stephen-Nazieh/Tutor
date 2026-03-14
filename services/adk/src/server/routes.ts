import { Router } from 'express'
import { pciMasterOutputSchema } from '../validation/output-schemas.js'
import { appendMessage, getConversation } from '../tools/conversations.js'
import { logError } from '../observability/logging.js'
import { pciMasterSchema } from '../validation/schemas.js'
import { z } from 'zod'

const router = Router()

interface KimiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

async function generateWithKimi(messages: KimiMessage[]): Promise<string> {
  const apiKey = process.env.KIMI_API_KEY
  if (!apiKey) throw new Error('KIMI_API_KEY not configured')

  const response = await fetch('https://api.moonshot.cn/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'kimi-k2.5',
      messages,
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Kimi API error: ${response.status} - ${error}`)
  }

  const data = await response.json() as { choices: Array<{ message: { content: string } }> }
  return data.choices?.[0]?.message?.content || ''
}

function parseStructuredOutput<T>(text: string, schema: z.ZodSchema<T>): T | null {
  const trimmed = text.trim()
  const fenceMatch = trimmed.match(/^```(?:json)?\\s*([\\s\\S]*?)\\s*```$/)
  const candidate = fenceMatch ? fenceMatch[1] : trimmed
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1))
    const result = schema.safeParse(parsed)
    return result.success ? result.data : null
  } catch {
    return null
  }
}

router.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'adk-service'
  })
})

router.get('/v1/status', (_req, res) => {
  res.json({
    provider: 'kimi',
    available: !!process.env.KIMI_API_KEY,
    timestamp: new Date().toISOString(),
  })
})

router.post('/v1/pci-master', async (req, res) => {
  const parsed = pciMasterSchema.safeParse(req.body)
  if (!parsed.success) {
    return res.status(400).json({ error: 'Invalid request', details: parsed.error })
  }

  const { userId, message, context } = parsed.data
  const convoId = `pci:${userId}`

  // Build context block
  const contextParts = [
    context?.type && `Type: ${context.type}`,
    context?.title && `Title: ${context.title}`,
    context?.slideContent && `Slide Content:\n${context.slideContent}`,
    context?.currentPci && `Current PCI:\n${context.currentPci}`,
  ].filter(Boolean)

  const contextBlock = contextParts.join('\n\n')

  // Get conversation history
  const conversation = await getConversation(userId, 'pci', convoId)
  const historyText = conversation.messages
    .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
    .join('\n\n')

  // Build system prompt
  const systemPrompt = `You are a PCI (Pedagogically Correct Instruction) Master - an expert educational AI that crafts and refines Socratic-style instructions.

Your role:
1. Help students discover answers through guided questioning (never give direct answers)
2. Adapt your approach based on the content type (task, assessment, or concept)
3. Use the conversation history to maintain context
4. Provide clear, encouraging, and thought-provoking guidance

Respond in JSON format with this structure:
{
  "response": "your Socratic response here",
  "followUpQuestions": ["question 1", "question 2"],
  "suggestedResources": ["resource 1", "resource 2"],
  "difficulty": "easy|medium|hard",
  "confidence": 0.8
}`

  // Build user message
  const userPrompt = contextBlock 
    ? `Context:\n${contextBlock}\n\nConversation History:\n${historyText}\n\nUser: ${message}`
    : `Conversation History:\n${historyText}\n\nUser: ${message}`

  try {
    // Call Kimi API directly
    const aiResponse = await generateWithKimi([
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ])

    // Parse structured output
    const parsedOutput = parseStructuredOutput(aiResponse, pciMasterOutputSchema)
    const finalResponse = parsedOutput?.response ?? aiResponse

    // Save messages
    await appendMessage(convoId, 'user', message)
    await appendMessage(convoId, 'assistant', finalResponse)

    res.json({ 
      response: finalResponse, 
      conversationId: convoId, 
      parsed: parsedOutput 
    })
  } catch (error) {
    console.error('PCI Master error:', error)
    logError('PCI Master failed', error)
    res.status(500).json({ error: 'PCI Master failed', message: (error as Error).message })
  }
})

// Simple chat endpoint for testing
router.post('/v1/chat', async (req, res) => {
  const { message } = req.body
  if (!message) return res.status(400).json({ error: 'Message required' })

  try {
    const response = await generateWithKimi([
      { role: 'system', content: 'You are a helpful educational tutor using the Socratic method. Guide students to discover answers through questioning.' },
      { role: 'user', content: message }
    ])
    res.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Chat failed', message: (error as Error).message })
  }
})

export default router
