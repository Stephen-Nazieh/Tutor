;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="04d0a709-a625-6768-01e7-59c3f2d97089")}catch(e){}}();
module.exports=[245205,e=>{"use strict";var i=e.i(522734),r=e.i(654884);async function a(){for(let e of["/etc/machine-id","/var/lib/dbus/machine-id"])try{return(await i.promises.readFile(e,{encoding:"utf8"})).trim()}catch(e){r.diag.debug(`error reading machine id: ${e}`)}}e.s(["getMachineId",()=>a])}];

//# debugId=04d0a709-a625-6768-01e7-59c3f2d97089
//# sourceMappingURL=13d64_build_esm_detectors_platform_node_machine-id_getMachineId-linux_86e39ac7.js.map