import { NextFunction, Request, Response } from 'express'
import { verifyAccessToken } from './token.service'

export interface JwtPayload {
  userId: number
  role: string
}

export interface AuthRequest extends Request {
  user?: {
    userId: number
    role: string
  }
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.access_token

  if (!token) return res.sendStatus(401)

  try {
    req.user = verifyAccessToken(token) as JwtPayload
    next()
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export function requireAdmin(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Forbidden' })
  }

  next()
}
