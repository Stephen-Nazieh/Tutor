import { and, gte, lte } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { platformRevenue } from '@/lib/db/schema'

/** Re-export for payment routes */
export { calculateCommission } from '@/lib/financial/calculations'

export async function trackPlatformRevenue(
  paymentId: string,
  commissionAmount: number
): Promise<void> {
  const month = new Date().toISOString().slice(0, 7) // YYYY-MM format
  await drizzleDb.insert(platformRevenue).values({
    id: crypto.randomUUID(),
    paymentId,
    amount: commissionAmount,
    month,
  })
}

export async function getPlatformRevenue(
  startDate: Date,
  endDate: Date
): Promise<number> {
  const rows = await drizzleDb
    .select({ amount: platformRevenue.amount })
    .from(platformRevenue)
    .where(
      and(
        gte(platformRevenue.createdAt, startDate),
        lte(platformRevenue.createdAt, endDate)
      )
    )
  const sum = rows.reduce((acc, r) => acc + (Number(r.amount) || 0), 0)
  return sum
}