;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="258bbbc5-66cd-eacd-3d96-829d2646e5e8")}catch(e){}}();
module.exports=[116192,e=>e.a(async(t,r)=>{try{var s=e.i(909105),i=e.i(320947),n=e.i(738597);e.i(688768);var o=e.i(257357),u=t([n]);[n]=u.then?(await u)():u;let w=["introduction","concept","example","practice","review"];async function l(e,t){let[r]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,t)).limit(1);if(!r)throw Error("Lesson not found");let[u]=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.id,r.moduleId)).limit(1);if(!u)throw Error("Module not found");let l=r.prerequisiteLessonIds||[];if(l.length>0){let[t]=await n.drizzleDb.select({count:i.sql`count(*)::int`}).from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.studentId,e),(0,s.inArray)(o.curriculumLessonProgress.lessonId,l),(0,s.eq)(o.curriculumLessonProgress.status,"COMPLETED")));if((t?.count??0)<l.length)throw Error("Prerequisites not met")}let[c]=await n.drizzleDb.select().from(o.lessonSession).where((0,s.and)((0,s.eq)(o.lessonSession.studentId,e),(0,s.eq)(o.lessonSession.lessonId,t))).limit(1);if(c&&"completed"!==c.status)return c;await n.drizzleDb.insert(o.curriculumLessonProgress).values({id:crypto.randomUUID(),lessonId:t,studentId:e,status:"IN_PROGRESS",currentSection:"introduction",updatedAt:new Date}).onConflictDoUpdate({target:[o.curriculumLessonProgress.lessonId,o.curriculumLessonProgress.studentId],set:{status:"IN_PROGRESS",currentSection:"introduction"}});let[a]=await n.drizzleDb.insert(o.lessonSession).values({id:crypto.randomUUID(),studentId:e,lessonId:t,status:"active",currentSection:"introduction",conceptMastery:{},misconceptions:[],whiteboardItems:[],sessionContext:{messages:[],currentStep:0,introductionDone:!1,conceptExplained:!1,exampleWalked:!1,practiceDone:!1,reviewDone:!1}}).returning();if(!a)throw Error("Failed to create lesson session");return a}async function c(e,t){let r=w.indexOf(e.currentSection);if(r>=w.length-1)return await d(e.id),{newSection:"review",sectionComplete:!0,lessonComplete:!0};let i=w[r+1],u=e.sessionContext||{};return u[`${e.currentSection}Done`]=!0,u.currentStep=0,await n.drizzleDb.update(o.lessonSession).set({currentSection:i,sessionContext:u}).where((0,s.eq)(o.lessonSession.id,e.id)),await n.drizzleDb.update(o.curriculumLessonProgress).set({currentSection:i}).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,e.lessonId),(0,s.eq)(o.curriculumLessonProgress.studentId,e.studentId))),{newSection:i,sectionComplete:!0,lessonComplete:!1}}function a(e,t,r){let s={introduction:`
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
- 询问是否还有疑问`},i=e.currentSection,n=e.sessionContext||{};return`你是 TutorMe 的 AI 导师，正在进行结构化课程教学。

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
${s[i]}

## 学习进度
当前阶段: ${i}
引入完成: ${n.introductionDone?"是":"否"}
概念讲解完成: ${n.conceptExplained?"是":"否"}
示例讲解完成: ${n.exampleWalked?"是":"否"}
练习完成: ${n.practiceDone?"是":"否"}
回顾完成: ${n.reviewDone?"是":"否"}

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
}`}async function d(t){let[r]=await n.drizzleDb.select().from(o.lessonSession).where((0,s.eq)(o.lessonSession.id,t)).limit(1);if(!r)return;let[u]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,r.lessonId)).limit(1);if(!u)return;let[l]=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.id,u.moduleId)).limit(1);if(!l)return;let c=l.curriculumId,a=r.conceptMastery||{},d=Object.keys(a).length>0?Object.values(a).reduce((e,t)=>e+t,0)/Object.keys(a).length:0;await n.drizzleDb.transaction(async e=>{await e.update(o.lessonSession).set({status:"completed",completedAt:new Date}).where((0,s.eq)(o.lessonSession.id,t)),await e.update(o.curriculumLessonProgress).set({status:"COMPLETED",completedAt:new Date,score:Math.round(d)}).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,r.lessonId),(0,s.eq)(o.curriculumLessonProgress.studentId,r.studentId)));let[n]=await e.select({count:i.sql`count(*)::int`}).from(o.curriculumLesson).innerJoin(o.curriculumModule,(0,s.eq)(o.curriculumModule.id,o.curriculumLesson.moduleId)).where((0,s.eq)(o.curriculumModule.curriculumId,c)),u=n?.count??0,[l]=await e.select().from(o.curriculumProgress).where((0,s.and)((0,s.eq)(o.curriculumProgress.studentId,r.studentId),(0,s.eq)(o.curriculumProgress.curriculumId,c))).limit(1);l?await e.update(o.curriculumProgress).set({lessonsCompleted:l.lessonsCompleted+1,currentLessonId:r.lessonId,averageScore:d}).where((0,s.and)((0,s.eq)(o.curriculumProgress.studentId,r.studentId),(0,s.eq)(o.curriculumProgress.curriculumId,c))):await e.insert(o.curriculumProgress).values({id:crypto.randomUUID(),studentId:r.studentId,curriculumId:c,lessonsCompleted:1,totalLessons:u,currentLessonId:r.lessonId,averageScore:d,isCompleted:!1})});try{let{onLessonComplete:t}=await e.A(639477);await t(r.studentId,r.lessonId)}catch(e){console.error("Failed to award lesson completion XP:",e)}}async function m(e,t){for(let r of(await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.curriculumId,t)).orderBy(o.curriculumModule.order)))for(let t of(await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.moduleId,r.id)).orderBy(o.curriculumLesson.order))){let[u]=await n.drizzleDb.select().from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,t.id),(0,s.eq)(o.curriculumLessonProgress.studentId,e))).limit(1);if(u?.status==="COMPLETED")continue;let l=t.prerequisiteLessonIds||[];if(l.length>0){let[t]=await n.drizzleDb.select({count:i.sql`count(*)::int`}).from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.studentId,e),(0,s.inArray)(o.curriculumLessonProgress.lessonId,l),(0,s.eq)(o.curriculumLessonProgress.status,"COMPLETED")));if((t?.count??0)<l.length)continue}return{lessonId:t.id,title:t.title,moduleTitle:r.title}}return null}async function p(e,t){let[r]=await n.drizzleDb.select().from(o.curriculum).where((0,s.eq)(o.curriculum.id,t)).limit(1);if(!r)throw Error("Curriculum not found");let i=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.curriculumId,t)).orderBy(o.curriculumModule.order),u=0,l=0,c="";for(let t of i)for(let r of(await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.moduleId,t.id)).orderBy(o.curriculumLesson.order))){u++;let[i]=await n.drizzleDb.select().from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,r.id),(0,s.eq)(o.curriculumLessonProgress.studentId,e))).limit(1);i?.status==="COMPLETED"?l++:c||i?.status!=="IN_PROGRESS"||(c=t.title)}return{totalLessons:u,completedLessons:l,currentModule:c||i[0]?.title||"",overallProgress:u>0?Math.round(l/u*100):0}}async function h(e){let[t]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,e)).limit(1);if(!t)throw Error("Lesson not found");return{id:t.id,title:t.title,description:t.description||void 0,duration:t.duration,difficulty:t.difficulty,learningObjectives:t.learningObjectives||[],teachingPoints:t.teachingPoints||[],keyConcepts:t.keyConcepts||[],examples:t.examples||[],practiceProblems:t.practiceProblems||[],commonMisconceptions:t.commonMisconceptions||[]}}e.s(["advanceLesson",()=>c,"buildCurriculumPrompt",()=>a,"getLessonContent",()=>h,"getNextLesson",()=>m,"getStudentProgress",()=>p,"startLesson",()=>l]),r()}catch(e){r(e)}},!1),993678,e=>e.a(async(t,r)=>{try{var s=e.i(620971),i=e.i(384030),n=e.i(116192),o=e.i(738597);e.i(688768);var u=e.i(257357),l=e.i(909105),c=e.i(997103),a=t([i,n,o]);[i,n,o]=a.then?(await a)():a;let d=(0,i.withAuth)(async(e,t)=>{let{searchParams:r}=new URL(e.url),a=r.get("curriculumId");if(!a)throw new i.ValidationError("Curriculum ID is required");let d=await (0,n.getStudentProgress)(t.user.id,a),[m]=await o.drizzleDb.select().from(u.curriculum).where((0,l.eq)(u.curriculum.id,a)).limit(1);if(!m)throw new i.NotFoundError("Curriculum not found");let p=await o.drizzleDb.select().from(u.curriculumModule).where((0,l.eq)(u.curriculumModule.curriculumId,a)).orderBy((0,c.asc)(u.curriculumModule.order)),h=p.map(e=>e.id),w=h.length>0?await o.drizzleDb.select().from(u.curriculumLesson).where((0,l.inArray)(u.curriculumLesson.moduleId,h)).orderBy((0,c.asc)(u.curriculumLesson.order)):[],f=w.map(e=>e.id),g=f.length>0?await o.drizzleDb.select().from(u.curriculumLessonProgress).where((0,l.eq)(u.curriculumLessonProgress.studentId,t.user.id)):[],P=new Map(g.filter(e=>f.includes(e.lessonId)).map(e=>[e.lessonId,e])),I=new Map;for(let e of w){let t=I.get(e.moduleId)??[];t.push(e),I.set(e.moduleId,t)}let v=p.map(e=>{let t=I.get(e.id)??[];return{id:e.id,title:e.title,description:e.description,order:e.order,lessons:t.map(e=>({id:e.id,title:e.title,order:e.order,duration:e.duration,difficulty:e.difficulty,status:P.get(e.id)?.status??"NOT_STARTED",currentSection:P.get(e.id)?.currentSection,score:P.get(e.id)?.score,completedAt:P.get(e.id)?.completedAt,isLocked:function(e,t,r){let s=e.prerequisiteLessonIds??[];if(0===s.length)return!1;for(let e of s){let s=t.find(t=>t.id===e);if(!s)continue;let i=r.get(s.id);if(i?.status!=="COMPLETED")return!0}return!1}(e,t,P)}))}});return s.NextResponse.json({progress:d,curriculum:{id:m.id,name:m.name,description:m.description,modules:v}})},{role:"STUDENT"});e.s(["GET",0,d]),r()}catch(e){r(e)}},!1),887639,e=>e.a(async(t,r)=>{try{var s=e.i(78315),i=e.i(586961),n=e.i(196657),o=e.i(899733),u=e.i(233979),l=e.i(631683),c=e.i(840960),a=e.i(711373),d=e.i(699699),m=e.i(521140),p=e.i(205260),h=e.i(500249),w=e.i(431740),f=e.i(82608),g=e.i(635207),P=e.i(193695);e.i(708038);var I=e.i(447430),v=e.i(993678),E=t([v]);[v]=E.then?(await E)():E;let L=new s.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/curriculum/progress/route",pathname:"/api/curriculum/progress",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/curriculum/progress/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:b,workUnitAsyncStorage:C,serverHooks:D}=L;function y(){return(0,n.patchFetch)({workAsyncStorage:b,workUnitAsyncStorage:C})}async function R(e,t,r){L.isDev&&(0,o.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let s="/api/curriculum/progress/route";s=s.replace(/\/index$/,"")||"/";let n=await L.prepare(e,t,{srcPage:s,multiZoneDraftMode:!1});if(!n)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:v,params:E,nextConfig:y,parsedUrl:R,isDraftMode:b,prerenderManifest:C,routerServerContext:D,isOnDemandRevalidate:_,revalidateOnlyGenerated:S,resolvedPathname:q,clientReferenceManifest:M,serverActionsManifest:z}=n,x=(0,c.normalizeAppPath)(s),A=!!(C.dynamicRoutes[x]||C.routes[q]),O=async()=>((null==D?void 0:D.render404)?await D.render404(e,t,R,!1):t.end("This page could not be found"),null);if(A&&!b){let e=!!C.routes[q],t=C.dynamicRoutes[x];if(t&&!1===t.fallback&&!e){if(y.experimental.adapterPath)return await O();throw new P.NoFallbackError}}let T=null;!A||L.isDev||b||(T=q,T="/index"===T?"/":T);let N=!0===L.isDev||!A,$=A&&!N;z&&M&&(0,l.setManifestsSingleton)({page:s,clientReferenceManifest:M,serverActionsManifest:z});let k=e.method||"GET",j=(0,u.getTracer)(),U=j.getActiveScopeSpan(),H={params:E,prerenderManifest:C,renderOpts:{experimental:{authInterrupts:!!y.experimental.authInterrupts},cacheComponents:!!y.cacheComponents,supportsDynamicResponse:N,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:y.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,s,i)=>L.onRequestError(e,t,s,i,D)},sharedContext:{buildId:v}},K=new a.NodeNextRequest(e),B=new a.NodeNextResponse(t),F=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let n=async e=>L.handle(F,H).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=j.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==m.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let t=`${k} ${i}`;e.setAttributes({"next.route":i,"http.route":i,"next.span_name":t}),e.updateName(t)}else e.updateName(`${k} ${s}`)}),l=!!(0,o.getRequestMeta)(e,"minimalMode"),c=async o=>{var u,c;let a=async({previousCacheEntry:i})=>{try{if(!l&&_&&S&&!i)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let s=await n(o);e.fetchMetrics=H.renderOpts.fetchMetrics;let u=H.renderOpts.pendingWaitUntil;u&&r.waitUntil&&(r.waitUntil(u),u=void 0);let c=H.renderOpts.collectedTags;if(!A)return await (0,h.sendResponse)(K,B,s,H.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),t=(0,w.toNodeOutgoingHttpHeaders)(s.headers);c&&(t[g.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,i=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:I.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==i?void 0:i.isStale)&&await L.onRequestError(e,t,{routerKind:"App Router",routePath:s,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:_})},!1,D),t}},d=await L.handleResponse({req:e,nextConfig:y,cacheKey:T,routeKind:i.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:C,isRoutePPREnabled:!1,isOnDemandRevalidate:_,revalidateOnlyGenerated:S,responseGenerator:a,waitUntil:r.waitUntil,isMinimalMode:l});if(!A)return null;if((null==d||null==(u=d.value)?void 0:u.kind)!==I.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(c=d.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",_?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),b&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,w.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&A||m.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,h.sendResponse)(K,B,new Response(d.value.body,{headers:m,status:d.value.status||200})),null};U?await c(U):await j.withPropagatedContext(e.headers,()=>j.trace(m.BaseServerSpan.handleRequest,{spanName:`${k} ${s}`,kind:u.SpanKind.SERVER,attributes:{"http.method":k,"http.target":e.url}},c))}catch(t){if(t instanceof P.NoFallbackError||await L.onRequestError(e,t,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:$,isOnDemandRevalidate:_})},!1,D),A)throw t;return await (0,h.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>R,"patchFetch",()=>y,"routeModule",()=>L,"serverHooks",()=>D,"workAsyncStorage",()=>b,"workUnitAsyncStorage",()=>C]),r()}catch(e){r(e)}},!1),412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))},639477,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_fb57774d._.js","server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_a22ba6d4._.js"].map(t=>e.l(t))).then(()=>t(433122)))}];

//# debugId=258bbbc5-66cd-eacd-3d96-829d2646e5e8
//# sourceMappingURL=%5Broot-of-the-server%5D__ec41b1d5._.js.map