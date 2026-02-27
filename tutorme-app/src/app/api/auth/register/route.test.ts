import { describe, it, expect, vi, beforeEach } from 'vitest'
import { POST } from './route'

// Route uses drizzleDb from @/lib/db/drizzle. When re-enabling tests, mock '@/lib/db/drizzle' and '@/lib/db/schema'.
const mockUser = {
  id: 'user-1',
  email: 'new@example.com',
  role: 'STUDENT',
  createdAt: new Date(),
}

const mockParentUser = {
  id: 'user-2',
  email: 'parent@example.com',
  role: 'PARENT',
  createdAt: new Date(),
}

vi.mock('nanoid', () => ({
  nanoid: vi.fn().mockReturnValue('mocknanoid12'),
}))

vi.mock('@/lib/db/drizzle', () => ({
  drizzleDb: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockResolvedValue([]),
    transaction: vi.fn().mockImplementation(async (fn: (tx: unknown) => Promise<unknown>) => fn({})),
  },
}))
vi.mock('bcryptjs', () => ({
  default: { hash: vi.fn().mockResolvedValue('hashed') },
}))
vi.mock('@/lib/api/middleware', () => ({
  withRateLimitPreset: vi.fn().mockResolvedValue({ response: null, remaining: 100 }),
  ValidationError: class ValidationError extends Error {
    constructor(message: string) {
      super(message)
      this.name = 'ValidationError'
    }
  },
}))
vi.mock('@/lib/security/parent-child-queries', () => ({
  verifyAllChildren: vi.fn().mockResolvedValue({
    verified: new Map([
      [
        0,
        {
          userId: 'student-1',
          email: 'child@example.com',
          name: 'Child One',
          studentUniqueId: 'STU-abc123456789',
        },
      ],
    ]),
    errors: [],
  }),
  isStudentAlreadyLinked: vi.fn().mockResolvedValue(false),
}))

describe.skip('POST /api/auth/register', () => {
  const _db = {
    user: { findUnique: vi.fn() },
    profile: { findUnique: vi.fn() },
    $transaction: vi.fn(),
  }
  beforeEach(() => {
    vi.mocked(_db.user.findUnique).mockResolvedValue(null)
    vi.mocked(_db.$transaction).mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        user: { create: vi.fn().mockResolvedValue(mockUser) },
        profile: { create: vi.fn().mockResolvedValue({}) },
        familyAccount: { create: vi.fn().mockResolvedValue({ id: 'fa-1' }) },
        emergencyContact: { createMany: vi.fn().mockResolvedValue({}) },
        familyMember: { create: vi.fn().mockResolvedValue({}) },
      }
      return fn(tx)
    })
  })

  it('returns 400 for invalid JSON', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: 'not json',
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('Invalid JSON')
  })

  it('returns 400 for validation failure (short password)', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'test@example.com',
        password: 'short',
        role: 'STUDENT',
        tosAccepted: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 201 and user on success', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test User',
        email: 'new@example.com',
        password: 'Password1',
        role: 'STUDENT',
        tosAccepted: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('new@example.com')
    expect(data.user.role).toBe('STUDENT')
  })

  it('returns 201 for PARENT registration with verified child (childEmail)', async () => {
    const { verifyAllChildren, isStudentAlreadyLinked } = await import('@/lib/security/parent-child-queries')
    vi.mocked(verifyAllChildren).mockResolvedValue({
      verified: new Map([[0, { userId: "student-1", email: "child@example.com", name: "Child One", studentUniqueId: "STU-abc123456789" }]]),
      errors: [],
    })
    vi.mocked(isStudentAlreadyLinked).mockResolvedValue(false)

    vi.mocked(_db.$transaction).mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        user: { create: vi.fn().mockResolvedValue(mockParentUser) },
        profile: { create: vi.fn().mockResolvedValue({}) },
        familyAccount: { create: vi.fn().mockResolvedValue({ id: 'fa-1' }) },
        emergencyContact: { createMany: vi.fn().mockResolvedValue({}) },
        familyMember: { create: vi.fn().mockResolvedValue({}) },
      }
      return fn(tx)
    })

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Parent User',
        email: 'parent@example.com',
        password: 'Password1',
        role: 'PARENT',
        tosAccepted: true,
        profileData: {
          phoneNumber: '+8613800000000',
          relationship: 'parent',
          timezone: 'Asia/Shanghai',
          preferredLanguage: 'zh-CN',
        },
        additionalData: {
          students: [{ childEmail: 'child@example.com', name: 'Child One', grade: 'Grade 1', subjects: [] }],
          emergencyContacts: [],
          notificationPreferences: { email: true, sms: true, app: true },
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('parent@example.com')
    expect(data.user.role).toBe('PARENT')
  })

  it('returns 400 when PARENT registration missing child verification (no childEmail or childUniqueId)', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Parent User',
        email: 'parent@example.com',
        password: 'Password1',
        role: 'PARENT',
        tosAccepted: true,
        profileData: {
          phoneNumber: '+8613800000000',
          relationship: 'parent',
          timezone: 'Asia/Shanghai',
          preferredLanguage: 'zh-CN',
        },
        additionalData: {
          students: [{ name: 'Child One', grade: 'Grade 1', subjects: [] }],
          emergencyContacts: [],
          notificationPreferences: { email: true, sms: true, app: true },
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 201 for PARENT registration without children (optional)', async () => {
    const mockParentUserNoChildren = {
      id: 'user-parent-no-children',
      email: 'parent-no-children@example.com',
      role: 'PARENT',
      createdAt: new Date(),
    }

    vi.mocked(_db.$transaction).mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        user: { create: vi.fn().mockResolvedValue(mockParentUserNoChildren) },
        profile: { create: vi.fn().mockResolvedValue({}) },
        familyAccount: { create: vi.fn().mockResolvedValue({ id: 'fa-2' }) },
        emergencyContact: { createMany: vi.fn().mockResolvedValue({}) },
        familyMember: { create: vi.fn().mockResolvedValue({}) },
      }
      return fn(tx)
    })

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Parent User',
        email: 'parent-no-children@example.com',
        password: 'Password1',
        role: 'PARENT',
        tosAccepted: true,
        profileData: {
          phoneNumber: '+8613800000000',
          relationship: 'parent',
          timezone: 'Asia/Shanghai',
          preferredLanguage: 'zh-CN',
        },
        additionalData: {
          students: [], // Empty array - no children
          emergencyContacts: [],
          notificationPreferences: { email: true, sms: true, app: true },
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.role).toBe('PARENT')
  })

  it('returns 400 when PARENT registration missing profileData', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Parent User',
        email: 'parent@example.com',
        password: 'Password1',
        role: 'PARENT',
        tosAccepted: true,
        additionalData: {
          students: [{ childEmail: 'child@example.com', name: 'Child One', grade: 'Grade 1', subjects: [] }],
          emergencyContacts: [],
          notificationPreferences: {},
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('profileData')
  })

  it('returns 201 for TUTOR registration with additional data', async () => {
    vi.mocked(_db.$transaction).mockImplementation(async (fn: (tx: any) => Promise<any>) => {
      const tx = {
        user: {
          create: vi.fn().mockResolvedValue({
            id: 'tutor-1',
            email: 'tutor@example.com',
            role: 'TUTOR',
            createdAt: new Date(),
          })
        },
        profile: {
          create: vi.fn().mockResolvedValue({}),
          update: vi.fn().mockResolvedValue({}),
        },
      }
      return fn(tx)
    })

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Tutor User',
        email: 'tutor@example.com',
        password: 'Password1',
        role: 'TUTOR',
        tosAccepted: true,
        profileData: {
          phoneNumber: '+8613800000000',
          timezone: 'Asia/Shanghai',
        },
        additionalData: {
          education: 'Master\'s in Mathematics',
          experience: '5-10',
          subjects: ['Mathematics', 'Physics'],
          gradeLevels: ['High School (10-12)', 'University'],
          hourlyRate: 200,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.success).toBe(true)
    expect(data.user.email).toBe('tutor@example.com')
    expect(data.user.role).toBe('TUTOR')
  })

  it('returns 400 when TUTOR registration missing subjects', async () => {
    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Tutor User',
        email: 'tutor@example.com',
        password: 'Password1',
        role: 'TUTOR',
        tosAccepted: true,
        additionalData: {
          education: 'Master\'s in Mathematics',
          // subjects is missing - should fail validation
          hourlyRate: 200,
        },
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toBeDefined()
  })

  it('returns 400 when email already registered', async () => {
    vi.mocked(_db.user.findUnique).mockResolvedValue({ id: 'existing' } as any)

    const req = new Request('http://localhost/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Test',
        email: 'existing@example.com',
        password: 'Password1',
        role: 'STUDENT',
        tosAccepted: true,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req as any)
    expect(res.status).toBe(400)
    const data = await res.json()
    expect(data.error).toContain('already')
  })
})
