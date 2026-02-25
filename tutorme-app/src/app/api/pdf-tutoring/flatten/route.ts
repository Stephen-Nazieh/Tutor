/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { withAuth } from '@/lib/api/middleware'
import { loadOptionalServerModule } from '@/lib/pdf-tutoring/server-utils'
import { percentToPx } from '@/lib/pdf-tutoring/coordinates'
import type { PercentFabricObject } from '@/lib/pdf-tutoring/types'

const schema = z.object({
  originalPdfBase64: z.string().min(20),
  fabric: z.object({
    page: z.number().int().min(1).default(1),
    width: z.number().positive(),
    height: z.number().positive(),
    objects: z.array(z.any()),
  }),
})

function parseHexColor(input?: string): { r: number; g: number; b: number } {
  if (!input) return { r: 1, g: 0, b: 0 }
  const hex = input.trim().replace('#', '')
  if (hex.length !== 6) return { r: 1, g: 0, b: 0 }
  const r = parseInt(hex.slice(0, 2), 16) / 255
  const g = parseInt(hex.slice(2, 4), 16) / 255
  const b = parseInt(hex.slice(4, 6), 16) / 255
  return { r, g, b }
}

export const POST = withAuth(async (req: NextRequest) => {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 })
  }

  const pdfLib = await loadOptionalServerModule<any>('pdf-lib')
  const PDFDocument = pdfLib?.PDFDocument
  const rgb = pdfLib?.rgb

  if (!PDFDocument || !rgb) {
    return NextResponse.json({
      error: 'pdf-lib is not installed',
      hint: 'Install pdf-lib to enable PDF flattening: npm install pdf-lib',
    }, { status: 503 })
  }

  const originalBytes = Buffer.from(parsed.data.originalPdfBase64, 'base64')
  const pdfDoc = await PDFDocument.load(originalBytes)
  const page = pdfDoc.getPage(parsed.data.fabric.page - 1)

  if (!page) {
    return NextResponse.json({ error: 'Page not found' }, { status: 404 })
  }

  const pageHeight = page.getHeight()
  const canvasW = parsed.data.fabric.width
  const canvasH = parsed.data.fabric.height

  const objects = parsed.data.fabric.objects as PercentFabricObject[]

  for (const obj of objects) {
    const strokeColor = parseHexColor(obj.stroke || '#ef4444')
    const fillColor = parseHexColor(obj.fill || obj.stroke || '#ef4444')

    const left = percentToPx(obj.left || 0, canvasW)
    const top = percentToPx(obj.top || 0, canvasH)
    const width = percentToPx(obj.width || 0, canvasW)
    const height = percentToPx(obj.height || 0, canvasH)
    const strokeWidth = Math.max(1, percentToPx(obj.strokeWidth || 0.4, Math.min(canvasW, canvasH)))
    const yPdf = pageHeight - top - height

    if (obj.type === 'rect') {
      page.drawRectangle({
        x: left,
        y: yPdf,
        width,
        height,
        borderColor: rgb(strokeColor.r, strokeColor.g, strokeColor.b),
        borderWidth: strokeWidth,
        color: rgb(fillColor.r, fillColor.g, fillColor.b),
        opacity: 0.12,
      })
      continue
    }

    if (obj.type === 'circle') {
      const radius = percentToPx(obj.radius || 0, Math.min(canvasW, canvasH))
      page.drawCircle({
        x: left,
        y: pageHeight - top,
        size: radius,
        borderColor: rgb(strokeColor.r, strokeColor.g, strokeColor.b),
        borderWidth: strokeWidth,
      })
      continue
    }

    if (obj.type === 'i-text' || obj.type === 'text' || obj.type === 'textbox') {
      page.drawText(obj.text || '', {
        x: left,
        y: pageHeight - top,
        size: percentToPx(obj.fontSize || 1.2, canvasH),
        color: rgb(strokeColor.r, strokeColor.g, strokeColor.b),
      })
      continue
    }

    if (Array.isArray(obj.path)) {
      let prevX: number | null = null
      let prevY: number | null = null
      for (const seg of obj.path) {
        if (!Array.isArray(seg) || seg.length < 3) continue
        const cmd = String(seg[0]).toUpperCase()
        const x = percentToPx(Number(seg[1]), canvasW)
        const y = percentToPx(Number(seg[2]), canvasH)
        const yy = pageHeight - y

        if (cmd === 'M') {
          prevX = x
          prevY = yy
          continue
        }

        if ((cmd === 'L' || cmd === 'Q' || cmd === 'C') && prevX !== null && prevY !== null) {
          page.drawLine({
            start: { x: prevX, y: prevY },
            end: { x, y: yy },
            thickness: strokeWidth,
            color: rgb(strokeColor.r, strokeColor.g, strokeColor.b),
          })
          prevX = x
          prevY = yy
        }
      }
    }
  }

  const out = await pdfDoc.save()

  return new NextResponse(Buffer.from(out), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="flattened-marked.pdf"',
    },
  })
})
