/**
 * Seed test curriculum directly via Prisma
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const IELTS_STRUCTURE = {
  code: 'ielts-academic',
  name: 'IELTS Academic',
  category: 'test_prep',
  description: 'International English Language Testing System - Academic Version',
  skills: ['listening', 'reading', 'writing', 'speaking'],
  modules: [
    {
      title: 'Listening Module',
      description: 'Master all 4 sections of the IELTS Listening test',
      estimatedHours: 8,
      skills: ['listening'],
      lessons: [
        {
          title: 'Section 1 & 2: Social Contexts',
          content: JSON.stringify({
            title: 'Section 1 & 2: Social Contexts',
            objectives: ['Understand everyday conversations', 'Follow monologues on social topics'],
            keyConcepts: ['Booking forms', 'Customer service', 'Event information'],
            exercises: [{ type: 'multiple_choice', question: 'What is the main purpose of the call?', options: ['Book a table', 'Cancel reservation', 'Change time'], correctAnswer: 'A' }]
          }),
          learningObjectives: ['Understand everyday conversations', 'Follow monologues on social topics'],
          keyConcepts: ['Booking forms', 'Customer service', 'Event information'],
          exercises: [{ type: 'multiple_choice', question: 'What is the main purpose of the call?', options: ['Book a table', 'Cancel reservation', 'Change time'], correctAnswer: 'A' }],
          duration: 30,
          difficulty: 'easy'
        },
        {
          title: 'Section 3 & 4: Academic Contexts',
          content: JSON.stringify({
            title: 'Section 3 & 4: Academic Contexts',
            objectives: ['Follow academic discussions', 'Understand lectures'],
            keyConcepts: ['Research projects', 'Academic vocabulary', 'Note-taking']
          }),
          learningObjectives: ['Follow academic discussions', 'Understand lectures'],
          keyConcepts: ['Research projects', 'Academic vocabulary', 'Note-taking'],
          duration: 35,
          difficulty: 'medium'
        }
      ]
    },
    {
      title: 'Reading Module',
      description: 'Strategies for 3 academic passages with 40 questions',
      estimatedHours: 10,
      skills: ['reading'],
      lessons: [
        {
          title: 'Skimming and Scanning',
          content: JSON.stringify({
            title: 'Skimming and Scanning',
            objectives: ['Read quickly for gist', 'Locate specific information']
          }),
          learningObjectives: ['Read quickly for gist', 'Locate specific information'],
          keyConcepts: ['Topic sentences', 'Keywords', 'Paragraph structure'],
          duration: 25,
          difficulty: 'easy'
        },
        {
          title: 'True/False/Not Given',
          content: JSON.stringify({
            title: 'True/False/Not Given',
            objectives: ['Distinguish between fact and opinion', 'Identify paraphrasing']
          }),
          learningObjectives: ['Distinguish between fact and opinion', 'Identify paraphrasing'],
          keyConcepts: ['Statement analysis', 'Paraphrasing', 'Inference'],
          duration: 30,
          difficulty: 'hard'
        }
      ]
    }
  ]
}

async function seedCurriculum() {
  console.log('Seeding IELTS Academic curriculum...')

  // Check if already exists
  const existing = await prisma.curriculum.findFirst({
    where: { name: IELTS_STRUCTURE.name }
  })

  if (existing) {
    console.log('Curriculum already exists:', existing.id)
    return
  }

  // Create curriculum
  const curriculum = await prisma.curriculum.create({
    data: {
      name: IELTS_STRUCTURE.name,
      subject: IELTS_STRUCTURE.category,
      description: IELTS_STRUCTURE.description,
      creatorId: 'system'
    }
  })

  console.log('Created curriculum:', curriculum.id)

  // Create modules and lessons
  for (let i = 0; i < IELTS_STRUCTURE.modules.length; i++) {
    const modData = IELTS_STRUCTURE.modules[i]

    const module = await prisma.curriculumModule.create({
      data: {
        curriculumId: curriculum.id,
        title: modData.title,
        description: modData.description,
        order: i,
        builderData: {
          skills: modData.skills,
          estimatedHours: modData.estimatedHours
        }
      }
    })

    console.log('Created module:', module.title)

    // Create lessons
    for (let j = 0; j < modData.lessons.length; j++) {
      const lessonData = modData.lessons[j]

      const lesson = await prisma.curriculumLesson.create({
        data: {
          moduleId: module.id,
          title: lessonData.title,
          order: j,
          learningObjectives: lessonData.learningObjectives,
          keyConcepts: lessonData.keyConcepts,
          duration: lessonData.duration,
          difficulty: lessonData.difficulty,
          teachingPoints: [],
          commonMisconceptions: [],
          prerequisiteLessonIds: [],
          builderData: {
            content: lessonData.content,
            exercises: lessonData.exercises || [],
            materials: [],
            aiConfidence: 0.95
          }
        }
      })

      console.log('  Created lesson:', lesson.title)
    }
  }

  console.log('\n✅ IELTS Academic curriculum seeded successfully!')
  console.log(`URL: /student/ai-tutor/browse`)
}

seedCurriculum()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
