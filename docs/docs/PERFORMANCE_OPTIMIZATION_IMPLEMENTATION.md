# Performance Optimization: Make the Platform Fast and Scalable — Implementation Record

This document records the implementation of **Section 7** of FinalThings.md: Performance Optimization (7.1 Frontend, 7.2 Backend, 7.3 AI).

---

## 7.1 Frontend Performance

### Targets (from FinalThings.md)
| Metric                 | Current | Target | Status        |
|------------------------|---------|--------|---------------|
| First Contentful Paint | ~2.5s   | <1.5s  | ⚠️ Needs Work |
| Time to Interactive    | ~4s     | <2s    | ⚠️ Needs Work |
| Bundle Size             | ~500KB  | <300KB | ⚠️ Needs Work |
| Lighthouse Score       | ~70     | >90    | ⚠️ Needs Work |

### Implemented

#### Code splitting / route-level chunks
- **Next.js** already splits by route (App Router). No extra config required for route chunks.

#### Lazy load heavy components
- **Class room page** (`src/app/class/[roomId]/page.tsx`):
  - **EnhancedWhiteboard** and **VideoContainer** are loaded with `next/dynamic` with `ssr: false` and a loading placeholder.
  - Reduces initial JS for the class room; whiteboard and video code load only when the page is opened.
- **Other heavy UI** (e.g. AI whiteboard on student pages) can be wrapped in `dynamic(..., { ssr: false })` in the same way.

#### Image optimization
- **`next.config.mjs`**:
  - `images.remotePatterns` set to allow `https://**` and `http://localhost/**` so `next/image` can optimize remote images.
- Use **`<Image>`** from `next/image` for all user-facing images so Next.js can serve WebP/AVIF and responsive sizes where supported.

#### Font optimization
- **Root layout** already uses `next/font/local` (Geist VF) with variable weight. No change.
- For **Chinese subsetting**: consider a subsetted font (e.g. only required glyphs) or a second font file for CJK; document in deployment/design if added later.

#### Critical CSS
- Next.js and Tailwind handle critical CSS (e.g. used styles inlined). No additional extraction step was added.

#### Package import optimization
- **`next.config.mjs`**:
  - `experimental.optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion']` so only used exports are bundled (smaller bundles, faster HMR).

### Files touched
- `next.config.mjs` — images, `optimizePackageImports`
- `src/app/class/[roomId]/page.tsx` — dynamic import of `EnhancedWhiteboard`, `VideoContainer`

---

## 7.2 Backend Performance

### Targets
| Metric             | Current | Target  | Status        |
|--------------------|---------|---------|---------------|
| API Response Time  | ~200ms  | <100ms  | ⚠️ Needs Work |
| AI Response Time   | ~3s     | <2s     | ⚠️ Needs Work |
| Concurrent Users   | ~100    | 1000+   | ⚠️ Needs Work |

### Implemented

#### Redis caching for frequent queries
- **Existing** (from 5.3): `src/lib/db/index.ts` exposes `cache` (Redis with in-memory fallback), `cache.get`, `cache.set`, `cache.getOrSet`, `cache.delete`, `cache.invalidatePattern`.
- **New usage:**
  - **GET /api/content**: response cached with key `content:list:{userId}`, TTL 60s. Cache is used for listing; progress is still correct because TTL is short.
  - **GET /api/curriculum**: response cached with key `curriculum:list:{userId}:{filter}`, TTL 120s.

#### Database query optimization
- **N+1 removed:**
  - **GET /api/content**: content list fetched once; progress for all content IDs fetched in one `contentProgress.findMany`; results merged in memory. No per-item progress query.
  - **GET /api/curriculum**: curriculum list fetched once; progress for all curriculum IDs in one `curriculumProgress.findMany`; lesson counts per curriculum from one `curriculumModule.findMany` with `_count: { lessons }`, then aggregated by `curriculumId` in JS. No per-curriculum progress or lesson-count queries.

#### AI response streaming
- **Existing**: `streamWithFallback` in `src/lib/ai/orchestrator.ts` yields chunks. Chat UI can call a streaming endpoint that uses it; orchestrator already supports streaming entry point.

#### WebSocket connection pooling
- **Documentation / infra**: For 50 students per clinic, a single Socket.io server can handle many connections. “Pooling” across multiple server instances is done at the load balancer (sticky sessions or adapter like Redis adapter for Socket.io). No app-code change; document sticky sessions or Redis adapter when scaling.

#### Load balancer configuration
- **Documentation**: For 1000+ concurrent users, run multiple Next.js instances behind a load balancer; use `DATABASE_READ_REPLICA_URL` and PgBouncer as in 5.3. No code changes; deployment/ops doc should describe LB + replica + pool.

### Files touched
- `src/app/api/content/route.ts` — cache + batch progress query
- `src/app/api/curriculum/route.ts` — cache + batch progress and lesson-count queries

---

## 7.3 AI Performance

### Implemented

#### Response caching
- **`src/lib/ai/orchestrator.ts`**:
  - **Generate**: `generateWithFallback` uses a cache key from SHA-256 of the prompt (`ai:resp:{hash}`). On cache hit, returns stored result; on miss, calls provider and stores result with TTL 300s (5 min). Optional `options.skipCache` to bypass.
  - **Chat**: `chatWithFallback` uses a cache key from SHA-256 of the message array (`ai:resp:chat:{hash}`). Same get/set/skipCache behavior and TTL.
  - Backed by existing `cache` from `@/lib/db` (Redis or in-memory).

#### Batch processing
- **Not implemented** in this pass. Could be added later (e.g. queue similar prompts and call provider once per batch). Document as future improvement.

#### Provider optimization
- **Existing**: Fallback chain (Ollama → Kimi → Zhipu) and timeouts already reduce latency when a provider is slow or down. No change.

#### Model quantization
- **Infra / Ollama**: Handled by how Ollama models are run (e.g. quantized models). No app code.

### Files touched
- `src/lib/ai/orchestrator.ts` — cache key helpers, cache get/set in `generateWithFallback` and `chatWithFallback`, `skipCache` option

---

## Summary of Code and Config Changes

| Area              | Change |
|-------------------|--------|
| Next.js config    | `images.remotePatterns`, `experimental.optimizePackageImports` |
| Class room page   | Dynamic import of `EnhancedWhiteboard`, `VideoContainer` |
| Content API       | `cache.getOrSet` for list, single batch query for progress |
| Curriculum API    | `cache.getOrSet` for list, batch progress + batch lesson counts |
| AI orchestrator   | Response cache for generate and chat (5 min TTL), `skipCache` option |

---

## Environment / Infra

- **Redis** (`REDIS_URL`): Used for cache (and existing 5.3 behavior). Needed for multi-instance cache and AI response cache.
- **Database**: Existing connection pooling and read-replica support (5.3) remain the basis for backend scale.
- **Load balancer**: For 1000+ users, document sticky sessions (or Socket.io Redis adapter) and read replicas in deployment docs.

---

## Optional Next Steps

1. **Frontend**: Add more lazy boundaries (e.g. AI whiteboard, heavy charts) and measure FCP/TTI and bundle size.
2. **Backend**: Add caching to more read-heavy APIs (e.g. curriculum detail, reports) with appropriate TTLs and invalidation.
3. **AI**: Expose a streaming chat API that uses `streamWithFallback` and wire the client to it for faster perceived latency.
4. **AI**: Implement batch processing for similar prompts if usage patterns justify it.
