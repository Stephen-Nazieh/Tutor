;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="34cfb211-a722-7db1-0018-6e04971cd9e5")}catch(e){}}();
(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/notifications/notify.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addSSEListener",
    ()=>addSSEListener,
    "notify",
    ()=>notify,
    "notifyMany",
    ()=>notifyMany
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
/**
 * Central Notification Service
 *
 * Handles all three channels in one call:
 *  - In-app (DB record)
 *  - Email (via Resend API)
 *  - Real-time push (via SSE broadcast)
 *
 * Usage:
 *   import { notify, notifyMany } from '@/lib/notifications/notify'
 *   await notify({ userId, type: 'assignment', title, message, actionUrl })
 *   await notifyMany({ userIds: [...], type, title, message })
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/ADK_WORKSPACE/TutorMekimi/tutorme-app/src/lib/db/index.ts [client] (ecmascript) <locals>");
;
const sseListeners = new Map();
function addSSEListener(userId, cb) {
    if (!sseListeners.has(userId)) sseListeners.set(userId, new Set());
    sseListeners.get(userId).add(cb);
    return ()=>{
        sseListeners.get(userId)?.delete(cb);
        if (sseListeners.get(userId)?.size === 0) sseListeners.delete(userId);
    };
}
function broadcastToUser(userId, notification) {
    const listeners = sseListeners.get(userId);
    if (listeners) {
        for (const cb of listeners){
            try {
                cb(notification);
            } catch  {}
        }
    }
}
async function getChannelDecision(userId, type, force) {
    if (force) return {
        inApp: true,
        email: true,
        push: true
    };
    const prefs = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notificationPreference.findUnique({
        where: {
            userId
        }
    });
    if (!prefs) return {
        inApp: true,
        email: true,
        push: true
    } // defaults
    ;
    // Start with global toggles
    let decision = {
        inApp: prefs.inAppEnabled,
        email: prefs.emailEnabled,
        push: prefs.pushEnabled
    };
    // Apply per-type overrides
    const overrides = prefs.channelOverrides;
    if (overrides && overrides[type]) {
        const typeOverride = overrides[type];
        if (typeof typeOverride.inApp === 'boolean') decision.inApp = typeOverride.inApp;
        if (typeof typeOverride.email === 'boolean') decision.email = typeOverride.email;
        if (typeof typeOverride.push === 'boolean') decision.push = typeOverride.push;
    }
    // Check quiet hours for push/email
    if (prefs.quietHoursStart && prefs.quietHoursEnd) {
        const isQuiet = isInQuietHours(prefs.quietHoursStart, prefs.quietHoursEnd, prefs.timezone);
        if (isQuiet) {
            decision.push = false;
        // Email follows digest preference during quiet hours
        }
    }
    // Email digest: if not "instant", skip immediate email
    if (prefs.emailDigest !== 'instant') {
        decision.email = false;
    }
    return decision;
}
function isInQuietHours(start, end, timezone) {
    try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const currentTime = formatter.format(now) // "HH:MM"
        ;
        // Simple string comparison works for HH:mm format
        if (start <= end) {
            return currentTime >= start && currentTime <= end;
        }
        // Wraps midnight (e.g. 22:00 - 07:00)
        return currentTime >= start || currentTime <= end;
    } catch  {
        return false;
    }
}
// ---- Email Sending ----
async function sendNotificationEmail(userId, type, title, message, actionUrl) {
    const apiKey = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.RESEND_API_KEY;
    if (!apiKey) {
        console.log(`[notify-email] (no RESEND_API_KEY) Would email user ${userId}: ${title}`);
        return;
    }
    // Fetch user email
    const user = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].user.findUnique({
        where: {
            id: userId
        },
        select: {
            email: true,
            name: true
        }
    });
    if (!user?.email) return;
    const from = __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NOTIFICATION_EMAIL_FROM || 'TutorMe <notifications@tutorme.com>';
    const appUrl = ("TURBOPACK compile-time value", "http://localhost:3003") || 'http://localhost:3000';
    const actionButton = actionUrl ? `<p style="margin-top:16px"><a href="${appUrl}${actionUrl}" style="background:#3b82f6;color:white;padding:10px 20px;border-radius:6px;text-decoration:none;display:inline-block">View Details</a></p>` : '';
    const html = `
    <div style="max-width:480px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
      <div style="padding:24px;background:#f8fafc;border-radius:12px">
        <h2 style="margin:0 0 8px;color:#1e293b;font-size:18px">${title}</h2>
        <p style="margin:0;color:#475569;font-size:14px;line-height:1.6">${message}</p>
        ${actionButton}
      </div>
      <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:16px">
        You can <a href="${appUrl}/student/settings" style="color:#3b82f6">manage your notification preferences</a>.
      </p>
    </div>
  `;
    try {
        const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                from,
                to: user.email,
                subject: `${title} – TutorMe`,
                html
            })
        });
        if (!res.ok) {
            const err = await res.text();
            console.error(`[notify-email] Resend failed:`, res.status, err);
        }
    } catch (e) {
        console.error(`[notify-email] Send failed:`, e);
    }
}
async function notify(params) {
    const { userId, type, title, message, data, actionUrl, force = false } = params;
    const channels = await getChannelDecision(userId, type, force);
    let notification = null;
    // 1. In-app notification (DB)
    if (channels.inApp) {
        notification = await __TURBOPACK__imported__module__$5b$project$5d2f$ADK_WORKSPACE$2f$TutorMekimi$2f$tutorme$2d$app$2f$src$2f$lib$2f$db$2f$index$2e$ts__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["db"].notification.create({
            data: {
                userId,
                type,
                title,
                message,
                data: data ?? undefined,
                actionUrl
            }
        });
    }
    // 2. Real-time push via SSE
    if (channels.push) {
        broadcastToUser(userId, notification ?? {
            type,
            title,
            message,
            actionUrl,
            createdAt: new Date()
        });
    }
    // 3. Email
    if (channels.email) {
        // Fire-and-forget (don't block the response)
        sendNotificationEmail(userId, type, title, message, actionUrl).catch((e)=>console.error('[notify] Email send error:', e));
    }
    return notification;
}
async function notifyMany(params) {
    const { userIds, type, title, message, data, actionUrl, force = false } = params;
    const results = await Promise.allSettled(userIds.map((userId)=>notify({
            userId,
            type,
            title,
            message,
            data,
            actionUrl,
            force
        })));
    const succeeded = results.filter((r)=>r.status === 'fulfilled').length;
    const failed = results.filter((r)=>r.status === 'rejected').length;
    return {
        sent: succeeded,
        failed,
        total: userIds.length
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# debugId=34cfb211-a722-7db1-0018-6e04971cd9e5
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_notifications_notify_ts_8bd6b676._.js.map