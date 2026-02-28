/**
 * AI Tutor Subjects API
 * List available AI tutor subjects (English only for now)
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession, authOptions } from '@/lib/auth'

// Available subjects (English only for launch)
const AVAILABLE_SUBJECTS = [
  {
    id: 'english',
    name: 'English Language Arts',
    description: 'Improve your writing, grammar, and literary analysis skills with personalized AI tutoring.',
    icon: '📚',
    topics: [
      'Essay Writing',
      'Grammar & Mechanics',
      'Literary Analysis',
      'Reading Comprehension',
      'Vocabulary Building',
      'Creative Writing'
    ],
    features: [
      'Essay review and feedback',
      'Grammar practice',
      'Literature discussion',
      'Writing prompts',
      'Thesis development'
    ],
    estimatedStudents: 1240,
    averageRating: 4.9,
    color: 'blue'
  }
]

// Hidden subjects (code-ready but not visible)
const HIDDEN_SUBJECTS = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    description: 'Master algebra, calculus, and more with step-by-step guidance.',
    icon: '🔢',
    topics: ['Algebra', 'Calculus', 'Geometry', 'Statistics'],
    comingSoon: true
  },
  {
    id: 'physics',
    name: 'Physics',
    description: 'Understand mechanics, energy, and electromagnetism.',
    icon: '⚛️',
    topics: ['Mechanics', 'Thermodynamics', 'Electricity', 'Magnetism'],
    comingSoon: true
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    description: 'Learn stoichiometry, atomic structure, and chemical reactions.',
    icon: '🧪',
    topics: ['Stoichiometry', 'Atomic Structure', 'Chemical Bonding', 'Equilibrium'],
    comingSoon: true
  }
]

// GET - List available subjects
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions, req)
    
    // Check if user wants to see all subjects (including hidden)
    const { searchParams } = new URL(req.url)
    const showAll = searchParams.get('all') === 'true'
    
    // Only show all if admin or explicitly requested
    const subjects = showAll && session?.user?.role === 'ADMIN' 
      ? [...AVAILABLE_SUBJECTS, ...HIDDEN_SUBJECTS]
      : AVAILABLE_SUBJECTS

    return NextResponse.json({
      subjects,
      totalAvailable: AVAILABLE_SUBJECTS.length,
      moreComingSoon: HIDDEN_SUBJECTS.length
    })
  } catch (error) {
    console.error('Get subjects error:', error)
    return NextResponse.json(
      { error: 'Failed to get subjects' },
      { status: 500 }
    )
  }
}
