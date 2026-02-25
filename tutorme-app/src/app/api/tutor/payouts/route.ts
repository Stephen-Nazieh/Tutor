/**
 * Payout Management API
 * 
 * GET /api/tutor/payouts - List all payouts for the tutor
 * POST /api/tutor/payouts - Request a new payout
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, ValidationError, parseBoundedInt } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET - List all payouts for the tutor
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)
  
  const status = searchParams.get('status')
  const limit = parseBoundedInt(searchParams.get('limit'), 50, { min: 1, max: 100 })
  const offset = parseBoundedInt(searchParams.get('offset'), 0, { min: 0, max: 10000 })
  
  const where: { tutorId: string; status?: string } = { tutorId }
  if (status) where.status = status
  
  const [payouts, totalCount] = await Promise.all([
    db.payout.findMany({
      where,
      include: {
        payments: {
          include: {
            payment: {
              select: {
                id: true,
                amount: true,
                currency: true,
                createdAt: true,
                booking: {
                  select: {
                    clinic: {
                      select: {
                        title: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { requestedAt: 'desc' },
      skip: offset,
      take: limit,
    }),
    db.payout.count({ where })
  ])
  
  // Format response
  const formattedPayouts = payouts.map(payout => ({
    id: payout.id,
    amount: payout.amount,
    currency: payout.currency,
    status: payout.status,
    method: payout.method,
    requestedAt: payout.requestedAt,
    processedAt: payout.processedAt,
    completedAt: payout.completedAt,
    transactionReference: payout.transactionReference,
    paymentCount: payout.payments.length,
    payments: payout.payments.map(pp => ({
      id: pp.payment.id,
      amount: pp.amount,
      description: pp.payment.booking?.clinic?.title || 'Course Payment',
      date: pp.payment.createdAt,
    })),
  }))
  
  return NextResponse.json({
    payouts: formattedPayouts,
    pagination: {
      total: totalCount,
      limit,
      offset,
      hasMore: offset + limit < totalCount,
    },
  })
}, { role: 'TUTOR' })

// POST - Request a new payout
export const POST = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const body = await req.json()
  const { amount, method, details } = body
  
  // Validate request
  if (!amount || amount <= 0) {
    throw new ValidationError('Valid payout amount is required')
  }
  
  if (!method) {
    throw new ValidationError('Payout method is required')
  }
  
  // Calculate available balance
  const [completedPayments, existingPayouts] = await Promise.all([
    // Get all completed payments for this tutor
    db.payment.findMany({
      where: {
        status: 'COMPLETED',
        OR: [
          { booking: { clinic: { tutorId } } },
          { metadata: { path: ['type'], equals: 'course' } },
        ],
      },
      select: {
        id: true,
        amount: true,
        currency: true,
      },
    }),
    // Get all completed/processed payouts
    db.payout.findMany({
      where: {
        tutorId,
        status: { in: ['COMPLETED', 'PROCESSING'] },
      },
      select: {
        amount: true,
      },
    }),
  ])
  
  const totalEarnings = completedPayments.reduce((sum, p) => sum + (p.amount || 0), 0)
  const totalPayouts = existingPayouts.reduce((sum, p) => sum + (p.amount || 0), 0)
  const availableBalance = totalEarnings - totalPayouts
  
  // Check if sufficient balance
  if (amount > availableBalance) {
    return NextResponse.json(
      { 
        error: 'Insufficient balance',
        availableBalance,
        requestedAmount: amount,
      },
      { status: 400 }
    )
  }
  
  // Get payments to include in this payout (oldest first)
  const paymentsToInclude = completedPayments
    .filter(p => p.currency === (details?.currency || 'SGD'))
    .slice(0, 50) // Limit to 50 payments per payout
  
  const payoutAmount = Math.min(amount, paymentsToInclude.reduce((sum, p) => sum + p.amount, 0))
  
  // Create payout with payments
  const payout = await db.payout.create({
    data: {
      tutorId,
      amount: payoutAmount,
      currency: details?.currency || 'SGD',
      status: 'PENDING',
      method,
      details: details || {},
      payments: {
        create: paymentsToInclude.map(p => ({
          paymentId: p.id,
          amount: p.amount,
        })),
      },
    },
    include: {
      payments: true,
    },
  })
  
  return NextResponse.json({
    success: true,
    payout: {
      id: payout.id,
      amount: payout.amount,
      currency: payout.currency,
      status: payout.status,
      method: payout.method,
      requestedAt: payout.requestedAt,
      paymentCount: payout.payments.length,
    },
    remainingBalance: availableBalance - payoutAmount,
  }, { status: 201 })
}, { role: 'TUTOR' })
