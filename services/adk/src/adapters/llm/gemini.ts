import { GoogleGenAI } from '@google/genai'

export interface LlmOptions {
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
}

export async function generateWithGemini(prompt: string, options: LlmOptions = {}): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error('GEMINI_API_KEY not configured')

  const ai = new GoogleGenAI({ apiKey })
  const response = await ai.models.generateContent({
    model: process.env.ADK_MODEL || 'gemini-2.5-flash',
    contents: prompt,
    config: {
      temperature: options.temperature,
      maxOutputTokens: options.maxTokens,
      systemInstruction: options.systemPrompt,
    },
  })
  return response.text || ''
}
