;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e9a7cfe2-c864-7ac9-74f8-dcf215cf376c")}catch(e){}}();
module.exports=[902157,(e,t,r)=>{t.exports=e.x("node:fs",()=>require("node:fs"))},750227,(e,t,r)=>{t.exports=e.x("node:path",()=>require("node:path"))},450869,e=>{"use strict";let t="tutorme:query:",r=null,n=null,a=!1,i=!(void 0!==globalThis.EdgeRuntime||"u">typeof process&&0);function s(){return i?(n||(n=new Map),n):null}async function o(){if(!i)return null;if(a)return r;try{let t=process.env.REDIS_URL;if(!t)return console.log("[DB] Redis URL not configured, using in-memory cache"),a=!0,null;let{Redis:n}=await e.A(443460);return(r=new n(t,{retryStrategy:e=>Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("error",e=>{console.error("[Redis] Connection error:",e),r=null}),console.log("[DB] Redis cache initialized"),a=!0,r}catch(e){return console.warn("[DB] Failed to initialize Redis, using in-memory cache"),a=!0,null}}if(i)try{let{drizzleDb:t}=e.r(738597);console.log("[DB] Drizzle client (default db) initialized")}catch(e){console.error("[DB] Failed to initialize Drizzle:",e)}e.s(["cache",0,{ensureRedis:async()=>i?(a||await o(),r):null,async get(e){if(!i)return null;let r=t+e,n=await this.ensureRedis();if(n)try{let e=await n.get(r);if(e)return JSON.parse(e)}catch(e){console.error("[Cache] Redis get error:",e)}let a=s();if(!a)return null;let o=a.get(r);return o&&o.expires>Date.now()?o.data:(a.delete(r),null)},async set(e,r,n=60){if(!i)return;let a=t+e,o=await this.ensureRedis();if(o)try{await o.setex(a,n,JSON.stringify(r));return}catch(e){console.error("[Cache] Redis set error:",e)}let l=s();l&&l.set(a,{data:r,expires:Date.now()+1e3*n})},async delete(e){if(!i)return;let r=t+e,n=await this.ensureRedis();if(n)try{await n.del(r)}catch(e){console.error("[Cache] Redis del error:",e)}let a=s();a&&a.delete(r)},async clear(){if(!i)return;let e=await this.ensureRedis();if(e)try{let r=await e.keys(t+"*");r.length>0&&await e.del(...r)}catch(e){console.error("[Cache] Redis clear error:",e)}let r=s();r&&r.clear()},async getOrSet(e,t,r=60){let n=await this.get(e);if(null!==n)return n;let a=await t();return await this.set(e,a,r),a},async invalidatePattern(e){if(!i)return;let r=await this.ensureRedis();if(r)try{let n=await r.keys(t+e);n.length>0&&await r.del(...n)}catch(e){console.error("[Cache] Pattern invalidation error:",e)}let n=s();if(n){let r=new RegExp(t+e.replace("*",".*"));for(let e of n.keys())r.test(e)&&n.delete(e)}}}])},892842,e=>{"use strict";e.s(["convertToEditablePrompt",0,e=>{let t="zh-CN"===e.language||"zh-TW"===e.language?"zh":"en",r="curriculum"===e.type?"curriculum/syllabus":"teaching notes";return"zh"===t?`将以下上传的${"curriculum"===e.type?"课程/大纲":"笔记"}内容整理成结构清晰、易于编辑的文本。保留所有重要信息，用标题、列表和段落组织好。不要添加课程表或课时，只整理内容。输出纯文本。

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
}`])},742335,e=>{"use strict";let t=new Map,r=new Map,n=new Map,a=new Map,i="student-1";t.set(i,{id:i,name:"Sarah Chen",age:16,level:"B1",learningStyle:"visual",interests:["music","technology","travel"],goals:["improve_pronunciation","vocabulary_expansion"],preferredVoice:{gender:"female",accent:"us"}}),r.set(i,{currentMood:"neutral",energyLevel:80,recentStruggles:[],masteredTopics:["present_perfect","basic_greetings"],activeTopics:["conditionals","phrasal_verbs"]}),n.set(i,[]);class s{static async getStudentContext(e){let a=t.get(e);return a?{profile:a,state:r.get(e)||this.getInitialState(),signals:(n.get(e)||[]).filter(e=>!e.expiresAt||e.expiresAt>Date.now())}:null}static appendTranscript(e,t){let r=a.get(e)||[];a.set(e,[...r,t])}static getTranscript(e){return a.get(e)||[]}static async recordSignal(e,t){let r={...t,id:Math.random().toString(36).substring(7),timestamp:Date.now()},a=n.get(e)||[];n.set(e,[...a,r]),"struggle_detected"===t.type&&await this.updateState(e,e=>(e.recentStruggles.push({topic:t.context?.topic||"unknown",errorType:t.context?.errorType||"general",severity:t.context?.severity||5,detectedAt:Date.now()}),e.recentStruggles.length>5&&e.recentStruggles.shift(),e))}static async updateState(e,t){let n=t({...r.get(e)||this.getInitialState()});r.set(e,n)}static getInitialState(){return{currentMood:"neutral",energyLevel:100,recentStruggles:[],masteredTopics:[],activeTopics:[]}}static async processClassSummary(e,t){await this.recordSignal(e,{source:"classroom_ta",type:"topic_requested",content:`Completed class on ${t.topic}. Status: ${t.status}`,context:t}),await this.updateState(e,e=>(t.struggles&&Array.isArray(t.struggles)&&t.struggles.forEach(t=>{e.recentStruggles.push({topic:t,errorType:"general",severity:7,detectedAt:Date.now()})}),t.topic&&!e.activeTopics.includes(t.topic)&&e.activeTopics.push(t.topic),e))}static async recordQuizResult(e,t){let r=t.score/t.maxScore;await this.recordSignal(e,{source:"personal_tutor",type:r>=.7?"mastery_achieved":"struggle_detected",content:`Quiz on ${t.topic}: ${t.score}/${t.maxScore} (${Math.round(100*r)}%)`,context:t}),await this.updateState(e,e=>(r<.7?(!e.recentStruggles.find(e=>e.topic===t.topic)&&(e.recentStruggles.push({topic:t.topic,errorType:"general",severity:Math.round((1-r)*10),detectedAt:Date.now()}),e.recentStruggles.length>10&&e.recentStruggles.shift()),e.activeTopics.includes(t.topic)||e.activeTopics.push(t.topic)):r>=.85&&(e.masteredTopics.includes(t.topic)||e.masteredTopics.push(t.topic),e.recentStruggles=e.recentStruggles.filter(e=>e.topic!==t.topic)),e))}}e.s(["MemoryService",()=>s])},3821,e=>e.a(async(t,r)=>{try{var n=e.i(620971),a=e.i(384030),i=e.i(748846),s=e.i(892842),o=e.i(742335),l=t([a]);[a]=l.then?(await l)():l;let c=(0,a.withCsrf)((0,a.withAuth)(async(e,t)=>{let r,l,{question:c,rubric:u,studentAnswer:d,maxScore:p=100}=await e.json();if(!c||!d)throw new a.ValidationError("Question and answer are required");let g=!1;try{let e=await o.MemoryService.getStudentContext(t.user.id);e?(r=(0,s.personalizedGradingPrompt)({question:c,rubric:u||"Grade based on correctness and completeness",studentAnswer:d,maxScore:p,studentContext:{recentStruggles:e.state.recentStruggles,masteredTopics:e.state.masteredTopics,learningStyle:e.profile.learningStyle,currentMood:e.state.currentMood}}),g=!0):r=(0,s.gradingPrompt)({question:c,rubric:u||"Grade based on correctness and completeness",studentAnswer:d,maxScore:p})}catch(e){console.warn("Failed to fetch student context, using generic grading:",e),r=(0,s.gradingPrompt)({question:c,rubric:u||"Grade based on correctness and completeness",studentAnswer:d,maxScore:p})}let h=await (0,i.generateWithFallback)(r,{temperature:.3,maxTokens:800});try{let e=h.content.match(/\{[\s\S]*\}/);if(e)l=JSON.parse(e[0]);else throw Error("No JSON found in response")}catch{l={score:50,confidence:.5,feedback:"Your answer has been recorded.",explanation:"Automatic grading failed, will be reviewed manually.",nextSteps:[],relatedStruggles:[]}}if(void 0!==l.score)try{await o.MemoryService.recordQuizResult(t.user.id,{topic:c,score:l.score,maxScore:p,questionTypes:["short_answer"]})}catch(e){console.warn("Failed to update student context after quiz:",e)}return n.NextResponse.json({score:l.score,confidence:l.confidence,feedback:l.feedback,explanation:l.explanation,nextSteps:l.nextSteps||[],relatedStruggles:l.relatedStruggles||[],isPersonalized:g,provider:h.provider})},{role:"STUDENT"}));e.s(["POST",0,c]),r()}catch(e){r(e)}},!1),99787,e=>e.a(async(t,r)=>{try{var n=e.i(78315),a=e.i(586961),i=e.i(196657),s=e.i(899733),o=e.i(233979),l=e.i(631683),c=e.i(840960),u=e.i(711373),d=e.i(699699),p=e.i(521140),g=e.i(205260),h=e.i(500249),m=e.i(431740),f=e.i(82608),y=e.i(635207),w=e.i(193695);e.i(708038);var x=e.i(447430),S=e.i(3821),v=t([S]);[S]=v.then?(await v)():v;let $=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/quiz/grade/route",pathname:"/api/quiz/grade",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/quiz/grade/route.ts",nextConfigOutput:"",userland:S}),{workAsyncStorage:T,workUnitAsyncStorage:C,serverHooks:A}=$;function R(){return(0,i.patchFetch)({workAsyncStorage:T,workUnitAsyncStorage:C})}async function b(e,t,r){$.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/quiz/grade/route";n=n.replace(/\/index$/,"")||"/";let i=await $.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!i)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:S,params:v,nextConfig:R,parsedUrl:b,isDraftMode:T,prerenderManifest:C,routerServerContext:A,isOnDemandRevalidate:_,revalidateOnlyGenerated:E,resolvedPathname:M,clientReferenceManifest:P,serverActionsManifest:k}=i,q=(0,c.normalizeAppPath)(n),N=!!(C.dynamicRoutes[q]||C.routes[M]),O=async()=>((null==A?void 0:A.render404)?await A.render404(e,t,b,!1):t.end("This page could not be found"),null);if(N&&!T){let e=!!C.routes[M],t=C.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(R.experimental.adapterPath)return await O();throw new w.NoFallbackError}}let z=null;!N||$.isDev||T||(z=M,z="/index"===z?"/":z);let D=!0===$.isDev||!N,I=N&&!D;k&&P&&(0,l.setManifestsSingleton)({page:n,clientReferenceManifest:P,serverActionsManifest:k});let j=e.method||"GET",U=(0,o.getTracer)(),L=U.getActiveScopeSpan(),F={params:v,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:D,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:R.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>$.onRequestError(e,t,n,a,A)},sharedContext:{buildId:S}},H=new u.NodeNextRequest(e),B=new u.NodeNextResponse(t),Q=d.NextRequestAdapter.fromNodeNextRequest(H,(0,d.signalFromNodeResponse)(t));try{let i=async e=>$.handle(Q,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=U.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${j} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${j} ${n}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),c=async s=>{var o,c;let u=async({previousCacheEntry:a})=>{try{if(!l&&_&&E&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await i(s);e.fetchMetrics=F.renderOpts.fetchMetrics;let o=F.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let c=F.renderOpts.collectedTags;if(!N)return await (0,h.sendResponse)(H,B,n,F.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(n.headers);c&&(t[y.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=y.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,a=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=y.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:x.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==a?void 0:a.isStale)&&await $.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,g.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:_})},!1,A),t}},d=await $.handleResponse({req:e,nextConfig:R,cacheKey:z,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:_,revalidateOnlyGenerated:E,responseGenerator:u,waitUntil:r.waitUntil,isMinimalMode:l});if(!N)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==x.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(c=d.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",_?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),T&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,m.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&N||p.delete(y.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,h.sendResponse)(H,B,new Response(d.value.body,{headers:p,status:d.value.status||200})),null};L?await c(L):await U.withPropagatedContext(e.headers,()=>U.trace(p.BaseServerSpan.handleRequest,{spanName:`${j} ${n}`,kind:o.SpanKind.SERVER,attributes:{"http.method":j,"http.target":e.url}},c))}catch(t){if(t instanceof w.NoFallbackError||await $.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,g.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:_})},!1,A),N)throw t;return await (0,h.sendResponse)(H,B,new Response(null,{status:500})),null}}e.s(["handler",()=>b,"patchFetch",()=>R,"routeModule",()=>$,"serverHooks",()=>A,"workAsyncStorage",()=>T,"workUnitAsyncStorage",()=>C]),r()}catch(e){r(e)}},!1),412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))}];

//# debugId=e9a7cfe2-c864-7ac9-74f8-dcf215cf376c
//# sourceMappingURL=%5Broot-of-the-server%5D__f947ce9b._.js.map