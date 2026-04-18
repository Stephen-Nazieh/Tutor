/**
 * GDPR / COPPA "Right to be Forgotten" — Data Deletion API.
 * POST /api/user/delete-account — User requests account deletion
 * Marks all user data for deletion and creates a deletion request record.
 */
import { NextRequest, NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import crypto from 'crypto'
import { withAuth, withCsrf, handleApiError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import { deletionRequest, user as userTable, profile, consentLog } from '@/lib/db/schema'
import { logDeletion } from '@/lib/compliance/audit'

export const POST = withCsrf(
  withAuth(async (req: NextRequest, session) => {
    const userId = session?.user?.id
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
      const body = await req.json().catch(() => ({}))
      const { reason } = body

      // Check if there's already a pending request
      const existing = await drizzleDb
        .select()
        .from(deletionRequest)
        .where(eq(deletionRequest.userId, userId))
        .limit(1)

      if (existing.length > 0 && existing[0].status === 'pending') {
        return NextResponse.json({
          message: 'A deletion request is already pending.',
          requestId: existing[0].id,
        })
      }

      const pseudoId = 'del_' + crypto.randomBytes(8).toString('hex')
      const [req_record] = await drizzleDb
        .insert(deletionRequest)
        .values({
          id: crypto.randomUUID(),
          userId,
          requestedBy: userId,
          reason: reason || 'User-initiated deletion request',
          status: 'pending',
          pseudonymizedId: pseudoId,
        })
        .returning()

      // Revoke all active consents
      await drizzleDb
        .update(consentLog)
        .set({ revokedAt: new Date() })
        .where(eq(consentLog.userId, userId))

      // Audit log this deletion request — DOES NOT log actual PII
      await logDeletion({
        accessorId: userId,
        accessorRole: session.user.role ?? 'STUDENT',
        targetUserId: userId,
        resourceType: 'student_profile',
        endpoint: '/api/user/delete-account',
        req,
      })

      return NextResponse.json({
        success: true,
        message:
          'Your deletion request has been submitted. Your account will be deleted within 30 days per GDPR Art.17. You will receive a confirmation email.',
        requestId: req_record.id,
      })
    } catch (error) {
      return handleApiError(error, 'Failed to submit deletion request', 'api/user/delete-account')
    }
  })
)
