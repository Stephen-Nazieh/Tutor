;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b3f556c3-0de2-f982-0699-8725e17d4f05")}catch(e){}}();
module.exports=[902157,(e,r,t)=>{r.exports=e.x("node:fs",()=>require("node:fs"))},750227,(e,r,t)=>{r.exports=e.x("node:path",()=>require("node:path"))},450869,e=>{"use strict";let r="tutorme:query:",t=null,s=null,i=!1,n=!(void 0!==globalThis.EdgeRuntime||"u">typeof process&&0);function o(){return n?(s||(s=new Map),s):null}async function u(){if(!n)return null;if(i)return t;try{let r=process.env.REDIS_URL;if(!r)return console.log("[DB] Redis URL not configured, using in-memory cache"),i=!0,null;let{Redis:s}=await e.A(443460);return(t=new s(r,{retryStrategy:e=>Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("error",e=>{console.error("[Redis] Connection error:",e),t=null}),console.log("[DB] Redis cache initialized"),i=!0,t}catch(e){return console.warn("[DB] Failed to initialize Redis, using in-memory cache"),i=!0,null}}if(n)try{let{drizzleDb:r}=e.r(738597);console.log("[DB] Drizzle client (default db) initialized")}catch(e){console.error("[DB] Failed to initialize Drizzle:",e)}e.s(["cache",0,{ensureRedis:async()=>n?(i||await u(),t):null,async get(e){if(!n)return null;let t=r+e,s=await this.ensureRedis();if(s)try{let e=await s.get(t);if(e)return JSON.parse(e)}catch(e){console.error("[Cache] Redis get error:",e)}let i=o();if(!i)return null;let u=i.get(t);return u&&u.expires>Date.now()?u.data:(i.delete(t),null)},async set(e,t,s=60){if(!n)return;let i=r+e,u=await this.ensureRedis();if(u)try{await u.setex(i,s,JSON.stringify(t));return}catch(e){console.error("[Cache] Redis set error:",e)}let c=o();c&&c.set(i,{data:t,expires:Date.now()+1e3*s})},async delete(e){if(!n)return;let t=r+e,s=await this.ensureRedis();if(s)try{await s.del(t)}catch(e){console.error("[Cache] Redis del error:",e)}let i=o();i&&i.delete(t)},async clear(){if(!n)return;let e=await this.ensureRedis();if(e)try{let t=await e.keys(r+"*");t.length>0&&await e.del(...t)}catch(e){console.error("[Cache] Redis clear error:",e)}let t=o();t&&t.clear()},async getOrSet(e,r,t=60){let s=await this.get(e);if(null!==s)return s;let i=await r();return await this.set(e,i,t),i},async invalidatePattern(e){if(!n)return;let t=await this.ensureRedis();if(t)try{let s=await t.keys(r+e);s.length>0&&await t.del(...s)}catch(e){console.error("[Cache] Pattern invalidation error:",e)}let s=o();if(s){let t=new RegExp(r+e.replace("*",".*"));for(let e of s.keys())t.test(e)&&s.delete(e)}}}])},116192,e=>e.a(async(r,t)=>{try{var s=e.i(909105),i=e.i(320947),n=e.i(738597);e.i(688768);var o=e.i(257357),u=r([n]);[n]=u.then?(await u)():u;let f=["introduction","concept","example","practice","review"];async function c(e,r){let[t]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,r)).limit(1);if(!t)throw Error("Lesson not found");let[u]=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.id,t.moduleId)).limit(1);if(!u)throw Error("Module not found");let c=t.prerequisiteLessonIds||[];if(c.length>0){let[r]=await n.drizzleDb.select({count:i.sql`count(*)::int`}).from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.studentId,e),(0,s.inArray)(o.curriculumLessonProgress.lessonId,c),(0,s.eq)(o.curriculumLessonProgress.status,"COMPLETED")));if((r?.count??0)<c.length)throw Error("Prerequisites not met")}let[l]=await n.drizzleDb.select().from(o.lessonSession).where((0,s.and)((0,s.eq)(o.lessonSession.studentId,e),(0,s.eq)(o.lessonSession.lessonId,r))).limit(1);if(l&&"completed"!==l.status)return l;await n.drizzleDb.insert(o.curriculumLessonProgress).values({id:crypto.randomUUID(),lessonId:r,studentId:e,status:"IN_PROGRESS",currentSection:"introduction",updatedAt:new Date}).onConflictDoUpdate({target:[o.curriculumLessonProgress.lessonId,o.curriculumLessonProgress.studentId],set:{status:"IN_PROGRESS",currentSection:"introduction"}});let[a]=await n.drizzleDb.insert(o.lessonSession).values({id:crypto.randomUUID(),studentId:e,lessonId:r,status:"active",currentSection:"introduction",conceptMastery:{},misconceptions:[],whiteboardItems:[],sessionContext:{messages:[],currentStep:0,introductionDone:!1,conceptExplained:!1,exampleWalked:!1,practiceDone:!1,reviewDone:!1}}).returning();if(!a)throw Error("Failed to create lesson session");return a}async function l(e,r){let t=f.indexOf(e.currentSection);if(t>=f.length-1)return await d(e.id),{newSection:"review",sectionComplete:!0,lessonComplete:!0};let i=f[t+1],u=e.sessionContext||{};return u[`${e.currentSection}Done`]=!0,u.currentStep=0,await n.drizzleDb.update(o.lessonSession).set({currentSection:i,sessionContext:u}).where((0,s.eq)(o.lessonSession.id,e.id)),await n.drizzleDb.update(o.curriculumLessonProgress).set({currentSection:i}).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,e.lessonId),(0,s.eq)(o.curriculumLessonProgress.studentId,e.studentId))),{newSection:i,sectionComplete:!0,lessonComplete:!1}}function a(e,r,t){let s={introduction:`
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
课程名称: ${r.title}
课程描述: ${r.description||"N/A"}
难度级别: ${r.difficulty}
预计时长: ${r.duration} 分钟

## 学习目标
${(r.learningObjectives||[]).map(e=>`- ${e}`).join("\n")}

## 教学要点
${(r.teachingPoints||[]).map(e=>`- ${e}`).join("\n")}

## 关键概念
${(r.keyConcepts||[]).map(e=>`- ${e}`).join("\n")}

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
${Object.entries(e.conceptMastery||{}).map(([e,r])=>`- ${e}: ${r}%`).join("\n")||"暂无数据"}

## 常见误解（需要留意）
${(r.commonMisconceptions||[]).map(e=>`- ${e}`).join("\n")}

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
${t}

请根据当前阶段指导提供回应。如果需要显示公式、代码或步骤，请在回应后用 JSON 格式提供白板内容。

白板 JSON 格式示例:
{
  "whiteboardItems": [
    {"type": "formula", "content": "E = mc\xb2", "caption": "质能方程"},
    {"type": "code", "content": "x = 5 + 3", "caption": "示例代码"}
  ],
  "understandingLevel": 80,
  "nextSection": "concept"
}`}async function d(r){let[t]=await n.drizzleDb.select().from(o.lessonSession).where((0,s.eq)(o.lessonSession.id,r)).limit(1);if(!t)return;let[u]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,t.lessonId)).limit(1);if(!u)return;let[c]=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.id,u.moduleId)).limit(1);if(!c)return;let l=c.curriculumId,a=t.conceptMastery||{},d=Object.keys(a).length>0?Object.values(a).reduce((e,r)=>e+r,0)/Object.keys(a).length:0;await n.drizzleDb.transaction(async e=>{await e.update(o.lessonSession).set({status:"completed",completedAt:new Date}).where((0,s.eq)(o.lessonSession.id,r)),await e.update(o.curriculumLessonProgress).set({status:"COMPLETED",completedAt:new Date,score:Math.round(d)}).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,t.lessonId),(0,s.eq)(o.curriculumLessonProgress.studentId,t.studentId)));let[n]=await e.select({count:i.sql`count(*)::int`}).from(o.curriculumLesson).innerJoin(o.curriculumModule,(0,s.eq)(o.curriculumModule.id,o.curriculumLesson.moduleId)).where((0,s.eq)(o.curriculumModule.curriculumId,l)),u=n?.count??0,[c]=await e.select().from(o.curriculumProgress).where((0,s.and)((0,s.eq)(o.curriculumProgress.studentId,t.studentId),(0,s.eq)(o.curriculumProgress.curriculumId,l))).limit(1);c?await e.update(o.curriculumProgress).set({lessonsCompleted:c.lessonsCompleted+1,currentLessonId:t.lessonId,averageScore:d}).where((0,s.and)((0,s.eq)(o.curriculumProgress.studentId,t.studentId),(0,s.eq)(o.curriculumProgress.curriculumId,l))):await e.insert(o.curriculumProgress).values({id:crypto.randomUUID(),studentId:t.studentId,curriculumId:l,lessonsCompleted:1,totalLessons:u,currentLessonId:t.lessonId,averageScore:d,isCompleted:!1})});try{let{onLessonComplete:r}=await e.A(639477);await r(t.studentId,t.lessonId)}catch(e){console.error("Failed to award lesson completion XP:",e)}}async function m(e,r){for(let t of(await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.curriculumId,r)).orderBy(o.curriculumModule.order)))for(let r of(await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.moduleId,t.id)).orderBy(o.curriculumLesson.order))){let[u]=await n.drizzleDb.select().from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,r.id),(0,s.eq)(o.curriculumLessonProgress.studentId,e))).limit(1);if(u?.status==="COMPLETED")continue;let c=r.prerequisiteLessonIds||[];if(c.length>0){let[r]=await n.drizzleDb.select({count:i.sql`count(*)::int`}).from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.studentId,e),(0,s.inArray)(o.curriculumLessonProgress.lessonId,c),(0,s.eq)(o.curriculumLessonProgress.status,"COMPLETED")));if((r?.count??0)<c.length)continue}return{lessonId:r.id,title:r.title,moduleTitle:t.title}}return null}async function p(e,r){let[t]=await n.drizzleDb.select().from(o.curriculum).where((0,s.eq)(o.curriculum.id,r)).limit(1);if(!t)throw Error("Curriculum not found");let i=await n.drizzleDb.select().from(o.curriculumModule).where((0,s.eq)(o.curriculumModule.curriculumId,r)).orderBy(o.curriculumModule.order),u=0,c=0,l="";for(let r of i)for(let t of(await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.moduleId,r.id)).orderBy(o.curriculumLesson.order))){u++;let[i]=await n.drizzleDb.select().from(o.curriculumLessonProgress).where((0,s.and)((0,s.eq)(o.curriculumLessonProgress.lessonId,t.id),(0,s.eq)(o.curriculumLessonProgress.studentId,e))).limit(1);i?.status==="COMPLETED"?c++:l||i?.status!=="IN_PROGRESS"||(l=r.title)}return{totalLessons:u,completedLessons:c,currentModule:l||i[0]?.title||"",overallProgress:u>0?Math.round(c/u*100):0}}async function w(e){let[r]=await n.drizzleDb.select().from(o.curriculumLesson).where((0,s.eq)(o.curriculumLesson.id,e)).limit(1);if(!r)throw Error("Lesson not found");return{id:r.id,title:r.title,description:r.description||void 0,duration:r.duration,difficulty:r.difficulty,learningObjectives:r.learningObjectives||[],teachingPoints:r.teachingPoints||[],keyConcepts:r.keyConcepts||[],examples:r.examples||[],practiceProblems:r.practiceProblems||[],commonMisconceptions:r.commonMisconceptions||[]}}e.s(["advanceLesson",()=>l,"buildCurriculumPrompt",()=>a,"getLessonContent",()=>w,"getNextLesson",()=>m,"getStudentProgress",()=>p,"startLesson",()=>c]),t()}catch(e){t(e)}},!1),412171,e=>{e.v(r=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(r=>e.l(r))).then(()=>r(145830)))},443460,e=>{e.v(r=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(r=>e.l(r))).then(()=>r(693545)))},571363,e=>{e.v(r=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(r=>e.l(r))).then(()=>r(175922)))},639477,e=>{e.v(r=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_fb57774d._.js","server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_a22ba6d4._.js"].map(r=>e.l(r))).then(()=>r(433122)))}];

//# debugId=b3f556c3-0de2-f982-0699-8725e17d4f05
//# sourceMappingURL=%5Broot-of-the-server%5D__47e9cc8d._.js.map