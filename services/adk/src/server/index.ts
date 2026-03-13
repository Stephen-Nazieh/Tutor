import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'
import { requireAuth } from './auth-middleware'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 4310)

app.use(cors())
app.use(express.json({ limit: '2mb' }))
app.use(requireAuth)
app.use(router)

app.get('/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

app.listen(port, () => {
  console.log(`ADK service running on port ${port}`)
})
