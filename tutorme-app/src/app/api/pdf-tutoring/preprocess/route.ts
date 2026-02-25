/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { loadOptionalServerModule } from '@/lib/pdf-tutoring/server-utils'

export const POST = withAuth(async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const sharpMod = await loadOptionalServerModule<any>('sharp')
  const sharp = sharpMod?.default || sharpMod
  const source = Buffer.from(await file.arrayBuffer())

  if (!sharp) {
    return new NextResponse(source, {
      status: 200,
      headers: {
        'Content-Type': file.type || 'image/png',
        'X-Preprocess-Status': 'sharp-not-installed-pass-through',
      },
    })
  }

  const processed = await sharp(source)
    .grayscale()
    .normalize()
    .linear(1.15, -12)
    .sharpen()
    .png()
    .toBuffer()

  return new NextResponse(processed, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'X-Preprocess-Status': 'ok',
    },
  })
})
