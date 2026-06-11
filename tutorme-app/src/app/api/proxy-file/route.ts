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

export const runtime = 'nodejs'

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

    const response = await fetch(urlToFetch, {
      method: 'GET',
      redirect: 'manual',
      // Forward a minimal user-agent so GCS doesn't block us
      headers: { 'User-Agent': 'TutorMe-Proxy/1.0' },
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `Upstream returned ${response.status}` },
        { status: response.status >= 500 ? response.status : 502 }
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
