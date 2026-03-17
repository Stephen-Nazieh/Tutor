import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { fetchWithTimeout, fetchWithTimeoutAndRetry } from './fetch-utils'

function abortError(): Error {
  const err = new Error('The operation was aborted')
  ;(err as any).name = 'AbortError'
  return err
}

describe('ai/fetch-utils', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('aborts fetch after timeoutMs', async () => {
    vi.useFakeTimers()

    vi.spyOn(globalThis, 'fetch' as any).mockImplementation((_input: any, init?: any) => {
      return new Promise((_resolve, reject) => {
        const signal: AbortSignal | undefined = init?.signal
        if (signal?.aborted) return reject(abortError())
        signal?.addEventListener('abort', () => reject(abortError()), { once: true })
      })
    })

    const p = fetchWithTimeout('http://example.com', {}, { timeoutMs: 50 })
    const expectation = expect(p).rejects.toMatchObject({ name: 'AbortError' })
    await vi.advanceTimersByTimeAsync(60)
    await expectation
  })

  it('does not add a timeout when timeoutMs is missing', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch' as any).mockResolvedValue({ ok: true } as any)
    await fetchWithTimeout('http://example.com', { headers: { a: 'b' } })
    expect(fetchSpy).toHaveBeenCalledWith('http://example.com', { headers: { a: 'b' } })
  })

  it('retries on transient statuses up to retries', async () => {
    const fetchSpy = vi
      .spyOn(globalThis, 'fetch' as any)
      .mockResolvedValueOnce({ ok: false, status: 503 } as any)
      .mockResolvedValueOnce({ ok: true, status: 200 } as any)

    const res = await fetchWithTimeoutAndRetry('http://example.com', {}, { retries: 1, retryBaseDelayMs: 1 })
    expect(res.ok).toBe(true)
    expect(fetchSpy).toHaveBeenCalledTimes(2)
  })
})

