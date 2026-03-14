import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes.js'
import { requireAuth } from './auth-middleware.js'
import { pathToFileURL } from 'node:url'

dotenv.config()

const port = Number(process.env.PORT || 8080)

function getAllowedOrigins(): string[] {
  const envOrigins = (process.env.ADK_ALLOWED_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
  const devOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:3003',
  ]
  const appOrigin = process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []
  return Array.from(new Set([...envOrigins, ...appOrigin, ...devOrigins]))
}

export function createApp() {
  const app = express()
  const allowedOrigins = getAllowedOrigins()

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true)
        if (allowedOrigins.includes(origin)) return callback(null, true)
        return callback(new Error('CORS_NOT_ALLOWED'))
      },
      credentials: true,
    })
  )
  app.use(express.json({ limit: '2mb' }))

  // Health check endpoint (auth in production unless explicitly public)
  app.get('/health', (req, res, next) => {
    const isPublicHealth = process.env.ADK_PUBLIC_HEALTH === 'true'
    if (process.env.NODE_ENV === 'production' && !isPublicHealth) {
      return requireAuth(req, res, next)
    }
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'adk-service',
    })
  })

  app.use(requireAuth)
  app.use(router)

  // CORS error handler
  app.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err?.message === 'CORS_NOT_ALLOWED') {
      return res.status(403).json({ error: 'CORS not allowed' })
    }
    return next(err)
  })

  return app
}

if (process.env.NODE_ENV === 'production' && !process.env.ADK_AUTH_TOKEN) {
  throw new Error('ADK_AUTH_TOKEN is required in production')
}

const app = createApp()

const isEntryPoint = process.argv[1] ? import.meta.url === pathToFileURL(process.argv[1]).href : false
const isTestRunner = process.execArgv.includes('--test')
const shouldListen =
  isEntryPoint &&
  !isTestRunner &&
  process.env.NODE_ENV !== 'test' &&
  process.env.ADK_START_LISTENER === 'true' &&
  process.env.ADK_DISABLE_LISTEN !== 'true'
if (shouldListen) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`ADK service running on port ${port} and listening on 0.0.0.0`)
  })
}
