/**
 * Revenue Balance API
 * 
 * GET /api/tutor/revenue/balance
 * Returns current available balance and earnings summary
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  
  // Get all completed payments for this tutor
  const completedPayments = await db.payment.findMany({
    where: {
      status: 'COMPLETED',
      OR: [
        { tutorId },
        { booking: { clinic: { tutorId } } },
        { enrollment: { curriculum: { creatorId: tutorId } } },
      ],
    },
    select: {
      id: true,
      amount: true,
      currency: true,
      createdAt: true,
    },
  })
  
  // Get pending payments
  const pendingPayments = await db.payment.findMany({
    where: {
      status: { in: ['PENDING', 'PROCESSING'] },
      OR: [
        { tutorId },
        { booking: { clinic: { tutorId } } },
        { enrollment: { curriculum: { creatorId: tutorId } } },
      ],
    },
    select: {
      amount: true,
      currency: true,
    },
  })
  
  // Get all payouts
  const payouts = await db.payout.findMany({
    where: {
      tutorId,
    },
    select: {
      amount: true,
      status: true,
    },
  })
  
  // Calculate totals
  const totalEarnings = completedPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
  const pendingAmount = pendingPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
  const totalPayouts = payouts
    .filter(p => p.status === 'COMPLETED')
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  const pendingPayouts = payouts
    .filter(p => p.status === 'PENDING' || p.status === 'PROCESSING')
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  
  const availableBalance = totalEarnings - totalPayouts - pendingPayouts
  
  // Calculate this month's earnings
  const now = new Date()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const thisMonthEarnings = completedPayments
    .filter(p => new Date(p.createdAt) >= monthStart)
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  
  // Calculate last month's earnings for comparison
  const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0)
  const lastMonthEarnings = completedPayments
    .filter(p => {
      const date = new Date(p.createdAt)
      return date >= lastMonthStart && date <= lastMonthEnd
    })
    .reduce((sum, p) => sum + (p.amount || 0), 0)
  
  const monthlyChange = lastMonthEarnings > 0
    ? ((thisMonthEarnings - lastMonthEarnings) / lastMonthEarnings) * 100
    : 0
  
  // Get recent payments (last 5)
  const recentPayments = completedPayments
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)
    .map(p => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      date: p.createdAt,
    }))
  
  return NextResponse.json({
    balance: {
      available: Math.round(availableBalance * 100) / 100,
      pending: Math.round(pendingAmount * 100) / 100,
      pendingPayouts: Math.round(pendingPayouts * 100) / 100,
      totalEarnings: Math.round(totalEarnings * 100) / 100,
      totalPayouts: Math.round(totalPayouts * 100) / 100,
    },
    thisMonth: {
      earnings: Math.round(thisMonthEarnings * 100) / 100,
      change: Math.round(monthlyChange * 10) / 10,
    },
    recentPayments,
    currency: 'SGD',
  })
}, { role: 'TUTOR' })
