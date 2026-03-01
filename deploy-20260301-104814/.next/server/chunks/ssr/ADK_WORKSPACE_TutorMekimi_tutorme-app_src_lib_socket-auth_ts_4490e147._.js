;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="a939c899-2dcb-ef17-56e6-b5f9e014ff0f")}catch(e){}}();
module.exports=[550539,a=>{"use strict";async function b(){try{let a=await fetch("/api/socket-token",{credentials:"include"});if(!a.ok)return null;return(await a.json()).token??null}catch{return null}}a.s(["getSocketToken",()=>b])}];

//# debugId=a939c899-2dcb-ef17-56e6-b5f9e014ff0f
//# sourceMappingURL=ADK_WORKSPACE_TutorMekimi_tutorme-app_src_lib_socket-auth_ts_4490e147._.js.map