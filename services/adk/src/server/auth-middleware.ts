import type { Request, Response, NextFunction } from 'express'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = process.env.ADK_AUTH_TOKEN
  const authDisabled = process.env.ADK_AUTH_DISABLED === 'true' && process.env.NODE_ENV !== 'production'
  if (!token) {
    if (authDisabled) return next()
    return res.status(503).json({ error: 'ADK auth not configured' })
  }

  const authHeader = req.headers.authorization || ''
  const value = authHeader.replace('Bearer ', '')
  if (value !== token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  return next()
}
