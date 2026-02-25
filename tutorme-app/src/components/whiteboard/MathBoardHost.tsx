'use client'

import type { Socket } from 'socket.io-client'
import TldrawMathBoard from './TldrawMathBoard'
import { FabricMathBoard } from './FabricMathBoard'

export interface MathBoardProps {
  sessionId: string
  socket: Socket | null
  userId?: string
  userName?: string
  role: 'tutor' | 'student'
  className?: string
}

function resolveEngine(): 'fabric' | 'tldraw' {
  const raw = (process.env.NEXT_PUBLIC_MATH_ENGINE || 'fabric').toLowerCase()
  return raw === 'tldraw' ? 'tldraw' : 'fabric'
}

export function MathBoardHost(props: MathBoardProps) {
  const engine = resolveEngine()

  if (engine === 'tldraw') {
    return <TldrawMathBoard {...props} />
  }

  return <FabricMathBoard {...props} />
}

export default MathBoardHost
