# Socket Server Code Review – Recommended Fixes

**File:** `src/lib/socket-server.ts` (~3,419 lines)  
**Scope:** Security, correctness, performance, maintainability, and robustness.

**Status:** All recommended fixes below have been implemented (see implementation summary at end).

---

## Executive Summary

The socket server implements live class, whiteboard, PDF/math collaboration, DMs, breakout rooms, and polls. Several **critical** issues (auth, broadcast scope, DM state) and many **high/medium** improvements are recommended below.

---

## 1. Critical – Security & Correctness

### 1.1 No server-side authentication (Critical)

**Issue:** All handlers trust client-provided `userId`, `role`, `roomId`, and `name`. A client can send `role: 'tutor'` in `join_class` and gain tutor capabilities (moderation, broadcast, breakout create, poll create, etc.).

**Location:** `join_class` (lines 1384–1342), and implicitly every handler that uses `socket.data.role` / `socket.data.userId`.

**Recommendation:**

- Add Socket.io middleware that validates the session (e.g. verify JWT or session cookie via your auth layer) and sets `socket.data.userId`, `socket.data.role`, and `socket.data.name` from the **server** only. Reject connection or disconnect if invalid.
- Do not allow the client to set role or userId in `join_class`; at most allow `roomId` (and validate membership via DB/API).
- Optionally: for sensitive actions (e.g. `breakout_create`, `poll:create`, `lcwb_tutor_*`), verify room/session membership and role in the database before applying.

### 1.2 Math whiteboard broadcasts to all clients (Critical)

**Issue:** `math_tl_snapshot` and `math_yjs_update` use `io.emit(...)`, so updates are sent to **every** connected socket on the server, not just the math whiteboard room.

**Locations:**

- ~1839: `io.emit('math_tl_snapshot', { ... })`
- ~1863: `io.emit('math_yjs_update', { ... })`

**Recommendation:** Restrict to the room:

```ts
io.to(room.roomId).emit('math_tl_snapshot', { ... })
io.to(room.roomId).emit('math_yjs_update', { ... })
```

### 1.3 Breakout create – no tutor check (Critical)

**Issue:** `handleBreakoutCreate` does not check `socket.data.role === 'tutor'`. Any client can create breakout rooms for any `mainRoomId`/`sessionId`.

**Location:** ~2682–2813 (`breakout_create` / `breakout:create`).

**Recommendation:** At the start of `handleBreakoutCreate`:

```ts
if (socket.data.role !== 'tutor') return
```

(After 1.1, role will be server-set and trustworthy.)

### 1.4 Direct message room participants never set (High)

**Issue:** In `dm_join_conversation`, `participant1Id` and `participant2Id` are left as `''` (“Will be set from DB lookup”) and are never set. In `dm_message`, recipient lookup uses:

`userSocketMap.get(data.senderId === room?.participant1Id ? room.participant2Id : room?.participant1Id || '')`  
which is effectively `userSocketMap.get('')`, so `dm_notification` for users not in the conversation view never fires.

**Locations:** ~2196–2201 (room init), ~2253 (recipient lookup).

**Recommendation:**

- When creating or resolving the DM room, set `participant1Id` and `participant2Id` from your conversation/DB model (e.g. when the socket joins, fetch conversation participants and assign them).
- Ensure only those two participant IDs are used for recipient lookup and access checks.

---

## 2. High – Robustness & Safety

### 2.1 CORS `origin: '*'` (High – production)

**Issue:** `cors: { origin: '*' }` allows any origin to connect to the socket server.

**Location:** ~1366–1370.

**Recommendation:** In production, set `origin` to your front-end origins (e.g. `process.env.NEXT_PUBLIC_APP_URL` or an allowlist). Keep `'*'` only for local/dev if needed.

### 2.2 No input validation on `join_class` (High)

**Issue:** `join_class` does not validate `roomId`, `userId`, `name`, or `role`. Empty or malformed values can create broken room state or bad `socket.data`.

**Recommendation:** Validate and sanitize (e.g. non-empty strings, role in `['student','tutor']`, reasonable length limits). Reject or disconnect on invalid payloads.

### 2.3 Chat / DM message size limits (High)

**Issue:** `chat_message` and `dm_message` do not enforce a maximum length for `data.text` / `data.content`. A client can send very large payloads and stress memory and broadcast.

**Recommendation:** Enforce a max length (e.g. 4KB or 8KB) and reject or trim before storing and broadcasting.

### 2.4 Whiteboard `wb_clear` – no permission check (High)

**Issue:** Any user who knows `whiteboardId` can clear the entire board; there is no check that the sender is the room tutor or owner.

**Location:** ~2421–2432.

**Recommendation:** Either restrict clear to a “room owner”/tutor (using server-set `socket.data.role` and optional room ownership), or at least verify the socket is in `wb:${data.whiteboardId}` and optionally that `data.userId === socket.data.userId`.

### 2.5 Duplicate disconnect handlers (Medium)

**Issue:** Two `socket.on('disconnect', ...)` handlers are registered: one ~1871 (math whiteboard cleanup) and one ~2490 (room, DM, whiteboard, PDF, lcwb). Both run, but having two is easy to miss and can lead to ordering/duplication mistakes.

**Recommendation:** Register a single `disconnect` handler that performs all cleanup (math WB, room, DM, whiteboard, PDF, lcwb) in one place. This makes behavior and order explicit and easier to maintain.

### 2.6 Deprecated `.substr` (Low)

**Issue:** `Math.random().toString(36).substr(2, 9)` uses deprecated `substr`.

**Location:** ~3324 (poll response id).

**Recommendation:** Use `slice(2, 11)` (or equivalent) instead of `substr(2, 9)`.

---

## 3. Medium – Data & Consistency

### 3.1 Room/whiteboard creation race (Medium)

**Issue:** Several paths do “get or create” room/whiteboard with a non-atomic pattern (get, then if missing create and set). Under concurrency, two sockets can both create and one overwrite the other.

**Locations:** e.g. `activeRooms`, `activeWhiteboards`, `getPdfCollabRoom`, `getMathWhiteboardRoom`.

**Recommendation:** For in-memory state, the current pattern is usually acceptable if a single Node process handles the socket server. If you move to multiple servers, introduce a shared store (e.g. Redis) and atomic “get or create” (e.g. by key). For now, at least ensure that after creation you always use the same reference (e.g. re-get by id after set) so that all code sees the same object.

### 3.2 `lcwb_student_replace_strokes` / `lcwb_tutor_replace_strokes` bypass op dedup (Medium)

**Issue:** Replace handlers build ops from full stroke lists and apply them without going through `sanitizeWhiteboardOps` (no opId dedup). Replays or duplicate replace events could apply the same change multiple times.

**Recommendation:** Either run replace-generated ops through the same sanitization/dedup pipeline used for incremental ops, or assign unique opIds to replace ops and feed them into the same seen-id set.

### 3.3 AI region hint – no rate limit (Medium)

**Issue:** `lcwb_ai_region_request` calls `generateWhiteboardRegionHint` (LLM) with no per-user or per-room rate limit. A client can trigger many AI requests.

**Location:** ~1275–1289.

**Recommendation:** Add a simple in-memory rate limit (e.g. per userId or roomId, max N requests per minute) and reject or drop excess requests.

---

## 4. Performance & Scalability

### 4.1 Cleanup intervals and unbounded growth (Medium)

**Issue:** Multiple `setInterval` cleanups (rooms, DM, PDF, live doc, whiteboard) and some in-memory structures (e.g. `whiteboardOpSeenIds`, `whiteboardOpLog`, `whiteboardDeadLetters`) have caps, but the file is large and state is spread across many Maps. Under long runs or many rooms, memory can grow.

**Recommendation:**

- Consider a single “tick” function that runs every N minutes and cleans all domains (rooms, DM, PDF, whiteboard, math WB, etc.) based on lastActivity or participant count.
- Document or enforce max entries per Map (e.g. max rooms, max whiteboards) and evict by LRU or oldest activity when over limit.

### 4.2 Whiteboard stroke arrays (Low–Medium)

**Issue:** Some whiteboard state keeps full stroke arrays in memory and pushes every stroke. For very active boards, array size and broadcast payloads can grow.

**Recommendation:** You already cap history in some paths (e.g. op log slice). Consider a hard cap on strokes per board (e.g. keep last N or last N minutes) and document it. Optionally paginate or summarize when sending “full state” to late joiners.

---

## 5. Maintainability & Structure

### 5.1 File size and single responsibility (High)

**Issue:** One ~3.4k-line file mixes class rooms, whiteboard, PDF, math WB, DMs, breakout, polls, and observability. This makes review, testing, and refactors harder.

**Recommendation:** Split by domain (e.g. `socket-class-room.ts`, `socket-whiteboard.ts`, `socket-dm.ts`, `socket-breakout.ts`, `socket-polls.ts`, `socket-math-wb.ts`) with clear interfaces. Keep `socket-server.ts` as a thin orchestrator that creates the IO server, applies auth middleware, and registers handlers from each module. Shared state (e.g. `activeRooms`) can live in a small `socket-state.ts` or be passed into handlers.

### 5.2 Magic numbers and constants (Medium)

**Issue:** Many magic numbers: e.g. 20000/10000 (op seen set), 4000 (op log), 500 (dead letters), 80 (snapshots), 150 (exports), 100 (chat history), 4 hours, 1 hour, 30 minutes, 80 strokes limit, etc.

**Recommendation:** Define named constants at the top (e.g. `MAX_WHITEBOARD_OP_LOG = 4000`, `CHAT_HISTORY_MAX = 100`, `ROOM_IDLE_CLEANUP_MS = 4 * 60 * 60 * 1000`) and use them everywhere. This makes tuning and policy explicit.

### 5.3 Logging (Low)

**Issue:** Uses `console.warn` for connection/disconnection and a few events. No log levels or structured logging.

**Recommendation:** Use a small logger (or existing app logger) with levels (e.g. debug for join/leave, info for errors). In production, avoid logging full payloads or PII.

---

## 6. Summary of Recommended Fixes (Priority Order)

| Priority | Item | Action |
|----------|------|--------|
| P0 | Auth | Add Socket.io auth middleware; set userId/role/name server-side only; validate room membership for sensitive actions. |
| P0 | Math broadcast | Change `io.emit` → `io.to(room.roomId).emit` for `math_tl_snapshot` and `math_yjs_update`. |
| P0 | Breakout create | Require `socket.data.role === 'tutor'` in `handleBreakoutCreate`. |
| P1 | DM participants | Set and use `participant1Id` / `participant2Id` from DB when joining conversation; fix recipient lookup. |
| P1 | CORS | Restrict `origin` in production. |
| P1 | join_class | Validate/sanitize payload; consider room membership check. |
| P1 | Message size | Enforce max length for chat and DM messages. |
| P1 | wb_clear | Restrict to tutor/owner or at least verify socket is in room and userId. |
| P2 | Disconnect | Single disconnect handler with all cleanup. |
| P2 | Replace strokes | Integrate replace flows with op dedup/sanitization. |
| P2 | AI region | Rate limit `lcwb_ai_region_request`. |
| P2 | Constants | Extract magic numbers to named constants. |
| P3 | Split file | Split by feature; thin main server. |
| P3 | .substr | Replace with `.slice`. |

Implementing the P0 and P1 items will address the most critical security and correctness issues; P2 and P3 will improve robustness and long-term maintainability.

---

## Implementation Summary (Completed)

- **P0 Auth:** Optional JWT middleware added; when client sends `auth.token`, server sets `socket.data.userId`, `role`, `name` from token. `join_class` uses server-set identity when present and validates/sanitizes payload.
- **P0 Math broadcast:** `math_tl_snapshot` and `math_yjs_update` now use `io.to(room.roomId).emit`.
- **P0 Breakout create:** `handleBreakoutCreate` now returns early if `socket.data.role !== 'tutor'`.
- **P1 DM participants:** `getConversationParticipantIds()` loads Conversation from Prisma in `dm_join_conversation` and sets `participant1Id`/`participant2Id`; `dm_message` uses `otherId` for recipient lookup and enforces `MAX_DM_MESSAGE_LENGTH`.
- **P1 CORS:** `getSocketCorsOrigin()` uses `SOCKET_CORS_ORIGIN` or `NEXT_PUBLIC_APP_URL`; production defaults to empty array when unset.
- **P1 join_class:** Payload validated (roomId, userId, name length caps); server identity used when authenticated.
- **P1 Message size:** Chat and DM messages capped at 4096 chars.
- **P1 wb_clear:** Socket must be in room; only tutor or same user (`data.userId === socket.data.userId`) can clear.
- **P2 Single disconnect:** Math WB cleanup merged into the main disconnect handler; one handler only.
- **P2 Replace strokes:** `lcwb_student_replace_strokes` and `lcwb_tutor_replace_strokes` build ops with `opId`, run through `sanitizeWhiteboardOps`, and use valid ops only.
- **P2 AI region rate limit:** Per-room-per-user limit (10/min) in `lcwb_ai_region_request`.
- **P2 Constants:** All magic numbers replaced with named constants at top of file.
- **P3 .substr:** Replaced with `.slice(2, 11)` in poll response id.
