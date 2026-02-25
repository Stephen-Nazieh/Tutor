export interface MockTutorCourse {
  id: string
  name: string
  description: string
  subject: string
  gradeLevel: string
  difficulty: string
  estimatedHours: number
  enrollmentCount: number
  moduleCount: number
  lessonCount: number
  updatedAt: string
}

export interface MockTutorProfile {
  id: string
  name: string
  username: string
  bio: string
  avatarUrl: string | null
  specialties: string[]
  credentials: string
  hourlyRate: number
  courses: MockTutorCourse[]
}

export const MOCK_TUTORS: MockTutorProfile[] = [
  {
    id: 'mock-tutor-1',
    name: 'Ava Chen',
    username: 'tutor1',
    bio: 'STEM specialist focused on Socratic problem-solving and exam readiness.',
    avatarUrl: null,
    specialties: ['Algebra', 'Calculus', 'SAT Math'],
    credentials: 'MSc Applied Mathematics, 8+ years teaching advanced high school learners.',
    hourlyRate: 55,
    courses: [
      {
        id: 'mock-course-1',
        name: 'Adaptive Algebra Mastery',
        description: 'Build algebra intuition from fundamentals through advanced manipulations.',
        subject: 'Mathematics',
        gradeLevel: 'High School (10-12)',
        difficulty: 'Intermediate',
        estimatedHours: 18,
        enrollmentCount: 132,
        moduleCount: 7,
        lessonCount: 34,
        updatedAt: new Date('2026-02-10').toISOString(),
      },
      {
        id: 'mock-course-2',
        name: 'SAT Quant Sprint',
        description: 'Timed strategies, error analysis, and confidence-building routines.',
        subject: 'Mathematics',
        gradeLevel: 'High School (10-12)',
        difficulty: 'Advanced',
        estimatedHours: 12,
        enrollmentCount: 94,
        moduleCount: 5,
        lessonCount: 22,
        updatedAt: new Date('2026-02-18').toISOString(),
      },
    ],
  },
  {
    id: 'mock-tutor-2',
    name: 'Daniel Rivera',
    username: 'daniel.science',
    bio: 'Physics and chemistry tutor helping students translate theory into exam performance.',
    avatarUrl: null,
    specialties: ['Physics', 'Chemistry', 'Lab Skills'],
    credentials: 'BSc Physics, former lab instructor, curriculum designer for AP sciences.',
    hourlyRate: 60,
    courses: [
      {
        id: 'mock-course-3',
        name: 'Physics Through Experiments',
        description: 'Conceptual mechanics and electromagnetism tied to real lab workflows.',
        subject: 'Physics',
        gradeLevel: 'High School (10-12)',
        difficulty: 'Intermediate',
        estimatedHours: 20,
        enrollmentCount: 87,
        moduleCount: 8,
        lessonCount: 30,
        updatedAt: new Date('2026-02-05').toISOString(),
      },
    ],
  },
  {
    id: 'mock-tutor-3',
    name: 'Maya Thompson',
    username: 'maya.languages',
    bio: 'Language arts and communication coach for writing clarity and confident speaking.',
    avatarUrl: null,
    specialties: ['English Writing', 'Reading Comprehension', 'Public Speaking'],
    credentials: 'MA Education, published curriculum writer, debate coach.',
    hourlyRate: 48,
    courses: [
      {
        id: 'mock-course-4',
        name: 'Essay Excellence Studio',
        description: 'From thesis design to polished essays with actionable feedback loops.',
        subject: 'English',
        gradeLevel: 'Middle School (7-9)',
        difficulty: 'Beginner',
        estimatedHours: 16,
        enrollmentCount: 141,
        moduleCount: 6,
        lessonCount: 28,
        updatedAt: new Date('2026-02-15').toISOString(),
      },
    ],
  },
]

export function shouldUseMockPublicTutors(): boolean {
  const explicit = process.env.NEXT_PUBLIC_ENABLE_MOCK_PUBLIC_TUTORS
  if (explicit === 'true') return true
  if (explicit === 'false') return false
  return process.env.NODE_ENV !== 'production'
}

export function findMockTutorByUsername(username: string): MockTutorProfile | null {
  const normalized = username.trim().replace(/^@+/, '').toLowerCase()
  return MOCK_TUTORS.find((tutor) => tutor.username.toLowerCase() === normalized) || null
}
