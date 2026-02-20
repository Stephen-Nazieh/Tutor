// k6 WebSocket load test: open N connections to Socket.io (class room).
// Run: k6 run scripts/load/websocket.js
// Requires: k6, app running with Socket.io on BASE_URL (e.g. http://localhost:3003).
import ws from 'k6/ws'
import { check } from 'k6'

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3003'
const WS_URL = BASE_URL.replace(/^http/, 'ws') + '/socket.io/?EIO=4&transport=websocket'

export const options = {
  vus: 5,
  duration: '15s',
}

export default function () {
  const res = ws.connect(WS_URL, {}, function (socket) {
    socket.on('open', () => {
      check(true, { 'ws connected': (v) => v })
    })
    socket.setTimeout(() => socket.close(), 5000)
  })
  check(res, { 'ws session ok': (r) => r === true })
}
