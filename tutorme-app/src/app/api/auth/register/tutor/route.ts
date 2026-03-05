import { NextRequest, NextResponse } from 'next/server'
import { performRegistration } from '@/lib/registration/register-user'
import type { RegisterUserInput } from '@/lib/validation/schemas'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const payloadRaw = formData.get('payload')

    if (typeof payloadRaw !== 'string') {
      return NextResponse.json({ error: 'Invalid registration payload' }, { status: 400 })
    }

    let payload: RegisterUserInput
    try {
      payload = JSON.parse(payloadRaw) as RegisterUserInput
    } catch {
      return NextResponse.json({ error: 'Invalid JSON in payload' }, { status: 400 })
    }

    if (payload?.role !== 'TUTOR') {
      return NextResponse.json({ error: 'Tutor role required' }, { status: 400 })
    }

    const avatar = formData.get('avatar')
    const avatarFile = avatar instanceof File ? avatar : null

    const result = await performRegistration(request, payload, { avatarFile })
    return NextResponse.json(result.body, { status: result.status, headers: result.headers })
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error))
    console.error('Tutor registration error:', err.message, err.stack)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
