import type { Request, Response, NextFunction } from 'express'

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = process.env.ADK_AUTH_TOKEN
  if (!token) return next()

  const authHeader = req.headers.authorization || ''
  const value = authHeader.replace('Bearer ', '')
  if (value !== token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  return next()
}
