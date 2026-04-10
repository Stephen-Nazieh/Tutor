import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'

export const GET = withAuth(async () => {
  return NextResponse.json({ 
    error: 'Legacy feature removed',
    message: 'User management has been redesigned.'
  }, { status: 410 })
})
