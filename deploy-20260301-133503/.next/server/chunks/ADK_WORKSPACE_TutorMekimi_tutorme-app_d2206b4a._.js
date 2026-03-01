;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="222aad45-ceeb-fee2-6c42-5505786145e1")}catch(e){}}();
module.exports=[48084,e=>{"use strict";var t=e.i(292828);let a=`
Subject: English Language Arts
Key Areas: Grammar, Writing, Literature Analysis, Reading Comprehension

Common Student Challenges:
- Essay structure (thesis, introduction, body, conclusion)
- Grammar rules (punctuation, subject-verb agreement)
- Literary devices (metaphor, symbolism, theme)
- Evidence and analysis integration
- Transitions and flow

Teaching Approach:
- Use concrete examples from literature
- Practice with real writing samples
- Focus on process over perfection
- Build vocabulary in context
`,n={essay_basics:`
Topic: Essay Writing Basics
Key Concepts:
- Thesis statement: Arguable claim that guides the essay
- Introduction: Hook + Context + Thesis
- Body paragraphs: Topic sentence + Evidence + Analysis
- Conclusion: Restate thesis + Synthesize points + Final thought

Common Mistakes:
- Thesis is too broad or factual (not arguable)
- Evidence without analysis ("quote dumping")
- Weak transitions between paragraphs
- Introduction of new ideas in conclusion
`,grammar_fundamentals:`
Topic: Grammar Fundamentals
Key Concepts:
- Parts of speech: noun, verb, adjective, adverb
- Sentence structure: subject + predicate
- Common errors: run-on sentences, fragments
- Punctuation: commas, semicolons, apostrophes

Teaching Tips:
- Use real-world examples
- Focus on patterns, not memorization
- Practice with student writing
`,literary_analysis:`
Topic: Literary Analysis
Key Concepts:
- Theme: Central message or insight
- Symbolism: Objects representing abstract ideas
- Character development: How characters change
- Evidence: Quotes support analysis

Analysis Formula:
1. Make a claim about the text
2. Provide evidence (quote)
3. Explain how evidence supports claim
4. Connect to larger meaning
`,thesis_development:`
Topic: Thesis Development
Key Concepts:
- Debatable: Reasonable people could disagree
- Specific: Focuses on particular aspect
- Supported: Can be proven with evidence
- Significant: Worth discussing

Formula:
[Topic] + [Claim/Position] + [Reasoning]
Example: "In 1984, Orwell uses Newspeak to demonstrate how language control enables totalitarian power."
`},o={socratic:`
English-Specific Socratic Approach:
- For grammar: "What rule applies here? What pattern do you see?"
- For writing: "What is your main point? How does this paragraph support it?"
- For literature: "What evidence supports your interpretation? What else could this symbol mean?"
- Use examples from well-known texts when possible
`,lesson:`
English Lesson Structure:
1. **Introduction**: Connect to a familiar text or real-world writing
2. **Key Concept**: Define with examples from literature
3. **Model**: Show expert example and annotate
4. **Guided Practice**: Student attempts with support
5. **Independent Practice**: Student applies skill
6. **Reflection**: What did you learn? How will you use this?
`},r=`
Subject: Mathematics
Key Areas: Algebra, Geometry, Calculus, Statistics, Problem Solving

Common Student Challenges:
- Understanding abstract concepts
- Applying formulas correctly
- Setting up word problems
- Showing work clearly
- Checking answers

Teaching Approach:
- Connect to visual representations
- Use real-world applications
- Emphasize process over speed
- Build number sense
`,i={algebra:`
Topic: Algebra
Key Concepts:
- Variables represent unknown quantities
- Equations maintain balance (what you do to one side, do to the other)
- Functions relate inputs to outputs
- Patterns and relationships

Problem-Solving Steps:
1. Read carefully and identify what's given
2. Define variables
3. Set up equation
4. Solve step by step
5. Check your answer
6. Interpret in context
`,geometry:`
Topic: Geometry
Key Concepts:
- Points, lines, planes
- Angles and their relationships
- Triangle properties
- Proof structure: Given → Show

Visualization:
- Draw diagrams
- Label known information
- Look for patterns
- Use coordinate systems when helpful
`,calculus:`
Topic: Calculus
Key Concepts:
- Limits: approaching values
- Derivatives: rates of change, slopes
- Integrals: accumulation, areas
- Fundamental Theorem connects them

Teaching Approach:
- Start with intuitive understanding
- Connect to physics/motion
- Use graphs extensively
- Build from limits to derivatives to integrals
`,problem_solving:`
Topic: Mathematical Problem Solving
Strategy: Polya's Method
1. **Understand**: What is being asked? What information is given?
2. **Plan**: What strategy applies? (Draw diagram, work backwards, make table, etc.)
3. **Execute**: Carry out the plan carefully
4. **Review**: Does the answer make sense? Can you verify?

Common Strategies:
- Draw a diagram
- Look for patterns
- Try simpler cases
- Work backwards
- Make a table or list
- Write an equation
`},s={socratic:`
Math-Specific Socratic Approach:
- "What operation do you think we need here?"
- "Let's check: does your answer make sense?"
- "What if we tried a simpler version first?"
- "Can you draw what this problem is describing?"
- "What do you notice about the pattern?"
- Guide through calculations step by step
`,lesson:`
Math Lesson Structure:
1. **Introduction**: Real-world problem or puzzle
2. **Concept**: Definition with visual representation
3. **Worked Example**: Complete solution with reasoning
4. **Guided Practice**: Student works with hints
5. **Independent Practice**: Similar problem
6. **Extension**: More challenging application
7. **Summary**: Key formula/concept to remember
`};e.i(120898);let c={english:{context:a,topics:n,modeAdjustments:o},math:{context:r,topics:i,modeAdjustments:s},mathematics:{context:r,topics:i,modeAdjustments:s}};function l(){return Object.entries(t.commonTeachingModes).map(([e,t])=>({key:e,name:t.name,description:t.description}))}function u(e,a,n,o){let r=c[e.toLowerCase()]||{context:`Subject: ${e}`,topics:{},modeAdjustments:{}},i=t.commonTeachingModes[a]||t.commonTeachingModes.socratic,s=(0,t.fillTemplate)(i.systemPrompt,o);return s+=`

## Subject Information
${r.context}`,n&&r.topics[n]&&(s+=`

## Current Topic
${r.topics[n]}`),r.modeAdjustments[a]&&(s+=`

## Teaching Guidance
${r.modeAdjustments[a]}`),{systemPrompt:s+=`

## Response Format
${i.responseFormat}`,useSocratic:i.useSocraticMethod}}e.s(["buildPrompt",()=>u,"getTeachingModes",()=>l],48084)},26972,e=>{"use strict";var t=e.i(748846),a=e.i(48084);async function n(e,n){var o;let r,i,s,c,{systemPrompt:l,useSocratic:u}=(0,a.buildPrompt)(n.subject,n.mode,n.topic||null,{teachingAge:n.teachingAge,voiceGender:n.voiceGender,voiceAccent:n.voiceAccent}),p=[{role:"system",content:l},...n.conversationHistory.slice(-6),{role:"user",content:e}],d=await (0,t.chatWithFallback)(p,{temperature:.7,maxTokens:800}),m=(o=d.content,r=[],(i=o.match(/(?:Formula:|\`)([^\`\n]+)(?:\`|\n)/g))&&i.forEach(e=>{let t=e.replace(/Formula:|\`/g,"").trim();t&&r.push({type:"formula",content:t})}),(s=o.match(/(?:Key Concept:|Definition:)[\s\n]+([^\n]+(?:\n(?!(?:Key Concept:|Definition:))[^\n]+)*)/gi))&&s.forEach(e=>{let t=e.replace(/Key Concept:|Definition:/gi,"").trim();t&&t.length<200&&r.push({type:"text",content:t})}),(c=o.match(/(?:Tip:|💡)[\s\n]*([^\n]+)/gi))&&c.forEach(e=>{let t=e.replace(/Tip:|💡/gi,"").trim();t&&r.push({type:"tip",content:t})}),r);return{message:d.content.trim(),mode:n.mode,isSocratic:u,whiteboardItems:m.length>0?m:void 0}}e.s(["generateModularResponse",()=>n])},908954,e=>e.a(async(t,a)=>{try{var n=e.i(620971),o=e.i(26972),r=e.i(48084),i=e.i(384030),s=e.i(841195),c=t([i]);[i]=c.then?(await c)():c;let p=new Map,d=s.z.object({message:s.z.string().min(1).max(2e3),subject:s.z.string().min(1).max(80),topic:s.z.string().max(120).nullable().optional(),mode:s.z.enum(["socratic","direct","hint"]).default("socratic"),teachingAge:s.z.number().int().min(5).max(100).default(15),voiceGender:s.z.enum(["female","male"]).default("female"),voiceAccent:s.z.string().max(32).default("US"),conversationId:s.z.string().max(128).optional()});async function l(e){try{let{response:t}=await (0,i.withRateLimitPreset)(e,"aiGenerate");if(t)return t;let a=await e.json().catch(()=>null),r=d.safeParse(a);if(!r.success)return n.NextResponse.json({error:"Invalid request body"},{status:400});let{message:s,subject:c,topic:l=null,mode:u,teachingAge:m,voiceGender:h,voiceAccent:g,conversationId:y}=r.data,w=y||`tutor-${c}-${Date.now()}`,v=p.get(w)||[],f=await (0,o.generateModularResponse)(s,{subject:c,topic:l,mode:u,teachingAge:m,voiceGender:h,voiceAccent:g,conversationHistory:v});if(v.push({role:"user",content:s}),v.push({role:"assistant",content:f.message}),v.length>10&&v.splice(0,v.length-10),p.set(w,v),p.size>500){let e=p.keys().next().value;e&&p.delete(e)}return n.NextResponse.json({success:!0,response:f.message,mode:f.mode,isSocratic:f.isSocratic,whiteboardItems:f.whiteboardItems,conversationId:w})}catch(e){return console.error("AI tutor error:",e),n.NextResponse.json({error:"Failed to get AI response",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function u(){let e=(0,r.getTeachingModes)();return n.NextResponse.json({modes:e,defaultMode:"socratic"})}e.s(["GET",()=>u,"POST",()=>l]),a()}catch(e){a(e)}},!1),995437,e=>e.a(async(t,a)=>{try{var n=e.i(78315),o=e.i(586961),r=e.i(196657),i=e.i(899733),s=e.i(233979),c=e.i(631683),l=e.i(840960),u=e.i(711373),p=e.i(699699),d=e.i(521140),m=e.i(205260),h=e.i(500249),g=e.i(431740),y=e.i(82608),w=e.i(635207),v=e.i(193695);e.i(708038);var f=e.i(447430),b=e.i(908954),C=t([b]);[b]=C.then?(await C)():C;let S=new n.AppRouteRouteModule({definition:{kind:o.RouteKind.APP_ROUTE,page:"/api/ai/tutor/route",pathname:"/api/ai/tutor",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/ai/tutor/route.ts",nextConfigOutput:"",userland:b}),{workAsyncStorage:E,workUnitAsyncStorage:A,serverHooks:T}=S;function R(){return(0,r.patchFetch)({workAsyncStorage:E,workUnitAsyncStorage:A})}async function x(e,t,a){S.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/ai/tutor/route";n=n.replace(/\/index$/,"")||"/";let r=await S.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!r)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:b,params:C,nextConfig:R,parsedUrl:x,isDraftMode:E,prerenderManifest:A,routerServerContext:T,isOnDemandRevalidate:P,revalidateOnlyGenerated:k,resolvedPathname:I,clientReferenceManifest:M,serverActionsManifest:j}=r,D=(0,l.normalizeAppPath)(n),N=!!(A.dynamicRoutes[D]||A.routes[I]),F=async()=>((null==T?void 0:T.render404)?await T.render404(e,t,x,!1):t.end("This page could not be found"),null);if(N&&!E){let e=!!A.routes[I],t=A.dynamicRoutes[D];if(t&&!1===t.fallback&&!e){if(R.experimental.adapterPath)return await F();throw new v.NoFallbackError}}let O=null;!N||S.isDev||E||(O=I,O="/index"===O?"/":O);let U=!0===S.isDev||!N,_=N&&!U;j&&M&&(0,c.setManifestsSingleton)({page:n,clientReferenceManifest:M,serverActionsManifest:j});let K=e.method||"GET",W=(0,s.getTracer)(),H=W.getActiveScopeSpan(),q={params:C,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!R.experimental.authInterrupts},cacheComponents:!!R.cacheComponents,supportsDynamicResponse:U,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:R.cacheLife,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,n,o)=>S.onRequestError(e,t,n,o,T)},sharedContext:{buildId:b}},G=new u.NodeNextRequest(e),L=new u.NodeNextResponse(t),z=p.NextRequestAdapter.fromNodeNextRequest(G,(0,p.signalFromNodeResponse)(t));try{let r=async e=>S.handle(z,q).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let a=W.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=a.get("next.route");if(o){let t=`${K} ${o}`;e.setAttributes({"next.route":o,"http.route":o,"next.span_name":t}),e.updateName(t)}else e.updateName(`${K} ${n}`)}),c=!!(0,i.getRequestMeta)(e,"minimalMode"),l=async i=>{var s,l;let u=async({previousCacheEntry:o})=>{try{if(!c&&P&&k&&!o)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await r(i);e.fetchMetrics=q.renderOpts.fetchMetrics;let s=q.renderOpts.pendingWaitUntil;s&&a.waitUntil&&(a.waitUntil(s),s=void 0);let l=q.renderOpts.collectedTags;if(!N)return await (0,h.sendResponse)(G,L,n,q.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(n.headers);l&&(t[w.NEXT_CACHE_TAGS_HEADER]=l),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==q.renderOpts.collectedRevalidate&&!(q.renderOpts.collectedRevalidate>=w.INFINITE_CACHE)&&q.renderOpts.collectedRevalidate,o=void 0===q.renderOpts.collectedExpire||q.renderOpts.collectedExpire>=w.INFINITE_CACHE?void 0:q.renderOpts.collectedExpire;return{value:{kind:f.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:o}}}}catch(t){throw(null==o?void 0:o.isStale)&&await S.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,m.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:P})},!1,T),t}},p=await S.handleResponse({req:e,nextConfig:R,cacheKey:O,routeKind:o.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:P,revalidateOnlyGenerated:k,responseGenerator:u,waitUntil:a.waitUntil,isMinimalMode:c});if(!N)return null;if((null==p||null==(s=p.value)?void 0:s.kind)!==f.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==p||null==(l=p.value)?void 0:l.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});c||t.setHeader("x-nextjs-cache",P?"REVALIDATED":p.isMiss?"MISS":p.isStale?"STALE":"HIT"),E&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let d=(0,g.fromNodeOutgoingHttpHeaders)(p.value.headers);return c&&N||d.delete(w.NEXT_CACHE_TAGS_HEADER),!p.cacheControl||t.getHeader("Cache-Control")||d.get("Cache-Control")||d.set("Cache-Control",(0,y.getCacheControlHeader)(p.cacheControl)),await (0,h.sendResponse)(G,L,new Response(p.value.body,{headers:d,status:p.value.status||200})),null};H?await l(H):await W.withPropagatedContext(e.headers,()=>W.trace(d.BaseServerSpan.handleRequest,{spanName:`${K} ${n}`,kind:s.SpanKind.SERVER,attributes:{"http.method":K,"http.target":e.url}},l))}catch(t){if(t instanceof v.NoFallbackError||await S.onRequestError(e,t,{routerKind:"App Router",routePath:D,routeType:"route",revalidateReason:(0,m.getRevalidateReason)({isStaticGeneration:_,isOnDemandRevalidate:P})},!1,T),N)throw t;return await (0,h.sendResponse)(G,L,new Response(null,{status:500})),null}}e.s(["handler",()=>x,"patchFetch",()=>R,"routeModule",()=>S,"serverHooks",()=>T,"workAsyncStorage",()=>E,"workUnitAsyncStorage",()=>A]),a()}catch(e){a(e)}},!1)];

//# debugId=222aad45-ceeb-fee2-6c42-5505786145e1
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_d2206b4a._.js.map