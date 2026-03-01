;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="75c54559-7204-6f0a-81f8-7b5f1e1a621a")}catch(e){}}();
module.exports=[902157,(e,t,r)=>{t.exports=e.x("node:fs",()=>require("node:fs"))},750227,(e,t,r)=>{t.exports=e.x("node:path",()=>require("node:path"))},450869,e=>{"use strict";let t="tutorme:query:",r=null,n=null,i=!1,a=!(void 0!==globalThis.EdgeRuntime||"u">typeof process&&0);function s(){return a?(n||(n=new Map),n):null}async function o(){if(!a)return null;if(i)return r;try{let t=process.env.REDIS_URL;if(!t)return console.log("[DB] Redis URL not configured, using in-memory cache"),i=!0,null;let{Redis:n}=await e.A(443460);return(r=new n(t,{retryStrategy:e=>Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("error",e=>{console.error("[Redis] Connection error:",e),r=null}),console.log("[DB] Redis cache initialized"),i=!0,r}catch(e){return console.warn("[DB] Failed to initialize Redis, using in-memory cache"),i=!0,null}}if(a)try{let{drizzleDb:t}=e.r(738597);console.log("[DB] Drizzle client (default db) initialized")}catch(e){console.error("[DB] Failed to initialize Drizzle:",e)}e.s(["cache",0,{ensureRedis:async()=>a?(i||await o(),r):null,async get(e){if(!a)return null;let r=t+e,n=await this.ensureRedis();if(n)try{let e=await n.get(r);if(e)return JSON.parse(e)}catch(e){console.error("[Cache] Redis get error:",e)}let i=s();if(!i)return null;let o=i.get(r);return o&&o.expires>Date.now()?o.data:(i.delete(r),null)},async set(e,r,n=60){if(!a)return;let i=t+e,o=await this.ensureRedis();if(o)try{await o.setex(i,n,JSON.stringify(r));return}catch(e){console.error("[Cache] Redis set error:",e)}let l=s();l&&l.set(i,{data:r,expires:Date.now()+1e3*n})},async delete(e){if(!a)return;let r=t+e,n=await this.ensureRedis();if(n)try{await n.del(r)}catch(e){console.error("[Cache] Redis del error:",e)}let i=s();i&&i.delete(r)},async clear(){if(!a)return;let e=await this.ensureRedis();if(e)try{let r=await e.keys(t+"*");r.length>0&&await e.del(...r)}catch(e){console.error("[Cache] Redis clear error:",e)}let r=s();r&&r.clear()},async getOrSet(e,t,r=60){let n=await this.get(e);if(null!==n)return n;let i=await t();return await this.set(e,i,r),i},async invalidatePattern(e){if(!a)return;let r=await this.ensureRedis();if(r)try{let n=await r.keys(t+e);n.length>0&&await r.del(...n)}catch(e){console.error("[Cache] Pattern invalidation error:",e)}let n=s();if(n){let r=new RegExp(t+e.replace("*",".*"));for(let e of n.keys())r.test(e)&&n.delete(e)}}}])},892842,e=>{"use strict";e.s(["convertToEditablePrompt",0,e=>{let t="zh-CN"===e.language||"zh-TW"===e.language?"zh":"en",r="curriculum"===e.type?"curriculum/syllabus":"teaching notes";return"zh"===t?`将以下上传的${"curriculum"===e.type?"课程/大纲":"笔记"}内容整理成结构清晰、易于编辑的文本。保留所有重要信息，用标题、列表和段落组织好。不要添加课程表或课时，只整理内容。输出纯文本。

上传内容：
${e.rawText.slice(0,12e3)}`:`Convert the following uploaded ${r} into a clean, well-structured editable text. Keep all important information. Use headings, lists, and paragraphs. Do not add a schedule or lesson lengths—only structure the content. Output plain text only.

Uploaded content:
${e.rawText.slice(0,12e3)}`},"convertTopicsToEditablePrompt",0,e=>"zh"==("zh-CN"===e.language||"zh-TW"===e.language?"zh":"en")?`用户上传了一个主题列表。请将其扩展为可编辑的“主题编辑”文本：每个主题占一段或一个小节，包含简短说明（1-2句），方便老师后续编辑。保持顺序，输出纯文本。

主题列表：
${e.topicsListText.slice(0,8e3)}`:`The user uploaded a list of topics. Expand it into editable "Edit Topics" text: each topic as a short section with a 1-2 sentence description, so the tutor can edit later. Keep the order. Output plain text only.

Topics list:
${e.topicsListText.slice(0,8e3)}`,"courseDescriptionFromSubjectPrompt",0,e=>{let t=e.subject||"this subject",r=e.gradeLevel||"all levels",n=e.difficulty||"intermediate";return`Write a short, engaging course description (1–3 sentences) for a ${t} course. Target audience: ${r}, ${n} level. Describe what students will learn and the course focus. Output only the description text, no labels or quotes.`},"courseOutlineAsModulesPrompt",0,e=>{let t="zh-CN"===e.language||"zh-TW"===e.language?"zh":"en",r=e.typicalLessonMinutes??45,n=(e.notesText?`${e.curriculumText}

--- Notes ---
${e.notesText}`:e.curriculumText).slice(0,12e3);return"zh"===t?`根据以下课程/大纲内容，生成模块化课程提纲。要求：
- 输出仅为一个JSON数组，每个元素是一个模块（module），无其他文字。
- 每个模块包含：title（模块标题）、description（可选，简短描述）、notes（可选，备注）、tasks（可选，数组，每项为 { "title": "任务名" }）、lessons（必填，数组，每项为一节课，格式 { "title": "课标题", "durationMinutes": ${r} }）。
- 每节课对应一节课时（约${r}分钟），不要合并多节课到一项。
格式示例：
[{"title":"模块1","description":"...","notes":"...","tasks":[{"title":"任务1"}],"lessons":[{"title":"第1课","durationMinutes":${r}}]},{"title":"模块2","lessons":[{"title":"第2课","durationMinutes":${r}}]}]

课程/大纲内容：
${n}`:`From the following curriculum/syllabus content, generate a module-based course outline. Requirements:
- Output only a JSON array; each element is a module. No other text.
- Each module has: title (string), description (optional), notes (optional), tasks (optional array of { "title": "task name" }), lessons (required array of { "title": "lesson title", "durationMinutes": ${r} }).
- Each lesson is one typical class (${r} minutes). Do not merge multiple lessons into one item.
Example format:
[{"title":"Module 1","description":"...","notes":"...","tasks":[{"title":"Task 1"}],"lessons":[{"title":"Lesson 1","durationMinutes":${r}}]},{"title":"Module 2","lessons":[{"title":"Lesson 2","durationMinutes":${r}}]}]

Curriculum content:
${n}`},"courseOutlineFromCurriculumPrompt",0,e=>{let t="zh-CN"===e.language||"zh-TW"===e.language?"zh":"en",r=e.typicalLessonMinutes??45;return"zh"===t?`根据以下课程/大纲内容，生成详细的课程提纲。要求：每个提纲项对应一节课（约${r}分钟）可完成的内容，不要合并多节课到一个项。输出仅为一个JSON数组，无其他文字，格式：
[{"title":"第1课标题","durationMinutes":${r}},{"title":"第2课标题","durationMinutes":${r}}]

课程/大纲内容：
${e.curriculumText.slice(0,12e3)}`:`From the following curriculum/syllabus content, generate a detailed course outline. Each outline item must be completable in one typical lesson (${r} minutes). Do not merge multiple lessons into one item. Output only a JSON array, no other text. Format:
[{"title":"Lesson 1 title","durationMinutes":${r}},{"title":"Lesson 2 title","durationMinutes":${r}}]

Curriculum content:
${e.curriculumText.slice(0,12e3)}`},"gradingPrompt",0,e=>"zh"===(e.language||"zh")?`请根据评分标准为学生的答案打分。

题目：${e.question}

评分标准：${e.rubric}

学生答案：${e.studentAnswer}

满分：${e.maxScore}

请返回JSON格式：
{
  "score": 分数（0-${e.maxScore}）,
  "confidence": 置信度（0-1）,
  "feedback": "给学生的简要反馈",
  "explanation": "评分解释"
}`:`Please grade the student's answer based on the rubric.

Question: ${e.question}

Rubric: ${e.rubric}

Student Answer: ${e.studentAnswer}

Max Score: ${e.maxScore}

Return JSON:
{
  "score": number (0-${e.maxScore}),
  "confidence": number (0-1),
  "feedback": "Brief feedback for student",
  "explanation": "Explanation of grading"
}`,"personalizedGradingPrompt",0,e=>{let t=e.language||"zh",r=e.studentContext,n=r?`

Student Context:
- Recent struggles: ${r.recentStruggles.map(e=>e.topic).join(", ")||"none"}
- Mastered topics: ${r.masteredTopics.join(", ")||"none"}
- Learning style: ${r.learningStyle}
- Current mood: ${r.currentMood}`:"";return"zh"===t?`根据评分标准为学生的答案打分，并提供个性化反馈。
${n}

题目：${e.question}

评分标准：${e.rubric}

学生答案：${e.studentAnswer}

满分：${e.maxScore}

请提供个性化反馈：
1. 如果学生在相关主题上有历史困难，在解释中明确引用
2. 根据学生的学习风格调整解释（视觉型：使用图表/图像类比；听觉型：使用声音/节奏类比；阅读型：提供详细文字说明；动觉型：使用实际操作例子）
3. 根据当前情绪调整语气（挫折时更鼓励；中性时标准反馈；参与时挑战性更强）
4. 提供1-2个具体的下一步建议（如"复习X视频2:15处"或"练习资产库中的类似问题"）

返回JSON格式：
{
  "score": 分数（0-${e.maxScore}）,
  "confidence": 置信度（0-1）,
  "feedback": "个性化的简短反馈，引用学生的学习历史",
  "explanation": "详细的评分解释，适应学习风格",
  "nextSteps": ["具体建议1", "具体建议2"],
  "relatedStruggles": ["相关的历史困难主题"]
}`:`Please grade the student's answer based on the rubric and provide personalized feedback.
${n}

Question: ${e.question}

Rubric: ${e.rubric}

Student Answer: ${e.studentAnswer}

Max Score: ${e.maxScore}

Provide personalized feedback:
1. If student has historical struggles with related topics, explicitly reference them in explanation
2. Adjust explanation based on learning style (visual: use diagrams/image analogies; auditory: use sound/rhythm analogies; reading: provide detailed text; kinesthetic: use hands-on examples)
3. Adjust tone based on current mood (frustrated: more encouraging; neutral: standard; engaged: more challenging)
4. Provide 1-2 specific next steps (e.g., "Review X video at 2:15" or "Practice similar problems in Assets > Topic")

Return JSON:
{
  "score": number (0-${e.maxScore}),
  "confidence": number (0-1),
  "feedback": "Personalized brief feedback referencing student's history",
  "explanation": "Detailed grading explanation adapted to learning style",
  "nextSteps": ["Specific suggestion 1", "Specific suggestion 2"],
  "relatedStruggles": ["Related historical struggle topics"]
}`},"quizGeneratorPrompt",0,e=>"zh"===(e.language||"zh")?`基于以下视频内容生成3道题目：

视频内容：${e.transcript}

学生信息：
- 年级：${e.grade}
- 薄弱领域：${e.weakAreas.join("、")}
- 前置知识：${e.prereq||"基础概念"}

请生成：
Q1: 基础回忆题（选择题）
Q2: 应用题（简答题，可AI评分）
Q3: 挑战题（结合前置知识）

请返回有效的JSON格式：
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "题目内容",
      "options": ["选项A", "选项B", "选项C", "选项D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "题目内容",
      "rubric": "评分标准"
    },
    {
      "type": "short_answer",
      "question": "题目内容",
      "rubric": "评分标准"
    }
  ]
}`:`Generate 3 questions based on the following video content:

Video content: ${e.transcript}

Student info:
- Grade: ${e.grade}
- Weak areas: ${e.weakAreas.join(", ")}
- Prerequisite: ${e.prereq||"fundamental concepts"}

Generate:
Q1: Basic recall (multiple choice)
Q2: Application (short answer, AI-gradable)
Q3: Challenge (connects to prerequisite)

Return valid JSON:
{
  "questions": [
    {
      "type": "multiple_choice",
      "question": "Question text",
      "options": ["A", "B", "C", "D"],
      "answer": "A"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    },
    {
      "type": "short_answer",
      "question": "Question text",
      "rubric": "Grading criteria"
    }
  ]
}`])},999847,e=>e.a(async(t,r)=>{try{var n=e.i(620971),i=e.i(384030),a=e.i(748846),s=e.i(892842),o=t([i]);[i]=o.then?(await o)():o;let l=(0,i.withCsrf)((0,i.withAuth)(async e=>{let t,{transcript:r,grade:o=8,weakAreas:l=[]}=await e.json();if(!r)throw new i.ValidationError("Transcript is required");let u=(0,s.quizGeneratorPrompt)({transcript:r,grade:o,weakAreas:l,subject:"general"}),c=await (0,a.generateWithFallback)(u,{temperature:.7,maxTokens:1500});try{let e=c.content.match(/\{[\s\S]*\}/);if(e)t=JSON.parse(e[0]).questions;else throw Error("No JSON found in response")}catch(e){return console.error("Failed to parse quiz JSON:",e),n.NextResponse.json({error:"AI response format invalid. Please retry.",provider:c.provider},{status:502})}return n.NextResponse.json({questions:t,provider:c.provider})},{role:"STUDENT"}));e.s(["POST",0,l]),r()}catch(e){r(e)}},!1),985829,e=>e.a(async(t,r)=>{try{var n=e.i(78315),i=e.i(586961),a=e.i(196657),s=e.i(899733),o=e.i(233979),l=e.i(631683),u=e.i(840960),c=e.i(711373),d=e.i(699699),p=e.i(521140),h=e.i(205260),g=e.i(500249),m=e.i(431740),f=e.i(82608),w=e.i(635207),y=e.i(193695);e.i(708038);var x=e.i(447430),R=e.i(999847),v=t([R]);[R]=v.then?(await v)():v;let S=new n.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/quiz/generate/route",pathname:"/api/quiz/generate",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/quiz/generate/route.ts",nextConfigOutput:"",userland:R}),{workAsyncStorage:E,workUnitAsyncStorage:C,serverHooks:T}=S;function b(){return(0,a.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:C})}async function $(e,t,r){S.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/quiz/generate/route";n=n.replace(/\/index$/,"")||"/";let a=await S.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!a)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:R,params:v,nextConfig:b,parsedUrl:$,isDraftMode:E,prerenderManifest:C,routerServerContext:T,isOnDemandRevalidate:A,revalidateOnlyGenerated:_,resolvedPathname:P,clientReferenceManifest:N,serverActionsManifest:q}=a,O=(0,u.normalizeAppPath)(n),k=!!(C.dynamicRoutes[O]||C.routes[P]),z=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,$,!1):t.end("This page could not be found"),null);if(k&&!E){let e=!!C.routes[P],t=C.dynamicRoutes[O];if(t&&!1===t.fallback&&!e){if(b.experimental.adapterPath)return await z();throw new y.NoFallbackError}}let M=null;!k||S.isDev||E||(M=P,M="/index"===M?"/":M);let D=!0===S.isDev||!k,j=k&&!D;q&&N&&(0,l.setManifestsSingleton)({page:n,clientReferenceManifest:N,serverActionsManifest:q});let U=e.method||"GET",I=(0,o.getTracer)(),F=I.getActiveScopeSpan(),H={params:v,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!b.experimental.authInterrupts},cacheComponents:!!b.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:b.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,i)=>S.onRequestError(e,t,n,i,T)},sharedContext:{buildId:R}},L=new c.NodeNextRequest(e),J=new c.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(L,(0,d.signalFromNodeResponse)(t));try{let a=async e=>S.handle(B,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=I.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let t=`${U} ${i}`;e.setAttributes({"next.route":i,"http.route":i,"next.span_name":t}),e.updateName(t)}else e.updateName(`${U} ${n}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),u=async s=>{var o,u;let c=async({previousCacheEntry:i})=>{try{if(!l&&A&&_&&!i)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await a(s);e.fetchMetrics=H.renderOpts.fetchMetrics;let o=H.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let u=H.renderOpts.collectedTags;if(!k)return await (0,g.sendResponse)(L,J,n,H.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(n.headers);u&&(t[w.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=w.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,i=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=w.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==i?void 0:i.isStale)&&await S.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:A})},!1,T),t}},d=await S.handleResponse({req:e,nextConfig:b,cacheKey:M,routeKind:i.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:A,revalidateOnlyGenerated:_,responseGenerator:c,waitUntil:r.waitUntil,isMinimalMode:l});if(!k)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(u=d.value)?void 0:u.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",A?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,m.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&k||p.delete(w.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,g.sendResponse)(L,J,new Response(d.value.body,{headers:p,status:d.value.status||200})),null};F?await u(F):await I.withPropagatedContext(e.headers,()=>I.trace(p.BaseServerSpan.handleRequest,{spanName:`${U} ${n}`,kind:o.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},u))}catch(t){if(t instanceof y.NoFallbackError||await S.onRequestError(e,t,{routerKind:"App Router",routePath:O,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:A})},!1,T),k)throw t;return await (0,g.sendResponse)(L,J,new Response(null,{status:500})),null}}e.s(["handler",()=>$,"patchFetch",()=>b,"routeModule",()=>S,"serverHooks",()=>T,"workAsyncStorage",()=>E,"workUnitAsyncStorage",()=>C]),r()}catch(e){r(e)}},!1),412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))}];

//# debugId=75c54559-7204-6f0a-81f8-7b5f1e1a621a
//# sourceMappingURL=%5Broot-of-the-server%5D__96497bad._.js.map