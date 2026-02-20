/**
 * Student Subjects API
 * Get enrolled subjects with progress
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/api/middleware'
import { db } from '@/lib/db'

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
  const avgScore = quizAttempts.length > 0
    ? quizAttempts.reduce((sum: number, a: any) => sum + (a.score / a.maxScore) * 100, 0) / quizAttempts.length
    : 0

  // Process each enrollment
  const subjects = enrollments.map((enrollment: any) => {
    const allLessons = enrollment.curriculum.modules.flatMap((m: any) => m.lessons)
    const totalLessons = allLessons.length
    const completedLessons = allLessons.filter((l: any) => 
      l.progressRecords.some((r: any) => r.status === 'COMPLETED')
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
  
  return skillNames.map(name => ({
    name,
    score: Math.min(100, Math.max(20, Math.round(baseScore + (Math.random() - 0.5) * 30)))
  }))
}
