;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="ee022145-1ad6-3b3f-f415-51736922acd6")}catch(e){}}();
module.exports=[502527,e=>{"use strict";var i=e.i(522734),r=e.i(547438);async function a(){for(let e of["/etc/machine-id","/var/lib/dbus/machine-id"])try{return(await i.promises.readFile(e,{encoding:"utf8"})).trim()}catch(e){r.diag.debug(`error reading machine id: ${e}`)}}e.s(["getMachineId",()=>a])}];

//# debugId=ee022145-1ad6-3b3f-f415-51736922acd6
//# sourceMappingURL=13d64_build_esm_detectors_platform_node_machine-id_getMachineId-linux_e8fb590c.js.map