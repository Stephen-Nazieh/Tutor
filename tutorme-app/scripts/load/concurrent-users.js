// k6 load test: concurrent users hitting health API.
// Run: k6 run scripts/load/concurrent-users.js
// Or: k6 run --vus 10 --duration 30s -e BASE_URL=http://localhost:3003 scripts/load/concurrent-users.js
import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3003'

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.1'],
  },
}

export default function () {
  const res = http.get(BASE_URL + '/api/health')
  check(res, { 'health status 200': (r) => r.status === 200 })
  sleep(0.5)
}
