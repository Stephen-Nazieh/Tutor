import crypto from 'crypto'
import { getTranscriptAccessLink, downloadTextFile } from '../adapters/daily/api.js'
import { summarizeConversation } from '../memory/summaries.js'
import { setCache, getCache } from '../adapters/cache/redis.js'
import { query } from '../adapters/db/drizzle.js'
import { vttToPlainText } from './vtt.js'

type LiveTranscriptionState = {
  sessionId: string
  tutorId: string
  roomName: string
  transcriptId: string
  lastVttHash: string | null
  lastTranscriptChars: number
  lastSummary: string | null
}

const intervals = new Map<string, NodeJS.Timeout>()

function cacheKey(sessionId: string) {
  return `live_transcription:${sessionId}`
}

async function upsertReplayArtifact(input: {
  sessionId: string
  tutorId: string
  transcript: string
  summary: string
  summaryJson: Record<string, unknown>
}) {
  const artifactId = crypto.randomUUID()
  await query(
    `INSERT INTO "SessionReplayArtifact" ("id", "sessionId", "tutorId", "transcript", "summary", "summaryJson", "status", "generatedAt", "createdAt", "updatedAt")
     VALUES ($1, $2, $3, $4, $5, $6, 'processing', NOW(), NOW(), NOW())
     ON CONFLICT ("sessionId")
     DO UPDATE SET
       "transcript" = EXCLUDED."transcript",
       "summary" = EXCLUDED."summary",
       "summaryJson" = EXCLUDED."summaryJson",
       "status" = 'processing',
       "updatedAt" = NOW()`,
    [
      artifactId,
      input.sessionId,
      input.tutorId,
      input.transcript,
      input.summary,
      JSON.stringify(input.summaryJson),
    ]
  )
}

async function tick(state: LiveTranscriptionState) {
  const link = await getTranscriptAccessLink(state.transcriptId)
  const vtt = await downloadTextFile(link)
  const hash = crypto.createHash('sha256').update(vtt).digest('hex')
  if (hash === state.lastVttHash) return

  const transcriptText = vttToPlainText(vtt)

  const trimmedTranscript =
    transcriptText.length > 24_000 ? transcriptText.slice(transcriptText.length - 24_000) : transcriptText

  const summary = await summarizeConversation(trimmedTranscript)

  state.lastVttHash = hash
  state.lastTranscriptChars = transcriptText.length
  state.lastSummary = summary

  await setCache(cacheKey(state.sessionId), state, 6 * 60 * 60)

  await upsertReplayArtifact({
    sessionId: state.sessionId,
    tutorId: state.tutorId,
    transcript: transcriptText,
    summary,
    summaryJson: {
      source: 'daily',
      roomName: state.roomName,
      transcriptId: state.transcriptId,
      updatedAt: new Date().toISOString(),
      transcriptChars: transcriptText.length,
    },
  })
}

export async function startLiveTranscriptionWorker(input: {
  sessionId: string
  tutorId: string
  roomName: string
  transcriptId: string
}) {
  const existing = await getCache<LiveTranscriptionState>(cacheKey(input.sessionId))
  const state: LiveTranscriptionState = existing || {
    sessionId: input.sessionId,
    tutorId: input.tutorId,
    roomName: input.roomName,
    transcriptId: input.transcriptId,
    lastVttHash: null,
    lastTranscriptChars: 0,
    lastSummary: null,
  }

  state.tutorId = input.tutorId
  state.roomName = input.roomName
  state.transcriptId = input.transcriptId

  await setCache(cacheKey(input.sessionId), state, 6 * 60 * 60)

  if (intervals.has(input.sessionId)) return

  const timer = setInterval(() => {
    void tick(state).catch(() => {})
  }, 60_000)
  intervals.set(input.sessionId, timer)

  void tick(state).catch(() => {})
}

export async function getLiveTranscriptionState(sessionId: string) {
  return getCache<LiveTranscriptionState>(cacheKey(sessionId))
}

export async function stopLiveTranscriptionWorker(sessionId: string) {
  const timer = intervals.get(sessionId)
  if (timer) clearInterval(timer)
  intervals.delete(sessionId)
}

