/**
 * Subject Detail API
 * Get detailed information for a specific subject
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// GET /api/student/subjects/[subjectCode] - Get subject details
export const GET = withAuth(async (req: NextRequest, session, context: any) => {
  const params = await context?.params;
  const { subjectCode } = params || {};

  // Get curriculum enrollment
  const enrollment = await db.curriculumEnrollment.findFirst({
    where: { 
      studentId: session.user.id,
      curriculum: {
        subject: subjectCode
      }
    },
    include: {
      curriculum: {
        include: {
          modules: {
            include: {
              lessons: {
                include: {
                  progressRecords: {
                    where: { studentId: session.user.id }
                  }
                }
              }
            }
          }
        }
      }
    }
  })

  if (!enrollment) {
    throw new NotFoundError('Subject not found')
  }

  // Get quiz attempts for this student
  const quizAttempts = await db.quizAttempt.findMany({
    where: { 
      studentId: session.user.id
    },
    orderBy: { completedAt: 'desc' },
    take: 20
  })

  // Get gamification data
  const gamification = await db.userGamification.findUnique({
    where: { userId: session.user.id }
  })

  // Calculate stats
  const allLessons = enrollment.curriculum.modules.flatMap((m: any) => m.lessons)
  const totalLessons = allLessons.length
  const completedLessons = allLessons.filter((l: any) => 
    l.progressRecords.some((r: any) => r.status === 'COMPLETED')
  ).length
  const progress = totalLessons > 0 
    ? Math.round((completedLessons / totalLessons) * 100) 
    : 0

  const avgScore = quizAttempts.length > 0
    ? quizAttempts.reduce((sum: number, a: any) => sum + (a.score / a.maxScore) * 100, 0) / quizAttempts.length
    : 0

  // Generate skills based on subject
  const skills = generateSubjectSkills(subjectCode, avgScore)

  // Generate concept mastery for math
  const conceptMastery = subjectCode.toLowerCase() === 'math' 
    ? generateMathConceptMastery(quizAttempts)
    : undefined

  return NextResponse.json({
    subject: {
      id: enrollment.curriculum.id,
      name: enrollment.curriculum.name,
      subject: enrollment.curriculum.subject,
      description: enrollment.curriculum.description,
      progress,
      completedLessons,
      totalLessons,
      confidence: Math.round(avgScore),
      xp: gamification?.xp || 0,
      level: gamification?.level || 1,
      streakDays: gamification?.streakDays || 0,
      skills,
      conceptMastery,
      recentLessons: allLessons.slice(0, 5).map((lesson: any) => ({
        id: lesson.id,
        title: lesson.title,
        completed: lesson.progressRecords.some((r: any) => r.status === 'COMPLETED'),
        score: lesson.progressRecords[0]?.score || undefined
      })),
      enrollmentSource: enrollment.enrollmentSource ?? null
    }
  })
}, { role: 'STUDENT' })

function generateSubjectSkills(subjectCode: string, baseScore: number) {
  const skillsMap: Record<string, Record<string, number>> = {
    english: {
      grammar: 75,
      vocabulary: 80,
      speaking: 70,
      listening: 85,
      writing: 72,
      reading: 88,
    },
    math: {
      algebra: 65,
      geometry: 70,
      calculus: 45,
      statistics: 60,
      probability: 55,
      'problem-solving': 58,
    },
    physics: {
      mechanics: 55,
      thermodynamics: 40,
      electricity: 50,
      waves: 45,
      quantum: 30,
      optics: 42,
    },
    chemistry: {
      organic: 60,
      inorganic: 55,
      physical: 45,
      analytical: 50,
      biochemistry: 40,
    },
    biology: {
      'cell-biology': 65,
      genetics: 70,
      ecology: 60,
      anatomy: 55,
      evolution: 50,
    },
    history: {
      ancient: 70,
      medieval: 65,
      modern: 75,
      'world-wars': 80,
      civilizations: 60,
    },
    cs: {
      programming: 75,
      algorithms: 60,
      'data-structures': 65,
      databases: 55,
      'web-dev': 70,
    },
  }

  // Adjust scores based on actual performance
  const baseSkills = skillsMap[subjectCode.toLowerCase()] || { general: 50 }
  
  return Object.fromEntries(
    Object.entries(baseSkills).map(([skill, defaultScore]) => [
      skill,
      Math.min(100, Math.round(defaultScore + (baseScore - 50) * 0.3))
    ])
  )
}

function generateMathConceptMastery(quizAttempts: any[]) {
  const concepts = [
    { name: 'Linear Equations', weight: 1 },
    { name: 'Systems of Equations', weight: 0.9 },
    { name: 'Fractional Equations', weight: 0.8 },
    { name: 'Quadratic Equations', weight: 0.95 },
    { name: 'Polynomials', weight: 0.85 },
  ]

  const baseScore = quizAttempts.length > 0
    ? quizAttempts.reduce((sum: number, a: any) => sum + (a.score / a.maxScore) * 100, 0) / quizAttempts.length
    : 50

  return concepts.map((concept, index) => {
    // Vary scores slightly for each concept
    const variation = (Math.random() - 0.5) * 30
    const score = Math.min(100, Math.max(20, Math.round(baseScore + variation)))
    const totalQuestions = 10 + index * 2
    const correctAnswers = Math.round((score / 100) * totalQuestions)

    return {
      concept: concept.name,
      score,
      totalQuestions,
      correctAnswers,
    }
  })
}
