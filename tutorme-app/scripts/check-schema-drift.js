#!/usr/bin/env node
/**
 * Check for known schema drift issues without modifying the database.
 * Run with: node scripts/check-schema-drift.js
 */

const { Pool } = require('pg')

const connectionString =
  process.env.DATABASE_POOL_URL || process.env.DIRECT_URL || process.env.DATABASE_URL

if (!connectionString) {
  console.error('Missing database URL. Set DATABASE_URL, DIRECT_URL, or DATABASE_POOL_URL.')
  process.exit(1)
}

const pool = new Pool({
  connectionString,
  max: 2,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
})

const checks = [
  {
    name: 'LiveSession.category column',
    query: `SELECT column_name, data_type, is_nullable
            FROM information_schema.columns
            WHERE table_name = 'LiveSession' AND column_name = 'category'`,
    required: true,
  },
  {
    name: 'LiveSession.courseId column',
    query: `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'LiveSession' AND column_name = 'courseId'`,
    required: true,
  },
  {
    name: 'LiveSession.status enum type',
    query: `SELECT data_type, udt_name
            FROM information_schema.columns
            WHERE table_name = 'LiveSession' AND column_name = 'status'`,
    required: true,
    validate: row => {
      if (row.data_type === 'USER-DEFINED' && row.udt_name === 'LiveSessionStatus') {
        return { ok: true }
      }
      if (row.data_type === 'character varying') {
        return {
          ok: false,
          issue: `status is still text (varchar), needs conversion to LiveSessionStatus enum`,
        }
      }
      return { ok: false, issue: `status has unexpected type: ${row.data_type} / ${row.udt_name}` }
    },
  },
  {
    name: 'LiveSession.maxStudents column',
    query: `SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'LiveSession' AND column_name = 'maxStudents'`,
    required: true,
  },
  {
    name: 'LiveSessionStatus enum exists',
    query: `SELECT 1 FROM pg_type WHERE typname = 'LiveSessionStatus'`,
    required: true,
  },
  {
    name: 'PayoutStatus enum exists',
    query: `SELECT 1 FROM pg_type WHERE typname = 'PayoutStatus'`,
    required: false,
  },
  {
    name: 'BuilderTaskType enum exists',
    query: `SELECT 1 FROM pg_type WHERE typname = 'BuilderTaskType'`,
    required: false,
  },
  {
    name: 'BuilderTaskStatus enum exists',
    query: `SELECT 1 FROM pg_type WHERE typname = 'BuilderTaskStatus'`,
    required: false,
  },
  {
    name: 'TaskDeploymentStatus enum exists',
    query: `SELECT 1 FROM pg_type WHERE typname = 'TaskDeploymentStatus'`,
    required: false,
  },
]

async function run() {
  console.log('Checking database schema for drift...\n')
  const client = await pool.connect()
  let issues = 0

  try {
    for (const check of checks) {
      const result = await client.query(check.query)
      if (result.rows.length === 0) {
        if (check.required) {
          console.error(`❌ ${check.name}: MISSING (required)`)
          issues++
        } else {
          console.log(`⚠️  ${check.name}: MISSING (optional)`)
        }
        continue
      }

      if (check.validate) {
        const validation = check.validate(result.rows[0])
        if (validation.ok) {
          console.log(`✅ ${check.name}: OK`)
        } else {
          console.error(`❌ ${check.name}: ${validation.issue}`)
          issues++
        }
      } else {
        console.log(`✅ ${check.name}: OK`)
      }
    }

    // Check for old columns that should have been renamed/dropped
    const oldColumns = [
      { table: 'LiveSession', column: 'curriculumId' },
      { table: 'LiveSession', column: 'subject' },
      { table: 'LiveSession', column: 'type' },
      { table: 'LiveSession', column: 'gradeLevel' },
    ]

    for (const { table, column } of oldColumns) {
      const result = await client.query(
        `SELECT 1 FROM information_schema.columns WHERE table_name = $1 AND column_name = $2`,
        [table, column]
      )
      if (result.rows.length > 0) {
        console.warn(`⚠️  ${table}.${column}: still exists (should be renamed/dropped)`)
      }
    }
  } finally {
    client.release()
    await pool.end()
  }

  console.log()
  if (issues > 0) {
    console.error(`Found ${issues} required issue(s). Run: npm run db:apply-schema`)
    process.exit(1)
  } else {
    console.log('All required schema checks passed.')
  }
}

run().catch(err => {
  console.error('Unexpected error:', err)
  process.exit(1)
})
