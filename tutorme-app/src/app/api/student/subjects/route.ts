/**
 * Student Subjects API
 * Get enrolled subjects with progress
 */

import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

interface QuizAttemptScore {
  score: number
  maxScore: number
}

interface LessonProgressRecord {
  status: string
}

interface LessonWithProgress {
  progressRecords: LessonProgressRecord[]
}

interface EnrollmentWithCurriculum {
  curriculum: {
    id: string
    name: string
    subject: string
    description: string | null
    modules: Array<{
      lessons: LessonWithProgress[]
    }>
  }
  lastActivity: Date | null
  enrollmentSource: string | null
}

// GET /api/student/subjects - Get student's enrolled subjects
export const GET = withAuth(async (req, session) => {
  // Get curriculum enrollments as subjects
  const enrollments = await db.curriculumEnrollment.findMany({
    where: { 
      studentId: session.user.id
    },
    include: {
      curriculum: {
        select: {
          id: true,
          name: true,
          subject: true,
          description: true,
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

  // Get quiz attempts for this student
  const quizAttempts = await db.quizAttempt.findMany({
    where: { studentId: session.user.id },
    take: 10,
    orderBy: { completedAt: 'desc' }
  })

  // Calculate average score
  const attempts = quizAttempts as QuizAttemptScore[]
  const avgScore = attempts.length > 0
    ? attempts.reduce((sum, a) => sum + (a.score / a.maxScore) * 100, 0) / attempts.length
    : 0

  // Process each enrollment
  const typedEnrollments = enrollments as EnrollmentWithCurriculum[]
  const subjects = typedEnrollments.map((enrollment) => {
    const allLessons = enrollment.curriculum.modules.flatMap((m) => m.lessons)
    const totalLessons = allLessons.length
    const completedLessons = allLessons.filter((l) => 
      l.progressRecords.some((r) => r.status === 'COMPLETED')
    ).length
    
    const progress = totalLessons > 0 
      ? Math.round((completedLessons / totalLessons) * 100) 
      : 0

    // Generate skills based on subject
    const skills = generateSubjectSkills(enrollment.curriculum.subject, avgScore)

    return {
      id: enrollment.curriculum.id,
      name: enrollment.curriculum.name,
      subject: enrollment.curriculum.subject,
      description: enrollment.curriculum.description,
      progress,
      completedLessons,
      totalLessons,
      skills,
      confidence: Math.round(avgScore),
      lastStudied: enrollment.lastActivity 
        ? new Date(enrollment.lastActivity).toLocaleDateString()
        : null,
      enrollmentSource: enrollment.enrollmentSource ?? null
    }
  })

  return NextResponse.json({ subjects })
}, { role: 'STUDENT' })

function generateSubjectSkills(subjectCode: string, baseScore: number) {
  const skillsMap: Record<string, string[]> = {
    english: ['Grammar', 'Vocabulary', 'Writing', 'Reading Comprehension', 'Speaking'],
    math: ['Algebra', 'Geometry', 'Calculus', 'Statistics', 'Problem Solving'],
    physics: ['Mechanics', 'Thermodynamics', 'Electricity', 'Waves', 'Quantum'],
    chemistry: ['Organic', 'Inorganic', 'Physical', 'Analytical', 'Biochemistry'],
    biology: ['Cell Biology', 'Genetics', 'Ecology', 'Anatomy', 'Evolution'],
    history: ['Ancient', 'Medieval', 'Modern', 'World Wars', 'Civilizations'],
    cs: ['Programming', 'Algorithms', 'Data Structures', 'Databases', 'Web Dev'],
  }

  const skillNames = skillsMap[subjectCode.toLowerCase()] || ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4']
  
  return skillNames.map((name, index) => ({
    name,
    score: Math.min(100, Math.max(20, Math.round(baseScore - 8 + index * 4)))
  }))
}
