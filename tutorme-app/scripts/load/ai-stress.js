/**
 * k6 load test: AI chat endpoint stress (requires auth token).
 * Run: k6 run -e AUTH_TOKEN=your_jwt scripts/load/ai-stress.js
 * Or with env: export E2E_STUDENT_EMAIL=... E2E_STUDENT_PASSWORD=...; get token then k6 run -e AUTH_TOKEN=... scripts/load/ai-stress.js
 */
import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3003'
const AUTH_TOKEN = __ENV.AUTH_TOKEN || ''

export const options = {
  vus: 5,
  duration: '20s',
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.2'],
  },
}

export default function () {
  if (!AUTH_TOKEN) {
    console.warn('AUTH_TOKEN not set; skipping AI stress or use public endpoint')
    const res = http.get(`${BASE_URL}/api/health`)
    check(res, { 'health ok': (r) => r.status === 200 })
    sleep(1)
    return
  }
  const res = http.post(
    `${BASE_URL}/api/ai-tutor/chat`,
    JSON.stringify({ message: 'What is 2+2?', chatHistory: [] }),
    {
      headers: {
        'Content-Type': 'application/json',
        Cookie: `next-auth.session-token=${AUTH_TOKEN}`,
      },
    }
  )
  check(res, { 'ai chat accepted': (r) => r.status === 200 || r.status === 401 })
  sleep(2)
}
