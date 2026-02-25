import { db } from '@/lib/db'

/** Re-export for payment routes */
export { calculateCommission } from '@/lib/financial/calculations'

export async function trackPlatformRevenue(
  paymentId: string,
  commissionAmount: number
): Promise<void> {
  const month = new Date().toISOString().slice(0, 7) // YYYY-MM format
  
  await db.platformRevenue.create({
    data: {
      paymentId,
      amount: commissionAmount,
      month,
      createdAt: new Date()
    }
  })
}

export async function getPlatformRevenue(
  startDate: Date,
  endDate: Date
): Promise<number> {
  const result = await db.platformRevenue.sum({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    },
    _sum: {
      amount: true
    }
  })
  
  return result?._sum?.amount || 0
}