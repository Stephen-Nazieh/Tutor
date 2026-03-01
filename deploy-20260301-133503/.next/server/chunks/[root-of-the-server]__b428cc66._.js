;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="29d35b17-305f-19ce-d793-468ff5d5754a")}catch(e){}}();
module.exports=[902157,(e,t,r)=>{t.exports=e.x("node:fs",()=>require("node:fs"))},750227,(e,t,r)=>{t.exports=e.x("node:path",()=>require("node:path"))},450869,e=>{"use strict";let t="tutorme:query:",r=null,a=null,i=!1,n=!(void 0!==globalThis.EdgeRuntime||"u">typeof process&&0);function s(){return n?(a||(a=new Map),a):null}async function o(){if(!n)return null;if(i)return r;try{let t=process.env.REDIS_URL;if(!t)return console.log("[DB] Redis URL not configured, using in-memory cache"),i=!0,null;let{Redis:a}=await e.A(443460);return(r=new a(t,{retryStrategy:e=>Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("error",e=>{console.error("[Redis] Connection error:",e),r=null}),console.log("[DB] Redis cache initialized"),i=!0,r}catch(e){return console.warn("[DB] Failed to initialize Redis, using in-memory cache"),i=!0,null}}if(n)try{let{drizzleDb:t}=e.r(738597);console.log("[DB] Drizzle client (default db) initialized")}catch(e){console.error("[DB] Failed to initialize Drizzle:",e)}e.s(["cache",0,{ensureRedis:async()=>n?(i||await o(),r):null,async get(e){if(!n)return null;let r=t+e,a=await this.ensureRedis();if(a)try{let e=await a.get(r);if(e)return JSON.parse(e)}catch(e){console.error("[Cache] Redis get error:",e)}let i=s();if(!i)return null;let o=i.get(r);return o&&o.expires>Date.now()?o.data:(i.delete(r),null)},async set(e,r,a=60){if(!n)return;let i=t+e,o=await this.ensureRedis();if(o)try{await o.setex(i,a,JSON.stringify(r));return}catch(e){console.error("[Cache] Redis set error:",e)}let l=s();l&&l.set(i,{data:r,expires:Date.now()+1e3*a})},async delete(e){if(!n)return;let r=t+e,a=await this.ensureRedis();if(a)try{await a.del(r)}catch(e){console.error("[Cache] Redis del error:",e)}let i=s();i&&i.delete(r)},async clear(){if(!n)return;let e=await this.ensureRedis();if(e)try{let r=await e.keys(t+"*");r.length>0&&await e.del(...r)}catch(e){console.error("[Cache] Redis clear error:",e)}let r=s();r&&r.clear()},async getOrSet(e,t,r=60){let a=await this.get(e);if(null!==a)return a;let i=await t();return await this.set(e,i,r),i},async invalidatePattern(e){if(!n)return;let r=await this.ensureRedis();if(r)try{let a=await r.keys(t+e);a.length>0&&await r.del(...a)}catch(e){console.error("[Cache] Pattern invalidation error:",e)}let a=s();if(a){let r=new RegExp(t+e.replace("*",".*"));for(let e of a.keys())r.test(e)&&a.delete(e)}}}])},494313,e=>e.a(async(t,r)=>{try{var a=e.i(620971),i=e.i(384030),n=e.i(738597);e.i(688768);var s=e.i(257357),o=e.i(909105),l=e.i(748846),u=t([i,n]);async function c(e){if(!e.trim())return"";try{let t=await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(e)}`);if(t.ok){let e=await t.json().catch(()=>({}));if("string"==typeof e.extract&&e.extract.trim())return e.extract.slice(0,3e3)}}catch{}return""}[i,n]=u.then?(await u)():u;let d=(0,i.withAuth)(async(e,t)=>{var r;let u,d,p,{response:h}=await (0,i.withRateLimitPreset)(e,"aiGenerate");if(h)return h;let m=(d=(u=e.nextUrl.pathname.split("/")).indexOf("courses"),u[d+1]),f=await e.json().catch(()=>({})),g="string"==typeof f?.prompt?f.prompt.trim():"",R=Array.isArray(f?.references)?f.references.filter(e=>"string"==typeof e):[];if(!g&&0===R.length)throw new i.ValidationError("Prompt or references are required");let[w]=await n.drizzleDb.select({id:s.curriculum.id,subject:s.curriculum.subject,gradeLevel:s.curriculum.gradeLevel}).from(s.curriculum).where((0,o.and)((0,o.eq)(s.curriculum.id,m),(0,o.eq)(s.curriculum.creatorId,t.user.id)));if(!w)throw new i.NotFoundError("Course not found");let y=R.join("\n\n").slice(0,18e3);y.trim()||(y=await c(w.subject||g.split(/\s+/).slice(0,4).join(" ")));let v=(p=(r={tutorInstruction:g,references:y,subject:w.subject,gradeLevel:w.gradeLevel}).references.trim()?`Reference material:
${r.references.slice(0,18e3)}`:"No uploaded references were provided.",`
You are generating a complete course blueprint for tutors.

Tutor instruction:
${r.tutorInstruction}

Subject: ${r.subject||"general"}
Grade level: ${r.gradeLevel||"mixed"}

${p}

Return ONLY valid JSON with this exact shape:
{
  "modules": [
    {
      "title": "string",
      "description": "string",
      "lessons": [
        {
          "title": "string",
          "description": "string",
          "duration": 45,
          "tasks": [
            {
              "title": "string",
              "instructions": "string",
              "estimatedMinutes": 15,
              "points": 10,
              "questions": [
                {
                  "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
                  "question": "string",
                  "options": ["string"],
                  "correctAnswer": "string or array",
                  "points": 1
                }
              ]
            }
          ],
          "assessments": [
            {
              "title": "string",
              "instructions": "string",
              "estimatedMinutes": 30,
              "points": 20,
              "questions": [
                {
                  "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
                  "question": "string",
                  "options": ["string"],
                  "correctAnswer": "string or array",
                  "points": 1
                }
              ]
            }
          ],
          "worksheets": []
        }
      ],
      "exam": {
        "title": "string",
        "description": "string",
        "questions": [
          {
            "type": "mcq|truefalse|shortanswer|essay|multiselect|matching|fillblank",
            "question": "string",
            "options": ["string"],
            "correctAnswer": "string or array",
            "points": 1
          }
        ]
      }
    }
  ]
}

Rules:
- Generate a complete course with modules, lessons, tasks, assessments, and a module-level exam.
- Use the reference material where available.
- If reference material is absent, rely on reputable general curriculum patterns.
- Keep output concise and practical for real tutoring delivery.
`.trim()),x=await (0,l.generateWithFallback)(v,{temperature:.35,maxTokens:7e3,skipCache:!0}),E=x.content.match(/\{[\s\S]*\}/);if(!E)return a.NextResponse.json({error:"Failed to parse generated course structure"},{status:502});try{let e=JSON.parse(E[0]),t=Array.isArray(e?.modules)?e.modules:[];return a.NextResponse.json({success:!0,provider:x.provider,modules:t})}catch{return a.NextResponse.json({error:"Generated output was not valid JSON"},{status:502})}},{role:"TUTOR"});e.s(["POST",0,d]),r()}catch(e){r(e)}},!1),577471,e=>e.a(async(t,r)=>{try{var a=e.i(78315),i=e.i(586961),n=e.i(196657),s=e.i(899733),o=e.i(233979),l=e.i(631683),u=e.i(840960),c=e.i(711373),d=e.i(699699),p=e.i(521140),h=e.i(205260),m=e.i(500249),f=e.i(431740),g=e.i(82608),R=e.i(635207),w=e.i(193695);e.i(708038);var y=e.i(447430),v=e.i(494313),x=t([v]);[v]=x.then?(await x)():x;let C=new a.AppRouteRouteModule({definition:{kind:i.RouteKind.APP_ROUTE,page:"/api/tutor/courses/[id]/builder-generate/route",pathname:"/api/tutor/courses/[id]/builder-generate",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/app/api/tutor/courses/[id]/builder-generate/route.ts",nextConfigOutput:"",userland:v}),{workAsyncStorage:_,workUnitAsyncStorage:A,serverHooks:k}=C;function E(){return(0,n.patchFetch)({workAsyncStorage:_,workUnitAsyncStorage:A})}async function b(e,t,r){C.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let a="/api/tutor/courses/[id]/builder-generate/route";a=a.replace(/\/index$/,"")||"/";let n=await C.prepare(e,t,{srcPage:a,multiZoneDraftMode:!1});if(!n)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:v,params:x,nextConfig:E,parsedUrl:b,isDraftMode:_,prerenderManifest:A,routerServerContext:k,isOnDemandRevalidate:N,revalidateOnlyGenerated:P,resolvedPathname:O,clientReferenceManifest:T,serverActionsManifest:S}=n,q=(0,u.normalizeAppPath)(a),D=!!(A.dynamicRoutes[q]||A.routes[O]),j=async()=>((null==k?void 0:k.render404)?await k.render404(e,t,b,!1):t.end("This page could not be found"),null);if(D&&!_){let e=!!A.routes[O],t=A.dynamicRoutes[q];if(t&&!1===t.fallback&&!e){if(E.experimental.adapterPath)return await j();throw new w.NoFallbackError}}let U=null;!D||C.isDev||_||(U=O,U="/index"===U?"/":U);let I=!0===C.isDev||!D,M=D&&!I;S&&T&&(0,l.setManifestsSingleton)({page:a,clientReferenceManifest:T,serverActionsManifest:S});let H=e.method||"GET",$=(0,o.getTracer)(),L=$.getActiveScopeSpan(),F={params:x,prerenderManifest:A,renderOpts:{experimental:{authInterrupts:!!E.experimental.authInterrupts},cacheComponents:!!E.cacheComponents,supportsDynamicResponse:I,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:E.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,i)=>C.onRequestError(e,t,a,i,k)},sharedContext:{buildId:v}},K=new c.NodeNextRequest(e),z=new c.NodeNextResponse(t),B=d.NextRequestAdapter.fromNodeNextRequest(K,(0,d.signalFromNodeResponse)(t));try{let n=async e=>C.handle(B,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=$.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let t=`${H} ${i}`;e.setAttributes({"next.route":i,"http.route":i,"next.span_name":t}),e.updateName(t)}else e.updateName(`${H} ${a}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),u=async s=>{var o,u;let c=async({previousCacheEntry:i})=>{try{if(!l&&N&&P&&!i)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let a=await n(s);e.fetchMetrics=F.renderOpts.fetchMetrics;let o=F.renderOpts.pendingWaitUntil;o&&r.waitUntil&&(r.waitUntil(o),o=void 0);let u=F.renderOpts.collectedTags;if(!D)return await (0,m.sendResponse)(K,z,a,F.renderOpts.pendingWaitUntil),null;{let e=await a.blob(),t=(0,f.toNodeOutgoingHttpHeaders)(a.headers);u&&(t[R.NEXT_CACHE_TAGS_HEADER]=u),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=R.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,i=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=R.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:y.CachedRouteKind.APP_ROUTE,status:a.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:i}}}}catch(t){throw(null==i?void 0:i.isStale)&&await C.onRequestError(e,t,{routerKind:"App Router",routePath:a,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:N})},!1,k),t}},d=await C.handleResponse({req:e,nextConfig:E,cacheKey:U,routeKind:i.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:A,isRoutePPREnabled:!1,isOnDemandRevalidate:N,revalidateOnlyGenerated:P,responseGenerator:c,waitUntil:r.waitUntil,isMinimalMode:l});if(!D)return null;if((null==d||null==(o=d.value)?void 0:o.kind)!==y.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==d||null==(u=d.value)?void 0:u.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",N?"REVALIDATED":d.isMiss?"MISS":d.isStale?"STALE":"HIT"),_&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,f.fromNodeOutgoingHttpHeaders)(d.value.headers);return l&&D||p.delete(R.NEXT_CACHE_TAGS_HEADER),!d.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,g.getCacheControlHeader)(d.cacheControl)),await (0,m.sendResponse)(K,z,new Response(d.value.body,{headers:p,status:d.value.status||200})),null};L?await u(L):await $.withPropagatedContext(e.headers,()=>$.trace(p.BaseServerSpan.handleRequest,{spanName:`${H} ${a}`,kind:o.SpanKind.SERVER,attributes:{"http.method":H,"http.target":e.url}},u))}catch(t){if(t instanceof w.NoFallbackError||await C.onRequestError(e,t,{routerKind:"App Router",routePath:q,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:M,isOnDemandRevalidate:N})},!1,k),D)throw t;return await (0,m.sendResponse)(K,z,new Response(null,{status:500})),null}}e.s(["handler",()=>b,"patchFetch",()=>E,"routeModule",()=>C,"serverHooks",()=>k,"workAsyncStorage",()=>_,"workUnitAsyncStorage",()=>A]),r()}catch(e){r(e)}},!1),412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))}];

//# debugId=29d35b17-305f-19ce-d793-468ff5d5754a
//# sourceMappingURL=%5Broot-of-the-server%5D__b428cc66._.js.map