export interface FetchWithTimeoutOptions {
  timeoutMs?: number
  /**
   * Retries on transient failures (network errors, 429, 5xx by default).
   * Keep small to avoid piling up server load.
   */
  retries?: number
  /** Base delay for exponential backoff. Default 200ms. */
  retryBaseDelayMs?: number
  /** Status codes that should be retried. Default: 429, 500, 502, 503, 504 */
  retryOnStatuses?: number[]
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function defaultRetryOnStatuses(): number[] {
  return [429, 500, 502, 503, 504]
}

/**
 * Fetch wrapper that enforces an upper bound on request time.
 *
 * - Uses AbortController when supported
 * - Preserves any caller-provided AbortSignal (aborts if either triggers)
 */
export async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit = {},
  opts: Pick<FetchWithTimeoutOptions, 'timeoutMs'> = {}
): Promise<Response> {
  const timeoutMs = opts.timeoutMs

  if (!timeoutMs || timeoutMs <= 0) {
    return fetch(input, init)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  const originalSignal = init.signal
  const onOriginalAbort = () => controller.abort()
  if (originalSignal) {
    if (originalSignal.aborted) controller.abort()
    else originalSignal.addEventListener('abort', onOriginalAbort, { once: true })
  }

  try {
    return await fetch(input, { ...init, signal: controller.signal })
  } finally {
    clearTimeout(timeoutId)
    if (originalSignal) {
      try {
        originalSignal.removeEventListener('abort', onOriginalAbort)
      } catch {
        // best-effort; some polyfills may not support it
      }
    }
  }
}

/**
 * Fetch wrapper with timeout + limited retries for transient failures.
 *
 * Retries:
 * - network errors (except AbortError)
 * - HTTP statuses in retryOnStatuses
 */
export async function fetchWithTimeoutAndRetry(
  input: RequestInfo | URL,
  init: RequestInit = {},
  opts: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const retries = opts.retries ?? 1
  const baseDelay = opts.retryBaseDelayMs ?? 200
  const retryOnStatuses = opts.retryOnStatuses ?? defaultRetryOnStatuses()

  let attempt = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetchWithTimeout(input, init, { timeoutMs: opts.timeoutMs })
      if (res.ok) return res
      if (attempt >= retries || !retryOnStatuses.includes(res.status)) return res
    } catch (err: any) {
      const name = err?.name
      if (name === 'AbortError') throw err
      if (attempt >= retries) throw err
    }

    const exp = Math.min(4, attempt) // cap exponent
    const jitter = Math.random() * 50
    await sleep(baseDelay * Math.pow(2, exp) + jitter)
    attempt += 1
  }
}

