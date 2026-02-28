/**
 * AI Orchestrator
 * Manages AI providers with fallback chain:
 * 1. Ollama (local) - Primary
 * 2. Kimi K2.5 - Fallback 1
 * 3. Zhipu GLM - Fallback 2
 * 7.3 AI performance: response caching for repeated prompts (optional)
 */

import { generateWithOllama, chatWithOllama, isOllamaAvailable } from './ollama'
import { generateWithKimi, chatWithKimi } from './kimi'
import { generateWithZhipu, chatWithZhipu } from './zhipu'
import { cache } from '@/lib/db'

type AIProvider = 'ollama' | 'kimi' | 'zhipu'

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
 * Priority: Ollama -> Kimi -> Zhipu
 * 7.3 Response caching: identical prompts return cached result within TTL
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

  const timeout = options.timeoutMs || 10000 // 10 second default timeout

  // MOCK MODE (for verification/testing without keys)
  if (process.env.MOCK_AI === 'true') {
    return {
      content: `[MOCK AI RESPONSE] Processed prompt: ${prompt.substring(0, 2000)}...`,
      provider: 'ollama', // Simulate local provider
      latencyMs: 10
    }
  }

  // Try Ollama first (local, free)
  try {
    const isAvailable = await Promise.race([
      isOllamaAvailable(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Ollama timeout')), timeout)
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
      console.log('Ollama model not available, trying Kimi')
    } else {
      console.log('Ollama failed, trying Kimi:', error)
    }
  }

  // Try Kimi K2.5 (Fallback 1)
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
      console.log('Kimi failed, trying Zhipu:', error)
    }
  }

  // Try Zhipu (Fallback 2)
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

  throw new Error('No AI providers configured. Please set KIMI_API_KEY or ZHIPU_API_KEY.')
}

/**
 * Chat with automatic fallback
 * Priority: Ollama -> Kimi -> Zhipu
 * 7.3 Response caching: identical message history returns cached result within TTL
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

  const timeout = options.timeoutMs || 10000

  // MOCK MODE
  if (process.env.MOCK_AI === 'true') {
    return {
      content: `[MOCK AI RESPONSE] Processed chat with ${messages.length} messages.`,
      provider: 'ollama',
      latencyMs: 10
    }
  }

  // Try Ollama first
  try {
    const isAvailable = await Promise.race([
      isOllamaAvailable(),
      new Promise<boolean>((_, reject) =>
        setTimeout(() => reject(new Error('Ollama timeout')), 3000)
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
      console.log('Ollama model not available, trying Kimi')
    } else {
      console.log('Ollama failed, trying Kimi:', error)
    }
  }

  // Try Kimi K2.5
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
      console.log('Kimi failed, trying Zhipu:', error)
    }
  }

  // Try Zhipu
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

  throw new Error('No AI providers configured. Please set KIMI_API_KEY or ZHIPU_API_KEY.')
}

/**
 * Stream responses with fallback
 * Note: This doesn't support fallback mid-stream, it picks provider at start
 */
export async function* streamWithFallback(
  messages: Array<{ role: string; content: string }>,
  options: AIOptions = {}
): AsyncGenerator<{ content: string; provider: AIProvider }, void, unknown> {
  // Note: This requires implementing streaming for each provider
  // For now, we'll just yield the full response
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

  // Check Kimi
  results.push({
    name: 'kimi' as AIProvider,
    available: !!process.env.KIMI_API_KEY,
  })

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
    case 'ollama':
      return {
        content: await generateWithOllama(prompt, options),
        provider: 'ollama',
        latencyMs: Date.now() - startTime,
      }
    case 'kimi':
      return {
        content: await generateWithKimi(prompt, { ...options, model: 'kimi-k2.5' }),
        provider: 'kimi',
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
