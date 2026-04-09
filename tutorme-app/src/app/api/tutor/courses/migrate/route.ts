import { NextResponse } from 'next/server'
import { getDrizzleDb } from '@/lib/db/drizzle'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'
import fs from 'fs'

export async function GET() {
  try {
    const migrationsFolder = path.join(process.cwd(), 'drizzle')
    
    if (!fs.existsSync(migrationsFolder)) {
      return NextResponse.json({ success: false, error: 'Migrations folder not found at ' + migrationsFolder }, { status: 500 })
    }
    
    console.log('Running Drizzle migrations from', migrationsFolder)
    
    // Run all pending migrations
    await migrate(getDrizzleDb(), { migrationsFolder })
    
    return NextResponse.json({ success: true, message: "All migrations applied successfully!" })
  } catch (error) {
    console.error("Migration failed:", error)
    return NextResponse.json({ success: false, error: String(error), stack: error instanceof Error ? error.stack : undefined }, { status: 500 })
  }
}
