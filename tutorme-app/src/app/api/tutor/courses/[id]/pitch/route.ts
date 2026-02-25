/**
 * POST /api/tutor/courses/[id]/pitch
 * Generate AI-powered course pitch/description
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf } from '@/lib/api/middleware'
import { generateWithFallback } from '@/lib/ai/orchestrator'

const COURSE_PITCH_PROMPT = `You are an expert course marketing copywriter. Create a compelling, persuasive course pitch that will excite students and convince them to enroll.

Write the pitch in the following structured format:

## 🎯 COURSE HOOK
An attention-grabbing opening statement (1-2 sentences) that immediately communicates the transformation this course offers.

## 📚 WHAT YOU'LL LEARN
A bullet-point list of 5-7 specific skills, knowledge areas, and competencies students will gain. Make these concrete and outcome-focused.

## 👥 WHO THIS COURSE IS FOR
Describe the ideal student profile in 2-3 sentences. Include:
- Current skill level (beginners, intermediate, etc.)
- Background/experience needed
- Goals and aspirations this course helps achieve

## 🎓 TEACHING METHODOLOGY
Explain the learning approach in 2-3 paragraphs covering:
- Teaching style (hands-on projects, theory + practice, case studies, etc.)
- Learning materials and resources provided
- Assessment and feedback methods
- Support available to students

## 🏆 EXPECTED OUTCOMES
Specific, measurable outcomes students can expect after completing this course. Use bullet points (4-6 items). Include both hard skills and soft skills.

## ⭐ WHAT MAKES THIS COURSE UNIQUE
2-3 sentences highlighting:
- The tutor's unique expertise/experience
- Proprietary frameworks or methods taught
- Any exclusive resources or opportunities
- Success stories or social proof elements

## 📝 COURSE STRUCTURE OVERVIEW
Brief description of how the course is organized (modules, lessons, projects, etc.)

## ✅ PREREQUISITES
Clear list of what students should know or have before starting (or state "No prior experience required" if applicable)

## 🚀 READY TO START?
A compelling call-to-action (2-3 sentences) encouraging enrollment.

Use markdown formatting. Be enthusiastic but professional. Focus on benefits, not just features. Make it feel personal and exciting.`

export const POST = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  try {
    // Fetch course data with modules and lessons
    const { db } = await import('@/lib/db')
    const course = await db.curriculum.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              select: {
                title: true,
                description: true,
                duration: true,
                difficulty: true,
                learningObjectives: true,
              }
            }
          }
        },
        creator: {
          include: {
            profile: {
              select: {
                name: true,
                bio: true,
                specialties: true,
                credentials: true,
              }
            }
          }
        }
      }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Build context for AI
    const modulesContext = course.modules.map((m: { title: string; description: string | null; lessons: { title: string; duration: number; learningObjectives: string[] }[] }) => ({
      title: m.title,
      description: m.description,
      lessons: m.lessons.map((l: { title: string; duration: number; learningObjectives: string[] }) => ({
        title: l.title,
        duration: l.duration,
        objectives: l.learningObjectives
      }))
    }))

    const tutorProfile = course.creator?.profile
    const tutorContext = tutorProfile ? {
      name: tutorProfile.name,
      bio: tutorProfile.bio,
      specialties: tutorProfile.specialties,
      credentials: tutorProfile.credentials,
    } : null

    const prompt = `${COURSE_PITCH_PROMPT}

COURSE INFORMATION:
- Name: ${course.name}
- Subject: ${course.subject}
- Grade Level: ${course.gradeLevel || 'All levels'}
- Difficulty: ${course.difficulty}
- Estimated Hours: ${course.estimatedHours || 'Flexible'}
- Description: ${course.description || 'N/A'}

TUTOR INFORMATION:
${tutorContext ? `- Name: ${tutorContext.name}
- Bio: ${tutorContext.bio || 'N/A'}
- Specialties: ${tutorContext.specialties?.join(', ') || 'N/A'}
- Credentials: ${tutorContext.credentials || 'N/A'}` : 'Information not available'}

COURSE MODULES AND LESSONS:
${JSON.stringify(modulesContext, null, 2)}

Generate a compelling, persuasive course pitch based on this information.`

    const result = await generateWithFallback(prompt, {
      temperature: 0.8,
      maxTokens: 2500,
    })

    // Save the generated pitch
    await db.curriculum.update({
      where: { id },
      data: { coursePitch: result.content }
    })

    return NextResponse.json({ 
      pitch: result.content,
      provider: result.provider 
    })

  } catch (error) {
    console.error('Failed to generate course pitch:', error)
    return NextResponse.json(
      { error: 'Failed to generate course pitch' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' }))

export const GET = withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  try {
    const { db } = await import('@/lib/db')
    const course = await db.curriculum.findUnique({
      where: { id },
      select: { coursePitch: true }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ pitch: course.coursePitch })
  } catch (error) {
    console.error('Failed to fetch course pitch:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course pitch' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' })

export const PATCH = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  try {
    const body = await req.json()
    const { pitch } = body

    if (typeof pitch !== 'string') {
      return NextResponse.json(
        { error: 'Invalid pitch format' },
        { status: 400 }
      )
    }

    const { db } = await import('@/lib/db')
    await db.curriculum.update({
      where: { id },
      data: { coursePitch: pitch }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to update course pitch:', error)
    return NextResponse.json(
      { error: 'Failed to update course pitch' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' }))

export const DELETE = withCsrf(withAuth(async (req, session, context) => {
  const { id } = await (context?.params ?? Promise.resolve({ id: '' }))

  try {
    const { db } = await import('@/lib/db')
    await db.curriculum.update({
      where: { id },
      data: { coursePitch: null }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to delete course pitch:', error)
    return NextResponse.json(
      { error: 'Failed to delete course pitch' },
      { status: 500 }
    )
  }
}, { role: 'TUTOR' }))
