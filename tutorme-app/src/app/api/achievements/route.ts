import { legacyRemoved } from '@/lib/api/legacy'

export async function GET() {
  return legacyRemoved('Achievements')
}

export async function POST() {
  return legacyRemoved('Achievements')
}
