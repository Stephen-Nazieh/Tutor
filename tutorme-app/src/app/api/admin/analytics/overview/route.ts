import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'

export const GET = withAuth(async () => {
  return NextResponse.json(
    {
      error: 'Legacy feature removed',
      message: 'Analytics overview has been redesigned. Please use the new dashboard.',
    },
    { status: 410 }
  )
}, { role: 'ADMIN' })
