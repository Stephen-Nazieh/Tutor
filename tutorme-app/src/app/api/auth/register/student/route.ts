/**
 * POST /api/auth/register/student
 * Student registration endpoint - delegates to main register with role=STUDENT.
 * Returns studentUniqueId for parent linking verification.
 */

import { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { POST as mainRegister } from '../route'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 })
  }

  const studentPayload = {
    ...(typeof body === 'object' && body !== null ? body : {}),
    role: 'STUDENT',
  }
  const modifiedRequest = new Request(request.url, {
    method: 'POST',
    body: JSON.stringify(studentPayload),
    headers: request.headers,
  })
  return mainRegister(modifiedRequest as unknown as NextRequest)
}
