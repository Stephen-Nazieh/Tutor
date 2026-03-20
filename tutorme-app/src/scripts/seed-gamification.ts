/**
 * Seed Gamification Data
 *
 * Run with: npx ts-node src/scripts/seed-gamification.ts
 */
import { initializeDailyQuests } from '@/lib/gamification/daily-quests'

const DEFAULT_WORLDS = [
  {
    id: 'survival',
    name: 'Survival World',
    emoji: '🌍',
    description: 'Master everyday English for real-life situations',
    storyArc:
      'You have arrived in an English-speaking country. Learn to navigate daily life, from ordering food to asking for directions.',
    unlockLevel: 1,
    difficultyLevel: 1,
    isActive: true,
  },
  {
    id: 'workplace',
    name: 'Workplace World',
    emoji: '💼',
    description: 'Professional English for career advancement',
    storyArc:
      'You have started a new job. Navigate meetings, emails, and professional conversations with confidence.',
    unlockLevel: 3,
    difficultyLevel: 2,
    isActive: true,
  },
  {
    id: 'daily_life',
    name: 'Daily Life World',
    emoji: '🏠',
    description: 'Conversations with friends, family, and neighbors',
    storyArc:
      'Build relationships and connect with people around you through natural everyday conversations.',
    unlockLevel: 2,
    difficultyLevel: 1,
    isActive: true,
  },
  {
    id: 'academic',
    name: 'Academic World',
    emoji: '🧠',
    description: 'Study skills and academic English',
    storyArc:
      'Prepare for academic success with essay writing, presentations, and research skills.',
    unlockLevel: 4,
    difficultyLevel: 3,
    isActive: true,
  },
  {
    id: 'social',
    name: 'Social & Relationships',
    emoji: '❤️',
    description: 'Make friends and build connections',
    storyArc:
      'Navigate social situations, from casual hangouts to meaningful conversations and dating.',
    unlockLevel: 3,
    difficultyLevel: 2,
    isActive: true,
  },
  {
    id: 'public_speaking',
    name: 'Public Speaking Arena',
    emoji: '🎤',
    description: 'Speak confidently in front of others',
    storyArc: 'Face your fears and master the art of presenting to groups, large and small.',
    unlockLevel: 5,
    difficultyLevel: 3,
    isActive: true,
  },
  {
    id: 'debate',
    name: 'Debate Arena',
    emoji: '🏆',
    description: 'Advanced argumentation and persuasion',
    storyArc: 'Enter the arena of ideas. Defend your positions and respectfully challenge others.',
    unlockLevel: 8,
    difficultyLevel: 4,
    isActive: true,
  },
]

const DEFAULT_DAILY_QUESTS = [
  {
    title: 'Word Master',
    description: 'Learn 5 new vocabulary words',
    type: 'vocabulary',
    xpReward: 20,
    requirement: 5,
    isActive: true,
  },
  {
    title: 'Speaking Practice',
    description: 'Complete a 3-minute speaking exercise',
    type: 'speaking',
    xpReward: 30,
    requirement: 1,
    isActive: true,
  },
  {
    title: 'Grammar Check',
    description: 'Complete a grammar exercise',
    type: 'grammar',
    xpReward: 25,
    requirement: 1,
    isActive: true,
  },
  {
    title: 'Confidence Boost',
    description: 'Speak without hesitation for 2 minutes',
    type: 'confidence',
    xpReward: 35,
    requirement: 1,
    isActive: true,
  },
  {
    title: 'Mission Complete',
    description: 'Complete any mission',
    type: 'mission',
    xpReward: 40,
    requirement: 1,
    isActive: true,
  },
  {
    title: 'Listening Ear',
    description: 'Listen to a lesson for 10 minutes',
    type: 'listening',
    xpReward: 20,
    requirement: 1,
    isActive: true,
  },
  {
    title: 'Daily Streak',
    description: 'Log in and practice today',
    type: 'daily',
    xpReward: 10,
    requirement: 1,
    isActive: true,
  },
]

async function seedWorlds() {
  console.log('🌍 Worlds are in-memory (DEFAULT_WORLDS); no DB seeding required.')
  console.log(`✅ Worlds available: ${DEFAULT_WORLDS.length}\n`)
}

async function seedDailyQuests() {
  console.log('📋 Seeding daily quests (Mission type "daily")...')
  await initializeDailyQuests()
  console.log(`✅ Daily quests seeded: ${DEFAULT_DAILY_QUESTS.length}\n`)
}

async function main() {
  console.log('🎮 Starting gamification seed...\n')

  try {
    await seedWorlds()
    await seedDailyQuests()

    console.log('🎉 Gamification seed complete!')
  } catch (error) {
    console.error('❌ Seed failed:', error)
    process.exit(1)
  }
}

main()
