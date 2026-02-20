/**
 * Ollama Local AI Provider
 * For running LLMs locally (Llama 3.1, etc.)
 * Docs: https://github.com/ollama/ollama
 */

import { Ollama } from 'ollama'

const ollama = new Ollama({ 
  host: process.env.OLLAMA_URL || 'http://localhost:11434' 
})

/**
 * Generate text using local Ollama model
 */
export async function generateWithOllama(
  prompt: string,
  options: {
    model?: string
    temperature?: number
  } = {}
): Promise<string> {
  try {
    const response = await ollama.generate({
      model: options.model || 'llama3.1',
      prompt,
      stream: false,
      options: {
        temperature: options.temperature ?? 0.7,
      },
    })
    return response.response
  } catch (error) {
    console.error('Ollama generation error:', error)
    throw error
  }
}

/**
 * Chat with Ollama model (multi-turn)
 */
export async function chatWithOllama(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string
    temperature?: number
  } = {}
): Promise<string> {
  try {
    const response = await ollama.chat({
      model: options.model || 'llama3.1',
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      stream: false,
      options: {
        temperature: options.temperature ?? 0.7,
      },
    })
    return response.message.content
  } catch (error) {
    console.error('Ollama chat error:', error)
    throw error
  }
}

/**
 * Stream responses from Ollama
 */
export async function* streamOllama(
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string
    temperature?: number
  } = {}
): AsyncGenerator<string, void, unknown> {
  try {
    const stream = await ollama.chat({
      model: options.model || 'llama3.1',
      messages: messages.map(m => ({
        role: m.role as 'user' | 'assistant' | 'system',
        content: m.content,
      })),
      stream: true,
      options: {
        temperature: options.temperature ?? 0.7,
      },
    })

    for await (const chunk of stream) {
      if (chunk.message?.content) {
        yield chunk.message.content
      }
    }
  } catch (error) {
    console.error('Ollama streaming error:', error)
    throw error
  }
}

/**
 * Pull a model from Ollama registry
 */
export async function pullModel(model: string = 'llama3.1'): Promise<void> {
  try {
    await ollama.pull({ model })
    console.log(`Model ${model} pulled successfully`)
  } catch (error) {
    console.error('Failed to pull model:', error)
    throw error
  }
}

/**
 * List available local models
 */
export async function listLocalModels(): Promise<string[]> {
  try {
    const response = await ollama.list()
    return response.models.map(m => m.name)
  } catch (error) {
    console.error('Failed to list models:', error)
    return []
  }
}

/**
 * Check if Ollama is available
 */
export async function isOllamaAvailable(): Promise<boolean> {
  try {
    await ollama.list()
    return true
  } catch {
    return false
  }
}
