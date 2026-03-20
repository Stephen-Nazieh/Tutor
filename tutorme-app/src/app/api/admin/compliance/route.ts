import { NextRequest, NextResponse } from 'next/server'
import { eq, desc, count, and, gte } from 'drizzle-orm'
import { withAuth, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  deletionRequest,
  piiAccessLog,
  consentLog,
  thirdPartyAudit,
  dataExportRequest,
  ageVerification,
} from '@/lib/db/schema'

/**
 * GET /api/admin/compliance
 * Returns compliance dashboard summary for admin panel.
 */
export const GET = withAuth(
  async (_req: NextRequest) => {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      const [
        pendingDeletions,
        completedDeletions,
        recentPiiAccess,
        exportRequests,
        thirdParties,
        minorUsers,
        recentConsents,
      ] = await Promise.all([
        // Pending deletion requests
        drizzleDb
          .select()
          .from(deletionRequest)
          .where(eq(deletionRequest.status, 'pending'))
          .orderBy(desc(deletionRequest.requestedAt)),

        // Completed deletions (last 30 days)
        drizzleDb
          .select({ id: deletionRequest.id })
          .from(deletionRequest)
          .where(
            and(
              eq(deletionRequest.status, 'completed'),
              gte(deletionRequest.processedAt, thirtyDaysAgo)
            )
          ),

        // Recent PII access log (last 50 entries)
        drizzleDb.select().from(piiAccessLog).orderBy(desc(piiAccessLog.accessedAt)).limit(50),

        // Export requests
        drizzleDb
          .select()
          .from(dataExportRequest)
          .where(eq(dataExportRequest.status, 'pending'))
          .orderBy(desc(dataExportRequest.requestedAt)),

        // Third-party audit
        drizzleDb.select().from(thirdPartyAudit).orderBy(thirdPartyAudit.serviceName),

        // Minor users requiring parental consent
        drizzleDb
          .select()
          .from(ageVerification)
          .where(
            and(eq(ageVerification.isMinor, true), eq(ageVerification.parentConsentGranted, false))
          ),

        // Recent consents granted/revoked
        drizzleDb.select().from(consentLog).orderBy(desc(consentLog.grantedAt)).limit(20),
      ])

      return NextResponse.json({
        summary: {
          pendingDeletionRequests: pendingDeletions.length,
          completedDeletionsLast30Days: completedDeletions.length,
          pendingExportRequests: exportRequests.length,
          minorsWithoutParentalConsent: minorUsers.length,
          thirdPartyServicesAudited: thirdParties.length,
          thirdPartyServicesNonCompliant: thirdParties.filter(
            t => !t.gdprCompliant || !t.coppaCompliant
          ).length,
        },
        pendingDeletions,
        exportRequests,
        recentPiiAccess,
        thirdParties,
        minorUsers,
        recentConsents,
      })
    } catch (error) {
      return handleApiError(error, 'Failed to load compliance data', 'api/admin/compliance')
    }
  },
  { role: 'ADMIN' }
)

/**
 * POST /api/admin/compliance — Process a deletion/export request
 */
export const POST = withAuth(
  async (req: NextRequest, session) => {
    const body = await req.json().catch(() => ({}))
    const { action, requestId, adminNotes } = body

    if (!requestId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
      if (action === 'approve_deletion') {
        await drizzleDb
          .update(deletionRequest)
          .set({
            status: 'processing',
            processedBy: session.user.id,
            adminNotes: adminNotes || null,
            processedAt: new Date(),
          })
          .where(eq(deletionRequest.id, requestId))

        return NextResponse.json({
          success: true,
          message: 'Deletion request approved and queued for processing.',
        })
      }

      if (action === 'reject_deletion') {
        await drizzleDb
          .update(deletionRequest)
          .set({
            status: 'rejected',
            processedBy: session.user.id,
            adminNotes: adminNotes || 'Rejected by admin',
            processedAt: new Date(),
          })
          .where(eq(deletionRequest.id, requestId))

        return NextResponse.json({ success: true, message: 'Deletion request rejected.' })
      }

      return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    } catch (error) {
      return handleApiError(error, 'Failed to process request', 'api/admin/compliance')
    }
  },
  { role: 'ADMIN' }
)
