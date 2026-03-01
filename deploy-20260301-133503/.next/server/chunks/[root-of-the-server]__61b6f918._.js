;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="67902860-66d5-35ba-b041-da6ddcb1387e")}catch(e){}}();
module.exports=[908286,e=>{"use strict";async function t(e,t){var r=e instanceof Promise?await e:e;if(!r||"object"!=typeof r)return;let s=r[t];return null!=s?Array.isArray(s)?s[0]:s:void 0}e.s(["getParamAsync",()=>t])},116192,e=>e.a(async(t,r)=>{try{var s=e.i(909105),n=e.i(320947),o=e.i(738597);e.i(688768);var i=e.i(257357),u=t([o]);[o]=u.then?(await u)():u;let h=["introduction","concept","example","practice","review"];async function l(e,t){let[r]=await o.drizzleDb.select().from(i.curriculumLesson).where((0,s.eq)(i.curriculumLesson.id,t)).limit(1);if(!r)throw Error("Lesson not found");let[u]=await o.drizzleDb.select().from(i.curriculumModule).where((0,s.eq)(i.curriculumModule.id,r.moduleId)).limit(1);if(!u)throw Error("Module not found");let l=r.prerequisiteLessonIds||[];if(l.length>0){let[t]=await o.drizzleDb.select({count:n.sql`count(*)::int`}).from(i.curriculumLessonProgress).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.studentId,e),(0,s.inArray)(i.curriculumLessonProgress.lessonId,l),(0,s.eq)(i.curriculumLessonProgress.status,"COMPLETED")));if((t?.count??0)<l.length)throw Error("Prerequisites not met")}let[a]=await o.drizzleDb.select().from(i.lessonSession).where((0,s.and)((0,s.eq)(i.lessonSession.studentId,e),(0,s.eq)(i.lessonSession.lessonId,t))).limit(1);if(a&&"completed"!==a.status)return a;await o.drizzleDb.insert(i.curriculumLessonProgress).values({id:crypto.randomUUID(),lessonId:t,studentId:e,status:"IN_PROGRESS",currentSection:"introduction",updatedAt:new Date}).onConflictDoUpdate({target:[i.curriculumLessonProgress.lessonId,i.curriculumLessonProgress.studentId],set:{status:"IN_PROGRESS",currentSection:"introduction"}});let[c]=await o.drizzleDb.insert(i.lessonSession).values({id:crypto.randomUUID(),studentId:e,lessonId:t,status:"active",currentSection:"introduction",conceptMastery:{},misconceptions:[],whiteboardItems:[],sessionContext:{messages:[],currentStep:0,introductionDone:!1,conceptExplained:!1,exampleWalked:!1,practiceDone:!1,reviewDone:!1}}).returning();if(!c)throw Error("Failed to create lesson session");return c}async function a(e,t){let r=h.indexOf(e.currentSection);if(r>=h.length-1)return await d(e.id),{newSection:"review",sectionComplete:!0,lessonComplete:!0};let n=h[r+1],u=e.sessionContext||{};return u[`${e.currentSection}Done`]=!0,u.currentStep=0,await o.drizzleDb.update(i.lessonSession).set({currentSection:n,sessionContext:u}).where((0,s.eq)(i.lessonSession.id,e.id)),await o.drizzleDb.update(i.curriculumLessonProgress).set({currentSection:n}).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.lessonId,e.lessonId),(0,s.eq)(i.curriculumLessonProgress.studentId,e.studentId))),{newSection:n,sectionComplete:!0,lessonComplete:!1}}function c(e,t,r){let s={introduction:`
【引入阶段】
- 简要介绍本节课的重要性和应用场景（1-2句话）
- 预览学生将要学习的内容
- 与之前的知识建立联系（如果相关）
- 保持简洁有趣，激发学习兴趣
- 询问学生是否准备好开始学习`,concept:`
【概念教学阶段】
- 清晰地讲解核心概念
- 使用提供的教学要点
- 定义关键术语
- 提出检查理解的问题
- 在学生表现出理解之前不要继续
- 使用苏格拉底式提问引导学生思考`,example:`
【示例讲解阶段】
- 逐步展示示例
- 清晰地讲解每一步
- 让学生预测下一步
- 解释推理过程
- 确保学生能跟上节奏`,practice:`
【练习阶段】
- 给学生一道练习题
- 先让他们自己尝试
- 如果卡住了提供提示（不要立即给出答案）
- 庆祝正确的尝试
- 解决误解`,review:`
【回顾阶段】
- 总结关键要点
- 确认学习目标已达成
- 预览接下来的内容
- 祝贺学生完成学习
- 询问是否还有疑问`},n=e.currentSection,o=e.sessionContext||{};return`你是 TutorMe 的 AI 导师，正在进行结构化课程教学。

## 当前课程信息
课程名称: ${t.title}
课程描述: ${t.description||"N/A"}
难度级别: ${t.difficulty}
预计时长: ${t.duration} 分钟

## 学习目标
${(t.learningObjectives||[]).map(e=>`- ${e}`).join("\n")}

## 教学要点
${(t.teachingPoints||[]).map(e=>`- ${e}`).join("\n")}

## 关键概念
${(t.keyConcepts||[]).map(e=>`- ${e}`).join("\n")}

## 当前教学阶段
${s[n]}

## 学习进度
当前阶段: ${n}
引入完成: ${o.introductionDone?"是":"否"}
概念讲解完成: ${o.conceptExplained?"是":"否"}
示例讲解完成: ${o.exampleWalked?"是":"否"}
练习完成: ${o.practiceDone?"是":"否"}
回顾完成: ${o.reviewDone?"是":"否"}

## 概念掌握度
${Object.entries(e.conceptMastery||{}).map(([e,t])=>`- ${e}: ${t}%`).join("\n")||"暂无数据"}

## 常见误解（需要留意）
${(t.commonMisconceptions||[]).map(e=>`- ${e}`).join("\n")}

## 教学原则
1. 严格遵循当前阶段的教学指导
2. 不要跳到后面的阶段
3. 在继续之前检查学生的理解
4. 当学生卡住时使用提示，不要直接给答案
5. 保持回应集中和结构化
6. 对公式、定义和步骤使用白板
7. 使用苏格拉底式教学法，引导学生自己发现答案
8. 用中文进行教学

## 学生消息
${r}

请根据当前阶段指导提供回应。如果需要显示公式、代码或步骤，请在回应后用 JSON 格式提供白板内容。

白板 JSON 格式示例:
{
  "whiteboardItems": [
    {"type": "formula", "content": "E = mc\xb2", "caption": "质能方程"},
    {"type": "code", "content": "x = 5 + 3", "caption": "示例代码"}
  ],
  "understandingLevel": 80,
  "nextSection": "concept"
}`}async function d(t){let[r]=await o.drizzleDb.select().from(i.lessonSession).where((0,s.eq)(i.lessonSession.id,t)).limit(1);if(!r)return;let[u]=await o.drizzleDb.select().from(i.curriculumLesson).where((0,s.eq)(i.curriculumLesson.id,r.lessonId)).limit(1);if(!u)return;let[l]=await o.drizzleDb.select().from(i.curriculumModule).where((0,s.eq)(i.curriculumModule.id,u.moduleId)).limit(1);if(!l)return;let a=l.curriculumId,c=r.conceptMastery||{},d=Object.keys(c).length>0?Object.values(c).reduce((e,t)=>e+t,0)/Object.keys(c).length:0;await o.drizzleDb.transaction(async e=>{await e.update(i.lessonSession).set({status:"completed",completedAt:new Date}).where((0,s.eq)(i.lessonSession.id,t)),await e.update(i.curriculumLessonProgress).set({status:"COMPLETED",completedAt:new Date,score:Math.round(d)}).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.lessonId,r.lessonId),(0,s.eq)(i.curriculumLessonProgress.studentId,r.studentId)));let[o]=await e.select({count:n.sql`count(*)::int`}).from(i.curriculumLesson).innerJoin(i.curriculumModule,(0,s.eq)(i.curriculumModule.id,i.curriculumLesson.moduleId)).where((0,s.eq)(i.curriculumModule.curriculumId,a)),u=o?.count??0,[l]=await e.select().from(i.curriculumProgress).where((0,s.and)((0,s.eq)(i.curriculumProgress.studentId,r.studentId),(0,s.eq)(i.curriculumProgress.curriculumId,a))).limit(1);l?await e.update(i.curriculumProgress).set({lessonsCompleted:l.lessonsCompleted+1,currentLessonId:r.lessonId,averageScore:d}).where((0,s.and)((0,s.eq)(i.curriculumProgress.studentId,r.studentId),(0,s.eq)(i.curriculumProgress.curriculumId,a))):await e.insert(i.curriculumProgress).values({id:crypto.randomUUID(),studentId:r.studentId,curriculumId:a,lessonsCompleted:1,totalLessons:u,currentLessonId:r.lessonId,averageScore:d,isCompleted:!1})});try{let{onLessonComplete:t}=await e.A(639477);await t(r.studentId,r.lessonId)}catch(e){console.error("Failed to award lesson completion XP:",e)}}async function m(e,t){for(let r of(await o.drizzleDb.select().from(i.curriculumModule).where((0,s.eq)(i.curriculumModule.curriculumId,t)).orderBy(i.curriculumModule.order)))for(let t of(await o.drizzleDb.select().from(i.curriculumLesson).where((0,s.eq)(i.curriculumLesson.moduleId,r.id)).orderBy(i.curriculumLesson.order))){let[u]=await o.drizzleDb.select().from(i.curriculumLessonProgress).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.lessonId,t.id),(0,s.eq)(i.curriculumLessonProgress.studentId,e))).limit(1);if(u?.status==="COMPLETED")continue;let l=t.prerequisiteLessonIds||[];if(l.length>0){let[t]=await o.drizzleDb.select({count:n.sql`count(*)::int`}).from(i.curriculumLessonProgress).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.studentId,e),(0,s.inArray)(i.curriculumLessonProgress.lessonId,l),(0,s.eq)(i.curriculumLessonProgress.status,"COMPLETED")));if((t?.count??0)<l.length)continue}return{lessonId:t.id,title:t.title,moduleTitle:r.title}}return null}async function p(e,t){let[r]=await o.drizzleDb.select().from(i.curriculum).where((0,s.eq)(i.curriculum.id,t)).limit(1);if(!r)throw Error("Curriculum not found");let n=await o.drizzleDb.select().from(i.curriculumModule).where((0,s.eq)(i.curriculumModule.curriculumId,t)).orderBy(i.curriculumModule.order),u=0,l=0,a="";for(let t of n)for(let r of(await o.drizzleDb.select().from(i.curriculumLesson).where((0,s.eq)(i.curriculumLesson.moduleId,t.id)).orderBy(i.curriculumLesson.order))){u++;let[n]=await o.drizzleDb.select().from(i.curriculumLessonProgress).where((0,s.and)((0,s.eq)(i.curriculumLessonProgress.lessonId,r.id),(0,s.eq)(i.curriculumLessonProgress.studentId,e))).limit(1);n?.status==="COMPLETED"?l++:a||n?.status!=="IN_PROGRESS"||(a=t.title)}return{totalLessons:u,completedLessons:l,currentModule:a||n[0]?.title||"",overallProgress:u>0?Math.round(l/u*100):0}}async function w(e){let[t]=await o.drizzleDb.select().from(i.curriculumLesson).where((0,s.eq)(i.curriculumLesson.id,e)).limit(1);if(!t)throw Error("Lesson not found");return{id:t.id,title:t.title,description:t.description||void 0,duration:t.duration,difficulty:t.difficulty,learningObjectives:t.learningObjectives||[],teachingPoints:t.teachingPoints||[],keyConcepts:t.keyConcepts||[],examples:t.examples||[],practiceProblems:t.practiceProblems||[],commonMisconceptions:t.commonMisconceptions||[]}}e.s(["advanceLesson",()=>a,"buildCurriculumPrompt",()=>c,"getLessonContent",()=>w,"getNextLesson",()=>m,"getStudentProgress",()=>p,"startLesson",()=>l]),r()}catch(e){r(e)}},!1),857712,e=>e.a(async(t,r)=>{try{var s=e.i(620971),n=e.i(384030),o=e.i(908286),i=e.i(116192),u=e.i(738597);e.i(688768);var l=e.i(257357),a=e.i(909105),c=t([n,i,u]);[n,i,u]=c.then?(await c)():c;let d=(0,n.withAuth)(async(e,t,r)=>{let c=await (0,o.getParamAsync)(r?.params,"lessonId");if(!c)return s.NextResponse.json({error:"Lesson ID required"},{status:400});let{searchParams:d}=new URL(e.url),m=d.get("action"),p=await (0,i.getLessonContent)(c);if("next"===m){let[e]=await u.drizzleDb.select().from(l.curriculumLesson).where((0,a.eq)(l.curriculumLesson.id,c)).limit(1);if(!e)throw new n.NotFoundError("Lesson not found");let[r]=await u.drizzleDb.select({curriculumId:l.curriculumModule.curriculumId}).from(l.curriculumModule).where((0,a.eq)(l.curriculumModule.id,e.moduleId)).limit(1);if(!r)throw new n.NotFoundError("Module not found");let o=await (0,i.getNextLesson)(t.user.id,r.curriculumId);return s.NextResponse.json({nextLesson:o})}return s.NextResponse.json({lesson:p})},{role:"STUDENT"}),m=(0,n.withCsrf)((0,n.withAuth)(async(e,t,r)=>{let u=await (0,o.getParamAsync)(r?.params,"lessonId");if(!u)return s.NextResponse.json({error:"Lesson ID required"},{status:400});let{action:l="start"}=await e.json();if("start"===l){let e=await (0,i.startLesson)(t.user.id,u),r=await (0,i.getLessonContent)(u);return s.NextResponse.json({success:!0,session:e,lesson:{title:r.title,objectives:r.learningObjectives,concepts:r.keyConcepts}})}throw new n.ValidationError("Invalid action")},{role:"STUDENT"}));e.s(["GET",0,d,"POST",0,m]),r()}catch(e){r(e)}},!1),63050,e=>e.a(async(t,r)=>{try{var s=e.i(78315),n=e.i(586961),o=e.i(196657),i=e.i(899733),u=e.i(233979),l=e.i(631683),a=e.i(840960),c=e.i(711373),d=e.i(699699),m=e.i(521140),p=e.i(205260),w=e.i(500249),h=e.i(431740),f=e.i(82608),g=e.i(635207),I=e.i(193695);e.i(708038);var P=e.i(447430),v=e.i(857712),y=t([v]);[v]=y.then?(await y)():y;let L=new s.AppRouteRouteModule({definition:{kind:n.RouteKind.APP_ROUTE,page:"/api/curriculum/lessons/[lessonId]/route",pathname:"/api/curriculum/lessons/[lessonId]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/curriculum/lessons/[lessonId]/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:b,workUnitAsyncStorage:C,serverHooks:D}=L;function E(){return(0,o.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:C})}async function R(e,t,r){L.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let s="/api/curriculum/lessons/[lessonId]/route";s=s.replace(/\/index$/,"")||"/";let o=await L.prepare(e,t,{srcPage:s,multiZoneDraftMode:!1});if(!o)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:v,params:y,nextConfig:E,parsedUrl:R,isDraftMode:b,prerenderManifest:C,routerServerContext:D,isOnDemandRevalidate:_,revalidateOnlyGenerated:S,resolvedPathname:q,clientReferenceManifest:x,serverActionsManifest:A}=o,M=(0,a.normalizeAppPath)(s),z=!!(C.dynamicRoutes[M]||C.routes[q]),O=async()=>((null==D?void 0:D.render404)?await D.render404(e,t,R,!1):t.end("This page could not be found"),null);if(z&&!b){let e=!!C.routes[q],t=C.dynamicRoutes[M];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await O();throw new I.NoFallbackError}}let T=null;!z||L.isDev||b||(T=q,T="/index"===T?"/":T);let N=!0===L.isDev||!z,j=z&&!N;A&&x&&(0,l.setManifestsSingleton)({page:s,clientReferenceManifest:x,serverActionsManifest:A});let $=e.method||"GET",k=(0,u.getTracer)(),U=k.getActiveScopeSpan(),H={params:y,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:N,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s,n)=>L.onRequestError(e,t,s,n,D)},sharedContext:{buildId:v}},K=new c.NodeNextRequest(e),F=new c.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let o=async e=>L.handle(B,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=k.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let n=r.get("next.route");if(n){let t=`${$} ${n}`;e.setAttributes({"next.route":n,"http.route":n,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${s}`)}),l=!!(0,i.getRequestMeta)(e,"minimalMode"),a=async i=>{var u,a;let c=async({previousCacheEntry:n})=>{try{if(!l&&_&&S&&!n)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await o(i);e.fetchMetrics=H.renderOpts.fetchMetrics;let u=H.renderOpts.pendingWaitUntil;u&&r.waitUntil&&(r.waitUntil(u),u=void 0);let a=H.renderOpts.collectedTags;if(!z)return await (0,w.sendResponse)(K,F,s,H.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,h.toNodeOutgoingHttpHeaders)(s.headers);a&&(t[g.NEXT_CACHE_TAGS_HEADER]=a),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,n=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:P.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:n}}}}catch(t){throw(null==n?void 0:n.isStale)&&await L.onRequestError(e,t,{routerKind:"App Router",routePath:s,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:_})},!1,D),t}},d=await L.handleResponse({req:e,nextConfig:E,cacheKey:T,routeKind:n.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:_,revalidateOnlyGenerated:S,responseGenerator:c,waitUntil:r.waitUntil,isMinimalMode:l});if(!z)return null;if((null==d||null==(u=d.value)?void 0:u.kind)!==P.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(a=d.value)?void 0:a.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",_?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,h.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&z||m.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,w.sendResponse)(K,F,new Response(d.value.body,{headers:m,status:d.value.status||200})),null};U?await a(U):await k.withPropagatedContext(e.headers,()=>k.trace(m.BaseServerSpan.handleRequest,{spanName:`${$} ${s}`,kind:u.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},a))}catch(t){if(t instanceof I.NoFallbackError||await L.onRequestError(e,t,{routerKind:"App Router",routePath:M,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:j,isOnDemandRevalidate:_})},!1,D),z)throw t;return await (0,w.sendResponse)(K,F,new Response(null,{status:500})),null}}e.s(["handler",()=>R,"patchFetch",()=>E,"routeModule",()=>L,"serverHooks",()=>D,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>C]),r()}catch(e){r(e)}},!1),412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))},639477,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_fb57774d._.js","server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_a22ba6d4._.js"].map(t=>e.l(t))).then(()=>t(433122)))}];

//# debugId=67902860-66d5-35ba-b041-da6ddcb1387e
//# sourceMappingURL=%5Broot-of-the-server%5D__61b6f918._.js.map