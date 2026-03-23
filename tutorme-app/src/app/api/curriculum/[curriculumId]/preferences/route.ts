/**
 * Curriculum Preference Enrollment API
 * POST: Save student availability preferences and matching status for a course.
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, NotFoundError, withRateLimitPreset } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, studentCoursePreference, studentCoursePreferenceSlot } from '@/lib/db/schema'
import { and, eq, inArray } from 'drizzle-orm'

const MATCH_GROUP_SIZE = 5

interface ScheduleItem {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

interface PreferenceSlotInput {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

function normalizeSchedule(schedule: unknown): ScheduleItem[] {
  if (!Array.isArray(schedule)) return []
  return schedule.filter(
    (slot): slot is ScheduleItem =>
      !!slot &&
      typeof slot === 'object' &&
      typeof (slot as ScheduleItem).dayOfWeek === 'string' &&
      typeof (slot as ScheduleItem).startTime === 'string' &&
      typeof (slot as ScheduleItem).durationMinutes === 'number'
  )
}

function toMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  if (Number.isNaN(h) || Number.isNaN(m)) return 0
  return h * 60 + m
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function computeEndTime(startTime: string, durationMinutes: number): string {
  return toTimeString(toMinutes(startTime) + durationMinutes)
}

function buildIntersectionSlots(
  tutorSchedule: ScheduleItem[],
  selectedSlots: PreferenceSlotInput[]
): Array<{ dayOfWeek: string; startTime: string; endTime: string }> {
  const intersections = new Map<string, { dayOfWeek: string; startTime: string; endTime: string }>()
  for (const selected of selectedSlots) {
    for (const tutor of tutorSchedule) {
      if (selected.dayOfWeek !== tutor.dayOfWeek) continue
      const selectedStart = toMinutes(selected.startTime)
      const selectedEnd = selectedStart + selected.durationMinutes
      const tutorStart = toMinutes(tutor.startTime)
      const tutorEnd = tutorStart + tutor.durationMinutes
      const overlapStart = Math.max(selectedStart, tutorStart)
      const overlapEnd = Math.min(selectedEnd, tutorEnd)
      if (overlapEnd <= overlapStart) continue
      const startTime = toTimeString(overlapStart)
      const endTime = toTimeString(overlapEnd)
      const key = `${selected.dayOfWeek}:${startTime}-${endTime}`
      intersections.set(key, { dayOfWeek: selected.dayOfWeek, startTime, endTime })
    }
  }
  return Array.from(intersections.values())
}

export const POST = withCsrf(
  withAuth(
    async (req, session, context) => {
      const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
      if (rateLimitResponse) return rateLimitResponse

      const curriculumId = await getParamAsync(context?.params, 'curriculumId')
      if (!curriculumId) {
        return NextResponse.json({ error: 'Curriculum ID required' }, { status: 400 })
      }

      const body = await req.json().catch(() => ({}))
      const selectedSlots = Array.isArray(body?.selectedSlots)
        ? (body.selectedSlots as PreferenceSlotInput[]).filter(
            slot =>
              slot &&
              typeof slot.dayOfWeek === 'string' &&
              typeof slot.startTime === 'string' &&
              typeof slot.durationMinutes === 'number'
          )
        : []
      const sessionDensity = Number(body?.sessionDensity)

      if (selectedSlots.length === 0) {
        return NextResponse.json(
          { error: 'Select at least one available time slot.' },
          { status: 400 }
        )
      }
      if (!Number.isFinite(sessionDensity) || sessionDensity <= 0) {
        return NextResponse.json({ error: 'Session density is required.' }, { status: 400 })
      }

      const [curriculumRow] = await drizzleDb
        .select({ id: curriculum.id, schedule: curriculum.schedule, tutorId: curriculum.creatorId })
        .from(curriculum)
        .where(eq(curriculum.id, curriculumId))
        .limit(1)

      if (!curriculumRow) {
        throw new NotFoundError('Curriculum not found')
      }

      const schedule = normalizeSchedule(curriculumRow.schedule)
      if (schedule.length === 0) {
        return NextResponse.json(
          { error: 'Tutor availability has not been published yet.' },
          { status: 400 }
        )
      }
      if (!curriculumRow.tutorId) {
        return NextResponse.json({ error: 'Course tutor information is missing.' }, { status: 400 })
      }
      const tutorId = curriculumRow.tutorId as string

      const intersectionSlots = buildIntersectionSlots(schedule, selectedSlots)
      if (intersectionSlots.length === 0) {
        return NextResponse.json(
          { error: 'No overlap with the tutor availability. Please select different slots.' },
          { status: 422 }
        )
      }

      const result = await drizzleDb.transaction(async tx => {
        const [existingPreference] = await tx
          .select({ id: studentCoursePreference.id })
          .from(studentCoursePreference)
          .where(
            and(
              eq(studentCoursePreference.studentId, session.user.id),
              eq(studentCoursePreference.curriculumId, curriculumId)
            )
          )
          .limit(1)

        const preferenceId = existingPreference?.id ?? crypto.randomUUID()

        if (existingPreference) {
          await tx
            .update(studentCoursePreference)
            .set({
              sessionDensity,
              tutorId,
              status: 'PENDING',
            })
            .where(eq(studentCoursePreference.id, preferenceId))
        } else {
          await tx.insert(studentCoursePreference).values({
            id: preferenceId,
            studentId: session.user.id,
            tutorId,
            curriculumId,
            sessionDensity,
            status: 'PENDING',
          })
        }

        await tx
          .delete(studentCoursePreferenceSlot)
          .where(eq(studentCoursePreferenceSlot.preferenceId, preferenceId))

        const selectedSlotRows = selectedSlots.map(slot => ({
          id: crypto.randomUUID(),
          preferenceId,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: computeEndTime(slot.startTime, slot.durationMinutes),
          slotType: 'SELECTED' as const,
        }))

        const intersectionSlotRows = intersectionSlots.map(slot => ({
          id: crypto.randomUUID(),
          preferenceId,
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
          slotType: 'INTERSECTION' as const,
        }))

        await tx
          .insert(studentCoursePreferenceSlot)
          .values([...selectedSlotRows, ...intersectionSlotRows])

        const matchedPreferenceIds = new Set<string>()
        for (const slot of intersectionSlots) {
          const peers = await tx
            .select({ preferenceId: studentCoursePreferenceSlot.preferenceId })
            .from(studentCoursePreferenceSlot)
            .innerJoin(
              studentCoursePreference,
              eq(studentCoursePreferenceSlot.preferenceId, studentCoursePreference.id)
            )
            .where(
              and(
                eq(studentCoursePreference.curriculumId, curriculumId),
                eq(studentCoursePreference.status, 'PENDING'),
                eq(studentCoursePreferenceSlot.slotType, 'INTERSECTION'),
                eq(studentCoursePreferenceSlot.dayOfWeek, slot.dayOfWeek),
                eq(studentCoursePreferenceSlot.startTime, slot.startTime),
                eq(studentCoursePreferenceSlot.endTime, slot.endTime)
              )
            )

          if (peers.length >= MATCH_GROUP_SIZE) {
            peers.forEach(peer => matchedPreferenceIds.add(peer.preferenceId))
          }
        }

        if (matchedPreferenceIds.size > 0) {
          await tx
            .update(studentCoursePreference)
            .set({ status: 'MATCHED' })
            .where(inArray(studentCoursePreference.id, Array.from(matchedPreferenceIds)))
        }

        const status = matchedPreferenceIds.has(preferenceId) ? 'MATCHED' : 'PENDING'
        return { preferenceId, status, matchedCount: matchedPreferenceIds.size }
      })

      return NextResponse.json({
        success: true,
        preferenceId: result.preferenceId,
        status: result.status,
        matchedCount: result.matchedCount,
      })
    },
    { role: 'STUDENT' }
  )
)
