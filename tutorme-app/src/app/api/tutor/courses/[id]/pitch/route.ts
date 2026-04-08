/**
 * POST /api/tutor/courses/[id]/pitch
 * Generate AI-powered course pitch/description
 */

import { NextResponse } from 'next/server'
import { withAuth, withCsrf, handleApiError } from '@/lib/api/middleware'
import { getParamAsync } from '@/lib/api/params'
import { generateWithFallback } from '@/lib/agents'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumLesson, curriculumModule, profile } from '@/lib/db/schema'
import { asc, eq, inArray } from 'drizzle-orm'

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

export const POST = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')

      try {
        if (!id) {
          return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
        }
        const [course] = await drizzleDb
          .select()
          .from(curriculum)
          .where(eq(curriculum.courseId, id))
          .limit(1)

        if (!course) {
          return NextResponse.json({ error: 'Course not found' }, { status: 404 })
        }

        const modules = await drizzleDb
          .select()
          .from(curriculumModule)
          .where(eq(curriculumModule.curriculumId, id))
          .orderBy(asc(curriculumModule.order))

        // Lessons are now directly under courses, not modules
        const lessons = await drizzleDb
          .select({
            title: curriculumLesson.title,
            description: curriculumLesson.description,
            order: curriculumLesson.order,
          })
          .from(curriculumLesson)
          .where(eq(curriculumLesson.courseId, id))
          .orderBy(asc(curriculumLesson.order))

        // Lessons are now directly under courses - associate all with first module for context
        const lessonsByModuleId = new Map<string, typeof lessons>()
        lessonsByModuleId.set('default', lessons)

        const tutorProfile = course.creatorId
          ? (
              await drizzleDb
                .select({
                  name: profile.name,
                  bio: profile.bio,
                  specialties: profile.specialties,
                  credentials: profile.credentials,
                })
                .from(profile)
                .where(eq(profile.userId, course.creatorId))
                .limit(1)
            )[0]
          : null

        // Build context for AI
        const modulesContext = modules.map(m => ({
          title: m.title,
          description: m.description,
          lessons: (
            lessonsByModuleId.get(m.moduleId) ??
            lessonsByModuleId.get('default') ??
            []
          ).map(l => ({
            title: l.title,
            duration: 30, // Default duration - not in schema
            objectives: [], // Not in schema
          })),
        }))
        const tutorContext = tutorProfile
          ? {
              name: tutorProfile.name,
              bio: tutorProfile.bio,
              specialties: tutorProfile.specialties,
              credentials: tutorProfile.credentials,
            }
          : null

        const prompt = `${COURSE_PITCH_PROMPT}

COURSE INFORMATION:
- Name: ${course.name}
- Subject: ${course.categories?.[0] || 'N/A'}
- Description: ${course.description || 'N/A'}

TUTOR INFORMATION:
${
  tutorContext
    ? `- Name: ${tutorContext.name}
- Bio: ${tutorContext.bio || 'N/A'}
- Specialties: ${tutorContext.specialties?.join(', ') || 'N/A'}
- Credentials: ${tutorContext.credentials || 'N/A'}`
    : 'Information not available'
}

COURSE MODULES AND LESSONS:
${JSON.stringify(modulesContext, null, 2)}

Generate a compelling, persuasive course pitch based on this information.`

        const result = await generateWithFallback(prompt, {
          temperature: 0.8,
          maxTokens: 2500,
        })

        // Note: coursePitch column doesn't exist in schema
        // Pitch is generated on-demand and not cached
        // await drizzleDb
        //   .update(curriculum)
        //   .set({ coursePitch: result.content })
        //   .where(eq(curriculum.courseId, id))

        return NextResponse.json({
          pitch: result.content,
          provider: result.provider,
        })
      } catch (error) {
        console.error('Failed to generate course pitch:', error)
        return handleApiError(
          error,
          'Failed to generate course pitch',
          'api/tutor/courses/[id]/pitch/route.ts'
        )
      }
    },
    { role: 'TUTOR' }
  )
)

export const GET = withAuth(
  async (req, session, context) => {
    const id = await getParamAsync(context?.params, 'id')

    try {
      if (!id) {
        return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
      }
      // Note: coursePitch column doesn't exist in schema - pitch is generated on-demand
      // const [course] = await drizzleDb
      //   .select({ coursePitch: curriculum.coursePitch })
      //   .from(curriculum)
      //   .where(eq(curriculum.courseId, id))
      //   .limit(1)

      // if (!course) {
      //   return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      // }

      // return NextResponse.json({ pitch: course.coursePitch })
      return NextResponse.json({ pitch: null })
    } catch (error) {
      console.error('Failed to fetch course pitch:', error)
      return handleApiError(
        error,
        'Failed to fetch course pitch',
        'api/tutor/courses/[id]/pitch/route.ts'
      )
    }
  },
  { role: 'TUTOR' }
)

export const PATCH = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')

      try {
        if (!id) {
          return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
        }
        const body = await req.json()
        const { pitch } = body

        if (typeof pitch !== 'string') {
          return NextResponse.json({ error: 'Invalid pitch format' }, { status: 400 })
        }

        // Note: coursePitch column doesn't exist in schema - pitch is generated on-demand
        // await drizzleDb.update(curriculum).set({ coursePitch: pitch }).where(eq(curriculum.courseId, id))

        return NextResponse.json({
          success: true,
          note: 'Pitch is generated on-demand and not stored',
        })
      } catch (error) {
        console.error('Failed to update course pitch:', error)
        return handleApiError(
          error,
          'Failed to update course pitch',
          'api/tutor/courses/[id]/pitch/route.ts'
        )
      }
    },
    { role: 'TUTOR' }
  )
)

export const DELETE = withCsrf(
  withAuth(
    async (req, session, context) => {
      const id = await getParamAsync(context?.params, 'id')

      try {
        if (!id) {
          return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
        }
        // Note: coursePitch column doesn't exist in schema
        // await drizzleDb.update(curriculum).set({ coursePitch: null }).where(eq(curriculum.courseId, id))

        return NextResponse.json({
          success: true,
          note: 'Pitch is generated on-demand and not stored',
        })
      } catch (error) {
        console.error('Failed to delete course pitch:', error)
        return handleApiError(
          error,
          'Failed to delete course pitch',
          'api/tutor/courses/[id]/pitch/route.ts'
        )
      }
    },
    { role: 'TUTOR' }
  )
)
