import { fetchWithTimeoutAndRetry } from '@/lib/ai/fetch-utils'

interface AdkResponse {
  response: string
  parsed?: {
    text?: string
  } | null
}

function buildHeaders() {
  const authToken = process.env.ADK_AUTH_TOKEN
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (authToken) headers.Authorization = `Bearer ${authToken}`
  return headers
}

export async function adkGenerate(
  prompt: string,
  options?: { timeoutMs?: number; retries?: number }
): Promise<string> {
  const baseUrl = process.env.ADK_BASE_URL
  if (!baseUrl) throw new Error('ADK_BASE_URL not configured')
  const res = await fetchWithTimeoutAndRetry(
    `${baseUrl}/v1/llm/generate`,
    {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ prompt }),
    },
    { timeoutMs: options?.timeoutMs, retries: options?.retries }
  )
  if (!res.ok) throw new Error(`ADK generate failed: ${res.status}`)
  const data = (await res.json()) as AdkResponse
  return data.parsed?.text ?? data.response
}

export async function adkChat(
  messages: Array<{ role: string; content: string }>,
  options?: { timeoutMs?: number; retries?: number }
): Promise<string> {
  const baseUrl = process.env.ADK_BASE_URL
  if (!baseUrl) throw new Error('ADK_BASE_URL not configured')
  const res = await fetchWithTimeoutAndRetry(
    `${baseUrl}/v1/llm/chat`,
    {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify({ messages }),
    },
    { timeoutMs: options?.timeoutMs, retries: options?.retries }
  )
  if (!res.ok) throw new Error(`ADK chat failed: ${res.status}`)
  const data = (await res.json()) as AdkResponse
  return data.parsed?.text ?? data.response
}

export async function adkTutorChat(
  params: {
    studentId: string
    subject: string
    message: string
    conversationId?: string
  },
  options?: { timeoutMs?: number; retries?: number }
) {
  const baseUrl = process.env.ADK_BASE_URL
  if (!baseUrl) throw new Error('ADK_BASE_URL not configured')
  const res = await fetchWithTimeoutAndRetry(
    `${baseUrl}/v1/chat`,
    {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(params),
    },
    { timeoutMs: options?.timeoutMs, retries: options?.retries }
  )
  if (!res.ok) throw new Error(`ADK tutor chat failed: ${res.status}`)
  return res.json() as Promise<{ response: string; conversationId: string }>
}

export async function adkPciMasterChat(
  params: {
    userId: string
    sessionId?: string
    message: string
    context?: {
      type?: 'task' | 'assessment'
      title?: string
      content?: string
      pci?: string
      extensionName?: string
    }
  },
  options?: { timeoutMs?: number; retries?: number }
) {
  const baseUrl = process.env.ADK_BASE_URL
  if (!baseUrl) throw new Error('ADK_BASE_URL not configured')
  const res = await fetchWithTimeoutAndRetry(
    `${baseUrl}/v1/pci-master`,
    {
      method: 'POST',
      headers: buildHeaders(),
      body: JSON.stringify(params),
    },
    { timeoutMs: options?.timeoutMs, retries: options?.retries }
  )
  if (!res.ok) throw new Error(`ADK PCI Master failed: ${res.status}`)
  return res.json() as Promise<{
    response: string
    conversationId: string
    parsed?: { response?: string }
  }>
}
