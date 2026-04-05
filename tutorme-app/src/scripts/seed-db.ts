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
  course,
  courseLesson,
  curriculumModule,
  profile,
  user,
  userGamification,
} from '@/lib/db/schema'

async function main() {
  console.log('Seeding database...\n')

  // Create sample users
  const tutorId = crypto.randomUUID()
  const now = new Date()
  await drizzleDb.insert(user).values({
    userId: tutorId,
    email: 'tutor@example.com',
    role: 'TUTOR',
    password: 'hashed',
    createdAt: now,
    updatedAt: now,
  })
  await drizzleDb.insert(profile).values({
    profileId: crypto.randomUUID(),
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
    createdAt: now,
    updatedAt: now,
  })
  console.log('Created tutor:', tutorId)

  const studentId = crypto.randomUUID()
  await drizzleDb.insert(user).values({
    userId: studentId,
    email: 'student@example.com',
    role: 'STUDENT',
    password: 'hashed',
    createdAt: now,
    updatedAt: now,
  })
  await drizzleDb.insert(profile).values({
    profileId: crypto.randomUUID(),
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
    createdAt: now,
    updatedAt: now,
  })
  console.log('Created student:', studentId)

  // Create sample course
  const courseId = crypto.randomUUID()
  await drizzleDb.insert(course).values({
    courseId: courseId,
    name: 'Mathematics Fundamentals',
    categories: ['Mathematics'],
    description: 'Core mathematics concepts including algebra and geometry',
    isPublished: true,
    isLiveOnline: false,
    creatorId: tutorId,
    createdAt: now,
    updatedAt: now,
  })
  const moduleId = crypto.randomUUID()
  await drizzleDb.insert(curriculumModule).values({
    moduleId: moduleId,
    courseId: courseId,
    title: 'Linear Equations',
    description: 'Understanding and solving linear equations',
    order: 0,
    builderData: {},
  })
  await drizzleDb.insert(courseLesson).values({
    lessonId: crypto.randomUUID(),
    courseId: courseId,
    title: 'Introduction to Linear Equations',
    description: 'Learn the fundamentals of linear equations',
    order: 0,
    tasks: [],
    assessments: [],
    homework: [],
    builderData: {},
  })
  await drizzleDb.insert(courseLesson).values({
    lessonId: crypto.randomUUID(),
    courseId: courseId,
    title: 'Solving Simple Equations',
    description: 'Practice solving basic linear equations',
    order: 1,
    tasks: [],
    assessments: [],
    homework: [],
    builderData: {},
  })
  console.log('Created curriculum: Mathematics Fundamentals')

  // Create sample clinic
  const clinicId = crypto.randomUUID()
  await drizzleDb.insert(clinic).values({
    clinicId: clinicId,
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
    contentId: crypto.randomUUID(),
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
    achievementId: crypto.randomUUID(),
    userId: studentId,
    type: 'FIRST_LOGIN',
    title: 'Welcome Aboard!',
    description: 'Completed your first login to Solocorn',
    xpAwarded: 10,
  })
  console.log('Created achievement: Welcome Aboard!')

  // Create sample gamification record
  await drizzleDb.insert(userGamification).values({
    gamificationId: crypto.randomUUID(),
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
    lastLogin: new Date(),
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

main().catch(e => {
  console.error('Seed error:', e)
  process.exit(1)
})
