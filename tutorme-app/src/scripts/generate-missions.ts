/**
 * Generate Missions from Curriculum
 * Requires Prisma schema with World model and Mission model (worldId, lessonId, etc.).
 * Run with: npx ts-node src/scripts/generate-missions.ts
 */

import { prismaLegacyClient as db } from '@/lib/db/prisma-legacy'

const dbAny = db as unknown as Record<string, unknown>

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
  if (!dbAny.world || !dbAny.mission) {
    console.log('⏭️ World or Mission model not in schema; skipping mission generation.')
    return
  }
  const worldModel = dbAny.world as { findMany: () => Promise<{ id: string; name: string; curriculumId?: string }[]>; update: (a: { where: { id: string }; data: { curriculumId: string } }) => Promise<unknown> }
  const missionModel = dbAny.mission as { findFirst: (a: { where: { worldId: string; lessonId: string } }) => Promise<unknown>; create: (a: { data: Record<string, unknown> }) => Promise<unknown> }

  console.log('🎮 Generating missions from curriculum...\n')

  const curriculums = await db.curriculum.findMany({
    include: {
      modules: {
        include: {
          lessons: true,
        },
      },
    },
  })

  console.log(`Found ${curriculums.length} curriculums`)

  const worlds = await worldModel.findMany()
  console.log(`Found ${worlds.length} worlds\n`)

  let totalMissions = 0

  for (const world of worlds) {
    console.log(`🌍 Processing world: ${world.name}`)

    // Find matching curriculum or use first one
    const curriculum = curriculums.find(
      (c: any) => c.id === world.curriculumId || 
           c.code === WORLD_CURRICULUM_MAP[world.id]
    ) || curriculums[0]

    if (!curriculum) {
      console.log(`  ⚠️ No curriculum found for ${world.name}`)
      continue
    }

    if (!world.curriculumId) {
      await worldModel.update({
        where: { id: world.id },
        data: { curriculumId: curriculum.id },
      })
      console.log(`  ✅ Linked to curriculum: ${curriculum.name}`)
    }

    // Generate missions from lessons
    let missionCount = 0
    const vocabularySet = WORLD_VOCABULARY[world.id] || []

    for (const module of curriculum.modules) {
      for (const lesson of module.lessons) {
        const existing = await missionModel.findFirst({
          where: {
            worldId: world.id,
            lessonId: lesson.id,
          },
        })

        if (existing) {
          console.log(`  ⚡ Mission exists for: ${lesson.title}`)
          continue
        }

        // Determine difficulty based on lesson order and module
        const difficulty = Math.min(4, Math.max(1, 
          module.order + Math.floor(lesson.order / 3)
        ))

        // Select mission type
        const missionType = MISSION_TYPES[missionCount % MISSION_TYPES.length]

        // Select vocabulary subset
        const vocab = vocabularySet.slice(
          (missionCount * 2) % vocabularySet.length,
          ((missionCount * 2) % vocabularySet.length) + 3
        )

        // Select grammar focus
        const grammarOptions = GRAMMAR_FOCUS[difficulty] || GRAMMAR_FOCUS[1]
        const grammarFocus = grammarOptions[missionCount % grammarOptions.length]

        await missionModel.create({
          data: {
            worldId: world.id,
            lessonId: lesson.id,
            title: lesson.title,
            objective: lesson.learningObjectives?.[0] || `Learn ${lesson.title}`,
            vocabulary: vocab.length > 0 ? vocab : undefined,
            grammarFocus,
            difficulty,
            xpReward: 40 + (difficulty * 10),
            missionType,
            estimatedTime: lesson.duration || 15,
          },
        })

        console.log(`  ✅ Created mission: ${lesson.title} (Level ${difficulty})`)
        missionCount++
        totalMissions++
      }
    }

    console.log(`  📊 Created ${missionCount} missions for ${world.name}\n`)
  }

  console.log(`🎉 Total missions created: ${totalMissions}`)
}

async function main() {
  try {
    await generateMissionsFromCurriculum()
  } catch (error) {
    console.error('❌ Error generating missions:', error)
    process.exit(1)
  } finally {
    if (db?.$disconnect) await db.$disconnect()
  }
}

main()
