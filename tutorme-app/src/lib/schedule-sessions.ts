/**
 * Generate upcoming session instances from a recurring weekly schedule.
 * Virtual sessions are computed from schedule slots until they are "realized"
 * by a tutor launching them (creating a liveSession row).
 */

export interface ScheduleSlot {
  dayOfWeek: string
  startTime: string
  durationMinutes: number
}

export interface VirtualSession {
  id: string
  title: string
  status: 'virtual' | 'active' | 'scheduled' | 'ended' | 'preparing' | 'live' | 'paused'
  scheduledAt: string
  startedAt: string | null
  endedAt: string | null
  durationMinutes: number
  isVirtual: true
  roomId: string | null
  roomUrl: string | null
  maxStudents: number
  category: string
}

export interface RealSession {
  id: string
  title: string
  status: string
  scheduledAt: string | null
  startedAt: string | null
  endedAt: string | null
  durationMinutes: number
  isVirtual: boolean
  roomId?: string | null
  roomUrl?: string | null
  maxStudents: number
  category: string
}

const DAY_MAP: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
}

function parseDayOfWeek(day: string): number {
  return DAY_MAP[day.toLowerCase().trim()] ?? 1
}

function parseTime(timeStr: string): { hours: number; minutes: number } {
  const [h, m] = timeStr.split(':').map(Number)
  return { hours: h || 0, minutes: m || 0 }
}

function getNextOccurrence(dayOfWeek: number, hours: number, minutes: number, fromDate: Date): Date {
  const result = new Date(fromDate)
  result.setSeconds(0, 0)
  result.setHours(hours, minutes)

  const currentDay = result.getDay()
  let daysUntil = dayOfWeek - currentDay

  if (daysUntil < 0) {
    daysUntil += 7
  }

  // If same day but time has already passed, move to next week
  if (daysUntil === 0 && result.getTime() <= fromDate.getTime()) {
    daysUntil = 7
  }

  result.setDate(result.getDate() + daysUntil)
  return result
}

/**
 * Generate upcoming virtual sessions from a weekly recurring schedule.
 * Returns the next `count` session instances, sorted chronologically.
 */
export function generateUpcomingSessions(
  schedule: ScheduleSlot[],
  courseName: string,
  courseCategory: string,
  options: {
    count?: number
    fromDate?: Date
    maxStudents?: number
  } = {}
): VirtualSession[] {
  const { count = 10, fromDate = new Date(), maxStudents = 50 } = options

  if (!schedule || schedule.length === 0) return []

  const sessions: VirtualSession[] = []
  const now = fromDate.getTime()

  // Generate up to 12 weeks of occurrences to ensure we get enough
  for (let weekOffset = 0; weekOffset < 12; weekOffset++) {
    for (const slot of schedule) {
      const dayNum = parseDayOfWeek(slot.dayOfWeek)
      const { hours, minutes } = parseTime(slot.startTime)

      const baseDate = new Date(fromDate)
      baseDate.setDate(baseDate.getDate() + weekOffset * 7)

      const occurrence = getNextOccurrence(dayNum, hours, minutes, baseDate)
      const scheduledAt = occurrence.toISOString()

      // Determine virtual status based on time
      const scheduledMs = occurrence.getTime()
      const elapsed = now - scheduledMs
      const minutesSinceStart = elapsed / 60000
      const minutesUntilStart = -elapsed / 60000

      let status: VirtualSession['status'] = 'virtual'

      if (minutesSinceStart > slot.durationMinutes) {
        status = 'ended' // Past the duration — tutor missed it
      } else if (minutesSinceStart >= 0) {
        status = 'active' // Within the scheduled window
      } else if (minutesUntilStart <= 60) {
        status = 'scheduled' // Within 1 hour — about to start
      }

      sessions.push({
        id: `virtual-${scheduledAt}`,
        title: courseName,
        status,
        scheduledAt,
        startedAt: status === 'active' || status === 'ended' ? scheduledAt : null,
        endedAt: status === 'ended' ? new Date(scheduledMs + slot.durationMinutes * 60000).toISOString() : null,
        durationMinutes: slot.durationMinutes || 60,
        isVirtual: true,
        roomId: null,
        roomUrl: null,
        maxStudents,
        category: courseCategory || 'General',
      })
    }
  }

  // Sort by scheduled time and deduplicate (same timestamp)
  const unique = new Map<string, VirtualSession>()
  sessions.forEach(s => unique.set(s.scheduledAt, s))

  return Array.from(unique.values())
    .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime())
    .slice(0, count)
}

/**
 * Merge real live sessions with virtual schedule-based sessions.
 * Real sessions take precedence over virtual ones at the same time slot.
 */
export function mergeSessions(
  realSessions: RealSession[],
  virtualSessions: VirtualSession[]
): (RealSession | VirtualSession)[] {
  const merged = new Map<string, RealSession | VirtualSession>()

  // Add virtual sessions first
  virtualSessions.forEach(vs => {
    merged.set(vs.scheduledAt, vs)
  })

  // Real sessions override virtual ones if they match closely in time
  realSessions.forEach(rs => {
    if (!rs.scheduledAt) {
      merged.set(`real-${rs.id}`, rs)
      return
    }
    const realTime = rs.scheduledAt ? new Date(rs.scheduledAt).getTime() : 0

    // Find a virtual session within 30 minutes of this real one
    let matched = false
    for (const [key, vs] of merged) {
      if (vs.isVirtual && vs.scheduledAt) {
        const virtTime = new Date(vs.scheduledAt).getTime()
        if (Math.abs(realTime - virtTime) <= 30 * 60 * 1000) {
          merged.set(key, rs)
          matched = true
          break
        }
      }
    }

    if (!matched) {
      merged.set(`real-${rs.id}`, rs)
    }
  })

  return Array.from(merged.values()).sort(
    (a, b) => new Date(a.scheduledAt || 0).getTime() - new Date(b.scheduledAt || 0).getTime()
  )
}
