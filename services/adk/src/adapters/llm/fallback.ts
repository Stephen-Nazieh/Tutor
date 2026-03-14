import { generateWithGemini } from './gemini.js'
import { generateWithKimi } from './kimi.js'

export async function generateWithFallback(prompt: string, options: { temperature?: number; maxTokens?: number; systemPrompt?: string } = {}) {
  if (process.env.KIMI_API_KEY) {
    try {
      return { content: await generateWithKimi(prompt, options), provider: 'kimi' }
    } catch (error) {
      console.error('Kimi failed, trying Gemini:', error)
    }
  }

  if (process.env.GEMINI_API_KEY) {
    const content = await generateWithGemini(prompt, options)
    return { content, provider: 'gemini' }
  }

  throw new Error('No AI providers configured. Set KIMI_API_KEY or GEMINI_API_KEY.')
}
