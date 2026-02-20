/**
 * Seed CurriculumCatalog with Math and English curricula
 * Run: npx tsx prisma/seed-curriculum-catalog.ts (or npm run db:seed after adding to package.json)
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ENGLISH_CURRICULUMS = [
  { subject: 'english', name: 'English', code: 'english' },
  { subject: 'english', name: 'IELTS', code: 'ielts' },
  { subject: 'english', name: 'TOEFL', code: 'toefl' },
  { subject: 'english', name: 'SAT English', code: 'sat-english' },
  { subject: 'english', name: 'ACT English', code: 'act-english' },
  { subject: 'english', name: 'AP English Language', code: 'ap-english-language' },
  { subject: 'english', name: 'AP English Literature', code: 'ap-english-literature' },
  { subject: 'english', name: 'Grammar & Writing', code: 'grammar-writing' },
  { subject: 'english', name: 'Literature Analysis', code: 'literature-analysis' },
]

const MATH_CURRICULUMS = [
  { subject: 'math', name: 'Mathematics', code: 'math' },
  { subject: 'math', name: 'Pre-calculus', code: 'precalculus' },
  { subject: 'math', name: 'AP Calculus AB', code: 'ap-calculus-ab' },
  { subject: 'math', name: 'AP Calculus BC', code: 'ap-calculus-bc' },
  { subject: 'math', name: 'AP Statistics', code: 'ap-statistics' },
  { subject: 'math', name: 'SAT Math', code: 'sat-math' },
  { subject: 'math', name: 'ACT Math', code: 'act-math' },
  { subject: 'math', name: 'Algebra I', code: 'algebra-1' },
  { subject: 'math', name: 'Algebra II', code: 'algebra-2' },
  { subject: 'math', name: 'Geometry', code: 'geometry' },
]

async function main() {
  console.log('Seeding CurriculumCatalog (Math & English)...')
  for (const item of [...ENGLISH_CURRICULUMS, ...MATH_CURRICULUMS]) {
    await prisma.curriculumCatalog.upsert({
      where: {
        subject_name: { subject: item.subject, name: item.name },
      },
      create: item,
      update: { code: item.code },
    })
  }
  console.log(`Seeded ${ENGLISH_CURRICULUMS.length + MATH_CURRICULUMS.length} curriculum catalog entries.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
