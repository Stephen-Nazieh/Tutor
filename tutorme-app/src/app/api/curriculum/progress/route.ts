import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'

export const GET = withAuth(async () => {
  return NextResponse.json({ 
    error: 'Legacy feature removed',
    message: 'This feature has been redesigned. Please use the new course builder.'
  }, { status: 410 })
})

export const POST = withAuth(async () => {
  return NextResponse.json({ 
    error: 'Legacy feature removed',
    message: 'This feature has been redesigned. Please use the new course builder.'
  }, { status: 410 })
})

