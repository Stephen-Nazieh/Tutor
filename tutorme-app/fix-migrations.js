const { Pool } = require('pg');
const pool = new Pool({ connectionString: process.env.DATABASE_URL || process.env.DIRECT_URL });

async function fix() {
  const file = "drizzle/0018_lush_carmella_unuscione.sql";
  const fs = require('fs');
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
  
  try {
    const res = await pool.query('SELECT * FROM "__drizzle_migrations"');
    console.log("Migrations table exists, current:", res.rows.map(r => r.m_name));
    
    // Insert if not exists
    await pool.query('INSERT INTO "__drizzle_migrations" (id, hash, created_at) VALUES ($1, $2, $3)', [
      18, hash, Date.now()
    ]);
    console.log("Inserted 0018 migration");
  } catch (e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
fix();
