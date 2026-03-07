/**
 * AI Orchestrator
 * Manages AI providers with fallback chain:
 * 1. Kimi K2.5 (Moonshot AI) - PRIMARY
 * 2. Ollama (local Llama 3.1) - Fallback 1
 * 3. Zhipu GLM - Fallback 2
 * 
 * Response caching for repeated prompts (5 min TTL)
 */

import { generateWithOllama, chatWithOllama, isOllamaAvailable } from './ollama'
import { generateWithKimi, chatWithKimi } from './kimi'
import { generateWithZhipu, chatWithZhipu } from './zhipu'
import { cache } from '../db'

type AIProvider = 'kimi' | 'ollama' | 'zhipu'

interface AIOptions {
  temperature?: number
  maxTokens?: number
  timeoutMs?: number
  /** Skip response cache (default false for generate, true when cache not desired) */
  skipCache?: boolean
}

interface GenerationResult {
  content: string
  provider: AIProvider
  latencyMs: number
}

const AI_CACHE_TTL = 300 // 5 minutes for identical prompts
const AI_CACHE_PREFIX = 'ai:resp:'

function cacheKeyForPrompt(prompt: string): string {
  const crypto = require('crypto') as typeof import('crypto')
  return AI_CACHE_PREFIX + crypto.createHash('sha256').update(prompt).digest('hex').slice(0, 32)
}

function cacheKeyForChat(messages: Array<{ role: string; content: string }>): string {
  const crypto = require('crypto') as typeof import('crypto')
  const payload = JSON.stringify(messages)
  return AI_CACHE_PREFIX + 'chat:' + crypto.createHash('sha256').update(payload).digest('hex').slice(0, 32)
}

/**
 * Generate text with automatic fallback
 * Priority: Kimi -> Ollama -> Zhipu
 * Kimi is now PRIMARY provider
 */
export async function generateWithFallback(
  prompt: string,
  options: AIOptions = {}
): Promise<GenerationResult> {
  const startTime = Date.now()

  if (!options.skipCache) {
    const key = cacheKeyForPrompt(prompt)
    const cached = await cache.get<GenerationResult>(key)
    if (cached) return { ...cached, latencyMs: Date.now() - startTime }
  }

  const timeout = options.timeoutMs || 30000 // 30 second default timeout for Kimi

  // MOCK MODE (for verification/testing without keys)
  if (process.env.MOCK_AI === 'true') {
    return {
      content: `[MOCK AI RESPONSE] Processed prompt: ${prompt.substring(0, 200)}...`,
      provider: 'kimi',
      latencyMs: 10
    }
  }

  // Try Kimi FIRST (now primary)
  if (process.env.KIMI_API_KEY) {
    try {
      const content = await generateWithKimi(prompt, {
        ...options,
        model: 'kimi-k2.5',
      })

      const result = {
        content,
        provider: 'kimi' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForPrompt(prompt), result, AI_CACHE_TTL)
      return result
    } catch (error) {
      console.log('Kimi failed, trying Ollama:', error)
    }
  }

  // Fallback 1: Ollama (local, free)
  try {
    const isAvailable = await Promise.race([
      isOllamaAvailable(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Ollama timeout')), 5000)
      )
    ])

    if (isAvailable) {
      const content = await Promise.race([
        generateWithOllama(prompt, options),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('Ollama generation timeout')), timeout)
        )
      ])

      const result = {
        content,
        provider: 'ollama' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForPrompt(prompt), result, AI_CACHE_TTL)
      return result
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    if (msg.includes('not found') || msg.includes('404')) {
      console.log('Ollama model not available, trying Zhipu')
    } else {
      console.log('Ollama failed, trying Zhipu:', error)
    }
  }

  // Fallback 2: Zhipu GLM
  if (process.env.ZHIPU_API_KEY) {
    try {
      const content = await generateWithZhipu(prompt, options)

      const result = {
        content,
        provider: 'zhipu' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForPrompt(prompt), result, AI_CACHE_TTL)
      return result
    } catch (error) {
      console.error('All AI providers failed:', error)
      throw new Error('All AI providers unavailable. Please try again later.')
    }
  }

  throw new Error('No AI providers configured. Please set KIMI_API_KEY.')
}

/**
 * Chat with automatic fallback
 * Priority: Kimi -> Ollama -> Zhipu
 */
export async function chatWithFallback(
  messages: Array<{ role: string; content: string }>,
  options: AIOptions = {}
): Promise<GenerationResult> {
  const startTime = Date.now()

  if (!options.skipCache) {
    const key = cacheKeyForChat(messages)
    const cached = await cache.get<GenerationResult>(key)
    if (cached) return { ...cached, latencyMs: Date.now() - startTime }
  }

  const timeout = options.timeoutMs || 30000

  // MOCK MODE
  if (process.env.MOCK_AI === 'true') {
    return {
      content: `[MOCK AI RESPONSE] Processed chat with ${messages.length} messages.`,
      provider: 'kimi',
      latencyMs: 10
    }
  }

  // Try Kimi FIRST
  if (process.env.KIMI_API_KEY) {
    try {
      const content = await chatWithKimi(messages, {
        ...options,
        model: 'kimi-k2.5',
      })

      const result = {
        content,
        provider: 'kimi' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForChat(messages), result, AI_CACHE_TTL)
      return result
    } catch (error) {
      console.log('Kimi failed, trying Ollama:', error)
    }
  }

  // Fallback 1: Ollama
  try {
    const isAvailable = await Promise.race([
      isOllamaAvailable(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Ollama timeout')), 5000)
      )
    ])

    if (isAvailable) {
      const content = await Promise.race([
        chatWithOllama(messages, options),
        new Promise<string>((_, reject) =>
          setTimeout(() => reject(new Error('Ollama chat timeout')), timeout)
        )
      ])

      const result = {
        content,
        provider: 'ollama' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForChat(messages), result, AI_CACHE_TTL)
      return result
    }
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error)
    if (msg.includes('not found') || msg.includes('404')) {
      console.log('Ollama model not available, trying Zhipu')
    } else {
      console.log('Ollama failed, trying Zhipu:', error)
    }
  }

  // Fallback 2: Zhipu
  if (process.env.ZHIPU_API_KEY) {
    try {
      const content = await chatWithZhipu(messages, options)

      const result = {
        content,
        provider: 'zhipu' as AIProvider,
        latencyMs: Date.now() - startTime,
      }
      if (!options.skipCache) await cache.set(cacheKeyForChat(messages), result, AI_CACHE_TTL)
      return result
    } catch (error) {
      console.error('All AI providers failed:', error)
      throw new Error('All AI providers unavailable. Please try again later.')
    }
  }

  throw new Error('No AI providers configured. Please set KIMI_API_KEY.')
}

/**
 * Stream responses with fallback
 * Note: This doesn't support fallback mid-stream, it picks provider at start
 */
export async function* streamWithFallback(
  messages: Array<{ role: string; content: string }>,
  options: AIOptions = {}
): AsyncGenerator<{ content: string; provider: AIProvider }, void, unknown> {
  try {
    const result = await chatWithFallback(messages, options)
    yield { content: result.content, provider: result.provider }
  } catch (error) {
    throw error
  }
}

/**
 * Get status of all AI providers
 */
export async function getAIProvidersStatus(): Promise<
  Array<{ name: AIProvider; available: boolean; latencyMs?: number }>
> {
  const results = []

  // Check Kimi first
  results.push({
    name: 'kimi' as AIProvider,
    available: !!process.env.KIMI_API_KEY,
  })

  // Check Ollama
  const ollamaStart = Date.now()
  try {
    const available = await isOllamaAvailable()
    results.push({
      name: 'ollama' as AIProvider,
      available,
      latencyMs: Date.now() - ollamaStart,
    })
  } catch {
    results.push({ name: 'ollama' as AIProvider, available: false })
  }

  // Check Zhipu
  results.push({
    name: 'zhipu' as AIProvider,
    available: !!process.env.ZHIPU_API_KEY,
  })

  return results
}

/**
 * Force specific provider (for testing or user preference)
 */
export async function generateWithProvider(
  provider: AIProvider,
  prompt: string,
  options: AIOptions = {}
): Promise<GenerationResult> {
  const startTime = Date.now()

  switch (provider) {
    case 'kimi':
      return {
        content: await generateWithKimi(prompt, { ...options, model: 'kimi-k2.5' }),
        provider: 'kimi',
        latencyMs: Date.now() - startTime,
      }
    case 'ollama':
      return {
        content: await generateWithOllama(prompt, options),
        provider: 'ollama',
        latencyMs: Date.now() - startTime,
      }
    case 'zhipu':
      return {
        content: await generateWithZhipu(prompt, options),
        provider: 'zhipu',
        latencyMs: Date.now() - startTime,
      }
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}
