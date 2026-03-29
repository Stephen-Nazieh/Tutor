/**
 * Client-safe MemoryService shim.
 * The real MemoryService depends on server-side resources (DB/pg),
 * so client components should import this file instead.
 */

type TranscriptEntry = {
  id: string
  timestamp: Date
  speaker: string
  text: string
  isAiGenerated?: boolean
}

type ClassSummaryPayload = {
  keyConcepts?: string[]
  actionItems?: string[]
  homework?: string
  nextTopic?: string
  struggles?: string[]
  topic?: string
  status?: string
}

export const MemoryService = {
  appendTranscript: (_roomId: string, _entry: TranscriptEntry) => {},
  getTranscript: (_roomId: string) => [] as TranscriptEntry[],
  processClassSummary: async (_studentId: string, _summary: ClassSummaryPayload) => {},
}
