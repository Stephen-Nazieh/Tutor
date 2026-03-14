import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 8080)

app.use(cors())
app.use(express.json({ limit: '2mb' }))

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'adk-service'
  })
})

// Routes (auth temporarily disabled for testing)
app.use(router)

app.listen(port, '0.0.0.0', () => {
  console.log(`ADK service running on port ${port} and listening on 0.0.0.0`)
})
