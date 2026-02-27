/**
 * Integration tests: tutor course and batch APIs (create course, list/create batches, PATCH batch).
 * Requires DATABASE_URL and running DB. Mocks next-auth session and CSRF so handlers run as a real tutor user.
 */

import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import { prismaLegacyClient as db } from '@/lib/db/prisma-legacy'
import { POST as createCourse } from '@/app/api/tutor/courses/route'
import { GET as listBatches, POST as createBatch } from '@/app/api/tutor/courses/[id]/batches/route'
import { PATCH as updateBatch } from '@/app/api/tutor/courses/[id]/batches/[batchId]/route'

const testTutorEmail = `tutor-courses-test-${Date.now()}@example.com`
let tutorId: string
let courseId: string
let batchId: string

// Mock next-auth: getServerSession returns our tutor session
const mockSession = {
  user: { id: '', email: testTutorEmail, role: 'TUTOR' as const },
  expires: new Date(Date.now() + 86400 * 1000).toISOString(),
}
vi.mock('next-auth', () => ({
  getServerSession: vi.fn(() => Promise.resolve(mockSession)),
}))

// Mock CSRF so mutations are accepted
vi.mock('@/lib/security/csrf', () => ({
  verifyCsrfToken: vi.fn(() => true),
}))

function request(url: string, init: RequestInit = {}): Request {
  return new Request(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers as Record<string, string>),
    },
  })
}

describe('Tutor courses and batches API integration', () => {
  beforeAll(async () => {
    const user = await db.user.create({
      data: {
        email: testTutorEmail,
        role: 'TUTOR',
        password: 'hashed',
      },
    })
    tutorId = user.id
    mockSession.user.id = tutorId
    await db.profile.create({
      data: { userId: tutorId, name: 'Tutor Test' },
    })
  })

  afterAll(async () => {
    if (batchId) {
      try { await db.courseBatch.delete({ where: { id: batchId } }).catch(() => {}) } catch {}
    }
    if (courseId) {
      try {
        await db.curriculumLesson.deleteMany({ where: { module: { curriculumId: courseId } } })
        await db.curriculumModule.deleteMany({ where: { curriculumId: courseId } })
        await db.curriculum.delete({ where: { id: courseId } }).catch(() => {})
      } catch {}
    }
    if (tutorId) {
      try {
        await db.profile.deleteMany({ where: { userId: tutorId } })
        await db.user.delete({ where: { id: tutorId } })
      } catch {}
    }
    if (db?.$disconnect) await db.$disconnect()
  })

  it('creates a course and returns 200', async () => {
    const req = request('http://localhost/api/tutor/courses', {
      method: 'POST',
      body: JSON.stringify({
        title: 'Test Course',
        description: 'Integration test course',
        subject: 'math',
        difficulty: 'intermediate',
      }),
    })
    const res = await createCourse(req as any)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.course).toBeDefined()
    expect(data.course.name).toBe('Test Course')
    expect(data.course.subject).toBe('math')
    courseId = data.course.id
    expect(courseId).toBeDefined()
  })

  it('lists batches for the course', async () => {
    expect(courseId).toBeDefined()
    const req = request(`http://localhost/api/tutor/courses/${courseId}/batches`)
    const res = await listBatches(req as any, { params: Promise.resolve({ id: courseId }) } as any)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(Array.isArray(data.batches)).toBe(true)
  })

  it('creates a batch', async () => {
    expect(courseId).toBeDefined()
    const req = request(`http://localhost/api/tutor/courses/${courseId}/batches`, {
      method: 'POST',
      body: JSON.stringify({ name: 'Batch A', startDate: null }),
    })
    const res = await createBatch(req as any, { params: Promise.resolve({ id: courseId }) } as any)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.batch).toBeDefined()
    batchId = data.batch.id
    expect(data.batch.name).toBe('Batch A')
  })

  it('PATCH batch updates difficulty and schedule', async () => {
    expect(courseId).toBeDefined()
    expect(batchId).toBeDefined()
    const req = request(`http://localhost/api/tutor/courses/${courseId}/batches/${batchId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        difficulty: 'advanced',
        schedule: [{ dayOfWeek: 'Tuesday', startTime: '10:00', durationMinutes: 60 }],
      }),
    })
    const res = await updateBatch(req as any, {
      params: Promise.resolve({ id: courseId, batchId }),
    } as any)
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.batch.difficulty).toBe('advanced')
    expect(Array.isArray(data.batch.schedule)).toBe(true)
    expect(data.batch.schedule).toHaveLength(1)
    expect(data.batch.schedule[0].dayOfWeek).toBe('Tuesday')
    expect(data.batch.schedule[0].startTime).toBe('10:00')
    expect(data.batch.schedule[0].durationMinutes).toBe(60)
  })
})
