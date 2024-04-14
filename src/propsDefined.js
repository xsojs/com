import { ensureObject } from "@xso/utils";

function propsDefined(com) {
    ensureObject(`Component Props`, com);
    let props = null;
    for (const key of Object.keys(com)) {
        if (props != null) {
            throw new Error(`More than 1 component in the same object: ${com}`);
        }
        props = com[key];
        ensureObject(`Component Props Loaded`, props);
    }
    return props;
}

export default propsDefined;