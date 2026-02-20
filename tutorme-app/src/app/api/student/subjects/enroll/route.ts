/**
 * Enroll in a Subject API
 * Add a new subject to student's curriculum
 */

import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withCsrf, ValidationError, withRateLimitPreset } from '@/lib/api/middleware'
import { db } from '@/lib/db'

// Subject definitions with their curriculum mappings
const subjectCurriculumMap: Record<string, { name: string; description: string }> = {
  english: {
    name: 'English Language Arts',
    description: 'Language arts, writing, grammar, and literature analysis',
  },
  math: {
    name: 'Mathematics',
    description: 'Algebra, geometry, and foundational problem solving',
  },
  precalculus: {
    name: 'Pre-calculus',
    description: 'Functions, trigonometry, and preparation for calculus',
  },
  'ap-calculus-ab': {
    name: 'AP Calculus AB',
    description: 'Limits, derivatives, integrals, and the Fundamental Theorem',
  },
  'ap-calculus-bc': {
    name: 'AP Calculus BC',
    description: 'All AB topics plus series, parametric, and polar calculus',
  },
  'ap-statistics': {
    name: 'AP Statistics',
    description: 'Data analysis, probability, and statistical inference',
  },
  physics: {
    name: 'Physics',
    description: 'Mechanics, thermodynamics, electricity, and magnetism',
  },
  chemistry: {
    name: 'Chemistry',
    description: 'Organic, inorganic, and physical chemistry fundamentals',
  },
  biology: {
    name: 'Biology',
    description: 'Cell biology, genetics, ecology, and evolution',
  },
  ielts: {
    name: 'IELTS',
    description: 'International English Language Testing System preparation',
  },
  toefl: {
    name: 'TOEFL',
    description: 'Test of English as a Foreign Language preparation',
  },
  cs: {
    name: 'Computer Science',
    description: 'Programming, algorithms, and software development',
  },
}

// POST /api/student/subjects/enroll - Enroll in a new subject
export const POST = withCsrf(withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'enroll')
  if (rateLimitResponse) return rateLimitResponse

  const { subjectCode } = await req.json()

  if (!subjectCode) {
    throw new ValidationError('Subject code required')
  }

  const subjectInfo = subjectCurriculumMap[subjectCode.toLowerCase()]
  
  if (!subjectInfo) {
    throw new ValidationError('Invalid subject code')
  }

  // Check if already enrolled
  const existingEnrollment = await db.curriculumEnrollment.findFirst({
    where: {
      studentId: session.user.id,
      curriculum: {
        subject: subjectCode,
      },
    },
  })

  if (existingEnrollment) {
    throw new ValidationError('Already enrolled in this subject')
  }

  // Find or create curriculum
  let curriculum = await db.curriculum.findFirst({
    where: { subject: subjectCode },
  })

  if (!curriculum) {
    // Create a new curriculum for this subject
    curriculum = await db.curriculum.create({
      data: {
        name: subjectInfo.name,
        subject: subjectCode.toLowerCase(),
        description: subjectInfo.description,
        difficulty: 'intermediate',
        estimatedHours: 40,
        isPublished: true,
      },
    })

    // Create default modules and lessons for the subject
    await createDefaultModules(curriculum.id, subjectCode)
  }

  // Create enrollment (from browse "Add subject" — not yet completed signup flow)
  const enrollment = await db.curriculumEnrollment.create({
    data: {
      studentId: session.user.id,
      curriculumId: curriculum.id,
      enrollmentSource: 'browse',
    },
  })

  // Award XP for enrolling (create gamification record if doesn't exist)
  await db.userGamification.upsert({
    where: { userId: session.user.id },
    update: {
      xp: { increment: 50 },
    },
    create: {
      userId: session.user.id,
      xp: 50,
      level: 1,
    },
  })

  return NextResponse.json({
    success: true,
    enrollment,
    message: `Enrolled in ${subjectInfo.name}`,
  })
}, { role: 'STUDENT' }))

async function createDefaultModules(curriculumId: string, subjectCode: string) {
  // Create default modules based on subject
  const moduleData = getDefaultModules(subjectCode)
  
  for (let i = 0; i < moduleData.length; i++) {
    const mod = moduleData[i]
    await db.curriculumModule.create({
      data: {
        curriculumId,
        title: mod.title,
        description: mod.description,
        order: i,
        lessons: {
          create: mod.lessons.map((lesson: string, j: number) => ({
            title: lesson,
            order: j,
            duration: 30,
            learningObjectives: [],
            teachingPoints: [],
            keyConcepts: [],
          })),
        },
      },
    })
  }
}

function getDefaultModules(subjectCode: string) {
  const modules: Record<string, any[]> = {
    precalculus: [
      {
        title: 'Functions and Graphs',
        description: 'Understanding functions, domain, range, and transformations',
        lessons: ['Introduction to Functions', 'Function Operations', 'Graph Transformations'],
      },
      {
        title: 'Trigonometry',
        description: 'Trigonometric functions, identities, and equations',
        lessons: ['Unit Circle', 'Trig Functions', 'Trig Identities'],
      },
      {
        title: 'Analytic Geometry',
        description: 'Conic sections and parametric equations',
        lessons: ['Circles and Parabolas', 'Ellipses and Hyperbolas', 'Parametric Equations'],
      },
      {
        title: 'Sequences and Series',
        description: 'Arithmetic, geometric sequences and series',
        lessons: ['Arithmetic Sequences', 'Geometric Sequences', 'Series and Summation'],
      },
    ],
    'ap-calculus-ab': [
      {
        title: 'Limits and Continuity',
        description: 'Understanding limits and continuity',
        lessons: ['Introduction to Limits', 'Limit Properties', 'Continuity'],
      },
      {
        title: 'Derivatives',
        description: 'Definition, rules, and applications of derivatives',
        lessons: ['Derivative Definition', 'Differentiation Rules', 'Chain Rule', 'Applications'],
      },
      {
        title: 'Integrals',
        description: 'Definite and indefinite integrals',
        lessons: ['Antiderivatives', 'Definite Integrals', 'Fundamental Theorem', 'Applications'],
      },
    ],
    'ap-calculus-bc': [
      {
        title: 'Limits and Continuity',
        description: 'Understanding limits and continuity',
        lessons: ['Introduction to Limits', 'Limit Properties', 'Continuity'],
      },
      {
        title: 'Derivatives',
        description: 'Definition, rules, and applications',
        lessons: ['Derivative Definition', 'Differentiation Rules', 'Applications'],
      },
      {
        title: 'Integrals',
        description: 'Definite and indefinite integrals',
        lessons: ['Antiderivatives', 'Definite Integrals', 'Applications'],
      },
      {
        title: 'Series',
        description: 'Infinite series and convergence',
        lessons: ['Sequences', 'Series Convergence', 'Power Series', 'Taylor Series'],
      },
      {
        title: 'Parametric and Polar',
        description: 'Parametric equations and polar coordinates',
        lessons: ['Parametric Curves', 'Polar Coordinates', 'Calculus in Polar'],
      },
    ],
    'ap-statistics': [
      {
        title: 'Exploring Data',
        description: 'Describing and analyzing data patterns',
        lessons: ['Graphical Displays', 'Summarizing Distributions', 'Comparing Distributions'],
      },
      {
        title: 'Sampling and Experimentation',
        description: 'Data collection methods',
        lessons: ['Sampling Methods', 'Experimental Design', 'Simulations'],
      },
      {
        title: 'Probability',
        description: 'Randomness and probability',
        lessons: ['Probability Rules', 'Random Variables', 'Normal Distribution'],
      },
      {
        title: 'Inference',
        description: 'Statistical inference and testing',
        lessons: ['Confidence Intervals', 'Hypothesis Testing', 'Comparing Groups'],
      },
    ],
  }

  return modules[subjectCode.toLowerCase()] || [
    {
      title: 'Introduction',
      description: 'Getting started with the subject',
      lessons: ['Welcome', 'Basics', 'Getting Started'],
    },
    {
      title: 'Core Concepts',
      description: 'Fundamental principles',
      lessons: ['Concept 1', 'Concept 2', 'Concept 3'],
    },
    {
      title: 'Advanced Topics',
      description: 'Deeper exploration',
      lessons: ['Advanced 1', 'Advanced 2'],
    },
  ]
}
