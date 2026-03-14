import { generateWithFallback } from '../adapters/llm/fallback.js'

export async function summarizeConversation(text: string) {
  const prompt = `Summarize this tutoring conversation in 3 bullet points.\n\n${text}`
  const result = await generateWithFallback(prompt, { maxTokens: 200 })
  return result.content
}
