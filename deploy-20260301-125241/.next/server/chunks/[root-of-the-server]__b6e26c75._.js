;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="eed74375-0e78-0912-e643-0f9b59201415")}catch(e){}}();
module.exports=[902157,(e,t,s)=>{t.exports=e.x("node:fs",()=>require("node:fs"))},750227,(e,t,s)=>{t.exports=e.x("node:path",()=>require("node:path"))},450869,e=>{"use strict";let t="tutorme:query:",s=null,i=null,r=!1,o=!(void 0!==globalThis.EdgeRuntime||"u">typeof process&&0);function n(){return o?(i||(i=new Map),i):null}async function a(){if(!o)return null;if(r)return s;try{let t=process.env.REDIS_URL;if(!t)return console.log("[DB] Redis URL not configured, using in-memory cache"),r=!0,null;let{Redis:i}=await e.A(443460);return(s=new i(t,{retryStrategy:e=>Math.min(50*e,2e3),maxRetriesPerRequest:3})).on("error",e=>{console.error("[Redis] Connection error:",e),s=null}),console.log("[DB] Redis cache initialized"),r=!0,s}catch(e){return console.warn("[DB] Failed to initialize Redis, using in-memory cache"),r=!0,null}}if(o)try{let{drizzleDb:t}=e.r(738597);console.log("[DB] Drizzle client (default db) initialized")}catch(e){console.error("[DB] Failed to initialize Drizzle:",e)}e.s(["cache",0,{ensureRedis:async()=>o?(r||await a(),s):null,async get(e){if(!o)return null;let s=t+e,i=await this.ensureRedis();if(i)try{let e=await i.get(s);if(e)return JSON.parse(e)}catch(e){console.error("[Cache] Redis get error:",e)}let r=n();if(!r)return null;let a=r.get(s);return a&&a.expires>Date.now()?a.data:(r.delete(s),null)},async set(e,s,i=60){if(!o)return;let r=t+e,a=await this.ensureRedis();if(a)try{await a.setex(r,i,JSON.stringify(s));return}catch(e){console.error("[Cache] Redis set error:",e)}let l=n();l&&l.set(r,{data:s,expires:Date.now()+1e3*i})},async delete(e){if(!o)return;let s=t+e,i=await this.ensureRedis();if(i)try{await i.del(s)}catch(e){console.error("[Cache] Redis del error:",e)}let r=n();r&&r.delete(s)},async clear(){if(!o)return;let e=await this.ensureRedis();if(e)try{let s=await e.keys(t+"*");s.length>0&&await e.del(...s)}catch(e){console.error("[Cache] Redis clear error:",e)}let s=n();s&&s.clear()},async getOrSet(e,t,s=60){let i=await this.get(e);if(null!==i)return i;let r=await t();return await this.set(e,r,s),r},async invalidatePattern(e){if(!o)return;let s=await this.ensureRedis();if(s)try{let i=await s.keys(t+e);i.length>0&&await s.del(...i)}catch(e){console.error("[Cache] Pattern invalidation error:",e)}let i=n();if(i){let s=new RegExp(t+e.replace("*",".*"));for(let e of i.keys())s.test(e)&&i.delete(e)}}}])},120898,292828,e=>{"use strict";let t={socratic:{name:"Socratic Mode",description:"Learn by answering guided questions",systemPrompt:`You are a Socratic tutor. Your role is to guide students to discover answers themselves through questioning.

Rules:
1. NEVER give direct answers
2. Ask 1-2 guiding questions at a time
3. Build on what the student already knows
4. Use "What do you think...?" or "Why do you think...?" style questions
5. If stuck, provide a hint, not the answer
6. Celebrate correct thinking with encouragement

Current teaching style: Teaching like a {{teachingAge}}-year-old with a {{voiceGender}} {{voiceAccent}} voice.`,responseFormat:"Respond in a conversational, encouraging tone. Keep responses to 2-3 sentences maximum. End with a question that guides the student forward.",useSocraticMethod:!0},direct:{name:"Direct Teaching",description:"Clear explanations with examples",systemPrompt:`You are a direct, clear tutor who explains concepts thoroughly.

Rules:
1. Give clear, concise explanations
2. Use examples to illustrate concepts
3. Define technical terms when first used
4. Structure: Concept → Explanation → Example
5. Check for understanding: "Does that make sense?"
6. Invite follow-up questions

Current teaching style: Teaching like a {{teachingAge}}-year-old with a {{voiceGender}} {{voiceAccent}} voice.`,responseFormat:"Provide a 3-5 sentence explanation with one concrete example. Use formatting (bold for key terms) for clarity.",useSocraticMethod:!1},lesson:{name:"Full Lesson",description:"Complete structured lesson on a topic",systemPrompt:`You are conducting a structured lesson. Teach the topic comprehensively.

Structure your response:
1. **Introduction**: Why this matters (1-2 sentences)
2. **Key Concept**: Clear explanation with definition
3. **Example**: Step-by-step worked example
4. **Practice**: One exercise for the student to try
5. **Summary**: Key takeaways

Rules:
- Be thorough but concise
- Use the whiteboard for formulas/key points
- Progress gradually from simple to complex
- Pause for understanding

Current teaching style: Teaching like a {{teachingAge}}-year-old with a {{voiceGender}} {{voiceAccent}} voice.`,responseFormat:"Follow the 5-part structure above. Use markdown headers (##) for each section. Include a practice problem at the end.",useSocraticMethod:!1},practice:{name:"Practice Problems",description:"Focus on exercises and problem-solving",systemPrompt:`You are a practice coach. Focus on problem-solving and skill building.

Rules:
1. Present one problem at a time
2. Let the student attempt first
3. If stuck, give hints progressively
4. Celebrate correct answers
5. Explain the reasoning after success
6. Gradually increase difficulty

Current teaching style: Teaching like a {{teachingAge}}-year-old with a {{voiceGender}} {{voiceAccent}} voice.`,responseFormat:"Present one clear problem. Wait for the student's attempt before giving feedback. Use encouraging language.",useSocraticMethod:!0}};function s(e,t){return e.replace(/\{\{(\w+)\}\}/g,(e,s)=>t[s]?.toString()||e)}e.s(["commonTeachingModes",0,t,"fillTemplate",()=>s],292828);let i={friendly_mentor:`You are a warm, encouraging tutor who believes in the student's potential. 
Tone: Supportive, patient, optimistic
Style: Use "we" and "let's", celebrate small wins, offer reassurance
Example: "That's a great start! Let's build on that idea together."`,strict_coach:`You are a disciplined tutor who pushes students to excel.
Tone: Direct, challenging, results-focused
Style: Set high expectations, give constructive criticism, demand effort
Example: "Good, but you can do better. Try again with more precision."`,corporate_trainer:`You are a professional tutor focused on practical skills.
Tone: Professional, efficient, goal-oriented
Style: Use business analogies, focus on outcomes, be concise
Example: "Let's optimize your approach. Here's the most efficient method."`,funny_teacher:`You are an entertaining tutor who makes learning fun.
Tone: Playful, energetic, uses humor
Style: Use analogies, jokes, memes references (when appropriate)
Example: "Math is like a puzzle, but instead of losing pieces, you lose... wait, that's depressing. Let's try again!"`,calm_professor:`You are a knowledgeable, serene tutor who explains deeply.
Tone: Calm, thoughtful, philosophical
Style: Deep explanations, historical context, "big picture" thinking
Example: "Consider this concept from first principles. What is the fundamental nature of..."`};function r(e){let s=[];s.push("You are an AI tutor helping a student learn.");let r=t[e.teachingMode]||t.socratic;s.push(`
## Teaching Mode: ${r.name}`),s.push(r.systemPrompt);let o=i[e.personality]||i.friendly_mentor;return s.push(`
## Your Personality`),s.push(o),s.push(`
## Student Progress`),s.push(`- Level: ${e.gamification.level}`),s.push(`- XP: ${e.gamification.xp}`),s.push(`- Streak: ${e.gamification.streakDays} days`),Object.keys(e.gamification.skills).length>0&&s.push(`- Skills: ${JSON.stringify(e.gamification.skills)}`),e.mission&&(s.push(`
## Current Mission`),s.push(`World: ${e.mission.worldEmoji} ${e.mission.worldName}`),s.push(`Mission: ${e.mission.missionTitle}`),s.push(`Objective: ${e.mission.missionObjective}`),s.push(`Type: ${e.mission.missionType}`),s.push(`Difficulty: ${e.mission.difficulty}`),e.mission.vocabulary?.length&&s.push(`Vocabulary focus: ${e.mission.vocabulary.join(", ")}`),e.mission.grammarFocus&&s.push(`Grammar focus: ${e.mission.grammarFocus}`)),s.push(`
## Tier Settings`),"FREE"===e.tier?(s.push("- Response limit: 300 tokens"),s.push("- Available modes: socratic, direct")):"BASIC"===e.tier?(s.push("- Response limit: 800 tokens"),s.push("- Available modes: socratic, direct, lesson")):(s.push("- Response limit: 2048 tokens"),s.push("- All features enabled")),s.push(`
## Language`),s.push("zh"===e.language?"Respond in Chinese (中文)":"Respond in English"),s.push(`
## Response Format`),s.push(r.responseFormat),e.chatHistory.length>0&&(s.push(`
## Conversation History`),e.chatHistory.slice(-5).forEach(e=>{s.push(`${"user"===e.role?"Student":"Tutor"}: ${e.content}`)})),s.push(`
## Current Message`),s.push(`Student: ${e.userMessage}`),s.push(`
Tutor:`),s.join("\n")}e.s(["buildCompletePrompt",()=>r],120898)},443460,e=>{e.v(t=>Promise.all(["server/chunks/[externals]_ioredis_c74819ca._.js"].map(t=>e.l(t))).then(()=>t(693545)))},412171,e=>{e.v(t=>Promise.all(["server/chunks/b1c00_TutorMekimi_tutorme-app_src_lib_security_suspicious-activity_ts_7865686f._.js"].map(t=>e.l(t))).then(()=>t(145830)))},571363,e=>{e.v(t=>Promise.all(["server/chunks/ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_security_api-key_ts_45091e81._.js"].map(t=>e.l(t))).then(()=>t(175922)))}];

//# debugId=eed74375-0e78-0912-e643-0f9b59201415
//# sourceMappingURL=%5Broot-of-the-server%5D__b6e26c75._.js.map