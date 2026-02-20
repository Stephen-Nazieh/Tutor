# 3.0 Video Learning System – Implementation Record

This document records the implementation of **section 3.0 Video Learning System** from FinalThings.md.

---

## 3.0.1 Video Upload & Storage

### S3-compatible storage

- **`src/lib/video/upload.ts`**
  - `getPresignedPutUrl(key, contentType, expiresInSeconds)` – returns `{ uploadUrl, publicUrl, key }` for direct browser PUT to S3 (or MinIO). Uses `@aws-sdk/client-s3` and `@aws-sdk/s3-request-presigner` (dynamic import; install when using S3).
  - `isS3Configured()` – true when `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` are set.
  - Optional `S3_ENDPOINT` for MinIO or other S3-compatible endpoints.

### API

- **POST /api/content/upload/init** (TUTOR, CSRF)
  - Body: `{ title, subject, filename?, contentType? }`.
  - Creates a `ContentItem` with `uploadStatus: 'uploading'`, `url: null`.
  - If S3 is configured: returns `{ contentId, uploadUrl, key, publicUrl, expiresIn }` for client to PUT the file.
  - If not: returns `{ contentId, message, key }`; client can set URL via upload-complete.

- **POST /api/content/[contentId]/upload-complete** (TUTOR, CSRF)
  - Body: `{ url? | key?, durationSeconds?, transcript? }`.
  - Sets `url` (from `url` or from key + bucket/endpoint), `uploadStatus: 'ready'`, optional `duration`, `transcript`.

### Progress during upload

- Progress is client-side: use `uploadUrl` with `XMLHttpRequest` or `fetch` and report progress in the UI. No server-side progress tracking for the binary upload.

### Multiple quality levels (720p, 1080p)

- ContentItem has `videoVariants` (JSON), e.g. `{ "720": "url1", "1080": "url2" }`. Upload multiple files (e.g. init + complete per quality) and set `videoVariants` in a separate update or extend upload-complete to accept variants. Player supports quality selection when `videoVariants` is present.

### Compression / transcoding

- Not implemented. Transcoding can be added later (worker, ffmpeg, or external service) and then set `videoVariants` and primary `url` when ready.

---

## 3.0.2 Video Player Enhancements

### Custom skin & Chinese localization

- **`src/components/video-player/index.tsx`**
  - `LABELS_ZH` and optional `locale: 'zh' | 'en'`; labels for Quick Check, Take Quiz, Skip, Play/Pause, Speed, Fullscreen, PiP, Quality, Auto.

### Playback speed (0.5x–2x)

- Already present: 0.5, 0.75, 1, 1.25, 1.5, 2 in a dropdown; Chinese label “倍速”.

### Keyboard shortcuts

- **Space** – play/pause.
- **Arrow Left/Right** – seek −10s / +10s.
- **Arrow Up/Down** – volume +10% / −10%.
- Handled in a `keydown` listener on the player container (ignores when focus is on input/textarea).

### Picture-in-picture

- PiP button shown when `document.pictureInPictureEnabled`; uses `video.requestPictureInPicture()` / `document.exitPictureInPicture()`. Listener updates `pipActive` for styling.

### Variable quality selection

- When `videoVariants` is passed, a “画质” (Quality) control shows: Auto + sorted keys (e.g. 1080p, 720p). Changing quality switches `video.src` to the selected variant URL.

---

## 3.0.3 Video Analytics

### Watch time tracking

- **POST /api/content/[contentId]/watch-events** (STUDENT, CSRF)
  - Body: `{ events: [{ eventType, videoSeconds, metadata? }] }`.
  - `eventType`: `play`, `pause`, `seek`, `complete`, `quality_change`.
  - Events stored in `VideoWatchEvent` table.

### Pause / seek event logging

- Same endpoint; `seek` events should include `metadata: { fromTime, toTime }` (sent from the player’s `onSeek`).

### Completion percentage & drop-off

- **GET /api/content/[contentId]/analytics** (STUDENT; or ADMIN with `?studentId=`)
  - Returns: `totalWatchSeconds`, `completionPercent`, `lastPositionSeconds`, `dropOffPercent`, `eventCount`, `heatmap` (per-segment counts). Segment size 10s.

### Heatmap

- `heatmap`: array of `{ segmentStart, count }` for 10s segments, derived from event positions.

### Learn page integration

- Learn page batches play/pause/seek/complete from `VideoPlayer` callbacks and sends them to watch-events (flush on pause and on complete). Progress (percentage, lastPosition) is saved to `/api/progress` with throttling (e.g. every 5s).

---

## 3.0.4 Inline Quizzes

### Auto-pause at quiz timestamps

- Content has `quizCheckpoints` (per-timestamp quizzes). Player receives `quizTimestamps` and pauses when playback reaches a timestamp; overlay is shown.

### Overlay quiz interface

- **`src/components/video-player/inline-quiz-overlay.tsx`**
  - Rendered by the learn page when user chooses “开始答题” (Take Quiz). Shows questions for the checkpoint at that timestamp (multiple choice or short answer). Submit and Skip close the overlay.

### Resume after completion

- On Submit or Skip, overlay closes; user can press Play to continue.

### Skip option with note

- In the player’s quiz prompt overlay: optional “跳过并备注” textarea; **Skip** / **Skip with note** calls `onQuizSkip(timestamp, note)`.
  - **POST /api/content/[contentId]/quiz-skip** (STUDENT, CSRF): body `{ videoTimestampSeconds, note? }`. Stored as a `VideoWatchEvent` with `eventType: 'quiz_skip'` and optional `metadata.note`.

---

## Schema (existing / used)

- **ContentItem**: `transcript`, `videoVariants` (Json), `uploadStatus`, `duration` (seconds). Relations: `watchEvents`, `quizCheckpoints`.
- **VideoWatchEvent**: `contentId`, `studentId`, `eventType`, `videoSeconds`, `metadata` (Json).
- **ContentQuizCheckpoint**: `contentId`, `videoTimestampSec`, `title`, `questions` (Json).
- **User**: relation `watchEvents` to `VideoWatchEvent`.

---

## Files Created / Modified

| Path | Change |
|------|--------|
| `prisma/schema.prisma` | User: added `watchEvents` relation. |
| `src/app/api/content/[contentId]/route.ts` | **New** – GET single content with videoUrl, transcript, quizCheckpoints, videoVariants. |
| `src/app/api/content/[contentId]/watch-events/route.ts` | **New** – POST watch events. |
| `src/app/api/content/[contentId]/analytics/route.ts` | **New** – GET analytics (watch time, completion, heatmap). |
| `src/app/api/content/[contentId]/quiz-skip/route.ts` | **New** – POST quiz skip with note. |
| `src/app/api/content/[contentId]/upload-complete/route.ts` | **New** – POST mark upload complete, set url/duration/transcript. |
| `src/app/api/content/upload/init/route.ts` | **New** – POST create content and return presigned URL (if S3 configured). |
| `src/lib/video/upload.ts` | **New** – S3 presign helper. |
| `src/components/video-player/index.tsx` | i18n, keyboard, PiP, quality selector, onPlay/onPause/onSeek/onComplete, onQuizSkip, skip note in overlay. |
| `src/components/video-player/inline-quiz-overlay.tsx` | **New** – overlay with questions, submit/skip. |
| `src/app/student/learn/[contentId]/page.tsx` | Uses new content API, progress save, watch events, quiz skip, inline quiz overlay. |
| `.env.example` | S3_* variables and comment. |

---

## How to run / verify

1. **Migration**  
   - Run `npx prisma migrate dev` if you added or changed schema (e.g. User `watchEvents`).

2. **Single content**  
   - GET `/api/content/[contentId]` (student auth) returns `content` with `videoUrl`, `transcript`, `duration`, `quizTimestamps`, `quizCheckpoints`, `videoVariants`.

3. **Upload (S3)**  
   - Install: `npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner`. Set S3_* in `.env`.  
   - POST `/api/content/upload/init` → get `uploadUrl`; PUT file to `uploadUrl`; POST `/api/content/[contentId]/upload-complete` with `key` or `url` and optional `durationSeconds`, `transcript`.

4. **Analytics**  
   - Watch a video on the learn page; then GET `/api/content/[contentId]/analytics` to see watch time, completion, heatmap.

5. **Inline quiz**  
   - Add `ContentQuizCheckpoint` rows for a content id and timestamps; open learn page, play to a timestamp, choose “开始答题” and complete or skip (with optional note).

6. **Player**  
   - Test keyboard (space, arrows), PiP, quality switch (when `videoVariants` is set), and Chinese labels.

---

## Recommendations for Improvement

### Upload & storage

- **Server-side transcoding** – Add a job queue (e.g. Bull/BullMQ or cloud function) to transcode uploads into 720p/1080p (e.g. ffmpeg or AWS MediaConvert). On completion, update `ContentItem.videoVariants` and set `uploadStatus: 'ready'`.
- **Multipart upload for large files** – For files >100MB, use S3 multipart upload: init, presign each part, complete. Expose a small API (init part, complete multipart) and a progress callback or polling so the UI can show upload progress.
- **Upload progress in UI** – Build a tutor-facing “Upload video” flow that calls upload/init, uploads with `XMLHttpRequest`/`fetch` progress events, then calls upload-complete. Optionally show a progress bar and allow adding transcript/duration before or after upload.
- **Variant API** – Extend upload-complete or add PATCH `/api/content/[contentId]` to accept `videoVariants` (and transcript, duration) so multiple qualities can be set in one step after transcoding or manual uploads.

### Player

- **Adaptive bitrate (HLS/DASH)** – For multiple qualities, consider serving HLS or DASH manifests and using a player that supports ABR (e.g. hls.js or dash.js) so quality switches automatically based on bandwidth.
- **Resume from last position** – On load, read `ContentProgress.lastPosition` (or last watch event) and set `video.currentTime` so playback resumes where the student left off.
- **Accessibility** – Add captions/subtitles support (e.g. `<track>` with VTT from transcript or a separate captions URL) and ensure keyboard shortcuts are documented and focus management works when opening/closing overlays.
- **Quality menu placement** – Move the quality selector into the same control strip as speed (e.g. a single “Settings” menu with Speed + Quality) to reduce clutter on small screens.

### Analytics

- **Aggregate analytics for tutors/admins** – Add GET `/api/content/[contentId]/analytics/aggregate` (or query params) to return per-content stats across all students: average completion, drop-off curve, heatmap aggregation. Requires aggregation queries and role checks (TUTOR/ADMIN).
- **Time-window filters** – Support `?from=&to=` on analytics to limit to a date range and to compare cohorts or periods.
- **Export** – Allow export of watch events or aggregate analytics as CSV/JSON for reporting or dashboards.
- **Event sampling** – For high-traffic content, consider sampling or aggregating events (e.g. by segment) before insert to limit table growth and query cost.

### Inline quizzes

- **Persist quiz attempts** – When the user submits the inline quiz, call the existing quiz attempt API (or a new endpoint) with `quizId` (e.g. checkpoint id), answers, and score so attempts appear in progress and reports.
- **AI grading for short answer** – For short-answer questions in checkpoints, call the existing grading flow (or a small adapter) and show feedback before closing the overlay.
- **Reminder to complete skipped quizzes** – Store “skipped at timestamp” and, on next visit, show a gentle reminder or a list of skipped checkpoints so students can complete them later.
- **Quiz authoring** – Add a tutor/admin UI to create and edit `ContentQuizCheckpoint` (timestamp, title, questions JSON) per content, instead of inserting rows manually in the DB.

### Operations & robustness

- **CDN for video URLs** – Serve video URLs via a CDN (e.g. CloudFront in front of S3) to improve start time and reduce origin load. Use the CDN URL in `url` and `videoVariants`.
- **Rate limiting** – Apply rate limits to watch-events and upload endpoints to avoid abuse (e.g. per-user caps and per-content caps).
- **Validation** – Validate `videoTimestampSec` and question schema when creating or updating quiz checkpoints; validate file type and size (or max duration) in upload/init.
- **Monitoring** – Add logging or metrics for upload failures, analytics write volume, and player errors (e.g. failed to load video) to detect configuration or storage issues early.
