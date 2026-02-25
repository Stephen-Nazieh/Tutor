import { NextRequest, NextResponse } from 'next/server'
import { db as prisma } from '@/lib/db'
import { requireAdmin } from '@/lib/admin/auth'
import { Permissions } from '@/lib/admin/permissions'

interface GeoPoint {
  lat: number
  lon: number
}

const TIMEZONE_COORDINATES: Record<string, GeoPoint> = {
  'America/New_York': { lat: 40.7128, lon: -74.006 },
  'America/Chicago': { lat: 41.8781, lon: -87.6298 },
  'America/Denver': { lat: 39.7392, lon: -104.9903 },
  'America/Los_Angeles': { lat: 34.0522, lon: -118.2437 },
  'America/Toronto': { lat: 43.6532, lon: -79.3832 },
  'America/Mexico_City': { lat: 19.4326, lon: -99.1332 },
  'America/Sao_Paulo': { lat: -23.5505, lon: -46.6333 },
  'Europe/London': { lat: 51.5072, lon: -0.1276 },
  'Europe/Paris': { lat: 48.8566, lon: 2.3522 },
  'Europe/Berlin': { lat: 52.52, lon: 13.405 },
  'Europe/Madrid': { lat: 40.4168, lon: -3.7038 },
  'Europe/Rome': { lat: 41.9028, lon: 12.4964 },
  'Europe/Amsterdam': { lat: 52.3676, lon: 4.9041 },
  'Europe/Istanbul': { lat: 41.0082, lon: 28.9784 },
  'Europe/Moscow': { lat: 55.7558, lon: 37.6173 },
  'Africa/Cairo': { lat: 30.0444, lon: 31.2357 },
  'Africa/Lagos': { lat: 6.5244, lon: 3.3792 },
  'Africa/Johannesburg': { lat: -26.2041, lon: 28.0473 },
  'Asia/Dubai': { lat: 25.2048, lon: 55.2708 },
  'Asia/Karachi': { lat: 24.8607, lon: 67.0011 },
  'Asia/Kolkata': { lat: 22.5726, lon: 88.3639 },
  'Asia/Shanghai': { lat: 31.2304, lon: 121.4737 },
  'Asia/Singapore': { lat: 1.3521, lon: 103.8198 },
  'Asia/Hong_Kong': { lat: 22.3193, lon: 114.1694 },
  'Asia/Seoul': { lat: 37.5665, lon: 126.978 },
  'Asia/Tokyo': { lat: 35.6762, lon: 139.6503 },
  'Australia/Sydney': { lat: -33.8688, lon: 151.2093 },
  'Australia/Perth': { lat: -31.9505, lon: 115.8605 },
  UTC: { lat: 0, lon: 0 },
}

function stableHash(input: string): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function estimateCoordsFromTimezone(timezone: string | null | undefined, seed: string): GeoPoint {
  const tz = timezone || 'UTC'
  const exact = TIMEZONE_COORDINATES[tz]
  if (exact) return exact

  const city = tz.split('/').at(1)?.replace(/_/g, ' ') || 'Unknown'
  const byCity = Object.entries(TIMEZONE_COORDINATES).find(([key]) => key.includes(city.replace(/\s+/g, '_')))
  if (byCity) return byCity[1]

  const h = stableHash(`${tz}:${seed}`)
  const lat = ((h % 12000) / 100) - 60
  const lon = (((h / 1000) % 36000) / 100) - 180

  return {
    lat: Math.max(-70, Math.min(70, lat)),
    lon,
  }
}

function isActiveSession(status: string | null, startedAt: Date | null, endedAt: Date | null): boolean {
  if (endedAt) return false
  if (status) {
    const normalized = status.toLowerCase()
    if (['active', 'live', 'in_progress', 'inprogress', 'ongoing'].includes(normalized)) {
      return true
    }
  }
  return Boolean(startedAt)
}

export async function GET(req: NextRequest) {
  const { session, response } = await requireAdmin(req, Permissions.ANALYTICS_READ)
  if (!session) return response!

  try {
    const { searchParams } = new URL(req.url)
    const days = Number.parseInt(searchParams.get('days') || '7', 10)

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - Math.max(1, Math.min(days, 180)))

    const sessions = await prisma.liveSession.findMany({
      where: {
        OR: [
          { startedAt: { gte: startDate } },
          {
            status: {
              in: ['active', 'live', 'in_progress', 'inprogress', 'ongoing'],
            },
          },
        ],
        participants: { some: {} },
      },
      select: {
        id: true,
        subject: true,
        status: true,
        startedAt: true,
        endedAt: true,
        tutor: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                name: true,
                timezone: true,
                avatarUrl: true,
              },
            },
          },
        },
        participants: {
          select: {
            student: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true,
                    timezone: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        startedAt: 'desc',
      },
      take: 600,
    })

    const nodeMap = new Map<
      string,
      {
        id: string
        role: 'TUTOR' | 'STUDENT'
        name: string
        email: string
        avatarUrl: string | null
        timezone: string
        lat: number
        lon: number
        activeSessions: number
        totalConnections: number
      }
    >()

    const edges: Array<{
      id: string
      sessionId: string
      tutorId: string
      studentId: string
      subject: string
      status: 'ACTIVE' | 'RECENT'
      isActive: boolean
      startedAt: string | null
    }> = []

    for (const live of sessions) {
      const tutorId = live.tutor.id
      const tutorTimezone = live.tutor.profile?.timezone || 'UTC'
      const tutorCoords = estimateCoordsFromTimezone(tutorTimezone, tutorId)
      const tutorNode = nodeMap.get(tutorId) || {
        id: tutorId,
        role: 'TUTOR' as const,
        name: live.tutor.profile?.name || live.tutor.email,
        email: live.tutor.email,
        avatarUrl: live.tutor.profile?.avatarUrl || null,
        timezone: tutorTimezone,
        lat: tutorCoords.lat,
        lon: tutorCoords.lon,
        activeSessions: 0,
        totalConnections: 0,
      }

      const active = isActiveSession(live.status, live.startedAt, live.endedAt)
      if (active) tutorNode.activeSessions += 1

      for (const participant of live.participants) {
        const student = participant.student
        const studentId = student.id
        const studentTimezone = student.profile?.timezone || 'UTC'
        const studentCoords = estimateCoordsFromTimezone(studentTimezone, studentId)

        const studentNode = nodeMap.get(studentId) || {
          id: studentId,
          role: 'STUDENT' as const,
          name: student.profile?.name || student.email,
          email: student.email,
          avatarUrl: student.profile?.avatarUrl || null,
          timezone: studentTimezone,
          lat: studentCoords.lat,
          lon: studentCoords.lon,
          activeSessions: 0,
          totalConnections: 0,
        }

        if (active) studentNode.activeSessions += 1

        tutorNode.totalConnections += 1
        studentNode.totalConnections += 1

        const edgeId = `${live.id}:${tutorId}:${studentId}`
        edges.push({
          id: edgeId,
          sessionId: live.id,
          tutorId,
          studentId,
          subject: live.subject || 'General',
          status: active ? 'ACTIVE' : 'RECENT',
          isActive: active,
          startedAt: live.startedAt?.toISOString() || null,
        })

        nodeMap.set(studentId, studentNode)
      }

      nodeMap.set(tutorId, tutorNode)
    }

    const nodes = Array.from(nodeMap.values())

    return NextResponse.json({
      topology: {
        nodes,
        edges,
        stats: {
          tutors: nodes.filter((n) => n.role === 'TUTOR').length,
          students: nodes.filter((n) => n.role === 'STUDENT').length,
          liveConnections: edges.filter((e) => e.isActive).length,
          totalConnections: edges.length,
        },
      },
      meta: {
        days,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Failed to build topology analytics', error)
    return NextResponse.json({ error: 'Failed to build topology analytics' }, { status: 500 })
  }
}
