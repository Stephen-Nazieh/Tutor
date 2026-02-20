/**
 * Database Seed Script
 * Creates sample data for testing
 * 
 * Run with: npx prisma db seed
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...\n')

  // Create sample users
  const tutorUser = await prisma.user.create({
    data: {
      email: 'tutor@example.com',
      role: 'TUTOR',
      profile: {
        create: {
          name: 'Sample Tutor',
          bio: 'Experienced mathematics tutor',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tutor',
        }
      }
    }
  })
  console.log('Created tutor:', tutorUser.id)

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@example.com',
      role: 'STUDENT',
      profile: {
        create: {
          name: 'Sample Student',
          gradeLevel: '10th Grade',
          avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
        }
      }
    }
  })
  console.log('Created student:', studentUser.id)

  // Create sample curriculum
  const mathCurriculum = await prisma.curriculum.create({
    data: {
      name: 'Mathematics Fundamentals',
      subject: 'Mathematics',
      difficulty: 'BEGINNER',
      description: 'Core mathematics concepts including algebra and geometry',
      estimatedHours: 20,
      isPublished: true,
      modules: {
        create: [
          {
            title: 'Linear Equations',
            description: 'Understanding and solving linear equations',
            order: 0,
            lessons: {
              create: [
                {
                  title: 'Introduction to Linear Equations',
                  description: 'Learn the fundamentals of linear equations',
                  duration: 30,
                  difficulty: 'beginner',
                  order: 0,
                  learningObjectives: ['Understand what linear equations are', 'Identify linear equation forms'],
                  teachingPoints: ['Definition of linear equations', 'Standard form: ax + b = 0'],
                  keyConcepts: ['Variables', 'Coefficients', 'Constants'],
                },
                {
                  title: 'Solving Simple Equations',
                  description: 'Practice solving basic linear equations',
                  duration: 45,
                  difficulty: 'beginner',
                  order: 1,
                  learningObjectives: ['Solve one-step equations', 'Solve two-step equations'],
                  teachingPoints: ['Isolating variables', 'Inverse operations'],
                  keyConcepts: ['Addition property', 'Multiplication property'],
                }
              ]
            }
          }
        ]
      }
    }
  })
  console.log('Created curriculum:', mathCurriculum.name)

  // Create sample clinic
  const clinic = await prisma.clinic.create({
    data: {
      title: 'Math Study Session',
      description: 'Weekly math tutoring session focusing on linear equations',
      tutorId: tutorUser.id,
      subject: 'Mathematics',
      maxStudents: 50,
      status: 'scheduled',
      startTime: new Date(Date.now() + 86400000), // Tomorrow
      duration: 60,
    }
  })
  console.log('Created clinic:', clinic.title)

  // Create sample content item
  const contentItem = await prisma.contentItem.create({
    data: {
      type: 'video',
      subject: 'Mathematics',
      title: 'Introduction to Linear Equations',
      description: 'Learn the basics of linear equations',
      difficulty: 'beginner',
      duration: 15,
      url: 'https://example.com/video1.mp4',
      isPublished: true,
    }
  })
  console.log('Created content item:', contentItem.title)

  // Create sample achievement
  const achievement = await prisma.achievement.create({
    data: {
      userId: studentUser.id,
      type: 'FIRST_LOGIN',
      title: 'Welcome Aboard!',
      description: 'Completed your first login to TutorMe',
      xpAwarded: 10,
    }
  })
  console.log('Created achievement:', achievement.title)

  // Create sample gamification record
  const gamification = await prisma.userGamification.create({
    data: {
      userId: studentUser.id,
      xp: 100,
      streakDays: 3,
      level: 2,
    }
  })
  console.log('Created gamification record')

  // Seed admin system (admin@tutorme.com with SUPER_ADMIN role)
  const { seedAdminSystem } = await import('../src/scripts/seed-admin')
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

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
