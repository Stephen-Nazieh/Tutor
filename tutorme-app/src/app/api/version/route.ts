'use server'

import { NextResponse } from 'next/server'

export const GET = async () => {
  return NextResponse.json({
    version: process.env.APP_VERSION ?? null,
  })
}
