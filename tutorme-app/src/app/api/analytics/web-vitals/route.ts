import { NextRequest, NextResponse } from 'next/server';

export async function POST(_request: NextRequest) {
  // Fix: Return 200 immediately without parsing body to save resources
  return new NextResponse(null, { status: 200 });
}
