/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { loadOptionalServerModule } from '@/lib/pdf-tutoring/server-utils'

function asMarkdown(text: string): string {
  return text
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, idx) => `### Section ${idx + 1}\n\n${chunk}`)
    .join('\n\n')
}

export const POST = withAuth(async (req: NextRequest) => {
  const formData = await req.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'file is required' }, { status: 400 })
  }

  const bytes = Buffer.from(await file.arrayBuffer())

  // Preferred parser check: unpdf -> pdf-parse.
  const unpdf = await loadOptionalServerModule<any>('unpdf')
  const pdfParse = await loadOptionalServerModule<any>('pdf-parse')

  let extractedText = ''

  if (unpdf?.extractText) {
    try {
      const output = await unpdf.extractText(bytes)
      extractedText = String(output?.text || '')
    } catch {
      extractedText = ''
    }
  }

  if (!extractedText && typeof pdfParse === 'function') {
    try {
      const output = await pdfParse(bytes)
      extractedText = String(output?.text || '')
    } catch {
      extractedText = ''
    }
  }

  if (!extractedText) {
    // Lightweight fallback to preserve operability if optional parsers are missing.
    extractedText = await file.text().catch(() => '')
    
    // If still no text and no PDF parsers available, return helpful error
    if (!extractedText && !unpdf?.extractText && typeof pdfParse !== 'function') {
      return NextResponse.json({
        error: 'PDF parsing libraries not available',
        text: '',
        markdown: '',
        parser: 'none',
        hint: 'Install unpdf or pdf-parse: npm install unpdf pdf-parse',
      }, { status: 503 })
    }
  }

  return NextResponse.json({
    text: extractedText,
    markdown: asMarkdown(extractedText),
    parser: unpdf?.extractText ? 'unpdf' : (typeof pdfParse === 'function' ? 'pdf-parse' : 'fallback-text'),
    technologyCheck: {
      unpdfAvailable: Boolean(unpdf?.extractText),
      pdfParseAvailable: typeof pdfParse === 'function',
    },
  })
})
