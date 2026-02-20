/**
 * Tutor Resources API
 * GET /api/tutor/resources - List tutor's resources
 * POST /api/tutor/resources - Create a new resource record (after upload)
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - List resources
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const type = searchParams.get('type')
  const search = searchParams.get('search')
  
  const where: any = { tutorId }
  
  if (type && type !== 'all') {
    where.type = type
  }
  
  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { tags: { has: search } },
    ]
  }
  
  const resources = await db.resource.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json({ resources })
}, { role: 'TUTOR' })

// POST - Create resource record
export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  try {
    const body = await req.json()
    const { name, description, type, size, mimeType, url, key, tags, isPublic } = body
    
    if (!name || !type || !url || !key) {
      return NextResponse.json(
        { error: 'Missing required fields: name, type, url, key' },
        { status: 400 }
      )
    }
    
    const resource = await db.resource.create({
      data: {
        tutorId,
        name: name.slice(0, 255),
        description: description?.slice(0, 1000),
        type,
        size: size || 0,
        mimeType,
        url,
        key,
        tags: tags || [],
        isPublic: isPublic || false,
      },
    })
    
    return NextResponse.json({ resource }, { status: 201 })
  } catch (error) {
    console.error('Create resource error:', error)
    return NextResponse.json(
      { error: 'Failed to create resource' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })
