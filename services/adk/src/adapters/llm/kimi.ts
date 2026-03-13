interface KimiMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface KimiResponse {
  choices: Array<{ message: { content: string } }>
}

const KIMI_BASE_URL = 'https://api.moonshot.cn/v1'

export async function generateWithKimi(prompt: string, options: {
  model?: string
  temperature?: number
  maxTokens?: number
  systemPrompt?: string
} = {}): Promise<string> {
  const apiKey = process.env.KIMI_API_KEY
  if (!apiKey) throw new Error('KIMI_API_KEY not configured')

  const messages: KimiMessage[] = []
  if (options.systemPrompt) messages.push({ role: 'system', content: options.systemPrompt })
  messages.push({ role: 'user', content: prompt })

  const response = await fetch(`${KIMI_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: options.model || 'kimi-k2.5',
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.maxTokens ?? 2048,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Kimi API error: ${response.status} - ${error}`)
  }

  const data = (await response.json()) as KimiResponse
  return data.choices?.[0]?.message?.content || ''
}
