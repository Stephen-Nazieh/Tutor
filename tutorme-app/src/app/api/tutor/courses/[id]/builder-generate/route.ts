import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withRateLimitPreset, ValidationError, NotFoundError } from '@/lib/api/middleware'
import { db } from '@/lib/db'
import { generateWithFallback } from '@/lib/ai/orchestrator'

function getCourseId(req: NextRequest): string {
  const parts = req.nextUrl.pathname.split('/')
  const idx = parts.indexOf('courses')
  return parts[idx + 1]
}

async function fetchWebReference(query: string): Promise<string> {
  if (!query.trim()) return ''

  try {
    const summaryRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`)
    if (summaryRes.ok) {
      const payload = await summaryRes.json().catch(() => ({}))
      if (typeof payload.extract === 'string' && payload.extract.trim()) {
        return payload.extract.slice(0, 3000)
      }
    }
  } catch {
    // Non-fatal fallback.
  }

  return ''
}

function buildPrompt(input: { tutorInstruction: string; references: string; subject: string; gradeLevel: string | null }) {
  const referenceBlock = input.references.trim()
    ? `Reference material:\n${input.references.slice(0, 18000)}`
    : 'No uploaded references were provided.'

  return `
You are generating a complete course blueprint for tutors.

Tutor instruction:
${input.tutorInstruction}

Subject: ${input.subject || 'general'}
Grade level: ${input.gradeLevel || 'mixed'}

${referenceBlock}

Return ONLY valid JSON with this exact shape:
{
  "modules": [
    {
      "title": "string",
      "description": "string",
      "lessons": [
        {
          "title": "string",
          "description": "string",
          "duration": 45,
          "tasks": [
            {
              "title": "string",
              "instructions": "string",
              "estimatedMinutes": 15,
              "points": 10,
              "questions": [
                {
                  "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
                  "question": "string",
                  "options": ["string"],
                  "correctAnswer": "string or array",
                  "points": 1
                }
              ]
            }
          ],
          "assessments": [
            {
              "title": "string",
              "instructions": "string",
              "estimatedMinutes": 30,
              "points": 20,
              "questions": [
                {
                  "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
                  "question": "string",
                  "options": ["string"],
                  "correctAnswer": "string or array",
                  "points": 1
                }
              ]
            }
          ],
          "worksheets": []
        }
      ],
      "exam": {
        "title": "string",
        "description": "string",
        "questions": [
          {
            "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
            "question": "string",
            "options": ["string"],
            "correctAnswer": "string or array",
            "points": 1
          }
        ]
      }
    }
  ]
}

Rules:
- Generate a complete course with modules, lessons, tasks, assessments, and a module-level exam.
- Use the reference material where available.
- If reference material is absent, rely on reputable general curriculum patterns.
- Keep output concise and practical for real tutoring delivery.
`.trim()
}

export const POST = withAuth(async (req: NextRequest, session) => {
  const { response: rateLimitResponse } = await withRateLimitPreset(req, 'aiGenerate')
  if (rateLimitResponse) return rateLimitResponse

  const courseId = getCourseId(req)
  const body = await req.json().catch(() => ({}))
  const tutorInstruction = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  const uploadedReferences = Array.isArray(body?.references) ? body.references.filter((x: unknown) => typeof x === 'string') : []

  if (!tutorInstruction && uploadedReferences.length === 0) {
    throw new ValidationError('Prompt or references are required')
  }

  const curriculum = await db.curriculum.findFirst({
    where: { id: courseId, creatorId: session.user.id },
    select: { id: true, subject: true, gradeLevel: true },
  })
  if (!curriculum) {
    throw new NotFoundError('Course not found')
  }

  let references = uploadedReferences.join('\n\n').slice(0, 18000)
  if (!references.trim()) {
    const webContext = await fetchWebReference(curriculum.subject || tutorInstruction.split(/\s+/).slice(0, 4).join(' '))
    references = webContext
  }

  const prompt = buildPrompt({
    tutorInstruction,
    references,
    subject: curriculum.subject,
    gradeLevel: curriculum.gradeLevel,
  })

  const ai = await generateWithFallback(prompt, {
    temperature: 0.35,
    maxTokens: 7000,
    skipCache: true,
  })

  const jsonMatch = ai.content.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    return NextResponse.json({ error: 'Failed to parse generated course structure' }, { status: 502 })
  }

  try {
    const parsed = JSON.parse(jsonMatch[0])
    const modules = Array.isArray(parsed?.modules) ? parsed.modules : []
    return NextResponse.json({
      success: true,
      provider: ai.provider,
      modules,
    })
  } catch {
    return NextResponse.json({ error: 'Generated output was not valid JSON' }, { status: 502 })
  }
}, { role: 'TUTOR' })
