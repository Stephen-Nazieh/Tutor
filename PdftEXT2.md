# PDF Tutoring Engine - Detailed Execution Plan (From External Engineer Prompt)

## Source Instruction Summary
Build a high-performance collaborative PDF tutoring system with:
- real-time annotation sync
- multimodal AI handwriting + diagram reading
- rubric-based math marking with partial credit
- vector burn-in flattening into PDF
- lock/unlock and mode switching UX

## 1. Current State vs Target

### What we already have (baseline)
1. Real-time Socket.io infrastructure is already running in custom server.
2. Whiteboard collaboration and moderation patterns already exist and can be reused.
3. PDF rendering dependency (`pdfjs-dist`) exists.
4. AI orchestration infrastructure exists (`generateWithFallback`).
5. Secure route wrappers (`withAuth`) and API conventions are in place.

### What has now been added in code
1. Dedicated PDF tutoring APIs:
- `/api/pdf-tutoring/extract`
- `/api/pdf-tutoring/preprocess`
- `/api/pdf-tutoring/read`
- `/api/pdf-tutoring/mark`
- `/api/pdf-tutoring/flatten`

2. Dedicated PDF collaboration socket protocol:
- `pdf_join_room`
- `pdf_canvas_event`
- `pdf_lock_toggle`
- `pdf_request_state`
- `pdf_lock_state`

3. Tutor UI workbench and viewer:
- PDF.js render + collaborative overlay foundation
- lock/unlock control
- 3 viewing modes (original/cleaned/marked)
- flatten download flow

### What still must be added to reach production grade
1. Install and standardize optional modules:
- `fabric`
- `pdf-lib`
- `unpdf`
- `pdf-parse`

2. Persist room state and annotations in DB (currently in-memory socket state).
3. Add full conflict-resolution for simultaneous object edits.
4. Add student-side panel and tutor-student role aware permissions for room entry.
5. Add complete AI coordinate grounding reliability for red-circle auto-marking.

## 2. Detailed Workstreams

## Workstream A - Collaborative Canvas + Sub-50ms Sync

### A1. Viewer and overlay
- Keep PDF.js page render as immutable base layer.
- Keep Fabric canvas as transparent, interactive annotation layer.
- Ensure consistent page sizing on desktop/tablet.

### A2. Normalized coordinates
- Convert all object geometry to 0-100 percentages before emit.
- Convert back to pixels on receiver using current viewport dimensions.
- Apply this for paths, text, circles, rectangles, free-draw strokes.

### A3. Socket room isolation
- Prefix room key as `pdf:{roomId}`.
- Join on load, emit lock state immediately.
- Broadcast object lifecycle:
  - path created
  - object modified
  - object removed

### A4. Latency objective
- Track sent timestamp in payload.
- Compute receiver-side lag and display health badge.
- Log percentile latencies in server metrics (P50/P95/P99).

## Workstream B - Document Conversion + Reading Pipeline

### B1. PDF text extraction
- Preferred order:
  1. `unpdf`
  2. `pdf-parse`
  3. fallback parser
- Return both raw text and markdown-normalized output.

### B2. Handwritten image preprocessing
- Apply `sharp` pipeline:
  - grayscale
  - contrast normalization
  - sharpen
- Add deskew extension in next phase (Hough-based or OpenCV path).

### B3. AI reading output contract
- Input: cleaned image
- Output:
  - structured markdown
  - mermaid-compatible diagram blocks
- Add validation pass to ensure fenced code blocks are syntactically closed.

## Workstream C - Automated Math Marking Engine

### C1. Prompting strategy
- enforce structured, machine-readable JSON output.
- explicitly require:
  - step reasoning extraction
  - algebraic chain validation
  - partial credit from rubric

### C2. Output schema
`{ totalScore, mistakeLocations: [{ step, errorDescription, correction, x, y }], overallFeedback }`

### C3. Error marker grounding
- Require model to return approximate mistake coordinates.
- Post-process coordinates into red circles over PDF canvas.
- Include confidence score in next phase for low-confidence fallback review.

## Workstream D - PDF Flattening Burn-in

### D1. Coordinate conversion
- Convert normalized canvas coordinates -> pixel
- Convert canvas top-left -> PDF bottom-left:
  `y_pdf = pageHeight - y_canvas`

### D2. Vector writing
- Draw lines, paths, text, circles, and boxes via `pdf-lib`.
- Keep “AI red pen” marks and student marks visually distinct.

### D3. Output contract
- return binary `application/pdf`
- preserve original pages with merged annotations

## Workstream E - Interaction UX

### E1. Tutor lock control
- tutor can lock/unlock student drawing.
- lock state syncs in real-time for all participants.

### E2. Mode toggles
- Original View: base PDF + live annotation canvas
- AI Cleaned Text: OCR/AI normalized markdown pane
- Marked Feedback: rubric-based JSON + visual error cues

### E3. Classroom flow integration
- integrate entry points from live class tab and course assignment context.
- tie room id to class/session id for deterministic joins.

## 3. Security, Governance, and Reliability

1. AuthZ per room:
- tutor: full control + lock + flatten
- student: draw only when unlocked

2. Payload validation:
- strict schema validation on every API route and socket payload.

3. Abuse controls:
- rate-limit object flood events by user.
- cap object payload size.

4. Audit trail:
- log lock toggles, flatten exports, marking requests, and final scores.

## 4. Testing Plan

### Unit tests
1. coordinate transform (percent <-> px)
2. y-axis conversion (canvas -> PDF)
3. marking JSON parser and fallback behavior

### Integration tests
1. extract -> preprocess -> read -> mark pipeline
2. flatten route with sample PDF and synthetic annotations

### E2E tests
1. two clients annotate same PDF in one room
2. lock/unlock blocks drawing instantly
3. mode switch does not destroy annotation state

### Performance tests
1. 2-10 concurrent participants same room
2. measure event propagation latency and packet sizes

## 5. Creative Use Cases Enabled

1. AI-assisted exam correction clinic
- tutor uploads scanned exam, AI pre-marks, tutor finalizes, exports marked PDF.

2. Step-by-step algebra intervention
- AI pinpoints exact step errors and suggests Socratic prompt per step.

3. Diagram-heavy subjects (physics/chemistry)
- hand-drawn diagrams converted into Mermaid references for replay and revision.

4. Parent transparency pack
- flatten final annotated script + feedback summary for parent portal.

5. Multi-device tutoring
- student on iPad and tutor on desktop remain coordinate-consistent via normalized sync.

## 6. Rollout Phases

### Phase 1 (now)
- foundational architecture and APIs
- basic collaborative viewer and flattening route

### Phase 2
- install required modules and harden production paths
- add persistent session storage and robust conflict handling

### Phase 3
- add student-facing UI, analytics, and deep live-class integration
- production SLO monitoring + alerting

## 7. Acceptance Criteria Checklist

1. Tutor and student can join the same PDF room and see each other’s annotations in near real-time.
2. Lock/unlock prevents and restores draw actions correctly.
3. OCR/read route produces markdown output from homework images.
4. Marking route returns required JSON schema with partial-credit logic.
5. Flatten route returns a valid marked PDF with permanent vector overlays.
6. User can switch between Original / AI Cleaned Text / Marked Feedback without losing state.


## Implementation Progress (Current)

Implemented now:
- Tutor/Student PDF collaboration tabs in live class whiteboard experience.
- Role-based lock enforcement at socket layer (tutor-only toggle).
- Persistent snapshot API with DB storage and load/save controls.
- E2E spec for lock/mode/flatten request flow (`e2e/pdf-tutoring.spec.ts`).

Not completed in this runtime:
- Package installation for `fabric`, `pdf-lib`, `unpdf`, `pdf-parse` (environment install restriction).

### Progress update (latest implementation)
- Implemented live room state replay for PDF canvas events.
- Implemented auto snapshotting with retention cap per room.
- Implemented student-facing standalone PDF tutoring page for synchronized room testing.
- Implemented AI error-circle overlay from marking coordinates.
- Implemented additional lock propagation E2E scenario with tutor+student dual contexts.bbb
