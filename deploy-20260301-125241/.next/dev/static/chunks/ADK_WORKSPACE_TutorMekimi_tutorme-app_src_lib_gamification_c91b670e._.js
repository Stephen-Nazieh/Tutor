;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="c15f366f-6f85-1d20-073a-a414cef4b932")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ACTIVITY_EVENTS",
    ()=>ACTIVITY_EVENTS,
    "calculateEngagementScore",
    ()=>calculateEngagementScore,
    "getActivityCounts",
    ()=>getActivityCounts,
    "getRecentActivities",
    ()=>getRecentActivities,
    "getStreakHistory",
    ()=>getStreakHistory,
    "logActivity",
    ()=>logActivity
]);
/**
 * Activity Log Service
 * 
 * Tracks user activities for analytics and retention insights
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-client] (ecmascript) <locals>");
;
const ACTIVITY_EVENTS = {
    // XP & Leveling
    XP_EARNED: 'xp_earned',
    LEVEL_UP: 'level_up',
    // Streaks
    STREAK_UPDATED: 'streak_updated',
    STREAK_BROKEN: 'streak_broken',
    // Worlds & Missions
    WORLD_UNLOCK: 'world_unlock',
    MISSION_START: 'mission_start',
    MISSION_COMPLETE: 'mission_complete',
    MISSION_ABANDON: 'mission_abandon',
    // Skills
    CONFIDENCE_MILESTONE: 'confidence_milestone',
    SKILL_IMPROVEMENT: 'skill_improvement',
    // AI Tutor
    AI_SESSION_START: 'ai_session_start',
    AI_SESSION_END: 'ai_session_end',
    PERSONALITY_SWITCH: 'personality_switch',
    // Learning
    LESSON_COMPLETE: 'lesson_complete',
    QUIZ_COMPLETE: 'quiz_complete',
    // Subscription
    SUBSCRIPTION_UPGRADE: 'subscription_upgrade',
    SUBSCRIPTION_DOWNGRADE: 'subscription_downgrade',
    // Engagement
    DAILY_LOGIN: 'daily_login',
    QUEST_COMPLETE: 'quest_complete'
};
async function logActivity(userId, eventType, metadata) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.create({
            data: {
                userId,
                eventType,
                metadata: metadata || {}
            }
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
}
async function getRecentActivities(userId, limit = 20, eventTypes) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.findMany({
        where: {
            userId,
            ...eventTypes && {
                eventType: {
                    in: eventTypes
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit
    });
}
async function getActivityCounts(userId, startDate, endDate) {
    const activities = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.groupBy({
        by: [
            'eventType'
        ],
        where: {
            userId,
            createdAt: {
                gte: startDate,
                lte: endDate
            }
        },
        _count: {
            eventType: true
        }
    });
    const result = {};
    activities.forEach((item)=>{
        result[item.eventType] = item._count.eventType;
    });
    return result;
}
async function getStreakHistory(userId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const activities = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userActivityLog.findMany({
        where: {
            userId,
            eventType: {
                in: [
                    'daily_login',
                    'streak_updated',
                    'streak_broken'
                ]
            },
            createdAt: {
                gte: startDate
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    return activities;
}
async function calculateEngagementScore(userId) {
    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);
    const activities = await getActivityCounts(userId, last7Days, new Date());
    // Simple scoring algorithm
    let score = 0;
    // Daily login (up to 30 points)
    score += Math.min(30, (activities['daily_login'] || 0) * 5);
    // Mission completion (up to 40 points)
    score += Math.min(40, (activities['mission_complete'] || 0) * 10);
    // AI sessions (up to 20 points)
    score += Math.min(20, (activities['ai_session_end'] || 0) * 5);
    // Skill improvement (up to 10 points)
    score += Math.min(10, (activities['skill_improvement'] || 0) * 2);
    return Math.min(100, score);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AVATAR_PERSONALITIES",
    ()=>AVATAR_PERSONALITIES,
    "XP_REWARDS",
    ()=>XP_REWARDS,
    "awardXp",
    ()=>awardXp,
    "calculateLevel",
    ()=>calculateLevel,
    "canAccessWorld",
    ()=>canAccessWorld,
    "checkDailyLogin",
    ()=>checkDailyLogin,
    "getGamificationSummary",
    ()=>getGamificationSummary,
    "getLevelProgress",
    ()=>getLevelProgress,
    "getOrCreateGamification",
    ()=>getOrCreateGamification,
    "getXpForNextLevel",
    ()=>getXpForNextLevel,
    "unlockWorld",
    ()=>unlockWorld,
    "updateSkillScores",
    ()=>updateSkillScores,
    "updateStreak",
    ()=>updateStreak
]);
/**
 * Gamification Service
 * 
 * Handles XP, Level, Streak, and Skill Score calculations
 * Merged Socratic teaching with Gamified Avatar personalities
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/gamification/activity-log.ts [app-client] (ecmascript)");
;
;
// XP required for each level (exponential growth)
const XP_LEVELS = {
    1: 0,
    2: 200,
    3: 500,
    4: 1000,
    5: 1800,
    6: 3000,
    7: 4600,
    8: 6600,
    9: 9100,
    10: 12100,
    11: 15600,
    12: 19600,
    13: 24100,
    14: 29100,
    15: 34600,
    16: 40600,
    17: 47100,
    18: 54100,
    19: 61600,
    20: 69600
};
const XP_REWARDS = {
    COMPLETE_MISSION: 50,
    PERFECT_QUIZ: 20,
    DAILY_LOGIN: 10,
    STREAK_3_DAYS: 50,
    STREAK_7_DAYS: 150,
    STREAK_30_DAYS: 500,
    SPEAKING_PRACTICE: 30,
    AI_CONVERSATION: 40,
    COMPLETE_LESSON: 40,
    FIRST_MISSION: 100
};
const AVATAR_PERSONALITIES = {
    friendly_mentor: {
        id: 'friendly_mentor',
        name: 'Friendly Mentor',
        description: 'Warm, supportive, and encouraging',
        tone: 'warm and supportive',
        usesEmojis: true,
        correctionStyle: 'gentle',
        encouragement: 'frequent',
        socraticBalance: 0.6,
        voiceStyle: 'encouraging',
        examplePhrases: {
            greeting: "Hey there! I'm so excited to learn with you today!",
            correction: "Almost perfect! Here's a slightly smoother way to say that:",
            encouragement: "You're doing amazing! I can see your confidence growing!",
            socraticPrompt: "That's a great start! What do you think would happen if...?"
        }
    },
    strict_coach: {
        id: 'strict_coach',
        name: 'Strict Coach',
        description: 'Professional, direct, and disciplined',
        tone: 'professional and direct',
        usesEmojis: false,
        correctionStyle: 'immediate',
        encouragement: 'achievement-based',
        socraticBalance: 0.4,
        voiceStyle: 'authoritative',
        examplePhrases: {
            greeting: "Let's begin. Today's focus is clear communication.",
            correction: "Correction: Use present perfect with 'for' + duration.",
            encouragement: "Good. Your accuracy improved by 15% this week.",
            socraticPrompt: "Consider this: what is the core issue in your sentence?"
        }
    },
    corporate_trainer: {
        id: 'corporate_trainer',
        name: 'Corporate Trainer',
        description: 'Business-focused and performance-oriented',
        tone: 'business professional',
        usesEmojis: false,
        correctionStyle: 'constructive',
        encouragement: 'performance-focused',
        socraticBalance: 0.5,
        voiceStyle: 'professional',
        examplePhrases: {
            greeting: "Welcome. Let's work on your professional communication skills.",
            correction: "In a business context, consider this phrasing instead:",
            encouragement: "Your professional articulation is showing measurable improvement.",
            socraticPrompt: "From a stakeholder perspective, how would you frame this?"
        }
    },
    funny_teacher: {
        id: 'funny_teacher',
        name: 'Funny Teacher',
        description: 'Light, humorous, and engaging',
        tone: 'light and humorous',
        usesEmojis: true,
        correctionStyle: 'playful',
        encouragement: 'enthusiastic',
        socraticBalance: 0.7,
        voiceStyle: 'friendly',
        examplePhrases: {
            greeting: "Ready to level up your English? Let's make some grammar magic!",
            correction: "Oops! Let's give that sentence a little makeover!",
            encouragement: "Boom! You're crushing it! High five!",
            socraticPrompt: "Ooh, interesting! But what if we looked at it this way...?"
        }
    },
    calm_professor: {
        id: 'calm_professor',
        name: 'Calm Professor',
        description: 'Patient, thoughtful, and explanatory',
        tone: 'patient and thoughtful',
        usesEmojis: false,
        correctionStyle: 'explanatory',
        encouragement: 'steady',
        socraticBalance: 0.8,
        voiceStyle: 'calm',
        examplePhrases: {
            greeting: "Welcome. Take your time, and let's explore this together.",
            correction: "I see your thought process. Let's refine it gently:",
            encouragement: "Your progress is steady and meaningful. Well done.",
            socraticPrompt: "That's an interesting approach. What led you to that conclusion?"
        }
    }
};
async function getOrCreateGamification(userId) {
    let gamification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.findUnique({
        where: {
            userId
        }
    });
    if (!gamification) {
        gamification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.create({
            data: {
                userId,
                level: 1,
                xp: 0,
                streakDays: 0,
                longestStreak: 0
            }
        });
    }
    return gamification;
}
function calculateLevel(xp) {
    let level = 1;
    for(let i = 1; i <= 20; i++){
        if (xp >= XP_LEVELS[i]) {
            level = i;
        } else {
            break;
        }
    }
    return level;
}
function getXpForNextLevel(currentLevel) {
    return XP_LEVELS[currentLevel + 1] || XP_LEVELS[20] * 2;
}
function getLevelProgress(xp, level) {
    const currentLevelXp = XP_LEVELS[level];
    const nextLevelXp = XP_LEVELS[level + 1] || XP_LEVELS[20] * 2;
    const xpInLevel = xp - currentLevelXp;
    const xpNeeded = nextLevelXp - currentLevelXp;
    return Math.min(100, Math.round(xpInLevel / xpNeeded * 100));
}
async function awardXp(userId, amount, source, metadata) {
    const gamification = await getOrCreateGamification(userId);
    const newXp = gamification.xp + amount;
    const newLevel = calculateLevel(newXp);
    const leveledUp = newLevel > gamification.level;
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            xp: newXp,
            level: newLevel
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'XP_EARNED', {
        amount,
        source,
        newTotal: newXp,
        leveledUp,
        ...metadata
    });
    return {
        ...updated,
        xpEarned: amount,
        leveledUp,
        previousLevel: gamification.level
    };
}
async function updateStreak(userId) {
    const gamification = await getOrCreateGamification(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = gamification.lastActiveDate ? new Date(gamification.lastActiveDate) : null;
    let newStreak = gamification.streakDays;
    let streakBonus = 0;
    let streakContinued = false;
    let streakBroken = false;
    if (lastActive) {
        lastActive.setHours(0, 0, 0, 0);
        const diffDays = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            newStreak += 1;
            streakContinued = true;
            if (newStreak === 3) streakBonus = XP_REWARDS.STREAK_3_DAYS;
            else if (newStreak === 7) streakBonus = XP_REWARDS.STREAK_7_DAYS;
            else if (newStreak === 30) streakBonus = XP_REWARDS.STREAK_30_DAYS;
        } else if (diffDays === 0) {
            streakContinued = true;
        } else {
            streakBroken = true;
            newStreak = 1;
        }
    } else {
        newStreak = 1;
    }
    const longestStreak = Math.max(gamification.longestStreak, newStreak);
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            streakDays: newStreak,
            longestStreak,
            lastActiveDate: today
        }
    });
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logActivity"])(userId, streakBroken ? 'STREAK_BROKEN' : 'STREAK_UPDATED', {
        streakDays: newStreak,
        previousStreak: gamification.streakDays,
        streakBroken,
        streakContinued
    });
    return {
        ...updated,
        streakBonus,
        streakContinued,
        streakBroken
    };
}
async function checkDailyLogin(userId) {
    const gamification = await getOrCreateGamification(userId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastActive = gamification.lastActiveDate ? new Date(gamification.lastActiveDate) : null;
    if (!lastActive || lastActive.getTime() !== today.getTime()) {
        const streakResult = await updateStreak(userId);
        const xpResult = await awardXp(userId, XP_REWARDS.DAILY_LOGIN, 'daily_login');
        return {
            firstLoginToday: true,
            xpEarned: xpResult.xpEarned + streakResult.streakBonus,
            streakBonus: streakResult.streakBonus,
            streakDays: streakResult.streakDays,
            leveledUp: xpResult.leveledUp
        };
    }
    return {
        firstLoginToday: false,
        streakDays: gamification.streakDays
    };
}
async function updateSkillScores(userId, scores) {
    const gamification = await getOrCreateGamification(userId);
    const calculateScore = (existing, newScore)=>{
        if (newScore === undefined) return existing;
        return Math.round(existing * 0.7 + newScore * 0.3);
    };
    const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
        where: {
            userId
        },
        data: {
            grammarScore: calculateScore(gamification.grammarScore, scores.grammar),
            vocabularyScore: calculateScore(gamification.vocabularyScore, scores.vocabulary),
            speakingScore: calculateScore(gamification.speakingScore, scores.speaking),
            listeningScore: calculateScore(gamification.listeningScore, scores.listening),
            confidenceScore: calculateScore(gamification.confidenceScore, scores.confidence),
            fluencyScore: calculateScore(gamification.fluencyScore, scores.fluency)
        }
    });
    if (scores.confidence && scores.confidence > gamification.confidenceScore + 5) {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'CONFIDENCE_MILESTONE', {
            previousScore: gamification.confidenceScore,
            newScore: updated.confidenceScore,
            delta: updated.confidenceScore - gamification.confidenceScore
        });
    }
    return updated;
}
async function getGamificationSummary(userId) {
    const gamification = await getOrCreateGamification(userId);
    const nextLevelXp = getXpForNextLevel(gamification.level);
    const currentLevelXp = XP_LEVELS[gamification.level];
    const progress = getLevelProgress(gamification.xp, gamification.level);
    return {
        level: gamification.level,
        xp: gamification.xp,
        nextLevelXp,
        currentLevelXp,
        progress,
        xpToNextLevel: nextLevelXp - gamification.xp,
        streakDays: gamification.streakDays,
        longestStreak: gamification.longestStreak,
        skills: {
            grammar: gamification.grammarScore,
            vocabulary: gamification.vocabularyScore,
            speaking: gamification.speakingScore,
            listening: gamification.listeningScore,
            confidence: gamification.confidenceScore,
            fluency: gamification.fluencyScore
        },
        unlockedWorlds: gamification.unlockedWorlds
    };
}
async function unlockWorld(userId, worldId) {
    const gamification = await getOrCreateGamification(userId);
    const current = gamification.unlockedWorlds ?? [];
    if (!current.includes(worldId)) {
        const updated = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].userGamification.update({
            where: {
                userId
            },
            data: {
                unlockedWorlds: [
                    ...current,
                    worldId
                ]
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$gamification$2f$activity$2d$log$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logActivity"])(userId, 'WORLD_UNLOCK', {
            worldId
        });
        return {
            unlocked: true,
            updated
        };
    }
    return {
        unlocked: false
    };
}
async function canAccessWorld(userId, requiredLevel) {
    const gamification = await getOrCreateGamification(userId);
    return gamification.level >= requiredLevel;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=c15f366f-6f85-1d20-073a-a414cef4b932
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_gamification_c91b670e._.js.map