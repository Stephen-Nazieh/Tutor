import { NextResponse } from 'next/server'

export function legacyRemoved(feature: string, status: number = 410) {
  return NextResponse.json(
    {
      error: `${feature} has been removed from the platform`,
      legacy: true,
    },
    { status }
  )
}
