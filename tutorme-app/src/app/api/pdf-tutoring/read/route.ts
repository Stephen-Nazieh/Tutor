import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/api/middleware'
import { aiReadHandwritingToMarkdown } from '@/lib/pdf-tutoring/server-utils'

const schema = z.object({
  imageDataUrl: z.string().min(20),
  extraInstructions: z.string().optional(),
})

export const POST = withAuth(async (req: NextRequest) => {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })
  }

  const markdown = await aiReadHandwritingToMarkdown(parsed.data)
  return NextResponse.json({ markdown })
})
