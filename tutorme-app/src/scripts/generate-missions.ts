/**
 * Generate Missions from Curriculum
 * Creates Mission records for lessons (type: 'lesson') using Drizzle.
 * Run with: npx ts-node src/scripts/generate-missions.ts
 */
import crypto from 'crypto'
import { and, asc, eq, inArray } from 'drizzle-orm'
import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum, curriculumLesson, curriculumModule, mission } from '@/lib/db/schema'

// World to curriculum mapping
const WORLD_CURRICULUM_MAP: Record<string, string> = {
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

async function generateMissionsFromCurriculum() {
  console.log('🎮 Generating missions from curriculum...\n')

  const curriculums = await drizzleDb.select().from(curriculum)
  console.log(`Found ${curriculums.length} curriculums`)

  let totalMissions = 0

  for (const cur of curriculums) {
    console.log(`📚 Processing curriculum: ${cur.name}`)
    const modules = await drizzleDb
      .select()
      .from(curriculumModule)
      .where(eq(curriculumModule.curriculumId, cur.id))
      .orderBy(asc(curriculumModule.order))
    const moduleIds = modules.map((m) => m.id)
    const lessons = moduleIds.length
      ? await drizzleDb
          .select()
          .from(curriculumLesson)
          .where(inArray(curriculumLesson.moduleId, moduleIds))
          .orderBy(asc(curriculumLesson.order))
      : []

    let missionCount = 0
    for (const lesson of lessons) {
      const [existing] = await drizzleDb
        .select({ id: mission.id })
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
        id: crypto.randomUUID(),
        title: lesson.title,
        description: lesson.learningObjectives?.[0] || lesson.description || `Learn ${lesson.title}`,
        type: 'lesson',
        xpReward: 40 + (difficulty * 10),
        requirement: {
          missionType,
          grammarFocus,
          difficulty,
          curriculumId: cur.id,
          moduleId: lesson.moduleId,
          lessonId: lesson.id,
          estimatedTime: lesson.duration || 15,
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
    await generateMissionsFromCurriculum()
  } catch (error) {
    console.error('❌ Error generating missions:', error)
    process.exit(1)
  }
}

main()
