/**
 * Whiteboard Export API
 * GET /api/whiteboards/[id]/export?format=pdf|png|svg|json
 *
 * Export whiteboard in various formats
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { whiteboard, whiteboardPage } from '@/lib/db/schema'
import { eq, and, isNull, asc } from 'drizzle-orm'

// SVG export helper
function generateSVG(
  pages: { strokes?: unknown[]; shapes?: unknown[]; texts?: unknown[]; backgroundColor?: string | null }[],
  width: number,
  height: number
): string {
  const page = pages[0] ?? {}

  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${page.backgroundColor || '#ffffff'}"/>
`

  const strokes = (page.strokes as { points?: { x: number; y: number }[]; color?: string; width?: number }[]) || []
  strokes.forEach((stroke: { points?: { x: number; y: number }[]; color?: string; width?: number }) => {
    if (stroke.points && stroke.points.length > 1) {
      const points = stroke.points.map((p) => `${p.x},${p.y}`).join(' ')
      svg += `  <polyline points="${points}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    }
  })

  const shapes = (page.shapes as { type: string; x: number; y: number; width: number; height: number; color?: string; lineWidth?: number }[]) || []
  shapes.forEach((shape) => {
    if (shape.type === 'rectangle') {
      svg += `  <rect x="${shape.x}" y="${shape.y}" width="${shape.width}" height="${shape.height}" fill="none" stroke="${shape.color}" stroke-width="${shape.lineWidth}"/>\n`
    } else if (shape.type === 'circle') {
      const rx = Math.abs(shape.width) / 2
      const ry = Math.abs(shape.height) / 2
      svg += `  <ellipse cx="${shape.x + rx}" cy="${shape.y + ry}" rx="${rx}" ry="${ry}" fill="none" stroke="${shape.color}" stroke-width="${shape.lineWidth}"/>\n`
    } else if (shape.type === 'line') {
      svg += `  <line x1="${shape.x}" y1="${shape.y}" x2="${shape.width}" y2="${shape.height}" stroke="${shape.color}" stroke-width="${shape.lineWidth}" stroke-linecap="round"/>\n`
    }
  })

  const texts = (page.texts as { text: string; x: number; y: number; color?: string; fontSize?: number }[]) || []
  texts.forEach((text) => {
    const lines = text.text.split('\n')
    lines.forEach((line: string, i: number) => {
      svg += `  <text x="${text.x}" y="${text.y + (i + 1) * (text.fontSize ?? 16)}" fill="${text.color}" font-size="${text.fontSize}" font-family="sans-serif">${line}</text>\n`
    })
  })

  svg += '</svg>'
  return svg
}

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const whiteboardId = await getParamAsync(context?.params, 'id')
  if (!whiteboardId) {
    return NextResponse.json({ error: 'Whiteboard ID required' }, { status: 400 })
  }
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'json'
  const pageIndex = parseInt(searchParams.get('page') || '0', 10)

  try {
    const [wb] = await drizzleDb
      .select()
      .from(whiteboard)
      .where(
        and(
          eq(whiteboard.id, whiteboardId),
          eq(whiteboard.tutorId, userId),
          isNull(whiteboard.deletedAt)
        )
      )
      .limit(1)

    if (!wb) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }

    const pages = await drizzleDb
      .select()
      .from(whiteboardPage)
      .where(eq(whiteboardPage.whiteboardId, whiteboardId))
      .orderBy(asc(whiteboardPage.order))

    switch (format) {
      case 'json': {
        return NextResponse.json({
          whiteboard: {
            id: wb.id,
            title: wb.title,
            description: wb.description,
            width: wb.width,
            height: wb.height,
            backgroundColor: wb.backgroundColor,
            backgroundStyle: wb.backgroundStyle,
            pages,
            exportedAt: new Date().toISOString(),
          },
        })
      }

      case 'svg': {
        const targetPage = pages[pageIndex] ?? pages[0]
        const pageForSvg = targetPage
          ? [{
              strokes: Array.isArray(targetPage.strokes) ? targetPage.strokes : [],
              shapes: Array.isArray(targetPage.shapes) ? targetPage.shapes : undefined,
              texts: Array.isArray(targetPage.texts) ? targetPage.texts : undefined,
              backgroundColor: targetPage.backgroundColor ?? undefined,
            }]
          : []
        const svg = generateSVG(pageForSvg, wb.width, wb.height)
        return new NextResponse(svg, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Content-Disposition': `attachment; filename="${wb.title}.svg"`,
          },
        })
      }

      case 'pdf':
      case 'png': {
        return NextResponse.json({
          message: `${format.toUpperCase()} export requires server-side rendering. Use client-side export or implement a rendering service.`,
          whiteboard: {
            id: wb.id,
            title: wb.title,
            pageCount: pages.length,
          },
        })
      }

      default:
        return NextResponse.json(
          { error: 'Unsupported format. Use: json, svg, pdf, png' },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Export whiteboard error:', error)
    return NextResponse.json(
      { error: 'Failed to export whiteboard' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
