;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="35cc9097-1896-ee9e-d090-e3d520a92230")}catch(e){}}();
module.exports=[835280,e=>e.a(async(t,r)=>{try{var a=e.i(620971),s=e.i(384030),n=e.i(908286),i=e.i(748846),o=e.i(184714),l=t([s]);[s]=l.then?(await l)():l;let u=`You are an expert course marketing copywriter. Create a compelling, persuasive course pitch that will excite students and convince them to enroll.

Write the pitch in the following structured format:

## 🎯 COURSE HOOK
An attention-grabbing opening statement (1-2 sentences) that immediately communicates the transformation this course offers.

## 📚 WHAT YOU'LL LEARN
A bullet-point list of 5-7 specific skills, knowledge areas, and competencies students will gain. Make these concrete and outcome-focused.

## 👥 WHO THIS COURSE IS FOR
Describe the ideal student profile in 2-3 sentences. Include:
- Current skill level (beginners, intermediate, etc.)
- Background/experience needed
- Goals and aspirations this course helps achieve

## 🎓 TEACHING METHODOLOGY
Explain the learning approach in 2-3 paragraphs covering:
- Teaching style (hands-on projects, theory + practice, case studies, etc.)
- Learning materials and resources provided
- Assessment and feedback methods
- Support available to students

## 🏆 EXPECTED OUTCOMES
Specific, measurable outcomes students can expect after completing this course. Use bullet points (4-6 items). Include both hard skills and soft skills.

## ⭐ WHAT MAKES THIS COURSE UNIQUE
2-3 sentences highlighting:
- The tutor's unique expertise/experience
- Proprietary frameworks or methods taught
- Any exclusive resources or opportunities
- Success stories or social proof elements

## 📝 COURSE STRUCTURE OVERVIEW
Brief description of how the course is organized (modules, lessons, projects, etc.)

## ✅ PREREQUISITES
Clear list of what students should know or have before starting (or state "No prior experience required" if applicable)

## 🚀 READY TO START?
A compelling call-to-action (2-3 sentences) encouraging enrollment.

Use markdown formatting. Be enthusiastic but professional. Focus on benefits, not just features. Make it feel personal and exciting.`,c=(0,s.withCsrf)((0,s.withAuth)(async(e,t,r)=>{let s=await (0,n.getParamAsync)(r?.params,"id");try{if(!s)return a.NextResponse.json({error:"Course ID required"},{status:400});let e=o.prismaLegacyClient;if(!e)return a.NextResponse.json({error:"Database unavailable"},{status:500});let t=await e.curriculum.findUnique({where:{id:s},include:{modules:{orderBy:{order:"asc"},include:{lessons:{orderBy:{order:"asc"},select:{title:!0,description:!0,duration:!0,difficulty:!0,learningObjectives:!0}}}},creator:{include:{profile:{select:{name:!0,bio:!0,specialties:!0,credentials:!0}}}}}});if(!t)return a.NextResponse.json({error:"Course not found"},{status:404});let r=t.modules.map(e=>({title:e.title,description:e.description,lessons:e.lessons.map(e=>({title:e.title,duration:e.duration,objectives:e.learningObjectives}))})),n=t.creator?.profile,l=n?{name:n.name,bio:n.bio,specialties:n.specialties,credentials:n.credentials}:null,c=`${u}

COURSE INFORMATION:
- Name: ${t.name}
- Subject: ${t.subject}
- Grade Level: ${t.gradeLevel||"All levels"}
- Difficulty: ${t.difficulty}
- Estimated Hours: ${t.estimatedHours||"Flexible"}
- Description: ${t.description||"N/A"}

TUTOR INFORMATION:
${l?`- Name: ${l.name}
- Bio: ${l.bio||"N/A"}
- Specialties: ${l.specialties?.join(", ")||"N/A"}
- Credentials: ${l.credentials||"N/A"}`:"Information not available"}

COURSE MODULES AND LESSONS:
${JSON.stringify(r,null,2)}

Generate a compelling, persuasive course pitch based on this information.`,d=await (0,i.generateWithFallback)(c,{temperature:.8,maxTokens:2500});return await e.curriculum.update({where:{id:s},data:{coursePitch:d.content}}),a.NextResponse.json({pitch:d.content,provider:d.provider})}catch(e){return console.error("Failed to generate course pitch:",e),a.NextResponse.json({error:"Failed to generate course pitch"},{status:500})}},{role:"TUTOR"})),d=(0,s.withAuth)(async(e,t,r)=>{let s=await (0,n.getParamAsync)(r?.params,"id");try{if(!s)return a.NextResponse.json({error:"Course ID required"},{status:400});let e=o.prismaLegacyClient;if(!e)return a.NextResponse.json({error:"Database unavailable"},{status:500});let t=await e.curriculum.findUnique({where:{id:s},select:{coursePitch:!0}});if(!t)return a.NextResponse.json({error:"Course not found"},{status:404});return a.NextResponse.json({pitch:t.coursePitch})}catch(e){return console.error("Failed to fetch course pitch:",e),a.NextResponse.json({error:"Failed to fetch course pitch"},{status:500})}},{role:"TUTOR"}),p=(0,s.withCsrf)((0,s.withAuth)(async(e,t,r)=>{let s=await (0,n.getParamAsync)(r?.params,"id");try{if(!s)return a.NextResponse.json({error:"Course ID required"},{status:400});let{pitch:t}=await e.json();if("string"!=typeof t)return a.NextResponse.json({error:"Invalid pitch format"},{status:400});let r=o.prismaLegacyClient;if(!r)return a.NextResponse.json({error:"Database unavailable"},{status:500});return await r.curriculum.update({where:{id:s},data:{coursePitch:t}}),a.NextResponse.json({success:!0})}catch(e){return console.error("Failed to update course pitch:",e),a.NextResponse.json({error:"Failed to update course pitch"},{status:500})}},{role:"TUTOR"})),h=(0,s.withCsrf)((0,s.withAuth)(async(e,t,r)=>{let s=await (0,n.getParamAsync)(r?.params,"id");try{if(!s)return a.NextResponse.json({error:"Course ID required"},{status:400});let e=o.prismaLegacyClient;if(!e)return a.NextResponse.json({error:"Database unavailable"},{status:500});return await e.curriculum.update({where:{id:s},data:{coursePitch:null}}),a.NextResponse.json({success:!0})}catch(e){return console.error("Failed to delete course pitch:",e),a.NextResponse.json({error:"Failed to delete course pitch"},{status:500})}},{role:"TUTOR"}));e.s(["DELETE",0,h,"GET",0,d,"PATCH",0,p,"POST",0,c]),r()}catch(e){r(e)}},!1),370207,e=>e.a(async(t,r)=>{try{var a=e.i(78315),s=e.i(586961),n=e.i(196657),i=e.i(899733),o=e.i(233979),l=e.i(631683),u=e.i(840960),c=e.i(711373),d=e.i(699699),p=e.i(521140),h=e.i(205260),m=e.i(500249),R=e.i(431740),f=e.i(82608),g=e.i(635207),E=e.i(193695);e.i(708038);var w=e.i(447430),v=e.i(835280),C=t([v]);[v]=C.then?(await C)():C;let y=new a.AppRouteRouteModule({definition:{kind:s.RouteKind.APP_ROUTE,page:"/api/tutor/courses/[id]/pitch/route",pathname:"/api/tutor/courses/[id]/pitch",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/tutor/courses/[id]/pitch/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:N,workUnitAsyncStorage:T,serverHooks:b}=y;function x(){return(0,n.patchFetch)({workAsyncStorage:N,workUnitAsyncStorage:T})}async function A(e,t,r){y.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let a="/api/tutor/courses/[id]/pitch/route";a=a.replace(/\/index$/,"")||"/";let n=await y.prepare(e,t,{srcPage:a,multiZoneDraftMode:!1});if(!n)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:v,params:C,nextConfig:x,parsedUrl:A,isDraftMode:N,prerenderManifest:T,routerServerContext:b,isOnDemandRevalidate:O,revalidateOnlyGenerated:S,resolvedPathname:U,clientReferenceManifest:P,serverActionsManifest:j}=n,I=(0,u.normalizeAppPath)(a),D=!!(T.dynamicRoutes[I]||T.routes[U]),k=async()=>((null==b?void 0:b.render404)?await b.render404(e,t,A,!1):t.end("This page could not be found"),null);if(D&&!N){let e=!!T.routes[U],t=T.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if(x.experimental.adapterPath)return await k();throw new E.NoFallbackError}}let H=null;!D||y.isDev||N||(H=U,H="/index"===H?"/":H);let q=!0===y.isDev||!D,F=D&&!q;j&&P&&(0,l.setManifestsSingleton)({page:a,clientReferenceManifest:P,serverActionsManifest:j});let $=e.method||"GET",M=(0,o.getTracer)(),_=M.getActiveScopeSpan(),L={params:C,prerenderManifest:T,renderOpts:{experimental:{authInterrupts:!!x.experimental.authInterrupts},cacheComponents:!!x.cacheComponents,supportsDynamicResponse:q,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:x.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,s)=>y.onRequestError(e,t,a,s,b)},sharedContext:{buildId:v}},K=new c.NodeNextRequest(e),B=new c.NodeNextResponse(t),G=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let n=async e=>y.handle(G,L).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=M.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let s=r.get("next.route");if(s){let t=`${$} ${s}`;e.setAttributes({"next.route":s,"http.route":s,"next.span_name":t}),e.updateName(t)}else e.updateName(`${$} ${a}`)}),l=!!(0,i.getRequestMeta)(e,"minimalMode"),u=async i=>{var o,u;let c=async({previousCacheEntry:s})=>{try{if(!l&&O&&S&&!s)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await n(i);e.fetchMetrics=L.renderOpts.fetchMetrics;let o=L.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let u=L.renderOpts.collectedTags;if(!D)return await (0,m.sendResponse)(K,B,a,L.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,R.toNodeOutgoingHttpHeaders)(a.headers);u&&(t[g.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==L.renderOpts.collectedRevalidate&&!(L.renderOpts.collectedRevalidate>=g.INFINITE_CACHE)&&L.renderOpts.collectedRevalidate,s=void 0===L.renderOpts.collectedExpire||L.renderOpts.collectedExpire>=g.INFINITE_CACHE?void 0:L.renderOpts.collectedExpire;return{value:{kind:w.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:s}}}}catch(t){throw(null==s?void 0:s.isStale)&&await y.onRequestError(e,t,{routerKind:"App Router",routePath:a,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:O})},!1,b),t}},d=await y.handleResponse({req:e,nextConfig:x,cacheKey:H,routeKind:s.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:T,isRoutePPREnabled:!1,isOnDemandRevalidate:O,revalidateOnlyGenerated:S,responseGenerator:c,waitUntil:r.waitUntil,isMinimalMode:l});if(!D)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==w.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(u=d.value)?void 0:u.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",O?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,R.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&D||p.delete(g.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,f.getCacheControlHeader)(d.cacheControl)),await (0,m.sendResponse)(K,B,new Response(d.value.body,{headers:p,status:d.value.status||200})),null};_?await u(_):await M.withPropagatedContext(e.headers,()=>M.trace(p.BaseServerSpan.handleRequest,{spanName:`${$} ${a}`,kind:o.SpanKind.SERVER,attributes:{"http.method":$,"http.target":e.url}},u))}catch(t){if(t instanceof E.NoFallbackError||await y.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:O})},!1,b),D)throw t;return await (0,m.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>A,"patchFetch",()=>x,"routeModule",()=>y,"serverHooks",()=>b,"workAsyncStorage",()=>N,"workUnitAsyncStorage",()=>T]),r()}catch(e){r(e)}},!1)];

//# debugId=35cc9097-1896-ee9e-d090-e3d520a92230
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_73a75729._.js.map