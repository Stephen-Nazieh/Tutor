import { drizzleDb } from './src/lib/db/drizzle'
import { Pool } from 'pg'

import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })

const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL })

async function fix() {
  const fs = require('fs')
  const crypto = require('crypto')
  const content = fs.readFileSync('drizzle/0018_lush_carmella_unuscione.sql', 'utf8')
  // Drizzle hashes just the content
  const hash = crypto.createHash('sha256').update(content).digest('hex')
  
  try {
    const res = await pool.query('SELECT * FROM "drizzle"."__drizzle_migrations" ORDER BY id DESC LIMIT 5')
    console.log(res.rows)
  } catch (e) {
    console.error(e)
  } finally {
    pool.end()
  }
}

fix()
