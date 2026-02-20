/**
 * Whiteboard Export API
 * GET /api/whiteboards/[id]/export?format=pdf|png|svg|json
 * 
 * Export whiteboard in various formats
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// SVG export helper
function generateSVG(pages: any[], width: number, height: number): string {
  const page = pages[0] // Export first page for now
  
  let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${page.backgroundColor || '#ffffff'}"/>
`
  
  // Add strokes
  const strokes = page.strokes || []
  strokes.forEach((stroke: any) => {
    if (stroke.points && stroke.points.length > 1) {
      const points = stroke.points.map((p: any) => `${p.x},${p.y}`).join(' ')
      svg += `  <polyline points="${points}" fill="none" stroke="${stroke.color}" stroke-width="${stroke.width}" stroke-linecap="round" stroke-linejoin="round"/>\n`
    }
  })
  
  // Add shapes
  const shapes = page.shapes || []
  shapes.forEach((shape: any) => {
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
  
  // Add texts
  const texts = page.texts || []
  texts.forEach((text: any) => {
    const lines = text.text.split('\n')
    lines.forEach((line: string, i: number) => {
      svg += `  <text x="${text.x}" y="${text.y + (i + 1) * text.fontSize}" fill="${text.color}" font-size="${text.fontSize}" font-family="sans-serif">${line}</text>\n`
    })
  })
  
  svg += '</svg>'
  return svg
}

export const GET = withAuth(async (req: NextRequest, session, context) => {
  const params = await context?.params
  const whiteboardId = params?.id as string
  const userId = session.user.id
  const { searchParams } = new URL(req.url)
  const format = searchParams.get('format') || 'json'
  const pageIndex = parseInt(searchParams.get('page') || '0', 10)
  
  try {
    // Verify ownership
    const whiteboard = await db.whiteboard.findFirst({
      where: { id: whiteboardId, tutorId: userId, deletedAt: null },
      include: { pages: { orderBy: { order: 'asc' } } },
    })
    
    if (!whiteboard) {
      return NextResponse.json(
        { error: 'Whiteboard not found' },
        { status: 404 }
      )
    }
    
    switch (format) {
      case 'json': {
        return NextResponse.json({
          whiteboard: {
            id: whiteboard.id,
            title: whiteboard.title,
            description: whiteboard.description,
            width: whiteboard.width,
            height: whiteboard.height,
            backgroundColor: whiteboard.backgroundColor,
            backgroundStyle: whiteboard.backgroundStyle,
            pages: whiteboard.pages,
            exportedAt: new Date().toISOString(),
          },
        })
      }
      
      case 'svg': {
        const svg = generateSVG(
          [whiteboard.pages[pageIndex] || whiteboard.pages[0]],
          whiteboard.width,
          whiteboard.height
        )
        return new NextResponse(svg, {
          headers: {
            'Content-Type': 'image/svg+xml',
            'Content-Disposition': `attachment; filename="${whiteboard.title}.svg"`,
          },
        })
      }
      
      case 'pdf':
      case 'png': {
        // For PDF/PNG, return a message that server-side rendering is needed
        // In production, use a headless browser or canvas library
        return NextResponse.json({
          message: `${format.toUpperCase()} export requires server-side rendering. Use client-side export or implement a rendering service.`,
          whiteboard: {
            id: whiteboard.id,
            title: whiteboard.title,
            pageCount: whiteboard.pages.length,
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
