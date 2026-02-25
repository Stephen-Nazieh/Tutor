# Live Class Recording Implementation Plan

## Overview
This document outlines the implementation plan for adding live class recording functionality to the TutorMe platform.

---

## Current State Analysis

The platform already has foundational components for video recording:

- ✅ **Daily.co video integration** with `enable_recording: 'cloud'` capability
- ✅ **`useDailyCall` hook** with `startRecording()` and `stopRecording()` methods
- ✅ **LiveSession model** for managing live classes
- ✅ **Video provider abstraction** for future migration to Tencent TRTC

---

## Implementation Plan

### Phase 1: Database Schema (Week 1)

#### New Model: `ClassRecording`

```prisma
model ClassRecording {
  id              String   @id @default(cuid())
  sessionId       String   // LiveSession ID
  tutorId         String
  
  // Recording metadata
  status          String   @default("recording") // recording, processing, ready, error
  startedAt       DateTime @default(now())
  endedAt         DateTime?
  durationSeconds Int?
  
  // Storage info
  provider        String   @default("daily") // daily, trtc, s3
  recordingId     String?  // Provider's recording ID
  downloadUrl     String?  // Temporary download URL
  playbackUrl     String?  // CDN playback URL
  thumbnailUrl    String?  // Video thumbnail
  
  // Access control
  isPublic        Boolean  @default(false)
  allowDownload   Boolean  @default(true)
  password        String?  // Optional password protection
  
  // Metadata
  title           String?
  description     String?
  fileSizeBytes   Int?
  resolution      String?  // 1080p, 720p, etc.
  
  // Relations
  session         LiveSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  tutor           User        @relation(fields: [tutorId], references: [id], onDelete: Cascade)
  
  @@index([sessionId])
  @@index([tutorId])
  @@index([status])
  @@index([startedAt])
}
```

#### Update `LiveSession` Model

```prisma
model LiveSession {
  // ... existing fields ...
  recordingEnabled Boolean @default(false)
  recordings       ClassRecording[]
}
```

#### Migration Steps

1. Create migration: `npx prisma migrate dev --name add_class_recording`
2. Update Prisma client: `npx prisma generate`
3. Run seed script if needed for existing sessions

---

### Phase 2: API Endpoints (Week 1-2)

#### 1. Start Recording
**`POST /api/live-sessions/[id]/recording/start`**

```typescript
// Request body: none
// Response:
{
  recordingId: string,
  startedAt: string,
  status: "recording"
}
```

**Implementation:**
- Validates tutor owns the session
- Calls Daily.co API to start recording
- Creates `ClassRecording` entry in database
- Returns recording metadata

#### 2. Stop Recording
**`POST /api/live-sessions/[id]/recording/stop`**

```typescript
// Request body: none
// Response:
{
  recordingId: string,
  durationSeconds: number,
  status: "processing"
}
```

**Implementation:**
- Validates active recording exists
- Calls Daily.co API to stop recording
- Updates database with end time and duration
- Triggers async processing

#### 3. List Session Recordings
**`GET /api/live-sessions/[id]/recordings`**

```typescript
// Response:
{
  recordings: [{
    id: string,
    status: string,
    startedAt: string,
    endedAt: string,
    durationSeconds: number,
    thumbnailUrl: string,
    playbackUrl: string,
    title: string
  }]
}
```

#### 4. List All Tutor Recordings
**`GET /api/recordings`**

**Query Parameters:**
- `status` - Filter by status
- `from` - Start date (ISO string)
- `to` - End date (ISO string)
- `search` - Search by title/session name
- `page` - Pagination
- `limit` - Items per page

#### 5. Update Recording Metadata
**`PATCH /api/recordings/[id]`**

```typescript
// Request body:
{
  title?: string,
  description?: string,
  isPublic?: boolean,
  allowDownload?: boolean
}
```

#### 6. Delete Recording
**`DELETE /api/recordings/[id]`**

**Implementation:**
- Soft delete (mark as deleted)
- Schedule hard delete from S3 after 30 days
- Or immediate hard delete with confirmation

#### 7. Daily.co Webhook Handler
**`POST /api/webhooks/daily/recording`**

**Events Handled:**
- `recording.started` - Recording began
- `recording.stopped` - Recording ended
- `recording.ready` - Processing complete, download ready
- `recording.error` - Recording failed

**Implementation:**
```typescript
// Verify webhook signature
// Update recording status in database
// If ready, trigger download to S3
// Generate thumbnail
// Update playback URLs
```

---

### Phase 3: Video Provider Updates (Week 2)

#### Update `VideoProvider` Interface

```typescript
// lib/video/types.ts

interface VideoProvider {
  // ... existing methods ...
  
  startRecording(roomId: string): Promise<{ recordingId: string }>
  stopRecording(roomId: string): Promise<void>
  getRecordingStatus(recordingId: string): Promise<RecordingStatus>
  getDownloadUrl(recordingId: string): Promise<string>
}

interface RecordingStatus {
  id: string
  status: 'recording' | 'processing' | 'ready' | 'error'
  durationSeconds?: number
  fileSizeBytes?: number
  startedAt: string
  endedAt?: string
}
```

#### Implement in `DailyCoProvider`

```typescript
// lib/video/daily-provider.ts

async startRecording(roomId: string): Promise<{ recordingId: string }> {
  if (this.mockMode) {
    return { recordingId: `mock-rec-${Date.now()}` }
  }

  const response = await this.fetchDaily(`/rooms/${roomId}/recordings`, {
    method: 'POST',
    body: JSON.stringify({
      layout: 'grid', // or 'active-speaker'
      background_color: '#1a1a1a',
      // Optional: custom layout for 1:1 vs group classes
      max_resolution: '1080p'
    })
  })
  
  return { recordingId: response.id }
}

async stopRecording(roomId: string): Promise<void> {
  if (this.mockMode) return

  await this.fetchDaily(`/rooms/${roomId}/recordings`, {
    method: 'DELETE' // or PATCH depending on Daily's API
  })
}

async getRecordingStatus(recordingId: string): Promise<RecordingStatus> {
  const recording = await this.fetchDaily(`/recordings/${recordingId}`)
  
  return {
    id: recording.id,
    status: recording.status, // recording, processing, ready, error
    durationSeconds: recording.duration,
    fileSizeBytes: recording.size,
    startedAt: recording.started_at,
    endedAt: recording.ended_at
  }
}

async getDownloadUrl(recordingId: string): Promise<string> {
  const response = await this.fetchDaily(`/recordings/${recordingId}/access-link`, {
    method: 'POST',
    body: JSON.stringify({
      validForSeconds: 3600 // 1 hour
    })
  })
  
  return response.download_link
}
```

---

### Phase 4: UI Components (Week 2-3)

#### 1. Recording Controls Component

**File:** `components/class/recording-controls.tsx`

```typescript
interface RecordingControlsProps {
  sessionId: string
  isRecording: boolean
  recordingDuration: number // seconds
  onStartRecording: () => void
  onStopRecording: () => void
}

// Features:
// - Red "REC" badge with pulsing animation when recording
// - Duration timer (MM:SS format)
// - Start/Stop recording button
// - Confirmation dialog before stopping
// - Recording state persistence across page refreshes
```

**Visual Design:**
```
┌─────────────────────────────────────┐
│  🔴 REC  12:34          [Stop ●]   │
└─────────────────────────────────────┘
```

#### 2. Recording Indicator in Class Header

**Integration:** Add to existing class interface header

```typescript
// Shows when recording is active
<div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-full">
  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
  <span className="text-red-600 font-medium">REC</span>
  <span className="text-red-500 font-mono">{formatDuration(duration)}</span>
</div>
```

#### 3. Recordings Management Page

**File:** `app/tutor/recordings/page.tsx`

**Features:**
- Grid/list view toggle
- Search by title, session name
- Filter by date range, status
- Sort by date, duration, file size
- Bulk actions (delete, change visibility)

**Recording Card:**
```
┌─────────────────────────────────────┐
│ [Thumbnail with play button]        │
│                                     │
│ Introduction to Python             │
│ Jan 15, 2025 • 45:30 • 128 MB      │
│                                     │
│ [Play] [Download] [Share] [...]    │
└─────────────────────────────────────┘
```

#### 4. Recording Player Component

**File:** `components/video-player/recording-player.tsx`

**Features:**
- Video playback with standard controls
- Playback speed (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x)
- Chapter markers (based on whiteboard events, screen shares)
- Picture-in-picture mode
- Fullscreen support
- Keyboard shortcuts (space to pause, arrows to seek)

**Optional AI Features:**
- Transcript sidebar with search
- Click transcript to jump to timestamp
- Auto-generated chapters

#### 5. Recording Settings Modal

**File:** `components/class/recording-settings-modal.tsx`

**Options:**
- Auto-start recording when class begins
- Recording layout (grid vs active speaker)
- Default visibility (public/private)
- Allow student downloads
- Auto-delete after X days

---

### Phase 5: Storage & CDN (Week 3)

#### Storage Provider Comparison

| Provider | Pros | Cons | Best For |
|----------|------|------|----------|
| **Daily.co Cloud** | Built-in, no setup | 7-day retention, expensive | MVP/testing |
| **AWS S3 + CloudFront** | Full control, reliable | Requires setup | Production |
| **Cloudflare R2** | No egress fees, S3-compatible | Newer service | Cost-conscious |
| **Tencent COS** | China-optimized | ICP required | China deployment |
| **Wasabi** | Cheap, no egress fees | Less mature | Budget option |

#### Recommended Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      RECORDING FLOW                          │
└─────────────────────────────────────────────────────────────┘

1. Class in Progress
   └─> Daily.co Recording (Cloud)
            │
            ▼
2. Recording Stopped
   └─> Webhook to /api/webhooks/daily/recording
            │
            ▼
3. Download & Process
   ├─> Download from Daily.co to temp storage
   ├─> Transcode to multiple formats (1080p, 720p)
   ├─> Generate thumbnail
   └─> Optional: AI transcription
            │
            ▼
4. Store & Distribute
   ├─> Upload to S3/R2 (original + transcoded)
   ├─> CloudFront CDN for playback
   └─> Update database with URLs
            │
            ▼
5. Cleanup
   └─> Delete Daily.co copy after 7 days
```

#### AWS S3 Setup

```typescript
// lib/storage/s3-client.ts
import { S3Client } from '@aws-sdk/client-s3'

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

// Bucket structure:
// tutorme-recordings/
//   ├── {tutorId}/
//   │   ├── {recordingId}/
//   │   │   ├── original.mp4
//   │   │   ├── 1080p.mp4
//   │   │   ├── 720p.mp4
//   │   │   ├── thumbnail.jpg
//   │   │   └── transcript.vtt
```

#### CloudFront Distribution

```typescript
// CloudFront settings for video streaming
{
  Origins: [{
    DomainName: 'tutorme-recordings.s3.amazonaws.com',
    S3OriginConfig: {
      OriginAccessIdentity: '...'
    }
  }],
  DefaultCacheBehavior: {
    ViewerProtocolPolicy: 'https-only',
    CachePolicyId: 'Managed-CachingOptimized',
    // Enable signed URLs for private recordings
    TrustedKeyGroups: ['...']
  }
}
```

---

### Phase 6: AI Features (Week 4 - Optional)

#### 1. Auto Chapter Detection

**Implementation:**
- Track whiteboard state changes
- Track screen share start/stop
- Track poll/quiz interactions
- Generate chapter markers at significant events

```typescript
interface RecordingChapter {
  title: string
  timestamp: number // seconds from start
  type: 'whiteboard' | 'screen-share' | 'quiz' | 'break'
  thumbnailUrl?: string
}
```

#### 2. AI Transcription

**Provider:** OpenAI Whisper API or AWS Transcribe

```typescript
// lib/ai/transcription.ts

async function transcribeRecording(audioUrl: string): Promise<Transcript> {
  const response = await openai.audio.transcriptions.create({
    file: await fetch(audioUrl),
    model: 'whisper-1',
    response_format: 'verbose_json',
    timestamp_granularities: ['word'] // For clickable transcript
  })
  
  return {
    segments: response.segments.map(s => ({
      text: s.text,
      start: s.start,
      end: s.end,
      speaker: s.speaker // if speaker diarization enabled
    }))
  }
}
```

#### 3. Session Summary Generation

```typescript
// lib/ai/session-summary.ts

async function generateSessionSummary(transcript: string): Promise<Summary> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{
      role: 'system',
      content: 'Generate a concise summary of this class session...'
    }, {
      role: 'user',
      content: transcript
    }]
  })
  
  return {
    overview: response.choices[0].message.content,
    keyPoints: [...],
    topicsCovered: [...]
  }
}
```

#### 4. Auto Quiz Generation

Generate review quizzes based on session content for students who missed the live class.

---

### Phase 7: Student Access (Week 4)

#### 1. Missed Classes Section

**File:** `app/student/missed-classes/page.tsx`

- Shows recordings from enrolled groups
- Filter by subject, tutor, date
- Mark as watched
- Take notes alongside video

#### 2. Recording Player with Notes

**File:** `components/student/recording-with-notes.tsx`

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│              [Video Player]                         │
│                                                     │
├─────────────────────────────────────────────────────┤
│ [Transcript] │ [My Notes]                          │
│              │                                      │
│ "Welcome to  │ - Key point at 12:34                │
│  today's..." │ - Remember to review chapter 3      │
│              │                                      │
└─────────────────────────────────────────────────────┘
```

#### 3. Access Control

**Permissions:**
- Students can only view recordings from their enrolled groups
- Public recordings visible to all platform users
- Password-protected recordings require password
- Expiring links for time-limited access

---

## Implementation Timeline

| Week | Phase | Tasks |
|------|-------|-------|
| **Week 1** | Phase 1 | Database schema design, migration, API endpoints setup |
| **Week 1-2** | Phase 2 | Complete all API endpoints, webhook handlers |
| **Week 2** | Phase 3 | Video provider interface updates, Daily.co integration |
| **Week 2-3** | Phase 4 | UI components: recording controls, management page, player |
| **Week 3** | Phase 5 | Storage setup (S3/R2), CDN configuration, processing pipeline |
| **Week 4** | Phase 6-7 | AI features (optional), student access, testing & QA |

---

## Cost Estimate (Monthly)

### Daily.co Recording
- $0.04 per minute recorded
- Example: 100 hours of classes = 6,000 minutes = **$240/month**

### AWS S3 Storage
- Standard storage: $0.023 per GB
- Example: 500 GB of recordings = **$11.50/month**

### CloudFront CDN
- $0.085 per GB transferred (first 10 TB)
- Example: 2 TB viewed = **$170/month**

### AI Transcription (Optional)
- Whisper API: $0.006 per minute
- Example: 100 hours = 6,000 minutes = **$36/month**

### **Total Estimated Cost**
| Usage Level | Monthly Cost |
|-------------|--------------|
| Light (20 hrs) | ~$70-100 |
| Medium (100 hrs) | ~$300-450 |
| Heavy (500 hrs) | ~$1,200-1,800 |

---

## Key Technical Decisions

### Recording Mode
- **Choice:** Cloud recording (not local/client-side)
- **Rationale:** More reliable, better quality, works on all devices

### Storage Strategy
- **Choice:** S3 + CloudFront for production, Daily.co cloud for MVP
- **Rationale:** Cost-effective at scale, global CDN for fast playback

### Retention Policy
- **Choice:** 90 days default, configurable per institution
- **Rationale:** Balance between accessibility and storage costs

### Privacy Default
- **Choice:** Private by default, opt-in sharing
- **Rationale:** Protect student privacy, comply with regulations

### Video Format
- **Choice:** MP4 for download, HLS for streaming
- **Rationale:** Universal compatibility, adaptive bitrate

---

## Security Considerations

1. **Signed URLs** for private recordings
2. **Rate limiting** on download endpoints
3. **Watermarking** (optional) with student ID
4. **Audit logging** of who accessed what recording
5. **GDPR compliance** - right to be forgotten (remove student from recording)

---

## Testing Strategy

### Unit Tests
- Video provider methods
- API endpoint handlers
- Database operations

### Integration Tests
- Start/stop recording flow
- Webhook handling
- Storage upload/download

### E2E Tests
- Full recording lifecycle
- Student viewing experience
- Permission enforcement

---

## Future Enhancements

1. **Live Streaming** - RTMP for public broadcasts
2. **AI Highlights** - Auto-extract key moments
3. **Search** - Full-text search across all transcripts
4. **Analytics** - View counts, engagement metrics
5. **Mobile Apps** - Native recording playback
6. **Offline Downloads** - For mobile app users
7. **Live Transcription** - Real-time captions during class

---

## Dependencies

```json
{
  "@daily-co/daily-js": "^0.60.0",
  "@aws-sdk/client-s3": "^3.450.0",
  "@aws-sdk/s3-request-presigner": "^3.450.0",
  "openai": "^4.20.0",
  "fluent-ffmpeg": "^2.1.2"
}
```

---

## Notes

- Consider implementing **progressive enhancement** - basic recording first, AI features later
- Monitor **storage costs** closely - implement auto-deletion for old recordings
- Test **China accessibility** if deploying there - may need Tencent COS
- Plan for **disaster recovery** - backup critical recordings to multiple regions

---

*Document created: 2024*
*Last updated: 2024*
