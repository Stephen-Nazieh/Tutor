/**
 * GET /api/proxy-file?url=<encoded-url>
 *
 * Proxies a file fetch server-side to avoid CORS issues.
 * Used by the Course Builder to load PDFs from GCS or external URLs.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { assertSafeProxyUrl } from '@/lib/security/proxy-url'
import { isGcsConfigured, refreshGcsUrl } from '@/lib/storage/gcs'

const MAX_SIZE_BYTES = 50 * 1024 * 1024 // 50MB
const MAX_REDIRECTS = 5

export const runtime = 'nodejs'

/**
 * Fetch a URL, following redirects manually so each hop can be re-validated
 * with assertSafeProxyUrl (prevents SSRF via a redirect to an internal host).
 */
async function fetchFollowingRedirects(startUrl: string): Promise<Response> {
  let currentUrl = startUrl
  for (let i = 0; i <= MAX_REDIRECTS; i++) {
    const response = await fetch(currentUrl, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': 'TutorMe-Proxy/1.0' },
    })

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get('location')
      if (!location) return response
      const nextUrl = new URL(location, currentUrl)
      const safeNext = await assertSafeProxyUrl(nextUrl.toString())
      currentUrl = safeNext.toString()
      continue
    }

    return response
  }
  throw new Error('Too many redirects')
}

async function readLimitedResponse(response: Response): Promise<Buffer> {
  if (!response.body) return Buffer.from(await response.arrayBuffer())

  const reader = response.body.getReader()
  const chunks: Buffer[] = []
  let total = 0

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    total += value.byteLength
    if (total > MAX_SIZE_BYTES) {
      await reader.cancel()
      throw new Error('File too large')
    }
    chunks.push(Buffer.from(value))
  }

  return Buffer.concat(chunks)
}

export const GET = withAuth(async (req: NextRequest) => {
  const { searchParams } = new URL(req.url)
  const targetUrl = searchParams.get('url')

  if (!targetUrl) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  let urlToFetch = targetUrl
  try {
    const safeUrl = await assertSafeProxyUrl(targetUrl)
    urlToFetch = safeUrl.toString()

    // Refresh expired GCS presigned URLs before fetching.
    // Cached per object key so repeated requests for the same file don't exhaust signBlob quota.
    if (isGcsConfigured()) {
      try {
        const refreshed = await refreshGcsUrl(urlToFetch, 3600)
        if (refreshed !== urlToFetch) {
          urlToFetch = refreshed
        }
      } catch {
        // If refresh fails, proceed with the validated URL
      }
    }

    const response = await fetchFollowingRedirects(urlToFetch)

    if (!response.ok) {
      // Surface the upstream error body (often a short XML/JSON message from
      // GCS, e.g. "Request has expired" for a stale signed URL) so the UI can
      // show something actionable instead of a bare status code.
      let detail = ''
      try {
        detail = (await response.text()).slice(0, 500)
      } catch {
        // ignore — body may not be readable
      }

      // 4xx/5xx from the upstream (expired/invalid link, not found, forbidden,
      // upstream error) describe a real problem with the document itself —
      // pass the real status through. Only an unresolved redirect (3xx with no
      // Location) is a genuine gateway failure.
      const status = response.status >= 400 ? response.status : 502
      return NextResponse.json(
        {
          error: `Upstream returned ${response.status}${detail ? `: ${detail}` : ''}`,
        },
        { status }
      )
    }

    const contentLength = response.headers.get('content-length')
    if (contentLength && parseInt(contentLength, 10) > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 })
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream'
    const buffer = await readLimitedResponse(response)

    return new NextResponse(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    console.error('[proxy-file] Fetch failed:', urlToFetch, error)
    const message = error instanceof Error ? error.message : 'Failed to fetch file'
    const status = message.includes('too large')
      ? 413
      : message.includes('URL') ||
          message.includes('protocol') ||
          message.includes('network') ||
          message.includes('hosts')
        ? 400
        : 502
    return NextResponse.json({ error: message }, { status })
  }
})
