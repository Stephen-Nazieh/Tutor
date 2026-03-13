import { describe, it, expect, vi, beforeEach } from 'vitest'
import { adkGenerate, adkChat } from './adk-client'

describe('adk-client', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    process.env.ADK_BASE_URL = 'http://adk-service'
    process.env.ADK_AUTH_TOKEN = 'token'
  })

  it('calls ADK generate endpoint', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'ok' }),
    } as any)

    const result = await adkGenerate('hello')
    expect(result).toBe('ok')
    expect(fetchSpy).toHaveBeenCalled()
  })

  it('calls ADK chat endpoint', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch' as any).mockResolvedValue({
      ok: true,
      json: async () => ({ response: 'ok' }),
    } as any)

    const result = await adkChat([{ role: 'user', content: 'hi' }])
    expect(result).toBe('ok')
    expect(fetchSpy).toHaveBeenCalled()
  })
})
