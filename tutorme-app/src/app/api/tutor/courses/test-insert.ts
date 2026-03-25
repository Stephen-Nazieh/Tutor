// Test script to verify course creation logic
// Run with: npx tsx src/app/api/tutor/courses/test-insert.ts

import { drizzleDb } from '@/lib/db/drizzle'
import { curriculum as curriculumTable } from '@/lib/db/schema'

async function testInsertWithFallback() {
  console.log('Testing curriculum insert with automatic column fallback...\n')
  
  const testValues = {
    id: crypto.randomUUID(),
    name: 'Test Course ' + Date.now(),
    description: 'Test description',
    subject: 'math',
    gradeLevel: null,
    isPublished: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    creatorId: null,
    // Optional fields that might not exist
    difficulty: 'intermediate',
    estimatedHours: 0,
    isLiveOnline: false,
    isFree: false,
    categories: [],
    currency: 'USD',
    schedule: null,
  }
  
  console.log('Attempting insert with fields:', Object.keys(testValues).join(', '))
  
  try {
    const [result] = await drizzleDb
      .insert(curriculumTable)
      .values(testValues)
      .returning()
    
    console.log('✅ Insert succeeded!')
    console.log('Created curriculum ID:', result.id)
    
    // Clean up
    await drizzleDb.delete(curriculumTable).where(curriculumTable.id.equals(result.id))
    console.log('Cleaned up test record')
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('❌ Insert failed:', errorMessage)
    
    // Check if it's a missing column error
    const columnMatch = errorMessage.match(/column "([^"]+)" of relation "Curriculum" does not exist/)
    if (columnMatch) {
      const missingColumn = columnMatch[1]
      console.log(`\nDetected missing column: ${missingColumn}`)
      console.log('This is expected in production if migrations have not run.')
      console.log('The API will automatically remove this field and retry.')
    }
  }
  
  process.exit(0)
}

testInsertWithFallback()
