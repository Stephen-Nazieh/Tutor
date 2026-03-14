import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'
import { requireAuth } from './auth-middleware'

dotenv.config()

const app = express()

// Cloud Run provides the PORT environment variable. 
// We default to 8080 if it's not set.
const port = Number(process.env.PORT || 8080)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// Health check endpoint (helpful for Cloud Run to verify the service is up)
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'adk-service'
  })
})

// Protected routes
app.use(requireAuth)
app.use(router)

// Crucial: We must listen on '0.0.0.0' for Cloud Run to route traffic correctly.
app.listen(port, '0.0.0.0', () => {
  console.log(`ADK service running on port ${port} and listening on 0.0.0.0`)
})
