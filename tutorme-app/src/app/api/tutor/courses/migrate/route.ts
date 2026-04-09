import { NextResponse } from 'next/server'
import { drizzleDb } from '@/lib/db/drizzle'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'path'

export async function GET() {
  try {
    const migrationsFolder = path.join(process.cwd(), 'drizzle')
    console.log('Running Drizzle migrations from', migrationsFolder)
    
    // Apply all pending SQL migrations to the database
    await migrate(drizzleDb as any, { migrationsFolder })
    
    return NextResponse.json({ success: true, message: "All migrations completed successfully!" })
  } catch (error) {
    console.error("Migration failed:", error)
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
