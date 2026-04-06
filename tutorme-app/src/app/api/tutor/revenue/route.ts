/**
 * GET /api/tutor/revenue
 * Legacy clinic revenue removed; returns empty revenue summary.
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'

export const GET = withAuth(
  async (_req: NextRequest) => {
    return NextResponse.json({
      summary: {
        availableBalance: 0,
        periodEarnings: 0,
        periodChange: 0,
        totalBookings: 0,
        avgBookingValue: 0,
        pendingAmount: 0,
        currency: 'SGD',
      },
      transactions: [],
      courses: [],
      timeSlots: [],
      monthlyTrend: [],
    })
  },
  { role: 'TUTOR' }
)
