/**
 * Code execution sandbox API.
 * POST /api/code/run — run code in Docker (Python or JavaScript).
 * Requires auth, CSRF, and rate limit; execution is sandboxed.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, requireCsrf } from '@/lib/api/middleware'
import { withRateLimit } from '@/lib/api/middleware'
import { runInSandbox, type SandboxLanguage } from '@/lib/code-runner/sandbox'
import { z } from 'zod'

const bodySchema = z.object({
  language: z.enum(['python', 'javascript']),
  code: z.string().min(1).max(16 * 1024),
})

async function postHandler(req: NextRequest) {
  const csrfError = await requireCsrf(req)
  if (csrfError) return csrfError

  const { response: rateLimitRes } = await withRateLimit(req, 30)
  if (rateLimitRes) return rateLimitRes

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON body' },
      { status: 400 }
    )
  }

  const parsed = bodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Invalid request', details: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const { language, code } = parsed.data

  try {
    const result = await runInSandbox(language as SandboxLanguage, code)
    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      timedOut: result.timedOut,
      error: result.error ?? undefined,
    })
  } catch (err) {
    console.error('[code/run]', err)
    return NextResponse.json(
      { error: 'Code execution failed' },
      { status: 500 }
    )
  }
}

export const POST = withAuth(postHandler)
