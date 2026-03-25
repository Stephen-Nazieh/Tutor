/**
 * Run migration 0017 to fix Curriculum columns
 * Usage: npx tsx scripts/run-migration-0017.ts
 */

import { drizzleDb } from '../src/lib/db/drizzle'

async function runMigration() {
  console.log('Running migration 0017: Fix Curriculum columns...\n')

  try {
    // Check current columns
    console.log('1. Checking current columns...')
    const columnsResult = await drizzleDb.execute(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'Curriculum' 
      ORDER BY ordinal_position
    `)
    console.log('Current columns:')
    console.table(columnsResult.rows)

    // Add difficulty column if missing
    console.log('\n2. Checking/adding difficulty column...')
    const difficultyExists = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = 'difficulty'
    `)
    if ((difficultyExists.rows?.length ?? 0) === 0) {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ADD COLUMN "difficulty" TEXT NOT NULL DEFAULT 'intermediate'
      `)
      console.log('✓ Added difficulty column')
    } else {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET DEFAULT 'intermediate'
      `)
      await drizzleDb.execute(`
        UPDATE "Curriculum" SET "difficulty" = 'intermediate' WHERE "difficulty" IS NULL
      `)
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "difficulty" SET NOT NULL
      `)
      console.log('✓ Updated difficulty column constraints')
    }

    // Add estimatedHours column if missing
    console.log('\n3. Checking/adding estimatedHours column...')
    const hoursExists = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = 'estimatedHours'
    `)
    if ((hoursExists.rows?.length ?? 0) === 0) {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ADD COLUMN "estimatedHours" INTEGER NOT NULL DEFAULT 0
      `)
      console.log('✓ Added estimatedHours column')
    } else {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET DEFAULT 0
      `)
      await drizzleDb.execute(`
        UPDATE "Curriculum" SET "estimatedHours" = 0 WHERE "estimatedHours" IS NULL
      `)
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "estimatedHours" SET NOT NULL
      `)
      console.log('✓ Updated estimatedHours column constraints')
    }

    // Add isLiveOnline column if missing
    console.log('\n4. Checking/adding isLiveOnline column...')
    const liveExists = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = 'isLiveOnline'
    `)
    if ((liveExists.rows?.length ?? 0) === 0) {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ADD COLUMN "isLiveOnline" BOOLEAN NOT NULL DEFAULT false
      `)
      console.log('✓ Added isLiveOnline column')
    } else {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET DEFAULT false
      `)
      await drizzleDb.execute(`
        UPDATE "Curriculum" SET "isLiveOnline" = false WHERE "isLiveOnline" IS NULL
      `)
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isLiveOnline" SET NOT NULL
      `)
      console.log('✓ Updated isLiveOnline column constraints')
    }

    // Add isFree column if missing
    console.log('\n5. Checking/adding isFree column...')
    const freeExists = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = 'isFree'
    `)
    if ((freeExists.rows?.length ?? 0) === 0) {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ADD COLUMN "isFree" BOOLEAN NOT NULL DEFAULT false
      `)
      console.log('✓ Added isFree column')
    } else {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET DEFAULT false
      `)
      await drizzleDb.execute(`
        UPDATE "Curriculum" SET "isFree" = false WHERE "isFree" IS NULL
      `)
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isFree" SET NOT NULL
      `)
      console.log('✓ Updated isFree column constraints')
    }

    // Add isPublished column if missing
    console.log('\n6. Checking/adding isPublished column...')
    const publishedExists = await drizzleDb.execute(`
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'Curriculum' AND column_name = 'isPublished'
    `)
    if ((publishedExists.rows?.length ?? 0) === 0) {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false
      `)
      console.log('✓ Added isPublished column')
    } else {
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isPublished" SET DEFAULT false
      `)
      await drizzleDb.execute(`
        UPDATE "Curriculum" SET "isPublished" = false WHERE "isPublished" IS NULL
      `)
      await drizzleDb.execute(`
        ALTER TABLE "Curriculum" ALTER COLUMN "isPublished" SET NOT NULL
      `)
      console.log('✓ Updated isPublished column constraints')
    }

    // Add optional columns
    const optionalColumns = [
      { name: 'categories', type: 'TEXT[]' },
      { name: 'currency', type: 'TEXT' },
      { name: 'schedule', type: 'JSONB' },
      { name: 'languageOfInstruction', type: 'TEXT' },
      { name: 'price', type: 'DOUBLE PRECISION' },
      { name: 'curriculumSource', type: 'TEXT' },
      { name: 'outlineSource', type: 'TEXT' },
      { name: 'courseMaterials', type: 'JSONB' },
      { name: 'coursePitch', type: 'TEXT' },
    ]

    console.log('\n7. Checking/adding optional columns...')
    for (const col of optionalColumns) {
      const exists = await drizzleDb.execute(`
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'Curriculum' AND column_name = '${col.name}'
      `)
      if ((exists.rows?.length ?? 0) === 0) {
        await drizzleDb.execute(`
          ALTER TABLE "Curriculum" ADD COLUMN "${col.name}" ${col.type}
        `)
        console.log(`✓ Added ${col.name} column`)
      }
    }

    // Verify final structure
    console.log('\n8. Verifying final table structure...')
    const finalResult = await drizzleDb.execute(`
      SELECT column_name, data_type, is_nullable, column_default 
      FROM information_schema.columns 
      WHERE table_name = 'Curriculum' 
      ORDER BY ordinal_position
    `)
    console.log('Final columns:')
    console.table(finalResult.rows)

    console.log('\n✅ Migration 0017 completed successfully!')
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }

  process.exit(0)
}

runMigration()
