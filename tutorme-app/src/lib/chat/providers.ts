/**
 * AI Provider clients for Solocorn Chat
 * Supports Kimi (primary) and Gemini (fallback)
 */

import { SOLOCORN_SYSTEM_PROMPT } from './system-prompt';

// Configuration
const KIMI_API_KEY = process.env.KIMI_API_KEY;
const KIMI_BASE_URL = 'https://api.moonshot.cn/v1';
const KIMI_MODEL = 'kimi-k2.5';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = 'gemini-1.5-flash';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamResponse {
  content: string;
  done: boolean;
}

/**
 * Stream chat completion from Kimi API
 */
export async function* streamKimiResponse(
  messages: ChatMessage[],
  abortSignal?: AbortSignal
): AsyncGenerator<StreamResponse> {
  if (!KIMI_API_KEY) {
    throw new Error('KIMI_API_KEY not configured');
  }

  const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KIMI_API_KEY}`,
    },
    body: JSON.stringify({
      model: KIMI_MODEL,
      messages,
      temperature: 0.8,
      max_tokens: 2048,
      stream: true,
    }),
    signal: abortSignal,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Kimi API error: ${response.status} ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data:')) continue;
        
        const data = trimmed.slice(5).trim();
        if (data === '[DONE]') {
          yield { content: '', done: true };
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content || '';
          if (content) {
            yield { content, done: false };
          }
        } catch {
          // Skip invalid JSON
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  yield { content: '', done: true };
}

/**
 * Stream chat completion from Gemini API
 */
export async function* streamGeminiResponse(
  messages: ChatMessage[],
  abortSignal?: AbortSignal
): AsyncGenerator<StreamResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Convert messages to Gemini format
  const systemMessage = messages.find(m => m.role === 'system');
  const chatMessages = messages.filter(m => m.role !== 'system');
  
  const contents = chatMessages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:streamGenerateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: systemMessage ? {
          parts: [{ text: systemMessage.content }]
        } : undefined,
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 2048,
        },
      }),
      signal: abortSignal,
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${error}`);
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error('No response body');
  }

  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;

        try {
          // Gemini returns array of candidates
          const parsed = JSON.parse(trimmed);
          const candidates = Array.isArray(parsed) ? parsed : [parsed];
          
          for (const candidate of candidates) {
            const content = candidate.candidates?.[0]?.content?.parts?.[0]?.text || '';
            if (content) {
              yield { content, done: false };
            }
          }
        } catch {
          // Skip invalid JSON
        }
      }
    }
  } finally {
    reader.releaseLock();
  }

  yield { content: '', done: true };
}

/**
 * Try Kimi first, fall back to Gemini
 */
export async function* streamAIResponse(
  messages: ChatMessage[],
  abortSignal?: AbortSignal
): AsyncGenerator<StreamResponse> {
  // Try Kimi first
  if (KIMI_API_KEY) {
    try {
      console.log('Trying Kimi API...');
      yield* streamKimiResponse(messages, abortSignal);
      return;
    } catch (error) {
      console.log('Kimi failed, trying Gemini:', error);
    }
  }

  // Fall back to Gemini
  if (GEMINI_API_KEY) {
    try {
      console.log('Trying Gemini API...');
      yield* streamGeminiResponse(messages, abortSignal);
      return;
    } catch (error) {
      console.log('Gemini also failed:', error);
      throw error;
    }
  }

  throw new Error('No AI provider available');
}

/**
 * Build messages array with system prompt
 */
export function buildMessages(
  userMessage: string,
  conversationHistory: ChatMessage[],
  language: string
): ChatMessage[] {
  const languageInstruction = language !== 'en' 
    ? `\n\nRespond in ${language}.`
    : '';

  return [
    { role: 'system', content: SOLOCORN_SYSTEM_PROMPT + languageInstruction },
    ...conversationHistory,
    { role: 'user', content: userMessage }
  ];
}
