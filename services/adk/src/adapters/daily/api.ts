const DAILY_API_URL = 'https://api.daily.co/v1'

function getApiKey(): string {
  const key = process.env.DAILY_API_KEY
  if (!key) throw new Error('DAILY_API_KEY not configured')
  return key
}

export async function dailyFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${DAILY_API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Daily API error: ${res.status} ${text}`)
  }
  return res
}

export async function getTranscriptAccessLink(transcriptId: string): Promise<string> {
  const res = await dailyFetch(`/transcript/${encodeURIComponent(transcriptId)}/access-link`, {
    method: 'GET',
  })
  const data = (await res.json()) as { link?: string }
  if (!data?.link || typeof data.link !== 'string' || !data.link.startsWith('http')) {
    throw new Error('Transcript access link not available')
  }
  return data.link
}

export async function downloadTextFile(url: string): Promise<string> {
  const res = await fetch(url, { method: 'GET' })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Download error: ${res.status} ${text}`)
  }
  return res.text()
}

