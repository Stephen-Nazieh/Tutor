/**
 * Data retention: purge old records per policy.
 * - WebhookEvent: older than WEBHOOK_RETENTION_DAYS (default 90)
 * - UserActivityLog: older than AUDIT_RETENTION_DAYS (default 365)
 *
 * Run: npx tsx scripts/data-retention.ts
 * Or: npm run data-retention (if script added)
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const WEBHOOK_RETENTION_DAYS = parseInt(process.env.WEBHOOK_RETENTION_DAYS ?? '90', 10)
const AUDIT_RETENTION_DAYS = parseInt(process.env.AUDIT_RETENTION_DAYS ?? '365', 10)

async function main() {
  const now = new Date()
  const webhookCutoff = new Date(now.getTime() - WEBHOOK_RETENTION_DAYS * 24 * 60 * 60 * 1000)
  const auditCutoff = new Date(now.getTime() - AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000)

  const [webhookResult, auditResult] = await Promise.all([
    prisma.webhookEvent.deleteMany({ where: { createdAt: { lt: webhookCutoff } } }),
    prisma.userActivityLog.deleteMany({ where: { createdAt: { lt: auditCutoff } } })
  ])

  console.log(
    `Data retention: deleted ${webhookResult.count} webhook events (older than ${WEBHOOK_RETENTION_DAYS}d), ` +
      `${auditResult.count} activity logs (older than ${AUDIT_RETENTION_DAYS}d).`
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
