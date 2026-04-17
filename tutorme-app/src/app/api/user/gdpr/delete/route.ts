/**
 * GDPR account/data deletion: anonymizes the user and profile (right to be forgotten).
 * POST /api/user/gdpr/delete - body: { confirm: true }
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError } from '@/lib/api/middleware'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  user,
  profile,
  taskSubmission,
  feedbackWorkflow,
  directMessage,
  message,
  tutorApplication,
  studentPerformance,
  familyMember,
  emergencyContact,
  userActivityLog,
  securityEvent,
  payment,
} from '@/lib/db/schema'
import { eq, or, sql } from 'drizzle-orm'
import { logAudit, AUDIT_ACTIONS } from '@/lib/security/audit'

export const POST = withCsrf(
  withAuth(async (req: NextRequest, session) => {
    const body = await req.json().catch(() => ({}))
    if (body.confirm !== true) {
      throw new ValidationError('Send { "confirm": true } to confirm account deletion')
    }

    const userId = session.user.id

    await logAudit(userId, AUDIT_ACTIONS.DATA_DELETE, { resource: 'gdpr_delete' })

    await drizzleDb.transaction(async tx => {
      // 1. Anonymize user core record
      await tx
        .update(user)
        .set({
          email: `deleted-${userId}@deleted.local`,
          password: null,
          image: null,
          emailVerified: null,
        })
        .where(eq(user.userId, userId))

      // 2. Anonymize profile
      const [profileRow] = await tx
        .select()
        .from(profile)
        .where(eq(profile.userId, userId))
        .limit(1)
      if (profileRow) {
        await tx
          .update(profile)
          .set({
            name: null,
            bio: null,
            avatarUrl: null,
            dateOfBirth: null,
          })
          .where(eq(profile.userId, userId))
      }

      // 3. Delete student-submitted data
      await tx.delete(taskSubmission).where(eq(taskSubmission.studentId, userId))
      await tx.delete(feedbackWorkflow).where(eq(feedbackWorkflow.studentId, userId))
      await tx.delete(studentPerformance).where(eq(studentPerformance.studentId, userId))

      // 4. Delete tutor application
      await tx.delete(tutorApplication).where(eq(tutorApplication.userId, userId))

      // 5. Delete family / emergency data linked directly to user
      await tx.delete(familyMember).where(eq(familyMember.userId, userId))
      await tx.delete(emergencyContact).where(eq(emergencyContact.parentId, userId))

      // 6. Anonymize chat messages
      await tx
        .update(directMessage)
        .set({ content: '[deleted]', attachmentUrl: null })
        .where(eq(directMessage.senderId, userId))
      await tx.update(message).set({ content: '[deleted]' }).where(eq(message.userId, userId))

      // 7. Delete activity logs
      await tx.delete(userActivityLog).where(eq(userActivityLog.userId, userId))

      // 8. Anonymize security events (retain row, strip PII)
      await tx
        .update(securityEvent)
        .set({
          ip: null,
          originIp: null,
          userAgent: null,
          deviceId: null,
          sessionId: null,
          description: '[deleted]',
          metadata: {},
          city: null,
          region: null,
          countryCode: null,
        })
        .where(or(eq(securityEvent.userId, userId), eq(securityEvent.actorId, userId)))

      // 9. Retain payment records but anonymize PII in metadata
      await tx
        .update(payment)
        .set({
          metadata: sql`jsonb_strip_nulls(jsonb_build_object(
            'type', ${payment.metadata}->>'type',
            'courseId', ${payment.metadata}->>'courseId',
            'startDate', ${payment.metadata}->>'startDate',
            'anonymized', true
          ))`,
        })
        .where(
          or(
            eq(payment.tutorId, userId),
            sql`(${payment.metadata}->>'studentId') = ${userId}`,
            sql`(${payment.metadata}->>'payerId') = ${userId}`
          )
        )
    })

    return NextResponse.json({
      message:
        'Account data anonymized. Please log out; you will not be able to log in again with this account.',
    })
  })
)
