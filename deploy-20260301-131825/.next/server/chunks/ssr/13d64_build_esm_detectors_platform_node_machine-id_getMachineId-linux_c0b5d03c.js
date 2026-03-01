;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="c422fbc9-55ed-c135-afc9-72badb4c5f22")}catch(e){}}();
module.exports=[432842,a=>{"use strict";var b=a.i(522734),c=a.i(818518);async function d(){for(let a of["/etc/machine-id","/var/lib/dbus/machine-id"])try{return(await b.promises.readFile(a,{encoding:"utf8"})).trim()}catch(a){c.diag.debug(`error reading machine id: ${a}`)}}a.s(["getMachineId",()=>d])}];

//# debugId=c422fbc9-55ed-c135-afc9-72badb4c5f22
//# sourceMappingURL=13d64_build_esm_detectors_platform_node_machine-id_getMachineId-linux_c0b5d03c.js.map