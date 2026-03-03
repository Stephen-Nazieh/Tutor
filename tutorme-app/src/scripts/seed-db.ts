/**
 * Database Seed Script
 * Creates sample data for testing
 *
 * Run with: npm run db:seed
 */
import crypto from 'crypto'
import { drizzleDb } from '@/lib/db/drizzle'
import {
  achievement,
  clinic,
  contentItem,
  curriculum,
  curriculumLesson,
  curriculumModule,
  profile,
  user,
  userGamification,
} from '@/lib/db/schema'

async function main() {
  console.log('Seeding database...\n')

  // Create sample users
  const tutorId = crypto.randomUUID()
  await drizzleDb.insert(user).values({
    id: tutorId,
    email: 'tutor@example.com',
    role: 'TUTOR',
    password: 'hashed',
  })
  await drizzleDb.insert(profile).values({
    id: crypto.randomUUID(),
    userId: tutorId,
    name: 'Sample Tutor',
    bio: 'Experienced mathematics tutor',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor',
    timezone: 'Asia/Shanghai',
    emailNotifications: true,
    smsNotifications: false,
    subjectsOfInterest: [],
    preferredLanguages: [],
    learningGoals: [],
    tosAccepted: true,
    tosAcceptedAt: new Date(),
    isOnboarded: true,
    specialties: [],
    paidClassesEnabled: false,
  })
  console.log('Created tutor:', tutorId)

  const studentId = crypto.randomUUID()
  await drizzleDb.insert(user).values({
    id: studentId,
    email: 'student@example.com',
    role: 'STUDENT',
    password: 'hashed',
  })
  await drizzleDb.insert(profile).values({
    id: crypto.randomUUID(),
    userId: studentId,
    name: 'Sample Student',
    gradeLevel: '10th Grade',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    timezone: 'Asia/Shanghai',
    emailNotifications: true,
    smsNotifications: false,
    subjectsOfInterest: [],
    preferredLanguages: [],
    learningGoals: [],
    tosAccepted: true,
    tosAcceptedAt: new Date(),
    isOnboarded: true,
    specialties: [],
    paidClassesEnabled: false,
  })
  console.log('Created student:', studentId)

  // Create sample curriculum
  const curriculumId = crypto.randomUUID()
  await drizzleDb.insert(curriculum).values({
    id: curriculumId,
    name: 'Mathematics Fundamentals',
    subject: 'Mathematics',
    difficulty: 'beginner',
    description: 'Core mathematics concepts including algebra and geometry',
    estimatedHours: 20,
    isPublished: true,
    isLiveOnline: false,
    creatorId: tutorId,
  })
  const moduleId = crypto.randomUUID()
  await drizzleDb.insert(curriculumModule).values({
    id: moduleId,
    curriculumId,
    title: 'Linear Equations',
    description: 'Understanding and solving linear equations',
    order: 0,
  })
  await drizzleDb.insert(curriculumLesson).values({
    id: crypto.randomUUID(),
    moduleId,
    title: 'Introduction to Linear Equations',
    description: 'Learn the fundamentals of linear equations',
    duration: 30,
    difficulty: 'beginner',
    order: 0,
    learningObjectives: ['Understand what linear equations are', 'Identify linear equation forms'],
    teachingPoints: ['Definition of linear equations', 'Standard form: ax + b = 0'],
    keyConcepts: ['Variables', 'Coefficients', 'Constants'],
    commonMisconceptions: [],
    prerequisiteLessonIds: [],
  })
  await drizzleDb.insert(curriculumLesson).values({
    id: crypto.randomUUID(),
    moduleId,
    title: 'Solving Simple Equations',
    description: 'Practice solving basic linear equations',
    duration: 45,
    difficulty: 'beginner',
    order: 1,
    learningObjectives: ['Solve one-step equations', 'Solve two-step equations'],
    teachingPoints: ['Isolating variables', 'Inverse operations'],
    keyConcepts: ['Addition property', 'Multiplication property'],
    commonMisconceptions: [],
    prerequisiteLessonIds: [],
  })
  console.log('Created curriculum: Mathematics Fundamentals')

  // Create sample clinic
  const clinicId = crypto.randomUUID()
  await drizzleDb.insert(clinic).values({
    id: clinicId,
    title: 'Math Study Session',
    description: 'Weekly math tutoring session focusing on linear equations',
    tutorId,
    subject: 'Mathematics',
    maxStudents: 50,
    status: 'scheduled',
    startTime: new Date(Date.now() + 86400000),
    duration: 60,
    requiresPayment: false,
  })
  console.log('Created clinic: Math Study Session')

  // Create sample content item
  await drizzleDb.insert(contentItem).values({
    id: crypto.randomUUID(),
    type: 'video',
    subject: 'Mathematics',
    title: 'Introduction to Linear Equations',
    description: 'Learn the basics of linear equations',
    difficulty: 'beginner',
    duration: 15,
    url: 'https://example.com/video1.mp4',
    isPublished: true,
  })
  console.log('Created content item: Introduction to Linear Equations')

  // Create sample achievement
  await drizzleDb.insert(achievement).values({
    id: crypto.randomUUID(),
    userId: studentId,
    type: 'FIRST_LOGIN',
    title: 'Welcome Aboard!',
    description: 'Completed your first login to TutorMe',
    xpAwarded: 10,
  })
  console.log('Created achievement: Welcome Aboard!')

  // Create sample gamification record
  await drizzleDb.insert(userGamification).values({
    id: crypto.randomUUID(),
    userId: studentId,
    xp: 100,
    streakDays: 3,
    level: 2,
    longestStreak: 3,
    totalStudyMinutes: 0,
    grammarScore: 0,
    vocabularyScore: 0,
    speakingScore: 0,
    listeningScore: 0,
    confidenceScore: 0,
    fluencyScore: 0,
    unlockedWorlds: [],
  })
  console.log('Created gamification record')

  // Seed admin system (admin@tutorme.com with SUPER_ADMIN role)
  const { seedAdminSystem } = await import('@/scripts/seed-admin')
  await seedAdminSystem()

  console.log('\n✅ Seeding completed!')
  console.log('\nSample data created:')
  console.log('  - 1 Tutor user')
  console.log('  - 1 Student user')
  console.log('  - 1 Curriculum with modules and lessons')
  console.log('  - 1 Clinic')
  console.log('  - 1 Content Item')
  console.log('  - 1 Achievement')
  console.log('  - 1 Gamification record')
  console.log('  - Admin user (see above for credentials)')
}

main().catch((e) => {
  console.error('Seed error:', e)
  process.exit(1)
})
