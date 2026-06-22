/**
 * Integration test: session-reminder scheduler writes reminders into the bell.
 *
 * Verifies the scan: an upcoming session within the lead window produces a
 * `reminder` notification (the row the bell reads) for the tutor AND every
 * enrolled student, sets reminderSentAt, and is idempotent (a second scan sends
 * nothing). Sessions outside the window or already reminded are left alone.
 *
 * Requires DATABASE_URL + a running, migrated Postgres (see setup.ts).
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import crypto from 'crypto'
import { and, eq, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { user, course, courseEnrollment, liveSession, notification } from '@/lib/db/schema'
import { runSessionReminderScan } from '@/lib/notifications/session-reminder-scheduler'

const stamp = Date.now()
const tutorId = crypto.randomUUID()
const studentAId = crypto.randomUUID()
const studentBId = crypto.randomUUID()
const allUserIds = [tutorId, studentAId, studentBId]
const courseId = `course_remind_${stamp}`

const soonId = `sess_soon_${stamp}` // within the 60-min lead window (has a course)
const laterId = `sess_later_${stamp}` // outside the window
const doneId = `sess_done_${stamp}` // already reminded

function reminderRowsFor(userId: string) {
  return drizzleDb
    .select({ id: notification.notificationId, data: notification.data })
    .from(notification)
    .where(and(eq(notification.userId, userId), eq(notification.type, 'reminder')))
}

describe('session reminder scheduler', () => {
  beforeAll(async () => {
    const now = Date.now()
    await drizzleDb.insert(user).values([
      {
        userId: tutorId,
        email: `claude-remind-tutor-${stamp}@example.com`,
        role: 'TUTOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: studentAId,
        email: `claude-remind-stuA-${stamp}@example.com`,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: studentBId,
        email: `claude-remind-stuB-${stamp}@example.com`,
        role: 'STUDENT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
    await drizzleDb.insert(course).values({ courseId, name: 'Reminder Course', creatorId: tutorId })
    await drizzleDb.insert(courseEnrollment).values([
      { enrollmentId: `enr_a_${stamp}`, studentId: studentAId, courseId },
      { enrollmentId: `enr_b_${stamp}`, studentId: studentBId, courseId },
    ])
    await drizzleDb.insert(liveSession).values([
      {
        sessionId: soonId,
        tutorId,
        courseId,
        title: 'Algebra (soon)',
        category: 'general',
        status: 'scheduled',
        scheduledAt: new Date(now + 30 * 60 * 1000),
      },
      {
        sessionId: laterId,
        tutorId,
        title: 'History (later)',
        category: 'general',
        status: 'scheduled',
        scheduledAt: new Date(now + 5 * 60 * 60 * 1000),
      },
      {
        sessionId: doneId,
        tutorId,
        title: 'Already reminded',
        category: 'general',
        status: 'scheduled',
        scheduledAt: new Date(now + 20 * 60 * 1000),
        reminderSentAt: new Date(now - 60 * 1000),
      },
    ])
  })

  afterAll(async () => {
    const t = async (fn: () => Promise<unknown>) => {
      try {
        await fn()
      } catch {}
    }
    await t(() => drizzleDb.delete(notification).where(inArray(notification.userId, allUserIds)))
    await t(() =>
      drizzleDb.delete(liveSession).where(inArray(liveSession.sessionId, [soonId, laterId, doneId]))
    )
    await t(() => drizzleDb.delete(courseEnrollment).where(eq(courseEnrollment.courseId, courseId)))
    await t(() => drizzleDb.delete(course).where(eq(course.courseId, courseId)))
    await t(() => drizzleDb.delete(user).where(inArray(user.userId, allUserIds)))
  })

  it('reminds the tutor and every enrolled student once, idempotently', async () => {
    await runSessionReminderScan()

    // Tutor reminded for the imminent session.
    const tutorRows = await reminderRowsFor(tutorId)
    expect(tutorRows).toHaveLength(1)
    expect((tutorRows[0].data as { sessionId?: string })?.sessionId).toBe(soonId)

    // Both enrolled students reminded.
    expect(await reminderRowsFor(studentAId)).toHaveLength(1)
    expect(await reminderRowsFor(studentBId)).toHaveLength(1)

    // The imminent session is claimed; the out-of-window one is untouched.
    const [soon] = await drizzleDb
      .select({ reminderSentAt: liveSession.reminderSentAt })
      .from(liveSession)
      .where(eq(liveSession.sessionId, soonId))
      .limit(1)
    expect(soon?.reminderSentAt).toBeTruthy()

    const [later] = await drizzleDb
      .select({ reminderSentAt: liveSession.reminderSentAt })
      .from(liveSession)
      .where(eq(liveSession.sessionId, laterId))
      .limit(1)
    expect(later?.reminderSentAt).toBeNull()

    // Second scan must not duplicate any reminder (claim already taken).
    await runSessionReminderScan()
    expect(await reminderRowsFor(tutorId)).toHaveLength(1)
    expect(await reminderRowsFor(studentAId)).toHaveLength(1)
    expect(await reminderRowsFor(studentBId)).toHaveLength(1)
  })
})
