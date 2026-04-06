import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ classes: [] })
}

export async function POST() {
  return NextResponse.json(
    {
      error: 'Clinics and bookings have been removed from the platform.',
      legacy: true,
    },
    { status: 410 }
  )
}
