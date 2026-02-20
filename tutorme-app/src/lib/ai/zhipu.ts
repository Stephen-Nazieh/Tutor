/**
 * Zhipu AI Provider (GLM models)
 * Docs: https://open.bigmodel.cn/dev/howuse/model
 */

import OpenAI from 'openai'

// Lazy initialization of OpenAI client
let client: OpenAI | null = null

function getClient(): OpenAI {
  if (!client) {
    if (!process.env.ZHIPU_API_KEY) {
      throw new Error('ZHIPU_API_KEY is not set')
    }
    client = new OpenAI({
      apiKey: process.env.ZHIPU_API_KEY,
      baseURL: 'https://open.bigmodel.cn/api/paas/v4/',
    })
  }
  return client
}

/**
 * Generate text using Zhipu GLM models
 */
export async function generateWithZhipu(
  prompt: string,
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<string> {
  try {
    const response = await getClient().chat.completions.create({
      model: options.model || 'glm-4-flash',
      messages: [{ role: 'user', content: prompt }],
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    })
    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Zhipu generation error:', error)
    throw error
  }
}

/**
 * Chat with Zhipu GLM models (multi-turn)
 */
export async function chatWithZhipu(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): Promise<string> {
  try {
    const response = await getClient().chat.completions.create({
      model: options.model || 'glm-4-flash',
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    })
    return response.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Zhipu chat error:', error)
    throw error
  }
}

/**
 * Stream responses from Zhipu
 */
export async function* streamZhipu(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string
    temperature?: number
    maxTokens?: number
  } = {}
): AsyncGenerator<string, void, unknown> {
  try {
    const stream = await getClient().chat.completions.create({
      model: options.model || 'glm-4-flash',
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
      stream: true,
    })

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content
      if (content) {
        yield content
      }
    }
  } catch (error) {
    console.error('Zhipu streaming error:', error)
    throw error
  }
}

/**
 * Get available Zhipu models
 */
export function getZhipuModels(): Array<{ id: string; name: string; description: string }> {
  return [
    {
      id: 'glm-4-flash',
      name: 'GLM-4-Flash',
      description: 'Fast and cost-effective for everyday tasks',
    },
    {
      id: 'glm-4-plus',
      name: 'GLM-4-Plus',
      description: 'Enhanced performance for complex tasks',
    },
    {
      id: 'glm-4-long',
      name: 'GLM-4-Long',
      description: 'Long context window (1M tokens)',
    },
  ]
}
