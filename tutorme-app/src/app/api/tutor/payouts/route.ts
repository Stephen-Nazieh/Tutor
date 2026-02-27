/**
 * Payout Management API
 * 
 * GET /api/tutor/payouts - List all payouts for the tutor
 * POST /api/tutor/payouts - Request a new payout
 */

import { NextRequest, NextResponse } from 'next/server'
import { eq, and, desc, inArray, sql } from 'drizzle-orm'
import { withAuth, ValidationError, parseBoundedInt } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { payout, payment, paymentOnPayout, clinicBooking, clinic } from '@/lib/db/schema'
import crypto from 'crypto'

// GET - List all payouts for the tutor
export const GET = withAuth(async (req: NextRequest, session) => {
  const tutorId = session.user.id
  const { searchParams } = new URL(req.url)

  const status = searchParams.get('status')
  const limit = parseBoundedInt(searchParams.get('limit'), 50, { min: 1, max: 100 })
  const offset = parseBoundedInt(searchParams.get('offset'), 0, { min: 0, max: 10000 })

  const whereConditions = [eq(payout.tutorId, tutorId)]
  if (status) whereConditions.push(eq(payout.status, status))

  const [payouts, totalCountResult] = await Promise.all([
    drizzleDb.query.payout.findMany({
      where: and(...whereConditions),
      with: {
        payments: {
          with: {
            payment: {
              with: {
                booking: {
                  with: {
                    clinic: {
                      columns: { title: true }
                    }
                  }
                }
              }
            }
          }
        }
      },
      orderBy: [desc(payout.requestedAt)],
      limit,
      offset,
    }),
    drizzleDb.select({ count: sql<number>`count(*)` })
      .from(payout)
      .where(and(...whereConditions))
  ])

  const totalCount = Number(totalCountResult[0]?.count || 0)

  // Format response
  const formattedPayouts = payouts.map(p => ({
    id: p.id,
    amount: p.amount,
    currency: p.currency,
    status: p.status,
    method: p.method,
    requestedAt: p.requestedAt,
    processedAt: p.processedAt,
    completedAt: p.completedAt,
    transactionReference: p.transactionReference,
    paymentCount: p.payments.length,
    payments: p.payments.map(pp => ({
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
  const body = await req.json().catch(() => ({}))
  const { amount, method, details } = body

  // Validate request
  if (!amount || Number(amount) <= 0) {
    throw new ValidationError('Valid payout amount is required')
  }

  if (!method) {
    throw new ValidationError('Payout method is required')
  }

  // Calculate available balance
  const [completedPayments, existingPayouts] = await Promise.all([
    // Get all completed payments for this tutor
    drizzleDb.query.payment.findMany({
      where: and(
        eq(payment.status, 'COMPLETED'),
        eq(payment.tutorId, tutorId)
      ),
      columns: {
        id: true,
        amount: true,
        currency: true,
      },
    }),
    // Get all completed/processed payouts
    drizzleDb.query.payout.findMany({
      where: and(
        eq(payout.tutorId, tutorId),
        inArray(payout.status, ['COMPLETED', 'PROCESSING'])
      ),
      columns: {
        amount: true,
      },
    }),
  ])

  const totalEarnings = completedPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const totalPayouts = existingPayouts.reduce((sum, p) => sum + (Number(p.amount) || 0), 0)
  const availableBalance = totalEarnings - totalPayouts

  // Check if sufficient balance
  if (Number(amount) > availableBalance) {
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
  const targetCurrency = details?.currency || 'SGD'
  const paymentsToInclude = completedPayments
    .filter(p => p.currency === targetCurrency)
    .slice(0, 50) // Limit to 50 payments per payout

  const sumPayments = paymentsToInclude.reduce((sum, p) => sum + Number(p.amount), 0)
  const payoutAmount = Math.min(Number(amount), sumPayments)

  if (paymentsToInclude.length === 0) {
    throw new ValidationError('No available payments for the selected currency')
  }

  // Create payout with payments in a transaction
  const result = await drizzleDb.transaction(async (tx) => {
    const payoutId = crypto.randomUUID()

    await tx.insert(payout).values({
      id: payoutId,
      tutorId,
      amount: payoutAmount,
      currency: targetCurrency,
      status: 'PENDING',
      method: String(method),
      details: details || {},
      requestedAt: new Date(),
    })

    if (paymentsToInclude.length > 0) {
      await tx.insert(paymentOnPayout).values(
        paymentsToInclude.map(p => ({
          id: crypto.randomUUID(),
          paymentId: p.id,
          payoutId: payoutId,
          amount: Number(p.amount),
          createdAt: new Date(),
        }))
      )
    }

    return payoutId
  })

  return NextResponse.json({
    success: true,
    payout: {
      id: result,
      amount: payoutAmount,
      currency: targetCurrency,
      status: 'PENDING',
      method,
      requestedAt: new Date(),
      paymentCount: paymentsToInclude.length,
    },
    remainingBalance: availableBalance - payoutAmount,
  }, { status: 201 })
}, { role: 'TUTOR' })
