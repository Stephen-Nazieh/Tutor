/**
 * Generate Missions from Curriculum
 * Creates Mission records for lessons (type: 'lesson') using Drizzle.
 * Run with: npx ts-node src/scripts/generate-missions.ts
 */
import crypto from 'crypto'
import { and, asc, eq, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { course, courseLesson, curriculumModule, mission } from '@/lib/db/schema'

// World to course mapping
const WORLD_COURSE_MAP: Record<string, string> = {
  survival: 'ielts', // Default for now
  workplace: 'ielts',
  daily_life: 'ielts',
  academic: 'ielts',
  social: 'ielts',
  public_speaking: 'toefl',
  debate: 'toefl',
}

// Mission types by difficulty
const MISSION_TYPES = ['lesson', 'roleplay', 'simulation', 'challenge']

// Vocabulary sets by world
const WORLD_VOCABULARY: Record<string, string[]> = {
  survival: ['greetings', 'directions', 'food', 'shopping', 'emergency'],
  workplace: ['meetings', 'emails', 'presentations', 'negotiations', 'interviews'],
  daily_life: ['hobbies', 'weather', 'family', 'friends', 'weekend'],
  academic: ['research', 'essay', 'citation', 'thesis', 'analysis'],
  social: ['compliments', 'invitations', 'small-talk', 'dating', 'conflict'],
  public_speaking: ['opening', 'closing', 'transitions', 'rhetoric', 'body-language'],
  debate: ['argument', 'rebuttal', 'evidence', 'fallacies', 'persuasion'],
}

// Grammar focus by difficulty
const GRAMMAR_FOCUS: Record<number, string[]> = {
  1: ['present simple', 'past simple', 'basic questions'],
  2: ['present perfect', 'conditionals', 'modal verbs'],
  3: ['passive voice', 'reported speech', 'relative clauses'],
  4: ['advanced tenses', 'subjunctive', 'complex structures'],
}

async function generateMissionsFromCourses() {
  console.log('🎮 Generating missions from courses...\n')

  const courses = await drizzleDb.select().from(course)
  console.log(`Found ${courses.length} courses`)

  let totalMissions = 0

  for (const cur of courses) {
    console.log(`📚 Processing course: ${cur.name}`)
    const modules = await drizzleDb
      .select()
      .from(curriculumModule)
      .where(eq(curriculumModule.courseId, cur.courseId))
      .orderBy(asc(curriculumModule.order))
    const lessons = await drizzleDb
      .select()
      .from(courseLesson)
      .where(eq(courseLesson.courseId, cur.courseId))
      .orderBy(asc(courseLesson.order))

    let missionCount = 0
    for (const lesson of lessons) {
      const [existing] = await drizzleDb
        .select({ missionId: mission.missionId })
        .from(mission)
        .where(and(eq(mission.type, 'lesson'), eq(mission.title, lesson.title)))
        .limit(1)

      if (existing) {
        console.log(`  ⚡ Mission exists for: ${lesson.title}`)
        continue
      }

      const difficulty = Math.min(4, Math.max(1, Math.ceil(lesson.order / 3)))
      const missionType = MISSION_TYPES[missionCount % MISSION_TYPES.length]
      const grammarOptions = GRAMMAR_FOCUS[difficulty] || GRAMMAR_FOCUS[1]
      const grammarFocus = grammarOptions[missionCount % grammarOptions.length]

      await drizzleDb.insert(mission).values({
        missionId: crypto.randomUUID(),
        title: lesson.title,
        description: lesson.description || `Learn ${lesson.title}`,
        type: 'lesson',
        xpReward: 40 + difficulty * 10,
        requirement: {
          missionType,
          grammarFocus,
          difficulty,
          courseId: cur.courseId,
          lessonId: lesson.lessonId,
          estimatedTime: 15,
        },
        isActive: true,
      })

      console.log(`  ✅ Created mission: ${lesson.title} (Level ${difficulty})`)
      missionCount++
      totalMissions++
    }
    console.log(`  📊 Created ${missionCount} missions for ${cur.name}\n`)
  }

  console.log(`🎉 Total missions created: ${totalMissions}`)
}

async function main() {
  try {
    await generateMissionsFromCourses()
  } catch (error) {
    console.error('❌ Error generating missions:', error)
    process.exit(1)
  }
}

main()
