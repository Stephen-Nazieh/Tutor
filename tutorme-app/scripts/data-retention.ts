/**
 * Data retention: purge old records per policy.
 * - WebhookEvent: older than WEBHOOK_RETENTION_DAYS (default 90)
 * - UserActivityLog: older than AUDIT_RETENTION_DAYS (default 365)
 *
 * Run: npx tsx scripts/data-retention.ts
 * Or: npm run data-retention (if script added)
 */

import { drizzleDb } from '../src/lib/db/drizzle'
import { webhookEvent, userActivityLog } from '../src/lib/db/schema'
import { lt } from 'drizzle-orm'

const WEBHOOK_RETENTION_DAYS = parseInt(process.env.WEBHOOK_RETENTION_DAYS ?? '90', 10)
const AUDIT_RETENTION_DAYS = parseInt(process.env.AUDIT_RETENTION_DAYS ?? '365', 10)

async function main() {
  const now = new Date()
  const webhookCutoff = new Date(now.getTime() - WEBHOOK_RETENTION_DAYS * 24 * 60 * 60 * 1000)
  const auditCutoff = new Date(now.getTime() - AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000)

  const [webhookResult, auditResult] = await Promise.all([
    drizzleDb.delete(webhookEvent).where(lt(webhookEvent.createdAt, webhookCutoff)).returning({ id: webhookEvent.id }),
    drizzleDb.delete(userActivityLog).where(lt(userActivityLog.createdAt, auditCutoff)).returning({ id: userActivityLog.id })
  ])

  console.log(
    `Data retention: deleted ${webhookResult.length} webhook events (older than ${WEBHOOK_RETENTION_DAYS}d), ` +
    `${auditResult.length} activity logs (older than ${AUDIT_RETENTION_DAYS}d).`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    console.log('Finished data retention run.')
    process.exit(0)
  })
